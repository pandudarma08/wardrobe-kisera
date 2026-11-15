import React, { useState } from "react";
import { getRakById } from "../data/clothingData";

export default function ClothingDetail({
  baju,
  onClose,
  onAddToCart,
  onOpenCart,
  onDirectCheckout,
}) {
  const [imgError, setImgError] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!baju) return null;

  const rak = getRakById(baju.rakId);
  const isLight = isLightColor(baju.hex);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(baju, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2400);
    }
  };

  const handleQuickCheckout = () => {
    if (onDirectCheckout) {
      onDirectCheckout(baju, qty);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-ck" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="modal-ck-close" onClick={onClose} title="Tutup">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-ck-body">
          {/* Left — image */}
          <div
            className="modal-ck-img-wrap"
            style={{ backgroundColor: baju.hex }}
          >
            {baju.gambar && !imgError ? (
              <img
                src={baju.gambar}
                alt={baju.nama}
                className="modal-ck-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className={`modal-ck-icon ${isLight ? "dark-icon" : ""}`}>
                {baju.kategori === "Atasan" ? "👕" : baju.kategori === "Bawahan" ? "👖" : "👗"}
              </span>
            )}

            {/* Badge Lokasi Rak mengambang di atas foto */}
            <div className="modal-img-rak-badge">
              <span>📦 {rak ? rak.nama : baju.rakId}</span>
            </div>
          </div>

          {/* Right — detail */}
          <div className="modal-ck-info">
            <p className="modal-ck-kategori">{baju.kategori}</p>
            <h2 className="modal-ck-title">{baju.nama}</h2>

            {/* Colour swatch */}
            <div className="modal-ck-colour-section">
              <p className="modal-ck-section-label">Warna: <strong>{baju.warna}</strong></p>
              <span
                className="modal-ck-swatch"
                style={{ backgroundColor: baju.hex }}
              />
            </div>

            <div className="modal-ck-divider" />

            {/* Details table */}
            <div className="modal-ck-details">
              <div className="modal-ck-row">
                <span className="modal-ck-key">KODE BAJU</span>
                <span className="modal-ck-val modal-ck-code">{baju.id}</span>
              </div>
              <div className="modal-ck-row">
                <span className="modal-ck-key">KODE WARNA</span>
                <span className="modal-ck-val modal-ck-code">{baju.hex}</span>
              </div>
              <div className="modal-ck-row modal-ck-row-highlight">
                <span className="modal-ck-key">LOKASI RAK</span>
                <span className="modal-ck-val modal-ck-rak-val">
                  <strong>{rak ? rak.nama : baju.rakId}</strong>
                </span>
              </div>
              <div className="modal-ck-row">
                <span className="modal-ck-key">POSISI</span>
                <span className="modal-ck-val">{rak ? rak.deskripsi : "—"}</span>
              </div>
            </div>

            {/* Nota Informasi Rak */}
            <div className="modal-ck-rak-notice">
              <span className="modal-rak-notice-icon">📋</span>
              <span className="modal-rak-notice-text">
                <strong>Nota Gudang:</strong> Baju ini tersimpan di <strong>{rak ? rak.nama : baju.rakId}</strong>. Nomor rak akan dicetak otomatis di nota saat Checkout.
              </span>
            </div>

            <div className="modal-ck-divider" />

            {/* Quantity Controller & Add to Cart Action */}
            <div className="modal-ck-action-group">
              <div className="modal-qty-picker">
                <button
                  type="button"
                  className="modal-qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >
                  &minus;
                </button>
                <span className="modal-qty-val">{qty}</span>
                <button
                  type="button"
                  className="modal-qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                >
                  &#43;
                </button>
              </div>

              <button
                className={`modal-ck-btn modal-ck-add-cart-btn ${added ? "added-success" : ""}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    DITAMBAHKAN KE KERANJANG
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    MASUKKAN KE KERANJANG
                  </>
                )}
              </button>
            </div>

            {/* Secondary actions */}
            <div className="modal-ck-secondary-btns">
              <button
                type="button"
                className="modal-ck-direct-co-btn"
                onClick={handleQuickCheckout}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                CHECKOUT (CO) SEKARANG
              </button>

              {added && onOpenCart && (
                <button
                  type="button"
                  className="modal-ck-co-now-btn"
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                >
                  LIHAT KERANJANG &amp; NOTA RAK &rarr;
                </button>
              )}
              <button type="button" className="modal-ck-btn modal-ck-close-text-btn" onClick={onClose}>
                TUTUP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
