# Porli — combined product and implementation brief

Generated from canonical documents in docs/.

---

<!-- Source: 01-product-brief.md -->

# Product brief

## Concept
Porli helps people find residential homes to buy or rent and communicate with the team responsible for them. Its public experience combines thoughtful visual presentation with practical search. Its private workspace keeps property inventory, conversations and follow-ups together.

## Promise
Find your next place. Discover a home, understand the essentials and get a useful response from the person managing it.

## Audiences
- Buyers: compare homes, save options, ask questions and arrange viewings.
- Renters: understand price and availability, ask questions and arrange viewings.
- Staff: maintain accurate listings and manage enquiries without losing context.
- Administrators: manage team access, content, inventory and operational performance.

One consumer can buy and rent concurrently. Their intent belongs to the property enquiry. Do not make them register twice.

## Differentiation to validate
Careful presentation, accurate availability and reliable conversations are the proposed advantages. These are a hypothesis, not proven market differentiation. Launch region, inventory supply and responsibility for timely replies must be resolved before commercial launch.

## Operating model
The first release is a curated marketplace operated by one organisation. Staff own publication and enquiries. External agent/owner self-service is deferred. This keeps the first workflow coherent while allowing a later organisation-scoped model.

## Success
Users can discover a relevant home and reach the right person. Staff can see who needs a reply and take a next action. Inventory reflects actual availability. Measure enquiry-to-inspection progression alongside time to first response, not traffic alone.

## Commercial direction
No revenue model is approved. Options for later evaluation are support for the operator's own property business, paid external listing packages or agency subscriptions. Do not add checkout, commission accounting or paid ranking in the first release.

---

<!-- Source: 02-scope-and-decisions.md -->

# Scope and decisions

## Confirmed by the user
- Working brand name: Porli.
- Residential real estate marketplace with Buy and Rent discovery.
- Homepage showing available properties and leading into marketplace search.
- A fixed template for adding and presenting properties.
- Distinctive, carefully designed visual direction.
- Higgsfield for concept image generation.
- Admin listing management and dashboard.
- In-site communication with interested buyers and renters.
- Repository-ready documentation before further development.

## Proposed defaults, not confirmed business facts
- One organisation operates all listings at launch.
- Administrators and staff manage publication; customers cannot list.
- Accounts are required for saving, messaging and inspection requests, but not browsing.
- Responsive web application before native mobile apps.
- Human replies; no automated AI representative.
- Inspection request/confirmation workflow included in the MVP.
- Dashboard, inspection, saved-property and operational details in this pack are recommended specifications.

## First release
Homepage, marketplace, property detail, sign-in/account, favourites, conversations, inspection requests, admin overview, property editor, shared inbox, contacts derived from enquiries, controlled homepage content and basic team settings.

## Deferred
Payments; tenancy screening; full rental applications; signed offers; contracts; deposits; commission handling; external agent onboarding; listing feeds; automated property valuations; native apps; AI conversation agents; advanced marketing automation. Map view and saved-search alerts can follow when useful integrations are ready.

## Decisions needed before launch
| Decision | Prototype fallback | Launch effect |
|---|---|---|
| Country and initial region | Fictional Australian-style locations | Currency, copy, address formats and operational requirements |
| Property range | Mix of houses, apartments and townhouses | Filters and imagery |
| Legal operator | “Porli team” placeholder | Contact and policy identity |
| Inventory source | Fictional seed records | Listing authority and supply |
| Staff publication rights | Any staff within operator can edit/publish | Confirm governance |
| Response expectations | No public time promise | Staffing and follow-up rules |
| Hosting and service stack | Unselected | Implementation and deployment |
| Brand/domain availability | Unchecked | Public brand launch |
| Revenue model | None in prototype | Billing and positioning |
| Retention and stale-listing periods | Configurable, disabled automation in demo | Privacy and inventory operations |

Resolve these as decisions, not invented requirements. Do useful prototype work while they remain open.

---

<!-- Source: 03-brand-and-design.md -->

# Brand and design specification

## Identity
Porli / POR-lee / Find your next place.
Porli is an invented name inspired by “porch”; it has no claimed established English meaning. Do not invent an etymology or claim exclusive rights.

The name is RealDistrict (D033, docs/38); the paragraph above records the original working name.

The wordmark is the name set in the sans, "Real" at text weight and "District" bold (D040, docs/45), with the logomark before it: four blocks on a square, the right column rounded, two olive and two pale olive (D039, docs/44; source `design/realdistrict-mark.svg`). The gaps are open, so the ground shows through; the two fills are the site's olive and accent tokens on paper, white and mid green on the deep footer. Readability comes first. No house-roof icon.

## Art direction
Warm, editorial and composed. Use asymmetry at the homepage opening and consistent grids for comparisons. The property images carry the character. Restraint must not hide search or make prices difficult to scan.

Proposed colours: ivory #F7F4EC, white #FFFFFF, ink #242A24, olive #485A42, pale olive #E7EBDD, clay #A6533E, line #D8D9CF. These are starter values, not an accessibility certification. Validate each text/surface combination. Clay is a restrained accent, not the only signal for status or errors.

Typography direction: one restrained humanist system sans family throughout, using Segoe UI Variable, Segoe UI and Arial fallbacks. Titles use medium-to-semibold weights with normal roman forms. Avoid oversized italic headlines, decorative serif pairings and exaggerated tracking. Use scale, spacing and weight for hierarchy; body text starts around 16px with generous line height.

## Layout
Desktop content width about 1280px, generous outer margins and a 12-column planning grid. Homepage opening: copy/search beside a dominant real property card, with two supporting listings below or adjacent. Marketplace: regular cards with consistent ratios. On small screens stack copy, search and listings; do not force three tiny cards across.

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Use restrained 4–10px radii and thin rules. Prefer spacing and colour over repeated heavy shadows.

## Components
Wordmark; primary navigation; Buy/Rent switch; location search; price fields; filter drawer; applied-filter chips; property card; status badge; save toggle; gallery; facts row; property enquiry panel; form field; validation summary; inspection slot; conversation list; message thread; internal note composer; admin table; metric card; date filter; confirmation dialog; toast; empty state; skeleton; error/retry panel.

## Behaviour
Accessible labels, logical keyboard order, visible focus, adequate touch targets and contrast. Do not communicate availability with colour alone. Respect reduced motion. Aim for WCAG 2.2 AA and verify implementation rather than claiming conformance from this brief. Forms preserve entered content after recoverable errors. Mobile message composition must remain usable with the keyboard open.

## Photography
Natural light, believable scale, straight architectural verticals, tactile materials, restrained grading and varied property types. Avoid sunsets on every card, excessive pools/mansions, glossy CGI and generic drone imagery. Provide responsive derivatives and descriptive alt text. Never use a generated photo to represent a real listed property.

## Voice
Clear, warm and concise. “Ask about this property”, “Request an inspection”, “No homes match these filters.” Avoid exaggerated promises and generic luxury language. The interface should not mention internal implementation details except when a prototype limitation must be disclosed.

---

<!-- Source: 04-pages-and-journeys.md -->

# Pages and journeys

## Route plan (proposed)
| Route | Purpose | Access |
|---|---|---|
| `/` | Search and available featured homes | Public |
| `/properties?mode=buy` | Marketplace with shareable filters | Public |
| `/properties/:slug` | Fixed listing detail | Public if publishable |
| `/sign-in` | Authentication | Public |
| `/account/saved` | Saved homes | Consumer |
| `/account/messages/:id?` | Own property conversations | Participant |
| `/account/inspections` | Own inspection requests | Consumer |
| `/account/settings` | Profile and notification preferences | Signed-in user |
| `/admin` | Operational overview | Staff/admin |
| `/admin/properties` | Inventory | Staff/admin |
| `/admin/properties/new` | Structured authoring | Staff/admin |
| `/admin/properties/:id/edit` | Edit/preview listing | Staff/admin |
| `/admin/conversations/:id?` | Shared inbox and follow-ups | Staff/admin |
| `/admin/inspections` | Slots and requests | Staff/admin |
| `/admin/contacts` | People who have enquired | Staff/admin |
| `/admin/contacts/:id` | One person: their conversations and inspection requests (docs/55) | Staff/admin |
| `/admin/guide` | Site guide for the team (docs/55) | Staff/admin |
| `/admin/content` | Featured listings and approved copy fields | Admin |
| `/admin/settings` | Team and site configuration | Admin |
| `/privacy`, `/terms`, `/contact` | Approved launch content | Public |
| `/how-it-works` (`/about` resolves here) | How the marketplace works, listing labels, concept disclosures (docs/47) | Public |
| `/team` | Team sign-in; signed-out `/admin` addresses show it (docs/51) | Public page, staff sign-in |

## Discover and enquire
Visitor selects Buy or Rent and location on the homepage. Marketplace retains filters in the URL and supports browser back/forward. Property detail exposes essentials before long description. “Ask about this property” opens a composer. Authentication preserves the draft and returns to the property; do not put message text in URL parameters. Sending opens or resumes the existing property thread. Staff reply from the shared inbox. Customer sees the reply and its property context.

## Save a home
Visitor selects save, signs in if necessary, and returns with the save completed once. Saved listings remain understandable after their status changes; unavailable homes show the updated badge and cannot accept new viewing requests.

## Publish a home
Staff add structured content, upload/reorder photographs and select cover. Draft may be incomplete. Preview shows the actual fixed page. Publish validates required fields and media. Homepage feature selection uses eligible published available properties. Editing does not silently replace records with a new property.

## Homepage content
Headline and supporting copy, Buy/Rent search, featured available homes, newest available homes, optional curated location collections, three-step explanation and footer. Hide empty collections. Avoid auto-rotating carousels. Return visitors may see recently viewed homes if privacy choices allow it.

## Search behaviour
Require the selected mode; never mix sale prices with rental rates in one sort. Min/max price uses the configured mode-specific currency and rental frequency. Support bedrooms (including explicit studio behaviour), bathrooms, type and rental available-by date. Switching mode clears incompatible filters and preserves compatible ones. Normalise rate comparisons if more than one rental frequency is allowed; MVP can enforce a single configured frequency. Pagination or load-more must retain state. Zero results offer filter relaxation.

## Edge states
Cover signed-out returns, invalid filters, deleted media, missing listing, archived listing, zero inventory, unauthorised routes, failed upload, failed message, delayed notification and expired sign-in. Provide useful recovery. Draft previews are never public or indexable. Availability changes disable new enquiries/requests but preserve existing conversation access for participants.

---

<!-- Source: 05-listings-and-content.md -->

# Listing template and content rules

## Authoring fields
| Group | Fields and rules |
|---|---|
| Identity | Internal ID, stable slug, title, sale/rent mode, property type |
| Location | Country, locality, region, postcode, street address, display policy; optional coordinates |
| Price | Currency, integer minor-unit amount, display style; rental frequency and bond for rentals |
| Facts | Bedrooms (0 allowed for studio), bathrooms, parking; optional land and internal area with unit |
| Description | Short summary, long description, structured features |
| Media | Cover and ordered photographs with alt text; optional floor plan and video link |
| Availability | Transaction status, rental available date, last-confirmed timestamp |
| Responsibility | Assigned staff member or team fallback |
| Discovery | Featured flag and optional curated collection |
| Controls | Publication state, timestamps, actor and revision/version |

Publishing requires mode, type, locality/country, permitted public address display, price or explicit approved price-display alternative, facts, description, responsible team, valid cover and at least three photographs as a proposed content standard. Drafts may be incomplete. Make media standards configurable rather than scattering constants. Price-on-request listings sort after numerical prices. Never publish an invented zero price to satisfy validation.

## Fixed display order
Gallery; price/address/status; essential facts; summary; description; features; optional floor plan/video; location; inspections; contact. Hide absent optional sections. Use predictable 4:3 image crops for cards and a more expansive detail gallery. Do not crop critical room features unnecessarily.

## Publication and transaction states
Publication: `draft`, `published`, `archived`.
Transaction: `available`, `under_offer`, `application_pending`, `sold`, `leased`, `withdrawn`.
Sale permits available, under_offer, sold, withdrawn. Rent permits available, application_pending, leased, withdrawn. Enforce combinations server-side.

Default search and homepage only include published + available. Under-offer/application-pending may have a clearly labelled optional search filter. Published completed listings may remain accessible by direct link with a prominent status and no new enquiry CTA. Archived/draft pages are not public; participants retain only the property summary needed in their private thread. Distinguish archive from irreversible deletion.

Recording sold/leased creates an outcome event with an effective timestamp. Corrections require an auditable reversal/replacement, so dashboard figures are not inflated by toggling statuses. Reopening availability is an explicit staff action.

## Quality controls
Check possible duplicates using normalised address, mode and current active status; allow staff to resolve legitimate separate units. Validate non-negative facts/areas and sensible price/rent input. Validate upload content type, size and file integrity; reject executable content. Strip sensitive image metadata from public derivatives. Preserve originals privately when needed. Do not expose full address through structured data or coordinates when it is hidden in the UI.

## Freshness
Display last-confirmed availability where useful. Remind staff after a configurable review interval. Automated unpublishing is disabled until the operator approves the interval and notification policy. A missing confirmation must not silently mark a property sold.

## Changes and concurrency
Keep actor/timestamp history for publication, price, assignment and status changes. Reject or resolve stale concurrent edits instead of overwriting silently. Make unpublish/archive actions explicit and preserve customer conversation history.

---

<!-- Source: 06-conversations-and-inspections.md -->

# Conversations and inspections

## Conversation model
One durable thread per organisation, customer and property. Reuse the thread on repeat enquiries. Store intent at enquiry time, especially if a property is later relisted. The first successful customer message creates the conversation; empty drafts do not count as enquiries.

Customer-visible content: participant messages, timestamps, property summary and legitimate inspection updates. Staff-only content: internal notes, assignment, follow-up scheduling and internal workflow labels where not intended for customer display.

Messages are immutable by default in the first release; moderation/redaction is an audited operation. Plain text is sufficient for MVP. Attachments can be deferred; if added, they require private storage and authorisation on every download. Use idempotency keys so retries do not duplicate messages. Failed messages retain draft text and offer retry.

Staff inbox filters: unread, awaiting reply, assigned to me, unassigned, property, sale/rent, stage and overdue follow-up. Staff can claim or assign a thread. A fallback queue handles absent/deactivated staff. Users must not see staff-only notes in APIs, exports, search snippets or realtime events.

## Workflow
Stages: new, in_conversation, inspection, offer_application, closed. Closed outcome: successful, withdrawn, unsuitable or no_response. Staff may move backwards with history. A customer message to a closed thread reopens it to in_conversation and clears the current closed outcome while preserving the prior event. Blocked senders cannot reopen threads. Terminal property status does not delete existing threads.

Track next action, optional due date and responsible staff member. Overdue means due time is past and the follow-up remains incomplete on a non-closed thread. Reading does not mark an enquiry answered. Internal notes and automated acknowledgements do not count as staff replies.

## Notifications
In-app unread state is authoritative. Email is a configurable delivery channel linking back to the thread; avoid sensitive message text in email by default. Queue notification jobs, retry transient failure and record delivery state. Deduplicate retries and avoid notifying the sender. Respect preferences for optional messages. Do not claim an email was sent merely because it was queued.

## Inspections
Staff create slots with start/end, property, time zone, optional capacity and cancellation state. Customers choose a slot or suggest alternatives. Requests progress requested → confirmed → completed; requested/confirmed can be cancelled. Rejected requests use cancelled with a reason, or a dedicated declined status if the implementation documents it consistently.

A request is never automatically a confirmed booking. On confirmation, atomically check capacity and property availability. Prevent duplicate active bookings for the same customer and slot. Store timestamps in UTC; show the property's explicit IANA time zone. Handle daylight-saving transitions. Alternative-time requests need a staff-confirmed slot before becoming confirmed.

When a property becomes unavailable, block new requests and flag existing confirmed inspections for staff resolution; do not silently erase them. Notify customers of actual cancellations/reschedules through configured channels. A proposed reschedule should clearly distinguish the old booking from a new unconfirmed time.

## Trust controls
Require verified contact before messages in production, rate-limit abuse, allow reports and staff blocking, and keep an audit trail. Do not let public profiles expose customer contact details. Set real retention and response policies before launch.

---

<!-- Source: 07-data-and-permissions.md -->

# Conceptual data model and permissions

This is a design contract, not an executable database migration. Choose exact types and constraints during implementation.

## Entities
| Entity | Core fields / relationship |
|---|---|
| organisations | ID, name, locale, currency, time zone, configured defaults |
| profiles | Auth user ID, display name, private contact preferences |
| memberships | Organisation, user, administrator/staff role, active state |
| properties | Organisation, slug, mode, template fields, publication, transaction, assignment, version |
| property_media | Property, private original/public derivative keys, type, order, cover, alt text |
| property_features | Property and controlled feature identifier |
| saved_properties | Customer and property; unique pair |
| conversations | Organisation, property, customer, assigned staff, stage, current outcome, last activity |
| messages | Conversation, sender, body, timestamp, idempotency key |
| internal_notes | Conversation, staff author, private body, timestamp |
| conversation_reads | Conversation, user and last-read marker |
| follow_ups | Conversation, owner, due time, next action, completed time |
| inspection_slots | Property, start/end UTC, IANA zone, capacity, state |
| inspection_requests | Customer, property, optional slot, proposed time, status, reason |
| property_status_events | Property, previous/new state, actor, effective time, correction link |
| audit_events | Organisation, actor, action, subject, timestamp; avoid unnecessary sensitive payloads |
| analytics_events | Event ID, event name, permitted anonymous/account identifier, property, time |
| notifications | Recipient, channel, event key, delivery status, retry metadata |
| content_settings | Organisation-controlled headline, feature selection and collections |

## Constraints
Unique stable property slug; unique saved customer/property pair; unique conversation organisation/customer/property; unique client message idempotency key within sender scope. Foreign keys and ownership relationships must be enforced. Use currency minor units rather than floating-point money. Store area units explicitly. Rate values must include frequency. Constrain sale/rent statuses. Index public listing filters and private inbox filters using measured query needs.

## Access matrix
| Action | Visitor | Customer | Staff | Administrator |
|---|---|---|---|---|
| Read public eligible properties | Yes | Yes | Yes | Yes |
| Read drafts/private previews | No | No | Own organisation | Own organisation |
| Save properties | No | Own saves | Own consumer context | Own consumer context |
| Read/send customer messages | No | Own threads | Own organisation threads | Own organisation threads |
| Read/write internal notes | No | No | Own organisation | Own organisation |
| Manage listings and inspections | No | Own requests only | Own organisation | Own organisation |
| Manage site copy/team/settings | No | Own preferences only | No | Own organisation |
| Assign staff roles | No | No | No | Own organisation |

Consumers must not gain staff status by editing profile fields. Deactivated staff lose privileges on subsequent requests; consider session revocation. Validate every requested record against membership/participation, including nested reads, exports, realtime subscriptions and media URLs. Public projections must omit private address fields and contacts.

## Lifecycle
Keep history needed to fulfil existing conversations when listings are archived. Account deletion/anonymisation, message retention and audit retention require an approved policy before launch; do not promise a retention period in placeholder copy. Store the minimum needed. Backups must have access controls and a tested restoration path.

---

<!-- Source: 08-dashboard-and-events.md -->

# Dashboard and measurement

## Definitions
All date ranges use the configured reporting time zone and half-open boundaries: start inclusive, next-period start exclusive. Label point-in-time cards “Current”; label period measures with the selected period. Internal notes, staff test activity and fixture data are excluded from live reporting.

| Metric | Exact proposed calculation |
|---|---|
| Live available properties | Current count of properties where publication=published and transaction=available |
| Properties receiving enquiries | Distinct property IDs with at least one persisted customer message in period |
| New conversations | Count of threads whose first persisted customer message is in period |
| Interested people | Distinct customer IDs with at least one persisted customer message in period |
| Awaiting reply | Current non-closed, non-blocked threads whose latest participant message is from the customer |
| Inspection requests | Requests created in period; show confirmed/completed separately |
| Sold / leased | Distinct properties with a non-reversed corresponding outcome event effective in period |
| Overdue follow-ups | Current incomplete follow-ups past due on open threads |
| Time to first response | First human staff reply minus first customer message, for replied new threads; show median plus unanswered count |

“Active conversations” means non-closed threads with a participant message in the selected period. Never count the number of messages as the number of people or enquiries. Median reply time excludes unanswered threads but must display their count to avoid misleading reporting.

## Property table
Property, mode, current status, views, current saves, enquiry threads started in period, latest customer activity and responsible staff. Label current saves separately from save actions in the reporting period.

## Event catalogue
`property_viewed`, `property_saved`, `property_unsaved`, `search_performed`, `conversation_started`, `customer_message_sent`, `staff_reply_sent`, `inspection_requested`, `inspection_confirmed`, `inspection_completed`, `property_status_changed`.

Messages and inspection metrics should use authoritative server records. Treat frontend page-view events as approximate analytics. Never include message bodies, private addresses or raw personal data in analytics payloads. Deduplicate event IDs and omit internal previews/test accounts. Count a view once per property per permitted session, not each component render. If reliable deduplication/consent is unavailable, label views accordingly or hide the metric.

## Funnel
Define a cohort of conversations started in the selected period and measure how many have an inspection requested/confirmed within a labelled follow-up window. Do not divide all inspections this month by unrelated conversations this month and call it conversion. Offers/applications are staff-recorded stages, not formal submissions in MVP.

## Dashboard layout
Date selector; current queue cards; period activity cards; action list for waiting replies/overdue follow-ups; property table. Add a trend chart only if it answers a concrete operating question. Clicking a card opens the corresponding filtered records using the same definition.

---

<!-- Source: 09-technical-brief.md -->

# Technical brief

## Status
The local implementation now uses Node 24, SQLite and browser JavaScript; see docs/13-implementation.md. Hosting on Cloudflare Workers is configured; see docs/17-cloudflare-deployment.md. Public launch remains gated by the checklist in docs/11. This pack defines behaviour. The implementation agent must inspect the target repository/environment and verify current official integration guidance. Do not infer that a previous unrelated project's services are provisioned for Porli.

## Architecture proposal
Use a responsive TypeScript web frontend, an authenticated server API, a relational database, object storage for property media and a notification job mechanism. A React-based framework is a candidate, not a requirement. GitHub holds source, migrations, fixtures and documentation. The database holds live listings, users and messages; GitHub is not the live customer database.

For a Cloudflare deployment, choose a compatible rendering/runtime strategy and validate framework support. Managed authentication/database/storage such as Supabase is an option to evaluate, not a completed setup. Email delivery and maps are independent optional integrations. Record the chosen stack and the reason in a decision record before building infrastructure-dependent features.

## Module boundaries
Public property/search reads; authenticated profile/saves; conversation participant services; staff listing/inbox/inspection services; administrator settings/membership services; media processing; background notifications; authoritative reporting queries. Use one shared definition of statuses and validation, enforced on the server.

## Required service operations (route names are illustrative)
- List/filter public properties and fetch eligible property detail.
- Save/unsave property idempotently for current user.
- Create-or-resume conversation and send message idempotently.
- Read authorised thread and update user's read marker.
- Create inspection request; staff confirm/cancel/complete with concurrency checks.
- Create/update draft, upload/reorder media, preview, publish/archive and record outcome.
- Assign enquiry, add private note, manage follow-up and change enquiry stage.
- Query dashboard using documented definitions and authorised organisation scope.

## Reliability and security
Use server-side authorisation at every boundary; provider-side row policies where applicable. Keep administrator/service credentials server-only. Validate structured fields and uploads. Escape user text; avoid arbitrary HTML. Protect cookie-based mutations appropriately. Rate-limit authentication/messages. Prevent public caches from serving private data. Audit significant state changes without logging message contents or credentials unnecessarily.

Use transactions/constraints for unique conversations, message retries, capacity checks and status events. Notifications run after committed records with retry/deduplication. A notification failure must not roll back an otherwise saved message or fabricate success. Handle stale edits and disconnected clients explicitly.

## Environment and deployment
After selecting services, add `.env.example` with variable names only, setup instructions, migrations and seed command. Separate demo, staging and production data. Use reproducible lockfiles and a minimal verification pipeline. Do not create a fake green CI job when the app does not yet exist. CI should eventually check types, build, critical tests and migration consistency.

## Performance and discovery
Responsive images, lazy loading below the first view, paginated searches and indexed queries. Public listing titles/descriptions and canonical URLs; exclude drafts, account routes and admin from indexing. Avoid publishing exact locations in metadata when address is hidden. Use real user measurements before claiming performance scores.

## Prototype boundary
Local fixtures can prove layout and interaction. They cannot prove authentication, durable messaging, email or permissions. Clearly report simulated features and replace them with persistent services before describing the product as production-ready. Do not add inert buttons that imply a completed external integration.

---

<!-- Source: 10-backlog-and-acceptance.md -->

# Phased backlog and acceptance criteria

## Phase 0 — Repository and decisions
P0-01 Import this pack, create private repository under confirmed owner, initial commit.
P0-02 Record launch assumptions, inspect environment, choose stack through decision record.
P0-03 Establish application structure, environment example and setup guide when coding begins.
Done: another developer can locate the source of truth and understand what is specified versus built.

## Phase 1 — Public prototype
P1-01 Wordmark, tokens, typography and shared components.
P1-02 Homepage with available featured properties and Buy/Rent search.
P1-03 Marketplace filters, sorting, URL state and empty states.
P1-04 Fixed property detail, gallery and enquiry/inspection entry points.
P1-05 Responsive review and fictional fixtures.
Done: the browse journey is coherent on mobile/desktop, no fake inventory claims, functional filter controls.

## Phase 2 — Persistent vertical journey
P2-01 Authentication and participant authorisation.
P2-02 Saved properties, including sign-in return behaviour.
P2-03 Durable property thread and idempotent customer message.
P2-04 Staff inbox, reply, unread markers and internal notes.
P2-05 Inspection request/confirmation and private account views.
Done: two different users and a staff account can complete the journey while remaining isolated.

## Phase 3 — Operational tools
P3-01 Listing authoring, media, preview and publication validation.
P3-02 Availability/outcomes/archive and audit history.
P3-03 Assignment, stage changes and overdue follow-ups.
P3-04 Dashboard queries and drill-downs.
P3-05 Administrator content/settings and staff deactivation.
P3-06 Notification delivery with preferences/retries when provider configured.
Done: staff can manage inventory and enquiries without developer intervention.

## Phase 4 — Launch preparation
P4-01 Resolve country/operator/brand and approved policy content.
P4-02 Replace fixtures with authorised inventory and photography.
P4-03 Confirm access, recovery, backups, delivery and operational ownership.
P4-04 Review accessibility, mobile usability, metadata and production configuration.
Done: launch checklist signed off; deployment is a separate explicit action.

## Behavioural verification scenarios
| ID | Scenario | Required result |
|---|---|---|
| A01 | Homepage Buy search with location | Results preserve mode/location in shareable URL |
| A02 | Filter returns no homes | Clear explanation and reset/relax options |
| A03 | Switch Rent to Buy | Rental-only filters removed; prices not mixed |
| A04 | Save while signed out | After sign-in property saved once; user returns to context |
| A05 | Send message then retry same request | One message and one thread; original draft not lost on failure |
| A06 | Second account guesses thread ID | No messages, notes or metadata leaked |
| A07 | Customer requests staff-note API/subscription | Denied; notes never present in customer response |
| A08 | Staff reads customer message without replying | Awaiting-reply count remains unchanged |
| A09 | Staff adds internal note | Does not count as reply or notify customer |
| A10 | Publish incomplete draft | Validation explains missing required data; no public listing |
| A11 | Upload/reorder/select cover | Correct order/cover persists after reload |
| A12 | Two customers request last inspection capacity | Confirmation respects capacity atomically |
| A13 | Property becomes leased | Removed from available search; old thread preserved; new requests blocked |
| A14 | Close enquiry unsuccessful | Property status unchanged |
| A15 | Staff role deactivated | Subsequent protected requests rejected |
| A16 | One customer sends five messages on two properties | One interested person, two enquired properties; messages not leads |
| A17 | Sold event corrected/reversed | Reporting reflects valid outcome without duplicate count |
| A18 | Private address listing | UI, API, map data and metadata all respect visibility |
| A19 | Notification provider fails | Message persists; delivery error/retry tracked; no false sent claim |
| A20 | Keyboard and narrow screen journey | Search, gallery, forms and thread usable with visible focus |
| A21 | Archived/draft URL requested publicly | Private content not exposed or indexed |
| A22 | Two staff edit same draft | Conflict resolved/rejected rather than silently overwriting |

Run meaningful tests around access and business state changes; do not spend effort testing static prose. Include a concise manual visual review for typography, responsive layout and image crops.

---

<!-- Source: 11-launch-and-operations.md -->

# Launch and operating checklist

## Before public launch
- Confirm operator, country, launch region, currency and property coverage.
- Check Porli's brand/domain availability; no availability claim is made here.
- Confirm who is authorised to publish each property and supply its photographs.
- Replace demonstration records and contacts; verify prices and availability.
- Approve jurisdiction-appropriate terms, privacy, cookie/analytics approach and retention rules. This pack is a product brief, not legal advice or policy text.
- Confirm staff responsible for shared inbox and absence cover; choose response expectations.
- Decide availability review intervals and how stale listings are handled.
- Configure real authentication, mail, storage and secrets; review participant isolation.
- Verify time zones and inspection cancellation procedures.
- Exercise backup restoration and basic service failure recovery.
- Review mobile, accessibility, public metadata and index exclusions.
- Confirm how reports, blocking, data requests and account closure are handled.

## Suggested operating rhythm
Daily: waiting replies, overdue follow-ups, today's inspections and failed notifications.
Weekly: listing freshness, empty galleries, duplicate warnings and enquiry progression.
Monthly: response times, conversion cohorts, abandoned follow-ups and inventory quality.

## Material risks
- Poor inventory supply: validate the launch area and source before broad expansion.
- Slow responses: assignment and cover matter more than another dashboard chart.
- Misleading availability: require periodic confirmation and clear status transitions.
- Private-data leakage: test every read channel, not just UI restrictions.
- Brand confusion: screen the chosen name before spending on public identity.
- Scope creep: keep billing, screening, external agency accounts and automated advice out of MVP.

## Commercial experiments after MVP
Validate whether consumers value the presentation and response workflow, and whether operators will maintain inventory. Evaluate operator-owned listings, agency subscriptions or listing fees only after choosing the business model. Do not interpret this document as revenue forecasts or a market-size claim.

---

<!-- Source: 12-decision-log.md -->

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

---

<!-- Source: 13-implementation.md -->

# Local implementation decision

17 September 2026. Build a local, persistent single-organisation MVP using Node 24's HTTP, crypto and SQLite modules, semantic HTML, CSS and browser JavaScript. No paid infrastructure or framework dependency is needed to review the complete consumer-to-staff journey. SQLite foreign keys, transactions and prepared statements enforce relationships. Database migrations run at startup. This deliberately replaces the proposed TypeScript/React candidate with a smaller dependency-free implementation; a hosted stack remains a launch decision.

Run `npm start`, then open http://127.0.0.1:4173. Run `npm test` for isolated API integration tests and `npm run check` for syntax validation. Runtime records are in ignored `var/`; do not commit them. Node's SQLite module is experimental in Node 24. Reference: https://nodejs.org/docs/latest-v24.x/api/sqlite.html.

Local demo sign-in selects seeded accounts through a loopback-only endpoint. Ordinary registration and password sign-in use scrypt hashes and HttpOnly SameSite sessions. The server refuses non-loopback binding while demo access is enabled. Public deployment is not part of this build. Verified email, account recovery, notification delivery, jurisdiction-specific policies, production hardening and backups remain launch gates. No email is sent or claimed to be sent.

All seed listings and generated imagery are fictional. Existing fixture publication states are preserved as specified visual scenarios, with three reference-based images for Courtyard House and one cover for the other homes; newly published listings require three distinct media entries. Image uploads and all account content persist locally. Seed statistics are labelled demo activity. No invented marketing claims, testimonials or listing counts.

---

<!-- Source: 14-verification.md -->

# Verification record

17 September 2026.

## Automated

The Node test suite creates an isolated SQLite database and HTTP server per scenario. It covers:

- Public eligibility, sale/rent separation, hidden drafts and archived pages.
- Idempotent, account-scoped saves.
- Durable unique conversations, retry keys, cross-customer read/write rejection.
- Private-note exclusion; reading and notes do not count as replies.
- People/property/conversation metrics independent of message volume.
- Inspection requests versus confirmations; capacity enforcement and ownership.
- Enquiry closure independent of property status; reopening on customer message.
- Publication completeness, stale revisions and reversible sold/leased reporting.
- New-request blocking on unavailable properties with existing thread retention.
- Staff deactivation, role escalation rejection and session invalidation.
- Password registration/login/logout, cross-origin write rejection and malformed image rejection.

## Browser checks

Reviewed the actual desktop homepage, imagery, typography and layout. At 390 × 844, checked stacked homepage and rental cards without horizontal page overflow. Browser console had no warnings/errors during the consumer and staff journeys.

Completed a local demonstration enquiry from the customer account, then a staff reply and inspection confirmation. Verified that the initial request was labelled Requested and changed to Confirmed only after the staff action. The saved home and conversation remained available across account switches.

## Remaining limits

This does not claim a complete WCAG audit, a penetration test, delivery integration, production deployment or operator approval. Test data is explicitly fictional. See README and the launch checklist for outstanding operational work.

Additional browser checks: mobile filters return a useful zero-result state; the three-image gallery advances correctly; publishing a one-image draft is rejected with a clear message; the same record saves successfully as a draft.

---

<!-- Source: 15-editorial-redesign.md -->

# Editorial redesign

The user requested a more distinctive, premium layout with scrolling animation, an interactive hero and an interactive header. This design supersedes the original side-by-side homepage composition while retaining the ivory/olive palette, architectural images and working marketplace workflows.

## Implemented

- Full-height architectural hero with oversized serif type, three manually selected image views, restrained pointer depth and scroll parallax. No automatic carousel.
- Transparent homepage navigation changes to a compact ivory header after scrolling. A keyboard-operable expanded menu includes property discovery, shortlist, approach and account links. Escape closes the menu.
- Direct hero link to the Buy/Rent search dock; hash links scroll without resetting the page.
- Numbered, staggered property collection with reveal transitions and larger photographs.
- A pinned courtyard study synchronises three images and highlighted descriptions to native page scrolling. No scroll interception or scroll locking.
- Full-width rental section, linked journey rows and a large closing browse invitation.
- Larger marketplace cards and a three-image property gallery with direct image selection; dark olive contact panel.
- Responsive mobile layouts and reduced-motion alternatives. Pointer effects run only on suitable devices. Scroll work uses one queued animation frame and listeners are removed when mounting a new page.

## Verification

Checked the actual desktop and 390 × 844 mobile browser: hero image selection, expanded navigation, anchor scrolling, compact header, second pinned story state, property gallery opening at image two, and rental search for Fernwick. Mobile pages had no horizontal overflow. Browser console was checked for errors. The existing API suite and syntax checks are run before packaging.

All imagery is reused from the six registered Higgsfield images. No new image credits or hosting services were required. Production launch limitations in README remain unchanged.

---

<!-- Source: 16-product-clarity.md -->

# Product clarity and visual refinement

This revision supersedes the cinematic homepage direction in document 15 following user feedback that the fonts and layout felt too generic and AI-styled.

## Purpose
Porli is a residential property marketplace for buyers and renters, operated by one property team. Customers search listings, compare details, save homes, send enquiries and request inspections. The team publishes properties, replies to enquiries and confirms appointments. The site does not promise instant inspection confirmation or allow consumer listing publication.

## Design
Use a single system sans family, restrained heading sizes, light surfaces, dark green actions and consistent comparison grids. The homepage places Buy/Rent search beside a featured listing with its price, facts and manual photo controls. Available homes follow directly. A concise explanation of the service replaces the pinned image story. Property pages prioritise the title, price, gallery, facts and contact options. Scroll reveals remain subtle and respect reduced-motion preferences.

## Implementation and verification
Presentation lives in public/experience.js and public/experience.css, with supporting listing and About copy in public/app.js. Custom homepage headline and supporting copy remain editable. Existing marketplace data, account and team workflows are preserved. Syntax checks passed. Browser review covers the desktop property page, homepage, photo controls, rental search and narrow mobile layout. All listings and imagery remain clearly marked as fictional concept material.

---

<!-- Source: 17-cloudflare-deployment.md -->

# Cloudflare deployment

17 September 2026. The marketplace can now be hosted on Cloudflare in addition to running locally. The same application core (`lib/porli.mjs`) serves both; only the runtime adapters differ.

## Why a Worker rather than a Pages project
Cloudflare Pages only hosts static files plus stateless functions. Porli needs a persistent SQLite database, server-side sessions and image storage, none of which Pages provides. Cloudflare now directs new projects to Workers with static assets, the successor to Pages, so Porli deploys as one Worker named `porli`:

- The Worker serves `public/` as static assets at the edge, adds the same security headers as the Node server and falls back to `index.html` for application routes.
- Requests to `/api/*` and `/uploads/*` are forwarded to a single SQLite-backed Durable Object (`PorliDatabase`). Its SQL API is synchronous, so the application core runs unchanged with real transactions, constraints and prepared statements.
- Uploaded images are stored inside the Durable Object database in 1 MB chunks and served through the existing authorisation check. No separate storage bucket is required.
- The fictional listings are seeded into an empty database on first use (`PORLI_SEED=1`). Demo sign-in shortcuts stay off (`PORLI_DEMO=0`) because they are loopback-only by design.

Configuration lives in `wrangler.jsonc`; the adapter is `worker/index.mjs`. SQLite-backed Durable Objects are available on the Workers free plan.

## Connect the repository (choose one)
The Worker `porli` already exists in the Cloudflare account as a placeholder. Either route below replaces it with the real application.

**A. Workers Builds from the dashboard (recommended, no secrets in GitHub).** Workers & Pages → `porli` → Settings → Build → Connect to Git → select `clentjewell/porli`, production branch `main`, build command `npm run check`, deploy command `npx wrangler deploy`. Every push to `main` then builds and deploys automatically. Pull-request builds run `wrangler versions upload`, which cannot apply a Durable Object class migration and generates no preview URL for Workers that use Durable Objects, so the first deployment must come from `main`. Until it has run, the *Workers Builds* check on pull requests fails; afterwards it passes but still produces no preview site. To avoid the noise, disable non-production branch builds in the same Build settings, or set the non-production deploy command to `npx wrangler deploy --dry-run` so pull requests only validate the bundle.

**B. GitHub Actions.** `.github/workflows/deploy.yml` runs checks and tests on every push and pull request, and deploys from `main` when two repository secrets exist: `CLOUDFLARE_API_TOKEN` (a token with the *Edit Cloudflare Workers* template) and `CLOUDFLARE_ACCOUNT_ID`. Without them the deploy job fails visibly rather than pretending to deploy.

Both routes run `wrangler deploy`, which uploads the assets, applies the Durable Object migration and publishes at `https://porli.<account-subdomain>.workers.dev`. Add a custom domain from the Worker's Settings → Domains & Routes when the brand and domain decision is made.

## First administrator
Two routes. On a fresh host with no team account, open `/team`: it offers "Create the first administrator" once, and closes as soon as one exists (docs/52). Or set the secrets below before anyone else can reach the site.

There are no demo accounts on a public host, and registration only creates customer accounts. Set two Worker secrets (Settings → Variables and Secrets, type *Secret*): `PORLI_ADMIN_EMAIL` and `PORLI_ADMIN_PASSWORD` (at least 12 characters). On the next request the application creates that administrator, or restores administrator access if the account already exists, and the team can sign in with those details at `/team` (docs/51) to manage listings and team access. Remove the secrets afterwards if preferred; the account persists.

## Local verification of the Worker
`npm run cf:dev` starts the Worker locally on port 8788 with demo mode enabled, using Wrangler through `npx`. `PORLI_TEST_BASE=http://localhost:8788 npm test` then runs the full API integration suite against the Worker; each test uses an isolated database via the demo-only `X-Porli-Database` header. Both the Node server and the Worker pass the same eleven tests, and an upload round trip (store, authorised fetch, unauthorised 404, attach to a listing) was checked manually.

## Limits and remaining decisions
- One Durable Object holds all data, which suits a single operating organisation. It runs in one location; static assets are still served from the edge everywhere.
- Durable Object storage is limited by the Cloudflare plan (currently 5 GB on the free plan). Uploaded images count towards it; there is still no server-side media processing.
- Rate limits are in memory and reset when the object restarts. Backups and export tooling are not yet configured; Cloudflare keeps point-in-time recovery for SQLite-backed Durable Objects for 30 days.
- Email, account recovery, legal operator and policy text remain launch gates as before. Deploying the Worker publishes the fictional concept; it does not make Porli production-ready.

---

<!-- Source: 18-headline-listing.md -->

# Headline listing and marketplace conventions

17 September 2026. The marketplace now carries one real property alongside the fictional concept homes, and borrows a set of presentation conventions from established Australian property portals (realestate.com.au was the reference).

## The headline listing
GrandBlue Resort & Beachclub, Mae Phim Beach, Rayong, Thailand, is seeded as the single featured listing (`featured = 1`; Courtyard House is demoted). It is a real, full-service oceanfront hotel and beachclub. Every fact on the listing is drawn from the property's own published website: room categories, facilities, the green-resort systems, the beach length and road distances to Bangkok, Suvarnabhumi Airport, Pattaya and Rayong. Room count, land and floor area, and sale terms are not published anywhere and are shown as "to be confirmed". The price is shown as **Price to be confirmed** rather than a number. The hotel's own telephone number, email address and booking link are deliberately not shown; enquiries and viewing requests go through Porli.

Photographs are six images from the property's public gallery, resized to 1536 × 1032 WebP and recorded in `design/asset-register.json` with `fictional: false`. Their use is authorised by the client as the listing owner; written confirmation from the property should be filed before public launch.

## Data model additions
Six columns were added to `properties`, applied idempotently at startup so existing databases (local SQLite and the Cloudflare Durable Object) migrate on their next start:

| Column | Purpose |
|---|---|
| `price_label` | Text shown instead of a price ("Price to be confirmed"). A published listing needs a positive price or a label. |
| `currency` | AUD, THB or USD. Prices format in the listing's currency. |
| `is_demo` | 1 for fictional concept records, 0 for real listings. Drives every "fictional" label. |
| `details` | JSON pairs of label and value, shown as the "Property details" table and, for hotels and land, as the key-facts strip. |
| `highlights` | Up to six short phrases shown as chips. |
| `listed_at` | First publication time, for "New listing" (14 days) and "Listed N days ago". |

Property types are now house, apartment, townhouse, villa, land and hotel. Listings with a price label sort last on price sorts and are excluded when a minimum or maximum price filter is set. The admin editor exposes all new fields, including a "real listing" checkbox that clears the fictional labelling.

## Conventions borrowed from the reference portal
- Highlight tier: the featured real listing gets a "Highlight" ribbon on cards and a dedicated homepage spotlight with price label, highlight chips and enquiry actions.
- Image badges: "New", "Price on request" and status badges overlay card images; the gallery shows a "1 / N" photo counter.
- Hospitality key facts: hotels and land show short detail pairs (beach, airport, city distances) instead of bedroom counts.
- Structured listing page: highlights, facts, description with "Read more", property details table, features, location note, viewing appointments (wording for hotels) and an "Explore other properties" strip. The enquiry card is sticky on desktop and pre-fills "I am interested in {property}." for real listings.
- Honest labelling: fictional homes keep "Fictional listing · Generated image"; the real listing shows "Photographs supplied by the property" and its listing date. Site-wide copy now reads "Except where a listing states otherwise, homes are fictional."

## Verification
`npm run check` and `npm test` pass (14 tests, including price-label publication rules, currency and type validation, sorting and the hotel's details). The same suite passes against the Cloudflare Worker (`PORLI_TEST_BASE`), which also serves the seeded hotel. Headless Chromium captures of the homepage, marketplace, hotel page, a fictional listing and the About page at 1440 px and 390 px showed no console errors, failed requests or horizontal overflow.

## Open items
- Confirm pricing, room count, land and floor area, and sale terms with the property; replace the "to be confirmed" values through the admin editor.
- File written image-rights confirmation before public launch.
- The hotel's exact address appears in the details table because the property publishes it; remove it if the client prefers locality-only display.

---

<!-- Source: 19-sale-only-and-commercial.md -->

# Sale-only marketplace and the commercial section

17 September 2026. Following the user's direction, renting has been removed from Porli and a commercial property section has been added, modelled on realcommercial.com.au, Australia's commercial property portal. The GrandBlue Resort & Beachclub is now the headline commercial listing.

## Renting removed
Porli sells property only. The Rent mode, weekly prices, the "available by" filter, rent statuses (application pending, leased), the Buy/Rent editor control and all renter-facing copy are gone. The `mode` column remains in the schema because SQLite cannot drop its CHECK constraint without rebuilding the table; every row is now `buy`, and the value is no longer exposed by the API or shown in the interface.

Existing databases convert on start: any rent row becomes a sale listing. The four fictional rental fixtures were given fictional sale prices (Garden Apartment $645,000, Veranda House $1,180,000, Lightwell Studio $395,000 sold, Balcony Apartment $585,000 archived). Any other legacy rent row would be given the label "Price to be confirmed"; leased becomes sold and application pending becomes under offer.

## Residential and commercial
Listings now carry a `sector`, residential or commercial, and the marketplace is browsed by sector rather than by buy or rent. Each sector has its own category taxonomy:

| Sector | Types |
|---|---|
| Residential | House, Apartment, Townhouse, Villa, Land |
| Commercial | Offices, Retail, Industrial / Warehouse, Hotel / Leisure, Medical / Consulting, Showrooms / Bulky goods, Development / Land, Rural / Agriculture, Other |

Commercial listings add the facts a commercial buyer expects: sale method (private sale, expressions of interest, auction, tender, price on application), floor area and land area in square metres, zoning and tenancy (vacant possession, leased investment, owner occupied). Cards and listing pages show these in place of bedroom counts, and the commercial filter set offers category, tenancy, minimum floor area and price. The admin editor exposes the sector, which drives the category list, and the new fields.

## Content
- GrandBlue Resort & Beachclub: sector commercial, category Hotel / Leisure, sale by expressions of interest, price to be confirmed. Existing production rows are updated on start.
- Two fictional commercial listings give the section content: Highstreet Offices (Elmshore, offices, vacant possession, private sale) and Millrace Warehouse (Fernwick, industrial, leased investment, expressions of interest). Their images were generated with Higgsfield in the established house style and are recorded in `design/asset-register.json` as fictional.
- The homepage now offers a Residential / Commercial search switch, shows residential homes in "Available homes" and replaces the former rental section with a commercial property section.

## Conventions borrowed from realcommercial.com.au
Sale-method wording in the price slot rather than a blank price; category chips; floor and land area as compact stats; tenancy and zoning in the key facts; investment highlights on commercial listing pages. Not adopted yet: information memorandum downloads (Porli only stores images), agency branding (single operator) and leasing (out of scope by decision).

## Verification
`npm run check` and `npm test` pass on Node and, via `PORLI_TEST_BASE`, against the local Cloudflare Worker. Tests cover the sector split, type-to-sector validation, sale-method and tenancy validation, the legacy rent conversion on a re-opened database, and the absence of `mode` and `rent_frequency` from API responses. Headless Chromium captures at 1440 px and 390 px of the homepage, both marketplace sectors, the commercial filters, the hotel, an office listing, a residential listing and About showed no console errors, failed requests or horizontal overflow.

## Open items
- Information memorandum and other document downloads would need a document upload path (currently images only).
- Leasing could return later as a separate sector-aware mode; the schema still permits it.

---

<!-- Source: 20-location-and-maps.md -->

# Location, maps and directions

18 September 2026. Listing pages now carry a Location section with the property's address where one is published, a map, navigation links and travel notes.

## What a listing shows
- **Address**: the full street address when the listing has one; otherwise the locality with either the fictional-location note or "Only the locality is shown. Ask the team for the exact address."
- **Map**: for listings with coordinates, a placeholder panel with a "Show map" button. The Google map loads only after the visitor presses it, so nothing is fetched from Google until they choose to. When a Google Maps Embed API key is configured (`PORLI_MAPS_EMBED_KEY`, a browser key restricted by HTTP referrer), the official Embed API is used; otherwise the keyless embed URL.
- **Navigation**: Open in Google Maps, Get directions (Google Maps directions to the coordinates) and Apple Maps, all opening in a new tab, plus the coordinates with a copy button.
- **Getting there**: free-text travel notes.

The homepage headline listing links straight to its map section.

## Data and validation
Four columns were added idempotently: `address` (≤ 200 characters), `latitude` and `longitude` (WGS84; both zero means unknown, both must be supplied together and lie within range) and `directions` (≤ 1000 characters). The serialised property gains `has_location`, and `address_display` is now derived: `full` when an address is present, otherwise `locality_only`. The admin editor has a Location section for all four fields.

The GrandBlue Resort & Beachclub carries the address and GPS position the property publishes (Laem Mae Phim Beach Road, 180 Moo 4, Tambon Kram, Amphur Klaeng, Rayong 21190; 12.65236, 101.61083) and travel notes drawn from its published distances. Fictional listings have no coordinates and show no map.

## Security and privacy
The Content Security Policy now permits frames from `https://www.google.com` only; scripts, styles, images and connections remain first-party. The privacy page states that maps are loaded from Google only when a visitor chooses to show them. Navigation links are plain links to Google and Apple and load nothing until clicked.

## Verification
`npm run check` and `npm test` pass on Node and, via `PORLI_TEST_BASE`, on the local Cloudflare Worker. Tests cover the hotel's location fields and derived flags, coordinate validation, the session's map key field and the CSP frame allowance. A headless Chromium check of the hotel page confirmed the placeholder, the click-to-load iframe, the three navigation links with `rel="noopener"`, the coordinates and, on a fictional listing, the no-map wording; page captures at 1440 px and 390 px showed no console errors or overflow.

## Open items
- Coordinates are entered by hand in the editor; there is no geocoding of addresses.
- A Google Maps Embed API key is optional; add it as a Worker variable when the domain is settled so the official Embed API can be used.

---

<!-- Source: 21-plan-on-a-page.md -->

# Plan on a page (V01, 18 September 2026)

Digest of the Jewell "Porli — Plan on a Page" pack, version 01, dated 18 September 2026. The original deck is stored at `docs/plans/porli-plan-on-a-page-v01-2026-09-18.pptx` with a rendered image of each page alongside it. This document transcribes the pack's content so it can be read, searched and linked from the repository; the deck remains the source of record for its wording. The pack states that its north star is proposed, not agreed, and that every figure was read from the working site and the project record on 18 September 2026.

## Summary page

**The north star.** One real property sold through Porli. Not traffic, not sign-ups.

The shape decision underneath it: commercial and investment sales lead, and residential stops being run as a strategy. The two halves cancel out, because a portal needs supply Porli has not got. If nothing is decided, the default continues: the build keeps improving, the name stays unchecked, and the one real property on the site stays unsellable.

**Where we start from** (figures as read on 18 September 2026):

| Figure | Reading |
|---|---|
| Listings live, one real | 6 |
| Reachable revenue model | 1 |
| Launch decisions open | 10 |
| Notifications the system sends | 0 |
| Ways a buyer finds it | 0 |
| Automated checks passing | 18 |

**Four plans, one move each:**

| Plan | The move | First step |
|---|---|---|
| Business | Commit to commercial. One real resort, five concept houses. Pick the half with the asset in it. | Settle the market, the money and the mandate. |
| Brand | Clear the name. Invented, unregistered, unchecked, and already live on a public address. | A trade mark and domain search this week. |
| Sales and marketing | Close the enquiry loop. The promise is a reply. Nothing in the system can send one. | Email delivery, before any spend on traffic. |
| Activation | One listing, end to end. GrandBlue all the way: permission signed, facts confirmed, enquiry answered. | Sign the photograph permission. |

## Plan 01 of 04: Business

**Where the business actually is: two companies are sharing one codebase.** Residential is five concept houses with no supply agreement. Commercial is one real resort sold by expressions of interest, with the whole commercial vocabulary already built. The product carries both; a team this size cannot.

**The call: commit to commercial and investment sales.** Keep residential as a section, not as a strategy. A single operator makes a poor portal and a good shopfront. Two questions are still unanswered: where Porli trades, and how it earns. Everything else in the pack waits on them.

**The model, and the only option that is reachable.** No revenue model has been approved. The second and third options are also the two that turn Porli into a portal.

| Option | What it needs | Verdict |
|---|---|---|
| Operator commission | A signed mandate | Reachable now |
| Listing packages | Outside supply | Deferred |
| Agency subscriptions | Multi-organisation | Not built |

**What we need decided, and in what form:**
- Which market: one written line naming the sector, the country and the trading currency.
- How Porli earns: commission on the operator's own sales at a stated rate, or a reasoned alternative.
- Who trades as Porli: the legal entity behind the contact details, the terms and the privacy policy.
- Authority for GrandBlue: a signed instruction to market it, and written permission for the photographs.

**What could go wrong:**
- A portal without supply: ten listings is a worse experience than none.
- Photograph permission: six images are published with nothing signed.
- One database, one location: a restore has never been tested.
- Deciding nothing: every decision on the page gets dearer.

## Plan 02 of 04: Brand

**The position: not a portal. One operator's shopfront.** The competitor is not realestate.com.au; both portals this product borrows from belong to the same group, and a single-operator business rules that fight out before it starts. The real comparison is the agent's own website and the memorandum sent as an attachment: both present the property badly and lose the conversation the moment it leaves the inbox, and Porli already beats them at both. Better than the agent's site, not cheaper than the portal. Never enter a price fight with a portal.

**The name, unresolved:**
- Invented, from "porch". No trade mark search and no domain check has ever been run, and no claim to the name is made anywhere.
- It is already live on a public address, carrying a real business's photographs.
- Screening costs little this week; a rebrand after launch costs everything printed, indexed and linked.
- What is needed: a trade mark and domain search, and a decision on whether to register. That is the whole task.

**Already right, keep it:**
- Honest labelling: concept listings say so; the real one names its photograph source.
- Restraint: one typeface, ivory and olive, no stock photography, no luxury language.
- The enquiry is the product: the hotel's own contact details are withheld on purpose.

**Still to produce:**
- The wordmark: specified as a spaced lowercase "porli", never drawn.
- Approved terms and privacy copy: what exists is a brief, not policy text.
- A checked colour contrast pass: the palette is still marked provisional.

## Plan 03 of 04: Sales and marketing

**Before anything else: close the loop.** The promise is a reply, and nothing can send one. This is the first unlock; spending on traffic before it is fixed buys visits the business cannot catch.

| Capability | State on 18 September 2026 |
|---|---|
| Email | Not built. There is no mail provider connected and nothing that sends. |
| Notifications | None. A buyer learns of a reply by returning and pressing Refresh. |
| Recovery | Absent. A forgotten password is a lost account and a lost buyer. |
| Documents | Images only. A commercial buyer expects an information memorandum. |

**No way to be found.** The site asks search engines to skip it: correct while the homes are concept material, and it carries none of the descriptions and links a search engine needs. Opening it up is a launch task with a date on it, not a technical one. Nothing else brings buyers either: no content, no alerts, no map, no listing feeds. Fatal for a portal; survivable for commercial property, which is found by referral and direct approach.

**Who we are talking to:**

| Segment | The message |
|---|---|
| Investor | Yield, tenancy, zoning, area |
| Owner-occupier | Location, size, cost to be here |
| Vendor | Presentation, and a thread that holds |
| Residential buyer | Nothing yet; the stock is concept |

**The two highest-return moves:**
1. Finish GrandBlue. Price, room count, land and floor area and sale terms are all still to be confirmed. A listing with no numbers cannot be sold from.
2. Make the enquiry arrive. Email delivery, then a response time the team can meet.

**Measure four things**, in one report, monthly, never traffic: listings under written authority; enquiries per listing; median time to first reply with the unanswered count beside it; enquiries that reach an inspection.

## Plan 04 of 04: Activation

**Ninety days, proposed, dated from 18 September 2026.** Every line is a launch requirement already written down, and not one of them is closed. Nothing in the Now column needs a developer.

| Window | Items |
|---|---|
| Now, to Fri 25 Sept | Settle the market, the money and the entity. Sign the GrandBlue photograph permission. Run a trade mark and domain search. |
| Sprint 1, 28 Sept to 23 Oct | Email delivery and account recovery. Terms and privacy copy approved. GrandBlue facts confirmed. |
| Sprint 2, 26 Oct to 20 Nov | A second real mandate signed. Document downloads for commercial. A database restore tested. |
| Sprint 3, 23 Nov to 18 Dec | A published reply-time commitment. Open the site to search engines. Residential decided, in or out. |

**Who owns what:**

| Workstream | Owns it | Supports |
|---|---|---|
| The shape decision | Clent | Ronnie |
| Product build | Ronnie | Clent |
| Rights, legal, policy | Unassigned | Clent |
| Inventory and mandates | Unassigned | Clent |

**What we need from you first:**
- Commercial or residential? Everything on the Business page follows from this one answer.
- Who trades as Porli? The legal entity behind the contact details and the policies.
- Permission for the photographs: one signature, and it should be the first one.
- Do we clear the name? Cheap this week, dear after launch.

**Checkpoints:** Fri 25 Sept, the four answers above returned. Fri 23 Oct, can a buyer be told they have a reply? Fri 18 Dec, ninety-day review against the north star. Every review asks one question first: is there a real property, under written authority, that someone could buy today?

## Since this snapshot
The pack was read from the site as it stood at the start of 18 September 2026. Later the same day the repository added listing locations with a click-to-load map, navigation links and travel notes (docs/20), so "no map" in the Sales and marketing page no longer applies, and the automated check count rose to 22. Email delivery, notifications, account recovery, document downloads, the name search, the photograph permission, the legal entity and the revenue model remain open exactly as the pack describes. The decision log records the pack's four requested answers as D013.

<!-- Source: 22-homepage-redesign-and-motion.md -->
# Homepage redesign and motion

18 September 2026. The homepage was rebuilt to the supplied mockup and the whole site was given restrained movement: the request was to make everything interactive, with movements and animations. This document records what changed, how each interaction behaves, and the accessibility rules every animation follows.

## The homepage, section by section
1. **Full-page hero, search first.** The hero fills the first screen under the header. Three GrandBlue photographs crossfade slowly behind a dark scrim (a caption credits the property); the copy is centred in white and kept to short lines: eyebrow, a two-line headline whose second line rotates ("Property to invest in.", "Places to belong.", "Offices to grow into.", "Land to build on."), a one-line intro, then the dominant search card with the Residential/Commercial toggle, a large input, a Filters button and the Search button, followed by the popular-location pills and a "Scroll" cue. The Filters button opens a panel inside the card with the same fields as the marketplace (property type, bedrooms and bathrooms for residential; category, tenancy and minimum floor area for commercial; price range and "include under offer"), and the search sends every chosen filter to the marketplace URL. A first version placed the headline listing and a decorative side panel beside the copy; the user judged it messy, so both were moved out of the hero.
2. **Headline listing.** GrandBlue Resort & Beachclub in its own section: the photo carousel on the left, and on the right the locality with a "View on map" pill, the price line, the sale method, up to four short facts, highlight chips, the View and Enquire buttons and the disclosure. A link leads to all commercial property.
3. **Value strip.** Four items with icons: Curated listings, Direct to the team, Save and compare, A more open market. Two columns on tablets, one column on phones.
4. **Featured destinations.** Saltmere ("Coastal living, reimagined."), Fernwick ("Business. Lifestyle. Opportunity.") and Thailand ("Extraordinary places, real opportunities."). Each card is one link to the marketplace filtered by that location. Saltmere and Fernwick use existing generated concept images; Thailand uses a photograph supplied by the property. A caption under the grid says which places are fictional. The mockup spelt the second place "Fenwick"; the repository's fixtures and URLs use **Fernwick**, so that spelling is kept.
5. **Available homes**, the existing residential grid, followed by **What Porli does** (now with 01/02/03 step markers), the **Commercial property** section and the account band.

No new images were generated or added. Every picture on the page already exists in `public/assets/` and is listed in `design/asset-register.json`. Honest labelling is unchanged: fictional listings say so, the hero credits the property for its photographs, and the headline listing repeats "Photographs supplied by the property. Price to be confirmed."

## Interactions
| Element | Behaviour |
|---|---|
| Hero background | Three photographs crossfade every 7 s with a slow zoom; only the first, static photograph under reduced motion. |
| Headline word rise | Each word of the h1 rises into place on first paint, 70 ms apart. |
| Rotating headline line | The second line changes every 3.8 s with a short rise and fade; static under reduced motion. A custom headline set by an administrator is shown unchanged. |
| Filters panel | The Filters button expands a panel inside the search card; the sector toggle swaps the residential and commercial fields, a badge counts active filters, Reset clears them and "Apply and search" submits. |
| Sector toggle | Pill switch with house and building icons. An olive thumb slides behind the active choice, with no underline. Choosing a sector also rewrites the popular-location links and swaps the filter fields. |
| Search box | Olive ring and a 1px lift on focus. While the field is empty and not focused the placeholder cycles through example places every 2.6 s (Saltmere, Fernwick, Rayong for residential; Fernwick, Rayong, Highstreet for commercial). A typed value is never overwritten. |
| Headline listing carousel | Previous and next buttons, a "1 / 6" counter, dot controls, left and right arrow keys when the carousel has focus, and a horizontal swipe on touch (40px threshold). Autoplay every 5 s pauses while hovered or focused, when the tab is hidden, and never runs under reduced motion. The active photograph has a slow 8 s zoom. Changes are announced to screen readers through a visually hidden live region ("Photograph 3 of 6: …"). |
| Scroll cue | A "Scroll" label with a bobbing chevron links to the headline listing. |
| Scroll reveal | Sections and cards fade and rise 14px as they enter the viewport. Children of a `data-reveal-group` cascade 80 ms apart. |
| Destination cards | Image scales to 1.04 over 600 ms on hover or focus; the round arrow button lifts and fills olive. |
| Value items | The icon circle fills olive on hover. |
| Property cards | Image scales to 1.03 with a soft shadow on hover; the save button pops once when toggled. |
| Buttons and links | Trailing arrow icons nudge 3px to the right on hover. |
| Page changes | Every route now fades and rises in over 320 ms (previously disabled on the front page). |

## Accessibility and performance rules
- Every animation is transform or opacity only, so nothing triggers layout during motion. The hero height comes from a `--header-h` custom property measured from the real header, so it fills exactly one screen.
- `prefers-reduced-motion: reduce` removes all transitions and animations site-wide (a rule in `styles.css`), and `experience.css` adds overrides so that nothing that starts hidden stays hidden: revealed sections, the headline words and the carousel image are shown immediately. Autoplay, the background crossfade, the zoom and the cycling placeholder are switched off in script as well.
- No inline scripts, inline styles or inline event handlers: the Content Security Policy is unchanged (`script-src 'self'; style-src 'self'`). Stagger indexes are set as CSS custom properties from script.
- All controls have accessible names and states (`aria-pressed` on toggles and dots, labelled carousel buttons, a live region for slide changes). Focus rings remain visible. Tap targets are at least 38px on phones.
- Listeners registered by the homepage are attached with the shared abort signal and cleared on route change, together with the autoplay and placeholder timers.

## Verification
- `npm run check` and `npm test` (22 tests) pass.
- The screenshot harness captured all eight routes at 1440px and 390px with reduced motion: no console errors, failed requests or horizontal overflow.
- A separate Playwright run without reduced motion confirmed that after scrolling, no revealed element is left transparent, that two presses of the next button move the counter to "3 / 6" and swap the photograph, and that the live region reads the new photograph's description.

## Files
`public/experience.js` (homepage view and all homepage behaviour), `public/experience.css` (layout, motion and breakpoints), `public/app.js` (five new icons; the sector action also updates the popular-location links), `public/index.html` (cache-busting version and page description). Cloudflare deployment is unchanged: static assets only.

## Limitations and remaining decisions
- The destination taglines are marketing copy written for the concept; they should be reviewed with the brand work in docs/21 before launch.
- Destination cards link to marketplace searches, so Thailand shows only the headline listing until more commercial stock exists.
- Chromium's full-page screenshot duplicates the sticky header when captured while scrolled; that is a capture artefact, not a rendering defect.

<!-- Source: 23-handover-brief.md -->
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

<!-- Source: 24-grandblue-listing-page.md -->

# The GrandBlue listing page

21 September 2026. First change of the handover in docs/23. The listing page at
`/properties/grand-blue-hotel-thailand` is the page the concept has to win on: GrandBlue is the
only property that can actually be sold, so this is where the site either reads as a credible
shopfront or does not. This document records what changed, what it deliberately does not claim,
and what is still blocked on the property.

## What changed

**Key facts under the title.** The facts strip (beach, airport, Bangkok) moved out of the body
copy and sits directly beneath the title and locality, which is the placement docs/23 section 4
asks for. A buyer sees where the property is before scrolling.

**"Why GrandBlue".** A new section above the description, in its own pale block, giving the case
for the property in three short paragraphs: what it is and where, what it already trades as, and
an explicit statement that price, room count, area and sale terms are to be confirmed. Every
claim is drawn from the property's own published information at grandbluethailand.com, which is
also what the description was built from (docs/18). The section closes with "Drawn from the
property's own published information." so the reader knows the provenance without being told to
trust us. The heading uses the first word of the listing title, so the section reads "Why
GrandBlue" rather than a generic label.

**Grouped property features.** The flat eleven-item list became three groups — Outdoor, Indoor
and Sustainability — the outdoor/indoor/other grouping docs/23 section 4 asks for. A test asserts
that the grouped features are exactly the flat feature list, so a group can never quietly drop or
invent a feature. Listings without groups still render the flat list.

**Documents.** A new section listing the documents a commercial buyer expects: a floor plan and an
information memorandum. Neither has been supplied, so each shows as an unfilled slot with a
working "Request it" button that opens the enquiry composer pre-filled with that request. There is
no dead download link and no fabricated file: an unfilled slot says what is missing and offers the
conversation that would obtain it. Residential listings show the floor plan slot only.

**Inspection times.** The viewing section now lists the actual times staff have opened, rather
than only offering a request button. The times were already in the database and already returned
by the listing endpoint; the page simply never showed them.

**Similar properties.** The strip previously fell back to any three listings whenever fewer than
three shared the sector, which put the one real commercial asset beside three fictional houses. It
now shows same-sector listings however few there are, headed "Similar properties", and only falls
back to "Explore other properties" when the sector has no other listings at all.

**One price, stated once.** "Price to be confirmed" appeared three times on the page — as a
highlight chip, as the price line and as a row in the details table. The price line keeps it; the
duplicate chip and the duplicate details row are filtered out when they only repeat the price
label. Genuine unknowns that are not the price ("Rooms", "Land and floor area") still show as
"to be confirmed", because they are.

## Where the borrowed hierarchy came from

realestate.com.au could not be reached from the build environment. It sits behind Kasada bot
protection and returns 429 to automated clients, including a genuine unmodified Chromium that was
given thirty seconds to complete the challenge; realcommercial.com.au does the same and
domain.com.au returns 403. Working around that would mean defeating an anti-bot system, which was
not done.

So nothing here was copied from observing the reference site. Every item implemented is named in
the list in docs/23 section 4, with the conventions already adopted recorded in docs/18. Where
these documents describe a layout as the reference portal's, that attribution comes from docs/23,
not from anyone on this change having looked at the site. If the hierarchy is ever revisited,
someone with browser access should check the list in docs/23 against the real thing first.

## Data model additions

Three columns were added to `properties`, applied idempotently at startup in the same way as the
six in docs/18, so existing databases (local SQLite and the Cloudflare Durable Object) migrate on
their next start.

| Column | Purpose |
|---|---|
| `why` | The "Why this property" paragraphs. Up to 2,000 characters. |
| `feature_groups` | JSON pairs of a group name and its features. Empty means render the flat `features` list. |
| `documents` | JSON pairs of a label and a URL. Only an uploaded PDF (`/uploads/*.pdf`) or an `https:` link is accepted. |

GrandBlue's `why` text and feature groups are defined once in `lib/porli.mjs` and used by both the
seed (a fresh database) and a backfill migration guarded by `why=''` (an existing database), so
the two paths cannot drift. The guard also means a staff member's later edit is never overwritten.
All three fields are editable in the admin listing editor.

## Verification

- `npm run check` and `npm test` pass; 24 tests, up from 22. The two new tests cover the sourced
  "Why" text (including an assertion that it never states a price), the group/flat feature
  equivalence, and round-trip plus rejection for all three fields — a malformed group, a group
  whose features are not a list, a `javascript:` document URL and a path-traversal upload path.
- Headless Chromium at 1440px and 390px: no console errors, no failed requests, no horizontal
  overflow on any route.
- Keyboard pass: every new control is reachable by Tab and keeps a visible 3px focus ring; the
  document-slot buttons are real buttons, not styled text.
- Reduced-motion pass: nothing that starts hidden stays hidden, and no element is left animating.

A note for whoever runs the harness next: property card images use `loading="lazy"`, so a
full-page screenshot taken without scrolling first shows several cards with blank images. That is
a capture artefact, like the duplicated sticky header recorded in docs/22, not a rendering defect.
The harness scrolls the page before capturing.

## Traceability of the "Why GrandBlue" text

21 September 2026. Every claim was checked against the property's own website rather than taken
from the repository's existing description. Source pages: the homepage, `/grandblue-location`,
`/grandblue-resort-beachclub`, `/grandblue-large-rooms-and-suites` and
`/stay-green-stay-by-the-sea`.

| Claim in the section | Where it comes from |
|---|---|
| Full-service oceanfront hotel | Homepage: "A full-service oceanfront hotel nestled on Mae Phim Beach" |
| Mae Phim Beach, 4.3 km long | Location: "Mae Phim is situated on a beach, 4.3 km long" |
| Eastern seaboard of Thailand | Location: "at the eastern coast of Thailand" |
| Airport about 2 hours, Bangkok about 2.5 | Location: "Bangkok Suvarnabhumi airport 170 km's, 2 hours by car"; "Bangkok City 190 km's, 2,5 hours by car" |
| Pattaya 100 km, Rayong city 45 km | Location: "Pattaya 100 km's, 1,2 hours by car"; "Rayong City 45 km's, 30 minutes by car" |
| Koh Samet a short boat trip | Location: "Koh Samed island, just a short boat trip away" |
| De Luxe rooms, family rooms, penthouse suite | The Resort: "spacious De Luxe Rooms, Family Rooms and a Penthouse/Honeymoon Suite"; "Our Family 2 Bedroom unit" |
| Oversized pool and children's pool | The Resort: "almost magic oversized swimming pool"; "the children's pool area with a sparkling waterfall" |
| Restaurant, bar, wine shop, beachclub lounge | Homepage and footer: "GrandBlue Restaurant", "Well stocked bar", "Wineshop", "Beachclub lounge" |
| Conference centre | Footer: "Conference Centre" |
| Massage and fitness centre with Finnish sauna | Homepage: "unwind in our Finnish sauna or have a workout in our gym" |
| Green resort, solar panels, water treatment | Stay Green: "proud to be a Green Resort"; "Our solar panel system"; "our advanced water treatment system" |

Two things the check turned up:

- **One claim was corrected.** The text first read "about two hours by road from Bangkok and
  Suvarnabhumi International Airport", following the property's own summary line. Its Location
  page is more precise: the airport is two hours, Bangkok city two and a half. The text now says
  so, which also matches the details table the listing already carried.
- **The source contradicts itself on one figure.** The homepage and the Location introduction both
  say Bangkok is "just 180 kilometres"; the Location page's own distance list says 190 km. The
  listing follows the distance list, as it did before. Worth settling with the property along with
  the other facts.

The property spells the island "Koh Samed"; the repository uses "Koh Samet" throughout. Both are
accepted transliterations and the repository spelling is kept for consistency.

## Limitations and what is still blocked

- **The document slots cannot be filled yet.** The upload endpoint accepts images only, so a
  supplied floor plan or information memorandum has to be an external `https:` link until PDF
  upload exists. docs/21 lists document downloads as a Sprint 2 item.
- **The description and "Why GrandBlue" overlap.** Both were drawn from the same source and now
  sit on the same page. The description should be shortened to the property's own voice once the
  confirmed facts arrive and the section can be rewritten around them.
- **Still to be confirmed with the property** (unchanged from docs/18 and docs/21, plan 04):
  price or price guide, room count, land and floor area, sale terms, and written permission for
  the photographs. Until those arrive the page states the unknowns rather than filling them, which
  is the honest-labelling guardrail working as intended, but it is also why the page cannot yet be
  sold from.
- **The exact street address** is still shown in the details table because the property publishes
  it. docs/18 flagged this for the client to decide; it remains open.

No images were added or changed, so `design/asset-register.json` is unchanged.

<!-- Source: 25-search-results.md -->

# Search results

21 September 2026. Second change of the handover in docs/23, following the listing page in
docs/24. The marketplace at `/properties` borrows more of the reference portal's information
hierarchy (docs/23 section 4). Filters, URL state and the existing result count and sort line are
unchanged.

## What changed

**A featured real listing leads the default view.** GrandBlue sorted third under "Newest first" —
the only property that can actually be sold sat at the bottom of the page. Featured listings that
are not demo records now lead the default sort. An explicit price sort is left strictly alone, so
the price-label rule from docs/18 still holds and a sort the visitor chose is never quietly
overridden. The rule reorders; it never filters. A test asserts both halves of that.

**Two badges, not four.** GrandBlue carried four stacked badges: its type, Highlight, New and
"Price on request". Cards now show the type and the single strongest remaining signal. The
transaction status outranks Highlight, which outranks New. "Price on request" was also pure
duplication — the card prints "Price to be confirmed" immediately under the photograph — so it now
appears only when nothing more important needs the space.

**The filter bar stays put.** The sector toggle, search field and Filters button are sticky beneath
the header while results scroll. This required moving the form out of `.page-top`: a sticky element
is bound by its containing block, and inside `.page-top` it scrolled away with its parent the
moment the heading left the screen. It is deliberately static below 800px, where the header already
takes enough of a small screen.

**Cards carry the whole photo set.** A card showed one photograph; GrandBlue has six. Cards with
more than one now have previous and next buttons, a "1 / 6" counter and dots. The buttons are real
buttons outside the card's link, so the card stays a single keyboard destination while the controls
are separately operable, and each change is announced through a per-card `role="status"` region.
Photographs crossfade on opacity alone. There is no autoplay: a grid of independently animating
cards would be noise, and it would fight the reduced-motion rule rather than sit inside it.

**Under offer and sold are unmistakable.** Closed listings dim their photograph and carry a clay
ribbon across the foot of the image, as well as the existing badge. Nothing in the seed data uses
these states, so they were verified by setting the status through the staff API and reverting.

## What was not built

**No map and list toggle**, though docs/23 lists one. Only GrandBlue has coordinates, so a map view
would show a single pin and five absent listings — worse than no map. This is a recommendation, not
a decision: it should be revisited when more stock is geocoded. Flagged to Clent.

## Where the borrowed hierarchy came from

realestate.com.au could not be reached from the build environment. It sits behind Kasada bot
protection and returns 429 to automated clients, including a genuine unmodified Chromium that was
given thirty seconds to complete the challenge; realcommercial.com.au does the same and
domain.com.au returns 403. Working around that would mean defeating an anti-bot system, which was
not done.

So nothing here was copied from observing the reference site. Every item implemented is named in
the list in docs/23 section 4, with the conventions already adopted recorded in docs/18. Where
these documents describe a layout as the reference portal's, that attribution comes from docs/23,
not from anyone on this change having looked at the site. If the hierarchy is ever revisited,
someone with browser access should check the list in docs/23 against the real thing first.

## Checked against the reference site, after the fact

21 September 2026. realestate.com.au is unreachable directly (see the section above), but the
Internet Archive holds copies and the archive is not blocked. A search results page archived on
4 January 2026 and the homepage archived on 20 September 2026 were read and rendered. Reading a
public archive is not the same as defeating the live site's bot protection, so this was done.

Two things the real page showed that the list in docs/23 section 4 did not, and both are now built:

**"Featured" is a named sort, not a hidden rule.** Their sort control offers Featured, Date
(newest and oldest), Price (both directions), Next inspection and Next auction, with Featured
selected by default. This change had originally reordered the default view behind the visitor's
back: there was no way to see why one listing led, and no way to turn it off. Featured is now the
first option in the sort control and the default. Choosing any other sort switches it off
completely rather than reordering on top of the choice. An unknown sort value falls back to
Featured instead of producing an arbitrary order.

**The heading describes the search.** Theirs reads "Real Estate & Property for sale in Melbourne,
VIC" rather than a fixed category name. Ours now names the sector or property type and the
location searched for: "Commercial property in Rayong.", "Houses in Saltmere.", "Offices.".
Residential type labels are singular in the fixtures, so they are pluralised for the heading;
commercial labels already read as categories and are used unchanged. Only filters with a plain
language form are named. The rest stay in the removable chips below, which already show them.

Two things seen and deliberately not adopted: their card heading is the street address, which does
not suit a named property like GrandBlue where the locality line already carries the address; and
their view tabs are List, Map, Inspections and Auctions, where there is no auction stock and one
property with viewing times. The archived search page is nine months old, so it is good evidence
of their hierarchy rather than a current record of it.

## Verification

- `npm run check` and `npm test` pass; 26 tests, up from 24. The new tests cover the ordering rule
  (default leads with the featured real listing, an explicit price sort is untouched, and no
  listing is lost either way) and that cards receive every photograph with alternative text.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, covering public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images and no unnamed controls anywhere. The only flagged route is a
  deliberately invalid listing URL, which correctly returns 404 and renders its empty state.
- Keyboard pass: the carousel buttons are reachable by Tab, keep a visible 3px focus ring, become
  visible on focus rather than hover alone, and advance on Enter.
- Reduced-motion pass: the active photograph stays fully opaque, the carousel still swaps, and no
  element is left animating.

## Limitations

- **Two listings have more than one photograph**: GrandBlue with six and Courtyard House with
  three. The carousel is invisible on the other four cards. That is correct behaviour and it will
  fill out as imagery arrives, but it means the feature currently improves two listings. (An
  earlier version of this document said only GrandBlue had more than one photograph. That was
  wrong; the imagery audit in docs/27 found Courtyard House's gallery.)
- **The save button was a 32px tap target**, below the 40px floor in docs/23. It was site-wide
  rather than a search-results matter, so it was recorded here rather than fixed in passing, and
  has since been raised to 40px on phones in the mobile pass (docs/28).
- **Sold listings are excluded from results entirely**, so the sold treatment is only visible to
  staff previewing a listing. "Include under offer" reaches the under-offer state. Whether recently
  sold stock should appear as proof is a content decision, not a technical one; docs/23 raises the
  same question as a homepage "proof strip".

<!-- Source: 26-homepage-modules.md -->

# Homepage: destination profiles and recently viewed

21 September 2026. Third change of the handover in docs/23, after the listing page (docs/24) and
search results (docs/25). Section 4 of the brief suggests three homepage additions: a recently
viewed strip, a suburb profile module for the three featured destinations, and a proof strip once
there are results to show. Two are built. The third is not, for a reason worth recording.

## Destination cards became profiles

The three featured destination cards — Saltmere, Fernwick and Thailand — were a photograph, a name
and a marketing tagline. Each now also states what is actually listed there: the number of
listings and the lowest price, or "price on request" when every listing there carries a price
label rather than a number.

The figures are counted from the same listings the marketplace serves, in the browser, at render
time. They are not a second copy of the data and cannot drift from what a visitor sees after
clicking through. A destination with nothing in it says "No listings yet" rather than showing a
card that leads to an empty search.

The facts line uses the same muted colour as the tagline above it at full opacity, rather than a
reduced opacity, matching how the card already handles secondary text and avoiding a contrast
question over a photograph.

## Recently viewed

**Superseded, 21 September 2026: the strip was removed from the homepage and view history is no longer recorded. See docs/36 for the measurement and the restore note. The rest of this section describes how it worked.**

A strip of the last four listings opened in this browser, newest first, using the same card as
every other grid. It appears only when there is something to show, so a first-time visitor never
sees an empty module.

Storage is `localStorage` on the visitor's own device: no account, nothing sent to the team,
nothing recorded server-side. The strip says so in a line beneath it, because a site that quietly
remembers what you looked at should say that it does. Both the read and the write are wrapped in
`try`/`catch`: in a private window or with storage disabled, the strip simply never appears.
Remembering is a convenience, not a feature the page depends on.

It sits below the hero, the headline listing and the featured destinations, and above the
available homes grid. That ordering is deliberate: the definition of done in docs/23 requires
GrandBlue to be the first thing a visitor understands the site is about, so a returning visitor's
own history must not displace it.

## The proof strip is not built

Section 4 asks for a "Sold and under offer" proof strip "once there are results to show". There
are none. Nothing has sold, nothing is under offer, and the only real listing is still to be
confirmed with the property. A proof strip with nothing behind it would be exactly the kind of
claim the honest-labelling guardrail exists to prevent, and dressing fictional concept listings as
sold stock would present fictional records as real.

Build it when the first outcome is real. The card states and the transaction statuses it would
need already exist and were verified in docs/25.

## The hero was not touched

The hero still reads "Homes to buy. / Property to invest in." with GrandBlue in the section
beneath it. Leading with GrandBlue in the hero itself would mean choosing between the residential
and commercial framings, which docs/23 section 9 reserves for Clent and docs/21 puts at the top of
its list. Flagged rather than guessed.

## Checked against the reference site

The archived realestate.com.au homepage (20 September 2026, read through the Internet Archive as
described in docs/25) has no recently viewed strip and no suburb profile module on the homepage.
It has an "Explore suburb profiles" link card inside a larger utility grid, and its footer carries
tabbed link lists: Real estate, New homes, Popular areas, Popular searches.

So neither module here is borrowed from them. Both come from the list in docs/23 section 4, which
proposed them for Porli rather than reporting them from the reference site. Recorded so nobody
later assumes the reference site was the source.

## The strip's own grid, 21 September 2026

Checked on the live site after release. The strip works — absent for a first-time visitor, capped
at four, newest first, links correct, and the page still renders when local storage throws — but it
looked wrong once four listings had been viewed. It was borrowing the three-column track used by
the grid below it, so the fourth card dropped to a second row and sat alone beside a wide gap.

It now has its own four-column track on desktop, two below 1100px and one below 560px. Every
length from one to four was checked at all three widths: desktop is always a single full row. At
the middle width a strip of three still wraps to two and one, which is what any two-column grid
does with an odd count and what the grid below it does there too; four, the steady state once
someone has browsed, fills both rows.

The narrower cards are a side effect worth keeping, since they read as the secondary module the
strip is meant to be.

## Verification

- `npm run check` and `npm test` pass; 26 tests, unchanged. Both modules are presentation over
  data the API already returns, so no endpoint changed and no test needed rewriting.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The strip was exercised as a visitor would: absent on a first visit, present after opening two
  listings, in the right order, with the stored value confirmed in `localStorage`, at both widths
  and with reduced motion on and off.
- Reduced-motion pass: nothing is left hidden or animating; no element sits below full opacity.

## Limitations

- **Recently viewed is per-browser and per-device.** Clearing site data, a different browser or a
  private window all start from nothing. That is the cost of not requiring an account, which is
  what docs/23 asked for.
- **A listing that is unpublished or withdrawn after being viewed** drops out of the strip
  silently, because the strip only renders listings still present in the public catalogue. That is
  the safe direction, but it means the strip can shrink without explanation.
- **Destination profiles cover the three featured locations only.** Any other location still shows
  an ordinary marketplace search with no summary above it.

<!-- Source: 27-imagery-pass.md -->

# Imagery pass

21 September 2026. Fourth change of the handover in docs/23, and the one its section 6 describes:
source design assets without Higgsfield, whose credits are exhausted. The section sets an order of
preference — the property's own photographs, then re-crops of the existing generated assets, then
openly licensed photography for mood and destination imagery only, then our own photography in
Rayong — and one rule that applies to all of them: alt text always states the source.

The audit came first. It found that the rule was not being kept anywhere except the homepage, and
that the register said something about the images that is no longer true. Those are what this
change fixes. No new image files were added, and that is a deliberate outcome rather than an
omission; the reasoning is in "What was not sourced" below.

## What the audit found

**Every listing image failed the alt-text rule.** All thirteen images attached to listings said
what they showed and never said what they were. The homepage had always followed the convention —
"Fictional coastal courtyard home — generated concept image", "GrandBlue beachfront — photograph
supplied by the property" — but listing media never did. A visitor reading a gallery with a screen
reader had no way to tell a photograph of a real hotel from a generated study of a house that does
not exist. That is the honest-labelling guardrail failing quietly in the place it matters most.

**The register's own notice was wrong.** It read: "All images are fictional architectural studies
generated through Higgsfield. Never use as photographs of actual listings." Six of the fourteen
are real photographs of a real hotel, supplied by it. The notice predates the headline listing in
docs/18 and was never revisited, so the document whose job is provenance was misdescribing its own
contents.

**The rights note had quietly expired.** Each GrandBlue entry said written confirmation was "to be
filed before public launch". The listing has been publicly reachable since it was first deployed,
and docs/24 gave it more prominence on 21 September 2026. The condition the note was written
against has passed.

**One claim in docs/25 was wrong.** It said only GrandBlue had more than one photograph. Courtyard
House has three: `courtyard.webp`, `courtyard-veranda.webp` and `courtyard-detail.webp`. That
document has been corrected.

**The register is otherwise complete.** Fourteen files on disk, fourteen entries, no orphans in
either direction.

## What changed

**Alt text now states the source, on every listing image.** A separate sentence is appended —
"Generated concept image." or "Photograph supplied by the property." — chosen from the listing's
own `is_demo` flag rather than from anything typed by hand, so the two can never disagree. It is a
sentence rather than another dash clause because several alt texts already end in one, and
"Courtyard House, fictional architectural study. Generated concept image." reads cleanly aloud.

The pass runs on every start, after all seeding, and is idempotent: a suffix is only added when it
is not already present. That matters because the live Cloudflare database is long-lived and will
receive this on its next start rather than being rebuilt. A test starts a database twice and
asserts the sentence appears exactly once.

**The register's notice now describes what the register actually holds**: two kinds of image, told
apart by the `fictional` flag, with the alt-text rule stated where anyone adding an asset will see
it.

**The rights note states the real position**: authorised by the client as listing owner, written
confirmation from the property still outstanding, and owed now rather than before some future
launch.

## What was not sourced, and why

**No new GrandBlue photographs.** This is the first option in section 6 and the one that would
most improve the site: the property publishes a gallery well beyond the six images in use. It is
also the one option that increases exposure on an unsigned permission. Publishing what is already
there is a position the client has taken; downloading more of a third party's photographs while
their written confirmation is outstanding is a further step, and not one to take on a repository's
own initiative. Held until the confirmation is filed. It should be the first thing done afterwards.

**No re-crops of the existing generated assets.** Section 6 permits them, and they would have made
the card carousel work on four more listings. They were not made for two reasons. The sources are
1024 × 688, so a crop tight enough to read as a different view has to be upscaled by roughly half
again to fill the same slot, and it looks it. More importantly, a crop of a listing's only
photograph is not a second photograph of it. It would raise the photo count on four fictional
listings without adding anything a buyer could use, which is the kind of padding the rest of this
project has been careful to avoid. Re-crops remain the right tool for a genuinely different
placement, such as a square or portrait slot, and none exists yet.

**No openly licensed stock.** Section 6 allows it for mood and destination imagery only, never as
a listing photograph. The destination cards it could serve already use existing assets and now
carry real listing counts (docs/26), so the gain would be decorative while adding third-party
licence obligations to track. Worth revisiting if a dedicated Thailand destination page is built.

## Verification

- `npm run check` and `npm test` pass; 28 tests, up from 26. Two are new: every listing image must
  carry alt text that states its source and must never claim the wrong one, and the source sentence
  must survive a restart without being appended twice.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The register was checked against the filesystem in both directions.

## Limitations

- **Four listings still have one photograph each**: Highstreet Offices, Millrace Warehouse, Veranda
  House and Garden Apartment. Fixing that needs real new imagery, not manipulation of what exists.
- **The alt-text sentence is appended mechanically.** It reads well after the current descriptions,
  but anyone writing a new description should write the source into it naturally rather than
  relying on the pass to bolt it on.
- **The written photograph permission is still outstanding.** It now says so in the register as
  well as in docs/21 and docs/24. It remains the first item in section 6 and the first thing that
  would unlock more imagery.

## Photo credits removed from the interface, 21 September 2026

Clent asked for the site to read as Porli's live shopfront rather than a concept build, and named
the visible photograph credits and the "Headline listing" section label. Removed:

- "Photographs supplied by the property." beneath the listing gallery.
- "Photographs supplied by the property. Price to be confirmed." beneath the homepage headline
  listing. The price line above it already says "Price to be confirmed", so that half was
  duplication regardless.
- The credit clause in the hero caption, which now names the property and its location only.
- The credit sentence in the featured-destinations caption.
- The credit clause in the site-wide strip, and the words "Porli concept" from that strip and the
  footer.
- The "Headline listing" eyebrow. It labelled the section rather than telling anyone anything; the
  property's own name is the heading.

**Attribution was not lost, only moved out of the furniture.** Every GrandBlue image carries
"Photograph supplied by the property." in its alt text, added earlier in this same pass, so the
provenance is still announced to a screen reader and still recorded against each file in
`design/asset-register.json` with its source and rights position. Nothing now claims the
photographs are Porli's own.

**Fictional labelling was not touched, and should not be.** Five of the six listings are invented.
Every fictional card still reads "Fictional listing · Generated image", every fictional listing
page still says the property, its location and its price are fictional, the destinations caption
still says Saltmere and Fernwick are fictional places, the site-wide strip still says the site
includes fictional concept listings, and the footer still says properties shown are fictional
except where a listing states otherwise. Labelling a demo record as fictional is a product
invariant in `AGENTS.md`, not presentation, and removing it would present invented properties as
real ones.

This narrows the guardrail in `docs/23` section 3, which specified the visible credit wording.
Recorded as decision D020 rather than treated as a silent redesign. The written photograph
permission remains outstanding and is unaffected by where the credit is displayed.

<!-- Source: 28-mobile-design.md -->

# Mobile design pass

21 September 2026. Fifth change of the handover. Not from the list in docs/23: it came from
measuring the live site at 390px and finding that the design had been composed at desktop width
and inherited by phones, with one consequence that undermined the north star in docs/21.

## What the measurements showed

| Measured at 390px | Before |
|---|---|
| Enquiry button on the GrandBlue listing | 4,658px down a 6,412px page |
| Contact card position | `static` — sticky applied only above 800px |
| First search result | 500px down an 844px screen |
| Smallest tap target | 32px, against the 40px floor in docs/23 section 3 |
| Filter bar while scrolling | `static` — sticky applied only above 800px |

The first line is the serious one. docs/21 states the north star as one real property sold, and
that the enquiry is the product. On the device most property searching happens on, the enquiry was
five and a half screens below the fold, under the map, the directions and the viewing times.

## What changed

**A sticky enquiry bar on phones.** Listing pages that are published and available now carry a
fixed bar at the foot of the screen with the price, the property name and an Enquire button. The
button is 47px tall and the bar respects `env(safe-area-inset-bottom)` so it clears the home
indicator on a modern phone. The page gains matching bottom padding so the bar never covers the
footer, which was checked rather than assumed.

The bar repeats the price that sits at the top of a listing, so it tucks out of the way while that
price is on screen and slides back once it has scrolled past. The tuck is transform and opacity
only. It is deliberately the wrong way round from a reveal: the bar is visible by default in CSS
and is only ever hidden by script, so a failed or unsupported observer leaves a usable control
rather than an invisible one. Verified with reduced motion both on and off.

**Search results start higher.** Three things were pushing them down, and all three were
duplication rather than information:

- The "The marketplace" eyebrow labelled a page the heading already names.
- The heading itself was set at 46px on a 390px screen.
- The Residential/Commercial switch inside the search bar was a third copy of a control already in
  the navigation and already stated by the heading ("Residential property.").

The eyebrow and the in-bar switch are hidden below 800px, the heading drops to 30px, and the
page-top padding tightens. The first card moved from 500px to 368px, so a card and a half is
visible on load instead of a sliver of one. Sector can still be changed from the navigation, which
stays visible at every width.

**The filter bar is sticky on phones too.** It was `position: static` below 800px, which is
backwards: on a desktop the filters and the results are visible together anyway, while on a phone
the filters vanish the moment you scroll. It now sticks beneath the header, offset by the measured
`--header-h` so it sits under the header rather than behind it. Removing the switch from the bar
is what made this affordable: the bar is one row on a phone rather than two.

**Tap targets reach 40px.** The save button was 36px in `styles.css` and overridden to 32px in
`experience.css`, which loads second. The phone override is now in `experience.css` beside the
rule it corrects, rather than in the file that loses. docs/25 recorded this as a known violation
left unfixed; it is fixed.

## What was deliberately left alone

**The visual language.** Palette, typeface and restraint are the strongest part of this design and
docs/21 says to keep them. Nothing here changes how the site looks, only what is reachable and how
much of the screen the furniture takes.

**The type scale.** A card body uses six sizes: 9, 10, 11, 15, 16 and 21px, and 9px is too small
for the fictional-listing label to be comfortably read. Consolidating to three or four steps with
an 11px floor is a system-wide change and belongs in its own pass.

**The card hierarchy.** The price is currently larger than the property name, so on GrandBlue the
biggest text on the card says "Price to be confirmed". Whether Porli leads with price or with
property is a positioning question that leans on the commercial-or-residential decision docs/23
section 9 reserves for Clent.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. This is presentation over existing
  data, so no endpoint or fixture changed.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The enquiry bar was measured on load, after scrolling 4,000px, and at the foot of the page to
  confirm it stays in view, never covers the footer, and returns when scrolled back up.
- Reduced-motion pass with the observer active in both states.
- Cache-busting versions on `styles.css`, `experience.css` and `app.js` bumped to 8 together, so a
  returning visitor cannot get new markup against old styles.

## Limitations

- **Desktop is unchanged.** Every rule here is inside a `max-width: 800px` query. The desktop
  contact card was already sticky and the desktop fold was already reasonable.
- **The enquiry bar shows price and name only.** A photograph thumbnail is the usual portal
  treatment and would need a second look at the bar's height on a small screen.
- **The tuck is anchored to the listing page's price line.** A listing rendered without one would
  keep the bar visible at all times, which is the safe direction but not the intended one.

<!-- Source: 29-softer-surfaces-and-filter-pills.md -->

# Softer surfaces and filter pills

21 September 2026. Sixth change of the handover. Clent asked for the design qualities of an
interior-design template (https://interior.framer.wiki/, read and rendered from the live site),
with **no colour changes**, and for behaviour closer to realestate.com.au.

## What was taken from the reference design, and what was not

The template is a single-page brochure for one designer, 16,635px tall: hero, statistics, project
strip, services, founder, a four-step process, testimonials and an FAQ. Most of that shape is
wrong for a marketplace, which is a tool rather than a scroll. Three qualities do transfer, and
none of them is colour.

**Corner radius.** The template rounds its surfaces at 10–11px. Porli used 3px in fourteen places,
which reads crisp but clinical. A `--radius` (10px) and `--radius-sm` (6px) pair now sits in
`:root` beside the existing colour tokens, and the large surfaces use it: listing card images, the
homepage feature image, the gallery, the commercial photograph, the map panel, destination cards,
buttons, inputs, the search field, empty states and the toast. Circles and full pills are left
alone. This is the single change that most alters how the site feels.

**Whitespace and type contrast.** Section headings tightened their letter-spacing slightly. The
larger rhythm was already close; the template's advantage there is mostly its scale, not its
spacing.

**Its palette, deliberately not copied.** Worth recording because the finding is reassuring rather
than actionable: the template's page colour is `#f7f1ec` and its panel `#eee6de`, against Porli's
`#f7f4ec` and `#e7ebdd`. The two are within a few points of each other. Porli's palette was
already in the same family, so there was nothing to take and nothing to change.

**A correction.** An earlier note in this session said a serif display face would breach the
"one typeface" guardrail in docs/23 section 3. That was wrong: `styles.css` already sets
`h1,h2,h3{font-family:var(--serif)}`, so Porli has always paired a serif with a sans, exactly as
the template does. The real gap is that `--serif` names `'Porli Serif'` with no `@font-face`
behind it, so every heading falls back to **Georgia**. Self-hosting a display serif would be the
largest remaining visual upgrade and is allowed by the Content Security Policy, which permits
`font-src 'self'`. It needs a licence decision and a font file in the repository, so it is flagged
rather than done.

## Filter pills, from the reference portal

The archived realestate.com.au search page (docs/25) puts its most-used filters on the bar itself:
`Property type | Price | Bed | Filters`. Porli kept all of its filters behind one collapsible
panel. The three a buyer reaches for first are now on the bar as pills:

- **Property type** — the sector's own list, so it reads "Category" on commercial.
- **Price** — up to $500k, $1m, $2m, $5m.
- **Beds** — residential only, hidden entirely on commercial where it means nothing.

Each pill sets or clears exactly one parameter and leaves every other one alone, so they compose
with each other, with the panel and with the sort control, and the URL stays shareable. The panel
keeps everything it had, including the price range, tenancy, floor area and "include under offer",
so nothing was removed or duplicated.

The search bar became a flex row to fit them: a fixed three-column grid could not take a fourth
child, which is what pushed the Filters button onto its own line on the first attempt.

On a phone the pills scroll horizontally in a single row beside the Filters button, which is what
the reference portal does at that width. Without that they wrapped onto a third line and pushed
the first result back down the page.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. The pills reuse the existing query
  parameters and the endpoint that already validated them.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads. No horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls.
- The pills were driven in a browser: selecting a type filters the results and updates the URL,
  adding beds composes with it, clearing the type leaves beds intact, and the beds pill is absent
  on commercial.
- The search bar measured at both widths: one line and 99px on desktop, two lines and 154px on a
  phone, with the sticky bar opaque while content passes beneath it.
- Cache-busting versions bumped to 9 together.

## Limitations

- **The first phone result sits at 429px**, against 368px before the pills and 500px before any of
  this work. The pills cost 61px of the fold; they earn it by removing a tap to reach the filters
  most people want.
- **The price pill offers four fixed ceilings** rather than a range. A proper minimum and maximum
  already exist in the panel; duplicating them as two pills would have taken the whole bar.
- **Headings still fall back to Georgia.** See the correction above.
- Map view, saved searches and pagination remain unbuilt for the reasons in docs/25 and docs/26:
  one geocoded listing, no email delivery, and six listings in total.

## A rotation coupled to the hero zoom, 21 September 2026

The reference template's motion was measured rather than described. Three findings shaped what was
taken from it.

**Its signature effect is a slow scale-and-rotate drift, and it is time-based.** Sampling the same
elements at four scroll positions gave equal increments regardless of how far the page had
travelled: scale 1.083 → 1.095 → 1.107 → 1.120 → 1.132 over roughly 0.8 second intervals, with a
rotation rising alongside it at about ten times the scale increment in degrees. It is a continuous
drift, not a scroll-linked one.

**None of it is CSS.** A scan of every element on the page found no CSS transitions and no CSS
animations at all; the motion is JavaScript writing inline transforms. That route is closed here —
no dependencies, no build step, and the Content Security Policy forbids third-party scripts — so
anything equivalent has to be hand-written CSS.

**It does not respect `prefers-reduced-motion`.** Loaded with reduce set, six blocks below the
fold still start at opacity 0 and animate in. Porli clears that bar and should keep clearing it,
so the look was worth taking and the implementation was not.

Porli already had the rest of the vocabulary: a hero zoom, scroll reveals that fade and rise, and
hover scales on images. The one missing ingredient was the rotation riding along with the zoom,
which is what stops a straight zoom reading as mechanical. Both zoom keyframes now carry one at
the ratio measured above:

- `hero-zoom`: `scale(1) rotate(0deg)` → `scale(1.05) rotate(.5deg)` over 10s
- `kenburns`, on the headline listing photograph: `scale(1.06) rotate(.6deg)`

Both are transform only, so the site-wide reduced-motion rule switches them off along with
everything else, which was confirmed rather than assumed.

**The risk worth checking was corner exposure.** Rotating an image that exactly covers its frame
pulls its corners inside the frame and shows the page behind. For a box of aspect ratio *r*, the
scale needed to stay covered at angle θ is about `cos θ + sin θ × r`: at 0.5° and 1.52:1 that is
1.013, and the zoom reaches 1.05, so there is roughly four times the margin required. It was
verified by sampling the four corner pixels of the rendered hero rather than trusting the
arithmetic — at the shipped values, at 1.02, and at the theoretical minimum of 1.013, across
desktop, phone, wide-and-short and tall-and-narrow viewports. No corner showed the page colour in
any of the sixteen combinations.

<!-- Source: 30-display-typeface-and-hero-search.md -->

# Display typeface, hero search and effects

21 September 2026. Seventh change of the handover, on Clent's instruction to make the design as
good as possible and to apply the best effects, with the design qualities of the references he had
sent. This is the change the earlier ones kept pointing at.

## The finding: the site had no display face at all

Three statements were made about this during the session, and the first two were wrong. The
sequence matters, because the third is what was actually true.

1. "A serif display face would breach the one-typeface guardrail in docs/23 section 3." Wrong on
   its face: `styles.css` sets `h1,h2,h3{font-family:var(--serif)}`.
2. "Porli already pairs a serif with a sans; the gap is that `--serif` has no font file, so
   headings fall back to Georgia." Also wrong. Headings were not falling back to Georgia.
3. What was true: `experience.css`, which loads second, contained `--serif: var(--sans)`. The
   serif token pointed at the sans, so **every heading on the site rendered in the sans** and
   `'Porli Serif'` never mattered. That one line is how the one-typeface rule was implemented.

So the guardrail was being honoured, invisibly, by a variable redefinition rather than anything a
reader of docs/23 would find. Changing it is a real narrowing of docs/23 section 3, not a
correction of an oversight, and is recorded as a decision rather than slipped through.

## What changed

**A self-hosted display serif.** EB Garamond, SIL Open Font License 1.1, latin subset only, one
44 KB WOFF2 at `public/assets/fonts/` with the full licence text beside it. Self-hosted, so the
Content Security Policy's `font-src 'self'` is untouched and no request leaves the site. Declared
with `font-display: swap`, so text is readable before the font arrives and the fallback chain
still ends at Georgia.

`--serif` now resolves to it, and the heading rule was retuned for it: weight 500 rather than 600,
and letter-spacing of -0.012em rather than -0.04em. Garamond is a light face with a small optical
size; the tight negative tracking a grotesque wants closes it up badly. Display sizes rose to suit
it, `h1` to `clamp(52px, 6.4vw, 104px)` and `h2` to `clamp(38px, 4.2vw, 64px)`.

The sans keeps everything else: body copy, labels, buttons, facts and prices. A price in a serif
is harder to scan, and the split now does useful work — the serif is the voice, the sans is the
data.

**The hero asks the first two questions.** Property type and Bedrooms, or Category and Tenancy on
commercial, moved out of the collapsed Filters panel onto the search card itself, following the
reference templates. They were removed from the panel in the same move: two controls of one name
in a form submit whichever comes last, so each exists exactly once. The sector toggle already
swapped fieldsets by `data-sector`, and the promoted pair uses the same mechanism, so choosing
Commercial swaps them along with the rest.

Making room for them exposed two layout faults. The search field was `flex: 1` against selects
with no basis, so it collapsed to its minimum; it now has a real basis and a floor. And
`.hero-content` capped at 900px, which was the true constraint rather than the card widths guessed
at first; it is now 1060px, with the headline and intro pinned back to 900px so the reading
measure is unchanged.

**Effects.** The hero photograph now drifts at a quarter of the page's scroll speed, capped at
120px, driven from `requestAnimationFrame` so a scroll never triggers layout. The layer carries
130px of slack above the hero so the drift can never uncover its top edge, which was verified by
sampling the hero's edge pixels rather than trusting the arithmetic. It is not applied at all
under reduced motion. Scroll reveals lengthened from 0.5s to 0.72s on a softer curve, closer to
the unhurried feel of the reference, over the same distance.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The font was confirmed to load and to be the face actually rendering, by measuring the same
  string in `'Porli Serif'` and in Georgia and asserting the widths differ, rather than reading the
  computed `font-family` string, which reports what was asked for rather than what arrived.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads. No horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls.
- The hero search was driven in a browser in both sectors: the promoted controls filter and reach
  the marketplace URL, the sector toggle swaps them, the hidden set is disabled so it cannot
  submit, and the panel still carries bathrooms, floor area, price and "include under offer". A
  check of submittable controls in both sectors found no duplicate names.
- The search field measured at 1440px, 1100px and 390px: 253px, 245px and 330px, no truncated
  labels, no overflow.
- Parallax measured at four scroll positions at two widths, with edge sampling at each, and
  confirmed absent under reduced motion.

## Limitations

- **One weight, one subset.** Latin only, 400–500. Anything outside that unicode range falls back
  to Georgia. A second weight or an italic would be two more files.
- **This narrows docs/23 section 3.** The site now uses two typefaces. If that is not wanted, the
  revert is a single line: `--serif: var(--sans)` in `experience.css`.
- **The hero card is busier.** Six controls rather than four. It buys the two filters people reach
  for first without opening anything, but it is a trade.


<!-- Source: 31-editorial-format.md -->

# The editorial format, and the GrandBlue feature page

21 September 2026. Not from the list in docs/23. Clent's reading of the site was that the front
page is "not too catchy": the format, not the name. This records the alternative format that was
built in answer, and where it ended up.

## What the format is

The homepage is a stack of nine modules — hero, headline listing, values, destinations, recently
viewed, available homes, how it works, commercial, account. Each is well made and each competes
with the one above it. GrandBlue appears in the second, which is as high as it can go without the
hero itself choosing between the residential and commercial framings (docs/26).

The editorial format inverts that. It opens on one property at full screen height, with the
property's own name as the page's `h1`, and then reads downwards as a single piece: the argument
for the property, its key facts, a sequence of its photographs at different widths, and only then
the rest of the catalogue as alternating rows. One narrative, not nine modules.

## Where it lives, and why not the homepage

It was built first at `/editorial`, unlinked, so the two formats could be compared on the real site
rather than from a description. Clent's decision was to keep it as a GrandBlue **feature page**
rather than make it the homepage.

That is the right call for a reason the comparison made obvious: **the editorial opener has no
search bar.** The homepage hero does, and it is the main entry into the marketplace — the
convention docs/23 section 4 takes from the reference portal. Swapping the formats would have given
a property marketplace a front page you cannot search from. As a feature page the format keeps
everything it is good at and costs nothing.

So it now lives at `/feature/<slug>`, generic rather than hard-coded to GrandBlue, and is reached
from two places:

- the headline listing on the homepage, as "Read the feature" beside View and Enquire;
- the "Why GrandBlue" block on the listing page, as "Read the full feature".

Both links appear only when the listing has a `why` text, so the control is never inert. A
`/feature/` address for a listing without one says there is no feature yet and points at the
listing; an unknown slug says the feature is not available. `/editorial` redirects to the canonical
address, so the link Clent was given still works.

## The pieces, in order

1. **The opener.** A full-height photograph with the property type and locality as an eyebrow, the
   property name set at up to 118px in the display face, the summary, the price label and two
   actions: view and enquire. The copy aligns to the same 83px left edge as the wordmark above it
   at desktop width, which had to be measured rather than assumed — the page padding and the
   header's `.wrap` resolve to different numbers.
2. **The property.** The first paragraph of the `why` text held in docs/24, set at reading size in
   the display face beside a small label, at a 720px measure. Centred text was tried first and
   discarded: seven centred lines of 38px type is a poster, not a paragraph.
3. **Key facts.** The first four of the listing's own detail pairs, short values only, in a ruled
   four-column row. On GrandBlue that reads Beach, Airport, Bangkok, and Land and floor area — the
   last of which correctly says "To be confirmed" rather than a number nobody has supplied.
4. **The photographs.** A wide plate, a pair, and a second wide plate, all from the listing's own
   media. This is the part the homepage has no room for: GrandBlue has six photographs and the
   homepage shows one.
5. **Also with Porli.** The remaining five listings as full-width alternating rows rather than a
   three-column grid, each keeping its "Fictional listing · Generated image" line.
6. **A closing enquiry**, naming the property.

## Honest labelling is unchanged

The price line renders through the same `price()` helper as every card, so GrandBlue reads "Price
to be confirmed" and cannot read anything else. No room count, area or price is invented anywhere
on the page: the facts row prints the listing's own detail pairs and stops at four. Every fictional
listing carries its label. Every photograph keeps the alt text set by the imagery pass in docs/27,
which states whether it was supplied or generated.

## Motion

The opener's photograph runs the existing `kenburns` drift — transform only, 26 seconds, and
switched off twice over under reduced motion, once by the global rule in `styles.css` and once by
an explicit rule here. Sections use the site's existing `[data-reveal]` observer. Photographs lift
1.5% on hover behind a `hover: hover` query, so it never fires on touch. No new keyframes, no
JavaScript animation, nothing that moves anything other than transform and opacity. No CSP change.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. The route is presentation over the
  existing `/api/properties` response, so no endpoint or fixture changed.
- Every route walked at 1440px and 390px with reduced motion on and off: no horizontal overflow, no
  console errors, no failed requests, no broken images, no unnamed controls, no image without alt
  text, and nothing left below full opacity after scrolling.
- The four states of the new route were exercised rather than assumed: GrandBlue renders; a listing
  with no `why` says so and links to the listing; an unknown slug says the feature is unavailable;
  and `/editorial` rewrites its address to the canonical one.
- Both inbound links were clicked through, and confirmed absent on a fictional listing.
- Left edges measured rather than eyeballed: wordmark, opener copy, plates and rows all resolve to
  83px at 1440px.
- The photo aspect ratios were wrong on the first pass and looked right in a thumbnail. The `width`
  and `height` attributes on each image are presentational hints that beat `aspect-ratio` unless
  `height: auto` is set, so a row image rendered 1,032px tall instead of 411. Found by measuring the
  rendered row, not by looking at it.

## Limitations

- **The format leans on one listing having depth.** GrandBlue has six photographs and a written
  argument. No other listing has a `why` text, so GrandBlue is currently the only property with a
  feature page. The format is only as good as the listing's content, which is itself an argument for
  getting the remaining GrandBlue material.
- **Still blocked on the same facts.** Price, room count, land and floor area, sale terms and the
  written photograph permission are unresolved, and the format makes their absence more visible, not
  less: the facts row has a column that says "To be confirmed" in 24px type.
- **The homepage is unchanged apart from one link.** The nine-module stack and its competition for
  attention are still there. This change adds a place for the long read; it does not fix the front
  page, and whether that needs fixing is still open.
- **A feature page repeats the listing.** The argument, the facts and the photographs all appear on
  the listing page too, in a different arrangement. That is the nature of a feature, but it means
  two places to keep true if GrandBlue's material changes — both read from the same record, so they
  cannot disagree, but both will change together.


<!-- Source: 32-feature-page-second-pass.md -->

# Feature page, second pass: jump bar, named photographs, label plates

21 September 2026. Three additions to the GrandBlue feature page built in docs/31, taken as
structure from a single-development landing page Clent sent. None of its look, palette or type was
taken; it is a licensed template and, like the reference portal in docs/25, only its arrangement is
of any use here.

## Why that reference and not the other one

Two templates were reviewed. The first was a marketplace homepage built as a stack of ten modules,
which is the shape Porli's homepage already has, with the property grid repeated twice. Nothing in
it addressed the complaint that prompted docs/31.

The second is a one-page site for a single building: opener, the argument, alternating image and
text rows, gallery, a pricing table, contact. That is the same shape as the feature page, so its
ideas transfer directly. Three did.

## A jump bar

The feature page is about 7,000px. It now carries a bar of in-page links beneath the header — The
property, Key facts, Photographs, Also with Porli, Enquire — sticky, so it stays reachable the whole
way down.

Three things this needed rather than assumed:

- **It is a direct child of `.ed`.** A sticky element is bound by its containing block, which is the
  lesson docs/25 recorded when the search filter bar scrolled away with its parent.
- **The targets carry `scroll-margin-top`** of the header height plus the bar's own height, so a
  heading jumped to clears both instead of hiding under them. Verified by measuring the section top
  against the bar's bottom edge after a jump, at both widths.
- **It is opaque.** It was translucent with a backdrop blur first, matching the header, and the key
  facts row ghosted through it as it passed underneath. That read as a rendering fault rather than
  a material.

Hash links already worked: the router handles them, pushes the hash and scrolls, and uses an
instant scroll under reduced motion. Nothing new was needed for that.

Only sections that exist are listed. A listing without a `why` text or without enough photographs
gets a shorter bar rather than a link to nothing.

## Named photographs

The plate sequence showed six photographs with nothing visible saying what they were. The
alternative text said, but that is written to be read aloud, not to be read beside the image.

Photographs now carry an optional short `caption`, shown beneath the plate. Three decisions worth
recording:

- **Nothing is derived from the alternative text.** Slicing a caption out of an alt string was
  tried on paper and produced "The main pool" from a sentence that also mentioned the sun loungers
  and the hotel, and a caption for a guest room that repeated the property's full name. A caption
  is its own field.
- **The captions describe what the photograph shows**, from the same source as the alt text — the
  property's own photographs. They make no claim about price, size, room count or terms, so none of
  them touches the facts that are still to be confirmed.
- **Staff can edit them.** The media editor has a caption input beside the alternative text on every
  image row, capped at 60 characters, and the server rebuilds each media entry from known keys only
  so an unexpected field cannot be stored and a caption cannot outgrow its plate.

They are applied by an idempotent migration keyed by image, run on every start like the alt-text
pass in docs/27, so the live database is corrected as well as a fresh one. A caption already
present is never overwritten.

## Label plates on the rows

Each listing in "Also with Porli" now carries its type and locality on a small plate overlapping
the top corner of its photograph, on the side away from the copy, mirrored on the alternating rows.
It replaces the eyebrow that sat above the heading, so nothing was added to the page — a line moved
and gained a shape.

The plate overhangs the content column by 14px at desktop width, deliberately, which is the device
the reference uses. Measured on both sides to confirm it is symmetrical (69px on the left, the same
distance past the right edge on a flipped row) and that it never causes horizontal overflow at any
width.

It repeats words that are already on the page, so it is hidden from assistive technology and the
same type and locality are carried in a visually hidden line in the copy column. The photograph is
clipped in its own box inside the figure, so the hover lift cannot spill past the rounded corner
now that the figure has to let the caption and plate sit outside it.

## What was deliberately not taken

- **The build-stage tracker** — Planning, Building, Finishing works, Project done. GrandBlue is a
  trading hotel, which is the first thing docs/24 has it say about itself. A construction progress
  bar would assert the opposite and would be false.
- **The statistics band** — projects delivered, satisfied clients, prizes won. Porli has sold
  nothing. Same reason the proof strip in docs/26 is not built.
- **The testimonial** — nobody to quote.
- **The hero email capture** — there is no mailing list, and the instruction in AGENTS.md is not to
  fabricate emails.
- **The partner logo strip** — no partners.

## Held for when the facts arrive

The reference's strongest idea is a comparison table: a specification column on the left and a
column per apartment type, with area, balcony, parking and how many remain. GrandBlue has De Luxe
rooms, two-bedroom family rooms and a penthouse suite, so the equivalent would be the most useful
thing on the page.

It is not built, because every number in it would have to be invented. Room counts, areas and terms
are on the list of facts still to be confirmed with the property. This is the fourth item on that
list and the one that would pay back most.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls, no image without alt text.
- Reduced motion on and off at both widths: nothing left below full opacity once the reveal
  transitions settle, and no element still animating under reduced motion. An earlier reading of
  "one element hidden" was a sample taken mid-transition, not a stuck reveal; re-measured after a
  settled scroll.
- Keyboard: the jump bar is reachable by Tab, keeps a visible 3px focus ring, and activates on
  Enter, setting the hash and scrolling. Every link is a 52px target, above the 40px floor in
  docs/23.
- The captions were confirmed served by the API, rendered on the page and present and editable in
  the staff editor.
- Cache-busting versions bumped together to 16.

## Limitations

- **Only GrandBlue has captions.** The migration is keyed to its six images. Any other listing shows
  the plates without captions, which is the correct fallback but means the feature is currently one
  property deep — as is the feature page itself.
- **The jump bar takes 52px of a phone screen** on top of the header. It is the price of making a
  7,000px page navigable, but it is furniture, and docs/28 spent a pass removing furniture from
  phones.
- **The label plate repeats the copy column's own words.** Hiding it from assistive technology keeps
  that from being read twice, but a sighted reader still sees the same type and locality in two
  places when a row is narrow enough for the plate to sit above the heading.


<!-- Source: 33-homepage-redesign.md -->

# Homepage redesign

21 September 2026. Clent's direction: the Porli website is the task, and the homepage should be
redesigned using the reference sites sent during the session. Four were reviewed — an interior
design template, a commercial property site, a real estate marketplace template and a
single-development landing page. What each contributed, and what was refused, is recorded below.

## The problem the audit found

The homepage was eight modules and 4,920px: hero, headline listing, values strip, featured
destinations, recently viewed, available homes, what Porli does, commercial, account.

Three things were wrong with that, and all three are visible in a full-page capture rather than
arguable:

- **The hero ended in dead ground.** Below the search card sat roughly 200px of empty sand before
  the fold. The photograph's subject is at the top of the frame; the bottom was filler.
- **Two modules did the same job.** The four-item values strip (Curated listings, Direct to the
  team, Save and compare, A more open market) and the numbered service steps below it both
  explained what Porli is for, 1,500px apart.
- **The account strip was 126px of nothing** — a heading, a line and a button, given a section of
  its own.

And a fourth, which the reference sites made obvious rather than the audit: the headline listing,
though second on the page, read as a content block rather than as the centrepiece docs/23 asks for.

## What changed

**The headline listing lifts into the hero.** GrandBlue now sits on its own panel that rises 150px
into the photograph above it, so the featured property physically breaks the hero's lower edge. The
hero gives back the dead band, loses its scroll cue and its caption — both redundant once the next
section is already on screen and named — and the panel carries the property's type and locality as
an eyebrow above the name.

This is the device the single-development landing page uses for its three value cards. Applied to
the featured property instead, it is the strongest available answer to "make GrandBlue the
unmistakable centrepiece" that does not require the hero copy to choose between the residential and
commercial framings, which docs/23 section 9 reserves for Clent.

On a phone the effect is larger than on a desktop: the panel now appears at the first screen,
where the headline listing previously began well below the fold.

**The values strip is gone.** Its one point not already made by the numbered steps — that sale
method, areas, zoning and tenancy are shown plainly — moved into the service paragraph. A module
removed, nothing lost.

**The account strip is gone.** Its button moved beside "How Porli works" in the service block,
where a reader has just been told what an account is for. A module removed, the path kept.

**The grid became every listing, with a working filter.** "Available homes" showed three
residential listings and linked away for the rest. It is now "Available properties": every
available listing except the headline one, which has the section above it, with type pills — All,
Apartment, House, Industrial / Warehouse, Offices — filtering in place.

The pills are built from the types actually present, so no pill can return an empty grid, and they
are hidden entirely when there is only one type. Filtering hides cards in the page rather than
re-fetching or navigating, so the back button is not involved and no state is lost. Each change is
announced through a `role="status"` region.

This is the marketplace template's one genuinely good idea, and it closes a real gap: the homepage
grid previously had no filter at all.

**Cards lead with the property, not the price.** The price carried `order: -1` in a column flex
container, so it printed above the name and larger — meaning the biggest text on the GrandBlue card
read "Price to be confirmed". The name is now 19px in the display face, with the price beneath a
hairline rule in the same footer position both reference sites use.

docs/28 deferred this as leaning on the positioning question. It is still reversible in one rule,
and it is recorded here rather than buried: if Porli should lead with price, restore `order: -1` on
`.card-title .price` and the old sizes.

Eight modules became five, at 5,063px — slightly taller than before, because the grid now carries
five listings rather than three.

## A bug found on the way

The phone hero's search field rendered 260px tall, with the control's rows floating in empty space.
It had `flex: 1 1 260px`, written for a row where the basis is a width. Below 700px the row becomes
a column, where the same basis is a height.

It was on the live site, not introduced here — confirmed by measuring both before making the change
rather than assuming. The phone hero is 200px shorter for the fix.

## What was refused, and why

From the marketplace template: a second property grid (padding), an agents section (Porli has one
team), testimonials, a blog, and "Trusted By Over 150+ Major Companies". Its cities carried the same
fabricated count four times, where Porli's destination profiles count the live catalogue.

From the single-development page: the build-stage tracker — GrandBlue is a trading hotel, which is
the first thing docs/24 has it say about itself, and a construction progress bar would assert the
opposite; the statistics band; the testimonial; the hero email capture, there being no mailing list;
and the partner logo strip.

The pattern is the same in both: these templates are built to look full in a screenshot. Porli has
six listings, one of them real, and nothing sold. Every one of those modules would have been a
claim with nothing behind it, which is what the honest-labelling guardrail exists to prevent.

Neither template's look was taken. Both are licensed commercial templates, and Porli keeps its
ivory and olive palette, its single typeface and its restraint.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged. This is presentation over the existing
  `/api/properties` response.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls, no image without alt text. The card change is
  site-wide, so the search results and listing pages were walked with it.
- The overlap was measured, not eyeballed: the panel's top edge sits below both the search card and
  the popular locations row at 1440px, so it covers neither.
- The filter was exercised by clicking and by keyboard: correct cards shown for every pill, correct
  `aria-pressed` state, 40px targets, a visible 3px focus ring, and the status line announcing each
  change.
- Reduced motion on and off at both widths: nothing left below full opacity, no overflow.
- Cache-busting versions bumped together to 17.

## Limitations

- **The filter is one property type deep.** With five listings, three pills return a single card.
  It will read better with stock than it does now, and it is honest about what is there.
- **The second grid row is ragged.** Five cards in a three-column grid leaves a gap. Filtering
  changes the count anyway, so a fixed-count grid would fight the feature.
- **The hero copy is untouched.** "Homes to buy. / Property to invest in." still leads, because
  changing it means choosing between the residential and commercial framings. Flagged rather than
  guessed, for the fourth time.
- **The card hierarchy change is site-wide** and touches a question docs/28 reserved. Reversible in
  one rule, as above.


<!-- Source: 34-property-card.md -->

# The property card

21 September 2026. Clent pointed at the card in the marketplace template and said it reads well.
It does, and the reasons are specific. Applying them exposed two defects in Porli's own card that
had been shipping unnoticed.

## Two defects found

**Every commercial fact carried the same map pin.** A card for Millrace Warehouse read
1,150 m² floor · 2,400 m² land · 12 cars · Leased investment, with an identical pin icon against
all four. A pin means location, and none of those is a location. The residential card beside it
used a bed, a bath and a car, which each mean something. Four repeated symbols implying a
distinction that is not there are worse than no symbol at all.

**The fact limit did nothing.** The card asked for `facts(p, 2)`. That argument was honoured only
for land listings: residential hardcoded three, and the commercial branch never received it and
returned as many as it found. So a card asking for two facts printed three or four. This is why
commercial cards were two rows taller than the houses beside them — four facts plus a sale-method
line against three facts and none.

## What was taken from the reference

- **The locality sits on the photograph**, bottom left with a pin, over a gradient. The pin is
  correct there, which it was not on the facts it used to decorate, and the body gains a row.
- **The body reads name, then facts, then a footer.** The name leads at 19px in the display face.
- **A footer row divided by a rule**, with the price right-aligned in its own slot. The template
  puts an agent's avatar and name on the left of that row. Porli has one team, not named agents, so
  the slot carries the listing's own label — "Fictional listing · Generated image", or when the
  listing is real, when it was listed.
- **The card is a panel**: white, hairline border, soft shadow, with the photograph inset and
  rounded inside it. Previously the card was flat on the page background and its photograph ran to
  the edge. This is the change that makes a card read as an object, and it matches the panel the
  headline listing now sits on (docs/33).

## What was not taken

The agent row, for the reason above. The blue. Square feet, where Porli uses square metres.
"Beds: 2" labelling, where "2 beds" is better English and the icon already says which.

## What else changed as a consequence

**Facts are capped at three, and commercial facts are reordered** to floor area, land area,
tenancy, car spaces. Tenancy previously sat behind car spaces, which is backwards for an investment
buyer: "Leased investment" is what they are scanning for, and car spaces on a warehouse is close to
noise. With the cap, tenancy stays on the card and car spaces move to the listing page, which shows
everything.

**The sale-method line is gone from cards.** It was the second of the two extra rows. The sale
method remains on the listing page and in the search filters, and the tenancy fact carries the
related information a card has room for.

**The photograph dots are gone.** With the locality now in the bottom-left band, the counter, the
arrows and a row of dots were three indicators of the same thing. The counter and arrows stay.

**"Price on request" is gone as a badge**, from cards and from the homepage headline panel. Both
now print the price label in a clear slot of its own, so a badge repeating it is exactly the
duplication docs/25 set out to remove — it had survived because the rule demoted it rather than
dropping it.

All cards in a row are now the same height, commercial and residential alike, which was the visible
symptom that started this.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px. The card is used on the homepage, both search sectors, the
  listing page's similar properties and the saved list, so this is a site-wide change: no
  horizontal overflow, no console errors, no failed requests, no broken images, no unnamed
  controls.
- Card heights measured per row: one distinct height across every desktop row on the homepage and
  both search sectors, where commercial cards were previously taller.
- The icons were checked by reading the rendered `path` data rather than by looking: three distinct
  paths per card, where commercial cards previously repeated one path four times.
- The locality overlay was tested for collision against the photograph counter on every card at
  both widths — none — and for truncation, with an ellipsis reserved and 74px kept clear for the
  counter.
- Reduced motion on and off at both widths.
- Cache-busting versions bumped together to 18.

## Limitations

- **The footer's left slot is a label, not a person.** The template's agent row gives that side of
  the rule a face and a name. Porli's equivalent is a line of small grey text, which is quieter.
  If the trading entity is ever settled and listings carry a named contact, that slot is where it
  belongs.
- **The locality overlay depends on the photograph's lower edge being calm.** A busy or pale
  bottom-left corner is handled by the gradient and a text shadow, but a photograph that is white
  in that corner will read less clearly than one that is not.
- **Car spaces no longer appear on commercial cards.** That is deliberate, and it is a real
  omission for anyone scanning for parking rather than tenancy.


<!-- Source: 35-showcase-grid.md -->

# The showcase grid

21 September 2026. Clent sent a fifth reference and asked for its arrangement on the Available
properties section: photographs first, three across then two wider, with each card's details
appearing only when the cursor is over it.

## What was built

The grid is six columns. The first three listings span two columns each, the last two span three,
which is three across then two wider and is exactly the five listings the grid holds. The pattern
applies only when nothing is filtered — a filtered grid has a different count, so it falls back to
equal thirds rather than leaving a hole. Below 1000px it becomes two across; below 640px, one.

Each card is a photograph with its badges. The detail panel — name, facts, label and price — rests
out of sight and arrives on a white panel inset from the photograph's lower edge.

All five cards are the same height at every width, which the card pass in docs/34 established and
this keeps.

## The two problems a hover-only reveal creates, and how each is answered

A reveal that depends on a cursor excludes everyone without one and hides information a marketplace
exists to show. Neither was left to chance.

**Nobody loses the information.** The panel is always in the document, so a screen reader reads it
in place whether or not it is painted. It is hidden only inside
`@media (hover: hover) and (pointer: fine)`, so a touch screen, a tablet and every narrow layout
never enter that rule and keep exactly the card they had. And it arrives on `:focus-within` as well
as `:hover`, so tabbing to a card's name reveals it the way pointing at it does.

Verified rather than assumed: at 1440px with a fine pointer all five panels rest at opacity 0,
hovering the second raises only the second, and focusing the third raises only the third. On an
emulated phone and an emulated touch tablet, `(hover: hover) and (pointer: fine)` is false and all
five panels sit at opacity 1 with their names readable.

**The fictional label cannot depend on a hover.** The honest-labelling guardrail says fictional
listings say so, and "Fictional listing · Generated image" lives in the panel that is now hidden at
rest. Without a change, the grid would show five photographs that read as real property.

So a showcase card carries a second badge, "Fictional", beside its type, on the photograph, visible
at rest. The full line stays in the panel. This is the one place where the badge is not duplication
of the kind docs/34 removed: at rest there is nothing to duplicate.

It is a variant, not a new default. `card(p, true)` marks the card, and only the homepage's
Available properties grid asks for it. The search results, the similar properties on a listing page
and the saved list keep the card from docs/34, because those are pages for comparing listings and
hiding the price behind a hover would work against them.

## Motion

Opacity and a 12px translate, 340ms, plus a 4% photograph scale on hover. Transform and opacity
only. Under reduced motion the transition is removed and the photograph does not scale: the panel
still appears on hover, it simply appears rather than arriving.

## The cost, stated plainly

At rest the grid shows five photographs, a type and a fictional marker. **A visitor cannot compare
prices, sizes or names without hovering each card in turn.** That is a gallery, not a comparison
table, and comparison is what a property marketplace is for.

It is the right pattern for a homepage module whose job is to invite a click, and the wrong one for
search results, which is why it was not applied there. If the homepage grid is ever meant to be
scanned rather than browsed, this should be reconsidered — the fallback already exists, since
removing one media query returns the docs/34 card.

## A bug the route walk caught

The variant flag was a second positional argument, `card(p, true)`. Three call sites passed the
function straight to `Array.map`, which calls it with `(item, index, array)` — so the index arrived
as the flag, and **every card after the first on the search results, the similar-properties strip
and the saved list rendered as a showcase card**, with its price hidden behind a hover on precisely
the pages where a price must be visible.

Nothing looked wrong in a screenshot of the homepage, which is what had been checked. The walk of
every route is what surfaced it, in a line of badge text reading "ApartmentFictional" on a search
result that should not have had that badge at all.

Fixed twice over: the flag is now matched strictly, so an index can never switch it on, and the
three call sites pass an explicit arrow function.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- Rest, hover and focus states measured by reading computed opacity on all five panels, at 1440px.
- Pointer capability checked on emulated phone and touch tablet: the fine-pointer query is false
  and every panel is visible.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- Card widths measured: 410px for the first three and 626px for the last two at 1440px, all 331px
  tall.
- Reduced motion on and off.
- Every page that renders a card checked for which variant it got: the search results, the
  similar-properties strip and the saved list use the comparable card with visible prices, and the
  homepage's Recently viewed strip does too. Only Available properties is a showcase.
- Cache-busting versions bumped together to 19.

## Limitations

- **The locality is not shown on a showcase card.** It moved onto the photograph in docs/34, and
  the photograph now carries badges at rest instead. The locality is in the panel, on hover.
- **The gradient over the photograph's lower edge is switched off here**, since nothing at rest
  needs it. The photograph counter keeps its own dark pill, so it stays legible.
- **Five listings is the whole grid.** The three-across-then-two-wider rhythm is exactly right for
  five and will need revisiting at six or more, where a plain three-column grid may read better.


<!-- Source: 36-recently-viewed-removed.md -->

# Recently viewed, removed

21 September 2026. Clent, looking at the strip on the live site: "I don't think recently view
works?" He was right, and the reason is arithmetic rather than taste.

## What the measurement showed

Four listings were opened, then the homepage was measured as a returning visitor sees it:

| Listing | Headline panel | Available properties | Recently viewed |
|---|---|---|---|
| GrandBlue Resort & Beachclub | yes | — | yes |
| Veranda House | — | yes | yes |
| Garden Apartment | — | yes | yes |
| Courtyard House | — | yes | yes |

**Four of the six listings rendered twice on one page.** The strip was not broken; it did exactly
what docs/26 built it to do. "Pick up where you left off" solves finding a listing again among
thousands. With six, the grid directly beneath it already shows everything, so the strip can only
be a second copy of what is above it.

This is the same duplication removed from the homepage in docs/33, when the values strip and the
account strip both turned out to repeat a block further down. Those two were 1,500px apart and
visible in one capture. This one only appears to a visitor who has already opened listings, which
is why it survived that pass.

## A defect it exposed

GrandBlue's card in the strip measured **409px against 361px** for the three houses beside it. Its
facts are long labelled pairs that each wrap to their own line, where a house gets three short
inline items.

This corrects a statement in docs/34, which said every card in a row is the same height. That holds
on the search results and on the showcase grid, where a card is itself a grid item and stretches.
It did not hold here, because a card in the strip sits inside a `[data-reveal]` wrapper: the
wrapper stretches and the card inside it does not. Only this strip was affected.

## What was removed, and what was kept

**The section is gone** and the homepage stays at five modules. Adding something else made of
listing cards would have the same problem — at six listings, every strip is a copy of the grid — so
nothing replaces it.

**Nothing is recorded any more.** The `rememberViewed` call is removed from the listing page. This
is not tidiness: docs/26 argued that a site which quietly remembers what you looked at should say
that it does, and the line saying so lived in the strip. Storing a browsing history with nothing on
the site disclosing it would be worse than storing none.

**History already on a device is cleared.** Removing the write stops new history; it does not
remove what a visitor stored under the old build. Leaving it there is the same problem in a
quieter form — data held on someone's device for a feature that no longer exists and no longer
discloses itself. The key is removed once on load, in a `try`/`catch` like every other storage
access here.

**The code is kept**, parked rather than deleted: `recentlyViewed` and `rememberViewed` stay in
`experience.js` behind a comment explaining why they are unused and how to restore them, and the
strip's CSS stays with one rule added that fixes the height defect above, so a restored strip does
not carry it.

Restoring is a two-line change: render the section in `homeView` again, and call `rememberViewed`
from `detail()`.

## When to bring it back

When the catalogue is large enough that a visitor cannot reasonably find a listing again from the
homepage — a few dozen, not six — and when the grid below it no longer shows the whole catalogue.
The disclosure line must come back with it.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- Three listings opened, then local storage read directly: `porli-viewed` is `null`, so nothing is
  stored.
- A visitor carrying history from the old build was simulated by writing the key and reloading: it
  reads `null` afterwards, with no error and no strip.
- The homepage as a returning visitor: no strip, five modules, five cards, and **no listing name
  appearing twice**.
- 28 routes walked at 1440px and 390px: no horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls. The listing page was exercised directly, since
  that is where the removed call lived.
- The homepage is 4,696px, and a returning visitor no longer sees roughly 470px of repeated stock.
- Cache-busting versions bumped together to 20.

## Limitations

- **Two exported functions and a block of CSS are now unused.** That is deliberate and documented
  here, but it is dead code until the strip returns, and it should be deleted if the decision is
  ever made not to bring it back.
- **A returning visitor loses a genuine convenience.** At this catalogue size the cost is close to
  nothing; it will not stay that way, and nothing currently watches for the point at which it
  matters again.


<!-- Source: 37-what-porli-does.md -->

# What Porli does, rebuilt as a photograph and a panel

21 September 2026. Clent sent the benefits section from the marketplace template and asked for the
homepage's "What Porli does" block in that format.

## What was taken

- **A full-bleed photograph on one side**, running to the edge of the viewport rather than sitting
  inside the page gutter, with a tinted panel filling the other half.
- **The panel's order**: eyebrow, heading, a short intro, then a stack of cards.
- **Each point as its own white card** on the tint, rather than rows divided by a hairline rule.

## What was kept from Porli

The palette. The reference's panel is a pale blue and its cards are white; Porli's panel keeps the
pale green the section already used and the cards are white on it. The display face for the
heading. And the numbered steps: the reference's three cards are parallel claims — Proven
Expertise, Customized Solutions, Transparent Partnerships — where Porli's three are a sequence a
buyer actually moves through, so 01, 02 and 03 stay.

That difference is worth naming, because it is the reason the section survives at all. The
reference's three cards say the agency is experienced, tailored and transparent. None of those is
checkable and Porli has no basis for any of them. Porli's three say what the site does: search,
shortlist, enquire. Same shape, and every line is something the site actually does.

## The icons were removed

At Clent's direction, and it is the right call. The reference's cards carry no icon, and Porli's
three were a search glass, a heart and a speech bubble repeating what the heading beside each one
already said. Each card is now its number and its words. The number keeps the left column, aligned
to the heading's baseline rather than centred against a block that no longer exists.

The three `.service-icon` rules and the `.step-head` wrapper they needed were deleted rather than
left behind, since nothing else used them.

## What else changed

**The commercial block's photograph moved to the other side.** It sits directly below this section
and also pairs a photograph with text. Two photo-left splits running together read as one long
column of images, so the page now alternates. Below 860px both stack, and the order reverts.

## Two defects found while building it

**The heading ran together at phone width.** The three lines are `<br>`-separated with no spaces
around the tags, and a media query hid the `<br>`s below 1000px so the heading could wrap freely.
Without them the text concatenated: "Talk to the peoplewho manage it." Checked at six widths from
1440px down to 360px after removing the rule — the three lines fit at every one, so the breaks
stay.

**The step number and icon floated against the text.** Stacked in a column aligned to the top of
the card, the icon sat below the number and beside the second line of the paragraph rather than
relating to anything. It was centred against the text block, and then the icons were removed
altogether, which settles it.

## A third defect, found after release

The numbers sat flush against the left edge of their cards, with no padding between them and the
white, and the text ran to the card's right edge too.

The cause was not a missing value. `.service-steps>div` — the rule for the divided rows this
section used to have — was still in the stylesheet, and at one class plus one element it
out-specifies `.step-card` at one class. So the card kept the old row's `padding: 24px 0`, its
22px gap, its top alignment and its divider line, and only picked up the white background, radius
and border because the old rule said nothing about those.

Measured rather than adjusted by eye: computed `padding-left` read `0px` where the card asks for
22px. The four dead rules were deleted, which is the fix; nudging the number would have left three
other wrong values in place.

The numbers now sit 23px inside the card and the heading 59px, with their baselines aligned to
within a pixel, at both widths.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The section is confirmed full-bleed: its width equals the viewport width at 1440px and 390px,
  with no horizontal overflow.
- The photograph is confirmed loaded and cover-filling its half; the three cards are measured at
  equal height on desktop.
- The heading measured at 1440, 1000, 860, 700, 390 and 360px: three lines at every width, no
  overflow, no concatenation.
- The commercial photograph's computed `order` is 2 on desktop and 0 below 860px.
- 28 routes walked at 1440px and 390px: no console errors, no failed requests, no broken images,
  no unnamed controls.
- Card padding, number and heading offsets and baseline alignment measured at both widths after
  the dead rules were removed, rather than judged from a screenshot.
- Reduced motion on and off. Cache-busting versions bumped together to 23.

## Limitations

- **The photograph is a generated concept image** of a fictional apartment interior, and its
  alternative text says so. It is decoration for a section about the service rather than a
  photograph of anything Porli owns or sells, which is the honest reading but not a strong one.
  A photograph of the actual team or office would do this job better, and there is neither.
- **The cards have a hover lift on a section with no links in them.** The lift is a small
  affordance on a static card, which is a mild dishonesty of the kind a hover state usually
  implies. It is behind a `hover: hover` query and does nothing on touch.
- **The panel's maximum width is 620px.** On a very wide screen the tinted half keeps growing while
  the content stays put, so the text sits left of centre in its half rather than centred.


<!-- Source: 38-renamed-to-realdistrict.md -->

# Renamed to RealDistrict, and the bare dividers removed

21 September 2026. Two instructions from Clent in one message: remove the hairline rules that made
the page look machine-assembled, and change the product name from Porli to RealDistrict.

## The name

The name was on the list of things docs/23 reserved for Clent, alongside the trading entity, the
revenue model and the commercial-or-residential question. This is Clent making that decision, which
is the path the guardrail describes, so it is recorded here rather than flagged back.

It supersedes **D001** ("Working name Porli"), which had stood since the first day.

**What it does not settle.** D009 — commercial model and brand availability — is unchanged and
still open. Nobody has checked whether RealDistrict is available as a company name, a domain or a
trade mark, any more than Porli was. The rename moves the same unanswered question to a new word.

## What was renamed

Everything a visitor or a staff member reads: the wordmark, page titles, the meta description,
navigation and footer, the about and contact copy, the enquiry card, error and empty states, the
staff-area message, and the seeded property text that ends "to be confirmed with the RealDistrict
team".

Because the production database is a Cloudflare Durable Object that is never rebuilt, the seeded
text was already stored under the old name. A migration rewrites the prose columns of `properties`,
`users` and `settings` on every start. It is idempotent by construction: once the old name is gone,
each replacement is a no-op. Only prose is touched — ids, slugs and image paths keep the names they
were created with.

## What was not renamed, on purpose

- **The address.** The site is still served from `porli.clent.workers.dev`. Renaming the Worker
  changes the live URL and takes the old one out of service, which is a deployment decision rather
  than a design one. Flagged for Clent.
- **The repository, the package name, `lib/porli.mjs`, `createPorli`, the CSS class prefixes and
  the database identifiers.** These are internal names nobody reads, and changing them is churn
  with a real chance of breaking the deployment. They can be renamed in their own pass if wanted.
- **The dated change records in `docs/13` to `docs/37`.** They describe what was decided on a given
  day under the name in use at the time. Rewriting them would falsify the record. This document and
  the decision log are where a reader learns the current name.

## Two defects the longer name exposed

Both were regressions caused by the rename, both confirmed against the live site before fixing, and
neither would have shown on the desktop screenshots.

**The header overflowed on small phones.** Twelve characters where there were five. At 390px the
page ran 50px past the viewport, and 61px at 360px. The wordmark drops from 43px to 36px and takes
proportional tracking rather than a fixed −3px, which was tuned for a short lowercase word; below
420px the header tightens further. Below 360px the two inline sector links give way to the explore
menu beside them, which carries the same destinations — this narrows the claim in docs/28 that they
are visible at every width, to 360px and above. Measured clean from 1440px down to 280px.

**The staff workspace overflowed at 390px, on all eight pages.** The header's account button prints
the first word of the signed-in user's name, and the bootstrap administrator was called "Porli
administrator", so the rename made that first word "RealDistrict" — the brand, printed twice in one
header, 30px past the edge.

Two fixes, because one would not have been enough. The button is now capped and truncates, so no
name can do this again whatever it is. And the bootstrap display name became "Site administrator",
in the seed and by migration for both old spellings, because a user called after the product was
always going to read strangely beside the wordmark.

## The bare dividers

Measured rather than hunted: every border on the homepage was read from the rendered page and
sorted by width. Two were full-page hairlines belonging to no component — `.market-listings` above
the property grid, and the top and bottom of `.market-service`. Each separated two areas that were
already the same colour, with the page's own spacing between them.

Both are gone. Every remaining rule belongs to something: a card footer, a facts list, a chip, a
button, the headline panel's outline. The service section keeps its tinted panel, which separates
it without needing a line drawn round it.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- 28 routes walked at 1440px and 390px. The walk is what caught the staff-workspace regression: it
  reported ten routes needing a look where two is the steady state, and all eight extra were admin
  pages at 390px.
- Header measured at 1440, 768, 430, 390, 360, 359, 320 and 280px: no overflow at any width, and
  the explore menu present at all of them.
- The rename migration tested the way it will actually run: the old name was written back into an
  existing database, the server restarted, and the text read back. Prose and the administrator's
  name were both rewritten.
- Borders re-read from the rendered page: no bare full-width rules remain.
- Reduced motion on and off at both widths. Cache-busting versions bumped together to 24.

## Limitations

- **The live address still says the old name**, which will read oddly until the Worker is renamed
  or a domain is attached. That is the most visible loose end.
- **Brand availability is still unchecked**, as it was for Porli.
- **The wordmark is a text setting, not a logotype.** A twelve-character name in a tightly tracked
  sans is a placeholder; it held up at every width tested, but a real mark would be drawn.
- **The historical documents still say Porli**, deliberately, which means a reader who opens
  docs/24 before this one will meet the old name with no signpost until they reach the decision log.


<!-- Source: 39-explore-list-and-overview.md -->

# The explore list, and the listing page overview

21 September 2026. Three instructions from Clent: remove the remaining hairlines on the feature
page, rebuild its "Also with" section in the layout of a category list he sent, and take the way
the reference listing page presents a property's information — while leaving the enquiry card
alone.

## Lines removed from the feature page

Eight bare hairlines were measured on the live page: one under the section heading, six between the
property rows, and one above the key facts, plus the vertical dividers inside the facts row.

The six row rules disappeared with the rebuild below. The rest are deleted.

The jump bar's own rule was kept at first, on the grounds that the edge of a bar floating over
content is doing a job. Clent pointed at it again, and he is right: at rest the bar sits on the
same paper as everything else, so the rule reads as a stray line across the page rather than as an
edge. It is now a soft shadow, which shows as nothing at rest and gives the bar depth once content
scrolls beneath it. **No full-width rule is left on the page.**

The key facts now separate by spacing rather than by a grid of rules.

## Also with RealDistrict became an explore list

The section was five alternating image-and-text rows, each a screen tall. It is now a list of the
five properties beside one large photograph: pointing at a row, or tabbing to it, lifts that row
onto a white card and brings its photograph forward.

**Every row is a link first.** The photograph swap is an enhancement on top: with the script
absent, or on a touch screen where there is no pointer, the list still reads and every row still
opens its property — the photograph simply stays on the first. Tapping a row goes to the listing
rather than changing the picture, which is what someone on a phone wants from a list of properties.

Each row carries the property's name, its price and, where the listing is fictional, that label.
The fictional marker is in the row itself rather than on the photograph, because only one
photograph is shown at a time and four of the five rows would otherwise be unlabelled.

The active card is white with an edge and a deeper shadow, on a tinted panel. White alone did not
read as lifted against a page that is already almost white.

The dead `.ed-row` rules were deleted rather than left in place — eighteen of them. Leaving a
superseded rule behind is exactly how the step-card padding bug in docs/37 happened, twice over.

## The listing page overview

From the reference: the measurable facts as a grid of tiles with an icon, a label and a value,
before the details table, rather than only inside it.

Each tile is built from a field the listing actually carries, so a listing without areas or a
tenancy shows fewer tiles and never a blank one. GrandBlue shows three — type, sale method and when
it was listed — because its areas and room counts are the facts still to be confirmed. Millrace
Warehouse shows seven. The grid uses `auto-fit` rather than a fixed four columns, after a first
pass left a grey cell where a fourth tile would have been.

Features are now ticked and set in three columns, as the reference sets out its amenities. The em
dash that `styles.css` prints before each feature is switched off here, having printed beside the
tick on the first pass.

**The enquiry card is untouched**, at Clent's instruction. It was checked on every listing after
each change rather than assumed.

## What was not taken from the reference

Its loan calculator, guest reviews, comment form, "Why choose us", agent contact card and "Latest
properties" sidebar. The calculator would invent a rate; the reviews and comments have nobody to
quote; the agent card names a person who does not exist. The same pattern as every other reference
this week: the parts that carry information transfer, the parts that manufacture credibility do not.

Its floor-plan accordion and file attachments were not taken either, for a different reason —
RealDistrict already has a documents section that names the expected documents and offers an
enquiry where one is missing, which is better behaviour than a chip that is simply absent.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The explore list measured in three states at 1440px: first row active by default, hovering the
  third moves the card and the photograph to the third, focusing the fifth moves both to the fifth.
  All five rows carry a correct link.
- Borders re-read from the rendered feature page: **no full-width rules left**. The sixteen that
  remain are list-row separators and button edges.
- The jump bar re-tested after losing its rule: each link still sets the hash, scrolls, and
  leaves the target heading clear of the bar, at both widths.
- Overview tiles read from three listings — a hotel, a house and a warehouse — at both widths, and
  the enquiry card confirmed present on each.
- Tap targets on the explore rows: 79px at desktop, 94px and above on a phone, against the 40px
  floor in docs/23.
- 28 routes walked at 1440px and 390px. Reduced motion on and off.
- Cache-busting versions bumped together to 26.

## Limitations

- **On a touch screen the explore photograph never changes.** There is no pointer to follow and a
  tap belongs to the link. The first property's photograph is what a phone visitor sees, with the
  list beneath it.
- **The overview repeats the facts line at the top of the page** for a residential listing, which
  shows bedrooms, bathrooms and car spaces in both places. The reference does the same, and the top
  line is a glance while the tiles are the full set, but it is duplication.
- **GrandBlue's overview is three tiles.** That is honest — the missing tiles are the facts nobody
  has supplied — but it reads thin beside a warehouse showing seven.


<!-- Source: 40-footer-sign-off.md -->

# The footer sign-off

22 September 2026. Clent sent a reference footer and liked how it ends: the name set very large
across the foot of the page, fading into a dark ground.

## What the footer was ending on

A 224px strip: wordmark, tagline, six links, a copyright line and a currency note, on the same pale
ground as the page above it. Nothing wrong with any of it, but the page stopped rather than ended.

## What was taken

The oversized name as a closing device, and the gradient that dissolves it into the ground. The
footer is now a deep olive panel — the palette's existing `--deep`, not the reference's black —
with the name in ivory fading downward.

It is decoration. The footer already carries the wordmark as a link at the top, so the large
setting is hidden from assistive technology rather than announcing the name a second time.

At 1440px it sets at 214px and spans the page's own measure rather than bleeding to the viewport
edge, which keeps it on the same grid as everything above it. It scales down to 49px at 320px.
"RealDistrict" is twelve characters where the reference's name is six, so the letters are about
half the size at the same width — still the same presence, less monumental.

`background-clip: text` carries the gradient, with a flat olive fallback behind `@supports` for
anything that does not support it. No image, no script.

## The wordmark above it shrank

With the name set large at the foot of the panel, the wordmark at the top of the footer was a
second statement of the same thing, at 45px. It is now 28px, and 24px on a phone — a label above
the links rather than a headline.

It also still carried `letter-spacing: -3px`, tuned for the five-character name the site had
before. That is now proportional, matching the header.

## What was refused, and why it matters here

The rest of that footer was four columns: a postal address, a telephone number and an email; a
"Chat With An Expert" card with a photograph and a green "Online now" dot; a newsletter signup; and
five social icons.

None of it was taken, and this is not a style judgement. **RealDistrict's own contact page says, in
plain words, "There is no live agency telephone number, email service or physical office attached
to it."** An address and a phone number in the footer would contradict a page on the same site. The
expert card would invent a person and claim they are available now. The newsletter would collect
addresses with nothing behind it, which the brief forbids. The social icons would be five controls
linking to accounts that do not exist — the "silently inert control" the definition of done rules
out.

Stripped of those, what the reference has left is the columns RealDistrict already had. So the
change is the sign-off and the dark ground, and nothing else.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- The sign-off measured at 1440, 1024, 768, 430, 390, 360 and 320px: it fits inside the viewport at
  every width, with no horizontal overflow anywhere.
- **Contrast checked against the new dark ground**, which is the real risk in inverting a panel.
  Every distinct text colour in the footer was read from the rendered page and measured: 12.19:1
  for the wordmark, 8.14:1 for the navigation, 9.65:1 for the legal links and 6.87:1 for the
  tagline and copyright, against thresholds of 4.5:1 and 3:1. All pass WCAG AA. Re-measured after
  the wordmark shrank, since a smaller size raises the threshold it has to clear.
- 28 routes walked at 1440px and 390px; reduced motion on and off.
- Cache-busting versions bumped together to 28.

## Limitations

- **The name is the least verified thing on the site.** D009 — brand availability — is still open:
  nobody has checked whether RealDistrict is free as a company name, a domain or a trade mark. This
  change sets that name 214px tall across the foot of every page, which is the most emphatic
  possible statement of it. One value reverses it, so the cost is low, but the emphasis is real.
- **It is a text setting, not a logotype.** A drawn mark would sit better at this size.
- **The footer is now 469px at desktop**, up from 224px. That is the price of an ending.


<!-- Source: 41-listing-rows.md -->

# Rules off the listing rows, and a table that repeated itself

22 September 2026. Clent pointed at the Property details table and asked for its rules gone on
every listing page. Measuring the page to find them turned up something worse.

## The rules

Every border on a listing page was read from the rendered page. Four were hairlines drawn between
rows of the same colour: the details table's row rules, the rule above the documents list, the
rules between document rows, and the divider above the similar properties. All four are gone;
spacing separates those rows now.

What remains belongs to something: the overview grid's own frame, the enquiry card, buttons,
property cards, the card footers and a link underline.

## The table repeated the tiles

The overview grid added the day before prints the listing's structured fields. Where staff had also
typed the same fact into the free-text details list, the table beneath repeated the tiles row for
row.

On Millrace Warehouse and Highstreet Offices that was **every single row** — Floor area, Land area,
Zoning, Tenancy, Car spaces, all five already tiles directly above. The details table now drops any
row whose label the overview already shows, and hides entirely when nothing is left.

This was checked against the data rather than the rendering, because a table disappearing is the
kind of change that can quietly lose information:

| Listing | `details` held | Table now |
|---|---|---|
| Millrace Warehouse | the five labels above | hidden — all five are tiles |
| Highstreet Offices | the same five | hidden — all five are tiles |
| Veranda House | empty | hidden, as before |
| Garden Apartment | empty | hidden, as before |
| Courtyard House | empty | hidden, as before |
| GrandBlue | Beach, Airport, Bangkok, Property, Address, Rooms, Land and floor area, Pattaya, Rayong city, Koh Samet | all ten kept |

Nothing is lost. The three houses never had a details table — their `details` list is empty — so
for them this changes nothing at all. The two commercial listings lose a block that said what the
tiles had already said. GrandBlue, whose details are genuinely different facts, keeps all ten rows.

That duplication was introduced by the overview grid, so it is a defect of that change rather than
a pre-existing one.

## Verification

- `npm run check` and `npm test` pass; 28 tests, unchanged.
- All six listings checked at 1440px and 390px: zero overlap between tiles and table rows
  anywhere, the enquiry card present on every one, no horizontal overflow, no console errors.
- The underlying `details` field read from the API for each listing to confirm what a hidden table
  had contained.
- Borders re-read from the rendered page: no row rules left, only component edges.
- 28 routes walked at both widths.
- Cache-busting versions bumped together to 30.

## Limitations

- **The match is by label text.** A listing whose details say "Floor Area (approx)" where the tile
  says "Floor area" would show both. The comparison is trimmed and case-insensitive, but it is not
  fuzzy, and it cannot be: guessing that two differently worded labels mean the same fact is how a
  listing ends up hiding something it should show.
- **Staff can still type a duplicate** into the details field and see it disappear from the page
  with no explanation in the editor. The editor does not warn that the overview already covers a
  field.

<!-- Source: 42-logomark.md -->

# The logomark

22 September 2026. Clent asked for a wordmark for RealDistrict, looked at a run of options over
several rounds, and chose one: a D with the R cut through it as a single continuous channel.

## What was tried and rejected

The rounds, in order, and why each one fell:

- **Four abstract marks** and **four RD monograms.** One of the monograms, a shared-stem RD, read
  as a B once it was small. Rejected.
- **An R nested inside a D** as two shapes. Every version had a visible seam where the letters
  met and stopped reading below 32px. Rejected.
- **Knockout variants** of the same idea. Two of the five read as P or B. Rejected.
- **A parcel mark**: four blocks, the right column rounded. Legible at 16px, but it is not a
  letter and Clent moved on to a brand sheet that showed the channel idea.
- **A first reconstruction of the channel** built from three filled rectangles. The channel came
  out as a sliver and the R did not read. Reported as a failure; Clent said try again.
- **The channel drawn as a stroke.** Constant width for free, mitred corners, one path. Four
  variants: stem stopping at the bowl, stem running through, a heavier stroke, and a tile. The
  full-stem version was the only one whose R still read at 16px. It is the one Clent chose.

## The mark

A solid D, flat on the left and a half-circle on the right. Through it runs one channel, 13/82 of
the mark's width: down the full height as the R's stem, round a 16-unit bowl, and out of the
bottom edge as the leg. The channel is a mask, not a paint. It is cut out of the D, so whatever
sits behind the mark shows through it — paper in the header, deep olive in the footer, the tile in
the favicon — and the D itself takes `currentColor`, which is why it is ink beside the ink
wordmark and white beside the white one without a second file.

Source: `design/realdistrict-mark.svg`, olive on a transparent ground, square on the D. Recorded in
the asset register as drawn in-house, not generated and not a photograph.

## Where it appears

- **Header and footer**, before the name, inline in the markup that `app.js` already writes. Each
  instance carries its own mask id (`mark-header`, `mark-footer`) because two masks with one id in
  the same document resolve to the first. It is `aria-hidden`: the link already reads
  "RealDistrict home".
- **The favicon**, replacing the Georgia lowercase p that had stood in since the first commit:
  the same mark in paper on a deep olive tile with a 22-unit corner. Rendered at 64, 32 and 16px;
  the R reads at all three, and on a dark tab bar.

It is sized in em (0.84 of the wordmark's font size), so every existing wordmark size rule — 36px
in the header, 28 in the footer, 23, 20 and now 19 and 17 on phones — carries it along without
its own breakpoints.

## What it cost, and what gave

The mark adds 23px to a header that was already at its limit on phones after the rename
(docs/38). Measured signed in, the row ran 15px over at 390px and 36px over at 360px; signed out,
10px over at 360px. Three small things give below 420px: the account button drops its decorative
user icon and keeps the first name, the wordmark tightens from 20px to 19px and its gap closes a
little, and from 375px down the wordmark steps to 17px. Measured afterwards at 390, 375, 360, 359
and 320px, signed out, as a customer and as staff: no overflow anywhere. The rule from docs/38 that
hides the sector links below 360px is untouched.

The 28-route walk at 1440px and 390px is back at its steady state: 54 clean, the two expected
404 rows for the not-found page.

## Verification

- Header mark 30×30px at 1440px beside the 36px name; footer mark 24×24px in white; fill
  `currentColor`, stroke none (the global icon stroke is undone on the mark).
- Mask ids unique per instance; the favicon and design source each carry their own.
- Content Security Policy unchanged: the SVG is DOM markup written by the bundled script and an
  image file, with no inline style or script.
- Route walk and header overflow measurements as above.

## Limitations

- **The mark was drawn by hand as SVG paths, not by a designer.** It is a sound specimen and it
  survives 16px, but the bowl and leg were placed by measurement, not by eye at every optical
  size. A designer refining it should start from the source file and keep the channel width.
- **One colour only.** The D takes the text colour it sits beside. There is no two-tone version
  and no reversed lock-up beyond what `currentColor` gives.
- **Brand availability is still unchecked** (D009). A mark makes the name look more settled than
  it is; nobody has searched company names, domains or trade marks for RealDistrict.
- **The old favicon is gone.** Browsers cache favicons aggressively, so the p may show in a tab for
  a while after deployment until the cache turns over.

<!-- Source: 43-logomark-redrawn.md -->

# The logomark, redrawn to Clent's artwork

22 September 2026, later the same day as docs/42. Clent confirmed the channel mark was the right
direction, then sent his own artwork of it and said to use that. This record replaces the drawing
in docs/42; everything else there — where the mark appears, how the mask works, what the phone
header gave up — still stands.

## What changed in the drawing

The docs/42 mark cut the R's stem as a separate channel from the top edge to the bottom. In
Clent's artwork the R's stem is the D's own left edge, which is the better idea: one fewer cut,
and the D stays whole on its left side. The channel is now the bowl's stroke, entering from that
left edge, curving round a solid counter, coming back beneath it, and turning down as the leg to
leave through the bottom edge. The counter stays olive.

The proportions are his, traced from the artwork rather than chosen: the D is 61 wide by 56 high
(a little wider than tall, so the mark's box is 0.92em by 0.84em beside the wordmark rather than
square), the channel is 5.6/56 of the height, the bowl's outer radius 12.9 and inner 7.3. The
trace was laid over the artwork at 170px and compared; the two match.

## What was checked again

The same measurements as docs/42, because the mark's box changed shape:

- Header mark 33×30px at 1440px beside the 36px name; footer 26×24px in white. `currentColor`
  fill, no stroke.
- Signed out, as a customer and as staff at 390, 375, 360, 359 and 320px: no overflow. The three
  phone-header concessions from docs/42 carry the wider box without a further step.
- Favicon at 64, 32 and 16px, and on a dark tab bar: the R reads at 32 and above; at 16px it is a
  D with a cut, which is the honest limit of a mark this detailed at that size.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **A trace, not a vector original.** The artwork arrived as a raster and was measured, so
  the curves are my reconstruction of his. If he has the original vector, it should replace
  `design/realdistrict-mark.svg` directly; the paths in `app.js` and the favicon follow from it.
- **At 16px the R is lost.** The stem-as-edge design has less contrast at tab-icon size than the
  docs/42 cut. This is the mark Clent chose, so it stands; a simplified favicon glyph would be a
  separate decision.
- **D009 unchanged.** Brand availability for RealDistrict is still unchecked.

<!-- Source: 44-logomark-parcel.md -->

# The logomark, replaced with Clent's parcel mark

22 September 2026, after docs/43. Clent sent a second piece of artwork and asked for the logo to
be updated to it. This record replaces the drawing in docs/43; placement and the phone-header
concessions from docs/42 still stand.

## The mark

Four blocks on a square, the right column rounded: two olive squares on the left, a pale olive
quarter-round top right, an olive quarter-round bottom right with a pale tail tucked under its
curve. It is the direction from the earlier parcel sheet, which was the only one of the first
rounds that survived 16px, now in Clent's own proportions. It is abstract rather than a letter,
so there is no R to lose at small sizes: at 16px it is still four blocks with a curve.

Traced from the artwork: the mark is 552px square in a 1240px image, so one unit is 5.52px. The
blocks are 47.1 wide with a 5.8 gap; the left column splits at 49.3 and 55.1, the right column at
43.5 and 49.3, so the right column sits a little higher than the left. The top-right radius is
43.5, the bottom-right corner radius 47.1, and the tail is a 10.9-wide strip whose right edge
follows the curve at a 5.8 offset.

## Two colours, by class

The docs/42 and docs/43 marks were one shape cut by a mask and took `currentColor`. This mark
is two shapes, so it carries two classes and the fills are set in CSS: `--olive` and `--accent`
on paper (the site's own tokens, not the artwork's sheet values), white and a mid green on the
footer's deep ground. The gaps are open, so whatever is behind the mark shows through them and
no mask is needed. The favicon is the same two shapes in paper and mid green on the deep olive
tile, scaled to 62 of the tile's 100 with the corner radius of 22 kept.

Source: `design/realdistrict-mark.svg`, olive and pale on a transparent ground.

## What was checked

- Header mark 30×30px at 1440px beside the 36px name; footer 24×24px. Fills read back as
  `#244d3e` / `#dce7dc` in the header and `#fff` / `#8fa899` in the footer.
- Signed out, as a customer and as staff at 390, 375, 360, 359 and 320px: no overflow. The mark's
  box is square again, so it is fractionally narrower than the docs/43 mark.
- Favicon at 64, 32 and 16px, and on a dark tab bar: reads at all three.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **A trace, not a vector original.** As with docs/43, the artwork arrived as a raster. If a vector
  exists it should replace the source file; the two paths in `app.js` and the favicon follow it.
- **The pale block is quiet on the header.** `--accent` on the near-white header ground is a low
  contrast pairing by design — it is the artwork's own relationship between the two greens — but
  it means the top-right block reads faintly at 16px on paper. On the footer and the favicon the
  mid green carries it clearly.
- **D009 unchanged.** Brand availability for RealDistrict is still unchecked.

<!-- Source: 45-wordmark-weights.md -->

# The wordmark as Clent set it

22 September 2026, after docs/44. Clent sent artwork of the name and asked for its treatment to
be taken from it: "Real" at text weight, "District" bold, one sans, ink on paper, normal tracking.

## What was taken

The weight contrast, which does the work: the name now reads as two words at a glance where the
all-bold setting from docs/38 read as one twelve-character block. Tracking loosens from -0.03em
to -0.02em, closer to the artwork's near-normal spacing while keeping the phone header inside
its measured limits.

The one rule reaches every place the name is set: the header wordmark, the footer wordmark and
the footer sign-off (docs/40), which are the same name and should not disagree with each other.
The markup is `Real<b>District</b>`; the link's accessible name is unchanged, since `b` is
presentational and the text reads through as "RealDistrict".

## What was not taken

The typeface. The artwork's face is a geometric sans (Gilroy or a relative); the guardrails allow
one typeface and no third-party fonts, and the site's sans is `Segoe UI Variable` with Arial and
the system sans behind it. The weights are set at 400 and 750; a fallback without a 750 snaps to
its bold, which is the same relationship. If Clent wants the artwork's face, that is a licensed
font file to self-host and a decision against the one-typeface rule, so it is flagged rather than
done.

## What was checked

- Weights read back as 400 / 750 in the header, the footer and the sign-off.
- Header wordmark 235px at 1440px (was 233), 125px at 390px (was 124). Signed out, as a customer
  and as staff at 390, 375, 360, 359 and 320px: no overflow.
- The sign-off at 1440px spans 1274px within the page's 1274px measure, as before.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **Not the artwork's face**, as above. The proportions of "Real" against "District" will differ
  a little from the artwork on every platform, and more on one that lacks a variable sans.
- **Regular-weight "Real" is lighter on the deep footer** than bold was; measured white on
  `--deep` it is still far above AA for large text, but at the 24px phone size the contrast is in
  the weight, not the colour.

<!-- Source: 46-footer-mark.md -->

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

<!-- Source: 47-brand-page-and-how-it-works.md -->

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

<!-- Source: 48-how-it-works-for-customers.md -->

# How it works, written to the customer

22 September 2026, after docs/47. Clent asked for the "How it works" page to be fixed: it should
be a client-facing page about how the website works. The docs/47 version was accurate but read
like documentation of the system — "what the team does", "what this site is, today" — and
addressed nobody in particular. This version is written to the person using the site.

## What changed

- **An opener with a photograph.** Heading, a three-sentence promise in the second person, two
  actions, and the Courtyard House veranda beside them, captioned as a fictional concept
  listing. The image keeps its own 4:3 ratio; the width and height attributes reserve space
  before it loads and `height:auto` lets the ratio take over once it has.
- **Three large sections instead of five cards: Find, Ask, Visit.** Each has a paragraph that
  says what you do and what happens, and three short points that answer the practical
  questions (do I need an account, does my shortlist survive a sale, is a request a booking).
  Every claim maps to something the site does; nothing was written that the account pages
  do not deliver.
- **Your account**, on the pale ground: four cards that are the four account pages, each
  linked. A signed-out visitor who follows one meets the sign-in prompt, which is the site's
  normal behaviour.
- **What the badges mean**, kept from docs/47 but shortened.
- **Common questions**, six of them, replacing the "what this site is, today" section. The
  concept disclosures did not go: "Are the properties real?" answers it plainly, and "How do I
  get in touch about something else?" says there is no telephone or email. The header strip and
  the terms page still carry the fictional-listings statement on every page.
- **A close** with the two sector actions.

The section on what the team does behind each listing is gone as a section; its substance is in
"Who am I talking to?" and in the Ask and Visit copy. A customer does not need a paragraph on
the fixed listing template.

## What was checked

- 1440px and 390px: no overflow, no console errors, every reveal arrives, title set.
- Heading order H1, H2 ×3, H2 with four H3s, H2, H2, H2; nine links, all to pages that exist;
  thirteen keyboard focus stops in the main region, in reading order.
- Opener image alt states its source ("Generated concept image.") and renders at 4:3.
- 30-route walk: 58 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **The account cards link to pages that need sign-in.** That is the site's existing behaviour
  and the page says an account is needed, but a visitor can still be surprised by the prompt.
- **One photograph, and a fictional one.** The real property's photographs are GrandBlue's, and
  using them to illustrate "how it works" would put a real hotel next to generic copy. The
  fictional house is labelled as such in the caption and the alt text.

<!-- Source: 49-how-it-works-stacked-steps.md -->

# How it works: the steps as stacked cards

22 September 2026, after docs/48. Clent sent a reference site (a web agency's "4 step process"
section) and asked how it was designed; then asked for its device to be built into How it
works, to check before it goes live.

## What the reference does

Each step is one full-width card. The card sticks below the header as the page scrolls, and the
next card slides up over it, so the previous step stays faintly visible behind. On each card: a
large faint numeral behind the heading, a short heading, one sentence, a small pill with one fact,
and an illustration. The rest of that site is a standard dark agency template with purple glow,
testimonials, an accordion of questions and a cookie banner.

## What was taken

- **The stack.** Find, Ask and Visit are now three cards in the same column. From 801px wide and
  700px tall, each card is `position: sticky` below the header with a slightly larger offset than
  the one before, so the stacked edges show. As the next card covers a card, the covered card eases
  back to 95% and a paper veil rises over it: `transform` and a `::after` overlay's `opacity`,
  driven by a scroll listener that is removed when the page changes. Nothing else moves.
- **The fact pill.** One true statement per step: "No account needed to browse", "Needs an
  account, so the reply can find you", "A request, confirmed by the team". The reference's pill
  states a delivery time; ours states a rule.
- **The faint numeral** behind the heading rather than beside it.
- **A picture per step, but a real one.** The reference draws product illustrations. Ours are
  screenshots of the site's own screens taken as they are today: the search page, the enquiry
  form, the inspection request. They show fictional listings and say so in their alt text; the
  register records them as screenshots to be retaken when those screens change.

## What was not taken

Dark ground, purple, gradient text; illustrations; timeline promises; the testimonial slider and
star ratings; the FAQ accordion (our six questions stay in the open).

## Two things the first build got wrong, and the fixes

- **The covered card was faded with `opacity`**, which let the card beneath it show through the
  card on top — the Find card's text ghosted through the Ask card. Fixed with the veil: a paper
  overlay whose opacity rises, so the covering card stays solid.
- **On phones, cards taller than the viewport were sticking with their lower half unreachable**:
  the third point of Find was under the fold and the Ask card slid over it before it could be
  read. Fixed by turning the stack on only where a whole card fits — 801px wide and 700px tall —
  and leaving a plain column everywhere else, including a 1366×650 laptop window. Under reduced
  motion the column is used at every size.

## What was checked

- 1440×900: cards sticky at 118/138/156px offsets; mid-scroll the covered card reads
  `scale(0.9885)` with veil 0.127 and the covering card stays untransformed and opaque.
- 390×844 and 1366×650: cards `position: relative`, no transform, no veil; nothing under the fold.
- 1440×900 with reduced motion: the same plain column.
- No overflow at any of the three; images at their natural ratio; keyboard order unchanged
  (thirteen stops in reading order). 30-route walk: 58 clean. Tests: 28 pass.

## Limitations

- **The screenshots are of today's screens.** When the search page or the forms change, these
  three files go stale and need retaking; the register entry says so.
- **The stack is a wide-screen device.** Most phone visitors will see a column of three cards,
  which is the docs/48 page with a pill and a picture added; that is by design, not a gap.

<!-- Source: 50-questions-accordion.md -->

# Questions as an accordion, badges gone, rules gone

22 September 2026, after docs/49. Three asks from Clent on How it works: remove the lines, ask
whether "Reading a listing" belongs on a page a client would read, and set "Common questions" in
the accordion format of the reference he sent.

## The lines

The rule above each section on How it works and on the brand page, and the one above the
closing call, are gone. The sections now separate by spacing and by the pale account band.

## "Reading a listing"

Clent's question was whether it is necessary on a real website for clients. It is not. A client
learns what "Under offer" means the first time they see it, and the fictional and supplied-photo
labels are on the listings themselves, where they matter (docs/27). The section explained the
site to itself. Two of its four items carried something a client might actually ask, and they
moved into the questions: "Are the properties real?" now also says how real properties are
shown and that unknown figures are stated as unknown, and "What do 'Under offer' and 'Sold'
mean?" is a question of its own. "Featured" did not need explaining.

## The accordion

docs/48 argued for six answers in the open; Clent chose the accordion from the reference, and
that is his call. It is built as native `details` and `summary`: one tonal card per question on
the pale colour, the open one on white with a soft shadow, a plus in a circle that becomes a
minus on olive. The first question is open when the page loads so the format is obvious. Native
disclosure means the keyboard and screen readers get it without any script: Tab reaches each
question, Enter or Space opens it. The answer arrives with a short fade and rise — opacity and
transform, nothing else — and not at all under reduced motion. Seven questions, one more than
before, from folding the badge section in.

Not taken from the reference: the dark ground, the gradient heading, the purple link.

## A defect found on the way

The section rule `padding:38px 0 46px` was written as a shorthand and so set the sections' side
padding to nothing, overriding the `.wrap` gutter it sat inside. Since docs/47 every section on
How it works and on the brand page had been sitting 48px further left than the rest of the
page on a desktop, and flush against the screen edge on a phone. The paddings are now longhands
and the sections measure at the same left edge as everything else: 83px at 1440px, 20px at
390px, on both pages.

## What was checked

- Rules: `border-top-width` 0 on every section of both pages.
- Accordion: seven items, first open; focusing the second and pressing Enter opens it; no
  errors. Works at 1440px and 390px.
- Left edges as above; no overflow. 30-route walk: 58 clean. Tests: 28 pass.

<!-- Source: 51-team-sign-in.md -->

# The team's own door

22 September 2026, after docs/50. Clent sent the footer of Car Marketplace by Adam Hall, with its
"Dealer login" link circled, and asked for a backend like it. That site is behind a private
preview password, so what its dealer login opens could not be seen; the ask was read from the
footer and from what RealDistrict already has.

## What already existed

RealDistrict has had its backend since the first commit: the team workspace at `/admin`, with an
overview of the numbers, the property inventory and editor, the shared inbox with internal
notes, stages and follow-ups, inspection slots and requests, contacts, site content and team
access. Permissions are enforced on the server for every route, and registration can only make
customer accounts. What it did not have was a door of its own: the footer said "Team workspace",
and a signed-out visitor who followed it met the customer empty state — "Your place starts here.
Sign in to save homes…" — and a sign-in modal that offered to create a customer account. On the
live site, where the demo shortcuts are off, that modal was the only way in for the team.

## What was built

`/team`: a sign-in page for staff, one card on the page. A work email, a password, a button, and
a line that says team accounts are created by an administrator under Team access and that
customers sign in from any listing or from Saved. No sign-up. It posts to the same
`/api/auth/login` every sign-in uses, with the same rate limit and the same "Email or password is
incorrect".

- A team member who signs in here lands on the workspace overview.
- A customer who signs in here is not turned away: they are signed in, taken to their saved
  homes, and told that this was a customer account. Someone with a valid key should never meet
  a locked door for using the wrong one.
- A customer already signed in who opens `/team` sees a notice with a link to their account.
- A team member already signed in who opens `/team` goes straight to `/admin`.
- Any signed-out `/admin` address shows the door instead of the customer empty state.
- The footer link now reads "Team login" and points here.

## What was not built

A separate application. The reference's dealer backend was not visible, and building a second
workspace beside the one that exists would be a duplicate, not an improvement. The Car
Marketplace preview gate (a password on the whole site) was not copied either: RealDistrict's
public side is meant to be public.

## For the live site

The first team account on the public host still comes from the two Worker secrets described in
docs/17 (`PORLI_ADMIN_EMAIL`, `PORLI_ADMIN_PASSWORD`, twelve characters or more). That is Clent's
step in the Cloudflare dashboard; nothing in the repository can set it. Once it is set, that
person signs in at `/team` and creates the rest of the team under Team access.

## What was checked

At 1440px and 390px: signed out, `/admin` and `/team` both show the door with the title "Team
sign-in"; a wrong password reads "Email or password is incorrect"; a freshly registered customer
signing in at the door lands on `/account/saved` with the explanatory notice; that customer
opening `/team` sees the notice with the account link; a staff member opening `/team` lands on
"Team overview"; the footer link reads "Team login → /team". No overflow. 31-route walk: 60
clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **No password recovery**, as before (docs/38 and the account settings page say so). A team
  member who forgets their password needs an administrator to reset it, and there is no reset
  control yet; that is the next thing this door needs.
- **The reference's backend was not seen.** If Clent has the preview password and wants
  something specific from it, that is a separate look.

<!-- Source: 52-first-administrator.md -->

# The first administrator, made at the door

22 September 2026, after docs/51. Clent could not sign in to the live workspace because no team
account existed: the first administrator was meant to come from two Worker secrets (docs/17),
Clent had not set them, and this session was refused permission to write them. Clent asked for
the login to be done so he could check the page. This is how it was done without the secrets.

## First-run setup

While the site has **no active team account at all**, `/team` shows "Create the first
administrator" instead of the sign-in: name, work email, a password of at least 12 characters.
Submitting it creates an administrator, signs them in and lands them on the overview. From that
moment `GET /api/setup` answers `needed: false`, `POST /api/setup` answers 409, and the page is
the ordinary sign-in. It is a door that opens once.

Two details:

- If the email already belongs to a customer account, setup promotes that account to
  administrator **only if the password given is that account's password**. Nobody can take over
  an existing account by naming its email at the door.
- The same rate limit as sign-in applies, and the two-secrets route in docs/17 still works
  exactly as before; it now simply has an alternative for a fresh host.

The trade-off is stated plainly: between the moment a fresh host goes live and the moment its
first administrator is created, anyone who finds `/team` could create it. On this site that
window is the seconds between deployment and the account being made, which is done in the same
sitting; on a host that sits empty for days it would be a real risk, and the docs/17 secrets
route is the one to use there.

## Change password

Every signed-in account, customer or team, now has "Change password" under Your account: the
current password, a new one of at least 12 characters, and every other session for that account
ends. The first administrator's password is therefore never permanent, which is what makes it
safe to hand over in a message.

Password *recovery* — for a forgotten password — is still not built; the account page still says
so. An administrator reset control under Team access is the next step.

## Verified

- Tests: a new case on a non-demo database — setup needed on a fresh host, a short password
  refused, the first administrator created with role `admin` and able to read the dashboard, the
  door closed (409) for the next caller, a wrong current password refused on change, a short new
  password refused, a successful change ending the other session and keeping the changing one,
  and the old password no longer signing in. 29 pass.
- In the browser, on a fresh non-demo database: `/team` shows the setup form; creating the
  administrator lands on "Team overview"; `/team` while signed in goes to `/admin`; the change
  password form on the account page succeeds; after signing out `/team` is the sign-in and the
  new password opens the workspace.
- On the demo database (where team accounts exist) `/team` is the sign-in, as before.
  31-route walk: 60 clean, the two expected not-found rows.

## Limitations

- **The setup window**, as above. Stated, accepted for this site, and closed within the sitting.
- **No recovery for a forgotten password.**
- **Demo mode always has team accounts**, so the setup form is never seen locally with the demo
  on; run with `PORLI_DEMO=0 PORLI_SEED=1` and a fresh database to see it.

<!-- Source: 53-sign-off-centred.md -->

# The sign-off centred, the rule edge to edge

22 September 2026, after docs/52. Clent sent the site's footer beside the Domira reference footer
(docs/40 took its sign-off device) and asked for two things: put the big RealDistrict name in the
middle, and look at the line.

## The name

Since docs/45 set "Real" at text weight, the name is narrower than the all-bold setting docs/40
was sized for: 5.26 of its font size wide instead of about 5.95. Capped at 214px it filled 1126px
of a 1274px measure and sat on the left, which is what Clent's screenshot shows. It is now sized
from the measure rather than from a fixed cap: the viewport minus the gutters, divided by 5.4, so
it fills 97.5% of the measure at every width, with 16px either side at 1440px and 5px at 390px,
and it is centred so the remainder splits evenly. The cap is 236px, where the page measure caps.

Measured at 1920, 1440, 1024, 390 and 360px: fill between 0.946 and 0.975, equal gaps left and
right, no overflow. The 0.98 fill rather than 1.0 is deliberate: `100vw` includes a vertical
scrollbar where one is shown, so a full fill would run 2–3px past the measure on a Windows
desktop and the `nowrap` name would overflow.

## The line

The rule above the copyright line stopped at the gutters and was the page's light hairline colour
on the deep ground, which read as a bright bar. As on the reference, it now runs edge to edge —
a pseudo-element the width of the viewport, with the footer clipping horizontal overflow — in a
quiet white at 14% over the deep olive. Measured: left 0 and width equal to the viewport at
every size.

## Verified

Sign-off and rule measurements as above; 31-route walk 60 clean; tests 29 pass.

## Addendum, same day: the questions centred

Clent asked for "Common questions" on How it works to sit in the middle. The accordion kept its
900px width but is now centred in the measure, and its eyebrow and heading are centred above
it. Measured: equal 270px margins either side at 1440px, 62px at 1024px, the gutter at 390px;
heading likewise; no overflow. Walk 60 clean.

## Addendum, same day: one question fewer

Clent asked for "Are the properties real?" to be removed from the questions. Done; six remain.
The fictional-listing disclosure does not depend on it: the header strip on every page, the
label on every fictional card and page, and the terms page all still carry it (docs/27, docs/38).

<!-- Source: 54-brand-site.md -->

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

<!-- Source: 55-workspace-against-the-console.md -->

# The workspace against the dealer console

22 September 2026, after docs/54. Clent asked for the team login and workspace to be brought up
to Car Marketplace's dealer console — not the same, he likes RealDistrict's wording — and to
check what needs adding. The comparison was made against the console as deployed (branch
`claude/carmarketplace-link-update-ccc0p2`), which has more than the repository's default branch.

## Page by page

| Dealer console | Team workspace | Done now |
|---|---|---|
| Dashboard: four counts, latest activity | Overview: eight counts over 7/30/90 days, the reply queue | — |
| Assistant (an AI chat that knows the stock) | none | **Clent's call** — needs an Anthropic key, a paid service and a secret, and a decision about what it may say |
| Submissions (sell-your-car pipeline) | none | **Clent's call** — an "appraise my property" pipeline is a new product surface |
| Inventory, "+ Add a car" in the sidebar | Properties; Add a home on the page | **Add a property** button in the sidebar |
| Enquiries | Shared inbox, richer | — |
| Buyers: a person's page with their enquiries and saved cars | Contacts: a list | **Contact pages**: conversations and inspection requests per person |
| Finance enquiries | none | Not applicable: no finance product, no revenue model approved (D009) |
| Site copy | Site content | — |
| Analytics (offer analytics) | Overview covers the defined metrics (docs/08) | — |
| Site guide (screenshots in a frame) | none | **Site guide**: every page and its steps, in words |
| "Signed in as …" | none | **Signed in as** line in the sidebar |
| Forgot / reset password (Supabase email) | none, and no email | **Reset password** by an administrator under Team access |

## What was built

- **Sidebar:** "Signed in as {name}" and a full-width **+ Add a property** button above the
  navigation, for every team member.
- **Contact pages** at `/admin/contacts/:id`: the person's name and email, each property
  conversation with its stage and latest message and a link into the inbox, and their inspection
  requests with time and status. Built from the two staff lists the inbox and inspections pages
  already use, so no new endpoint and no new exposure. Saved homes are deliberately not shown:
  a shortlist is the customer's own (docs/07), and the reference showing saved cars to the
  dealer is the one thing not taken.
- **Site guide** at `/admin/guide`: nine parts — signing in, each workspace page, and "what the
  site does not do yet" so nobody promises email, renting or password recovery to a customer.
  Text steps rather than screenshots: a screenshot goes stale silently, a sentence does not.
  Administrator-only parts show only to administrators.
- **Reset password** under Team access, per member except yourself: an administrator sets a new
  password of 12+ characters, every session of that account ends, and the toast says to hand it
  over directly. This is the missing half of docs/52, and closes the "no recovery" limitation the
  way a site without email can: through a person.

## Not built, and why

The Assistant, an appraisal pipeline and finance enquiries are product and service decisions,
listed above for Clent. Analytics and Site copy already exist under other names.

## Verified

- Tests: a new case — staff cannot reset (403), an administrator cannot reset their own (400),
  short passwords and unknown accounts refused, a reset ends the member's session and the new
  password signs in. 30 pass.
- In the browser at 1440px and 390px as an administrator: the sidebar line and button; a contact
  page reached from the Contacts list showing one conversation; the guide with nine parts; the
  reset form succeeding with its toast. No overflow.
- 32-route walk (guide and a contact page added): 62 clean, the two expected not-found rows.

<!-- Source: 56-brand-identity-document.md -->

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
