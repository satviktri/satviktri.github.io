# ImagingAtlas

Public URL: https://satviktri.github.io/imaging-atlas/

An introductory Learn → Compare → Use → Cases resource for X-ray, CT, MRI and ultrasound.

- Four modality lessons and four linked static learning guides.
- Four interactive teaching models: CT window/level and synthetic section control, MRI sequence signal patterns, X-ray magnification, ultrasound long-/short-axis plane.
- Seven licensed real scans in three regional comparisons (chest, brain, kidney).
- Twelve original fictional reveal cases. Cases are independent of the real images.

Read [SOURCES.md](SOURCES.md) for medical scope and model assumptions and [ASSET-SOURCES.md](ASSET-SOURCES.md) for all image credits and licenses. This is not a clinical DICOM viewer or an imaging-ordering tool.

## Implementation

GitHub Pages/Jekyll renders content from `_data/imaging.yml`, `imaging_cases.json`, `imaging_images.json` and `imaging_sources.json`. Lessons, cases, references and images remain accessible without JavaScript. `app.js` progressively adds section selection and models. `physics.js` isolates the mathematical model. No image or health-data uploads.

`images.json` is the detailed source manifest; `_data/imaging_images.json` mirrors it for static rendering. Keep both synchronized when changing images. Assets are unchanged original files with attribution shown in the app.

Run `npm test` and `npm run check` within this folder. A full browser layout review requires a browser-capable environment. Shared SEO and Analytics includes are reused; learning pages are in `_data/learning.yml`, and the main resource is in `_data/atlases.yml`.
