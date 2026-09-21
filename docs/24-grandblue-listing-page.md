# The GrandBlue listing page

21 September 2026. First change of the handover in docs/23. The listing page at
`/properties/grand-blue-hotel-thailand` is the page the concept has to win on: GrandBlue is the
only property that can actually be sold, so this is where the site either reads as a credible
shopfront or does not. This document records what changed, what it deliberately does not claim,
and what is still blocked on the property.

## What changed

**Key facts under the title.** The facts strip (beach, airport, Bangkok) moved out of the body
copy and sits directly beneath the title and locality, as the reference portal does. A buyer sees
where the property is before scrolling.

**"Why GrandBlue".** A new section above the description, in its own pale block, giving the case
for the property in three short paragraphs: what it is and where, what it already trades as, and
an explicit statement that price, room count, area and sale terms are to be confirmed. Every
claim is drawn from the property's own published information at grandbluethailand.com, which is
also what the description was built from (docs/18). The section closes with "Drawn from the
property's own published information." so the reader knows the provenance without being told to
trust us. The heading uses the first word of the listing title, so the section reads "Why
GrandBlue" rather than a generic label.

**Grouped property features.** The flat eleven-item list became three groups — Outdoor, Indoor
and Sustainability — matching the reference portal's outdoor/indoor/other grouping. A test asserts
that the grouped features are exactly the flat feature list, so a group can never quietly drop or
invent a feature. Listings without groups still render the flat list.

**Documents.** A new section listing the documents a commercial buyer expects: a floor plan and an
information memorandum. Neither has been supplied, so each shows as an unfilled slot with a
working "Request it" button that opens the enquiry composer pre-filled with that request. There is
no dead download link and no fabricated file: an unfilled slot says what is missing and offers the
conversation that would obtain it. Residential listings show the floor plan slot only.

**Inspection times.** The viewing section now lists the actual times staff have opened, rather
than only offering a request button. The times were already in the database and already returned
by the listing endpoint; the page simply never showed them.

**Similar properties.** The strip previously fell back to any three listings whenever fewer than
three shared the sector, which put the one real commercial asset beside three fictional houses. It
now shows same-sector listings however few there are, headed "Similar properties", and only falls
back to "Explore other properties" when the sector has no other listings at all.

**One price, stated once.** "Price to be confirmed" appeared three times on the page — as a
highlight chip, as the price line and as a row in the details table. The price line keeps it; the
duplicate chip and the duplicate details row are filtered out when they only repeat the price
label. Genuine unknowns that are not the price ("Rooms", "Land and floor area") still show as
"to be confirmed", because they are.

## Data model additions

Three columns were added to `properties`, applied idempotently at startup in the same way as the
six in docs/18, so existing databases (local SQLite and the Cloudflare Durable Object) migrate on
their next start.

| Column | Purpose |
|---|---|
| `why` | The "Why this property" paragraphs. Up to 2,000 characters. |
| `feature_groups` | JSON pairs of a group name and its features. Empty means render the flat `features` list. |
| `documents` | JSON pairs of a label and a URL. Only an uploaded PDF (`/uploads/*.pdf`) or an `https:` link is accepted. |

GrandBlue's `why` text and feature groups are defined once in `lib/porli.mjs` and used by both the
seed (a fresh database) and a backfill migration guarded by `why=''` (an existing database), so
the two paths cannot drift. The guard also means a staff member's later edit is never overwritten.
All three fields are editable in the admin listing editor.

## Verification

- `npm run check` and `npm test` pass; 24 tests, up from 22. The two new tests cover the sourced
  "Why" text (including an assertion that it never states a price), the group/flat feature
  equivalence, and round-trip plus rejection for all three fields — a malformed group, a group
  whose features are not a list, a `javascript:` document URL and a path-traversal upload path.
- Headless Chromium at 1440px and 390px: no console errors, no failed requests, no horizontal
  overflow on any route.
- Keyboard pass: every new control is reachable by Tab and keeps a visible 3px focus ring; the
  document-slot buttons are real buttons, not styled text.
- Reduced-motion pass: nothing that starts hidden stays hidden, and no element is left animating.

A note for whoever runs the harness next: property card images use `loading="lazy"`, so a
full-page screenshot taken without scrolling first shows several cards with blank images. That is
a capture artefact, like the duplicated sticky header recorded in docs/22, not a rendering defect.
The harness scrolls the page before capturing.

## Limitations and what is still blocked

- **The document slots cannot be filled yet.** The upload endpoint accepts images only, so a
  supplied floor plan or information memorandum has to be an external `https:` link until PDF
  upload exists. docs/21 lists document downloads as a Sprint 2 item.
- **The description and "Why GrandBlue" overlap.** Both were drawn from the same source and now
  sit on the same page. The description should be shortened to the property's own voice once the
  confirmed facts arrive and the section can be rewritten around them.
- **Still to be confirmed with the property** (unchanged from docs/18 and docs/21, plan 04):
  price or price guide, room count, land and floor area, sale terms, and written permission for
  the photographs. Until those arrive the page states the unknowns rather than filling them, which
  is the honest-labelling guardrail working as intended, but it is also why the page cannot yet be
  sold from.
- **The exact street address** is still shown in the details table because the property publishes
  it. docs/18 flagged this for the client to decide; it remains open.

No images were added or changed, so `design/asset-register.json` is unchanged.
