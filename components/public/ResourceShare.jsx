'use client';
import { emitAnalyticsEvent } from '../../lib/analytics.mjs';
import { useState } from 'react';
export default function ResourceShare({ url }) {
  const [message, setMessage] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(url); setMessage('Bağlantı kopyalandı.'); emitAnalyticsEvent('resource_share', { resource_slug: url.split('/').pop() }); }
    catch { setMessage('Aşağıdaki bağlantıyı seçip kopyalayabilirsiniz.'); }
  }
  return <div className="resource-share"><button type="button" onClick={copy}>Paylaşım bağlantısını kopyala</button><p><a href={url}>{url}</a></p><span role="status">{message}</span></div>;
}
