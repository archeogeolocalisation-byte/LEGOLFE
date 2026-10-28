# Event markup — Search Console recommendations

Checked against [Google’s event documentation](https://developers.google.com/search/docs/appearance/structured-data/event) on 28 October 2026.

`lib/eventStructuredData.ts` builds one Event/ScreeningEvent per displayed session, preserving the existing anchors and production origin. Preview deployments omit this graph.

- `eventStatus`: explicitly Scheduled by default (the same default Google previously inferred); explicit cancellation overrides it. Supported sourced status values can be passed through the event model. Existing catalog cancellation filtering is unchanged.
- `startDate` / `endDate`: source hours use Europe/Paris offsets, including summer/winter time. End hours are taken from explicit source ranges or existing session fields. An explicit multi-day end is retained at its known precision. A same-day start never creates an invented end. Nonexistent or ambiguous DST clock times remain date-only. Film running time describes the Movie and is not treated as the screening’s finish time.
- `organizer`: explicit provider JSON-LD is accepted after validation. Cinema imports identify the cinema operating the screening. The Carré’s own programme identifies Le Carré Sainte-Maxime. A tourism publisher or source label is never used as a substitute host.
- `performer`: explicit Person/PerformingGroup source entities are accepted. The two reviewed Carré artists are Greg Zlap and Justina Lee Brown; names are not guessed from arbitrary event titles. Sources: [Greg Zlap’s official Carré listing](https://www.carre-sainte-maxime.fr/musique/greg-zlap), [official Carré programme](https://www.carre-sainte-maxime.fr/), [official ticketing](https://billetterie-carresaintemaxime.mapado.com/).
- `image`: existing authorized official show images or film posters are supplied as absolute URLs. Generic category illustrations remain contextual display media and are omitted from event markup.

Participants and end times are also visible on the event page. Provider fallback snapshots retain the same reviewed fields without changing their original schedule-check dates or freshness rules.

Missing optional facts can still produce Google recommendations. No placeholder artist, publisher-as-organizer, generic illustration, invented finish or fabricated ticket offer should be added merely to remove warnings. After merge/deployment, inspect an affected event URL in Google’s Rich Results Test and Search Console, then request validation of the relevant improvements. Search Console only updates after Google processes the pages again; a successful build does not verify Google’s report.

The supplied email names five fields although it announces six issues. The sixth recommendation needs its precise Search Console field before an additional correction can be assessed.
