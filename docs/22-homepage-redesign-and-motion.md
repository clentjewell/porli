# Homepage redesign and motion

18 September 2026. The homepage was rebuilt to the supplied mockup and the whole site was given restrained movement: the request was to make everything interactive, with movements and animations. This document records what changed, how each interaction behaves, and the accessibility rules every animation follows.

## The homepage, section by section
1. **Hero, three columns.** Copy on the left (eyebrow, headline, intro, sector toggle, search, popular locations, account note). The headline listing card in the middle. A decorative side panel on the right that reads "Property · People · Possibilities", shows a GrandBlue sunset photograph and the words *Live, Invest, Belong*. The side panel is hidden below 1180px and the hero stacks below 560px.
2. **Value strip.** Four items with icons: Curated listings, Direct to the team, Save and compare, A more open market. Two columns on tablets, one column on phones.
3. **Featured destinations.** Saltmere ("Coastal living, reimagined."), Fernwick ("Business. Lifestyle. Opportunity.") and Thailand ("Extraordinary places, real opportunities."). Each card is one link to the marketplace filtered by that location. Saltmere and Fernwick use existing generated concept images; Thailand uses a photograph supplied by the property. A caption under the grid says which places are fictional. The mockup spelt the second place "Fenwick"; the repository's fixtures and URLs use **Fernwick**, so that spelling is kept.
4. **Available homes**, the existing residential grid, followed by **What Porli does** (now with 01/02/03 step markers), the **Commercial property** section and the account band.

No new images were generated or added. Every picture on the page already exists in `public/assets/` and is listed in `design/asset-register.json`. Honest labelling is unchanged: fictional listings say so, and the headline listing repeats "Photographs supplied by the property. Price to be confirmed."

## Interactions
| Element | Behaviour |
|---|---|
| Headline word rise | Each word of the h1 rises into place on first paint, 70 ms apart. |
| Sector toggle | Pill switch with house and building icons. An olive thumb slides behind the active choice. Choosing a sector also rewrites the popular-location links to that sector. |
| Search box | Olive ring and a 1px lift on focus. While the field is empty and not focused the placeholder cycles through example places every 2.6 s (Saltmere, Fernwick, Rayong for residential; Fernwick, Rayong, Highstreet for commercial). A typed value is never overwritten. |
| Headline listing carousel | Previous and next buttons, a "1 / 6" counter, dot controls, left and right arrow keys when the carousel has focus, and a horizontal swipe on touch (40px threshold). Autoplay every 5 s pauses while hovered or focused, when the tab is hidden, and never runs under reduced motion. The active photograph has a slow 8 s zoom. Changes are announced to screen readers through a visually hidden live region ("Photograph 3 of 6: …"). |
| Side panel photograph | Moves up to 18px with the scroll for a light parallax. |
| Scroll reveal | Sections and cards fade and rise 14px as they enter the viewport. Children of a `data-reveal-group` cascade 80 ms apart. |
| Destination cards | Image scales to 1.04 over 600 ms on hover or focus; the round arrow button lifts and fills olive. |
| Value items | The icon circle fills olive on hover. |
| Property cards | Image scales to 1.03 with a soft shadow on hover; the save button pops once when toggled. |
| Buttons and links | Trailing arrow icons nudge 3px to the right on hover. |
| Page changes | Every route now fades and rises in over 320 ms (previously disabled on the front page). |

## Accessibility and performance rules
- Every animation is transform or opacity only, so nothing triggers layout during motion.
- `prefers-reduced-motion: reduce` removes all transitions and animations site-wide (a rule in `styles.css`), and `experience.css` adds overrides so that nothing that starts hidden stays hidden: revealed sections, the headline words and the carousel image are shown immediately. Autoplay, parallax, the zoom and the cycling placeholder are switched off in script as well.
- No inline scripts, inline styles or inline event handlers: the Content Security Policy is unchanged (`script-src 'self'; style-src 'self'`). Stagger indexes are set as CSS custom properties from script.
- All controls have accessible names and states (`aria-pressed` on toggles and dots, labelled carousel buttons, a live region for slide changes). Focus rings remain visible. Tap targets are at least 38px on phones.
- Listeners registered by the homepage are attached with the shared abort signal and cleared on route change, together with the autoplay and placeholder timers.

## Verification
- `npm run check` and `npm test` (22 tests) pass.
- The screenshot harness captured all eight routes at 1440px and 390px with reduced motion: no console errors, failed requests or horizontal overflow.
- A separate Playwright run without reduced motion confirmed that after scrolling, no revealed element is left transparent, that two presses of the next button move the counter to "3 / 6" and swap the photograph, and that the live region reads the new photograph's description.

## Files
`public/experience.js` (homepage view and all homepage behaviour), `public/experience.css` (layout, motion and breakpoints), `public/app.js` (five new icons; the sector action also updates the popular-location links), `public/index.html` (cache-busting version and page description). Cloudflare deployment is unchanged: static assets only.

## Limitations and remaining decisions
- The side panel words and the destination taglines are marketing copy written for the concept; they should be reviewed with the brand work in docs/21 before launch.
- Destination cards link to marketplace searches, so Thailand shows only the headline listing until more commercial stock exists.
- Chromium's full-page screenshot duplicates the sticky header when captured while scrolled; that is a capture artefact, not a rendering defect.
