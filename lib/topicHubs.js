import { foundationArticles } from './foundationArticles';
import { derivativeArticles } from './derivativeArticles';
import { integralArticles } from './integralArticleIndex';

const catalog = Object.fromEntries([...foundationArticles, ...derivativeArticles, ...integralArticles].map((article) => [article.slug, article]));
export const topicHubs = [
  {
    slug: 'fonksiyonlar', title: 'Fonksiyonlar', symbol: 'f(x)',
    description: 'Fonksiyonlar konusuna nereden başlamalısınız? Grafik okuma, tanım kümesi, üstel ve logaritmik fonksiyonlar için sıralı çalışma rehberi.',
    summary: 'Matematiğin dilini kur: girdiyi, çıktıyı ve grafiği birlikte düşün.',
    intro: 'Fonksiyon bilgisi limit, türev ve integral boyunca kullanılır. Bu merkezde önce bir kuralın hangi girdiler için tanımlı olduğunu ve grafiğinin ne söylediğini öğrenir, ardından üstel ve logaritmik fonksiyonlara geçersin.',
    prerequisite: 'Denklem çözme, koordinat düzlemi ve üslü sayılarda temel işlemler yeterli bir başlangıçtır.',
    outcomes: ['Bir fonksiyonun tanım kümesini belirlemek', 'Grafikte kökleri ve temel dönüşümleri okumak', 'Üstel ve logaritmik ifadelerin ters ilişkisini kullanmak'],
    routes: [
      { title: 'İlk kez çalışıyorsan', text: 'Fonksiyonlar ve grafikler dersindeki tanım kümesi örneklerinden başla.', href: '/makaleler/fonksiyonlar-ve-grafikler' },
      { title: 'Grafik biliyor, logaritmada takılıyorsan', text: 'Logaritmanın tanım koşulları ve üstel fonksiyonla ilişkisine geç.', href: '/makaleler/ustel-ve-logaritmik-fonksiyonlar' },
    ],
    stages: [
      { title: 'Fonksiyon dilini ve grafikleri öğren', why: 'Formüle geçmeden önce hangi girdilerin kullanılabildiğini ve grafiğin nasıl okunacağını netleştir.', slugs: ['fonksiyonlar-ve-grafikler'] },
      { title: 'Üstel ve logaritmik fonksiyonlarla genişlet', why: 'Tanım koşullarını koruyarak ters fonksiyon ilişkisini ve büyüme davranışını incele.', slugs: ['ustel-ve-logaritmik-fonksiyonlar'] },
    ],
    checkpoint: { question: 'f(x) = ln(x − 2) fonksiyonunun gerçek sayılarda tanım kümesi nedir?', answer: 'Logaritmanın içi pozitif olmalı: x − 2 > 0. Dolayısıyla tanım kümesi (2, ∞) olur. x = 2 dâhil değildir.', href: '/makaleler/ustel-ve-logaritmik-fonksiyonlar' },
    pitfall: 'Bir ifadeyi sadeleştirmek başlangıçtaki tanım kümesini genişletmez. Örneğin (x² − 1)/(x − 1), x ≠ 1 için x + 1’e eşittir; başlangıçtaki ifade x = 1’de tanımsız kalır.',
    practice: { title: 'Denklem çözerek fonksiyonun köklerini ara', text: 'Birinci ve ikinci derece polinomlar için f(x) = 0 yazıp gerçek kökleri adım adım inceleyebilirsin.', href: '/araclar/denklem-cozucu', label: 'Denklem çözücüyü aç' },
    next: 'trigonometri',
  },
  {
    slug: 'trigonometri', title: 'Trigonometri', symbol: 'sin θ',
    description: 'Trigonometri çalışma rehberi: trigonometrik fonksiyonlar, birim çember, radyan ve özdeşlikleri sıralı dersler ve kontrol sorusuyla öğrenin.',
    summary: 'Açı, çember ve fonksiyon arasındaki bağı kur; formülü anlamıyla kullan.',
    intro: 'Trigonometriyi yalnız oran ezberleyerek çalışmak işaret ve açı birimi hatalarına yol açabilir. Bu öğrenme yolu dik üçgendeki oranları birim çembere taşır, radyanı açıklar ve özdeşlik seçimine geçer.',
    prerequisite: 'Dik üçgen, Pisagor bağıntısı, kesir işlemleri ve koordinat düzlemini bilmek yararlıdır.',
    outcomes: ['Sinüs ve kosinüsün işaretini açı bölgesinden çıkarmak', 'Derece ile radyan arasında dönüşüm yapmak', 'Özdeşlikleri tanım koşullarını koruyarak uygulamak'],
    routes: [
      { title: 'Oranlar karışıyorsa', text: 'Sinüs, kosinüs ve tanjantın dik üçgen anlamıyla başla.', href: '/makaleler/trigonometrik-fonksiyonlar' },
      { title: 'Türeve hazırlık yapıyorsan', text: 'Önce radyan ölçüsünü, sonra temel özdeşlikleri tekrar et.', href: '/makaleler/birim-cember-ve-radyan' },
    ],
    stages: [
      { title: 'Temel trigonometrik fonksiyonları tanı', why: 'Oranların hangi kenarları karşılaştırdığını ve birim çemberde nasıl yorumlandığını öğren.', slugs: ['trigonometrik-fonksiyonlar'] },
      { title: 'Birim çember ve radyana geç', why: 'İşaretleri bölgeden okuyup açıları kalkülüste kullanılan radyan ölçüsüyle ifade et.', slugs: ['birim-cember-ve-radyan'] },
      { title: 'Özdeşlikleri çözümde kullan', why: 'Dönüşüm yaparken sıfıra bölme ve işaret kaybı gibi hataları fark etmeyi çalış.', slugs: ['temel-trigonometrik-ozdeslikler'] },
    ],
    checkpoint: { question: '150° kaç radyandır ve bu açının kosinüsü pozitif midir?', answer: '150 × π/180 = 5π/6 radyan. Açı ikinci bölgede olduğu için kosinüsü negatiftir; değeri −√3/2’dir.', href: '/makaleler/birim-cember-ve-radyan' },
    pitfall: 'sin²x + cos²x = 1 özdeşliği tüm gerçek x değerlerinde geçerlidir. Ancak bir dönüşümde sin x veya cos x’e bölüyorsan ilgili ifadenin sıfır olmadığı koşulunu ayrıca korumalısın.',
    practice: { title: 'Trigonometriyi türevle birleştir', text: 'Temel oranları ve radyanı öğrendikten sonra sinüs ve kosinüsün türev örneklerine geçebilirsin.', href: '/makaleler/trigonometrik-fonksiyonlarin-turevi', label: 'Trigonometrik türev örneklerini incele' },
    previous: 'fonksiyonlar', next: 'limit-ve-sureklilik',
  },
  {
    slug: 'limit-ve-sureklilik', title: 'Limit ve Süreklilik', symbol: 'lim',
    description: 'Limit ve süreklilik çalışma sırası: limitin anlamı, sağdan soldan limit, kurallar, belirsizlikler ve süreklilik için dersler ve kontrol sorusu.',
    summary: 'Bir noktaya yaklaşırken olanlarla, o noktadaki değeri birbirinden ayır.',
    intro: 'Limit çalışırken iki ayrı soruyu takip et: fonksiyon hangi değere yaklaşıyor ve noktada hangi değeri alıyor? Bu merkez, grafik yorumundan cebirsel hesaplamaya, oradan süreklilik ve türevlenebilirlik ilişkisine ilerler.',
    prerequisite: 'Fonksiyon grafiği okuma, çarpanlara ayırma ve kesir sadeleştirme becerilerini önce gözden geçir.',
    outcomes: ['Sağ ve sol limitten iki taraflı limitin varlığını belirlemek', '0/0 belirsizliğinde uygun sadeleştirmeyi seçmek', 'Süreklilik şartlarını ayrı ayrı kontrol etmek'],
    routes: [
      { title: 'Limitin anlamı oturmadıysa', text: 'Grafik ve değer tablosuyla yaklaşma fikrinden başla.', href: '/makaleler/limit-nedir' },
      { title: 'Yerine koyunca 0/0 çıkıyorsa', text: 'Belirsizlik dersinde çarpanlara ayırma ve eşlenik yöntemlerini incele.', href: '/makaleler/limitte-belirsizlikler' },
      { title: 'Parçalı fonksiyonda takılıyorsan', text: 'Sağ ve sol limiti ayrı okuyup süreklilik şartlarına geç.', href: '/makaleler/sagdan-ve-soldan-limit' },
    ],
    stages: [
      { title: 'Yaklaşmayı iki yönden incele', why: 'Fonksiyon değeri ile limitin farkını ve iki taraflı limitin koşulunu kur.', slugs: ['limit-nedir', 'sagdan-ve-soldan-limit'] },
      { title: 'Limitleri hesapla', why: 'Kuralları koşullarıyla kullan; doğrudan yerine koymanın yetmediği yerde yöntemi değiştir.', slugs: ['limit-alma-kurallari', 'limitte-belirsizlikler'] },
      { title: 'Süreklilikten türeve hazırlan', why: 'Limit, fonksiyon değeri ve türevlenebilirliğin birbirini hangi yönde gerektirdiğini ayırt et.', slugs: ['sureklilik-nedir', 'sureksizlik-turleri', 'turevlenebilirlik-ve-sureklilik'] },
    ],
    checkpoint: { question: 'x, 2’ye yaklaşırken (x² − 4)/(x − 2) ifadesinin limiti nedir? İfade x = 2’de tanımlı mı?', answer: 'x ≠ 2 için ifade x + 2’ye sadeleşir, bu yüzden limit 4’tür. Başlangıçtaki ifadenin paydası x = 2’de sıfır olduğundan o noktada tanımlı değildir. Limitin var olması, fonksiyon değerinin var olmasını gerektirmez.', href: '/makaleler/limit-nedir' },
    pitfall: '0/0 bir sonuç değildir; belirsiz biçimdir. Ayrıca bir fonksiyonun sürekli olması her zaman türevlenebilir olduğu anlamına gelmez: |x|, 0’da sürekli olmasına rağmen köşelidir.',
    practice: { title: 'Grafik ve tabloyla pekiştir', text: 'Limit dersindeki yaklaşım tablosunu incele; sağ ve sol değerlerin hangi sonuca yaklaştığını kendin söyle.', href: '/makaleler/limit-nedir#lesson-examples', label: 'Çözümlü limit örneklerine geç' },
    previous: 'trigonometri', next: 'turev',
  },
  {
    slug: 'turev', title: 'Türev', symbol: 'f′(x)',
    description: 'Türev çalışma rehberi: tanım, kurallar, teğet grafiği, maksimum minimum ve hareket problemleri. Sıralı dersler, mini test ve polinom hesaplayıcı.',
    summary: 'Değişim hızını anla; türevi grafik ve problem çözümüne taşı.',
    intro: 'Türev bir formül listesinden fazlasıdır: anlık değişimi ve grafiğin yerel eğimini anlatır. Önce tanım ve kuralları oturt, etkileşimli teğet grafiğiyle anlamını gör, ardından işaret tablosu ve uygulama sorularına geç.',
    prerequisite: 'Fonksiyonlar, limit ve süreklilik temelini bilmelisin. Özel fonksiyon türevlerinde radyan, üstel ve logaritmik fonksiyon bilgisi de gerekir.',
    outcomes: ['Bir fonksiyon için uygun türev kuralını seçmek', 'Türevin işaretinden artma ve azalma aralıklarını okumak', 'Kritik noktaları, uç noktaları ve problem koşullarını birlikte değerlendirmek'],
    routes: [
      { title: 'İlk kez öğreniyorsan', text: 'Türevin tanımından başla ve temel kurallarla devam et.', href: '/makaleler/turev-nedir' },
      { title: 'Formülü biliyor, anlamını arıyorsan', text: 'Teğet noktasını hareket ettirerek eğimin nasıl değiştiğini gör.', href: '/makaleler/turevin-geometrik-yorumu' },
      { title: 'Problem çözerken yöntem seçemiyorsan', text: 'Soru türünü tanıma ve çözüm stratejisini incele.', href: '/makaleler/turev-sorusu-nasil-cozulur' },
    ],
    stages: [
      { title: 'Tanım, kurallar ve geometrik anlam', why: 'İşlem becerisi ile teğet eğimi arasında bağlantı kur.', slugs: ['turev-nedir', 'turev-alma-kurallari', 'turevin-geometrik-yorumu'] },
      { title: 'Fonksiyonun davranışını incele', why: 'Türev işaretinden aralıkları belirle, ekstremum adaylarını kontrol et ve grafiği yorumla.', slugs: ['artan-azalan-fonksiyonlar', 'turevde-maksimum-minimum', 'turev-ile-grafik-cizimi'] },
      { title: 'Özel fonksiyonlar ve yüksek türevler', why: 'Trigonometrik, üstel ve logaritmik türevleri öğren; ikinci türevin ne söylediğini incele.', slugs: ['trigonometrik-fonksiyonlarin-turevi', 'ustel-ve-logaritmik-fonksiyonlarin-turevi', 'yuksek-mertebeden-turev'] },
      { title: 'Probleme uygula ve hatalarını bul', why: 'Soru türüne göre yöntem seç, hareket problemlerini çöz ve sık yapılan hataları gözden geçir.', slugs: ['turev-sorusu-nasil-cozulur', 'turev-hareket-problemleri', 'turevde-sik-yapilan-hatalar'] },
    ],
    checkpoint: { question: 'f(x) = x³ için f′(0) = 0 olması, 0’da maksimum veya minimum olduğunu kanıtlar mı?', answer: 'Hayır. f′(x) = 3x², 0’ın iki yanında da pozitiftir; fonksiyon artmaya devam eder. Yatay teğet tek başına ekstremum kanıtı değildir. İşaret değişimi ve tanım aralığı incelenmelidir.', href: '/makaleler/turevde-maksimum-minimum' },
    pitfall: 'Bir çarpımın türevi, türevlerin çarpımı değildir. Ayrıca f′(a) = 0 olan noktaları bulduktan sonra işaret değişimini ve varsa kapalı aralığın uç noktalarını kontrol etmeden karar verme.',
    practice: { title: 'Polinomun türevini kendin dene', text: 'En fazla 10. dereceden bir polinom yaz; her terimin kuvvet kuralıyla nasıl türevlendiğini incele.', href: '/araclar/turev-hesaplama', label: 'Türev hesaplayıcıyı aç' },
    interactive: { href: '/makaleler/turevin-geometrik-yorumu', title: 'Etkileşimli teğet grafiği ve türev mini testi' },
    previous: 'limit-ve-sureklilik', next: 'integral',
  },
  {
    slug: 'integral', title: 'İntegral', symbol: '∫',
    description: 'İntegral çalışma rehberi: belirsiz ve belirli integral, yöntem seçimi, değişken değiştirme, kısmi integrasyon ve alan hesabı için sıralı dersler.',
    summary: 'İlkel fonksiyon, birikim ve alanı ilişkilendir; soruya göre yöntem seç.',
    intro: 'İntegral sorularında önce ne istendiğini belirle: bir ilkel fonksiyon ailesi mi, belirli aralıktaki işaretli birikim mi, geometrik alan mı? Bu merkez temel kurallardan yöntem seçimine ve alan uygulamalarına giden bir çalışma sırası sunar.',
    prerequisite: 'Fonksiyonlar, temel türev kuralları ve cebirsel sadeleştirme bilgisi gerekir. Değişken değiştirmede zincir kuralı, kısmi integrasyonda çarpım kuralı yol gösterir.',
    outcomes: ['Belirli ve belirsiz integralin amaçlarını ayırmak', 'İntegralin yapısına göre kuvvet kuralı, değişken değiştirme veya kısmi integrasyon seçmek', 'İşaretli integral ile geometrik alanı ayırt etmek'],
    routes: [
      { title: 'C sabiti ve ilkel fonksiyon yeniyse', text: 'Belirsiz integralin anlamıyla başla.', href: '/makaleler/belirsiz-integral-nedir' },
      { title: 'Yöntem seçmekte zorlanıyorsan', text: 'İntegral alma kurallarındaki yöntem seçimini incele.', href: '/makaleler/integral-alma-kurallari' },
      { title: 'Soruda alan isteniyorsa', text: 'Grafiğin işaretini ve aralıkları bölme ihtiyacını kontrol et.', href: '/makaleler/integral-ile-alan-hesabi' },
    ],
    stages: [
      { title: 'İntegralin anlamını ve temel kuralları kur', why: 'İlkel fonksiyon ailesini anla ve sonucun türevini alarak kontrol et.', slugs: ['belirsiz-integral-nedir', 'integral-alma-kurallari'] },
      { title: 'İfadenin yapısına göre yöntem seç', why: 'İç fonksiyonun türevini aramak ile bir çarpımı parçalara ayırmak farklı çözüm yollarıdır.', slugs: ['integralde-degisken-degistirme', 'integral-sorusu-nasil-cozulur'] },
      { title: 'Sınırları ve alanı yorumla', why: 'Temel teoremi uygularken işaretli birikim ile pozitif geometrik alan arasındaki farkı koru.', slugs: ['belirli-integral-nedir', 'integral-ile-alan-hesabi'] },
      { title: 'Formülleri koşullarıyla tekrar et', why: 'Başvuru tablosunu ezber yerine kural seçimi ve kısa kontrol örnekleri için kullan.', slugs: ['integral-formulleri'] },
    ],
    checkpoint: { question: 'f(x) = x’in −1 ile 1 arasındaki belirli integrali ve x ekseniyle arasındaki geometrik alan aynı mıdır?', answer: 'Hayır. Belirli integral 0’dır; negatif ve pozitif katkılar birbirini götürür. Geometrik alan iki üçgenin alanlarının toplamıdır: 1/2 + 1/2 = 1.', href: '/makaleler/integral-ile-alan-hesabi' },
    pitfall: 'Belirsiz integralde +C unutulmaz. Belirli integralde değişken değiştiriyorsan sınırları da yeni değişkene dönüştür ya da eski değişkene dönüp ilk sınırları kullan; iki yaklaşımı karıştırma.',
    practice: { title: 'Belirli ve belirsiz integrali karşılaştır', text: 'Polinomunu gir, önce belirsiz integrali bul; ardından sınır ekleyerek F(b) − F(a) işlemini incele.', href: '/araclar/integral-hesaplama', label: 'İntegral hesaplayıcıyı aç' },
    previous: 'turev',
  },
];
export const getTopicHub = (slug) => topicHubs.find((topic) => topic.slug === slug);
export const getTopicLessons = (topic) => topic.stages.flatMap(({ slugs }) => slugs.map((slug) => catalog[slug]));
export const getTopicLesson = (slug) => catalog[slug];
export const getArticleTopic = (slug) => topicHubs.find((topic) => topic.stages.some((stage) => stage.slugs.includes(slug)));
