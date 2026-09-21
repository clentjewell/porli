# Imagery pass

21 September 2026. Fourth change of the handover in docs/23, and the one its section 6 describes:
source design assets without Higgsfield, whose credits are exhausted. The section sets an order of
preference — the property's own photographs, then re-crops of the existing generated assets, then
openly licensed photography for mood and destination imagery only, then our own photography in
Rayong — and one rule that applies to all of them: alt text always states the source.

The audit came first. It found that the rule was not being kept anywhere except the homepage, and
that the register said something about the images that is no longer true. Those are what this
change fixes. No new image files were added, and that is a deliberate outcome rather than an
omission; the reasoning is in "What was not sourced" below.

## What the audit found

**Every listing image failed the alt-text rule.** All thirteen images attached to listings said
what they showed and never said what they were. The homepage had always followed the convention —
"Fictional coastal courtyard home — generated concept image", "GrandBlue beachfront — photograph
supplied by the property" — but listing media never did. A visitor reading a gallery with a screen
reader had no way to tell a photograph of a real hotel from a generated study of a house that does
not exist. That is the honest-labelling guardrail failing quietly in the place it matters most.

**The register's own notice was wrong.** It read: "All images are fictional architectural studies
generated through Higgsfield. Never use as photographs of actual listings." Six of the fourteen
are real photographs of a real hotel, supplied by it. The notice predates the headline listing in
docs/18 and was never revisited, so the document whose job is provenance was misdescribing its own
contents.

**The rights note had quietly expired.** Each GrandBlue entry said written confirmation was "to be
filed before public launch". The listing has been publicly reachable since it was first deployed,
and docs/24 gave it more prominence on 21 September 2026. The condition the note was written
against has passed.

**One claim in docs/25 was wrong.** It said only GrandBlue had more than one photograph. Courtyard
House has three: `courtyard.webp`, `courtyard-veranda.webp` and `courtyard-detail.webp`. That
document has been corrected.

**The register is otherwise complete.** Fourteen files on disk, fourteen entries, no orphans in
either direction.

## What changed

**Alt text now states the source, on every listing image.** A separate sentence is appended —
"Generated concept image." or "Photograph supplied by the property." — chosen from the listing's
own `is_demo` flag rather than from anything typed by hand, so the two can never disagree. It is a
sentence rather than another dash clause because several alt texts already end in one, and
"Courtyard House, fictional architectural study. Generated concept image." reads cleanly aloud.

The pass runs on every start, after all seeding, and is idempotent: a suffix is only added when it
is not already present. That matters because the live Cloudflare database is long-lived and will
receive this on its next start rather than being rebuilt. A test starts a database twice and
asserts the sentence appears exactly once.

**The register's notice now describes what the register actually holds**: two kinds of image, told
apart by the `fictional` flag, with the alt-text rule stated where anyone adding an asset will see
it.

**The rights note states the real position**: authorised by the client as listing owner, written
confirmation from the property still outstanding, and owed now rather than before some future
launch.

## What was not sourced, and why

**No new GrandBlue photographs.** This is the first option in section 6 and the one that would
most improve the site: the property publishes a gallery well beyond the six images in use. It is
also the one option that increases exposure on an unsigned permission. Publishing what is already
there is a position the client has taken; downloading more of a third party's photographs while
their written confirmation is outstanding is a further step, and not one to take on a repository's
own initiative. Held until the confirmation is filed. It should be the first thing done afterwards.

**No re-crops of the existing generated assets.** Section 6 permits them, and they would have made
the card carousel work on four more listings. They were not made for two reasons. The sources are
1024 × 688, so a crop tight enough to read as a different view has to be upscaled by roughly half
again to fill the same slot, and it looks it. More importantly, a crop of a listing's only
photograph is not a second photograph of it. It would raise the photo count on four fictional
listings without adding anything a buyer could use, which is the kind of padding the rest of this
project has been careful to avoid. Re-crops remain the right tool for a genuinely different
placement, such as a square or portrait slot, and none exists yet.

**No openly licensed stock.** Section 6 allows it for mood and destination imagery only, never as
a listing photograph. The destination cards it could serve already use existing assets and now
carry real listing counts (docs/26), so the gain would be decorative while adding third-party
licence obligations to track. Worth revisiting if a dedicated Thailand destination page is built.

## Verification

- `npm run check` and `npm test` pass; 28 tests, up from 26. Two are new: every listing image must
  carry alt text that states its source and must never claim the wrong one, and the source sentence
  must survive a restart without being appended twice.
- Every route walked at 1440px and 390px — 27 routes, 54 page loads, across public pages, the
  customer account and the staff workspace. No horizontal overflow, no console errors, no failed
  requests, no broken images, no unnamed controls.
- The register was checked against the filesystem in both directions.

## Limitations

- **Four listings still have one photograph each**: Highstreet Offices, Millrace Warehouse, Veranda
  House and Garden Apartment. Fixing that needs real new imagery, not manipulation of what exists.
- **The alt-text sentence is appended mechanically.** It reads well after the current descriptions,
  but anyone writing a new description should write the source into it naturally rather than
  relying on the pass to bolt it on.
- **The written photograph permission is still outstanding.** It now says so in the register as
  well as in docs/21 and docs/24. It remains the first item in section 6 and the first thing that
  would unlock more imagery.
