// JavaScript específico para la página de negocios
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones de negocios
    initNegocios();
  });
  
  // Función principal de inicialización
  function initNegocios() {
    initViewToggle();
    initModalTabs();
    initMapMarkers();
    initBusinessHours();
    initFilterControls();
    initSortTable();
    initBusinessDetails();
    initChartControls();
    initSearch();
  }
  
  // Inicializar alternancia de vista (Lista vs Cuadrícula)
  function initViewToggle() {
    const listViewBtn = document.getElementById('list-view');
    const gridViewBtn = document.getElementById('grid-view');
    const listView = document.querySelector('.list-view');
    const gridView = document.querySelector('.grid-view');
    
    if (!listViewBtn || !gridViewBtn) return;
    
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      listView.classList.add('active');
      gridView.classList.remove('active');
      
      // Guardar preferencia en localStorage
      localStorage.setItem('business-view-preference', 'list');
    });
    
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      gridView.classList.add('active');
      listView.classList.remove('active');
      
      // Guardar preferencia en localStorage
      localStorage.setItem('business-view-preference', 'grid');
    });
    
    // Cargar preferencia de localStorage
    const savedViewPreference = localStorage.getItem('business-view-preference');
    if (savedViewPreference === 'grid') {
      gridViewBtn.click();
    }
  }
  
  // Inicializar pestañas de modal
  function initModalTabs() {
    const modalTabsContainers = document.querySelectorAll('.modal-tabs');
    
    modalTabsContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      const parentModal = container.closest('.modal');
      
      if (!parentModal) return;
      
      const tabContents = parentModal.querySelectorAll('.tab-content');
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Quitar clase active de todas las pestañas y contenidos
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          
          // Agregar clase active a la pestaña seleccionada y su contenido
          tab.classList.add('active');
          if (tabContents[index]) {
            tabContents[index].classList.add('active');
          }
        });
      });
    });
    
    // Inicializar pestañas de detalles
    const detailTabs = document.querySelectorAll('.detail-tabs .tab');
    const detailTabContents = document.querySelectorAll('#verDetallesNegocio .tab-content');
    
    detailTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        detailTabs.forEach(t => t.classList.remove('active'));
        detailTabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        if (detailTabContents[index]) {
          detailTabContents[index].classList.add('active');
        }
      });
    });
  }
  
  // Inicializar marcadores del mapa
  function initMapMarkers() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
      // Tooltips en hover
      marker.addEventListener('mouseenter', () => {
        marker.querySelector('.marker-tooltip').style.display = 'block';
      });
      
      marker.addEventListener('mouseleave', () => {
        marker.querySelector('.marker-tooltip').style.display = 'none';
      });
      
      // Clic para ver detalles
      marker.addEventListener('click', () => {
        const businessId = marker.getAttribute('data-business');
        // Abrir modal de detalles o navegar a la pestaña correspondiente
        if (businessId) {
          openBusinessDetails(businessId);
        }
      });
    });
  }
  
  // Inicializar horarios de negocio en el formulario
  function initBusinessHours() {
    const dayClosedCheckboxes = document.querySelectorAll('.day-closed input[type="checkbox"]');
    
    dayClosedCheckboxes.forEach(checkbox => {
      const dayHourInputs = checkbox.closest('.business-day').querySelectorAll('.hour-input input');
      
      // Estado inicial
      toggleHourInputs(checkbox, dayHourInputs);
      
      // Cambiar estado al marcar/desmarcar
      checkbox.addEventListener('change', () => {
        toggleHourInputs(checkbox, dayHourInputs);
      });
    });
    
    function toggleHourInputs(checkbox, inputs) {
      const isDisabled = checkbox.checked;
      inputs.forEach(input => {
        input.disabled = isDisabled;
        if (isDisabled) {
          input.parentElement.style.opacity = '0.5';
        } else {
          input.parentElement.style.opacity = '1';
        }
      });
    }
  }
  
  // Inicializar controles de filtro
  function initFilterControls() {
    const filterSelects = document.querySelectorAll('.filter-controls select');
    
    filterSelects.forEach(select => {
      select.addEventListener('change', function() {
        applyFilters();
      });
    });
    
    function applyFilters() {
      const typeFilter = document.querySelector('.filter-controls select:nth-child(1)').value;
      const regionFilter = document.querySelector('.filter-controls select:nth-child(2)').value;
      const statusFilter = document.querySelector('.filter-controls select:nth-child(3)').value;
      
      // Aplicar filtros a filas de tabla
      const rows = document.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        const type = row.querySelector('td:nth-child(3)').textContent;
        const location = row.querySelector('td:nth-child(4)').textContent;
        const statusBadge = row.querySelector('td:nth-child(9) .badge');
        const status = statusBadge ? statusBadge.textContent : '';
        
        let showRow = true;
        
        if (typeFilter && !type.includes(typeFilter === 'tienda' ? 'Tienda' : 
                                       typeFilter === 'distribuidor' ? 'Distribuidor' : 
                                       typeFilter === 'franquicia' ? 'Franquicia' : 
                                       typeFilter === 'online' ? 'Online' : '')) {
          showRow = false;
        }
        
        if (regionFilter && !location.toLowerCase().includes(regionFilter === 'norte' ? 'norte' : 
                                                          regionFilter === 'sur' ? 'sur' : 
                                                          regionFilter === 'este' ? 'este' : 
                                                          regionFilter === 'oeste' ? 'oeste' : 
                                                          regionFilter === 'central' ? 'central' : '')) {
          showRow = false;
        }
        
        if (statusFilter) {
          if (statusFilter === 'activo' && status !== 'Activo') {
            showRow = false;
          } else if (statusFilter === 'inactivo' && status !== 'Inactivo') {
            showRow = false;
          } else if (statusFilter === 'pendiente' && status !== 'Pendiente') {
            showRow = false;
          }
        }
        
        row.style.display = showRow ? '' : 'none';
      });
      
      // Aplicar filtros a tarjetas
      const cards = document.querySelectorAll('.business-card');
      
      cards.forEach(card => {
        const type = card.querySelector('.business-type').textContent;
        const location = card.querySelector('.business-location').textContent;
        const statusBadge = card.querySelector('.badge');
        const status = statusBadge ? statusBadge.textContent : '';
        
        let showCard = true;
        
        if (typeFilter && !type.includes(typeFilter === 'tienda' ? 'Tienda' : 
                                       typeFilter === 'distribuidor' ? 'Distribuidor' : 
                                       typeFilter === 'franquicia' ? 'Franquicia' : 
                                       typeFilter === 'online' ? 'Online' : '')) {
          showCard = false;
        }
        
        if (regionFilter && !location.toLowerCase().includes(regionFilter === 'norte' ? 'norte' : 
                                                          regionFilter === 'sur' ? 'sur' : 
                                                          regionFilter === 'este' ? 'este' : 
                                                          regionFilter === 'oeste' ? 'oeste' : 
                                                          regionFilter === 'central' ? 'central' : '')) {
          showCard = false;
        }
        
        if (statusFilter) {
          if (statusFilter === 'activo' && status !== 'Activo') {
            showCard = false;
          } else if (statusFilter === 'inactivo' && status !== 'Inactivo') {
            showCard = false;
          } else if (statusFilter === 'pendiente' && status !== 'Pendiente') {
            showCard = false;
          }
        }
        
        card.style.display = showCard ? '' : 'none';
      });
      
      // Actualizar contador de elementos visibles
      updateVisibleItemsCount();
    }
  }
  
  // Inicializar ordenamiento de tabla
  function initSortTable() {
    const sortableHeaders = document.querySelectorAll('th[data-sort]');
    
    sortableHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const sortDirection = this.getAttribute('data-sort-direction') || 'asc';
        const sortField = this.getAttribute('data-sort');
        
        // Actualizar indicador de ordenamiento
        sortableHeaders.forEach(h => {
          const icon = h.querySelector('.sort-icon');
          if (icon) {
            icon.textContent = '';
          }
        });
        
        const sortIcon = this.querySelector('.sort-icon');
        if (sortIcon) {
          sortIcon.textContent = sortDirection === 'asc' ? '↑' : '↓';
        }
        
        // Alternar dirección de ordenamiento para el próximo clic
        this.setAttribute('data-sort-direction', sortDirection === 'asc' ? 'desc' : 'asc');
        
        // En una aplicación real, esto activaría un ordenamiento en el servidor
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
          case 'name':
            valA = a.querySelector('td:nth-child(2)').textContent;
            valB = b.querySelector('td:nth-child(2)').textContent;
            break;
          case 'type':
            valA = a.querySelector('td:nth-child(3)').textContent;
            valB = b.querySelector('td:nth-child(3)').textContent;
            break;
          case 'location':
            valA = a.querySelector('td:nth-child(4)').textContent;
            valB = b.querySelector('td:nth-child(4)').textContent;
            break;
          case 'manager':
            valA = a.querySelector('td:nth-child(5)').textContent;
            valB = b.querySelector('td:nth-child(5)').textContent;
            break;
          case 'employees':
            valA = parseInt(a.querySelector('td:nth-child(6)').textContent);
            valB = parseInt(b.querySelector('td:nth-child(6)').textContent);
            break;
          case 'inventory':
            valA = parseInt(a.querySelector('td:nth-child(7)').textContent);
            valB = parseInt(b.querySelector('td:nth-child(7)').textContent);
            break;
            case 'sales':
                // Extrae el texto de la celda
                const salesTextA = a.querySelector('td:nth-child(8)').textContent;
                const salesTextB = b.querySelector('td:nth-child(8)').textContent;
                
                // Elimina todos los caracteres que no sean dígitos, puntos o signo negativo
                valA = parseFloat(salesTextA.replace(/[^\d.-]/g, ''));
                valB = parseFloat(salesTextB.replace(/[^\d.-]/g, ''));
                break;
          case 'status':
            valA = a.querySelector('td:nth-child(9) .badge').textContent;
            valB = b.querySelector('td:nth-child(9) .badge').textContent;
            break;
          default:
            valA = a.querySelector('td:nth-child(2)').textContent;
            valB = b.querySelector('td:nth-child(2)').textContent;
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
  
  // Inicializar detalles de negocio
  function initBusinessDetails() {
    const detailButtons = document.querySelectorAll('[data-modal="verDetallesNegocio"]');
    
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const businessId = button.getAttribute('data-id');
        if (businessId) {
          openBusinessDetails(businessId);
        } else {
          openModal('verDetallesNegocio');
        }
      });
    });
    
    // Botón para editar negocio desde modal de detalles
    const editBusinessBtn = document.querySelector('[data-modal-edit="nuevoNegocio"]');
    if (editBusinessBtn) {
      editBusinessBtn.addEventListener('click', () => {
        // Cerrar modal de detalles
        closeModal('verDetallesNegocio');
        
        // Abrir modal de edición
        setTimeout(() => {
          const modal = document.getElementById('nuevoNegocio');
          if (modal) {
            // Cambiar título del modal
            const modalTitle = modal.querySelector('.modal-title');
            if (modalTitle) {
              modalTitle.textContent = 'Editar Negocio';
            }
            
            // Modificar botón de guardar
            const saveBtn = modal.querySelector('.btn-primary');
            if (saveBtn) {
              saveBtn.textContent = 'Actualizar Negocio';
            }
            
            // Rellenar formulario con datos del negocio
            populateEditForm();
            
            // Mostrar modal
            openModal('nuevoNegocio');
          }
        }, 300);
      });
    }
  }
  
  // Abrir detalles de un negocio específico
  function openBusinessDetails(businessId) {
    // En un entorno real, esto cargaría datos desde el servidor
    // Para esta demo, usaremos datos ficticios basados en el ID
    
    // Abrir modal
    openModal('verDetallesNegocio');
    
    // Actualizar contenido del modal según el ID
    const businessName = document.getElementById('detail-business-name');
    if (businessName) {
      // Obtener nombre del negocio basado en el ID
      let name = 'Negocio';
      
      switch (businessId) {
        case 'N001':
          name = 'Tienda Central';
          break;
        case 'N002':
          name = 'Tienda Norte';
          break;
        case 'N003':
          name = 'Tienda Sur';
          break;
        case 'N004':
          name = 'Tienda Este';
          break;
        case 'N005':
          name = 'Tienda Online';
          break;
        case 'N006':
          name = 'Distribuidor Empresarial';
          break;
        case 'N007':
          name = 'Tienda Oeste';
          break;
      }
      
      businessName.textContent = name;
    }
  }
  
  // Rellenar formulario de edición con datos del negocio seleccionado
  function populateEditForm() {
    // En un entorno real, esto cargaría datos desde el servidor
    // Para esta demo, usaremos datos ficticios
    
    // Datos de ejemplo
    const businessData = {
      business_name: 'Tienda Central',
      business_type: 'tienda',
      region: 'central',
      description: 'Tienda principal ubicada en el centro de la ciudad. Ofrece la mayor variedad de productos y servicios.',
      phone: '+52 1234 5678',
      email: 'tienda.central@hugotecnologia.com',
      website: 'www.hugotecnologia.com/tienda-central',
      status: 'activo',
      address: 'Av. Principal #123',
      city: 'Ciudad Capital',
      state: 'Estado Central',
      postal_code: '12345',
      country: 'mexico',
      latitude: '19.4326',
      longitude: '-99.1332',
      manager: '1', // ID de Juan Pérez
      assistant_manager: '6', // ID de Roberto Díaz
      employees_count: '15',
      local_tax: '16.00',
      currency: 'MXN',
      timezone: 'America/Mexico_City'
    };
    
    // Rellenar campos del formulario
    Object.keys(businessData).forEach(key => {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = businessData[key] === 'true';
        } else {
          input.value = businessData[key];
        }
      }
    });
    
    // Horarios
    const scheduleData = {
      monday_open: '09:00',
      monday_close: '18:00',
      monday_closed: false,
      tuesday_open: '09:00',
      tuesday_close: '18:00',
      tuesday_closed: false,
      wednesday_open: '09:00',
      wednesday_close: '18:00',
      wednesday_closed: false,
      thursday_open: '09:00',
      thursday_close: '18:00',
      thursday_closed: false,
      friday_open: '09:00',
      friday_close: '18:00',
      friday_closed: false,
      saturday_open: '09:00',
      saturday_close: '14:00',
      saturday_closed: false,
      sunday_open: '00:00',
      sunday_close: '00:00',
      sunday_closed: true
    };
    
    // Rellenar horarios
    Object.keys(scheduleData).forEach(key => {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = scheduleData[key];
          // Activar/desactivar campos de horario
          if (input.checked) {
            const timeInputs = input.closest('.business-day').querySelectorAll('input[type="time"]');
            timeInputs.forEach(timeInput => {
              timeInput.disabled = true;
              timeInput.parentElement.style.opacity = '0.5';
            });
          }
        } else {
          input.value = scheduleData[key];
        }
      }
    });
    
    // Métodos de pago
    const paymentMethods = ['cash', 'credit_card', 'debit_card', 'transfer'];
    paymentMethods.forEach(method => {
      const checkbox = document.querySelector(`#payment_${method}`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }
  
  // Inicializar controles de gráficos
  function initChartControls() {
    const chartControls = document.querySelectorAll('.chart-controls select');
    
    chartControls.forEach(control => {
      control.addEventListener('change', () => {
        // En un entorno real, esto actualizaría los datos del gráfico
        console.log(`Cambiando vista del gráfico: ${control.value}`);
      });
    });
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
      
      // Buscar en la vista de cuadrícula
      const cards = document.querySelectorAll('.business-card');
      cards.forEach(card => {
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
      : document.querySelectorAll('.business-card:not([style*="display: none"])');
    
    const totalItems = 12; // Total de negocios en la demo
    
    paginationInfo.textContent = `Mostrando ${visibleItems.length} de ${totalItems} negocios`;
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
        if (nextPage && nextPage.classList.contains('page-item')) {
          nextPage.click();
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