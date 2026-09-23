# Orchard Lane: a picture supplied by Clent

23 September 2026, after docs/61. Clent sent an aerial photograph of a built-out housing estate
for Orchard Lane Subdivision. He also sent pictures for Saltmere Valley Acreage, Cedar Ridge,
Fernwick Estate Lot 12 (two) and Harbour Road Development Site, but those arrived while work was
running and never reached the session's disk. They are not on the site, and he has been asked to
send them again.

## What changed

- **Orchard Lane Subdivision** uses the picture twice. The cover is a 3:2 crop and the aerial
  slot holds the whole portrait frame. The Commons photographs it replaces (docs/61) are gone.
- **A fourth kind of image.** A photograph Clent supplied, of a real place elsewhere, with no
  recorded source or licence. Its alt text ends "Reference photograph supplied by the team." and
  the server leaves that ending alone. The card reads "Fictional listing · Reference photograph".
  The listing page says "Reference photograph of a real place elsewhere, supplied by the team,
  used to illustrate a fictional listing". The caption credits the team.
- **Register.** Both files are in `design/asset-register.json` with `fictional: false`. The
  source is marked not recorded and the rights are marked not established, for Clent to confirm.
- **One sync migration replaces the two in docs/61.** Every fictional land row that no staff
  member has saved (version 1) follows the fixture's current pictures, plans and description.
  An edited row is never touched. It is proven stable across restarts, so the next pictures Clent
  sends need only a fixture change.
- **The aerial slot fits portrait images.** Images are capped at 720px tall and centred, and fill
  the width on phones. A default 40px figure margin that had narrowed every plan image is removed.

## Limitations

- **Resolution.** The supplied file is 577 × 867, so the cover is stored at 577px wide. It is
  sharp on cards and soft in the full-width gallery. A larger original would fix it.
- **Rights are unknown.** The file carries no source. Before a public launch it needs the same
  confirmation as GrandBlue's photographs (B-04).
- **Four listings still wait** for the pictures that did not arrive.
