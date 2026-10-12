/* One GA4 installation, shared by the homepage, atlas collection and guides. */
(() => {
  'use strict';
  const tag = document.currentScript;
  const id = tag && tag.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(id || '') || window.__atlasAnalyticsLoaded) return;
  // Avoid counting local checks, previews, and visitors who enable browser DNT/GPC.
  if (location.hostname !== 'satviktri.github.io' || navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  window.__atlasAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const cleanURL = value => {
    try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : ''; }
    catch { return ''; }
  };
  window.gtag('js', new Date());
  // The config command sends one page view. Do not also send a manual page_view.
  // Never pass notes, search text, calculator inputs, query strings or fragments.
  window.gtag('config', id, {
    page_location: cleanURL(location.href),
    page_referrer: cleanURL(document.referrer),
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.append(script);
})();
