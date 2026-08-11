import IntegralArticle from '../../../components/public/IntegralArticle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Örnek',
  description: 'Kısmi integrasyon yöntemiyle ∫x·eˣ dx sorusunun çözümünü, sağlamasını ve öğrencilerin sık yaptığı hataları adım adım öğrenin.',
  alternates: { canonical: '/makaleler/integral-sorusu-nasil-cozulur' },
  openGraph: {
    title: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Bir Örnek',
    description: 'Kısmi integrasyon yöntemini örnek bir AYT sorusuyla adım adım öğrenin.',
    type: 'article',
    locale: 'tr_TR',
  },
};

export default function ArticlePage() {
  return <IntegralArticle />;
}
