# "A$" on GrandBlue's price; the land types as photo cards

23 September 2026, after docs/65.

## A$9,000,000

Clent asked for an "A" before the dollar sign on GrandBlue's price. A real listing priced in
Australian dollars now shows "A$". GrandBlue is in Thailand, so a bare "$" could be taken for
another currency. The rule sits in the one price formatter, so the card, the homepage headline and
the listing page all read "A$9,000,000". Fictional listings keep the plain "$". If Clent wants
"A$" everywhere, it is a one-line change.

## Browse land by type

Clent sent two formats for the homepage land section: a single-property gallery with side peeks
and arrows, and a row of city photo cards, each with a white label panel. The second was chosen.
It shows all four land types at once and needs no arrows. Each card maps to data we hold (a
picture, how many listings, the type name, a link), and it matches the destination cards above
it. The gallery suits the photographs of one property, which the listing page already does.

Each card is a 4:5 photograph with a white panel at the foot. The panel shows the listing count,
the type name and a round arrow that turns olive on hover or focus. The picture is the cover of
the first available listing of that type, so it always belongs to something the card leads to. A
type with no available listing shows a plain pale card. The one-line blurbs are dropped. The
cards run four across, two from 1000px and one on phones (4:3 there). Every panel is the same
height, even where a name runs to two lines.

## Verified

All 33 API tests pass. Measured at 1440, 1024, 800 and 390px: four equal cards and equal panels,
no overflow, no script errors. "A$9,000,000" shows on the homepage headline, the commercial card
and the listing. Highstreet Offices still shows "$1,850,000".
