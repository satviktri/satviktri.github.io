# TNMAtlas — sources, provenance and implementation scope

Reference review: **11 October 2026**. Educational release **1.0**.

## Staging systems

AJCC's [2026 current staging system list](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf)
identifies lung as Version 9 (2025), and breast, colon/rectum, prostate, kidney,
urinary bladder, exocrine pancreas, liver, and differentiated thyroid as 8th edition.
AJCC updates are disease-specific. The implemented rules should not be interpreted
as a uniform “AJCC 9th edition” or as UICC TNM9.

General context:

- [AJCC staging classifications](https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/cancer-staging-systems/)
- [NCI cancer staging overview](https://www.cancer.gov/about-cancer/diagnosis-staging/staging)

## Disease-specific evidence

NCI PDQ health-professional summaries provide accessible disease-specific staging
definitions/grouping tables and clinical context. The following pages were read;
their relevant table references are recorded for reproducibility.

| Module | Implemented grouping | Reference |
|---|---|---|
| Lung / NSCLC | AJCC Version 9, including N2a/N2b and M1c1/M1c2 | [NCI PDQ, Tables 1–4](https://www.cancer.gov/types/lung/hp/non-small-cell-lung-treatment-pdq) |
| Breast | AJCC 8 anatomic only; separate cN/pN summaries | [NCI PDQ, Tables 2–8](https://www.cancer.gov/types/breast/hp/breast-treatment-pdq) |
| Colon | AJCC 8 colorectal groups | [NCI PDQ, staging Tables 1–5](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) |
| Rectum | AJCC 8 colorectal groups; separate local-staging notes | [NCI PDQ, stage information](https://www.cancer.gov/types/colorectal/hp/rectal-treatment-pdq) |
| Prostate | AJCC 8, PSA and Grade Group included | [NCI PDQ, Tables 2–5](https://www.cancer.gov/types/prostate/hp/prostate-treatment-pdq) |
| Kidney / RCC | AJCC 8 | [NCI PDQ, Tables 1–4](https://www.cancer.gov/types/kidney/hp/kidney-treatment-pdq) |
| Bladder | AJCC 8 | [NCI PDQ, Tables 1–5](https://www.cancer.gov/types/bladder/hp/bladder-treatment-pdq) and [American Cancer Society stage reference](https://www.cancer.org/cancer/types/bladder-cancer/detection-diagnosis-staging/staging.html) |
| Exocrine pancreas | AJCC 8 | [NCI PDQ, Tables 1–5](https://www.cancer.gov/types/pancreatic/hp/pancreatic-treatment-pdq) |
| Liver / HCC | AJCC 8 | [NCI PDQ, Tables 1–4](https://www.cancer.gov/types/liver/hp/adult-liver-treatment-pdq) |
| Differentiated thyroid | AJCC 8, age at diagnosis included | [NCI PDQ, Tables 2–5](https://www.cancer.gov/types/thyroid/hp/thyroid-treatment-pdq) |

### A resolved source discrepancy

The reviewed NCI bladder PDQ stage-IVA row listed T4b N0 M0. The American Cancer
Society explicitly lists **T4b, any N, M0** as IVA. This implementation uses that
any-N rule, cites both pages, and tests T4b N3 M0 and T4b NX M0.

## Important implementation boundaries

1. **Initial c/p classification only.** After-neoadjuvant and recurrent inputs do
   not produce stage groups. The initial diagnosis stage must be preserved.
2. **No pM0.** Pathological T/N with a negative distant assessment is displayed
   with cM0. Positive M remains cM1 unless the user explicitly confirms microscopic
   proof; only then is pM1 displayed.
3. **Breast anatomic grouping only.** No ER/PR/HER2, histological grade, genomic
   assay or prognostic-stage algorithm. N1mi is available in pathological mode
   only; the rare cN1mi setting and detailed nodal suffixes are not implemented.
4. **Prostate classification.** Clinical T1/T2 and pathological T2 are distinct;
   no pT1/pT2a/pT2b/pT2c. Pretreatment PSA and Grade Group are used when the rule
   depends on them. N1/M1 or Grade Group 5 can determine a group independently of
   some other factors. This is not a treatment-risk classification.
5. **Thyroid histology.** Only differentiated papillary/follicular carcinoma is
   included. Age is a whole number at diagnosis. NX is allowed only when the
   cited group explicitly allows it. Medullary/anaplastic systems are not included.
6. **Simplified descriptors.** Categories aggregate selected suffixes that do not
   change grouping. The complete formal descriptor lists, regional basins,
   measurement rules and evidence requirements must be checked in source protocols.
   Lung occult carcinoma and special lepidic/superficial-spreading rules are not
   automatically inferred. HCC, renal cell and exocrine pancreas rules must not be
   applied to other histologies at the same organ.
7. **Unknown versus negative.** Empty fields and unassessed M are never mapped to
   N0/M0. Explicit TX/NX produces no group unless a specific any-T/any-N rule
   resolves it. Noninvasive/in-situ categories paired with nodal/distant disease
   are flagged for reconciliation rather than treated as straightforward cases.
8. **Schematic visuals.** Original SVGs illustrate selected anatomical concepts;
   they are not diagnostic images or patient reconstructions. Node/distant-site
   icons are symbolic and do not encode exact counts. Local depictions are
   illustrative alternatives, not exhaustive depictions of every category.

## Provenance and licensing

All explanatory prose, fictional teaching cases, application code and vector
geometry were authored independently for this project. No source illustration,
table layout, branded mark or manual page has been copied. TNM terminology,
clinical classification facts and edition-specific relationships are attributed
to the references above. The app is not affiliated with or endorsed by AJCC,
the American College of Surgeons, the American Cancer Society, or NCI.

Original software and SVG source are offered under the included MIT license.
This does not grant rights to third-party manuals, trademarks, reference content
or branded staging products. Follow each source's terms for further reproduction.

## Verification

Automated tests cover the 30 stated examples, numeric boundaries, extension
overrides, key Version 9 lung changes, nodal/deposit distinctions, prostate PSA/GG,
thyroid age 55, any-T/any-N exceptions, pM0 prevention, post-therapy exclusion,
invalid/incomplete inputs and all exposed category combinations. These are
software checks, not independent clinical validation. Full browser layout QA was
not available in the build environment.
