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
- **Two listings still wait** for their pictures: Fernwick Estate Lot 12 and Harbour Road
  Development Site.
