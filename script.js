let pantalla = document.getElementById('display');
let memoria = JSON.parse(localStorage.getItem('memoria')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];

function ingresarDigito(digito) {
  if (pantalla.value === '0' || pantalla.value === 'Error') {
    pantalla.value = digito;
  } else {
    pantalla.value += digito;
  }
}

function ingresarDecimal() {
  if (!pantalla.value.includes(',')) {
    pantalla.value += ',';
  }
}

function borrarTodo() {
  pantalla.value = '0';
}

function borrarEntrada() {
  pantalla.value = '0';
}

function borrarUltimo() {
  pantalla.value = pantalla.value.slice(0, -1);
  if (pantalla.value === '') {
    pantalla.value = '0';
  }
}

function ingresarOperador(operador) {
  if (!pantalla.value.endsWith(' ') && pantalla.value !== '0') {
    pantalla.value += ' ' + operador + ' ';
  }
}

function calcular(operacion) {
  let valorActual = parseFloat(pantalla.value.replace(',', '.'));
  if (operacion === '1/x') {
    pantalla.value = (1 / valorActual).toString().replace('.', ',');
  } else if (operacion === 'sqr') {
    pantalla.value = (valorActual * valorActual).toString().replace('.', ',');
  } else if (operacion === 'sqrt') {
    pantalla.value = Math.sqrt(valorActual).toString().replace('.', ',');
  }
}

function calcularResultado() {
  try {
    let operacion = pantalla.value;
    let resultado = eval(pantalla.value.replace(/,/g, '.').replace(/ /g, '').replace('x', '*').replace('÷', '/'));
    pantalla.value = resultado.toString().replace('.', ',');

    let historialItem = operacion + " = " + pantalla.value;
    historial.push(historialItem);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarListaHistorial();
  } catch {
    pantalla.value = 'Error';
  }
}

function actualizarListaHistorial() {
  const listaHistorial = document.getElementById('lista-historial');
  listaHistorial.innerHTML = '';
  historial.forEach((operacion) => {
    let elementoLista = document.createElement('li');
    elementoLista.textContent = operacion;
    listaHistorial.appendChild(elementoLista);
  });
}

function cambiarSigno() {
  pantalla.value = (parseFloat(pantalla.value.replace(',', '.')) * -1).toString().replace('.', ',');
}

function limpiarMemoria() {
  localStorage.removeItem('memoria');
  memoria = [];
  actualizarListaMemoria();
}

function recuperarMemoria() {
  if (memoria.length > 0) {
    let ultimoValor = memoria[memoria.length - 1];
    pantalla.value = ultimoValor.toString().replace('.', ',');
  }
}

function agregarMemoria() {
  let valorActual = parseFloat(pantalla.value.replace(',', '.'));
  if (memoria.length > 0) {
    memoria[memoria.length - 1] += valorActual;
  } else {
    memoria.push(valorActual);
  }
  localStorage.setItem('memoria', JSON.stringify(memoria));
  actualizarListaMemoria();
}

function restarMemoria() {
  let valorActual = parseFloat(pantalla.value.replace(',', '.'));
  if (memoria.length > 0) {
    memoria[memoria.length - 1] -= valorActual;
  } else {
    memoria.push(-valorActual);
  }
  localStorage.setItem('memoria', JSON.stringify(memoria));
  actualizarListaMemoria();
}

function almacenarMemoria() {
  let valorActual = parseFloat(pantalla.value.replace(',', '.'));
  memoria.push(valorActual);
  localStorage.setItem('memoria', JSON.stringify(memoria));
  actualizarListaMemoria();
}

function actualizarListaMemoria() {
  const listaMemoria = document.getElementById('lista-memoria');
  listaMemoria.innerHTML = '';
  memoria.forEach((valor, indice) => {
    let elementoLista = document.createElement('li');
    elementoLista.style.display = 'flex';
    elementoLista.style.alignItems = 'center';

    let textoValor = document.createElement('span');
    textoValor.textContent = valor.toString().replace('.', ',');
    textoValor.style.flexGrow = '1';

    let botonUsar = document.createElement('button');
    botonUsar.textContent = 'Usar';
    botonUsar.style.marginLeft = '10px';
    botonUsar.onclick = function() {
      usarMemoria(valor);
    };

    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.onclick = function() {
      eliminarMemoria(indice);
    };

    elementoLista.appendChild(textoValor);
    elementoLista.appendChild(botonUsar);
    elementoLista.appendChild(botonEliminar);
    listaMemoria.appendChild(elementoLista);
  });

  actualizarEstadoBotonesMemoria();
}

function usarMemoria(valor) {
  pantalla.value = valor.toString().replace('.', ',');
}

function eliminarMemoria(indice) {
  memoria.splice(indice, 1);
  localStorage.setItem('memoria', JSON.stringify(memoria));
  actualizarListaMemoria();
}

function actualizarListaHistorial() {
  const listaHistorial = document.getElementById('lista-historial');
  listaHistorial.innerHTML = '';
  historial.forEach((operacion) => {
    let elementoLista = document.createElement('li');
    elementoLista.textContent = operacion;
    listaHistorial.appendChild(elementoLista);
  });
}

function borrarTodoHistorial() {
    historial = [];
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarListaHistorial();
}

document.getElementById('clearHistoryBtn').onclick = function() {
    borrarTodoHistorial();
};

function actualizarEstadoBotonesMemoria() {
  const botonesMemoria = ["mcBtn", "mrBtn", "openSidebarBtn"];
  const estado = memoria.length > 0 ? false : true;
  botonesMemoria.forEach(id => {
    document.getElementById(id).disabled = estado;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarListaMemoria();
  actualizarListaHistorial();
});

document.getElementById("openSidebarBtn").onclick = function() {
  document.getElementById("sidebar").style.width = "250px";
}

document.getElementById("closeSidebarBtn").onclick = function() {
  document.getElementById("sidebar").style.width = "0";
}

document.getElementById("openHistoryBtn").onclick = function() {
  document.getElementById("historySidebar").style.width = "250px";
}

document.getElementById("closeHistorySidebarBtn").onclick = function() {
  document.getElementById("historySidebar").style.width = "0";
}
