# Recently viewed, removed

21 September 2026. Clent, looking at the strip on the live site: "I don't think recently view
works?" He was right, and the reason is arithmetic rather than taste.

## What the measurement showed

Four listings were opened, then the homepage was measured as a returning visitor sees it:

| Listing | Headline panel | Available properties | Recently viewed |
|---|---|---|---|
| GrandBlue Resort & Beachclub | yes | — | yes |
| Veranda House | — | yes | yes |
| Garden Apartment | — | yes | yes |
| Courtyard House | — | yes | yes |

**Four of the six listings rendered twice on one page.** The strip was not broken; it did exactly
what docs/26 built it to do. "Pick up where you left off" solves finding a listing again among
thousands. With six, the grid directly beneath it already shows everything, so the strip can only
be a second copy of what is above it.

This is the same duplication removed from the homepage in docs/33, when the values strip and the
account strip both turned out to repeat a block further down. Those two were 1,500px apart and
visible in one capture. This one only appears to a visitor who has already opened listings, which
is why it survived that pass.

## A defect it exposed

GrandBlue's card in the strip measured **409px against 361px** for the three houses beside it. Its
facts are long labelled pairs that each wrap to their own line, where a house gets three short
inline items.

This corrects a statement in docs/34, which said every card in a row is the same height. That holds
on the search results and on the showcase grid, where a card is itself a grid item and stretches.
It did not hold here, because a card in the strip sits inside a `[data-reveal]` wrapper: the
wrapper stretches and the card inside it does not. Only this strip was affected.

## What was removed, and what was kept

**The section is gone** and the homepage stays at five modules. Adding something else made of
listing cards would have the same problem — at six listings, every strip is a copy of the grid — so
nothing replaces it.

**Nothing is recorded any more.** The `rememberViewed` call is removed from the listing page. This
is not tidiness: docs/26 argued that a site which quietly remembers what you looked at should say
that it does, and the line saying so lived in the strip. Storing a browsing history with nothing on
the site disclosing it would be worse than storing none.

**History already on a device is cleared.** Removing the write stops new history; it does not
remove what a visitor stored under the old build. Leaving it there is the same problem in a
quieter form — data held on someone's device for a feature that no longer exists and no longer
discloses itself. The key is removed once on load, in a `try`/`catch` like every other storage
access here.

**The code is kept**, parked rather than deleted: `recentlyViewed` and `rememberViewed` stay in
`experience.js` behind a comment explaining why they are unused and how to restore them, and the
strip's CSS stays with one rule added that fixes the height defect above, so a restored strip does
not carry it.

Restoring is a two-line change: render the section in `homeView` again, and call `rememberViewed`
from `detail()`.

## When to bring it back

When the catalogue is large enough that a visitor cannot reasonably find a listing again from the
homepage — a few dozen, not six — and when the grid below it no longer shows the whole catalogue.
The disclosure line must come back with it.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- Three listings opened, then local storage read directly: `porli-viewed` is `null`, so nothing is
  stored.
- A visitor carrying history from the old build was simulated by writing the key and reloading: it
  reads `null` afterwards, with no error and no strip.
- The homepage as a returning visitor: no strip, five modules, five cards, and **no listing name
  appearing twice**.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls. The listing page was exercised directly, since
  that is where the removed call lived.
- The homepage is 4,696px, and a returning visitor no longer sees roughly 470px of repeated stock.
- Cache-busting versions bumped together to 20.

## Limitations

- **Two exported functions and a block of CSS are now unused.** That is deliberate and documented
  here, but it is dead code until the strip returns, and it should be deleted if the decision is
  ever made not to bring it back.
- **A returning visitor loses a genuine convenience.** At this catalogue size the cost is close to
  nothing; it will not stay that way, and nothing currently watches for the point at which it
  matters again.
