# TNMAtlas

Live: https://satviktri.github.io/tnm-atlas/

A static multi-organ cancer-staging **learning tool**, with ten organ modules:
lung, breast, colon, rectum, prostate, kidney, bladder, exocrine pancreas,
hepatocellular carcinoma and differentiated thyroid carcinoma.

## Learn, then use

The default entry opens **Learn**: Start here → Foundations → Organ lesson →
Clinical notes → Practice cases. Each organ has three guided case walkthroughs
that reveal the findings, TNM categories with a schematic, and stage reasoning
in sequence. Practice cards keep category and stage answers closed initially.

**Use** contains the stage builder and quick reference. A guided case can be
loaded into the calculator with one click; switching between Learn and Use
preserves organ-specific calculator inputs for the current session. The lesson
case and reveal step are kept separately from those calculator inputs.

Direct entry: https://satviktri.github.io/tnm-atlas/#learn or
https://satviktri.github.io/tnm-atlas/#use. Learning does not need to be completed
before accessing the tools. Learning progress is session-only.

## What it includes

- Edition-specific TNM category selection and transparent stage-group reasoning.
- Separate initial clinical/pathological modes, including distinct breast nodal,
  prostate T and bladder T choices.
- Selected T-category size/depth/extension helpers and colorectal/pancreatic N helpers.
- Prostate PSA and Grade Group, and thyroid age modifiers.
- Original interactive SVG anatomy schematics, M0 reference matrices and category lists.
- Thirty fictional worked cases, clinical notes and locally saved study notes.
- Markdown study-summary export, keyboard-accessible tabs, responsive layouts.

## Scope and versions

AJCC's current-system list for **2026** was checked on **11 October 2026**.
Lung uses **AJCC Version 9 (2025)**. The other included disease sites use
**AJCC 8th edition**. This is an AJCC-oriented implementation, not an implementation
of UICC TNM9. Always match the system and edition to the diagnosis date and jurisdiction.

Breast output is **anatomic only**, not clinical/pathological prognostic stage.
Prostate includes PSA and Grade Group; differentiated thyroid includes age at
diagnosis. Post-neoadjuvant and recurrent groups are blocked. No treatment
recommendation, survival prediction or patient-specific diagnostic interpretation
is supplied. A qualified clinical team must confirm final staging against the
applicable protocol. The software has **not undergone independent clinical validation**.

## Run and verify

No build, CDN, API key or runtime dependency installation is required. Serve this
directory using any static HTTP server. GitHub Pages publishes it directly.

```sh
npm run check
npm test
```

`data.js` holds concise descriptors, references and fictional cases. `engine.js`
contains deterministic grouping and helper rules. `visuals.js` contains original
SVG diagrams. `app.js` supplies interaction and note/export behavior. Tests cover
worked examples, threshold values, edition changes, overrides, unknowns, modes
and invalid combinations. See `SOURCES.md` for source and implementation detail.

Notes are stored in localStorage on the current browser/device. Form inputs are
held in memory, not sent to a server. Notes can be included in a downloaded study
summary. This project does not collect or analyze patient records.
