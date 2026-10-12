# SEO and measurement

## Published structure

- `sitemap.xml` lists pages explicitly marked `sitemap: true`, plus published
  top-level `*-atlas/index.html` directories, including future atlases. Catalog
  entries with `published: false` and files with `sitemap: false` are omitted.
- `robots.txt` allows crawling and points to the sitemap. This does not request
  indexing or guarantee ranking.
- `_includes/seo.html` supplies unique titles, descriptions, canonical URLs and
  Open Graph metadata. Each atlas entry now has Jekyll front matter so shared
  includes render in the existing GitHub Pages build.
- `_layouts/learning.html` renders guides, accessible static diagrams, authorship,
  reference check dates and Article structured data. Content must be visible and
  accurate; structured data does not imply endorsement or clinical review.
- `_data/learning.yml` connects the directory to dedicated learning pages.
- New guides should have substantive original teaching content, linked sources,
  a stable permalink, the correct staging edition where relevant, and a link
  into their atlas. Keep `published_on` stable and change `updated` only after a
  substantive content/source review. Do not generate pages just to target terms.

## Google Analytics

The existing property `G-V08WLNR7E2` is reused. Change `google_analytics` in
`_config.yml` to switch the entire site; an empty value omits the integration.
`_includes/analytics.html` loads `/assets/js/analytics.js` once per page.
The previous homepage inline tag was replaced, not supplemented.

The script allows only the production hostname, respects browser DNT/GPC,
removes query strings/fragments from the supplied page and referrer URLs, and
disables advertising personalization and Google signals in its configuration.
It sends the default configuration page view, without an additional manual one.
It installs no custom input, note, search or staging-result event listeners.

Google Analytics Enhanced Measurement is an account-side setting. In the web
data stream, review automatic events before interpreting usage. Disable form
interactions, site-search collection and browser-history page changes if only
page loads should be counted. This repository cannot verify or change those
account settings. A second tag installed by a plugin/Tag Manager can cause
duplicate measurement; use one installation path.

Account-side acceptance check: visit a public atlas with analytics permitted and
confirm one page view in Realtime/DebugView. Network delivery and dashboard
receipt have not been verified by the source-code checks.

## Search Console

Use a URL-prefix property for `https://satviktri.github.io/`. The root
`github.io` domain is not owned by this project. The site supports an optional
HTML verification token in `_config.yml` (`google_site_verification`).
After ownership verification, submit `https://satviktri.github.io/sitemap.xml`
and inspect the directory plus one learning page. No verification token is
invented, and no account submission is claimed by publishing these files.

## References

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
