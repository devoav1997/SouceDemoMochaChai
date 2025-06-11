# 🧪 SauceDemo Mocha Test

## 🚀 Mocha + Chai + Selenium WebDriver Automation for SauceDemo

Proyek ini merupakan implementasi **automation testing** menggunakan **Mocha** sebagai test runner, **Chai** untuk assertion, dan **Selenium WebDriver** untuk interaksi dengan browser, dalam konteks pengujian situs [https://www.saucedemo.com](https://www.saucedemo.com).

Fokus pengujian:

- ✅ Login dengan kredensial valid
- ❌ Login dengan username/password tidak valid
- ❌ Login tanpa mengisi username atau password

---

## 🗂️ Struktur Folder

\`\`\`
saucedemo-test/
├── pages/
│   └── login.page.js           # Page Object untuk halaman login
├── support/
│   └── webdriver.js            # Konfigurasi Selenium WebDriver
├── tests/
│   ├── login.test.js           # Test untuk valid login
│   └── login-negative.test.js  # Test untuk skenario gagal login
├── screenshot.png              # Screenshot hasil test (opsional)
├── package.json                # Info proyek & dependency
└── README.md                   # Dokumentasi proyek
\`\`\`

---

## ⚙️ Cara Menjalankan

### 1. Clone repositori

\`\`\`bash
git clone <url-repo-kamu>
cd saucedemo-test
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Jalankan test

\`\`\`bash
npm test
\`\`\`

> Untuk menjalankan test spesifik:
\`\`\`bash
npx mocha tests/login.test.js
npx mocha tests/login-negative.test.js
\`\`\`

---

## ✅ Skenario yang Diuji

### Login Valid

- Login dengan user \`standard_user\` dan password \`secret_sauce\`
- Verifikasi bahwa user masuk ke halaman inventory

### Login Tidak Valid

- ❌ Username kosong → muncul error \`Username is required\`
- ❌ Password kosong → muncul error \`Password is required\`
- ❌ Username & password salah → muncul error \`Username and password do not match\`

---

## 📸 Screenshot

Setelah test selesai, otomatis menyimpan screenshot (\`screenshot.png\`) dan delay 5 detik sebelum browser ditutup (untuk observasi manual jika perlu).

---

## 📦 Requirements

- Node.js 18+
- Google Chrome
- \`chromedriver\` (otomatis terpasang via dependensi)

---

## 📚 Tools yang Digunakan

- **Mocha** – Framework testing JavaScript
- **Chai** – Library assertion
- **Selenium WebDriver** – Untuk kontrol browser otomatis
- **chromedriver** – Pengendali Chrome
