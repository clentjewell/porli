# Softer surfaces and filter pills

21 September 2026. Sixth change of the handover. Clent asked for the design qualities of an
interior-design template (https://interior.framer.wiki/, read and rendered from the live site),
with **no colour changes**, and for behaviour closer to realestate.com.au.

## What was taken from the reference design, and what was not

The template is a single-page brochure for one designer, 16,635px tall: hero, statistics, project
strip, services, founder, a four-step process, testimonials and an FAQ. Most of that shape is
wrong for a marketplace, which is a tool rather than a scroll. Three qualities do transfer, and
none of them is colour.

**Corner radius.** The template rounds its surfaces at 10–11px. Porli used 3px in fourteen places,
which reads crisp but clinical. A `--radius` (10px) and `--radius-sm` (6px) pair now sits in
`:root` beside the existing colour tokens, and the large surfaces use it: listing card images, the
homepage feature image, the gallery, the commercial photograph, the map panel, destination cards,
buttons, inputs, the search field, empty states and the toast. Circles and full pills are left
alone. This is the single change that most alters how the site feels.

**Whitespace and type contrast.** Section headings tightened their letter-spacing slightly. The
larger rhythm was already close; the template's advantage there is mostly its scale, not its
spacing.

**Its palette, deliberately not copied.** Worth recording because the finding is reassuring rather
than actionable: the template's page colour is `#f7f1ec` and its panel `#eee6de`, against Porli's
`#f7f4ec` and `#e7ebdd`. The two are within a few points of each other. Porli's palette was
already in the same family, so there was nothing to take and nothing to change.

**A correction.** An earlier note in this session said a serif display face would breach the
"one typeface" guardrail in docs/23 section 3. That was wrong: `styles.css` already sets
`h1,h2,h3{font-family:var(--serif)}`, so Porli has always paired a serif with a sans, exactly as
the template does. The real gap is that `--serif` names `'Porli Serif'` with no `@font-face`
behind it, so every heading falls back to **Georgia**. Self-hosting a display serif would be the
largest remaining visual upgrade and is allowed by the Content Security Policy, which permits
`font-src 'self'`. It needs a licence decision and a font file in the repository, so it is flagged
rather than done.

## Filter pills, from the reference portal

The archived realestate.com.au search page (docs/25) puts its most-used filters on the bar itself:
`Property type | Price | Bed | Filters`. Porli kept all of its filters behind one collapsible
panel. The three a buyer reaches for first are now on the bar as pills:

- **Property type** — the sector's own list, so it reads "Category" on commercial.
- **Price** — up to $500k, $1m, $2m, $5m.
- **Beds** — residential only, hidden entirely on commercial where it means nothing.

Each pill sets or clears exactly one parameter and leaves every other one alone, so they compose
with each other, with the panel and with the sort control, and the URL stays shareable. The panel
keeps everything it had, including the price range, tenancy, floor area and "include under offer",
so nothing was removed or duplicated.

The search bar became a flex row to fit them: a fixed three-column grid could not take a fourth
child, which is what pushed the Filters button onto its own line on the first attempt.

On a phone the pills scroll horizontally in a single row beside the Filters button, which is what
the reference portal does at that width. Without that they wrapped onto a third line and pushed
the first result back down the page.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. The pills reuse the existing query
  parameters and the endpoint that already validated them.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads. No horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls.
- The pills were driven in a browser: selecting a type filters the results and updates the URL,
  adding beds composes with it, clearing the type leaves beds intact, and the beds pill is absent
  on commercial.
- The search bar measured at both widths: one line and 99px on desktop, two lines and 154px on a
  phone, with the sticky bar opaque while content passes beneath it.
- Cache-busting versions bumped to 9 together.

## Limitations

- **The first phone result sits at 429px**, against 368px before the pills and 500px before any of
  this work. The pills cost 61px of the fold; they earn it by removing a tap to reach the filters
  most people want.
- **The price pill offers four fixed ceilings** rather than a range. A proper minimum and maximum
  already exist in the panel; duplicating them as two pills would have taken the whole bar.
- **Headings still fall back to Georgia.** See the correction above.
- Map view, saved searches and pagination remain unbuilt for the reasons in docs/25 and docs/26:
  one geocoded listing, no email delivery, and six listings in total.

## A rotation coupled to the hero zoom, 21 September 2026

The reference template's motion was measured rather than described. Three findings shaped what was
taken from it.

**Its signature effect is a slow scale-and-rotate drift, and it is time-based.** Sampling the same
elements at four scroll positions gave equal increments regardless of how far the page had
travelled: scale 1.083 → 1.095 → 1.107 → 1.120 → 1.132 over roughly 0.8 second intervals, with a
rotation rising alongside it at about ten times the scale increment in degrees. It is a continuous
drift, not a scroll-linked one.

**None of it is CSS.** A scan of every element on the page found no CSS transitions and no CSS
animations at all; the motion is JavaScript writing inline transforms. That route is closed here —
no dependencies, no build step, and the Content Security Policy forbids third-party scripts — so
anything equivalent has to be hand-written CSS.

**It does not respect `prefers-reduced-motion`.** Loaded with reduce set, six blocks below the
fold still start at opacity 0 and animate in. Porli clears that bar and should keep clearing it,
so the look was worth taking and the implementation was not.

Porli already had the rest of the vocabulary: a hero zoom, scroll reveals that fade and rise, and
hover scales on images. The one missing ingredient was the rotation riding along with the zoom,
which is what stops a straight zoom reading as mechanical. Both zoom keyframes now carry one at
the ratio measured above:

- `hero-zoom`: `scale(1) rotate(0deg)` → `scale(1.05) rotate(.5deg)` over 10s
- `kenburns`, on the headline listing photograph: `scale(1.06) rotate(.6deg)`

Both are transform only, so the site-wide reduced-motion rule switches them off along with
everything else, which was confirmed rather than assumed.

**The risk worth checking was corner exposure.** Rotating an image that exactly covers its frame
pulls its corners inside the frame and shows the page behind. For a box of aspect ratio *r*, the
scale needed to stay covered at angle θ is about `cos θ + sin θ × r`: at 0.5° and 1.52:1 that is
1.013, and the zoom reaches 1.05, so there is roughly four times the margin required. It was
verified by sampling the four corner pixels of the rendered hero rather than trusting the
arithmetic — at the shipped values, at 1.02, and at the theoretical minimum of 1.013, across
desktop, phone, wide-and-short and tall-and-narrow viewports. No corner showed the page colour in
any of the sixteen combinations.
