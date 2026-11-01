import { getLahanData } from "./data_service.js";

export const renderLahanTable = (dataToRender = null) => {
  const tableBody = document.querySelector("#lahan-table-body");
  const totalDisplay = document.querySelector("#total-luas-display");

  const data = dataToRender || getLahanData();

  if (!tableBody) return;

  // 1. Render Baris Tabel
  if (data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #a39e93;">Belum ada data lahan.</td>
      </tr>
    `;
  } else {
    tableBody.innerHTML = data
      .map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.namaLahan}</strong></td>
        <td><span class="badge">${item.jenisTanaman}</span></td>
        <td>${Number(item.luas).toLocaleString("id-ID")} m²</td>
        <td><span class="status-tag">${item.status}</span></td>
        <td>
          <button class="btn-delete" data-id="${item.id}">Hapus</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  // 2. Hitung Total Luas Menggunakan HOF reduce
  const totalLuas = data.reduce((acc, curr) => acc + Number(curr.luas), 0);

  if (totalDisplay) {
    totalDisplay.textContent = `${totalLuas.toLocaleString("id-ID")} m²`;
  }
};