# Handover brief: Porli concept

20 September 2026. This brief hands the Porli concept to Lizelle Vertera to take further. The aim is simple: make the concept as good as it can be, borrow presentation ideas from realestate.com.au where they help, and make GrandBlue Resort & Beachclub (https://grandbluethailand.com/) the unmistakable centrepiece of the site. Read this document first, then the two documents it points to most: `docs/18-headline-listing.md` and `docs/22-homepage-redesign-and-motion.md`.

## 1. What Porli is today
- A working residential and commercial property marketplace, sale only, run by one operator. Buyers search, save a shortlist, enquire and request inspections; staff publish listings and answer in-site conversations.
- Live at https://porli.clent.workers.dev (Cloudflare Worker, deploys automatically from `main`).
- One real listing, GrandBlue Resort & Beachclub in Mae Phim Beach, Rayong, Thailand, price to be confirmed. Everything else is fictional concept stock, labelled as such on every card and page.
- The name "Porli" is a working name (decision log D001, D009). Naming options were explored in September 2026 and remain a business decision.

## 2. Where to work
- Repository: https://github.com/clentjewell/porli
- Branch: `claude/elegant-ride-9zox11`. It is currently level with `main`. Commit there, open a pull request to `main`, and merging deploys the Worker. Cloudflare builds pull requests too but produces no preview site (see `docs/17-cloudflare-deployment.md`).
- Run locally with Node 24: `npm start`, then open http://127.0.0.1:4173. Demo sign-ins are shown on the sign-in dialog when `PORLI_DEMO=1` (the default locally). `npm run check` and `npm test` must pass before every push.
- No build step, no dependencies: `public/app.js` (marketplace, account and admin views, one function per line), `public/experience.js` (homepage and motion), `public/styles.css` and `public/experience.css`. The application core is `lib/porli.mjs`; the Worker adapter is `worker/index.mjs`.
- Verification harness: headless Chromium screenshots at 1440px and 390px. The scripts used so far live outside the repository; recreate them with Playwright (`/opt/pw-browsers/chromium` on the shared runner) or check by hand in a browser. Every page must show no console errors and no horizontal overflow at 390px.

## 3. Guardrails that must survive any redesign
- **Honest labelling.** Fictional listings say "Fictional listing · Generated image". GrandBlue says "Photographs supplied by the property. Price to be confirmed." Never invent a price, a room count or an area. Facts come from the property or the client, and go into the listing through the admin editor.
- **Content Security Policy.** No inline scripts, no inline `style` attributes, no third-party scripts or fonts. Google Maps frames are the only external content allowed. Clicks are wired with `data-action` attributes.
- **Motion rules.** Animations are transform and opacity only, and everything works with `prefers-reduced-motion: reduce`. See docs/22 for the full table.
- **Accessibility.** Every control has a name, focus rings stay visible, tap targets are at least 40px on phones.
- **British English** throughout, one typeface, ivory and olive palette (`--paper #f7f4ec`, `--ink #242a24`, `--olive #485a42`, `--pale #e7ebdd`, `--line #d8d9cf`, `--clay #91432f`), no luxury language.
- **Image provenance.** Every image in `public/assets/` is recorded in `design/asset-register.json` with its source and whether it is fictional. Keep that register current.

## 4. Borrow from realestate.com.au, with judgement
The reference is a portal; Porli is one operator's shopfront (docs/21 explains why that matters). Borrow presentation, not the business model. Conventions already adopted are listed in docs/18. Worth adding or improving next:
- **Search results.** Map and list toggle, sticky filter bar, "Save search" (needs email, which is not built yet), result count and sort in one line, listing cards with photo carousel, agent-style branding strip (here: the Porli team), and clear "under offer" and "sold" states.
- **Listing page.** Photo strip with "See all N photos", key facts row directly under the title, "Property features" grouped by outdoor/indoor/other, a floor plan slot, an inspection times block, a "Get in touch" card that stays visible, and a "Similar properties" strip with the same card as the grid.
- **Homepage.** Keep the search-first hero. Consider a "Recently viewed" strip (local storage only, no account required), a suburb profile module for the three featured destinations, and a "Sold and under offer" proof strip once there are results to show.
- **Trust signals.** Clear photo counts, dates ("Listed 3 days ago"), a visible reply-time promise once the enquiry loop is closed (docs/21, plan 03).
- Do not copy their palette, typography, logo style or copy. Layout ideas and information hierarchy only.

## 5. Highlight GrandBlue everywhere it makes sense
GrandBlue is the only property that can actually be sold, so the site should make it impossible to miss:
- **Hero.** Three GrandBlue photographs already crossfade behind the search. Keep the property credit visible.
- **Headline listing section** under the hero: carousel, price line, sale method, facts, highlights, View and Enquire. Add a short "Why GrandBlue" paragraph drawn from the property's own site (oceanfront on Mae Phim Beach, oversized pool and beachclub, restaurant, bar and conference centre, about two hours from Bangkok, green-resort systems). Keep every claim traceable to https://grandbluethailand.com/.
- **Listing page** `/properties/grand-blue-hotel-thailand`: this is the page to perfect. Full gallery (six photographs now; more can be added from the property's public gallery with permission), the details table, investment highlights, the click-to-load map and directions (docs/20), and a viewing request. Add an "Information memorandum" download slot as soon as the property supplies one (docs/21 lists it as a gap).
- **Commercial section and destination cards.** Thailand already links to the commercial listings; GrandBlue is the only result. Consider a dedicated "Thailand" destination page that tells the GrandBlue story with the map, travel notes and a single enquiry call to action.
- **Facts to confirm with the property** before any of this is public: price or price guide, room count, land and floor area, sale terms, and written permission for the photographs (decision log D013; plan 04 in docs/21).

## 6. Sourcing imagery without Higgsfield
Higgsfield credits are exhausted, so no new generated imagery for now. Options, in order of preference:
1. **GrandBlue's own photographs**, from the property's public gallery, with the client's authority as listing owner and written confirmation filed before launch. Resize to 1536 × 1032 WebP (the existing six were produced with `sharp`), name them `grand-blue-<subject>.webp`, and add each one to `design/asset-register.json` with `fictional: false` and the source URL.
2. **Existing generated assets** in `public/assets/` (courtyard, apartment, townhouse, veranda, highstreet-offices, millrace-warehouse). They can be re-cropped for new placements; record any derivative in the register.
3. **Openly licensed photography** (Unsplash, Pexels, Wikimedia Commons with a compatible licence) for destination or mood imagery only, never presented as a listing photograph. Record photographer, source URL and licence in the register, and prefer images that match the ivory and olive palette (coastal light, timber, foliage, sand).
4. **Own photography** if the team travels to Rayong. Brief: wide establishing shots at golden hour, the beach looking back at the resort, the pool edge, interiors with natural light, and details (timber, textiles, signage) for the hero and destination cards.
Alt text describes the subject and states the source ("photograph supplied by the property" or "generated concept image").

## 7. Suggested order of work
1. Read docs/18, docs/21 and docs/22. Run the site locally and click through every page on desktop and phone widths.
2. GrandBlue listing page: gallery, "Why GrandBlue", facts layout, enquiry card. Confirm the facts list with Clent.
3. Search results page: borrow the realestate.com.au information hierarchy (section 4). Keep the existing filters and URL state.
4. Homepage refinements: recently viewed, suburb profiles, proof strip when there is something to prove.
5. Imagery pass per section 6, with the asset register updated.
6. Verification: checks and tests, screenshots at 1440px and 390px for every route, reduced-motion pass, keyboard pass. Then pull request, merge, and confirm the live site serves the new build.
7. Document each change as a numbered file in `docs/`, add a decision-log row when a decision is made, and append the document to `MASTER-BRIEF.md` with the usual `<!-- Source: NN-name.md -->` separator.

## 8. Definition of done for this handover
- GrandBlue is the first thing a visitor understands the site is about, on the homepage and in search.
- Every page passes checks and tests, shows no console errors, and has no overflow at 390px.
- Every image is registered with its source and licence; nothing fictional is presented as real.
- Documentation, decision log and master brief are updated.

## 9. Open decisions that are not Lizelle's to make
The plan-on-a-page (docs/21) lists them: commercial or residential focus, the trading entity, the name search, the revenue model, and GrandBlue's photograph permission and facts. Flag anything blocked by these to Clent rather than guessing.
