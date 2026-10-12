# LymphAtlas

An independently authored, static educational atlas of major lymphatic structures. Inspired by the interaction model of [NeuroAxis](https://linkbag.github.io/neuroaxis-atlas/).

## Run

Serve this directory with any static server, e.g. `python3 -m http.server 8000`, then open the local server URL. ES modules require HTTP; double-clicking index.html is not supported.

## Features

- Selectable, rotatable 3D schematic with bilateral node groups, lymphoid organs, and central ducts.
- Search by name, aliases, and region; selection synchronized with details.
- Layer controls, isolation, named views, animation pause, and keyboard rotation/zoom.
- Six drainage routes, four clinical connections, eight explained study questions.
- Responsive layout; keyboard-accessible structure browser; reduced-motion preference honored.
- Atlas runtime JavaScript is vendored. No API keys, external fonts, accounts or backend are required. The GitHub Pages edition uses the shared site Google Analytics tag; see `/atlases/privacy/`.
- A CPU canvas compatibility renderer preserves 3D rotation and selection when WebGL2 is unavailable.

## Model limits

Coordinates and shapes are authored teaching schematics, not segmented anatomy. Clusters symbolize groups, not actual node counts. Pathways show common patterns with intermediate vessels simplified; no clinical station boundaries or diagnostic claims. See the in-app Sources dialog for verified reference links and limitations.

## Files

- `data.js`: anatomy records, references, pathways, cases, and questions.
- `scene.js`: Three.js model, interaction, and animated flow.
- `compat-renderer.js`: canvas projection of the same 3D scene for browsers without WebGL2.
- `app.js`: browser, detail panels, study state, and optional WebMCP integration.
- `style.css`, `index.html`: responsive presentation.
- `vendor/`: Three.js 0.180.0 and OrbitControls, with the upstream MIT license.

OrbitControls has one local adaptation: its `three` import uses the vendored relative module path. For development with live reload, run `npm ci` and `npm run dev`; production needs no npm installation.

## GitHub Pages

Deployed as `/lymph-atlas/` within the existing personal GitHub Pages repository. All application asset paths are relative. The existing Jekyll publishing process renders the entry page to include shared metadata and analytics, without a new build tool or workflow. To move to a standalone repository, copy this folder's contents to its root, enable Pages from that branch/root, and update the footer source link.

## Validation

The learning content is a prototype, not a clinically validated anatomical reference. New content should receive expert anatomical review. Check that changes preserve left/right orientation, drainage direction, keyboard access, and mobile readability.
