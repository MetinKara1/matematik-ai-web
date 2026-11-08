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
          <div className="instagram-questions-count">{instagramQuestions.length} soru · Adım adım çözüm</div>
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
