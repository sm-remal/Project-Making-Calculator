let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let displayInput = '';

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    displayInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (firstOperand !== '') calculateResult(); 
    operator = op;
    firstOperand = currentInput;
    currentInput = '';
    displayInput += ` ${op} `;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    displayInput = '';
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        displayInput = `-${displayInput}`;
        updateDisplay();
    }
}

function appendPercentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        displayInput += '%';
        updateDisplay();
    }
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        displayInput += '.';
        updateDisplay();
    }
}

function calculateResult() {
    if (currentInput === '' || firstOperand === '') return; 
    secondOperand = currentInput;
    let result = 0;

    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '−':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '×':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '÷':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    displayInput = currentInput;
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = displayInput || '0'; 
}
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'AC') {
            clearDisplay();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '%') {
            appendPercentage();
        } else if (value === '=') {
            calculateResult();
        } else {
            appendOperator(value);
        }
    });
});