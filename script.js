const display = document.getElementById('display')
const memory = document.getElementById('memory')
const buttons = document.querySelectorAll('button')

let currentNumber = '0'
let previousOperand = null
let operation = null
let resetScreen = false

function updateDisplay () {
  display.textContent = currentNumber
}

function inputNumber (number) {
  if (currentNumber === '0' || resetScreen) {
    currentNumber = number
    resetScreen = false
  } else {
    currentNumber += number
  }
}

function inputDecimal () {
  if (resetScreen) {
    currentNumber = '0.'
    resetScreen = false
    return
  }
  if (!currentNumber.includes('.')) {
    currentNumber += '.'
  }
}

function chooseOperator (op) {
  if (operation !== null) calculate()
  previousOperand = currentNumber
  operation = op
  memory.textContent = `${previousOperand} ${operation}`
  resetScreen = true
}

function calculate () {
  if (operation === null || resetScreen) return

  let result
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentNumber)

  if (isNaN(prev) || isNaN(current)) return

  switch (operation) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      result = current === 0 ? 'Error' : prev / current
      break
    default:
      return
  }

  currentNumber =
    typeof result === 'number'
      ? parseFloat(result.toFixed(10)).toString()
      : result

  operation = null
  previousOperand = null
  memory.textContent = ''
  resetScreen = true
}

function clearAll () {
  currentNumber = '0'
  previousOperand = null
  operation = null
  resetScreen = false
  memory.textContent = ''
}

function deleteOne () {
  if (resetScreen) return
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1)
  } else {
    currentNumber = '0'
  }
}

function percentage () {
  currentNumber = (parseFloat(currentNumber) / 100).toString()
}

function toggleSign () {
  currentNumber = (parseFloat(currentNumber) * -1).toString()
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim()
    const action = button.dataset.action
    const op = button.dataset.operator

    if (!isNaN(value)) {
      inputNumber(value)
    } else if (value === '.') {
      inputDecimal()
    } else if (op) {
      chooseOperator(op)
    } else if (action === 'equals') {
      calculate()
    } else if (action === 'clear') {
      clearAll()
    } else if (action === 'delete') {
      deleteOne()
    } else if (action === 'percent') {
      percentage()
    } else if (action === 'sign') {
      toggleSign()
    }
    updateDisplay()
  })
})

updateDisplay()
