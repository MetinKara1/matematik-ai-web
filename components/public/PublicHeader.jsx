"use client";

import { useState } from "react";

const logo = "/assets/MatAI-logo.png";
const appQrCode = "/assets/matai-ios-qr.png";
const appStoreLink = "https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761";

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="landing-header public-header">
        <div className="landing-header-inner">
          <a href="/" className="landing-header-brand" aria-label="MatAI ana sayfa">
            <img src={logo} alt="" className="landing-header-logo" />
            <span>MatAI</span>
          </a>

          <nav className={`landing-header-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Ana menü">
            <a href="/yapay-zeka-matematik-cozucu" onClick={closeMenu}>AI Matematik Çözücü</a>
            <a href="/#features" onClick={closeMenu}>Özellikler</a>
            <a href="/#how-it-works" onClick={closeMenu}>Nasıl Çalışır?</a>
            <a href="/#download" onClick={closeMenu}>Uygulamayı İndir</a>
            <a href="/makaleler" onClick={closeMenu}>Makaleler</a>
          </nav>

          <a
            href={appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-header-action"
            aria-label="MatAI'ı App Store'dan indir"
          >
            Hemen Başla
          </a>

          <button
            type="button"
            className={`landing-menu-toggle${isMenuOpen ? " is-open" : ""}`}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <button type="button" className="landing-menu-backdrop" aria-label="Menüyü kapat" onClick={closeMenu} />
      )}

      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-app-qr"
        aria-label="MatAI iOS uygulamasını App Store'da aç"
      >
        <img src={appQrCode} alt="MatAI iOS uygulaması için QR kod" />
        <span>
          <strong>iOS için indirin</strong>
          <small>QR kodu tarayın</small>
          <em>Android yakında</em>
        </span>
      </a>
    </>
  );
}
