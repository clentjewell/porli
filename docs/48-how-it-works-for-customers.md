# How it works, written to the customer

22 September 2026, after docs/47. Clent asked for the "How it works" page to be fixed: it should
be a client-facing page about how the website works. The docs/47 version was accurate but read
like documentation of the system — "what the team does", "what this site is, today" — and
addressed nobody in particular. This version is written to the person using the site.

## What changed

- **An opener with a photograph.** Heading, a three-sentence promise in the second person, two
  actions, and the Courtyard House veranda beside them, captioned as a fictional concept
  listing. The image keeps its own 4:3 ratio; the width and height attributes reserve space
  before it loads and `height:auto` lets the ratio take over once it has.
- **Three large sections instead of five cards: Find, Ask, Visit.** Each has a paragraph that
  says what you do and what happens, and three short points that answer the practical
  questions (do I need an account, does my shortlist survive a sale, is a request a booking).
  Every claim maps to something the site does; nothing was written that the account pages
  do not deliver.
- **Your account**, on the pale ground: four cards that are the four account pages, each
  linked. A signed-out visitor who follows one meets the sign-in prompt, which is the site's
  normal behaviour.
- **What the badges mean**, kept from docs/47 but shortened.
- **Common questions**, six of them, replacing the "what this site is, today" section. The
  concept disclosures did not go: "Are the properties real?" answers it plainly, and "How do I
  get in touch about something else?" says there is no telephone or email. The header strip and
  the terms page still carry the fictional-listings statement on every page.
- **A close** with the two sector actions.

The section on what the team does behind each listing is gone as a section; its substance is in
"Who am I talking to?" and in the Ask and Visit copy. A customer does not need a paragraph on
the fixed listing template.

## What was checked

- 1440px and 390px: no overflow, no console errors, every reveal arrives, title set.
- Heading order H1, H2 ×3, H2 with four H3s, H2, H2, H2; nine links, all to pages that exist;
  thirteen keyboard focus stops in the main region, in reading order.
- Opener image alt states its source ("Generated concept image.") and renders at 4:3.
- 30-route walk: 58 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **The account cards link to pages that need sign-in.** That is the site's existing behaviour
  and the page says an account is needed, but a visitor can still be surprised by the prompt.
- **One photograph, and a fictional one.** The real property's photographs are GrandBlue's, and
  using them to illustrate "how it works" would put a real hotel next to generic copy. The
  fictional house is labelled as such in the caption and the alt text.
