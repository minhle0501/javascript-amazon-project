# 🛒 Amazon Cart Clone (study project)

This project simulates the core functionality of an e-commerce checkout/cart system, similar to Amazon. It is built using **vanilla JavaScript**, **HTML**, and **CSS**, organized in modular files for clarity and testability.
🔗 **Live demo:** [(https://javascript-amazon-project-ochre.vercel.app/))
---

## 📁 Project Structure

```
.
├── backend/                    # Mock backend data (JSON)
│   └── products.json
├── data/                       # Application data and logic
│   ├── cart.js
│   ├── cart-class.js
│   ├── cart-oop.js
│   ├── deliveryOptions.js
│   ├── orders.js
│   ├── products.js
├── images/                     # Images and assets
├── scripts/
│   ├── checkout/               # Scripts specific to checkout pages
│   │   ├── checkoutHeader.js
│   │   ├── OrderSummary.js
│   │   └── paymentSummary.js
│   ├── utils/                  # Reusable utility functions
│   │   ├── amazon.js
│   │   └── checkout.js
├── styles/                     # CSS files
├── tests/                      # Testing logic and examples
│   ├── checkout/
│   ├── data/
│   ├── utils/
│   └── tests-simple/
├── amazon.html                 # Main storefront page
├── checkout.html              # Checkout page
├── orders.html                # Orders page
├── tests.html                 # Test runner
└── MIT.LICENSE
```

---

## 🧠 Key Features

* 🛒 Add/remove items from cart
* 💳 Simulated checkout and payment summary
* 📦 Order history and delivery options
* 📁 Modular JS structure with OOP patterns
* ✅ Unit test examples with HTML test runner

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/minhle0501/amazon-cart-clone.git
cd amazon-cart-clone
```

### 2. Run the App

Open the HTML files directly in your browser:

* `amazon.html` — storefront
* `checkout.html` — checkout process
* `orders.html` — order history
* `tests.html` — test runner

---

## 🧪 Testing

Open `tests.html` in your browser to run test suites.

Tests are organized by folder:

* `checkout/` — test checkout-related scripts
* `data/` — logic tests
* `utils/` — helper function tests

---

## 📚 Tech Stack

* ✅ HTML5
* 🎨 CSS3
* 🧠 JavaScript (ES6+)
* 🧪 Manual and script-based testing 

---

## 🙌 Acknowledgments

* Inspired by Amazon's cart system UI/UX
* Icons and design ideas: [Amazon](https://www.amazon.com)
* Educational purpose: Practice modular JS, testing, and DOM manipulation


