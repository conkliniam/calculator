const ACTIVE_CLASS = "active";

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const clear = document.querySelector("#clear");
const percent = document.querySelector("#percent");
const negative = document.querySelector("#negative");

let displayText = display.textContent;
let activeButton;
let operator;
let number1;
let number2;

for (const number of numbers) {
  number.addEventListener("click", (event) => {
    let button = event.target;

    if (activeButton) {
      activeButton.classList.toggle(ACTIVE_CLASS);
      activeButton = null;
      display.textContent = "0";
      displayText = display.textContent;
    }

    if (button.id === "decimal") {
      if (!displayText.includes(".")) {
        display.textContent += ".";
        displayText = display.textContent;
      }
    } else {
      let numberText = button.textContent;

      if (displayText === "0") {
        display.textContent = numberText;
        displayText = display.textContent;
      } else {
        display.textContent += numberText;
        displayText = display.textContent;
      }
    }
  });
}

for (const operand of operands) {
  operand.addEventListener("click", (event) => {
    let button = event.target;

    if (activeButton || operator) {
      if (activeButton) {
        activeButton.classList.toggle(ACTIVE_CLASS);
        activeButton = null;
      } else if (operator) {
        number2 = +displayText;
      }
      let newNumber = operate(operator, number1, number2);
      display.textContent = newNumber;
      displayText = display.textContent;
      number1 = +displayText;
      operator = null;
      number2 = null;
    }

    if (button.id !== "equals") {
      button.classList.toggle(ACTIVE_CLASS);
      activeButton = button;
      number1 = +displayText;
      operator = button.textContent;
    }
  });
}

clear.addEventListener("click", clearCalculator);
negative.addEventListener("click", negateNumber);
percent.addEventListener("click", divideByOneHundred);

function clearCalculator() {
  if (activeButton) {
    activeButton.classList.toggle(ACTIVE_CLASS);
    activeButton = null;
  }

  number1 = null;
  number2 = null;
  operator = null;
  display.textContent = "0";
  displayText = display.textContent;
}

function negateNumber() {
  if (activeButton) {
    activeButton.classList.toggle(ACTIVE_CLASS);
    activeButton = null;
  }

  let number = +displayText;
  number *= -1;
  display.textContent = number;
  displayText = display.textContent;
}

function divideByOneHundred() {
  if (activeButton) {
    activeButton.classList.toggle(ACTIVE_CLASS);
    activeButton = null;
  }

  let number = +displayText;
  number /= 100;
  display.textContent = number;
  displayText = display.textContent;
}

function operate(operator, number1, number2) {
  if (!number2) number2 = number1;

  switch (operator) {
    case "*":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "+":
      return add(number1, number2);
    default:
      return `Invalid Operator: ${operator}`;
  }
}
