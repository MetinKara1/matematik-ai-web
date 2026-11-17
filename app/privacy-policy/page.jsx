import Link from 'next/link';
import { privacyEnglish, privacyTurkish } from '../../lib/mataiPrivacy.mjs';
export const metadata = {
  title: 'MatAI Privacy Policy | Gizlilik Politikası',
  description: 'How MatAI processes photos, accounts, history, analytics and purchases, and how to request support or deletion.',
  alternates: { canonical: 'https://matematik-ai.com/privacy-policy' },
};
export default function PrivacyPolicy() {
  return <main style={{maxWidth: 860, margin: '0 auto', padding: '48px 24px', lineHeight: 1.75}}>
    <nav><Link href="/">MatAI</Link> · <Link href="/support">Support / Destek</Link> · <a href="#turkce">Türkçe</a></nav>
    <article lang="en"><h1>MatAI Privacy Policy</h1><div style={{whiteSpace: 'pre-wrap'}}>{privacyEnglish.split('\n').slice(1).join('\n')}</div></article>
    <article lang="tr" id="turkce"><h2>Gizlilik ve kişisel veriler</h2><div style={{whiteSpace: 'pre-wrap'}}>{privacyTurkish.split('\n').slice(1).join('\n')}</div></article>
  </main>;
}
