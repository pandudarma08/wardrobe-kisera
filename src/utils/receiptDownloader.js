// Utility untuk men-download Nota / Receipt langsung sebagai file gambar (.png) berkualitas tinggi

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function downloadReceiptAsImage({ title, subtitle, id, tanggal, groups, totalPcs, filename }) {
  // Load logo Kisera Wardrobe
  const logoSrc = `${process.env.PUBLIC_URL || ""}/images/logo-kisera-wardrobe.png`;
  const logoImg = await loadImage(logoSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = 800;

  // Format tanggal agar rapi dan tidak kepanjangan
  let dateText = tanggal;
  let timeText = "";
  if (tanggal.includes("pukul")) {
    const parts = tanggal.split("pukul");
    dateText = parts[0].trim();
    timeText = `Pukul ${parts[1].trim()}`;
  } else if (tanggal.includes("at")) {
    const parts = tanggal.split("at");
    dateText = parts[0].trim();
    timeText = parts[1].trim();
  }

  // Hitung tinggi canvas secara akurat & dinamis agar proporsional
  let totalItemsCount = 0;
  groups.forEach((g) => {
    totalItemsCount += g.items.length;
  });

  const baseLayoutHeight = 470;
  const groupsHeight = groups.length * 75 + totalItemsCount * 36;
  const calculatedHeight = baseLayoutHeight + groupsHeight;
  const height = Math.max(540, calculatedHeight);

  canvas.width = width * 2; // 2x Retina Resolution
  canvas.height = height * 2;
  ctx.scale(2, 2);

  // Background putih bersih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Border luar tipis elegan
  ctx.strokeStyle = "#dedad3";
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // ==========================================
  // HEADER BRAND: LOGO DI KIRI + TEKS DI SEBELAHNYA
  // ==========================================
  const logoX = 50;
  const logoY = 46;
  const logoSize = 56;

  // Gambar Logo di Sebelah Kiri
  if (logoImg) {
    ctx.save();
    // Bentuk lingkaran sempurna
    ctx.beginPath();
    ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();

    // Garis lingkar emas tipis di sekitar logo
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Teks Brand di Sebelah Logo (Kiri)
  const textLeftX = logoImg ? logoX + logoSize + 16 : 50;

  ctx.textAlign = "left";
  ctx.fillStyle = "#111111";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("KISERA WARDROBE", textLeftX, 68);

  ctx.fillStyle = "#666666";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText((subtitle || "NOTA CHECKOUT & PANDUAN PENGAMBILAN RAK").toUpperCase(), textLeftX, 89);
  ctx.letterSpacing = "0px";

  // Badge Status di Pojok Kanan Atas
  const badgeText = id.includes("RECEIPT") ? "MASTER RECEIPT" : "CHECKOUT RESMI";
  const badgeColor = id.includes("RECEIPT") ? "#2c3e50" : "#27ae60";
  const badgeW = 120;
  const badgeH = 24;
  const badgeX = width - 50 - badgeW;
  const badgeY = 60;

  ctx.fillStyle = badgeColor;
  ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "1px";
  ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + 16);
  ctx.letterSpacing = "0px";

  // Garis pembatas halus di bawah header
  ctx.strokeStyle = "#e8e4dc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 116);
  ctx.lineTo(width - 50, 116);
  ctx.stroke();

  // ==========================================
  // KOTAK METADATA (3 Kolom dengan Divider Rapi)
  // ==========================================
  const metaBoxY = 130;
  const metaBoxH = 76;
  const metaBoxW = width - 100; // 700px
  const metaBoxX = 50;

  ctx.fillStyle = "#faf8f5";
  ctx.fillRect(metaBoxX, metaBoxY, metaBoxW, metaBoxH);
  ctx.strokeStyle = "#e5dfd5";
  ctx.strokeRect(metaBoxX, metaBoxY, metaBoxW, metaBoxH);

  // Garis divider vertikal antar kolom metadata
  ctx.strokeStyle = "#e8e3d8";
  ctx.beginPath();
  ctx.moveTo(270, metaBoxY + 8);
  ctx.lineTo(270, metaBoxY + metaBoxH - 8);
  ctx.moveTo(580, metaBoxY + 8);
  ctx.lineTo(580, metaBoxY + metaBoxH - 8);
  ctx.stroke();

  // Kolom 1: No. Dokumen / Nota
  ctx.textAlign = "left";
  ctx.fillStyle = "#888888";
  ctx.font = "bold 9px -apple-system, sans-serif";
  ctx.fillText("NO. DOKUMEN / NOTA", 68, metaBoxY + 26);
  ctx.fillStyle = "#111111";
  ctx.font = "bold 13px 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText(id, 68, metaBoxY + 50);

  // Kolom 2: Tanggal & Waktu (Tersusun 2 baris agar rapi)
  ctx.fillStyle = "#888888";
  ctx.font = "bold 9px -apple-system, sans-serif";
  ctx.fillText("TANGGAL & WAKTU", 290, metaBoxY + 26);
  ctx.fillStyle = "#222222";
  ctx.font = "600 11.5px -apple-system, sans-serif";
  ctx.fillText(dateText, 290, metaBoxY + 46);
  if (timeText) {
    ctx.fillStyle = "#666666";
    ctx.font = "10.5px -apple-system, sans-serif";
    ctx.fillText(timeText, 290, metaBoxY + 62);
  }

  // Kolom 3: Total Barang
  ctx.fillStyle = "#888888";
  ctx.font = "bold 9px -apple-system, sans-serif";
  ctx.fillText("TOTAL BARANG", 600, metaBoxY + 26);
  ctx.fillStyle = "#1e824c";
  ctx.font = "bold 15px -apple-system, sans-serif";
  ctx.fillText(`${totalPcs} pcs`, 600, metaBoxY + 50);

  // ==========================================
  // SECTION TITLE
  // ==========================================
  let currentY = metaBoxY + metaBoxH + 34;
  ctx.fillStyle = "#111111";
  ctx.font = "bold 11px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("— PANDUAN PENGAMBILAN PER NOMOR RAK GUDANG —", width / 2, currentY);
  ctx.letterSpacing = "0px";
  currentY += 20;

  // ==========================================
  // DAFTAR RAK & BARANG
  // ==========================================
  groups.forEach((group) => {
    // Header Rak
    const rakHeaderH = 32;
    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(50, currentY, metaBoxW, rakHeaderH);
    ctx.strokeStyle = "#ded6c7";
    ctx.strokeRect(50, currentY, metaBoxW, rakHeaderH);

    ctx.textAlign = "left";
    ctx.fillStyle = "#2b2114";
    ctx.font = "bold 12px -apple-system, sans-serif";
    ctx.fillText(`📦 ${group.rak.nama}`, 65, currentY + 20);

    ctx.fillStyle = "#6b5840";
    ctx.font = "10.5px -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(group.rak.deskripsi, width - 65, currentY + 20);

    currentY += rakHeaderH;

    // Header Kolom Tabel
    const tableHeaderH = 26;
    ctx.fillStyle = "#fcfbfa";
    ctx.fillRect(50, currentY, metaBoxW, tableHeaderH);
    ctx.strokeStyle = "#eae5dc";
    ctx.strokeRect(50, currentY, metaBoxW, tableHeaderH);

    ctx.textAlign = "left";
    ctx.fillStyle = "#777777";
    ctx.font = "bold 9px -apple-system, sans-serif";
    ctx.fillText("[ ]", 65, currentY + 17);
    ctx.fillText("KODE", 105, currentY + 17);
    ctx.fillText("NAMA BAJU & WARNA", 215, currentY + 17);
    ctx.fillText("KATEGORI", 540, currentY + 17);
    ctx.textAlign = "right";
    ctx.fillText("JUMLAH", width - 68, currentY + 17);

    currentY += tableHeaderH;

    // Baris Barang
    group.items.forEach((item) => {
      const rowH = 34;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(50, currentY, metaBoxW, rowH);
      ctx.strokeStyle = "#f0ebe1";
      ctx.strokeRect(50, currentY, metaBoxW, rowH);

      // Checkbox kotak ceklis
      ctx.strokeStyle = "#aaaaaa";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(65, currentY + 10, 14, 14);

      // Kode Baju
      ctx.textAlign = "left";
      ctx.fillStyle = "#444444";
      ctx.font = "bold 11px 'SF Mono', Menlo, Consolas, monospace";
      ctx.fillText(item.id, 105, currentY + 21);

      // Nama Baju + Keterangan Warna
      ctx.fillStyle = "#111111";
      ctx.font = "bold 11.5px -apple-system, sans-serif";
      const nameText = item.nama;
      ctx.fillText(nameText, 215, currentY + 21);

      const nameWidth = ctx.measureText(nameText).width;
      ctx.fillStyle = "#777777";
      ctx.font = "10.5px -apple-system, sans-serif";
      ctx.fillText(`—  Warna: ${item.warna}`, 215 + nameWidth + 8, currentY + 21);

      // Kategori
      ctx.fillStyle = "#555555";
      ctx.font = "10.5px -apple-system, sans-serif";
      ctx.fillText(item.kategori, 540, currentY + 21);

      // Qty
      ctx.textAlign = "right";
      ctx.fillStyle = "#111111";
      ctx.font = "bold 11.5px -apple-system, sans-serif";
      ctx.fillText(`${item.qty || 1} pcs`, width - 68, currentY + 21);

      currentY += rowH;
    });

    currentY += 16; // Jarak antar grup rak
  });

  // ==========================================
  // FOOTER & TANDA TANGAN
  // ==========================================
  currentY += 8;
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(50, currentY);
  ctx.lineTo(width - 50, currentY);
  ctx.stroke();
  ctx.setLineDash([]);

  currentY += 20;
  ctx.textAlign = "left";
  ctx.fillStyle = "#888888";
  ctx.font = "italic 9.5px -apple-system, sans-serif";
  ctx.fillText("* Dokumen ini di-download dari sistem Wardrobe Kisera sebagai bukti panduan pengambilan rak.", 50, currentY);

  currentY += 36;
  // Kolom Tanda Tangan
  ctx.textAlign = "center";
  ctx.fillStyle = "#444444";
  ctx.font = "bold 10px -apple-system, sans-serif";

  // Sisi Kiri: Staf Pengambil
  const sigLeftX = 180;
  ctx.fillText("Staf Pengambil:", sigLeftX, currentY);
  ctx.strokeStyle = "#aaaaaa";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sigLeftX - 70, currentY + 45);
  ctx.lineTo(sigLeftX + 70, currentY + 45);
  ctx.stroke();

  // Sisi Kanan: Pemeriksa Gudang
  const sigRightX = width - 180;
  ctx.fillText("Pemeriksa Gudang:", sigRightX, currentY);
  ctx.beginPath();
  ctx.moveTo(sigRightX - 70, currentY + 45);
  ctx.lineTo(sigRightX + 70, currentY + 45);
  ctx.stroke();

  // ==========================================
  // TRIGGER DOWNLOAD AS PNG
  // ==========================================
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || `${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
