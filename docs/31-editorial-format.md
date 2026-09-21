# The editorial format

21 September 2026. Not from the list in docs/23. Clent's reading of the site was that the current
front page is "not too catchy": the format, not the name. This is one alternative format, built as
a real page at `/editorial` and served beside the existing homepage rather than replacing it, so
the two can be judged on the live site instead of from a description.

Nothing on `/` changes. Every rule added here is prefixed `.ed-`, and the route is additive.

## What the format does differently

The current homepage is a stack of modules — hero, headline listing, values, destinations,
recently viewed, available homes, how it works, commercial, account. Each is well made and each
competes with the one above it. GrandBlue appears in the second module, which is as high as it can
go without the hero itself choosing between the residential and commercial framings (docs/26).

The editorial format inverts that. It opens on GrandBlue at full screen height, with the property's
own name as the page's `h1`, and then reads downwards as one continuous piece: the argument for the
property, its key facts, a sequence of its photographs at different widths, and only then the rest
of the catalogue as alternating rows. There is one narrative, not nine modules.

That is how it makes GrandBlue "the unmistakable centrepiece" in the words of docs/23 without
answering the positioning question. The hero is a named property rather than a market claim, so it
never has to say whether Porli is a residential or a commercial marketplace. It says what is for
sale.

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
   media. This is the part the current homepage has no room for: GrandBlue has six photographs and
   the homepage shows one.
5. **Also with Porli.** The remaining five listings as full-width alternating rows rather than a
   three-column grid, each keeping its "Fictional listing · Generated image" line.
6. **A closing enquiry**, naming the property.

## Honest labelling is unchanged

The price line renders through the same `price()` helper as every card, so GrandBlue reads "Price
to be confirmed" and cannot read anything else. No room count, area or price is invented anywhere
on the page: the facts row prints the listing's own detail pairs and stops at four. Every
fictional listing carries its label. Every photograph keeps the alt text set by the imagery pass in
docs/27, which states whether it was supplied or generated.

## Motion

The opener's photograph runs the existing `kenburns` drift — transform only, 26 seconds, and
switched off twice over under reduced motion, once by the global rule in `styles.css` and once by
an explicit rule here. Sections use the site's existing `[data-reveal]` observer. Photographs lift
1.5% on hover behind a `hover: hover` query, so it never fires on touch. No new keyframes, no
JavaScript animation, nothing that moves anything other than transform and opacity.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. The route is presentation over the
  existing `/api/properties` response, so no endpoint or fixture changed.
- `/editorial` and `/` both walked at 1440px and 390px with reduced motion on and off: no
  horizontal overflow, no console errors, no failed requests, no broken images, no unnamed
  controls, no image without alt text, and nothing left below full opacity after scrolling.
- Left edges measured rather than eyeballed: wordmark, opener copy, plates and rows all resolve to
  83px at 1440px.
- The photo aspect ratios were wrong on the first pass and looked right in a thumbnail. The
  `width` and `height` attributes on each image are presentational hints that beat `aspect-ratio`
  unless `height: auto` is set, so a row image rendered 1,032px tall instead of 411. Found by
  measuring the rendered row, not by looking at it.

## Limitations

- **It is a second front page, not a replacement.** Nothing links to `/editorial` from the
  navigation; it is reached by typing the address. That is deliberate for a comparison, and it
  means the decision to adopt or drop it is still open.
- **The format leans on one listing having depth.** GrandBlue has six photographs and a written
  argument. A listing without them would open on a thin page, so this format is only as good as the
  lead listing's content — which is itself an argument for getting the remaining GrandBlue material.
- **Still blocked on the same facts.** Price, room count, land and floor area, sale terms and the
  written photograph permission are unresolved, and the format makes their absence more visible,
  not less: the facts row has a column that says "To be confirmed" in 24px type.
- **The positioning question is dodged, not answered.** Leading with a named property means the
  page never states what kind of marketplace Porli is. That is an advantage while the question is
  open and a weakness once it is settled.
