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
