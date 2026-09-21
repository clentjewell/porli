# Homepage redesign

21 September 2026. Clent's direction: the Porli website is the task, and the homepage should be
redesigned using the reference sites sent during the session. Four were reviewed — an interior
design template, a commercial property site, a real estate marketplace template and a
single-development landing page. What each contributed, and what was refused, is recorded below.

## The problem the audit found

The homepage was eight modules and 4,920px: hero, headline listing, values strip, featured
destinations, recently viewed, available homes, what Porli does, commercial, account.

Three things were wrong with that, and all three are visible in a full-page capture rather than
arguable:

- **The hero ended in dead ground.** Below the search card sat roughly 200px of empty sand before
  the fold. The photograph's subject is at the top of the frame; the bottom was filler.
- **Two modules did the same job.** The four-item values strip (Curated listings, Direct to the
  team, Save and compare, A more open market) and the numbered service steps below it both
  explained what Porli is for, 1,500px apart.
- **The account strip was 126px of nothing** — a heading, a line and a button, given a section of
  its own.

And a fourth, which the reference sites made obvious rather than the audit: the headline listing,
though second on the page, read as a content block rather than as the centrepiece docs/23 asks for.

## What changed

**The headline listing lifts into the hero.** GrandBlue now sits on its own panel that rises 150px
into the photograph above it, so the featured property physically breaks the hero's lower edge. The
hero gives back the dead band, loses its scroll cue and its caption — both redundant once the next
section is already on screen and named — and the panel carries the property's type and locality as
an eyebrow above the name.

This is the device the single-development landing page uses for its three value cards. Applied to
the featured property instead, it is the strongest available answer to "make GrandBlue the
unmistakable centrepiece" that does not require the hero copy to choose between the residential and
commercial framings, which docs/23 section 9 reserves for Clent.

On a phone the effect is larger than on a desktop: the panel now appears at the first screen,
where the headline listing previously began well below the fold.

**The values strip is gone.** Its one point not already made by the numbered steps — that sale
method, areas, zoning and tenancy are shown plainly — moved into the service paragraph. A module
removed, nothing lost.

**The account strip is gone.** Its button moved beside "How Porli works" in the service block,
where a reader has just been told what an account is for. A module removed, the path kept.

**The grid became every listing, with a working filter.** "Available homes" showed three
residential listings and linked away for the rest. It is now "Available properties": every
available listing except the headline one, which has the section above it, with type pills — All,
Apartment, House, Industrial / Warehouse, Offices — filtering in place.

The pills are built from the types actually present, so no pill can return an empty grid, and they
are hidden entirely when there is only one type. Filtering hides cards in the page rather than
re-fetching or navigating, so the back button is not involved and no state is lost. Each change is
announced through a `role="status"` region.

This is the marketplace template's one genuinely good idea, and it closes a real gap: the homepage
grid previously had no filter at all.

**Cards lead with the property, not the price.** The price carried `order: -1` in a column flex
container, so it printed above the name and larger — meaning the biggest text on the GrandBlue card
read "Price to be confirmed". The name is now 19px in the display face, with the price beneath a
hairline rule in the same footer position both reference sites use.

docs/28 deferred this as leaning on the positioning question. It is still reversible in one rule,
and it is recorded here rather than buried: if Porli should lead with price, restore `order: -1` on
`.card-title .price` and the old sizes.

Eight modules became five, at 5,063px — slightly taller than before, because the grid now carries
five listings rather than three.

## A bug found on the way

The phone hero's search field rendered 260px tall, with the control's rows floating in empty space.
It had `flex: 1 1 260px`, written for a row where the basis is a width. Below 700px the row becomes
a column, where the same basis is a height.

It was on the live site, not introduced here — confirmed by measuring both before making the change
rather than assuming. The phone hero is 200px shorter for the fix.

## What was refused, and why

From the marketplace template: a second property grid (padding), an agents section (Porli has one
team), testimonials, a blog, and "Trusted By Over 150+ Major Companies". Its cities carried the same
fabricated count four times, where Porli's destination profiles count the live catalogue.

From the single-development page: the build-stage tracker — GrandBlue is a trading hotel, which is
the first thing docs/24 has it say about itself, and a construction progress bar would assert the
opposite; the statistics band; the testimonial; the hero email capture, there being no mailing list;
and the partner logo strip.

The pattern is the same in both: these templates are built to look full in a screenshot. Porli has
six listings, one of them real, and nothing sold. Every one of those modules would have been a
claim with nothing behind it, which is what the honest-labelling guardrail exists to prevent.

Neither template's look was taken. Both are licensed commercial templates, and Porli keeps its
ivory and olive palette, its single typeface and its restraint.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. This is presentation over the existing
  `/api/properties` response.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls, no image without alt text. The card change is
  site-wide, so the search results and listing pages were walked with it.
- The overlap was measured, not eyeballed: the panel's top edge sits below both the search card and
  the popular locations row at 1440px, so it covers neither.
- The filter was exercised by clicking and by keyboard: correct cards shown for every pill, correct
  `aria-pressed` state, 40px targets, a visible 3px focus ring, and the status line announcing each
  change.
- Reduced motion on and off at both widths: nothing left below full opacity, no overflow.
- Cache-busting versions bumped together to 17.

## Limitations

- **The filter is one property type deep.** With five listings, three pills return a single card.
  It will read better with stock than it does now, and it is honest about what is there.
- **The second grid row is ragged.** Five cards in a three-column grid leaves a gap. Filtering
  changes the count anyway, so a fixed-count grid would fight the feature.
- **The hero copy is untouched.** "Homes to buy. / Property to invest in." still leads, because
  changing it means choosing between the residential and commercial framings. Flagged rather than
  guessed, for the fourth time.
- **The card hierarchy change is site-wide** and touches a question docs/28 reserved. Reversible in
  one rule, as above.
