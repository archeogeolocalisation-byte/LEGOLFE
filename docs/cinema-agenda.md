# Cinema in the agenda

The existing agenda includes a Cinema category. Date and commune filters operate on individual dated screenings, not a continuous run between a film's first and last appearance. One card groups a film in one cinema; the same film in two cinemas has two separate records.

## Sources

- Le Pagnol, Sainte-Maxime: official HTML timetable, selected Wednesday–Tuesday week and seven day columns. The first three published weeks are read. Only explicitly dated weeks and valid hour cells are accepted.
- Raimu, Cogolin: Cinéode's official timetable, linked by the municipal cinema page. Its first day heading must match the response date in Europe/Paris; subsequent numbered days are checked across month boundaries.
- Studio Miramar, Cavalaire: the cinema's public CineOffice widget. Its public identifier is read from HTML into memory; no login is involved or identifier stored in the repository. Only public film and show metadata is retained; deleted, cancelled, draft, school and other-cinema screenings are excluded. Zoned show times are converted to Europe/Paris, including the October clock change.
- Star, Saint-Tropez: official municipal programme link only. The municipality links to AlloCiné; no unsupported schedule import is claimed.

Each card displays film title, cinema/town, published screening times and versions, running time where supplied, checked date and the original programme link. Film summaries are short factual descriptions, not copied distributor synopses. Film posters remain on the promotional image hosts used by the cinema; original rights and source labels are displayed. Failed agenda images use its existing typography fallback. The existing culture illustration is used when no valid poster is available; no fabricated film poster is generated.

## Refresh and failures

Server requests use Next fetch revalidation of 30 minutes, a shared eight-second deadline per cinema, bounded response sizes and no redirects. Providers load concurrently. Changing or empty/unreadable timetables fall back to the checked snapshot for at most two days. Completed days are removed. There is no guaranteed completeness: programme links remain available when an import is missing. A valid empty timetable replaces old entries rather than retaining them indefinitely.

The initial checked snapshot contains 44 film/cinema records and 136 screenings from 19 October 2026 onwards. Imported programmes may add films as cinemas publish more weeks. No prices or booking availability are inferred.

## Validation

`node scripts/test-cinema.cjs` covers real reduced source fixtures, weekdays and explicit dates, versions, DST, cancelled/private screenings, safe poster hosts, expired fallback, failed HTTP/changed HTML, duplicate films, and real FR/EN client category/town handlers. Fixtures retain only public programme fields and contain no public widget identifier.

After a production build and installing Playwright WebKit, `node scripts/test-cinema-browser.cjs` checks mobile category/date/town interactions and horizontal bounds at 375 and 390 pixels in FR/EN. CI saves mobile screenshots. This is automated WebKit coverage, not a physical iPhone test.
