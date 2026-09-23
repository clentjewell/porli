# Land images: generated studies replace the site plans

**Superseded the same day (docs/61).** Clent asked for imagery sourced without Higgsfield; the six
studies below were replaced by openly licensed photographs and the site plans returned in a slot
of their own.

23 September 2026, after docs/59. Clent saw the land cards with their illustrative site plans and
asked for "the perfect image like before": photographs in the manner of the other listings, not
drawings. This record replaces the imagery section of docs/59.

## What was possible

Higgsfield held 0.98 credits. The model the concept used before (GPT Image 2.5) costs one credit
an image, so a set was out of reach until the catalogue was checked: **Soul Location**, the
environment and landscape model, is quoted at 0.12 credits an image. One test image (the rural
land) confirmed the charge, then seven more were generated in one batch. The balance is now
0.02 credits.

## The set

Eight generations, six kept. Two were discarded: the Harbour Road site came back as a two-storey
building behind a row of pegs, and the Saltmere Valley acreage as a lawn with a hedge sculpture.
Rather than accept them, the two development sites share the Mill Street image and the two rural
listings share the Cedar Ridge image, as the fictional homes shared their images.

| File (`public/assets/`) | Listings | Scene |
|---|---|---|
| land-mill-street.webp | Harbour Road Development Site, Mill Street Corner; the Saltmere destination card | A cleared corner block between a painted brick wall and a low timber fence, cropped to keep generated shop signage out of frame |
| land-fernwick-lot-12.webp | Fernwick Estate, Lot 12 | A benched crushed-rock lot on a new estate road, tilt-panel warehouses behind |
| land-elmshore-gateway.webp | Elmshore Gateway, Lot 3 | A long grassed lot beside a boulevard, highway embankment beyond |
| land-cedar-ridge.webp | Cedar Ridge, Saltmere Valley Acreage; the explore-panel image | Undulating fenced paddocks, a dam and gums in late light |
| land-orchard-lane.webp | Orchard Lane Subdivision; the homepage service slot | A graded parcel with surveyed pegs, orchard trees and the town behind |
| land-elmshore-heights.webp | Elmshore Heights, Stage 2 | Contoured bare earth beside the completed first stage |

All at 1536 × 1032 WebP quality 82 from 2016 × 1344 originals, each registered in
`design/asset-register.json` with model, generation id, prompt and date, `fictional: true`. The
prompts follow the concept's art direction: natural light, restrained colour, realistic scale,
no people, no text, no CGI sheen. Every alt text reads "<title>: fictional land, generated concept
study" and the server appends "Generated concept image." as for every fictional image.

## What changed with them

- The land fixtures point at the new files and their descriptions end "This is a fictional listing
  with generated concept imagery."
- **A one-off migration** rewrites any land row that still carries a site-plan image or alt text
  (the live host had them for a few hours): media and description are replaced, guarded by the
  old alt text so it runs once per row and never touches a later edit. Proven on a database seeded
  with the old rows.
- The card line returns to "Fictional listing · Generated image"; the listing note reads
  "Generated concept study. This parcel, its location and price are fictional."; the gallery
  crops as it does for every other listing (the whole-sheet rule for plans is gone).
- The two site-plan files that no longer back a listing are deleted; the six remaining plan files
  are overwritten by the photographs under the same names, so no address changes.
- The brand document loses its "Illustrative site plans" note, its card and search screenshots
  are retaken, and the register entries for the plans are replaced.

## Verified

- 32 API tests pass.
- The migration check: rows seeded with plan images and alt text come back with the new image,
  alt and description on the next start; an untouched row is unchanged.
- Local screenshots of the land search and a land listing at 1440px show the photographs in the
  cards and the gallery with the fictional label under each.

## Limitations

- **Two images are shared** between the pairs of development sites and rural listings.
- **Higgsfield is at 0.02 credits.** Any further image needs a top-up.
- **Aerial photography** of a real parcel is still the shot to commission for a real listing.
