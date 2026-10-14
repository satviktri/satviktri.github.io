# ImagingAtlas — sources and scope

Source check: 13 October 2026. Created for Satvik Tripathi’s medical atlas collection with AI assistance. No independent clinical validation is claimed.

## Educational scope

Introductory image formation and interpretation habits for X-ray, CT, MRI and ultrasound. Seven real teaching images are independent source studies, not a paired multimodality patient dataset. In particular, the T1 and T2 MRIs differ in patient/acquisition/level, and the renal CT depicts a cyst while the ultrasound is a separate normal example. Twelve worked cases are fictional and do not describe the pictured patients.

Not a diagnostic viewer, protocol selector, patient-specific recommendation system or comprehensive radiology course. No PET, SPECT, mammography, fluoroscopy or interventional module is included in this release; mentions do not imply coverage. Clinical context must not be inferred from a single displayed image.

## Model assumptions

- **CT:** original synthetic circular phantom, with assigned values in HU. The values are not measured from patient images. Windowing uses DICOM PS3.3 C.11.2 default LINEAR: lower = c − 0.5 − (w − 1)/2; upper = c − 0.5 + (w − 1)/2. Width is at least 1; width 1 is a threshold. Output is rounded to 0–255 with higher values brighter (MONOCHROME2). Presets illustrate displays, not clinical protocols. Section control changes synthetic geometry. Fixed JPEG/PNG library images cannot provide true HU windowing.
- **MRI:** illustrative relative signal swatches, not simulated quantitative scans. T1, T2 and FLAIR examples simplify usual cerebral tissue patterns. DWI plus low ADC can support restricted diffusion in context; DWI brightness alone is insufficient. Swatch values are arbitrary display values, not a clinical MRI signal scale.
- **X-ray:** ideal point-source geometry with fixed 180 cm source-to-detector distance; magnification = SDD/(SDD − object-to-detector distance). Does not simulate exposure, scatter, focal spot blur, anatomy or diagnostic accuracy.
- **Ultrasound:** ideal straight vessel in longitudinal/perpendicular planes. Real vessels and oblique views vary. No acoustic propagation, Doppler velocity, angle correction or scanner orientation standard is simulated.

## Safety references

NIH NIBIB is used for basic physics. Device and contrast safety is supported separately by FDA and ACR/RSNA information. MR Conditional requires the specified device conditions; absence of ionizing radiation does not imply absence of hazards. Contrast agents for different modalities are not interchangeable. Screening is agent-, patient- and examination-specific. The atlas does not reproduce broad implant, pregnancy or kidney contraindication claims from older introductory descriptions.

## Medical and technical references

- [NIH NIBIB: Medical X-rays](https://www.nibib.nih.gov/science-education/science-topics/medical-x-rays)
- [NIH NIBIB: Computed Tomography](https://www.nibib.nih.gov/science-education/science-topics/computed-tomography-ct)
- [NIH NIBIB: Magnetic Resonance Imaging](https://www.nibib.nih.gov/science-education/science-topics/magnetic-resonance-imaging-mri)
- [NIH NIBIB: Ultrasound](https://www.nibib.nih.gov/science-education/science-topics/ultrasound)
- [RadiologyInfo: Bone X-ray](https://www.radiologyinfo.org/en/info/bonerad)
- [RadiologyInfo: Chest X-ray](https://www.radiologyinfo.org/en/info/chestrad)
- [RadiologyInfo: Ultrasound](https://www.radiologyinfo.org/en/info/genus)
- [RadiologyInfo: Contrast Materials](https://www.radiologyinfo.org/en/info/safety-contrast)
- [FDA: MRI Information for Professionals](https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/information-professionals)
- [DICOM PS3.3: VOI LUT Module](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.11.2.html)
- [Assessment of cardiac size on portable chest films (original study)](https://pubmed.ncbi.nlm.nih.gov/2966252/)
- [Qayyum: Diffusion-weighted Imaging in the Abdomen and Pelvis: Concepts and Applications](https://pubs.rsna.org/doi/10.1148/rg.296095521)

Additional modality reading: [Body CT](https://www.radiologyinfo.org/en/info/bodyct), [Brain MRI](https://www.radiologyinfo.org/en/info/headmr), [FDA MRI benefits and risks](https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/benefits-and-risks).

MRI signal-pattern teaching reference: [Josh Cochran, Anatomical neuroimaging, University of Iowa](https://neuroimaging.uiowa.edu/sites/neuroimaging.uiowa.edu/files/2022-05/05_JCOCHRAN_anatomical-neuroimaging.pdf), especially slide 10. Used for introductory tissue signal patterns only; no figures copied.

## Image reuse

Real images and their authors are listed in [ASSET-SOURCES.md](ASSET-SOURCES.md) and [images.json](images.json). They are unchanged copies under the specified CC BY, CC BY-SA or CC0 terms. No NIH stock images or RSNA article figures were copied. Image licensing does not imply endorsement by the source authors or their institutions. Original atlas schematics are separate from the real images.

Corrections: open a [repository issue](https://github.com/satviktri/satviktri.github.io/issues/new) without personal health information.
