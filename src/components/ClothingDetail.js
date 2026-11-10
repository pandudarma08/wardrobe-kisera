import React, { useState } from "react";
import { getRakById } from "../data/clothingData";

export default function ClothingDetail({ baju, onClose }) {
  const [imgError, setImgError] = useState(false);
  if (!baju) return null;

  const rak = getRakById(baju.rakId);
  const isLight = isLightColor(baju.hex);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-ck" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="modal-ck-close" onClick={onClose}>
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
                <span className="modal-ck-key">Kode Baju</span>
                <span className="modal-ck-val modal-ck-code">{baju.id}</span>
              </div>
              <div className="modal-ck-row">
                <span className="modal-ck-key">Kode Warna</span>
                <span className="modal-ck-val modal-ck-code">{baju.hex}</span>
              </div>
              <div className="modal-ck-row">
                <span className="modal-ck-key">Lokasi Rak</span>
                <span className="modal-ck-val">{rak ? rak.nama : baju.rakId}</span>
              </div>
              <div className="modal-ck-row">
                <span className="modal-ck-key">Posisi</span>
                <span className="modal-ck-val">{rak ? rak.deskripsi : "—"}</span>
              </div>
            </div>

            <div className="modal-ck-divider" />

            {/* CTA button styled like C&K */}
            <button className="modal-ck-btn" onClick={onClose}>
              TUTUP
            </button>
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
