# RealDistrict brand page

The identity document as its own static site on Cloudflare, separate from the marketplace
(docs/54). Plain HTML and CSS in `public/`, the self-hosted display serif, the mark and tile as
SVG. No script, no database, no third-party requests.

Deploy: `cd brand && npx wrangler deploy` (uses the account's Cloudflare credentials). The Worker
is `realdistrict-brand`; assets only.
