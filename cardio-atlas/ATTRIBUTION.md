# Sources and attribution

## Model provenance

CardioAtlas is an original interactive educational schematic. Vessel centerlines,
body envelopes, selection logic, text and flow sequencing were created for this
project. This is not a CT/MRI segmentation, licensed commercial 3D atlas, or
clinically validated patient-specific reconstruction. NeuroAxis was a reference
for the exploratory experience; no NeuroAxis anatomy or code was incorporated.

All path coordinate arrays run in normal physiological flow direction. Animation
is illustrative, not a fluid dynamics simulation. Vessel calibers, spacing and
branch angles are simplified. The map covers major named vessels rather than all
anatomical branches. It includes systemic, pulmonary, portal and coronary routes.
Coronary anatomy uses a right-dominant pattern. Venous pairs, pulmonary vein pairs,
palmar arches and selected small branches are grouped. Capillary beds are explained
in route notes, not reconstructed in 3D.

## Anatomical artwork

- Asset: `assets/heart-cutaway.svg`
- Work: **Diagram of the human heart (no text).svg**
- Creators: Wapcaplet, Yaddah, Wnauta. Later revisions, including the current
  16 July 2021 version, by Jmarchn (per Commons file history).
- Source: https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(no_text).svg
- File: https://upload.wikimedia.org/wikipedia/commons/f/f5/Diagram_of_the_human_heart_%28no_text%29.svg
- License selected: **Creative Commons Attribution–ShareAlike 3.0 Unported**
  https://creativecommons.org/licenses/by-sa/3.0/
- License text: https://creativecommons.org/licenses/by-sa/3.0/legalcode
- The SVG file is reproduced unchanged. Numbered HTML hotspots and a surrounding
  presentation are added. To the extent that these constitute adaptations of the
  illustration, those presentation adaptations are also offered under CC BY-SA 3.0.
  No creator endorsement is implied. The figure's inherited license is independent
  of the surrounding software. Existing metadata within the SVG is retained.

## Anatomical and clinical references

Facts are summarized in original teaching language. No OpenStax illustration has
been reproduced. Current OpenStax content licensing should be checked separately
before copying its artwork or prose.

1. OpenStax, *Anatomy and Physiology 2e*, 19.1 Heart Anatomy.
   https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy
2. OpenStax, *Anatomy and Physiology 2e*, 20.5 Circulatory Pathways.
   https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways
3. NHLBI, How the Heart Works: How Blood Flows through the Heart.
   https://www.nhlbi.nih.gov/health/heart/blood-flow
4. NHLBI, Venous Thromboembolism.
   https://www.nhlbi.nih.gov/health/venous-thromboembolism
5. NHLBI, Coronary Heart Disease.
   https://www.nhlbi.nih.gov/health/coronary-heart-disease
6. NHLBI, Heart Valve Diseases.
   https://www.nhlbi.nih.gov/health/heart-valve-diseases
7. NHLBI, Aortic Aneurysm.
   https://www.nhlbi.nih.gov/health/aortic-aneurysm
8. NHLBI, Peripheral Artery Disease.
   https://www.nhlbi.nih.gov/health/peripheral-artery-disease
9. NHLBI, Heart Failure.
   https://www.nhlbi.nih.gov/health/heart-failure
10. NIDDK, Definition & Facts for Cirrhosis.
    https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis/definition-facts

Reference review date: 10 October 2026. These sources support educational anatomy
and clinical correlations, not patient-specific diagnosis or treatment.

## Software

Three.js 0.180.0 and OrbitControls are bundled locally in `vendor/` under the MIT
license. See `vendor/THREE-LICENSE.txt`. The Canvas2D compatibility renderer uses
the same Three.js geometry and camera projection when WebGL2 is unavailable.

The original application code and vessel-coordinate dataset are offered under
the MIT license (see `LICENSE`). The anatomical illustration and any adaptations
retain their separate CC BY-SA terms as described above.
