// assets/js/modules/form_validator.js

// Fungsi untuk mevalidasi kelengkapan form data lahan & tanaman
export const validateLahanForm = (namaLahan, jenisTanaman, luas, status) => {
  // 1. Cek apakah ada field yang belum diisi (kosong)
  if (!namaLahan.trim() || !jenisTanaman.trim() || !luas || !status) {
    return {
      isValid: false,
      message: "Harap isi semua kolom form dengan lengkap!",
    };
  }

  // 2. Cek apakah luas lahan berupa angka yang valid dan lebih dari 0
  const luasNumber = Number(luas);
  if (isNaN(luasNumber) || luasNumber <= 0) {
    return {
      isValid: false,
      message: "Luas lahan harus berupa angka positif yang valid!",
    };
  }

  // Jika semua pengecekan lolos
  return {
    isValid: true,
    message: "Validasi berhasil!",
  };
};