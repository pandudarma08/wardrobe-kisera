import React from "react";
import { getRakById } from "../data/clothingData";

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h3 className="cart-drawer-title">KERANJANG PHOTOSHOT</h3>
            <span className="cart-count-pill">{totalItems} item</span>
          </div>
          <button className="cart-drawer-close" onClick={onClose} title="Tutup Keranjang">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="cart-empty-icon">🛍️</span>
              <p className="cart-empty-title">Keranjang Anda Masih Kosong</p>
              <p className="cart-empty-desc">
                Pilih baju dari katalog dan klik <strong>"MASUKKAN KE KERANJANG"</strong> untuk mulai membuat daftar pengambilan baju studio.
              </p>
              <button className="cart-empty-btn" onClick={onClose}>
                JELAJAHI KOLEKSI BAJU
              </button>
            </div>
          ) : (
            <div className="cart-item-list">
              <div className="cart-info-banner">
                <span>💡 Setiap barang dilengkapi <strong>catatan nomor rak</strong> untuk memudahkan pengambilan di gudang.</span>
              </div>

              {cart.map((item) => {
                const rak = getRakById(item.rakId);
                return (
                  <div key={item.id} className="cart-item-card">
                    {/* Thumbnail */}
                    <div className="cart-item-thumb" style={{ backgroundColor: item.hex }}>
                      {item.gambar ? (
                        <img src={item.gambar} alt={item.nama} />
                      ) : (
                        <span className="cart-item-emoji">
                          {item.kategori === "Atasan" ? "👕" : item.kategori === "Bawahan" ? "👖" : "👗"}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <span className="cart-item-cat">{item.kategori} &bull; {item.id}</span>
                        <button
                          className="cart-item-del"
                          onClick={() => onRemoveItem(item.id)}
                          title="Hapus dari keranjang"
                        >
                          &times;
                        </button>
                      </div>

                      <h4 className="cart-item-name">{item.nama}</h4>

                      <div className="cart-item-meta">
                        <span className="cart-meta-color">
                          <span className="cart-color-dot" style={{ backgroundColor: item.hex }} />
                          {item.warna}
                        </span>
                      </div>

                      {/* NOTA NOMOR RAK GUDANG */}
                      <div className="cart-item-rak-badge">
                        <span className="cart-rak-icon">📦</span>
                        <span className="cart-rak-text">
                          <strong>{rak ? rak.nama : item.rakId}</strong> &bull; {rak ? rak.deskripsi : "Lokasi Rak"}
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="cart-qty-row">
                        <span className="cart-qty-label">Jumlah:</span>
                        <div className="cart-qty-ctrl">
                          <button
                            className="cart-qty-btn"
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                          >
                            &minus;
                          </button>
                          <span className="cart-qty-num">{item.qty}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          >
                            &#43;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Area */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="cart-sum-label">Total Barang Photoshot</span>
              <span className="cart-sum-val">{totalItems} pcs</span>
            </div>
            <div className="cart-rak-summary-note">
              <span>Nota pengambilan per nomor rak akan otomatis dicetak saat Checkout.</span>
            </div>

            <button className="cart-checkout-btn" onClick={onCheckout}>
              <span>CHECKOUT (CO) &amp; BUAT NOTA RAK</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
