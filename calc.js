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
  if ((e.key >= '0') && (e.key <= '9') || (e.key === '.')) numberInput(e);
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

  if (primaryValue == error) {
    clearAll();
  }
  if (primaryValue.length == undefined || primaryValue.length < 16) {
    if (e.type === 'click') {
      selectedDigit = e.target.textContent;
    }
    if (e.type === 'keydown') {
      selectedDigit = e.key;
    }
    selectedNumber += selectedDigit;
    if ((primaryValue == '0') && (selectedDigit != '.')) {
      primaryValue = selectedDigit;
    } else {
      if (String(primaryValue).includes('.')) {
        if (selectedDigit !== '.') {
          primaryValue += selectedDigit;
        }
      } else {
        primaryValue += selectedDigit;
      }
    }
    if (primaryValue == '.') {
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
};

// OPERATORS
function operatorNow(e) {
  if (e.type === 'click') {
    selectedOperator = e.target.textContent;
  }
  if (e.type === 'keydown') {
    selectedOperator = e.key;
    if (e.key == '*' || e.key == 'x') {
      selectedOperator = 'x';
    }
    if (e.key == '/') {
      selectedOperator = '÷';
    }
  }
  primaryValue = primaryDisplay.textContent;
  primaryValue = primaryValue.replace(/\.$|\.0+$/, '');
  firstNumber = primaryValue;
  primaryDisplay.textContent = primaryValue;
  secondaryDisplay.textContent = firstNumber + ' ' + selectedOperator;
  selectedNumber = '';
  if (selectedOperator) {
    primaryValue = '';
  }
}

// OPERATE
function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function substract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  if (secondNumber == 0) {
    primaryValue = error;
    primaryDisplay.textContent = primaryValue;

    decimal.classList.add('disabled');
    decimal.disabled = true;

    backspace.classList.add('disabled');
    backspace.disabled = true;

    operators.forEach((operator) => {
      operator.classList.add('disabled');
      operator.disabled = true;
    });

  } else {
    return firstNumber / secondNumber;
  }
}

function operate(firstNumber, selectedOperator, secondNumber) {
  if (selectedOperator == '+') {
    return add(firstNumber, secondNumber);
  }
  if (selectedOperator == '-') {
    return substract(firstNumber, secondNumber);
  }
  if (selectedOperator == 'x') {
    return multiply(firstNumber, secondNumber);
  }
  if (selectedOperator == '÷') {
    return divide(firstNumber, secondNumber);
  }
}

// EQUALS
function equalsNow() {
  secondNumber = selectedNumber;
  if ((firstNumber != '') && (selectedOperator != '') && (secondNumber != '')) {
    if (primaryValue == error) {
      clearAll();
    } else if (
      (firstNumber != '') || (selectedOperator != '') || (secondNumber != '')
    ) {
      firstNumber = Number(firstNumber);
      secondNumber = Number(selectedNumber);
      result = operate(firstNumber, selectedOperator, secondNumber);
      result = result.toPrecision(11).replace(/0+$/, '').replace(/\.$/, '');
      primaryValue = result;
      secondaryDisplay.textContent = `${firstNumber + ' ' + selectedOperator + ' ' + secondNumber + ' ' + '=' }`;
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
};

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
    operator.disabled = false;
  });
};

// CHANGE FONT SIZE TO FIT ON DISPLAY
function resizeFont() {
  if (secondaryDisplay.textContent.length <= 12) secondaryDisplay.style.fontSize = '24px';
  if (secondaryDisplay.textContent.length >= 13) secondaryDisplay.style.fontSize = '22,5px';
  if (secondaryDisplay.textContent.length >= 14) secondaryDisplay.style.fontSize = '21px';
  if (secondaryDisplay.textContent.length >= 15) secondaryDisplay.style.fontSize = '19,5px';
  if (secondaryDisplay.textContent.length >= 16) secondaryDisplay.style.fontSize = '18px';

  if (primaryDisplay.textContent.length <= 12) primaryDisplay.style.fontSize = '48px';
  if (primaryDisplay.textContent.length >= 13) primaryDisplay.style.fontSize = '45px';
  if (primaryDisplay.textContent.length >= 14) primaryDisplay.style.fontSize = '42px';
  if (primaryDisplay.textContent.length >= 15) primaryDisplay.style.fontSize = '39px';
  if (primaryDisplay.textContent.length >= 16) primaryDisplay.style.fontSize = '36px';
};