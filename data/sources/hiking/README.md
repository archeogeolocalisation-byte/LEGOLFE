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
