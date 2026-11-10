import React, { useState } from "react";

// Sidebar filter persis seperti Charles & Keith
export default function FilterSidebar({
  allWarnas,
  warnaCount,
  selectedWarna,
  toggleWarna,
  allKategoris,
  kategoriCount,
  selectedKategori,
  toggleKategori,
  semuaBaju,
}) {
  const [colourOpen, setColourOpen] = useState(true);
  const [kategoriOpen, setKategoriOpen] = useState(true);
  const [rakOpen, setRakOpen] = useState(false);

  // Hitung per rak
  const rakCount = {};
  semuaBaju.forEach((b) => {
    rakCount[b.rakId] = (rakCount[b.rakId] || 0) + 1;
  });
  const allRaks = ["RAK-1", "RAK-2", "RAK-3", "RAK-4", "RAK-5"];
  const rakLabel = {
    "RAK-1": "Rak 1 — Depan Kiri",
    "RAK-2": "Rak 2 — Depan Kanan",
    "RAK-3": "Rak 3 — Tengah",
    "RAK-4": "Rak 4 — Belakang Kiri",
    "RAK-5": "Rak 5 — Belakang Kanan",
  };

  return (
    <div className="filter-sidebar">
      {/* ---- KATEGORI ---- */}
      <div className="filter-block">
        <button
          className="filter-heading"
          onClick={() => setKategoriOpen(!kategoriOpen)}
        >
          <span className="filter-caret">{kategoriOpen ? "∨" : "›"}</span>
          KATEGORI
        </button>

        {kategoriOpen && (
          <div className="filter-options">
            {allKategoris.map((kat) => (
              <label key={kat} className="filter-row filter-row-text">
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={selectedKategori.includes(kat)}
                  onChange={() => toggleKategori(kat)}
                />
                <span className="filter-label-text">
                  {kat}{" "}
                  <span className="filter-count">({kategoriCount[kat] || 0})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-divider" />

      {/* ---- COLOUR ---- */}
      <div className="filter-block">
        <button
          className="filter-heading"
          onClick={() => setColourOpen(!colourOpen)}
        >
          <span className="filter-caret">{colourOpen ? "∨" : "›"}</span>
          COLOUR
        </button>

        {colourOpen && (
          <div className="filter-options">
            {allWarnas.map((warna) => {
              // Ambil hex dari data
              const item = semuaBaju.find((b) => b.warna === warna);
              return (
                <label key={warna} className="filter-row">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={selectedWarna.includes(warna)}
                    onChange={() => toggleWarna(warna)}
                  />
                  <span
                    className="colour-swatch"
                    style={{ backgroundColor: item?.hex || "#ccc" }}
                  />
                  <span className="filter-label-text">
                    {warna}{" "}
                    <span className="filter-count">({warnaCount[warna] || 0})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="filter-divider" />

      {/* ---- RAK GUDANG ---- */}
      <div className="filter-block">
        <button
          className="filter-heading"
          onClick={() => setRakOpen(!rakOpen)}
        >
          <span className="filter-caret">{rakOpen ? "∨" : "›"}</span>
          RAK GUDANG
        </button>

        {rakOpen && (
          <div className="filter-options">
            {allRaks.map((rak) => (
              <label key={rak} className="filter-row filter-row-text">
                <span className="filter-checkbox-placeholder" />
                <span className="filter-label-text">
                  {rakLabel[rak]}{" "}
                  <span className="filter-count">({rakCount[rak] || 0})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

