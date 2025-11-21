// State
const DEFAULT = '0'
let counter = DEFAULT
let firstOperand = null
let operator = null
let waitingForSecondOperand = false

window.addEventListener('DOMContentLoaded', function() {
  this.window.document.querySelectorAll('#number').forEach(btn => {
    btn.addEventListener('click', () => onNumberClicked(btn.dataset.number))
  })
  this.window.document.querySelector('#resetBtn').addEventListener('click', () => onResetClicked())
  this.window.document.querySelector('#reverseBtn').addEventListener('click', () => onReverseClicked())
  this.window.document.querySelector('#precentBtn').addEventListener('click', () => onPrecentClicked())
  this.window.document.querySelector('#divideBtn').addEventListener('click', () => onDivideClicked())
  this.window.document.querySelector('#mulBtn').addEventListener('click', () => onMultiplyClicked())
  this.window.document.querySelector('#subBtn').addEventListener('click', () => onDecreaseClicked())
  this.window.document.querySelector('#addBtn').addEventListener('click', () => onIncreaseClicked())
  this.window.document.querySelector('#decPointBtn').addEventListener('click', () => onDecimalPointClicked())
  this.window.document.querySelector('#equalBtn').addEventListener('click', () => onEqualClicked())

  updateDisplay();
})

// Controllers
function onNumberClicked(digit) {
  getNumber(digit)
}

function onResetClicked() {
  resetCounter()
}

function onReverseClicked() {
  reverseCounter()
}

function onPrecentClicked() {
  getPrecent()
}

function onDivideClicked() {
  setOperator('divide')
}

function onMultiplyClicked() {
  setOperator('multiply')
}

function onDecreaseClicked() {
  setOperator('substract')
}

function onIncreaseClicked() {
  setOperator('add')
}

function onDecimalPointClicked() {
  getDecimal()
}

function onEqualClicked() {
  getEqual()
}

// Model
function getNumber(digit) {
  if (waitingForSecondOperand) {
    counter = digit
    waitingForSecondOperand = false
  } else {
    if (counter === '0') {
      counter = digit
    } else {
      counter += digit
    }
  }
  updateDisplay()
}

function resetCounter() {
  counter = DEFAULT
  firstOperand = null
  operator = null
  waitingForSecondOperand = false
  updateDisplay()
}

function reverseCounter() {
  if (counter === '0') return
  if (counter.startsWith('-')) {
    counter = counter.slice(1)
  } else {
    counter = '-' + counter
  }
  updateDisplay()
}

function getPrecent() {
  const value = parseFloat(counter)
  if (isNaN(value)) return
  counter = String(value / 100)
  updateDisplay()
}

function setOperator(nextOperator) {
  const inputVal = parseFloat(counter)

  if (operator && waitingForSecondOperand) {
    operator = nextOperator
    return
  }

  if (firstOperand === null) {
    firstOperand = inputVal
  } else if (operator) {
    const result = calculate(firstOperand, inputVal, operator)
    counter = String(result)
    firstOperand = result
    updateDisplay()
  }

  operator = nextOperator
  waitingForSecondOperand = true
}

function calculate(num1, num2, op) {
  if (op === 'add') return num1 + num2
  if (op === 'substract') return num1 - num2
  if (op === 'multiply') return num1 * num2
  if (op === 'divide') {
    if (num2 === 0) return 0
    return num1 / num2
  }
  return num2
}

function getDecimal() {
  if (waitingForSecondOperand) {
    counter = '0.'
    waitingForSecondOperand = false
  } else if (!counter.includes('.')) {
    counter += '.'
  }
  updateDisplay()
}

function getEqual() {
  if (operator === null || waitingForSecondOperand) {
    return
  }

  const secondOperand = parseFloat(counter)
  const result = calculate(firstOperand, secondOperand, operator)
  saveToHistory(firstOperand, operator, secondOperand, result)

  counter = String(result)
  firstOperand = null
  operator = null
  waitingForSecondOperand = false

  updateDisplay()
}

function saveToHistory(num1, op, num2, result) {
  const operators = {
    add: '+',
    substract: '-',
    multiply: '×',
    divide: '÷'
  }

  const date = new Date()

  const entry = {
    expression: `${num1} ${operators[op]} ${num2} =`,
    result: result,
    timestamp: date.toISOString()
  }

  const history = JSON.parse(localStorage.getItem('calcHistory') || '[]')
  history.push(entry)
  localStorage.setItem('calcHistory', JSON.stringify(history))
}

// View
function updateDisplay() {
  const display = document.querySelector('#counter')
  display.textContent = counter

  const baseSize = 52
  const minSize = 22
  const maxBeforeShrink = 8

  const len = counter.length

  if (len <= maxBeforeShrink) {
    display.style.fontSize = baseSize + 'px'
    return
  }

  const shrinkFactor = 1 - Math.min((len - maxBeforeShrink) * 0.07, 0.7)

  let newSize = baseSize * shrinkFactor
  if (newSize < minSize) newSize = minSize

  display.style.fontSize = newSize + 'px'

  if (len > 22) {
    const num = parseFloat(counter)
    if (!isNaN(num)) {
      display.textContent = num.toExponential(6)
      display.style.fontSize = "22px"
    }
  }
}