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
