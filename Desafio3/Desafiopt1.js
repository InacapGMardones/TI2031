

/*
Sistema gestion de ventas 
-Visualizar todas las ventas 
-Modificar o eliminar ventas 

Métricas de ventas: El sistema debe mostrar la cantidad de ventas realizadas durante un día, ventas totales, ganancias del día y ganancias totales, las cuales deben actualizarse al momento de registrar una venta nueva.  
Visualización de ventas registradas: Dentro de la página debe mostrar un listado con las ultimas 20 compras registradas, en donde se vean los siguientes datos (ID, Nombre cliente, valor total, Botón modificar y Botón Eliminar), ademas debe actualizarse al momento de registrar una nueva venta. 

Reglas 

Validación de precio: Los precios deben ser positivos  
Validación de cantidad: La cantidad debe ser positiva y menor a 100 */


// Path: Desafio3/Desafiopt2.js





function Obtener_Dato() {
    const nombreCliente = document.querySelector('#nombre').value;
    const apellidoCliente = document.querySelector('#apellido').value;
    const rut = document.querySelector('#rut').value;
    const cantidadProducto = document.querySelector('#cantidadProducto').value;
    const codigoProducto = document.querySelector('#codigoProducto').value;
    const valorProducto = document.querySelector('#valorProducto').value;
    const valorTotal = valorProducto * cantidadProducto;
    const venta = {
        id: IDP(),
        nombreCliente: nombreCliente,
        apellidoCliente: apellidoCliente,
        rut: rut,
        cantidadProducto: cantidadProducto,
        codigoProducto: codigoProducto,
        valorProducto: valorProducto,
        valorTotal: valorTotal,
        fecha: new Date().toISOString().split('T')[0]

    };
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    HistorialV.push(venta);
    localStorage.setItem('HistorialV', JSON.stringify(HistorialV));
    return venta;
}
// funcion para ID de producto
function IDP(Desde=null){
    let IDF =Desde !==null ? Desde : JSON.parse(localStorage.getItem('IDF')) || 0;
    const ID = IDF + 1;
    localStorage.setItem('IDF', JSON.stringify(ID));
    return ID;
}
// oniimput para mostrar el valor total
document.addEventListener('DOMContentLoaded', function() {
    var valorProducto = document.querySelector('#valorProducto');
    var cantidadProducto = document.querySelector('#cantidadProducto');
    var valorTotal = document.querySelector('#valorTotal');
    valorProducto.oninput = function() {
        valorTotal.value = valorProducto.value * cantidadProducto.value;
    };
    cantidadProducto.oninput = function() {
        valorTotal.value = valorProducto.value * cantidadProducto.value;
    };
});

// Código para mostrar mensaje de formulario enviado
function mostrarMensaje(venta) {
    var mensaje1 = document.querySelector('#FormularioEnviado');
    mensaje1.innerHTML = 'Registro de Venta:';
    var mensaje2 = document.querySelector('#MensajeEnviado');
    mensaje2.innerHTML = '¡La venta ha sido registrada con éxito!:' + ' <br> ' +
        'ID Producto: ' + venta.id + ' <br> ' +
        'Nombre Cliente: ' + venta.nombreCliente + ' <br> ' +
        'Apellido Cliente: ' + venta.apellidoCliente + ' <br> ' +
        'RUT: ' + venta.rut + ' <br> ' +
        'Cantidad Producto: ' + venta.cantidadProducto + ' <br> ' +
        'Codigo Producto: ' + venta.codigoProducto + ' <br> ' +
        'Valor Producto: ' + venta.valorProducto + ' <br> ' +
        'Valor Total: ' + venta.valorTotal;
        console.log(venta);
}

// funcion para boton guardar mientras se cumplan las condiciones de cantidad y valor
document.addEventListener('DOMContentLoaded', function() {
    var BotonG = document.querySelector('#Guardar');
    BotonG.onclick = function(event) {
        const cantidadProducto = document.querySelector('#cantidadProducto').value;
        const valorProducto = document.querySelector('#valorProducto').value;
        if (cantidadProducto <= 0 || cantidadProducto >= 99) {
            alert('La cantidad debe ser positiva y menor a 100');
            return;
        }
        if (valorProducto <= 0) {
            alert('El precio debe ser positivo');
            return;
        }
        event.preventDefault();
        const venta = Obtener_Dato();
        alert("Venta registrada con éxito");
        mostrarMensaje(venta);
        LimpiarForm();
        
    };

}
);


// funcion que limpie el formulario luego de enviarlo con el boton guardar
function LimpiarForm(){
    document.getElementById('miFormulario').reset();

}



// funcion para mostrar en la tabla HistorialVentas.html
document.addEventListener('DOMContentLoaded', function() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = HistorialV.length - 1; i >= 0; i--) {
        const venta = HistorialV[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.nombreCliente}</td>
            <td>${venta.apellidoCliente}</td>
            <td>${venta.valorTotal}</td>
            <td>
                <button class="Modificar">Modificar</button>
            </td>
            <td>
                <button class="Eliminar">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
});

// Javascript para mostrar el modal cuando se hace clic en el botón Modificar
document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.querySelector('tbody');
    tbody.onclick = function(event) {
        const boton = event.target;
        if (boton.className.includes('Eliminar')) {
            const tr = boton.closest('tr');
            const id = tr.firstElementChild.innerHTML;
            const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
            const ventas = HistorialV.filter(venta => venta.id !== parseInt(id));
            localStorage.setItem('HistorialV', JSON.stringify(ventas));
            tr.remove();
        }
        if (boton.className.includes('Modificar')) {
            const tr = boton.closest('tr');
            const id = tr.firstElementChild.innerHTML;
            const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
            const venta = HistorialV.find(venta => venta.id === parseInt(id));
            document.querySelector('#nombre').value = venta.nombreCliente;
            document.querySelector('#Codigo').value = venta.codigoProducto;
            document.querySelector('#Cantidad').value = venta.cantidadProducto;
            document.querySelector('#Valor').value = venta.valorProducto;
            $('#myModal').modal('show'); // Usar Bootstrap para mostrar el modal
        }
    };
});

// funcion boton guardar cambios en el modal
document.addEventListener('DOMContentLoaded', function() {
    const GuardarCambios = document.querySelector('#GuardarCambios');
    GuardarCambios.onclick = function() {
        const nombre = document.querySelector('#nombre').value;
        const codigo = document.querySelector('#Codigo').value;
        const cantidad = document.querySelector('#Cantidad').value;
        const valor = document.querySelector('#Valor').value;
        const id = document.querySelector('tbody tr td').innerHTML;
        const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
        const ventas = HistorialV.map(venta => {
            if (venta.id === parseInt(id)) {
                return {
                    ...venta,
                    nombreCliente: nombre,
                    codigoProducto: codigo,
                    cantidadProducto: cantidad,
                    valorProducto: valor,
                    valorTotal: cantidad * valor
                };
            }
            return venta;
        });
        localStorage.setItem('HistorialV', JSON.stringify(ventas));
        $('#myModal').modal('hide'); // Usar Bootstrap para ocultar el modal
        refreshTable(); // Call the function to refresh the table
    };
});

function refreshTable() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = HistorialV.length - 1; i >= 0; i--) {
        const venta = HistorialV[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.nombreCliente}</td>
            <td>${venta.apellidoCliente}</td>
            <td>${venta.valorTotal}</td>
            <td>
                <button class="Modificar">Modificar</button>
            </td>
            <td>
                <button class="Eliminar">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}


/* MetricasV.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta lang="es">
    <title>Métricas Venta</title>
</head>
<body>
    <h1>Métricas de Venta</h1>
    <ul>
        <li><a href="Desafiopt1.html"><button>Registrar Venta</button></a></li>
        <li><a href="HistorialVentas.html"><button>Historial Ventas</button></a></li>
        <li><a href="MetricasV.html"><button>Metricas de venta</button></a></li>
    </ul>
    <script src=Desafiopt1.js> </script>
</body>
</html>
</div> */

document.addEventListener('DOMContentLoaded', function() {
    // Display the metrics
    document.getElementById('ventasDia').textContent = ventasDia();
    document.getElementById('gananciaDia').textContent = gananciaDia();
    document.getElementById('ventasTotales').textContent = ventasTotales();
    document.getElementById('gananciaTotales').textContent = gananciaTotales();
});

// Function to calculate today's sales (based on current date)
function ventasDia() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const today = new Date().toISOString().split('T')[0];
    const ventasHoy = HistorialV.filter(venta => venta.fecha === today).length;
    return ventasHoy;
}

// Function to calculate today's total earnings
function gananciaDia() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const today = new Date().toISOString().split('T')[0];
    const gananciaHoy = HistorialV.filter(venta => venta.fecha === today)
    .reduce((acc, venta) => acc + venta.valorTotal, 0);
    return gananciaHoy;
}

// Function to calculate total sales
function ventasTotales() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const ventasTot = HistorialV.length;
    return ventasTot;
}

// Function to calculate total earnings
function gananciaTotales() {
    const HistorialV = JSON.parse(localStorage.getItem('HistorialV')) || [];
    const gananciaTot = HistorialV.reduce((acc, venta) => acc + venta.valorTotal, 0);
    return gananciaTot;
}




