# Sale-only marketplace and the commercial section

17 September 2026. Following the user's direction, renting has been removed from Porli and a commercial property section has been added, modelled on realcommercial.com.au, Australia's commercial property portal. The GrandBlue Resort & Beachclub is now the headline commercial listing.

## Renting removed
Porli sells property only. The Rent mode, weekly prices, the "available by" filter, rent statuses (application pending, leased), the Buy/Rent editor control and all renter-facing copy are gone. The `mode` column remains in the schema because SQLite cannot drop its CHECK constraint without rebuilding the table; every row is now `buy`, and the value is no longer exposed by the API or shown in the interface.

Existing databases convert on start: any rent row becomes a sale listing. The four fictional rental fixtures were given fictional sale prices (Garden Apartment $645,000, Veranda House $1,180,000, Lightwell Studio $395,000 sold, Balcony Apartment $585,000 archived). Any other legacy rent row would be given the label "Price to be confirmed"; leased becomes sold and application pending becomes under offer.

## Residential and commercial
Listings now carry a `sector`, residential or commercial, and the marketplace is browsed by sector rather than by buy or rent. Each sector has its own category taxonomy:

| Sector | Types |
|---|---|
| Residential | House, Apartment, Townhouse, Villa, Land |
| Commercial | Offices, Retail, Industrial / Warehouse, Hotel / Leisure, Medical / Consulting, Showrooms / Bulky goods, Development / Land, Rural / Agriculture, Other |

Commercial listings add the facts a commercial buyer expects: sale method (private sale, expressions of interest, auction, tender, price on application), floor area and land area in square metres, zoning and tenancy (vacant possession, leased investment, owner occupied). Cards and listing pages show these in place of bedroom counts, and the commercial filter set offers category, tenancy, minimum floor area and price. The admin editor exposes the sector, which drives the category list, and the new fields.

## Content
- GrandBlue Resort & Beachclub: sector commercial, category Hotel / Leisure, sale by expressions of interest, price to be confirmed. Existing production rows are updated on start.
- Two fictional commercial listings give the section content: Highstreet Offices (Elmshore, offices, vacant possession, private sale) and Millrace Warehouse (Fernwick, industrial, leased investment, expressions of interest). Their images were generated with Higgsfield in the established house style and are recorded in `design/asset-register.json` as fictional.
- The homepage now offers a Residential / Commercial search switch, shows residential homes in "Available homes" and replaces the former rental section with a commercial property section.

## Conventions borrowed from realcommercial.com.au
Sale-method wording in the price slot rather than a blank price; category chips; floor and land area as compact stats; tenancy and zoning in the key facts; investment highlights on commercial listing pages. Not adopted yet: information memorandum downloads (Porli only stores images), agency branding (single operator) and leasing (out of scope by decision).

## Verification
`npm run check` and `npm test` pass on Node and, via `PORLI_TEST_BASE`, against the local Cloudflare Worker. Tests cover the sector split, type-to-sector validation, sale-method and tenancy validation, the legacy rent conversion on a re-opened database, and the absence of `mode` and `rent_frequency` from API responses. Headless Chromium captures at 1440 px and 390 px of the homepage, both marketplace sectors, the commercial filters, the hotel, an office listing, a residential listing and About showed no console errors, failed requests or horizontal overflow.

## Open items
- Information memorandum and other document downloads would need a document upload path (currently images only).
- Leasing could return later as a separate sector-aware mode; the schema still permits it.
