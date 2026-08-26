import Link from 'next/link';

export default function PublicFooter({ locale = 'tr' }) {
  const isEnglish = locale === 'en';
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div><strong>MatAI</strong><p>{isEnglish ? 'An AI-powered learning platform that helps you understand mathematics step by step.' : 'Matematiği adım adım anlamaya yardımcı olan yapay zekâ destekli eğitim platformu.'}</p></div>
        <nav aria-label={isEnglish ? 'Footer navigation' : 'Kurumsal bağlantılar'}>
          {isEnglish ? <>
            <Link href="/en/ai-math-solver">AI Math Solver</Link>
            <Link href="/en/articles">Articles</Link>
            <Link href="/">Türkçe</Link>
          </> : <>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/icerik-politikasi">İçerik Politikası</Link>
            <Link href="/makaleler">Makaleler</Link>
          </>}
        </nav>
      </div>
      <p className="public-footer-copy">© 2026 MatAI. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
    </footer>
  );
}
