# 👗 Wardrobe Kisera — Studio Photoshot & Warehouse System

Website katalog pakaian dan manajemen gudang photoshot berbasis **React.js**. Menampilkan sistem rak penyimpanan studio dan katalog pakaian dengan filter kategori dan warna.

---

## 🚀 Cara Menjalankan Project di Laptop

1. **Pastikan sudah terinstall Node.js** di laptop Anda. (Jika belum, unduh di [nodejs.org](https://nodejs.org/)).
2. Buka terminal / command prompt, lalu masuk ke folder project ini:
   ```bash
   cd photoshot-wardrobe
   ```
3. Install semua dependencies yang dibutuhkan:
   ```bash
   npm install
   ```
4. Jalankan server lokal:
   ```bash
   npm start
   ```
5. Buka browser dan akses alamat:
   👉 **http://localhost:3000**

---

## 🖼️ Panduan Mengganti & Menambahkan Gambar Baju

Semua data pakaian berada di dalam satu file:
📂 **`src/data/clothingData.js`**

### Format Data Baju:
```javascript
{
  id: "AT-001",
  nama: "Blouse Structured Hitam",
  kategori: "Atasan",       // Pilihan: "Atasan", "Bawahan", atau "Dress"
  warna: "Hitam",           // Pilihan: "Hitam", "Putih", "Coklat", "Merah", "Navy"
  hex: "#1A1A1A",           // Kode warna hex untuk preview dot & box
  rakId: "RAK-1",           // Lokasi rak: "RAK-1" sampai "RAK-5"
  gambar: "/images/nama-foto.jpg" // Lokasi foto
}
```

---

### Cara 1: Menggunakan Foto Sendiri (File Lokal / Offline) — ⭐ Direkomendasikan

Jika Anda punya file foto sendiri di laptop (format `.jpg`, `.png`, atau `.webp`):

1. **Simpan file foto** Anda ke dalam folder:
   📁 **`public/images/`**
   *(Contoh: Anda menyimpan file bernama `atasan-hitam.jpg` di dalam folder `public/images/`)*

2. Buka file **`src/data/clothingData.js`**.

3. Cari ID baju yang ingin diganti gambarnya (misal: `AT-001`), lalu ubah bagian `gambar`:
   ```javascript
   // Sebelum:
   gambar: "https://images.unsplash.com/..."

   // Sesudah (cukup tulis dari /images/...):
   gambar: "/images/atasan-hitam.jpg"
   ```

4. Simpan file (`Ctrl + S` di Windows atau `Cmd + S` di Mac). Tampilan di browser akan otomatis terupdate!

---

### Cara 2: Menggunakan Link Foto dari Internet (Online URL)

Jika Anda ingin mengambil gambar langsung dari internet:

1. Salin link gambar langsung (pastikan berakhiran `.jpg`, `.png`, atau URL gambar langsung dari web seperti Unsplash).
2. Buka **`src/data/clothingData.js`**.
3. Tempelkan link tersebut ke dalam properti `gambar`:
   ```javascript
   gambar: "https://images.unsplash.com/photo-1594938298603-c8148c4b8a97?w=600&q=80"
   ```

---

### Cara 3: Mode Preview Warna (Tanpa Foto)

Jika gambar dikosongkan (`""`):
```javascript
gambar: ""
```
Sistem secara otomatis akan menampilkan kotak warna solid sesuai kode `hex` dengan ikon emoji (👕 / 👖 / 👗). Fitur ini berguna jika foto baju asli belum tersedia.

---

## 🎨 Panduan Mengganti Gambar Background Landing Page (Hero)

Latar belakang halaman utama (hero section) menggunakan foto yang tersimpan di:
📁 **`src/assets/images/kisera-hero-bg.jpg`**

Untuk menggantinya:
1. Siapkan foto baru yang ingin dijadikan background.
2. Ganti nama fotonya menjadi **`kisera-hero-bg.jpg`**.
3. Timpa (replace) file tersebut di folder **`src/assets/images/kisera-hero-bg.jpg`**.
4. Selesai! Halaman utama akan otomatis berganti background.

---

## 📁 Struktur Folder Penting

```
photoshot-wardrobe/
├── public/
│   ├── images/               ← Tempat menyimpan file foto baju lokal
│   └── index.html            ← Judul web & font
├── src/
│   ├── assets/
│   │   └── images/           ← Foto background hero section
│   ├── components/           ← Komponen tampilan (Katalog, Detail, Gudang, Hero)
│   ├── data/
│   │   └── clothingData.js   ← ⭐ TEMPAT EDIT DATA BAJU, WARNA, RAK & FOTO
│   ├── App.css               ← Semua styling tampilan & efek transparan
│   └── App.js                ← Logika navigasi & halaman
└── package.json
```

---

## 💡 Troubleshooting / Masalah Umum

* **Gambar tidak muncul (hanya warna abu/icon emoji)?**
  - Pastikan nama file dan ekstensi (`.jpg`, `.jpeg`, `.png`) sama persis (huruf besar/kecil berpengaruh).
  - Pastikan path selalu diawali garis miring: `"/images/nama-file.jpg"`, bukan `"images/nama-file.jpg"`.
* **Error setelah edit `clothingData.js`?**
  - Pastikan tidak ada tanda koma (`,`) atau tanda kutip (`"`) yang terhapus secara tidak sengaja saat mengedit.

