'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { consentStorageKey, eventForLink, pageViewParameters, publicAnalyticsPath, safeEvent, validMeasurementId } from '../../lib/analytics.mjs';
import './SiteAnalytics.css';

const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
export default function SiteAnalytics({ measurementId }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState(null);
  const [settings, setSettings] = useState(false);
  const [productionHost, setProductionHost] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef(null);
  const enabled = validMeasurementId(measurementId);
  const publicPath = publicAnalyticsPath(pathname);
  const allowed = enabled && productionHost && publicPath && consent === 'granted';
  const en = pathname?.startsWith('/en');
  useEffect(() => {
    setProductionHost(window.location.hostname === 'matematik-ai.com');
    try { const saved = localStorage.getItem(consentStorageKey); if (['granted', 'denied'].includes(saved)) setConsent(saved); } catch { /* Consent remains unset when storage is unavailable. */ }
    function sync(event) { if (event.key === consentStorageKey) setConsent(['granted', 'denied'].includes(event.newValue) ? event.newValue : null); }
    window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    window[`ga-disable-${measurementId}`] = !allowed;
    if (!allowed) {
      lastPage.current = null;
      if (initialized.current) window.gtag('consent', 'update', denied);
      return;
    }
    if (!initialized.current) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', denied);
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, ...pageViewParameters(pathname, document.referrer) });
      initialized.current = true;
    }
    window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
    if (lastPage.current !== publicPath) {
      window.gtag('event', 'page_view', { ...pageViewParameters(pathname, document.referrer), send_to: measurementId });
      lastPage.current = publicPath;
    }
    function send(event) {
      if (window[`ga-disable-${measurementId}`]) return;
      const safe = safeEvent(event.name, event.parameters);
      if (safe) window.gtag('event', safe.name, { ...safe.parameters, ...pageViewParameters(pathname, document.referrer), send_to: measurementId });
    }
    function click(event) { const link = event.target.closest?.('a[href]'); const action = link && eventForLink(link.getAttribute('href')); if (action) send(action); }
    function custom(event) { if (event.detail) send(event.detail); }
    document.addEventListener('click', click);
    window.addEventListener('matai:analytics', custom);
    return () => { document.removeEventListener('click', click); window.removeEventListener('matai:analytics', custom); };
  }, [allowed, enabled, measurementId, pathname, publicPath]);
  function choose(value) {
    // Stop transmission immediately on withdrawal, before React runs its effect.
    if (value === 'denied') window[`ga-disable-${measurementId}`] = true;
    try { localStorage.setItem(consentStorageKey, value); } catch { /* The current visit can still use the selected preference. */ }
    setConsent(value); setSettings(false);
  }
  if (!enabled || !productionHost || !publicPath) return null;
  return <>
    {allowed && <Script id="matai-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    {(consent === null || settings) ? <section className="analytics-choice" aria-label={en ? 'Analytics preference' : 'Ölçüm tercihi'}>
      <h2>{en ? 'Help us improve the lessons' : 'Dersleri geliştirmemize yardımcı ol'}</h2>
      <p>{en ? 'With your permission, Google Analytics measures page visits, worksheet downloads and calculator usage. Your math inputs are excluded. You can change this preference at any time.' : 'İzin verirsen Google Analytics ile sayfa ziyaretlerini, çalışma kağıdı indirmelerini ve hesaplayıcı kullanımını ölçeriz. Yazdığın matematik ifadeleri ölçüme dahil edilmez. Tercihini istediğin zaman değiştirebilirsin.'}</p>
      <p><a href="/hakkimizda#olcum">{en ? 'About analytics' : 'Ölçüm hakkında'}</a></p>
      <div><button type="button" onClick={() => choose('granted')}>{en ? 'Allow analytics' : 'Ölçüme izin ver'}</button><button type="button" onClick={() => choose('denied')}>{en ? 'Continue without analytics' : 'Ölçüm olmadan devam et'}</button></div>
    </section> : <button className="analytics-settings" type="button" onClick={() => setSettings(true)}>{en ? 'Analytics preference' : 'Ölçüm tercihi'}</button>}
  </>;
}
