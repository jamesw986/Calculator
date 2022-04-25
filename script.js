// Maths functions

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case 'x':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
    }
}

// Declarations
let topScreen = document.getElementById('top-screen');
let bottomScreen = document.getElementById('bottom-screen');
let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalsButton = document.getElementById('equals');
let clearButton = document.getElementById('clear');
let plusMinusButton = document.getElementById('plus-minus');
let decimalButton = document.getElementById('decimal');
let decimalPlaces = document.getElementById('decimal-places');
let backspace = document.getElementById('backspace');

let firstNum = '';
let secondNum = '';
let currentOperation = null;
let equalsPressed = false;
let screenToBeCleared = false;
let decimalPoint = false;

// Event Listeners

// Backspace from latest number provided
backspace.addEventListener('click', () => {
    let len = bottomScreen.textContent.length;

    if (bottomScreen.textContent === '') return;

    if (bottomScreen.textContent.length === 1) {
        bottomScreen.textContent = '0';
        return;
    }

    bottomScreen.textContent = bottomScreen.textContent.slice(0, len - 1);
})

// Add decimal point
decimalButton.addEventListener('click', () => {
    if (equalsPressed) {
        clear();
        bottomScreen.textContent = '0.';
        return;
    }

    if (bottomScreen.textContent.includes('.')) {
        return;
    }

    bottomScreen.textContent += '.';
})

// Change sign of current number
plusMinusButton.addEventListener('click', () => {
    let num = bottomScreen.textContent;
    let newNum = num * -1;
    bottomScreen.textContent = newNum.toString();
})

// Clear screen
clearButton.addEventListener('click', clear);

// Populate display when number buttons clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (screenToBeCleared) {
            clear();
            screenToBeCleared = false;
        }

        if (equalsPressed) {
            clear();
            equalsPressed = false;
        }

        if (bottomScreen.textContent === '0') clear();

        bottomScreen.textContent += button.textContent;
    })
})

// Set operation when an operator is clicked
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        equalsPressed = false;
        if (secondNum !== '') {
            currentOperation = null;
        }

        if (currentOperation !== null) calculate();

        // Handle user trying to click operator button without providing first operand
        else if (bottomScreen.textContent === '') {
            clear();
            return;
        }
        
        else
        {
            currentOperation = button.textContent;
            firstNum = bottomScreen.textContent;
            topScreen.textContent = firstNum + ' ' + button.textContent;
            bottomScreen.textContent = '';
        }
    })
})

// Perform calculation when equals button clicked
equalsButton.addEventListener('click', () => {
    // Repeat previous operation on latest result
    if (equalsPressed) {
        firstNum = bottomScreen.textContent;
        let result = operate(parseFloat(firstNum), parseFloat(secondNum), currentOperation);
        topScreen.textContent = firstNum + ' ' + currentOperation + ' ' + secondNum + ' ' + equalsButton.textContent;

         if (Number.isInteger(result)) {
             bottomScreen.textContent = result;
        } else {
            bottomScreen.textContent = result.toFixed(decimalPlaces.value);
        }
    } else {
        calculate();
        equalsPressed = true;
    }
})

// Calculate current operation
function calculate() {
    secondNum = bottomScreen.textContent

    // Handle user selecting operator as second operand
    if (secondNum === '') {
        return;
    }

    // Handle divide by zero
    if (secondNum === '0' && currentOperation === '/') {
        bottomScreen.textContent = 'Cannot divide by zero';
        screenToBeCleared = true;
        return;
    }
    let result = operate(parseFloat(firstNum), parseFloat(secondNum), currentOperation);
    topScreen.textContent += ' ' + secondNum + ' ' + equalsButton.textContent;

    if (Number.isInteger(result)) {
        bottomScreen.textContent = result;
    } else {
        bottomScreen.textContent = result.toFixed(decimalPlaces.value);
    }
}

function clear() {
    topScreen.textContent = '';
    bottomScreen.textContent = '';
    firstNum = '';
    secondNum = '';
    currentOperation = null;
    screenToBeCleared = false;
    equalsPressed = false;
}