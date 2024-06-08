const display = document.querySelector('#display');
const historyDisplay = document.querySelector('#history');
let memory = 0;
let currentOperation = null;
let currentNumber = '';
let history = [];
let previousNumber = null;

function appendNumber(number) {
    currentNumber += number;
    display.textContent = currentNumber;
}

function setOperation(operation) {
    if (currentOperation !== null) {
        compute();
    } else {
        memory = parseFloat(currentNumber);
    }
    currentOperation = operation;
    display.textContent = currentNumber + ' ' + currentOperation;
    currentNumber = '';
}

function compute() {
    if (currentOperation !== null) {
        const [num1, num2] = [memory, parseFloat(currentNumber)];
        let result;
        switch (currentOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        display.textContent = memory + ' ' + currentOperation + ' ' + currentNumber + ' = ' + result;
        history.push(memory + ' ' + currentOperation + ' ' + currentNumber + ' = ' + result);
        updateHistory();
        memory = result;
        currentOperation = null;
        currentNumber = '';
    }
}

function clearDisplay() {
    memory = 0;
    currentNumber = '';
    currentOperation = null;
    display.textContent = '0';
    history = [];
    updateHistory();
}

function storeMemory() {
    memory = parseFloat(currentNumber);
    currentNumber = '';
    display.textContent = '0';
}

function recallMemory() {
    currentNumber = '' + memory;
    display.textContent = currentNumber;
}

function addToMemory() {
    memory += parseFloat(currentNumber);
    currentNumber = '';
    display.textContent = '0';
}

function updateHistory() {
    historyDisplay.innerHTML = history.slice(-20).join('<br>');
}

function toggleHistory() {
    historyDisplay.classList.toggle('show');
}

// Funciones adicionales
function calculateFraction() { /* ... */ }
function calculateSquareRoot() { /* ... */ }
function calculatePower() { /* ... */ }
function calculatePercentage() { /* ... */ }
