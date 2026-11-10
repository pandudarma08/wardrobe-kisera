import React, { useState } from "react";

// Grid produk gaya Charles & Keith — foto besar, info minimalis bawah
export default function ProductGrid({ items, onItemClick }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Tidak ada item ditemukan</p>
        <p className="empty-sub">Coba ubah filter atau pencarian Anda.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {items.map((baju) => (
        <ProductCard key={baju.id} baju={baju} onClick={onItemClick} />
      ))}
    </div>
  );
}

function ProductCard({ baju, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card"
      onClick={() => onClick(baju)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="product-img-wrap">
        {baju.gambar && !imgError ? (
          <img
            src={baju.gambar}
            alt={baju.nama}
            className="product-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="product-color-block"
            style={{ backgroundColor: baju.hex }}
          >
            <span className="product-color-icon">
              {baju.kategori === "Atasan" ? "👕" : baju.kategori === "Bawahan" ? "👖" : "👗"}
            </span>
          </div>
        )}

        {/* Quick info overlay on hover */}
        {hovered && (
          <div className="product-overlay">
            <span className="product-overlay-code">{baju.id}</span>
          </div>
        )}

        {/* Kategori badge */}
        <span className="product-badge">{baju.kategori}</span>
      </div>

      {/* Info bawah */}
      <div className="product-info">
        <p className="product-name">{baju.nama}</p>
        <div className="product-meta">
          <span className="product-rack">📦 {baju.rakId}</span>
          <span
            className="product-colour-dot"
            style={{ backgroundColor: baju.hex }}
            title={baju.warna}
          />
        </div>
      </div>
    </div>
  );
}

