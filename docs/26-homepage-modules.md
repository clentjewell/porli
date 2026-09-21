# Homepage: destination profiles and recently viewed

21 September 2026. Third change of the handover in docs/23, after the listing page (docs/24) and
search results (docs/25). Section 4 of the brief suggests three homepage additions: a recently
viewed strip, a suburb profile module for the three featured destinations, and a proof strip once
there are results to show. Two are built. The third is not, for a reason worth recording.

## Destination cards became profiles

The three featured destination cards — Saltmere, Fernwick and Thailand — were a photograph, a name
and a marketing tagline. Each now also states what is actually listed there: the number of
listings and the lowest price, or "price on request" when every listing there carries a price
label rather than a number.

The figures are counted from the same listings the marketplace serves, in the browser, at render
time. They are not a second copy of the data and cannot drift from what a visitor sees after
clicking through. A destination with nothing in it says "No listings yet" rather than showing a
card that leads to an empty search.

The facts line uses the same muted colour as the tagline above it at full opacity, rather than a
reduced opacity, matching how the card already handles secondary text and avoiding a contrast
question over a photograph.

## Recently viewed

A strip of the last four listings opened in this browser, newest first, using the same card as
every other grid. It appears only when there is something to show, so a first-time visitor never
sees an empty module.

Storage is `localStorage` on the visitor's own device: no account, nothing sent to the team,
nothing recorded server-side. The strip says so in a line beneath it, because a site that quietly
remembers what you looked at should say that it does. Both the read and the write are wrapped in
`try`/`catch`: in a private window or with storage disabled, the strip simply never appears.
Remembering is a convenience, not a feature the page depends on.

It sits below the hero, the headline listing and the featured destinations, and above the
available homes grid. That ordering is deliberate: the definition of done in docs/23 requires
GrandBlue to be the first thing a visitor understands the site is about, so a returning visitor's
own history must not displace it.

## The proof strip is not built

Section 4 asks for a "Sold and under offer" proof strip "once there are results to show". There
are none. Nothing has sold, nothing is under offer, and the only real listing is still to be
confirmed with the property. A proof strip with nothing behind it would be exactly the kind of
claim the honest-labelling guardrail exists to prevent, and dressing fictional concept listings as
sold stock would present fictional records as real.

Build it when the first outcome is real. The card states and the transaction statuses it would
need already exist and were verified in docs/25.

## The hero was not touched

The hero still reads "Homes to buy. / Property to invest in." with GrandBlue in the section
beneath it. Leading with GrandBlue in the hero itself would mean choosing between the residential
and commercial framings, which docs/23 section 9 reserves for Clent and docs/21 puts at the top of
its list. Flagged rather than guessed.

## Checked against the reference site

The archived realestate.com.au homepage (20 September 2026, read through the Internet Archive as
described in docs/25) has no recently viewed strip and no suburb profile module on the homepage.
It has an "Explore suburb profiles" link card inside a larger utility grid, and its footer carries
tabbed link lists: Real estate, New homes, Popular areas, Popular searches.

So neither module here is borrowed from them. Both come from the list in docs/23 section 4, which
proposed them for Porli rather than reporting them from the reference site. Recorded so nobody
later assumes the reference site was the source.

## Verification

- `npm run check` and `npm test` pass; 26 tests, unchanged. Both modules are presentation over
  data the API already returns, so no endpoint changed and no test needed rewriting.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The strip was exercised as a visitor would: absent on a first visit, present after opening two
  listings, in the right order, with the stored value confirmed in `localStorage`, at both widths
  and with reduced motion on and off.
- Reduced-motion pass: nothing is left hidden or animating; no element sits below full opacity.

## Limitations

- **Recently viewed is per-browser and per-device.** Clearing site data, a different browser or a
  private window all start from nothing. That is the cost of not requiring an account, which is
  what docs/23 asked for.
- **A listing that is unpublished or withdrawn after being viewed** drops out of the strip
  silently, because the strip only renders listings still present in the public catalogue. That is
  the safe direction, but it means the strip can shrink without explanation.
- **Destination profiles cover the three featured locations only.** Any other location still shows
  an ordinary marketplace search with no summary above it.
