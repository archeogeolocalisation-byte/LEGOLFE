# LE GOLFE — SEO & quality audit — 15 October 2026

Scope: source-code/CI review and focused technical corrections. **Not** a Google Search Console crawl, PageSpeed Insights field report, or complete visual-device test. Live URLs were not reliably retrievable through the public audit browser, so claims about indexing or actual Core Web Vitals would be unfounded.

## Confirmed in the repository

| Area | Current situation | Decision |
|---|---|---|
| Canonical and hreflang | `lib/seo.ts` generates production canonical and FR/EN/x-default alternates | Keep; monitor rendered pages for correct paths |
| Preview indexing | `siteOrigin()` blocks canonical/indexing in preview; robots disallow crawling when no public origin | Keep and test |
| Private pages | Account, saved, host use noindex metadata; robots exclude them | Keep; ensure authenticated URLs never enter sitemap |
| Sitemap | Bilingual static/dynamic content, unique paths, image entries with credits/eligibility | **Fix** stale month paths and expired event URLs |
| Past events | Event pages remained discoverable and indexable long after the only session | **Fix** noindex for entirely past events; retain archive access |
| Event freshness | `getPublicEvents` merges official feed with local sources, strict date validation/dedup introduced | Maintain official checks, note that technical validity does not confirm real-world occurrence |
| Navigation | Agenda `Build around it` passed `?prompt=`, while Ask only read `?place=` / `?shortlist=` | **Fix** Ask now reads bounded `prompt` |
| Mobile readability | Header tap targets and wrapping buttons previously small/fragile | Improved PR #56; real device validation still required |
| Explorer location | Sourced markers and source links, no guessed coordinates, proximity from mapped references only | Continue sourcing remaining unmapped fixed businesses |
| Content depth | A mixed catalogue of detailed editorial pages and concise directory fiches | Prioritize richer, verifiable information on thin pages; do not produce doorway pages |
| Images/performance | Significant image usage in Explorer/Agenda; actual bytes, LCP and CLS require measurement | Run Lighthouse mobile + real-device test, prioritize large image assets and responsive sizes |
| Security | Noindex is not access control; Supabase RLS and private layouts exist | Continue separate permission and production checks |

## Recommended checks in Google Search Console (manual account access required)

1. Confirm **Domain** property includes both legolfe.com and www.legolfe.com; verify selected canonical host and 301/308 redirects.
2. Submit `https://www.legolfe.com/sitemap.xml`; inspect **Sitemaps** fetch status and last processed time.
3. Inspect a representative group: FR and EN homepage, Explorer, a mapped business fiche, a villa, upcoming event, and past event. Compare **Google-selected canonical**, indexability and HTTP status.
4. Review **Page indexing** for crawled-not-indexed, duplicate without user-selected canonical, 404s and soft 404s. Triage actual examples, not totals alone.
5. Review **Core Web Vitals** by mobile group and measure Lighthouse mobile separately on homepage, Explorer, Agenda, Mon séjour and villa page.
6. Validate structured data through the Rich Results Test for Event, Article and eligible Place pages; ensure addresses and venue points are accurate.

## Next priorities

**P0** Confirm Google Search Console ownership and sitemap fetch, and check real rendered canonical/noindex on production. **P1** Verify agenda official dates weekly; suppress expired/upcoming-not-confirmed listings according to source evidence. **P1** Finish verified fixed-location map coverage, excluding providers without fixed public departures. **P1** Run mobile Lighthouse/LCP/CLS at three device widths and optimize actual large images. **P2** Improve thin fiches with useful practical access, seasonal caveats, source evidence and original editorial context; avoid generic mass-generated pages. **P2** Expand cross-links from villa destination to nearby verified guides while clearly distinguishing straight-line versus travel distances.

## Regression controls introduced here

- `scripts/test-seo-quality.cjs`: past-month sitemap exclusion, event noindex and Agenda → Ask prefilling.
- Existing `scripts/test-seo.cjs`, `test-guides-seo.cjs`, `test-agenda-feeds.cjs`, `test-place-maps.cjs` remain active.

This document should be updated once Search Console and field performance data are available; it is **not** proof of successful indexation.
