LE GOLFE — V8

WHAT CHANGED
- Community module at the bottom of every place page.
- Account page with Supabase email magic-link sign-in.
- Authenticated visitors can submit a photo and/or comment.
- Contributions are stored as pending and only approved contributions appear publicly.
- Supabase SQL setup included in supabase/community.sql.
- La Plan-de-la-Tour: additional visual gallery including local archaeology.
- Ramatuelle: additional editorial media (street + Moulin de Paillas).
- Saint-Tropez: new dedicated editorial page with multiple media.
- Le Club 55: restaurant page refined + community module.
- Homepage: old 01/02/03/04/05 box menu replaced by large editorial text links.

COMMUNITY SETUP
1. Open the Supabase SQL editor for this project.
2. Run supabase/community.sql once.
3. In Supabase Authentication, ensure Email provider is enabled.
4. Add your local URL and future production URL to allowed redirect URLs.
5. Community submissions are pending by default. Change status to approved in community_posts to publish.

NO NEW NPM DEPENDENCY.
Keep your existing node_modules.
