// Original exercises for the five imported lessons. Answers are checked separately.
const example = (title, question, steps, answer) => ({ title, question, steps, answer });
const exercise = (question, answer, explanation) => ({ question, answer, explanation });
export const octoberLessonPractice = {
  'bileske-fonksiyon-ve-ters-fonksiyon': {
    guide: 'Bileşkede önce içteki kuralı uygula. Ters fonksiyonda verilen tanım ve hedef kümelerini kontrol edip çıkıştan girişe tek bir yol olup olmadığını sor. Sonucu bir bileşke veya yerine koymayla denetle.',
    examples: [
      example('Sıra değişince sonuç', 'f(x) = x − 2, g(x) = 3x + 1 için f(g(3)) ve g(f(3))?', ['Önce g(3) = 10, ardından f(10) = 8.', 'Ters sırada f(3) = 1, ardından g(1) = 4.'], '8 ve 4; bileşke genellikle değişmeli değildir.'),
      example('Tersin doğrulanması', 'f: ℝ → ℝ, f(x) = 5x + 2 için f⁻¹(x)?', ['y = 5x + 2 yaz.', 'x = (y − 2)/5; harfleri değiştir.', 'f((x − 2)/5) = x ile kontrol et.'], 'f⁻¹(x) = (x − 2)/5.'),
      example('Karekökün kabul ettiği çıktı', 'f(x) = √x, g(x) = 2x − 6 için f ∘ g nerede tanımlı?', ['√(2x − 6) ifadesinin içi negatif olamaz.', '2x − 6 ≥ 0 ⇒ x ≥ 3.'], '[3, ∞).'),
    ],
    mistakes: ['Ters fonksiyonu 1/f(x) sanma.', 'Sadeleştirme yaparken başlangıçtaki tanım kümesini kaybetme.'],
    exercises: [exercise('f(x) = 2x + 3, g(x) = x² için f(g(2))?', '11', 'g(2) = 4; f(4) = 11.'), exercise('f: [0, ∞) → [1, ∞), f(x) = x² + 1 için ters?', 'f⁻¹(x) = √(x − 1), x ≥ 1.', 'Negatif karekök dalı başlangıç tanım kümesine ait değildir.')],
  },
  'trigonometrik-denklemler': {
    guide: 'Açıları aynı birime getir. Temel trigonometrik değeri bul, bütün açı ailelerini ve periyodu yaz, sonra istenen aralığı uygula. Bölme yapıyorsan sıfır olabilen çarpanı ayrıca incele.',
    examples: [
      example('İki sinüs kökü', '[0, 2π) içinde sin x = 1/2?', ['Referans açı π/6.', 'Sinüs birinci ve ikinci bölgede pozitiftir.', 'İkinci açı π − π/6 = 5π/6.'], '{π/6, 5π/6}.'),
      example('Katlı açı ve periyot', '[0, 2π) içinde cos(2x) = 0?', ['2x = π/2 + kπ; k tam sayı.', 'x = π/4 + kπ/2.', 'k = 0, 1, 2, 3 aralıkta kalır.'], '{π/4, 3π/4, 5π/4, 7π/4}.'),
      example('Bölmeden çarpanlara ayır', '[0, 2π) içinde sin x cos x = sin x?', ['sin x(cos x − 1) = 0.', 'sin x = 0 ⇒ x = 0 veya π.', 'cos x = 1 ⇒ x = 0; tekrar sayma.'], '{0, π}.'),
    ],
    mistakes: ['Tanjantın periyodunu 2π alma; temel periyot π’dir.', 'Aralığın açık ucunu çözüme ekleme.'],
    exercises: [exercise('[0, 2π) içinde cos x = −1/2?', '{2π/3, 4π/3}', 'Kosinüs ikinci ve üçüncü bölgede negatiftir.'), exercise('[0, 2π) içinde tan x = 1?', '{π/4, 5π/4}', 'x = π/4 + kπ ailesindeki iki kökü seç.')],
  },
  'trigonometri-toplam-fark-yarim-aci-formulleri': {
    guide: 'Açıları bilinen toplam, fark veya yarım açı biçimine dönüştür. Karekökten çıkarken bölgenin istediği işareti seç. Tanjant formüllerinde sıfır payda ve tanımsız açıları dışla.',
    examples: [
      example('Bir farkı hesapla', 'sin 15°?', ['15° = 45° − 30°.', 'sin(45° − 30°) = sin45° cos30° − cos45° sin30°.'], '(√6 − √2)/4.'),
      example('İki kat açıda işaret', 'sin x = 4/5, x ikinci bölgede. sin 2x?', ['cos²x = 1 − 16/25 = 9/25.', 'İkinci bölgede cos x = −3/5.', 'sin 2x = 2(4/5)(−3/5).'], '−24/25.'),
      example('Yarım açının işareti', 'cos x = −3/5, π < x < 3π/2. cos(x/2)?', ['π/2 < x/2 < 3π/4; kosinüs negatif.', 'cos²(x/2) = (1 − 3/5)/2 = 1/5.', 'Negatif dalı seç.'], '−√5/5.'),
    ],
    mistakes: ['sin(a + b), sin a + sin b değildir.', 'Kareli formülden çıkan pozitif karekökü otomatik seçme.'],
    exercises: [exercise('cos 75°?', '(√6 − √2)/4', 'cos(45° + 30°) = cos45° cos30° − sin45° sin30°.'), exercise('sin²x = 1/4 ise cos 2x?', '1/2', '1 − 2sin²x = 1 − 1/2.')],
  },
  'ikinci-dereceden-denklemler': {
    guide: 'Önce a ≠ 0 olduğundan emin ol. Kolay çarpan varsa ayır; yoksa diskriminantı hesapla. Bulduğun kökleri başlangıç denklemine ve varsa problem koşullarına geri koy.',
    examples: [
      example('Kolay çarpan', 'x² − 7x + 12 = 0?', ['Çarpımı 12, toplamı −7 olan sayılar −3 ve −4.', '(x − 3)(x − 4) = 0.'], 'x = 3 veya 4.'),
      example('Çift kök koşulu', 'x² − 8x + m = 0 çift köklü olsun. m?', ['Δ = 64 − 4m.', 'Çift kök için Δ = 0 ⇒ m = 16.', 'Denklem (x − 4)² = 0 olur.'], 'm = 16; kök 4.'),
      example('Negatif baş katsayı', '−2x² + 6x + 8 = 0?', ['−2’ye böl: x² − 3x − 4 = 0.', '(x − 4)(x + 1) = 0.', 'Başlangıç denkleminde iki kökü de kontrol et.'], 'x = 4 veya −1.'),
    ],
    mistakes: ['x’e bölerek x = 0 kökünü kaybetme.', 'Δ < 0 durumunu “gerçek kök yok” diye ifade et; sayı kümesini belirt.'],
    exercises: [exercise('2x² − 5x + 2 = 0?', 'x = 2 veya 1/2.', '(2x − 1)(x − 2) = 0.'), exercise('x² + 2x + 5 = 0 denkleminin gerçek kökü var mı?', 'Hayır.', 'Δ = 4 − 20 = −16 < 0.')],
  },
  'parabol-konu-anlatimi': {
    guide: 'Önce kolların yönünü belirle; y-kesişimi, gerçek kökler ve tepe noktasını bul. Simetrik bir nokta ekleyip işaret aralıklarını grafikten kontrol et. Kapalı aralıkta maksimum/minimum için uçları da denetle.',
    examples: [
      example('Tepe ve kökler', 'f(x) = x² − 6x + 8 grafiğinin tepe noktası ve kökleri?', ['r = 6/2 = 3; f(3) = −1.', '(x − 2)(x − 4) = 0.', 'Kollar yukarı, kökler 2 ve 4.'], 'T(3, −1), kökler 2 ve 4.'),
      example('Kök olmadan çizim', 'f(x) = x² + 4x + 5 neden daima pozitif?', ['f(x) = (x + 2)² + 1.', 'Kare en az 0’dır; en küçük değer 1.', 'Tepe (−2, 1) eksenin üstündedir.'], 'Her gerçek x için f(x) ≥ 1 > 0.'),
      example('Aralıkta ekstremum', 'f(x) = −x² + 4x, x ∈ [0, 3]. En küçük ve büyük değer?', ['Tepe x = 2 içeridedir; f(2) = 4.', 'Uçlarda f(0) = 0, f(3) = 3.', 'Bu adayları birlikte karşılaştır.'], 'Minimum 0; maksimum 4.'),
    ],
    mistakes: ['Tepe noktası aralık dışında kalırsa yine cevap olarak kullanma.', 'Kolların yönünden bağımsız olarak her tepeye minimum deme.'],
    exercises: [exercise('f(x) = −x² + 6x − 5 için tepe noktası?', 'T(3, 4)', 'r = −6/(−2) = 3; f(3) = 4.'), exercise('x² − 4x + 3 ≤ 0 hangi aralıkta?', '[1, 3]', 'Kollar yukarı ve kökler 1, 3; kökler dahil arada değer sıfır veya negatiftir.')],
  },
};
