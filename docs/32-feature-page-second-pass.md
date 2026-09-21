# Feature page, second pass: jump bar, named photographs, label plates

21 September 2026. Three additions to the GrandBlue feature page built in docs/31, taken as
structure from a single-development landing page Clent sent. None of its look, palette or type was
taken; it is a licensed template and, like the reference portal in docs/25, only its arrangement is
of any use here.

## Why that reference and not the other one

Two templates were reviewed. The first was a marketplace homepage built as a stack of ten modules,
which is the shape Porli's homepage already has, with the property grid repeated twice. Nothing in
it addressed the complaint that prompted docs/31.

The second is a one-page site for a single building: opener, the argument, alternating image and
text rows, gallery, a pricing table, contact. That is the same shape as the feature page, so its
ideas transfer directly. Three did.

## A jump bar

The feature page is about 7,000px. It now carries a bar of in-page links beneath the header — The
property, Key facts, Photographs, Also with Porli, Enquire — sticky, so it stays reachable the whole
way down.

Three things this needed rather than assumed:

- **It is a direct child of `.ed`.** A sticky element is bound by its containing block, which is the
  lesson docs/25 recorded when the search filter bar scrolled away with its parent.
- **The targets carry `scroll-margin-top`** of the header height plus the bar's own height, so a
  heading jumped to clears both instead of hiding under them. Verified by measuring the section top
  against the bar's bottom edge after a jump, at both widths.
- **It is opaque.** It was translucent with a backdrop blur first, matching the header, and the key
  facts row ghosted through it as it passed underneath. That read as a rendering fault rather than
  a material.

Hash links already worked: the router handles them, pushes the hash and scrolls, and uses an
instant scroll under reduced motion. Nothing new was needed for that.

Only sections that exist are listed. A listing without a `why` text or without enough photographs
gets a shorter bar rather than a link to nothing.

## Named photographs

The plate sequence showed six photographs with nothing visible saying what they were. The
alternative text said, but that is written to be read aloud, not to be read beside the image.

Photographs now carry an optional short `caption`, shown beneath the plate. Three decisions worth
recording:

- **Nothing is derived from the alternative text.** Slicing a caption out of an alt string was
  tried on paper and produced "The main pool" from a sentence that also mentioned the sun loungers
  and the hotel, and a caption for a guest room that repeated the property's full name. A caption
  is its own field.
- **The captions describe what the photograph shows**, from the same source as the alt text — the
  property's own photographs. They make no claim about price, size, room count or terms, so none of
  them touches the facts that are still to be confirmed.
- **Staff can edit them.** The media editor has a caption input beside the alternative text on every
  image row, capped at 60 characters, and the server rebuilds each media entry from known keys only
  so an unexpected field cannot be stored and a caption cannot outgrow its plate.

They are applied by an idempotent migration keyed by image, run on every start like the alt-text
pass in docs/27, so the live database is corrected as well as a fresh one. A caption already
present is never overwritten.

## Label plates on the rows

Each listing in "Also with Porli" now carries its type and locality on a small plate overlapping
the top corner of its photograph, on the side away from the copy, mirrored on the alternating rows.
It replaces the eyebrow that sat above the heading, so nothing was added to the page — a line moved
and gained a shape.

The plate overhangs the content column by 14px at desktop width, deliberately, which is the device
the reference uses. Measured on both sides to confirm it is symmetrical (69px on the left, the same
distance past the right edge on a flipped row) and that it never causes horizontal overflow at any
width.

It repeats words that are already on the page, so it is hidden from assistive technology and the
same type and locality are carried in a visually hidden line in the copy column. The photograph is
clipped in its own box inside the figure, so the hover lift cannot spill past the rounded corner
now that the figure has to let the caption and plate sit outside it.

## What was deliberately not taken

- **The build-stage tracker** — Planning, Building, Finishing works, Project done. GrandBlue is a
  trading hotel, which is the first thing docs/24 has it say about itself. A construction progress
  bar would assert the opposite and would be false.
- **The statistics band** — projects delivered, satisfied clients, prizes won. Porli has sold
  nothing. Same reason the proof strip in docs/26 is not built.
- **The testimonial** — nobody to quote.
- **The hero email capture** — there is no mailing list, and the instruction in AGENTS.md is not to
  fabricate emails.
- **The partner logo strip** — no partners.

## Held for when the facts arrive

The reference's strongest idea is a comparison table: a specification column on the left and a
column per apartment type, with area, balcony, parking and how many remain. GrandBlue has De Luxe
rooms, two-bedroom family rooms and a penthouse suite, so the equivalent would be the most useful
thing on the page.

It is not built, because every number in it would have to be invented. Room counts, areas and terms
are on the list of facts still to be confirmed with the property. This is the fourth item on that
list and the one that would pay back most.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls, no image without alt text.
- Reduced motion on and off at both widths: nothing left below full opacity once the reveal
  transitions settle, and no element still animating under reduced motion. An earlier reading of
  "one element hidden" was a sample taken mid-transition, not a stuck reveal; re-measured after a
  settled scroll.
- Keyboard: the jump bar is reachable by Tab, keeps a visible 3px focus ring, and activates on
  Enter, setting the hash and scrolling. Every link is a 52px target, above the 40px floor in
  docs/23.
- The captions were confirmed served by the API, rendered on the page and present and editable in
  the staff editor.
- Cache-busting versions bumped together to 16.

## Limitations

- **Only GrandBlue has captions.** The migration is keyed to its six images. Any other listing shows
  the plates without captions, which is the correct fallback but means the feature is currently one
  property deep — as is the feature page itself.
- **The jump bar takes 52px of a phone screen** on top of the header. It is the price of making a
  7,000px page navigable, but it is furniture, and docs/28 spent a pass removing furniture from
  phones.
- **The label plate repeats the copy column's own words.** Hiding it from assistive technology keeps
  that from being read twice, but a sighted reader still sees the same type and locality in two
  places when a row is narrow enough for the plate to sit above the heading.
