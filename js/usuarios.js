// usuarios.js - Funcionalidad específica para la página de gestión de usuarios

document.addEventListener('DOMContentLoaded', function() {
    // Manejo de vistas (Lista/Cuadrícula)
    initViewToggle();
    
    // Inicialización de tabs en modales y detalles
    initTabs();
    
    // Funcionalidad para selección de usuarios
    initUserSelection();
    
    // Funcionalidad para búsqueda de usuarios
    initSearch();
    
    // Funcionalidad para filtrado de usuarios
    initFilters();
    
    // Funcionalidad para acciones masivas
    initBulkActions();
    
    // Inicializar upload de avatar
    initAvatarUpload();
    
    // Inicializar medidor de fuerza de contraseña
    initPasswordStrengthMeter();
    
    // Inicializar selector de permisos
    initPermissionsToggle();
});

// Cambio entre vista de lista y cuadrícula
function initViewToggle() {
    const listViewBtn = document.getElementById('list-view');
    const gridViewBtn = document.getElementById('grid-view');
    const listView = document.querySelector('.list-view');
    const gridView = document.querySelector('.grid-view');
    
    if (listViewBtn && gridViewBtn) {
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            listView.classList.add('active');
            gridView.classList.remove('active');
        });
        
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            gridView.classList.add('active');
            listView.classList.remove('active');
        });
    }
}

// Inicialización de pestañas en modales y detalles de usuario
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.closest('.tab-container, .modal, .user-detail-content').querySelectorAll('.tab-content');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Desactivar todas las pestañas y contenidos
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Activar la pestaña seleccionada y su contenido
                tab.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
    });
}

// Funcionalidad para selección de usuarios (checkbox en tabla)
function initUserSelection() {
    const selectAll = document.querySelector('.select-all');
    const selectItems = document.querySelectorAll('.select-item');
    const bulkActions = document.querySelector('.bulk-actions');
    
    if (selectAll && selectItems.length > 0) {
        // Seleccionar/deseleccionar todos
        selectAll.addEventListener('change', function() {
            const isChecked = this.checked;
            selectItems.forEach(item => {
                item.checked = isChecked;
            });
            
            updateBulkActionsVisibility();
        });
        
        // Actualizar estado de "seleccionar todos" cuando se cambian elementos individuales
        selectItems.forEach(item => {
            item.addEventListener('change', function() {
                const allChecked = Array.from(selectItems).every(i => i.checked);
                const someChecked = Array.from(selectItems).some(i => i.checked);
                
                if (selectAll) {
                    selectAll.checked = allChecked;
                    selectAll.indeterminate = someChecked && !allChecked;
                }
                
                updateBulkActionsVisibility();
            });
        });
    }
    
    // Mostrar/ocultar acciones masivas según selección
    function updateBulkActionsVisibility() {
        if (bulkActions) {
            const anySelected = Array.from(selectItems).some(i => i.checked);
            bulkActions.style.display = anySelected ? 'block' : 'none';
        }
    }
    
    // Inicializar estado
    updateBulkActionsVisibility();
}

// Funcionalidad para búsqueda de usuarios
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const userRows = document.querySelectorAll('tbody tr');
    const userCards = document.querySelectorAll('.user-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            
            // Buscar en filas de la tabla
            userRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchText) ? '' : 'none';
            });
            
            // Buscar en tarjetas de usuario
            userCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchText) ? '' : 'none';
            });
            
            // Actualizar contadores y paginación si es necesario
            updateResultsCount();
        });
    }
    
    function updateResultsCount() {
        const visibleRows = Array.from(userRows).filter(row => row.style.display !== 'none').length;
        const paginationInfo = document.querySelector('.pagination-info');
        
        if (paginationInfo) {
            paginationInfo.textContent = `Mostrando ${visibleRows} de ${userRows.length} usuarios`;
        }
    }
}

// Funcionalidad para filtrado de usuarios
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-controls select');
    const userRows = document.querySelectorAll('tbody tr');
    const userCards = document.querySelectorAll('.user-card');
    
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => {
            select.addEventListener('change', applyFilters);
        });
    }
    
    function applyFilters() {
        const filters = {};
        
        // Recopilar valores de filtros seleccionados
        filterSelects.forEach(select => {
            if (select.value) {
                const filterType = select.getAttribute('data-filter') || select.id || 'default';
                filters[filterType] = select.value;
            }
        });
        
        // Aplicar filtros a filas de tabla
        userRows.forEach(row => {
            let shouldShow = true;
            
            // Verificar cada filtro activo
            Object.keys(filters).forEach(filterType => {
                const filterValue = filters[filterType];
                const cellValue = row.querySelector(`[data-${filterType}]`)?.getAttribute(`data-${filterType}`) || '';
                
                if (filterValue && cellValue !== filterValue) {
                    shouldShow = false;
                }
            });
            
            row.style.display = shouldShow ? '' : 'none';
        });
        
        // Aplicar filtros a tarjetas
        userCards.forEach(card => {
            let shouldShow = true;
            
            // Verificar cada filtro activo
            Object.keys(filters).forEach(filterType => {
                const filterValue = filters[filterType];
                const cardValue = card.querySelector(`[data-${filterType}]`)?.getAttribute(`data-${filterType}`) || '';
                
                if (filterValue && cardValue !== filterValue) {
                    shouldShow = false;
                }
            });
            
            card.style.display = shouldShow ? '' : 'none';
        });
        
        // Actualizar contadores y paginación
        updateFilteredCount();
    }
    
    function updateFilteredCount() {
        const visibleRows = Array.from(userRows).filter(row => row.style.display !== 'none').length;
        const paginationInfo = document.querySelector('.pagination-info');
        
        if (paginationInfo) {
            paginationInfo.textContent = `Mostrando ${visibleRows} de ${userRows.length} usuarios`;
        }
    }
}

// Funcionalidad para acciones masivas
function initBulkActions() {
    const bulkActionButtons = document.querySelectorAll('.bulk-action-buttons button');
    
    if (bulkActionButtons.length > 0) {
        bulkActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const selectedUsers = Array.from(document.querySelectorAll('.select-item:checked')).map(cb => {
                    const row = cb.closest('tr');
                    return {
                        id: row.querySelector('td:nth-child(2)').textContent,
                        name: row.querySelector('.user-name').textContent
                    };
                });
                
                if (selectedUsers.length === 0) {
                    alert('No hay usuarios seleccionados');
                    return;
                }
                
                switch (action) {
                    case 'delete':
                        if (confirm(`¿Está seguro de que desea eliminar ${selectedUsers.length} usuario(s) seleccionado(s)?`)) {
                            console.log('Eliminando usuarios:', selectedUsers);
                            // Aquí iría la lógica para eliminar usuarios
                            alert(`${selectedUsers.length} usuario(s) eliminado(s) correctamente`);
                        }
                        break;
                        
                    case 'block':
                        console.log('Bloqueando usuarios:', selectedUsers);
                        // Aquí iría la lógica para bloquear usuarios
                        alert(`${selectedUsers.length} usuario(s) bloqueado(s) correctamente`);
                        break;
                        
                    case 'activate':
                        console.log('Activando usuarios:', selectedUsers);
                        // Aquí iría la lógica para activar usuarios
                        alert(`${selectedUsers.length} usuario(s) activado(s) correctamente`);
                        break;
                        
                    case 'role':
                        const newRole = prompt('Ingrese el nuevo rol para los usuarios seleccionados:', 'Cliente');
                        if (newRole) {
                            console.log('Cambiando rol a', newRole, 'para usuarios:', selectedUsers);
                            // Aquí iría la lógica para cambiar roles
                            alert(`Rol cambiado a ${newRole} para ${selectedUsers.length} usuario(s)`);
                        }
                        break;
                        
                    case 'email':
                        console.log('Enviando email a usuarios:', selectedUsers);
                        // Aquí iría lógica para enviar emails
                        // Idealmente abriría un modal para componer el mensaje
                        alert(`Email enviado a ${selectedUsers.length} usuario(s)`);
                        break;
                }
            });
        });
    }
}

// Inicializar upload de avatar
function initAvatarUpload() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview-img');
    const removeAvatarBtn = document.getElementById('remove-avatar');
    const defaultAvatar = 'img/avatars/default.jpg';
    
    if (avatarUpload && avatarPreview) {
        avatarUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        if (removeAvatarBtn) {
            removeAvatarBtn.addEventListener('click', function() {
                avatarPreview.src = defaultAvatar;
                avatarUpload.value = '';
            });
        }
    }
}

// Inicializar medidor de fuerza de contraseña
function initPasswordStrengthMeter() {
    const passwordInput = document.querySelector('input[name="password"]');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const confirmInput = document.querySelector('input[name="password_confirmation"]');
    
    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let message = '';
            
            if (password.length >= 8) strength += 25;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
            if (password.match(/\d+/)) strength += 25;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
            
            strengthFill.style.width = `${strength}%`;
            
            if (strength <= 25) {
                strengthFill.style.backgroundColor = '#dc3545';
                message = 'Muy débil';
            } else if (strength <= 50) {
                strengthFill.style.backgroundColor = '#ffc107';
                message = 'Débil';
            } else if (strength <= 75) {
                strengthFill.style.backgroundColor = '#17a2b8';
                message = 'Buena';
            } else {
                strengthFill.style.backgroundColor = '#28a745';
                message = 'Fuerte';
            }
            
            strengthText.textContent = `Fuerza de la contraseña: ${message}`;
            
            // Verificar que coincidan las contraseñas si hay confirmación
            if (confirmInput && confirmInput.value) {
                validatePasswordMatch();
            }
        });
        
        // Validar que coincidan las contraseñas
        if (confirmInput) {
            confirmInput.addEventListener('input', validatePasswordMatch);
        }
        
        function validatePasswordMatch() {
            if (passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity('Las contraseñas no coinciden');
            } else {
                confirmInput.setCustomValidity('');
            }
        }
    }
    
    // Toggle para mostrar/ocultar contraseña
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const inputField = this.parentElement.querySelector('input');
            const type = inputField.type === 'password' ? 'text' : 'password';
            inputField.type = type;
            this.querySelector('i').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
}

// Inicializar selector de permisos
function initPermissionsToggle() {
    const accessLevelSelect = document.getElementById('access_level');
    const toggleAllPermissions = document.querySelectorAll('.toggle-all-permissions');
    const permissionItems = document.querySelectorAll('.permission-items input[type="checkbox"]');
    
    // Cambiar nivel de acceso
    if (accessLevelSelect) {
        accessLevelSelect.addEventListener('change', function() {
            const level = this.value;
            
            switch (level) {
                case 'full':
                    permissionItems.forEach(checkbox => {
                        checkbox.checked = true;
                    });
                    break;
                    
                case 'read_only':
                    permissionItems.forEach(checkbox => {
                        const value = checkbox.value;
                        checkbox.checked = value.includes('view') || value.includes('_view');
                    });
                    break;
                    
                case 'restricted':
                    permissionItems.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    break;
            }
            
            // Actualizar estado de toggles de grupo
            updateGroupTogglesState();
        });
    }
    
    // Toggle para grupos de permisos
    if (toggleAllPermissions.length > 0) {
        toggleAllPermissions.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const group = this.getAttribute('data-group');
                const isChecked = this.checked;
                const groupCheckboxes = document.querySelectorAll(`.permission-items input[name="permissions[]"][value^="${group}_"]`);
                
                groupCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
            });
        });
    }
    
    // Actualizar estado de toggles de grupo cuando cambian permisos individuales
    if (permissionItems.length > 0) {
        permissionItems.forEach(item => {
            item.addEventListener('change', function() {
                updateGroupTogglesState();
            });
        });
    }
    
    function updateGroupTogglesState() {
        const groups = {};
        
        // Recopilar todos los grupos
        permissionItems.forEach(item => {
            const value = item.value;
            const groupName = value.split('_')[0];
            
            if (!groups[groupName]) {
                groups[groupName] = {
                    total: 0,
                    checked: 0
                };
            }
            
            groups[groupName].total++;
            if (item.checked) {
                groups[groupName].checked++;
            }
        });
        
        // Actualizar estado de cada toggle de grupo
        Object.keys(groups).forEach(groupName => {
            const toggle = document.querySelector(`.toggle-all-permissions[data-group="${groupName}"]`);
            if (toggle) {
                if (groups[groupName].checked === 0) {
                    toggle.checked = false;
                    toggle.indeterminate = false;
                } else if (groups[groupName].checked === groups[groupName].total) {
                    toggle.checked = true;
                    toggle.indeterminate = false;
                } else {
                    toggle.checked = false;
                    toggle.indeterminate = true;
                }
            }
        });
    }
    
    // Inicializar estado
    updateGroupTogglesState();
}