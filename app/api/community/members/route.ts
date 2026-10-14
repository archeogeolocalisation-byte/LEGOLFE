import {getPublicMembers,memberIdPattern} from "../../../../lib/publicMembers";

export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request){
  const ids=new URL(request.url).searchParams.get("ids")?.split(",")||[];
  if(ids.length<1||ids.length>30||ids.some(id=>!memberIdPattern.test(id))){
    return Response.json({error:"INVALID_IDS"},{status:400,headers:{"Cache-Control":"no-store"}});
  }
  try{
    const members=await getPublicMembers(ids);
    return Response.json({members},{headers:{"Cache-Control":"private, no-store"}});
  }catch{
    return Response.json({error:"UNAVAILABLE"},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
