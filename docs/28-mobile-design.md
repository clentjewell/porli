# Mobile design pass

21 September 2026. Fifth change of the handover. Not from the list in docs/23: it came from
measuring the live site at 390px and finding that the design had been composed at desktop width
and inherited by phones, with one consequence that undermined the north star in docs/21.

## What the measurements showed

| Measured at 390px | Before |
|---|---|
| Enquiry button on the GrandBlue listing | 4,658px down a 6,412px page |
| Contact card position | `static` — sticky applied only above 800px |
| First search result | 500px down an 844px screen |
| Smallest tap target | 32px, against the 40px floor in docs/23 section 3 |
| Filter bar while scrolling | `static` — sticky applied only above 800px |

The first line is the serious one. docs/21 states the north star as one real property sold, and
that the enquiry is the product. On the device most property searching happens on, the enquiry was
five and a half screens below the fold, under the map, the directions and the viewing times.

## What changed

**A sticky enquiry bar on phones.** Listing pages that are published and available now carry a
fixed bar at the foot of the screen with the price, the property name and an Enquire button. The
button is 47px tall and the bar respects `env(safe-area-inset-bottom)` so it clears the home
indicator on a modern phone. The page gains matching bottom padding so the bar never covers the
footer, which was checked rather than assumed.

The bar repeats the price that sits at the top of a listing, so it tucks out of the way while that
price is on screen and slides back once it has scrolled past. The tuck is transform and opacity
only. It is deliberately the wrong way round from a reveal: the bar is visible by default in CSS
and is only ever hidden by script, so a failed or unsupported observer leaves a usable control
rather than an invisible one. Verified with reduced motion both on and off.

**Search results start higher.** Three things were pushing them down, and all three were
duplication rather than information:

- The "The marketplace" eyebrow labelled a page the heading already names.
- The heading itself was set at 46px on a 390px screen.
- The Residential/Commercial switch inside the search bar was a third copy of a control already in
  the navigation and already stated by the heading ("Residential property.").

The eyebrow and the in-bar switch are hidden below 800px, the heading drops to 30px, and the
page-top padding tightens. The first card moved from 500px to 368px, so a card and a half is
visible on load instead of a sliver of one. Sector can still be changed from the navigation, which
stays visible at every width.

**The filter bar is sticky on phones too.** It was `position: static` below 800px, which is
backwards: on a desktop the filters and the results are visible together anyway, while on a phone
the filters vanish the moment you scroll. It now sticks beneath the header, offset by the measured
`--header-h` so it sits under the header rather than behind it. Removing the switch from the bar
is what made this affordable: the bar is one row on a phone rather than two.

**Tap targets reach 40px.** The save button was 36px in `styles.css` and overridden to 32px in
`experience.css`, which loads second. The phone override is now in `experience.css` beside the
rule it corrects, rather than in the file that loses. docs/25 recorded this as a known violation
left unfixed; it is fixed.

## What was deliberately left alone

**The visual language.** Palette, typeface and restraint are the strongest part of this design and
docs/21 says to keep them. Nothing here changes how the site looks, only what is reachable and how
much of the screen the furniture takes.

**The type scale.** A card body uses six sizes: 9, 10, 11, 15, 16 and 21px, and 9px is too small
for the fictional-listing label to be comfortably read. Consolidating to three or four steps with
an 11px floor is a system-wide change and belongs in its own pass.

**The card hierarchy.** The price is currently larger than the property name, so on GrandBlue the
biggest text on the card says "Price to be confirmed". Whether Porli leads with price or with
property is a positioning question that leans on the commercial-or-residential decision docs/23
section 9 reserves for Clent.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. This is presentation over existing
  data, so no endpoint or fixture changed.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The enquiry bar was measured on load, after scrolling 4,000px, and at the foot of the page to
  confirm it stays in view, never covers the footer, and returns when scrolled back up.
- Reduced-motion pass with the observer active in both states.
- Cache-busting versions on `styles.css`, `experience.css` and `app.js` bumped to 8 together, so a
  returning visitor cannot get new markup against old styles.

## Limitations

- **Desktop is unchanged.** Every rule here is inside a `max-width: 800px` query. The desktop
  contact card was already sticky and the desktop fold was already reasonable.
- **The enquiry bar shows price and name only.** A photograph thumbnail is the usual portal
  treatment and would need a second look at the bar's height on a small screen.
- **The tuck is anchored to the listing page's price line.** A listing rendered without one would
  keep the bar visible at all times, which is the safe direction but not the intended one.
