import React from "react";

// Logo bulat Kisera Wardrobe — hasil olah foto brand (public/images/logo-kisera-wardrobe.png)
export default function BrandLogo({ size = 56, className = "" }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/logo-kisera-wardrobe.png`}
      alt="Logo Kisera Wardrobe"
      width={size}
      height={size}
      className={`brand-logo${className ? ` ${className}` : ""}`}
      draggable={false}
    />
  );
}