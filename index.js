// Datos de ventas (simulados como un arreglo)  
let sales = JSON.parse(localStorage.getItem('sales')) || [];  
// Variable para almacenar el ID de la venta que se está editando
let currentEditId = null;

// Función para registrar una venta  
function registerSale(event) {  
    event.preventDefault();  
    // Obtener valores del formulario  
    const firstName = document.getElementById('firstName').value;  
    const lastName = document.getElementById('lastName').value;  
    const rut = document.getElementById('rut').value;  
    const productName = document.getElementById('productName').value;  
    const quantity = parseInt(document.getElementById('quantity').value);  
    const productCode = document.getElementById('productCode').value;  
    const productValue = parseFloat(document.getElementById('productValue').value);     
    // Validar precio y cantidad  
    if (productValue <= 0 || isNaN(productValue)) {  
        alert('El precio del producto debe ser positivo.');  
        return;  
    }  
    if (quantity <= 0 || quantity >= 100 || isNaN(quantity)) {  
        alert('La cantidad debe ser positiva y menor que 100.');  
        return;  
    }  
    // Obtener fecha y hora actual
    const fecha = new Date();
    const saleDate = fecha.getFullYear();
    // Calcular valor total  
    const totalValue = productValue * quantity;  

    function getNextId(startFrom = null) {  
        let lastId = startFrom !== null ? startFrom : JSON.parse(localStorage.getItem('lastId')) || 0;
        const nextId = lastId + 1; 
        localStorage.setItem('lastId', nextId);
        return nextId;
    }

    // Agregar o editar venta al arreglo  
    const sale = {  
        id: currentEditId ? currentEditId : getNextId(),  
        firstName,  
        lastName,  
        rut,  
        productName,  
        quantity,  
        productCode,  
        productValue,  
        totalValue,
        saleDate // Agregar la propiedad saleDate con la fecha y hora actual  
    };  
    if (currentEditId) {
        const saleIndex = sales.findIndex(sale => sale.id === currentEditId);
        sales[saleIndex] = sale;
        currentEditId = null;
    } else {
        sales.push(sale);
    }
    // Guardar ventas en el local storage 
    localStorage.setItem('sales', JSON.stringify(sales)); 
    // Limpiar formulario  
    event.target.reset(); 
    // Actualizar lista de ventas  
    updateSalesList(); 
    // Actualizar métricas
    actualizarMetrica();
    // Mostrar mensaje de venta registrada  
    alert('Venta registrada correctamente.'); 
}  

// Función para actualizar la lista de ventas  
function updateSalesList() {  
    const salesList = document.getElementById('salesList');  
    salesList.innerHTML = '';  
    // Mostrar últimas 20 ventas  
    const startIndex = Math.max(0, sales.length - 20);  
    for (let i = startIndex; i < sales.length; i++) {  
        const sale = sales[i];  
        const salesItem = document.createElement('div');  
        salesItem.classList.add('sales-item');  
        salesItem.innerHTML = `
            <div class="historial">
                <div class="card"> 
                    <div class="card-body"> 
                        <h5 class="card-title">ID: ${sale.id}</h5>  
                        <p class="card-text">Nombre cliente: ${sale.firstName} ${sale.lastName}</p>  
                        <p class="card-text">Valor total: $${sale.totalValue.toFixed(2)}</p>  
                        <button class="btn btn-primary" onclick="loadSale(${sale.id})">Modificar</button>  
                        <button class="btn btn-danger" onclick="deleteSale(${sale.id})">Eliminar</button>  
                    </div> 
                </div> 
            </div>
        `;   
        salesList.appendChild(salesItem);  
    }  
}  

// Función para eliminar una venta  
function deleteSale(id) {  
    sales = sales.filter(sale => sale.id !== id);  
    // Guardar ventas en el local storage 
    localStorage.setItem('sales', JSON.stringify(sales)); 
    updateSalesList(); 
    actualizarMetrica(); 
}  

// Función para cargar una venta en el formulario para editar
function loadSale(id) { 
    const sale = sales.find(sale => sale.id === id);
    if (sale) {
        document.getElementById('firstName').value = sale.firstName;
        document.getElementById('lastName').value = sale.lastName;
        document.getElementById('rut').value = sale.rut;
        document.getElementById('productName').value = sale.productName;
        document.getElementById('quantity').value = sale.quantity;
        document.getElementById('productCode').value = sale.productCode;
        document.getElementById('productValue').value = sale.productValue;
        currentEditId = id;
    }
}

// Función para obtener la fecha actual
function obtenerFecha() {  
    const currentDate = new Date();  
    const añohoy = currentDate.getFullYear();
    return añohoy;  
}

// Función para comparar la fecha actual con la fecha de venta
function compararFechas() {
    return sales.filter(sale => { // Filtrar ventas por fecha
        const saleDate = sale.saleDate; // Convertir la fecha de la venta a objeto Date
        return saleDate === obtenerFecha(); // Comparar fechas
    });
}

function calcularMetrica() {
    const ventasHoy = compararFechas();
    const totalVentas = ventasHoy.length;
    let totalMontoVentas = 0;
    ventasHoy.forEach(sale => {
        totalMontoVentas += sale.totalValue;
    });
    return {
        totalVentas,
        totalMontoVentas
    };
}

function actualizarMetrica() {
    const metricas = calcularMetrica();
    const metricaList = document.getElementById('metricaList');
    metricaList.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Métricas de Hoy</h5>
                <p class="card-text">Total de Ventas: ${metricas.totalVentas}</p>
                <p class="card-text">Monto Total de Ventas: $${metricas.totalMontoVentas.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Inicializar eventos  
document.getElementById('salesForm').addEventListener('submit', registerSale);  
document.addEventListener('DOMContentLoaded', () => {  
    updateSalesList();  
    actualizarMetrica();
});  
