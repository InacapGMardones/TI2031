// Datos de ventas (simulados como un arreglo)  
let sales = JSON.parse(localStorage.getItem('sales')) || [];  
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

    // Agregar venta al arreglo  
    const sale = {  
        id: getNextId(),  
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
    sales.push(sale);  
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
                        <button class="btn btn-primary" onclick="editSale(${sale.id})">Modificar</button>  
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
  //Función para modificar una venta 
function editSale(id) { 
    const saleIndex = sales.findIndex(sale => sale.id === id); 
    if (saleIndex !== -1) { 
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
        // Calcular valor total 
        const totalValue = productValue * quantity;  
        // Modificar venta en el arreglo 
        sales[saleIndex] = { 
            ...sales[saleIndex], 
            firstName, 
            lastName, 
            rut, 
            productName, 
            quantity, 
            productCode, 
            productValue, 
            totalValue,
            saleDate: sales[saleIndex].saleDate // Mantener la fecha y hora original 
        }; 
        // Guardar ventas en el local storage
        localStorage.setItem('sales', JSON.stringify(sales)); 
        //limpiar formulario
        document.getElementById('salesForm').reset();
        // Actualizar lista de ventas 
        updateSalesList(); 
        // Actualizar métricas
        actualizarMetrica();
    } 
}  
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

function obtener_cantidad_ventas_dia() {
    return compararFechas().reduce((total, sale) => total + sale.quantity, 0);
}

function obtener_ganancias_dia() {
    return compararFechas().reduce((total, sale) => total + sale.totalValue, 0);
}


  // Función para actualizar las métricas
function actualizarMetrica() {  
    const metricaList = document.getElementById('metricaList');
    metricaList.innerHTML = '';    
    const ventasDia =  obtener_cantidad_ventas_dia();
    const gananciasDia = obtener_ganancias_dia();
    const gananciasTotales = totalValue = sales.reduce((total, sale) => total + sale.totalValue, 0);
    const metricaItem = document.createElement('div');  
    metricaItem.classList.add('metrica-item');  
    metricaItem.innerHTML = `
        <div class="metrica">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">Métrica</h6>
                    <p class="card-text">Ventas del día: ${ventasDia}</p>
                    <p class="card-text">Ganancias del día: $${gananciasDia.toFixed(2)}</p>
                    <p class="card-text">Ganancias totales: $${gananciasTotales.toFixed(2)}</p>
                    <p class="card-text">Ventas totales: ${sales.reduce((total, sale) => total + sale.quantity, 0)}</p>
                </div>
            </div>
        </div>
    `;   
    metricaList.appendChild(metricaItem);  
    metricaList.appendChild(metricaItem);  
}  

// Inicializar la lista de ventas  
updateSalesList(); 
// Inicializar las métricas
actualizarMetrica();
// Asignar el evento submit al formulario  
document.getElementById('salesForm').addEventListener('submit', registerSale); 