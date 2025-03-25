// Inventory page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all inventory functions
    initInventory();
  });
  
  // Main initialization function
  function initInventory() {
    initViewToggle();
    initModalTabs();
    initFileUploads();
    initIconSelector();
    initSelectAll();
    initCategoryEvents();
    populateSubcategories();
    initPriceCalculations();
    initProductSearch();
    initStockAlerts();
    initBulkActions();
    initPagination();
    initSorting();
    initFilters();
  }
  
  // Initialize view toggle buttons (Table vs Grid view)
  function initViewToggle() {
    const tableViewBtn = document.getElementById('table-view');
    const gridViewBtn = document.getElementById('grid-view');
    const tableView = document.querySelector('.table-view');
    const gridView = document.querySelector('.grid-view');
    
    if (!tableViewBtn || !gridViewBtn) return;
    
    tableViewBtn.addEventListener('click', () => {
      tableViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      tableView.classList.add('active');
      gridView.classList.remove('active');
      
      // Save preference in localStorage
      localStorage.setItem('inventory-view-preference', 'table');
    });
    
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('active');
      tableViewBtn.classList.remove('active');
      gridView.classList.add('active');
      tableView.classList.remove('active');
      
      // Save preference in localStorage
      localStorage.setItem('inventory-view-preference', 'grid');
    });
    
    // Load preference from localStorage
    const savedViewPreference = localStorage.getItem('inventory-view-preference');
    if (savedViewPreference === 'grid') {
      gridViewBtn.click();
    }
  }
  
  // Initialize modal tabs
  function initModalTabs() {
    const modalTabsContainers = document.querySelectorAll('.modal-tabs');
    
    modalTabsContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      const parentModal = container.closest('.modal');
      
      if (!parentModal) return;
      
      const tabContents = parentModal.querySelectorAll('.tab-content');
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs and contents
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding content
          tab.classList.add('active');
          if (tabContents[index]) {
            tabContents[index].classList.add('active');
          }
        });
      });
    });
  }
  
  // Initialize file upload previews
  function initFileUploads() {
    // Main product image upload
    const mainImageUpload = document.getElementById('main-image-upload');
    const previewMainImage = document.getElementById('preview-main-image');
    const removeMainImage = document.getElementById('remove-main-image');
    
    if (mainImageUpload && previewMainImage) {
      mainImageUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            previewMainImage.src = e.target.result;
          }
          
          reader.readAsDataURL(this.files[0]);
        }
      });
      
      if (removeMainImage) {
        removeMainImage.addEventListener('click', function() {
          previewMainImage.src = 'img/placeholder.jpg';
          mainImageUpload.value = '';
        });
      }
    }
    
    // Additional images upload
    const additionalImageUploads = document.querySelectorAll('.additional-image-item input[type="file"]');
    
    additionalImageUploads.forEach(upload => {
      const previewImg = upload.closest('.additional-image-item').querySelector('img');
      const removeBtn = upload.closest('.additional-image-item').querySelector('.btn-icon');
      
      upload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            previewImg.src = e.target.result;
          }
          
          reader.readAsDataURL(this.files[0]);
        }
      });
      
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          previewImg.src = 'img/placeholder.jpg';
          upload.value = '';
        });
      }
    });
    
    // Add more images button
    const addMoreBtn = document.querySelector('.add-more');
    if (addMoreBtn) {
      addMoreBtn.addEventListener('click', function() {
        // Add new image upload field
        const newImageItem = document.createElement('div');
        newImageItem.className = 'additional-image-item';
        newImageItem.innerHTML = `
          <div class="file-upload-preview">
            <img src="img/placeholder.jpg" alt="Vista previa">
          </div>
          <div class="file-upload-controls">
            <label class="btn btn-secondary file-upload-btn">
              <input type="file" accept="image/*" hidden>
              Seleccionar
            </label>
            <button class="btn-icon" title="Eliminar"><i>🗑️</i></button>
          </div>
        `;
        
        const container = addMoreBtn.parentElement;
        container.insertBefore(newImageItem, addMoreBtn);
        
        // Add event listeners to new item
        const newUpload = newImageItem.querySelector('input[type="file"]');
        const newPreviewImg = newImageItem.querySelector('img');
        const newRemoveBtn = newImageItem.querySelector('.btn-icon');
        
        newUpload.addEventListener('change', function(e) {
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
              newPreviewImg.src = e.target.result;
            }
            
            reader.readAsDataURL(this.files[0]);
          }
        });
        
        newRemoveBtn.addEventListener('click', function() {
          newImageItem.remove();
        });
      });
    }
  }
  
  // Initialize icon selector
  function initIconSelector() {
    const iconOptions = document.querySelectorAll('.icon-option');
    
    iconOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all options
        iconOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
      });
    });
  }
  
  // Initialize select all functionality for table
  function initSelectAll() {
    const selectAllCheckbox = document.querySelector('.select-all');
    const itemCheckboxes = document.querySelectorAll('.select-item');
    const selectedCount = document.querySelector('.selected-count');
    
    if (!selectAllCheckbox || !itemCheckboxes.length) return;
    
    // Update selected count function
    function updateSelectedCount() {
      const selectedItems = document.querySelectorAll('.select-item:checked');
      if (selectedCount) {
        selectedCount.textContent = `${selectedItems.length} elementos seleccionados`;
      }
    }
    
    selectAllCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      
      itemCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        
        // Toggle selected class on parent row
        const row = checkbox.closest('tr');
        if (row) {
          if (isChecked) {
            row.classList.add('selected-row');
          } else {
            row.classList.remove('selected-row');
          }
        }
      });
      
      updateSelectedCount();
    });
    
    itemCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        // Toggle selected class on parent row
        const row = this.closest('tr');
        if (row) {
          if (this.checked) {
            row.classList.add('selected-row');
          } else {
            row.classList.remove('selected-row');
          }
        }
        
        // Update select all checkbox state
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        const someChecked = Array.from(itemCheckboxes).some(cb => cb.checked);
        
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
        
        updateSelectedCount();
      });
    });
    
    // Initial count update
    updateSelectedCount();
  }
  
  // Category management
  function initCategoryEvents() {
    // Category card hover actions
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      const actions = card.querySelector('.category-actions');
      
      if (!actions) return;
      
      // Set initial opacity
      actions.style.opacity = '0.2';
      
      card.addEventListener('mouseenter', () => {
        actions.style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', () => {
        actions.style.opacity = '0.2';
      });
      
      // Edit category click handler
      const editBtn = actions.querySelector('.btn-icon[title="Editar"]');
      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const categoryName = card.querySelector('h4').textContent;
          
          // Open modal with category data
          const modal = document.getElementById('nuevaCategoria');
          if (modal) {
            const nameInput = modal.querySelector('input[type="text"]');
            const descriptionTextarea = modal.querySelector('textarea');
            const modalTitle = modal.querySelector('.modal-title');
            
            if (nameInput) nameInput.value = categoryName;
            if (modalTitle) modalTitle.textContent = 'Editar Categoría';
            
            // Update save button text
            const saveBtn = modal.querySelector('.btn-primary');
            if (saveBtn) saveBtn.textContent = 'Actualizar Categoría';
            
            // Show the modal
            openModal('nuevaCategoria');
          }
        });
      }
      
      // Delete category click handler
      const deleteBtn = actions.querySelector('.btn-icon[title="Eliminar"]');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const categoryName = card.querySelector('h4').textContent;
          
          if (confirm(`¿Está seguro de eliminar la categoría "${categoryName}"?`)) {
            // Simulate deletion (would connect to backend in real app)
            card.style.opacity = '0.5';
            setTimeout(() => {
              card.remove();
            }, 300);
          }
        });
      }
    });
  }
  
  // Dynamic subcategory population (based on category selection)
  function populateSubcategories() {
    const categorySelect = document.querySelector('select[name="categoria"]');
    const subcategorySelect = document.querySelector('select[name="subcategoria"]');
    
    if (!categorySelect || !subcategorySelect) return;
    
    const subcategories = {
      'Computadoras': ['Laptops', 'Desktops', 'All-in-One', 'Mini PC'],
      'Periféricos': ['Monitores', 'Teclados', 'Mouse', 'Auriculares', 'Webcams'],
      'Almacenamiento': ['Discos SSD', 'Discos HDD', 'USB Flash', 'Tarjetas SD'],
      'Redes': ['Routers', 'Switches', 'Access Points', 'Cables'],
      'Accesorios': ['Fundas', 'Adaptadores', 'Baterías', 'Cargadores']
    };
    
    categorySelect.addEventListener('change', function() {
      const selected = this.value;
      const options = subcategories[selected] || [];
      
      // Clear subcategory options
      subcategorySelect.innerHTML = '<option value="">Seleccione una subcategoría</option>';
      
      // Populate with new options
      options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option.toLowerCase().replace(/\s+/g, '-');
        optionEl.textContent = option;
        subcategorySelect.appendChild(optionEl);
      });
    });
  }
  
  // Initialize price calculations
  function initPriceCalculations() {
    const purchasePriceInput = document.querySelector('input[name="purchase_price"]');
    const retailPriceInput = document.querySelector('input[name="retail_price"]');
    const wholesalePriceInput = document.querySelector('input[name="wholesale_price"]');
    const technicianPriceInput = document.querySelector('input[name="technician_price"]');
    const taxInput = document.querySelector('input[name="tax"]');
    
    if (!purchasePriceInput || !retailPriceInput) return;
    
    // Calculate retail price based on purchase price (with markup)
    purchasePriceInput.addEventListener('input', function() {
      const purchasePrice = parseFloat(this.value) || 0;
      const markup = 1.3; // 30% markup
      
      // Only update if retail price hasn't been manually set yet
      if (!retailPriceInput.dataset.manuallySet) {
        const suggestedPrice = (purchasePrice * markup).toFixed(2);
        retailPriceInput.value = suggestedPrice;
        
        // Update other prices if they haven't been manually set
        if (wholesalePriceInput && !wholesalePriceInput.dataset.manuallySet) {
          wholesalePriceInput.value = (purchasePrice * 1.2).toFixed(2); // 20% markup
        }
        
        if (technicianPriceInput && !technicianPriceInput.dataset.manuallySet) {
          technicianPriceInput.value = (purchasePrice * 1.15).toFixed(2); // 15% markup
        }
      }
    });
    
    // Flag when price is manually set
    [retailPriceInput, wholesalePriceInput, technicianPriceInput].forEach(input => {
      if (!input) return;
      
      input.addEventListener('input', function() {
        this.dataset.manuallySet = 'true';
      });
    });
    
    // Calculate tax-inclusive prices
    if (taxInput) {
      taxInput.addEventListener('input', function() {
        calculateTaxInclusivePrices();
      });
      
      function calculateTaxInclusivePrices() {
        const taxRate = parseFloat(taxInput.value) / 100 || 0;
        const priceDisplayElements = document.querySelectorAll('.price-with-tax');
        
        priceDisplayElements.forEach(el => {
          const basePrice = parseFloat(el.dataset.basePrice) || 0;
          const priceWithTax = basePrice * (1 + taxRate);
          el.textContent = '$' + priceWithTax.toFixed(2);
        });
      }
    }
  }
  
  // Product search functionality
  function initProductSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const productRows = document.querySelectorAll('tbody tr');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      if (productRows.length) {
        productRows.forEach(row => {
          const productName = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
          const productId = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
          const category = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
          
          const isMatch = productName.includes(searchTerm) || 
                          productId.includes(searchTerm) || 
                          category.includes(searchTerm);
          
          row.style.display = isMatch ? '' : 'none';
        });
      }
      
      if (productCards.length) {
        productCards.forEach(card => {
          const productName = card.querySelector('h4').textContent.toLowerCase();
          const category = card.querySelector('.product-category').textContent.toLowerCase();
          
          const isMatch = productName.includes(searchTerm) || category.includes(searchTerm);
          
          card.style.display = isMatch ? '' : 'none';
        });
      }
      
      // Update visible items count
      updateVisibleItemsCount();
    });
  }
  
  // Stock alerts system
  function initStockAlerts() {
    const lowStockItems = document.querySelectorAll('.badge-warning');
    const outOfStockItems = document.querySelectorAll('.badge-danger');
    
    if (lowStockItems.length || outOfStockItems.length) {
      // Update the stock indicator in the sidebar
      const inventoryNavItem = document.querySelector('.nav-item:nth-child(2)');
      if (inventoryNavItem) {
        const alertCount = lowStockItems.length + outOfStockItems.length;
        
        if (alertCount > 0) {
          const alertBadge = document.createElement('span');
          alertBadge.className = 'nav-alert';
          alertBadge.textContent = alertCount;
          inventoryNavItem.appendChild(alertBadge);
        }
      }
    }
  }
  
  // Bulk actions functionality
  function initBulkActions() {
    const bulkActionSelect = document.querySelector('select[name="bulk-action"]');
    const applyBulkActionBtn = document.querySelector('.apply-bulk-action');
    
    if (!bulkActionSelect || !applyBulkActionBtn) return;
    
    applyBulkActionBtn.addEventListener('click', function() {
      const selectedAction = bulkActionSelect.value;
      if (!selectedAction) return;
      
      const selectedItems = document.querySelectorAll('.select-item:checked');
      if (!selectedItems.length) {
        alert('Por favor, seleccione al menos un producto');
        return;
      }
      
      // Perform bulk action based on selection
      switch (selectedAction) {
        case 'delete':
          if (confirm(`¿Está seguro de eliminar ${selectedItems.length} productos?`)) {
            // Simulate deletion
            selectedItems.forEach(item => {
              const row = item.closest('tr');
              if (row) row.remove();
            });
            
            alert(`${selectedItems.length} productos eliminados correctamente`);
            
            // Update select-all checkbox
            const selectAllCheckbox = document.querySelector('.select-all');
            if (selectAllCheckbox) {
              selectAllCheckbox.checked = false;
              selectAllCheckbox.indeterminate = false;
            }
            
            // Update selected count
            const selectedCount = document.querySelector('.selected-count');
            if (selectedCount) {
              selectedCount.textContent = '0 elementos seleccionados';
            }
          }
          break;
          
        case 'update-stock':
          const newStock = prompt('Ingrese la nueva cantidad de stock:');
          if (newStock !== null && !isNaN(parseInt(newStock))) {
            selectedItems.forEach(item => {
              const row = item.closest('tr');
              if (row) {
                const stockCell = row.querySelector('td:nth-child(7)');
                if (stockCell) {
                  stockCell.textContent = `${newStock} unid.`;
                  
                  // Update badge
                  const badgeCell = row.querySelector('td:nth-child(12)');
                  if (badgeCell) {
                    const badge = badgeCell.querySelector('.badge');
                    if (parseInt(newStock) === 0) {
                      badge.className = 'badge badge-danger';
                      badge.textContent = 'Sin stock';
                    } else if (parseInt(newStock) <= 5) {
                      badge.className = 'badge badge-warning';
                      badge.textContent = 'Bajo stock';
                    } else {
                      badge.className = 'badge badge-success';
                      badge.textContent = 'En stock';
                    }
                  }
                }
              }
            });
            
            alert(`Stock actualizado para ${selectedItems.length} productos`);
          }
          break;
          
        case 'change-category':
          const categories = ['Computadoras', 'Periféricos', 'Almacenamiento', 'Redes', 'Accesorios'];
          let categoryOptions = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
          let categoryHtml = `
            <div class="modal-like">
              <label>Seleccione la categoría:</label>
              <select id="bulk-category-select" class="form-control">
                ${categoryOptions}
              </select>
            </div>
          `;
          
          const selectedCategory = prompt('Seleccione la nueva categoría para los productos seleccionados: ' + categories.join(', '));
          
          if (selectedCategory && categories.includes(selectedCategory)) {
            selectedItems.forEach(item => {
              const row = item.closest('tr');
              if (row) {
                const categoryCell = row.querySelector('td:nth-child(5)');
                if (categoryCell) {
                  categoryCell.textContent = selectedCategory;
                }
              }
            });
            
            alert(`Categoría actualizada para ${selectedItems.length} productos`);
          }
          break;
          
        case 'change-store':
          const stores = ['Tienda Central', 'Tienda Norte', 'Tienda Sur', 'Tienda Oeste'];
          const selectedStore = prompt('Seleccione el nuevo negocio para los productos seleccionados: ' + stores.join(', '));
          
          if (selectedStore && stores.includes(selectedStore)) {
            selectedItems.forEach(item => {
              const row = item.closest('tr');
              if (row) {
                const storeCell = row.querySelector('td:nth-child(6)');
                if (storeCell) {
                  storeCell.textContent = selectedStore;
                }
              }
            });
            
            alert(`Negocio actualizado para ${selectedItems.length} productos`);
          }
          break;
      }
      
      // Reset bulk action select
      bulkActionSelect.value = '';
    });
  }
  
  // Initialize pagination
  function initPagination() {
    const paginationItems = document.querySelectorAll('.pagination .page-item');
    const paginationNext = document.querySelector('.pagination .page-nav:last-child');
    const paginationPrev = document.querySelector('.pagination .page-nav:first-child');
    
    if (!paginationItems.length) return;
    
    paginationItems.forEach(item => {
      item.addEventListener('click', function() {
        // Skip if it's the "..." item
        if (this.textContent === '...') return;
        
        // Remove active class from all items
        paginationItems.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Enable/disable next/prev buttons
        if (paginationPrev) {
          paginationPrev.disabled = this.textContent === '1';
        }
        
        if (paginationNext) {
          paginationNext.disabled = this.textContent === paginationItems[paginationItems.length - 1].textContent;
        }
        
        // Simulate page change (in a real app, this would fetch data from server)
        simulatePageChange(parseInt(this.textContent));
      });
    });
    
    // Next button
    if (paginationNext) {
      paginationNext.addEventListener('click', function() {
        if (this.disabled) return;
        
        const activePage = document.querySelector('.pagination .page-item.active');
        if (!activePage) return;
        
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('page-item') && nextPage.textContent !== '...') {
          nextPage.click();
        } else if (nextPage && nextPage.textContent === '...') {
          // If next is "...", go to the page after it
          const pageAfterEllipsis = nextPage.nextElementSibling;
          if (pageAfterEllipsis) {
            pageAfterEllipsis.click();
          }
        }
      });
    }
    
    // Previous button
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
    
    function simulatePageChange(pageNumber) {
      console.log(`Loading page ${pageNumber}...`);
      // In a real app, this would fetch data from the server
      // For now, we'll just update the pagination info
      const paginationInfo = document.querySelector('.pagination-info');
      if (paginationInfo) {
        const start = (pageNumber - 1) * 5 + 1;
        const end = Math.min(start + 4, 257);
        paginationInfo.textContent = `Mostrando ${start}-${end} de 257 productos`;
      }
    }
  }
  
  // Initialize sorting
  function initSorting() {
    const sortableHeaders = document.querySelectorAll('th[data-sort]');
    
    sortableHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const sortDirection = this.getAttribute('data-sort-direction') || 'asc';
        const sortField = this.getAttribute('data-sort');
        
        // Update sort indicator
        const sortIcon = this.querySelector('.sort-icon');
        if (sortIcon) {
          sortIcon.textContent = sortDirection === 'asc' ? '↓' : '↑';
        }
        
        // Toggle sort direction for next click
        this.setAttribute('data-sort-direction', sortDirection === 'asc' ? 'desc' : 'asc');
        
        // In a real app, this would trigger a server-side sort
        // For now, just log the action
        console.log(`Sorting by ${sortField} in ${sortDirection} order`);
      });
    });
  }
  
  // Initialize filters
  function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-controls select');
    
    filterSelects.forEach(select => {
      select.addEventListener('change', function() {
        applyFilters();
      });
    });
    
    function applyFilters() {
      const categoryFilter = document.querySelector('.filter-controls select:nth-child(1)').value;
      const storeFilter = document.querySelector('.filter-controls select:nth-child(2)').value;
      const stockFilter = document.querySelector('.filter-controls select:nth-child(3)').value;
      
      // Apply filters to table rows
      const rows = document.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        const category = row.querySelector('td:nth-child(5)').textContent;
        const store = row.querySelector('td:nth-child(6)').textContent;
        const stockStatus = row.querySelector('td:nth-child(12) .badge').textContent;
        
        let showRow = true;
        
        if (categoryFilter && category !== categoryFilter) {
          showRow = false;
        }
        
        if (storeFilter && store !== storeFilter) {
          showRow = false;
        }
        
        if (stockFilter) {
          if (stockFilter === 'en-stock' && stockStatus !== 'En stock') {
            showRow = false;
          } else if (stockFilter === 'bajo-stock' && stockStatus !== 'Bajo stock') {
            showRow = false;
          } else if (stockFilter === 'sin-stock' && stockStatus !== 'Sin stock') {
            showRow = false;
          }
        }
        
        row.style.display = showRow ? '' : 'none';
      });
      
      // Apply filters to grid view
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        const category = card.querySelector('.product-category').textContent;
        const stockStatus = card.querySelector('.badge').textContent;
        // Store might not be directly available in grid view, would need a data attribute
        
        let showCard = true;
        
        if (categoryFilter && category !== categoryFilter) {
          showCard = false;
        }
        
        if (stockFilter) {
          if (stockFilter === 'en-stock' && stockStatus !== 'En stock') {
            showCard = false;
          } else if (stockFilter === 'bajo-stock' && stockStatus !== 'Bajo stock') {
            showCard = false;
          } else if (stockFilter === 'sin-stock' && stockStatus !== 'Sin stock') {
            showCard = false;
          }
        }
        
        card.style.display = showCard ? '' : 'none';
      });
      
      // Update visible items count
      updateVisibleItemsCount();
    }
  }
  
  // Helper function to update visible items count
  function updateVisibleItemsCount() {
    const visibleRows = Array.from(document.querySelectorAll('tbody tr')).filter(row => row.style.display !== 'none');
    const visibleCards = Array.from(document.querySelectorAll('.product-card')).filter(card => card.style.display !== 'none');
    
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
      const activeView = document.querySelector('.table-view.active') ? visibleRows.length : visibleCards.length;
      paginationInfo.textContent = `Mostrando ${activeView} de 257 productos`;
    }
  }
  
  // Helper function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling the body
    }
  }
  
  // Helper function to close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }