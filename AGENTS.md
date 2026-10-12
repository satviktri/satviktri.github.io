# Atlas collection conventions

The user wants new atlases added to the shared public resource automatically.

- Atlas directory: `/atlases/`; source: `atlases/index.html`.
- Catalog: `_data/atlases.yml`. When publishing a new atlas, add a truthful catalog
  entry in the same change and include a link back to `/atlases/` in the atlas.
- Prefer a top-level `<subject>-atlas/index.html` structure. The Jekyll directory
  discovers this pattern as a fallback when catalog metadata is absent.
- The personal homepage uses the same catalog. Keep its atlas section and links
  intact when working on the website. See `atlases/README.md` for the schema.
- Keep sources, editions and educational scope visible in each atlas. Do not
  describe the collection as clinically validated.
- Verify the relevant links and GitHub Pages deployment after publication.
- Reuse `_includes/seo.html` and `_includes/analytics.html` for new atlas entry
  pages (add Jekyll front matter). Do not install a second Analytics tag.
- Mark new learning pages `sitemap: true` and add them to `_data/learning.yml`.
  See `atlases/SEO-ANALYTICS.md` for metadata, source-review and account checks.
