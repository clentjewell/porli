# Elmshore Gateway aerial; the sector switch

23 September 2026, after docs/64.

## Elmshore Gateway, Lot 3: an aerial

It was the only available land listing without an aerial. It now uses a wider crop of the same
openly licensed Wikimedia Commons panorama as its cover ("Aerial panorama of Williams Landing",
Bob T, CC BY-SA 4.0). The cover is the close view of the graded lot. The aerial shows that lot
beside the boulevard, with the freeway and the suburb beyond, which fits the listing's "highway
exposure". The file is `aerial-elmshore-gateway.webp`, 1536 × 1024. Its caption credits the
photographer and licence, its alt text ends "Openly licensed photograph.", and it is in the
asset register. As a share-alike image, the crop carries the same licence. No Higgsfield credit
was used.

## The Land / Commercial switch on the homepage

The dark thumb is always half the switch's width, but the two buttons were each sized to their
label. "Land" is much shorter than "Commercial", so on Land the thumb ran past its label and
crowded "Commercial". The switch is now a two-column grid of equal columns, both the width of the
longer label. The thumb now covers exactly the selected button: 130px each on desktop, 161px each
on a phone, in both positions. It went unnoticed when the labels were "Residential" and
"Commercial", which are close in length.

## Verified

All 33 API tests pass. Measured locally and on the live site at 1440, 1024 and 390px: the thumb and
the selected button share the same left edge and width in both positions, with no overflow. The
Elmshore Gateway aerial slot shows the new image and its credit.
