# SEO ve İçerik Devamlılık Notu

## 3 Ekim 2026 — Kısa derslerin genişletilmesi (4. madde)

- 12 temel konu, 11 türev konusu ve iki integral konusu olmak üzere 25 Türkçe derse konuya özgü çözüm yaklaşımı, üç yeni çözümlü uygulama, iki hata açıklaması ve iki cevaplı alıştırma eklendi: toplam 75 yeni örnek ve 50 alıştırma.
- Veriler `lib/foundationPractice.js` ve `lib/calculusPractice.js`; sunucu tarafında ortak gösterim `LessonPractice.jsx`. Cevaplar HTML `details` ile JavaScript olmadan da açılabilir. Mevcut etkileşimli teğet sayfası ve İngilizce içerikler bu pakete dahil değil.
- Limit başlangıç dersine limit ile nokta değeri ayrımını gösteren SVG grafik ve sayısal yaklaşım tablosu eklendi. Ek bölümler içindekilere bağlandı.
- Değişen sayfaların görünür güncelleme tarihi, Article dateModified, Open Graph modifiedTime ve sitemap lastModified bilgileri 3 Ekim 2026 ile eşitlendi; yayın tarihleri ve canonical adresler korundu.
- Karekök türevinin x > 0 koşulu ve grafik analizindeki büküm açıklaması netleştirildi. Üniversite düzeyi uygunsuz integral ve L’Hôpital içeriğinde koşullar belirtildi; öğretmen incelemesi yapıldığı iddia edilmedi.
- Doğrulama: Node 22 production build başarılı; 25 rotada HTTP 200, tüm yeni metinlerin SSR çıktısı, benzersiz bölüm kimlikleri, bölüm bağlantıları ve tarih tutarlılığı doğrulandı. 61 bağımsız sembolik matematik kontrolü geçti. Mobilde limit ve değişken değiştirme sayfalarında yatay taşma yok; cevap açma çalışıyor, tarayıcı konsol hatası görülmedi.
- Yalnız yerel kaynaklar güncellendi; canlıya yayınlanmadı. Mevcut ESLint yapılandırma eksikliği devam ediyor; build lint çalıştırmıyor.

## 3 Ekim 2026 — Arama niyeti haritası

- `SEO-KEYWORD-MAP.md`: 20 mevcut hedef sayfa, beş içerik/ürün fırsatı, niyet sınırları ve uygulama sırası belirlendi.
- Ürün sayfası ve integral kümesi ilk odak; türev ve limit mevcut içerik iyileştirmeleri ikinci aşama.
- Öncelikler editoryal ve ürün uyumuna dayalıdır; güncel Search Console veya Türkiye arama hacmi ölçümü değildir. Aşağıdaki Ağustos sinyalleri tarihsel bağlam olarak korunmuştur.
- Bu adımda canlı sayfa metadata veya URL değişikliği yapılmadı.

Son güncelleme: 20 Ağustos 2026

Bu dosya, sonraki çalışma turunda SEO ve içerik üretimine aynı stratejiyle devam edebilmek için tutulur.

## Mevcut durum

- Site yaklaşık bir haftadır SSR/HTML çıktısı alınabilen yeni yapıyla yayında.
- Search Console verisi henüz küçük bir örneklem içeriyor; günlük pozisyonlara göre sık değişiklik yapılmamalı.
- İlk sinyaller integral içerik kümesinin Google tarafından keşfedildiğini gösteriyor.
- Ticari öncelik `/yapay-zeka-matematik-cozucu`, bilgi trafiği önceliği integral içerik kümesi.

Paylaşılan ilk sayfa sinyalleri:

| Sayfa | Gösterim | Ortalama konum |
| --- | ---: | ---: |
| `/makaleler/integral-sorusu-nasil-cozulur` | 15 | 8,4 |
| `/makaleler/belirsiz-integral-nedir` | 14 | 8,4 |
| `/makaleler/integralde-degisken-degistirme` | 11 | 7,1 |
| `/makaleler/belirli-integral-nedir` | 13 | 14,8 |
| `/yapay-zeka-matematik-cozucu` | 18 | 21,2 |
| Ana sayfa | 43 | 61,7 |

Bu rakamlar karar vermek için tek başına yeterli değildir. Özellikle 11–18 gösterimlik örneklemde ortalama konum hızlı değişebilir.

## Tamamlanan teknik düzenlemeler

- Proje Node 22 serisine geçirildi; yerelde Node `22.23.2` ile build doğrulandı.
- `.node-version` değeri `22.23.2`, `package.json` engine koşulu `>=22.0.0 <23.0.0`.
- `wrangler@4.120.1` paketinin Node `>=22` gereksinimi karşılandı.
- Cloudflare deploy işleminde eski dependency sorunu tekrarlanırsa bir kez **Clear build cache and deploy** kullanılmalı.

## Tamamlanan landing page çalışması

- Ana ürün URL'si `/yapay-zeka-matematik-cozucu`.
- Ayrı `/fotografla-matematik-sorusu-cozme` sayfası aynı niyet/cannibalization riski nedeniyle açılmadı.
- Title, description, H1 ve görünür içerik şu kümeyle hizalandı: `matematik çözen yapay zekâ`, `yapay zekâ matematik çözücü`, `fotoğrafla matematik sorusu çözme`, `soru çözen yapay zekâ`, `matematik soru çözme uygulaması`.
- Fotoğrafla soru çözme bölümü, SSS, iç bağlantılar ve sitemap tarihi güncellendi.

### Sabit tutulacak alanlar

Landing page title, H1, meta description, canonical ve URL alanları en az 3–4 hafta tekrar değiştirilmemeli. Yeni Search Console verisi oluşmadan günlük dalgalanmalara göre müdahale edilmemeli.

## Yeni integral içerikleri

### İntegral Alma Kuralları

- URL: `/makaleler/integral-alma-kurallari`
- Birincil hedef: `integral alma kuralları`.
- Temel kurallar, mantık, dört çözümlü örnek, yöntem seçimi, sık hatalar ve SSS içeriyor.
- Article, BreadcrumbList ve FAQPage yapılandırılmış verileri; liste, sitemap ve ilgili iç bağlantılar eklendi.

### İntegral Formülleri

- URL: `/makaleler/integral-formulleri`
- Birincil hedef: `integral formülleri`.
- İkincil hedefler: `integral formülleri tablosu`, `temel integral formülleri`, `AYT integral formülleri`.
- Önceki sayfadan farklı olarak hızlı başvuru/formül tablosu niyetiyle hazırlandı.
- Temel, üstel, logaritmik ve trigonometrik formüller; `ax+b` kalıpları; belirli integral özellikleri; seçim rehberi, kompakt özet ve SSS içeriyor.
- Article, BreadcrumbList ve FAQPage yapılandırılmış verileri; liste, sitemap ve çift yönlü iç bağlantılar eklendi.

Her iki yeni rota da Node 22 production build sırasında statik HTML olarak başarıyla üretildi.

## İçerik stratejisi

- Önce integral konu kümesi tamamlanacak; rastgele konulara sıçranmayacak.
- Her yeni sayfanın tek ve ayrışan bir arama niyeti olacak.
- Aynı sorgunun varyasyonları için birden fazla ince sayfa oluşturulmayacak.
- Yeni içerikler ilgili makalelerle çift yönlü bağlanacak ve ürün landing page'ine doğal bağlantı verecek.
- Performans alan mevcut sayfaların URL, title ve H1 alanları sebepsiz değiştirilmeyecek.
- Çözümlü örnek, hata analizi, yöntem seçimi ve gerçek öğrenme değeri önceliklidir.

## Sıradaki iş

- Sıradaki sayfa: `/makaleler/trigonometrik-integraller`.
- Birincil hedef: `trigonometrik integraller`.
- Mevcut formül tablosunu tekrar etmemeli; trigonometrik özdeşlik seçimi, kuvvetlerin tek/çift olmasına göre yöntem, dönüşümler ve kapsamlı çözümlü örnekler sunmalı.
- Sonraki olası hedef: `/makaleler/cozumlu-integral-sorulari`.
- Mevcut `/makaleler/integral-sorusu-nasil-cozulur` kısmi integrasyonu hedeflediği için veri görülmeden ayrı `/kismi-integrasyon` sayfası açılmamalı.

## Ölçüm ve değişiklik kuralları

- Search Console haftalık snapshot ile takip edilmeli; günlük sonuçlara göre kod değiştirilmemeli.
- Son 7 gün, önceki 7 gün ve mümkünse son 28 gün karşılaştırılmalı.
- Gösterim, tıklama, CTR, sorgu sayısı, ilk 10 ve ilk 20'deki URL sayısı izlenmeli.
- Sayfa filtresiyle Sorgular tabloları özellikle şu URL'ler için alınmalı: ürün landing page'i, değişken değiştirme, integral sorusu, belirsiz integral ve belirli integral.
- Title/meta CTR müdahalesi için yaklaşık 100–200 gösterim, ağırlıklı 5–10 konum ve buna rağmen yaklaşık `%1` altı CTR gibi daha anlamlı örneklem beklenmeli.
- Önemli metadata değişikliklerinden sonra 2–4 hafta değerlendirme süresi bırakılmalı.

## Yayın sonrası

- Yeni sitemap'in deploy edildiği doğrulanmalı.
- Yeni URL'ler için Search Console'dan bir kez dizine ekleme isteği gönderilebilir.
- Aynı URL için tekrar tekrar istek gönderilmemeli.
- Sonraki içerik turundan önce mevcut değişikliklerin deploy edildiği doğrulanmalı.

## 3 Ekim 2026 — Türevin geometrik yorumu

- Türkçe sayfaya sürüklenebilir/klavyeyle kullanılabilir teğet grafiği, altı çözümlü soru, üç hata analizi ve üç açılır cevaplı alıştırma eklendi.
- İngilizce karşılığı `/en/articles/geometric-meaning-of-derivative`; grafik etiketleri, örnekler ve alıştırmalar çevrildi. Karşılıklı dil geçişi, canonical, hreflang ve sitemap eklendi.
- Node 22 ile production derlemesi geçti; iki dilde HTTP 200, HTML içeriği, canonical ve hreflang kontrol edildi. İngilizce kaydırıcı ve açılır cevap tarayıcıda doğrulandı.
- Yerel ENOENT/React Client Manifest hatası, `next dev` çalışırken aynı `.next` dizinine `next build` yapılmasından kaynaklandı. Build/deploy sırasında dev sunucusunu durdurun; son build sonrasında `next start` ile production önizleme yapın.
- Gerçek bir öğretmen incelemesi yapıldığı iddia edilmedi.

### Türev mini testi

- Aynı Türkçe/İngilizce konu sayfalarına sekiz soruluk mini test eklendi. Soru verisi `lib/derivativeQuiz.js`, ortak etkileşim `DerivativeMiniQuiz.jsx` içinde.
- Eksik cevapta gönderme kapalı; sonuçta puan, seçeneğe özel yanlış açıklaması, çözüm ve ilgili bölümlere tekrar bağlantısı var. Yeniden çözme tüm cevapları sıfırlar.
- Node 22 Cloudflare derlemesi geçti. Tarayıcıda İngilizce 7/8 ve normal doğrusu tekrar önerisi, sıfırlama ve Türkçe 8/8 doğrulandı; konsol hatası yok.


## 3 Ekim 2026 — 6. madde: web matematik araçları

- `/araclar`: araç dizini. `/araclar/denklem-cozucu`: birinci/ikinci derece gerçek kökler, diskriminant, özdeşlik ve çözümsüzlük. `/araclar/turev-hesaplama`: polinom türevi. `/araclar/integral-hesaplama`: polinomların belirli/belirsiz integrali.
- Hesaplamalar tarayıcıda, ücretsiz ve üyeliksiz yapılır; girilen ifadeler sunucuya gönderilmez. Fotoğraf/AI çözümü mevcut uygulamanın ayrı işlevidir. Sinüs, logaritma, değişkenli payda ve genel sembolik çözüm iddiası yoktur.
- `lib/math/polynomial.mjs` kısıtlı ayrıştırıcı ve BigInt rasyonel aritmetik kullanır; eval/Function yoktur. Girdi en fazla 160 karakter, 128 token, 16 parantez derinliği; üs/ara polinom derecesi 10, sayı başına 12 rakam, hesaplanmış kesirlerde 120 basamak sınırı vardır. İntegral sonucu 11. derece olabilir. Değişkenli paydalar sadeleşse bile reddedilir; tanım kümesi kaybolmaz.
- Araçların ayrı metadata/canonical, WebApplication/BreadcrumbList verisi, sunucuda üretilen açıklama/örnek/SSS ve sitemap kaydı vardır. Ana sayfa, menü, altbilgi, ürün sayfası ve ilgili türev/integral dersleri araçlara bağlantı verir. İngilizce araç sayfası bulunmadığı için çeviri hreflang iddiası eklenmedi.
- `npm run test:math`: aritmetik öncelik, kesirler, giriş sınırları, türev/integral tersliği, denklem kökleri ve belirli integral uç durumları. Node 22 gerekir.
- Tarayıcıda denklem/türev/integral hesaplama, Enter ile gönderme, hata mesajı, temizleme, girdi değişince eski sonucun kaldırılması doğrulandı. 390px ekranda sayfa taşması ve KaTeX hatası yok.
- Bu kayıt yerel uygulamayı anlatır; canlı yayın ve Search Console dizin durumu ayrıca doğrulanmalıdır.

## 3 Ekim 2026 — 7. madde: konu merkezleri

- `/konular` ve beş merkez eklendi: `fonksiyonlar`, `trigonometri`, `limit-ve-sureklilik`, `turev`, `integral`.
- Toplam 31 ders: 2 fonksiyon, 3 trigonometri, 7 limit/süreklilik, 12 türev, 7 integral. `lib/topicHubs.js` çalışma sırasını tutar; başlık ve açıklamalar mevcut ders kataloglarından alınır. İntegral dizini `lib/integralArticleIndex.js` içine taşındı; makale dizini de aynı kaynağı kullanır.
- Her merkezde ön bilgi, öğrenme hedefi, ihtiyaca göre başlangıç, sıralı dersler, native details ile cevap açılan kontrol sorusu, sık hata ve pratik bağlantısı var. Mevcut türev grafiği/testi ile polinom araçlarına bağlantı verilir; merkezlerin çalışması JavaScript'e bağlı değildir.
- Ana menü, altbilgi ve makale dizininden erişim sağlandı. Derslerde görünür breadcrumb, BreadcrumbList ve konuya dönüş bağlantısı birlikte güncellendi. Ayrı şablon kullanan belirsiz integral/kısmi integrasyon sayfaları da kapsandı.
- Mevcut ders URL/title/canonical/hreflang alanları korundu. Yeni sayfalara kendi metadata/canonical, CollectionPage/ItemList/BreadcrumbList ve sitemap kayıtları eklendi. Var olmayan İngilizce merkezler için hreflang eklenmedi.
- Yeni metinler sınav müfredatı veya tüm matematik konularını kapsadığı iddiasında bulunmaz. Konu merkezi çalışma yolunu; makale tekil öğrenme ihtiyacını; araç hesaplama ihtiyacını karşılar.
- Doğrulama: 6 yeni sayfada metadata/canonical/şema, 31 çift yönlü ders bağlantısı, 54 bağlantı/anchor ve 47 HTTP 200 sayfa kontrol edildi; sitemap kayıtları ve bilinmeyen konu için 404 doğru. Mobil 390px görünümde kontrol cevabı ve menü geçişi çalışıyor; yatay sayfa taşması yok. Son Cloudflare üretim derlemesi geçti. Yayın durumu yerel doğrulamadan ayrı takip edilmelidir.

## 3 Ekim 2026 — 8. madde: ders odaklı makale kütüphanesi

- `/makaleler` üst bölümüne bölüm bağlantıları ve “Çalışmaya başla” alanı eklendi. Konu seçiminin ardından 31 ders öğrenme sırasıyla listelenir; 9 gündem/rehber yazısı ayrı bölümde yayın tarihine göre sıralanır.
- Ders ve gündem filtreleri ile “Daha fazla göster” durumları birbirinden bağımsızdır. İki bölümün JavaScript kapalı listeleri de doğru href adreslerini korur. ItemList sırası görünür bölüm sırasına uyar.
- Kartlar ilgili bölüm başlığının altında h3 kullanır; ders kartlarında “Konu anlatımı”, diğerlerinde “Gündem ve rehber” etiketi gösterilir. İngilizce dizinin varsayılan davranışı korunur. Bu çalışma müfredat doğrulaması olan 9. maddenin yerine geçmez.
- Bilinmeyen araç/konu slug'larında `dynamicParams=false` nedeniyle oluşan Next.js NoFallbackError günlüğünü önlemek için varsayılan fallback davranışı kullanılır; sayfa kendi `notFound()` kontrolüyle 404 döndürür. Bilinen sayfalar generateStaticParams ile önceden üretilmeye devam eder.
- Doğrulama: Cloudflare/Next.js üretim derlemesi başarılı; sunucu günlüğünde Error/NoFallbackError yok. 40 öğeli şema ve 31+9 noscript bağlantısı, canonical ve İngilizce dizin 200 kontrol edildi. Tarayıcıda türev filtresi 6→12 kart, gündem filtresi 6→1 kart; iki bölüm birbirini etkilemiyor. Mobil 390px taşma ve konsol hatası yok. Konu merkezi bağlantı kontrolleri de yeniden geçti.

## 3 Ekim 2026 — 9. madde: ders düzeyi ve müfredat sınırları

- 31 Türkçe ders için `lib/lessonScope.js` ortak sınıflandırması eklendi: Lise temeli, Lise + ileri bölümler, İleri / üniversiteye geçiş. Ders üst bilgisi, kütüphane kartı, konu merkezi bağlantısı ve Article educationalLevel aynı kapsamı gösterir. Gündem/rehber yazıları ders sınıflandırmasına alınmaz.
- Kısmi integrasyonun AYT’de sık çıktığı iddiası kaldırıldı. İntegral formülleri başlığı ve SSS, genel ortaöğretim kapsamını aşan 1/x, üstel/trigonometrik integralleri zorunlu AYT formülleri olarak sunmayacak şekilde düzeltildi. URL ve canonical adresler korundu.
- L’Hôpital, uygunsuz integral, özel fonksiyon türevleri, ikinci/yüksek türev, konkavlık gibi eklerin ileri düzey olduğu belirtildi; karma derslerde temel ve ileri bölümler açıklanır.
- Resmî dayanak: MEB 2018 genel ortaöğretim matematik programı s. 39–41 (12.5.2.1, 12.5.3.3, 12.6.1.1–2); 2026–2027 OGM geçiş duyurusu; Fen Lisesi programının daha geniş kapsamı. Kaynak bağlantıları ve kontrol tarihi derslerde açılır notta bulunur. Etiketler YKS soru kapsamı veya tüm müfredatın karşılandığı iddiası değildir.
- 2026–2027 yılında yeni program hazırlık, 9, 10 ve 11. sınıflarda; önceki program 12. sınıfta sürer. Sınav yılı ve okul türü ayrımı korunur. İngilizce içeriklere Türkçe sınav etiketi eklenmedi.
- Değişen Türkçe derslerin görünür güncelleme, Article/Open Graph ve sitemap tarihleri eşitlendi. Yayın tarihleri korundu.
- Doğrulama: Node 22 ile Cloudflare/Next.js üretim derlemesi geçti ve worker üretildi. 31 ders HTTP 200; görünür düzey–Article educationalLevel eşleşmesi, canonical, kaynaklar ve Article/sitemap tarihleri doğrulandı. 5 konu merkezi etiketleri kontrol edildi; tarayıcıda kaynak notu klavyeyle açıldı. Yayın yapılmadı.

## 4 Ekim 2026 — 10. madde: ihtiyaca göre iç bağlantılar

- 31 Türkçe derste ortak `LessonNextSteps` alanı: ön koşula dön, sonraki anlatıma geç, uygulama/alıştırmayla dene. `lib/lessonNextSteps.js` açık ders eşleşmelerini tutar; 93 öneri sunucuda HTML bağlantısı olarak üretilir.
- Hedef dersin düzeyi ortak kapsam verisinden gösterilir. Polinom araçlarının sınırları bağlantı metninde açıklanır. Fonksiyonlar denklem aracına, trigonometri radyan alıştırmalarına, limit grubu cevaplı limit alıştırmalarına bağlanır.
- Tek tip sonraki okuma ve ayrı hesaplayıcı kutusu ortak alanla değiştirildi; metin içi açıklayıcı bağlantılar ve konu merkezine dönüş korundu. Özel şablonlu iki integral dersi de kapsandı.
- Ders değişiklik tarihleri 4 Ekim’e güncellendi; müfredat kaynak inceleme tarihi 3 Ekim olarak korundu.
- Doğrulama: Node 22 Cloudflare/Next.js üretim derlemesi geçti, worker üretildi. 31 ders HTTP 200; düzey/şema, canonical, Article/sitemap tarihleri kontrol edildi. 93 öneride hedefler HTTP 200, alıştırma anchorları geçerli, yinelenen kart veya aynı dersin başlangıcına öz bağlantı yok. Tarayıcıda üç seçenek ve hedefleri doğrulandı. Yayın yapılmadı.

## 4 Ekim 2026 — 11. madde: yayın sorumluluğu ve inceleme şeffaflığı

- Türkçe derslerin yazar şemasında ortak Organization kimliği kullanılır; Hakkımızda sayfasındaki `#icerik-ekibi` açıklamasına bağlanır. Gündem şablonunun yazar kaydı da aynı kimliği kullanır.
- İçerik kutusu kurumsal yayın sorumluluğunu, adı belirtilmiş bağımsız inceleme kaydı bulunmasından ayırır. Güncelleme tarihinin uzman onayı olmadığı açıklandı.
- Politikada teknik test, matematik kontrolü ve gerçek uzman incelemesi ayrıldı. Önemli düzeltmelerin ne olduğunun açıklanması, kaynak/inceleme tarihlerinin yayın tarihinden ayrı tutulması belirtildi.
- Kısmi integrasyon yazısındaki doğrulanmış bir kişiye atfedilmeyen öğrencilik/öğretmenlik deneyimi anlatımı kaldırıldı.
- Kullanıcıdan yayımlanabilir yazar/uzman bilgisi ve destek e-postası istendi. Doğrulanmış kişi/uzmanlık veya iletişim adresi uydurulmadı. İletişim adresi sağlanana kadar politika sayfası yalnız hata bildiriminde gerekli bilgileri açıklar; gönderim kanalı kurulduğu iddia edilmez.
- Doğrulama: Node 22 Next.js/Cloudflare üretim derlemesi geçti, worker üretildi. 31 dersin yazar @id bilgisi görünür ekip bağlantısıyla eşleşti. İki kurumsal sayfa HTTP 200 ve üç bölüm hedefi doğrulandı. Yayın yapılmadı.

## 4 Ekim 2026 — 12. madde: açıklayıcı ders grafikleri

- `LessonDiagram` ile 7 özgün SVG anlatımı 19 Türkçe derse eklendi: parabol/kök/minimum, birim çember, tek taraflı limit sıçraması, mutlak değer köşesi, parabol teğeti, ilkel fonksiyon ailesi, işaretli integral/geometrik alan.
- Grafikler gerçek fonksiyon koordinatlarıyla üretilir; birim çember aynı yatay/düşey ölçeği kullanır. Her grafikte görünür formül/açıklama, benzersiz title/desc ve erişilebilir isim vardır. Renge ek olarak metin etiketleri kullanılır. JavaScript ve yeni resim indirmesi gerektirmez.
- Ortak kapakların açıklaması konuya giriş görseli olarak netleştirildi. Mevcut limit yaklaşım grafiği, türev etkileşimi ve içerik URL’leri korundu.
- Doğrulama: Node 22 Cloudflare/Next.js üretim derlemesi geçti, worker üretildi. 19 ders HTTP 200; SSR SVG ve benzersiz erişilebilir açıklamalar doğrulandı. Birim çember masaüstünde görsel olarak kontrol edildi; birim çember ve belirli integral 390px görünümde yatay taşma yok. Yayın yapılmadı.

## 4 Ekim 2026 — 13. madde: başlık ve okuma süresi

- 31 Türkçe dersin içerik gövdesi ölçüldü; süreler ortak `lib/lessonReadingTime.js` kaynağında 180 kelime/dakika ve üst dakikaya yuvarlama ile hesaplanır. Menü, tanıtım, SVG etiketi ve kapalı cevap metinleri sayılmaz. Örnek açıklamaları dahildir; alıştırma çözme süresi ayrı tutulur.
- Kartlar ve ders üst bilgisi aynı süreyi kullanır. Sayfalarda “Yaklaşık … dakika okuma (alıştırmalar hariç)” gösterilir. Sonuçlar yaklaşık 3–6 dakika aralığında; önceki 7–13 dakika değerleri ölçüme dayalı değildi. Bu, matematik dersini öğrenmenin toplam süresi değildir.
- Kısmi integrasyon dersinin H1/title/Open Graph/Twitter/Article headline ve liste başlığı yöntemi açıkça belirtir: “İntegral Sorusu Nasıl Çözülür? Kısmi İntegrasyon Örneği”. URL/canonical korundu; diğer derslerin mevcut arama niyetleri ve başlıkları korundu.
- `scripts/measure-lesson-reading.py` yerel üretim önizlemesini okuyarak gelecekteki ölçümleri tekrar üretir. İçerik değişikliklerinden sonra ölçüm kaydı yeniden güncellenmelidir; süreler her istekte hesaplanmaz.
- Okuma süresi yaklaşımı İçerik Politikası’nda açıklandı. İngilizce ve gündem yazılarının mevcut süreleri bu Türkçe ders ölçümüne dahil değildir.
- Doğrulama: Node 22 Cloudflare/Next.js üretim derlemesi geçti ve worker üretildi. 31 dersin HTTP çıktısındaki yaklaşık süreler ölçüm kaydıyla eşleşti; canonical adresler, değişen H1/title/Article headline ve kütüphane süre etiketi doğrulandı. Yayın yapılmadı.

## 4 Ekim 2026 — 14. madde: dil geçişleri ve eşleşmeler

- Türkçe integral formülleri ve integral kuralları sayfalarının EN düğmeleri gerçek İngilizce derslerine bağlandı. Ortak ders şablonu karşılığı `englishArticles` kataloğundan bulur.
- Türkçe ürün sayfası ve makale kütüphanesinin EN bağlantıları kendi karşılıklarına gider. Ana sayfa da eşleşmesini açıkça belirtir.
- Çevirisi olmayan sayfalardaki bağlantı “EN home” olarak etiketlenir; erişilebilir adı ana sayfa hedefini açıklar. Gerçekte bulunmayan çeviri için hreflang eklenmez.
- Doğrulama: Node 22 Next.js/Cloudflare üretim derlemesi geçti. 28 çift/56 sayfa HTTP 200; iki yönde menü hedefi, self-canonical, tr/en/x-default hreflang ve sitemap tr/en bağlantıları eşleşti. Araç, konu ve çevirisiz integral sayfalarında yanlış alternate bulunmadığı kontrol edildi. Yayın yapılmadı.
- Kaynak: https://developers.google.com/search/docs/specialty/international/localized-versions — karşılıklı hreflang ve her dilin kendi kaydının bulunması.

## 4 Ekim 2026 — 15. madde: ölçülen sayfa yükünü azaltma

- PublicHeader logosu ham 1024px PNG yerine Next/Image ile 64/128px boyutlarında sunulur. İlk ekranda eager yüklenir; küçük logo için yüksek öncelikli preload eklenmedi. Yerel üretim image endpoint ölçümü: eski PNG 1.304.309 bayt, 128px WebP 1.798 bayt. Bu oran yalnız logo kaynağı içindir, toplam hız veya Core Web Vitals artışı değildir.
- KaTeX stylesheet global CSS’den çıkarılıp MathCalculator’a taşındı; SolutionPageClient kendi importunu korur. Formül işlemeyen ana sayfa ve derslerde KaTeX font tanımları artık yüklenmez.
- Yerel üretim CSS toplamı ana sayfa ve limit dersinde 118.474 → 93.317 bayt; aynı gzip yöntemiyle 23.979 → 19.695 bayt. Hesaplayıcıda KaTeX CSS korunur. Bunlar dosya boyutu ölçümleridir; ağ gecikmesi/cihaz emülasyonu veya gerçek kullanıcı LCP/INP/CLS ölçümü değildir.
- QR görsellerine doğal boyutlar ve async decode eklendi; sayfanın altındaki QR görselleri lazy yüklenir. İlk ekrandaki QR ve logo eager davranışı korunur.
- Doğrulama: Node 22 Next.js/Cloudflare üretim derlemesi geçti, worker üretildi. Ana sayfa, ders ve hesaplayıcı HTTP 200; CSS ayrımı ve image endpoint WebP çıktısı kontrol edildi. Tarayıcıda türev hesabı 9x²−4x+5 verdi; KaTeX çıktıları oluştu, konsol hatası yok.
- Canlı Cloudflare image endpoint davranışı ve gerçek kullanıcı Core Web Vitals yayından sonra ölçülmelidir. Yerel Next optimizer sonucu canlıya ait ölçüm olarak sunulmadı. Lighthouse performans puanı veya sıralama artışı iddia edilmedi. Yayın yapılmadı.
- Kaynaklar: https://web.dev/articles/browser-level-image-lazy-loading ; https://web.dev/articles/optimize-cls


## 4 Ekim 2026 — 16. madde: yapılandırılmış veri tutarlılığı

- Tüm 15 JSON-LD üretim noktasında ortak `serializeStructuredData` kullanılır. Önceki çift kaçış, JSON.parse sonrasında `<` yerine literal `\u003c` metni bırakabiliyordu. Yeni kaçış matematik metnini korur ve HTML script kapanışı oluşturulmasını engeller; iç içe veri ve `</script>` içeren örnekle round-trip doğrulandı.
- Makale yayıncısı ortak MatAI Organization @id kimliğini kullanır. Türkçe/İngilizce ana sayfa ve ürün sayfasında aynı uygulama @id, ana URL, App Store bağlantısı ve yayıncı kullanılır. Uygulama kimliği ile sayfanın kendi canonical adresi ayrıdır.
- İngilizce 16 dersin Article @id/mainEntityOfPage ve kurumsal yazar bağlantısı tamamlandı. Türkçe/İngilizce gündem yazılarında da görünür ekip bağlantısı bulunur. Gerçek kişi, akademik unvan veya bağımsız inceleme kaydı eklenmedi.
- Yerel üretim önizlemesindeki sitemap kapsamı: 83 sayfa HTTP 200 ve self-canonical; 65 Article/NewsArticle başlığı H1 ile, yazar kimliği görünür ekip bağlantısıyla eşleşti. 22 FAQPage içindeki soru ve yanıtlar görünür HTML ile karşılaştırıldı. 75 BreadcrumbList sıra ve son canonical adresi doğrulandı. Dört SoftwareApplication aynı uygulama kimliğine bağlanır. Sahte değerlendirme eklenmedi.
- Node 22 Next.js/Cloudflare üretim derlemesi exit 0 ile geçti ve `.open-next/worker.js` üretildi. Kontroller yerel HTML/JSON tutarlılık kontrolleridir; Google Rich Results Test veya Search Console doğrulaması yapılmış gibi sunulmaz. Push/yayın yapılmadı.
- FAQ schema görünür içeriğe uyduğu için korundu; Google FAQ rich results esas olarak yetkin sağlık/devlet siteleriyle sınırlıdır. Schema geçerliliği zengin sonuç veya sıralama artışı garantisi değildir. Ürün için doğrulanmamış fiyat/puan üretilmedi; ücretsiz web hesaplayıcılarının mevcut sıfır fiyat kaydı korundu.
- Kaynaklar: https://developers.google.com/search/docs/appearance/structured-data/sd-policies ; https://developers.google.com/search/blog/2023/08/howto-faq-changes
