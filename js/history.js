// State
const STORAGE_KEY = 'calcHistory'
let historyItems = []

window.addEventListener('DOMContentLoaded', function() {

  historyItems = loadHistory()

  this.window.document.querySelector('#clearHistory').addEventListener('click', () => onClearHistoryClicked())
  this.window.document.querySelector('#exportTxt').addEventListener('click', () => onExportTxtClicked())
  this.window.document.querySelector('#exportCsv').addEventListener('click', () => onExportCsvClicked())
  this.window.document.querySelector('#historyList').addEventListener('click', event => onHistoryListClicked(event))

  renderHistory()
})

// Controllers
function onClearHistoryClicked() {
  if (!confirm('Clear entire history?')) return

  clearHistory()
  renderHistory()
}

function onExportTxtClicked() {
  if (!historyItems.length) {
    alert('No history to export.')
    return
  }

  exportTxt()
}

function onExportCsvClicked() {
  if (!historyItems.length) {
    alert('No history to export.')
    return
  }

  exportCsv()
}

function onHistoryListClicked(event) {
  getHistoryList(event)
  renderHistory()
}

// Model
function loadHistory() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    return arr
  } catch {
    return []
  }
}

function clearHistory() {
  historyItems = []
  localStorage.removeItem(STORAGE_KEY)
}

function exportTxt() {
  const lines = historyItems.map(entry => {
    const d = new Date(entry.timestamp)
    return `${entry.expression} ${entry.result} [${d.toLocaleString()}]`
  })

  const blob = new Blob([lines.join('\n')], {
    type: 'text/plain;charset=utf-8'
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'calculator-history.txt'
  a.click()
  URL.revokeObjectURL(url)
}

function exportCsv() {
  const rows = []
  rows.push(['Expression', 'Result', 'Timestamp'])

  historyItems.forEach(entry => {
    const d = new Date(entry.timestamp)
    rows.push([
      `"${String(entry.expression).replace(/"/g, '""')}"`,
      `"${entry.result}"`,
      `"${d.toISOString()}"`
    ])
  })

  const csv = rows.map(r => r.join(',')).join('\n')

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8'
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'calculator-history.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function getDayLabel(date) {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (sameDay(date, today)) return 'Today'
  if (sameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString()
}

function getHistoryList(event) {
  if (!event.target.matches('.history-delete-btn')) return

  const timestamp = event.target.dataset.timestamp
  historyItems = historyItems.filter(entry => entry.timestamp !== timestamp)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems))
}

// View
function renderHistory() {
  const historyList = document.querySelector('#historyList')
  const emptyMsg = document.querySelector('#emptyMsg')

  if (!historyList || !emptyMsg) return

  historyList.innerHTML = ''

  if (!historyItems.length) {
    emptyMsg.style.display = 'block'
    return
  }

  emptyMsg.style.display = 'none'

  let currentGroup = null

  historyItems.forEach(entry => {
    const dateObj = new Date(entry.timestamp)
    const label = getDayLabel(dateObj)

    if (label !== currentGroup) {
      currentGroup = label
      const groupHeader = document.createElement('div')
      groupHeader.className = 'day-label'
      groupHeader.textContent = currentGroup
      historyList.appendChild(groupHeader)
    }

    const timeStr = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    const bubble = document.createElement('div')
    bubble.className = 'history-bubble'

    bubble.innerHTML = `
      <div class="history-main">
        <span class="history-expr">${entry.expression}</span>
        <span class="history-result">${entry.result}</span>
        <span class="history-time">${timeStr}</span>
      </div>
      
      <button class="history-delete-btn" title="Delete" data-timestamp="${entry.timestamp}">x</button>
    `

    historyList.appendChild(bubble)
  })
}