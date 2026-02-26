const display = document.getElementById("display");
const memory = document.getElementById("memory");
const buttons = document.querySelectorAll("button");

let currentNumber = "0";
let expression = "";
let resetScreen = false;

function updateDisplay() {
  if (expression) {
    display.textContent = resetScreen
      ? expression
      : expression + currentNumber;
  } else {
    display.textContent = currentNumber;
  }
}

function inputNumber(number) {
  if (currentNumber === "0" || resetScreen) {
    currentNumber = number;
    resetScreen = false;
  } else {
    currentNumber += number;
  }
}

function inputDecimal() {
  if (resetScreen) {
    currentNumber = "0.";
    resetScreen = false;
    return;
  }

  if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
}

function chooseOperator(op) {
  if (resetScreen) return;

  expression += currentNumber + " " + op + " ";
  resetScreen = true;
}

function calculate() {
  if (!expression) return;

  expression += currentNumber;

  try {
    const result = eval(expression);

    memory.textContent = expression + " ";
    currentNumber = result.toString();
    expression = "";
    resetScreen = true;

  } catch {
    alert("Error");
    clearAll();
  }
}

function clearAll() {
  currentNumber = "0";
  expression = "";
  resetScreen = false;
  memory.textContent = "";
}

function deleteOne() {
  if (resetScreen) return;

  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
  } else {
    currentNumber = "0";
  }
}

function percentage() {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
}

function toggleSign() {
  if (currentNumber === "0") return;
  currentNumber = (parseFloat(currentNumber) * -1).toString();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {

    const value = button.textContent.trim();
    const action = button.dataset.action;
    const op = button.dataset.operator;

    if (!isNaN(value)) {
      inputNumber(value);
    } 
    else if (value === ".") {
      inputDecimal();
    } 
    else if (op) {
      chooseOperator(op);
    } 
    else if (action === "equals") {
      calculate();
    } 
    else if (action === "clear") {
      clearAll();
    } 
    else if (action === "delete") {
      deleteOne();
    } 
    else if (action === "percent") {
      percentage();
    } 
    else if (action === "sign") {
      toggleSign();
    }

    updateDisplay();
  });
});

updateDisplay();