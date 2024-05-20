// el envío del formulario
document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe por defecto

  // obtiene los  datos del formulario
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var rut = document.getElementById('rut').value;
  var producto = document.getElementById('producto').value;
  var cantidad = parseInt(document.getElementById('cantidad').value);
  var codigo = document.getElementById('codigo').value;
  var valor = parseFloat(document.getElementById('valor').value);
  var valorTotal = cantidad * valor;

  // crea el objeto de la venta
  var venta = {
    nombre: nombre,
    apellido: apellido,
    rut: rut,
    producto: producto,
    cantidad: cantidad,
    codigo: codigo,
    valor: valor,
    valorTotal: valorTotal 
  };

  //  las ventas existentes 
  var ventasRegistradas = JSON.parse(localStorage.getItem('ventas')) || [];

  // nueva venta
  ventasRegistradas.push(venta);

  // guarda el array 
  localStorage.setItem('ventas', JSON.stringify(ventasRegistradas));

  // limpia el formulario despues de registrar una venta
  document.getElementById('registroForm').reset();

  // Mensaje 
  alert('Venta registrada correctamente');

  // Actualiza tabla de ventas
  mostrarVentas();
});

//  ventana de modificacion de venta 
function mostrarModalModificar(id) {
  var ventasRegistradas = JSON.parse(localStorage.getItem('ventas')) || [];
  var venta = ventasRegistradas[id];
  var modal = document.getElementById('modalModificarVenta');
  var formulario = document.getElementById('formularioModificarVenta');
  var modalBody = modal.querySelector('.modal-body');

  var camposModificar = `
    <div class="form-group">
      <label for="nombreModificado">Nombre:</label>
      <input type="text" class="form-control" id="nombreModificado" value="${venta.nombre}" required>
    </div>
    <div class="form-group">
      <label for="apellidoModificado">Apellido:</label>
      <input type="text" class="form-control" id="apellidoModificado" value="${venta.apellido}" required>
    </div>
    <div class="form-group">
      <label for="rutModificado">RUT:</label>
      <input type="text" class="form-control" id="rutModificado" value="${venta.rut}" required>
    </div>
    <div class="form-group">
      <label for="productoModificado">Nombre Producto:</label>
      <input type="text" class="form-control" id="productoModificado" value="${venta.producto}" required>
    </div>
    <div class="form-group">
      <label for="cantidadModificada">Cantidad:</label>
      <input type="number" class="form-control" id="cantidadModificada" value="${venta.cantidad}" required min="1" max="99">
    </div>
    <div class="form-group">
      <label for="codigoModificado">Código Producto:</label>
      <input type="text" class="form-control" id="codigoModificado" value="${venta.codigo}" required>
    </div>
    <div class="form-group">
      <label for="valorModificado">Valor Producto:</label>
      <input type="number" class="form-control" id="valorModificado" value="${venta.valor}" required min="1">
    </div>
    <div class="form-group">
      <label for="valorTotalModificado">Valor Total:</label>
      <input type="text" class="form-control" id="valorTotalModificado" value="${venta.valorTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}" readonly>
    </div>
  `;

  formulario.innerHTML = camposModificar;

  modal.querySelector('#guardarModificacion').onclick = function() {
    // Actualiza la venta 
    venta.nombre = document.getElementById('nombreModificado').value;
    venta.apellido = document.getElementById('apellidoModificado').value;
    venta.rut = document.getElementById('rutModificado').value;
    venta.producto = document.getElementById('productoModificado').value;
    venta.cantidad = parseInt(document.getElementById('cantidadModificada').value);
    venta.codigo = document.getElementById('codigoModificado').value;
    venta.valor = parseFloat(document.getElementById('valorModificado').value);
    venta.valorTotal = venta.cantidad * venta.valor;

    // Guarda la venta en localstorage
    localStorage.setItem('ventas', JSON.stringify(ventasRegistradas));

    // Mensaje 
    alert('Venta modificada correctamente');

    // Actualiza tabla de ventas
    mostrarVentas();

    // cierra ventana 
    $('#modalModificarVenta').modal('hide');
  };

  // Muestra modal
  $('#modalModificarVenta').modal('show');
}

// eliminar venta
function eliminarVenta(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
    var ventasRegistradas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventasRegistradas.splice(id, 1);
    localStorage.setItem('ventas', JSON.stringify(ventasRegistradas));
    mostrarVentas();
    alert('Venta eliminada correctamente');
  }
}

// todas las ventas
function mostrarVentas() {
  var ventasRegistradas = JSON.parse(localStorage.getItem('ventas')) || [];
  var ventasBody = document.getElementById('ventasBody');
  ventasBody.innerHTML = '';
  ventasRegistradas.forEach(function(venta, index) {
    var row = `
      <tr>
        <td>${index + 1}</td>
        <td>${venta.nombre} ${venta.apellido}</td>
        <td>${venta.rut}</td>
        <td>${venta.producto}</td>
        <td>${venta.cantidad}</td>
        <td>${venta.codigo}</td>
        <td>${venta.valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
        <td>${venta.valorTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
        <td>
          <button type="button" class="btn btn-primary" onclick="mostrarModalModificar(${index})" data-toggle="modal" data-target="#modalModificarVenta">Modificar</button>
          <button type="button" class="btn btn-danger" onclick="eliminarVenta(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    ventasBody.innerHTML += row;
  });
}

// Agrega eventos de entrada para calcular el total del producto en tiempo real
document.getElementById('cantidad').addEventListener('input', calcularTotal);
document.getElementById('valor').addEventListener('input', calcularTotal);

// Función para calcular el total del producto en tiempo real
function calcularTotal() {
  var cantidad = parseInt(document.getElementById('cantidad').value);
  var valor = parseFloat(document.getElementById('valor').value);
  var total = cantidad * valor;
  document.getElementById('total').value = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }); 
}

// Mostrar las ventas al cargar la página de ventas
mostrarVentas();
