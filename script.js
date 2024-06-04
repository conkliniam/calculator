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

let operator = "*";
let number1 = 5;
let number2 = 6;

function operate(operator, number1, number2) {
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
