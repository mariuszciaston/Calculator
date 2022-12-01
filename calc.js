// OPERATORS

let a = '';
let b = '';

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

// OPERATE

let firstNumber = a;
let secondNumber = b;
let selectedOperator;

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        selectedOperator = e.target.innerHTML;
        console.log(selectedOperator);
        displayValue += selectedOperator;   
        display.innerHTML = displayValue; 
        return selectedOperator;
    });
});

function operate(selectedOperator, firstNumber, secondNumber) {
    if (selectedOperator === '+') {
        return add(firstNumber, secondNumber);
    }

    if (selectedOperator === '-') {
        return subtract(firstNumber, secondNumber);
    }

    if (selectedOperator === 'x') {
        return multiply(firstNumber, secondNumber);
    }

    if (selectedOperator === '÷') {
        return divide(firstNumber, secondNumber);
    }
};

// DISPLAY

let selectedNumber;
let displayValue = '';
const numbers = document.querySelectorAll('.num');
const display = document.querySelector('.display');


numbers.forEach((number) => {
    number.addEventListener('click', (e) => {

        selectedNumber = e.target.innerHTML;
        console.log(selectedNumber);
        displayValue += selectedNumber;

        display.innerHTML = displayValue;

        console.log(displayValue);

        firstNumber += selectedNumber;
        return selectedNumber;
    });
});