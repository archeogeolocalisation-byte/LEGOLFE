# LE GOLFE — Community voting proposal (not enabled)

## Recommendation

Do **not** launch an unverified five-star rating system for local businesses. It is easy to manipulate, difficult to moderate, and would imply a level of review confidence the site does not currently have.

A better first iteration is a single, positive **« Cette adresse m'intéresse » / « Save as a favorite »** action (already supported by saved places) and, later, **« Avis utile » / « Helpful »** votes on *approved contributions*. Unlike star ratings, helpful votes judge the usefulness of a contribution rather than the quality of a venue.

## Safe implementation for a later release

1. Store one vote per authenticated user and approved community post, enforced with a unique database constraint `(user_id, post_id)`.
2. Enforce permissions on the server / Supabase RLS: users only create and delete their own votes, and never assign totals or vote on unapproved posts.
3. Count only votes attached to still-approved posts; avoid public email/identity leakage and do not display a user's vote history.
4. Add rate-limiting and monitoring for mass-voting, self-voting and newly created accounts; allow moderators to remove abusive votes.
5. Use accessible buttons and a neutral count; never display zero votes as a negative rating.
6. Add opt-out and data-erasure handling consistent with account removal and the privacy policy.

## Product questions before launch

- Prefer `Avis utile` on comments, or `J'aime cette adresse` on places?
- Should users be allowed to vote on their own contributions? **Recommendation: no.**
- What minimum volume is needed before surfacing a public score? **Recommendation: avoid any global place ranking initially.**

**Status:** research/decision record only. No additional voting endpoint, database table, or client button is deployed by this PR.
