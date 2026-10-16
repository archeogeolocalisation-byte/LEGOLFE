export type PublicSearchParams=Record<string,string|string[]|undefined>;

// Preserve repeated query values when an old public route moves to its locale URL.
export function withSearchParams(path:string,search:PublicSearchParams={}) {
 const query=new URLSearchParams();
 for(const [key,value] of Object.entries(search)){
  for(const item of Array.isArray(value)?value:value===undefined?[]:[value])query.append(key,item);
 }
 return query.size?`${path}?${query}`:path;
}

export function hasExploreParameters(search:PublicSearchParams) {
 return ['filter','mood','q','town'].some(key=>search[key]!==undefined);
}
