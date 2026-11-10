---
name: photoshot-wardrobe
description: >-
  Skill untuk mengelola project Photoshot Wardrobe — website React untuk
  manajemen baju photoshot dan sistem gudang. Gunakan skill ini ketika user
  ingin menambah/mengubah data baju, mengatur ulang rak gudang, menambah
  fitur baru, atau memperbaiki tampilan website ini.
---

# Photoshot Wardrobe

Website React untuk manajemen koleksi baju photoshot dengan sistem gudang 5 rak.

## Struktur Project

```
photoshot-wardrobe/
├── public/
│   ├── images/                     ← Folder untuk file foto/gambar baju
│   └── index.html
├── src/
│   ├── data/clothingData.js        ← Sumber data baju & rak
│   ├── components/
│   │   ├── ClothingCard.js         ← Kartu baju individual
│   │   ├── ClothingCatalog.js      ← Grid katalog per kategori
│   │   ├── ClothingDetail.js       ← Modal detail baju
│   │   └── WarehouseView.js        ← Visualisasi gudang
│   ├── App.js                      ← Root component, routing tab
│   ├── App.css                     ← Semua styling
│   └── index.js                    ← Entry point
└── package.json
```

## Data Model

Semua data ada di `src/data/clothingData.js`.

### Format Baju

```js
{
  id: "AT-001",
  nama: "Atasan Merah",
  kategori: "Atasan",
  warna: "Merah",
  hex: "#E74C3C",
  rakId: "RAK-1",
  gambar: "/images/atasan-merah.jpg" // opsional: kosongkan "" jika ingin pakai preview warna bawaan
}
```

- **id**: Kode unik — `AT-xxx` (Atasan), `BW-xxx` (Bawahan), `DR-xxx` (Dress)
- **kategori**: `"Atasan"`, `"Bawahan"`, atau `"Dress"`
- **rakId**: Merujuk ke rak mana baju disimpan (`RAK-1` s/d `RAK-5`)
- **gambar**: Path ke file gambar di dalam folder `public/images/`

## Cara Menambah / Mengganti Gambar Baju

1. Simpan foto baju ke folder `public/images/` (misal: `public/images/atasan-merah.jpg`)
2. Buka `src/data/clothingData.js`
3. Pada baju yang bersangkutan, isi properti `gambar`:
   ```js
   gambar: "/images/atasan-merah.jpg"
   ```
4. Jika file gambar belum ada atau salah nama, sistem otomatis menampilkan kotak warna dan emoji sebagai fallback tanpa error.

### Format Rak

```js
{ id: "RAK-1", nama: "Rak 1", deskripsi: "Rak depan kiri" }
```

## Cara Menambah Baju Baru

1. Buka `src/data/clothingData.js`
2. Tambahkan objek baru ke array yang sesuai (`atasanList`, `bawahanList`, atau `dressList`)
3. Pastikan `id` unik dan `rakId` valid (RAK-1 s/d RAK-5)

## Cara Menambah Rak Baru

1. Tambahkan objek rak baru ke array `rakGudang` di `clothingData.js`
2. Gunakan format id `RAK-N`

## Menjalankan Project

```bash
cd photoshot-wardrobe
npm install
npm start
```

Buka `http://localhost:3000`.


