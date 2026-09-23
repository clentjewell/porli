# The "Browse land by type" section removed

23 September 2026, after docs/66. Clent asked first for the photographs to come off the homepage's
"Browse land by type" cards, because they repeated the listing covers in "Available properties".
Then he asked whether the whole section should go. It should, and it has.

## Why

The section duplicated three ways of browsing by land type that sit on the same page or one click
away:

- the type buttons directly above "Available properties", which filter those listings in place;
- the Land type select in the homepage search;
- the Land page (`/properties?sector=land`), with its Land type filter.

With one or two listings per type, a separate row of type cards added a stop without adding
information. Clent's original Land brief asked for a simple way to browse by category, and the
buttons, the search and the Land page still meet it.

A photo-free version of the cards (plain white card, count, name, arrow) was built and deployed
for a few minutes before the section was removed. It is not kept.

## Also fixed

The Thailand destination card built its "from" price without knowing the listing was real, so it
showed "$9,000,000" while the listing showed "A$9,000,000". The card now formats the price from the
listing itself and reads "1 listing · A$9,000,000".

## Verified

Homepage at 1440px and 390px: the order is headline listing, Featured destinations, Available
properties, then "What RealDistrict does". There is no overflow and no script error, and the type
buttons still filter. All 33 API tests pass.
