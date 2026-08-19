const visualGroups = {
  geometry: { src: '/assets/articles/turevin-geometrik-anlami.jpg', alt: 'Bir eğri üzerindeki noktada teğet doğrusu ve eğimi gösteren türev görselleştirmesi' },
  rules: { src: '/assets/articles/turev-kurallari.jpg', alt: 'Farklı fonksiyonların türev kurallarıyla dönüşümünü gösteren eğitim görselleştirmesi' },
  graph: { src: '/assets/articles/grafik-optimizasyon.jpg', alt: 'Artan ve azalan aralıklar ile maksimum ve minimum noktaları gösteren fonksiyon grafiği' },
  special: { src: '/assets/articles/ozel-fonksiyonlar.jpg', alt: 'Trigonometrik, üstel ve logaritmik fonksiyon eğrilerinin karşılaştırmalı görselleştirmesi' },
  motion: { src: '/assets/articles/turev-hareket.jpg', alt: 'Eğrisel harekette konum, hız ve ivme yönlerini gösteren hareket görselleştirmesi' },
  integral: { src: '/assets/articles/integral-alan.jpg', alt: 'Eğri altında ve iki eğri arasında kalan bölgelerin integral ile alan hesabını gösteren grafik' },
};

const groupsBySlug = {
  'turev-nedir': 'geometry',
  'turevin-geometrik-yorumu': 'geometry',
  'turev-alma-kurallari': 'rules',
  'turev-sorusu-nasil-cozulur': 'rules',
  'turevde-sik-yapilan-hatalar': 'rules',
  'artan-azalan-fonksiyonlar': 'graph',
  'turevde-maksimum-minimum': 'graph',
  'turev-ile-grafik-cizimi': 'graph',
  'yuksek-mertebeden-turev': 'graph',
  'trigonometrik-fonksiyonlarin-turevi': 'special',
  'ustel-ve-logaritmik-fonksiyonlarin-turevi': 'special',
  'turev-hareket-problemleri': 'motion',
};

export function getArticleVisual(slug) {
  return visualGroups[groupsBySlug[slug] || 'integral'];
}
