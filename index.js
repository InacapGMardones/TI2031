const input = document.getElementById('calculatorNumber');
const calculScreen = document.getElementById('calculatorCalculScreen');

let previousNumber = 0;
let isWaiting = false;
let operatorType = '';
let onResult = false;
let firstNumberEntered = false;
let history = JSON.parse(localStorage.getItem('history')) || [];
let memory = 0;


function addToHistory(expression, result) {
    const timestamp = new Date().toLocaleString();
    history.push({ expression, result, timestamp });
    if (history.length > 10) {
        history.shift();
    }
    localStorage.setItem('history', JSON.stringify(history));
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(item => {
        const dd = document.createElement('dd');
        dd.textContent = `${item.expression} = ${item.result} (${item.timestamp})`;
        historyList.appendChild(dd);
    });
    localStorage.setItem('history', JSON.stringify(history));
}



function clearMemory() {
    memory = 0;
    localStorage.setItem('history', JSON.stringify(history));
}

function readMemory() {
    input.value = memory;
}

function saveToMemory() {
    memory = Number(input.value);
}

function addToMemory() {
    memory += Number(input.value);
}

function subtractFromMemory() {
    memory -= Number(input.value);
}

function clearAll(){
    input.value = 0;
    calculScreen.innerHTML = '&emsp;';
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
}

function addNumber(number){
    if(number === '.' && input.value.includes('.')) return;

    if((isWaiting && firstNumberEntered) || onResult || (input.value.startsWith('0') && number !== '.' && !input.value.includes('.'))){
        input.value = number;
        onResult = false;
        firstNumberEntered = false;
    }else input.value += number;
}

function operation(operator, e){
    operatorType = operator;
    previousNumber = Number(input.value);
    calculScreen.innerText = `${previousNumber}${e.innerText}`;
    isWaiting = true;
    firstNumberEntered = true;
}

function opInverse(){

    input.value = input.value.length !== 0 ? -input.value : 0;
}

function delLastNumber(){
    input.value = input.value.length === 1 ? 0 : input.value.substring(0, input.value.length - 1);
}

function operationInstant(operator){
    const currentNumber = Number(input.value);
    switch(operator){
        case '%':
            input.value = currentNumber / 100;
            break;
        case 'pi':
            input.value = Math.PI;
            break;
        case '1/x':
            input.value = 1 / currentNumber;
            break;
        case 'x2':
            input.value = currentNumber**2;
            break;
        case '2/x':
            input.value = Math.sqrt(currentNumber);
            break;
        default:
            alert('AN ERROR OCCUR!');
            break;
    }
}

function opEqual(){
    if(!isWaiting) return;

    onResult = true;

    const lastNumber = Number(input.value);
    let answer = 0;

    calculScreen.innerHTML += `${lastNumber}&equals;`;

    switch(operatorType){
        case '%':
            break;
        case '/':
            answer = previousNumber / lastNumber;
            break;
        case 'x':
            answer = previousNumber * lastNumber;
            break;
        case '-':
            answer = previousNumber - lastNumber;
            break;
        case '+':
            answer = previousNumber + lastNumber;
            break;
        default:
            alert('AN ERROR OCCUR!');
            break;
    }

    input.value = answer;
    isWaiting = false;
    addToHistory(`${previousNumber} ${operatorType} ${lastNumber}`, answer);
    updateHistory(); 
}
