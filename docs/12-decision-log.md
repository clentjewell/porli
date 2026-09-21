# Decision log

| ID | Status | Decision | Basis |
|---|---|---|---|
| D001 | Confirmed | Working name Porli | Explicit user selection |
| D002 | Confirmed | Buy/Rent marketplace, fixed listings, admin and in-site conversations | User concept |
| D003 | Confirmed | Distinctive design; Higgsfield concept imagery | User creative direction |
| D004 | Proposed | Single operator, staff-only publication | Simplifies first coherent release; awaiting business confirmation |
| D005 | Proposed | One consumer account with both interests | Avoids unnecessary duplicate accounts |
| D006 | Proposed | Inspection requests and follow-ups in MVP | Completes enquiry journey |
| D007 | Open | Launch country, currency and region | Fixture defaults do not settle this |
| D008 | Confirmed | Node.js/SQLite implementation (docs/13); hosting on Cloudflare Workers with static assets and a SQLite Durable Object (docs/17) | User asked to connect the repository to Cloudflare; Pages cannot run the database-backed server, so the Workers successor platform is used |
| D009 | Open | Commercial model and brand availability | Not investigated or approved |
| D028 | Confirmed | Homepage redesigned (docs/33) from the reference sites Clent sent: the headline listing lifts 150px into the hero on its own panel, the values strip and the account strip fold into the service block they repeated, and the grid becomes every available listing with in-place type filter pills. Eight modules to five. Cards now lead with the property name rather than the price, which touches the hierarchy question docs/28 reserved and is reversible in one rule. A live phone bug was fixed on the way: the hero search field rendered 260px tall because a row flex-basis became a height in the phone's column layout | Clent, 21 September 2026 |
| D027 | Confirmed | Feature page second pass (docs/32): a sticky in-page jump bar, short captions on the plate photographs backed by a new optional media caption field and an idempotent migration, and a label plate overlapping each row's photograph. Taken as structure from a single-development landing page Clent sent, never its look. Its build-stage tracker, statistics band, testimonial, email capture and logo strip were rejected as claims with nothing behind them; its room comparison table is held until GrandBlue's room counts and areas are confirmed | Clent, 21 September 2026 |
| D026 | Confirmed | The editorial format (docs/31) is kept as a property feature page at /feature/<slug>, not as the homepage. It was trialled at /editorial as an alternative front page; Clent's decision was to keep it as a GrandBlue feature, which also avoids giving a property marketplace a front page with no search bar. Linked from the homepage headline listing and the listing's Why block, and only when the listing has a why text | Clent, 21 September 2026 |
| D025 | Confirmed | Self-hosted EB Garamond (SIL OFL 1.1) becomes the display face, and the hero search promotes property type and bedrooms out of the Filters panel; hero parallax and slower reveals added (docs/30). Narrows the one-typeface rule in docs/23 section 3, which had been implemented invisibly as --serif:var(--sans) in experience.css, so the site had no display face at all | Clent, 21 September 2026 |
| D024 | Confirmed | Recently viewed gets its own four-column track (docs/26) so a fourth card no longer strands itself on a second row. Every length from one to four checked at three widths | Clent, 21 September 2026 |
| D023 | Confirmed | Hero and headline-listing zooms gain a coupled rotation (docs/29), matching the drift measured on the reference template. Its implementation was not copied: the template is JavaScript-driven and ignores prefers-reduced-motion, where Porli's is CSS and switches off | Clent, 21 September 2026 |
| D022 | Confirmed | Surfaces softened to a 10px radius scale and the three most-used filters moved onto the search bar as pills, matching the reference portal (docs/29). Taken from an interior-design template's design qualities at Clent's request, with no colour change; its palette proved to be within a few points of Porli's already. Headings still fall back to Georgia because --serif has no font file | Clent, 21 September 2026 |
| D021 | Confirmed | Mobile design pass (docs/28): sticky enquiry bar on phone listing pages, search results raised from 500px to 368px by removing duplicated furniture, filter bar made sticky on phones, and tap targets raised to the 40px floor. Desktop unchanged; the type scale and card hierarchy deferred | Clent, 21 September 2026 |
| D020 | Confirmed | Visible photograph credits and "concept" wording removed from the interface so the site reads as Porli's live shopfront (docs/27). Attribution stays in every image's alt text and in design/asset-register.json; all fictional labelling is unchanged. Narrows the credit wording specified in docs/23 section 3 | Clent, 21 September 2026 |
| D019 | Confirmed | Imagery pass (docs/27): every listing image's alt text now states its source, applied idempotently on start so the live database is corrected too; the asset register's notice, which claimed all images were generated, and its expired rights note are corrected. No new imagery sourced: more GrandBlue photographs wait on the unsigned written permission, and re-crops of the generated assets were judged padding rather than information | Handover brief docs/23 section 6, 21 September 2026 |
| D018 | Confirmed | Homepage gains destination profiles (listing count and lowest price, counted from the live catalogue) and a recently viewed strip (local storage only, no account), placed below the headline listing so GrandBlue still leads (docs/26). The "sold and under offer" proof strip is deliberately not built: nothing has sold, and a proof strip with nothing behind it would breach honest labelling | Handover brief docs/23, 21 September 2026 |
| D017 | Confirmed | Search sort made explicit (docs/25): "Featured" is a named, selectable sort and the default, replacing a hidden reorder of the default view; any other sort turns it off. The results heading now describes the search rather than naming a fixed category. Both were taken from archived copies of realestate.com.au read through the Internet Archive, the live site being unreachable | Reference check, 21 September 2026 |
| D016 | Confirmed | Search results borrow more of the reference hierarchy (docs/25): a featured real listing leads the default sort only, badges capped at two, sticky filter bar, card photo carousels, and clear under-offer and sold states. Map and list toggle not built: one geocoded listing makes a map worse than none | Handover brief docs/23, 21 September 2026 |
| D015 | Confirmed | GrandBlue listing page rebuilt for the handover (docs/24): "Why GrandBlue" sourced from the property's own site, grouped features, floor plan and information memorandum slots, real inspection times, same-sector similar properties, and the price label stated once. New `why`, `feature_groups` and `documents` columns | Handover brief docs/23, 21 September 2026 |
| D014 | Confirmed | Homepage rebuilt to the supplied mockup with site-wide motion (docs/22): carousel, sector toggle, value strip, featured destinations, scroll reveals; all motion transform/opacity only with reduced-motion fallbacks and no CSP change | User request, 18 September 2026 |
| D013 | Open | Plan on a page V01 (docs/21) proposes the north star "one real property sold through Porli" and asks four answers by Fri 25 Sept 2026: commercial or residential; who trades as Porli; photograph permission for GrandBlue; whether to clear the name | Jewell plan pack, 18 Sept 2026; proposed, not agreed |
| D012 | Confirmed | Listing pages carry address, click-to-load Google map, navigation links and travel notes (docs/20); the CSP allows Google frames only | User request |
| D011 | Confirmed | Sale only: renting removed; residential and commercial sectors with commercial conventions from realcommercial.com.au (docs/19) | User direction |
| D010 | Confirmed | GrandBlue Resort & Beachclub (Mae Phim Beach, Thailand) is the real headline listing, price to be confirmed; portal conventions borrowed from realestate.com.au (docs/18) | User direction; facts limited to the property's published information |

## New decision template
ID:
Date:
Status: proposed / confirmed / superseded
Question:
Decision:
Reason:
Alternatives considered:
Consequences:
Approved by/source:
Documents affected:

Later explicit user decisions supersede proposals. Record changes and update source documents plus MASTER-BRIEF.md.
