// assets/js/main.js

// 1. Mengimpor semua fungsi dari modul-modul yang sudah dibuat
import {
  getLahanData,
  saveLahanData,
  filterLahanByKeyword,
  deleteLahanById,
} from "./modules/data_service.js";
import { renderLahanTable } from "./modules/ui_renderer.js";
import { validateLahanForm } from "./modules/form_validator.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("=== Aplikasi Sistem Manajemen Lahan & Tanaman Aktif ===");

  // 2. Render Tampilan Awal Tabel & Stat Card
  renderLahanTable();

  // 3. Tangani Form Tambah Data Lahan Baru
  const formLahan = document.querySelector("#form-lahan");
  const alertBox = document.querySelector("#form-alert");

  if (formLahan) {
    formLahan.addEventListener("submit", (e) => {
      e.preventDefault(); // Mencegah reload halaman saat submit

      // Ambil nilai dari inputan form
      const namaLahan = document.querySelector("#namaLahan").value;
      const jenisTanaman = document.querySelector("#jenisTanaman").value;
      const luas = document.querySelector("#luasLahan").value;
      const status = document.querySelector("#statusPanen").value;

      // Jalankan validasi input dari modul form_validator.js
      const validation = validateLahanForm(
        namaLahan,
        jenisTanaman,
        luas,
        status
      );

      if (!validation.isValid) {
        // Tampilkan pesan error jika validasi gagal
        if (alertBox) {
          alertBox.style.display = "block";
          alertBox.style.color = "#f87171"; // Warna merah error
          alertBox.textContent = validation.message;
        }
        return;
      }

      // Jika validasi sukses, buat objek data baru
      const currentData = getLahanData();

      // Hitung ID baru secara otomatis berurutan (Auto-Increment)
      const lastId = currentData.length > 0 ? Math.max(...currentData.map(item => Number(item.id))) : 0;
      const newId = lastId + 1;

      const newData = {
        id: newId, // Generate ID unik menggunakan timestamp
        namaLahan: namaLahan.trim(),
        jenisTanaman: jenisTanaman.trim(),
        luas: Number(luas),
        status: status,
      };

      // Simpan data baru ke array & LocalStorage
      currentData.push(newData);
      saveLahanData(currentData);

      // Render ulang tabel agar data baru langsung muncul di UI
      renderLahanTable();

      // Reset isi form dan tampilkan pesan sukses
      formLahan.reset();
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.style.color = "#34d399"; // Warna hijau sukses
        alertBox.textContent = "Data lahan berhasil ditambahkan!";
        setTimeout(() => {
          alertBox.style.display = "none";
        }, 3000);
      }
    });
  }

  // 4. Tangani Pencarian / Filtering Interaktif (Search Box)
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value;
      // Gunakan HOF filter dari data_service.js
      const filteredData = filterLahanByKeyword(keyword);
      // Render tabel hanya dengan data hasil filter
      renderLahanTable(filteredData);
    });
  }
  
  // 5. Tangani Event Hapus Data (Event Delegation di Tabel)
  const tableBody = document.querySelector("#lahan-table-body");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      // Cek apakah elemen yang diklik memiliki class 'btn-delete'
      if (e.target.classList.contains("btn-delete")) {
        const idToDelete = e.target.getAttribute("data-id");

        // Konfirmasi sederhana bawaan browser
        if (confirm(`Apakah Anda yakin ingin menghapus data lahan ID #${idToDelete}?`)) {
          deleteLahanById(idToDelete);
          renderLahanTable(); // Render ulang tabel & total luas otomatis terupdate
        }
      }
    });
  }
});