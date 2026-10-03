import { getArticleTopic, getTopicLesson } from './topicHubs';
import { getLessonScope } from './lessonScope';

const paths = {
  'fonksiyonlar-ve-grafikler': [null, 'ustel-ve-logaritmik-fonksiyonlar'],
  'ustel-ve-logaritmik-fonksiyonlar': ['fonksiyonlar-ve-grafikler', 'limit-nedir'],
  'trigonometrik-fonksiyonlar': ['fonksiyonlar-ve-grafikler', 'birim-cember-ve-radyan'],
  'birim-cember-ve-radyan': ['trigonometrik-fonksiyonlar', 'temel-trigonometrik-ozdeslikler'],
  'temel-trigonometrik-ozdeslikler': ['birim-cember-ve-radyan', 'trigonometrik-fonksiyonlarin-turevi'],
  'limit-nedir': ['fonksiyonlar-ve-grafikler', 'sagdan-ve-soldan-limit'],
  'sagdan-ve-soldan-limit': ['limit-nedir', 'limit-alma-kurallari'],
  'limit-alma-kurallari': ['limit-nedir', 'limitte-belirsizlikler'],
  'limitte-belirsizlikler': ['limit-alma-kurallari', 'sureklilik-nedir'],
  'sureklilik-nedir': ['sagdan-ve-soldan-limit', 'sureksizlik-turleri'],
  'sureksizlik-turleri': ['sureklilik-nedir', 'turevlenebilirlik-ve-sureklilik'],
  'turevlenebilirlik-ve-sureklilik': ['sureklilik-nedir', 'turev-nedir'],
  'turev-nedir': ['limit-nedir', 'turev-alma-kurallari'],
  'turev-alma-kurallari': ['turev-nedir', 'turevin-geometrik-yorumu'],
  'turevin-geometrik-yorumu': ['turev-nedir', 'artan-azalan-fonksiyonlar'],
  'artan-azalan-fonksiyonlar': ['turev-alma-kurallari', 'turevde-maksimum-minimum'],
  'turevde-maksimum-minimum': ['artan-azalan-fonksiyonlar', 'turev-ile-grafik-cizimi'],
  'turev-ile-grafik-cizimi': ['artan-azalan-fonksiyonlar', 'turev-sorusu-nasil-cozulur'],
  'turev-sorusu-nasil-cozulur': ['turev-alma-kurallari', 'turevde-sik-yapilan-hatalar'],
  'turevde-sik-yapilan-hatalar': ['turev-alma-kurallari', 'belirsiz-integral-nedir'],
  'trigonometrik-fonksiyonlarin-turevi': ['birim-cember-ve-radyan', 'ustel-ve-logaritmik-fonksiyonlarin-turevi'],
  'ustel-ve-logaritmik-fonksiyonlarin-turevi': ['ustel-ve-logaritmik-fonksiyonlar', 'yuksek-mertebeden-turev'],
  'yuksek-mertebeden-turev': ['turev-alma-kurallari', 'turev-hareket-problemleri'],
  'turev-hareket-problemleri': ['turevin-geometrik-yorumu', 'belirli-integral-nedir'],
  'belirsiz-integral-nedir': ['turev-alma-kurallari', 'integral-alma-kurallari'],
  'integral-alma-kurallari': ['belirsiz-integral-nedir', 'integralde-degisken-degistirme'],
  'integralde-degisken-degistirme': ['turev-alma-kurallari', 'belirli-integral-nedir'],
  'belirli-integral-nedir': ['belirsiz-integral-nedir', 'integral-ile-alan-hesabi'],
  'integral-ile-alan-hesabi': ['belirli-integral-nedir', 'integral-formulleri'],
  'integral-formulleri': ['integral-alma-kurallari', 'integralde-degisken-degistirme'],
  'integral-sorusu-nasil-cozulur': ['integral-alma-kurallari', 'integralde-degisken-degistirme'],
};
export function getLessonNextSteps(slug) {
  const path = paths[slug];
  const topic = getArticleTopic(slug);
  if (!path || !topic) return [];
  const lessonLink = (target, intent) => {
    const lesson = getTopicLesson(target);
    return { href: `/makaleler/${target}`, title: lesson.shortTitle || lesson.title, intent, detail: lesson.description, level: getLessonScope(target)?.label };
  };
  const links = [];
  if (path[0]) links.push(lessonLink(path[0], 'Temelde takıldıysan'));
  else links.push({ href: `/konular/${topic.slug}`, title: 'Fonksiyonlara hazırlan', intent: 'Nereden başlayacağını seç', detail: topic.prerequisite });
  links.push(lessonLink(path[1], 'Bu dersi anladıysan'));
  const practice = {
    turev: { href: '/araclar/turev-hesaplama', title: 'Polinom türeviyle pratik yap', detail: 'Önce kendin çöz, sonra polinom türevinin işlem adımlarını karşılaştır.' },
    integral: { href: '/araclar/integral-hesaplama', title: 'Polinom integralini kontrol et', detail: 'Belirli veya belirsiz polinom integralini dene. Araç trigonometrik ve üstel ifadeleri desteklemez.' },
    fonksiyonlar: { href: '/araclar/denklem-cozucu', title: 'Fonksiyonun köklerini bul', detail: 'Birinci ve ikinci derece denklemlerle f(x) = 0 ilişkisini dene.' },
    trigonometri: { href: '/makaleler/birim-cember-ve-radyan#lesson-exercises', title: 'Radyan alıştırmalarını çöz', detail: 'Açı dönüşümünü kendi başına yap, ardından cevabı aç.' },
    'limit-ve-sureklilik': { href: '/makaleler/limit-nedir#lesson-exercises', title: 'Limit bilgisini sına', detail: 'Fonksiyon değeri ile yaklaşma değerini iki cevaplı alıştırmayla karşılaştır.' },
  };
  links.push({ ...practice[topic.slug], intent: 'Kendini denemek istiyorsan' });
  return links;
}
