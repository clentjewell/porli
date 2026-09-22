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
