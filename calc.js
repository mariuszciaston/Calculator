/* eslint-disable no-use-before-define */
// VALUES
let selectedDigit = 0;
let selectedNumber = '';
let firstNumber = '';
let secondNumber = '';
let selectedOperator = '';
let result = '';
let secondaryValue = '';
let primaryValue = 0;
const error = 'cant divide by 0';

// SELECTORS
const numbers = document.querySelectorAll('.num');
const decimal = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.btn');
const secondaryDisplay = document.querySelector('.secondary');
const primaryDisplay = document.querySelector('.primary');

secondaryDisplay.textContent = secondaryValue;
primaryDisplay.textContent = primaryValue;

// EVENT LISTENERS
numbers.forEach((number) => {
  number.addEventListener('click', numberInput);
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    equalsNow();
    operatorNow(e);
  });
});

equals.addEventListener('click', equalsNow);
backspace.addEventListener('click', backspaceNow);
clear.addEventListener('click', clearAll);

buttons.forEach((button) => {
  button.addEventListener('click', resizeFont);
});

// KEYBOARD SUPPORT
document.addEventListener('keydown', (e) => {
  e.preventDefault(); // fixes keyboard input
  if (((e.key >= '0') && (e.key <= '9')) || (e.key === '.')) numberInput(e);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === 'x' || e.key === '/') operatorNow(e);
  if (e.key === '=' || e.key === 'Enter') equalsNow();
  if (e.key === 'Backspace') backspaceNow();
  if (e.key === 'Escape' || e.key === 'c') clearAll();
  resizeFont();
});

// BUTTON PRESS ANIMATION
buttons.forEach((button) => {
  button.addEventListener('mousedown', () => {
    button.classList.remove('unpress');
    button.classList.add('press');
    button.classList.add('hold');
  });
  button.addEventListener('mouseup', () => {
    button.classList.remove('press');
    button.classList.remove('hold');
    button.classList.add('unpress');
  });
});

// ---------------------------------------------------------------------------------

// FUNCTIONS

// NUMBERS
function numberInput(e) {
  if (primaryValue === error) {
    clearAll();
  }
  if (primaryValue.length === undefined || primaryValue.length < 16) {
    if (e.type === 'click') {
      selectedDigit = e.target.textContent;
    }
    if (e.type === 'keydown') {
      selectedDigit = e.key;
    }
    selectedNumber += selectedDigit;
    if (((primaryValue === 0) && (selectedDigit !== '.')) || (primaryValue === 0)) {
      if (selectedDigit === '.') {
        primaryValue = selectedDigit;
      } else {
        primaryValue = Number(selectedDigit);
      }
    } else if (String(primaryValue).includes('.')) {
      if (selectedDigit !== '.') {
        primaryValue += selectedDigit;
      }
    } else {
      primaryValue += selectedDigit;
    }
    if (primaryValue === '.') {
      primaryValue = 0 + selectedDigit;
    }
    primaryDisplay.textContent = primaryValue;
    //
    selectedNumber = primaryValue;
    // firstNumber = primaryValue;
    // secondNumber = '';
    // selectedNumber = '';
    // selectedNumber = primaryValue;
    // primaryDisplay.textContent = selectedNumber;
    // secondaryDisplay.textContent = '';
  }
}

// OPERATORS
function operatorNow(e) {
  if (e.type === 'click') {
    selectedOperator = e.target.textContent;
  }
  if (e.type === 'keydown') {
    selectedOperator = e.key;
    if (e.key === '*' || e.key === 'x') {
      selectedOperator = 'x';
    }
    if (e.key === '/') {
      selectedOperator = '÷';
    }
  }
  primaryValue = primaryDisplay.textContent;
  primaryValue = primaryValue.replace(/\.$|\.0+$/, '');
  firstNumber = primaryValue;
  primaryDisplay.textContent = primaryValue;
  secondaryDisplay.textContent = `${firstNumber} ${selectedOperator}`;
  selectedNumber = '';
  if (selectedOperator) {
    primaryValue = '';
  }
}

// OPERATE
function add() {
  return firstNumber + secondNumber;
}

function substract() {
  return firstNumber - secondNumber;
}

function multiply() {
  return firstNumber * secondNumber;
}

function divide() {
  return firstNumber / secondNumber;
}

function operate() {
  switch (selectedOperator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return substract(firstNumber, secondNumber);
    case 'x':
      return multiply(firstNumber, secondNumber);
    case '÷':
      if (secondNumber === 0) {
        primaryValue = error;
        primaryDisplay.textContent = primaryValue;

        decimal.classList.add('disabled');
        decimal.disabled = true;

        backspace.classList.add('disabled');
        backspace.disabled = true;

        operators.forEach((operator) => {
          operator.classList.add('disabled');
          const tempOperator = operator;
          tempOperator.disabled = true;
        });
        return error;
      }
      return divide(firstNumber, secondNumber);
    default:
      return null;
  }
}

// EQUALS
function equalsNow() {
  secondNumber = selectedNumber;
  if ((firstNumber !== '') && (selectedOperator !== '') && (secondNumber !== '')) {
    if (primaryValue === error) {
      clearAll();
    } else {
      firstNumber = Number(firstNumber);
      secondNumber = Number(selectedNumber);
      result = operate(firstNumber, selectedOperator, secondNumber);
      secondaryDisplay.textContent = `${firstNumber} ${selectedOperator} ${secondNumber} ${'='}`;
      result = result.toPrecision(11).replace(/0+$/, '').replace(/\.$/, '');
      primaryValue = result;
      primaryDisplay.textContent = primaryValue;
      primaryValue = primaryDisplay.textContent;
      firstNumber = result;
      selectedNumber = '';
    }
  }
}

// BACKSPACE
function backspaceNow() {
  primaryValue = primaryValue.toString();
  primaryValue = primaryValue.slice(0, -1);
  if (primaryValue.length < 1) {
    primaryValue = 0;
  }
  primaryDisplay.textContent = primaryValue;
}

// CLEAR
function clearAll() {
  selectedDigit = 0;
  selectedNumber = '';
  firstNumber = '';
  secondNumber = '';
  selectedOperator = '';
  result = '';
  secondaryValue = '';
  primaryValue = 0;

  secondaryDisplay.textContent = secondaryValue;
  primaryDisplay.textContent = primaryValue;

  decimal.classList.remove('disabled');
  decimal.disabled = false;

  backspace.classList.remove('disabled');
  backspace.disabled = false;

  operators.forEach((operator) => {
    operator.classList.remove('disabled');
    const tempOperator = operator;
    tempOperator.disabled = false;
  });
}

// CHANGE FONT SIZE TO FIT ON DISPLAY
function resizeFont() {
  secondaryDisplay.classList[secondaryDisplay.textContent.length <= 12 ? 'add' : 'remove']('char-12-small');
  secondaryDisplay.classList[secondaryDisplay.textContent.length === 13 ? 'add' : 'remove']('char-13-small');
  secondaryDisplay.classList[secondaryDisplay.textContent.length === 14 ? 'add' : 'remove']('char-14-small');
  secondaryDisplay.classList[secondaryDisplay.textContent.length === 15 ? 'add' : 'remove']('char-15-small');
  secondaryDisplay.classList[secondaryDisplay.textContent.length >= 16 ? 'add' : 'remove']('char-16-small');

  primaryDisplay.classList[primaryDisplay.textContent.length <= 12 ? 'add' : 'remove']('char-12-large');
  primaryDisplay.classList[primaryDisplay.textContent.length === 13 ? 'add' : 'remove']('char-13-large');
  primaryDisplay.classList[primaryDisplay.textContent.length === 14 ? 'add' : 'remove']('char-14-large');
  primaryDisplay.classList[primaryDisplay.textContent.length === 15 ? 'add' : 'remove']('char-15-large');
  primaryDisplay.classList[primaryDisplay.textContent.length >= 16 ? 'add' : 'remove']('char-16-large');
}
