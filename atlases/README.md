# Medical Atlases

Public directory: https://satviktri.github.io/atlases/

The directory is rendered by the personal website's existing Jekyll/GitHub Pages
build. Links and cards work without JavaScript; JavaScript adds search and subject
filters. The page uses local CSS, system fonts and original decorative SVG covers.

## Add an atlas

1. Publish a top-level folder named `<subject>-atlas/` containing `index.html`.
2. Add a descriptive record to `_data/atlases.yml`, using the folder name as `id`.
3. Add a link back to `/atlases/` inside the atlas and record its references/scope.
4. Deploy through the existing `main` branch and verify the live links.

The shared YAML catalog supplies both the directory cards and homepage links.
If step 2 is missed, the directory automatically discovers a top-level
`*-atlas/index.html` during the Jekyll build and supplies a basic link card.
This handles both static files and Jekyll pages, without runtime GitHub API calls.
Only this repository's top-level atlas folders are discovered automatically;
external repositories require an explicit integration. Do not publish a draft
atlas folder to main if it should remain private. To omit a published folder from
the directory, add its catalog record with `published: false`.

Schema: `id`, `name`, `topic`, `category` (`anatomy`, `oncology`, or `other`),
`description`, `features` (list), `tags` (list), `sources` (site path),
`published` (boolean). Optional: `secondary_url` and `secondary_label`.
Names, descriptions and counts must reflect the published app. Do not invent
clinical validation, completeness or affiliations. A daily maintenance task can
fill missing metadata using the newly published atlas's actual content.

## Verification

Check catalog entries against local directories and source files. Test search,
filters, empty-state reset, no-JavaScript links, and fallback discovery using a
synthetic future folder. GitHub Pages' Jekyll build is the definitive template
check. Full browser layout review is unavailable in the current environment.

## Learning pages and measurement

The first three topic guides are registered in `_data/learning.yml`. They use the
shared `learning` layout and remain readable without JavaScript. The sitemap
includes these guides and automatically discovers future published atlas roots.
Shared metadata and Analytics configuration are documented in
[SEO-ANALYTICS.md](SEO-ANALYTICS.md). Google Search Console verification and Google
Analytics dashboard receipt are separate account-side checks.
