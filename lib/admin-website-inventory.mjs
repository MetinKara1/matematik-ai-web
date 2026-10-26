import { inventorySites, parseWebsiteInventory } from './website-inventory.mjs';
export async function loadAdminWebsiteInventory(token, apiOrigin, fetcher = fetch, authPath = 'dashboard') {
    // Reuse the existing backend admin-role check. A fabricated cookie is not authorization.
    try {
        const auth = await fetcher(`${apiOrigin.replace(/\/$/, '')}/api/admin/${authPath}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(10000) });
        if (!auth.ok)
            return { status: auth.status === 401 || auth.status === 403 ? auth.status : 502, body: { message: auth.status === 403 ? 'Bu işlem için yönetici yetkisi gerekiyor.' : auth.status === 401 ? 'Oturum süreniz doldu.' : 'Yönetici oturumu doğrulanamadı.' } };
    }
    catch {
        return { status: 502, body: { message: 'Yönetici oturumu doğrulanamadı. Lütfen yeniden deneyin.' } };
    }
    const sites = await Promise.all(inventorySites.map(async (site) => {
        try {
            const response = await fetcher(`${site.origin}/content-inventory.json`, { headers: { Accept: 'application/json' }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(12000) });
            if (!response.ok)
                throw new Error();
            const text = await response.text();
            if (text.length > 2000000)
                throw new Error();
            return { id: site.id, inventory: parseWebsiteInventory(JSON.parse(text), site.id) };
        }
        catch {
            return { id: site.id, error: 'Bu sitenin içerik envanteri şu anda alınamadı. Diğer sitenin bilgilerini kullanabilir veya yeniden deneyebilirsiniz.' };
        }
    }));
    const body = { checkedAt: new Date().toISOString(), sites };
    return { status: 200, body };
}
