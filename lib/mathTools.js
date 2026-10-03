export const mathTools = [
  {
    slug: 'denklem-cozucu', kind: 'equation', symbol: 'x = ?', title: 'Denklem Çözücü',
    seoTitle: 'Denklem Çözücü – Birinci ve İkinci Derece Denklem Çözme',
    description: 'Birinci ve ikinci derece denklemleri ücretsiz, üyeliksiz çözün. Katsayıları, diskriminantı ve gerçek kökleri işlem adımlarıyla inceleyin.',
    intro: 'Denklemin iki tarafını yazın; terimlerin nasıl toplandığını ve gerçek köklerin nasıl bulunduğunu adım adım görün.',
    scope: 'Tek bilinmeyenli, sadeleştirildiğinde en fazla ikinci dereceden olan polinom denklemleri. Girilen ifadelerde üs ve ara polinom derecesi en fazla 10 olabilir. Karmaşık kökler, eşitsizlikler ve denklem sistemleri desteklenmez.',
    label: 'Denklem', initial: 'x^2 - 5x + 6 = 0', examples: ['2x + 3 = 7', 'x^2 - 5x + 6 = 0', 'x^2 = 2', '2(x + 1) = 2x + 2'],
    guide: [
      ['Denklemi standart biçime getir', 'Her iki taraftaki terimleri tek tarafta toplayıp benzer terimleri birleştir. Birinci derecede ax + b = 0, ikinci derecede ax² + bx + c = 0 biçimini elde edersin.'],
      ['Uygun çözüm yöntemini kullan', 'Birinci derecede a sıfırdan farklıysa x = −b/a olur. İkinci derecede Δ = b² − 4ac hesaplanır: pozitifse iki gerçek kök, sıfırsa çakışık iki kök, negatifse gerçek kök yoktur.'],
      ['Eşitliği kontrol et', 'Bulduğun kökü başlangıçtaki denklemde yerine koy. Örneğin x² − 5x + 6 = 0 denkleminin kökleri 2 ve 3’tür; ikisi de sol tarafı sıfır yapar.'],
    ],
    faq: [
      ['Denklem çözücü hangi denklemleri destekler?', 'x bilinmeyenli birinci ve ikinci derece polinom denklemlerini çözer. Parantez, ondalık sayı ve sabit sayıya bölme kullanılabilir. Paydasında x bulunan ifadeler desteklenmez.'],
      ['Sonsuz çözüm ile çözüm olmaması arasındaki fark nedir?', 'Terimler sadeleşince 0 = 0 kalırsa her gerçek sayı çözümdür. 3 = 0 gibi yanlış bir eşitlik kalırsa hiçbir sayı çözüm değildir.'],
      ['Karekök içeren sonuçlar nasıl gösterilir?', 'İkinci derece denklemin kökleri rasyonelse kesir biçiminde, değilse kök formülüyle tam değer ve ayrıca yaklaşık değer olarak gösterilir.'],
    ],
    related: [{ href: '/makaleler', title: 'Matematik konu anlatımları ve çözümlü örnekler' }],
  },
  {
    slug: 'turev-hesaplama', kind: 'derivative', symbol: 'f′(x)', title: 'Türev Hesaplama',
    seoTitle: 'Türev Hesaplama – Adım Adım Polinom Türevi',
    description: 'Polinomların türevini ücretsiz ve üyeliksiz hesaplayın. Kuvvet kuralını her terimde uygulayan çözüm adımlarını ve örnekleri inceleyin.',
    intro: 'Polinomunuzu yazın; kuvvet kuralının her terime nasıl uygulandığını ve sadeleştirilmiş türev sonucunu görün.',
    scope: 'En fazla 10. dereceden, x değişkenli polinomlar. Trigonometrik, logaritmik, üstel fonksiyonlar ve değişkenli paydalar desteklenmez.',
    label: 'Polinom f(x)', initial: '3x^3 - 2x^2 + 5x - 7', examples: ['3x^3 - 2x^2 + 5x - 7', '(x + 1)^3', 'x^2/2 - 3x', '7'],
    guide: [
      ['Polinomu düzenle', 'Parantezleri açıp aynı kuvvetli terimleri topla. Araç, örneğin (x + 1)³ ifadesini açarak her terimi ayrı ayrı ele alır.'],
      ['Kuvvet kuralını uygula', 'axⁿ teriminin türevi a·n·xⁿ⁻¹ olur. Katsayıyı üs ile çarp, üssü bir azalt. Sabit terimler türevde sıfır olur.'],
      ['Terimleri birleştir', '3x³ − 2x² + 5x − 7 için terimlerin türevleri 9x², −4x, 5 ve 0’dır. Sonuç f′(x) = 9x² − 4x + 5 olur.'],
    ],
    faq: [
      ['Bu araç sin(x), ln(x) veya e^x türevi alır mı?', 'Hayır. Bu sürüm yalnız polinom türevi hesaplar. Trigonometrik ve logaritmik fonksiyonların kuralları için türev alma kuralları yazısını kullanabilirsiniz.'],
      ['Parantezli ifadelerin türevi hesaplanır mı?', 'Evet. (x + 1)^3 ve (x - 2)(x + 3) gibi polinoma açılabilen ifadeler desteklenir. Araç önce parantezleri açar, sonra kuvvet kuralını uygular.'],
      ['Bir sabitin türevi neden sıfır?', 'Sabit fonksiyonun değeri x değiştikçe değişmez. Değişim oranı, dolayısıyla türevi sıfırdır.'],
    ],
    related: [{ href: '/makaleler/turev-alma-kurallari', title: 'Türev alma kuralları' }, { href: '/makaleler/turevin-geometrik-yorumu', title: 'Türevin geometrik yorumu ve teğet grafiği' }],
  },
  {
    slug: 'integral-hesaplama', kind: 'integral', symbol: '∫ f(x) dx', title: 'İntegral Hesaplama',
    seoTitle: 'İntegral Hesaplama – Belirli ve Belirsiz Polinom İntegrali',
    description: 'Polinomların belirli ve belirsiz integralini ücretsiz hesaplayın. Kuvvet kuralı, integrasyon sabiti ve sınır işlemlerini adım adım görün.',
    intro: 'Polinomunuzu girin; belirsiz integralini bulun veya alt ve üst sınır ekleyerek belirli integralini hesaplayın.',
    scope: 'En fazla 10. dereceden polinomlar ve sonlu sayısal sınırlar. 1/x, köklü, trigonometrik ve logaritmik ifadeler ile sonsuz sınırlar desteklenmez.',
    label: 'İntegrali alınacak polinom f(x)', initial: '3x^2 - 2x + 1', examples: ['3x^2 - 2x + 1', 'x^2', '(x + 1)^2', '5'],
    guide: [
      ['Kuvveti artır ve yeni kuvvete böl', 'Polinomdaki axⁿ teriminin integrali a·xⁿ⁺¹/(n + 1) + C olur. Örneğin 3x² − 2x + 1 için bir ilkel fonksiyon x³ − x² + x’tir.'],
      ['Belirsiz integralde C sabitini unutma', 'Birbirinden sabit kadar farklı fonksiyonlar aynı türeve sahiptir. Bu yüzden belirsiz integral sonucu tek bir fonksiyon değil, +C ile belirtilen bir fonksiyon ailesidir.'],
      ['Belirli integralde F(b) − F(a) hesapla', 'Alt sınır a, üst sınır b ise ilkel fonksiyonun üst sınırdaki değerinden alt sınırdaki değerini çıkar. x²’nin 0’dan 2’ye integrali 8/3’tür. Negatif bölgeler integral sonucuna eksi işaretle katkı yapar.'],
    ],
    faq: [
      ['Belirli integral sonucu doğrudan alan mıdır?', 'Her zaman değil. Belirli integral işaretli birikimi verir. Geometrik alan için fonksiyonun negatif olduğu aralıkların katkısını pozitif almak gerekir.'],
      ['Sınırları ters girersem ne olur?', 'Araç girilen sırayı korur. Alt ve üst sınırı yer değiştirmek integralin işaretini değiştirir. İki sınır eşitse sonuç sıfırdır.'],
      ['Kesirli sınır veya katsayı kullanabilir miyim?', 'Evet. Katsayı için x^2/3, sınır için 1/2 yazabilirsiniz. Ondalık sayılarda nokta veya virgül kullanılabilir; binlik ayırıcı kullanmayın.'],
    ],
    related: [{ href: '/makaleler/integral-alma-kurallari', title: 'İntegral alma kuralları' }, { href: '/makaleler/belirli-integral-nedir', title: 'Belirli integral nedir?' }, { href: '/makaleler/integral-ile-alan-hesabi', title: 'İntegral ile alan hesabı' }],
  },
];
export const getMathTool = (slug) => mathTools.find((tool) => tool.slug === slug);
