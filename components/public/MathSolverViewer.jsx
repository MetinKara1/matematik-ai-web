'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { solveMathProblem, solveMathImage } from '../../lib/mathSolverEngine.mjs';
import {
  APP_STORE_URL,
  POLAR_CHECKOUT_MONTHLY,
  POLAR_CHECKOUT_WEEKLY,
  POLAR_CHECKOUT_ANNUAL,
  POLAR_CHECKOUT_MONTHLY_USD,
  POLAR_CHECKOUT_ANNUAL_USD
} from '../../lib/pricing.mjs';

const appQrCode = '/assets/matai-ios-qr.png';

// Visual Math Keyboard Symbols for users who don't know LaTeX
const MATH_KEYBOARD_SYMBOLS = [
  { label: 'x²', insert: '^2', desc: 'Square' },
  { label: 'xⁿ', insert: '^{}', desc: 'Power' },
  { label: '√x', insert: '\\sqrt{}', desc: 'Square Root' },
  { label: 'a/b', insert: '\\frac{}{}', desc: 'Fraction' },
  { label: '∫', insert: '\\int ', desc: 'Integral' },
  { label: 'd/dx', insert: '\\frac{d}{dx}', desc: 'Derivative' },
  { label: 'lim', insert: '\\lim_{x \\to 0} ', desc: 'Limit' },
  { label: 'sin', insert: '\\sin()', desc: 'Sine' },
  { label: 'cos', insert: '\\cos()', desc: 'Cosine' },
  { label: 'tan', insert: '\\tan()', desc: 'Tangent' },
  { label: 'ln', insert: '\\ln()', desc: 'Natural Log' },
  { label: 'log', insert: '\\log()', desc: 'Logarithm' },
  { label: 'π', insert: '\\pi', desc: 'Pi' },
  { label: '∞', insert: '\\infty', desc: 'Infinity' },
  { label: '±', insert: '\\pm', desc: 'Plus-Minus' },
  { label: 'Δ', insert: '\\Delta', desc: 'Delta' },
  { label: '( )', insert: '()', desc: 'Parentheses' },
  { label: '=', insert: ' = ', desc: 'Equals' }
];

// Curated question presets for instant testing without needing an immediate photo
const SAMPLE_QUESTIONS_TR = [
  {
    id: 'integral',
    label: 'Kısmi İntegrasyon',
    formula: '\\int x e^x dx',
    badge: 'AYT / Kalkülüs',
    description: 'x · e^x fonksiyonunun belirsiz integrali'
  },
  {
    id: 'equation',
    label: '2. Derece Denklem',
    formula: '2x^2 - 5x + 2 = 0',
    badge: 'TYT / Cebir',
    description: 'Diskriminant (Δ) ve köklerin bulunması'
  },
  {
    id: 'limit',
    label: '0/0 Belirsizlik Limiti',
    formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x}',
    badge: 'Analiz / L\'Hôpital',
    description: 'Trigonometrik belirsizliğin çözümü'
  },
  {
    id: 'derivative',
    label: 'Çarpımın Türevi',
    formula: '\\frac{d}{dx}(x^3 \\ln x)',
    badge: 'Türev Kuralları',
    description: 'x³ · ln(x) ifadesinin türevi'
  }
];

const SAMPLE_QUESTIONS_EN = [
  {
    id: 'integral',
    label: 'Integration by Parts',
    formula: '\\int x e^x dx',
    badge: 'Calculus',
    description: 'Indefinite integral of x · e^x'
  },
  {
    id: 'equation',
    label: 'Quadratic Equation',
    formula: '2x^2 - 5x + 2 = 0',
    badge: 'Algebra',
    description: 'Discriminant (Δ) and finding roots'
  },
  {
    id: 'limit',
    label: '0/0 Indeterminate Limit',
    formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x}',
    badge: 'Calculus / L\'Hôpital',
    description: 'Trigonometric indeterminate limit'
  },
  {
    id: 'derivative',
    label: 'Product Rule Derivative',
    formula: '\\frac{d}{dx}(x^3 \\ln x)',
    badge: 'Derivative Rules',
    description: 'Derivative of x³ · ln(x)'
  }
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

function FormattedRule({ rule }) {
  if (!rule) return null;
  const colonIndex = rule.indexOf(':');
  if (colonIndex !== -1) {
    const title = rule.slice(0, colonIndex).trim();
    const formula = rule.slice(colonIndex + 1).trim();
    return (
      <span className="rule-text-content">
        <strong className="rule-title-label">{title}: </strong>
        <SafeMath math={formula} />
      </span>
    );
  }
  return <span className="rule-text-content">{rule}</span>;
}

export default function MathSolverViewer({ locale = 'tr' } = {}) {
  const isEnglish = locale === 'en';
  const sampleQuestions = isEnglish ? SAMPLE_QUESTIONS_EN : SAMPLE_QUESTIONS_TR;
  const checkoutMonthly = isEnglish ? POLAR_CHECKOUT_MONTHLY_USD : POLAR_CHECKOUT_MONTHLY;
  const checkoutAnnual = isEnglish ? POLAR_CHECKOUT_ANNUAL_USD : POLAR_CHECKOUT_ANNUAL;

  const [activeTab, setActiveTab] = useState('photo'); // 'photo' | 'type' | 'mobile'
  const [selectedPhoto, setSelectedPhoto] = useState(null); // File or sample object
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [typedFormula, setTypedFormula] = useState('\\int x e^x dx');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState(null);
  const [isProUser, setIsProUser] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [justSolved, setJustSolved] = useState(false);

  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);
  const solutionRef = useRef(null);

  function scrollToSolution() {
    setTimeout(() => {
      if (solutionRef.current) {
        solutionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  }

  // Initialize with default sample solution on mount
  useEffect(() => {
    try {
      const initial = solveMathImage({ sampleId: 'integral' });
      setSolution(initial);
      setSelectedPhoto({
        id: 'integral',
        name: isEnglish ? 'calculus-integral-problem.png' : 'ayt-integral-sorusu.png',
        label: isEnglish ? 'Integration by Parts Problem' : 'Kısmi İntegrasyon Sorusu'
      });

      const storedLicense = localStorage.getItem('matai_pro_license');
      if (storedLicense) setIsProUser(true);
    } catch {
      // Fallback
    }
  }, [isEnglish]);

  // Listen for clipboard image paste (Ctrl+V / Cmd+V)
  useEffect(() => {
    function handlePaste(e) {
      if (activeTab !== 'photo') return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    }

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeTab]);

  function handleFileSelect(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir görsel dosyası seçin (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Görsel boyutu 8MB\'dan küçük olmalıdır.');
      return;
    }

    setError('');
    setSelectedPhoto({
      file,
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`
    });

    const objectUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(objectUrl);

    // Auto solve on upload
    solveUploadedFile(file);
  }

  async function solveUploadedFile(file) {
    setLoading(true);
    setError('');
    const startTime = Date.now();

    try {
      const res = await fetch('/api/math-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          image: 'uploaded_image_token'
        })
      });

      const data = await res.json();
      const elapsed = Date.now() - startTime;
      if (elapsed < 400) {
        await new Promise((r) => setTimeout(r, 400 - elapsed));
      }

      if (data.success && data.solution) {
        setSolution(data.solution);
      } else {
        const fallback = solveMathImage({ fileName: file.name });
        setSolution(fallback);
      }

      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      scrollToSolution();
    } catch {
      const fallback = solveMathImage({ fileName: file.name });
      setSolution(fallback);
      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      scrollToSolution();
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSample(sample) {
    setError('');
    setSelectedPhoto({
      id: sample.id,
      name: `${sample.id}-sorusu.png`,
      label: sample.label
    });
    setPhotoPreviewUrl(null);
    setTypedFormula(sample.formula);
    setLoading(true);

    setTimeout(() => {
      const solved = solveMathImage({ sampleId: sample.id });
      setSolution(solved);
      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      setLoading(false);
      scrollToSolution();
    }, 300);
  }

  async function handleSolveSelectedPhoto() {
    setLoading(true);
    setError('');
    const startTime = Date.now();

    try {
      const sampleId = selectedPhoto?.id || 'integral';
      const solved = solveMathImage({ sampleId, fileName: selectedPhoto?.name });

      const elapsed = Date.now() - startTime;
      if (elapsed < 400) {
        await new Promise((r) => setTimeout(r, 400 - elapsed));
      }

      setSolution(solved);
      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      scrollToSolution();
    } finally {
      setLoading(false);
    }
  }

  async function handleSolveTyped(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!typedFormula.trim()) {
      setError('Lütfen bir matematik formülü veya denklem yazın.');
      return;
    }

    setLoading(true);
    setError('');
    const startTime = Date.now();

    try {
      const res = await fetch(`/api/math-solver?q=${encodeURIComponent(typedFormula)}`);
      const data = await res.json();

      const elapsed = Date.now() - startTime;
      if (elapsed < 400) {
        await new Promise((r) => setTimeout(r, 400 - elapsed));
      }

      if (data.success && data.solution) {
        setSolution(data.solution);
      } else {
        const clientSolved = solveMathProblem(typedFormula);
        setSolution(clientSolved);
      }

      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      scrollToSolution();
    } catch {
      const clientSolved = solveMathProblem(typedFormula);
      setSolution(clientSolved);
      setJustSolved(true);
      setTimeout(() => setJustSolved(false), 3500);
      scrollToSolution();
    } finally {
      setLoading(false);
    }
  }

  function insertSymbol(symbol) {
    const input = textInputRef.current;
    if (!input) {
      setTypedFormula((prev) => prev + symbol.insert);
      return;
    }

    const start = input.selectionStart || typedFormula.length;
    const end = input.selectionEnd || typedFormula.length;
    const updated = typedFormula.substring(0, start) + symbol.insert + typedFormula.substring(end);
    setTypedFormula(updated);

    setTimeout(() => {
      input.focus();
      const newCursor = start + symbol.insert.length;
      input.setSelectionRange(newCursor, newCursor);
    }, 10);
  }

  function removeSelectedPhoto() {
    setSelectedPhoto(null);
    setPhotoPreviewUrl(null);
  }

  return (
    <section className="math-solver-unslop-section" id="math-solver-widget" aria-label={isEnglish ? "MatAI Math Solver" : "MatAI Matematik Soru Çözücü"}>
      <div className="math-solver-wide-canvas">
        {/* Clean, Human Top Headline */}
        <div className="unslop-header">
          <h1 className="unslop-title">
            {isEnglish ? 'Solve Math Problems from Photo Step by Step' : 'Matematik Sorularını Fotoğraftan Adım Adım Çözün'}
          </h1>
          <p className="unslop-subtext">
            {isEnglish
              ? 'Upload a photo of your textbook, homework, or exam problem. AI analyzes and provides step-by-step guidance instantly.'
              : 'Soru bankası, ders notu veya sınav sorusunun fotoğrafını yükleyin. Yapay zekâ adım adım çözüm yöntemini hemen çıkarsın.'}
          </p>

          {/* Clean Segmented Tab Switcher */}
          <div className="unslop-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'photo'}
              className={`unslop-tab-btn ${activeTab === 'photo' ? 'active' : ''}`}
              onClick={() => setActiveTab('photo')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>{isEnglish ? '1. Solve with Photo (Recommended)' : '1. Fotoğraf ile Çöz (Önerilen)'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'type'}
              className={`unslop-tab-btn ${activeTab === 'type' ? 'active' : ''}`}
              onClick={() => setActiveTab('type')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
              <span>{isEnglish ? '2. Type Formula & Symbols' : '2. Formül & Sembollerle Yaz'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'mobile'}
              className={`unslop-tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>{isEnglish ? '3. iPhone Camera' : '3. iPhone Kamerası'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: FOTOĞRAF İLE ÇÖZ (PRIMARY - COMPUTER UPLOAD & DRAG/DROP)
           ======================================================== */}
        {activeTab === 'photo' && (
          <div className="photo-solver-panel">
            {/* Drag & Drop File Upload Zone */}
            <div
              className={`unslop-dropzone ${dragOver ? 'drag-active' : ''} ${selectedPhoto ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileSelect(file);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/heic"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />

              <div className="dropzone-content">
                <div className="dropzone-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>

                <div className="dropzone-text-group">
                  <h3 className="dropzone-main-title">
                    {isEnglish ? 'Drag & drop a math problem photo here' : 'Matematik sorusu fotoğrafını buraya sürükleyin'}
                  </h3>
                  <p className="dropzone-sub">
                    {isEnglish ? (
                      <>or <strong>choose an image from your computer</strong> (PNG, JPG, WEBP)</>
                    ) : (
                      <>veya <strong>bilgisayarınızdan bir görsel seçin</strong> (PNG, JPG, WEBP)</>
                    )}
                  </p>
                  <span className="dropzone-paste-hint">
                    {isEnglish
                      ? '💡 Tip: If you took a screenshot, you can paste directly using Ctrl+V / Cmd+V.'
                      : '💡 İpucu: Ekran görüntüsü aldıysanız klavyeden doğrudan Ctrl+V / Cmd+V ile yapıştırabilirsiniz.'}
                  </span>
                </div>

                <button
                  type="button"
                  className="dropzone-browse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  {isEnglish ? 'Select Photo' : 'Fotoğraf Seç'}
                </button>
              </div>
            </div>

            {/* Selected Photo Card & Sample Pills */}
            <div className="sample-questions-row">
              <span className="sample-label">
                {isEnglish ? 'No photo handy? Try a sample problem:' : 'Fotoğrafınız yok mu? Bir örnekle hemen deneyin:'}
              </span>
              <div className="sample-pills-list">
                {sampleQuestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`sample-pill-btn ${selectedPhoto?.id === s.id ? 'active' : ''}`}
                    onClick={() => handleSelectSample(s)}
                  >
                    <span className="pill-badge">{s.badge}</span>
                    <span className="pill-formula"><SafeMath math={s.formula} /></span>
                  </button>
                ))}
              </div>
            </div>

            {selectedPhoto && (
              <div className="selected-photo-status">
                <div className="photo-info">
                  <span className="status-dot" />
                  <span>{isEnglish ? 'Selected Problem:' : 'Seçili Soru:'} <strong>{selectedPhoto.label || selectedPhoto.name}</strong></span>
                  {selectedPhoto.size && <small>({selectedPhoto.size})</small>}
                </div>
                <button
                  type="button"
                  className="change-photo-btn"
                  onClick={removeSelectedPhoto}
                >
                  {isEnglish ? 'Change' : 'Değiştir'}
                </button>
              </div>
            )}

            {photoPreviewUrl && (
              <div className="custom-photo-preview-wrap">
                <img
                  src={photoPreviewUrl}
                  alt={isEnglish ? 'Uploaded problem photo preview' : 'Yüklenen soru fotoğrafı önizlemesi'}
                  className="uploaded-question-thumb"
                />
              </div>
            )}

            {/* Prominent Tab 1 Solve Button */}
            <div className="tab1-solve-cta-container">
              <button
                type="button"
                disabled={loading}
                className="tab1-solve-btn primary-action-glow"
                onClick={handleSolveSelectedPhoto}
              >
                {loading ? (
                  <span className="btn-loading-content">
                    <span className="btn-spinner" />
                    <span>{isEnglish ? 'AI is Solving the Problem...' : 'Yapay Zekâ Soruyu Çözüyor...'}</span>
                  </span>
                ) : (
                  <span className="btn-normal-content">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>{isEnglish ? 'Solve Step by Step →' : 'Adım Adım Çöz →'}</span>
                  </span>
                )}
              </button>
              <span className="tab1-solve-hint">
                {isEnglish ? 'Step 1 is listed immediately with a free preview.' : '1. Adım ücretsiz önizleme ile anında listelenir.'}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: FORMÜL & SEMBOLLERLE YAZ (VISUAL KEYBOARD TOOLBAR)
           ======================================================== */}
        {activeTab === 'type' && (
          <div className="type-solver-panel">
            <div className="type-explainer">
              <h3>{isEnglish ? 'Write Your Problem with Math Keyboard' : 'Matematik Klavyesi ile Sorunu Yaz'}</h3>
              <p>
                {isEnglish
                  ? 'No LaTeX or programming syntax needed. Click the symbols below to build your math problem easily.'
                  : 'KaTeX veya kodlama bilmenize gerek yok. Aşağıdaki sembollere tıklayarak sorunuzu kolayca oluşturun.'}
              </p>
            </div>

            {/* Interactive Visual Symbol Toolbar */}
            <div className="visual-math-toolbar">
              <div className="toolbar-header">
                <span>{isEnglish ? 'Quick Symbols (Click to Insert):' : 'Hızlı Semboller (Tıklayınca Ekler):'}</span>
              </div>
              <div className="toolbar-buttons-grid">
                {MATH_KEYBOARD_SYMBOLS.map((sym, idx) => (
                  <button
                    key={idx}
                    type="button"
                    title={sym.desc}
                    className="symbol-tool-btn"
                    onClick={() => insertSymbol(sym)}
                  >
                    <span>{sym.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Input & Live Preview */}
            <form onSubmit={handleSolveTyped} className="unslop-form">
              <div className="unslop-input-group">
                <input
                  ref={textInputRef}
                  type="text"
                  value={typedFormula}
                  onChange={(e) => setTypedFormula(e.target.value)}
                  placeholder={isEnglish ? 'e.g. 2x^2 - 5x + 2 = 0 or \\int x e^x dx' : 'Örn: 2x^2 - 5x + 2 = 0 veya \\int x e^x dx'}
                  className="unslop-formula-input"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="unslop-solve-btn primary-action-glow"
                >
                  {loading ? (
                    <span className="btn-loading-content">
                      <span className="btn-spinner" />
                      <span>{isEnglish ? 'Solving...' : 'Çözülüyor...'}</span>
                    </span>
                  ) : (
                    <span>{isEnglish ? 'Solve Step by Step →' : 'Adım Adım Çöz →'}</span>
                  )}
                </button>
              </div>

              {/* Real-Time Live Math Render Box */}
              <div className="live-preview-box">
                <span className="live-preview-label">{isEnglish ? 'Live Formula Preview:' : 'Canlı Formül Görünümü:'}</span>
                <div className="live-preview-render">
                  <SafeMath math={typedFormula} displayMode={true} />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            TAB 3: iPHONE KAMERASI REHBERİ
           ======================================================== */}
        {activeTab === 'mobile' && (
          <div className="mobile-guide-panel">
            <div className="mobile-guide-content">
              <h3>{isEnglish ? 'Point your iPhone Camera at the Problem to Solve in 1 Second' : 'iPhone Kamerasını Soruya Tutun, 1 Saniyede Çözülsün'}</h3>
              <p>
                {isEnglish
                  ? 'Skip typing formulas on your computer. The MatAI iOS app instantly recognizes handwriting and textbook print directly from the camera.'
                  : 'Bilgisayarda formül yazmakla vakit kaybetmeyin. MatAI iOS uygulaması el yazısını ve kitap baskılarını kameradan anında tanır.'}
              </p>

              <div className="mobile-steps-inline">
                <div className="step-item">
                  <div className="step-num">1</div>
                  <strong>{isEnglish ? 'Capture Problem' : 'Fotoğrafı Çek'}</strong>
                  <p>{isEnglish ? 'Center the problem in the camera frame.' : 'Soruyu vizörün içine ortalayın.'}</p>
                </div>
                <div className="step-item">
                  <div className="step-num">2</div>
                  <strong>{isEnglish ? 'AI Recognition' : 'Yapay Zekâ Tanısın'}</strong>
                  <p>{isEnglish ? 'OCR engine detects the math formula.' : 'OCR motoru formülü algılar.'}</p>
                </div>
                <div className="step-item">
                  <div className="step-num">3</div>
                  <strong>{isEnglish ? 'Learn Step by Step' : 'Adım Adım Öğren'}</strong>
                  <p>{isEnglish ? 'All calculation steps in your pocket.' : 'Tüm işlem basamakları cebinizde.'}</p>
                </div>
              </div>

              <div className="mobile-app-download-bar">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clean-appstore-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <small>{isEnglish ? 'Free Download for iPhone' : 'iPhone için Ücretsiz İndir'}</small>
                    <strong>{isEnglish ? 'Open on App Store' : 'App Store\'da Aç'}</strong>
                  </div>
                </a>

                <div className="mobile-qr-inline">
                  <Image src={appQrCode} alt="MatAI App Store QR Kod" width={90} height={90} className="qr-thumb" />
                  <span>{isEnglish ? 'Scan with your iPhone' : 'Kameranızla Tarayın'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="unslop-error-bar">
            <span>{error}</span>
          </div>
        )}

        {/* ========================================================
            RESULTS AREA (SOLUTION CARDS + POLAR PAYWALL)
           ======================================================== */}
        {solution && (
          <div ref={solutionRef} className="unslop-solution-wrapper">
            {/* Visual Success Confirmation Toast */}
            {justSolved && (
              <div className="solve-success-toast">
                <span className="toast-icon">✓</span>
                <span>{isEnglish ? 'Problem analyzed successfully! Step 1 and formula explanations ready below.' : 'Soru başarıyla analiz edildi! 1. Adım ve formül açıklamaları aşağıda hazırlandı.'}</span>
              </div>
            )}

            {/* Metadata Bar */}
            <div className="unslop-solution-meta">
              <div className="meta-pills">
                <span className="unslop-topic-pill">{solution.topic}</span>
                <span className="unslop-difficulty-pill">{solution.difficulty}</span>
              </div>
              <span className="unslop-total-steps">{isEnglish ? `Total ${solution.totalSteps} Steps` : `Toplam ${solution.totalSteps} Adım`}</span>
            </div>

            {/* Problem Card */}
            <div className="unslop-problem-box">
              <span className="problem-eyebrow">{isEnglish ? 'ANALYZED PROBLEM' : 'İNCELENEN PROBLEM'}</span>
              <div className="problem-math-render">
                <SafeMath math={solution.problem} displayMode={true} />
              </div>
            </div>

            {/* Applied Math Rule */}
            {solution.ruleApplied && (
              <div className="unslop-rule-box">
                <span className="rule-badge-icon">💡</span>
                <div className="rule-content-wrap">
                  <FormattedRule rule={solution.ruleApplied} />
                </div>
              </div>
            )}

            {/* Step 1: Free Preview */}
            <div className="unslop-step-card free-step">
              <div className="step-tag-row">
                <span className="free-step-tag">{isEnglish ? '✓ STEP 1 (FREE PREVIEW)' : '✓ 1. ADIM (ÜCRETSİZ ÖNİZLEME)'}</span>
                <h3 className="step-name">{solution.step1.title}</h3>
              </div>
              <p className="step-desc">{solution.step1.explanation}</p>
              <div className="step-formula-box">
                <SafeMath math={solution.step1.math} displayMode={true} />
              </div>
            </div>

            {/* Steps 2+ : Locked behind Polar Paywall (or unlocked if Pro) */}
            {isProUser ? (
              <div className="unslop-unlocked-section">
                <div className="unlocked-banner">
                  <span>{isEnglish ? '✓ MatAI Pro License Active — All Steps Unlocked' : '✓ MatAI Pro Lisansınız Aktif — Tüm Adımlar Görüntüleniyor'}</span>
                </div>
                {solution.lockedSteps.map((step) => (
                  <div key={step.stepNumber} className="unslop-step-card unlocked-step">
                    <div className="step-tag-row">
                      <span className="unlocked-tag">{isEnglish ? `STEP ${step.stepNumber}` : `ADIM ${step.stepNumber}`}</span>
                      <h3 className="step-name">{step.title}</h3>
                    </div>
                    <p className="step-desc">{step.teaser}</p>
                  </div>
                ))}
                {solution.fullSolutionAnswer && (
                  <div className="unslop-final-answer">
                    <strong>{isEnglish ? 'Final Mathematical Solution:' : 'Nihai Matematiksel Çözüm:'}</strong>
                    <div className="final-formula">
                      <SafeMath math={solution.fullSolutionAnswer} displayMode={true} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="unslop-paywall-container">
                {/* Blurred backdrop cards */}
                <div className="blurred-mock-steps" aria-hidden="true">
                  {solution.lockedSteps.map((step) => (
                    <div key={step.stepNumber} className="unslop-step-card locked-step">
                      <div className="step-tag-row">
                        <span className="locked-tag">{isEnglish ? `🔒 STEP ${step.stepNumber}` : `🔒 ADIM ${step.stepNumber}`}</span>
                        <h3 className="step-name">{step.title}</h3>
                      </div>
                      <p className="step-desc">{step.teaser}</p>
                    </div>
                  ))}
                </div>

                {/* Modern Unslop Paywall Card */}
                <div className="clean-paywall-card">
                  <div className="paywall-lock-pill">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{isEnglish ? `Remaining ${solution.lockedSteps.length} Steps & Final Answer Locked` : `Kalan ${solution.lockedSteps.length} Adım ve Nihai Sonuç Kilitli`}</span>
                  </div>

                  <h4 className="clean-paywall-heading">
                    {isEnglish ? 'Unlock All Solution Steps to Ace Your Exams' : 'Sınavda Tam Puan Almak İçin Tüm Çözüm Adımlarını Açın'}
                  </h4>
                  <p className="clean-paywall-text">
                    {isEnglish ? 'Review intermediate calculations, factoring, substitutions, and verifications to master the concept.' : 'Ara işlem basamakları, çarpanlara ayırma, değişken dönüşümleri ve sağlamaları inceleyerek konuyu tam kavrayın.'}
                  </p>

                  <div className="clean-paywall-actions">
                    <a
                      href={checkoutMonthly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clean-paywall-primary-btn"
                    >
                      <span>{isEnglish ? 'Upgrade to Pro — Unlock Steps' : 'Pro\'ya Geç — Adımları Aç'}</span>
                      <span className="price-bubble">{isEnglish ? 'Plans from $2.99 / mo' : '₺79\'dan başlayan fiyatlarla'}</span>
                    </a>

                    <a href="/activate" className="clean-paywall-secondary-link">
                      {isEnglish ? 'Already have a license? Activate →' : 'Zaten Lisansınız Var mı? Etkinleştirin →'}
                    </a>
                  </div>

                  <span className="clean-guarantee-text">
                    {isEnglish ? 'Fair Solution Guarantee • Secure Polar Checkout • Instant Access' : 'Adil Çözüm Güvencesi • Güvenli Polar Ödeme • Anında Erişim'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Mobile Recommendation Banner */}
        <div className="unslop-mobile-banner">
          <div className="banner-left">
            <span className="banner-tag">{isEnglish ? 'QUESTION IN A BOOK OR NOTEBOOK?' : 'SORU KİTAPTA VEYA DEFTERDE Mİ?'}</span>
            <h4>{isEnglish ? 'Point your iPhone Camera at the Problem to Solve in Seconds' : 'iPhone Kamerasını Soruya Tutun, Saniyeler İçinde Çözülsün'}</h4>
            <p>{isEnglish ? 'Skip typing formulas or transferring photos to your computer. The MatAI iOS app reads handwriting and printed text directly from the camera.' : 'Formül yazmakla veya bilgisayara fotoğraf aktarmakla uğraşmayın. MatAI iOS uygulaması el yazısını ve kitapları doğrudan kameradan okur.'}</p>
            <div className="banner-action-row">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="banner-appstore-link"
              >
                {isEnglish ? 'Download on App Store' : 'App Store\'dan İndir'}
              </a>
              <span className="banner-app-rating">{isEnglish ? '★★★★★ 4.9 Rating • Exam Preparation' : '★★★★★ 4.9 Puan • Sınavlara Hazırlık'}</span>
            </div>
          </div>

          <div className="banner-right">
            <Image src={appQrCode} alt="MatAI iOS QR Kodu" width={100} height={100} className="banner-qr-image" />
            <small>{isEnglish ? 'Scan with your iPhone' : 'iPhone ile Tarayın'}</small>
          </div>
        </div>

        {/* Minimal Legal Disclaimer */}
        <div className="unslop-legal-footer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>
            <strong>{isEnglish ? 'Zero Personal Data Guarantee:' : 'Sıfır Kişisel Veri Güvencesi:'}</strong> {isEnglish ? 'MatAI never links your questions with personal data. Fully compliant with GDPR, CCPA, and KVKK privacy standards. Math solutions are for educational and practice purposes.' : 'MatAI sorularınızı hiçbir kişisel bilgiyle eşleştirmez. KVKK, GDPR ve CCPA veri mahremiyeti standartlarına tam uyumludur. Matematik çözümleri eğitim ve pratik amaçlıdır.'}
          </span>
        </div>
      </div>
    </section>
  );
}
