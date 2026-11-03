# UTS Frontend - Sistem Manajemen Data Lahan & Tanaman

## Deskripsi Project
**Sistem Manajemen Data Lahan & Tanaman** adalah aplikasi berbasis *Single Page Application* (SPA) yang dirancang untuk mengelola inventaris lahan pertanian secara digital. Aplikasi ini dibangun secara murni menggunakan teknologi standar web modern tanpa framework eksternal:
* **Vanilla JavaScript (ES6+)** dengan arsitektur **ES Modules (`type="module"`)**.
* **HTML5 Semantik** untuk struktur dokumen yang aksesibel.
* **Modern CSS** dengan pendekatan *Responsive Mobile-First Design* (mengusung tema *Earthy Dark Moka/Espresso*).
* **LocalStorage API** untuk penyimpanan data persisten secara lokal.

## Struktur Arsitektur Modular (ES Modules)
Kode sumber JavaScript dipisahkan ke dalam modul-modul tersendiri untuk menerapkan prinsip *Separation of Concerns*:
```text
UTS_Frontend_1125102206/
├── index.html                    --> Entry point utama (HTML5 Semantik & type="module")
├── assets/
│   ├── css/
│   │   └── style.css             --> Styling utama (Responsive Mobile-First & Dark Theme)
│   ├── images/
│   │   └── logo-stikom.png       --> Aset logo institusi
│   └── js/
│       ├── main.js               --> Main Controller / Orchestrator (Event Listeners)
│       └── modules/
│           ├── data_service.js   --> LocalStorage Operations, CRUD, & HOF .filter()
│           ├── ui_renderer.js   --> Dynamic DOM Rendering & HOF .map() & .reduce()
│           └── form_validator.js--> Client-Side Form Validation Logic
└── README.md                     --> Dokumentasi Repositori
