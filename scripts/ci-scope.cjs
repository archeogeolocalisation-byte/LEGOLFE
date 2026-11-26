/* eslint-disable @typescript-eslint/no-require-imports */
const {execFileSync}=require('node:child_process');
const fs=require('node:fs');
// Unknown changes run every group. Only known isolated content edits narrow checks.
function classify(files){
 const result={runtime:false,stay:false,places:false,agenda:false};
 for(const file of files){
  if(/^(docs\/.*|[^/]+\.md|LICENSE(?:\..*)?)$/.test(file))continue;
  result.runtime=true;
  if(/^data\/(events|agendaVerified|additionalAgendaEvents|officialAgendaSnapshot|carreProgrammeSnapshot|cinemaSnapshot|localNews|localFeedSnapshot)\.ts$/.test(file))result.agenda=true;
  else if(/^data\/(places|placeFacts|placeMapPoints|placeImages|hikingRoutes|guides|guideDetails)\.ts$/.test(file)||/^public\/(places|guides)\//.test(file))result.places=true;
  else result.stay=result.places=result.agenda=true;
 }
 return result;
}
if(require.main===module){
 let files;
 try{
  const base=process.env.CI_BASE_SHA;
  if(!/^[a-f0-9]{40}$/.test(base||''))throw new Error('No PR base');
  files=execFileSync('git',['diff','--name-only','-z',base,'HEAD'],{encoding:'utf8'}).split('\0').filter(Boolean);
  if(!files.length)throw new Error('Empty diff; run all checks');
 }catch{files=['unclassified'];}
 const scope=classify(files);
 for(const [key,value] of Object.entries(scope)){
  const line=`${key}=${value}\n`;
  if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,line);
  process.stdout.write(line);
 }
}
module.exports={classify};
