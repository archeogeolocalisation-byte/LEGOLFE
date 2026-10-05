import type { GolfeEvent } from "./events";
// Facts checked on individual official source pages on 3 October 2026.
export const verifiedEventUpdates:Record<string,Partial<GolfeEvent>> = {
  "maud-fontenoy": {
    "time": "18:00",
    "venue": "Cinéma Star",
    "streetAddress": "3, traverse de la Gendarmerie",
    "postalCode": "83990",
    "source": "https://www.saint-tropez.fr/fr/fiche/conference-les-conversations-engagees-d-agnes-recoivent-maud-fontenoy-8015232/",
    "sourceLabel": "Ville de Saint-Tropez",
    "sourceCheckedAt": "2026-10-03"
  },
  "vtt-vintage-ramatuelle": {
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/sports/ramatuelle/3eme-trophee-vtt-vintage-7351981/",
    "sourceCheckedAt": "2026-10-03"
  },
  "marche-solidaire-golfe": {
    "location": "Gassin",
    "venue": "Moulin de Brulât",
    "streetAddress": "Chemin de Villevieille",
    "postalCode": "83580",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/sports/gassin/marche-solidaire-le-cancer-notre-affaire-golfe-de-saint-tropez-7480442/",
    "practicalFr": "Départ de Gassin à 10h30 ; inscription obligatoire auprès de l’organisateur.",
    "practical": "The Gassin departure is at 10:30; registration with the organizer is required.",
    "sourceCheckedAt": "2026-10-03"
  },
  "hasard-contretemps": {
    "venue": "Espace Culturel Albert-Raphaël",
    "streetAddress": "11 Chemin de la Calade",
    "postalCode": "83350",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/distractions-et-loisirs/ramatuelle/les-belles-soirees-de-ramatuelle-hasard-et-contretemps-7465702/",
    "sourceCheckedAt": "2026-10-03"
  },
  "oratoires": {
    "venue": "Espace Culturel Albert-Raphaël",
    "streetAddress": "11 Chemin de la Calade",
    "postalCode": "83350",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/culture/ramatuelle/rencontres-oratoires-de-ramatuelle-7994710/",
    "sourceCheckedAt": "2026-10-03"
  },
  "halloween-ramatuelle": {
    "venue": "Espace Culturel Albert-Raphaël",
    "streetAddress": "11 Chemin de la Calade",
    "postalCode": "83350",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/distractions-et-loisirs/ramatuelle/boum-de-halloween-6683928/",
    "sourceCheckedAt": "2026-10-03"
  },
  "voiles-2026": {
    "source": "https://www.sainttropeztourisme.com/fr/evenements-saint-tropez/les-grands-evenements/les-voiles-de-saint-tropez/",
    "sourceCheckedAt": "2026-10-03"
  },
  "gassin-guided-history": {
    "start": "2026-09-07",
    "end": "2026-10-26",
    "time": "16:00",
    "venue": "Office de tourisme de Gassin",
    "streetAddress": "20, place Léon Martel",
    "postalCode": "83580",
    "source": "https://gassin.eu/fr/animation/culture/gassin/balade-guidee-au-cur-de-lhistoire-de-gassin-5147284/",
    "sessions": [
      {
        "start": "2026-09-07",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-09-14",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-09-21",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-09-28",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-10-05",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-10-12",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-10-19",
        "time": "16:00",
        "endTime": "17:30"
      },
      {
        "start": "2026-10-26",
        "time": "16:00",
        "endTime": "17:30"
      }
    ],
    "practicalFr": "Séances le lundi à 16h ; durée annoncée de 1h30.",
    "practical": "Monday sessions at 16:00; the listed duration is 90 minutes.",
    "sourceCheckedAt": "2026-10-03"
  },
  "gassin-jumping-october": {
    "venue": "Polo Club - Haras de Gassin",
    "streetAddress": "1999, route du Bourrian",
    "postalCode": "83580",
    "source": "https://gassin.eu/fr/animation/sports/gassin/concours-de-sauts-international-jumping-d-octobre-7600439/",
    "sessions": [
      {
        "start": "2026-10-15",
        "end": "2026-10-18"
      },
      {
        "start": "2026-10-22",
        "end": "2026-10-25"
      }
    ],
    "practicalFr": "Deux blocs annoncés : 15–18 et 22–25 octobre. Vérifiez le programme quotidien auprès de l’organisateur.",
    "practical": "Two announced blocks: 15–18 and 22–25 October. Check the daily program with the organizer.",
    "sourceCheckedAt": "2026-10-03"
  }
};
export const verifiedNewEvents:GolfeEvent[] = [
  {
    "id": "sophie-ladame-vasserot",
    "title": "Sophie Ladame exhibition",
    "titleFr": "Exposition Sophie Ladame",
    "start": "2026-10-01",
    "end": "2026-10-07",
    "location": "Saint-Tropez",
    "venue": "Lavoir Vasserot",
    "streetAddress": "1, Rue Joseph Quaranta",
    "postalCode": "83990",
    "category": "culture",
    "summary": "Paintings and drawings inspired by sailing at Lavoir Vasserot.",
    "summaryFr": "Peintures et dessins inspirés de la navigation au Lavoir Vasserot.",
    "why": "A cultural stop to pair with a visit to the village.",
    "whyFr": "Une étape culturelle à associer à une visite du village.",
    "source": "https://www.saint-tropez.fr/fr/fiche/exposition-du-lavoir-vasserot-sophie-ladame-7987307/",
    "sourceLabel": "Ville de Saint-Tropez",
    "sourceCheckedAt": "2026-10-03",
    "practicalFr": "Entrée libre. Horaires annoncés : 10h–12h30 et 14h30–21h.",
    "practical": "Free entry. Listed hours: 10:00–12:30 and 14:30–21:00."
  },
  {
    "id": "pop-up-words-ramatuelle",
    "title": "Pop Up Words in Ramatuelle",
    "titleFr": "Pop Up Words à Ramatuelle",
    "start": "2026-09-20",
    "end": "2026-10-04",
    "location": "Ramatuelle",
    "venue": "La vitrine des créateurs",
    "streetAddress": "23 bis Rue du Centre",
    "postalCode": "83350",
    "category": "culture",
    "summary": "A display of typographic posters in the village’s creators showcase.",
    "summaryFr": "Une présentation d’affiches typographiques dans la vitrine des créateurs du village.",
    "why": "A short creative stop during a village visit.",
    "whyFr": "Une courte pause créative pendant une visite du village.",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/manifestations-commerciales/ramatuelle/la-vitrine-des-createurs-pop-up-words-7808925/",
    "sourceLabel": "Ramatuelle Tourisme",
    "sourceCheckedAt": "2026-10-03"
  },
  {
    "id": "jeux-guilde-ramatuelle",
    "title": "Board game evenings — La Guilde des Plaisirs",
    "titleFr": "Soirées jeux — La Guilde des Plaisirs",
    "start": "2026-10-10",
    "end": "2027-03-20",
    "time": "20:00",
    "location": "Ramatuelle",
    "venue": "Espace Culturel Albert-Raphaël",
    "streetAddress": "11 Chemin de la Calade",
    "postalCode": "83350",
    "category": "local",
    "sessions": [
      {
        "start": "2026-10-10",
        "time": "20:00"
      },
      {
        "start": "2026-10-24",
        "time": "20:00"
      },
      {
        "start": "2026-11-07",
        "time": "20:00"
      },
      {
        "start": "2026-11-21",
        "time": "20:00"
      },
      {
        "start": "2026-12-05",
        "time": "20:00"
      },
      {
        "start": "2027-01-23",
        "time": "20:00"
      },
      {
        "start": "2027-02-06",
        "time": "20:00"
      },
      {
        "start": "2027-02-20",
        "time": "20:00"
      },
      {
        "start": "2027-03-06",
        "time": "20:00"
      },
      {
        "start": "2027-03-20",
        "time": "20:00"
      }
    ],
    "summary": "Scheduled board game evenings for players aged 16 and over.",
    "summaryFr": "Des soirées jeux de société sur des dates précises, pour les joueurs à partir de 16 ans.",
    "why": "A social village evening to plan around the listed sessions.",
    "whyFr": "Une soirée conviviale au village, à prévoir selon les séances annoncées.",
    "practical": "Listed sessions run from 20:00 to midnight. Confirm arrangements with the organizer.",
    "practicalFr": "Les séances sont annoncées de 20h à minuit. Confirmez les modalités auprès de l’organisateur.",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/distractions-et-loisirs/ramatuelle/soiree-jeux-de-societe-avec-l-association-ramatuelloise-la-guilde-des-plaisirs-7579161/",
    "sourceLabel": "Ramatuelle Tourisme",
    "sourceCheckedAt": "2026-10-03"
  },
  {
    "id": "plantes-envahissantes-ramatuelle",
    "title": "Invasive plant removal activity",
    "titleFr": "Mobilisation contre les plantes envahissantes",
    "start": "2026-11-04",
    "time": "14:00",
    "location": "Ramatuelle",
    "category": "local",
    "summary": "A supervised activity to help protect local coastal vegetation.",
    "summaryFr": "Une intervention encadrée pour contribuer à la préservation de la végétation du littoral.",
    "why": "A practical way to take part in local nature conservation.",
    "whyFr": "Une façon concrète de participer à la protection de la nature locale.",
    "practical": "Registration required; from age 10. Listed time: 14:00–16:00. Weather may cause cancellation.",
    "practicalFr": "Sur inscription, à partir de 10 ans. Horaire annoncé : 14h–16h. Annulation possible selon la météo.",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/nature-et-detente/ramatuelle/mobilisations-contre-les-plantes-exotiques-envahissantes-7640768/",
    "sourceLabel": "Ramatuelle Tourisme",
    "sourceCheckedAt": "2026-10-03"
  },
  {
    "id": "nettoyons-pampelonne-decembre",
    "title": "Pampelonne clean-up",
    "titleFr": "Nettoyons Pampelonne",
    "start": "2026-12-09",
    "time": "14:00",
    "location": "Ramatuelle",
    "venue": "Plage de Pampelonne",
    "postalCode": "83350",
    "category": "local",
    "summary": "A scheduled activity to help look after the Pampelonne coast.",
    "summaryFr": "Un rendez-vous pour contribuer à la préservation du littoral de Pampelonne.",
    "why": "A different way to spend time on the coast outside summer.",
    "whyFr": "Une autre façon de passer du temps sur le littoral hors été.",
    "practical": "Check registration and the meeting point with the organizer. Listed time: 14:00–16:00; subject to weather.",
    "practicalFr": "Vérifiez l’inscription et le point de rendez-vous auprès de l’organisateur. Horaire annoncé : 14h–16h, sous réserve météo.",
    "source": "https://www.ramatuelle-tourisme.com/fr/animation/nature-et-detente/ramatuelle/ensemble-nettoyons-pampelonne-7517103/",
    "sourceLabel": "Ramatuelle Tourisme",
    "sourceCheckedAt": "2026-10-03"
  }
];
