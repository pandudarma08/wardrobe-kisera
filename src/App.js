import React, { useState } from "react";
import HomeHero from "./components/HomeHero";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import WarehouseView from "./components/WarehouseView";
import ClothingDetail from "./components/ClothingDetail";
import { semuaBaju, WARNA_MASTER } from "./data/clothingData";
import "./App.css";

function App() {
  // State halaman: "home" (tampilan awal C&K), "katalog" (pilih-pilih produk & filter), atau "gudang"
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBaju, setSelectedBaju] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWarna, setSelectedWarna] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchOpen, setSearchOpen] = useState(false);

  // 5 Warna Master
  const allWarnas = WARNA_MASTER.map((w) => w.nama);
  const allKategoris = ["Atasan", "Bawahan", "Dress"];

  // Hitung jumlah per warna (5 warna)
  const warnaCount = {};
  semuaBaju.forEach((b) => {
    warnaCount[b.warna] = (warnaCount[b.warna] || 0) + 1;
  });

  // Hitung jumlah per kategori
  const kategoriCount = {};
  semuaBaju.forEach((b) => {
    kategoriCount[b.kategori] = (kategoriCount[b.kategori] || 0) + 1;
  });

  const toggleWarna = (warna) => {
    setSelectedWarna((prev) =>
      prev.includes(warna) ? prev.filter((w) => w !== warna) : [...prev, warna]
    );
  };

  const toggleKategori = (kat) => {
    setSelectedKategori((prev) =>
      prev.includes(kat) ? prev.filter((k) => k !== kat) : [...prev, kat]
    );
  };

  // Filter & sort
  let filteredItems = semuaBaju.filter((baju) => {
    const matchSearch =
      !searchQuery ||
      baju.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      baju.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      baju.warna.toLowerCase().includes(searchQuery.toLowerCase());
    const matchWarna = selectedWarna.length === 0 || selectedWarna.includes(baju.warna);
    const matchKategori =
      selectedKategori.length === 0 || selectedKategori.includes(baju.kategori);
    return matchSearch && matchWarna && matchKategori;
  });

  if (sortBy === "nama-az") filteredItems = [...filteredItems].sort((a, b) => a.nama.localeCompare(b.nama));
  if (sortBy === "nama-za") filteredItems = [...filteredItems].sort((a, b) => b.nama.localeCompare(a.nama));
  if (sortBy === "kode") filteredItems = [...filteredItems].sort((a, b) => a.id.localeCompare(b.id));

  const totalActiveFilters = selectedWarna.length + selectedKategori.length;

  return (
    <div className="app">
      {/* Top announcement bar */}
      <div className="announcement-bar">
        COMPLIMENTARY SHIPPING &bull; PHOTOSHOT WARDROBE STUDIO COLLECTION &bull; 5 RAK GUDANG
      </div>

      {/* Main Header persis seperti Charles & Keith */}
      <header className="ck-header">
        <div className="ck-header-inner">
          {/* Sisi Kiri: Polosan saat pertama kali dibuka (Home). Pilihan hanya muncul saat masuk ke Katalog/Gudang */}
          <div className="ck-header-left">
            {currentPage !== "home" ? (
              <>
                <button
                  className="ck-icon-btn ck-search-trigger"
                  onClick={() => setSearchOpen(!searchOpen)}
                  title="Search"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="11" cy="11" r="7.5" />
                    <line x1="21" y1="21" x2="16.5" y2="16.5" />
                  </svg>
                </button>
                <nav className="ck-top-nav">
                  <button
                    className="ck-nav-link"
                    onClick={() => setCurrentPage("home")}
                  >
                    HOME
                  </button>
                  <button
                    className={`ck-nav-link ${currentPage === "katalog" ? "active" : ""}`}
                    onClick={() => setCurrentPage("katalog")}
                  >
                    SHOP
                  </button>
                  <button
                    className={`ck-nav-link ${currentPage === "gudang" ? "active" : ""}`}
                    onClick={() => setCurrentPage("gudang")}
                  >
                    GUDANG (5 RAK)
                  </button>
                </nav>
              </>
            ) : null}
          </div>

          {/* Tengah: Logo Wardrobe Kisera */}
          <div className="ck-header-center">
            <h1
              className="ck-main-logo"
              onClick={() => setCurrentPage("home")}
              title="Kembali ke Beranda"
            >
              WARDROBE KISERA
            </h1>
            <span className="ck-logo-sub">STUDIO PHOTOSHOT</span>
          </div>

          {/* Sisi Kanan: Wishlist, Bag, Profile, Language */}
          <div className="ck-header-right">
            <button className="ck-icon-btn" title="Wishlist">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>

            <button
              className="ck-icon-btn ck-bag-btn"
              onClick={() => setCurrentPage("katalog")}
              title="Koleksi Baju"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="ck-bag-count">{semuaBaju.length}</span>
            </button>

            <button className="ck-icon-btn" title="Akun">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <div className="ck-lang-selector">
              <span className="ck-lang-badge">ID</span>
              <span className="ck-lang-text">Indonesia</span>
              <span className="ck-lang-caret">&#x25BE;</span>
            </div>
          </div>
        </div>

        {/* Search bar dropdown jika tombol search diklik */}
        {searchOpen && (
          <div className="ck-search-bar-open">
            <div className="ck-search-bar-container">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7.5" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              <input
                type="text"
                placeholder="CARI NAMA BAJU, KODE (AT-001, BW-001, DR-001), WARNA, ATAU RAK..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== "katalog") setCurrentPage("katalog");
                }}
                className="ck-search-input-field"
                autoFocus
              />
              {searchQuery && (
                <button className="ck-clear-search" onClick={() => setSearchQuery("")}>
                  &times;
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Konten Utama Berdasarkan Halaman */}
      <main className="ck-main-content">
        {/* HALAMAN 1: TAMPILAN AWAL (LANDING HERO SEPERTI C&K - POLOSAN) */}
        {currentPage === "home" && (
          <HomeHero onExploreClick={() => setCurrentPage("katalog")} />
        )}

        {/* HALAMAN 2: PILIH-PILIH PRODUK (KATALOG DENGAN SIDEBAR FILTER C&K) */}
        {currentPage === "katalog" && (
          <div className="catalog-layout">
            <div className="breadcrumb">
              <span onClick={() => setCurrentPage("home")} style={{ cursor: "pointer" }}>Home</span>
              <span className="breadcrumb-sep">&rsaquo;</span>
              <span className="breadcrumb-active">Koleksi Baju</span>
              {totalActiveFilters > 0 && (
                <button
                  className="clear-all-btn"
                  onClick={() => { setSelectedWarna([]); setSelectedKategori([]); }}
                >
                  Hapus semua filter ({totalActiveFilters})
                </button>
              )}
            </div>

            <div className="catalog-body">
              <aside className="sidebar">
                <FilterSidebar
                  allWarnas={allWarnas}
                  warnaCount={warnaCount}
                  selectedWarna={selectedWarna}
                  toggleWarna={toggleWarna}
                  allKategoris={allKategoris}
                  kategoriCount={kategoriCount}
                  selectedKategori={selectedKategori}
                  toggleKategori={toggleKategori}
                  semuaBaju={semuaBaju}
                />
              </aside>

              <div className="product-area">
                <div className="product-toolbar">
                  <p className="product-count">
                    {filteredItems.length} item ditemukan
                    {totalActiveFilters > 0 && (
                      <span className="filter-tags">
                        {selectedKategori.map((k) => (
                          <span key={k} className="filter-tag" onClick={() => toggleKategori(k)}>
                            {k} &times;
                          </span>
                        ))}
                        {selectedWarna.map((w) => (
                          <span key={w} className="filter-tag" onClick={() => toggleWarna(w)}>
                            {w} &times;
                          </span>
                        ))}
                      </span>
                    )}
                  </p>
                  <div className="sort-wrap">
                    <label className="sort-label">Sort by</label>
                    <select
                      className="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="nama-az">Nama A&ndash;Z</option>
                      <option value="nama-za">Nama Z&ndash;A</option>
                      <option value="kode">Kode Baju</option>
                    </select>
                  </div>
                </div>

                <ProductGrid items={filteredItems} onItemClick={setSelectedBaju} />
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: SISTEM GUDANG (5 RAK) */}
        {currentPage === "gudang" && (
          <div className="warehouse-page">
            <div className="breadcrumb">
              <span onClick={() => setCurrentPage("home")} style={{ cursor: "pointer" }}>Home</span>
              <span className="breadcrumb-sep">&rsaquo;</span>
              <span className="breadcrumb-active">Sistem Gudang (5 Rak)</span>
            </div>
            <WarehouseView onItemClick={setSelectedBaju} />
          </div>
        )}
      </main>

      {/* Modal Detail Baju */}
      {selectedBaju && (
        <ClothingDetail baju={selectedBaju} onClose={() => setSelectedBaju(null)} />
      )}

      {/* Footer Wardrobe Kisera */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-logo">WARDROBE KISERA</p>
            <p className="footer-tagline">Photoshot Wardrobe &bull; Studio Management System</p>
          </div>
          <div className="footer-links">
            <p>15 Koleksi Pakaian (5 Atasan, 5 Bawahan, 5 Dress)</p>
            <p>5 Warna: Hitam &bull; Putih &bull; Coklat &bull; Merah &bull; Navy</p>
            <p>5 Rak Gudang Penyimpanan Studio</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 WARDROBE KISERA &bull; Studio Photoshot Wardrobe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
