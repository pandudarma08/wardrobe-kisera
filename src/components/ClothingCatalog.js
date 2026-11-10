import React from "react";
import ClothingCard from "./ClothingCard";

// Komponen grid katalog baju per kategori
export default function ClothingCatalog({ title, icon, items, onItemClick }) {
  return (
    <div className="catalog-section">
      <h3 className="catalog-title">
        <span className="catalog-icon">{icon}</span>
        {title}
        <span className="catalog-count">{items.length} item</span>
      </h3>
      <div className="catalog-grid">
        {items.map((baju) => (
          <ClothingCard key={baju.id} baju={baju} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}

