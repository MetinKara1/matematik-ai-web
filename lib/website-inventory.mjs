export const inventorySites = [{ id: 'matematikai', name: 'Matematik AI', origin: 'https://matematik-ai.com' }];
export const inventoryKinds = ['home', 'guide', 'hub', 'card', 'player', 'category', 'tool', 'landing', 'info', 'resource'];
const safePath = (value) => typeof value === 'string' && /^\/(?:[a-z0-9-]+\/?)*$/.test(value) && !/^\/(api|malcolmx|_next)(\/|$)/i.test(value);
export function parseWebsiteInventory(value, id) {
    const site = inventorySites.find(s => s.id === id);
    if (!value || typeof value !== 'object')
        throw new Error('İçerik envanteri okunamadı.');
    const data = value;
    if (data.version !== 1 || data.siteId !== id || data.origin !== site.origin || typeof data.generatedAt !== 'string' || !Number.isFinite(Date.parse(data.generatedAt)) || !Array.isArray(data.entries) || !data.entries.length || data.entries.length > 2000)
        throw new Error('İçerik envanteri beklenen biçimde değil.');
    const seen = new Set();
    const entries = data.entries.map(entry => {
        if (!entry || !safePath(entry.path) || !safePath(entry.group) || typeof entry.title !== 'string' || !entry.title.trim() || entry.title.length > 500 || typeof entry.summary !== 'string' || !entry.summary.trim() || entry.summary.length > 2000 || !['en', 'es', 'de', 'fr', 'tr'].includes(entry.locale) || !inventoryKinds.includes(entry.kind) || typeof entry.url !== 'string')
            throw new Error('İçerik kaydı geçersiz.');
        const url = new URL(entry.url);
        const key = entry.path.replace(/\/$/, '') || '/';
        if (url.origin !== site.origin || url.username || url.password || url.search || url.hash || url.pathname !== entry.path || seen.has(key))
            throw new Error('İçerik adresi geçersiz veya tekrarlı.');
        if (entry.updatedAt !== null && (typeof entry.updatedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(entry.updatedAt) || !Number.isFinite(Date.parse(entry.updatedAt))))
            throw new Error('İçerik tarihi okunamadı.');
        seen.add(key);
        return { url: url.href, path: entry.path, title: entry.title, summary: entry.summary, locale: entry.locale, kind: entry.kind, group: entry.group, updatedAt: entry.updatedAt };
    });
    return { version: 1, siteId: id, origin: site.origin, generatedAt: data.generatedAt, entries };
}
export function inventoryStats(entries) { const guides = entries.filter(e => e.kind === 'guide'); return { pages: entries.length, guides: guides.length, guideTopics: new Set(guides.map(e => e.group)).size, languages: new Set(entries.map(e => e.locale)).size }; }
