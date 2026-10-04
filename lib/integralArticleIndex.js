import { getLessonReadingTime } from './lessonReadingTime';
export const integralArticles = [
    { title: 'İntegral Formülleri', slug: 'integral-formulleri', description: 'Temel ve ileri integral formüllerini kullanım koşulları ve kısa örneklerle tekrar edin.', category: 'İntegral', symbol: '∫', formula: 'formül tablosu' },
    { title: 'İntegral Alma Kuralları', slug: 'integral-alma-kurallari', description: 'Temel integral formüllerini, yöntem seçimini ve çözümlü örnekleri öğrenin.', category: 'İntegral', symbol: '∫', formula: 'xⁿ⁺¹/(n+1)' },
    { title: 'İntegral Sorusu Nasıl Çözülür? Kısmi İntegrasyon Örneği', slug: 'integral-sorusu-nasil-cozulur', description: 'Kısmi integrasyon yöntemini ve doğru yöntem seçimini adım adım öğrenin.', category: 'İntegral', symbol: '∫', formula: 'u · dv' },
    { title: 'Belirsiz İntegral Nedir?', slug: 'belirsiz-integral-nedir', description: 'Belirsiz integralin mantığını, C sabitini ve temel kuralları öğrenin.', category: 'İntegral', symbol: '∫', formula: 'F(x) + C' },
    { title: 'İntegralde Değişken Değiştirme', slug: 'integralde-degisken-degistirme', description: 'Karmaşık integralleri u dönüşümüyle sadeleştirmeyi örneklerle öğrenin.', category: 'İntegral', symbol: 'u', formula: 'du = g′(x)dx' },
    { title: 'Belirli İntegral Nedir?', slug: 'belirli-integral-nedir', description: 'Alt ve üst sınırları, temel teoremi ve belirli integral özelliklerini öğrenin.', category: 'İntegral', symbol: '∫', formula: 'F(b) − F(a)' },
    { title: 'İntegral ile Alan Hesabı', slug: 'integral-ile-alan-hesabi', description: 'Eğri ile eksen ve iki eğri arasında kalan alanı hesaplayın.', category: 'İntegral', symbol: '∫', formula: 'üst − alt' },
  ].map((article) => ({ ...article, readingTime: getLessonReadingTime(article.slug) }));
