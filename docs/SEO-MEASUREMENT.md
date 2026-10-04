# MatAI SEO ölçümleme ve etkinleştirme

4 Ekim 2026. Kod altyapısı ve MatAI web akışı hazırdır; canlı siteden veri toplamanın başladığı henüz doğrulanmadı. MatAI web akışı mevcut mülkte oluşturuldu: mülk 514621647, akış 16039651139, ölçüm kimliği G-M171TYP0FN. Google geliştirilmiş ölçümü bu yeni akışta kapalıdır. Kimlik kod varsayılanına eklendi; site henüz bu değişiklikle yayımlanmadı. Search Console doğrulama durumu ayrıca kontrol edilmelidir. Önceki SEO-CONTINUITY dosyasındaki Ağustos gösterim/konum rakamları güncel başlangıç ölçümü değildir.

## Etkinleştirme

1. Mevcut Search Console mülkünü kullan; aynı site için gereksiz yeni mülk oluşturma. Domain mülkü DNS ile doğrulanır. URL-prefix mülkünde `https://matematik-ai.com/` için HTML etiketinin yalnız `content` değerini `GOOGLE_SITE_VERIFICATION` değişkenine koy. Kod DNS kaydı oluşturmaz ve Google hesabında Verify düğmesine basılmış sayılmaz.
2. Kod, MatAI web akışının `G-M171TYP0FN` kimliğini varsayılan kullanır. Başka akış için `NEXT_PUBLIC_GA_MEASUREMENT_ID` ile geçersiz kıl; bilinçli olarak boş değer ölçümü kapatır. `.env.example` şablonunu kullan. Analytics API secret veya şifre istemez.
3. Cloudflare'ın **derlemeyi çalıştıran ortamına** bu değerleri ekle ve yeniden derle/yayınla. NEXT_PUBLIC değeri istemci paketine derleme sırasında girer; yalnız Worker runtime değişkeni eklemek yeterli değildir. Google doğrulama etiketi statik sayfalarda da build sırasında üretilir. Kod tek üretim hostname'i `matematik-ai.com` üzerinde etkinleşir; localhost ve preview hostları gerçek akışa veri göndermez.
4. Yeni MatAI web akışında Enhanced Measurement kapalı seçildi. İleride yeniden açılmadığını kontrol et. Bu proje sayfa görüntüleme, PDF ve dış bağlantı olaylarını kendi gönderir. Özellikle history pageview ve form interaction ölçümü açık bırakılırsa çift sayım veya istenmeyen form olayları oluşabilir. Kullanıcı verisi toplama / Google Signals / reklam kişiselleştirmesi bu kurulumun kapsamı değildir.
5. Yayından sonra ana sayfanın HTML kaynağında gerçek google-site-verification etiketini gör ve Search Console'da doğrula. Domain DNS doğrulaması zaten mevcutsa HTML koduna ihtiyaç yoktur.
6. Search Console'a `https://matematik-ai.com/sitemap.xml` gönder. Indexing/Pages raporunda nedenleri kontrol et; ana ürün, bir ders, bir konu ve bir kaynak sayfasını URL Inspection ile incele. sitemap kabulü veya inspection isteği indeksleme garantisi değildir.
7. GA4 Realtime'da temiz bir tarayıcıyla önce izin vermeden kontrol et: Google betiği ve olayları olmamalı. İzin verdikten sonra tek page_view, App Store tıklaması, PDF indirme, kaynak paylaşımı ve başarılı hesaplama olaylarını doğrula. İç linkle ikinci sayfaya geçişte bir yeni page_view olmalı. Geri alma sonrasında yeni özel olaylar gönderilmemeli. Bu kontrol henüz gerçek Google hesabında yapılmadı.
8. GA4'te custom dimension olarak `tool_kind`, `resource_slug`, `destination` (event scope) tanımla. `app_store_click` olayını istersen key event yap; bu olay tıklama ölçer, uygulama kurulumu/abonelik değildir.

## Ölçüm sözleşmesi

| Olay | Ne sayılır? | Parametre |
| --- | --- | --- |
| page_view | İzin verilmiş kamuya açık sayfa ziyareti / rota geçişi | Temiz page_location, sabit yol adı page_title, yalnız dış referrer origin |
| app_store_click | MatAI'nin belirli App Store bağlantısına tıklama | destination=app_store |
| resource_download | Üç çalışma kağıdının PDF bağlantısına tıklama | resource_slug |
| resource_share | Kaynak bağlantısının başarıyla panoya yazılması | resource_slug |
| calculator_success | Hesaplayıcıda başarılı çözüm oluşması | tool_kind=equation/derivative/integral |

İndirme olayı dosyanın cihazda başarıyla kaydedildiğini, hesaplama olayı cevabın öğrenildiğini kanıtlamaz. Özel olay parametreleri izin listesiyle sınırlandırılır; öğrenci kimliği, soru/sonuç metni veya çözüm ID'si gönderilmez. Sayfa query/hash bilgisi saklanmaz; UTM kampanya ayrıntısı bu kurulumda korunmaz. Yönlendiren sayfanın tam yolu tutulmaz. İzin vermeyen ziyaretçiler GA4 ölçümüne dahil olmaz; bu yüzden GA4 ve Search Console toplamları aynı olmak zorunda değildir.

Tercih anahtarı `matai-analytics-consent-v1` ile localStorage'da saklanır. Depolama çalışmazsa tercih yalnız mevcut ziyaret boyunca geçerli olur. Reklam consent türleri denied kalır; temel ölçüm betiği yalnız açık onaydan sonra yüklenir. İzin geri alma mevcut GA çerezlerini ve geçmiş Google kayıtlarını otomatik temizlemez. Doğrulama kimlikleri yokken etiket veya consent alanı gösterilmez.

## Başlangıç kaydı ve haftalık takip

İlk canlı yayının tarihini ve commitini not et. Search Console Performance > Search results içinde Web, Türkiye ve son 28 tam günü seç; önceki 28 günle karşılaştır. Aynı filtrelerle Queries, Pages, Devices ve Dates CSV'lerini dışarı aktar. Henüz bu hesaptan veri alınmadı; aşağıdaki tablo boş başlangıç şablonudur.

| Dönem / filtre | Gösterim | Tıklama | CTR | Ortalama konum | App Store tıklaması | PDF tıklaması | Başarılı hesaplama |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Yayın öncesi son 28 tam gün | — | — | — | — | — | — | — |
| Yayın sonrası ilk 28 tam gün | — | — | — | — | — | — | — |
| Önceki 28 gün karşılaştırması | — | — | — | — | — | — | — |

Sorguları marka (MatAI/matematik-ai) ve marka dışı olarak ayır. Sayfaları ürün, ders, konu, araç, kaynak, gündem/rehber ve dil gruplarıyla karşılaştır. Küçük gösterimli bir sayfanın tek günlük konum değişimi yerine toplam tıklama/gösterim ve ilgili sorgu grubunun eğilimini kullan. GA4'te izinli ziyaretçiler için Organic Search ve landing page bazında dört özel olayın sayısını incele. Makale trafiği artarken ürün tıklaması artmıyorsa iç yönlendirmeyi; gösterim artıp CTR zayıfsa sorgu-başlık uyumunu; indeksleme sorunu varsa teknik raporu incele. Yalnız ortalama konumla başarı ilan etme.

Her hafta aynı filtrelerle kontrol; ilk 28 gün sonunda toplu değerlendirme. Bu bir otomasyon veya sıralama/zaman garantisi değildir. Kaynakların backlink kazanımı ayrıca Google'ın Links raporu ve gerçek yönlendirme trafiğiyle incelenebilir; mevcut backlink sayısı uydurulmadı.

## Yerel doğrulama

`node --test tests/analytics.test.mjs tests/math-tools.test.mjs`

Next.js/Cloudflare üretim derlemesi ve kimliksiz önizleme: etiket yok, Google script yok, normal sayfalar ve hesaplayıcı çalışır. Yapılandırılmış testte sahte ölçüm/doğrulama kimliği kullanılır; gerçek Google endpoint'ine veri gönderilmez. Canlı DebugView/Realtime ve Search Console erişimi ayrı doğrulamadır.

Resmî kaynaklar:
- https://support.google.com/webmasters/answer/9008080
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/analytics/devguides/collection/ga4/event-parameters
- https://nextjs.org/docs/app/api-reference/components/script
