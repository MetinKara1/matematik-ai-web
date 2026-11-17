'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { solveMathProblem } from '../../lib/mathSolverEngine.mjs';
import {
  APP_STORE_URL,
  POLAR_CHECKOUT_WEEKLY,
  POLAR_CHECKOUT_ANNUAL
} from '../../lib/pricing.mjs';

const appQrCode = '/assets/matai-ios-qr.png';

const QUICK_EXAMPLES = [
  { label: '∫ x·eˣ dx', query: '\\int x e^x dx', tag: 'Kısmi İntegrasyon' },
  { label: '2x² - 5x + 2 = 0', query: '2x^2 - 5x + 2 = 0', tag: 'Denklem & Diskriminant' },
  { label: 'lim x→0 sin(x)/x', query: '\\lim_{x \\to 0} \\frac{\\sin x}{x}', tag: '0/0 Limiti' },
  { label: 'd/dx (x³ ln x)', query: '\\frac{d}{dx}(x^3 \\ln x)', tag: 'Çarpımın Türevi' },
  { label: '∫ sin(x) dx', query: '\\int \\sin(x) dx', tag: 'Trigonometrik İntegral' }
];

function SafeMath({ math, displayMode = false }) {
  if (!math) return null;
  try {
    const html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      trust: false
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <code>{math}</code>;
  }
}

export default function MathSolverViewer() {
  const [activeTab, setActiveTab] = useState('web'); // 'web' | 'camera'
  const [query, setQuery] = useState('\\int x e^x dx');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState(null);
  const [isProUser, setIsProUser] = useState(false);

  // Initialize with the default example on mount
  useEffect(() => {
    try {
      const initial = solveMathProblem('\\int x e^x dx');
      setSolution(initial);

      // Check if user has active Pro license stored locally
      const storedLicense = localStorage.getItem('matai_pro_license');
      if (storedLicense) {
        setIsProUser(true);
      }
    } catch {
      // Fallback
    }
  }, []);

  async function handleSolve(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim()) {
      setError('Lütfen bir matematik sorusu veya formül yazın.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/math-solver?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success && data.solution) {
        setSolution(data.solution);
      } else {
        // Fallback to client-side engine if offline or API route issue
        const clientSolved = solveMathProblem(query);
        if (clientSolved) {
          setSolution(clientSolved);
        } else {
          setError(data.error || 'Soru çözülürken bir hata oluştu.');
        }
      }
    } catch (err) {
      // Offline / fallback to client engine
      try {
        const clientSolved = solveMathProblem(query);
        setSolution(clientSolved);
      } catch {
        setError('Bağlantı hatası oluştu. Lütfen ifadenizi kontrol edin.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelectExample(item) {
    setQuery(item.query);
    setError('');
    const solved = solveMathProblem(item.query);
    setSolution(solved);
  }

  return (
    <section className="math-solver-widget-container" id="math-solver-widget" aria-label="MatAI Matematik Soru Çözücü">
      <div className="math-solver-card">
        {/* Top Header & Dual Mode Tabs */}
        <div className="math-solver-header">
          <div className="math-solver-title-group">
            <span className="math-solver-eyebrow">
              <span className="live-pulse" />
              YAPAY ZEKA DESTEKLİ MATEMATİK ASİSTANI
            </span>
            <h2 className="math-solver-heading">
              Soru Çözücü & Formül Analiz Aracı
            </h2>
            <p className="math-solver-subtext">
              Kalkülüs, integral, türev veya denklemlerinizi yazın; adım adım çözüm yöntemini anında inceleyin.
            </p>
          </div>

          <div className="math-solver-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'web'}
              className={`math-solver-tab ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Web&apos;de Hemen Çöz</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'camera'}
              className={`math-solver-tab ${activeTab === 'camera' ? 'active' : ''}`}
              onClick={() => setActiveTab('camera')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>iPhone Kamerasıyla Çöz (Mobil)</span>
              <span className="tab-badge">Önerilen</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Web Solver */}
        {activeTab === 'web' && (
          <div className="math-solver-body">
            {/* Quick Example Pills */}
            <div className="quick-examples-bar">
              <span className="quick-examples-label">Hızlı Örnekler:</span>
              <div className="quick-examples-list">
                {QUICK_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`quick-pill ${query === ex.query ? 'selected' : ''}`}
                    onClick={() => handleSelectExample(ex)}
                  >
                    <span>{ex.label}</span>
                    <small>{ex.tag}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSolve} className="math-input-form">
              <div className="math-input-wrapper">
                <div className="math-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Örn: \int x e^x dx veya 2x^2 - 5x + 2 = 0 ..."
                  className="math-text-input"
                  maxLength={250}
                  aria-label="Matematik sorusu veya formülü"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="math-submit-btn"
                >
                  {loading ? (
                    <span className="btn-spinner" />
                  ) : (
                    <>
                      <span>Adım Adım Çöz</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="math-error-banner" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Results Area */}
            {solution && (
              <div className="solution-display-card">
                {/* Topic & Metadata Badge Bar */}
                <div className="solution-meta-bar">
                  <div className="meta-left">
                    <span className="meta-topic-badge">{solution.topic}</span>
                    <span className="meta-difficulty-badge">{solution.difficulty}</span>
                  </div>
                  <div className="meta-right">
                    <span className="meta-steps-count">Toplam {solution.totalSteps} Adım</span>
                  </div>
                </div>

                {/* Problem Statement Box */}
                <div className="solution-problem-box">
                  <div className="problem-label">İncelenen Problem:</div>
                  <div className="problem-math">
                    <SafeMath math={solution.problem} displayMode={true} />
                  </div>
                </div>

                {/* Applied Math Rule Banner */}
                {solution.ruleApplied && (
                  <div className="rule-applied-box">
                    <div className="rule-icon">💡</div>
                    <div className="rule-content">
                      <strong>Uygulanan Matematiksel Yöntem:</strong>
                      <p><SafeMath math={solution.ruleApplied} /></p>
                    </div>
                  </div>
                )}

                {/* Step 1: Free Preview */}
                <div className="step-card free-step-card">
                  <div className="step-header">
                    <span className="free-step-badge">✓ 1. ADIM (ÜCRETSİZ ÖNİZLEME)</span>
                    <h3 className="step-title">{solution.step1.title}</h3>
                  </div>
                  <p className="step-explanation">{solution.step1.explanation}</p>
                  <div className="step-math-box">
                    <SafeMath math={solution.step1.math} displayMode={true} />
                  </div>
                </div>

                {/* Steps 2+ : Locked behind Polar Pro Paywall (or unlocked if Pro) */}
                {isProUser ? (
                  <div className="pro-unlocked-section">
                    <div className="pro-status-banner">
                      <span>✓ MatAI Pro Lisansı Aktif — Tüm Adımlar Görüntüleniyor</span>
                    </div>
                    {solution.lockedSteps.map((step) => (
                      <div key={step.stepNumber} className="step-card unlocked-step-card">
                        <div className="step-header">
                          <span className="unlocked-step-badge">ADIM {step.stepNumber}</span>
                          <h3 className="step-title">{step.title}</h3>
                        </div>
                        <p className="step-explanation">{step.teaser}</p>
                      </div>
                    ))}
                    {solution.fullSolutionAnswer && (
                      <div className="final-answer-card">
                        <strong>Nihai Cevap:</strong>
                        <div className="final-math">
                          <SafeMath math={solution.fullSolutionAnswer} displayMode={true} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="paywall-locked-container">
                    {/* Blurred Mock Steps Underneath */}
                    <div className="blurred-steps-backdrop" aria-hidden="true">
                      {solution.lockedSteps.map((step) => (
                        <div key={step.stepNumber} className="step-card locked-placeholder">
                          <div className="step-header">
                            <span className="locked-step-badge">🔒 ADIM {step.stepNumber}</span>
                            <h3 className="step-title">{step.title}</h3>
                          </div>
                          <p className="step-explanation">{step.teaser}</p>
                          <div className="mock-blur-lines">
                            <div className="mock-line long" />
                            <div className="mock-line medium" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Paywall Overlay */}
                    <div className="paywall-overlay-card">
                      <div className="paywall-lock-badge">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>MatAI Pro ile Tüm Çözüm Adımlarını Aç</span>
                      </div>

                      <h4 className="paywall-title">
                        Kalan {solution.lockedSteps.length} Çözüm Adımı & Nihai Cevap Kilitli
                      </h4>
                      <p className="paywall-desc">
                        Sınavda tam puan almak için ara işlem adımlarını, çarpanlara ayırmayı, değişken dönüşümlerini ve sağlama kontrollerini inceleyin.
                      </p>

                      <div className="paywall-cta-group">
                        <a
                          href={POLAR_CHECKOUT_WEEKLY}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="paywall-btn-primary"
                        >
                          <span>Pro&apos;ya Geç — Adımları Aç</span>
                          <span className="paywall-price-pill">₺79&apos;dan başlayan fiyatlarla</span>
                        </a>

                        <a href="/activate" className="paywall-btn-secondary">
                          Zaten Pro Üye misiniz? Lisansı Etkinleştir →
                        </a>
                      </div>

                      <div className="paywall-guarantee-note">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z" />
                        </svg>
                        <span>Adil Çözüm Güvencesi • Güvenli Polar Ödeme • Anında Erişim</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile App Companion Bar */}
            <div className="mobile-companion-banner">
              <div className="companion-left">
                <div className="companion-tag">
                  <span className="camera-emoji">📸</span>
                  <span>SORU KİTAPTA VEYA DEFTERDE Mİ?</span>
                </div>
                <h4 className="companion-heading">
                  iPhone Kamerasını Soruya Tutun, 1 Saniyede Çözülsün
                </h4>
                <p className="companion-desc">
                  Karmaşık formülleri klavyeden yazmakla uğraşmayın. MatAI iOS uygulaması el yazısını ve kitap baskılarını anında tanır, fotoğraflı soruyu saniyeler içinde çözer.
                </p>
                <div className="companion-actions">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="appstore-badge-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <small>Hemen İndir</small>
                      <strong>App Store</strong>
                    </div>
                  </a>
                  <span className="companion-rating">
                    <span className="star-rating">★★★★★</span>
                    <span>4.9 Puan • Sınavlara Hazırlık</span>
                  </span>
                </div>
              </div>

              <div className="companion-right">
                <div className="companion-qr-card">
                  <Image
                    src={appQrCode}
                    alt="MatAI iOS İndirme QR Kodu"
                    width={110}
                    height={110}
                    className="qr-image"
                  />
                  <span>Kameranızla Tarayın</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: iPhone Camera Scanner Presentation */}
        {activeTab === 'camera' && (
          <div className="math-camera-guide">
            <div className="camera-guide-hero">
              <span className="camera-step-tag">MOBİL DENEYİM</span>
              <h3 className="camera-guide-title">
                Soru Fotoğrafını Çekin, Çözüm 1 Saniyede Gelsin
              </h3>
              <p className="camera-guide-subtitle">
                Defter, soru bankası, deneme sınavı veya tahta fotoğrafını MatAI&apos;a gösterin. Gelişmiş Vision AI matematik motorumuz soruyu algılasın.
              </p>
            </div>

            <div className="camera-steps-grid">
              <div className="camera-step-item">
                <div className="step-circle">1</div>
                <h4>Soruyu Çerçeveye Alın</h4>
                <p>Soruyu net bir ışık altında kameranızın vizörüne yerleştirin. İster tek soru, ister formül olsun.</p>
              </div>

              <div className="camera-step-item">
                <div className="step-circle">2</div>
                <h4>AI Metin ve Şekilleri Tanısın</h4>
                <p>MatAI OCR motoru köklü sayılar, integraller ve geometri şekillerini dahi kusursuz okur.</p>
              </div>

              <div className="camera-step-item">
                <div className="step-circle">3</div>
                <h4>Adım Adım Çözüm Cebinizde</h4>
                <p>Tüm çözüm basamakları, formül açıklamaları ve benzer pekiştirme soruları önünüze gelir.</p>
              </div>
            </div>

            <div className="camera-cta-container">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="camera-appstore-large-btn"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="btn-text">
                  <small>iOS Uygulamasını Hemen İndir</small>
                  <strong>App Store&apos;da Aç</strong>
                </div>
              </a>

              <div className="camera-qr-block">
                <Image
                  src={appQrCode}
                  alt="MatAI iOS QR Kodu"
                  width={130}
                  height={130}
                  className="qr-large"
                />
                <span>iPhone Kameranızla Tarayın</span>
              </div>
            </div>
          </div>
        )}

        {/* Global Privacy & Compliance Footer Disclaimer */}
        <div className="math-solver-legal-bar">
          <div className="legal-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="legal-text">
            <strong>Veri Gizliliği & Güvenlik Güvencesi:</strong> MatAI sorularınızı sıfır kişisel veri (Zero-PII) prensibiyle işler. KVKK, GDPR ve CCPA gizlilik standartlarına tam uyumludur. Matematik çözümleri eğitim ve pratik destek amaçlıdır.
          </p>
        </div>
      </div>
    </section>
  );
}
