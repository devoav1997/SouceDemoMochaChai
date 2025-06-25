
# 🧪 SauceDemo Mocha Test

## 🚀 Mocha + Chai + Selenium WebDriver Automation for SauceDemo

Proyek ini merupakan implementasi **automation testing** menggunakan **Mocha** sebagai test runner, **Chai** untuk assertion, dan **Selenium WebDriver** untuk interaksi dengan browser, dalam konteks pengujian situs [https://www.saucedemo.com](https://www.saucedemo.com).

Fokus pengujian:

* ✅ Login dengan kredensial valid
* ❌ Login dengan username/password tidak valid
* ❌ Login tanpa mengisi username atau password
* ✅ **Product Filtering** (A-Z, Z-A, Low to High, High to Low)
* ✅ **Add to Cart** (tambah produk ke keranjang, cek badge/cart, hapus produk dari cart)
* ✅ **Checkout** (checkout produk, validasi form, skenario cart kosong, dan validasi error)

---

## 🗂️ Struktur Folder

```
saucedemo-test/
├── pages/
│   ├── login.page.js           # Page Object untuk halaman login
│   ├── filter.page.js          # Page Object untuk halaman inventory/filter
│   ├── cart.page.js            # Page Object untuk fitur cart/keranjang
│   └── checkout.page.js        # Page Object untuk proses checkout
├── support/
│   └── webdriver.js            # Konfigurasi Selenium WebDriver
├── steps/
│   ├── login.steps.js          # Step/test untuk valid login
│   ├── login-negative.steps.js # Step/test untuk skenario gagal login
│   ├── filter.steps.js         # Step/test untuk fitur filter produk
│   ├── cart.steps.js           # Step/test untuk fitur add to cart
│   └── checkout.steps.js       # Step/test untuk checkout produk
├── test/
│   ├── login.test.js           # Loader untuk login positive
│   ├── login-negative.test.js  # Loader untuk login negative
│   ├── filter.test.js          # Loader untuk fitur filter produk
│   ├── cart.test.js            # Loader untuk fitur cart
│   └── checkout.test.js        # Loader untuk fitur checkout
├── screenshot.png              # Screenshot hasil test (opsional)
├── package.json                # Info proyek & dependency
└── README.md                   # Dokumentasi proyek
```

---

## ⚙️ Cara Menjalankan

### 1. Clone repositori

```bash
git clone <url-repo-kamu>
cd saucedemo-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan test

```bash
npm test
```

> Untuk menjalankan test spesifik:

```bash
npx mocha test/login.test.js
npx mocha test/login-negative.test.js
npx mocha test/filter.test.js
npx mocha test/cart.test.js
npx mocha test/checkout.test.js
```

---

## ✅ Skenario yang Diuji

### Login Valid

* Login dengan user `standard_user` dan password `secret_sauce`
* Verifikasi bahwa user masuk ke halaman inventory

### Login Tidak Valid

* ❌ Username kosong → muncul error `Username is required`
* ❌ Password kosong → muncul error `Password is required`
* ❌ Username & password salah → muncul error `Username and password do not match`

### Product Filtering

* ✅ Filter produk berdasarkan nama (A-Z)
* ✅ Filter produk berdasarkan nama (Z-A)
* ✅ Filter produk berdasarkan harga (Low to High)
* ✅ Filter produk berdasarkan harga (High to Low)

### Cart / Add to Cart

* ✅ Menambah produk ke keranjang (Add to cart)
* ✅ Verifikasi cart badge muncul setelah produk ditambah
* ✅ Melihat isi cart & verifikasi produk sudah masuk
* ✅ Tidak menambah produk → badge tetap 0/tidak muncul, cart kosong
* ✅ Hapus produk dari cart → cart kembali kosong & badge menghilang/0

### Checkout

* ✅ Berhasil checkout satu produk (happy flow)
* ✅ Checkout dengan keranjang kosong tetap tampilkan form checkout (sesuai desain SauceDemo)
* ✅ Tidak mengisi form checkout → error "information is required"
* ✅ Form checkout: first name kosong → error "first name"
* ✅ Form checkout: last name kosong → error "last name"
* ✅ Form checkout: postal code kosong → error "postal code"

---

## 📸 Screenshot

Setelah test selesai, otomatis menyimpan screenshot (`screenshot.png`) dan delay beberapa detik sebelum browser ditutup (untuk observasi manual jika perlu).

---

## 📦 Requirements

* Node.js 18+
* Google Chrome
* `chromedriver` (otomatis terpasang via dependensi)

---

## 📚 Tools yang Digunakan

* **Mocha** – Framework testing JavaScript
* **Chai** – Library assertion
* **Selenium WebDriver** – Untuk kontrol browser otomatis
* **chromedriver** – Mengendalikan Chrome

