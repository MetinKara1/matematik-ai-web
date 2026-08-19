import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div><strong>MatAI</strong><p>Matematiği adım adım anlamaya yardımcı olan yapay zekâ destekli eğitim platformu.</p></div>
        <nav aria-label="Kurumsal bağlantılar">
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/icerik-politikasi">İçerik Politikası</Link>
          <Link href="/makaleler">Makaleler</Link>
        </nav>
      </div>
      <p className="public-footer-copy">© 2026 MatAI. Tüm hakları saklıdır.</p>
    </footer>
  );
}
