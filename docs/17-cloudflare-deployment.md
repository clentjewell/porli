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
There are no demo accounts on a public host, and registration only creates customer accounts. Set two Worker secrets (Settings → Variables and Secrets, type *Secret*): `PORLI_ADMIN_EMAIL` and `PORLI_ADMIN_PASSWORD` (at least 12 characters). On the next request the application creates that administrator, or restores administrator access if the account already exists, and the team can sign in with those details at `/team` (docs/51) to manage listings and team access. Remove the secrets afterwards if preferred; the account persists.

## Local verification of the Worker
`npm run cf:dev` starts the Worker locally on port 8788 with demo mode enabled, using Wrangler through `npx`. `PORLI_TEST_BASE=http://localhost:8788 npm test` then runs the full API integration suite against the Worker; each test uses an isolated database via the demo-only `X-Porli-Database` header. Both the Node server and the Worker pass the same eleven tests, and an upload round trip (store, authorised fetch, unauthorised 404, attach to a listing) was checked manually.

## Limits and remaining decisions
- One Durable Object holds all data, which suits a single operating organisation. It runs in one location; static assets are still served from the edge everywhere.
- Durable Object storage is limited by the Cloudflare plan (currently 5 GB on the free plan). Uploaded images count towards it; there is still no server-side media processing.
- Rate limits are in memory and reset when the object restarts. Backups and export tooling are not yet configured; Cloudflare keeps point-in-time recovery for SQLite-backed Durable Objects for 30 days.
- Email, account recovery, legal operator and policy text remain launch gates as before. Deploying the Worker publishes the fictional concept; it does not make Porli production-ready.
