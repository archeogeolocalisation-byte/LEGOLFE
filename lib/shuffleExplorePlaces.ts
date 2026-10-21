import {randomInt} from 'node:crypto';
import type {Place} from '../data/places';

// Shuffle a copy on the server: every place stays linked in the initial HTML.
export function shuffleExplorePlaces(places:readonly Place[]):Place[]{
 const shuffled=[...places];
 for(let i=shuffled.length-1;i>0;i--){
  const j=randomInt(i+1);
  [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled;
}
