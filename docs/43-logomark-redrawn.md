# The logomark, redrawn to Clent's artwork

22 September 2026, later the same day as docs/42. Clent confirmed the channel mark was the right
direction, then sent his own artwork of it and said to use that. This record replaces the drawing
in docs/42; everything else there — where the mark appears, how the mask works, what the phone
header gave up — still stands.

## What changed in the drawing

The docs/42 mark cut the R's stem as a separate channel from the top edge to the bottom. In
Clent's artwork the R's stem is the D's own left edge, which is the better idea: one fewer cut,
and the D stays whole on its left side. The channel is now the bowl's stroke, entering from that
left edge, curving round a solid counter, coming back beneath it, and turning down as the leg to
leave through the bottom edge. The counter stays olive.

The proportions are his, traced from the artwork rather than chosen: the D is 61 wide by 56 high
(a little wider than tall, so the mark's box is 0.92em by 0.84em beside the wordmark rather than
square), the channel is 5.6/56 of the height, the bowl's outer radius 12.9 and inner 7.3. The
trace was laid over the artwork at 170px and compared; the two match.

## What was checked again

The same measurements as docs/42, because the mark's box changed shape:

- Header mark 33×30px at 1440px beside the 36px name; footer 26×24px in white. `currentColor`
  fill, no stroke.
- Signed out, as a customer and as staff at 390, 375, 360, 359 and 320px: no overflow. The three
  phone-header concessions from docs/42 carry the wider box without a further step.
- Favicon at 64, 32 and 16px, and on a dark tab bar: the R reads at 32 and above; at 16px it is a
  D with a cut, which is the honest limit of a mark this detailed at that size.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **A trace, not a vector original.** The artwork arrived as a raster and was measured, so
  the curves are my reconstruction of his. If he has the original vector, it should replace
  `design/realdistrict-mark.svg` directly; the paths in `app.js` and the favicon follow from it.
- **At 16px the R is lost.** The stem-as-edge design has less contrast at tab-icon size than the
  docs/42 cut. This is the mark Clent chose, so it stands; a simplified favicon glyph would be a
  separate decision.
- **D009 unchanged.** Brand availability for RealDistrict is still unchecked.
