const ACTIVE_CLASS = "active";
const MAX_PRECISION = 10;
const BUTTON_IDS = "0123456789-.";

function add(number1, number2) {
  return (number1 + number2).toPrecision(MAX_PRECISION) / 1;
}

function subtract(number1, number2) {
  return (number1 - number2).toPrecision(MAX_PRECISION) / 1;
}

function multiply(number1, number2) {
  return (number1 * number2).toPrecision(MAX_PRECISION) / 1;
}

function divide(number1, number2) {
  if (number2 === 0) {
    return "Undefined";
  }

  return (number1 / number2).toPrecision(MAX_PRECISION) / 1;
}

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const clear = document.querySelector("#clear");
const percent = document.querySelector("#percent");
const negative = document.querySelector("#negative");
const deleteButton = document.querySelector("#delete");

let displayText = display.textContent;
let activeButton;
let operator;
let number1;
let number2;

for (const number of numbers) {
  number.addEventListener("click", (event) => {
    addNumber(event.target);
  });
}

for (const operand of operands) {
  operand.addEventListener("click", (event) => {
    evaluate(event.target);
  });
}

clear.addEventListener("click", clearCalculator);
negative.addEventListener("click", negateNumber);
percent.addEventListener("click", divideByOneHundred);
deleteButton.addEventListener("click", deleteCharacter);
document.addEventListener("keyup", (event) => {
  let button;

  switch (event.key) {
    case "Backspace":
      button = deleteButton;
      break;
    case "/":
      button = operands[0];
      break;
    case "*":
      button = operands[1];
      break;
    case "+":
      button = operands[3];
      break;
    case "=":
    case "Enter":
      button = operands[4];
      break;
    default:
      if (BUTTON_IDS.includes(event.key)) {
        button = document.querySelector(`#button${event.key}`);
      }
  }
  if (button) {
    button.click();
  }
});

function clearCalculator() {
  inactivateButton();

  number1 = null;
  number2 = null;
  operator = null;
  display.textContent = "0";
  displayText = display.textContent;
}

function negateNumber() {
  inactivateButton();

  let number = +displayText;
  number *= -1;
  display.textContent = number;
  displayText = display.textContent;
}

function divideByOneHundred() {
  inactivateButton();

  let number = +displayText;
  number /= 100;
  display.textContent = number;
  displayText = display.textContent;
}

function deleteCharacter() {
  inactivateButton();

  if (displayText.length === 1) {
    display.textContent = "0";
    displayText = display.textContent;
  } else {
    display.textContent = displayText.split("").slice(0, -1).join("");
    displayText = display.textContent;
  }
}

function inactivateButton() {
  if (activeButton) {
    activeButton.classList.toggle(ACTIVE_CLASS);
    activeButton = null;
  }
}

function operate(operator, number1, number2) {
  if (number2 === null || number2 === undefined) number2 = number1;

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

function evaluate(button) {
  if (activeButton || operator) {
    if (operator && !activeButton) {
      number2 = +displayText;
    }
    inactivateButton();
    let newNumber = operate(operator, number1, number2);
    display.textContent = newNumber;
    displayText = display.textContent;
    number1 = +displayText;
    operator = null;
    number2 = null;
  }

  if (button.id !== "equals") {
    setOperator(button);
  }
}

function setOperator(button) {
  button.classList.toggle(ACTIVE_CLASS);
  activeButton = button;
  number1 = +displayText;
  operator = button.textContent;
}

function addNumber(button) {
  if (activeButton) {
    display.textContent = "0";
    displayText = display.textContent;
  }
  inactivateButton();

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
}
