# What Porli does, rebuilt as a photograph and a panel

21 September 2026. Clent sent the benefits section from the marketplace template and asked for the
homepage's "What Porli does" block in that format.

## What was taken

- **A full-bleed photograph on one side**, running to the edge of the viewport rather than sitting
  inside the page gutter, with a tinted panel filling the other half.
- **The panel's order**: eyebrow, heading, a short intro, then a stack of cards.
- **Each point as its own white card** on the tint, rather than rows divided by a hairline rule.

## What was kept from Porli

The palette. The reference's panel is a pale blue and its cards are white; Porli's panel keeps the
pale green the section already used and the cards are white on it. The display face for the
heading. And the numbered steps: the reference's three cards are parallel claims — Proven
Expertise, Customized Solutions, Transparent Partnerships — where Porli's three are a sequence a
buyer actually moves through, so 01, 02 and 03 stay.

That difference is worth naming, because it is the reason the section survives at all. The
reference's three cards say the agency is experienced, tailored and transparent. None of those is
checkable and Porli has no basis for any of them. Porli's three say what the site does: search,
shortlist, enquire. Same shape, and every line is something the site actually does.

## The icons were removed

At Clent's direction, and it is the right call. The reference's cards carry no icon, and Porli's
three were a search glass, a heart and a speech bubble repeating what the heading beside each one
already said. Each card is now its number and its words. The number keeps the left column, aligned
to the heading's baseline rather than centred against a block that no longer exists.

The three `.service-icon` rules and the `.step-head` wrapper they needed were deleted rather than
left behind, since nothing else used them.

## What else changed

**The commercial block's photograph moved to the other side.** It sits directly below this section
and also pairs a photograph with text. Two photo-left splits running together read as one long
column of images, so the page now alternates. Below 860px both stack, and the order reverts.

## Two defects found while building it

**The heading ran together at phone width.** The three lines are `<br>`-separated with no spaces
around the tags, and a media query hid the `<br>`s below 1000px so the heading could wrap freely.
Without them the text concatenated: "Talk to the peoplewho manage it." Checked at six widths from
1440px down to 360px after removing the rule — the three lines fit at every one, so the breaks
stay.

**The step number and icon floated against the text.** Stacked in a column aligned to the top of
the card, the icon sat below the number and beside the second line of the paragraph rather than
relating to anything. It was centred against the text block, and then the icons were removed
altogether, which settles it.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The section is confirmed full-bleed: its width equals the viewport width at 1440px and 390px,
  with no horizontal overflow.
- The photograph is confirmed loaded and cover-filling its half; the three cards are measured at
  equal height on desktop.
- The heading measured at 1440, 1000, 860, 700, 390 and 360px: three lines at every width, no
  overflow, no concatenation.
- The commercial photograph's computed `order` is 2 on desktop and 0 below 860px.
- 28 routes walked at 1440px and 390px: no console errors, no failed requests, no broken images,
  no unnamed controls.
- Reduced motion on and off. Cache-busting versions bumped together to 21.

## Limitations

- **The photograph is a generated concept image** of a fictional apartment interior, and its
  alternative text says so. It is decoration for a section about the service rather than a
  photograph of anything Porli owns or sells, which is the honest reading but not a strong one.
  A photograph of the actual team or office would do this job better, and there is neither.
- **The cards have a hover lift on a section with no links in them.** The lift is a small
  affordance on a static card, which is a mild dishonesty of the kind a hover state usually
  implies. It is behind a `hover: hover` query and does nothing on touch.
- **The panel's maximum width is 620px.** On a very wide screen the tinted half keeps growing while
  the content stays put, so the text sits left of centre in its half rather than centred.
