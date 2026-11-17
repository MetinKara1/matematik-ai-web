'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export default function ActivatePage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'activating' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const existing = localStorage.getItem('matai_pro_license');
    if (existing) {
      setActiveKey(existing);
      setStatus('success');
      setMessage('Bu tarayıcıda aktif bir MatAI Pro lisansı bulunmaktadır.');
    }
  }, []);

  function handleActivate(e) {
    e.preventDefault();
    const cleanKey = licenseKey.trim().toUpperCase();

    if (!cleanKey) {
      setStatus('error');
      setMessage('Lütfen Polar satın alma e-postanızdaki lisans anahtarını girin.');
      return;
    }

    if (cleanKey.length < 8) {
      setStatus('error');
      setMessage('Lisans anahtarı en az 8 karakter olmalıdır.');
      return;
    }

    setStatus('activating');

    // Simulate instant local zero-PII activation
    setTimeout(() => {
      localStorage.setItem('matai_pro_license', cleanKey);
      setActiveKey(cleanKey);
      setStatus('success');
      setMessage('Tebrikler! MatAI Pro lisansınız başarıyla etkinleştirildi. Artık tüm çözüm adımlarına erişebilirsiniz.');
    }, 400);
  }

  function handleDeactivate() {
    localStorage.removeItem('matai_pro_license');
    setActiveKey(null);
    setStatus('idle');
    setLicenseKey('');
    setMessage('Lisans bu tarayıcıdan başarıyla kaldırıldı.');
  }

  return (
    <div className="landing-page">
      <PublicHeader languageHref="/en" />

      <main className="trust-page" style={{ background: '#f7f6fb', minHeight: '80vh', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', background: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 20px 50px rgba(45, 35, 102, 0.08)', border: '1px solid #e6e2ef' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6366f1', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              POLAR LİSANS YÖNETİMİ
            </span>
            <h1 style={{ fontSize: '1.85rem', color: '#1f1a3a', margin: '0.5rem 0 0.8rem', fontWeight: 850 }}>
              MatAI Pro Lisansını Etkinleştir
            </h1>
            <p style={{ color: '#645d7a', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Polar üzerinden satın aldığınız lisans anahtarını girerek bu tarayıcıda sınırsız ve tüm adımlı matematik çözümlerini açın.
            </p>
          </div>

          {status === 'success' && activeKey ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
              <h3 style={{ color: '#166534', fontSize: '1.15rem', fontWeight: 750, margin: '0 0 0.5rem' }}>
                MatAI Pro Aktif
              </h3>
              <p style={{ color: '#15803d', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {message}
              </p>
              <div style={{ fontFamily: 'monospace', background: '#dcfce7', padding: '0.5rem 1rem', borderRadius: '8px', display: 'inline-block', fontSize: '0.9rem', color: '#14532d', marginBottom: '1.5rem' }}>
                {activeKey.slice(0, 4)}••••••••{activeKey.slice(-4)}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/#math-solver-widget"
                  style={{ background: '#4f46e5', color: '#fff', padding: '0.7rem 1.4rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  Soru Çözücüye Git →
                </Link>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  style={{ background: '#fff', border: '1px solid #f87171', color: '#dc2626', padding: '0.7rem 1.2rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Lisansı Kaldır
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '0.85rem 1rem', color: '#b91c1c', fontSize: '0.88rem' }}>
                  {message}
                </div>
              )}

              <div>
                <label htmlFor="license-input" style={{ display: 'block', fontWeight: 700, color: '#312a55', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  Polar Lisans Anahtarınız
                </label>
                <input
                  id="license-input"
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Örn: POLAR-MATAI-XXXX-XXXX"
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #d4cde2', borderRadius: '12px', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'activating'}
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', padding: '0.9rem', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                {status === 'activating' ? 'Doğrulanıyor...' : 'Lisansı Etkinleştir'}
              </button>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.2rem', fontSize: '0.85rem', color: '#7a7391', lineHeight: '1.6' }}>
                <strong>Lisans anahtarımı nerede bulabilirim?</strong>
                <p style={{ margin: '0.3rem 0 0' }}>
                  Polar üzerinden satın alma yaptığınızda e-posta adresinize gelen onay makbuzunun içinde lisans anahtarınız yer alır. Henüz lisansınız yoksa{' '}
                  <Link href="/#pricing" style={{ color: '#4f46e5', fontWeight: 700 }}>
                    fiyatlandırma planlarını inceleyin
                  </Link>.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
