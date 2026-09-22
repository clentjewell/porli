# The footer opens on the mark

22 September 2026, after docs/45. Two small asks from Clent: the footer should open on the logo
alone, a little larger, without the name beside it; and the tab icon in his browser was still the
old D-and-R mark.

## The footer

The footer's top-left wordmark is now the mark by itself at 44px (it was 24px beside the name).
The link keeps its accessible name, "RealDistrict home", so nothing changes for a screen reader.
The name is not gone from the footer: the sign-off below still sets it across the page, and the
copyright line carries it in words. Measured at 1440px and 390px: no overflow, the tagline and
links sit where they did.

## The tab icon

`public/favicon.svg` on the live site was already the parcel mark; Chrome was showing the copy it
cached under that address when the site first loaded with the D-and-R. Browsers hold favicons
far longer than pages. The link in `index.html` now points at `/favicon.svg?v=2`, a new address
that the cache has never seen, so the next load fetches the current file. If the mark changes
again, the number goes up again.

## What was checked

- Footer mark 44×44px, link text empty, `aria-label` present, at 1440px and 390px.
- `link[rel=icon]` reads `/favicon.svg?v=2` and the file at that address is the parcel mark.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **A browser that has already pinned the old icon** to a bookmark or a home-screen shortcut
  keeps it until that shortcut is remade; the cache-busting address only reaches ordinary tabs.
