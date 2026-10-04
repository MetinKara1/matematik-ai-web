import LessonDiagram from './LessonDiagram';
import { editorialIdentity } from '../../lib/editorialIdentity';
import LessonNextSteps from './LessonNextSteps';
import { getArticleTopic } from '../../lib/topicHubs';
import Link from 'next/link';
import LessonScope from './LessonScope';
import { getLessonScope } from '../../lib/lessonScope';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import ArticleTrustBox from './ArticleTrustBox';
import ArticleHeroVisual from './ArticleHeroVisual';
import { getArticleVisual } from '../../lib/articleVisuals';
import LessonPractice from './LessonPractice';
import { lessonPractice, lessonPracticeToc, getLessonUpdatedAt } from '../../lib/lessonPractice';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export default function IntegralTopicArticle({ article, children }) {
  const topic = getArticleTopic(article.slug);
  const lesson = lessonPractice[article.slug];
  const scope = getLessonScope(article.slug);
  if (lesson || scope) {
    const updatedAt = getLessonUpdatedAt(article.slug, article.updatedAt);
    article = {
      ...article,
      updatedAt,
      updatedDisplayDate: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date(`${updatedAt}T12:00:00+03:00`)),
      dateModified: `${updatedAt}T00:00:00+03:00`,
      toc: [...article.toc, ...(lesson ? lessonPracticeToc : [])],
    };
  }
  const articleUrl = `https://matematik-ai.com/makaleler/${article.slug}`;
  const visual = getArticleVisual(article.slug);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${articleUrl}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        headline: article.title, description: article.description,
        url: articleUrl,
        image: [`https://matematik-ai.com${visual.src}`],
        datePublished: article.datePublished || '2026-08-12T00:00:00+03:00', dateModified: article.dateModified || article.datePublished || '2026-08-12T00:00:00+03:00',
        inLanguage: 'tr-TR', articleSection: article.category || 'İntegral', keywords: article.keywords,
        about: { '@type': 'Thing', name: article.category || 'İntegral' },
        educationalLevel: scope?.label,
        isAccessibleForFree: true,
        author: editorialIdentity,
        publisher: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com', logo: { '@type': 'ImageObject', url: 'https://matematik-ai.com/assets/MatAI-logo.png' } },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' },
          { '@type': 'ListItem', position: 2, name: 'Makaleler', item: 'https://matematik-ai.com/makaleler' },
          ...(topic ? [{ '@type': 'ListItem', position: 3, name: topic.title, item: `https://matematik-ai.com/konular/${topic.slug}` }] : []),
          { '@type': 'ListItem', position: topic ? 4 : 3, name: article.shortTitle, item: articleUrl },
        ],
      },
      ...(article.faq?.length ? [{
        '@type': 'FAQPage', '@id': `${articleUrl}#faq`,
        mainEntity: article.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
      }] : []),
    ],
  };

  return (
    <div className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <PublicHeader languageHref={article.languageHref} />
      <main className="article-main"><article className="article-card">
        <header className="article-heading">
          <nav className="article-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">›</span><Link href="/makaleler">Makaleler</Link><span aria-hidden="true">›</span>{topic && <><Link href={`/konular/${topic.slug}`}>{topic.title}</Link><span aria-hidden="true">›</span></>}<span>{article.shortTitle}</span></nav>
          <span className="article-category">{article.category || 'İntegral'} · {scope?.label || article.level}</span>
          <h1>{article.title}</h1><p className="article-summary">{article.summary}</p>
          <div className="article-meta" aria-label="Makale bilgileri"><time dateTime={article.date || '2026-08-12'}>{article.displayDate || '12 Ağustos 2026'}</time><span>{article.readingTime} dakika okuma</span>{article.updatedDisplayDate && <span>Güncellendi: <time dateTime={article.updatedAt}>{article.updatedDisplayDate}</time></span>}<span>{article.level}</span><span>MatAI İçerik Ekibi</span></div>
          <LessonScope slug={article.slug} />
          <ArticleHeroVisual slug={article.slug} title={article.title} priority />
        </header>
        <div className="article-content">
          <nav className="article-toc" aria-label="İçindekiler"><span>Bu yazıda</span>{article.toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</nav>
          <div className="article-body">
            <div className="article-answer"><span>Kısaca</span><p>{article.summary}</p></div>
            <div className="article-intro">{article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <LessonDiagram slug={article.slug} />
            {children}
            {lesson && <LessonPractice lesson={lesson} slug={article.slug} />}

            {article.seriesLinks?.length > 0 && <nav className="article-series" aria-label={`${article.category || 'İntegral'} makale serisi`}>
              <span>Bu seride</span>
              <div>{article.seriesLinks.map((item) => <Link href={`/makaleler/${item.slug}`} key={item.slug}>{item.title}</Link>)}</div>
            </nav>}
            <aside className="article-cta"><div className="article-cta-copy"><h2>{article.category || 'İntegral'} sorusuna mı takıldınız?</h2><p>Sorunun fotoğrafını çekin veya metin olarak yazın; çözüm yolunu MatAI ile adım adım inceleyin.</p><a href={appStoreLink} target="_blank" rel="noopener noreferrer" aria-label="MatAI uygulamasını App Store'dan indirin">App Store&apos;dan indirin</a></div></aside>
            <LessonNextSteps slug={article.slug} />
            {topic && <nav className="article-series" aria-label="Konuya geri dön"><span>Bu konudaki diğer dersler</span><div><Link href={`/konular/${topic.slug}`}>{topic.title} çalışma sırası ve kontrol sorusu →</Link></div></nav>}
            <ArticleTrustBox />
          </div>
        </div>
      </article></main><PublicFooter />
    </div>
  );
}
