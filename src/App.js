import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeHero from "./components/HomeHero";
import BrandLogo from "./components/BrandLogo";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import WarehouseView from "./components/WarehouseView";
import ClothingDetail from "./components/ClothingDetail";
import CartModal from "./components/CartModal";
import CheckoutNotaModal from "./components/CheckoutNotaModal";
import MasterReceiptModal from "./components/MasterReceiptModal";
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

  // State Keranjang Belanja & Checkout Nota
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("kisera_wardrobe_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutNota, setCheckoutNota] = useState(null);
  const [isMasterReceiptOpen, setIsMasterReceiptOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Persist keranjang ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kisera_wardrobe_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const handleAddToCart = (baju, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === baju.id);
      if (existing) {
        return prev.map((item) =>
          item.id === baju.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...baju, qty }];
    });
    showToast(`✓ "${baju.nama}" ditambahkan ke keranjang`);
  };

  const handleUpdateCartQty = (bajuId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(bajuId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === bajuId ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveFromCart = (bajuId) => {
    setCart((prev) => prev.filter((item) => item.id !== bajuId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const now = new Date();
    const notaData = {
      id: `KW-CO-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Date.now()).slice(-4)}`,
      tanggal: now.toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
      }),
      items: [...cart],
      totalPcs: cart.reduce((sum, item) => sum + item.qty, 0),
    };
    setCheckoutNota(notaData);
    setIsCartOpen(false);
  };

  // Checkout langsung 1 baju dari modal detail
  const handleDirectCheckout = (baju, qty = 1) => {
    const now = new Date();
    const notaData = {
      id: `KW-CO-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Date.now()).slice(-4)}`,
      tanggal: now.toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
      }),
      items: [{ ...baju, qty }],
      totalPcs: qty,
    };
    setCheckoutNota(notaData);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Animasi fade-slide untuk transisi antar halaman
  const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: "spring", stiffness: 200, damping: 28, mass: 0.8 },
  };

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
                    {currentPage === "katalog" && (
                      <motion.span
                        className="ck-nav-underline"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    className={`ck-nav-link ${currentPage === "gudang" ? "active" : ""}`}
                    onClick={() => setCurrentPage("gudang")}
                  >
                    GUDANG (5 RAK)
                    {currentPage === "gudang" && (
                      <motion.span
                        className="ck-nav-underline"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </nav>
              </>
            ) : null}
          </div>

          {/* Tengah: Logo bulat Kisera Wardrobe + wordmark */}
          <div className="ck-header-center">
            <h1 className="ck-logo-heading">
              <button
                className="ck-logo-btn"
                onClick={() => setCurrentPage("home")}
                title="Kembali ke Beranda"
              >
                <BrandLogo size={52} className="ck-header-logo" />
                <span className="ck-logo-wordmark">
                  <span className="ck-main-logo">KISERA</span>
                  <span className="ck-logo-sub">WARDROBE &bull; STUDIO PHOTOSHOT</span>
                </span>
              </button>
            </h1>
          </div>

          {/* Sisi Kanan: Wishlist, Cetak Receipt (15), Checkout (CO), Profile, Language */}
          <div className="ck-header-right">
            <button className="ck-icon-btn" title="Wishlist">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>

            {/* 1. CETAK RECEIPT (Ikon tas dengan badge 15 — Khusus Cetak Receipt Inventaris Gudang) */}
            <button
              className="ck-header-receipt-btn"
              onClick={() => setIsMasterReceiptOpen(true)}
              title="Cetak Receipt Koleksi Studio & Panduan Rak (15 Baju)"
            >
              <div className="ck-receipt-icon-wrap">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="ck-receipt-badge" title="15 Baju Studio">{semuaBaju.length}</span>
              </div>
              <span className="ck-receipt-text">CETAK RECEIPT</span>
            </button>

            {/* 2. CHECKOUT (CO) — DIBEDAKAN SECARA KHUSUS DENGAN STATUS KERANJANG */}
            <button
              className={`ck-co-nav-btn ${totalCartCount > 0 ? "has-items" : ""}`}
              onClick={() => setIsCartOpen(true)}
              title={`Keranjang & Checkout (CO) - ${totalCartCount} item`}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="ck-co-label">CO ({totalCartCount})</span>
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
        <AnimatePresence mode="wait">
        {/* HALAMAN 1: TAMPILAN AWAL (LANDING HERO SEPERTI C&K - POLOSAN) */}
        {currentPage === "home" && (
          <motion.div
            key="page-home"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
            <HomeHero onExploreClick={() => setCurrentPage("katalog")} />
          </motion.div>
        )}

        {/* HALAMAN 2: PILIH-PILIH PRODUK (KATALOG DENGAN SIDEBAR FILTER C&K) */}
        {currentPage === "katalog" && (
          <motion.div
            key="page-katalog"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
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
          </motion.div>
        )}

        {/* HALAMAN 3: SISTEM GUDANG (5 RAK) */}
        {currentPage === "gudang" && (
          <motion.div
            key="page-gudang"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
          <div className="warehouse-page">
            <div className="breadcrumb">
              <span onClick={() => setCurrentPage("home")} style={{ cursor: "pointer" }}>Home</span>
              <span className="breadcrumb-sep">&rsaquo;</span>
              <span className="breadcrumb-active">Sistem Gudang (5 Rak)</span>
            </div>
            <WarehouseView onItemClick={setSelectedBaju} />
          </div>
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* Modal Detail Baju */}
      {selectedBaju && (
        <ClothingDetail
          baju={selectedBaju}
          onClose={() => setSelectedBaju(null)}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onDirectCheckout={handleDirectCheckout}
        />
      )}

      {/* Modal Cetak Master Receipt (15 Baju Studio) */}
      <MasterReceiptModal
        isOpen={isMasterReceiptOpen}
        onClose={() => setIsMasterReceiptOpen(false)}
      />

      {/* Drawer Keranjang Belanja */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Modal Nota Pengambilan Baju per Rak Gudang */}
      {checkoutNota && (
        <CheckoutNotaModal
          nota={checkoutNota}
          onClose={() => setCheckoutNota(null)}
          onClearCart={handleClearCart}
        />
      )}

      {/* Notifikasi Toast Masuk Keranjang */}
      {toastMsg && (
        <div className="ck-toast-notification">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Footer Wardrobe Kisera */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <BrandLogo size={64} className="footer-logo-badge" />
            <div className="footer-brand-text">
              <p className="footer-logo">KISERA WARDROBE</p>
              <p className="footer-tagline">Photoshot Wardrobe &bull; Studio Management System</p>
            </div>
          </div>
          <div className="footer-links">
            <p>15 Koleksi Pakaian (5 Atasan, 5 Bawahan, 5 Dress)</p>
            <p>5 Warna: Hitam &bull; Putih &bull; Coklat &bull; Merah &bull; Navy</p>
            <p>5 Rak Gudang Penyimpanan Studio</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 KISERA WARDROBE &bull; Studio Photoshot Wardrobe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
