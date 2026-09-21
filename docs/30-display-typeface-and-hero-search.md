# Display typeface, hero search and effects

21 September 2026. Seventh change of the handover, on Clent's instruction to make the design as
good as possible and to apply the best effects, with the design qualities of the references he had
sent. This is the change the earlier ones kept pointing at.

## The finding: the site had no display face at all

Three statements were made about this during the session, and the first two were wrong. The
sequence matters, because the third is what was actually true.

1. "A serif display face would breach the one-typeface guardrail in docs/23 section 3." Wrong on
   its face: `styles.css` sets `h1,h2,h3{font-family:var(--serif)}`.
2. "Porli already pairs a serif with a sans; the gap is that `--serif` has no font file, so
   headings fall back to Georgia." Also wrong. Headings were not falling back to Georgia.
3. What was true: `experience.css`, which loads second, contained `--serif: var(--sans)`. The
   serif token pointed at the sans, so **every heading on the site rendered in the sans** and
   `'Porli Serif'` never mattered. That one line is how the one-typeface rule was implemented.

So the guardrail was being honoured, invisibly, by a variable redefinition rather than anything a
reader of docs/23 would find. Changing it is a real narrowing of docs/23 section 3, not a
correction of an oversight, and is recorded as a decision rather than slipped through.

## What changed

**A self-hosted display serif.** EB Garamond, SIL Open Font License 1.1, latin subset only, one
44 KB WOFF2 at `public/assets/fonts/` with the full licence text beside it. Self-hosted, so the
Content Security Policy's `font-src 'self'` is untouched and no request leaves the site. Declared
with `font-display: swap`, so text is readable before the font arrives and the fallback chain
still ends at Georgia.

`--serif` now resolves to it, and the heading rule was retuned for it: weight 500 rather than 600,
and letter-spacing of -0.012em rather than -0.04em. Garamond is a light face with a small optical
size; the tight negative tracking a grotesque wants closes it up badly. Display sizes rose to suit
it, `h1` to `clamp(52px, 6.4vw, 104px)` and `h2` to `clamp(38px, 4.2vw, 64px)`.

The sans keeps everything else: body copy, labels, buttons, facts and prices. A price in a serif
is harder to scan, and the split now does useful work — the serif is the voice, the sans is the
data.

**The hero asks the first two questions.** Property type and Bedrooms, or Category and Tenancy on
commercial, moved out of the collapsed Filters panel onto the search card itself, following the
reference templates. They were removed from the panel in the same move: two controls of one name
in a form submit whichever comes last, so each exists exactly once. The sector toggle already
swapped fieldsets by `data-sector`, and the promoted pair uses the same mechanism, so choosing
Commercial swaps them along with the rest.

Making room for them exposed two layout faults. The search field was `flex: 1` against selects
with no basis, so it collapsed to its minimum; it now has a real basis and a floor. And
`.hero-content` capped at 900px, which was the true constraint rather than the card widths guessed
at first; it is now 1060px, with the headline and intro pinned back to 900px so the reading
measure is unchanged.

**Effects.** The hero photograph now drifts at a quarter of the page's scroll speed, capped at
120px, driven from `requestAnimationFrame` so a scroll never triggers layout. The layer carries
130px of slack above the hero so the drift can never uncover its top edge, which was verified by
sampling the hero's edge pixels rather than trusting the arithmetic. It is not applied at all
under reduced motion. Scroll reveals lengthened from 0.5s to 0.72s on a softer curve, closer to
the unhurried feel of the reference, over the same distance.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The font was confirmed to load and to be the face actually rendering, by measuring the same
  string in `'Porli Serif'` and in Georgia and asserting the widths differ, rather than reading the
  computed `font-family` string, which reports what was asked for rather than what arrived.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads. No horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls.
- The hero search was driven in a browser in both sectors: the promoted controls filter and reach
  the marketplace URL, the sector toggle swaps them, the hidden set is disabled so it cannot
  submit, and the panel still carries bathrooms, floor area, price and "include under offer". A
  check of submittable controls in both sectors found no duplicate names.
- The search field measured at 1440px, 1100px and 390px: 253px, 245px and 330px, no truncated
  labels, no overflow.
- Parallax measured at four scroll positions at two widths, with edge sampling at each, and
  confirmed absent under reduced motion.

## Limitations

- **One weight, one subset.** Latin only, 400–500. Anything outside that unicode range falls back
  to Georgia. A second weight or an italic would be two more files.
- **This narrows docs/23 section 3.** The site now uses two typefaces. If that is not wanted, the
  revert is a single line: `--serif: var(--sans)` in `experience.css`.
- **The hero card is busier.** Six controls rather than four. It buys the two filters people reach
  for first without opening anything, but it is a trade.
