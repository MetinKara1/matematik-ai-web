# Canlı SEO kontrolü — 4 Ekim 2026

## Canlı sürümde doğrulananlar

- Sitemap 87 benzersiz HTML URL içeriyor. Hepsine HTTP ile erişildi; self-canonical ve sayfa başlığı/H1 kontrolleri geçti. `noindex` metadata bulunmadı.
- 56 sayfanın karşılıklı dil eşleşmeleri ve sitemap hreflang kayıtları tutarlı. SVG içindeki erişilebilir `title` öğeleri sayfa başlığı olarak sayılmadı.
- JSON-LD parse, 65 Article/NewsArticle başlığının H1 ile eşleşmesi, görünür yazar bağlantıları, yayıncı kimliği, 22 FAQPage'in görünür soru/cevapları, 78 BreadcrumbList'in sırası ve canonical hedefleri kontrol edildi. Google Rich Results Test onayı değildir.
- Üç PDF HTTP 200; dosyalar yerel kaynaklarla SHA-256 düzeyinde eşleşiyor.
- robots.txt kamuya açık sayfalara izin veriyor; yönetim/API alanlarını dışlıyor ve doğru sitemap adresini içeriyor. Var olmayan örnek sayfa 404 döndürüyor.

## Bulunan ve kodda düzeltilen sorunlar

1. HTTP ve www ana sayfa istekleri `https://matematik-ai.com/:path*` adresine yönlenip 404 veriyor. Alt sayfalarda wildcard düzgün çözülüyor. `next.config.mjs` içinde `/` için ayrı kalıcı yönlendirmeler wildcard kurallarının önüne eklendi.
2. Canlı Cloudflare image endpoint, logo için 1.304.309 baytlık orijinal PNG'yi döndürüyor. Images binding tanımlı değilken optimizer kaynak dosyayı geçiriyor. 128×128, 1.798 baytlık WebP kaynak üretildi ve PublicHeader bu dosyaya geçirildi. Bu ölçüm toplam sayfa hızı veya Core Web Vitals artışı değildir.

## Yerel doğrulama

- Node 22 ile Next.js/Cloudflare üretim derlemesi exit 0; worker üretildi.
- Next production sunucusunda HTTP/www ana sayfa ve sorgu parametreli alt sayfa istekleri doğru HTTPS hedeflerine 308 döndürüyor.
- OpenNext worker önizlemesinde ana sayfa, İngilizce ana sayfa ve türev aracı HTTP 200; yeni logo ve optimizer çıktısı image/webp, 1.798 bayt. HTTP ana sayfa yönlendirmesinde literal wildcard kalmadı. Yerel önizleme origin/protokol davranışı üretimle aynı değildir; www yönlendirmesi üretimde tekrar doğrulanmalı.
- İlk izole build'de ortak node_modules symlink'i worker çalışmasını bozdu. Bağımlılıklar izole kopyaya alınıp yeniden derlendi; worker sayfaları çalıştı. Bu hata için üretim kodu değiştirilmedi.
- Yeni düzeltmeler henüz push veya deploy edilmedi. Mevcut canlı sürümdeki iki sorun, yeni yayın sonrasında tekrar kontrol edilmeli.

## Search Console ve GA4 hesabı

- Sitemap kaydı başarılı; son okuma 1 Ekim 2026, keşfedilen sayfa 72. Güncel 87 URL'nin yeniden işlenmesi bekleniyor.
- Yeniden gönderim denendi; tarayıcı kontrolü kesildi ve başarı onayı doğrulanamadı. Tamamlanmış sayılmadı. Mevcut başarılı kayıt silinmedi.
- Dizin raporunun son güncellemesi 21 Eylül 2026: 23 dizine eklenen, 34 eklenmeyen URL; 31 keşfedildi/dizine eklenmedi, iki canonical kaydı, bir yönlendirmeli URL. Bunlar bugünkü 87 URL'nin güncel durumu değildir.
- İki canonical kaydı HTTPS ve HTTP ana sayfasına ait; son taramalar 12 ve 11 Ağustos. Bugünkü HTTPS ana sayfanın canonical'ı doğru; HTTP yönlendirmesi bu değişiklikte düzeltildi. Google'ın seçtiği güncel canonical URL denetimiyle henüz doğrulanmadı.
- Mobil ve masaüstü Core Web Vitals için son 90 güne ait yeterli kullanım verisi yok (rapor güncellemesi 3 Ekim). Başarılı saha ölçümü iddia edilmedi.
- GA4 web akışı G-M171TYP0FN trafik alıyor. tool_kind, resource_slug, destination etkinlik kapsamlı boyutları oluşturuldu. app_store_click önemli etkinlik; varsayılan parasal değer yok, etkinlik başına sayım. Bu olay için henüz akış verisi görünmedi.
- matematik-ai.com doğrulanmış Search Console Domain mülkü, MatAI Web akışına (16039651139) bağlandı ve başarı onayı alındı. Geliştirilmiş ölçüm kapalı.

## Kalan işler

- Düzeltmeleri yayımlayıp HTTP/www ana sayfa ve logo ağ yanıtını yeniden kontrol etmek.
- Sitemap'in yeni 87 URL sürümünün Google tarafından okunmasını ve güncel URL denetimlerini doğrulamak.
- GA4'te hesaplayıcı/PDF/App Store olaylarının raporlara ulaşmasını kontrol etmek. Sayfa trafiği alımı özel olayların hepsinin alındığını kanıtlamaz.
- Google Rich Results Test ve saha hız verileriyle sonraki doğrulamalar; veri yokken başarılı sonuç iddiası yok.
- Haftalık sorgu/sayfa takibi ve son 28 gün karşılaştırması. Otomasyon kurulmadı.
