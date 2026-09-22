# The brand page as its own site

22 September 2026, after docs/53. Clent asked for "Brand" to come off the website and for the
identity document to have a separate Cloudflare page of its own.

## What moved

The page built in docs/47 is now a static site at **https://realdistrict-brand.clent.workers.dev**:
the same six sections — mark, wordmark, colour with measured contrast, type, voice and
photographs, files — as plain HTML and CSS under `brand/public/`, deployed as an assets-only
Worker named `realdistrict-brand` (`brand/wrangler.jsonc`, `cd brand && npx wrangler deploy`).
It carries its own copy of the self-hosted display serif, the mark and the tile as SVG files, and
a favicon. No script, no database, no inline style, and no request leaves the site: measured, the
only host it loads from is itself. It is marked `noindex`. The header links back to the
marketplace, and the foot repeats the statement that the name is unchecked for availability.

"Cloudflare Pages" in Clent's words; in the account it is a Worker with static assets, the same
kind of thing as the marketplace and every other site there, which is what Cloudflare now
recommends for a static site. It lives in the same repository so the two stay in step.

## What went from the website

The `/brand` route, `brandView`, the footer link, the brand-only styles, and the public copy of
the mark that existed for the download link (the asset register entry with it; the design source
is untouched and the brand site publishes it). `/brand` on the marketplace now answers with the
usual not-found page. The route table in docs/04 loses its row.

## Verified

- Brand site at 1440px and 390px: no overflow, no console errors, the display serif loaded, six
  sections, nine swatches, five marks, no external hosts; the mark, tile, stylesheet and font
  answer 200 and an unknown path answers 404.
- Marketplace: `/brand` shows "This door doesn't open here", the footer reads Residential,
  Commercial, Saved homes, How it works, Contact, Team login. 30-route walk: 58 clean, the two
  expected not-found rows. Tests: 29 pass.

## Limitations

- **Two copies of the identity's styles** now exist — the site's tokens and the brand site's
  stylesheet — and they are kept in step by hand. A token change on the marketplace needs the
  same change in `brand/public/brand.css`.
- **The brand site has no password.** It says nothing the marketplace does not, and the marks are
  already public in the marketplace's favicon and header, so it is left open; it is `noindex`.
