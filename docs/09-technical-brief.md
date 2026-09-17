# Technical brief

## Status
The local implementation now uses Node 24, SQLite and browser JavaScript; see docs/13-implementation.md. No production hosting provider is approved. This pack defines behaviour. The implementation agent must inspect the target repository/environment and verify current official integration guidance. Do not infer that a previous unrelated project's services are provisioned for Porli.

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
