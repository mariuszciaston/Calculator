// Operators

let a = 10;
let b = 2;

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

console.log(add(a, b));
console.log(subtract(a, b));
console.log(multiply(a, b));
console.log(divide(a, b));



// Operate

let firstNumber = a;
let secondNumber = b;
let operator;

function operate(firstNumber, operator, secondNumber) {
    if (operator === 'add') {
        add(firstNumber, secondNumber);
    }

    if (operator === 'subtract') {
        subtract(firstNumber, secondNumber);
    }

    if (operator === 'multiply') {
        multiply(firstNumber, secondNumber);
    }

    if (operator === 'divide') {
        divide(firstNumber, secondNumber);
    }
};