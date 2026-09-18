# Location, maps and directions

18 September 2026. Listing pages now carry a Location section with the property's address where one is published, a map, navigation links and travel notes.

## What a listing shows
- **Address**: the full street address when the listing has one; otherwise the locality with either the fictional-location note or "Only the locality is shown. Ask the team for the exact address."
- **Map**: for listings with coordinates, a placeholder panel with a "Show map" button. The Google map loads only after the visitor presses it, so nothing is fetched from Google until they choose to. When a Google Maps Embed API key is configured (`PORLI_MAPS_EMBED_KEY`, a browser key restricted by HTTP referrer), the official Embed API is used; otherwise the keyless embed URL.
- **Navigation**: Open in Google Maps, Get directions (Google Maps directions to the coordinates) and Apple Maps, all opening in a new tab, plus the coordinates with a copy button.
- **Getting there**: free-text travel notes.

The homepage headline listing links straight to its map section.

## Data and validation
Four columns were added idempotently: `address` (≤ 200 characters), `latitude` and `longitude` (WGS84; both zero means unknown, both must be supplied together and lie within range) and `directions` (≤ 1000 characters). The serialised property gains `has_location`, and `address_display` is now derived: `full` when an address is present, otherwise `locality_only`. The admin editor has a Location section for all four fields.

The GrandBlue Resort & Beachclub carries the address and GPS position the property publishes (Laem Mae Phim Beach Road, 180 Moo 4, Tambon Kram, Amphur Klaeng, Rayong 21190; 12.65236, 101.61083) and travel notes drawn from its published distances. Fictional listings have no coordinates and show no map.

## Security and privacy
The Content Security Policy now permits frames from `https://www.google.com` only; scripts, styles, images and connections remain first-party. The privacy page states that maps are loaded from Google only when a visitor chooses to show them. Navigation links are plain links to Google and Apple and load nothing until clicked.

## Verification
`npm run check` and `npm test` pass on Node and, via `PORLI_TEST_BASE`, on the local Cloudflare Worker. Tests cover the hotel's location fields and derived flags, coordinate validation, the session's map key field and the CSP frame allowance. A headless Chromium check of the hotel page confirmed the placeholder, the click-to-load iframe, the three navigation links with `rel="noopener"`, the coordinates and, on a fictional listing, the no-map wording; page captures at 1440 px and 390 px showed no console errors or overflow.

## Open items
- Coordinates are entered by hand in the editor; there is no geocoding of addresses.
- A Google Maps Embed API key is optional; add it as a Worker variable when the domain is settled so the official Embed API can be used.
