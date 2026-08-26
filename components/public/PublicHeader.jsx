"use client";

import { useState } from "react";

const logo = "/assets/MatAI-logo.png";
const appQrCode = "/assets/matai-ios-qr.png";
const appStoreLink = "https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761";

export default function PublicHeader({ locale = "tr", languageHref }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const labels = isEnglish ? {
    home: "MatAI home", menu: "Main navigation", solver: "AI Math Solver", features: "Features",
    how: "How It Works", download: "Download", articles: "Articles", about: "About",
    start: "Get Started", startLabel: "Download MatAI on the App Store", open: "Open menu", close: "Close menu",
    ios: "Download for iOS", scan: "Scan the QR code", android: "Android coming soon", qr: "QR code for the MatAI iOS app",
  } : {
    home: "MatAI ana sayfa", menu: "Ana menü", solver: "Yapay Zekâ Matematik Çözücü", features: "Özellikler",
    how: "Nasıl Çalışır?", download: "Uygulamayı İndir", articles: "Makaleler", about: "Hakkımızda",
    start: "Hemen Başla", startLabel: "MatAI'ı App Store'dan indir", open: "Menüyü aç", close: "Menüyü kapat",
    ios: "iOS için indirin", scan: "QR kodu tarayın", android: "Android yakında", qr: "MatAI iOS uygulaması için QR kod",
  };

  return (
    <>
      <header className="landing-header public-header">
        <div className="landing-header-inner">
          <a href={homeHref} className="landing-header-brand" aria-label={labels.home}>
            <img src={logo} alt="" className="landing-header-logo" />
            <span>MatAI</span>
          </a>

          <nav className={`landing-header-nav${isMenuOpen ? " is-open" : ""}`} aria-label={labels.menu}>
            <a href={isEnglish ? "/en/ai-math-solver" : "/yapay-zeka-matematik-cozucu"} onClick={closeMenu}>{labels.solver}</a>
            <a href={`${homeHref}#features`} onClick={closeMenu}>{labels.features}</a>
            <a href={`${homeHref}#how-it-works`} onClick={closeMenu}>{labels.how}</a>
            <a href={`${homeHref}#download`} onClick={closeMenu}>{labels.download}</a>
            <a href={isEnglish ? "/en/articles" : "/makaleler"} onClick={closeMenu}>{labels.articles}</a>
            {!isEnglish && <a href="/hakkimizda" onClick={closeMenu}>{labels.about}</a>}
            <a href={languageHref || (isEnglish ? "/" : "/en")} hrefLang={isEnglish ? "tr" : "en"} lang={isEnglish ? "tr" : "en"} onClick={closeMenu}>{isEnglish ? "TR" : "EN"}</a>
          </nav>

          <a
            href={appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-header-action"
            aria-label={labels.startLabel}
          >
            {labels.start}
          </a>

          <button
            type="button"
            className={`landing-menu-toggle${isMenuOpen ? " is-open" : ""}`}
            aria-label={isMenuOpen ? labels.close : labels.open}
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
        <button type="button" className="landing-menu-backdrop" aria-label={labels.close} onClick={closeMenu} />
      )}

      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-app-qr"
        aria-label={labels.startLabel}
      >
        <img src={appQrCode} alt={labels.qr} />
        <span>
          <strong>{labels.ios}</strong>
          <small>{labels.scan}</small>
          <em>{labels.android}</em>
        </span>
      </a>
    </>
  );
}
