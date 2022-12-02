let a = '';
let b = '';
let firstNumber = a;
let secondNumber = b;
let selectedOperator;
let storedNumber = '';

// OPERATORS

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



// NUMBERS

let selectedNumber;
const numbers = document.querySelectorAll('.num');

let displayValue = 0;
const display = document.querySelector('.display');
display.innerHTML = displayValue;

let clickCounter = 0;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {

        selectedNumber = e.target.innerHTML;
        console.log(selectedNumber);

        clickCounter++;
        if ((clickCounter < 2) || (displayValue == 0)) {
            displayValue = selectedNumber;
        } else {
            displayValue += selectedNumber;
        }

        display.innerHTML = displayValue;

        firstNumber += selectedNumber;
        return selectedNumber;
    });
});




// OPERATE


const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        selectedOperator = e.target.innerHTML;
        console.log(selectedOperator);
        displayValue += selectedOperator;

        storedNumber = firstNumber;

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











// CLEAR
const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    displayValue = 0;
    clickCounter = 0;
    console.log('clear');
    display.innerHTML = displayValue;
    return displayValue;
});


// const equals = document.querySelector('.equals');

// equals.addEventListener('click', () => {
//     operate(selectedOperator, firstNumber, secondNumber);
//     console.log('operate!!!!!!!');
// });


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