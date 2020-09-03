const calculator = {
    operationArray: [],
    valueArray: [],
    numberInputAllowed: true,
    decimalAllowed: true,
    displayValue: 0,
}

const display = document.querySelector('#numbers');
display.textContent = calculator.displayValue;

const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        checkValidInput(button.dataset.number);
    })
});

const decimalButton = document.querySelector('.decimal-button');
decimalButton.addEventListener('click', () => {
    if (calculator.decimalAllowed) {
        checkValidInput(decimalButton.dataset.number);
        calculator.decimalAllowed = false;
    }
});

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {
    clearValues();
});

const plusMinusButton = document.querySelector('.plus-minus-button');
plusMinusButton.addEventListener('click', () => {
    changeSign();
});

const percentageButton = document.querySelector('.percentage-button');
percentageButton.addEventListener('click', () => {
    getPercent();
});

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.dataset.operator)
    });
});

const equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener('click', () => {
    if (calculator.operationArray.length > 0 && calculator.displayValue !== 0) {
        calculateEquals();
    }
    calculator.decimalAllowed = true;
});