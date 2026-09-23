# Orchard Lane: a picture supplied by Clent

23 September 2026, after docs/61. Clent sent an aerial photograph of a built-out housing estate
for Orchard Lane Subdivision. He also sent pictures for Saltmere Valley Acreage, Cedar Ridge,
Fernwick Estate Lot 12 (two) and Harbour Road Development Site, but those arrived while work was
running and never reached the session's disk. They are not on the site, and he has been asked to
send them again.

## What changed

- **Orchard Lane Subdivision** uses the picture twice. The cover is a 3:2 crop and the aerial
  slot holds the whole portrait frame. The Commons photographs it replaces (docs/61) are gone.
- **A fourth kind of image.** A photograph Clent supplied, of a real place elsewhere, with no
  recorded source or licence. Its alt text ends "Reference photograph supplied by the team." and
  the server leaves that ending alone. The card reads "Fictional listing · Reference photograph".
  The listing page says "Reference photograph of a real place elsewhere, supplied by the team,
  used to illustrate a fictional listing". The caption credits the team.
- **Register.** Both files are in `design/asset-register.json` with `fictional: false`. The
  source is marked not recorded and the rights are marked not established, for Clent to confirm.
- **One sync migration replaces the two in docs/61.** Every fictional land row that no staff
  member has saved (version 1) follows the fixture's current pictures, plans and description.
  An edited row is never touched. It is proven stable across restarts, so the next pictures Clent
  sends need only a fixture change.
- **The aerial slot fits portrait images.** Images are capped at 720px tall and centred, and fill
  the width on phones. A default 40px figure margin that had narrowed every plan image is removed.

## Saltmere Valley Acreage

Later the same day Clent re-sent the Saltmere Valley picture: an aerial of green paddocks with a
red boundary drawn around one parcel. It works the same way as Orchard Lane. It is the cover and
the aerial slot (`land-saltmere-valley-supplied.webp`, `aerial-saltmere-valley-supplied.webp`,
735 × 489, already 3:2). It is labelled a reference photograph supplied by the team, and its
rights are to be confirmed. The Commons aerial it replaces is removed. The Commons cover stays
only as the homepage service photograph. The drawn boundary marks a real parcel elsewhere, and
the listing page says so.

## Cedar Ridge

Clent then sent a picture for Cedar Ridge: a ground-level photograph of large houses along a
lake. It is not an aerial, so it became the cover only (`land-cedar-ridge-supplied.webp`), and
the openly licensed Murrumbidgee aerial stays in the aerial slot. A listing-site watermark in
the bottom-right corner was cropped out, leaving 684 × 456. The photograph shows a built
suburban estate, not the 42 hectares of grazing land the listing describes. This was flagged to
Clent, and the choice is his. The Commons cover it replaces is removed.

Clent then sent an overhead photograph of a suburban street for the Cedar Ridge aerial slot. It
is used whole, 735 × 893, as `aerial-cedar-ridge-supplied.webp`. The Murrumbidgee aerial is
removed, so both Cedar Ridge pictures are now reference photographs supplied by the team.

## Fernwick Estate, Lot 12

Clent sent an elevated view of a business park beside a divided road for Fernwick Lot 12. It looks
computer-generated, with uniform trees, repeated green-roofed buildings and an unreal horizon, so
it is not labelled as a photograph. It gets the site's existing generated kind: alt text ending
"Generated concept image.", the card line "Fictional listing · Generated image", and the
caption "Illustrative render supplied by the RealDistrict team". It is both the cover (a 3:2
crop) and the aerial slot (the whole frame), under new file names. The register records it as
`fictional: true`, supplied by Clent, source not recorded. The Commons cover it replaces is
removed.

## Harbour Road Development Site

Finally Clent re-sent the Harbour Road picture: a portrait aerial of green land on the edge of a
town, with a yellow boundary drawn around it and an "Illustrative Only" watermark along the
bottom edge. The watermark was trimmed off. The cover is a 3:2 crop around the outlined land and
the aerial slot holds the rest of the frame, both under new file names and both labelled as
reference photographs supplied by the team. The Commons photograph it replaces stays in use as
the homepage's Saltmere destination card. This completes the set: all eight land listings now
have a cover, and six have an aerial.

## The Saltmere destination card

Clent offered four pictures for the homepage's Saltmere card and asked which fitted best. The card
says "Coastal sites and acreage", so the coastal estate aerial was chosen: an ocean beach,
lagoons and open green land. It is cropped to the card's portrait shape from the upper right of
the frame, which leaves out the mansion, the drawn boundary lines and the "B" watermark.

The others were set aside for these reasons. The canola field is inland and repeats the Saltmere
Valley picture's red boundary. The dense coastal subdivision is all pools and large houses, which
the art direction avoids. The map-pinned farmland looks generated.

The file is `dest-saltmere-supplied.webp`. Its alt text says it is a reference photograph of a
real place elsewhere standing in for fictional Saltmere, and the line under the cards already
says Saltmere is fictional. The Commons photograph it replaces is no longer used anywhere and is
removed.

## Cache

The first deploy reused the old file names, and images are cached for an hour, so browsers
kept showing the Commons picture. The files are now `land-orchard-lane-supplied.webp` and
`aerial-orchard-lane-supplied.webp`, and the sync migration moves the live row to them. A
replaced image always gets a new file name.

## Limitations

- **Resolution.** The supplied file is 577 × 867, so the cover is stored at 577px wide. It is
  sharp on cards and soft in the full-width gallery. A larger original would fix it.
- **Rights are unknown.** The file carries no source. Before a public launch it needs the same
  confirmation as GrandBlue's photographs (B-04).
- **Drawn boundaries.** The Saltmere Valley and Harbour Road pictures have boundaries drawn
  around real parcels. The listing pages say they show real places elsewhere, but versions
  without the outlines would be clearer.
