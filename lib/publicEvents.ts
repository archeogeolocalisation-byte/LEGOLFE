import { verifiedEventUpdates, verifiedNewEvents } from "../data/agendaVerified";
import { cache } from "react";
import { events } from "../data/events";
import { getApprovedEvents } from "./editorialDb";
export const getPublicEvents = cache(async () => {
 const base=[...events.map(e=>({...e,...verifiedEventUpdates[e.id]})),...verifiedNewEvents];
 const live = await getApprovedEvents();
 return [...base, ...live.filter(x => !base.some(e => e.id === x.id || (e.source === x.source && e.start === x.start && e.title === x.title)))];
});
