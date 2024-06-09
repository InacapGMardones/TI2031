
// funcion de limplieza de mathdisplay para usar dentro de las funciones
function clearMathDisplay() {
    const mathDisplay = document.getElementById('mathDisplay');
    mathDisplay.innerHTML = '';
}
;

document.addEventListener('DOMContentLoaded', function() {
    const mathDisplay = document.getElementById('mathDisplay');
    let currentExpression = '';

    function updateMathDisplay() {
        mathDisplay.innerHTML = `\\[${currentExpression}\\]`;
        MathJax.typesetPromise();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            const operator = this.getAttribute('data-operator');
            const option = this.getAttribute('data-option');

            if (value) {
                currentExpression += value;
                saveCurrentExpression(currentExpression);
            } else if (operator) {
                switch (operator) {
                    case 'percent':
                        try {
                            const result = eval(currentExpression) / 100;
                            currentExpression = result.toString();
                        } catch {
                            currentExpression = 'Error';
                        }
                        break;
                    case 'fraction':
                        currentExpression += '1/';
                        break;
                    case 'pow':
                        currentExpression += '^2';
                        break;
                    case 'sqrt':
                        if (currentExpression) {
                            try {
                                let result = eval(currentExpression);
                                result = Math.sqrt(result);
                                currentExpression = result.toString();
                            } catch {
                                currentExpression = 'Error';
                            }
                        }
                        break;
                    case 'divide':
                        currentExpression += '/';
                        break;
                    case 'multiply':
                        currentExpression += '*';
                        break;
                    case 'minus':
                        currentExpression += '-';
                        break;
                    case 'plus':
                        currentExpression += '+';
                        break;
                    case 'reverse':
                        if (currentExpression) {
                            try {
                                let result = eval(currentExpression);
                                result = -result;
                                currentExpression = result.toString();
                            } catch {
                                currentExpression = 'Error';
                            }
                        }
                        break;
                    case 'equal':
                        try {
                            const result = eval(currentExpression.replace('^2', '**2'));
                            addHistoryItem(currentExpression, result);
                            currentExpression = result.toString();
                        } catch {
                            currentExpression = 'Error';
                        }
                        break;
                }
            } else if (option) {
                switch (option) {
                    case 'clearEntry':
                        currentExpression = '';
                        break;
                    case 'clear':
                        currentExpression = '';
                        break;
                    case 'undo':
                        currentExpression = currentExpression.slice(0, -1);
                        break;
                    case 'dot':
                        currentExpression += '.';
                        break;
                }
            }
            localStorage.setItem('currentExpression', currentExpression);
            updateMathDisplay();
        });
    });

    function saveCurrentExpression(expression) {
        localStorage.setItem('currentExpression', expression);
        console.log(expression);
    }

    const history = document.getElementById('history');
    const MAX_HISTORY_ITEMS = 10;

    function addHistoryItem(operation, result) {
        // Verifica si hay más de 10 elementos en el historial
        if (history.children.length >= MAX_HISTORY_ITEMS) {
            // Si hay más de 10 elementos, elimina el primero
            history.removeChild(history.children[0]);
        }

        // Crea la nueva fila
        const row = document.createElement('tr');
        const operationCell = document.createElement('td');
        const resultCell = document.createElement('td');
        const dateCell = document.createElement('td');
        operationCell.textContent = operation;
        resultCell.textContent = result;
        dateCell.textContent = new Date().toLocaleString();
        row.appendChild(operationCell);
        row.appendChild(resultCell);
        row.appendChild(dateCell);

        // Agregar botones de eliminar fila y editar fila tamaño pequeño usando fontawesome
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-xs"></i>';
        deleteButton.addEventListener('click', function() {
            deleteRow(row);
        });
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-solid fa-edit fa-xs"></i>';
        editButton.addEventListener('click', function() {
            editRow(row);
        });
        row.appendChild(deleteButton);
        row.appendChild(editButton);

        // Agrega la nueva fila al final del historial
        history.appendChild(row);

        // Actualiza el localStorage
        updateLocalStorage();
    }

    function deleteRow(row) {
        history.removeChild(row);
        updateLocalStorage();
    }

    function editRow(row) {
        const newOperation = prompt('Editar operación:', row.children[0].textContent);
        const newResult = prompt('Editar resultado:', row.children[1].textContent);
        if (newOperation !== null && newResult !== null) {
            row.children[0].textContent = newOperation;
            row.children[1].textContent = newResult;
            updateLocalStorage();
        }
    }

    function updateLocalStorage() {
        // Guarda las últimas 10 operaciones en localStorage
        const historyItems = [];
        history.querySelectorAll('tr').forEach(row => {
            const operation = row.children[0].textContent;
            const result = row.children[1].textContent;
            historyItems.push({ operation, result });
        });
        localStorage.setItem('operations', JSON.stringify(historyItems));
    }

    // Recuperar y mostrar el historial de localStorage debe mostrar un listado con las últimas 10 operaciones realizadas y su respectivo resultado.
    const operations = JSON.parse(localStorage.getItem('operations')) || [];
    operations.slice(-MAX_HISTORY_ITEMS).forEach(item => {
        addHistoryItem(item.operation, item.result);
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const operator = this.getAttribute('data-operator');
            if (operator === 'equal') {
                const currentExpression = localStorage.getItem('currentExpression');
                try {
                    const result = eval(currentExpression.replace('^2', '**2'));
                    addHistoryItem(currentExpression, result);
                    currentExpression = result.toString();
                    localStorage.setItem('currentExpression', currentExpression);
                } catch {
                    mathDisplay.value = 'Error';
                }
                updateMathDisplay();
            }
        });
    });
});

// memoria
document.addEventListener('DOMContentLoaded', function() {
    const memory = document.getElementById('memory');
    const MAX_MEMORY_ITEMS = 10;
    let memoryValue = parseFloat(localStorage.getItem('memoryValue')) || 0;

    function addMemoryItem(operation, result) {
        // Verifica si hay más de 10 elementos en el historial de memoria
        if (memory.children.length >= MAX_MEMORY_ITEMS) {
            // Si hay más de 10 elementos, elimina el primero
            memory.removeChild(memory.children[0]);
        }

        // Crea la nueva fila
        const row = document.createElement('tr');
        const resultCell = document.createElement('td');
        const dateCell = document.createElement('td');
        resultCell.textContent = result;
        dateCell.textContent = new Date().toLocaleString();
        row.appendChild(resultCell);
        row.appendChild(dateCell);

        // Agregar botones de eliminar fila y editar fila tamaño pequeño usando fontawesome
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-xs"></i>';
        deleteButton.addEventListener('click', function() {
            deleteRow(row);
        });
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-solid fa-edit fa-xs"></i>';
        editButton.addEventListener('click', function() {
            editRow(row);
        });
        row.appendChild(deleteButton);
        row.appendChild(editButton);

        // Agrega la nueva fila al final del historial de memoria
        memory.appendChild(row);

        // Actualiza el localStorage
        updateMemoryLocalStorage();
    }

    function deleteRow(row) {
        memory.removeChild(row);
        updateMemoryLocalStorage();
    }

    function editRow(row) {
        const newMemory = prompt('Editar memoria:', row.children[0].textContent);
        if (newMemory !== null) {
            row.children[0].textContent = newMemory;
            updateMemoryLocalStorage();
        }
    }

    function updateMemoryLocalStorage() {
        // Guarda las últimas 10 operaciones de memoria en localStorage
        const memoryItems = [];
        memory.querySelectorAll('tr').forEach(row => {
            const operation = row.children[0].textContent;
            const result = row.children[1].textContent;
            memoryItems.push(result);
        });
        localStorage.setItem('memoryOperations', JSON.stringify(memoryItems));
    }

    // Recuperar y mostrar el historial de memoria de localStorage
    const memoryOperations = JSON.parse(localStorage.getItem('memoryOperations')) || [];
    memoryOperations.slice(-MAX_MEMORY_ITEMS).forEach(item => {
        addMemoryItem('Memory', item);
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const option = this.getAttribute('data-option');

            if (option) {
                switch (option) {
                    case 'mc':
                        // Borra el historial de memoria
                        localStorage.removeItem('memoryOperations');
                        memory.innerHTML = '';
                        break;
                    case 'mr': // Muestra el último dato guardado en el mathdisplay
                        mathDisplay.value = memoryValue;
                        currentExpression = memoryValue.toString();
                        break;
                    case 'ms':
                        const currentExpressionMS = localStorage.getItem('currentExpression');
                        if (currentExpressionMS) {
                            memoryValue = eval(currentExpressionMS);
                            localStorage.setItem('memoryValue', memoryValue);
                            addMemoryItem('Memory', memoryValue);
                            clearMathDisplay(); // Limpia el mathdisplay
                        }
                        break;
                    case 'm+':
                        const currentExpressionMPlus = localStorage.getItem('currentExpression');
                        if (currentExpressionMPlus) {
                            memoryValue += eval(currentExpressionMPlus);
                            localStorage.setItem('memoryValue', memoryValue);
                            addMemoryItem('Memory', memoryValue);
                            mathDisplay.value = memoryValue;
                        }
                        break;
                    case 'm-':
                        // toma el mathdisplay y lo resta a la memoria y lo muestra en el mathdisplay
                        const currentExpressionMMinus = localStorage.getItem('currentExpression');
                        if (currentExpressionMMinus) {
                            memoryValue -= eval(currentExpressionMMinus);
                            localStorage.setItem('memoryValue', memoryValue);
                            addMemoryItem('Memory', memoryValue);
                            mathDisplay.value = memoryValue;
                            /// muestra el resultado en el mathdisplay
                            return memoryValue;
                            
    
                        }
                        break;
                }
            }
        });
    });
});



// activar cards al hacer click en el botón history

const historyCard = document.getElementById('history-card');
const memoryCard = document.getElementById('memory-card');

document.getElementById('btn-m-plus').addEventListener('click', function() {
    if (historyCard.style.display === 'none') {
        historyCard.style.display = 'block';
    } else {
        historyCard.style.display = 'none';
    }
});

document.getElementById('btn-m-minus').addEventListener('click', function() {
    if (memoryCard.style.display === 'none') {
        memoryCard.style.display = 'block';
    } else {
        memoryCard.style.display = 'none';
    }
});
