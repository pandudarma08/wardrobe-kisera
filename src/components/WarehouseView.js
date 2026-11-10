import React, { useState } from "react";
import { rakGudang, getBajuByRak } from "../data/clothingData";

export default function WarehouseView({ onItemClick }) {
  const [activeRak, setActiveRak] = useState(null);

  return (
    <div className="warehouse-ck">
      <div className="warehouse-ck-header">
        <h2 className="warehouse-ck-title">Sistem Gudang</h2>
        <p className="warehouse-ck-sub">5 rak penyimpanan · klik rak untuk melihat isi</p>
      </div>

      <div className="warehouse-ck-grid">
        {rakGudang.map((rak) => {
          const bajuDiRak = getBajuByRak(rak.id);
          const isOpen = activeRak === rak.id;

          return (
            <div
              key={rak.id}
              className={`ck-rack ${isOpen ? "ck-rack-open" : ""}`}
              onClick={() => setActiveRak(isOpen ? null : rak.id)}
            >
              <div className="ck-rack-top">
                <div>
                  <p className="ck-rack-name">{rak.nama}</p>
                  <p className="ck-rack-desc">{rak.deskripsi}</p>
                </div>
                <div className="ck-rack-right">
                  <span className="ck-rack-count">{bajuDiRak.length}</span>
                  <span className="ck-rack-caret">{isOpen ? "∧" : "∨"}</span>
                </div>
              </div>

              {/* Colour strip preview */}
              <div className="ck-rack-strip">
                {bajuDiRak.map((baju) => (
                  <span
                    key={baju.id}
                    className="ck-strip-dot"
                    style={{ backgroundColor: baju.hex }}
                    title={baju.nama}
                  />
                ))}
              </div>

              {/* Expanded list */}
              {isOpen && (
                <div className="ck-rack-list">
                  {bajuDiRak.map((baju) => (
                    <div
                      key={baju.id}
                      className="ck-rack-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick && onItemClick(baju);
                      }}
                    >
                      <span
                        className="ck-rack-swatch"
                        style={{ backgroundColor: baju.hex }}
                      />
                      <div className="ck-rack-item-info">
                        <span className="ck-rack-item-name">{baju.nama}</span>
                        <span className="ck-rack-item-meta">
                          {baju.id} · {baju.kategori}
                        </span>
                      </div>
                      <span className="ck-rack-arrow">›</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
