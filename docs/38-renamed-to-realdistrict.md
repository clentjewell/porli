# Renamed to RealDistrict, and the bare dividers removed

21 September 2026. Two instructions from Clent in one message: remove the hairline rules that made
the page look machine-assembled, and change the product name from Porli to RealDistrict.

## The name

The name was on the list of things docs/23 reserved for Clent, alongside the trading entity, the
revenue model and the commercial-or-residential question. This is Clent making that decision, which
is the path the guardrail describes, so it is recorded here rather than flagged back.

It supersedes **D001** ("Working name Porli"), which had stood since the first day.

**What it does not settle.** D009 — commercial model and brand availability — is unchanged and
still open. Nobody has checked whether RealDistrict is available as a company name, a domain or a
trade mark, any more than Porli was. The rename moves the same unanswered question to a new word.

## What was renamed

Everything a visitor or a staff member reads: the wordmark, page titles, the meta description,
navigation and footer, the about and contact copy, the enquiry card, error and empty states, the
staff-area message, and the seeded property text that ends "to be confirmed with the RealDistrict
team".

Because the production database is a Cloudflare Durable Object that is never rebuilt, the seeded
text was already stored under the old name. A migration rewrites the prose columns of `properties`,
`users` and `settings` on every start. It is idempotent by construction: once the old name is gone,
each replacement is a no-op. Only prose is touched — ids, slugs and image paths keep the names they
were created with.

## What was not renamed, on purpose

- **The address.** The site is still served from `porli.clent.workers.dev`. Renaming the Worker
  changes the live URL and takes the old one out of service, which is a deployment decision rather
  than a design one. Flagged for Clent.
- **The repository, the package name, `lib/porli.mjs`, `createPorli`, the CSS class prefixes and
  the database identifiers.** These are internal names nobody reads, and changing them is churn
  with a real chance of breaking the deployment. They can be renamed in their own pass if wanted.
- **The dated change records in `docs/13` to `docs/37`.** They describe what was decided on a given
  day under the name in use at the time. Rewriting them would falsify the record. This document and
  the decision log are where a reader learns the current name.

## Two defects the longer name exposed

Both were regressions caused by the rename, both confirmed against the live site before fixing, and
neither would have shown on the desktop screenshots.

**The header overflowed on small phones.** Twelve characters where there were five. At 390px the
page ran 50px past the viewport, and 61px at 360px. The wordmark drops from 43px to 36px and takes
proportional tracking rather than a fixed −3px, which was tuned for a short lowercase word; below
420px the header tightens further. Below 360px the two inline sector links give way to the explore
menu beside them, which carries the same destinations — this narrows the claim in docs/28 that they
are visible at every width, to 360px and above. Measured clean from 1440px down to 280px.

**The staff workspace overflowed at 390px, on all eight pages.** The header's account button prints
the first word of the signed-in user's name, and the bootstrap administrator was called "Porli
administrator", so the rename made that first word "RealDistrict" — the brand, printed twice in one
header, 30px past the edge.

Two fixes, because one would not have been enough. The button is now capped and truncates, so no
name can do this again whatever it is. And the bootstrap display name became "Site administrator",
in the seed and by migration for both old spellings, because a user called after the product was
always going to read strangely beside the wordmark.

## The bare dividers

Measured rather than hunted: every border on the homepage was read from the rendered page and
sorted by width. Two were full-page hairlines belonging to no component — `.market-listings` above
the property grid, and the top and bottom of `.market-service`. Each separated two areas that were
already the same colour, with the page's own spacing between them.

Both are gone. Every remaining rule belongs to something: a card footer, a facts list, a chip, a
button, the headline panel's outline. The service section keeps its tinted panel, which separates
it without needing a line drawn round it.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px. The walk is what caught the staff-workspace regression: it
  reported ten routes needing a look where two is the steady state, and all eight extra were admin
  pages at 390px.
- Header measured at 1440, 768, 430, 390, 360, 359, 320 and 280px: no overflow at any width, and
  the explore menu present at all of them.
- The rename migration tested the way it will actually run: the old name was written back into an
  existing database, the server restarted, and the text read back. Prose and the administrator's
  name were both rewritten.
- Borders re-read from the rendered page: no bare full-width rules remain.
- Reduced motion on and off at both widths. Cache-busting versions bumped together to 24.

## Limitations

- **The live address still says the old name**, which will read oddly until the Worker is renamed
  or a domain is attached. That is the most visible loose end.
- **Brand availability is still unchecked**, as it was for Porli.
- **The wordmark is a text setting, not a logotype.** A twelve-character name in a tightly tracked
  sans is a placeholder; it held up at every width tested, but a real mark would be drawn.
- **The historical documents still say Porli**, deliberately, which means a reader who opens
  docs/24 before this one will meet the old name with no signpost until they reach the decision log.
