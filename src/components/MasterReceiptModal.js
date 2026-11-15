import React, { useState } from "react";
import { semuaBaju, rakGudang } from "../data/clothingData";
import { downloadReceiptAsImage } from "../utils/receiptDownloader";
import BrandLogo from "./BrandLogo";

export default function MasterReceiptModal({ isOpen, onClose }) {
  const [downloading, setDownloading] = useState(false);
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const handleDownload = () => {
    setDownloading(true);
    const groups = rakGudang.map((rak) => ({
      rak,
      items: semuaBaju.filter((b) => b.rakId === rak.id).map((b) => ({ ...b, qty: 1 })),
    }));

    downloadReceiptAsImage({
      title: "KISERA WARDROBE",
      subtitle: "MASTER RECEIPT KOLEKSI & PANDUAN RAK GUDANG",
      id: "KW-RECEIPT-MASTER-15",
      tanggal: currentDate,
      groups,
      totalPcs: semuaBaju.length,
      filename: `Master-Receipt-Kisera-Wardrobe-${new Date().toISOString().slice(0, 10)}.png`,
    });

    setTimeout(() => setDownloading(false), 1200);
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

        {/* Lembar Cetak Receipt Studio */}
        <div className="nota-paper" id="nota-print-area">
          {/* Header Receipt */}
          <div className="nota-header">
            <div className="nota-brand">
              <BrandLogo size={46} className="nota-logo" />
              <div>
                <h2 className="nota-title">KISERA WARDROBE</h2>
                <p className="nota-subtitle">STUDIO PHOTOSHOT &bull; MASTER RECEIPT GUDANG</p>
              </div>
            </div>
            <div className="nota-badge-master">
              <span>MASTER RECEIPT</span>
            </div>
          </div>

          <div className="nota-divider" />

          {/* Info Metadata */}
          <div className="nota-meta-grid">
            <div className="nota-meta-col">
              <span className="nota-meta-label">JENIS DOKUMEN</span>
              <span className="nota-meta-value"><strong>Receipt Panduan Rak Gudang</strong></span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">TANGGAL CETAK</span>
              <span className="nota-meta-value">{currentDate}</span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">TOTAL KOLEKSI</span>
              <span className="nota-meta-value"><strong>{semuaBaju.length} Koleksi Pakaian</strong></span>
            </div>
            <div className="nota-meta-col">
              <span className="nota-meta-label">TOTAL RAK GUDANG</span>
              <span className="nota-meta-value"><strong>{rakGudang.length} Rak Penyimpanan</strong></span>
            </div>
          </div>

          <div className="nota-section-title">
            <span>DAFTAR LOKASI BAJU DI 5 RAK GUDANG</span>
          </div>

          {/* Daftar Baju per Rak 1 s/d Rak 5 */}
          <div className="nota-rak-list">
            {rakGudang.map((rak) => {
              const bajusInRak = semuaBaju.filter((b) => b.rakId === rak.id);
              return (
                <div key={rak.id} className="nota-rak-group">
                  <div className="nota-rak-header">
                    <span className="nota-rak-tag">📦 {rak.nama} ({rak.id})</span>
                    <span className="nota-rak-desc">{rak.deskripsi}</span>
                  </div>

                  <table className="nota-table">
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>CEK</th>
                        <th style={{ width: "20%" }}>KODE BAJU</th>
                        <th style={{ width: "42%" }}>NAMA BAJU & WARNA</th>
                        <th style={{ width: "16%" }}>KATEGORI</th>
                        <th style={{ width: "12%", textAlign: "right" }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bajusInRak.map((baju) => (
                        <tr key={baju.id}>
                          <td className="nota-cell-check">
                            <span className="nota-checkbox-box" />
                          </td>
                          <td className="nota-cell-code">{baju.id}</td>
                          <td>
                            <div className="nota-item-name">
                              {baju.nama}
                              <span className="nota-color-dot" style={{ backgroundColor: baju.hex }} />
                              <span className="nota-color-text">({baju.warna})</span>
                            </div>
                          </td>
                          <td className="nota-cell-muted">{baju.kategori}</td>
                          <td style={{ textAlign: "right" }}>
                            <span className="nota-badge-ready">Tersedia</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {/* Footer Receipt */}
          <div className="nota-footer-summary">
            <p className="nota-note">
              * Dokumen ini mencatat seluruh 15 inventaris pakaian studio beserta rak penyimpanan masing-masing untuk panduan kru photoshot.
            </p>
            <div className="nota-signature-area">
              <div className="nota-sig-box">
                <span>Manajer Studio:</span>
                <div className="nota-sig-line" />
              </div>
              <div className="nota-sig-box">
                <span>Staf Wardrobe:</span>
                <div className="nota-sig-line" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="nota-actions no-print">
          <button className="nota-btn-download" onClick={handleDownload} disabled={downloading}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloading ? "MENGUNDUH..." : "DOWNLOAD RECEIPT (.PNG)"}
          </button>
          <button className="nota-btn-print" onClick={handlePrint} title="Cetak langsung ke printer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            CETAK
          </button>
          <button className="nota-btn-finish" onClick={onClose}>
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
}
