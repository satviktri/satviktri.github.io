# Design Notes

## Tokens
- Global design tokens live in `assets/css/main.css` under the top-level `:root` block.
- Core palette variables are:
  - `--primary`, `--accent`, `--highlight`
  - `--background`, `--background-alt`
  - `--text-primary`, `--text-secondary`, `--muted`, `--border`
- Shared spacing and motion tokens are also in `:root` (`--section-pad`, `--nav-height`, `--motion-fast`, `--motion-med`).

## Updated Components
- **Hero/Header** (`_layouts/homepage.html` + `assets/css/main.css`)
  - Upgraded to desktop two-column structure with portrait/text cluster + contact column.
  - Added CTA button row: Publications, Research, Contact.
- **Navigation**
  - Made navigation bar sticky with light blur/shadow treatment.
  - Added section `scroll-margin-top` to keep anchor targets visible below sticky nav.
- **Sections**
  - Introduced alternating section backgrounds (white / background-alt).
  - Added consistent vertical rhythm and left accent rule for section titles.
- **Cards / Tiles**
  - Standardized stats, research cards, publication/news cards with shared borders, radius, and hover lift.
  - Current research cards use same hover elevation pattern (`translateY(-4px)` + softer shadow).
- **Interactions & Accessibility**
  - Added consistent link underline transitions and visible focus rings.
  - Kept reduced-motion support for users with `prefers-reduced-motion`.

## Tuning Later
- **Palette:** adjust only root variables to recolor globally.
- **Spacing scale:** tweak `--section-pad`, `--content-width`, and breakpoint blocks.
- **Motion:** reduce or increase animation feel by editing `--motion-fast` / `--motion-med` and hover shadow tokens.
