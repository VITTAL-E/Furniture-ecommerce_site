# Luxe Living — Documentation

## Table of Contents

1. [Getting Started](#getting-started)
2. [Page Structure](#page-structure)
3. [Design System](#design-system)
4. [Components](#components)
5. [JavaScript Modules](#javascript-modules)
6. [Customization Guide](#customization-guide)
7. [Integrations](#integrations)
8. [Accessibility](#accessibility)
9. [SEO](#seo)
10. [Troubleshooting](#troubleshooting)

---

## 1. Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Optional: A local development server

### Installation
1. Download or clone the template
2. Open `pages/index.html` in a browser
3. No build tools, npm, or frameworks required

### Recommended: Local Server
For proper relative path resolution, use a local server:
```bash
# Python 3
cd luxe-living
python -m http.server 8000

# Node.js
npx serve .
```

---

## 2. Page Structure

### HTML Template
Every page follows this structure:
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <!-- Meta tags, title, fonts, stylesheets -->
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header class="header"><!-- Navigation --></header>
  <div class="mobile-overlay"></div>
  
  <main id="main-content">
    <!-- Page content -->
  </main>
  
  <footer class="footer"><!-- Footer --></footer>
  
  <div id="toast-container" class="toast-container"></div>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

### Dashboard Template
Dashboard pages use a different layout:
```html
<body>
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar"><!-- Sidebar nav --></aside>
    <div class="dashboard-main">
      <header class="dashboard-header"><!-- Top bar --></header>
      <div class="dashboard-content"><!-- Page content --></div>
    </div>
  </div>
</body>
```

---

## 3. Design System

### Color Tokens
All colors are defined as CSS custom properties in `:root`:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | #1a1a2e | #e8d5b7 | Headings, nav, buttons |
| `--secondary` | #e8d5b7 | #1a1a2e | Backgrounds, accents |
| `--accent` | #c9a96e | #c9a96e | CTAs, highlights, links |
| `--bg` | #faf8f5 | #0d0d1a | Page background |
| `--surface` | #ffffff | #1a1a2e | Card/component background |
| `--text` | #2d2d2d | #e8e8e8 | Body text |
| `--text-muted` | #6b6b6b | #9a9a9a | Secondary text |

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Scale**: Uses 8 sizes from `--text-xs` (12px) to `--text-5xl` (60px)

### Spacing
8px grid system with tokens `--space-1` (4px) through `--space-16` (128px).

### Shadows
5 elevation levels: `--shadow-xs` through `--shadow-xl`.

---

## 4. Components

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-icon"><i class="fas fa-heart"></i></button>
```

### Cards
```html
<div class="card">
  <div class="card-img"><img src="..." alt="..."></div>
  <div class="card-body"><h3>Title</h3><p>Description</p></div>
  <div class="card-footer">Footer</div>
</div>
```

### Form Controls
```html
<div class="form-group">
  <label class="form-label">Label <span class="required">*</span></label>
  <input type="text" class="form-control" required>
  <div class="form-error">Error message</div>
</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

### Toast Notifications
```javascript
Toast.show('Message here', 'success');  // success, error, warning, info
Toast.show('Custom duration', 'info', 5000);
```

### Modals
```html
<!-- Trigger -->
<button data-modal="my-modal">Open</button>

<!-- Modal -->
<div class="modal-overlay" id="my-modal">
  <div class="modal">
    <div class="modal-header"><h3>Title</h3><button class="modal-close"><i class="fas fa-times"></i></button></div>
    <div class="modal-body">Content</div>
    <div class="modal-footer"><button class="btn">Action</button></div>
  </div>
</div>
```

### Tabs
```html
<div class="tabs-wrapper">
  <div class="tabs">
    <button class="tab-btn active" data-tab="tab-1">Tab 1</button>
    <button class="tab-btn" data-tab="tab-2">Tab 2</button>
  </div>
  <div class="tab-content active" id="tab-1">Content 1</div>
  <div class="tab-content" id="tab-2">Content 2</div>
</div>
```

### Accordion
```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">Question <span class="accordion-icon"><i class="fas fa-chevron-down"></i></span></button>
    <div class="accordion-body"><div class="accordion-content">Answer</div></div>
  </div>
</div>
```

---

## 5. JavaScript Modules

### ThemeManager
- `ThemeManager.init()` — Auto-detects system preference
- `ThemeManager.toggle()` — Switch light/dark
- `ThemeManager.setTheme('dark')` — Set specific theme

### Cart
- `Cart.addItem({ id, name, price, image })` — Add product
- `Cart.removeItem(id)` — Remove product
- `Cart.updateQuantity(id, qty)` — Update quantity
- `Cart.getItems()` — Get all items
- `Cart.getSubtotal()` — Calculate subtotal
- `Cart.clear()` — Empty cart

### Wishlist
- `Wishlist.toggle(product)` — Add/remove from wishlist
- `Wishlist.isWishlisted(id)` — Check if wishlisted
- `Wishlist.getItems()` — Get all items

### FormValidator
Add `data-validate` to any `<form>` element:
```html
<form data-validate>
  <input class="form-control" required type="email">
  <div class="form-error"></div>
</form>
```

### ScrollAnimation
Add reveal classes to animate elements on scroll:
```html
<div class="reveal">Fade in from bottom</div>
<div class="reveal-left">Slide in from left</div>
<div class="reveal-right">Slide in from right</div>
```

---

## 6. Customization Guide

### Changing Brand Name
1. Search and replace "Luxe Living" across all HTML files
2. Update the logo text in the header and footer
3. Update meta tags and JSON-LD data

### Changing Colors
Edit `:root` in `style.css` and corresponding values in `dark-mode.css`.

### Adding New Products
Copy a product card template and update:
- Image URL
- Product name, price, category
- `data-price`, `data-rating`, `data-category` attributes
- `onclick` handlers with product data

### Adding New Pages
1. Copy an existing page as a template
2. Update the `<title>`, meta description
3. Mark the correct `nav-link` as active
4. Add to `sitemap.xml`

---

## 7. Integrations

### Contact Form
Replace form action with your Formspree/Netlify endpoint:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Google Maps
Update the iframe src in contact.html with your embed URL from Google Maps.

### Newsletter
Modify the `Newsletter.init()` handler in `main.js` to POST to your Mailchimp/ConvertKit endpoint.

### Payments
Add Stripe.js or PayPal SDK scripts and update the checkout flow. Payment gateway settings are configurable via the admin settings page.

---

## 8. Accessibility

### Built-in Features
- Skip to content link
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Focus-visible styles
- 44px minimum touch targets
- Color contrast ratios (WCAG AA)
- Screen reader-only text (`.sr-only`)
- Keyboard navigation support

### Testing
Use browser DevTools Accessibility panel, Lighthouse audit, or axe extension.

---

## 9. SEO

### Per-page Checklist
- [ ] Unique `<title>` (≤60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Single `<h1>` per page
- [ ] Proper H1-H6 hierarchy
- [ ] Image alt text on all images
- [ ] JSON-LD structured data (home, product pages)
- [ ] `width` and `height` on images
- [ ] `loading="lazy"` on below-fold images
- [ ] Semantic HTML elements

---

## 10. Troubleshooting

### Images not loading
Product images use Unsplash URLs and require an internet connection. For offline use, download images locally and update paths.

### Dark mode not persisting
Ensure localStorage is not blocked. Theme preference is stored as `luxe-living-theme`.

### Cart/Wishlist data lost
Data is stored in localStorage. Clearing browser data will reset cart/wishlist.

### Dashboard sidebar not toggling on mobile
Ensure both `main.js` and `dashboard.js` are loaded for dashboard pages.
