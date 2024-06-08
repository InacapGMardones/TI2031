let resultInput = document.getElementById('result');
let historyList = document.getElementById('historyList');
let historyModal = document.getElementById('history');
let memoryModal = document.getElementById('memory');
let memoryList = document.getElementById('memoryList');
let operations = JSON.parse(localStorage.getItem('operations')) || [];
let memoryHistory = JSON.parse(localStorage.getItem('memoryHistory')) || [];

function clearDisplay() {
    resultInput.value = '';
}

function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

function appendCharacter(char) {
    resultInput.value += char;
}

function calculate() {
    try {
        let expression = resultInput.value.replace(/√/g, 'Math.sqrt').replace(/x²/g, 'Math.pow');
        let result = eval(expression);
        let operation = `${resultInput.value} = ${result}`;
        operations.push(operation);
        if (operations.length > 10) {
            operations.shift();
        }
        localStorage.setItem('operations', JSON.stringify(operations));
        displayHistory();
        resultInput.value = result;
    } catch (error) {
        resultInput.value = 'Error';
    }
}

function displayHistory() {
    historyList.innerHTML = '';
    operations.forEach(op => {
        let li = document.createElement('li');
        li.textContent = op;
        historyList.appendChild(li);
    });
}

function memoryClear() {
    memoryHistory = [];
    localStorage.setItem('memoryHistory', JSON.stringify(memoryHistory));
    displayMemoryHistory();
}

function memoryRecall() {
    if (memoryHistory.length > 0) {
        resultInput.value = memoryHistory[memoryHistory.length - 1];
    }
}

function memoryAdd(index) {
    if (memoryHistory.length > 0) {
        memoryHistory[index] += parseFloat(resultInput.value) || 0;
    } else {
        memoryHistory.push(parseFloat(resultInput.value) || 0);
    }
    localStorage.setItem('memoryHistory', JSON.stringify(memoryHistory));
    displayMemoryHistory();
}

function memorySubtract(index) {
    if (memoryHistory.length > 0) {
        memoryHistory[index] -= parseFloat(resultInput.value) || 0;
    } else {
        memoryHistory.push(-parseFloat(resultInput.value) || 0);
    }
    localStorage.setItem('memoryHistory', JSON.stringify(memoryHistory));
    displayMemoryHistory();
}

function memorySave() {
    memoryHistory.push(parseFloat(resultInput.value) || 0);
    localStorage.setItem('memoryHistory', JSON.stringify(memoryHistory));
    displayMemoryHistory();
}

function toggleHistory() {
    if (historyModal.style.display === "none" || historyModal.style.display === "") {
        historyModal.style.display = "block";
    } else {
        historyModal.style.display = "none";
    }
}

function toggleMemory() {
    if (memoryModal.style.display === "none" || memoryModal.style.display === "") {
        displayMemoryHistory();
        memoryModal.style.display = "block";
    } else {
        memoryModal.style.display = "none";
    }
}

function clearHistory() {
    operations = [];
    localStorage.setItem('operations', JSON.stringify(operations));
    displayHistory();
}

function clearMemoryHistory() {
    memoryHistory = [];
    localStorage.setItem('memoryHistory', JSON.stringify(memoryHistory));
    displayMemoryHistory();
}

function displayMemoryHistory() {
    memoryList.innerHTML = '';
    memoryHistory.forEach((mem, index) => {
        let li = document.createElement('li');
        li.className = 'memory-item';
        li.innerHTML = `
            <span>${mem}</span>
            <div class="memory-controls">
                <button onclick="memoryClear()">MC</button>
                <button onclick="memoryAdd(${index})">M+</button>
                <button onclick="memorySubtract(${index})">M-</button>
            </div>
        `;
        memoryList.appendChild(li);
    });
}

window.onload = displayHistory;

// Agregar atajos de teclado
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch (event.key) {
            case 'l':
                memoryClear();
                break;
            case 'r':
                memoryRecall();
                break;
            case 'm':
                memorySave();
                break;
            case 'p':
                memoryAdd(memoryHistory.length - 1);
                break;
            case 'q':
                memorySubtract(memoryHistory.length - 1);
                break;
        }
    } else {
        switch (event.key) {
            case 'Escape':
                clearDisplay();
                break;
            case 'Delete':
                deleteLast();
                break;
        }
    }
});
