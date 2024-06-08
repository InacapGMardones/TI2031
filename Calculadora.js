let memory = [];

function clearDisplay() {
    document.getElementById('display').value = '';
}

function LimpiarError() {
    let display = document.getElementById('display');
    let value = display.value;
    
    if (value.includes('NaN') || value.includes('Error')) {
        // Eliminar 'NaN' y 'Error' del valor
        display.value = value.replace('NaN', '').replace('Error', '').trim();
    }
}

function appendValue(value) {
    let display = document.getElementById('display');
    display.value += value;
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}


function CalcularResultado() {
    var display = document.getElementById('display');
    var ecuacion = display.value;

    // Verificar si la ecuación está vacía o no contiene una expresión matemática válida
    if (ecuacion.trim() === '' || isNaN(eval(ecuacion))) {
        display.value = 'Error';
        return;
    }

    try {
        var resultado = eval(ecuacion); // Evalúa la ecuación ingresada

        if (!isNaN(resultado)) { // Verifica si el resultado es un número válido
            var ecuacionCompleta = ecuacion + " = " + resultado; // Construye la ecuación completa con resultado

            // Verificar si la ecuación contiene más de un número y operador
            if (ecuacionCompleta !== ecuacion + " = " + ecuacion) {
                historialEcuaciones.push(ecuacionCompleta); // Agrega la ecuación completa al historial solo si no es un número individual
                guardarHistorial(); // Guardar historial actualizado en localStorage
            }

            display.value = resultado; // Muestra el resultado en el display
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error'; // Manejo de error si la ecuación es inválida
    }
}


// Función para parsear y evaluar la ecuación
function parsearEvaluacion(ecuacion) {
    // Reemplaza cualquier coma por punto para asegurarte de manejar correctamente los números decimales
    ecuacion = ecuacion.replace(/,/g, '.');

    // Utiliza eval() para evaluar la ecuación
    return eval(ecuacion);
}
    
function CalcularRaiz() {
    var display = document.getElementById('display');
    var ecuacion = display.value;

    if (ecuacion.trim() === '') return; // Si no hay ecuación, no hacemos nada

    try {
        var resultado = Math.sqrt(parsearEvaluacion(ecuacion)); // Calcula la raíz cuadrada de la ecuación
        var ecuacionCompleta = "√(" + ecuacion + ") = " + resultado; // Construye la ecuación completa con resultado
        historialEcuaciones.push(ecuacionCompleta); // Agrega la ecuación completa al historial
        display.value = resultado; // Muestra el resultado en el display
        guardarHistorial(); // Guardar historial actualizado en localStorage
    } catch {
        display.value = 'Error';
    }
}

function CalcularCuadrado() {
    var display = document.getElementById('display');
    var ecuacion = display.value;

    if (ecuacion.trim() === '') return; // Si no hay ecuación, no hacemos nada

    try {
        var resultado = Math.pow(parsearEvaluacion(ecuacion), 2); // Calcula el cuadrado de la ecuación
        var ecuacionCompleta = ecuacion + "^2 = " + resultado; // Construye la ecuación completa con resultado
        historialEcuaciones.push(ecuacionCompleta); // Agrega la ecuación completa al historial
        display.value = resultado; // Muestra el resultado en el display
        guardarHistorial(); // Guardar historial actualizado en localStorage
    } catch {
        display.value = 'Error';
    }
}

function IntercalarSigno() {
    let display = document.getElementById('display');
    if (display.value !== '') {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.substring(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

function CalcularPorcentaje() {
    var display = document.getElementById('display');
    var ecuacion = display.value;

    if (ecuacion.trim() === '') return; // Si no hay ecuación, no hacemos nada

    try {
        var resultado = parsearEvaluacion(ecuacion) / 100; // Calcula el porcentaje de la ecuación
        var ecuacionCompleta = ecuacion + " /100% = " + resultado; // Construye la ecuación completa con resultado
        historialEcuaciones.push(ecuacionCompleta); // Agrega la ecuación completa al historial
        display.value = resultado; // Muestra el resultado en el display
        guardarHistorial(); // Guardar historial actualizado en localStorage
    } catch {
        display.value = 'Error';
    }
}

function Inverso() {
    var display = document.getElementById('display');
    var ecuacion = display.value;

    if (ecuacion.trim() === '') return; // Si no hay ecuación, no hacemos nada

    var value = parsearEvaluacion(ecuacion);

    if (!isNaN(value) && value !== 0) {
        var resultado = 1 / value; // Calcula el inverso del valor
        var ecuacionCompleta = "1 / " + ecuacion + " = " + resultado; // Construye la ecuación completa con resultado
        historialEcuaciones.push(ecuacionCompleta); // Agrega la ecuación completa al historial
        display.value = resultado; // Muestra el resultado en el display
        guardarHistorial(); // Guardar historial actualizado en localStorage
    } else {
        display.value = 'Error';
    }
}

function Desplegable() {
    const mode = document.getElementById('calculatorMode').value;
    const standardButtons = document.getElementById('standardButtons');
    const scientificButtons = document.getElementById('scientificButtons');

    if (mode === 'standard') {
        standardButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
    } else if (mode === 'scientific') {
        standardButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
    }
}



function LimpiarMemoria() {
    memory = [];
    document.getElementById('display').value = '';
    ActualizarMemoriaSelect();
}

function LLamarMemoria() {
    if (memory.length > 0) {
        // Obtener el último número almacenado en memoria
        let lastMemoryValue = memory[memory.length - 1];
        document.getElementById('display').value = lastMemoryValue;
    } else {
        document.getElementById('display').value = '';
    }
}

function SumarMemoria() {
    let display = parseFloat(document.getElementById('display').value);
    let selectedMemory = parseFloat(document.getElementById('Memoria').value);
    if (!isNaN(display) && !isNaN(selectedMemory)) {
        let newMemory = selectedMemory + display;
        memory[memory.indexOf(selectedMemory)] = newMemory;
        document.getElementById('display').value = newMemory;
        ActualizarMemoriaSelect();
    }
}

function RestarMemoria() {
    let display = parseFloat(document.getElementById('display').value);
    let selectedMemory = parseFloat(document.getElementById('Memoria').value);
    if (!isNaN(display) && !isNaN(selectedMemory)) {
        let newMemory = selectedMemory - display;
        memory[memory.indexOf(selectedMemory)] = newMemory;
        document.getElementById('display').value = newMemory;
        ActualizarMemoriaSelect();
    }
}

function GuardarMemoria() {
    let display = parseFloat(document.getElementById('display').value);
    if (!isNaN(display)) {
        memory.push(display);
        ActualizarMemoriaSelect();
    }
}

function MostrarMemoria() {
    ("Memoria: " + memory.join(', '));
}

function ActualizarMemoriaSelect() {
    let select = document.getElementById('Memoria');
    select.innerHTML = '';
    select.innerHTML = "<option id='SelectMemoria' value='M' selected>M</option>"; // Restablecer la opción 'M'
    memory.forEach(value => {
        let option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}


var historialEcuaciones = [];

function ActivarHistorial() {
    var historialDis = document.getElementById('historial-dis');
    historialDis.innerHTML = "";

    // Agregar el título del historial
    historialDis.innerHTML += "<h3 class='Tit-Historial'>Historial</h3>";

    var start = Math.max(0, historialEcuaciones.length - 15); // Comenzar desde el índice que deja solo las últimas 15 operaciones
    var end = historialEcuaciones.length; // Terminar en el último índice

    for (var i = start; i < end; i++) {
        historialDis.innerHTML += "<p class='historial-operacion' onclick='restaurarResultado(\"" + historialEcuaciones[i] + "\")'>" + historialEcuaciones[i] + "</p>";
        historialDis.innerHTML += "<hr class='hr-divider'>"; // Agregar línea divisora con la clase CSS
    }

    // Si hay más de 15 operaciones, eliminar las más antiguas
    if (historialEcuaciones.length > 15) {
        historialEcuaciones = historialEcuaciones.slice(-15);
        guardarHistorial(); // Actualizar el historial en el almacenamiento local
    }

    // Agregar el botón de "Eliminar Historial"
    historialDis.innerHTML += "<button title='Borrar Historial' onclick='LimpiarHistorial()' style='position: absolute; bottom: 5px; right: 5px;'>🗑️</button>";
}

function LimpiarHistorial() {
    historialEcuaciones = []; // Limpiar la variable del historial
    guardarHistorial(); // Limpiar el historial en el localStorage
    var historialDis = document.getElementById('historial-dis');
    historialDis.innerHTML = ""; // Limpiar el contenido mostrado en la pantalla
}

// Función para agregar una ecuación exitosa al historial
function agregarEcuacionAlHistorial(ecuacion) {
    historialEcuaciones.push(ecuacion);
}

window.onload = function() {
    var historialGuardado = localStorage.getItem('historialEcuaciones');
    if (historialGuardado) {
        historialEcuaciones = JSON.parse(historialGuardado);
        ActivarHistorial(); // Actualizar el historial al cargar la página
    }
};

// Función para guardar el historial en el localStorage
function guardarHistorial() {
    localStorage.setItem('historialEcuaciones', JSON.stringify(historialEcuaciones));
}


function restaurarResultado(ecuacion) {
    var display = document.getElementById('display');
    display.value = ecuacion.split('=')[1].trim(); // Extraer el resultado y establecerlo como el valor del display
}





function MostrarHistorial() {
    let historyContainer = document.getElementById('historial-dis');
    if (historyContainer.style.display === 'none' || historyContainer.style.display === '') {
        historyContainer.style.display = 'block';
        ActivarHistorial();
    } else {
        historyContainer.style.display = 'none';
    }
}





document.addEventListener('keydown', function(event) {
    const key = event.key;
    const display = document.getElementById('display');

    if (!isNaN(key) || key === ',') {
        appendValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter') {
        CalcularResultado();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'r') { // Usando 'r' para la raíz cuadrada
        CalcularRaiz();
    }
});