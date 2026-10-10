# CardioAtlas

Live: https://satviktri.github.io/cardio-atlas/

A static cardiovascular teaching atlas with:

- Rotatable whole-body overview of major systemic, pulmonary, coronary and portal vessels.
- Directional arrowheads and animated blood-flow particles.
- Search, region and artery/vein filters, isolation, camera views and focus controls.
- A licensed anatomical heart cutaway with 12 selectable structures and a guided tour.
- Six guided circulation routes and eight source-linked clinical correlates.
- Browser-local study notes and Markdown export.
- Responsive layouts, keyboard controls, reduced-motion support and a Canvas2D fallback.

## Run and publish

No build step or runtime dependency download is required. Serve this directory
with any local static HTTP server. All application scripts, Three.js and the heart
plate are included. `npm run check` checks JavaScript syntax.

The folder is published by the existing GitHub Pages configuration in
`satviktri/satviktri.github.io`. Changes to `main/cardio-atlas/` are served at the
live URL above. It does not change the existing LymphAtlas application.

## Scope

This is a hand-authored anatomical schematic, not a segmented medical atlas.
Vessel locations, caliber, spacing and curves are simplified. It does not include
every microvessel, branch or anatomical variant. It is not a validated hemodynamic
simulation. Color encodes relative oxygenation; artery/vein classification encodes
direction relative to the heart. Pulmonary arteries and veins are deliberately
colored according to their oxygen content.

Every vessel in `data.js` includes direction, territory, explanatory notes and
reference IDs. Its path is stored in the order in which blood normally travels.
Coronary dominance is explicitly right-dominant. The flow-route explanations mark
the capillary and chamber transitions omitted from the geometric model.

## Files

- `data.js`: vessel coordinates, structure notes, routes, clinical correlations, sources.
- `scene.js`: Three.js model, picking, camera controls, arrows and flow animation.
- `compat-renderer.js`: CPU projection fallback for devices without WebGL2.
- `app.js`: accessible navigation, filters, heart hotspots and local notes.
- `assets/heart-cutaway.svg`: independently licensed heart illustration.
- `ATTRIBUTION.md`: source provenance, licensing and limitations.

Notes are saved only in browser localStorage. They are not sent to GitHub or a
server. Users should export notes before clearing browser storage or changing devices.
