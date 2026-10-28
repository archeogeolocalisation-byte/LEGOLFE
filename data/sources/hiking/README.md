# Hiking tracks — documentary check 28 October 2026

These are source geometries, not LE GOLFE field recordings. No geometry was drawn or joined by hand. Elevations are those supplied by each provider, not new GPS measurements. Cumulative distances use the haversine formula (Earth radius 6,371 km) and can differ slightly from the providers’ published totals.

| Route | Source snapshot | Geometry | Published figures |
| --- | --- | --- | --- |
| Cap Lardier | `cap-lardier.gpx` | 688 points, one track segment, 8.219 km | 8.2 km / 3 h 30 / +282 m / intermediate |
| Vallon du Pont des Fées | `pont-des-fees.kml` | 130 points, one LineString, 1.891 km | 1.9 km / 1 h / +81 m / easy |
| Roches Blanches, Croix des Maures, Fort Freinet | `roches-blanches-visorando.json` | 325 source points, 9.453 km | 9.46 km / 3 h 40 / +344 m / moderate on Visorando |

## Retrieval and attribution

- Cap: Parc national de Port-Cros, [route 681](https://destination.portcros-parcnational.fr/fr/trek/681-Circuit-du-Cap-Lardier), [original GPX](https://geotrek-admin.portcros-parcnational.fr/api/fr/treks/681/circuit-du-cap-lardier.gpx).
- Pont: Département du Var / Office du Golfe, departmental loop [7602843](https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/grimaud/le-vallon-du-pont-des-fees-7602843). [KML](https://snvadmin.var.fr/api/fr/treks/24169/le-vallon-du-pont-des-fees.kml) and [PDF](https://snvadmin.var.fr/api/fr/treks/24169/le-vallon-du-pont-des-fees.pdf). The GPX linked through Apidae returned 404, so the download offered here converts the single official KML LineString to GPX without changing coordinates or elevations. This is the 1.9 km departmental loop, distinct from the 1.3 km thematic trail.
- Fort: [Visorando circuit 2710724](https://www.visorando.com/randonnee-les-roches-blanches-la-croix-des-maures-/). Coordinates/elevations extracted from the public map data `https://www.visorando.com/index.php?component=ajax&task=getChartDataFile4&idRandonnee=2710724&jsoncallback=route`. The retained snapshot contains only `[latitude, longitude, altitude]` arrays, excluding unrelated metadata. The GPX action sends visitors to the original provider. Its geometry is preserved even where start and end differ slightly.

The short official Fort circuit is a separate route (3 km, difficult); its linked GPX contains only two red connection fragments. Those were **not** joined or presented as the full route. Fort hazards are documented in the [office guide](https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-la-croix-et-le-fort-freinet-4599409) and [PDF](https://static.apidae-tourisme.com/filestore/objets-touristiques/documents/171/165/37660075/2023CCGST_FicheRando1FR.pdf): exposed, steep terrain; avoid rain and strong wind; red connection for experienced walkers, blue also steep.

The three `data/*Trail.json` files hold source SHA-256 hashes and all source coordinates/elevations. Local Cap and Pont GPX files preserve every point in order. `scripts/test-hiking-routes.cjs` checks snapshots, downloads, map framing, interactive profile state and guide/place integration. Source labels and documentary dates appear on the public pages. Opening status must be checked separately on the day.

Fort photograph reuses the existing locally cached Commons image (no new download): Blaue Max, 2015, [source](https://commons.wikimedia.org/wiki/File:Fort_du_Freinet,_La_Garde-Freinet,_France.jpg), CC BY-SA 4.0. Existing resizing, WebP conversion and display cropping are disclosed by `GuideImage`.

## Page separation correction — 28 October 2026

The Cap Lardier route is attached to the actual `circuit-cap-lardier` place page as well as its guide. The 9.46 km Visorando loop belongs to its own `randonnee-roches-blanches` place page; its existing guide URL is retained. `fort-freinet` covers the shorter site visit, links to the official blue/red access plan, and does not render or attribute reports to the longer loop. No complete short-track geometry is invented from the red GPX fragments. The blue approach is presented as shorter and less difficult than the red connection, with rocky terrain still disclosed; the office’s combined 3 km figures are not assigned to an unmeasured blue return walk.

## Three new place pages — 28 October 2026

These are three new catalogue records, each rendering its own full map, profile, GPX download and moderated trail contributions directly on the place page:

| Place page | Source geometry | Measured GPX | Published distance / time |
| --- | --- | --- | --- |
| `randonnee-saint-clement` | 159 original points, one track segment | 4.197 km | 4 km / 1 h 20 |
| `randonnee-moulin-adrech` | 88 original points, one track segment | 2.584 km | 3 km / 1 h |
| `randonnee-miremer` | 331 original points, one track segment | 9.157 km | 9.7 km / 3 h |

The source distance differences are disclosed in each page and in the overview diagrams. No point was added to make the files match the published distance. Miremer is a hiking itinerary from the village, separate from the existing chapel heritage page.

Original GPX files, linked by the Office du Golfe:

- Saint-Clément: https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/198/74/41044678/GFT_St_Clment_GPX.gpx
- Moulin de l’Adrech: https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/83/73/41044307/GFT_Moulin_Adrech_GPX.gpx
- Miremer: https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/224/73/41044448/GFT_Miremer_GPX.gpx

Source pages and PDF guidebooks are recorded in `data/newHikingPlaces.ts`. All three GPX files omit elevations. For the exact source points, elevations were requested in batches of at most 40 from `https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json`, with `resource=ign_rge_alti_wld`, `zonly=true`, and matching latitude/longitude lists. The `*-ign.json` files preserve returned elevation arrays in source order. The trail datasets include SHA-256 hashes of both source files. Public descriptions distinguish IGN terrain estimates from GPS recordings, and published ascent remains attributed to the office rather than recomputed from the model.

The local downloads preserve all original coordinates and add the documented IGN elevations. Overview SVGs are original diagrams calculated from the same geometry, labelled as diagrams without basemaps; they are not photographs or generated depictions of the landscape.

Inspected but not published: the Gorgues file measured 3.09 km and did not close, versus 5.2 km announced; Cogolin–Giégi measured 6.79 km versus 10 km announced; Peygros ended more than 1 km from its start. No missing sections were invented or joined. Those files are not shipped with these pages.
