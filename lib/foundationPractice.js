// Original worked examples and self-checks for the Turkish foundation lessons.
const example = (title, question, steps, answer) => ({ title, question, steps, answer });
const exercise = (question, answer, explanation) => ({ question, answer, explanation });

export const foundationPractice = {
  'limit-nedir': {
    guide: 'Limiti hesaplarken önce hangi x değerine ve hangi yönden yaklaşıldığını belirleyin. Sonra fonksiyonun o değerin hemen çevresindeki davranışına bakın. Noktaya ait dolu işaret f(a)’yı gösterir; çevredeki eğrinin yaklaştığı yükseklik ise limiti belirler. Bir tabloda birkaç yakın değer görmek tahmin sağlar; kesin sonucu cebir veya tek taraflı limitlerle gerekçelendirin. Özellikle grafikte bir delik varsa “fonksiyon tanımsız, dolayısıyla limit yok” sonucuna hemen varmayın.',
    examples: [
      example('Doğrudan yerine koyma', 'x → 2 iken 3x + 1 ifadesinin limiti nedir?', ['Doğrusal fonksiyon her gerçek sayıda süreklidir; iki yönden aynı değere yaklaşır.', '3 · 2 + 1 = 7 hesaplanır.', 'Yakın değer kontrolü: x = 1,99 için 6,97; x = 2,01 için 7,03 elde edilir.'], 'Limit 7’dir. Tablo sonucu destekler; süreklilik yerine koymayı gerekçelendirir.'),
      example('Nokta değeri farklı olabilir', 'x ≠ 1 için f(x) = x + 2, f(1) = 9 olsun. x → 1 limitini bulun.', ['1’in yakınında, 1’den farklı tüm girdiler için x + 2 kuralı kullanılır.', 'Soldan ve sağdan x + 2 ifadesi 3’e yaklaşır.', 'f(1) = 9 bilgisi yalnız tek bir noktayı değiştirir; komşu değerleri değiştirmez.'], 'Limit 3, fonksiyon değeri 9’dur; fonksiyon 1’de sürekli değildir.'),
      example('İki tarafın uyuşmaması', 'x → 0 iken |x|/x ifadesinin limiti var mı?', ['x < 0 için |x| = −x, dolayısıyla oran −1 olur.', 'x > 0 için |x| = x, dolayısıyla oran 1 olur.', 'Sol limit −1 ve sağ limit 1 eşit değildir.'], 'İki taraflı limit yoktur. Noktaya bir değer atamak bunu değiştirmez.'),
    ],
    mistakes: ['0/0’ı sıfır veya bir saymak: bu bir sonuç değil, dönüşüm gerektiren belirsiz biçimdir.', 'Yalnız sağdaki değerleri kontrol etmek: iki taraflı limit için her iki yaklaşımın uyuşması gerekir.'],
    exercises: [exercise('x → 3 iken x² + 1 limitini bulun.', '10', 'Polinom süreklidir; 3² + 1 = 10 yazılır.'), exercise('x ≠ 2 için f(x) = 2x, f(2) = −1 ise x → 2 limiti kaçtır?', '4', 'Yakındaki değerler 2x ile belirlenir. Noktanın −1 olması limiti değiştirmez.')],
  },
  'limit-alma-kurallari': {
    guide: 'Toplam ve çarpım kurallarını kullanmadan önce parçaların sonlu limitlerinin var olduğundan emin olun. Bölüm kuralında ayrıca paydanın limiti sıfırdan farklı olmalıdır. Yerine koyma 0/0 veriyorsa bu kuralı doğrudan uygulamak mümkün değildir; önce ifadeyi yeniden yazın. Sadeleştirme sırasında çıkarılan noktayı tanım kümesine geri eklemeyin. Limitin hesabı için noktadaki eşitlik değil, yeterince yakın ve farklı noktalardaki eşitlik kullanılır.',
    examples: [
      example('Toplam ve çarpım', 'x → 2 iken (x² + 1)(3x − 2) limitini bulun.', ['İki çarpan polinom olduğu için limitleri ayrı hesaplanabilir.', 'İlk çarpan 5’e, ikinci çarpan 4’e yaklaşır.', 'Çarpım kuralıyla 5 · 4 alınır.'], '20'),
      example('Bölüm kuralının koşulu', 'x → 1 iken (x² + 3)/(x + 1) limitini bulun.', ['Paydanın limiti 2’dir ve sıfır değildir.', 'Payın limiti 1 + 3 = 4 olur.', 'Limitlerin oranı 4/2 hesaplanır.'], '2'),
      example('Kurala geçmeden sadeleştirme', 'x → 3 iken (x² − 9)/(x − 3) limitini bulun.', ['Yerine koyma 0/0 verir; bölüm kuralını bu biçimde kullanmayın.', 'Payı (x − 3)(x + 3) olarak ayırın; x ≠ 3 için ortak çarpanı sadeleştirin.', 'Yakında eşdeğer ifade x + 3 olduğundan 3 + 3 hesaplanır.'], '6; başlangıçtaki fonksiyonun 3’te tanımsız olması engel değildir.'),
    ],
    mistakes: ['Paydanın limiti sıfırken limitlerin oranını normal bölme gibi kullanmak.', 'Kök içinin gerçek sayılarda tanımlı olup olmadığını kontrol etmeden kök kuralı uygulamak.'],
    exercises: [exercise('x → 2 iken (x³ − 8)/(x − 2) limitini bulun.', '12', 'x³ − 8 = (x − 2)(x² + 2x + 4); kalan ifadede x = 2 yazılır.'), exercise('x → 0 iken (2x + 1)/(x² + 4) kaçtır?', '1/4', 'Payda 4’e yaklaşır; bölüm kuralının koşulu sağlanır.')],
  },
  'sagdan-ve-soldan-limit': {
    guide: 'Parçalı bir fonksiyonda yaklaşma yönü hangi kuralı kullanacağınızı belirler. Önce x’in noktadan küçük mü büyük mü olduğunu seçin; ardından yalnız o parçanın ifadesinde limite geçin. Eşitlik işaretinin hangi satırda olduğu f(a)’yı belirler, komşulukta kullanılan kuralı değiştirmez. Son adımda iki sonucu karşılaştırın. Tek tarafın sonsuza gitmesini sonlu bir limit varmış gibi yorumlamayın; sınırsız büyümeyi ayrıca belirtin.',
    examples: [
      example('Limit var, değer farklı', 'x < 1 için f(x) = 2x, x > 1 için f(x) = x + 1, f(1) = 7. Limiti bulun.', ['Solda 2x kuralı kullanılır: sol limit 2’dir.', 'Sağda x + 1 kuralı kullanılır: sağ limit 2’dir.', 'İki sonuç eşittir; f(1) ayrıca 7 olarak verilmiştir.'], 'Limit 2’dir; f(1) = 7 olduğu için süreklilik yoktur.'),
      example('Parametreyi belirleme', 'x < 2 için f(x) = ax + 1, x ≥ 2 için f(x) = 5 − x. Limit hangi a için vardır?', ['Sol limit 2a + 1’dir.', 'Sağ limit 5 − 2 = 3 olur.', '2a + 1 = 3 denklemini çözün.'], 'a = 1; bu durumda ortak limit 3’tür.'),
      example('Düşey asimptotun iki yanı', 'x → 0 için 1/x’in sağ ve sol davranışını inceleyin.', ['Pozitif küçük sayılara bölmek pozitif ve sınırsız büyük değerler verir.', 'Negatif küçük sayılara bölmek negatif ve mutlak değerce sınırsız büyük değerler verir.', 'İki yön aynı sonlu değere yaklaşmaz.'], 'Sağda +∞, solda −∞ yönünde büyüme vardır; iki taraflı limit yoktur.'),
    ],
    mistakes: ['Parçayı x = a değerine göre seçmek; oysa tek taraflı limitte x < a veya x > a kullanılır.', 'Sol ve sağ limitleri toplayıp ikiye bölmek: ortak limit böyle tanımlanmaz.'],
    exercises: [exercise('x < 0 için f(x) = x + 3, x ≥ 0 için f(x) = x² + 3. x → 0 limiti?', '3', 'Sol ve sağ ifadeler ayrı ayrı 3’e yaklaşır.'), exercise('x < 1 için f(x) = 2, x ≥ 1 için f(x) = 4. x → 1 limiti?', 'Yoktur.', 'Sonlu tek taraflı limitler 2 ve 4 olduğu için eşit değildir.')],
  },
  'limitte-belirsizlikler': {
    guide: 'Yöntemi ifadenin yapısına göre seçin: polinom farklarında çarpanlara ayırma, köklü farklarda eşlenik, sonsuzdaki rasyonel ifadelerde en yüksek dereceye bölme çoğu zaman yeterlidir. Belirsizlik bir hesaplama ipucudur, limitin varlığına ilişkin karar değildir. L’Hôpital üniversite kalkülüsünde kullanılan koşullu bir yöntemdir: ilgili delinmiş aralıkta türevlenebilirlik, g′ ≠ 0, uygun 0/0 veya ∞/∞ biçimi ve türevler oranının limitinin varlığı gibi şartlar kontrol edilmelidir. Önce cebirsel yolu öğrenin.',
    examples: [
      example('Köklü fark ve eşlenik', 'x → 4 iken (√x − 2)/(x − 4) limitini bulun.', ['Yerine koyma 0/0 verir. Payı eşleniği √x + 2 ile çarpıp paydayı da aynı ifadeyle çarpın.', 'Pay x − 4 olur; x ≠ 4 için sadeleştirin.', 'Kalan 1/(√x + 2) ifadesinde yerine koyun.'], '1/4'),
      example('Sonsuzda aynı derece', 'x → +∞ iken (3x² − x)/(2x² + 5) limitini bulun.', ['Pay ve paydayı x²’ye bölün.', '(3 − 1/x)/(2 + 5/x²) elde edilir.', '1/x ve 5/x² sıfıra yaklaşır; payda 2’ye gider.'], '3/2'),
      example('Sonsuz eksi sonsuz', 'x → +∞ iken √(x² + x) − x limitini bulun.', ['Eşlenikle çarpma sonucu x/(√(x² + x) + x) elde edilir.', 'x pozitif olduğu için √(x² + x) = x√(1 + 1/x) yazılır.', 'x sadeleşince 1/(√(1 + 1/x) + 1) kalır.'], '1/2; iki büyük terimin farkı sıfır olmak zorunda değildir.'),
    ],
    mistakes: ['∞’yi sıradan sayı gibi çıkarıp ∞ − ∞ = 0 demek.', 'L’Hôpital’de kesrin türevini almak: kural koşulları sağlanırsa pay ve payda ayrı ayrı türevlenir.'],
    exercises: [exercise('x → 1 iken (x³ − 1)/(x − 1) limitini bulun.', '3', 'Pay (x − 1)(x² + x + 1) biçimindedir; sadeleştirme sonrası 1 + 1 + 1 bulunur.'), exercise('x → +∞ iken (2x + 1)/(x² + 1) kaçtır?', '0', 'x²’ye bölün: pay 2/x + 1/x² ile sıfıra, payda 1’e yaklaşır.')],
  },
  'sureklilik-nedir': {
    guide: 'Süreklilik sorusunu üç ayrı hesap olarak düşünün: noktadaki değer, sol limit ve sağ limit. Önce limitlerin eşitliğini, sonra ortak değerin f(a) ile eşitliğini kontrol edin. Parçalı fonksiyonda bilinmeyen sabit varsa bu eşitlikler denklem verir. Bir aralığın iç noktalarında iki tarafı; kapalı aralığın uçlarında ise aralığın içinden yaklaşımı inceleyin. Polinomların sürekli olması, paydası sıfırlanan her kesrin de sürekli olduğu anlamına gelmez.',
    examples: [
      example('Deliği tamamlama', 'x ≠ 2 için f(x) = (x² − 4)/(x − 2), f(2) = k. Süreklilik için k?', ['x ≠ 2 için kesir x + 2’ye sadeleşir.', 'İki taraflı limit 4’tür.', 'Süreklilik için noktadaki değer de 4 olmalıdır.'], 'k = 4'),
      example('Parçaları birleştirme', 'x < 1 için f(x) = ax + 2, x ≥ 1 için f(x) = x² + 4. Süreklilik için a?', ['Sol limit a + 2’dir.', 'Sağ limit ve f(1), 1 + 4 = 5 olur.', 'a + 2 = 5 koşulu üç değeri eşitler.'], 'a = 3'),
      example('Ara değer ile kökün varlığı', 'x³ + x − 1 = 0 denkleminin (0,1) içinde kökü olduğunu gösterin.', ['f(x) = x³ + x − 1 polinomdur, [0,1] üzerinde süreklidir.', 'f(0) = −1 ve f(1) = 1 olduğundan uç değerler zıt işaretlidir.', 'Ara değer teoremiyle arada f(c) = 0 olan en az bir c vardır.'], 'Bir kökün varlığı kanıtlanır; kesin kök değeri bu yöntemle hesaplanmış olmaz.'),
    ],
    mistakes: ['Limit var diye fonksiyonu sürekli saymak; değerle eşitlik de gerekir.', 'Ara değer teoremini aralık içinde kopuk bir fonksiyona uygulamak.'],
    exercises: [exercise('x ≠ 0 için f(x) = sin(x)/x. Radyan kullanılırsa f(0) kaç seçilmeli?', '1', 'Temel trigonometrik limit 1’dir; sürekli uzantıda nokta değeri de 1 olmalıdır.'), exercise('f(x) = 1/(x − 2) hangi gerçek sayılarda süreklidir?', 'x ≠ 2 olan tüm noktalarda.', 'Rasyonel fonksiyon paydasının sıfır olmadığı her noktada süreklidir.')],
  },
  'sureksizlik-turleri': {
    guide: 'Önce tek taraflı limitlerin sonlu olup olmadığını belirleyin. Sonlu ve eşitlerse noktadaki eksik ya da yanlış değer düzeltilerek süreklilik sağlanabilir. Sonlu fakat farklılarsa sıçrama vardır. En az bir tarafta sınırsız büyüme varsa sonsuz süreksizlik söz konusudur. Her süreksizlik bu üç örneğe indirgenmez: sin(1/x) gibi fonksiyonlarda salınım nedeniyle de limit oluşmayabilir. Nokta değeri değişikliği komşu eğrileri değiştiremez.',
    examples: [
      example('Giderilebilir süreksizlik', 'f(x) = (x² − 1)/(x − 1) fonksiyonunu x = 1 çevresinde inceleyin.', ['Fonksiyon 1’de tanımsızdır.', 'x ≠ 1 için x + 1’e eşittir; iki limit de 2’dir.', 'f(1) = 2 olarak uzatılırsa delik kapanır.'], 'Giderilebilir süreksizlik; sürekli uzantının değeri 2’dir.'),
      example('Sıçrama', 'x < 0 için f(x) = −2, x ≥ 0 için f(x) = 3 olsun.', ['Sol limit −2, sağ limit 3’tür.', 'İkisi de sonlu fakat farklıdır.', 'f(0)’ı değiştirmek bu iki sabit kolu birleştirmez.'], '0’da sıçrama süreksizliği vardır.'),
      example('Sonsuz süreksizlik', 'f(x) = 1/(x − 1)² fonksiyonunu x = 1 çevresinde inceleyin.', ['Payda her iki yanda pozitif olup sıfıra yaklaşır.', 'Fonksiyon değeri her iki yanda sınırsız artar.', 'Hiçbir sonlu f(1) seçimi bu davranışı gidermez.'], 'x = 1 düşey asimptottur; sonsuz süreksizlik vardır.'),
    ],
    mistakes: ['Tanımsız olan her noktayı giderilebilir sanmak; önce limiti hesaplayın.', 'Bir grafikte boş nokta görüp diğer taraftaki yaklaşımı incelememek.'],
    exercises: [exercise('x ≠ 0 için f(x) = x², f(0) = 5. Süreksizlik türü nedir?', 'Giderilebilir.', 'Limit 0’dır. f(0) = 0 seçimi sürekliliği sağlar.'), exercise('x → 0 iken sin(1/x) neden bir limite yaklaşmaz?', 'Salınım sürer.', '0’a yaklaşan farklı dizilerde 1 ve −1 değerleri alınabilir; tek bir yüksekliğe yaklaşılmaz.')],
  },
  'turevlenebilirlik-ve-sureklilik': {
    guide: 'Bir noktada sonlu türev varsa fonksiyon orada süreklidir; ters yöndeki çıkarım doğru değildir. Köşe, sivri uç veya düşey teğet sürekliliğe rağmen sonlu türevi engelleyebilir. Parçalı bir fonksiyonda önce değerleri birleştirin, sonra sol ve sağ türevleri karşılaştırın. Sürekliliği kontrol etmeden yalnız parça türevlerini eşitlemek yanlış bir parametre kümesi verebilir. Noktadaki fark oranında f(a) değerini kullanmayı unutmayın.',
    examples: [
      example('Köşe noktası', 'f(x) = |x| fonksiyonunun 0’da sürekliliğini ve türevini inceleyin.', ['İki tarafta fonksiyon değeri 0’a yaklaşır ve f(0) = 0’dır.', 'h < 0 için |h|/h = −1, h > 0 için |h|/h = 1 olur.', 'Fark oranının iki taraflı limiti yoktur.'], 'Fonksiyon 0’da sürekli ama türevlenebilir değildir.'),
      example('İki koşullu parametre sorusu', 'x < 1 için f(x) = x², x ≥ 1 için f(x) = ax + b. 1’de türevlenebilirlik için a ve b?', ['Önce süreklilik: a + b = 1.', 'Sol türev 2x’in 1’deki değeri 2, sağ türev a’dır.', 'a = 2 koşulunu ilk denkleme koyun.'], 'a = 2, b = −1'),
      example('Düşey teğet', 'f(x) = ∛x fonksiyonunun 0’daki durumunu inceleyin.', ['Küp kök süreklidir; f(0) = 0’dır.', 'h ≠ 0 için fark oranı ∛h/h = 1/|h|^(2/3) olur.', 'h sıfıra yaklaşırken oran sınırsız artar; sonlu bir türev oluşmaz.'], '0’da süreklidir, fakat sonlu türevi yoktur.'),
    ],
    mistakes: ['“Grafik kesintisiz” bilgisini “türevi var” diye yorumlamak.', 'Parçalar farklı yüksekliklerdeyken eğimlerin eşitliğini yeterli görmek.'],
    exercises: [exercise('f(x) = x² için 0’da süreklilik ve türev durumu nedir?', 'Sürekli, f′(0) = 0.', 'Fark oranı h²/h = h olur ve 0’a yaklaşır.'), exercise('f fonksiyonu 2’de sürekli değilse orada türevlenebilir mi?', 'Hayır.', 'Türevlenebilirlik sürekliliği gerektirir; gerekli koşul sağlanmıyor.')],
  },
  'trigonometrik-fonksiyonlar': {
    guide: 'Dik üçgen oranları dar açılarda başlangıç sağlar; birim çember tanımı ise açıları tüm gerçek sayılara genişletir. Birim çemberde yatay koordinat kosinüs, düşey koordinat sinüstür. Tanjant için sinüsü kosinüse böldüğünüzden kosinüsün sıfır olduğu açılar tanım dışıdır. Bir grafikte genlik, periyot ve ötelemeyi ayrı okuyun. Katsayıyı yanlış yere uygulamamak için önce bir temel periyot üzerindeki belirgin noktaları işaretleyin.',
    examples: [
      example('Bölge ve işaret', 'sin(5π/6), cos(5π/6) ve tan(5π/6) değerlerini bulun.', ['5π/6 ikinci bölgededir; referans açısı π/6’dır.', 'Sinüs pozitif, kosinüs negatiftir: 1/2 ve −√3/2.', 'Tanjant bu iki değerin oranıdır.'], 'sin = 1/2, cos = −√3/2, tan = −1/√3'),
      example('Grafik özellikleri', 'y = 2sin(3x) − 1 için genlik, periyot ve değer aralığı nedir?', ['Sinüsün temel aralığı [−1,1]’dir; 2 ile çarpınca [−2,2] olur.', '−1 ötelemesi aralığı [−3,1] yapar.', 'İç katsayı 3 olduğundan periyot 2π/3’tür.'], 'Genlik 2, periyot 2π/3, görüntü aralığı [−3,1].'),
      example('Bir aralıkta denklem', '[0,2π) aralığında sin x = 1/2 denklemini çözün.', ['Referans açısı π/6’dır.', 'Sinüs birinci ve ikinci bölgede pozitiftir.', 'Bu aralıkta açılar π/6 ve π − π/6 olur.'], 'x = π/6 veya x = 5π/6'),
    ],
    mistakes: ['sin(a + b) ifadesini sin a + sin b sanmak; toplam açı özdeşliği gerekir.', 'Tanjantı kosinüsün sıfır olduğu açılarda tanımlamak.'],
    exercises: [exercise('cos π ve sin π değerleri nedir?', '−1 ve 0.', 'Birim çemberin sol uç noktası (−1,0)’dır.'), exercise('y = sin(2x) için periyot nedir?', 'π', 'İç açı 2π arttığında grafik tekrarlanır: 2T = 2π.')],
  },
  'birim-cember-ve-radyan': {
    guide: 'Radyan ölçüsü yay uzunluğunun yarıçapa oranıdır: θ = s/r. Bu nedenle bir tam tur 2π radyandır; 180° ise π radyana karşılık gelir. Birim çemberde r = 1 olduğundan yay uzunluğu ile radyan değeri sayısal olarak eşittir. Önce açıyı uygun bir tura indirgeyin, sonra bölgesini ve referans açısını belirleyin. Negatif açılarda saat yönünde dönüldüğünü, koordinatların sırasının (cos θ, sin θ) olduğunu hatırlayın.',
    examples: [
      example('Dereceden radyana', '150° kaç radyandır?', ['Dereceyi radyana çevirmek için π/180 ile çarpın.', '150π/180 kesrini 30 ile sadeleştirin.', 'Sonucun π’den küçük olduğunu kontrol edin; 150° yarım turdan küçüktür.'], '5π/6 radyan'),
      example('Negatif açı', '−π/3 açısının birim çemberdeki koordinatını bulun.', ['Pozitif x ekseninden saat yönünde 60° dönülür; dördüncü bölgeye gelinir.', 'Kosinüs pozitif, sinüs negatiftir.', 'Referans açı π/3 için değerler 1/2 ve √3/2’dir.'], '(1/2, −√3/2)'),
      example('Yay uzunluğu', 'Yarıçapı 6 cm olan çemberde 120° merkez açının gördüğü yay kaç cm?', ['120° = 2π/3 radyandır.', 's = rθ formülünde açı radyan olmalıdır.', '6 · 2π/3 hesaplanır.'], '4π cm'),
    ],
    mistakes: ['s = rθ formülüne 120 gibi derece değerini doğrudan yazmak.', 'Birim çemberde x koordinatını sinüs sanmak; yatay koordinat kosinüstür.'],
    exercises: [exercise('225° kaç radyandır?', '5π/4', '225 · π/180 = 5π/4.'), exercise('7π/3 açısının koordinatları nedir?', '(1/2, √3/2)', '2π çıkarıldığında π/3 kalır; aynı çember noktasına karşılık gelir.')],
  },
  'temel-trigonometrik-ozdeslikler': {
    guide: 'Özdeşlik bütün ortak tanım kümesinde geçerli eşitliktir; denklem ise yalnız bazı açılarda doğru olabilir. Sadeleştirmede ilk adım paydaların sıfır olmadığı koşulları kaydetmektir. Ardından sin²x + cos²x = 1, toplam-fark ve iki kat açı ilişkilerinden uygun olanı seçin. Bir özdeşliği kanıtlarken karmaşık taraftan başlayıp diğer tarafa ulaşmak işlemleri izlenebilir kılar. İki tarafta aynı anda kontrolsüz dönüşümler yapmak doğrulanması gereken eşitliği başlangıçta varsaymanıza yol açabilir.',
    examples: [
      example('Payda ve sadeleştirme', '(1 − cos 2x)/sin x ifadesini sadeleştirin.', ['1 − cos 2x = 2sin²x özdeşliğini kullanın.', 'Başlangıçtaki payda nedeniyle sin x ≠ 0 olmalıdır.', '2sin²x/sin x ifadesindeki ortak çarpanı sadeleştirin.'], '2sin x; başlangıç koşulu sin x ≠ 0 korunur.'),
      example('Toplam açı', 'sin 75° değerini bulun.', ['75° = 45° + 30° olarak yazın.', 'sin(a + b) = sin a cos b + cos a sin b uygulayın.', '(√2/2)(√3/2) + (√2/2)(1/2) terimlerini toplayın.'], '(√6 + √2)/4'),
      example('Özdeşlikten denkleme', '[0,2π) aralığında cos 2x = 1 denklemini çözün.', ['cos 2x = 1 − 2sin²x yazın.', '1 − 2sin²x = 1 eşitliği sin x = 0 verir.', 'İstenen aralıkta sinüsün sıfır olduğu noktaları seçin.'], 'x = 0 veya x = π; 2π aralığa dahil değildir.'),
    ],
    mistakes: ['Sadeleşen paydanın kısıtını silmek; eşitlik yalnız ortak tanım kümesinde geçerlidir.', 'cos(a + b) formülünde eksi yerine artı kullanmak.'],
    exercises: [exercise('sin²x + cos²x + tan²x ifadesini sadeleştirin.', 'sec²x', 'İlk iki terim 1 olur; 1 + tan²x = sec²x. cos x ≠ 0 koşulu vardır.'), exercise('sin 15° değerini bulun.', '(√6 − √2)/4', 'sin(45° − 30°) = sin45° cos30° − cos45° sin30° kullanılır.')],
  },
  'ustel-ve-logaritmik-fonksiyonlar': {
    guide: 'Logaritmik bir denklemde işlemlere başlamadan her argümanın pozitif olmasını şart koşun. Üstel denklemde ortak taban bulmak mümkünse üsleri eşitleyin; değilse logaritma alın. Çarpımın logaritması toplama ayrılır ama toplamın logaritması böyle ayrılmaz. logₐx için a > 0 ve a ≠ 1 gerekir. Bulduğunuz kökü başlangıçtaki ifadeye geri koymak, cebirsel dönüşümlerin üretebildiği geçersiz adayları ayıklamanın en güvenilir yoludur.',
    examples: [
      example('Ortak taban', '3^(2x − 1) = 27 denklemini çözün.', ['27 = 3³ yazılır.', 'Tabanı 3 olan üstel fonksiyon bire birdir; üsler eşitlenebilir.', '2x − 1 = 3 denklemini çözün.'], 'x = 2'),
      example('Tanım kümesiyle kök eleme', 'log₂(x − 1) + log₂(x + 1) = 3 denklemini çözün.', ['İki argüman pozitif olmalı: x > 1.', 'Logaritmaları birleştirin: log₂(x² − 1) = 3, yani x² − 1 = 8.', 'x = ±3 adaylarından yalnız x > 1 koşulunu sağlayanı alın.'], 'x = 3; −3 tanım dışıdır.'),
      example('Taban birden küçükse', '(1/2)^x > 4 eşitsizliğini çözün.', ['4 = (1/2)^(−2) olarak yazılır.', '0 < 1/2 < 1 olduğundan fonksiyon azalandır.', 'Fonksiyon değeri büyük olan girdinin üssü daha küçüktür.'], 'x < −2'),
    ],
    mistakes: ['ln(x + y) = ln x + ln y yazmak; bu kural çarpım için geçerlidir.', 'Üstel taban 0 ile 1 arasındayken eşitsizlik yönünü korumak.'],
    exercises: [exercise('ln(2x − 1) = 0 denklemini çözün.', 'x = 1', '2x − 1 = e⁰ = 1; bulunan değer x > 1/2 koşulunu sağlar.'), exercise('log₃81 kaçtır?', '4', '3⁴ = 81 olduğundan aranan üs 4’tür.')],
  },
  'fonksiyonlar-ve-grafikler': {
    guide: 'Bir formülün yanında tanım kümesini de düşünün; aynı formül farklı tanım kümelerinde farklı terslenebilirlik özellikleri gösterebilir. Görüntü kümesi gerçekten alınan çıktılardır, değer kümesi ise fonksiyonun hedef kümesidir. Bileşkede iç fonksiyonun çıktısı dış fonksiyonun kabul ettiği girdilerden olmalıdır. Grafik dönüşümlerini sırayla uygulayın: yatay kaydırma parantezin içinde, düşey kaydırma dışındadır. Ters fonksiyon için bire birlik ve seçilen hedef kümeye örtenlik birlikte değerlendirilir.',
    examples: [
      example('İki kısıtın kesişimi', 'f(x) = √(x − 1)/(x − 3) için gerçek tanım kümesini bulun.', ['Kök içi x − 1 ≥ 0 olmalı; x ≥ 1 elde edilir.', 'Payda x − 3 ≠ 0 olmalı; x = 3 çıkarılır.', 'Koşullar aynı anda sağlanmalıdır.'], '[1,3) ∪ (3,∞)'),
      example('Bileşkenin sırası', 'f(x) = 2x + 1 ve g(x) = x² için f(g(x)) ve g(f(x)) nedir?', ['f(g(x)) için f’nin girdisi yerine x² yazın.', 'g(f(x)) için g’nin girdisi yerine 2x + 1 yazın.', 'İkinci ifadede parantezin tamamının karesi alınır.'], 'f(g(x)) = 2x² + 1; g(f(x)) = (2x + 1)². Genellikle eşit değildirler.'),
      example('Ters için aralık seçme', 'f: [0,∞) → [0,∞), f(x) = x² fonksiyonunun tersini bulun.', ['Bu aralıkta x² artandır; her çıktı için tek bir negatif olmayan girdi vardır.', 'y = x² eşitliğinden x = √y alınır.', 'Girdi ve çıktı adlarını değiştirin.'], 'f⁻¹(x) = √x. Tanım kümesi tüm gerçek sayılar olsaydı x² bire bir olmazdı.'),
    ],
    mistakes: ['f(x − 2) grafiğini sola kaydırmak; 2 birim sağa kayar.', 'f⁻¹(x) ile 1/f(x) ifadelerini aynı sanmak; biri ters fonksiyon, diğeri çarpmaya göre terstir.'],
    exercises: [exercise('y = (x − 2)² + 3 parabolünün tepe noktası nedir?', '(2,3)', 'x² grafiği 2 birim sağa ve 3 birim yukarı ötelenir.'), exercise('f(x) = 3x − 6 için ters fonksiyon nedir?', 'f⁻¹(x) = (x + 6)/3', 'y = 3x − 6 eşitliğinde x yalnız bırakılır, sonra değişkenlerin rolleri değiştirilir.')],
  },
};
