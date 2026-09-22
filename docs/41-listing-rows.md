# Rules off the listing rows, and a table that repeated itself

22 September 2026. Clent pointed at the Property details table and asked for its rules gone on
every listing page. Measuring the page to find them turned up something worse.

## The rules

Every border on a listing page was read from the rendered page. Four were hairlines drawn between
rows of the same colour: the details table's row rules, the rule above the documents list, the
rules between document rows, and the divider above the similar properties. All four are gone;
spacing separates those rows now.

What remains belongs to something: the overview grid's own frame, the enquiry card, buttons,
property cards, the card footers and a link underline.

## The table repeated the tiles

The overview grid added the day before prints the listing's structured fields. Where staff had also
typed the same fact into the free-text details list, the table beneath repeated the tiles row for
row.

On Millrace Warehouse and Highstreet Offices that was **every single row** — Floor area, Land area,
Zoning, Tenancy, Car spaces, all five already tiles directly above. The details table now drops any
row whose label the overview already shows, and hides entirely when nothing is left.

This was checked against the data rather than the rendering, because a table disappearing is the
kind of change that can quietly lose information:

| Listing | `details` held | Table now |
|---|---|---|
| Millrace Warehouse | the five labels above | hidden — all five are tiles |
| Highstreet Offices | the same five | hidden — all five are tiles |
| Veranda House | empty | hidden, as before |
| Garden Apartment | empty | hidden, as before |
| Courtyard House | empty | hidden, as before |
| GrandBlue | Beach, Airport, Bangkok, Property, Address, Rooms, Land and floor area, Pattaya, Rayong city, Koh Samet | all ten kept |

Nothing is lost. The three houses never had a details table — their `details` list is empty — so
for them this changes nothing at all. The two commercial listings lose a block that said what the
tiles had already said. GrandBlue, whose details are genuinely different facts, keeps all ten rows.

That duplication was introduced by the overview grid, so it is a defect of that change rather than
a pre-existing one.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- All six listings checked at 1440px and 390px: zero overlap between tiles and table rows
  anywhere, the enquiry card present on every one, no horizontal overflow, no console errors.
- The underlying `details` field read from the API for each listing to confirm what a hidden table
  had contained.
- Borders re-read from the rendered page: no row rules left, only component edges.
- 28 routes walked at both widths.
- Cache-busting versions bumped together to 30.

## Limitations

- **The match is by label text.** A listing whose details say "Floor Area (approx)" where the tile
  says "Floor area" would show both. The comparison is trimmed and case-insensitive, but it is not
  fuzzy, and it cannot be: guessing that two differently worded labels mean the same fact is how a
  listing ends up hiding something it should show.
- **Staff can still type a duplicate** into the details field and see it disappear from the page
  with no explanation in the editor. The editor does not warn that the overview already covers a
  field.
