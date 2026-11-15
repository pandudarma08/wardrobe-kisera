import React, { useState } from "react";
import { getRakById } from "../data/clothingData";
import { downloadReceiptAsImage } from "../utils/receiptDownloader";
import BrandLogo from "./BrandLogo";

export default function CheckoutNotaModal({ nota, onClose, onClearCart }) {
  const [downloading, setDownloading] = useState(false);
  if (!nota) return null;

  // Kelompokkan barang berdasarkan Rak Gudang agar staf mudah mengambil
  const groupedByRak = {};
  nota.items.forEach((item) => {
    const rak = getRakById(item.rakId) || {
      id: item.rakId,
      nama: item.rakId,
      deskripsi: "Lokasi Rak Studio",
    };
    if (!groupedByRak[item.rakId]) {
      groupedByRak[item.rakId] = {
        rak,
        items: [],
      };
    }
    groupedByRak[item.rakId].items.push(item);
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloading(true);
    const groups = Object.keys(groupedByRak).map((rakId) => ({
      rak: groupedByRak[rakId].rak,
      items: groupedByRak[rakId].items,
    }));

    downloadReceiptAsImage({
      title: "KISERA WARDROBE",
      subtitle: "NOTA CHECKOUT & PANDUAN PENGAMBILAN RAK",
      id: nota.id,
      tanggal: nota.tanggal,
      groups,
      totalPcs: nota.totalPcs,
      filename: `${nota.id}.png`,
    });

    setTimeout(() => setDownloading(false), 1200);
  };

  const handleFinish = () => {
    if (onClearCart) onClearCart();
    onClose();
  };

  return (
    <div className="modal-overlay nota-overlay" onClick={onClose}>
      <div className="nota-modal" onClick={(e) => e.stopPropagation()}>
        {/* Tombol Tutup */}
        <button className="modal-ck-close no-print" onClick={onClose} title="Tutup">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Lembar Nota Pengambilan Baju */}
        <div className="nota-paper" id="nota-print-area">
          {/* Header Nota */}
          <div className="nota-header">
            <div className="nota-brand">
              <BrandLogo size={48} className="nota-logo" />
              <div>
                <h2 className="nota-title">KISERA WARDROBE</h2>
                <p className="nota-subtitle">STUDIO PHOTOSHOT &bull; SISTEM MANAJEMEN GUDANG</p>
              </div>
            </div>
            <div className="nota-badge-co">
              <span>CHECKOUT BERHASIL</span>
            </div>
          </div>

          <div className="nota-divider" />

          {/* Metadata Nota */}
          <div className="nota-meta-grid">
            <div className="nota-meta-col">
              <span className="nota-meta-label">NO. NOTA PENGAMBILAN</span>
              <span className="nota-meta-value nota-invoice-code">{nota.id}</span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">TANGGAL & WAKTU</span>
              <span className="nota-meta-value">{nota.tanggal}</span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">STATUS PENGAMBILAN</span>
              <span className="nota-meta-value nota-status-pill">Siap Diambil di Rak</span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">TOTAL BARANG</span>
              <span className="nota-meta-value"><strong>{nota.totalPcs} pcs</strong> ({nota.items.length} jenis)</span>
            </div>
          </div>

          {/* Inti Nota: Daftar Baju Dikelompokkan per Rak Gudang */}
          <div className="nota-section-title">
            <span>DAFTAR PENGAMBILAN PER RAK GUDANG</span>
          </div>

          <div className="nota-rak-list">
            {Object.keys(groupedByRak).map((rakId) => {
              const { rak, items } = groupedByRak[rakId];
              return (
                <div key={rakId} className="nota-rak-group">
                  <div className="nota-rak-header">
                    <span className="nota-rak-tag">📦 {rak.nama}</span>
                    <span className="nota-rak-desc">{rak.deskripsi}</span>
                  </div>

                  <table className="nota-table">
                    <thead>
                      <tr>
                        <th style={{ width: "12%" }}>CEK</th>
                        <th style={{ width: "20%" }}>KODE</th>
                        <th style={{ width: "38%" }}>NAMA BAJU & WARNA</th>
                        <th style={{ width: "15%" }}>KATEGORI</th>
                        <th style={{ width: "15%", textAlign: "right" }}>QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="nota-cell-check">
                            <span className="nota-checkbox-box" />
                          </td>
                          <td className="nota-cell-code">{item.id}</td>
                          <td>
                            <div className="nota-item-name">
                              {item.nama}
                              <span className="nota-color-dot" style={{ backgroundColor: item.hex }} />
                              <span className="nota-color-text">({item.warna})</span>
                            </div>
                          </td>
                          <td className="nota-cell-muted">{item.kategori}</td>
                          <td className="nota-cell-qty">{item.qty} pcs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {/* Footer Nota */}
          <div className="nota-footer-summary">
            <p className="nota-note">
              * Nota ini digunakan sebagai panduan staf studio untuk mengambil pakaian langsung ke rak nomor yang tertera di atas.
            </p>
            <div className="nota-signature-area">
              <div className="nota-sig-box">
                <span>Staf Pengambil:</span>
                <div className="nota-sig-line" />
              </div>
              <div className="nota-sig-box">
                <span>Pemeriksa Gudang:</span>
                <div className="nota-sig-line" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Tidak tercetak) */}
        <div className="nota-actions no-print">
          <button className="nota-btn-download" onClick={handleDownload} disabled={downloading}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloading ? "MENGUNDUH..." : "DOWNLOAD NOTA (.PNG)"}
          </button>
          <button className="nota-btn-print" onClick={handlePrint} title="Cetak langsung ke printer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            CETAK
          </button>
          <button className="nota-btn-finish" onClick={handleFinish}>
            SELESAI
          </button>
        </div>
      </div>
    </div>
  );
}
