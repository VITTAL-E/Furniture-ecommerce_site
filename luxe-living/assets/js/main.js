/**
 * ============================================================
 * LUXE LIVING — Main JavaScript
 * Core functionality for the furniture eCommerce template
 * Version: 1.0.0
 * 
 * TABLE OF CONTENTS:
 * 1. Theme Management (Dark/Light mode)
 * 2. Mobile Navigation
 * 3. Header Scroll Effects
 * 4. Cart System (localStorage)
 * 5. Wishlist System (localStorage)
 * 6. Product Filtering & Sorting
 * 7. Product Gallery
 * 8. Quantity Selector
 * 9. Form Validation
 * 10. Toast Notification System
 * 11. Tabs Component
 * 12. Accordion Component
 * 13. Modal System
 * 14. Countdown Timer
 * 15. Scroll Animations (IntersectionObserver)
 * 16. Newsletter Handler
 * 17. Search Functionality
 * 18. Lazy Loading
 * 19. Back to Top
 * 20. Init
 * ============================================================
 */

'use strict';

/* ==========================================================
   1. THEME MANAGEMENT
   ========================================================== */
const ThemeManager = {
  STORAGE_KEY: 'luxe-living-theme',

  /**
   * Initialize theme based on saved preference or system setting
   */
  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Bind toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  /**
   * Set the theme on the document
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleIcons(theme);
  },

  /**
   * Toggle between light and dark
   */
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  /**
   * Update all toggle button icons
   * @param {string} theme
   */
  updateToggleIcons(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
};

/* ==========================================================
   1b. RTL MANAGER
   ========================================================== */
const RTLManager = {
  STORAGE_KEY: 'luxe-living-rtl',

  /**
   * Initialize RTL based on saved preference
   */
  init() {
    const savedDir = localStorage.getItem(this.STORAGE_KEY);

    if (savedDir) {
      this.setDirection(savedDir);
    }

    // Bind toggle buttons
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  /**
   * Set document direction
   * @param {'ltr'|'rtl'} dir
   */
  setDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(this.STORAGE_KEY, dir);
    this.updateToggleIcons(dir);
  },

  /**
   * Toggle between LTR and RTL
   */
  toggle() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    this.setDirection(next);
  },

  /**
   * Update toggle button appearance
   * @param {'ltr'|'rtl'} dir
   */
  updateToggleIcons(dir) {
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
      btn.classList.toggle('active', dir === 'rtl');
      btn.setAttribute('aria-pressed', dir === 'rtl');
      btn.title = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
    });
  }
};

/* ==========================================================
   2. MOBILE NAVIGATION
   ========================================================== */
const MobileNav = {
  init() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-main');
    const overlay = document.querySelector('.mobile-overlay');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      overlay?.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    overlay?.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Mobile dropdowns
    document.querySelectorAll('.nav-dropdown-toggle').forEach(dropToggle => {
      dropToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parent = dropToggle.closest('.nav-dropdown');
          parent.classList.toggle('active');
        }
      });
    });

    // Close on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
};

/* ==========================================================
   3. HEADER SCROLL EFFECTS
   ========================================================== */
const HeaderScroll = {
  init() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }
};

/* ==========================================================
   4. CART SYSTEM
   ========================================================== */
const Cart = {
  STORAGE_KEY: 'luxe-living-cart',

  /**
   * Get all cart items
   * @returns {Array}
   */
  getItems() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Save cart items
   * @param {Array} items
   */
  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateUI();
  },

  /**
   * Add item to cart
   * @param {Object} product - { id, name, price, image, quantity, color, size }
   */
  addItem(product) {
    const items = this.getItems();
    const existing = items.find(item => item.id === product.id && item.color === product.color && item.size === product.size);

    if (existing) {
      existing.quantity += (product.quantity || 1);
    } else {
      items.push({
        ...product,
        quantity: product.quantity || 1
      });
    }

    this.saveItems(items);
    Toast.show(`${product.name} added to cart`, 'success');
  },

  /**
   * Remove item from cart
   * @param {string} id
   */
  removeItem(id) {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
    Toast.show('Item removed from cart', 'info');
  },

  /**
   * Update item quantity
   * @param {string} id
   * @param {number} quantity
   */
  updateQuantity(id, quantity) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveItems(items);
    }
  },

  /**
   * Get total item count
   * @returns {number}
   */
  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Get cart subtotal
   * @returns {number}
   */
  getSubtotal() {
    return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  /**
   * Clear entire cart
   */
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateUI();
  },

  /**
   * Update all cart count badges in the UI
   */
  updateUI() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  /**
   * Render cart items on the cart page
   */
  renderCartPage() {
    const container = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    
    if (!container) return;

    const items = this.getItems();

    if (items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    container.innerHTML = items.map(item => `
      <tr>
        <td>
          <div class="cart-item-info">
            <div class="cart-item-img">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-meta">${item.color || ''} ${item.size ? '/ ' + item.size : ''}</div>
            </div>
          </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <div class="qty-selector">
            <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1}); Cart.renderCartPage();" aria-label="Decrease quantity">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" 
              onchange="Cart.updateQuantity('${item.id}', parseInt(this.value)); Cart.renderCartPage();" aria-label="Quantity">
            <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1}); Cart.renderCartPage();" aria-label="Increase quantity">+</button>
          </div>
        </td>
        <td><strong>$${(item.price * item.quantity).toFixed(2)}</strong></td>
        <td>
          <button class="cart-remove" onclick="Cart.removeItem('${item.id}'); Cart.renderCartPage();" aria-label="Remove ${item.name}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `).join('');

    // Update summary
    this.updateOrderSummary();
  },

  /**
   * Update order summary totals
   */
  updateOrderSummary() {
    const subtotal = this.getSubtotal();
    const shipping = subtotal > 500 ? 0 : 49.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }
};

/* ==========================================================
   5. WISHLIST SYSTEM
   ========================================================== */
const Wishlist = {
  STORAGE_KEY: 'luxe-living-wishlist',

  getItems() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateUI();
  },

  toggle(product) {
    const items = this.getItems();
    const index = items.findIndex(i => i.id === product.id);

    if (index > -1) {
      items.splice(index, 1);
      Toast.show(`${product.name} removed from wishlist`, 'info');
    } else {
      items.push(product);
      Toast.show(`${product.name} added to wishlist`, 'success');
    }

    this.saveItems(items);
    this.updateButtons(product.id);
  },

  isWishlisted(id) {
    return this.getItems().some(item => item.id === id);
  },

  removeItem(id) {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
    Toast.show('Item removed from wishlist', 'info');
  },

  getCount() {
    return this.getItems().length;
  },

  updateUI() {
    const count = this.getCount();
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  updateButtons(id) {
    const isWished = this.isWishlisted(id);
    document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('wishlisted', isWished);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isWished ? 'fas fa-heart' : 'far fa-heart';
      }
    });
  },

  initButtons() {
    const items = this.getItems();
    items.forEach(item => this.updateButtons(item.id));
  }
};

/* ==========================================================
   6. PRODUCT FILTERING & SORTING
   ========================================================== */
const ProductFilter = {
  init() {
    // Sort dropdown
    const sortSelect = document.getElementById('product-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => this.applySort(sortSelect.value));
    }

    // Category filters
    document.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.addEventListener('change', (e) => {
        document.querySelectorAll('[data-filter-category]').forEach(b => {
          if (b !== btn) b.checked = false;
        });
        if (!btn.checked) {
          // If unchecking the active one, fallback to 'all' or keep it checked?
          // Usually we want at least one selected, so let's force it checked or select 'all'
          if (btn.dataset.filterCategory !== 'all') {
            const allBtn = document.querySelector('[data-filter-category="all"]');
            if (allBtn) allBtn.checked = true;
            this.filterByCategory('all');
          } else {
            btn.checked = true; // Prevent unchecking 'All'
          }
        } else {
          this.filterByCategory(btn.dataset.filterCategory);
        }
      });
    });

    // Price range
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
      priceRange.addEventListener('input', () => {
        const value = priceRange.value;
        const priceDisplay = document.getElementById('price-range-value');
        if (priceDisplay) priceDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        this.filterByPrice(value);
      });
    }

    // Rating filter
    document.querySelectorAll('[data-filter-rating]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterByRating(parseInt(btn.dataset.filterRating));
      });
    });

    // View toggle (grid/list)
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const grid = document.querySelector('.products-grid');
        if (grid) {
          grid.classList.toggle('products-list', btn.dataset.view === 'list');
        }
      });
    });
  },

  applySort(value) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product-card'));
    
    cards.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price || 0);
      const priceB = parseFloat(b.dataset.price || 0);
      const ratingA = parseFloat(a.dataset.rating || 0);
      const ratingB = parseFloat(b.dataset.rating || 0);
      const nameA = (a.dataset.name || '').toLowerCase();
      const nameB = (b.dataset.name || '').toLowerCase();

      switch (value) {
        case 'price-low': return priceA - priceB;
        case 'price-high': return priceB - priceA;
        case 'rating': return ratingB - ratingA;
        case 'name-az': return nameA.localeCompare(nameB);
        case 'name-za': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });

    cards.forEach(card => grid.appendChild(card));
  },

  filterByCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    this.updateResultCount();
  },

  filterByPrice(maxPrice) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const price = parseFloat(card.dataset.price || 0);
      card.style.display = price <= maxPrice ? '' : 'none';
    });
    this.updateResultCount();
  },

  filterByRating(minRating) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const rating = parseFloat(card.dataset.rating || 0);
      card.style.display = rating >= minRating ? '' : 'none';
    });
    this.updateResultCount();
  },

  updateResultCount() {
    const visible = document.querySelectorAll('.product-card:not([style*="display: none"])').length;
    const countEl = document.querySelector('.shop-result-count');
    if (countEl) {
      countEl.textContent = `Showing ${visible} products`;
    }
  }
};

/* ==========================================================
   7. PRODUCT GALLERY
   ========================================================== */
const ProductGallery = {
  init() {
    const thumbnails = document.querySelectorAll('.product-thumb');
    const mainImg = document.querySelector('.product-main-img img');

    if (!thumbnails.length || !mainImg) return;

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.querySelector('img').src;
        mainImg.alt = thumb.querySelector('img').alt;
      });
    });
  }
};

/* ==========================================================
   8. QUANTITY SELECTOR
   ========================================================== */
const QuantitySelector = {
  init() {
    document.querySelectorAll('.qty-selector').forEach(selector => {
      const minusBtn = selector.querySelector('.qty-btn:first-child');
      const plusBtn = selector.querySelector('.qty-btn:last-child');
      const input = selector.querySelector('.qty-input');

      if (!minusBtn || !plusBtn || !input) return;

      minusBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        input.value = Math.max(1, current - 1);
        input.dispatchEvent(new Event('change'));
      });

      plusBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        input.value = current + 1;
        input.dispatchEvent(new Event('change'));
      });
    });
  }
};

/* ==========================================================
   9. FORM VALIDATION
   ========================================================== */
const FormValidator = {
  /**
   * Initialize form validation
   */
  init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation on blur
      form.querySelectorAll('.form-control[required]').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.closest('.form-group')?.classList.contains('has-error')) {
            this.validateField(input);
          }
        });
      });
    });
  },

  /**
   * Validate entire form
   * @param {HTMLFormElement} form
   * @returns {boolean}
   */
  validateForm(form) {
    let isValid = true;
    form.querySelectorAll('.form-control[required]').forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    if (!isValid) {
      Toast.show('Please fix the errors in the form', 'error');
    }
    return isValid;
  },

  /**
   * Validate a single field
   * @param {HTMLInputElement} input
   * @returns {boolean}
   */
  validateField(input) {
    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');
    let message = '';

    // Required
    if (input.required && !input.value.trim()) {
      message = 'This field is required';
    }
    // Email
    else if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
      message = 'Please enter a valid email address';
    }
    // Phone
    else if (input.type === 'tel' && input.value && !this.isValidPhone(input.value)) {
      message = 'Please enter a valid phone number';
    }
    // Min length
    else if (input.minLength > 0 && input.value.length < input.minLength) {
      message = `Must be at least ${input.minLength} characters`;
    }
    // Pattern
    else if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
      message = input.dataset.patternError || 'Invalid format';
    }

    if (message) {
      group?.classList.add('has-error');
      group?.classList.remove('has-success');
      input.classList.add('error');
      input.classList.remove('success');
      if (errorEl) errorEl.textContent = message;
      return false;
    } else {
      group?.classList.remove('has-error');
      group?.classList.add('has-success');
      input.classList.remove('error');
      input.classList.add('success');
      return true;
    }
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone(phone) {
    return /^[\+]?[0-9\s\-\(\)]{7,15}$/.test(phone);
  }
};

/* ==========================================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================================== */
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      this.container.setAttribute('role', 'alert');
      this.container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.container);
    }
  },

  /**
   * Show a toast notification
   * @param {string} message
   * @param {string} type - 'success', 'error', 'warning', 'info'
   * @param {number} duration - Auto-close duration in ms
   */
  show(message, type = 'info', duration = 3000) {
    if (!this.container) this.init();

    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="toast-icon ${icons[type] || icons.info}"></i>
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.dismiss(toast));

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  },

  /**
   * Dismiss a toast
   * @param {HTMLElement} toast
   */
  dismiss(toast) {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }
};

/* ==========================================================
   11. TABS COMPONENT
   ========================================================== */
const Tabs = {
  init() {
    document.querySelectorAll('.tabs').forEach(tabContainer => {
      const buttons = tabContainer.querySelectorAll('.tab-btn');
      const parentSection = tabContainer.closest('.tabs-wrapper') || tabContainer.parentElement;
      const contents = parentSection.querySelectorAll('.tab-content');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));

          btn.classList.add('active');
          const targetContent = parentSection.querySelector(`#${target}`);
          if (targetContent) targetContent.classList.add('active');
        });
      });
    });
  }
};

/* ==========================================================
   12. ACCORDION COMPONENT
   ========================================================== */
const Accordion = {
  init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const body = item.querySelector('.accordion-body');
        const isActive = item.classList.contains('active');

        // Close all in same accordion
        const accordion = item.closest('.accordion');
        if (accordion?.dataset.singleOpen !== 'false') {
          accordion.querySelectorAll('.accordion-item').forEach(ai => {
            ai.classList.remove('active');
            ai.querySelector('.accordion-body').style.maxHeight = null;
          });
        }

        if (!isActive) {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }
};

/* ==========================================================
   13. MODAL SYSTEM
   ========================================================== */
const Modal = {
  init() {
    // Open triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(trigger.dataset.modal);
      });
    });

    // Close triggers
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) this.close(overlay.id);
      });
    });

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close(overlay.id);
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
          this.close(overlay.id);
        });
      }
    });
  },

  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

/* ==========================================================
   14. COUNTDOWN TIMER
   ========================================================== */
const CountdownTimer = {
  init() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;

    // TODO: Set your launch date here
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // 30 days from now

    this.update(launchDate);
    setInterval(() => this.update(launchDate), 1000);
  },

  update(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.setElement('countdown-days', days);
    this.setElement('countdown-hours', hours);
    this.setElement('countdown-minutes', minutes);
    this.setElement('countdown-seconds', seconds);
  },

  setElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  }
};

/* ==========================================================
   15. SCROLL ANIMATIONS
   ========================================================== */
const ScrollAnimation = {
  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }
};

/* ==========================================================
   16. NEWSLETTER HANDLER
   ========================================================== */
const Newsletter = {
  init() {
    document.querySelectorAll('.newsletter-form, .footer-newsletter-form, .coming-soon-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          // TODO: Integrate with Mailchimp/ConvertKit
          Toast.show('Thank you for subscribing!', 'success');
          input.value = '';
        } else {
          Toast.show('Please enter a valid email', 'error');
        }
      });
    });
  }
};

/* ==========================================================
   17. SEARCH FUNCTIONALITY
   ========================================================== */
const Search = {
  init() {
    // Header search
    const searchBtn = document.querySelector('.header-search-btn');
    const searchOverlay = document.getElementById('search-overlay');

    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchOverlay.querySelector('input')?.focus();
      });

      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
          searchOverlay.classList.remove('active');
        }
      });
    }
  }
};

/* ==========================================================
   18. LAZY LOADING IMAGES
   ========================================================== */
const LazyLoad = {
  init() {
    if ('loading' in HTMLImageElement.prototype) return; // Native support

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
    }
  }
};

/* ==========================================================
   19. BACK TO TOP
   ========================================================== */
const BackToTop = {
  init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('active', window.pageYOffset > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ==========================================================
   20. CHECKOUT SYSTEM
   ========================================================== */
const Checkout = {
  currentStep: 1,

  init() {
    const nextBtns = document.querySelectorAll('[data-checkout-next]');
    const prevBtns = document.querySelectorAll('[data-checkout-prev]');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => this.nextStep());
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => this.prevStep());
    });

    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
      method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        method.classList.add('active');
        const radio = method.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  },

  nextStep() {
    if (this.currentStep < 3) {
      this.setStep(this.currentStep + 1);
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.setStep(this.currentStep - 1);
    }
  },

  setStep(step) {
    this.currentStep = step;

    // Update step indicators
    document.querySelectorAll('.checkout-step').forEach((stepEl, index) => {
      stepEl.classList.remove('active', 'completed');
      if (index + 1 < step) stepEl.classList.add('completed');
      if (index + 1 === step) stepEl.classList.add('active');
    });

    // Show/hide step content
    document.querySelectorAll('.checkout-step-content').forEach((content, index) => {
      content.style.display = index + 1 === step ? 'block' : 'none';
    });
  }
};

/* ==========================================================
   21. ADD TO CART HANDLER (Product Page)
   ========================================================== */
function handleAddToCart(productData) {
  Cart.addItem(productData);
}

function handleWishlistToggle(productData) {
  Wishlist.toggle(productData);
}

/* ==========================================================
   22. INITIALIZATION
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Core Systems
  ThemeManager.init();
  RTLManager.init();
  MobileNav.init();
  HeaderScroll.init();
  Toast.init();

  // Cart & Wishlist
  Cart.updateUI();
  Wishlist.updateUI();
  Wishlist.initButtons();

  // Components
  Tabs.init();
  Accordion.init();
  Modal.init();
  QuantitySelector.init();

  // Features
  ProductFilter.init();
  ProductGallery.init();
  FormValidator.init();
  Newsletter.init();
  Search.init();
  CountdownTimer.init();
  ScrollAnimation.init();
  LazyLoad.init();
  BackToTop.init();
  Checkout.init();

  // Cart Page
  Cart.renderCartPage();
});
