// Stable stored values are shared by the editor, listing copy, public details and search.
export const villaAmenityGroups=[
 {fr:'Au quotidien',en:'Everyday essentials',options:[['Air conditioning','Climatisation'],['Parking','Parking'],['Wi-Fi','Wi-Fi'],['Garden','Jardin'],['Terrace','Terrasse'],['Outdoor dining','Repas en extérieur'],['Pets allowed','Animaux acceptés'],['Accessible','Accessibilité confirmée']]},
 {fr:'Piscine et vue',en:'Pool and view',options:[['Pool','Piscine'],['Heated pool','Piscine chauffée'],['Secured pool','Piscine sécurisée'],['Sea view','Vue mer']]},
 {fr:'Détente',en:'Relaxation',options:[['Jacuzzi','Jacuzzi'],['Sauna','Sauna'],['Hammam','Hammam']]},
 {fr:'Loisirs',en:'Games and leisure',options:[['Billiards','Billard'],['Table football','Baby-foot'],['Table tennis','Table de ping-pong'],['Petanque court','Terrain de pétanque']]},
 {fr:'Cuisine extérieure',en:'Outdoor cooking',options:[['Barbecue','Barbecue'],['Plancha','Plancha'],['Pizza oven','Four à pizza']]}
] as const;
export const amenityOptions=villaAmenityGroups.flatMap(group=>[...group.options]);
export const essentialStayAmenities=['Pool','Heated pool','Air conditioning','Garden','Parking','Sea view','Pets allowed'] as const;
