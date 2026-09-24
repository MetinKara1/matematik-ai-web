'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ErrorState({ status = 500, reset }) {
  const pathname = usePathname();
  const isEnglish = pathname === '/en' || pathname?.startsWith('/en/');
  const isNotFound = status === 404;
  const copy = isEnglish
    ? {
        eyebrow: isNotFound ? 'Page not found' : 'Something went wrong',
        title: isNotFound ? 'This page does not exist.' : 'We could not open this page.',
        description: isNotFound
          ? 'The address may be incorrect, or the page may have moved.'
          : 'A temporary problem occurred. You can try again or return to the home page.',
        home: 'Return home', retry: 'Try again', articles: 'Browse articles',
      }
    : {
        eyebrow: isNotFound ? 'Sayfa bulunamadı' : 'Bir sorun oluştu',
        title: isNotFound ? 'Aradığınız sayfa burada değil.' : 'Bu sayfayı şu anda açamadık.',
        description: isNotFound
          ? 'Adres hatalı olabilir veya sayfa başka bir konuma taşınmış olabilir.'
          : 'Geçici bir sorun oluştu. Yeniden deneyebilir veya ana sayfaya dönebilirsiniz.',
        home: 'Ana sayfaya dön', retry: 'Yeniden dene', articles: 'Makalelere göz at',
      };
  const homeHref = isEnglish ? '/en' : '/';
  const articlesHref = isEnglish ? '/en/articles' : '/makaleler';

  return <main className="error-page">
    <section className="error-card" aria-labelledby="error-title">
      <Link href={homeHref} className="error-brand" aria-label={isEnglish ? 'MatAI home' : 'MatAI ana sayfa'}>
        <img src="/assets/MatAI-logo.png" alt="" />
        <span>MatAI</span>
      </Link>
      <div className="error-code" aria-hidden="true">{status}</div>
      <span className="error-eyebrow">{copy.eyebrow}</span>
      <h1 id="error-title">{copy.title}</h1>
      <p>{copy.description}</p>
      <div className="error-actions">
        <Link href={homeHref} className="error-primary">{copy.home}</Link>
        {reset
          ? <button type="button" className="error-secondary" onClick={reset}>{copy.retry}</button>
          : <Link href={articlesHref} className="error-secondary">{copy.articles}</Link>}
      </div>
    </section>
  </main>;
}
