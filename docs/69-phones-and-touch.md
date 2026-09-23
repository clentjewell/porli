# Phones and touch screens

23 September 2026, after docs/68. Clent asked for RealDistrict, the Team login page and every other
page to work properly on phones. Every public page, the Team login, the customer account pages,
all ten team workspace pages and five dialogs were measured in Chromium at 320, 360, 375, 390, 414,
768, 1024 and 1440px: 272 page loads. None overflowed sideways and none logged a script error
before or after this change. The problems were smaller controls and layouts that hid content.

## What changed

1. **Controls a finger uses are at least 44px** on phones and touch screens: header links, the
   wordmark, the menu toggle, the account button, save hearts, card and hero photo arrows, the hero
   photo picker, footer links, location chips, "Open inbox", "Reset filters", table links, and the
   editor's and dialogs' round icon buttons. Checkboxes are 22px inside a label at least 44px tall,
   so the whole line is the target.
2. **Form fields use 16px text on phones**, so iOS Safari no longer zooms in when a field is
   focused. This covers the home search, the Land and Commercial filters, the sign-in, enquiry and
   inspection dialogs, the Team login, account settings and every workspace form.
3. **Land and Commercial filters wrap** onto a second line instead of scrolling sideways. At 390px
   "Land size" was hidden past the edge.
4. **The workspace menu is one swipeable row** under the Add a property button, with the current
   page scrolled into view. Before, the links wrapped into a block about 250px tall on every team
   page. Desktop keeps the column.
5. **Workspace tables stack into labelled rows** below 700px. The Properties table showed only two
   of its five columns on a phone; each row now reads Price, Publication, Availability and Edit.
   The column names are copied from the table header, so the markup stays a real table.
6. **The inbox shows the list or one conversation, not both**, for customers and the team. An open
   conversation has an "All conversations" link back to the list.
7. **Headings wrap** so the dashboard's "Last 30 days" menu is no longer squeezed beside the title.
8. **Land cards on phones** put the price above a full-width View property button.
9. **Leftover residential wording removed:** "Add a home", "Available homes", "Homes receiving
   enquiries", "Every home has its own conversation", the missing-listing message and three links
   that still pointed to the retired Residential search now say property or listing and go to Land.

No motion was added, the Content Security Policy is unchanged (no inline styles or scripts), and
no dependency was added.

## Verified

The same 272 page loads after the change: no sideways overflow, no script errors, no broken
images, no unnamed controls, no control under 44px on a phone except inline card-title links, and
no form field under 16px. The inbox was checked on a phone with a real conversation, as the
customer and as the team, list then thread then back. Screenshots at 320 and 390px were reviewed
by eye. `npm run check` passes and all 34 API tests pass.

## Limits

Card titles are inline heading links and stay at their text height; the whole card has a
full-size View property button or photo link. The measurements use Chromium's phone emulation, not
physical iOS and Android devices. The land editor still offers bedroom and bathroom fields, which
is a separate change.
