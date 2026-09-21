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

The wordmark should be a carefully spaced lowercase `porli`, with an optional subtle doorway detail. Readability comes first. Avoid adding a generic house-roof icon as the default identity.

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
| `/admin/content` | Featured listings and approved copy fields | Admin |
| `/admin/settings` | Team and site configuration | Admin |
| `/privacy`, `/terms`, `/contact` | Approved launch content | Public |

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
There are no demo accounts on a public host, and registration only creates customer accounts. Set two Worker secrets (Settings → Variables and Secrets, type *Secret*): `PORLI_ADMIN_EMAIL` and `PORLI_ADMIN_PASSWORD` (at least 12 characters). On the next request the application creates that administrator, or restores administrator access if the account already exists, and the team can sign in with those details to manage listings and team access. Remove the secrets afterwards if preferred; the account persists.

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

- **Only GrandBlue has more than one photograph**, so the carousel is invisible on every other
  card. It is correct behaviour and it will fill out as imagery arrives, but it means the feature
  currently improves exactly one listing.
- **The save button is a 32px tap target**, below the 40px floor in docs/23. It predates this
  change and appears on every card across the site, including the homepage, so widening it is a
  site-wide change rather than a search-results one. Recorded here rather than fixed in passing.
- **Sold listings are excluded from results entirely**, so the sold treatment is only visible to
  staff previewing a listing. "Include under offer" reaches the under-offer state. Whether recently
  sold stock should appear as proof is a content decision, not a technical one; docs/23 raises the
  same question as a homepage "proof strip".
