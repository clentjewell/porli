# The logomark, replaced with Clent's parcel mark

22 September 2026, after docs/43. Clent sent a second piece of artwork and asked for the logo to
be updated to it. This record replaces the drawing in docs/43; placement and the phone-header
concessions from docs/42 still stand.

## The mark

Four blocks on a square, the right column rounded: two olive squares on the left, a pale olive
quarter-round top right, an olive quarter-round bottom right with a pale tail tucked under its
curve. It is the direction from the earlier parcel sheet, which was the only one of the first
rounds that survived 16px, now in Clent's own proportions. It is abstract rather than a letter,
so there is no R to lose at small sizes: at 16px it is still four blocks with a curve.

Traced from the artwork: the mark is 552px square in a 1240px image, so one unit is 5.52px. The
blocks are 47.1 wide with a 5.8 gap; the left column splits at 49.3 and 55.1, the right column at
43.5 and 49.3, so the right column sits a little higher than the left. The top-right radius is
43.5, the bottom-right corner radius 47.1, and the tail is a 10.9-wide strip whose right edge
follows the curve at a 5.8 offset.

## Two colours, by class

The docs/42 and docs/43 marks were one shape cut by a mask and took `currentColor`. This mark
is two shapes, so it carries two classes and the fills are set in CSS: `--olive` and `--accent`
on paper (the site's own tokens, not the artwork's sheet values), white and a mid green on the
footer's deep ground. The gaps are open, so whatever is behind the mark shows through them and
no mask is needed. The favicon is the same two shapes in paper and mid green on the deep olive
tile, scaled to 62 of the tile's 100 with the corner radius of 22 kept.

Source: `design/realdistrict-mark.svg`, olive and pale on a transparent ground.

## What was checked

- Header mark 30×30px at 1440px beside the 36px name; footer 24×24px. Fills read back as
  `#244d3e` / `#dce7dc` in the header and `#fff` / `#8fa899` in the footer.
- Signed out, as a customer and as staff at 390, 375, 360, 359 and 320px: no overflow. The mark's
  box is square again, so it is fractionally narrower than the docs/43 mark.
- Favicon at 64, 32 and 16px, and on a dark tab bar: reads at all three.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **A trace, not a vector original.** As with docs/43, the artwork arrived as a raster. If a vector
  exists it should replace the source file; the two paths in `app.js` and the favicon follow it.
- **The pale block is quiet on the header.** `--accent` on the near-white header ground is a low
  contrast pairing by design — it is the artwork's own relationship between the two greens — but
  it means the top-right block reads faintly at 16px on paper. On the footer and the favicon the
  mid green carries it clearly.
- **D009 unchanged.** Brand availability for RealDistrict is still unchecked.
