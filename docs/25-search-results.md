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

- **Only GrandBlue has more than one photograph**, so the carousel is invisible on every other
  card. It is correct behaviour and it will fill out as imagery arrives, but it means the feature
  currently improves exactly one listing.
- **The save button is a 32px tap target**, below the 40px floor in docs/23. It predates this
  change and appears on every card across the site, including the homepage, so widening it is a
  site-wide change rather than a search-results one. Recorded here rather than fixed in passing.
- **Sold listings are excluded from results entirely**, so the sold treatment is only visible to
  staff previewing a listing. "Include under offer" reaches the under-offer state. Whether recently
  sold stock should appear as proof is a content decision, not a technical one; docs/23 raises the
  same question as a homepage "proof strip".
