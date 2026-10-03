const example = (title, question, steps, answer) => ({ title, question, steps, answer });
const exercise = (question, answer, explanation) => ({ question, answer, explanation });

export const calculusPractice = {
  'turev-nedir': {
    guide: 'Türevin hangi değişkene göre alındığını ve sonucun birimini belirleyin. Konumun zamana göre türevi hızdır; grafikteki y değerinin x’e göre türevi ise eğimdir. Ortalama değişim iki nokta arasındaki fark oranıdır. Anlık değişimde bu noktalar birbirine yaklaştırılır. Fark oranını sadeleştirirken h ≠ 0 kabul edilir, ardından h → 0 limiti alınır. Doğrudan h = 0 koymak türev tanımını hesaplamaz; 0/0 biçimi oluşturur.',
    examples: [
      example('Tanımdan türev', 'f(x) = x² için f′(a)’yı tanımdan bulun.', ['[(a + h)² − a²]/h fark oranını yazın.', 'Pay 2ah + h² olur; h ≠ 0 için oran 2a + h’ye sadeleşir.', 'h → 0 limitini alın.'], 'f′(a) = 2a'),
      example('Ortalama ve anlık değişim', 's(t) = t² metre olsun. [1,3] aralığındaki ortalama hızı ve t = 3 anındaki hızı bulun.', ['Ortalama hız [s(3) − s(1)]/(3 − 1) = (9 − 1)/2’dir.', 'Anlık hız için s′(t) = 2t bulunur.', 't = 3 yazılır; zaman saniye ise hızın birimi m/s olur.'], 'Ortalama hız 4 m/s, anlık hız 6 m/s.'),
      example('Türev değeri ile fonksiyon değeri', 'f(x) = x² + 5 için x = −2 noktasındaki yükseklik ve eğim nedir?', ['Yükseklik f(−2) = 4 + 5 = 9’dur.', 'Türev f′(x) = 2x olduğundan f′(−2) = −4 bulunur.', 'Negatif eğim, pozitif yükseklikteki eğrinin o noktada aşağı yöneldiğini söyler.'], 'Nokta (−2,9), teğet eğimi −4.'),
    ],
    mistakes: ['f(a) ile f′(a)’yı aynı değer sanmak; yükseklik ile eğim farklı niceliklerdir.', 'Bir fonksiyonun sürekli olmasını türevlenebilirlik için yeterli görmek; |x| grafiğinin 0’da köşesi vardır.'],
    exercises: [exercise('f(x) = 3x² − 1 için f′(2) kaçtır?', '12', 'f′(x) = 6x; x = 2 yazılır.'), exercise('f(x) = 7 sabit fonksiyonunun türevi nedir?', '0', 'Her iki noktadaki çıktı aynı olduğundan fark oranının payı sıfırdır.')],
  },
  'turev-alma-kurallari': {
    guide: 'İfadenin en dış işlemini okuyun: iki ayrı fonksiyon çarpılıyorsa çarpım, bölünüyorsa bölüm, bir fonksiyon diğerinin içine yerleşmişse zincir kuralı gerekir. Aynı soruda birden fazla kural kullanılabilir. Önce sadeleştirmek işlemi kısaltabilir; fakat sadeleştirme tanım dışı noktaları geri kazandırmaz. Çözümün sonunda bir kolay x değeriyle farklı eşdeğer türev biçimlerini karşılaştırın. Çarpım kuralı iki, bölüm kuralı ise fark içeren bir pay üretir.',
    examples: [
      example('Çarpım kuralı', 'f(x) = (x² + 1)(x − 3) fonksiyonunun türevini bulun.', ['u = x² + 1 ve v = x − 3 seçin; u′ = 2x, v′ = 1.', 'u′v + uv′ = 2x(x − 3) + (x² + 1) yazın.', 'Terimleri açıp toplayın.'], 'f′(x) = 3x² − 6x + 1'),
      example('Bölüm kuralı', 'g(x) = (x + 1)/(x − 1) için türevi bulun.', ['x ≠ 1 koşulunu kaydedin.', 'Pay: 1 · (x − 1) − (x + 1) · 1 = −2.', 'Payda, eski paydanın karesidir.'], 'g′(x) = −2/(x − 1)², x ≠ 1.'),
      example('Zincir kuralı', 'h(x) = (2x² − 1)³ fonksiyonunun türevini bulun.', ['Dış fonksiyon küp alma, iç fonksiyon 2x² − 1’dir.', 'Dış türev 3(2x² − 1)² olur.', 'İç türev 4x ile çarpın.'], 'h′(x) = 12x(2x² − 1)²'),
    ],
    mistakes: ['(uv)′ = u′v′ yazmak; iki terimin toplamı gerekir.', 'Bileşkenin dış türevini alıp iç türev çarpanını unutmak.'],
    exercises: [exercise('f(x) = (3x + 2)⁴ için f′(x)?', '12(3x + 2)³', 'Dış türev 4(3x + 2)³, iç türev 3’tür.'), exercise('f(x) = x/(x + 2) için f′(x)?', '2/(x + 2)², x ≠ −2.', 'Bölüm kuralının payı (x + 2) − x = 2 olur.')],
  },
  'artan-azalan-fonksiyonlar': {
    guide: 'İşaret tablosunda f’nin değil f′nin işareti incelenir. Önce fonksiyonun tanım kümesini belirleyin; sonra türevin sıfır olduğu ve tanımlı olmadığı sınırları işaretleyin. Fonksiyonun tanım dışı noktaları aralıkları böler ama fonksiyonun kritik noktası sayılmaz. Her açık alt aralıktan bir deneme noktası seçmek işareti bulmaya yardım eder. f′ > 0 artmayı garanti eder; ancak tek bir noktada f′ = 0 olması tüm artışı durdurmaz.',
    examples: [
      example('İki kritik nokta', 'f(x) = x³ − 3x² fonksiyonunun artma-azalma aralıklarını bulun.', ['f′(x) = 3x(x − 2); sıfırlar 0 ve 2’dir.', '−1, 1 ve 3 deneme noktaları türev için sırasıyla +, −, + işaretlerini verir.', 'Her işareti ilgili aralığa aktarın.'], '(−∞,0) ve (2,∞) üzerinde artan; (0,2) üzerinde azalan.'),
      example('Tanım dışı noktada bölme', 'f(x) = 1/x fonksiyonunun yönünü inceleyin.', ['Tanım kümesi x ≠ 0’dır.', 'f′(x) = −1/x² her tanımlı noktada negatiftir.', 'Tanım kümesi 0 ile iki ayrı aralığa bölünür.'], '(−∞,0) ve (0,∞) aralıklarının her birinde azalır. Tüm tanım kümesinde tek bir azalan aralık denmez.'),
      example('Sıfır türev artışı bozmaz', 'f(x) = x³ için 0’da f′ = 0 olması ne anlama gelir?', ['f′(x) = 3x² bulunur.', 'Türev 0 dışında pozitif, 0’da sıfırdır; işaret değişmez.', 'x₁ < x₂ için x₁³ < x₂³ eşitsizliği de artışı doğrular.'], 'Fonksiyon tüm gerçek sayılarda artandır; 0’da yatay teğeti vardır.'),
    ],
    mistakes: ['Fonksiyon negatifken mutlaka azaldığını düşünmek; negatif bir çıktı ile negatif eğim farklıdır.', 'Paydanın sıfır olduğu noktayı işaret tablosunda atlamak.'],
    exercises: [exercise('f(x) = x² − 4x nerede azalır?', '(−∞,2)', 'f′(x) = 2x − 4 < 0 koşulu x < 2 verir.'), exercise('f(x) = −x³ fonksiyonu artan mı azalan mı?', 'Tüm gerçek sayılarda azalan.', 'f′ = −3x², 0 dışında negatiftir; 0’da işaret değişmez.')],
  },
  'turevde-maksimum-minimum': {
    guide: '“En büyük” ifadesinin yerel mi yoksa bütün aralık için mi sorulduğunu ayırın. Kapalı bir aralıkta sürekli fonksiyonun mutlak ekstremumlarını bulmak için içteki kritik noktaların yanı sıra uç noktaları da karşılaştırın. Bir optimizasyon probleminde değişkenin fiziksel sınırları çözümün parçasıdır. İkinci türev testi f′(a) = 0 koşulu altında uygulanır; f″(a) = 0 çıktığında karar vermez. Bu durumda işaret değişimine veya doğrudan değerlere dönün.',
    examples: [
      example('Kapalı aralıkta mutlak değerler', 'f(x) = x² − 2x için [0,3] üzerindeki en küçük ve en büyük değerleri bulun.', ['f′(x) = 2x − 2 = 0 denkleminden x = 1 bulunur.', 'İç nokta ve uçlar: f(0) = 0, f(1) = −1, f(3) = 3.', 'Bu üç fonksiyon değerini karşılaştırın.'], 'En küçük değer −1 (x = 1), en büyük değer 3 (x = 3).'),
      example('Yatay teğet ama ekstremum yok', 'f(x) = x³ fonksiyonunda 0 ekstremum mudur?', ['f′(x) = 3x² ve f′(0) = 0’dır.', 'Türev 0’ın iki yanında da pozitiftir.', 'İşaret değişmediği gibi f, 0’ın solunda negatif sağında pozitiftir.'], '0 yerel maksimum veya minimum değildir.'),
      example('Kısıtlı alan problemi', 'Bir duvar boyunca kurulacak dikdörtgenin kalan üç kenarı için 24 m çit var. En büyük alan?', ['Duvara dik iki kenar x, paralel kenar 24 − 2x olur; 0 < x < 12.', 'A(x) = x(24 − 2x), A′(x) = 24 − 4x; kritik değer x = 6.', 'A″ = −4 < 0; tepe noktası maksimumdur. Diğer kenar 12 m olur.'], 'En büyük alan 72 m²; kenarlar 6 m ve 12 m.'),
    ],
    mistakes: ['Kritik x değerini, sorulan en büyük fonksiyon değeri diye vermek.', 'Kapalı aralık sorusunda uç noktaları kontrol etmemek.'],
    exercises: [exercise('f(x) = −x² + 6x için en büyük değer nedir?', '9', 'f′ = −2x + 6 sıfırken x = 3; f(3) = 9 ve aşağı açılan paraboldür.'), exercise('f(x) = x⁴ için 0’da ikinci türev testi karar verir mi?', 'Hayır; yine de 0 minimumdur.', 'f″(0) = 0 testi kararsız bırakır. x⁴ ≥ 0 eşitsizliği minimumu doğrudan gösterir.')],
  },
  'turev-ile-grafik-cizimi': {
    guide: 'Grafiği çizmeden önce tanım kümesi ve eksen kesişimlerini yazın; sonra birinci ve ikinci türevin işaretlerini ayrı tablolarda inceleyin. Artmak, yukarı konkav olmakla aynı şey değildir: eğim pozitifken azalıyor olabilir. Büküm için grafikte bir nokta ve konkavlık değişimi gerekir; fonksiyonun tanımsız olduğu bir düşey asimptot büküm noktası değildir. Limitler uzak uçları ve asimptotları tamamlar. Tüm bilgileri birkaç sayısal noktayla karşılaştırmak çizim hatalarını yakalar.',
    examples: [
      example('Bir kübik fonksiyonun iskeleti', 'f(x) = x³ − 3x grafiğini temel özellikleriyle analiz edin.', ['Kökler −√3, 0, √3’tür. f′ = 3(x² − 1) ile kritik noktalar ±1 bulunur.', 'Türev +, −, + sırasındadır: (−1,2) yerel maksimum, (1,−2) yerel minimumdur.', 'f″ = 6x, 0’da işaret değiştirir; grafik solda aşağı, sağda yukarı konkavdır.'], 'Büküm noktası (0,0); uçlar kübik terim nedeniyle solda −∞, sağda +∞ yönündedir.'),
      example('Tanım dışı nokta büküm değildir', 'f(x) = 1/x için asimptot ve konkavlığı inceleyin.', ['x = 0 tanım dışıdır ve düşey asimptottur; y = 0 yatay asimptottur.', 'f′ = −1/x² ile iki kolda da azalma görülür.', 'f″ = 2/x³ solda negatif, sağda pozitiftir; ancak 0 grafikte yoktur.'], 'İki kol farklı konkavlıktadır; x = 0 büküm noktası değildir.'),
      example('İkinci türevin sıfırı', 'f(x) = x⁴ grafiğinde 0 büküm noktası mı?', ['f′ = 4x³, 0’da negatiften pozitife geçer.', 'f″ = 12x², 0’da sıfır ama iki yanda pozitiftir.', 'Konkavlık değişmediği için büküm koşulu oluşmaz.'], '(0,0) minimumdur, büküm noktası değildir.'),
    ],
    mistakes: ['f″ = 0 olan her noktayı büküm saymak; işaret değişimi gerekir.', 'Asimptotu grafiğin asla kesemeyeceği çizgi olarak tanımlamak; yatay asimptot kesilebilir.'],
    exercises: [exercise('f(x) = x² için artma-azalma ve konkavlık nedir?', '0’ın solunda azalan, sağında artan; her yerde yukarı konkav.', 'f′ = 2x ve f″ = 2 işaretleri kullanılır.'), exercise('f(x) = −x³ grafiğinin büküm noktası nedir?', '(0,0)', 'f″ = −6x, 0’da pozitiften negatife geçer; fonksiyon burada süreklidir.')],
  },
  'turev-sorusu-nasil-cozulur': {
    guide: 'Soruyu çözmeden önce istenen çıktıyı bir cümleyle yazın: fonksiyon, sayı, nokta, doğru veya aralık. Bu ayrım, doğru türevi bulup yanlış türde cevap vermeyi önler. “Paralel teğet” bir eğim eşitliği; “artan” bir işaret eşitsizliği; “en büyük” ise aday değer karşılaştırmasıdır. Bir kural seçmeden önce çarpanlara ayırma ve sadeleştirme fırsatlarını değerlendirin. Sonuçta tanım kümesine, birimlere ve sorudaki aralığa geri dönün.',
    examples: [
      example('Eğim mi doğru mu?', 'f(x) = x² + 1 grafiğinin x = 2 noktasındaki teğetini bulun.', ['Nokta (2,5), eğim f′(2) = 4’tür.', 'Soru yalnız eğimi değil doğruyu istiyor: y − 5 = 4(x − 2).', 'Denklemi düzenleyip x = 2’de y = 5 verdiğini kontrol edin.'], 'y = 4x − 3'),
      example('Sadeleştirerek türev', 'f(x) = (x² + x)/x fonksiyonunun türevini bulun.', ['Tanım kümesi x ≠ 0’dır.', 'Bu kümede f(x) = x + 1 olduğundan uzun bölüm kuralına gerek yoktur.', 'Türev 1 bulunur; başlangıçtaki tanım kısıtı korunur.'], 'f′(x) = 1, x ≠ 0.'),
      example('Parametreli eğim', 'f(x) = ax² + x grafiğinin x = 1’deki teğeti y = 5x − 2 doğrusuna paralel. a kaçtır?', ['Paralel doğruların eğimleri eşittir; hedef eğim 5’tir.', 'f′(x) = 2ax + 1, dolayısıyla f′(1) = 2a + 1.', '2a + 1 = 5 denklemini çözün.'], 'a = 2; doğrunun −2 sabit terimi paralellik için kullanılmaz.'),
    ],
    mistakes: ['Teğet denklemi sorusunda yalnız eğimi yazmak.', 'Sadeleştirme sonrası çıkarılan noktayı fark etmeden sonuca dahil etmek.'],
    exercises: [exercise('f(x) = (x² + 2)² için x = 1’de eğim?', '12', 'Zincir kuralı: f′ = 4x(x² + 2). x = 1 yazılır.'), exercise('f(x) = x² − 6x hangi açık aralıkta azalır?', '(−∞,3)', 'f′ = 2x − 6 < 0 koşulu x < 3 verir; cevap bir aralıktır.')],
  },
  'turevde-sik-yapilan-hatalar': {
    guide: 'Bir yanlışı düzeltirken yalnız doğru formülü yazmayın; yanlış adımın hangi yapıyı gözden kaçırdığını belirleyin. Çarpımda iki değişen parça, bileşkede iç fonksiyon, bölümde paydanın karesi kontrol edilir. Türevi farklı bir yolla elde etmek güçlü bir doğrulamadır: küçük polinomları açmak veya sadeleştirmek aynı sonuca götürmelidir. Sayısal fark oranı işaret ve büyüklük kontrolü sağlar ama tek başına cebirsel kanıt yerine geçmez.',
    examples: [
      example('Yanlış çarpım kuralını yakalama', 'Bir öğrenci (x² · x³)′ = 2x · 3x² = 6x³ yazıyor. Düzeltin.', ['Önce sadeleştirin: x² · x³ = x⁵.', 'Kuvvet kuralı 5x⁴ verir.', 'Çarpım kuralı da 2x · x³ + x² · 3x² = 5x⁴ sonucunu verir.'], 'Doğru türev 5x⁴; ayrı türevleri çarpmak yanlıştır.'),
      example('Kökün iç türevi', 'f(x) = √(4x + 1) için neden yalnız 1/(2√(4x + 1)) yetmez?', ['Dış fonksiyon karekök, iç fonksiyon 4x + 1’dir.', 'Dış türev iç türev olan 4 ile çarpılmalıdır.', '4/(2√(4x + 1)) sadeleştirilir.'], 'f′(x) = 2/√(4x + 1), x > −1/4.'),
      example('Bölümde işaret hatası', 'f(x) = 1/x için f′(x) = 1/x² iddiasını kontrol edin.', ['x ≠ 0 için f(x) = x^(−1) yazın.', 'Üs başa gelir ve bir azalır: −x^(−2).', 'Pozitif x’lerde 1/x azalır; negatif türev bu davranışla uyumludur.'], 'f′(x) = −1/x²'),
    ],
    mistakes: ['Üssü azaltıp katsayıya taşımamak veya ikisini farklı terimlere uygulamak.', 'Tanım kümesini yalnız ilk satırda yazıp cevapta unutmak.'],
    exercises: [exercise('Bir öğrenci (5x − 1)³ türevini 3(5x − 1)² buldu. Eksik nedir?', 'İç türev 5; doğru sonuç 15(5x − 1)².', 'Dış kuvvet kuralı zincir kuralıyla tamamlanır.'), exercise('f(x) = x² + 2 için f(3) ile f′(3) nedir?', '11 ve 6.', 'İlki yerine koymayla, ikincisi 2x türevinde x = 3 yazılarak bulunur.')],
  },
  'trigonometrik-fonksiyonlarin-turevi': {
    guide: 'Standart trigonometrik türev kuralları radyan ölçüsüne dayanır. Bileşke bir açının türevinde iç türev, çarpımda ise iki ayrı terim gerekir. sin²x gösterimi (sin x)² demektir; sin(x²) ile aynı fonksiyon değildir. Tanjant ve diğer oranlarda tanım kümesini de koruyun. Sonucu özel bir açıda değerlendirmek işaretleri kontrol etmeye yardım eder. Derece cinsinden bir değişken kullanılıyorsa radyana dönüşümün π/180 katsayısı zincir kuralına girer.',
    examples: [
      example('Bileşke kosinüs', 'f(x) = cos(3x²) için türevi bulun; x radyanla uyumlu değişkendir.', ['Dış türev negatif sinüstür: −sin(3x²).', 'İç ifade 3x²’nin türevi 6x’tir.', 'İki çarpanı birleştirin.'], 'f′(x) = −6x sin(3x²)'),
      example('Sinüsün karesi', 'g(x) = sin²x için türevi bulun.', ['İfade (sin x)² olarak okunur.', 'Dış türev 2sin x, iç türev cos x’tir.', '2sin x cos x istenirse iki kat açıyla yazılabilir.'], 'g′(x) = 2sin x cos x = sin 2x'),
      example('Dereceyle tanımlı değişken', 'h(t) = sin(πt/180) fonksiyonunda t derece sayısını temsil ediyor. h′(t)?', ['Sinüsün içine giren πt/180 radyan değeridir.', 'Dış türev cos(πt/180), iç türev π/180 olur.', 'Dönüşüm katsayısını çarpın.'], 'h′(t) = (π/180)cos(πt/180)'),
    ],
    mistakes: ['sin²x ile sin(x²)’yi aynı sanmak; dış ve iç fonksiyonlar farklıdır.', 'Kosinüs türevindeki eksi işaretini veya açı dönüşümünü unutmak.'],
    exercises: [exercise('f(x) = sin(2x) için f′(x)?', '2cos(2x)', 'İç açının türevi 2’dir; standart radyan kuralı kullanılır.'), exercise('f(x) = x cos x için f′(x)?', 'cos x − x sin x', 'Çarpım kuralında x’in türevi 1, cos x’in türevi −sin x olur.')],
  },
  'ustel-ve-logaritmik-fonksiyonlarin-turevi': {
    guide: 'Üstel fonksiyonda değişken üsttedir; xⁿ kuvvet fonksiyonuyla aˣ fonksiyonuna aynı kural uygulanmaz. Sabit taban a > 0, a ≠ 1 ise aˣ’in türevinde ln a çarpanı oluşur. Logaritmada ln(g(x)) için g(x) > 0 koşulu gerekir. ln|g(x)| kullanılıyorsa g(x) ≠ 0 olan aralıklarda türev g′/g olur. Logaritmik türev almada da başlangıçta pozitiflik veya mutlak değer koşullarını açık tutun.',
    examples: [
      example('Sabit taban, değişken üs', 'f(x) = 2^(3x) fonksiyonunun türevini bulun.', ['aᵘ türevi aᵘ ln(a) · u′ biçimindedir.', 'Burada a = 2, u = 3x ve u′ = 3’tür.', 'Çarpanları birleştirin.'], 'f′(x) = 3 ln(2) · 2^(3x)'),
      example('Logaritmanın içi', 'g(x) = ln(x² + 1) için türevi bulun.', ['x² + 1 her gerçek sayıda pozitiftir.', 'İç türev 2x, iç ifade x² + 1’dir.', 'g′ = iç türev / iç ifade kuralını uygulayın.'], 'g′(x) = 2x/(x² + 1), tüm gerçek x’ler için.'),
      example('Hem taban hem üs değişken', 'x > 0 için y = xˣ fonksiyonunun türevini bulun.', ['Pozitiflik sayesinde ln y = x ln x yazılır.', 'İki tarafın türevi: y′/y = ln x + 1.', 'y ile çarpıp y = xˣ değerini geri koyun.'], 'y′ = xˣ(ln x + 1)'),
    ],
    mistakes: ['aˣ’in türevini x·a^(x−1) yazmak; bu, değişkenin tabanda olduğu kuvvet kuralıyla karışır.', 'ln(g(x)) türevinde tanım kümesini sonradan genişletmek.'],
    exercises: [exercise('f(x) = e^(−2x) için f′(x)?', '−2e^(−2x)', 'İç üs −2x’in türevi −2’dir.'), exercise('f(x) = ln(5x − 1) için türev ve tanım koşulu?', '5/(5x − 1), x > 1/5.', 'Argüman pozitif olmalı; iç türev 5’tir.')],
  },
  'yuksek-mertebeden-turev': {
    guide: 'Her türevi bir önceki sonucun türevi olarak alın; f″, f′nin karesi değildir. Polinomlarda derece her adımda düşerken üstel ve trigonometrik fonksiyonlarda örüntü oluşabilir. İkinci türev eğimin nasıl değiştiğini anlatır; fonksiyonun artıp artmadığı birinci türevin sorusudur. Büküm adaylarını bulduktan sonra konkavlık değişimini kontrol edin. Yalnız f″(a) = 0 denklemini çözmek sınıflandırmayı tamamlamaz.',
    examples: [
      example('Ardışık polinom türevleri', 'f(x) = 2x³ − x² + 4 için ilk dört türevi bulun.', ['f′(x) = 6x² − 2x.', 'f″(x) = 12x − 2 ve f‴(x) = 12.', 'Sabit 12’nin türevi sıfırdır.'], 'f⁽⁴⁾(x) = 0; sonraki tüm türevler de sıfırdır.'),
      example('Üstel örüntü', 'f(x) = e^(2x) için n’inci türevi tahmin edip gerekçelendirin.', ['İlk türev 2e^(2x), ikinci türev 4e^(2x)’tir.', 'Her türevde iç üs nedeniyle bir 2 daha çarpılır.', 'n kez türevde toplam çarpan 2ⁿ olur.'], 'f⁽ⁿ⁾(x) = 2ⁿe^(2x), n ≥ 0 tam sayı.'),
      example('Periyodik türev döngüsü', 'f(x) = sin x için 10. türev nedir?', ['Türevler cos x, −sin x, −cos x, sin x olarak dört adımda döner.', '10’un 4’e bölümünden kalan 2’dir.', 'İkinci türevdeki biçimi seçin.'], 'f⁽¹⁰⁾(x) = −sin x'),
    ],
    mistakes: ['İkinci türevi birinci türevin karesi olarak hesaplamak.', 'İkinci türev pozitif diye fonksiyon mutlaka artıyor demek; örneğin x², negatif x’lerde azalır.'],
    exercises: [exercise('f(x) = x⁵ için f‴(x)?', '60x²', 'Sırayla 5x⁴, 20x³, 60x² bulunur.'), exercise('f(x) = cos x için 8. türev?', 'cos x', 'Dört türevde bir başlangıca dönülür; 8, 4’ün katıdır.')],
  },
  'turev-hareket-problemleri': {
    guide: 'Önce fonksiyonun konum mu hız mı olduğunu, zaman aralığını ve birimleri okuyun. Konum metre ve zaman saniye ise hız m/s, ivme m/s² olur. İşaretli hız yönü, |v| sürati ifade eder. Durma için v = 0; yön değiştirme için bu noktanın iki yanında hızın işaret değiştirmesi gerekir. Toplam yolu hesaplarken yalnız yön değiştirme anlarında bölmek yeterlidir. Yer değiştirme ise her durumda son konum eksi ilk konumdur.',
    examples: [
      example('Toplam yol ve yer değiştirme', 's(t) = t³ − 6t² + 9t metre, 0 ≤ t ≤ 4 saniye. Toplam yol nedir?', ['v(t) = 3(t − 1)(t − 3); aralık içinde 1 ve 3’te yön değişir.', 'Konumlar s(0) = 0, s(1) = 4, s(3) = 0, s(4) = 4.', 'Yol |4 − 0| + |0 − 4| + |4 − 0|, yer değiştirme 4 − 0 olarak hesaplanır.'], 'Toplam yol 12 m, yer değiştirme 4 m.'),
      example('Durma her zaman dönüş değildir', 's(t) = (t − 1)³ için t = 1’de yön değişir mi?', ['v(t) = 3(t − 1)² bulunur.', 'v(1) = 0, fakat iki yanda hız pozitiftir.', 'Parçacık bir an durur ve aynı yönde ilerlemeyi sürdürür.'], 'Yön değiştirme yoktur.'),
      example('Süratin artması', 's(t) = t² − 4t için t = 1 ve t = 3 anlarında sürat nasıl değişir?', ['v(t) = 2t − 4, a(t) = 2.', 't = 1’de v = −2 ve a = 2 zıt işaretlidir.', 't = 3’te v = 2 ve a = 2 aynı işaretlidir.'], 't = 1’de sürat azalır; t = 3’te artar.'),
    ],
    mistakes: ['Son konum eksi ilk konumu her zaman toplam yol saymak.', 'Pozitif ivmenin her zaman sürati artırdığını düşünmek; hızın işareti de gerekir.'],
    exercises: [exercise('s(t) = 5t² metre ise t = 2 saniyede hız ve ivme?', '20 m/s ve 10 m/s².', 'v = 10t, a = 10 bulunur.'), exercise('v(t) = t − 2 için [0,4] içinde yön değişimi ne zaman olur?', 't = 2', 'Hız 2’den önce negatif, sonra pozitiftir; sıfırda işaret değişir.')],
  },
  'integralde-degisken-degistirme': {
    guide: 'u seçiminin iyi olması için yalnız iç ifadenin kısalması yetmez; gerideki çarpan ve dx de du cinsinden yazılmalıdır. Sabit katsayı farkı dışarı alınabilir, fakat eksik x gibi bir değişken sabitmiş gibi eklenemez. Belirsiz integralde son cevapta x’e dönün ve C ekleyin. Belirli integralde sınırları u’ya çevirirseniz sonucu u sınırlarıyla hesaplayın. Türevle geri kontrol, unutulan katsayıları özellikle kolay yakalar.',
    examples: [
      example('Logaritmaya dönüşen integral', '∫ x/(x² + 4) dx integralini bulun.', ['u = x² + 4 seçin; du = 2x dx.', 'x dx = du/2 olduğundan integral (1/2)∫ du/u olur.', 'İntegrali alıp u yerine x² + 4 yazın; bu ifade her zaman pozitiftir.'], '(1/2)ln(x² + 4) + C'),
      example('Sınırları da dönüştürme', '∫₀¹ 2x(x² + 1)² dx integralini bulun.', ['u = x² + 1, du = 2x dx.', 'x = 0 için u = 1; x = 1 için u = 2 olur.', '∫₁² u² du = [u³/3]₁² = (8 − 1)/3 hesaplanır.'], '7/3'),
      example('İç türevin eksik kaldığı seçim', '∫ (x² + 1)² dx için u = x² + 1 doğrudan sadeleştirme sağlar mı?', ['du = 2x dx olur ama başlangıçta 2x çarpanı yoktur.', 'Bir x çarpanını keyfî biçimde eklemek integrali değiştirir.', 'Bunun yerine x⁴ + 2x² + 1 olarak açıp terim terim integral alın.'], 'x⁵/5 + 2x³/3 + x + C; bu soruda açmak daha kısa yoldur.'),
    ],
    mistakes: ['u’lu integralin içinde dönüştürülmemiş x veya dx bırakmak.', 'u cinsinden ilkel fonksiyona eski x sınırlarını uygulamak.'],
    exercises: [exercise('∫ 3x²(x³ + 2)⁴ dx integralini bulun.', '(x³ + 2)⁵/5 + C', 'u = x³ + 2 ve du = 3x² dx seçimi ∫ u⁴ du verir.'), exercise('∫₀¹ 2x/(x² + 1) dx kaçtır?', 'ln 2', 'u sınırları 1 ve 2 olur; ∫₁² du/u = ln 2 − ln 1.')],
  },
  'belirli-integral-nedir': {
    guide: 'Belirli integrali birikim olarak okuyun: aralık boyunca pozitif katkılar eklenir, negatif katkılar çıkarılır. Hesaplama için f’nin aralıkta sürekliliği gibi gerekli koşulları kontrol edin; özellikle paydanın sıfır olduğu bir noktayı aralığın içinden geçirmeyin. Sürekli f ve F′ = f için F(b) − F(a) kullanılır. Geometrik alan veya toplam yol isteniyorsa işaret değişimlerinde aralığı bölüp mutlak katkıları toplamak gerekir. Birim de integrandın birimi ile değişkenin biriminin çarpımıdır.',
    examples: [
      example('Negatif sonuç mümkündür', '∫₀² (x − 3) dx integralini bulun.', ['İlkel fonksiyon F(x) = x²/2 − 3x’tir.', 'F(2) = 2 − 6 = −4, F(0) = 0.', 'F(2) − F(0) = −4 bulunur; fonksiyon bütün aralıkta negatiftir.'], 'İntegral −4; eğri ile eksen arasındaki geometrik alan 4’tür.'),
      example('İptal olan katkılar', '∫₋₁¹ x dx ile aynı aralıktaki geometrik alanı karşılaştırın.', ['İlkel fonksiyon x²/2 olduğundan sınır farkı 1/2 − 1/2 = 0’dır.', 'Fonksiyon 0’da işaret değiştirir; alan için iki parçayı ayrı alın.', 'Soldaki ve sağdaki üçgenlerin alanları 1/2’şerdir.'], 'İntegral 0, geometrik alan 1.'),
      example('Teoremin koşulunu kontrol etme', '∫₋₁¹ 1/x² dx için [−1/x]₋₁¹ = −2 demek neden yanlış?', ['1/x², aralığın içindeki 0’da tanımsızdır; standart sınır farkı doğrudan uygulanamaz.', 'Bu bir uygunsuz integral problemidir; 0’ın iki yanında ayrı limit gerekir.', 'Örneğin ∫ε¹ 1/x² dx = 1/ε − 1, ε → 0⁺ iken sınırsız artar.'], 'İntegral yakınsamaz; −2 sonlu bir değer değildir. Bu örnek üniversite kalkülüsüne geçiş içindir.'),
    ],
    mistakes: ['Belirli integralin sonuna C eklemek; sınır farkında sabitler birbirini götürür.', 'İntegral ile geometrik alanı, işaret değişimini incelemeden eşitlemek.'],
    exercises: [exercise('∫₁³ 2x dx integralini bulun.', '8', '[x²]₁³ = 9 − 1 = 8.'), exercise('∫₀² f(x) dx = 5 ise ∫₂⁰ f(x) dx kaçtır?', '−5', 'İntegralin yönü ters çevrilince işareti değişir.')],
  },
};
