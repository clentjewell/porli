# The photo library, in the reference format

22 September 2026, after docs/57. Clent looked at the sourced Thai set and said the images were
not right, and pointed at two things: the site's own listing cards, and how the photo library in
the Ultimate Labs brand document is formatted. Section 07 of the brand identity document is
rebuilt to that format from the images that actually ship with the site. The twelve Wikimedia
Commons photographs from docs/57 are withdrawn: removed from the document, the brand site and the
register.

## The format

From the reference: a **confirmed library** of the images that ship, each on a card with its
picture, a title on the left, its kind on the right and its file path beneath; then a **shot list
to commission**, the gaps in the current library in the same direction, each a card with a title
and where it would be used. The reference's kinds are "In-house" and "stock"; RealDistrict's are
the two it has, **Generated** and **Supplied** (by the property), because those are the two labels
the site itself uses.

## Confirmed library

Fourteen images, all in `public/assets/` and all already in `design/asset-register.json`:

| Title | Kind | File | Used on |
|---|---|---|---|
| Courtyard House | Generated | courtyard.webp | Homepage feature, Saltmere card, Courtyard House cover |
| The veranda | Generated | courtyard-veranda.webp | Courtyard House gallery |
| Doorway detail | Generated | courtyard-detail.webp | Courtyard House gallery |
| Garden Apartment | Generated | apartment.webp | Garden Apartment, Lightwell Studio, Balcony Apartment; services band |
| The Brick Townhouse | Generated | townhouse.webp | The Brick Townhouse, Courtyard Terrace |
| Veranda House | Generated | veranda.webp | Veranda House, Garden Cottage |
| Highstreet Offices | Generated | highstreet-offices.webp | Highstreet Offices |
| Millrace Warehouse | Generated | millrace-warehouse.webp | Millrace Warehouse |
| GrandBlue from the air | Supplied | grand-blue-aerial.webp | GrandBlue cover |
| GrandBlue, the pool | Supplied | grand-blue-pool.webp | GrandBlue gallery |
| Mae Phim Beach | Supplied | grand-blue-beach.webp | GrandBlue gallery |
| A guest room | Supplied | grand-blue-room.webp | GrandBlue gallery |
| Sunset over the beach | Supplied | grand-blue-sunset.webp | GrandBlue gallery |
| Evening by the pool | Supplied | grand-blue-evening.webp | GrandBlue gallery |

The brand site cannot load from the marketplace's host (no request leaves it), so it serves
copies from `brand/public/img/library/`, 2.2 MB. Each copy has a register entry that points back
to the site image it copies; provenance stays on the original entry. The three How it works
screenshots are not in the library: they are pictures of the site, not pictures on it.

## Shot list to commission

Eight briefs, from the own-photography brief in docs/23 section 6 and the gaps the library
shows: GrandBlue from the beach, the pool edge, interiors in natural light, timber, textiles and
signage, Mae Phim and Rayong, commercial frontage, a residential street, and the team at work.
Each card carries the mark on a pale panel marked "To be developed" rather than a stand-in
picture: nothing has been commissioned, Higgsfield holds under one credit, and a stock picture on
a brief would be the reference's weakest habit (docs/56 review). Marked to be confirmed.

## Withdrawn

The twelve openly licensed photographs (docs/57) are out: files deleted from
`brand/public/img/library/`, entries removed from the register, the register's Commons clause
dropped. docs/57 stands as the record of the search; the Commons pages it lists remain available
if a destination image is wanted later.

## Verified

- Brand document at 1440px and 390px: fourteen library cards and eight shot cards, all images
  loaded with alt text ending in the kind, four columns then one, 20px phone gutters, no
  horizontal overflow, no request to another host.
- PDF re-rendered with the library in it.
- The marketplace is untouched.

## Limitations

- **Two copies of fourteen images.** The brand site's copies go stale if a site image is
  replaced; the register entries say which original each mirrors.
- **The shot list has no pictures.** By design, until something is commissioned.
