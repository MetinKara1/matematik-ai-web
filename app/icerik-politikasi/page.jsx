import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export const metadata = {
  title: 'İçerik Politikası',
  description: 'MatAI matematik içeriklerinin hazırlanma, kontrol, güncelleme ve hata düzeltme ilkelerini inceleyin.',
  alternates: { canonical: '/icerik-politikasi' },
  openGraph: { title: 'MatAI İçerik Politikası', description: 'MatAI’ın editoryal ilkeleri ve düzeltme yaklaşımı.', type: 'website', url: '/icerik-politikasi', locale: 'tr_TR', siteName: 'MatAI' },
};

export default function EditorialPolicyPage() {
  return (
    <div className="trust-page">
      <PublicHeader />
      <main className="trust-main">
        <header><span>Editoryal ilkeler</span><h1>İçerik Politikası</h1><p>Bu sayfa MatAI’da yayımlanan matematik konu anlatımları ve çözümlü örneklerin hangi ölçütlerle hazırlandığını açıklar.</p></header>
        <section><h2>Hazırlama ve kontrol</h2><p>İçerikler konu kapsamı belirlenerek hazırlanır; tanımlar, formüller, işlem sırası ve örnek sonuçları kendi içinde kontrol edilir. Okurun yalnızca sonucu değil, sonuca götüren yöntemi anlayabilmesi amaçlanır.</p></section>
        <section><h2>Yapay zekâ kullanımı</h2><p>Araştırma, taslak oluşturma veya anlatımı düzenleme aşamalarında yapay zekâ araçlarından yararlanılabilir. Yayımlanan metnin seçimi ve sorumluluğu MatAI İçerik Ekibi’ne aittir. Otomatik üretilen içerik kontrol edilmeden yayımlanmamalıdır.</p></section>
        <section><h2>Kaynak ve özgünlük</h2><p>Standart matematik tanımları ve kuralları farklı eğitim kaynaklarında ortak olabilir. MatAI; açıklama sırasını, çözümlü örneklerini ve kontrol önerilerini okura özgün bir öğrenme deneyimi sunacak biçimde oluşturmayı hedefler. Harici bir kaynağa doğrudan dayanıldığında ilgili kaynak içerikte belirtilir.</p></section>
        <section><h2>Güncellemeler ve düzeltmeler</h2><p>Makalelerde yayın veya güncelleme tarihi gösterilir. İşlem, formül ya da anlatım hatası tespit edildiğinde içerik düzeltilir ve önemli değişikliklerde güncellenme tarihi yenilenir.</p><p>Bir hata bildirirken ilgili sayfanın adresini, hatalı olduğunu düşündüğünüz bölümü ve mümkünse önerilen düzeltmeyi MatAI destek kanalına iletmeniz incelemeyi hızlandırır.</p></section>
        <section><h2>Eğitim amacı</h2><p>MatAI içerikleri eğitim ve bilgilendirme amacı taşır. Kişiye özel öğretmenlik, sınav kurumu açıklaması veya resmî müfredat belgesi niteliğinde değildir.</p></section>
      </main>
      <PublicFooter />
    </div>
  );
}
