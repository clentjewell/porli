# The first administrator, made at the door

22 September 2026, after docs/51. Clent could not sign in to the live workspace because no team
account existed: the first administrator was meant to come from two Worker secrets (docs/17),
Clent had not set them, and this session was refused permission to write them. Clent asked for
the login to be done so he could check the page. This is how it was done without the secrets.

## First-run setup

While the site has **no active team account at all**, `/team` shows "Create the first
administrator" instead of the sign-in: name, work email, a password of at least 12 characters.
Submitting it creates an administrator, signs them in and lands them on the overview. From that
moment `GET /api/setup` answers `needed: false`, `POST /api/setup` answers 409, and the page is
the ordinary sign-in. It is a door that opens once.

Two details:

- If the email already belongs to a customer account, setup promotes that account to
  administrator **only if the password given is that account's password**. Nobody can take over
  an existing account by naming its email at the door.
- The same rate limit as sign-in applies, and the two-secrets route in docs/17 still works
  exactly as before; it now simply has an alternative for a fresh host.

The trade-off is stated plainly: between the moment a fresh host goes live and the moment its
first administrator is created, anyone who finds `/team` could create it. On this site that
window is the seconds between deployment and the account being made, which is done in the same
sitting; on a host that sits empty for days it would be a real risk, and the docs/17 secrets
route is the one to use there.

## Change password

Every signed-in account, customer or team, now has "Change password" under Your account: the
current password, a new one of at least 12 characters, and every other session for that account
ends. The first administrator's password is therefore never permanent, which is what makes it
safe to hand over in a message.

Password *recovery* — for a forgotten password — is still not built; the account page still says
so. An administrator reset control under Team access is the next step.

## Verified

- Tests: a new case on a non-demo database — setup needed on a fresh host, a short password
  refused, the first administrator created with role `admin` and able to read the dashboard, the
  door closed (409) for the next caller, a wrong current password refused on change, a short new
  password refused, a successful change ending the other session and keeping the changing one,
  and the old password no longer signing in. 29 pass.
- In the browser, on a fresh non-demo database: `/team` shows the setup form; creating the
  administrator lands on "Team overview"; `/team` while signed in goes to `/admin`; the change
  password form on the account page succeeds; after signing out `/team` is the sign-in and the
  new password opens the workspace.
- On the demo database (where team accounts exist) `/team` is the sign-in, as before.
  31-route walk: 60 clean, the two expected not-found rows.

## Limitations

- **The setup window**, as above. Stated, accepted for this site, and closed within the sitting.
- **No recovery for a forgotten password.**
- **Demo mode always has team accounts**, so the setup form is never seen locally with the demo
  on; run with `PORLI_DEMO=0 PORLI_SEED=1` and a fresh database to see it.
