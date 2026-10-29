import type {GolfeEvent} from '../data/events';
// A ticket link is offered only for an identified official ticketing detail page.
export function eventBookingUrl(event:GolfeEvent){
 try{const u=new URL(event.source);if(u.protocol==='https:'&&!u.username&&!u.password&&u.hostname==='billetterie-carresaintemaxime.mapado.com'&&/^\/event\/\d+-[a-z0-9-]+\/?$/.test(u.pathname))return u.href;}catch{/* No verified ticket link. */}
}
export function eventDirectionsUrl(event:GolfeEvent){
 if(!event.venue&&!event.streetAddress)return;
 const query=[event.venue,event.streetAddress,event.postalCode,event.location,'France'].filter(Boolean).join(', ');
 return 'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',destination:query});
}
