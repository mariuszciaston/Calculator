// NUMBERS


let selectedNumber = 0;
let selectedValue = '';
const numbers = document.querySelectorAll('.num');

let primaryValue = 0;
let secondaryValue = '';

const secondaryDisplay = document.querySelector('.secondary');
const primaryDisplay = document.querySelector('.primary');
secondaryDisplay.textContent = secondaryValue;
primaryDisplay.textContent = primaryValue;

let clickCounter = 0;
const error = "cant divide by 0";

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {

        if (primaryValue == error) {
            clearAll();
        };

        if (primaryValue.length == undefined || primaryValue.length < 16) {
            selectedNumber = e.target.textContent;
            selectedValue += selectedNumber;
            
            clickCounter++;
            if ((clickCounter < 2) || (primaryValue == 0)) {
                primaryValue = selectedNumber;
            } else {
                primaryValue += selectedNumber;
            }
            
            
            primaryDisplay.textContent = primaryValue;
            
            
            
            // console.log(selectedNumber);
            // console.log(selectedValue);
        }

    });
});

// OPERATORS

let firstNumber = '';
let selectedOperator = '';
let secondNumber = '';

// let operation = [firstNumber, selectedOperator, secondNumber];

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {

    
        // operator.disabled = true;
        // operator.classList.add('disabled');

        secondNumber = Number(selectedValue);
       if ((firstNumber != '') && (selectedOperator != '') && (secondNumber != '')){
     

           
           equalsNow();
           
    }


        // resizeFont();
        selectedOperator = e.target.textContent;



        
        // if (
            //     (firstNumber != '') && (selectedOperator != '') && (secondNumber != '')
            //     ){
                
                
                //     };
                
                

        // console.log(selectedOperator);


        primaryValue = primaryDisplay.textContent


        firstNumber = Number(primaryValue);
        // operation = [firstNumber, selectedOperator, secondNumber];
        
        
        // secondaryValue = primaryValue;
        // secondaryValue += selectedOperator;
        // secondaryDisplay.textContent = secondaryValue;
        secondaryDisplay.textContent = firstNumber + selectedOperator;
        
        
        selectedValue = '';
        // selectedValue += primaryValue;

        
        if (selectedOperator) {
            primaryValue = '';
            
            // primaryDisplay.textContent = primaryValue;
            
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
        primaryValue = error;
        primaryDisplay.textContent = primaryValue;

        backspace.classList.add('disabled');
        backspace.disabled = true;

        operators.forEach((operator) => {
            operator.classList.add('disabled');
            operator.disabled = true;

        })
        decimal.classList.add('disabled');
        decimal.disabled = true;


        // document.querySelector('#button').disabled = true;



        // if (primaryValue != error){


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


    secondNumber = Number(selectedValue);

    if ((firstNumber != '') && (selectedOperator != '') && (secondNumber != '')){
    
    equalsNow();
    }
    
    
    




});

function equalsNow() {
    if (primaryValue == error) {
        clearAll();
    } else if (
        (firstNumber != '') || (selectedOperator != '') || (secondNumber != '')
        ) {


            secondNumber = Number(selectedValue);





            

        // primaryValue += selectedNumber;
        // secondNumber = Number(primaryValue);
        
     
        
        // let operation = [firstNumber, selectedOperator, secondNumber];
        
        
        
        // secondaryValue += secondNumber;
        // secondaryValue += '=';
        // secondaryDisplay.textContent = secondaryValue;
        
        
        // primaryValue = primaryDisplay.textContent;
        
        
        
        
        //         if (primaryValue != ''){
            
            //             secondNumber = Number(selectedValue);
            
            
            
            //         }
            // else{
                //     primaryValue = primaryDisplay.textContent;
//     secondNumber = Number(primaryValue);
// }



// secondNumber = Number(selectedNumber);


result = operate(firstNumber, selectedOperator, secondNumber);
result = result.toPrecision(11).replace(/0+$/, "").replace(/\.$/, "");
primaryValue = result;
secondaryDisplay.textContent = firstNumber + selectedOperator + secondNumber + '=';
primaryDisplay.textContent = primaryValue;
primaryValue = primaryDisplay.textContent;
resizeFont();
firstNumber = result;
    };
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
    selectedNumber = 0;
    selectedValue = '';
    primaryValue = 0;
    secondaryValue = '';
    clickCounter = 0;
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
    })
    decimal.classList.remove('disabled');
    decimal.disabled = false;

    // console.clear();
}

// BACKSPACE

const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', () => {
    primaryValue = primaryValue.toString();
    primaryValue = primaryValue.slice(0, -1);
    if (primaryValue.length < 1) {
        primaryValue = 0;
    }
    primaryDisplay.textContent = primaryValue;
    resizeFont();
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

        console.clear();

        console.log(
            "firstNumber: " + firstNumber,
            "\n",
            "selectedOperator: " + selectedOperator,
            "\n",
            "secondNumber: " + secondNumber
        );


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
}