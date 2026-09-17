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
