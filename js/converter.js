// State
const CONVERTER_DEFAULT = '0'
const rates = {
  EUR: 1,
  USD: 1.16,
  GBP: 0.88,
  JPY: 179.60,
  CHF: 0.92,
  HUF: 383.85
}
let fromCurrency = 'EUR'
let toCurrency = 'USD'
let amountValue = ''
let result = CONVERTER_DEFAULT

window.document.addEventListener('DOMContentLoaded', () => {

  this.window.document.querySelector('#amount').addEventListener('input', () => onAmountChanged())
  this.window.document.querySelector('#fromCurrency').addEventListener('change', () => onCurrencyChanged())
  this.window.document.querySelector('#toCurrency').addEventListener('change', () => onCurrencyChanged())
  this.window.document.querySelector('#swapBtn').addEventListener('click', () => onSwapClicked())
  this.window.document.querySelector('#converterForm').addEventListener('submit', (e) => {
    e.preventDefault()
    onConvertClicked()
  })

  updateRateInfo()
  updateConverterDisplay()
})

// Controllers
function onConvertClicked() {
  readInputToState()
  calculateConversion()
  updateConverterDisplay()
  updateRateInfo()
}

function onSwapClicked() {
  const tmp = fromCurrency
  fromCurrency = toCurrency
  toCurrency = tmp

  const fromSelectEl = document.querySelector('#fromCurrency')
  fromSelectEl.value = fromCurrency

  const toSelectEl = document.querySelector('#toCurrency')
  toSelectEl.value = toCurrency

  calculateConversion()
  updateConverterDisplay()
  updateRateInfo()
}

function onCurrencyChanged() {
  readInputToState()
  calculateConversion()
  updateConverterDisplay()
  updateRateInfo()
}

function onAmountChanged() {
  readInputToState()
  calculateConversion()
  updateConverterDisplay()
}

// Model
function readInputToState() {
  amountValue = document.querySelector('#amount').value
  fromCurrency = document.querySelector('#fromCurrency').value
  toCurrency = document.querySelector('#toCurrency').value
}

function calculateConversion() {
  const amountNum = parseFloat(amountValue)

  if (isNaN(amountNum)) {
    resultValue = CONVERTER_DEFAULT
    return
  }

  const rate = getRate(fromCurrency, toCurrency)
  const converted = amountNum * rate

  resultValue = String(converted.toFixed(2))
}

function getRate(from, to) {
  
}