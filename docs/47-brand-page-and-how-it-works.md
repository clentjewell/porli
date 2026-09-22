# The brand page and "How it works"

22 September 2026, after docs/46. Two asks from Clent: turn the identity work into a branding
document on the Cloudflare site, and make "How RealDistrict works" a proper how-it-works page.

One correction of terms first. The site is a Cloudflare Worker, not a Cloudflare Pages project
(docs/17 explains why: Pages cannot hold the database or sessions). Both pages are routes in the
same application, served from the same Worker at the same address; nothing new was deployed.

## /brand

The identity as it is built into the site, in six parts: the mark on paper, on deep olive and as
the icon tile, with construction, colour and size rules; the wordmark and its two lock-ups
(header with the name, footer with the mark alone) and how the name is written; the nine colour
tokens with the contrast ratios of the pairings the site uses; the two typefaces and what each
is for; voice, labelling and photography rules from docs/03; and the two SVG files for download.

The marks on the page are the same inline SVG the header uses, so the page cannot drift from the
site. The colour chips are classes, one per token, because the Content Security Policy forbids
the style attribute (an inline `style="background:…"` would be blocked). The mark's source is
now also published at `public/assets/realdistrict-mark.svg` for the download link, and is in the
asset register.

The page ends on a plain statement that this is the working identity of a concept and that the
name has not been checked for availability as a company name, domain or trade mark (D009). A
brand page without that line would be claiming something nobody has established.

## /how-it-works

The old about page was three paragraphs. The new page is four sections: what a buyer does, in
five numbered steps that match what the site actually does (browse without an account, save
with one, one conversation per property, an inspection request that is confirmed rather than
booked, and everything arriving in the account); what the team does behind each listing; what
the labels on a listing mean, including that transaction status is separate from publication;
and the plain statement of what the site is today, which carries the concept disclosures the
about page used to hold rather than dropping them.

`/about` still works: it rewrites itself to `/how-it-works` in the address bar and renders the
same page, so the old links in the explore menu, the footer and the homepage service module were
all changed to the new address and the new label, "How it works".

## What was checked

- Both routes at 1440px and 390px: no overflow, no console errors, every reveal arrived, titles
  set (`Brand — RealDistrict`, `How it works — RealDistrict`). `/about` lands on `/how-it-works`.
- Step cards five across at 1440px and one column at 390px; colour chips seven across and two.
- The download files answer 200 and the mark file matches the design source byte for byte.
- 28-route walk grown to 30 routes: 58 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **The contrast figures are computed, not certified.** They are WCAG 2.x ratios for the exact
  hex pairs; the page says "measured", which is true, and does not claim conformance.
- **The type samples show whatever sans the visitor's platform has.** On a machine without Segoe
  UI Variable, the sans sample sets in Arial or the system face, so the page describes the stack
  rather than promising a look.
- **No clear-space diagram.** The rule is stated in words (a quarter of the mark's width); a
  drawn diagram would be the next step if the page is shown to a designer.
