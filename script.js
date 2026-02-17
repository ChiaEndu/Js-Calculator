const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = null;
let operator = null;
let justCalculated = false;

function updateDisplay() {
  if (operator && previousInput !== null && !justCalculated) {
    display.textContent = previousInput + " " + operator + " " + currentInput;
  } else {
    display.textContent = currentInput;
  }
}

function clearCalculator() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  justCalculated = false;
}

function deleteOne() {
  if (justCalculated) return;

  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
}

function inputNumber(num) {
  // Start fresh after equals
  if (justCalculated) {
    currentInput = num;
    previousInput = null;
    operator = null;
    justCalculated = false;
    return;
  }

  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
}

function inputDecimal() {
  if (justCalculated) {
    currentInput = "0.";
    justCalculated = false;
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function chooseOperator(op) {
  if (operator && !justCalculated) {
    calculate();
  }

  previousInput = currentInput;
  operator = op;
  currentInput = "0";
  justCalculated = false;

  highlightOperator(op);
}

function calculate() {
  if (!operator || previousInput === null) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
  }

  currentInput = result.toString();
  previousInput = null;
  operator = null;
  justCalculated = true;

  removeHighlight();
}

function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
}

function percentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
}

function highlightOperator(op) {
  removeHighlight();
  document.querySelectorAll(".btn-orange").forEach((btn) => {
    if (btn.dataset.operator === op) {
      btn.classList.add("active");
    }
  });
}

function removeHighlight() {
  document.querySelectorAll(".btn-orange").forEach((btn) => {
    btn.classList.remove("active");
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    const action = button.dataset.action;
    const op = button.dataset.operator;

    if (!action && !op) {
      if (number === ".") {
        inputDecimal();
      } else {
        inputNumber(number);
      }
    }

    if (action === "clear") clearCalculator();
    if (action === "delete") deleteOne();
    if (action === "equals") calculate();
    if (action === "sign") toggleSign();
    if (action === "percent") percentage();
    if (op) chooseOperator(op);

    updateDisplay();
  });
});

updateDisplay();
