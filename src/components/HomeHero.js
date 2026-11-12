import React from "react";
import BrandLogo from "./BrandLogo";

export default function HomeHero({ onExploreClick }) {
  return (
    <section className="ck-hero-section">
      <div className="ck-hero-container">
        {/* Sisi Kiri: Model / Siluet editorial polosan */}
        <div className="ck-hero-side ck-hero-left">
          <div className="ck-model-card">
            <div className="ck-model-placeholder">
              <div className="ck-model-silhouette">
                <span className="ck-silhouette-tag">EDITION 01</span>
                <span className="ck-silhouette-icon">🧥</span>
                <span className="ck-silhouette-caption">Trench & Outerwear</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tengah: Judul & Tombol "Shop Now" */}
        <div className="ck-hero-center">
          <BrandLogo size={96} className="ck-hero-logo" />
          <span className="ck-hero-tag">NEW COLLECTION</span>
          <h2 className="ck-hero-title">Just Landed</h2>
          <button className="ck-hero-cta" onClick={onExploreClick}>
            Shop Now
          </button>
        </div>

        {/* Sisi Kanan: Model / Siluet editorial polosan */}
        <div className="ck-hero-side ck-hero-right">
          <div className="ck-model-card">
            <div className="ck-model-placeholder">
              <div className="ck-model-silhouette">
                <span className="ck-silhouette-tag">EDITION 02</span>
                <span className="ck-silhouette-icon">👜</span>
                <span className="ck-silhouette-caption">Photoshot Studio Series</span>
              </div>
            </div>
          </div>
        </div>

        {/* Signature watermark di pojok kanan bawah seperti pada contoh C&K */}
        <div className="ck-hero-watermark">
          Kisera
        </div>
      </div>
    </section>
  );
}

