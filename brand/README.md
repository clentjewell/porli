# RealDistrict brand identity

The identity document as its own static site on Cloudflare, separate from the marketplace
(docs/54, docs/56): fourteen sections in the Jewell brand-document format, every item marked
confirmed, proposed or to be confirmed. Plain HTML and CSS in `public/`, the self-hosted display
serif, the mark and tile as SVG, screenshots of the live surfaces in `public/img/`, copies of the
site's fourteen listing images in `public/img/library/` for the photo library (docs/58), and a PDF
of the whole document. No script, no database, no third-party requests.

Deploy: `cd brand && npx wrangler deploy` (uses the account's Cloudflare credentials). The Worker
is `realdistrict-brand`; assets only.

The PDF (`public/realdistrict-brand-identity.pdf`) is rendered from `index.html` with the print
stylesheet, A4, through headless Chromium (`page.pdf` in Playwright). Re-render it after any
change to the document; it is committed because the site serves it.
