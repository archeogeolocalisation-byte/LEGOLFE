import {getOfficialAgendaFeeds} from "./officialAgendaFeeds";
import {qualityAgendaEvents,mergeOfficialAgenda} from "./agendaQuality";
import {getCarreProgramme} from "./carreFeed";
import {mergeCarreProgramme} from "./carreProgramme";
import {additionalAgendaEvents} from "../data/additionalAgendaEvents";
import { verifiedEventUpdates, verifiedNewEvents } from "../data/agendaVerified";
import { cache } from "react";
import { events } from "../data/events";
import { getApprovedEvents } from "./editorialDb";
export const getPublicEvents = cache(async () => {
 const base=[...events.map(e=>({...e,...verifiedEventUpdates[e.id]})),...verifiedNewEvents,...additionalAgendaEvents];
 const [live,carre,official] = await Promise.all([getApprovedEvents(),getCarreProgramme(),getOfficialAgendaFeeds()]);
 const refreshed=mergeOfficialAgenda(mergeCarreProgramme(base,carre),official);
 return qualityAgendaEvents([...refreshed, ...live.filter(x => !refreshed.some(e => e.id === x.id || (e.source === x.source && e.start === x.start && e.title === x.title)))]);
});
