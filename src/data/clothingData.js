// Data baju dan gudang untuk Photoshot Wardrobe
// 5 Warna Utama: Hitam, Putih, Coklat, Merah, Navy
// Total: 15 item (5 Atasan, 5 Bawahan, 5 Dress)
// Lokasi: Terbagi ke 5 Rak Gudang

// 5 Warna Standar
export const WARNA_MASTER = [
  { nama: "Hitam",  hex: "#1A1A1A" },
  { nama: "Putih",  hex: "#F5F5F0" },
  { nama: "Coklat", hex: "#8A5A36" },
  { nama: "Merah",  hex: "#A92A2A" },
  { nama: "Navy",   hex: "#223A5E" },
];

// ===== KOLEKSI ATASAN (5 Warna) =====
export const atasanList = [
  { id: "AT-001", nama: "Blouse Structured Hitam",  kategori: "Atasan", warna: "Hitam",  hex: "#1A1A1A", rakId: "RAK-1", gambar: "https://images.unsplash.com/photo-1594938298603-c8148c4b8a97?w=600&q=80&fit=crop" },
  { id: "AT-002", nama: "Linen Shirt Putih",         kategori: "Atasan", warna: "Putih",  hex: "#F5F5F0", rakId: "RAK-1", gambar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop" },
  { id: "AT-003", nama: "Trench Top Coklat",         kategori: "Atasan", warna: "Coklat", hex: "#8A5A36", rakId: "RAK-2", gambar: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80&fit=crop" },
  { id: "AT-004", nama: "Silk Top Merah",            kategori: "Atasan", warna: "Merah",  hex: "#A92A2A", rakId: "RAK-2", gambar: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop" },
  { id: "AT-005", nama: "Tailored Knit Navy",        kategori: "Atasan", warna: "Navy",   hex: "#223A5E", rakId: "RAK-3", gambar: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80&fit=crop" },
];

// ===== KOLEKSI BAWAHAN (5 Warna) =====
export const bawahanList = [
  { id: "BW-001", nama: "Pleated Trousers Hitam",    kategori: "Bawahan", warna: "Hitam",  hex: "#1A1A1A", rakId: "RAK-3", gambar: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80&fit=crop" },
  { id: "BW-002", nama: "Wide-Leg Pants Putih",      kategori: "Bawahan", warna: "Putih",  hex: "#F5F5F0", rakId: "RAK-3", gambar: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop" },
  { id: "BW-003", nama: "A-Line Skirt Coklat",       kategori: "Bawahan", warna: "Coklat", hex: "#8A5A36", rakId: "RAK-4", gambar: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80&fit=crop" },
  { id: "BW-004", nama: "Tailored Shorts Merah",     kategori: "Bawahan", warna: "Merah",  hex: "#A92A2A", rakId: "RAK-4", gambar: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80&fit=crop" },
  { id: "BW-005", nama: "Straight Pants Navy",       kategori: "Bawahan", warna: "Navy",   hex: "#223A5E", rakId: "RAK-4", gambar: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80&fit=crop" },
];

// ===== KOLEKSI DRESS (5 Warna) =====
export const dressList = [
  { id: "DR-001", nama: "Slip Maxi Dress Hitam",     kategori: "Dress", warna: "Hitam",  hex: "#1A1A1A", rakId: "RAK-1", gambar: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80&fit=crop" },
  { id: "DR-002", nama: "Minimalist Shirt Dress Putih", kategori: "Dress", warna: "Putih", hex: "#F5F5F0", rakId: "RAK-2", gambar: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80&fit=crop" },
  { id: "DR-003", nama: "Belted Trench Dress Coklat", kategori: "Dress", warna: "Coklat", hex: "#8A5A36", rakId: "RAK-5", gambar: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&fit=crop" },
  { id: "DR-004", nama: "Cocktail Evening Dress Merah", kategori: "Dress", warna: "Merah", hex: "#A92A2A", rakId: "RAK-5", gambar: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80&fit=crop" },
  { id: "DR-005", nama: "Asymmetrical Dress Navy",   kategori: "Dress", warna: "Navy",   hex: "#223A5E", rakId: "RAK-5", gambar: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80&fit=crop" },
];

// Gabungan semua baju
export const semuaBaju = [...atasanList, ...bawahanList, ...dressList];

// ===== DATA RAK GUDANG =====
export const rakGudang = [
  { id: "RAK-1", nama: "Rak 1", deskripsi: "Rak Depan Kiri — Atasan & Dress Studio" },
  { id: "RAK-2", nama: "Rak 2", deskripsi: "Rak Depan Kanan — Koleksi Netral Studio" },
  { id: "RAK-3", nama: "Rak 3", deskripsi: "Rak Tengah — Monochrome Wardrobe" },
  { id: "RAK-4", nama: "Rak 4", deskripsi: "Rak Belakang Kiri — Bawahan & Celana" },
  { id: "RAK-5", nama: "Rak 5", deskripsi: "Rak Belakang Kanan — Gaun & Dress Pesta" },
];

// Helper: dapatkan baju berdasarkan rak
export function getBajuByRak(rakId) {
  return semuaBaju.filter((baju) => baju.rakId === rakId);
}

// Helper: dapatkan info rak dari ID
export function getRakById(rakId) {
  return rakGudang.find((rak) => rak.id === rakId);
}
