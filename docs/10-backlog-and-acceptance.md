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
