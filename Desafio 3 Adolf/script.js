
// función para crear un id único para cada producto y que sea persistente aun eliminando productos
function getNextId(startFrom = null) {  // se agrega un parámetro startFrom para que el id comience desde un numero especifico
    let lastId = startFrom !== null ? startFrom : JSON.parse(localStorage.getItem('lastId')) || 0; 
    const nextId = lastId + 1;
    localStorage.setItem('lastId', JSON.stringify(nextId));
    return nextId;
}

// FUNCIÓN PARA EXTRAER Y ALMACENAR LOS DATOS
function extractAndStoreData() {
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const dni = document.querySelector('#dni').value;
    const productName = document.querySelector('#productName').value;
    const productQuantity = document.querySelector('#productQuantity').value;
    const productCode = document.querySelector('#productCode').value;
    const productPrice = document.querySelector('#productPrice').value;
    // constante para calcular el total
    const totalProduct = productQuantity* productPrice
    const product = {   // se crea un objeto con los datos ingresados
        id: getNextId(), // se agrega id al producto
        name: name,
        lastname: lastname,
        dni: dni,
        productName: productName,
        productQuantity: productQuantity,
        productCode: productCode,
        productPrice: productPrice,
        totalProduct: totalProduct, // 2 decimales
        date: new Date().toLocaleString()
    };
    const record = JSON.parse(localStorage.getItem('record')) || [];
    record.push(product);
    localStorage.setItem('record', JSON.stringify(record));

    return product;
}
// función para actualizar el total del producto en tiempo real id="totalProduct"
document.addEventListener('DOMContentLoaded', function() {
    var productQuantity = document.querySelector('#productQuantity');
    var productPrice = document.querySelector('#productPrice');
    var totalProduct = document.querySelector('#totalProduct');
    productQuantity.oninput = function() {
        totalProduct.value = (productQuantity.value * productPrice.value);
    }
    productPrice.oninput = function() {
        totalProduct.value = (productQuantity.value * productPrice.value);
    }
});

// Función para mostrar el mensaje de producto registrado
function showMessage(product) {
    var cardTitle = document.querySelector('#titleMessage'); // Se selecciona el h2 con id titleMessage
    cardTitle.innerHTML = 'Producto Registrado'; // Se cambia el título del h2
    var cardProduct = document.querySelector('#carProduct'); // Se selecciona el div con id cardProduct
    cardProduct.style.display = 'block'; // Se cambia el display a block para mostrarlo
    var cardText = document.querySelector('#message'); // Se selecciona el p con id message
    cardText.innerHTML = 'El siguiente producto ha sido registrado con éxito: <br>' +
        'Id Producto: ' + product.id + '<br>' +
        'Nombre de Cliente: ' + product.name + '<br>' +
        'Apellido de Cliente: ' + product.lastname + '<br>' +
        'RUT de CLiente: ' + product.dni + '<br>' +
        'Nombre del Producto: ' + product.productName + '<br>' +
        'Cantidad del Producto: ' + product.productQuantity + '<br>' +
        'Código del Producto: ' + product.productCode + '<br>' +
        'Valor del Producto: ' + product.productPrice + '<br>' +
        'Total del Producto: ' + product.totalProduct + '<br>' +
        'Fecha: ' + product.date;
};

// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('#form');
    var button = document.querySelector('#btnSend'); // Selector correcto para el botón
    form.onsubmit = function(event) {
        var name = document.querySelector('#name');
        var lastname = document.querySelector('#lastname');
        var dni = document.querySelector('#dni');
        var productName = document.querySelector('#productName');
        var productQuantity = document.querySelector('#productQuantity');
        var productCode = document.querySelector('#productCode');
        var productPrice = document.querySelector('#productPrice');
        if (name.value.trim() === '' || lastname.value.trim() === '' || dni.value.trim() === '' || productName.value.trim() === '' || productQuantity.value.trim() === '' || productCode.value.trim() === '' || productPrice.value.trim() === '') {
            alert('Por favor complete todos los campos');
            event.preventDefault();
            return;
        }
        if (productQuantity.value <= 0 || productPrice.value <= 0) {  //  verificar que los valores sean positivos
            alert('Por favor ingrese valores positivos');
            event.preventDefault();
            return;
        }
        if (productQuantity.value > 99) { // verificar que la cantidad no sea mayor a 99
            alert('Cantidad máxima 99');
            event.preventDefault();
            return;
        }
    };
    // botón para enviar formulario y mostrar mensaje
    button.onclick = function(event) {
        event.preventDefault(); // Prevenir que la página se refresque

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const product = extractAndStoreData(); // Llama a la función extractAndStoreData para extraer y almacenar los datos
        showMessage(product); // Llama a la función showMessage para mostrar el mensaje de producto registrado

        // Limpiar los campos del formulario
        form.reset();
    };
});

// función para mostrar en tabla de record.html
document.addEventListener('DOMContentLoaded', function() {
    var record = JSON.parse(localStorage.getItem('record')) || [];
    var tbody = document.querySelector('tbody');
    record.forEach(function(product) {
        var tr = document.createElement('tr');
        tr.innerHTML = 
            '<td>' + product.id + '</td>' +
            '<td>' + product.name + '</td>' +
            '<td>' + product.lastname + '</td>' +
            '<td>' + product.dni + '</td>' +
            '<td>' + product.productName + '</td>' +
            '<td>' + product.productQuantity + '</td>' +
            '<td>' + product.productCode + '</td>' +
            '<td>' + product.productPrice + '</td>' +
            '<td>' + product.totalProduct + '</td>' +
            '<td>' + product.date + '</td>'+
            '<td><button id="btnDel" class="btn btn-danger">Eliminar</button></td>'+
            '<td><button id="btnMod" class="btn btn-warning">Editar</button></td>';
        tbody.appendChild(tr);
    });
});
// función para eliminar y editar productos en record.html
document.addEventListener('DOMContentLoaded', function() {
    var tbody = document.querySelector('tbody'); // primero se selecciona el tbody

    tbody.onclick = function(event) {
        // Meliminar el elemento
        if (event.target.id === 'btnDel') {
            var record = JSON.parse(localStorage.getItem('record')) || [];  
            var tr = event.target.parentElement.parentElement;
            var id = parseInt(tr.children[0].textContent);
            record = record.filter(product => product.id !== id);
            localStorage.setItem('record', JSON.stringify(record));
            tr.remove();
        }

        // Desplegar el modal de edición
        if (event.target.id === 'btnMod') {
            var tr = event.target.parentElement.parentElement;
            var id = parseInt(tr.children[0].textContent);
            var record = JSON.parse(localStorage.getItem('record')) || [];
            var product = record.find(product => product.id === id);
            var modal = document.querySelector('#editModal');
            modal.style.display = 'block';
            document.querySelector('#editProductNameModal').value = product.productName;
            document.querySelector('#editProductCodeModal').value = product.productCode;
            document.querySelector('#editProductQuantityModal').value = product.productQuantity;
            document.querySelector('#editProductPriceModal').value = product.productPrice;

            var btnUpdate = document.querySelector('#btnUpdate');
            btnUpdate.onclick = function(event) {
                event.preventDefault();
                product.productName = document.querySelector('#editProductNameModal').value;
                product.productCode = document.querySelector('#editProductCodeModal').value;
                product.productQuantity = document.querySelector('#editProductQuantityModal').value;
                product.productPrice = document.querySelector('#editProductPriceModal').value;
                product.totalProduct = (product.productQuantity * product.productPrice).toFixed(2);
                localStorage.setItem('record', JSON.stringify(record));
                tr.children[4].textContent = product.productName;
                tr.children[5].textContent = product.productQuantity;
                tr.children[6].textContent = product.productCode;
                tr.children[7].textContent = product.productPrice;
                tr.children[8].textContent = product.totalProduct;
                modal.style.display = 'none';
            }

            var btnCancel = document.querySelector('#btnCancel');
            btnCancel.onclick = function(event) {
                event.preventDefault();
                modal.style.display = 'none';
            }
        }
    };
});
// función para cerrar modal de edición en record.html
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('.close');
    button.onclick = function() {
        document.querySelector('#editModal').style.display = 'none';
    }
});


// función para limpiar historial, pide confirmación antes de borrar
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#clear');
    button.onclick = function(event) {
        event.preventDefault(); // Prevent the page from refreshing
        localStorage.removeItem('record');
        alert('Historial limpiado con éxito');
        location.reload();
    }
});
// función que borra toda la información almacenada en el local storage con alerta de confirmación
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#borrarTodo');
    button.onclick = function(event) {
        event.preventDefault(); // Prevent the page from refreshing
        if (confirm('Advertencia: se borrara la totalidad de los elementos almacenados, ¿Desea continuar?')) {
            localStorage.removeItem('record');
            alert('Datos borrados con éxito');
            location.reload();
            getNextId(-1); // Reinicia el contador a 0
        }
    }
});



// métricas 
// función para calcular ventas totales del dia de hoy, cuenta los id ingresados hoy
document.addEventListener('DOMContentLoaded', function() {
    var record = JSON.parse(localStorage.getItem('record')) || [];
    var ventasDia = record.filter(product => true);
    document.getElementById('salesToday').innerHTML = ventasDia.length;
});
// función para calcular la ganancia total del dia de hoy, suma los totales de los productos ingresados hoy
document.addEventListener('DOMContentLoaded', function() {
    var record = JSON.parse(localStorage.getItem('record')) || [];
    var ventasDia = record.filter(product => true);
    var profitsToday = ventasDia.reduce((acc, product) => acc + parseFloat(product.totalProduct), 0);
    document.getElementById('profitsToday').innerHTML = '$' + profitsToday;
});
// función para calcular ventas totales, cuenta los id ingresados
document.addEventListener('DOMContentLoaded', function() {
    var record = JSON.parse(localStorage.getItem('record')) || [];
    document.getElementById('totalSales').innerHTML = record.length;
});
// función para calcular ganancias totales, suma los totales de los productos ingresados
document.addEventListener('DOMContentLoaded', function() {
    var record = JSON.parse(localStorage.getItem('record')) || [];
    var totalProfits = record.reduce((acc, product) => acc + parseFloat(product.totalProduct), 0);
    document.getElementById('totalProfits').innerHTML = '$' + totalProfits;
});


// adicionales
// función para exportar como json id="export" la colección llamada productos almacenada en el local storage y ordenarla, se descarga con nombre y fecha   
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#export');
    button.onclick = function(event) {
        event.preventDefault(); // Prevent the page from refreshing
        var record = JSON.parse(localStorage.getItem('record')) || [];
        record.sort((a, b) => a.id - b.id);
        var data = JSON.stringify(record, null, 2);
        var blob = new Blob([data], {type: 'application/json'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'productos-' + new Date().toLocaleDateString() + '.json';
        a.click();
    }
});