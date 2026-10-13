import {mapPointPixels} from './villaMapLocation';
export const touristMapBounds={west:6.38,east:6.83,south:43.135,north:43.385};
export const touristMapSize={width:1000,height:763};
export const touristMapUpdated='2026-10-13';
// Same Web Mercator frame as the cropped terrain raster; labels may move, points never do.
export function touristMapPoint(latitude:number,longitude:number){
 const nw=mapPointPixels(touristMapBounds.north,touristMapBounds.west,0),se=mapPointPixels(touristMapBounds.south,touristMapBounds.east,0),p=mapPointPixels(latitude,longitude,0);
 return {x:(p.x-nw.x)/(se.x-nw.x)*1000,y:(p.y-nw.y)/(se.x-nw.x)*1000};
}
export type TouristMapView={zoom:number;panX:number;panY:number};
export function clampTouristView(view:TouristMapView):TouristMapView{
 const zoom=Math.max(1,Math.min(2.5,Number.isFinite(view.zoom)?view.zoom:1));
 const limit=(zoom-1)*50,clamp=(n:number)=>Math.max(-limit,Math.min(limit,Number.isFinite(n)?n:0))||0;
 return {zoom,panX:clamp(view.panX),panY:clamp(view.panY)};
}
export function touristViewForPoint(zoom:number,point:{x:number;y:number}):TouristMapView{
 return clampTouristView({zoom,panX:(50-point.x/10)*zoom,panY:(50-point.y/touristMapSize.height*100)*zoom});
}
export function touristMapTransform(view:TouristMapView){const v=clampTouristView(view);return `translate(${v.panX}%,${v.panY}%) scale(${v.zoom})`;}
