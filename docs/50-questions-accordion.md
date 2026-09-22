# Questions as an accordion, badges gone, rules gone

22 September 2026, after docs/49. Three asks from Clent on How it works: remove the lines, ask
whether "Reading a listing" belongs on a page a client would read, and set "Common questions" in
the accordion format of the reference he sent.

## The lines

The rule above each section on How it works and on the brand page, and the one above the
closing call, are gone. The sections now separate by spacing and by the pale account band.

## "Reading a listing"

Clent's question was whether it is necessary on a real website for clients. It is not. A client
learns what "Under offer" means the first time they see it, and the fictional and supplied-photo
labels are on the listings themselves, where they matter (docs/27). The section explained the
site to itself. Two of its four items carried something a client might actually ask, and they
moved into the questions: "Are the properties real?" now also says how real properties are
shown and that unknown figures are stated as unknown, and "What do 'Under offer' and 'Sold'
mean?" is a question of its own. "Featured" did not need explaining.

## The accordion

docs/48 argued for six answers in the open; Clent chose the accordion from the reference, and
that is his call. It is built as native `details` and `summary`: one tonal card per question on
the pale colour, the open one on white with a soft shadow, a plus in a circle that becomes a
minus on olive. The first question is open when the page loads so the format is obvious. Native
disclosure means the keyboard and screen readers get it without any script: Tab reaches each
question, Enter or Space opens it. The answer arrives with a short fade and rise — opacity and
transform, nothing else — and not at all under reduced motion. Seven questions, one more than
before, from folding the badge section in.

Not taken from the reference: the dark ground, the gradient heading, the purple link.

## A defect found on the way

The section rule `padding:38px 0 46px` was written as a shorthand and so set the sections' side
padding to nothing, overriding the `.wrap` gutter it sat inside. Since docs/47 every section on
How it works and on the brand page had been sitting 48px further left than the rest of the
page on a desktop, and flush against the screen edge on a phone. The paddings are now longhands
and the sections measure at the same left edge as everything else: 83px at 1440px, 20px at
390px, on both pages.

## What was checked

- Rules: `border-top-width` 0 on every section of both pages.
- Accordion: seven items, first open; focusing the second and pressing Enter opens it; no
  errors. Works at 1440px and 390px.
- Left edges as above; no overflow. 30-route walk: 58 clean. Tests: 28 pass.
