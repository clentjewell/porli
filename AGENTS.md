# Porli development instructions

## Read order
Read README.md, docs/01-product-brief.md, docs/02-scope-and-decisions.md and the specification relevant to the change. Individual documents are canonical; MASTER-BRIEF.md is a generated combined view and must be refreshed after source edits.

## Product invariants
- Single operating organisation for the first release.
- Staff create listings through a fixed template; consumers cannot publish.
- Buy and Rent are discovery modes, not exclusive account roles.
- Each customer/property pair has one durable conversation thread.
- Internal notes are separate records and never exposed through customer APIs, notifications, exports or subscriptions.
- Publication state and transaction status are independent.
- Closed enquiry is not evidence of a completed property transaction.
- Metrics count the explicitly defined entity, not interchangeable messages, people and properties.
- Demo records and generated property imagery are labelled fictional.

## Implementation practice
Use British English. Inspect existing code and applicable instructions before edits. Prefer a thin complete journey over broad unfinished screens. Do not fabricate successful uploads, emails, map integrations, authentication or deployment. Enforce permissions on the server and in storage access. Keep secrets, personal data and generated build outputs out of version control. Do not add dependencies or services without a concrete need.

Document stack decisions, environment requirements and schema migrations. Use targeted tests for meaningful behaviour, especially cross-account access, status transitions and metric calculations. Include empty, loading and error states. Design for keyboard access and narrow screens. Do not launch production, change repository visibility or buy services as part of ordinary UI implementation.

## Done
A change is done when behaviour matches its acceptance criteria, relevant checks pass, limitations are recorded, and affected documentation is current. No public-facing controls should be silently inert.
