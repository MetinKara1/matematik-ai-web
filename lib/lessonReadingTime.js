// Measured from lesson body text on 2026-10-04. Excludes navigation,
// promotion, closed exercise answers, SVG labels and solving time.
export const readingWordsPerMinute = 180;
export const lessonWordCounts = {
  'limit-nedir': 557,
  'limit-alma-kurallari': 442,
  'sagdan-ve-soldan-limit': 527,
  'limitte-belirsizlikler': 453,
  'sureklilik-nedir': 515,
  'sureksizlik-turleri': 456,
  'turevlenebilirlik-ve-sureklilik': 467,
  'trigonometrik-fonksiyonlar': 437,
  'birim-cember-ve-radyan': 416,
  'temel-trigonometrik-ozdeslikler': 454,
  'ustel-ve-logaritmik-fonksiyonlar': 418,
  'fonksiyonlar-ve-grafikler': 506,
  'turev-nedir': 569,
  'turev-alma-kurallari': 462,
  'turevin-geometrik-yorumu': 1067,
  'artan-azalan-fonksiyonlar': 498,
  'turevde-maksimum-minimum': 567,
  'turev-ile-grafik-cizimi': 518,
  'turev-sorusu-nasil-cozulur': 476,
  'turevde-sik-yapilan-hatalar': 449,
  'trigonometrik-fonksiyonlarin-turevi': 448,
  'ustel-ve-logaritmik-fonksiyonlarin-turevi': 456,
  'yuksek-mertebeden-turev': 449,
  'turev-hareket-problemleri': 584,
  'integral-formulleri': 754,
  'integral-alma-kurallari': 659,
  'integral-sorusu-nasil-cozulur': 512,
  'belirsiz-integral-nedir': 463,
  'integralde-degisken-degistirme': 589,
  'belirli-integral-nedir': 595,
  'integral-ile-alan-hesabi': 719,
};
export function getLessonReadingTime(slug, fallback) {
  const words = lessonWordCounts[slug];
  return words ? Math.max(1, Math.ceil(words / readingWordsPerMinute)) : fallback;
}
