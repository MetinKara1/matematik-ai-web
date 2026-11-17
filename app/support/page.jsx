import Link from 'next/link';
export const metadata = {
  title: 'MatAI Support | Destek',
  description: 'Contact METIN KARA for MatAI help, purchases, privacy and account deletion requests.',
  alternates: { canonical: 'https://matematik-ai.com/support' },
};
export default function Support() {
  return <main style={{maxWidth: 860, margin: '0 auto', padding: '48px 24px', lineHeight: 1.75}}>
    <Link href="/">MatAI</Link><h1>MatAI Support / Destek</h1>
    <p>Developer / Geliştirici: METIN KARA</p>
    <p><a href="mailto:n.metinkara@gmail.com">n.metinkara@gmail.com</a></p>
    <section lang="en"><h2>How we can help</h2>
      <p>Email us about a solution, account access, purchases or privacy. Include the app version and a short description. Do not send your password or full payment card information.</p>
      <p>You can also use the in-app feedback screen. Delete individual saved questions from history or request account deletion from your profile. For remaining content or provider-held records, contact us.</p>
      <p>Deleting an account does not cancel a subscription. Manage renewal in your App Store or Google Play account.</p>
    </section>
    <section lang="tr"><h2>Yardım ve veri talepleri</h2>
      <p>Çözüm, hesap, satın alma veya gizlilik sorularınızı e-postayla ya da uygulama içi geri bildirim ekranından iletebilirsiniz. Uygulama sürümünü ve kısa bir açıklama ekleyin; parola veya kart bilgisi göndermeyin.</p>
      <p>Soruları geçmişten silebilir, profilinizden hesap silme talebi verebilirsiniz. Kalan içerik veya hizmet sağlayıcılarındaki kayıtlar için bize yazın. Hesap silme aboneliği iptal etmez.</p>
    </section>
    <Link href="/privacy-policy">Privacy Policy / Gizlilik Politikası</Link>
  </main>;
}
