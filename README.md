# RealDistrict — working local marketplace

The application is now implemented in this folder. Run it with **Node.js 24 or later**:

```sh
npm start
```

Open **http://127.0.0.1:4173**. On Windows you can also double-click `START-PORLI.cmd`. There are no dependencies to install. Keep the server running while using the site.

Choose **Sign in → Explore as a customer** or **Open team workspace** to try the two sides of the local demo. These shortcuts are restricted to loopback. You can also create an ordinary password account using fictional details.

## What works

- A real headline listing, GrandBlue Resort & Beachclub in Thailand (price to be confirmed), featured on the homepage with highlight chips, a photo gallery, property details and a sticky enquiry card. Fictional concept homes remain clearly labelled; see [headline listing](docs/18-headline-listing.md).

- Responsive residential and commercial discovery (sale only), location, category, price, bedroom, bathroom, tenancy and floor-area filters, URL state, sorting and empty states.
- A homepage built to the September 2026 mockup: a full-page search-first hero, a headline-listing section with a photo carousel, a value strip and featured destinations, with scroll reveals, hover and focus feedback and full reduced-motion fallbacks (see [homepage redesign and motion](docs/22-homepage-redesign-and-motion.md)).
- Six locally stored Higgsfield-generated architectural images, a search-first homepage, interactive featured photographs, compact sticky header and expanded menu, consistent property grids and a keyboard-operated gallery, with reduced-motion support.
- Real local password authentication, secure password hashing, server-side sessions and separate customer/staff/admin permissions.
- SQLite-backed saves, one conversation per customer/property, idempotent messages, read markers, staff replies, private notes, assignment, stages, blocking and follow-ups.
- Inspection requests, staff-created times, capacity-checked confirmations, completion and cancellation.
- Listing drafts, image uploads, image ordering/cover selection, publication validation, preview, archive/restoration, availability and edit-conflict checks.
- Dashboard queries, contacts from enquiries, homepage copy editing and team access management.

## Verification

`npm test` runs the API integration suite. `npm run check` checks server, worker and browser syntax. A manual browser pass also covered desktop/mobile presentation, saving, customer messaging, staff replies and inspection confirmation.

## Hosting on Cloudflare

The application also deploys as a Cloudflare Worker (`porli`) with static assets and a SQLite-backed Durable Object; see [Cloudflare deployment](docs/17-cloudflare-deployment.md) for connecting the repository, the first administrator account and limits. `npm run cf:dev` runs the Worker locally on port 8788, and `PORLI_TEST_BASE=http://localhost:8788 npm test` runs the same test suite against it. The application logic is shared in `lib/porli.mjs`; `server.mjs` (Node.js) and `worker/index.mjs` (Cloudflare) are thin adapters.

## Data and operating limits

This is a **local concept with persistent workflows**, not a public production launch. All properties, prices, locations and imagery are fictional. Records persist in ignored `var/porli.sqlite`; uploaded images persist in ignored `public/uploads/`. Do not share those folders with real personal data in them.

Before public launch: choose hosting and operator/region details; add verified email, account recovery and notification delivery; review security/rate limiting, upload decoding/metadata stripping, backups and retention; supply authorised inventory and approved policies. Email is not sent. Maps load from Google only when a visitor chooses to show them; payments and external-agent publishing are outside this release. There is no automatic real-time refresh; inboxes have an explicit Refresh action. Uploaded files are signature/size checked; full server-side media processing remains a launch requirement. Reporting periods are rolling UTC windows, labelled by duration, rather than local calendar boundaries.

The server defaults to loopback and refuses non-loopback binding while demo shortcuts are enabled. `PORLI_DEMO=0` disables shortcuts and automatic demo seeding, but does **not** make the application production-ready. `.env.example` documents environment variables; export them in your shell if overriding defaults (the server does not auto-load `.env`).

See [implementation decision](docs/13-implementation.md), [verification record](docs/14-verification.md), [editorial redesign](docs/15-editorial-redesign.md), [Cloudflare deployment](docs/17-cloudflare-deployment.md), and [image provenance](design/asset-register.json).

---

## Original concept package

**Find your next place.**

RealDistrict is a residential property marketplace for buying and renting, with fixed listing templates, direct in-site conversations and a private team workspace.

Original package: concept and repository starter, version 1.0, 17 September 2026. The original archive supplied specifications and fictional fixtures; this folder now also contains the local application described above. The earlier GitHub prototype was not available in this workspace and has not been modified. RealDistrict is the selected working name; availability has not been checked.

## Start here

1. Read `START-HERE-ASTRA.md` for the repository creation and implementation brief.
2. Read `docs/01-product-brief.md` and `docs/02-scope-and-decisions.md`.
3. Use the remaining specifications as the source of truth.
4. Record changes and unresolved decisions rather than silently changing requirements.

## Contents

- `AGENTS.md`: guidance for coding agents.
- `docs/01-product-brief.md`: proposition, audience and operating model.
- `docs/02-scope-and-decisions.md`: approved direction, assumptions, deferred work and decisions.
- `docs/03-brand-and-design.md`: visual system, voice and reusable components.
- `docs/04-pages-and-journeys.md`: sitemap and end-to-end flows.
- `docs/05-listings-and-content.md`: fixed template, validation and publication rules.
- `docs/06-conversations-and-inspections.md`: inbox, follow-ups and bookings.
- `docs/07-data-and-permissions.md`: conceptual model and access matrix.
- `docs/08-dashboard-and-events.md`: unambiguous metrics and analytics.
- `docs/09-technical-brief.md`: implementation boundaries and proposed architecture.
- `docs/10-backlog-and-acceptance.md`: phased backlog and verification scenarios.
- `docs/11-launch-and-operations.md`: launch decisions, operational ownership and risks.
- `docs/12-decision-log.md`: decision history and template.
- `docs/17-cloudflare-deployment.md`: hosting on Cloudflare Workers and connecting the repository.
- `docs/18-headline-listing.md`: the real GrandBlue Resort headline listing, new listing fields and portal conventions.
- `docs/19-sale-only-and-commercial.md`: renting removed; residential and commercial sectors.
- `docs/20-location-and-maps.md`: listing location, click-to-load map, navigation links and directions.
- `docs/21-plan-on-a-page.md`: digest of the Jewell plan-on-a-page pack (V01, 18 September 2026); the original deck and page renders are in `docs/plans/`.
- `docs/22-homepage-redesign-and-motion.md`: the homepage rebuilt to the mockup, every interaction and animation, and the reduced-motion rules.
- `docs/30-display-typeface-and-hero-search.md`: the self-hosted display serif, the hero search fields and the motion effects.
- `docs/29-softer-surfaces-and-filter-pills.md`: the radius scale, filter pills on the search bar, and the Georgia fallback finding.
- `docs/28-mobile-design.md`: the phone pass: a sticky enquiry bar, results above the fold, sticky filters and 40px tap targets.
- `docs/27-imagery-pass.md`: the imagery audit: alt text stating its source on every listing image, register corrections, and why no new imagery was sourced.
- `docs/26-homepage-modules.md`: homepage destination profiles and the recently viewed strip, and why the proof strip and hero were left alone.
- `docs/25-search-results.md`: the marketplace search results: featured-first ordering, capped badges, sticky filter bar, card photo carousels and closed-listing states.
- `docs/24-grandblue-listing-page.md`: the GrandBlue listing page rebuilt for the handover: "Why GrandBlue", grouped features, document slots, inspection times and similar properties.
- `docs/23-handover-brief.md`: handover to Lizelle Vertera: where to work, guardrails, what to borrow from realestate.com.au, how to highlight GrandBlue, and imagery sourcing without Higgsfield.
- `wrangler.jsonc`, `worker/`: Cloudflare Worker configuration and adapter.
- `brand/`: the identity document as its own static site on Cloudflare (docs/54).
- `design/tokens.json`: proposed design values; contrast must be validated in use.
- `content/site-copy.md`: starter interface copy.
- `data/demo-properties.json`: eight fictional properties for UI development.
- `prompts/higgsfield-images.md`: image direction and generation prompts.
- `.github/`: issue and pull-request templates.
- `MASTER-BRIEF.md`: combined readable reference; individual documents are canonical.

## Prototype defaults

English (British), Australian-style fictional locations, AUD, square metres and Australia/Sydney display time zone are fixture assumptions only. They are not confirmed launch decisions. The first product serves one operating organisation; only staff publish listings.

## Repository use

Suggested repository name: `porli`. Prefer a private repository until ownership, content rights and launch settings are settled. Add application code after checking the target environment and documenting the stack choice. Never commit credentials or real personal data. No software licence is granted or selected by this starter.
