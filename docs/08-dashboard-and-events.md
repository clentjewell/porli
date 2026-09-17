# Dashboard and measurement

## Definitions
All date ranges use the configured reporting time zone and half-open boundaries: start inclusive, next-period start exclusive. Label point-in-time cards “Current”; label period measures with the selected period. Internal notes, staff test activity and fixture data are excluded from live reporting.

| Metric | Exact proposed calculation |
|---|---|
| Live available properties | Current count of properties where publication=published and transaction=available |
| Properties receiving enquiries | Distinct property IDs with at least one persisted customer message in period |
| New conversations | Count of threads whose first persisted customer message is in period |
| Interested people | Distinct customer IDs with at least one persisted customer message in period |
| Awaiting reply | Current non-closed, non-blocked threads whose latest participant message is from the customer |
| Inspection requests | Requests created in period; show confirmed/completed separately |
| Sold / leased | Distinct properties with a non-reversed corresponding outcome event effective in period |
| Overdue follow-ups | Current incomplete follow-ups past due on open threads |
| Time to first response | First human staff reply minus first customer message, for replied new threads; show median plus unanswered count |

“Active conversations” means non-closed threads with a participant message in the selected period. Never count the number of messages as the number of people or enquiries. Median reply time excludes unanswered threads but must display their count to avoid misleading reporting.

## Property table
Property, mode, current status, views, current saves, enquiry threads started in period, latest customer activity and responsible staff. Label current saves separately from save actions in the reporting period.

## Event catalogue
`property_viewed`, `property_saved`, `property_unsaved`, `search_performed`, `conversation_started`, `customer_message_sent`, `staff_reply_sent`, `inspection_requested`, `inspection_confirmed`, `inspection_completed`, `property_status_changed`.

Messages and inspection metrics should use authoritative server records. Treat frontend page-view events as approximate analytics. Never include message bodies, private addresses or raw personal data in analytics payloads. Deduplicate event IDs and omit internal previews/test accounts. Count a view once per property per permitted session, not each component render. If reliable deduplication/consent is unavailable, label views accordingly or hide the metric.

## Funnel
Define a cohort of conversations started in the selected period and measure how many have an inspection requested/confirmed within a labelled follow-up window. Do not divide all inspections this month by unrelated conversations this month and call it conversion. Offers/applications are staff-recorded stages, not formal submissions in MVP.

## Dashboard layout
Date selector; current queue cards; period activity cards; action list for waiting replies/overdue follow-ups; property table. Add a trend chart only if it answers a concrete operating question. Clicking a card opens the corresponding filtered records using the same definition.
