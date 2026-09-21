# Search results

21 September 2026. Second change of the handover in docs/23, following the listing page in
docs/24. The marketplace at `/properties` borrows more of the reference portal's information
hierarchy (docs/23 section 4). Filters, URL state and the existing result count and sort line are
unchanged.

## What changed

**A featured real listing leads the default view.** GrandBlue sorted third under "Newest first" —
the only property that can actually be sold sat at the bottom of the page. Featured listings that
are not demo records now lead the default sort. An explicit price sort is left strictly alone, so
the price-label rule from docs/18 still holds and a sort the visitor chose is never quietly
overridden. The rule reorders; it never filters. A test asserts both halves of that.

**Two badges, not four.** GrandBlue carried four stacked badges: its type, Highlight, New and
"Price on request". Cards now show the type and the single strongest remaining signal. The
transaction status outranks Highlight, which outranks New. "Price on request" was also pure
duplication — the card prints "Price to be confirmed" immediately under the photograph — so it now
appears only when nothing more important needs the space.

**The filter bar stays put.** The sector toggle, search field and Filters button are sticky beneath
the header while results scroll. This required moving the form out of `.page-top`: a sticky element
is bound by its containing block, and inside `.page-top` it scrolled away with its parent the
moment the heading left the screen. It is deliberately static below 800px, where the header already
takes enough of a small screen.

**Cards carry the whole photo set.** A card showed one photograph; GrandBlue has six. Cards with
more than one now have previous and next buttons, a "1 / 6" counter and dots. The buttons are real
buttons outside the card's link, so the card stays a single keyboard destination while the controls
are separately operable, and each change is announced through a per-card `role="status"` region.
Photographs crossfade on opacity alone. There is no autoplay: a grid of independently animating
cards would be noise, and it would fight the reduced-motion rule rather than sit inside it.

**Under offer and sold are unmistakable.** Closed listings dim their photograph and carry a clay
ribbon across the foot of the image, as well as the existing badge. Nothing in the seed data uses
these states, so they were verified by setting the status through the staff API and reverting.

## What was not built

**No map and list toggle**, though docs/23 lists one. Only GrandBlue has coordinates, so a map view
would show a single pin and five absent listings — worse than no map. This is a recommendation, not
a decision: it should be revisited when more stock is geocoded. Flagged to Clent.

## Where the borrowed hierarchy came from

realestate.com.au could not be reached from the build environment. It sits behind Kasada bot
protection and returns 429 to automated clients, including a genuine unmodified Chromium that was
given thirty seconds to complete the challenge; realcommercial.com.au does the same and
domain.com.au returns 403. Working around that would mean defeating an anti-bot system, which was
not done.

So nothing here was copied from observing the reference site. Every item implemented is named in
the list in docs/23 section 4, with the conventions already adopted recorded in docs/18. Where
these documents describe a layout as the reference portal's, that attribution comes from docs/23,
not from anyone on this change having looked at the site. If the hierarchy is ever revisited,
someone with browser access should check the list in docs/23 against the real thing first.

## Checked against the reference site, after the fact

21 September 2026. realestate.com.au is unreachable directly (see the section above), but the
Internet Archive holds copies and the archive is not blocked. A search results page archived on
4 January 2026 and the homepage archived on 20 September 2026 were read and rendered. Reading a
public archive is not the same as defeating the live site's bot protection, so this was done.

Two things the real page showed that the list in docs/23 section 4 did not, and both are now built:

**"Featured" is a named sort, not a hidden rule.** Their sort control offers Featured, Date
(newest and oldest), Price (both directions), Next inspection and Next auction, with Featured
selected by default. This change had originally reordered the default view behind the visitor's
back: there was no way to see why one listing led, and no way to turn it off. Featured is now the
first option in the sort control and the default. Choosing any other sort switches it off
completely rather than reordering on top of the choice. An unknown sort value falls back to
Featured instead of producing an arbitrary order.

**The heading describes the search.** Theirs reads "Real Estate & Property for sale in Melbourne,
VIC" rather than a fixed category name. Ours now names the sector or property type and the
location searched for: "Commercial property in Rayong.", "Houses in Saltmere.", "Offices.".
Residential type labels are singular in the fixtures, so they are pluralised for the heading;
commercial labels already read as categories and are used unchanged. Only filters with a plain
language form are named. The rest stay in the removable chips below, which already show them.

Two things seen and deliberately not adopted: their card heading is the street address, which does
not suit a named property like GrandBlue where the locality line already carries the address; and
their view tabs are List, Map, Inspections and Auctions, where there is no auction stock and one
property with viewing times. The archived search page is nine months old, so it is good evidence
of their hierarchy rather than a current record of it.

## Verification

- `npm run check` and `npm test` pass; 26 tests, up from 24. The new tests cover the ordering rule
  (default leads with the featured real listing, an explicit price sort is untouched, and no
  listing is lost either way) and that cards receive every photograph with alternative text.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, covering public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images and no unnamed controls anywhere. The only flagged route is a
  deliberately invalid listing URL, which correctly returns 404 and renders its empty state.
- Keyboard pass: the carousel buttons are reachable by Tab, keep a visible 3px focus ring, become
  visible on focus rather than hover alone, and advance on Enter.
- Reduced-motion pass: the active photograph stays fully opaque, the carousel still swaps, and no
  element is left animating.

## Limitations

- **Two listings have more than one photograph**: GrandBlue with six and Courtyard House with
  three. The carousel is invisible on the other four cards. That is correct behaviour and it will
  fill out as imagery arrives, but it means the feature currently improves two listings. (An
  earlier version of this document said only GrandBlue had more than one photograph. That was
  wrong; the imagery audit in docs/27 found Courtyard House's gallery.)
- **The save button is a 32px tap target**, below the 40px floor in docs/23. It predates this
  change and appears on every card across the site, including the homepage, so widening it is a
  site-wide change rather than a search-results one. Recorded here rather than fixed in passing.
- **Sold listings are excluded from results entirely**, so the sold treatment is only visible to
  staff previewing a listing. "Include under offer" reaches the under-offer state. Whether recently
  sold stock should appear as proof is a content decision, not a technical one; docs/23 raises the
  same question as a homepage "proof strip".
