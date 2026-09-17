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
