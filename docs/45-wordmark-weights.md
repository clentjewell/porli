# The wordmark as Clent set it

22 September 2026, after docs/44. Clent sent artwork of the name and asked for its treatment to
be taken from it: "Real" at text weight, "District" bold, one sans, ink on paper, normal tracking.

## What was taken

The weight contrast, which does the work: the name now reads as two words at a glance where the
all-bold setting from docs/38 read as one twelve-character block. Tracking loosens from -0.03em
to -0.02em, closer to the artwork's near-normal spacing while keeping the phone header inside
its measured limits.

The one rule reaches every place the name is set: the header wordmark, the footer wordmark and
the footer sign-off (docs/40), which are the same name and should not disagree with each other.
The markup is `Real<b>District</b>`; the link's accessible name is unchanged, since `b` is
presentational and the text reads through as "RealDistrict".

## What was not taken

The typeface. The artwork's face is a geometric sans (Gilroy or a relative); the guardrails allow
one typeface and no third-party fonts, and the site's sans is `Segoe UI Variable` with Arial and
the system sans behind it. The weights are set at 400 and 750; a fallback without a 750 snaps to
its bold, which is the same relationship. If Clent wants the artwork's face, that is a licensed
font file to self-host and a decision against the one-typeface rule, so it is flagged rather than
done.

## What was checked

- Weights read back as 400 / 750 in the header, the footer and the sign-off.
- Header wordmark 235px at 1440px (was 233), 125px at 390px (was 124). Signed out, as a customer
  and as staff at 390, 375, 360, 359 and 320px: no overflow.
- The sign-off at 1440px spans 1274px within the page's 1274px measure, as before.
- 28-route walk: 54 clean, the two expected not-found rows. Tests: 28 pass.

## Limitations

- **Not the artwork's face**, as above. The proportions of "Real" against "District" will differ
  a little from the artwork on every platform, and more on one that lacks a variable sans.
- **Regular-weight "Real" is lighter on the deep footer** than bold was; measured white on
  `--deep` it is still far above AA for large text, but at the 24px phone size the contrast is in
  the weight, not the colour.
