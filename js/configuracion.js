// configuracion.js - Funcionalidad para el módulo de configuración

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación de pestañas
    initTabNavigation();
    
    // Inicializar formularios de configuración
    initForms();
    
    // Inicializar upload de logo
    initLogoUpload();
    
    // Inicializar manejo de contraseñas
    initPasswordToggles();
    
    // Inicializar interacciones condicionales
    initConditionalInteractions();
    
    // Inicializar prueba de email
    initTestEmail();
    
    // Inicializar búsqueda de actualizaciones
    initSystemActions();
});

// Navegación entre pestañas de configuración
function initTabNavigation() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    const tabs = document.querySelectorAll('.settings-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Desactivar todos los items y tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Activar item y tab seleccionados
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Guardar pestaña activa en localStorage
            localStorage.setItem('activeSettingsTab', tabId);
        });
    });
    
    // Cargar pestaña activa desde localStorage o usar la primera por defecto
    const activeTab = localStorage.getItem('activeSettingsTab') || 'general';
    const activeNavItem = document.querySelector(`.settings-nav-item[data-tab="${activeTab}"]`);
    
    if (activeNavItem) {
        activeNavItem.click();
    } else {
        // Si no existe la pestaña guardada, seleccionar la primera
        navItems[0].click();
    }
}

// Inicializar formularios de configuración
function initForms() {
    const forms = document.querySelectorAll('.settings-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // En una aplicación real, aquí enviaríamos los datos al servidor
            // Para la demo, simulamos un guardado exitoso
            showNotification('Configuración guardada', 'Los cambios han sido guardados correctamente.', 'success');
            
            // Guardar valores en localStorage para persistir entre recargas de página
            saveFormValues(this);
        });
        
        // Cargar valores guardados
        loadFormValues(form);
        
        // Manejar botón de restaurar valores
        const resetButton = form.querySelector('button[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (confirm('¿Está seguro de que desea restaurar los valores predeterminados?')) {
                    form.reset();
                    
                    // En una aplicación real, aquí cargaríamos los valores predeterminados del servidor
                    showNotification('Valores restaurados', 'Se han restaurado los valores predeterminados.', 'info');
                }
            });
        }
    });
}

// Guardar valores del formulario en localStorage
function saveFormValues(form) {
    const formId = form.id;
    const formData = new FormData(form);
    const formValues = {};
    
    for (const [key, value] of formData.entries()) {
        // Manejar arrays de valores (como checkboxes)
        if (key.endsWith('[]')) {
            const arrayKey = key.slice(0, -2);
            if (!formValues[arrayKey]) {
                formValues[arrayKey] = [];
            }
            formValues[arrayKey].push(value);
        } else {
            formValues[key] = value;
        }
    }
    
    // Manejar checkboxes no seleccionados
    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (!checkbox.checked && !checkbox.name.endsWith('[]')) {
            formValues[checkbox.name] = 'off';
        }
    });
    
    localStorage.setItem(`settings_${formId}`, JSON.stringify(formValues));
}

// Cargar valores del formulario desde localStorage
function loadFormValues(form) {
    const formId = form.id;
    const savedValues = localStorage.getItem(`settings_${formId}`);
    
    if (!savedValues) return;
    
    try {
        const formValues = JSON.parse(savedValues);
        
        Object.keys(formValues).forEach(key => {
            const value = formValues[key];
            const elements = form.querySelectorAll(`[name="${key}"], [name="${key}[]"]`);
            
            elements.forEach(element => {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    if (Array.isArray(value)) {
                        element.checked = value.includes(element.value);
                    } else {
                        element.checked = (value === element.value || value === 'on');
                    }
                } else if (element.tagName === 'SELECT') {
                    element.value = value;
                } else {
                    element.value = value;
                }
                
                // Disparar eventos de cambio para activar funcionalidades dependientes
                element.dispatchEvent(new Event('change'));
            });
        });
    } catch (error) {
        console.error('Error al cargar valores guardados:', error);
    }
}

// Inicializar upload de logo
function initLogoUpload() {
    const logoUpload = document.getElementById('company-logo-upload');
    const logoPreview = document.getElementById('company-logo-preview');
    const removeLogoBtn = document.getElementById('remove-company-logo');
    
    if (logoUpload && logoPreview) {
        logoUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    logoPreview.src = e.target.result;
                    
                    // Guardar en localStorage
                    localStorage.setItem('company_logo', e.target.result);
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        // Cargar logo guardado
        const savedLogo = localStorage.getItem('company_logo');
        if (savedLogo) {
            logoPreview.src = savedLogo;
        }
        
        // Eliminar logo
        if (removeLogoBtn) {
            removeLogoBtn.addEventListener('click', function() {
                logoPreview.src = 'img/company-logo.png';
                logoUpload.value = '';
                localStorage.removeItem('company_logo');
            });
        }
    }
}

// Inicializar botones de mostrar/ocultar contraseña
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.input-with-icon').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = '👁️‍🗨️';
            } else {
                input.type = 'password';
                icon.textContent = '👁️';
            }
        });
    });
}

// Inicializar interacciones condicionales
function initConditionalInteractions() {
    // Manejo de restricción de IP
    const ipRestrictionToggle = document.getElementById('ip_restriction');
    const ipRestrictionSettings = document.querySelector('.ip-restriction-settings');
    
    if (ipRestrictionToggle && ipRestrictionSettings) {
        ipRestrictionToggle.addEventListener('change', function() {
            ipRestrictionSettings.style.display = this.checked ? 'block' : 'none';
        });
        
        // Aplicar estado inicial
        ipRestrictionSettings.style.display = ipRestrictionToggle.checked ? 'block' : 'none';
    }
    
    // Manejo de modo de mantenimiento
    const maintenanceMode = document.querySelector('select[name="maintenance_mode"]');
    const scheduledSettings = document.querySelector('.scheduled-maintenance');
    const maintenanceMessage = document.querySelector('.maintenance-message');
    
    if (maintenanceMode && scheduledSettings && maintenanceMessage) {
        maintenanceMode.addEventListener('change', function() {
            if (this.value === 'scheduled') {
                scheduledSettings.style.display = 'block';
                maintenanceMessage.style.display = 'block';
            } else if (this.value === 'on') {
                scheduledSettings.style.display = 'none';
                maintenanceMessage.style.display = 'block';
            } else {
                scheduledSettings.style.display = 'none';
                maintenanceMessage.style.display = 'none';
            }
        });
        
        // Aplicar estado inicial
        if (maintenanceMode.value === 'scheduled') {
            scheduledSettings.style.display = 'block';
            maintenanceMessage.style.display = 'block';
        } else if (maintenanceMode.value === 'on') {
            scheduledSettings.style.display = 'none';
            maintenanceMessage.style.display = 'block';
        } else {
            scheduledSettings.style.display = 'none';
            maintenanceMessage.style.display = 'none';
        }
    }
    
    // Manejo de método de respaldo
    const backupStorage = document.querySelector('select[name="backup_storage"]');
    const localStorageSettings = document.querySelector('.local-storage-settings');
    const cloudStorageSettings = document.querySelector('.cloud-storage-settings');
    
    if (backupStorage && localStorageSettings && cloudStorageSettings) {
        backupStorage.addEventListener('change', function() {
            if (this.value === 'local') {
                localStorageSettings.style.display = 'block';
                cloudStorageSettings.style.display = 'none';
            } else if (this.value === 'cloud') {
                localStorageSettings.style.display = 'none';
                cloudStorageSettings.style.display = 'block';
            } else {
                localStorageSettings.style.display = 'none';
                cloudStorageSettings.style.display = 'none';
            }
        });
        
        // Aplicar estado inicial
        if (backupStorage.value === 'local') {
            localStorageSettings.style.display = 'block';
            cloudStorageSettings.style.display = 'none';
        } else if (backupStorage.value === 'cloud') {
            localStorageSettings.style.display = 'none';
            cloudStorageSettings.style.display = 'block';
        } else {
            localStorageSettings.style.display = 'none';
            cloudStorageSettings.style.display = 'none';
        }
    }
    
    // Manejo de confirmación de restauración
    const confirmRestoreCheckbox = document.getElementById('confirm_restore');
    const restoreButton = document.querySelector('.form-actions-inline .btn-danger');
    
    if (confirmRestoreCheckbox && restoreButton) {
        confirmRestoreCheckbox.addEventListener('change', function() {
            restoreButton.disabled = !this.checked;
        });
    }
    
    // Manejo de selección de método de email
    const emailMethod = document.querySelector('select[name="email_method"]');
    const smtpSettings = document.querySelector('.smtp-settings');
    
    if (emailMethod && smtpSettings) {
        emailMethod.addEventListener('change', function() {
            smtpSettings.style.display = this.value === 'smtp' ? 'block' : 'none';
        });
        
        // Aplicar estado inicial
        smtpSettings.style.display = emailMethod.value === 'smtp' ? 'block' : 'none';
    }
}

// Inicializar prueba de email
function initTestEmail() {
    const testEmailBtn = document.getElementById('test-email');
    
    if (testEmailBtn) {
        testEmailBtn.addEventListener('click', function() {
            // Validar que los campos SMTP estén completos
            const smtpHost = document.querySelector('input[name="smtp_host"]').value;
            const smtpPort = document.querySelector('input[name="smtp_port"]').value;
            const senderEmail = document.querySelector('input[name="sender_email"]').value;
            
            if (!smtpHost || !smtpPort || !senderEmail) {
                showNotification('Error', 'Por favor complete todos los campos SMTP requeridos.', 'error');
                return;
            }
            
            // Simular envío de email de prueba
            showNotification('Enviando...', 'Enviando email de prueba...', 'info');
            
            setTimeout(() => {
                showNotification('Email enviado', 'El email de prueba ha sido enviado correctamente.', 'success');
            }, 2000);
        });
    }
}

// Inicializar acciones del sistema
function initSystemActions() {
    const checkUpdatesBtn = document.getElementById('check-updates');
    const systemReportBtn = document.getElementById('system-report');
    const viewAuditLogsBtn = document.getElementById('view-audit-logs');
    
    if (checkUpdatesBtn) {
        checkUpdatesBtn.addEventListener('click', function() {
            // Simular búsqueda de actualizaciones
            showNotification('Buscando...', 'Buscando actualizaciones disponibles...', 'info');
            
            setTimeout(() => {
                // Simular que no hay actualizaciones disponibles
                showNotification('Actualizado', 'El sistema está actualizado a la última versión (v3.5.2).', 'success');
                
                // O simular que hay una actualización disponible (descomentar para probar)
                /*
                const updateAvailable = confirm('Hay una nueva versión disponible (v3.5.3). ¿Desea actualizar ahora?');
                
                if (updateAvailable) {
                    showNotification('Actualizando...', 'Descargando e instalando actualizaciones...', 'info');
                    
                    setTimeout(() => {
                        showNotification('Actualizado', 'El sistema ha sido actualizado correctamente a la versión 3.5.3.', 'success');
                    }, 3000);
                }
                */
            }, 2000);
        });
    }
    
    if (systemReportBtn) {
        systemReportBtn.addEventListener('click', function() {
            // Simular generación de informe
            showNotification('Generando...', 'Generando informe del sistema...', 'info');
            
            setTimeout(() => {
                showNotification('Informe generado', 'El informe del sistema ha sido generado y está listo para descargar.', 'success');
                
                // Simular descarga
                setTimeout(() => {
                    const dummyLink = document.createElement('a');
                    dummyLink.href = '#';
                    dummyLink.download = 'system_report_' + formatDate(new Date()) + '.pdf';
                    document.body.appendChild(dummyLink);
                    dummyLink.click();
                    document.body.removeChild(dummyLink);
                }, 500);
            }, 2000);
        });
    }
    
    if (viewAuditLogsBtn) {
        viewAuditLogsBtn.addEventListener('click', function() {
            // En una aplicación real, esto abriría una página o modal con los logs
            alert('Esta función mostraría los registros de auditoría del sistema.');
        });
    }
    
    // Manejo de acciones de mantenimiento
    const maintenanceActions = document.querySelectorAll('.maintenance-actions button');
    
    maintenanceActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            // Simular acción
            showNotification('Procesando...', `Ejecutando: ${action}...`, 'info');
            
            setTimeout(() => {
                showNotification('Completado', `La acción "${action}" se ha completado correctamente.`, 'success');
            }, 1500);
        });
    });
    
    // Manejo de ejecución de tareas programadas
    const cronJobRunBtns = document.querySelectorAll('.cron-job-actions [title="Ejecutar ahora"]');
    
    cronJobRunBtns.forEach(button => {
        button.addEventListener('click', function() {
            const jobName = this.closest('.cron-job-item').querySelector('.cron-job-name').textContent;
            
            // Simular ejecución
            showNotification('Ejecutando...', `Ejecutando tarea: ${jobName}...`, 'info');
            
            setTimeout(() => {
                showNotification('Completado', `La tarea "${jobName}" se ha ejecutado correctamente.`, 'success');
            }, 2000);
        });
    });
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
    
    // Auto-cerrar después de un tiempo
    const timeout = type === 'error' ? 8000 : 5000;
    setTimeout(() => {
        closeNotification(notification);
    }, timeout);
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

// Funciones auxiliares
function formatDate(date) {
    return date.getFullYear() + 
           ('0' + (date.getMonth() + 1)).slice(-2) + 
           ('0' + date.getDate()).slice(-2) + '_' +
           ('0' + date.getHours()).slice(-2) + 
           ('0' + date.getMinutes()).slice(-2);
}

// Inicializar modales
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
                
                // Si el modal requiere datos adicionales
                const dataType = this.getAttribute('data-integration') || 
                                  this.getAttribute('data-tax') || 
                                  this.getAttribute('data-tax-class') || 
                                  this.getAttribute('data-template') || 
                                  this.getAttribute('data-store') || 
                                  this.getAttribute('data-role');
                
                if (dataType) {
                    // En una aplicación real, aquí cargaríamos los datos específicos
                    console.log(`Cargar datos para: ${dataType} en modal: ${modalId}`);
                }
            }
        });
    });
    
    // Cerrar modal
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
    
    // Cerrar al hacer clic fuera
    const modals = document.querySelectorAll('.modal-overlay');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
});

// Función para abrir modal
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

// Función para cerrar modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}