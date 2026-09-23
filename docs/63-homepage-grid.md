# The homepage property grid, cleaned up

23 September 2026, after docs/62. Clent asked for the homepage "Available properties" grid to be
cleaner and more professional. It had been built for five listings: three tiles, then two wider
ones, each a bare picture with its details hidden until hover. With seven listings it broke into
rows of three, two and two, with a gap at the end.

## What changed

- **One uniform grid.** It uses the same card as the search pages, four across on desktop, three
  from 1150px, two from 800px and one on phones. Every card shows its picture, type, locality,
  facts, fictional label, price or sale method, and a View property button.
- **Aligned footers.** Each card is a column with its footer pinned to the bottom, so prices and
  buttons line up across a row. The price sits above a full-width View property button. Commercial
  cards now use the same footer as land cards, so the two sectors match.
- **A closing tile.** The last cell is a pale "Every land and commercial listing" tile linking to
  the full search. It stretches across whatever the last row leaves, so no row ends in a gap at any
  width.
- **Order.** Land comes first, in the order of the land types, then the commercial categories. The
  filter pills follow the same order.
- **Two fixes found while measuring.** The homepage search row ran a few pixels past the edge
  between 701px and 1200px, and now wraps. A land card's price and button now wrap on a narrow card
  instead of overflowing.

## Verified

Measured at 1440, 1024, 700 and 390px: equal card heights in every row, the closing tile filling the
last row, no horizontal overflow, and the type pills still filtering. All 33 API tests pass.

## Replaced

The hover-reveal "showcase" card on the homepage (docs/34) is no longer used. Its styles remain for
now and can be removed later.
