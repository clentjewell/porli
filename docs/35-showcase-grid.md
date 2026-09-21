# The showcase grid

21 September 2026. Clent sent a fifth reference and asked for its arrangement on the Available
properties section: photographs first, three across then two wider, with each card's details
appearing only when the cursor is over it.

## What was built

The grid is six columns. The first three listings span two columns each, the last two span three,
which is three across then two wider and is exactly the five listings the grid holds. The pattern
applies only when nothing is filtered — a filtered grid has a different count, so it falls back to
equal thirds rather than leaving a hole. Below 1000px it becomes two across; below 640px, one.

Each card is a photograph with its badges. The detail panel — name, facts, label and price — rests
out of sight and arrives on a white panel inset from the photograph's lower edge.

All five cards are the same height at every width, which the card pass in docs/34 established and
this keeps.

## The two problems a hover-only reveal creates, and how each is answered

A reveal that depends on a cursor excludes everyone without one and hides information a marketplace
exists to show. Neither was left to chance.

**Nobody loses the information.** The panel is always in the document, so a screen reader reads it
in place whether or not it is painted. It is hidden only inside
`@media (hover: hover) and (pointer: fine)`, so a touch screen, a tablet and every narrow layout
never enter that rule and keep exactly the card they had. And it arrives on `:focus-within` as well
as `:hover`, so tabbing to a card's name reveals it the way pointing at it does.

Verified rather than assumed: at 1440px with a fine pointer all five panels rest at opacity 0,
hovering the second raises only the second, and focusing the third raises only the third. On an
emulated phone and an emulated touch tablet, `(hover: hover) and (pointer: fine)` is false and all
five panels sit at opacity 1 with their names readable.

**The fictional label cannot depend on a hover.** The honest-labelling guardrail says fictional
listings say so, and "Fictional listing · Generated image" lives in the panel that is now hidden at
rest. Without a change, the grid would show five photographs that read as real property.

So a showcase card carries a second badge, "Fictional", beside its type, on the photograph, visible
at rest. The full line stays in the panel. This is the one place where the badge is not duplication
of the kind docs/34 removed: at rest there is nothing to duplicate.

It is a variant, not a new default. `card(p, true)` marks the card, and only the homepage's
Available properties grid asks for it. The search results, the similar properties on a listing page
and the saved list keep the card from docs/34, because those are pages for comparing listings and
hiding the price behind a hover would work against them.

## Motion

Opacity and a 12px translate, 340ms, plus a 4% photograph scale on hover. Transform and opacity
only. Under reduced motion the transition is removed and the photograph does not scale: the panel
still appears on hover, it simply appears rather than arriving.

## The cost, stated plainly

At rest the grid shows five photographs, a type and a fictional marker. **A visitor cannot compare
prices, sizes or names without hovering each card in turn.** That is a gallery, not a comparison
table, and comparison is what a property marketplace is for.

It is the right pattern for a homepage module whose job is to invite a click, and the wrong one for
search results, which is why it was not applied there. If the homepage grid is ever meant to be
scanned rather than browsed, this should be reconsidered — the fallback already exists, since
removing one media query returns the docs/34 card.

## A bug the route walk caught

The variant flag was a second positional argument, `card(p, true)`. Three call sites passed the
function straight to `Array.map`, which calls it with `(item, index, array)` — so the index arrived
as the flag, and **every card after the first on the search results, the similar-properties strip
and the saved list rendered as a showcase card**, with its price hidden behind a hover on precisely
the pages where a price must be visible.

Nothing looked wrong in a screenshot of the homepage, which is what had been checked. The walk of
every route is what surfaced it, in a line of badge text reading "ApartmentFictional" on a search
result that should not have had that badge at all.

Fixed twice over: the flag is now matched strictly, so an index can never switch it on, and the
three call sites pass an explicit arrow function.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- Rest, hover and focus states measured by reading computed opacity on all five panels, at 1440px.
- Pointer capability checked on emulated phone and touch tablet: the fine-pointer query is false
  and every panel is visible.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- Card widths measured: 410px for the first three and 626px for the last two at 1440px, all 331px
  tall.
- Reduced motion on and off.
- Every page that renders a card checked for which variant it got: the search results, the
  similar-properties strip and the saved list use the comparable card with visible prices, and the
  homepage's Recently viewed strip does too. Only Available properties is a showcase.
- Cache-busting versions bumped together to 19.

## Limitations

- **The locality is not shown on a showcase card.** It moved onto the photograph in docs/34, and
  the photograph now carries badges at rest instead. The locality is in the panel, on hover.
- **The gradient over the photograph's lower edge is switched off here**, since nothing at rest
  needs it. The photograph counter keeps its own dark pill, so it stays legible.
- **Five listings is the whole grid.** The three-across-then-two-wider rhythm is exactly right for
  five and will need revisiting at six or more, where a plain three-column grid may read better.
