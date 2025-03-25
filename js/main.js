// Modal handling
document.addEventListener('DOMContentLoaded', function() {
    // Open modal buttons
    const modalButtons = document.querySelectorAll('[data-modal]');
    modalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        openModal(modalId);
      });
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('[data-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-close');
        closeModal(modalId);
      });
    });
    
    // Close modal when clicking on overlay
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
          closeModal(openModal.id);
        }
      }
    });
  });
  
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling the body
    }
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
  
  // Tab switching
  document.addEventListener('DOMContentLoaded', function() {
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Here you would implement content switching based on the tab
          // For example: switchTabContent(container, tab.textContent.trim());
        });
      });
    });
  });
  
  // Sidebar responsiveness
  document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
      });
    });
  });
  
  // Form validation example
  document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm(form);
      });
    });
  });
  
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        markAsInvalid(input, 'Este campo es obligatorio');
        isValid = false;
      } else {
        markAsValid(input);
      }
      
      // Add specific validations for emails, numbers, etc.
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          markAsInvalid(input, 'Ingrese un email válido');
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      // Submit the form or handle data
      console.log('Form is valid, processing...');
      
      // Here you would typically send data to server
      // simulateFormSubmission(form);
    }
  }
  
  function markAsInvalid(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    // Add or update feedback message
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      input.parentNode.insertBefore(feedback, input.nextSibling);
    }
    
    feedback.textContent = message;
  }
  
  function markAsValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    // Remove any existing feedback
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.remove();
    }
  }
  
  // Function to simulate loading data (for demonstration)
  function loadDemoData() {
    // Simulate data loading
    console.log('Loading data...');
    
    // Update stats with animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
      const finalValue = stat.textContent;
      stat.textContent = '0';
      
      // Animate number increasing
      animateValue(stat, 0, parseFloat(finalValue.replace(/[^0-9.-]+/g, '')), 1000);
    });
  }
  
  // Animation helper for numbers
  function animateValue(element, start, end, duration) {
    const isDecimal = String(end).includes('.');
    const hasCurrency = element.textContent.includes('$');
    const hasCommas = element.textContent.includes(',');
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      let value = progress * (end - start) + start;
      
      if (isDecimal) {
        value = value.toFixed(2);
      } else {
        value = Math.floor(value);
      }
      
      // Format with currency and/or commas
      let formattedValue = value;
      if (hasCommas) {
        formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      if (hasCurrency) {
        formattedValue = '$' + formattedValue;
      }
      
      element.textContent = formattedValue;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }
  
  // Run demo animations when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable loading animation on page load
    // loadDemoData();
  });
  
  // Add smooth scrolling for page content
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });

  // main.js - Funcionalidad general para el sistema de gestión

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modales
    initModals();
    
    // Inicializar funcionalidad de la barra lateral
    initSidebar();
    
    // Inicializar ordenamiento de tablas
    initTableSort();
    
    // Inicializar paginación
    initPagination();
    
    // Manejar tooltips y popovers
    initTooltips();
    
    // Inicializar notificaciones del sistema
    initNotifications();
});

// Funcionalidad para modales
function initModals() {
    // Abrir modal
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
                
                // Si hay un ID de usuario, cargar datos del usuario
                const userId = this.getAttribute('data-id');
                if (userId) {
                    loadUserData(userId, modalId);
                }
            }
        });
    });
    
    // Cerrar modal con botones de cierre
    const closeButtons = document.querySelectorAll('[data-close]');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-close');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Cerrar modal haciendo clic fuera
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Función para abrir modal
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        // Enfocar primer campo si es un formulario
        setTimeout(() => {
            const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
    
    // Función para cerrar modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    // Función para cargar datos de usuario al abrir modal
    function loadUserData(userId, modalType) {
        console.log(`Cargando datos del usuario ${userId} para el modal ${modalType}`);
        
        // Simulación de carga de datos
        // En una aplicación real, esto haría una petición AJAX
        let userData = null;
        
        // Buscar datos de usuario en la tabla
        const userRow = document.querySelector(`tr [data-id="${userId}"]`).closest('tr');
        
        if (userRow) {
            const userCell = userRow.querySelector('.user-cell');
            const userName = userCell.querySelector('.user-name').textContent;
            const userAvatar = userCell.querySelector('img').src;
            const userEmail = userRow.querySelector('td:nth-child(4)').textContent;
            const userRole = userRow.querySelector('td:nth-child(5) .badge').textContent;
            const userStore = userRow.querySelector('td:nth-child(6)').textContent;
            const userStatus = userRow.querySelector('td:nth-child(7) .badge').textContent;
            
            userData = {
                id: userId,
                name: userName,
                avatar: userAvatar,
                email: userEmail,
                role: userRole,
                store: userStore,
                status: userStatus
            };
        }
        
        if (!userData) return;
        
        // Dependiendo del tipo de modal, llenar datos
        if (modalType === 'editarUsuario') {
            // Llenar formulario de edición
            const modal = document.getElementById('editarUsuario');
            if (modal) {
                const form = modal.querySelector('form');
                
                if (form) {
                    // Llenar campos
                    const nameInput = form.querySelector('input[name="first_name"]');
                    if (nameInput) {
                        const nameParts = userData.name.split(' ');
                        nameInput.value = nameParts[0] || '';
                        
                        const lastNameInput = form.querySelector('input[name="last_name"]');
                        if (lastNameInput) {
                            lastNameInput.value = nameParts.slice(1).join(' ') || '';
                        }
                    }
                    
                    const emailInput = form.querySelector('input[name="email"]');
                    if (emailInput) emailInput.value = userData.email;
                    
                    const roleSelect = form.querySelector('select[name="role"]');
                    if (roleSelect) {
                        const options = roleSelect.querySelectorAll('option');
                        options.forEach(option => {
                            if (option.textContent.trim() === userData.role.trim()) {
                                option.selected = true;
                            }
                        });
                    }
                    
                    const storeSelect = form.querySelector('select[name="assigned_store"]');
                    if (storeSelect) {
                        const options = storeSelect.querySelectorAll('option');
                        options.forEach(option => {
                            if (option.textContent.trim() === userData.store.trim()) {
                                option.selected = true;
                            }
                        });
                    }
                    
                    const statusSelect = form.querySelector('select[name="account_status"]');
                    if (statusSelect) {
                        const statusMap = {
                            'Activo': 'active',
                            'Inactivo': 'inactive',
                            'Pendiente': 'pending',
                            'Bloqueado': 'blocked'
                        };
                        
                        const statusValue = statusMap[userData.status] || 'active';
                        const options = statusSelect.querySelectorAll('option');
                        options.forEach(option => {
                            if (option.value === statusValue) {
                                option.selected = true;
                            }
                        });
                    }
                    
                    // Actualizar avatar
                    const avatarPreview = modal.querySelector('#avatar-preview-img');
                    if (avatarPreview) avatarPreview.src = userData.avatar;
                }
            }
        } else if (modalType === 'verDetallesUsuario') {
            // Llenar modal de detalles
            const modal = document.getElementById('verDetallesUsuario');
            if (modal) {
                const nameElement = modal.querySelector('#user-detail-name');
                if (nameElement) nameElement.textContent = userData.name;
                
                const emailElement = modal.querySelector('.user-detail-email');
                if (emailElement) emailElement.textContent = userData.email;
                
                const avatarImg = modal.querySelector('.user-detail-avatar img');
                if (avatarImg) avatarImg.src = userData.avatar;
                
                const roleBadge = modal.querySelector('.user-detail-meta .badge:first-child');
                if (roleBadge) roleBadge.textContent = userData.role;
                
                const statusBadge = modal.querySelector('.user-detail-meta .badge:last-child');
                if (statusBadge) {
                    statusBadge.textContent = userData.status;
                    
                    // Actualizar clase de badge según estado
                    statusBadge.className = 'badge';
                    switch (userData.status) {
                        case 'Activo':
                            statusBadge.classList.add('badge-success');
                            break;
                        case 'Bloqueado':
                            statusBadge.classList.add('badge-danger');
                            break;
                        case 'Pendiente':
                            statusBadge.classList.add('badge-warning');
                            break;
                        case 'Inactivo':
                            statusBadge.classList.add('badge-secondary');
                            break;
                    }
                }
            }
        }
    }
}

// Funcionalidad para la barra lateral
function initSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Manejo de navegación
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Desactivar ítem activo
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Activar ítem seleccionado
            this.classList.add('active');
            
            // En una aplicación real, aquí se manejaría la navegación
            const module = this.textContent.trim();
            console.log(`Navegando a: ${module}`);
        });
    });
    
    // Toggle de barra lateral en dispositivos móviles
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            if (mainContent) {
                mainContent.classList.toggle('expanded');
            }
        });
        
        // Cerrar barra lateral al hacer clic en el contenido en móviles
        if (mainContent && window.innerWidth < 768) {
            mainContent.addEventListener('click', function() {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            });
        }
    }
}

// Funcionalidad para ordenamiento de tablas
function initTableSort() {
    const sortHeaders = document.querySelectorAll('th[data-sort]');
    
    sortHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sortField = this.getAttribute('data-sort');
            const currentSort = this.getAttribute('data-sort-dir') || 'none';
            let nextSort = 'asc';
            
            // Determinar dirección de ordenamiento
            if (currentSort === 'asc') {
                nextSort = 'desc';
            } else if (currentSort === 'desc') {
                nextSort = 'none';
            }
            
            // Restablecer indicadores de ordenamiento de todas las columnas
            sortHeaders.forEach(h => {
                h.removeAttribute('data-sort-dir');
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Si el nuevo ordenamiento no es 'none', establecer dirección e indicador visual
            if (nextSort !== 'none') {
                this.setAttribute('data-sort-dir', nextSort);
                this.classList.add(`sort-${nextSort}`);
                
                // Ordenar datos
                sortTableData(sortField, nextSort);
            } else {
                // Restablecer ordenamiento por defecto
                resetTableSort();
            }
        });
    });
    
    function sortTableData(field, direction) {
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Determinar índice de columna basado en el campo
        const headerRow = table.querySelector('thead tr');
        let columnIndex = -1;
        
        if (headerRow) {
            const headers = headerRow.querySelectorAll('th');
            headers.forEach((header, index) => {
                if (header.getAttribute('data-sort') === field) {
                    columnIndex = index;
                }
            });
        }
        
        if (columnIndex === -1) return;
        
        // Función para obtener valor de celda para comparación
        const getCellValue = (row, index) => {
            const cell = row.querySelector(`td:nth-child(${index + 1})`);
            if (!cell) return '';
            
            // Manejar caso especial para celdas con estructura compleja
            if (field === 'name') {
                const nameElement = cell.querySelector('.user-name');
                return nameElement ? nameElement.textContent.trim() : cell.textContent.trim();
            }
            
            if (field === 'role' || field === 'status') {
                const badge = cell.querySelector('.badge');
                return badge ? badge.textContent.trim() : cell.textContent.trim();
            }
            
            return cell.textContent.trim();
        };
        
        // Ordenar filas
        rows.sort((rowA, rowB) => {
            const valueA = getCellValue(rowA, columnIndex);
            const valueB = getCellValue(rowB, columnIndex);
            
            // Detectar si es valor numérico
            if (!isNaN(valueA) && !isNaN(valueB)) {
                return direction === 'asc' 
                    ? parseFloat(valueA) - parseFloat(valueB)
                    : parseFloat(valueB) - parseFloat(valueA);
            }
            
            // Ordenamiento alfabético
            return direction === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });
        
        // Reordenar filas en la tabla
        rows.forEach(row => {
            tbody.appendChild(row);
        });
    }
    
    function resetTableSort() {
        // Restaurar orden original (basado en IDs)
        const table = document.querySelector('table');
        if (!table) return;
        
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Ordenar por ID (asumiendo que la segunda columna contiene el ID)
        rows.sort((rowA, rowB) => {
            const idA = rowA.querySelector('td:nth-child(2)').textContent.trim();
            const idB = rowB.querySelector('td:nth-child(2)').textContent.trim();
            
            // Extraer número del ID (formato #U001)
            const numA = parseInt(idA.replace(/\D/g, ''));
            const numB = parseInt(idB.replace(/\D/g, ''));
            
            return numA - numB;
        });
        
        // Reordenar filas
        rows.forEach(row => {
            tbody.appendChild(row);
        });
    }
}

// Funcionalidad para paginación
function initPagination() {
    const pagination = document.querySelector('.pagination');
    const itemsPerPage = 7; // Basado en el diseño que muestra 7 elementos por página
    
    if (!pagination) return;
    
    const pageItems = pagination.querySelectorAll('.page-item');
    const prevButton = pagination.querySelector('.page-nav:first-child');
    const nextButton = pagination.querySelector('.page-nav:last-child');
    
    let currentPage = 1;
    const totalItems = document.querySelectorAll('tbody tr').length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Configurar páginas disponibles
    updatePaginationItems();
    
    // Manejar clic en elementos de página
    pageItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.textContent === '...') return;
            
            const pageNum = parseInt(this.textContent);
            if (!isNaN(pageNum)) {
                goToPage(pageNum);
            }
        });
    });
    
    // Manejar botones de navegación
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
    
    // Función para ir a página específica
    function goToPage(pageNum) {
        if (pageNum < 1 || pageNum > totalPages) return;
        
        currentPage = pageNum;
        
        // Actualizar UI de paginación
        updatePaginationItems();
        
        // Mostrar filas correspondientes
        showRowsForPage(pageNum);
        
        // Actualizar información de paginación
        updatePaginationInfo();
    }
    
    // Actualizar elementos de paginación
    function updatePaginationItems() {
        // Actualizar clases activas
        pageItems.forEach(item => {
            const itemText = item.textContent;
            
            if (itemText === '...') return;
            
            const pageNum = parseInt(itemText);
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
    
    // Mostrar filas para la página actual
    function showRowsForPage(pageNum) {
        const rows = document.querySelectorAll('tbody tr');
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        rows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    // Actualizar texto de información de paginación
    function updatePaginationInfo() {
        const infoElement = document.querySelector('.pagination-info');
        if (!infoElement) return;
        
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, totalItems);
        
        infoElement.textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} usuarios`;
    }
    
    // Inicializar paginación
    goToPage(1);
}

// Inicializar tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        // En una implementación real, aquí se inicializaría una biblioteca de tooltips
        // Para este ejemplo, usamos el atributo title nativo
        
        // Opcional: Prevenir tooltips nativos y usar una implementación personalizada
        /*
        const title = element.getAttribute('title');
        element.setAttribute('data-tooltip', title);
        element.removeAttribute('title');
        
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        */
    });
    
    // Implementación básica de tooltips personalizados
    function showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        tooltip.style.top = `${rect.top + scrollTop - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 10);
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.custom-tooltip.visible');
        if (tooltip) {
            tooltip.classList.remove('visible');
            setTimeout(() => {
                tooltip.parentNode.removeChild(tooltip);
            }, 200);
        }
    }
}

// Inicializar notificaciones del sistema
function initNotifications() {
    // Simulación: mostrar una notificación después de 10 segundos
    setTimeout(() => {
        showNotification('Sistema actualizado', 'Se ha instalado la última versión del sistema.', 'info');
    }, 10000);
    
    // Función para mostrar notificaciones
    window.showNotification = function(title, message, type = 'info') {
        const notificationContainer = document.querySelector('.notification-container');
        
        // Crear contenedor si no existe
        if (!notificationContainer) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
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
        document.querySelector('.notification-container').appendChild(notification);
        
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
    };
    
    function closeNotification(notification) {
        notification.classList.remove('visible');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}