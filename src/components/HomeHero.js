import React from "react";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

// Animasi stagger untuk elemen-elemen hero
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 24 },
  },
};

const fadeSlideLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 22, delay: 0.2 },
  },
};

const fadeSlideRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 22, delay: 0.2 },
  },
};

const watermarkVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.7 },
  },
};

export default function HomeHero({ onExploreClick }) {
  return (
    <section className="ck-hero-section">
      <motion.div
        className="ck-hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sisi Kiri: Model / Siluet editorial polosan */}
        <motion.div
          className="ck-hero-side ck-hero-left"
          variants={fadeSlideLeftVariant}
        >
          <div className="ck-model-card">
            <div className="ck-model-placeholder">
              <div className="ck-model-silhouette">
                <span className="ck-silhouette-tag">EDITION 01</span>
                <span className="ck-silhouette-icon">🧥</span>
                <span className="ck-silhouette-caption">Trench & Outerwear</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tengah: Judul & Tombol "Shop Now" */}
        <motion.div className="ck-hero-center" variants={containerVariants}>
          <motion.div variants={fadeUpVariant}>
            <BrandLogo size={96} className="ck-hero-logo" />
          </motion.div>
          <motion.span className="ck-hero-tag" variants={fadeUpVariant}>
            NEW COLLECTION
          </motion.span>
          <motion.h2 className="ck-hero-title" variants={fadeUpVariant}>
            Just Landed
          </motion.h2>
          <motion.button
            className="ck-hero-cta"
            onClick={onExploreClick}
            variants={fadeUpVariant}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* Sisi Kanan: Model / Siluet editorial polosan */}
        <motion.div
          className="ck-hero-side ck-hero-right"
          variants={fadeSlideRightVariant}
        >
          <div className="ck-model-card">
            <div className="ck-model-placeholder">
              <div className="ck-model-silhouette">
                <span className="ck-silhouette-tag">EDITION 02</span>
                <span className="ck-silhouette-icon">👜</span>
                <span className="ck-silhouette-caption">Photoshot Studio Series</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Signature watermark di pojok kanan bawah seperti pada contoh C&K */}
        <motion.div className="ck-hero-watermark" variants={watermarkVariant}>
          Kisera
        </motion.div>
      </motion.div>
    </section>
  );
}
