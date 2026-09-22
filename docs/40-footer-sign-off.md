# The footer sign-off

22 September 2026. Clent sent a reference footer and liked how it ends: the name set very large
across the foot of the page, fading into a dark ground.

## What the footer was ending on

A 224px strip: wordmark, tagline, six links, a copyright line and a currency note, on the same pale
ground as the page above it. Nothing wrong with any of it, but the page stopped rather than ended.

## What was taken

The oversized name as a closing device, and the gradient that dissolves it into the ground. The
footer is now a deep olive panel — the palette's existing `--deep`, not the reference's black —
with the name in ivory fading downward.

It is decoration. The footer already carries the wordmark as a link at the top, so the large
setting is hidden from assistive technology rather than announcing the name a second time.

At 1440px it sets at 214px and spans the page's own measure rather than bleeding to the viewport
edge, which keeps it on the same grid as everything above it. It scales down to 49px at 320px.
"RealDistrict" is twelve characters where the reference's name is six, so the letters are about
half the size at the same width — still the same presence, less monumental.

`background-clip: text` carries the gradient, with a flat olive fallback behind `@supports` for
anything that does not support it. No image, no script.

## The wordmark above it shrank

With the name set large at the foot of the panel, the wordmark at the top of the footer was a
second statement of the same thing, at 45px. It is now 28px, and 24px on a phone — a label above
the links rather than a headline.

It also still carried `letter-spacing: -3px`, tuned for the five-character name the site had
before. That is now proportional, matching the header.

## What was refused, and why it matters here

The rest of that footer was four columns: a postal address, a telephone number and an email; a
"Chat With An Expert" card with a photograph and a green "Online now" dot; a newsletter signup; and
five social icons.

None of it was taken, and this is not a style judgement. **RealDistrict's own contact page says, in
plain words, "There is no live agency telephone number, email service or physical office attached
to it."** An address and a phone number in the footer would contradict a page on the same site. The
expert card would invent a person and claim they are available now. The newsletter would collect
addresses with nothing behind it, which the brief forbids. The social icons would be five controls
linking to accounts that do not exist — the "silently inert control" the definition of done rules
out.

Stripped of those, what the reference has left is the columns RealDistrict already had. So the
change is the sign-off and the dark ground, and nothing else.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The sign-off measured at 1440, 1024, 768, 430, 390, 360 and 320px: it fits inside the viewport at
  every width, with no horizontal overflow anywhere.
- **Contrast checked against the new dark ground**, which is the real risk in inverting a panel.
  Every distinct text colour in the footer was read from the rendered page and measured: 12.19:1
  for the wordmark, 8.14:1 for the navigation, 9.65:1 for the legal links and 6.87:1 for the
  tagline and copyright, against thresholds of 4.5:1 and 3:1. All pass WCAG AA. Re-measured after
  the wordmark shrank, since a smaller size raises the threshold it has to clear.
- 28 routes walked at 1440px and 390px; reduced motion on and off.
- Cache-busting versions bumped together to 28.

## Limitations

- **The name is the least verified thing on the site.** D009 — brand availability — is still open:
  nobody has checked whether RealDistrict is free as a company name, a domain or a trade mark. This
  change sets that name 214px tall across the foot of every page, which is the most emphatic
  possible statement of it. One value reverses it, so the cost is low, but the emphasis is real.
- **It is a text setting, not a logotype.** A drawn mark would sit better at this size.
- **The footer is now 469px at desktop**, up from 224px. That is the price of an ending.
