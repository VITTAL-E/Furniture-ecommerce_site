/**
 * ============================================================
 * LUXE LIVING — Dashboard JavaScript
 * Functionality for Admin & User Dashboard pages
 * Version: 1.0.0
 * ============================================================
 */

'use strict';

/* ==========================================================
   1. DASHBOARD SIDEBAR
   ========================================================== */
const DashboardSidebar = {
  init() {
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.dashboard-sidebar');

    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');

      // On mobile, toggle overlay
      if (window.innerWidth <= 1024) {
        let overlay = document.querySelector('.dashboard-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'dashboard-overlay mobile-overlay';
          document.body.appendChild(overlay);
          overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
          });
        }
        overlay.classList.toggle('active');
      }
    });

    // Section-based navigation (SPA approach)
    this.initSectionNav();
  },

  /**
   * Initialize sidebar section navigation.
   * Links with [data-section] show/hide .dashboard-section elements.
   */
  initSectionNav() {
    const sectionLinks = document.querySelectorAll('.sidebar-nav-link[data-section]');
    if (!sectionLinks.length) return;

    sectionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        this.showSection(sectionId);

        // Update active state
        document.querySelectorAll('.sidebar-nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Update URL hash
        history.replaceState(null, '', `#${sectionId}`);

        // Close mobile sidebar
        const sidebar = document.querySelector('.dashboard-sidebar');
        const overlay = document.querySelector('.dashboard-overlay');
        if (window.innerWidth <= 1024) {
          sidebar?.classList.remove('active');
          overlay?.classList.remove('active');
        }

        // Scroll to top of content
        document.querySelector('.dashboard-content')?.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // On load, check URL hash or default to first section
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      this.showSection(hash);
      // Activate matching link
      sectionLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.section === hash);
      });
    }
  },

  /**
   * Show a specific section, hide all others.
   * @param {string} sectionId - The section ID to show.
   */
  showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(s => {
      s.style.display = 'none';
    });
    const target = document.getElementById(sectionId);
    if (target) {
      target.style.display = 'block';
      target.style.animation = 'fadeIn 0.3s ease';
    }
  }
};

/* ==========================================================
   2. DASHBOARD CHARTS (CSS-based)
   ========================================================== */
const DashboardCharts = {
  init() {
    this.animateBars();
    this.initPeriodSelector();
  },

  animateBars() {
    const bars = document.querySelectorAll('.bar-chart-bar');
    bars.forEach(bar => {
      const height = bar.dataset.height || '50%';
      bar.style.height = '0%';
      setTimeout(() => {
        bar.style.height = height;
      }, 300);
    });
  },

  initPeriodSelector() {
    document.querySelectorAll('.chart-period-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.chart-period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // TODO: Update chart data based on period
      });
    });
  }
};

/* ==========================================================
   3. DATA TABLES
   ========================================================== */
const DataTable = {
  init() {
    // Table search
    document.querySelectorAll('.table-search').forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const tableId = input.dataset.table;
        const table = document.getElementById(tableId);
        if (!table) return;

        table.querySelectorAll('tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    });

    // Column sorting
    document.querySelectorAll('.dash-table th[data-sort]').forEach(th => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const table = th.closest('table');
        const column = th.dataset.sort;
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const colIndex = Array.from(th.parentElement.children).indexOf(th);
        const isAsc = th.classList.contains('sort-asc');

        // Reset all headers
        th.parentElement.querySelectorAll('th').forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
        });

        th.classList.add(isAsc ? 'sort-desc' : 'sort-asc');

        rows.sort((a, b) => {
          const aVal = a.children[colIndex]?.textContent.trim() || '';
          const bVal = b.children[colIndex]?.textContent.trim() || '';

          if (!isNaN(parseFloat(aVal)) && !isNaN(parseFloat(bVal))) {
            return isAsc
              ? parseFloat(bVal) - parseFloat(aVal)
              : parseFloat(aVal) - parseFloat(bVal);
          }

          return isAsc
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        });

        rows.forEach(row => tbody.appendChild(row));
      });
    });
  }
};

/* ==========================================================
   4. DASHBOARD NOTIFICATIONS
   ========================================================== */
const DashboardNotifications = {
  init() {
    const bellBtn = document.querySelector('.notification-btn');
    const dropdown = document.querySelector('.notification-dropdown');

    if (!bellBtn || !dropdown) return;

    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Mark as read
    document.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.remove('unread');
      });
    });
  }
};

/* ==========================================================
   5. MOCK DATA GENERATORS
   ========================================================== */
const MockData = {
  // Sample product data for admin
  products: [
    { id: 'p1', name: 'Nordic Lounge Chair', category: 'Living Room', price: 899, stock: 24, status: 'active', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop' },
    { id: 'p2', name: 'Walnut Coffee Table', category: 'Living Room', price: 549, stock: 18, status: 'active', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=80&h=80&fit=crop' },
    { id: 'p3', name: 'King Bed Frame', category: 'Bedroom', price: 1299, stock: 8, status: 'active', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=80&h=80&fit=crop' },
    { id: 'p4', name: 'Marble Dining Table', category: 'Dining', price: 1899, stock: 5, status: 'active', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=80&h=80&fit=crop' },
    { id: 'p5', name: 'Ergonomic Office Chair', category: 'Office', price: 699, stock: 32, status: 'active', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=80&h=80&fit=crop' },
    { id: 'p6', name: 'Velvet Sofa Set', category: 'Living Room', price: 2499, stock: 3, status: 'low-stock', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop' },
    { id: 'p7', name: 'Bookshelf Storage Unit', category: 'Office', price: 449, stock: 0, status: 'out-of-stock', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=80&h=80&fit=crop' },
    { id: 'p8', name: 'Standing Desk', category: 'Office', price: 799, stock: 15, status: 'active', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=80&h=80&fit=crop' },
  ],

  // Sample order data
  orders: [
    { id: '#ORD-2024-001', customer: 'Sarah Johnson', email: 'sarah@example.com', total: 1249.00, items: 3, status: 'delivered', date: '2024-03-15', payment: 'Credit Card' },
    { id: '#ORD-2024-002', customer: 'Michael Chen', email: 'michael@example.com', total: 2899.00, items: 2, status: 'shipped', date: '2024-03-14', payment: 'PayPal' },
    { id: '#ORD-2024-003', customer: 'Emily Davis', email: 'emily@example.com', total: 549.00, items: 1, status: 'processing', date: '2024-03-14', payment: 'Credit Card' },
    { id: '#ORD-2024-004', customer: 'James Wilson', email: 'james@example.com', total: 3698.00, items: 4, status: 'pending', date: '2024-03-13', payment: 'Stripe' },
    { id: '#ORD-2024-005', customer: 'Lisa Thompson', email: 'lisa@example.com', total: 899.00, items: 1, status: 'delivered', date: '2024-03-12', payment: 'Credit Card' },
    { id: '#ORD-2024-006', customer: 'Robert Garcia', email: 'robert@example.com', total: 1598.00, items: 2, status: 'cancelled', date: '2024-03-11', payment: 'PayPal' },
  ],

  // Sample user data
  users: [
    { id: 'u1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', joined: '2024-01-15', orders: 12, spent: 4890.00, status: 'active' },
    { id: 'u2', name: 'Michael Chen', email: 'michael@example.com', role: 'Customer', joined: '2024-02-01', orders: 8, spent: 7240.00, status: 'active' },
    { id: 'u3', name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', joined: '2023-11-20', orders: 24, spent: 12380.00, status: 'active' },
    { id: 'u4', name: 'James Wilson', email: 'james@example.com', role: 'VIP', joined: '2023-06-10', orders: 42, spent: 28900.00, status: 'active' },
    { id: 'u5', name: 'Lisa Thompson', email: 'lisa@example.com', role: 'Customer', joined: '2024-03-01', orders: 2, spent: 1499.00, status: 'active' },
    { id: 'u6', name: 'David Brown', email: 'david@example.com', role: 'Customer', joined: '2023-09-15', orders: 0, spent: 0, status: 'inactive' },
  ],

  getStatusBadge(status) {
    const map = {
      'active': 'badge-success',
      'delivered': 'badge-success',
      'shipped': 'badge-info',
      'processing': 'badge-warning',
      'pending': 'badge-warning',
      'cancelled': 'badge-error',
      'out-of-stock': 'badge-error',
      'low-stock': 'badge-warning',
      'inactive': 'badge-error',
    };
    return map[status] || 'badge-info';
  }
};

/* ==========================================================
   6. ADMIN PRODUCT MANAGEMENT
   ========================================================== */
const AdminProducts = {
  init() {
    this.renderTable();
    this.bindActions();
  },

  renderTable() {
    const tbody = document.getElementById('products-tbody');
    if (!tbody) return;

    tbody.innerHTML = MockData.products.map(p => `
      <tr data-id="${p.id}">
        <td>
          <div class="cart-item-info">
            <div class="cart-item-img">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div>
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-meta">${p.category}</div>
            </div>
          </div>
        </td>
        <td>$${p.price.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td><span class="badge ${MockData.getStatusBadge(p.status)}">${p.status}</span></td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="btn btn-ghost btn-sm" title="Delete" onclick="AdminProducts.deleteProduct('${p.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      const index = MockData.products.findIndex(p => p.id === id);
      if (index > -1) {
        MockData.products.splice(index, 1);
        this.renderTable();
        Toast.show('Product deleted successfully', 'success');
      }
    }
  },

  bindActions() {
    // Add product button
    const addBtn = document.getElementById('add-product-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        Modal.open('product-modal');
      });
    }
  }
};

/* ==========================================================
   7. ADMIN ORDER MANAGEMENT
   ========================================================== */
const AdminOrders = {
  init() {
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('orders-tbody');
    if (!tbody) return;

    tbody.innerHTML = MockData.orders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>
          <div>
            <div style="font-weight:500">${o.customer}</div>
            <div class="text-xs text-muted">${o.email}</div>
          </div>
        </td>
        <td>${o.date}</td>
        <td>${o.items} items</td>
        <td><strong>$${o.total.toFixed(2)}</strong></td>
        <td>${o.payment}</td>
        <td><span class="badge ${MockData.getStatusBadge(o.status)}">${o.status}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" title="View Details"><i class="fas fa-eye"></i></button>
        </td>
      </tr>
    `).join('');
  }
};

/* ==========================================================
   8. ADMIN USER MANAGEMENT
   ========================================================== */
const AdminUsers = {
  init() {
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;

    tbody.innerHTML = MockData.users.map(u => `
      <tr>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">${u.name.charAt(0)}</div>
            <div>
              <div style="font-weight:500">${u.name}</div>
              <div class="text-xs text-muted">${u.email}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${u.role === 'VIP' ? 'badge-accent' : 'badge-info'}">${u.role}</span></td>
        <td>${u.joined}</td>
        <td>${u.orders}</td>
        <td>$${u.spent.toFixed(2)}</td>
        <td><span class="badge ${MockData.getStatusBadge(u.status)}">${u.status}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" title="View"><i class="fas fa-eye"></i></button>
        </td>
      </tr>
    `).join('');
  }
};

/* ==========================================================
   9. USER PROFILE MANAGEMENT
   ========================================================== */
const UserProfile = {
  STORAGE_KEY: 'luxe-living-profile',

  init() {
    this.loadProfile();
    this.bindForm();
  },

  getProfile() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Furniture Ave',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    };
  },

  loadProfile() {
    const profile = this.getProfile();
    Object.keys(profile).forEach(key => {
      const input = document.getElementById(`profile-${key}`);
      if (input) input.value = profile[key];
    });

    // Update name displays
    document.querySelectorAll('.profile-name').forEach(el => {
      el.textContent = `${profile.firstName} ${profile.lastName}`;
    });

    document.querySelectorAll('.profile-email').forEach(el => {
      el.textContent = profile.email;
    });
  },

  bindForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const profile = {};
      formData.forEach((value, key) => {
        profile[key] = value;
      });

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      Toast.show('Profile updated successfully!', 'success');
    });
  }
};

/* ==========================================================
   10. USER ORDER HISTORY
   ========================================================== */
const UserOrders = {
  STORAGE_KEY: 'luxe-living-user-orders',

  getOrders() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) return JSON.parse(data);

    // Return sample data
    return [
      { id: '#ORD-2024-001', date: '2024-03-15', items: 3, total: 1249.00, status: 'delivered' },
      { id: '#ORD-2024-003', date: '2024-03-10', items: 1, total: 549.00, status: 'shipped' },
      { id: '#ORD-2024-005', date: '2024-02-28', items: 2, total: 1798.00, status: 'delivered' },
      { id: '#ORD-2024-007', date: '2024-02-15', items: 1, total: 899.00, status: 'delivered' },
    ];
  },

  renderTable() {
    const tbody = document.getElementById('user-orders-tbody');
    if (!tbody) return;

    const orders = this.getOrders();

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.date}</td>
        <td>${o.items} items</td>
        <td><strong>$${o.total.toFixed(2)}</strong></td>
        <td><span class="badge ${MockData.getStatusBadge(o.status)}">${o.status}</span></td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm">Track</button>
            <button class="btn btn-ghost btn-sm">Reorder</button>
          </div>
        </td>
      </tr>
    `).join('');
  }
};

/* ==========================================================
   11. USER WISHLIST PAGE
   ========================================================== */
const UserWishlistPage = {
  render() {
    const container = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty');
    if (!container) return;

    const items = Wishlist.getItems();

    if (items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      container.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'grid';

    container.innerHTML = items.map(item => `
      <div class="product-card">
        <div class="product-card-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="product-card-actions" style="opacity:1;transform:none;">
            <button class="product-action-btn" onclick="UserWishlistPage.removeAndRender('${item.id}')" title="Remove from Wishlist">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-card-category">${item.category || 'Furniture'}</div>
          <h3 class="product-card-name">${item.name}</h3>
          <div class="product-card-price">
            <span class="product-price">$${item.price.toFixed(2)}</span>
          </div>
          <button class="btn btn-accent btn-sm" style="width:100%;margin-top:8px" 
            onclick="Cart.addItem({id:'${item.id}',name:'${item.name}',price:${item.price},image:'${item.image}',quantity:1})">
            <i class="fas fa-shopping-cart"></i> Move to Cart
          </button>
        </div>
      </div>
    `).join('');
  },

  removeAndRender(id) {
    Wishlist.removeItem(id);
    this.render();
  }
};

/* ==========================================================
   12. ADMIN SETTINGS
   ========================================================== */
const AdminSettings = {
  init() {
    const form = document.getElementById('admin-settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      Toast.show('Settings saved successfully!', 'success');
    });
  }
};

/* ==========================================================
   13. INITIALIZATION
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Common dashboard init
  DashboardSidebar.init();
  DashboardCharts.init();
  DataTable.init();
  DashboardNotifications.init();

  // Page-specific init
  AdminProducts.init();
  AdminOrders.init();
  AdminUsers.init();
  AdminSettings.init();

  // User dashboard
  UserProfile.init();
  UserOrders.renderTable();

  // Wishlist page
  if (document.getElementById('wishlist-grid')) {
    UserWishlistPage.render();
  }
});
