"use strict";

let input = document.getElementById('input'); // input/output button
let number = document.querySelectorAll('.numbers div'); // number buttons
let operator = document.querySelectorAll('.operators div'); // operator buttons
let result = document.getElementById('result'); // equal button
let clear = document.getElementById('clear'); // clear button
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding event listeners for the buttons
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// adding click handlers to number buttons
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }

  });
}

result.addEventListener("click", function() {
  let inputString = input.innerHTML;
  let numbers = inputString.split(/\+|\-|\×|\÷/g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, divideFn(numbers[divide], numbers[divide + 1]));
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, multiplyFn(numbers[multiply], numbers[multiply + 1]));
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, substractFn(parseFloat(numbers[subtract]), parseFloat(numbers[subtract + 1])));
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, addFn(parseFloat(numbers[add]), parseFloat(numbers[add + 1])));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

clear.addEventListener("click", function() {
  input.innerHTML = "";
});

function addFn(num1, num2) {
  return num1 + num2;
}

function substractFn(num1, num2) {
  return num1 - num2;
}

function multiplyFn(num1, num2) {
  return num1 * num2;
}

function divideFn(num1, num2) {
  return num1 / num2;
}