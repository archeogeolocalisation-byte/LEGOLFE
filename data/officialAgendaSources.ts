export type OfficialAgendaSource={key:string;label:string;url:string;format:'apidae'|'iris';limit:number};
// Public programmes observed on 17 October 2026. Detail URLs stay on these origins.
export const officialAgendaSources:OfficialAgendaSource[]=[
 {key:'gassin-territoire',label:'Gassin Tourisme · agenda du Golfe',url:'https://gassin.eu/fr/animations/',format:'apidae',limit:24},
 {key:'domaine-rayol',label:'Domaine du Rayol · agenda officiel',url:'https://www.domainedurayol.org/agenda-domaine-rayol/',format:'iris',limit:8},
];
