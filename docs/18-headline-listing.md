# Headline listing and marketplace conventions

17 September 2026. The marketplace now carries one real property alongside the fictional concept homes, and borrows a set of presentation conventions from established Australian property portals (realestate.com.au was the reference).

## The headline listing
GrandBlue Resort & Beachclub, Mae Phim Beach, Rayong, Thailand, is seeded as the single featured listing (`featured = 1`; Courtyard House is demoted). It is a real, full-service oceanfront hotel and beachclub. Every fact on the listing is drawn from the property's own published website: room categories, facilities, the green-resort systems, the beach length and road distances to Bangkok, Suvarnabhumi Airport, Pattaya and Rayong. Room count, land and floor area, and sale terms are not published anywhere and are shown as "to be confirmed". The price is shown as **Price to be confirmed** rather than a number. The hotel's own telephone number, email address and booking link are deliberately not shown; enquiries and viewing requests go through Porli.

Photographs are six images from the property's public gallery, resized to 1536 × 1032 WebP and recorded in `design/asset-register.json` with `fictional: false`. Their use is authorised by the client as the listing owner; written confirmation from the property should be filed before public launch.

## Data model additions
Six columns were added to `properties`, applied idempotently at startup so existing databases (local SQLite and the Cloudflare Durable Object) migrate on their next start:

| Column | Purpose |
|---|---|
| `price_label` | Text shown instead of a price ("Price to be confirmed"). A published listing needs a positive price or a label. |
| `currency` | AUD, THB or USD. Prices format in the listing's currency. |
| `is_demo` | 1 for fictional concept records, 0 for real listings. Drives every "fictional" label. |
| `details` | JSON pairs of label and value, shown as the "Property details" table and, for hotels and land, as the key-facts strip. |
| `highlights` | Up to six short phrases shown as chips. |
| `listed_at` | First publication time, for "New listing" (14 days) and "Listed N days ago". |

Property types are now house, apartment, townhouse, villa, land and hotel. Listings with a price label sort last on price sorts and are excluded when a minimum or maximum price filter is set. The admin editor exposes all new fields, including a "real listing" checkbox that clears the fictional labelling.

## Conventions borrowed from the reference portal
- Highlight tier: the featured real listing gets a "Highlight" ribbon on cards and a dedicated homepage spotlight with price label, highlight chips and enquiry actions.
- Image badges: "New", "Price on request" and status badges overlay card images; the gallery shows a "1 / N" photo counter.
- Hospitality key facts: hotels and land show short detail pairs (beach, airport, city distances) instead of bedroom counts.
- Structured listing page: highlights, facts, description with "Read more", property details table, features, location note, viewing appointments (wording for hotels) and an "Explore other properties" strip. The enquiry card is sticky on desktop and pre-fills "I am interested in {property}." for real listings.
- Honest labelling: fictional homes keep "Fictional listing · Generated image"; the real listing shows "Photographs supplied by the property" and its listing date. Site-wide copy now reads "Except where a listing states otherwise, homes are fictional."

## Verification
`npm run check` and `npm test` pass (14 tests, including price-label publication rules, currency and type validation, sorting and the hotel's details). The same suite passes against the Cloudflare Worker (`PORLI_TEST_BASE`), which also serves the seeded hotel. Headless Chromium captures of the homepage, marketplace, hotel page, a fictional listing and the About page at 1440 px and 390 px showed no console errors, failed requests or horizontal overflow.

## Open items
- Confirm pricing, room count, land and floor area, and sale terms with the property; replace the "to be confirmed" values through the admin editor.
- File written image-rights confirmation before public launch.
- The hotel's exact address appears in the details table because the property publishes it; remove it if the client prefers locality-only display.
