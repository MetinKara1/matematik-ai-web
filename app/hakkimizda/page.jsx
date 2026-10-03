import { editorialIdentity } from '../../lib/editorialIdentity';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export const metadata = {
  title: 'Hakkımızda',
  description: 'MatAI’ın matematik öğrenimini destekleme amacı, yapay zekâ yaklaşımı ve içerik sorumluluğu hakkında bilgi edinin.',
  alternates: { canonical: '/hakkimizda' },
  openGraph: { title: 'MatAI Hakkında', description: 'MatAI’ın amacı, ürünü ve içerik yaklaşımı.', type: 'website', url: '/hakkimizda', locale: 'tr_TR', siteName: 'MatAI' },
};

export default function AboutPage() {
  return <div className="trust-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...editorialIdentity, publishingPrinciples: 'https://matematik-ai.com/icerik-politikasi' }).replace(/</g, '\\u003c') }} /><PublicHeader /><main className="trust-main"><header><span>MatAI hakkında</span><h1>Matematiği yalnızca cevapla değil, çözüm yoluyla öğretmek için çalışıyoruz.</h1><p>MatAI; öğrencilerin matematik sorularını fotoğraf, metin veya sesle iletip çözüm adımlarını inceleyebildiği yapay zekâ destekli bir eğitim ürünüdür.</p></header><section><h2>Amacımız</h2><p>Bir sorunun yalnızca sonucunu göstermek yerine kullanılan yöntemi, ara işlemleri ve kontrol adımlarını anlaşılır biçimde sunmayı hedefliyoruz. Makale kütüphanemiz de temel kavramları çözümlü örneklerle desteklemek için hazırlanır.</p></section><section><h2>Yapay zekâ ve insan sorumluluğu</h2><p>MatAI yapay zekâ teknolojilerinden yararlanır. Yapay zekâ çıktıları hata içerebilir; bu nedenle kullanıcıların kritik işlemleri kontrol etmesini ve gerektiğinde öğretmenlerine danışmasını öneririz. Web sitemizdeki yayınların sorumluluğu MatAI İçerik Ekibi’ne aittir.</p></section><section id="icerik-ekibi"><h2>MatAI İçerik Ekibi</h2><p>Bu ad, sitedeki yayınların kurumsal hazırlayan kimliğidir. Tek bir öğretmenin adı, akademik unvan veya bağımsız uzman onayı olarak kullanılmaz.</p><p>Bir içerikte kişisel yazarlık veya uzman incelemesi belirtildiğinde kişinin adı, ilgili uzmanlığı, katkısı ve inceleme tarihi o sayfada açıkça gösterilmelidir. Bu bilgiler bulunmadığında yalnızca kurumsal yayın sorumluluğu belirtilir.</p></section><section><h2>İçerik yaklaşımımız</h2><p>Tanımların açık, formüllerin okunabilir ve çözüm adımlarının doğrulanabilir olmasını gözetiyoruz. İçeriklerimizi yeni örnekler, kullanıcı geri bildirimleri ve tespit edilen düzeltmeler doğrultusunda güncelliyoruz.</p><p>İnceleme ölçütlerimizi ve düzeltme yaklaşımımızı <a href="/icerik-politikasi">İçerik Politikası</a> sayfasında yayımlıyoruz.</p></section></main><PublicFooter /></div>;
}
