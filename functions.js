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
    if (calculator.numberInputAllowed) {
        // If displayValue is zero replace it with any num except zero
        // If num is a decimal point make display "0."
        if ((calculator.displayValue === 0 || calculator.displayValue === "0") && num !== 0) {
            if (num === ".") {
                calculator.displayValue = "0.";
            } else {
                calculator.displayValue = num;
            }
        }
        // Else if displayValue is a number concatenate num to it
        else {
            calculator.displayValue += num;
        }

        updateDisplay(roundToFit(calculator.displayValue));
    }
}

const clearValues = () => {
    updateDisplay(0);
    calculator.valueArray.splice(0, calculator.valueArray.length);
    calculator.operationArray.splice(0, calculator.operationArray.length);
    calculator.decimalAllowed = true;
    calculator.numberInputAllowed = true;
}

const changeSign = () => {
    updateDisplay(calculator.displayValue * -1);
}

const getPercent = () => {
    updateDisplay(operate('/', calculator.displayValue, 100));
}

const roundToFit = (value) => {
    const numberLength = value.toString().split('').length;
    // Don't parseFloat if last digit was a decimal point
    if (value.toString().slice(-1) === ".") {
        return value;
    } else {
        // If display is full disable adding more numbers
        if (numberLength > 7) {
            calculator.numberInputAllowed = false;
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
    calculator.valueArray.push(calculator.displayValue);
    if (calculator.operationArray.length > 0) {
        calculate();
    }
    calculator.displayValue = '';
    calculator.operationArray.push(operator);
    calculator.decimalAllowed = true;
    calculator.numberInputAllowed = true;
}

const calculateEquals = () => {
    calculator.valueArray.push(calculator.displayValue);
    finalValue = operate(calculator.operationArray[0], calculator.valueArray[calculator.valueArray.length - 2], calculator.valueArray[calculator.valueArray.length - 1]);
    calculator.valueArray.splice(0, 1);
    calculator.operationArray.splice(0, 1);
    updateDisplay(roundToFit(finalValue));
}

const calculate = () => {
    finalValue = operate(calculator.operationArray[0], calculator.valueArray[calculator.valueArray.length - 2], calculator.valueArray[calculator.valueArray.length - 1]);
    calculator.valueArray.splice(0, 2);
    calculator.operationArray.splice(0, 1)
    calculator.valueArray.push(finalValue);
    updateDisplay(roundToFit(finalValue));
}

const updateDisplay = (value) => {
    calculator.displayValue = value;
    display.textContent = calculator.displayValue;
}