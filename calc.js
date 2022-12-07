let firstNumber;
let secondNumber;
let selectedOperator;













// DISPLAY

let selectedNumber = 0;
const numbers = document.querySelectorAll('.num');

let displayValue = 0;
const display = document.querySelector('.display');
display.textContent = displayValue;

let clickCounter = 0;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {



        selectedNumber = e.target.textContent;
        console.log(selectedNumber);

        clickCounter++;
        if ((clickCounter < 2) || (displayValue == 0)) {
            displayValue = selectedNumber;
        } else {
            displayValue += selectedNumber;
        }

        display.textContent = displayValue;








    });
});

// OPERATE

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {



        selectedOperator = e.target.textContent;
        console.log(selectedOperator);

        firstNumber = Number(displayValue);

        if (selectedOperator) {
            displayValue = '';

        }



    });
});

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

function substract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
};

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
};

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
};

function operate(firstNumber, selectedOperator, secondNumber) {

    if (selectedOperator === '+') {
        return add(firstNumber, secondNumber);
    }

    if (selectedOperator === '-') {
        return substract(firstNumber, secondNumber);
    }

    if (selectedOperator === 'x') {
        return multiply(firstNumber, secondNumber);
    }

    if (selectedOperator === '÷') {
        return divide(firstNumber, secondNumber);
    }
};



// EQUALS

let result;
const equals = document.querySelector('.equals');

equals.addEventListener('click', () => {

    secondNumber = Number(displayValue);

    result = operate(firstNumber, selectedOperator, secondNumber);

    console.log(result);

    displayValue = result;
    display.textContent = displayValue;
});













// CLEAR

const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    selectedNumber = 0;
    displayValue = 0;
    clickCounter = 0;
    console.log('clear');
    display.textContent = displayValue;
    // return displayValue;
});

// BACKSPACE

const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', () => {
    displayValue = displayValue.toString();
    displayValue = displayValue.slice(0, -1);
    if (displayValue.length < 1) {
        displayValue = 0;
    }
    displayValue = parseInt(displayValue);
    display.textContent = displayValue;
    console.log('backspace');
});

// BUTTON PRESS
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.style.animation = "none"
        button.offsetHeight;
        button.style.animation = "press 0.2s"
        button.classList.add('hold');
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove('hold');
        button.style.animation = "none"
        button.offsetHeight;
        button.style.animation = "unpress 0.2s"
    });
});