// assets/js/modules/data_service.js

const STORAGE_KEY = 'dataLahanTanaman';

// Data Awal (Mock Data) sesuai Tema NIM Genap: Data Lahan & Tanaman
const defaultData = [
  { id: 1, namaLahan: "Lahan Blok Argopuro", jenisTanaman: "Padi Organik", luas: 1500, status: "Siap Panen" },
  { id: 2, namaLahan: "Lahan Petak Kalibaru", jenisTanaman: "Kopi Robusta", luas: 2500, status: "Masa Tanam" },
  { id: 3, namaLahan: "Lahan Kebun Ijen", jenisTanaman: "Jagung Hibrida", luas: 1200, status: "Perawatan" },
  { id: 4, namaLahan: "Lahan Sawah Rogojampi", jenisTanaman: "Padi Organik", luas: 1800, status: "Masa Tanam" },
  { id: 5, namaLahan: "Lahan Perkebunan Jatirono", jenisTanaman: "Kakao / Cokelat", luas: 2000, status: "Perawatan" },
  { id: 6, namaLahan: "Lahan Buah Naga Pesanggaran", jenisTanaman: "Buah Naga Red", luas: 1600, status: "Siap Panen" },
  { id: 7, namaLahan: "Lahan Hortikultura Glagah", jenisTanaman: "Cabai Rawit", luas: 900, status: "Masa Tanam" }
];

// 1. Ambil Data dari LocalStorage atau Gunakan Data Default
export const getLahanData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultData;
};

// 2. Simpan Data Baru ke LocalStorage
export const saveLahanData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 3. HOF filter: Cari atau Saring Berdasarkan Tanaman / Status
export const filterLahanByKeyword = (keyword) => {
  const data = getLahanData();
  if (!keyword) return data;
  
  const query = keyword.toLowerCase();
  return data.filter((item) => 
    item.namaLahan.toLowerCase().includes(query) ||
    item.jenisTanaman.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  );
};

// 4. HOF reduce: Hitung Total Luas Seluruh Lahan (dalam m²)
export const calculateTotalLuas = (items) => {
  return items.reduce((acc, item) => acc + item.luas, 0);
};

// 5. Hapus Data Lahan Berdasarkan ID
export const deleteLahanById = (id) => {
  const currentData = getLahanData();
  const updatedData = currentData.filter((item) => Number(item.id) !== Number(id));
  saveLahanData(updatedData);
  return updatedData;
};