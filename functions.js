const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}

const checkValidInput = (num) => {
    if (numberInputAllowed) {
        // If displayValue is zero replace it with any num except zero
        // If num is a decimal point make display "0."
        if ((displayValue === 0 || displayValue === "0") && num !== 0) {
            if (num === ".") {
                displayValue = "0.";
            } else {
                displayValue = num;
            }
        }
        // Else if displayValue is a number concatenate num to it
        else {
            displayValue += num;
        }

        updateDisplay(roundToFit(displayValue));
    }
}

const clearValues = () => {
    updateDisplay(0);
    valueArray.splice(0, valueArray.length);
    operationArray.splice(0, operationArray.length);
    decimalAllowed = true;
    numberInputAllowed = true;
}

const changeSign = () => {
    updateDisplay(displayValue * -1);
}

const getPercent = () => {
    updateDisplay(operate('/', displayValue, 100));
}

const roundToFit = (value) => {
    const numberLength = value.toString().split('').length;
    // Don't parseFloat if last digit was a decimal point
    if (value.toString().slice(-1) === ".") {
        return value;
    } else {
        // If display is full disable adding more numbers
        if (numberLength > 7) {
            numberInputAllowed = false;
            if (value.toString().split('').includes('.') && !value.toString().split('').includes('e')) {
                return parseFloat(value).toPrecision(7);
            } else {
                return parseFloat(value).toPrecision(3);
            }
        } else {
            return parseFloat(value);

        }
    }
}

const handleOperatorClick = (operator) => {
    // If there is one or more operator in the array need to do the calculation here
    valueArray.push(displayValue);
    if (operationArray.length > 0) {
        calculate();
    }
    displayValue = '';
    operationArray.push(operator);
    decimalAllowed = true;
    numberInputAllowed = true;
}

const calculateEquals = () => {
    valueArray.push(displayValue);
    finalValue = operate(operationArray[0], valueArray[valueArray.length - 2], valueArray[valueArray.length - 1]);
    valueArray.splice(0, 1);
    operationArray.splice(0, 1);
    updateDisplay(roundToFit(finalValue));
}

const calculate = () => {
    finalValue = operate(operationArray[0], valueArray[valueArray.length - 2], valueArray[valueArray.length - 1]);
    valueArray.splice(0, 2);
    operationArray.splice(0, 1)
    valueArray.push(finalValue);
    console.log(finalValue);
    updateDisplay(roundToFit(finalValue));
}

const updateDisplay = (value) => {
    displayValue = value;
    display.textContent = displayValue;
}