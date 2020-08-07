const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function inputBackspace() {
  calculator.displayValue = calculator.displayValue.substring(0,calculator.displayValue.length -1);
}

function inputClear() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  }

  else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {

  '/': (firstOperand, secondOperand) => (secondOperand === 0) ? 'error' : firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

function updateDisplay() {
  const display = document.querySelector('.calculatorDisplay');
  display.textContent = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculatorKeys');
keys.addEventListener('click', (event) => {
  const {target} = event;
  if (!target.matches('button')) {
    return;
  }
  else if (target.classList.contains('operatorKey')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  else if (target.id == 'decimalKey') {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  else if (target.id == 'clearKey') {
    inputClear();
    updateDisplay();
    return;
  }
  else if (target.id == 'backspaceKey') {
    inputBackspace();
    updateDisplay();
    return;
  }
  else {
    inputDigit(target.value);
    updateDisplay();
  }
});

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['/', '*', '+', '-', '=']

window.addEventListener("keydown", keyValue);
function keyValue(e) {
  if (numbers.includes(e.key)){
    inputDigit(e.key);
    updateDisplay();
    return;
  }
  else if (operators.includes(e.key)) {
    handleOperator(e.key);
    updateDisplay();
    return;
  }
  else if (e.key == 'Backspace') {
    inputBackspace();
    updateDisplay();
    return;
  }
  else {
    console.log('error');
  }
}
