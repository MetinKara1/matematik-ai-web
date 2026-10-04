'use client';
import { useState } from 'react';
export default function ResourceShare({ url }) {
  const [message, setMessage] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(url); setMessage('Bağlantı kopyalandı.'); }
    catch { setMessage('Aşağıdaki bağlantıyı seçip kopyalayabilirsiniz.'); }
  }
  return <div className="resource-share"><button type="button" onClick={copy}>Paylaşım bağlantısını kopyala</button><p><a href={url}>{url}</a></p><span role="status">{message}</span></div>;
}
