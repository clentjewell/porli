# The logomark

22 September 2026. Clent asked for a wordmark for RealDistrict, looked at a run of options over
several rounds, and chose one: a D with the R cut through it as a single continuous channel.

## What was tried and rejected

The rounds, in order, and why each one fell:

- **Four abstract marks** and **four RD monograms.** One of the monograms, a shared-stem RD, read
  as a B once it was small. Rejected.
- **An R nested inside a D** as two shapes. Every version had a visible seam where the letters
  met and stopped reading below 32px. Rejected.
- **Knockout variants** of the same idea. Two of the five read as P or B. Rejected.
- **A parcel mark**: four blocks, the right column rounded. Legible at 16px, but it is not a
  letter and Clent moved on to a brand sheet that showed the channel idea.
- **A first reconstruction of the channel** built from three filled rectangles. The channel came
  out as a sliver and the R did not read. Reported as a failure; Clent said try again.
- **The channel drawn as a stroke.** Constant width for free, mitred corners, one path. Four
  variants: stem stopping at the bowl, stem running through, a heavier stroke, and a tile. The
  full-stem version was the only one whose R still read at 16px. It is the one Clent chose.

## The mark

A solid D, flat on the left and a half-circle on the right. Through it runs one channel, 13/82 of
the mark's width: down the full height as the R's stem, round a 16-unit bowl, and out of the
bottom edge as the leg. The channel is a mask, not a paint. It is cut out of the D, so whatever
sits behind the mark shows through it — paper in the header, deep olive in the footer, the tile in
the favicon — and the D itself takes `currentColor`, which is why it is ink beside the ink
wordmark and white beside the white one without a second file.

Source: `design/realdistrict-mark.svg`, olive on a transparent ground, square on the D. Recorded in
the asset register as drawn in-house, not generated and not a photograph.

## Where it appears

- **Header and footer**, before the name, inline in the markup that `app.js` already writes. Each
  instance carries its own mask id (`mark-header`, `mark-footer`) because two masks with one id in
  the same document resolve to the first. It is `aria-hidden`: the link already reads
  "RealDistrict home".
- **The favicon**, replacing the Georgia lowercase p that had stood in since the first commit:
  the same mark in paper on a deep olive tile with a 22-unit corner. Rendered at 64, 32 and 16px;
  the R reads at all three, and on a dark tab bar.

It is sized in em (0.84 of the wordmark's font size), so every existing wordmark size rule — 36px
in the header, 28 in the footer, 23, 20 and now 19 and 17 on phones — carries it along without
its own breakpoints.

## What it cost, and what gave

The mark adds 23px to a header that was already at its limit on phones after the rename
(docs/38). Measured signed in, the row ran 15px over at 390px and 36px over at 360px; signed out,
10px over at 360px. Three small things give below 420px: the account button drops its decorative
user icon and keeps the first name, the wordmark tightens from 20px to 19px and its gap closes a
little, and from 375px down the wordmark steps to 17px. Measured afterwards at 390, 375, 360, 359
and 320px, signed out, as a customer and as staff: no overflow anywhere. The rule from docs/38 that
hides the sector links below 360px is untouched.

The 28-route walk at 1440px and 390px is back at its steady state: 54 clean, the two expected
404 rows for the not-found page.

## Verification

- Header mark 30×30px at 1440px beside the 36px name; footer mark 24×24px in white; fill
  `currentColor`, stroke none (the global icon stroke is undone on the mark).
- Mask ids unique per instance; the favicon and design source each carry their own.
- Content Security Policy unchanged: the SVG is DOM markup written by the bundled script and an
  image file, with no inline style or script.
- Route walk and header overflow measurements as above.

## Limitations

- **The mark was drawn by hand as SVG paths, not by a designer.** It is a sound specimen and it
  survives 16px, but the bowl and leg were placed by measurement, not by eye at every optical
  size. A designer refining it should start from the source file and keep the channel width.
- **One colour only.** The D takes the text colour it sits beside. There is no two-tone version
  and no reversed lock-up beyond what `currentColor` gives.
- **Brand availability is still unchecked** (D009). A mark makes the name look more settled than
  it is; nobody has searched company names, domains or trade marks for RealDistrict.
- **The old favicon is gone.** Browsers cache favicons aggressively, so the p may show in a tab for
  a while after deployment until the cache turns over.
