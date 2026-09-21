# The property card

21 September 2026. Clent pointed at the card in the marketplace template and said it reads well.
It does, and the reasons are specific. Applying them exposed two defects in Porli's own card that
had been shipping unnoticed.

## Two defects found

**Every commercial fact carried the same map pin.** A card for Millrace Warehouse read
1,150 m² floor · 2,400 m² land · 12 cars · Leased investment, with an identical pin icon against
all four. A pin means location, and none of those is a location. The residential card beside it
used a bed, a bath and a car, which each mean something. Four repeated symbols implying a
distinction that is not there are worse than no symbol at all.

**The fact limit did nothing.** The card asked for `facts(p, 2)`. That argument was honoured only
for land listings: residential hardcoded three, and the commercial branch never received it and
returned as many as it found. So a card asking for two facts printed three or four. This is why
commercial cards were two rows taller than the houses beside them — four facts plus a sale-method
line against three facts and none.

## What was taken from the reference

- **The locality sits on the photograph**, bottom left with a pin, over a gradient. The pin is
  correct there, which it was not on the facts it used to decorate, and the body gains a row.
- **The body reads name, then facts, then a footer.** The name leads at 19px in the display face.
- **A footer row divided by a rule**, with the price right-aligned in its own slot. The template
  puts an agent's avatar and name on the left of that row. Porli has one team, not named agents, so
  the slot carries the listing's own label — "Fictional listing · Generated image", or when the
  listing is real, when it was listed.
- **The card is a panel**: white, hairline border, soft shadow, with the photograph inset and
  rounded inside it. Previously the card was flat on the page background and its photograph ran to
  the edge. This is the change that makes a card read as an object, and it matches the panel the
  headline listing now sits on (docs/33).

## What was not taken

The agent row, for the reason above. The blue. Square feet, where Porli uses square metres.
"Beds: 2" labelling, where "2 beds" is better English and the icon already says which.

## What else changed as a consequence

**Facts are capped at three, and commercial facts are reordered** to floor area, land area,
tenancy, car spaces. Tenancy previously sat behind car spaces, which is backwards for an investment
buyer: "Leased investment" is what they are scanning for, and car spaces on a warehouse is close to
noise. With the cap, tenancy stays on the card and car spaces move to the listing page, which shows
everything.

**The sale-method line is gone from cards.** It was the second of the two extra rows. The sale
method remains on the listing page and in the search filters, and the tenancy fact carries the
related information a card has room for.

**The photograph dots are gone.** With the locality now in the bottom-left band, the counter, the
arrows and a row of dots were three indicators of the same thing. The counter and arrows stay.

**"Price on request" is gone as a badge**, from cards and from the homepage headline panel. Both
now print the price label in a clear slot of its own, so a badge repeating it is exactly the
duplication docs/25 set out to remove — it had survived because the rule demoted it rather than
dropping it.

All cards in a row are now the same height, commercial and residential alike, which was the visible
symptom that started this.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px. The card is used on the homepage, both search sectors, the
  listing page's similar properties and the saved list, so this is a site-wide change: no
  horizontal overflow, no console errors, no failed requests, no broken images, no unnamed
  controls.
- Card heights measured per row: one distinct height across every desktop row on the homepage and
  both search sectors, where commercial cards were previously taller.
- The icons were checked by reading the rendered `path` data rather than by looking: three distinct
  paths per card, where commercial cards previously repeated one path four times.
- The locality overlay was tested for collision against the photograph counter on every card at
  both widths — none — and for truncation, with an ellipsis reserved and 74px kept clear for the
  counter.
- Reduced motion on and off at both widths.
- Cache-busting versions bumped together to 18.

## Limitations

- **The footer's left slot is a label, not a person.** The template's agent row gives that side of
  the rule a face and a name. Porli's equivalent is a line of small grey text, which is quieter.
  If the trading entity is ever settled and listings carry a named contact, that slot is where it
  belongs.
- **The locality overlay depends on the photograph's lower edge being calm.** A busy or pale
  bottom-left corner is handled by the gradient and a text shadow, but a photograph that is white
  in that corner will read less clearly than one that is not.
- **Car spaces no longer appear on commercial cards.** That is deliberate, and it is a real
  omission for anyone scanning for parking rather than tenancy.
