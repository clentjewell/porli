# Editorial redesign

The user requested a more distinctive, premium layout with scrolling animation, an interactive hero and an interactive header. This design supersedes the original side-by-side homepage composition while retaining the ivory/olive palette, architectural images and working marketplace workflows.

## Implemented

- Full-height architectural hero with oversized serif type, three manually selected image views, restrained pointer depth and scroll parallax. No automatic carousel.
- Transparent homepage navigation changes to a compact ivory header after scrolling. A keyboard-operable expanded menu includes property discovery, shortlist, approach and account links. Escape closes the menu.
- Direct hero link to the Buy/Rent search dock; hash links scroll without resetting the page.
- Numbered, staggered property collection with reveal transitions and larger photographs.
- A pinned courtyard study synchronises three images and highlighted descriptions to native page scrolling. No scroll interception or scroll locking.
- Full-width rental section, linked journey rows and a large closing browse invitation.
- Larger marketplace cards and a three-image property gallery with direct image selection; dark olive contact panel.
- Responsive mobile layouts and reduced-motion alternatives. Pointer effects run only on suitable devices. Scroll work uses one queued animation frame and listeners are removed when mounting a new page.

## Verification

Checked the actual desktop and 390 × 844 mobile browser: hero image selection, expanded navigation, anchor scrolling, compact header, second pinned story state, property gallery opening at image two, and rental search for Fernwick. Mobile pages had no horizontal overflow. Browser console was checked for errors. The existing API suite and syntax checks are run before packaging.

All imagery is reused from the six registered Higgsfield images. No new image credits or hosting services were required. Production launch limitations in README remain unchanged.
