# Luxe Living — Furniture eCommerce Template

> Premium furniture eCommerce website template with modern UI/UX, admin & user dashboards, dark/light mode, RTL support, and production-ready architecture.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Features

### Pages (19 total)
- **Home** — Hero, categories, featured products, testimonials, newsletter
- **About** — Company story, timeline, team, statistics
- **Shop** — Product grid with filters, sorting, view toggle
- **Single Product** — Gallery, specs, reviews, related products
- **Cart** — Dynamic cart with localStorage persistence
- **Checkout** — Multi-step (Shipping → Payment → Review)
- **Blog** — Article grid with sidebar
- **Contact** — Form, map, FAQ accordion
- **404** — Custom error page with search
- **Coming Soon** — Countdown timer, email signup

### Dashboard System (9 pages)
- **Admin Dashboard** — KPIs, revenue chart, recent orders
- **Admin Products** — CRUD table with modal
- **Admin Orders** — Order management with status filters
- **Admin Users** — Customer management
- **Admin Settings** — Tabbed settings (General, Store, Payment, Email)
- **User Dashboard** — Welcome card, quick actions
- **User Orders** — Order history with tracking timeline
- **User Profile** — Edit profile, change password
- **User Wishlist** — Dynamic wishlist grid

### Core Features
- 🌓 Dark/Light mode with system detection
- 🔄 RTL layout support
- 🛒 Cart system (localStorage)
- ❤️ Wishlist system (localStorage)
- ✅ Form validation with error messages
- 🔔 Toast notification system
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 AA accessibility
- 🔍 SEO optimized with JSON-LD
- 💳 Payment placeholders (Stripe/PayPal)

---

## 🚀 Installation

### Quick Start
1. Download or clone the repository
2. Open `pages/index.html` in your browser
3. That's it! No build tools required.

### Using a Local Server (recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

---

## 📁 File Structure

```
luxe-living/
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet (~2800 lines)
│   │   ├── dark-mode.css     # Dark theme overrides
│   │   └── rtl.css           # RTL layout support
│   ├── js/
│   │   ├── main.js           # Core JavaScript (~700 lines)
│   │   └── dashboard.js      # Dashboard functionality
│   └── images/               # (uses Unsplash URLs)
├── pages/
│   ├── index.html            # Home page
│   ├── about.html            # About us
│   ├── shop.html             # Product listing
│   ├── product.html          # Single product
│   ├── cart.html              # Shopping cart
│   ├── checkout.html         # Checkout flow
│   ├── blog.html             # Blog listing
│   ├── contact.html          # Contact page
│   ├── 404.html              # Error page
│   └── coming-soon.html      # Coming soon
├── dashboard/
│   ├── admin-dashboard.html
│   ├── admin-products.html
│   ├── admin-orders.html
│   ├── admin-users.html
│   ├── admin-settings.html
│   ├── user-dashboard.html
│   ├── user-orders.html
│   ├── user-profile.html
│   └── user-wishlist.html
├── documentation/
│   └── documentation.md
├── sitemap.xml
├── robots.txt
└── README.md
```

---

## 🎨 Customization

### Colors
Edit CSS custom properties in `assets/css/style.css`:
```css
:root {
  --primary: #1a1a2e;     /* Deep Navy */
  --secondary: #e8d5b7;   /* Warm Sand */
  --accent: #c9a96e;      /* Gold */
  --bg: #faf8f5;          /* Cream */
}
```

### Fonts
Change font families in the `:root` block:
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
```

### Dark Mode
Customize dark theme colors in `assets/css/dark-mode.css`

### RTL Support
Enable RTL by adding `dir="rtl"` to the `<html>` tag

---

## 🔌 Integrations

### Contact Form (Formspree)
Replace the form action URL in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Newsletter (Mailchimp)
Update the newsletter handler in `main.js` Newsletter section.

### Google Maps
Replace the iframe `src` in `contact.html` with your Maps embed URL.

### Payment (Stripe/PayPal)
Add your API keys in `dashboard/admin-settings.html` payment settings.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640px – 1024px | 2-column grid, side drawer nav |
| Desktop | 1024px – 1280px | Full layout |
| Large | > 1280px | Wide container |

---

## 🧩 Technology Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Flexbox, Grid
- **JavaScript** — ES6+ modules, localStorage
- **Font Awesome 6** — Icon library (CDN)
- **Google Fonts** — Playfair Display + Inter
- **Unsplash** — Product imagery (URLs)

---

## 📝 Credits

- **Design**: Inspired by IKEA, West Elm, and CB2
- **Images**: [Unsplash](https://unsplash.com)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Fonts**: [Google Fonts](https://fonts.google.com)

---

## 📄 Changelog

### v1.0.0 (2024-03-15)
- Initial release
- 10 public pages + 9 dashboard pages
- Dark/Light mode with system detection
- RTL support
- Cart & wishlist with localStorage
- Form validation
- Toast notifications
- Responsive design
- SEO with JSON-LD & sitemap

---

## 🆘 Support

For questions or issues:
1. Check the [documentation](documentation/documentation.md)
2. Open an issue on the repository
3. Email: support@luxeliving.com

---

## 📜 License

This template is released under the **MIT License**. You are free to use, modify, and distribute it for personal and commercial projects.
