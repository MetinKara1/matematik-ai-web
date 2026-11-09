import Link from 'next/link';
import Image from 'next/image';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import { instagramQuestions } from '../../lib/instagramQuestions.mjs';
import './instagram.css';

export const metadata = {
  title: 'Instagram Soru Çözümleri',
  description: 'MatAI Instagram hesabında paylaşılan matematik sorularını bul, önce kendin dene ve adım adım çözümlerini incele.',
  alternates: { canonical: '/instagram' },
  openGraph: {
    title: 'MatAI · Instagram Soru Çözümleri',
    description: 'Gördüğün soruyu seç. Çözüm yolunu adım adım keşfet.',
    url: '/instagram',
  },
};

export default function InstagramQuestionsPage() {
  return (
    <div className="instagram-questions-page">
      <PublicHeader />
      <main className="instagram-questions-main">
        <header className="instagram-questions-intro">
          <span className="instagram-questions-eyebrow">@matai.app · Önce sen dene</span>
          <h1>Gördüğün soru burada.</h1>
          <p>Instagram’da karşına çıkan soruyu seç. Sonucu öğrenmekle kalma; her adımın nedenini gör.</p>
          <div className="instagram-questions-meta-row">
            <div className="instagram-questions-count">{instagramQuestions.length} soru · Adım adım çözüm</div>
            <div className="instagram-questions-channels">
              <a href="https://www.instagram.com/matai.app" target="_blank" rel="noopener noreferrer" className="instagram-channel-link instagram-channel-ig">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>@matai.app</span>
              </a>
              <a href="https://www.youtube.com/@mataiapp" target="_blank" rel="noopener noreferrer" className="instagram-channel-link instagram-channel-yt">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
                <span>YouTube · @mataiapp</span>
              </a>
            </div>
          </div>
        </header>
        <section className="instagram-questions-grid" aria-label="Instagram matematik soruları">
          {instagramQuestions.map((question, index) => (
            <article className="instagram-question-card" key={question.id}>
              <Link className="instagram-question-image" href={question.solution} aria-label={`${question.title} — çözümü aç`}>
                <Image src={question.image} alt={question.alt} width={1080} height={1350} sizes="(max-width: 680px) 92vw, (max-width: 1100px) 46vw, 480px" priority={index === 0} />
                {index === 0 && <span className="instagram-question-latest">Son soru</span>}
              </Link>
              <div className="instagram-question-copy">
                <div className="instagram-question-meta"><span>{question.topics}</span><span>{question.date}</span></div>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                <Link className="instagram-question-action" href={question.solution}>Adım adım çözümü gör <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </section>
        <aside className="instagram-questions-practice">
          <h2>Kendi sorunda mı takıldın?</h2>
          <p>MatAI ile sorunun fotoğrafını çek, çözüm adımlarını incele.</p>
          <Link href="/#download">MatAI’ı keşfet →</Link>
        </aside>
      </main>
      <PublicFooter />
    </div>
  );
}
