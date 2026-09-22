# The brand identity document

22 September 2026, after docs/55. Clent sent Jewell's brand identity document for another client
(Ultimate Labs, fourteen sections, every item marked confirmed or to be confirmed) and asked for
the same for RealDistrict. The six-section brand page from docs/47 and docs/54 becomes that
document, on the same site: **https://realdistrict-brand.clent.workers.dev**, with a PDF.

## The format, and what it is for

Twelve sections and two appendices: brand overview, brand story, logo system, colour, typography,
voice and tone, photography, positioning and naming, brand applications, supporting system,
layout and grid, guardrails; then the confirmed assets with their file paths, and the open
register. Every claim carries one of three marks: **confirmed** (traceable to a file in the
repository), **proposed** (drawn from how the site behaves, shown for sign-off) or **to be
confirmed** (listed in the register). The document's own rule is that it consolidates an identity
that exists and invents nothing; where there is nothing, it says so — there is no vision
statement, no monogram, no physical application, no print palette.

Taken from the reference: the structure, the three-state marking, the register with priorities,
the "for counsel, not design" line, screenshots of the real surfaces rather than mock-ups. Not
taken: its palette, type, dark cover and product-hero imagery — the four things the review of it
(earlier the same day) found working against its own rules.

## What the document records that was not written down before

- The mark's construction as numbers, and that it is a trace of raster artwork (B-07).
- The three lock-ups as live sizes, and that clear space is stated but not signed off (B-09).
- Six incorrect-usage rules, proposed, because none existed.
- That docs/03 still lists the original proposal palette while the live tokens are the standard
  (B-08). The document is the standard; docs/03 needs reconciling.
- The reference lines: eight sentences live on the site, as the calibration set for any new copy.
- The exact label strings, verbatim, and where each appears.
- The layout numbers: measure, gutters, six breakpoints and why the last three exist.
- The fifteen open items in one register, with B-02 to B-04 (brand availability, trading entity
  and focus, GrandBlue permission) marked highest because a public launch waits on them and none
  is a design decision.

## Built

`brand/public/index.html` and `brand.css`, written by hand: no script, no inline style, no request
leaves the site. Ten screenshots of the live surfaces in `brand/public/img/` (JPEG, 1.5× scale,
1.2 MB together), each in the asset register. A sticky contents column on desktop that becomes a
list on phones. A print stylesheet, from which the PDF is rendered (A4, 27 pages, 1.6 MB) and
served at `/realdistrict-brand-identity.pdf`.

## Verified

- Live at 1440px and 390px: `lang="en-AU"`, a title, fourteen parts, eleven images all with alt
  text and all loaded, no text pairing below its WCAG threshold, the display serif loaded, no
  request to any other host, no horizontal overflow.
- The PDF answers 200 at 1.6 MB with the images in it.
- The marketplace is untouched by this change.

## Limitations

- **The PDF is a committed build output.** It is rendered by hand from the HTML through headless
  Chromium and must be re-rendered after any change; brand/README.md says how.
- **Two copies of the tokens**, as before (docs/54).
- **Applications are screenshots of today.** They go stale silently when a screen changes; the
  register entries say to retake them.
- **No design-system diagram** for clear space; the rule is in words.
