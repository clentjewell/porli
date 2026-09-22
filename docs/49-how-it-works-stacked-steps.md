# How it works: the steps as stacked cards

22 September 2026, after docs/48. Clent sent a reference site (a web agency's "4 step process"
section) and asked how it was designed; then asked for its device to be built into How it
works, to check before it goes live.

## What the reference does

Each step is one full-width card. The card sticks below the header as the page scrolls, and the
next card slides up over it, so the previous step stays faintly visible behind. On each card: a
large faint numeral behind the heading, a short heading, one sentence, a small pill with one fact,
and an illustration. The rest of that site is a standard dark agency template with purple glow,
testimonials, an accordion of questions and a cookie banner.

## What was taken

- **The stack.** Find, Ask and Visit are now three cards in the same column. From 801px wide and
  700px tall, each card is `position: sticky` below the header with a slightly larger offset than
  the one before, so the stacked edges show. As the next card covers a card, the covered card eases
  back to 95% and a paper veil rises over it: `transform` and a `::after` overlay's `opacity`,
  driven by a scroll listener that is removed when the page changes. Nothing else moves.
- **The fact pill.** One true statement per step: "No account needed to browse", "Needs an
  account, so the reply can find you", "A request, confirmed by the team". The reference's pill
  states a delivery time; ours states a rule.
- **The faint numeral** behind the heading rather than beside it.
- **A picture per step, but a real one.** The reference draws product illustrations. Ours are
  screenshots of the site's own screens taken as they are today: the search page, the enquiry
  form, the inspection request. They show fictional listings and say so in their alt text; the
  register records them as screenshots to be retaken when those screens change.

## What was not taken

Dark ground, purple, gradient text; illustrations; timeline promises; the testimonial slider and
star ratings; the FAQ accordion (our six questions stay in the open).

## Two things the first build got wrong, and the fixes

- **The covered card was faded with `opacity`**, which let the card beneath it show through the
  card on top — the Find card's text ghosted through the Ask card. Fixed with the veil: a paper
  overlay whose opacity rises, so the covering card stays solid.
- **On phones, cards taller than the viewport were sticking with their lower half unreachable**:
  the third point of Find was under the fold and the Ask card slid over it before it could be
  read. Fixed by turning the stack on only where a whole card fits — 801px wide and 700px tall —
  and leaving a plain column everywhere else, including a 1366×650 laptop window. Under reduced
  motion the column is used at every size.

## What was checked

- 1440×900: cards sticky at 118/138/156px offsets; mid-scroll the covered card reads
  `scale(0.9885)` with veil 0.127 and the covering card stays untransformed and opaque.
- 390×844 and 1366×650: cards `position: relative`, no transform, no veil; nothing under the fold.
- 1440×900 with reduced motion: the same plain column.
- No overflow at any of the three; images at their natural ratio; keyboard order unchanged
  (thirteen stops in reading order). 30-route walk: 58 clean. Tests: 28 pass.

## Limitations

- **The screenshots are of today's screens.** When the search page or the forms change, these
  three files go stale and need retaking; the register entry says so.
- **The stack is a wide-screen device.** Most phone visitors will see a column of three cards,
  which is the docs/48 page with a pill and a picture added; that is by design, not a gap.
