# The sign-off centred, the rule edge to edge

22 September 2026, after docs/52. Clent sent the site's footer beside the Domira reference footer
(docs/40 took its sign-off device) and asked for two things: put the big RealDistrict name in the
middle, and look at the line.

## The name

Since docs/45 set "Real" at text weight, the name is narrower than the all-bold setting docs/40
was sized for: 5.26 of its font size wide instead of about 5.95. Capped at 214px it filled 1126px
of a 1274px measure and sat on the left, which is what Clent's screenshot shows. It is now sized
from the measure rather than from a fixed cap: the viewport minus the gutters, divided by 5.4, so
it fills 97.5% of the measure at every width, with 16px either side at 1440px and 5px at 390px,
and it is centred so the remainder splits evenly. The cap is 236px, where the page measure caps.

Measured at 1920, 1440, 1024, 390 and 360px: fill between 0.946 and 0.975, equal gaps left and
right, no overflow. The 0.98 fill rather than 1.0 is deliberate: `100vw` includes a vertical
scrollbar where one is shown, so a full fill would run 2–3px past the measure on a Windows
desktop and the `nowrap` name would overflow.

## The line

The rule above the copyright line stopped at the gutters and was the page's light hairline colour
on the deep ground, which read as a bright bar. As on the reference, it now runs edge to edge —
a pseudo-element the width of the viewport, with the footer clipping horizontal overflow — in a
quiet white at 14% over the deep olive. Measured: left 0 and width equal to the viewport at
every size.

## Verified

Sign-off and rule measurements as above; 31-route walk 60 clean; tests 29 pass.
