// reportes.js - Funcionalidad para el módulo de reportes

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar selectores de fecha
    initDateRangePicker();
    
    // Inicializar gráficos
    initCharts();
    
    // Inicializar tablas de datos
    initDataTables();
    
    // Manejadores para exportación de reportes
    initExportHandlers();
    
    // Filtros para reportes
    initReportFilters();
    
    // Funcionalidad para programar reportes
    initScheduleReports();
});

// Selector de rango de fechas
function initDateRangePicker() {
    const dateRangeInputs = document.querySelectorAll('.date-range-picker');
    
    dateRangeInputs.forEach(input => {
        // En una implementación real, aquí inicializaríamos un date picker avanzado
        // Para este ejemplo, usaremos inputs de tipo date nativos
        
        const container = document.createElement('div');
        container.className = 'date-range-container';
        
        const startDateInput = document.createElement('input');
        startDateInput.type = 'date';
        startDateInput.className = 'form-control date-start';
        startDateInput.name = `${input.getAttribute('name')}_start`;
        
        const endDateInput = document.createElement('input');
        endDateInput.type = 'date';
        endDateInput.className = 'form-control date-end';
        endDateInput.name = `${input.getAttribute('name')}_end`;
        
        const separator = document.createElement('span');
        separator.className = 'date-separator';
        separator.textContent = 'a';
        
        container.appendChild(startDateInput);
        container.appendChild(separator);
        container.appendChild(endDateInput);
        
        // Reemplazar el input original con el contenedor de rango
        input.parentNode.replaceChild(container, input);
        
        // Establecer fechas predeterminadas (último mes)
        const now = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        endDateInput.valueAsDate = now;
        startDateInput.valueAsDate = oneMonthAgo;
        
        // Configurar eventos de cambio
        [startDateInput, endDateInput].forEach(dateInput => {
            dateInput.addEventListener('change', function() {
                updateReportData();
            });
        });
    });
    
    // Selectores rápidos de fechas
    const datePresets = document.querySelectorAll('.date-preset');
    
    datePresets.forEach(preset => {
        preset.addEventListener('click', function(e) {
            e.preventDefault();
            
            const range = this.getAttribute('data-range');
            const startInput = document.querySelector('.date-start');
            const endInput = document.querySelector('.date-end');
            
            if (!startInput || !endInput) return;
            
            const now = new Date();
            let startDate = new Date();
            
            switch (range) {
                case 'today':
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    break;
                case 'yesterday':
                    startDate = new Date(now);
                    startDate.setDate(startDate.getDate() - 1);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(startDate.getMonth() - 1);
                    break;
                case 'quarter':
                    startDate.setMonth(startDate.getMonth() - 3);
                    break;
                case 'year':
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    break;
            }
            
            // Actualizar inputs
            startInput.valueAsDate = startDate;
            endInput.valueAsDate = new Date();
            
            // Actualizar reportes
            updateReportData();
            
            // Actualizar estado activo de los presets
            datePresets.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Inicializar gráficos
function initCharts() {
    // En una aplicación real, usaríamos una biblioteca como Chart.js, ApexCharts, etc.
    // Aquí simularemos la creación de gráficos con funciones dummy
    
    // Gráfico de ventas
    renderSalesChart();
    
    // Gráfico de productos más vendidos
    renderTopProductsChart();
    
    // Gráfico de ventas por categoría
    renderCategorySalesChart();
    
    // Gráfico de ventas por tienda
    renderStoreSalesChart();
}

// Función para renderizar gráfico de ventas
function renderSalesChart() {
    const container = document.getElementById('sales-chart');
    if (!container) return;
    
    // En una aplicación real, aquí usaríamos una biblioteca de gráficos
    console.log('Renderizando gráfico de ventas');
    
    // Simulación de datos de ventas
    const salesData = [
        { date: '2025-03-01', sales: 5200, transactions: 42 },
        { date: '2025-03-02', sales: 4800, transactions: 38 },
        { date: '2025-03-03', sales: 5900, transactions: 45 },
        { date: '2025-03-04', sales: 5400, transactions: 40 },
        { date: '2025-03-05', sales: 6100, transactions: 48 },
        { date: '2025-03-06', sales: 7200, transactions: 55 },
        { date: '2025-03-07', sales: 8100, transactions: 62 },
        { date: '2025-03-08', sales: 7800, transactions: 60 },
        { date: '2025-03-09', sales: 6500, transactions: 52 },
        { date: '2025-03-10', sales: 6200, transactions: 49 },
        { date: '2025-03-11', sales: 5800, transactions: 46 },
        { date: '2025-03-12', sales: 6700, transactions: 53 },
        { date: '2025-03-13', sales: 7100, transactions: 56 },
        { date: '2025-03-14', sales: 7500, transactions: 58 },
        { date: '2025-03-15', sales: 8300, transactions: 64 }
    ];
    
    // Mostrar datos en una tabla simple para simular
    const chartPlaceholder = document.createElement('div');
    chartPlaceholder.className = 'chart-placeholder';
    chartPlaceholder.innerHTML = `
        <div class="chart-legend">
            <div class="legend-item">
                <div class="color-box" style="background-color: #4e73df;"></div>
                <div class="legend-text">Ventas ($)</div>
            </div>
            <div class="legend-item">
                <div class="color-box" style="background-color: #1cc88a;"></div>
                <div class="legend-text">Transacciones</div>
            </div>
        </div>
    `;
    
    // Agregar placeholder
    container.innerHTML = '';
    container.appendChild(chartPlaceholder);
    
    // Actualizar resumen de ventas
    updateSalesSummary(salesData);
}

// Función para renderizar gráfico de productos más vendidos
function renderTopProductsChart() {
    const container = document.getElementById('top-products-chart');
    if (!container) return;
    
    console.log('Renderizando gráfico de productos más vendidos');
    
    // Datos simulados
    const topProducts = [
        { name: 'Smartphone X Pro', sales: 120, revenue: 96000 },
        { name: 'Laptop Ultra', sales: 85, revenue: 127500 },
        { name: 'Smart TV 55"', sales: 67, revenue: 80400 },
        { name: 'Auriculares Bluetooth', sales: 210, revenue: 12600 },
        { name: 'Tableta Pro', sales: 95, revenue: 57000 }
    ];
    
    // Crear tabla para mostrar productos
    const table = document.createElement('table');
    table.className = 'report-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Unidades Vendidas</th>
                <th>Ingresos</th>
            </tr>
        </thead>
        <tbody>
            ${topProducts.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td class="text-right">${product.sales}</td>
                    <td class="text-right">$${product.revenue.toLocaleString()}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    // Agregar tabla al contenedor
    container.innerHTML = '';
    container.appendChild(table);
}

// Función para renderizar gráfico de ventas por categoría
function renderCategorySalesChart() {
    const container = document.getElementById('category-sales-chart');
    if (!container) return;
    
    console.log('Renderizando gráfico de ventas por categoría');
    
    // Datos simulados
    const categoryData = [
        { category: 'Smartphones', sales: 245000, percentage: 35 },
        { category: 'Laptops', sales: 175000, percentage: 25 },
        { category: 'Televisores', sales: 105000, percentage: 15 },
        { category: 'Audio', sales: 70000, percentage: 10 },
        { category: 'Accesorios', sales: 52500, percentage: 7.5 },
        { category: 'Otros', sales: 52500, percentage: 7.5 }
    ];
    
    // Crear donut chart placeholder
    const chartPlaceholder = document.createElement('div');
    chartPlaceholder.className = 'pie-chart';
    
    // Crear leyenda
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    legend.innerHTML = categoryData.map(item => `
        <div class="legend-item">
            <div class="color-box" style="background-color: ${getRandomColor()};"></div>
            <div class="legend-text">${item.category} (${item.percentage}%)</div>
        </div>
    `).join('');
    
    // Agregar elementos al contenedor
    container.innerHTML = '';
    container.appendChild(chartPlaceholder);
    container.appendChild(legend);
}

// Función para renderizar gráfico de ventas por tienda
function renderStoreSalesChart() {
    const container = document.getElementById('store-sales-chart');
    if (!container) return;
    
    console.log('Renderizando gráfico de ventas por tienda');
    
    // Datos simulados
    const storeData = [
        { store: 'Tienda Central', sales: 280000, percentage: 40 },
        { store: 'Tienda Norte', sales: 175000, percentage: 25 },
        { store: 'Tienda Sur', sales: 105000, percentage: 15 },
        { store: 'Tienda Este', sales: 70000, percentage: 10 },
        { store: 'Tienda Oeste', sales: 70000, percentage: 10 }
    ];
    
    // Crear barras horizontales
    const barsContainer = document.createElement('div');
    barsContainer.className = 'location-stats';
    
    barsContainer.innerHTML = storeData.map(store => `
        <div class="location-item">
            <div class="location-name">${store.store}</div>
            <div class="location-bar-container">
                <div class="location-bar-fill" style="width: ${store.percentage}%;">${store.percentage}%</div>
            </div>
            <div class="location-count">$${store.sales.toLocaleString()}</div>
        </div>
    `).join('');
    
    // Agregar al contenedor
    container.innerHTML = '';
    container.appendChild(barsContainer);
}

// Actualizar resumen de ventas
function updateSalesSummary(salesData) {
    // Calcular totales
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
    const averageTicket = totalSales / totalTransactions;
    
    // Comparación con período anterior (simulado)
    const prevPeriodSales = totalSales * 0.92; // 8% menos
    const salesChange = ((totalSales - prevPeriodSales) / prevPeriodSales) * 100;
    
    // Actualizar elementos de resumen
    const summaryElements = {
        'total-sales': { value: `$${totalSales.toLocaleString()}`, change: salesChange.toFixed(1) + '%' },
        'total-transactions': { value: totalTransactions, change: '+5.2%' },
        'average-ticket': { value: `$${averageTicket.toFixed(2)}`, change: '+2.7%' },
        'conversion-rate': { value: '22.5%', change: '+1.3%' }
    };
    
    Object.keys(summaryElements).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const data = summaryElements[elementId];
        
        // Actualizar valor
        const valueElement = element.querySelector('.stat-value');
        if (valueElement) valueElement.textContent = data.value;
        
        // Actualizar cambio
        const changeElement = element.querySelector('.stat-change');
        if (changeElement) {
            changeElement.textContent = data.change;
            
            // Determinar si es positivo o negativo
            if (data.change.startsWith('+')) {
                changeElement.classList.add('positive');
                changeElement.classList.remove('negative');
            } else if (data.change.startsWith('-')) {
                changeElement.classList.add('negative');
                changeElement.classList.remove('positive');
            } else {
                changeElement.classList.remove('positive', 'negative');
            }
        }
    });
}

// Inicializar tablas de datos de reportes
function initDataTables() {
    const reportTables = document.querySelectorAll('.report-table');
    
    reportTables.forEach(table => {
        // En una aplicación real, usaríamos DataTables u otra biblioteca
        // Aquí agregamos funcionalidad básica de ordenamiento
        
        const headers = table.querySelectorAll('thead th');
        
        headers.forEach((header, index) => {
            if (header.classList.contains('no-sort')) return;
            
            header.style.cursor = 'pointer';
            header.setAttribute('data-sort-direction', 'none');
            
            header.addEventListener('click', function() {
                sortTable(table, index, this);
            });
        });
    });
}

// Función para ordenar tablas
function sortTable(table, columnIndex, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const direction = header.getAttribute('data-sort-direction');
    
    // Actualizar dirección de ordenamiento
    let newDirection = 'asc';
    if (direction === 'asc') {
        newDirection = 'desc';
    } else if (direction === 'desc') {
        newDirection = 'none';
    }
    
    // Resetear todos los headers
    table.querySelectorAll('thead th').forEach(th => {
        th.setAttribute('data-sort-direction', 'none');
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Configurar el header actual
    header.setAttribute('data-sort-direction', newDirection);
    if (newDirection !== 'none') {
        header.classList.add(`sort-${newDirection}`);
    }
    
    if (newDirection === 'none') {
        // Restablecer orden original (por ID o primera columna)
        rows.sort((a, b) => {
            const cellA = a.querySelector('td').textContent.trim();
            const cellB = b.querySelector('td').textContent.trim();
            
            // Si son números, ordenar numéricamente
            if (!isNaN(cellA) && !isNaN(cellB)) {
                return parseFloat(cellA) - parseFloat(cellB);
            }
            
            // Ordenamiento alfabético
            return cellA.localeCompare(cellB);
        });
    } else {
        // Ordenar por la columna seleccionada
        rows.sort((a, b) => {
            const cellA = a.querySelectorAll('td')[columnIndex].textContent.trim();
            const cellB = b.querySelectorAll('td')[columnIndex].textContent.trim();
            
            // Extraer números de valores monetarios u otros formatos
            const numA = extractNumber(cellA);
            const numB = extractNumber(cellB);
            
            // Si ambos son números válidos, usar comparación numérica
            if (!isNaN(numA) && !isNaN(numB)) {
                return newDirection === 'asc' ? numA - numB : numB - numA;
            }
            
            // De lo contrario, usar comparación alfabética
            return newDirection === 'asc'
                ? cellA.localeCompare(cellB)
                : cellB.localeCompare(cellA);
        });
    }
    
    // Actualizar tabla
    rows.forEach(row => tbody.appendChild(row));
}

// Función para extraer números de cadenas con formato
function extractNumber(text) {
    // Eliminar todos los caracteres que no sean dígitos, puntos o signos negativos
    const cleaned = text.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned);
}

// Inicializar manejadores de exportación
function initExportHandlers() {
    const exportButtons = document.querySelectorAll('.export-btn');
    
    exportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const format = this.getAttribute('data-format');
            const reportId = this.closest('.report-card, .report-section').getAttribute('data-report-id');
            
            exportReport(reportId, format);
        });
    });
}

// Función para exportar reportes
function exportReport(reportId, format) {
    const reportName = getReportName(reportId);
    
    // Obtener rango de fechas
    const startDate = document.querySelector('.date-start')?.value || 'todos';
    const endDate = document.querySelector('.date-end')?.value || 'actual';
    
    console.log(`Exportando reporte ${reportName} en formato ${format}`);
    console.log(`Período: ${startDate} - ${endDate}`);
    
    // Simular descarga
    showNotification(
        'Exportando reporte',
        `El reporte "${reportName}" en formato ${format.toUpperCase()} está siendo generado.`,
        'info'
    );
    
    // Simular descarga completa después de 2 segundos
    setTimeout(() => {
        // Crear un nombre de archivo basado en el reporte y la fecha
        const fileName = `${reportId}_${formatDate(new Date())}.${format}`;
        
        // Simular la descarga con un enlace falso
        const link = document.createElement('a');
        link.href = '#';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(
            'Reporte listo',
            `El reporte "${reportName}" ha sido exportado exitosamente.`,
            'success'
        );
    }, 2000);
}

// Obtener nombre de reporte según ID
function getReportName(reportId) {
    const reportNames = {
        'sales': 'Ventas',
        'products': 'Productos',
        'categories': 'Categorías',
        'stores': 'Tiendas',
        'inventory': 'Inventario',
        'customers': 'Clientes',
        'sales_detail': 'Detalle de Ventas'
    };
    
    return reportNames[reportId] || 'Reporte personalizado';
}

// Formatear fecha para nombres de archivo
function formatDate(date) {
    return date.getFullYear() + 
           ('0' + (date.getMonth() + 1)).slice(-2) + 
           ('0' + date.getDate()).slice(-2);
}

// Inicializar filtros de reportes
function initReportFilters() {
    const filterControls = document.querySelectorAll('.report-filter-control');
    
    filterControls.forEach(control => {
        control.addEventListener('change', function() {
            updateReportData();
        });
    });
}

// Función para actualizar datos de reportes según filtros
function updateReportData() {
    // Obtener todos los filtros activos
    const filters = {
        dateStart: document.querySelector('.date-start')?.value,
        dateEnd: document.querySelector('.date-end')?.value
    };
    
    // Agregar otros filtros
    document.querySelectorAll('.report-filter-control').forEach(control => {
        const name = control.getAttribute('name');
        const value = control.value;
        
        if (value) {
            filters[name] = value;
        }
    });
    
    console.log('Actualizando reportes con filtros:', filters);
    
    // Simular carga de datos
    showLoadingState();
    
    // Actualizar gráficos y tablas después de un retardo
    setTimeout(() => {
        refreshReportData(filters);
        hideLoadingState();
    }, 800);
}

// Mostrar estado de carga
function showLoadingState() {
    const reportContainers = document.querySelectorAll('.report-container, .report-card');
    
    reportContainers.forEach(container => {
        // Crear overlay de carga
        if (!container.querySelector('.loading-overlay')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
            
            container.style.position = 'relative';
            container.appendChild(loadingOverlay);
        }
    });
}

// Ocultar estado de carga
function hideLoadingState() {
    const loadingOverlays = document.querySelectorAll('.loading-overlay');
    
    loadingOverlays.forEach(overlay => {
        overlay.classList.add('fade-out');
        
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    });
}

// Actualizar datos de reportes
function refreshReportData(filters) {
    // Actualizar cada gráfico
    renderSalesChart();
    renderTopProductsChart();
    renderCategorySalesChart();
    renderStoreSalesChart();
    
    // Actualizar tablas de datos
    refreshReportTables();
}

// Actualizar tablas de reportes
function refreshReportTables() {
    // En una aplicación real, esto obtendría datos del servidor
    console.log('Actualizando tablas de reportes');
    
    // Simular datos actualizados
    const sampleData = Array(10).fill(0).map((_, i) => {
        const price = Math.floor(Math.random() * 1000) + 100;
        const sales = Math.floor(Math.random() * 100) + 10;
        return {
            id: `P${1000 + i}`,
            product: `Producto ${i + 1}`,
            category: ['Smartphones', 'Laptops', 'Televisores', 'Audio', 'Accesorios'][Math.floor(Math.random() * 5)],
            price: price,
            sales: sales,
            revenue: price * sales
        };
    });
    
    // Actualizar tablas
    const productTable = document.querySelector('#product-sales-table');
    if (productTable) {
        const tbody = productTable.querySelector('tbody');
        
        if (tbody) {
            tbody.innerHTML = sampleData.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.product}</td>
                    <td>${item.category}</td>
                    <td class="text-right">$${item.price.toLocaleString()}</td>
                    <td class="text-right">${item.sales}</td>
                    <td class="text-right">$${item.revenue.toLocaleString()}</td>
                </tr>
            `).join('');
        }
    }
}

// Inicializar programación de reportes
function initScheduleReports() {
    const scheduleButtons = document.querySelectorAll('.schedule-report-btn');
    
    scheduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const reportId = this.closest('.report-card, .report-section').getAttribute('data-report-id');
            openScheduleModal(reportId);
        });
    });
}

// Abrir modal de programación de reportes
function openScheduleModal(reportId) {
    const reportName = getReportName(reportId);
    
    const modal = document.getElementById('scheduleReportModal');
    if (!modal) {
        // Crear modal si no existe
        createScheduleModal();
    }
    
    // Actualizar título del modal
    const modalTitle = document.querySelector('#scheduleReportModal .modal-title');
    if (modalTitle) {
        modalTitle.textContent = `Programar Reporte: ${reportName}`;
    }
    
    // Establecer ID de reporte en el formulario
    const reportIdInput = document.querySelector('#schedule-report-id');
    if (reportIdInput) {
        reportIdInput.value = reportId;
    }
    
    // Abrir modal
    const modalOverlay = document.getElementById('scheduleReportModal');
    if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
}

// Crear modal de programación de reportes
function createScheduleModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'scheduleReportModal';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Programar Reporte</h3>
                <button class="close-button" data-close="scheduleReportModal">×</button>
            </div>
            
            <div class="modal-body">
                <form id="schedule-report-form">
                    <input type="hidden" id="schedule-report-id" name="report_id">
                    
                    <div class="form-group">
                        <label class="form-label">Frecuencia</label>
                        <select class="form-control" name="frequency" id="schedule-frequency">
                            <option value="daily">Diario</option>
                            <option value="weekly" selected>Semanal</option>
                            <option value="monthly">Mensual</option>
                            <option value="quarterly">Trimestral</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="weekly-options">
                        <label class="form-label">Día de la semana</label>
                        <select class="form-control" name="day_of_week">
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="0">Domingo</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="monthly-options" style="display:none;">
                        <label class="form-label">Día del mes</label>
                        <select class="form-control" name="day_of_month">
                            ${Array(31).fill(0).map((_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
                            <option value="last">Último día</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Hora del día</label>
                        <input type="time" class="form-control" name="time_of_day" value="08:00">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Formato</label>
                        <select class="form-control" name="format">
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Destinatarios</label>
                        <div class="recipients-container">
                            <div class="recipient-item">
                                <input type="email" class="form-control" name="recipients[]" placeholder="correo@ejemplo.com">
                                <button type="button" class="btn-icon remove-recipient"><i>✖</i></button>
                            </div>
                            <button type="button" class="btn btn-sm btn-secondary add-recipient">
                                <i>+</i> Agregar destinatario
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Asunto del correo</label>
                        <input type="text" class="form-control" name="email_subject" value="Reporte programado - Hugo Tecnología">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mensaje</label>
                        <textarea class="form-control" name="email_message" rows="3">Adjunto encontrará el reporte solicitado. Este correo es generado automáticamente, por favor no responda a esta dirección.</textarea>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-close="scheduleReportModal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="save-schedule">Guardar Programación</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Configurar evento de cierre
    const closeBtn = modal.querySelector('[data-close="scheduleReportModal"]');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
    
    // Cambiar opciones según frecuencia
    const frequencySelect = modal.querySelector('#schedule-frequency');
    if (frequencySelect) {
        frequencySelect.addEventListener('change', function() {
            const weeklyOptions = document.getElementById('weekly-options');
            const monthlyOptions = document.getElementById('monthly-options');
            
            switch (this.value) {
                case 'daily':
                    weeklyOptions.style.display = 'none';
                    monthlyOptions.style.display = 'none';
                    break;
                case 'weekly':
                    weeklyOptions.style.display = 'block';
                    monthlyOptions.style.display = 'none';
                    break;
                case 'monthly':
                case 'quarterly':
                    weeklyOptions.style.display = 'none';
                    monthlyOptions.style.display = 'block';
                    break;
            }
        });
    }
    
    // Agregar/eliminar destinatarios
    const addRecipientBtn = modal.querySelector('.add-recipient');
    if (addRecipientBtn) {
        addRecipientBtn.addEventListener('click', function() {
            const container = document.querySelector('.recipients-container');
            const recipientTemplate = document.querySelector('.recipient-item').cloneNode(true);
            
            // Limpiar valor
            recipientTemplate.querySelector('input').value = '';
            
            // Agregar antes del botón
            container.insertBefore(recipientTemplate, this);
            
            // Configurar botón de eliminar
            const removeBtn = recipientTemplate.querySelector('.remove-recipient');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    recipientTemplate.parentNode.removeChild(recipientTemplate);
                });
            }
        });
    }
    
    // Configurar botones de eliminar destinatario
    const removeRecipientBtns = modal.querySelectorAll('.remove-recipient');
    removeRecipientBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.recipient-item');
            if (item) {
                item.parentNode.removeChild(item);
            }
        });
    });
    
    // Guardar programación
    const saveBtn = modal.querySelector('#save-schedule');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const form = document.getElementById('schedule-report-form');
            if (!form) return;
            
            // Validar formulario
            const recipients = form.querySelectorAll('input[name="recipients[]"]');
            let isValid = true;
            let hasRecipients = false;
            
            recipients.forEach(input => {
                if (input.value.trim()) {
                    hasRecipients = true;
                    
                    // Validar formato de email
                    if (!validateEmail(input.value.trim())) {
                        input.classList.add('invalid');
                        isValid = false;
                    } else {
                        input.classList.remove('invalid');
                    }
                }
            });
            
            if (!hasRecipients) {
                showNotification('Error', 'Debe agregar al menos un destinatario', 'error');
                return;
            }
            
            if (!isValid) {
                showNotification('Error', 'Verifique las direcciones de correo ingresadas', 'error');
                return;
            }
            
            // Recopilar datos del formulario
            const formData = new FormData(form);
            const scheduleData = {};
            
            for (const [key, value] of formData.entries()) {
                if (key === 'recipients[]') {
                    if (!scheduleData.recipients) {
                        scheduleData.recipients = [];
                    }
                    
                    if (value.trim()) {
                        scheduleData.recipients.push(value.trim());
                    }
                } else {
                    scheduleData[key] = value;
                }
            }
            
            // En una aplicación real, enviar datos al servidor
            console.log('Guardando programación:', scheduleData);
            
            // Generar mensaje de confirmación basado en la frecuencia programada
            const frequencyText = {
                'daily': 'diariamente',
                'weekly': 'todos los ' + getDayName(scheduleData.day_of_week),
                'monthly': scheduleData.day_of_month === 'last' ? 
                    'el último día de cada mes' : 
                    `el día ${scheduleData.day_of_month} de cada mes`,
                'quarterly': scheduleData.day_of_month === 'last' ?
                    'el último día de cada trimestre' :
                    `el día ${scheduleData.day_of_month} de cada trimestre`
            };
            
            // Formatear hora
            const timeParts = scheduleData.time_of_day.split(':');
            const hour = parseInt(timeParts[0]);
            const minute = timeParts[1];
            const formattedTime = `${hour}:${minute}`;
            
            // Mostrar mensaje de éxito
            showNotification(
                'Programación guardada',
                `El reporte se enviará ${frequencyText[scheduleData.frequency]} a las ${formattedTime}.`,
                'success'
            );
            
            // Cerrar modal
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }
}

// Obtener nombre del día de la semana
function getDayName(dayNumber) {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[dayNumber] || 'lunes';
}

// Validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Función para mostrar notificaciones
function showNotification(title, message, type = 'info') {
    // Verificar si existe el contenedor de notificaciones
    let notificationContainer = document.querySelector('.notification-container');
    
    // Crear contenedor si no existe
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Añadir contenido
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-title">${title}</div>
            <button class="notification-close">×</button>
        </div>
        <div class="notification-body">
            ${message}
        </div>
    `;
    
    // Añadir al contenedor
    notificationContainer.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Configurar cierre
    notification.querySelector('.notification-close').addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// Función para cerrar notificación
function closeNotification(notification) {
    notification.classList.remove('visible');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Función auxiliar para generar colores aleatorios
function getRandomColor() {
    const colors = [
        '#4e73df', // Azul
        '#1cc88a', // Verde
        '#36b9cc', // Turquesa
        '#f6c23e', // Amarillo
        '#e74a3b', // Rojo
        '#6f42c1', // Púrpura
        '#fd7e14', // Naranja
        '#5a5c69'  // Gris
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Inicialización de filtros de tabla de datos
document.addEventListener('DOMContentLoaded', function() {
    // Búsqueda en tabla de productos
    const searchInput = document.querySelector('.table-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = document.querySelector('#product-sales-table');
            
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
                
                // Actualizar contador de resultados
                updateSearchResults(table);
            }
        });
    }
    
    // Selector de ítems por página
    const itemsPerPageSelect = document.querySelector('.table-actions select');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener('change', function() {
            const itemsPerPage = parseInt(this.value);
            const table = document.querySelector('#product-sales-table');
            
            if (table) {
                // Guardar preferencia
                localStorage.setItem('items_per_page', itemsPerPage);
                
                // Actualizar paginación
                updateTablePagination(table, itemsPerPage);
            }
        });
        
        // Cargar preferencia guardada
        const savedItemsPerPage = localStorage.getItem('items_per_page');
        if (savedItemsPerPage) {
            itemsPerPageSelect.value = savedItemsPerPage;
            
            // Disparar evento de cambio para aplicar
            const event = new Event('change');
            itemsPerPageSelect.dispatchEvent(event);
        }
    }
    
    // Inicializar paginación
    initTablePagination();
});

// Actualizar contador de resultados de búsqueda
function updateSearchResults(table) {
    const visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])').length;
    const totalRows = table.querySelectorAll('tbody tr').length;
    const paginationInfo = document.querySelector('.pagination-info');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${visibleRows} de ${totalRows} productos`;
    }
}

// Inicializar paginación de tabla
function initTablePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    const pageItems = pagination.querySelectorAll('.page-item');
    const prevButton = pagination.querySelector('.page-nav:first-child');
    const nextButton = pagination.querySelector('.page-nav:last-child');
    
    // Por defecto, primera página activa
    let currentPage = 1;
    
    // Configurar eventos de clic en páginas
    pageItems.forEach(item => {
        if (item.textContent === '...') return;
        
        item.addEventListener('click', function() {
            const pageNum = parseInt(this.textContent);
            if (!isNaN(pageNum)) {
                goToPage(pageNum);
            }
        });
    });
    
    // Configurar botones de navegación
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (!this.hasAttribute('disabled')) {
                goToPage(currentPage - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (!this.hasAttribute('disabled')) {
                goToPage(currentPage + 1);
            }
        });
    }
    
    // Función para cambiar de página
    function goToPage(pageNum) {
        const table = document.querySelector('#product-sales-table');
        if (!table) return;
        
        const itemsPerPage = parseInt(document.querySelector('.table-actions select')?.value || '10');
        const totalRows = table.querySelectorAll('tbody tr').length;
        const totalPages = Math.ceil(totalRows / itemsPerPage);
        
        if (pageNum < 1 || pageNum > totalPages) return;
        
        currentPage = pageNum;
        
        // Mostrar filas correspondientes
        const rows = table.querySelectorAll('tbody tr');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });
        
        // Actualizar UI de paginación
        updatePaginationUI(currentPage, totalPages);
        
        // Actualizar información de paginación
        updatePaginationInfo(currentPage, itemsPerPage, totalRows);
    }
    
    // Actualizar UI de paginación
    function updatePaginationUI(currentPage, totalPages) {
        // Actualizar clases activas
        pageItems.forEach(item => {
            if (item.textContent === '...') return;
            
            const pageNum = parseInt(item.textContent);
            if (!isNaN(pageNum)) {
                if (pageNum === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
        
        // Habilitar/deshabilitar botones de navegación
        if (prevButton) {
            if (currentPage <= 1) {
                prevButton.setAttribute('disabled', 'disabled');
            } else {
                prevButton.removeAttribute('disabled');
            }
        }
        
        if (nextButton) {
            if (currentPage >= totalPages) {
                nextButton.setAttribute('disabled', 'disabled');
            } else {
                nextButton.removeAttribute('disabled');
            }
        }
    }
    
    // Actualizar información de paginación
    function updatePaginationInfo(currentPage, itemsPerPage, totalRows) {
        const infoElement = document.querySelector('.pagination-info');
        if (!infoElement) return;
        
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, totalRows);
        
        infoElement.textContent = `Mostrando ${startItem}-${endItem} de ${totalRows} productos`;
    }
    
    // Inicializar con primera página
    goToPage(1);
}

// Actualizar paginación cuando cambia items por página
function updateTablePagination(table, itemsPerPage) {
    const totalRows = table.querySelectorAll('tbody tr').length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);
    
    // Reiniciar a la primera página
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.display = (index < itemsPerPage) ? '' : 'none';
    });
    
    // Actualizar información de paginación
    const infoElement = document.querySelector('.pagination-info');
    if (infoElement) {
        const endItem = Math.min(itemsPerPage, totalRows);
        infoElement.textContent = `Mostrando 1-${endItem} de ${totalRows} productos`;
    }
    
    // Actualizar UI de paginación
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        const pageItems = pagination.querySelectorAll('.page-item');
        const prevButton = pagination.querySelector('.page-nav:first-child');
        const nextButton = pagination.querySelector('.page-nav:last-child');
        
        // Actualizar clases activas
        pageItems.forEach(item => {
            if (item.textContent === '...') return;
            
            const pageNum = parseInt(item.textContent);
            if (!isNaN(pageNum)) {
                if (pageNum === 1) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
        
        // Configurar botones de navegación
        if (prevButton) {
            prevButton.setAttribute('disabled', 'disabled');
        }
        
        if (nextButton) {
            if (totalPages <= 1) {
                nextButton.setAttribute('disabled', 'disabled');
            } else {
                nextButton.removeAttribute('disabled');
            }
        }
    }
}

// Inicializar eventos para reportes guardados
document.addEventListener('DOMContentLoaded', function() {
    const savedReportCards = document.querySelectorAll('.saved-report-card');
    
    savedReportCards.forEach(card => {
        // Botón de ver reporte
        const viewBtn = card.querySelector('[title="Ver reporte"]');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const reportName = card.querySelector('h4').textContent;
                
                showNotification('Cargando...', `Cargando reporte: ${reportName}`, 'info');
                
                // Simular carga
                setTimeout(() => {
                    // En una aplicación real, redirigir o mostrar el reporte
                    alert(`Mostrando reporte: ${reportName}`);
                }, 1000);
            });
        }
        
        // Botón de exportar
        const exportBtn = card.querySelector('[title="Exportar reporte"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                const reportName = card.querySelector('h4').textContent;
                
                // Mostrar opciones de exportación
                const format = prompt('Seleccione formato de exportación (pdf, excel, csv):', 'pdf');
                
                if (format && ['pdf', 'excel', 'csv'].includes(format.toLowerCase())) {
                    showNotification('Exportando...', `Exportando reporte: ${reportName} en formato ${format.toUpperCase()}`, 'info');
                    
                    // Simular exportación
                    setTimeout(() => {
                        // Crear un nombre de archivo
                        const fileName = `${reportName.toLowerCase().replace(/\s+/g, '_')}_${formatDate(new Date())}.${format}`;
                        
                        // Simular descarga
                        const link = document.createElement('a');
                        link.href = '#';
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        showNotification('Exportación completa', `El reporte ${reportName} ha sido exportado exitosamente.`, 'success');
                    }, 1500);
                }
            });
        }
        
        // Botón de opciones
        const optionsBtn = card.querySelector('[title="Opciones"]');
        if (optionsBtn) {
            optionsBtn.addEventListener('click', function() {
                const reportName = card.querySelector('h4').textContent;
                
                // Mostrar menú de opciones (en implementación real sería un dropdown)
                const option = prompt(`Opciones para ${reportName}:\n1. Editar\n2. Programar envío\n3. Eliminar\nSeleccione una opción:`, '1');
                
                switch (option) {
                    case '1':
                        showNotification('Editando...', `Editando reporte: ${reportName}`, 'info');
                        break;
                    case '2':
                        showNotification('Programando...', `Programando envío de reporte: ${reportName}`, 'info');
                        break;
                    case '3':
                        if (confirm(`¿Está seguro de que desea eliminar el reporte: ${reportName}?`)) {
                            // Simular eliminación
                            card.style.opacity = '0';
                            setTimeout(() => {
                                card.style.display = 'none';
                                showNotification('Eliminado', `El reporte ${reportName} ha sido eliminado.`, 'success');
                            }, 300);
                        }
                        break;
                }
            });
        }
    });
});