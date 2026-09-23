# Land replaces Residential

23 September 2026, after docs/58. Clent's feedback: remove Residential and use Land instead. The
Land section should be a simple, clean way to browse land opportunities across development sites,
commercial and industrial land, rural land, and subdivision or investment land; each listing
shows an aerial or site image, location, price or sale method, land size, zoning and a View
property call to action; filters stay simple (location, land type, price, land size); the design
stays professional, investment-focused and consistent with the site. This record is what changed.

## The model

- **Two sectors: `land` and `commercial`.** `residential` is retired. It remains a valid value only
  for a listing that already carries it, so a retired listing can still be edited in the
  workspace; a new listing cannot be residential. Land types (stored in `property_type`):
  `development_site`, `commercial_industrial`, `rural`, `subdivision_investment`. The commercial
  categories lose "Development / Land" and "Rural / Agriculture", which now belong to Land.
- **Facts a land listing carries** are fields the schema already had: `land_area` (m²), `zoning`,
  `sale_method`, `price_minor` and `price_label`. Nothing was added to the schema.
- **Price or sale method.** A listing with no price and no label shows its sale method where the
  price goes ("Expressions of interest", "Auction", "Tender", "Price on application"); "$0" is
  never printed. Publishing now accepts a price, a price label, or a sale method other than
  private sale; a private sale still needs a figure or a label.
- **Land size** prints in hectares from 10,000 m² ("16.5 ha", "42 ha") and in square metres below.
- **The retirement migration** archives every fictional residential listing on every start
  (`is_demo = 1 AND sector = 'residential'`), after the fixture seed so a fresh database and a
  migrated one end up in the same shape. Archived, not deleted: conversations, saves and
  inspection requests that refer to a home stay intact in the workspace, and nothing residential
  is offered publicly. The homepage intro setting is migrated from "Residential and commercial…"
  to "Land and commercial…" only if it still holds the old default.
- **Search.** `/api/properties` defaults to `sector=land`, accepts `land`, `commercial` and `all`,
  and answers 400 to `residential`; the client rewrites an old `?sector=residential` address to
  land. One new filter, `size=min-max` in square metres with either end open (`10000-`); a
  malformed range is a 400.

## The eight fictional land listings

Kept in code like the commercial pair, `INSERT OR IGNORE` by id so an existing database receives
them on its next start. One pair per land type, in the fictional places the concept already uses.

| Listing | Type | Place | Size | Zoning | Offer | State |
|---|---|---|---|---|---|---|
| Harbour Road Development Site | Development site | Saltmere | 2,450 m² | Mixed use | Expressions of interest | Available |
| Mill Street Corner | Development site | Fernwick | 1,180 m² | Residential growth | Auction | Sold |
| Fernwick Estate, Lot 12 | Commercial & industrial | Fernwick | 4,800 m² | General industrial | $1,650,000 | Available |
| Elmshore Gateway, Lot 3 | Commercial & industrial | Elmshore | 9,200 m² | Light industrial | Expressions of interest | Under offer |
| Cedar Ridge | Rural | Elmshore | 42 ha | Rural | $2,400,000 | Available |
| Saltmere Valley Acreage | Rural | Saltmere | 16.5 ha | Rural living | Price on application | Available |
| Orchard Lane Subdivision | Subdivision / investment | Fernwick | 3.2 ha | Residential growth | Tender | Available |
| Elmshore Heights, Stage 2 | Subdivision / investment | Elmshore | 5.6 ha | Urban growth | Expressions of interest | Draft |

Every zoning value says "(fictional)". Every description ends "This is a fictional listing with
an illustrative site plan."

## The images: illustrative site plans, not aerials

Clent asked for an aerial or site image on each listing. Higgsfield holds under one credit and
no aerial photograph of a fictional parcel exists, so each listing carries an **illustrative site
plan drawn in code**: parcel outline on a faint grid, neighbouring lots, the road with its name,
two dimensions, a north arrow, a scale bar, the lot name and area; contour lines on the rural
plans, hatching on the industrial lots, dashed proposed lots on the subdivisions. Ivory ground,
olive outline, the accent green as the parcel fill. Each sheet is marked "Illustrative site plan ·
not a survey · fictional"; alt text says the same and ends "Generated concept image." like every
other fictional image. Eight files in `public/assets/land-*.webp`, 1536 × 1032, 20 to 40 KB each,
all in `design/asset-register.json`. On a listing page the gallery shows the whole sheet
(`object-fit: contain`) rather than a crop. Aerial photography of a real parcel replaces a plan
when a real land listing exists; the brand document's shot list now says so.

## The interface

- **Header, footer, explore panel, How it works:** Land and Commercial.
- **Homepage:** the hero switch is Land / Commercial with Land first; the land quick filters are
  land type and land size; the product label reads "Land and commercial property"; the headline
  is "Land to build on." with rotating second lines; the Saltmere destination card is a land
  profile; a new **Browse land by type** section lists the four types with a one-line description
  and a live count of what is listed under each, counted from the same rows the search serves.
- **Search page (`/properties?sector=land`):** heading "Land." (or the type, place and tenancy
  searched for); pills for land type, price and land size; the filter panel has land type, land
  size, minimum and maximum price and "include under offer"; chips show the readable label of a
  size or type.
- **Card:** site plan with the locality on it, the type tag, then the name, three facts (land size,
  zoning, sale method), the line "Fictional listing · Illustrative site plan", and a footer with
  the price or sale method and a **View property** button. Commercial cards are unchanged.
- **Listing page:** breadcrumb "Land"; facts row and "Investment highlights"; the overview tiles
  show type, land area, zoning and sale method (no bedrooms or bathrooms); documents expected are
  a site plan and an information memorandum; the fictional note reads "Illustrative site plan,
  not a survey"; the inspection copy says "Request a time to walk the site."; the enquiry panel
  says "this property".
- **Workspace editor:** sector select offers Land and Commercial (plus "Residential (retired)"
  only on a retired listing); the type select follows the sector; a new listing defaults to a
  development site with no bedrooms, bathrooms or car spaces.

## Verified

- 32 API tests pass, including new ones: the land catalogue and its counts, type and size filters
  and their validation, the residential demos archived on a fresh database and still editable,
  `sector=residential` refused, and a land listing publishing on a sale method alone while a
  private sale without a price or label is still refused.
- The route walk: 39 routes at 1440px and 390px, 76 clean of 78; the two flagged are the
  intentional 404 page. No horizontal overflow, no console errors, no broken images, no unnamed
  controls.
- Screenshots checked at 1440px and 390px: the land search page, its filters, a land listing, the
  homepage hero and land section, and the editor on a land listing.

## Limitations

- **The images are plans, not aerials.** A real land listing needs aerial photography or a survey
  plan supplied by the vendor, under the "Photographs supplied by the property" label.
- **Bedrooms, bathrooms and car spaces still appear in the editor** for a land listing; they are
  ignored on land pages. Hiding them per sector is a small follow-up.
- **The retired homes remain in the workspace** as archived listings and in any conversation that
  referred to them. Deleting them is a separate decision.
- **Three photographs are still required to re-publish** a listing whose photographs changed; the
  fictional land listings each carry one plan, so unpublishing and republishing one would need
  two more images. Real listings are unaffected.
- **The brand document** is updated in copy and its ten screenshots are retaken from this build; the
  shot list now asks for aerial photography of land.
- **Locale is unchanged** (AUD, Australia/Sydney; D007 open) and the fictional places are the
  same Saltmere, Fernwick and Elmshore.
