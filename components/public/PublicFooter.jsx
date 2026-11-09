import Link from 'next/link';

export default function PublicFooter({ locale = 'tr' }) {
  const isEnglish = locale === 'en';
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div><strong>MatAI</strong><p>{isEnglish ? 'An AI-powered learning platform that helps you understand mathematics step by step.' : 'Matematiği adım adım anlamaya yardımcı olan yapay zekâ destekli eğitim platformu.'}</p><div className="public-footer-social" aria-label={isEnglish ? 'Social media channels' : 'Sosyal medya kanalları'}><a href="https://www.instagram.com/matai.app" target="_blank" rel="noopener noreferrer" className="social-pill social-pill-instagram" aria-label="MatAI Instagram (@matai.app)"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg><span>Instagram · @matai.app</span></a><a href="https://www.youtube.com/@mataiapp" target="_blank" rel="noopener noreferrer" className="social-pill social-pill-youtube" aria-label="MatAI YouTube (@mataiapp)"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg><span>YouTube · @mataiapp</span></a></div></div>
        <nav aria-label={isEnglish ? 'Footer navigation' : 'Kurumsal bağlantılar'}>
          {isEnglish ? <>
            <Link href="/en/ai-math-solver">AI Math Solver</Link>
            <Link href="/en/articles">Articles</Link>
            <Link href="/">Türkçe</Link>
          </> : <>
            <Link href="/instagram">Instagram Soru Çözümleri</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/icerik-politikasi">İçerik Politikası</Link>
            <Link href="/konular">Konu Merkezleri</Link>
            <Link href="/makaleler">Makaleler</Link>
            <Link href="/araclar">Matematik Araçları</Link>
            <Link href="/kaynaklar">Çalışma Kağıtları</Link>
          </>}
        </nav>
      </div>
      <p className="public-footer-copy">© 2026 MatAI. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
    </footer>
  );
}
