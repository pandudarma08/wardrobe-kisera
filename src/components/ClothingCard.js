import React, { useState } from "react";

// Komponen kartu baju individual
export default function ClothingCard({ baju, onClick }) {
  const isLight = isLightColor(baju.hex);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="clothing-card" onClick={() => onClick && onClick(baju)}>
      {/* Preview gambar atau warna */}
      <div
        className="clothing-preview"
        style={{ backgroundColor: baju.hex }}
      >
        {baju.gambar && !imgError ? (
          <img
            src={baju.gambar}
            alt={baju.nama}
            className="clothing-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={`clothing-icon ${isLight ? "dark-text" : ""}`}>
            {baju.kategori === "Atasan" ? "👕" : baju.kategori === "Bawahan" ? "👖" : "👗"}
          </span>
        )}
      </div>

      {/* Info baju */}
      <div className="clothing-info">
        <h4 className="clothing-name">{baju.nama}</h4>
        <div className="clothing-details">
          <span className="clothing-code">
            <strong>Kode:</strong> {baju.id}
          </span>
          <span className="clothing-rack">
            <strong>Lokasi:</strong> {baju.rakId}
          </span>
        </div>
        <div className="clothing-color-badge">
          <span
            className="color-dot"
            style={{ backgroundColor: baju.hex }}
          ></span>
          {baju.warna}
        </div>
      </div>
    </div>
  );
}

// Helper: cek apakah warna terang
function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
