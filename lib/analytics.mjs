const publicRoots = new Set(['/', '/en', '/makaleler', '/en/articles', '/konular', '/araclar', '/kaynaklar', '/hakkimizda', '/icerik-politikasi', '/yapay-zeka-matematik-cozucu', '/en/ai-math-solver']);
const publicDetail = /^\/(?:makaleler|konular|araclar|kaynaklar|gundem|rehber|en\/(?:articles|news|guides))\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const consentStorageKey = 'matai-analytics-consent-v1';
export function validMeasurementId(value) { return typeof value === 'string' && /^G-[A-Z0-9]{5,20}$/.test(value); }
export function publicAnalyticsPath(value) {
  if (typeof value !== 'string') return null;
  const path = value.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  return publicRoots.has(path) || publicDetail.test(path) ? path : null;
}
export function pageViewParameters(pathname, referrer = '') {
  const path = publicAnalyticsPath(pathname);
  let origin = '';
  try { const url = new URL(referrer); if (['https:', 'http:'].includes(url.protocol) && url.hostname !== 'matematik-ai.com') origin = url.origin + '/'; } catch { /* No referrer or invalid URL. */ }
  return path ? { page_location: `https://matematik-ai.com${path === '/' ? '/' : path}`, page_title: path, page_referrer: origin } : null;
}
export function safeEvent(name, parameters = {}) {
  if (name === 'app_store_click') return { name, parameters: { destination: 'app_store' } };
  if (name === 'calculator_success' && ['derivative', 'integral', 'equation'].includes(parameters.tool_kind)) return { name, parameters: { tool_kind: parameters.tool_kind } };
  if (['resource_download', 'resource_share'].includes(name) && ['limit-sureklilik-calisma-kagidi', 'turev-kurallari-calisma-kagidi', 'temel-integral-calisma-kagidi'].includes(parameters.resource_slug)) return { name, parameters: { resource_slug: parameters.resource_slug } };
  return null;
}
export function eventForLink(href) {
  try {
    const url = new URL(href, 'https://matematik-ai.com');
    if (url.origin === 'https://apps.apple.com' && url.pathname === '/us/app/matai-yapay-zeka-matematik/id6756010761') return safeEvent('app_store_click');
    if (url.origin === 'https://matematik-ai.com' && /^\/kaynaklar\/[^/]+\.pdf$/.test(url.pathname)) return safeEvent('resource_download', { resource_slug: url.pathname.split('/').pop().slice(0, -4) });
  } catch { /* Unknown links do not become telemetry. */ }
  return null;
}
export function emitAnalyticsEvent(name, parameters) {
  const event = safeEvent(name, parameters);
  if (event && typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('matai:analytics', { detail: event }));
}
