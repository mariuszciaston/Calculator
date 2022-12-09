// NUMBERS

let selectedNumber = 0;
const numbers = document.querySelectorAll('.num');

let displayValue = 0;

const display = document.querySelector('.display');
display.textContent = displayValue;

let clickCounter = 0;
const error = "can't divide by 0";

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {

        if (displayValue == error) {
            clearAll();
        };

        if (displayValue.length == undefined || displayValue.length < 16) {
            selectedNumber = e.target.textContent;
            // console.log(selectedNumber);

            clickCounter++;
            if ((clickCounter < 2) || (displayValue == 0)) {
                displayValue = selectedNumber;
            } else {
                displayValue += selectedNumber;
            }

            display.textContent = displayValue;
        }

    });
});

// OPERATORS

let firstNumber = '';
let selectedOperator = '';
let secondNumber = '';

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {

        // resizeFont();
        selectedOperator = e.target.textContent;
        // console.log(selectedOperator);

        firstNumber = Number(displayValue);

        if (selectedOperator) {
            displayValue = '';

            // display.textContent = displayValue;


        }

    });
});

// OPERATE

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

    if (secondNumber == 0) {
        displayValue = error;
        display.textContent = displayValue;

        backspace.classList.add('disabled');
        backspace.disabled = true;

        operators.forEach((operator) => {
            operator.classList.add('disabled');
            operator.disabled = true;

        })
        decimal.classList.add('disabled');
        decimal.disabled = true;


        // document.querySelector('#button').disabled = true;



        // if (displayValue != error){


    } else {
        return firstNumber / secondNumber;
    }
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
    if (displayValue == error) {
        clearAll();
    } else if (
        (firstNumber != '') || (selectedOperator != '') || (secondNumber != '')
    ) {
        secondNumber = Number(displayValue);
        result = operate(firstNumber, selectedOperator, secondNumber);
        // console.log(result);
        // console.log(displayValue);

        displayValue = result.toPrecision(11).replace(/0+$/, "").replace(/\.$/, "");

        display.textContent = displayValue;
        displayValue = display.textContent;
        resizeFont();
    };
});

// CLEAR

const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    clearAll();
});

function clearAll() {
    firstNumber = '';
    secondNumber = '';
    selectedOperator = '';
    selectedNumber = 0;
    displayValue = 0;
    clickCounter = 0;
    result = '';
    display.style.fontSize = '48px';
    display.textContent = displayValue;

    backspace.classList.remove('disabled');
    backspace.disabled = false;

    operators.forEach((operator) => {
        operator.classList.remove('disabled');
        operator.disabled = false;

    })
    decimal.classList.remove('disabled');
    decimal.disabled = false;

}

// BACKSPACE

const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', () => {
    displayValue = displayValue.toString();
    displayValue = displayValue.slice(0, -1);
    if (displayValue.length < 1) {
        displayValue = 0;
    }
    display.textContent = displayValue;
    resizeFont();
    // displayValue = parseInt(displayValue);
    // console.log('backspace');
});

// DECIMAL

const decimal = document.querySelector('.decimal');

decimal.addEventListener('click', () => {
    // console.log('decimal');
});

// BUTTON PRESS ANIMATION

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

// CHANGE FONT SIZE TO FIT ON DISPLAY

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        resizeFont();
    });
});

function resizeFont() {
    if (display.textContent.length <= 12) {
        display.style.fontSize = '48px';
    }
    if (display.textContent.length >= 13) {
        display.style.fontSize = '45px';
    }
    if (display.textContent.length >= 14) {
        display.style.fontSize = '42px';
    }
    if (display.textContent.length >= 15) {
        display.style.fontSize = '39px';
    }
    if (display.textContent.length >= 16) {
        display.style.fontSize = '36px';
    }
}