# Land, made investment-focused

23 September 2026, after docs/67. Clent restated the last line of his Land brief: the overall
design should feel professional, investment-focused and consistent with the existing RealDistrict
interface. An audit of the live Land page and a land listing against that line found five gaps.
All five are closed.

1. **The sale method appeared twice on unpriced cards** ("Tender" in the facts and again as the
   price). The facts row now shows the sale method only when a price or label fills the price
   slot. Unpriced cards read land size, zoning, then the sale method once, in the price position.
2. **No price per area.** Investors compare land by the rate, not the headline figure. A priced
   land listing now shows its rate under the price on the card, and as an overview tile on the
   listing page. The rate is per m² below 1 ha and per hectare from 1 ha up: Fernwick Lot 12 is
   $344/m², Cedar Ridge $57,143/ha. It is derived only from a stated price and a stated area, so a
   listing without either shows none. Nothing is estimated.
3. **No way to order by size.** The API accepts `sort=size-desc`, and the Land page's sort menu
   offers "Land size: largest first". Commercial keeps its four sorts.
4. **Frontage was buried** in the details table. It is now an overview tile on the land listing,
   beside type, land area, zoning, sale method and rate, and the table no longer repeats it. The
   overview's land area uses hectares from 1 ha up, matching the card: "42 ha", not
   "420,000 m²".
5. **A bare heading.** "Land." now has one line under it: "Development sites, commercial and
   industrial land, rural land and subdivisions, with land size, zoning and sale method on every
   listing." Commercial gets its own equivalent line.

The look is unchanged: the same cards, type, palette and spacing as the rest of the site.

## Verified

34 API tests pass, including a new one for the size sort. Checked locally and on the live site at
1440px and 390px: no overflow and no script errors. The rates appear on the two priced land cards
and their listing overviews. Unpriced cards show the sale method once. The size sort orders Cedar
Ridge, Saltmere Valley, Orchard Lane, Fernwick and Harbour Road.
