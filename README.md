# MatAI Next.js

Mevcut Vite uygulamasının tasarım ve rotalarını koruyan Next.js App Router sürümü.

## Çalıştırma

```bash
yarn
yarn dev
```

Production kontrolü:

```bash
yarn build
yarn start
```

`.env.example` dosyasını `.env.local` olarak kopyalayıp site ve API adreslerini ortama göre güncelleyin.

## Render stratejisi

- `/`: istek başına SSR
- `/makaleler/integral-sorusu-nasil-cozulur`: istek başına SSR ve sayfaya özel metadata
- `/solution/[id]`: API verisiyle istek başına SSR ve dinamik metadata
- `/malcolmX/*`: localStorage token yapısını koruyan client-side yönetim paneli
