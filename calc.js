// NUMBERS
let selectedDigit = 0;
let selectedNumber = '';
const numbers = document.querySelectorAll('.num');

let primaryValue = 0;
let secondaryValue = '';

const secondaryDisplay = document.querySelector('.secondary');
const primaryDisplay = document.querySelector('.primary');

secondaryDisplay.textContent = secondaryValue;
primaryDisplay.textContent = primaryValue;

const error = 'cant divide by 0';
const decimal = document.querySelector('.decimal');




numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    numberInput(e);
  });
});

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
      primaryValue += selectedDigit;
    }

    if (primaryValue == '.') {
      primaryValue = 0 + selectedDigit;
    }

    primaryDisplay.textContent = primaryValue;
  }

  if (primaryValue.includes('.')) {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }
};






// OPERATORS

let firstNumber = '';
let selectedOperator = '';
let secondNumber = '';

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    equalsNow();
    operatorNow(e);  
  });
});

function operatorNow(e) {
  if (e.type === 'click') {
    selectedOperator = e.target.textContent;
  }
  if (e.type === 'keydown') {
    selectedOperator = e.key;

    if (e.key == '*'){
      selectedOperator = 'x';
    }
    if (e.key == '/'){
      selectedOperator = '÷';
    }
  }

  primaryValue = primaryDisplay.textContent;
  firstNumber = primaryValue;
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

    backspace.classList.add('disabled');
    backspace.disabled = true;

    operators.forEach((operator) => {
      operator.classList.add('disabled');
      operator.disabled = true;
    });

    decimal.classList.add('disabled');
    decimal.disabled = true;

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

let result;
const equals = document.querySelector('.equals');

equals.addEventListener('click', () => {
  equalsNow();
});

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

      if (primaryValue.includes('.')) {
        decimal.disabled = true;
      } else {
        decimal.disabled = false;
      }
    }

  }
}

// CLEAR

const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
  clearAll();
});

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  selectedOperator = '';
  selectedDigit = 0;
  selectedNumber = '';
  primaryValue = 0;
  secondaryValue = '';

  result = '';
  secondaryDisplay.style.fontSize = '24px';
  primaryDisplay.style.fontSize = '48px';
  secondaryDisplay.textContent = secondaryValue;
  primaryDisplay.textContent = primaryValue;

  backspace.classList.remove('disabled');
  backspace.disabled = false;

  operators.forEach((operator) => {
    operator.classList.remove('disabled');
    operator.disabled = false;
  });
  decimal.classList.remove('disabled');
  decimal.disabled = false;
}

// BACKSPACE

const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', () => {
  backspaceNow();
});

function backspaceNow() {
  primaryValue = primaryValue.toString();
  primaryValue = primaryValue.slice(0, -1);
  if (primaryValue.length < 1) {
    primaryValue = 0;
  }
  primaryDisplay.textContent = primaryValue;
};

// BUTTON PRESS ANIMATION

const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
  button.addEventListener('mousedown', () => {
    button.style.animation = 'none';
    button.offsetHeight;
    button.style.animation = 'press 0.2s';
    button.classList.add('hold');
  });

  button.addEventListener('mouseup', () => {
    button.classList.remove('hold');
    button.style.animation = 'none';
    button.offsetHeight;
    button.style.animation = 'unpress 0.2s';
  });
});

// CHANGE FONT SIZE TO FIT ON DISPLAY

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    resizeFont();
  });
});

function resizeFont() {
  if (secondaryDisplay.textContent.length <= 12) {
    secondaryDisplay.style.fontSize = '24px';
  }
  if (secondaryDisplay.textContent.length >= 13) {
    secondaryDisplay.style.fontSize = '22,5px';
  }
  if (secondaryDisplay.textContent.length >= 14) {
    secondaryDisplay.style.fontSize = '21px';
  }
  if (secondaryDisplay.textContent.length >= 15) {
    secondaryDisplay.style.fontSize = '19,5px';
  }
  if (secondaryDisplay.textContent.length >= 16) {
    secondaryDisplay.style.fontSize = '18px';
  }

  if (primaryDisplay.textContent.length <= 12) {
    primaryDisplay.style.fontSize = '48px';
  }
  if (primaryDisplay.textContent.length >= 13) {
    primaryDisplay.style.fontSize = '45px';
  }
  if (primaryDisplay.textContent.length >= 14) {
    primaryDisplay.style.fontSize = '42px';
  }
  if (primaryDisplay.textContent.length >= 15) {
    primaryDisplay.style.fontSize = '39px';
  }
  if (primaryDisplay.textContent.length >= 16) {
    primaryDisplay.style.fontSize = '36px';
  }
};

// PREVENT DEFAULT

// buttons.forEach((button) => {
//   button.addEventListener("click", function(event){
//     event.preventDefault();
//   });
// });


// KEYBOARD SUPPORT

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0') && (e.key <= '9') || (e.key === '.')) {
    numberInput(e);
  }

  if (e.key == '+' || e.key == '-') {
    operatorNow(e);
  }

  if (e.key == '*') {
    operatorNow(e);
  }

  if (e.key == '/') {
    operatorNow(e);
  }

  if (e.key == '=' || e.key == 'Enter') {
    equalsNow();
  };

  if (e.key == 'Backspace') {
    backspaceNow();
  };

  if (e.key === 'Escape') {
    clearAll();
  };

  resizeFont();
});