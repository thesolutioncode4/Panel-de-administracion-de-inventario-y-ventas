// JavaScript específico para la página de ventas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones de ventas
    initVentas();
  });
  
  // Función principal de inicialización
  function initVentas() {
    initViewToggle();
    initDateRangeButtons();
    initModalTabs();
    initSortTable();
    initProductRows();
    initSaleDetails();
    initSearch();
  }
  
  // Inicializar alternancia de vista (Lista vs Kanban)
  function initViewToggle() {
    const listViewBtn = document.getElementById('list-view');
    const kanbanViewBtn = document.getElementById('kanban-view');
    const listView = document.querySelector('.list-view');
    const kanbanView = document.querySelector('.kanban-view');
    
    if (!listViewBtn || !kanbanViewBtn) return;
    
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      kanbanViewBtn.classList.remove('active');
      listView.classList.add('active');
      kanbanView.classList.remove('active');
      
      // Guardar preferencia en localStorage
      localStorage.setItem('sales-view-preference', 'list');
    });
    
    kanbanViewBtn.addEventListener('click', () => {
      kanbanViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      kanbanView.classList.add('active');
      listView.classList.remove('active');
      
      // Guardar preferencia en localStorage
      localStorage.setItem('sales-view-preference', 'kanban');
    });
    
    // Cargar preferencia de localStorage
    const savedViewPreference = localStorage.getItem('sales-view-preference');
    if (savedViewPreference === 'kanban') {
      kanbanViewBtn.click();
    }
  }
  
  // Inicializar botones de rango de fechas
  function initDateRangeButtons() {
    const dateButtons = document.querySelectorAll('.date-range .btn');
    
    dateButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Quitar clase active de todos los botones
        dateButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón seleccionado
        button.classList.add('active');
        
        // Acción de cambio de rango de fecha (simulada)
        updateDateRange(button.textContent.trim().toLowerCase());
      });
    });
    
    function updateDateRange(range) {
      console.log(`Cambiando rango de fecha a: ${range}`);
      // En una aplicación real, esto actualizaría los datos y el gráfico
    }
  }
  
  // Inicializar tabs del modal
  function initModalTabs() {
    // Similar a la función de modalTabs en otros scripts
    // No se utiliza en esta página actualmente, pero podría ser útil si se agregan tabs
  }
  
  // Inicializar ordenamiento de tabla
  function initSortTable() {
    const sortableHeaders = document.querySelectorAll('th[data-sort]');
    
    sortableHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const sortDirection = this.getAttribute('data-sort-direction') || 'asc';
        const sortField = this.getAttribute('data-sort');
        
        // Actualizar dirección de ordenamiento para el próximo clic
        this.setAttribute('data-sort-direction', sortDirection === 'asc' ? 'desc' : 'asc');
        
        // En una aplicación real, esto ordenaría los datos en el servidor
        // Para esta demo, ordenaremos los elementos del DOM
        sortTable(sortField, sortDirection);
      });
    });
    
    function sortTable(field, direction) {
      const tbody = document.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      
      const sortedRows = rows.sort((a, b) => {
        let valA, valB;
        
        switch (field) {
          case 'id':
            valA = a.querySelector('td:nth-child(1)').textContent;
            valB = b.querySelector('td:nth-child(1)').textContent;
            break;
          case 'date':
            valA = a.querySelector('td:nth-child(2)').textContent;
            valB = b.querySelector('td:nth-child(2)').textContent;
            break;
          case 'customer':
            valA = a.querySelector('td:nth-child(3)').textContent;
            valB = b.querySelector('td:nth-child(3)').textContent;
            break;
          case 'store':
            valA = a.querySelector('td:nth-child(4)').textContent;
            valB = b.querySelector('td:nth-child(4)').textContent;
            break;
          case 'products':
            valA = parseInt(a.querySelector('td:nth-child(5)').textContent);
            valB = parseInt(b.querySelector('td:nth-child(5)').textContent);
            break;
          case 'total':
            valA = parseFloat(a.querySelector('td:nth-child(6)').textContent.replace('$', '').replace(',', ''));
            valB = parseFloat(b.querySelector('td:nth-child(6)').textContent.replace('$', '').replace(',', ''));
            break;
          case 'payment':
            valA = a.querySelector('td:nth-child(7)').textContent;
            valB = b.querySelector('td:nth-child(7)').textContent;
            break;
          case 'status':
            valA = a.querySelector('td:nth-child(8) .badge').textContent;
            valB = b.querySelector('td:nth-child(8) .badge').textContent;
            break;
          default:
            valA = a.querySelector('td:nth-child(1)').textContent;
            valB = b.querySelector('td:nth-child(1)').textContent;
        }
        
        if (valA < valB) {
          return direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      
      // Limpiar y reordenar filas
      rows.forEach(row => row.remove());
      sortedRows.forEach(row => tbody.appendChild(row));
    }
  }
  
  // Inicializar filas de productos en modal nueva venta
  function initProductRows() {
    const addProductBtn = document.getElementById('add-product');
    if (!addProductBtn) return;
    
    // Evento para agregar nueva fila de producto
    addProductBtn.addEventListener('click', addProductRow);
    
    // Inicializar cálculos para la primera fila
    initProductRowEvents(document.querySelector('.product-row'));
    
    // Actualizar totales iniciales
    updateSaleSummary();
    
    // Función para agregar nueva fila de producto
    function addProductRow() {
      const productsTable = document.querySelector('.products-table tbody');
      
      // Clonar la primera fila como plantilla
      const newRow = document.querySelector('.product-row').cloneNode(true);
      
      // Limpiar valores
      newRow.querySelectorAll('input').forEach(input => {
        if (input.type === 'number') {
          if (input.classList.contains('product-quantity')) {
            input.value = '1';
          } else {
            input.value = '';
          }
        }
      });
      
      newRow.querySelector('select').selectedIndex = 0;
      
      // Agregar evento de eliminación de fila
      initProductRowEvents(newRow);
      
      // Agregar al DOM
      productsTable.appendChild(newRow);
    }
    
    // Inicializar eventos para una fila de producto
    function initProductRowEvents(row) {
      const productSelect = row.querySelector('select');
      const priceInput = row.querySelector('.product-price');
      const quantityInput = row.querySelector('.product-quantity');
      const discountInput = row.querySelector('.product-discount');
      const totalInput = row.querySelector('.product-total');
      const removeBtn = row.querySelector('.remove-product');
      
      // Cambio de producto
      productSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        
        if (price) {
          priceInput.value = price;
          calculateRowTotal();
        } else {
          priceInput.value = '';
          totalInput.value = '';
        }
        
        updateSaleSummary();
      });
      
      // Cambio de cantidad
      quantityInput.addEventListener('input', function() {
        calculateRowTotal();
        updateSaleSummary();
      });
      
      // Cambio de descuento
      discountInput.addEventListener('input', function() {
        calculateRowTotal();
        updateSaleSummary();
      });
      
      // Botón eliminar fila
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          // No eliminar si es la única fila
          const rows = document.querySelectorAll('.product-row');
          if (rows.length > 1) {
            row.remove();
            updateSaleSummary();
          } else {
            alert('Debe haber al menos una línea de producto');
          }
        });
      }
      
      // Calcular total para esta fila
      function calculateRowTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        
        const total = price * quantity - discount;
        totalInput.value = total.toFixed(2);
      }
    }
    
    // Actualizar resumen de venta
    function updateSaleSummary() {
      const totalInputs = document.querySelectorAll('.product-total');
      const discountInputs = document.querySelectorAll('.product-discount');
      
      let subtotal = 0;
      let totalDiscount = 0;
      
      totalInputs.forEach(input => {
        subtotal += parseFloat(input.value) || 0;
      });
      
      discountInputs.forEach(input => {
        totalDiscount += parseFloat(input.value) || 0;
      });
      
      // Calcular impuesto (16%)
      const tax = subtotal * 0.16;
      const total = subtotal + tax;
      
      // Actualizar valores en el resumen
      const subtotalEl = document.querySelector('.summary-section .summary-row:nth-child(1) .summary-value');
      const discountEl = document.querySelector('.summary-section .summary-row:nth-child(2) .summary-value');
      const taxEl = document.querySelector('.summary-section .summary-row:nth-child(3) .summary-value');
      const totalEl = document.querySelector('.summary-section .summary-row.total .summary-value');
      
      if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
      if (discountEl) discountEl.textContent = '$' + totalDiscount.toFixed(2);
      if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
      if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
    }
  }
  
  // Inicializar detalles de venta
  function initSaleDetails() {
    const detailButtons = document.querySelectorAll('[data-modal="verDetallesVenta"]');
    
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const saleId = button.getAttribute('data-id');
        
        if (saleId) {
          openSaleDetails(saleId);
        } else {
          openModal('verDetallesVenta');
        }
      });
    });
  }
  
  // Abrir detalles de una venta específica
  function openSaleDetails(saleId) {
    // En un entorno real, esto cargaría datos desde el servidor
    // Para esta demo, solo abrimos el modal
    openModal('verDetallesVenta');
    
    // Actualizar título del modal con el ID de venta
    const modalTitle = document.querySelector('#verDetallesVenta .sale-id h4');
    if (modalTitle) {
      modalTitle.textContent = `Venta #${saleId}`;
    }
  }
  
  // Inicializar búsqueda
  function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      
      // Buscar en la vista de tabla
      const tableRows = document.querySelectorAll('.list-view tbody tr');
      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
      
      // Buscar en la vista de kanban
      const kanbanCards = document.querySelectorAll('.kanban-card');
      kanbanCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? '' : 'none';
      });
      
      // Actualizar contador de elementos visibles
      updateVisibleItemsCount();
    });
  }
  
  // Actualizar contador de elementos visibles
  function updateVisibleItemsCount() {
    const paginationInfo = document.querySelector('.pagination-info');
    if (!paginationInfo) return;
    
    const isListView = document.querySelector('.list-view.active') !== null;
    const visibleItems = isListView
      ? document.querySelectorAll('.list-view tbody tr:not([style*="display: none"])')
      : document.querySelectorAll('.kanban-card:not([style*="display: none"])');
    
    const totalItems = 1243; // Total de ventas en la demo
    
    paginationInfo.textContent = `Mostrando ${visibleItems.length} de ${totalItems} ventas`;
  }
  
  // Función auxiliar para abrir modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Evitar scroll del body
    }
  }
  
  // Función auxiliar para cerrar modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  // Manejar la navegación entre páginas
  document.addEventListener('DOMContentLoaded', function() {
    const paginationItems = document.querySelectorAll('.pagination .page-item');
    const paginationNext = document.querySelector('.pagination .page-nav:last-child');
    const paginationPrev = document.querySelector('.pagination .page-nav:first-child');
    
    if (!paginationItems.length) return;
    
    paginationItems.forEach(item => {
      item.addEventListener('click', function() {
        // Saltar si es el elemento "..."
        if (this.textContent === '...') return;
        
        // Quitar clase active de todos los elementos
        paginationItems.forEach(p => p.classList.remove('active'));
        
        // Agregar clase active al elemento seleccionado
        this.classList.add('active');
        
        // Habilitar/deshabilitar botones anterior/siguiente
        if (paginationPrev) {
          paginationPrev.disabled = this.textContent === '1';
        }
        
        if (paginationNext) {
          paginationNext.disabled = this.textContent === paginationItems[paginationItems.length - 1].textContent;
        }
      });
    });
    
    // Botón siguiente
    if (paginationNext) {
      paginationNext.addEventListener('click', function() {
        if (this.disabled) return;
        
        const activePage = document.querySelector('.pagination .page-item.active');
        if (!activePage) return;
        
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('page-item') && nextPage.textContent !== '...') {
          nextPage.click();
        } else if (nextPage && nextPage.textContent === '...') {
          // Si siguiente es "...", ir a la página después de él
          const pageAfterEllipsis = nextPage.nextElementSibling;
          if (pageAfterEllipsis) {
            pageAfterEllipsis.click();
          }
        }
      });
    }
    
    // Botón anterior
    if (paginationPrev) {
      paginationPrev.addEventListener('click', function() {
        if (this.disabled) return;
        
        const activePage = document.querySelector('.pagination .page-item.active');
        if (!activePage) return;
        
        const prevPage = activePage.previousElementSibling;
        if (prevPage && prevPage.classList.contains('page-item')) {
          prevPage.click();
        }
      });
    }
  });