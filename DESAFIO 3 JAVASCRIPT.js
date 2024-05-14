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
    // Calcular valor total 
    const totalValue = productValue * quantity; 
    // Agregar venta al arreglo 
    const sale = { 
        id: sales.length + 1, 
        firstName, 
        lastName, 
        rut, 
        productName, 
        quantity, 
        productCode, 
        productValue, 
        totalValue 
    }; 
    sales.push(sale); 
    // Guardar ventas en el local storage
    localStorage.setItem('sales', JSON.stringify(sales));
    // Limpiar formulario 
    event.target.reset();
    // Actualizar lista de ventas 
    updateSalesList(); 
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
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">ID: ${sale.id}</h5> 
                    <p class="card-text">Nombre cliente: ${sale.firstName} ${sale.lastName}</p> 
                    <p class="card-text">Valor total: $${sale.totalValue.toFixed(2)}</p> 
                    <button class="btn btn-primary" onclick="editSale(${sale.id})">Modificar</button> 
                    <button class="btn btn-danger" onclick="deleteSale(${sale.id})">Eliminar</button> 
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
            totalValue
        };

        // Guardar ventas en el local storage
        localStorage.setItem('sales', JSON.stringify(sales));

        
        // Actualizar lista de ventas
        updateSalesList();
    }
}

// Inicializar la lista de ventas 
updateSalesList(); 
// Asignar el evento submit al formulario 
document.getElementById('salesForm').addEventListener('submit', registerSale);