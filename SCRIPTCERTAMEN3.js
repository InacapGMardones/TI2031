let historial = JSON.parse(localStorage.getItem('historial')) || []; 
let memory = JSON.parse(localStorage.getItem('memory')) || []; 

function addToDisplay(value) { 
    document.getElementById('display').value += value; 
    saveDisplay(); 
}  

function clearDisplay() { 
    document.getElementById('display').value = ''; 
    saveDisplay(); 
}  

function guardarelultimodatoeneldisplay() { 
    let displayValue = document.getElementById('display').value; 
    localStorage.setItem('display', displayValue); 
    historial.push(displayValue); 
    localStorage.setItem('historial', JSON.stringify(historial)); 
} 

function calculate() { 
    guardarelultimodatoeneldisplay(); 
    try { 
        const result = eval(document.getElementById('display').value);   
        document.getElementById('display').value = result;  
        saveResult(result);  
    } catch (error) {  
        document.getElementById('display').value = 'Error'; 
        saveResult('Error'); 
    } 
    guardarelultimodatoeneldisplay(); 
} 

function exp2(){
    guardarelultimodatoeneldisplay();
    const displayValue = document.getElementById('display').value;
    const number = parseFloat(displayValue);
    const square = Math.pow(number, 2);
    document.getElementById('display').value = square;
    saveResult(square);
    historial.push(square);
    saveResult(square);
}

function transafrac() {
    guardarelultimodatoeneldisplay();
    const displayValue = document.getElementById('display').value;
    const number = parseFloat(displayValue);
    const fraction = 1 / number;
    document.getElementById('display').value = fraction;
    saveResult(fraction);
    historial.push(fraction);
    saveResult(fraction);
}

function porcentaje() {
    guardarelultimodatoeneldisplay();
    const displayValue = document.getElementById('display').value;
    const number = parseFloat(displayValue);
    const percent = number / 100;
    document.getElementById('display').value = percent;
    saveResult(percent);
    historial.push(percent);
    saveResult(percent);
}

function raizcuadrada() { 
    guardarelultimodatoeneldisplay(); 
    const displayValue = document.getElementById('display').value; 
    const number = parseFloat(displayValue);  
    const squareRoot = Math.sqrt(number); 
    document.getElementById('display').value = squareRoot; 
    saveResult(squareRoot); 
    historial.push(squareRoot); 
    saveResult(squareRoot); 
} 

function cambiarsigno() {
    const displayValue = document.getElementById('display').value;
    const number = parseFloat(displayValue);
    const sign = -number;
    document.getElementById('display').value = sign;
    saveResult(sign);
}

function borrar() {
    const displayValue = document.getElementById('display').value;
    const newValue = displayValue.slice(0, -1);
    document.getElementById('display').value = newValue;
    saveDisplay();
}

function saveResult(result) { 
    localStorage.setItem('result', result); 
} 

function borrarhistorial() { 
    historial = []; 
    localStorage.setItem('historial', JSON.stringify(historial)); 
    localStorage.removeItem('result'); 
    localStorage.removeItem('display'); 
} 

function memoryClear() { 
    memory = []; 
    localStorage.setItem('memory', JSON.stringify(memory));  
    localStorage.removeItem('display'); 
} 


function memoryRecall() { 
    const memoria = JSON.parse(localStorage.getItem('memory'));
    if (memoria.length === 0) {
        return; // Exit the function if there are no data in the historial
    }
    const memoryValue = memoria[memoria.length - 1]; 
    document.getElementById('display').value = memoryValue; 
    saveDisplay(); 
}


function memoryStore() { 
    const displayValue = document.getElementById('display').value; 
    memory.push(displayValue); 
    localStorage.setItem('memory', JSON.stringify(memory)); 
} 

function memoryPlus(value) { 
    const displayValue = document.getElementById('display').value; 
    const memoryValue = memory[memory.length - 1]; 
    const sum = parseFloat(memoryValue) + parseFloat(displayValue); 
    memory[memory.length - 1] = sum.toString(); 
    localStorage.setItem('memory', JSON.stringify(memory)); 
} 

function memoryMinus(value) { 
    const displayValue = document.getElementById('display').value; 
    const memoryValue = memory[memory.length - 1]; 
    const difference = parseFloat(memoryValue) - parseFloat(displayValue); 
    memory[memory.length - 1] = difference.toString(); 
    localStorage.setItem('memory', JSON.stringify(memory)); 
} 

function memoryHistory() { 
    const memory = JSON.parse(localStorage.getItem('memory')); 
    alert(memory.join('\n'));
}

function abrirhistorial() { 
    const historial = JSON.parse(localStorage.getItem('historial')); 
    alert(historial.join('\n')); 
} 

function clearerror() { 
    document.getElementById('display').value = ''; 
    saveDisplay(); 
}

function saveDisplay() { 
    const displayValue = document.getElementById('display').value; 
    localStorage.setItem('display', displayValue); 
}

function loadDisplay() { 
    const displayValue = localStorage.getItem('display'); 
    if (displayValue) { 
        document.getElementById('display').value = displayValue; 
    } 
}

loadDisplay();


