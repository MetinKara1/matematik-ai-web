'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { inventorySites, inventoryStats } from '../lib/website-inventory.mjs';
const labels = { home: 'Ana sayfa', guide: 'Rehber / makale', hub: 'İçerik listesi', card: 'Kart sayfası', player: 'Oyuncu sayfası', category: 'Kategori', tool: 'Hesaplama aracı', landing: 'Ürün / tarama sayfası', info: 'Kurumsal / destek', resource: 'Çalışma kaynağı' };
const languages = { en: 'English', tr: 'Türkçe', es: 'Español', de: 'Deutsch', fr: 'Français' };
const date = (value) => value ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date(value)) : 'Belirtilmemiş';
export default function WebsiteInventory({ showHeading = true, endpoint = '/api/admin-proxy/website-content', requestHeaders }) {
    const [data, setData] = useState(null), [error, setError] = useState(''), [loading, setLoading] = useState(true), [site, setSite] = useState('matematikai'), [query, setQuery] = useState(''), [locale, setLocale] = useState('all'), [kind, setKind] = useState('all'), [sort, setSort] = useState('recent');
    const load = useCallback(() => { setLoading(true); setError(''); fetch(endpoint, { cache: 'no-store', headers: requestHeaders?.() }).then(async (response) => { const body = await response.json(); if (response.status === 401 || response.status === 403) {
        location.assign('/malcolmX/login');
        throw new Error('Yönetici oturumunu yenileyin.');
    } if (!response.ok)
        throw new Error(body.message ?? 'Envanter alınamadı.'); return body; }).then(setData).catch(e => setError(e.message)).finally(() => setLoading(false)); }, [endpoint, requestHeaders]);
    useEffect(() => { const timer = window.setTimeout(load, 0); return () => window.clearTimeout(timer); }, [load]);
    const inventory = data?.sites.find(s => s.id === site)?.inventory, siteError = data?.sites.find(s => s.id === site)?.error;
    const stats = inventory ? inventoryStats(inventory.entries) : null;
    const filtered = useMemo(() => { const search = query.trim().toLocaleLowerCase('tr-TR'); return (inventory?.entries ?? []).filter(e => (locale === 'all' || e.locale === locale) && (kind === 'all' || e.kind === kind) && (!search || `${e.title} ${e.summary} ${e.path}`.toLocaleLowerCase('tr-TR').includes(search))).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title, 'tr') : sort === 'path' ? a.path.localeCompare(b.path) : (b.updatedAt ? Date.parse(b.updatedAt) : 0) - (a.updatedAt ? Date.parse(a.updatedAt) : 0) || a.title.localeCompare(b.title)); }, [inventory, query, locale, kind, sort]);
    function chooseSite(value) { setSite(value); setQuery(''); setLocale('all'); setKind('all'); }
    const availableLanguages = inventory ? [...new Set(inventory.entries.map(e => e.locale))] : [];
    return <section className="website-inventory"><header className="website-heading"><div>{showHeading && <h1>Web Siteleri</h1>}<p>{inventorySites.map(s => s.name).join(' · ')} — yayınlanan sayfalar ve içerik özeti.</p></div><button onClick={load} disabled={loading}>{loading ? 'Güncelleniyor…' : '↻ Listeyi yenile'}</button></header>
  <div className="website-tabs" role="tablist" aria-label="Web sitesi seçin">{inventorySites.map(s => <button key={s.id} id={`tab-${s.id}`} role="tab" aria-selected={site === s.id} aria-controls="website-panel" onClick={() => chooseSite(s.id)}>{s.name}<small>{data?.sites.find(x => x.id === s.id)?.inventory?.entries.length ?? '—'} sayfa</small></button>)}</div>
  {error && <div className="website-error" role="alert"><p>{error}</p><button onClick={load}>Yeniden dene</button></div>}
  <section id="website-panel" role="tabpanel" aria-labelledby={`tab-${site}`}>
   <p className="website-source">Kaynak: sitelerin sitemap ve yayın derlemesi. Dil sürümleri ayrı sayfa sayılır; “rehber konusu” çevirileri birleştirir. Bu sayılar Google indeks durumunu göstermez.</p>
   <section className="inventory-metrics">{[['Yayınlanan sayfa', stats?.pages], ['Rehber / makale sayfası', stats?.guides], ['Rehber konusu', stats?.guideTopics], ['Yayın dili', stats?.languages]].map(([label, value]) => <article className="inventory-metric" key={label}><span>{label}</span><strong>{value ?? '—'}</strong><small>{value === undefined ? 'Veri bekleniyor' : 'Yayın envanteri'}</small></article>)}</section>
   {siteError && <div className="website-error" role="alert"><b>Envantere ulaşılamadı</b><p>{siteError}</p><button onClick={load}>Yeniden dene</button></div>}
   {inventory && <>
    <div className="website-meta"><span>Site derlemesi: {date(inventory.generatedAt)}</span><span>Son kontrol: {data?.checkedAt ? new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(data.checkedAt)) : '—'}</span><a href={inventory.origin} target="_blank" rel="noopener noreferrer">Siteyi aç ↗</a></div>
    <div className="website-breakdown" aria-label="İçerik dağılımı">{Object.entries(labels).flatMap(([key, label]) => { const count = inventory.entries.filter(e => e.kind === key).length; return count ? [<button key={key} aria-pressed={kind === key} onClick={() => setKind(kind === key ? 'all' : key)}>{label} <b>{count}</b></button>] : []; })}</div>
    <section className="website-catalog">
     <div className="website-filters"><label>İçerik ara<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Başlık, özet veya sayfa adresi…"/></label><label>Dil<select value={locale} onChange={e => setLocale(e.target.value)}><option value="all">Tüm diller</option>{availableLanguages.map(l => <option value={l} key={l}>{languages[l]}</option>)}</select></label><label>Sayfa türü<select value={kind} onChange={e => setKind(e.target.value)}><option value="all">Tüm türler</option>{Object.entries(labels).filter(([k]) => inventory.entries.some(e => e.kind === k)).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label><label>Sıralama<select value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Son güncellenen</option><option value="title">Başlığa göre</option><option value="path">Adrese göre</option></select></label></div>
     <div className="website-result-count" role="status">{filtered.length} / {inventory.entries.length} sayfa{(query || locale !== 'all' || kind !== 'all') && <button onClick={() => { setQuery(''); setLocale('all'); setKind('all'); }}>Filtreleri temizle</button>}</div>
     <div className="website-table-wrap"><table className="website-table"><thead><tr><th>İçerik ve kısa özet</th><th>Tür / dil</th><th>Son değişiklik</th><th>Bağlantı</th></tr></thead><tbody>{filtered.map(e => <tr key={e.path}><td><b>{e.title}</b><p>{e.summary}</p><code>{e.path}</code></td><td><span>{labels[e.kind]}</span><small>{languages[e.locale]}</small></td><td><time dateTime={e.updatedAt ?? undefined}>{date(e.updatedAt)}</time></td><td><a href={e.url} target="_blank" rel="noopener noreferrer" aria-label={`${e.title} sayfasını aç`}>Aç ↗</a></td></tr>)}</tbody></table></div>
     {!filtered.length && <div className="website-empty">Bu filtrelerle eşleşen sayfa yok. Başka bir arama deneyin veya filtreleri temizleyin.</div>}
    </section><p className="website-source">Özetler yayımlanan sayfanın açıklamasıdır. Son değişiklik tarihi sitemap kaydından gelir; ilk yayın veya Google tarama tarihi değildir. Yeni içerikler bir sonraki başarılı site yayınıyla otomatik eklenir.</p>
   </>}
   {!inventory && !siteError && !error && loading && <p role="status">Yayın envanteri yükleniyor…</p>}
  </section>
 </section>;
}
