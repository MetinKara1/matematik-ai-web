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
