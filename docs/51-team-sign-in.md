# The team's own door

22 September 2026, after docs/50. Clent sent the footer of Car Marketplace by Adam Hall, with its
"Dealer login" link circled, and asked for a backend like it. That site is behind a private
preview password, so what its dealer login opens could not be seen; the ask was read from the
footer and from what RealDistrict already has.

## What already existed

RealDistrict has had its backend since the first commit: the team workspace at `/admin`, with an
overview of the numbers, the property inventory and editor, the shared inbox with internal
notes, stages and follow-ups, inspection slots and requests, contacts, site content and team
access. Permissions are enforced on the server for every route, and registration can only make
customer accounts. What it did not have was a door of its own: the footer said "Team workspace",
and a signed-out visitor who followed it met the customer empty state — "Your place starts here.
Sign in to save homes…" — and a sign-in modal that offered to create a customer account. On the
live site, where the demo shortcuts are off, that modal was the only way in for the team.

## What was built

`/team`: a sign-in page for staff, one card on the page. A work email, a password, a button, and
a line that says team accounts are created by an administrator under Team access and that
customers sign in from any listing or from Saved. No sign-up. It posts to the same
`/api/auth/login` every sign-in uses, with the same rate limit and the same "Email or password is
incorrect".

- A team member who signs in here lands on the workspace overview.
- A customer who signs in here is not turned away: they are signed in, taken to their saved
  homes, and told that this was a customer account. Someone with a valid key should never meet
  a locked door for using the wrong one.
- A customer already signed in who opens `/team` sees a notice with a link to their account.
- A team member already signed in who opens `/team` goes straight to `/admin`.
- Any signed-out `/admin` address shows the door instead of the customer empty state.
- The footer link now reads "Team login" and points here.

## What was not built

A separate application. The reference's dealer backend was not visible, and building a second
workspace beside the one that exists would be a duplicate, not an improvement. The Car
Marketplace preview gate (a password on the whole site) was not copied either: RealDistrict's
public side is meant to be public.

## For the live site

The first team account on the public host still comes from the two Worker secrets described in
docs/17 (`PORLI_ADMIN_EMAIL`, `PORLI_ADMIN_PASSWORD`, twelve characters or more). That is Clent's
step in the Cloudflare dashboard; nothing in the repository can set it. Once it is set, that
person signs in at `/team` and creates the rest of the team under Team access.

## What was checked

At 1440px and 390px: signed out, `/admin` and `/team` both show the door with the title "Team
sign-in"; a wrong password reads "Email or password is incorrect"; a freshly registered customer
signing in at the door lands on `/account/saved` with the explanatory notice; that customer
opening `/team` sees the notice with the account link; a staff member opening `/team` lands on
"Team overview"; the footer link reads "Team login → /team". No overflow. 31-route walk: 60
clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **No password recovery**, as before (docs/38 and the account settings page say so). A team
  member who forgets their password needs an administrator to reset it, and there is no reset
  control yet; that is the next thing this door needs.
- **The reference's backend was not seen.** If Clent has the preview password and wants
  something specific from it, that is a separate look.
