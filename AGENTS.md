<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Platform usage

- Finish and test changes locally before pushing. Use draft PRs while work is unfinished, and mark ready only once reviewable. Do not rerun successful checks on an unchanged commit.
- Ordinary work branches do not deploy to Vercel. Use `preview/**` only when a preview is needed for visual review; do not create a preview for routine content or backend changes. Production deploys from `main` after the user's merge.
- Keep security and relevant tests. Do not run the manual full browser suite unless the changed flow needs it. See `docs/platform-usage.md`.
- Shared caches must contain anonymous public data only. Keep account, owner and moderator reads private. Never lengthen private signed-photo access to save requests.
