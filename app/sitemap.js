import { topicHubs } from '../lib/topicHubs';
import { mathTools } from '../lib/mathTools';
import { derivativeArticles } from '../lib/derivativeArticles';
import { foundationArticles } from '../lib/foundationArticles';
import { englishArticles } from '../lib/enArticles';
import { topicalArticles } from '../lib/topicalArticles';
import { getLessonUpdatedAt } from '../lib/lessonPractice';

export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com').replace(/\/$/, '');
  const lastModified = new Date('2026-08-12T00:00:00+03:00');
  const solverLastModified = new Date('2026-08-20T00:00:00+03:00');
  const englishLastModified = new Date('2026-08-27T00:00:00+03:00');
  const languageAlternates = (trPath, enPath) => ({ languages: { tr: `${baseUrl}${trPath}`, en: `${baseUrl}${enPath}` } });
  return [
    ...['/konular', ...topicHubs.map(({ slug }) => `/konular/${slug}`)].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date('2026-10-03T00:00:00+03:00'), changeFrequency: 'monthly', priority: 0.85 })),
    ...['/araclar', ...mathTools.map(({ slug }) => `/araclar/${slug}`)].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date('2026-10-03T00:00:00+03:00'), changeFrequency: 'monthly', priority: 0.8 })),
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1, alternates: languageAlternates('', '/en') },
    { url: `${baseUrl}/yapay-zeka-matematik-cozucu`, lastModified: solverLastModified, changeFrequency: 'monthly', priority: 0.9, alternates: languageAlternates('/yapay-zeka-matematik-cozucu', '/en/ai-math-solver') },
    { url: `${baseUrl}/makaleler`, lastModified: new Date('2026-10-03T00:00:00+03:00'), changeFrequency: 'weekly', priority: 0.9, alternates: languageAlternates('/makaleler', '/en/articles') },
    { url: `${baseUrl}/makaleler/integral-formulleri`, lastModified: new Date('2026-10-04T00:00:00+03:00'), changeFrequency: 'monthly', priority: 0.8, alternates: languageAlternates('/makaleler/integral-formulleri', '/en/articles/integral-formulas') },
    { url: `${baseUrl}/makaleler/integral-alma-kurallari`, lastModified: new Date('2026-10-04T00:00:00+03:00'), changeFrequency: 'monthly', priority: 0.8, alternates: languageAlternates('/makaleler/integral-alma-kurallari', '/en/articles/integration-rules') },
    { url: `${baseUrl}/hakkimizda`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/icerik-politikasi`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/en`, lastModified: englishLastModified, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { tr: baseUrl, en: `${baseUrl}/en` } } },
    { url: `${baseUrl}/en/ai-math-solver`, lastModified: englishLastModified, changeFrequency: 'monthly', priority: 0.9, alternates: { languages: { tr: `${baseUrl}/yapay-zeka-matematik-cozucu`, en: `${baseUrl}/en/ai-math-solver` } } },
    { url: `${baseUrl}/en/articles`, lastModified: englishLastModified, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { tr: `${baseUrl}/makaleler`, en: `${baseUrl}/en/articles` } } },
    ...topicalArticles.flatMap((article) => {
      const tr = `/${article.section}/${article.slug}`;
      const en = `/en/${article.enSection}/${article.enSlug}`;
      const alternates = languageAlternates(tr, en);
      const common = { lastModified: new Date(`${article.publishedAt}T00:00:00+03:00`), changeFrequency: article.section === 'gundem' ? 'weekly' : 'monthly', priority: 0.85, alternates };
      return [{ url: `${baseUrl}${tr}`, ...common }, { url: `${baseUrl}${en}`, ...common }];
    }),
    ...englishArticles.map(({ slug: enSlug, trSlug, updatedAt }) => ({
      url: `${baseUrl}/en/articles/${enSlug}`,
      lastModified: updatedAt ? new Date(`${updatedAt}T00:00:00+03:00`) : englishLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { tr: `${baseUrl}/makaleler/${trSlug}`, en: `${baseUrl}/en/articles/${enSlug}` } },
    })),
    {
      url: `${baseUrl}/makaleler/integral-sorusu-nasil-cozulur`,
      lastModified: new Date('2026-10-04T00:00:00+03:00'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/makaleler/belirsiz-integral-nedir`,
      lastModified: new Date('2026-10-04T00:00:00+03:00'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...['integralde-degisken-degistirme', 'belirli-integral-nedir', 'integral-ile-alan-hesabi'].map((slug) => ({
      url: `${baseUrl}/makaleler/${slug}`,
      lastModified: new Date(`${getLessonUpdatedAt(slug, '2026-08-12')}T00:00:00+03:00`),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...derivativeArticles.map(({ slug, publishedAt, updatedAt }) => {
      const englishVersion = englishArticles.find((item) => item.trSlug === slug);
      return {
        url: `${baseUrl}/makaleler/${slug}`,
        lastModified: new Date(`${getLessonUpdatedAt(slug, updatedAt || publishedAt || '2026-08-14')}T00:00:00+03:00`),
        changeFrequency: 'monthly', priority: 0.8,
        ...(englishVersion ? { alternates: languageAlternates(`/makaleler/${slug}`, `/en/articles/${englishVersion.slug}`) } : {}),
      };
    }),
    ...foundationArticles.map(({ slug, publishedAt }) => {
      const englishVersion = englishArticles.find((item) => item.trSlug === slug);
      return {
        url: `${baseUrl}/makaleler/${slug}`,
        lastModified: new Date(`${getLessonUpdatedAt(slug, publishedAt || '2026-08-27')}T00:00:00+03:00`),
        changeFrequency: 'monthly', priority: 0.8,
        alternates: languageAlternates(`/makaleler/${slug}`, `/en/articles/${englishVersion.slug}`),
      };
    }),
  ];
}
