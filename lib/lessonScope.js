// Editorial learning levels; not a prediction of questions in any YKS year.
export const scopeReviewedAt = '2026-10-03';
export const curriculumSources = [
  { title: 'MEB — 2018 Ortaöğretim Matematik Programı (s. 39–41)', href: 'https://mufredat.meb.gov.tr/Dosyalar/201821102727101-OGM%20MATEMAT%C4%B0K%20PRG%2020.01.2018.pdf' },
  { title: 'MEB — 2026–2027 program geçişi', href: 'https://ogm.meb.gov.tr/www/2026-2027-egitim-ogretim-yili-turkiye-yuzyili-maarif-modeli-taslak-cerceve-planlar-yayimlandi/icerik/2633' },
  { title: 'MEB — Fen Lisesi Matematik Programı', href: 'https://mufredat.meb.gov.tr/Dosyalar/201821102457808-OGM%20FEN%20L%C4%B0SES%C4%B0%20MATEMAT%C4%B0K%20PRG%2020.01.2018.pdf' },
];
const basic = { label: 'Lise temeli', note: 'Lise matematiğinin temel kavramlarını pekiştirir. AYT çalışırken sınav yılınıza ait resmî kapsamı ayrıca takip edin.' };
const advanced = { label: 'İleri / üniversiteye geçiş', note: 'Kalkülüse hazırlık için ileri anlatım. Genel ortaöğretim programının temel kapsamını aşar; Fen Lisesi programı bazı başlıklarda farklılaşır. Bu etiketten AYT soru kapsamı çıkarılmamalıdır.' };
const mixed = (note) => ({ label: 'Lise + ileri bölümler', note });
export const lessonScopes = {
  'limit-nedir': basic,
  'limit-alma-kurallari': basic,
  'sagdan-ve-soldan-limit': basic,
  'limitte-belirsizlikler': mixed('Cebirsel sadeleştirme ile başlayın. L’Hôpital bölümü üniversite kalkülüsüne geçiş içindir.'),
  'sureklilik-nedir': basic,
  'sureksizlik-turleri': mixed('Süreklilik temelini pekiştirir; sonsuz süreksizlik sınıflandırması kalkülüse hazırlık olarak sunulur.'),
  'turevlenebilirlik-ve-sureklilik': basic,
  'trigonometrik-fonksiyonlar': basic,
  'birim-cember-ve-radyan': basic,
  'temel-trigonometrik-ozdeslikler': basic,
  'ustel-ve-logaritmik-fonksiyonlar': basic,
  'fonksiyonlar-ve-grafikler': basic,
  'turev-nedir': basic,
  'turev-alma-kurallari': mixed('Çarpım, bölüm ve zincir kuralları temel bölümdür. Sinüs içeren çarpım örneği özel fonksiyon türevleriyle ileri çalışmadır.'),
  'turevin-geometrik-yorumu': basic,
  'artan-azalan-fonksiyonlar': basic,
  'turevde-maksimum-minimum': mixed('Birinci türev işaret testi ve uç noktalarla başlayın. İkinci türev testi kalkülüse geçiş için eklenmiştir.'),
  'turev-ile-grafik-cizimi': mixed('Artma-azalma ve polinom grafikleriyle başlayın. Konkavlık ve büküm noktası için ikinci türev kullanımı ileri çalışmadır.'),
  'turev-sorusu-nasil-cozulur': basic,
  'turevde-sik-yapilan-hatalar': basic,
  'trigonometrik-fonksiyonlarin-turevi': advanced,
  'ustel-ve-logaritmik-fonksiyonlarin-turevi': advanced,
  'yuksek-mertebeden-turev': advanced,
  'turev-hareket-problemleri': mixed('Anlık hız temel uygulamadır; ivme ve ikinci türev ilişkisi kalkülüse geçiş olarak sunulur.'),
  'integral-formulleri': mixed('Kuvvet kuralı ve belirli integral temel bölümdür. 1/x, üstel ve trigonometrik formüller kalkülüs için eklenmiştir.'),
  'integral-alma-kurallari': mixed('Kuvvet kuralıyla başlayın. Logaritmik, üstel ve trigonometrik integraller ile kısmi integrasyon ileri çalışmadır.'),
  'integral-sorusu-nasil-cozulur': advanced,
  'belirsiz-integral-nedir': mixed('Kuvvet kuralı ve C sabiti temel bölümdür. 1/x integrali ve kısmi integrasyon bağlantısı ileri çalışmadır.'),
  'integralde-degisken-degistirme': mixed('Değişken değiştirme temel programda bulunur; özel fonksiyon içeren örnekler kalkülüse geçiş içindir.'),
  'belirli-integral-nedir': mixed('Temel integral ve alan bilgisine eklenen uygunsuz integral örneği üniversite düzeyindedir.'),
  'integral-ile-alan-hesabi': basic,
};
export const getLessonScope = (slug) => lessonScopes[slug];
