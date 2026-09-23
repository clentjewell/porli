# Aerial view and site plan; imagery sourced without Higgsfield

23 September 2026, after docs/60. Clent asked for two things: source other images without using
Higgsfield, and give each land listing a space for an aerial or site image, executed the way the
floor plans are on the reference listing page he sent (a Homelengo template: a "Floor plans"
heading, one collapsible row per plan with a label on the left and the plan's facts on the right,
the image beneath when the row opens, one row open at a time).

## The section

Every land listing now has **Aerial view and site plan** after its features: two rows, "Aerial
view" and "Site plan", each with the parcel's land size and frontage on the right and the image
beneath when open. A row with no image is an honest empty slot ("No aerial view has been supplied
for this property yet.") with a **Request it** button that opens the enquiry with the request
written, exactly as the documents list does. Native `details` elements with a shared `name` open
one at a time in browsers that support it; the first row with an image opens by default. Keyboard
and screen readers get the same rows; the facts drop on phones.

Data: one new column, `plans`, holding up to four `{kind, url, alt, caption}` entries where kind is
`aerial` or `site_plan`; validated like photographs (an uploaded or bundled image, alt text) and
rebuilt from known keys. The editor gains an **Aerial view and site plan** block with one slot per
kind: upload, alt text, caption, remove. The documents list no longer expects a site plan for
land, since the plan has its own place.

The eight illustrative site plans drawn in code (docs/59) come back as `public/assets/plan-*.webp`
in the site-plan slot of each fictional land listing, marked "not a survey" on the sheet, in the
alt text and in the caption. They are never a cover.

## Imagery without Higgsfield

The search: Wikimedia Commons by category, 25 categories, 753 candidates at 1600 × 1000 or
larger, landscape, CC0, CC BY or CC BY-SA, reviewed on contact sheets. Openverse was tried as a
route to Flickr but serves only 1024px copies; Unsplash and Pexels refuse unauthenticated
requests. The Commons "vacant lots" category is derelict urban land and unusable; Australian
paddocks, farms and the state aerial collections carried the set.

Twelve photographs were taken, eight covers and four aerials:

| File (`public/assets/`) | Commons file | Photographer, year | Licence |
|---|---|---|---|
| land-harbour-road.webp | Tremayne Road Mundoolun.jpg | Shiftchange, 2014 | CC0 |
| land-mill-street.webp | Paddocks along Chingree Creek Road Lamington.jpg | Shiftchange, 2014 | CC0 |
| land-fernwick-lot-12.webp | Cobalt Street Carole Park.jpg | Shiftchange, 2014 | CC0 |
| land-elmshore-gateway.webp | Aerial panorama of Williams Landing.jpg | Bob T, 2017 | CC BY-SA 4.0 |
| land-cedar-ridge.webp | Field near Holbrook, NSW in summer.jpg | Thennicke, 2016 | CC BY-SA 4.0 |
| land-saltmere-valley.webp | Paddocks at Hillview.jpg | Shiftchange, 2014 | CC0 |
| land-orchard-lane.webp | A view from the heavens (29872415050).jpg | Lenny K Photography from S, n.d. | CC BY 2.0 |
| land-elmshore-heights.webp | View of Valley Lake Estate looking east, Keilor East | Philip Mallis, n.d. | CC BY-SA 2.0 |
| aerial-cedar-ridge.webp | CSIRO ScienceImage 11557 Farmland on the Murrumbidge | Nick Pitsas, CSIRO, 2011 | CC BY 3.0 |
| aerial-saltmere-valley.webp | Barellan, N.S.W..jpg | Bauple58, 2014 | CC BY-SA 4.0 |
| aerial-orchard-lane.webp | Burrawang Aerial.jpg | Graeme Bartlett, 2008 | CC BY 3.0 |
| aerial-elmshore-heights.webp | Subdivision development.jpg | Wikideas1, 2025 | CC0 |

Each is a **real place elsewhere, never the fictional parcel**, and the site says so at every
point: the card reads "Fictional listing · Licensed photograph"; the listing page says "Openly
licensed photograph of a real place elsewhere, used to illustrate a fictional listing" and prints
the credit; the credit travels in the image caption and the aerial's caption; the alt text names
the real place and ends "Openly licensed photograph.", a third kind beside "Generated concept
image." and "Photograph supplied by the property.", which the server now leaves alone rather than
suffixing. The description ends "illustrated with openly licensed photographs of real places
elsewhere." The homepage uses only the CC0 pictures (Saltmere card, service slot, explore panel)
so no attribution is owed there; every file is in `design/asset-register.json` with photographer,
source page, licence and licence address, `fictional: false`. Two share-alike photographs keep
their licence on any edited version. The Gateway lot is cropped from a wide aerial panorama to the
graded lot beside the boulevard.

Three aerial slots (Harbour Road, Mill Street, Fernwick Lot 12) are left empty on purpose: no
honest match was found, and the empty state is then real.

The six Higgsfield studies of docs/60 are removed from the site and the register.

## Migrations

Two, both guarded and idempotent, inside the seed block so the fixture data is in scope:

- an untouched land row with an empty `plans` column receives its site plan and aerial;
- an untouched land row still carrying a generated study (alt text "generated concept study")
  receives the sourced cover, its plans and the new description sentence. An edited row
  (`version` above 1) is never touched. Both proven on databases seeded in the previous states.

## Verified

- 33 API tests pass: the new slots validate (kind, image, alt), round-trip and clear; every
  fictional land listing ships a site plan and the set has aerials; alt text names exactly one of
  the three kinds; the legacy migrations still hold.
- Local screenshots at 1440px and 390px: the section on a listing with an aerial and on one
  without, the editor slots, the land search with the new covers and labels; 20px phone gutters,
  no overflow, no console errors.
- The route walk over 39 routes at both widths.

## Limitations

- **Real places stand in for fictional parcels.** Honest at every point, but a stronger concept
  still wants the vendor's own aerials when a real land listing exists; the shot list says so.
- **Three aerial slots are empty** by design.
- **Bedrooms, bathrooms and car spaces** still show in the editor for land (docs/59).
