# The workspace against the dealer console

22 September 2026, after docs/54. Clent asked for the team login and workspace to be brought up
to Car Marketplace's dealer console — not the same, he likes RealDistrict's wording — and to
check what needs adding. The comparison was made against the console as deployed (branch
`claude/carmarketplace-link-update-ccc0p2`), which has more than the repository's default branch.

## Page by page

| Dealer console | Team workspace | Done now |
|---|---|---|
| Dashboard: four counts, latest activity | Overview: eight counts over 7/30/90 days, the reply queue | — |
| Assistant (an AI chat that knows the stock) | none | **Clent's call** — needs an Anthropic key, a paid service and a secret, and a decision about what it may say |
| Submissions (sell-your-car pipeline) | none | **Clent's call** — an "appraise my property" pipeline is a new product surface |
| Inventory, "+ Add a car" in the sidebar | Properties; Add a home on the page | **Add a property** button in the sidebar |
| Enquiries | Shared inbox, richer | — |
| Buyers: a person's page with their enquiries and saved cars | Contacts: a list | **Contact pages**: conversations and inspection requests per person |
| Finance enquiries | none | Not applicable: no finance product, no revenue model approved (D009) |
| Site copy | Site content | — |
| Analytics (offer analytics) | Overview covers the defined metrics (docs/08) | — |
| Site guide (screenshots in a frame) | none | **Site guide**: every page and its steps, in words |
| "Signed in as …" | none | **Signed in as** line in the sidebar |
| Forgot / reset password (Supabase email) | none, and no email | **Reset password** by an administrator under Team access |

## What was built

- **Sidebar:** "Signed in as {name}" and a full-width **+ Add a property** button above the
  navigation, for every team member.
- **Contact pages** at `/admin/contacts/:id`: the person's name and email, each property
  conversation with its stage and latest message and a link into the inbox, and their inspection
  requests with time and status. Built from the two staff lists the inbox and inspections pages
  already use, so no new endpoint and no new exposure. Saved homes are deliberately not shown:
  a shortlist is the customer's own (docs/07), and the reference showing saved cars to the
  dealer is the one thing not taken.
- **Site guide** at `/admin/guide`: nine parts — signing in, each workspace page, and "what the
  site does not do yet" so nobody promises email, renting or password recovery to a customer.
  Text steps rather than screenshots: a screenshot goes stale silently, a sentence does not.
  Administrator-only parts show only to administrators.
- **Reset password** under Team access, per member except yourself: an administrator sets a new
  password of 12+ characters, every session of that account ends, and the toast says to hand it
  over directly. This is the missing half of docs/52, and closes the "no recovery" limitation the
  way a site without email can: through a person.

## Not built, and why

The Assistant, an appraisal pipeline and finance enquiries are product and service decisions,
listed above for Clent. Analytics and Site copy already exist under other names.

## Verified

- Tests: a new case — staff cannot reset (403), an administrator cannot reset their own (400),
  short passwords and unknown accounts refused, a reset ends the member's session and the new
  password signs in. 30 pass.
- In the browser at 1440px and 390px as an administrator: the sidebar line and button; a contact
  page reached from the Contacts list showing one conversation; the guide with nine parts; the
  reset form succeeding with its toast. No overflow.
- 32-route walk (guide and a contact page added): 62 clean, the two expected not-found rows.
