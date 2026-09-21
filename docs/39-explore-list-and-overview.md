# The explore list, and the listing page overview

21 September 2026. Three instructions from Clent: remove the remaining hairlines on the feature
page, rebuild its "Also with" section in the layout of a category list he sent, and take the way
the reference listing page presents a property's information — while leaving the enquiry card
alone.

## Lines removed from the feature page

Eight bare hairlines were measured on the live page: one under the section heading, six between the
property rows, and one above the key facts, plus the vertical dividers inside the facts row.

The six row rules disappeared with the rebuild below. The rest are deleted.

The jump bar's own rule was kept at first, on the grounds that the edge of a bar floating over
content is doing a job. Clent pointed at it again, and he is right: at rest the bar sits on the
same paper as everything else, so the rule reads as a stray line across the page rather than as an
edge. It is now a soft shadow, which shows as nothing at rest and gives the bar depth once content
scrolls beneath it. **No full-width rule is left on the page.**

The key facts now separate by spacing rather than by a grid of rules.

## Also with RealDistrict became an explore list

The section was five alternating image-and-text rows, each a screen tall. It is now a list of the
five properties beside one large photograph: pointing at a row, or tabbing to it, lifts that row
onto a white card and brings its photograph forward.

**Every row is a link first.** The photograph swap is an enhancement on top: with the script
absent, or on a touch screen where there is no pointer, the list still reads and every row still
opens its property — the photograph simply stays on the first. Tapping a row goes to the listing
rather than changing the picture, which is what someone on a phone wants from a list of properties.

Each row carries the property's name, its price and, where the listing is fictional, that label.
The fictional marker is in the row itself rather than on the photograph, because only one
photograph is shown at a time and four of the five rows would otherwise be unlabelled.

The active card is white with an edge and a deeper shadow, on a tinted panel. White alone did not
read as lifted against a page that is already almost white.

The dead `.ed-row` rules were deleted rather than left in place — eighteen of them. Leaving a
superseded rule behind is exactly how the step-card padding bug in docs/37 happened, twice over.

## The listing page overview

From the reference: the measurable facts as a grid of tiles with an icon, a label and a value,
before the details table, rather than only inside it.

Each tile is built from a field the listing actually carries, so a listing without areas or a
tenancy shows fewer tiles and never a blank one. GrandBlue shows three — type, sale method and when
it was listed — because its areas and room counts are the facts still to be confirmed. Millrace
Warehouse shows seven. The grid uses `auto-fit` rather than a fixed four columns, after a first
pass left a grey cell where a fourth tile would have been.

Features are now ticked and set in three columns, as the reference sets out its amenities. The em
dash that `styles.css` prints before each feature is switched off here, having printed beside the
tick on the first pass.

**The enquiry card is untouched**, at Clent's instruction. It was checked on every listing after
each change rather than assumed.

## What was not taken from the reference

Its loan calculator, guest reviews, comment form, "Why choose us", agent contact card and "Latest
properties" sidebar. The calculator would invent a rate; the reviews and comments have nobody to
quote; the agent card names a person who does not exist. The same pattern as every other reference
this week: the parts that carry information transfer, the parts that manufacture credibility do not.

Its floor-plan accordion and file attachments were not taken either, for a different reason —
RealDistrict already has a documents section that names the expected documents and offers an
enquiry where one is missing, which is better behaviour than a chip that is simply absent.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The explore list measured in three states at 1440px: first row active by default, hovering the
  third moves the card and the photograph to the third, focusing the fifth moves both to the fifth.
  All five rows carry a correct link.
- Borders re-read from the rendered feature page: **no full-width rules left**. The sixteen that
  remain are list-row separators and button edges.
- The jump bar re-tested after losing its rule: each link still sets the hash, scrolls, and
  leaves the target heading clear of the bar, at both widths.
- Overview tiles read from three listings — a hotel, a house and a warehouse — at both widths, and
  the enquiry card confirmed present on each.
- Tap targets on the explore rows: 79px at desktop, 94px and above on a phone, against the 40px
  floor in docs/23.
- 28 routes walked at 1440px and 390px. Reduced motion on and off.
- Cache-busting versions bumped together to 26.

## Limitations

- **On a touch screen the explore photograph never changes.** There is no pointer to follow and a
  tap belongs to the link. The first property's photograph is what a phone visitor sees, with the
  list beneath it.
- **The overview repeats the facts line at the top of the page** for a residential listing, which
  shows bedrooms, bathrooms and car spaces in both places. The reference does the same, and the top
  line is a glance while the tiles are the full set, but it is duplication.
- **GrandBlue's overview is three tiles.** That is honest — the missing tiles are the facts nobody
  has supplied — but it reads thin beside a warehouse showing seven.
