# The editorial format, and the GrandBlue feature page

21 September 2026. Not from the list in docs/23. Clent's reading of the site was that the front
page is "not too catchy": the format, not the name. This records the alternative format that was
built in answer, and where it ended up.

## What the format is

The homepage is a stack of nine modules — hero, headline listing, values, destinations, recently
viewed, available homes, how it works, commercial, account. Each is well made and each competes
with the one above it. GrandBlue appears in the second, which is as high as it can go without the
hero itself choosing between the residential and commercial framings (docs/26).

The editorial format inverts that. It opens on one property at full screen height, with the
property's own name as the page's `h1`, and then reads downwards as a single piece: the argument
for the property, its key facts, a sequence of its photographs at different widths, and only then
the rest of the catalogue as alternating rows. One narrative, not nine modules.

## Where it lives, and why not the homepage

It was built first at `/editorial`, unlinked, so the two formats could be compared on the real site
rather than from a description. Clent's decision was to keep it as a GrandBlue **feature page**
rather than make it the homepage.

That is the right call for a reason the comparison made obvious: **the editorial opener has no
search bar.** The homepage hero does, and it is the main entry into the marketplace — the
convention docs/23 section 4 takes from the reference portal. Swapping the formats would have given
a property marketplace a front page you cannot search from. As a feature page the format keeps
everything it is good at and costs nothing.

So it now lives at `/feature/<slug>`, generic rather than hard-coded to GrandBlue, and is reached
from two places:

- the headline listing on the homepage, as "Read the feature" beside View and Enquire;
- the "Why GrandBlue" block on the listing page, as "Read the full feature".

Both links appear only when the listing has a `why` text, so the control is never inert. A
`/feature/` address for a listing without one says there is no feature yet and points at the
listing; an unknown slug says the feature is not available. `/editorial` redirects to the canonical
address, so the link Clent was given still works.

## The pieces, in order

1. **The opener.** A full-height photograph with the property type and locality as an eyebrow, the
   property name set at up to 118px in the display face, the summary, the price label and two
   actions: view and enquire. The copy aligns to the same 83px left edge as the wordmark above it
   at desktop width, which had to be measured rather than assumed — the page padding and the
   header's `.wrap` resolve to different numbers.
2. **The property.** The first paragraph of the `why` text held in docs/24, set at reading size in
   the display face beside a small label, at a 720px measure. Centred text was tried first and
   discarded: seven centred lines of 38px type is a poster, not a paragraph.
3. **Key facts.** The first four of the listing's own detail pairs, short values only, in a ruled
   four-column row. On GrandBlue that reads Beach, Airport, Bangkok, and Land and floor area — the
   last of which correctly says "To be confirmed" rather than a number nobody has supplied.
4. **The photographs.** A wide plate, a pair, and a second wide plate, all from the listing's own
   media. This is the part the homepage has no room for: GrandBlue has six photographs and the
   homepage shows one.
5. **Also with Porli.** The remaining five listings as full-width alternating rows rather than a
   three-column grid, each keeping its "Fictional listing · Generated image" line.
6. **A closing enquiry**, naming the property.

## Honest labelling is unchanged

The price line renders through the same `price()` helper as every card, so GrandBlue reads "Price
to be confirmed" and cannot read anything else. No room count, area or price is invented anywhere
on the page: the facts row prints the listing's own detail pairs and stops at four. Every fictional
listing carries its label. Every photograph keeps the alt text set by the imagery pass in docs/27,
which states whether it was supplied or generated.

## Motion

The opener's photograph runs the existing `kenburns` drift — transform only, 26 seconds, and
switched off twice over under reduced motion, once by the global rule in `styles.css` and once by
an explicit rule here. Sections use the site's existing `[data-reveal]` observer. Photographs lift
1.5% on hover behind a `hover: hover` query, so it never fires on touch. No new keyframes, no
JavaScript animation, nothing that moves anything other than transform and opacity. No CSP change.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. The route is presentation over the
  existing `/api/properties` response, so no endpoint or fixture changed.
- Every route walked at 1440px and 390px with reduced motion on and off: no horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls, no image without alt
  text, and nothing left below full opacity after scrolling.
- The four states of the new route were exercised rather than assumed: GrandBlue renders; a listing
  with no `why` says so and links to the listing; an unknown slug says the feature is unavailable;
  and `/editorial` rewrites its address to the canonical one.
- Both inbound links were clicked through, and confirmed absent on a fictional listing.
- Left edges measured rather than eyeballed: wordmark, opener copy, plates and rows all resolve to
  83px at 1440px.
- The photo aspect ratios were wrong on the first pass and looked right in a thumbnail. The `width`
  and `height` attributes on each image are presentational hints that beat `aspect-ratio` unless
  `height: auto` is set, so a row image rendered 1,032px tall instead of 411. Found by measuring the
  rendered row, not by looking at it.

## Limitations

- **The format leans on one listing having depth.** GrandBlue has six photographs and a written
  argument. No other listing has a `why` text, so GrandBlue is currently the only property with a
  feature page. The format is only as good as the listing's content, which is itself an argument for
  getting the remaining GrandBlue material.
- **Still blocked on the same facts.** Price, room count, land and floor area, sale terms and the
  written photograph permission are unresolved, and the format makes their absence more visible, not
  less: the facts row has a column that says "To be confirmed" in 24px type.
- **The homepage is unchanged apart from one link.** The nine-module stack and its competition for
  attention are still there. This change adds a place for the long read; it does not fix the front
  page, and whether that needs fixing is still open.
- **A feature page repeats the listing.** The argument, the facts and the photographs all appear on
  the listing page too, in a different arrangement. That is the nature of a feature, but it means
  two places to keep true if GrandBlue's material changes — both read from the same record, so they
  cannot disagree, but both will change together.
