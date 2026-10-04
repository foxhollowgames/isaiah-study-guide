import { mkdir, writeFile, stat } from 'node:fs/promises';
await mkdir(new URL('./terrain/',import.meta.url),{recursive:true});
const tiles=[];
// Include the western coast, Cush, and Sheba with space around their markers.
for(let x=73;x<=81;x++) for(let y=48;y<=59;y++) tiles.push({x,y});
let index=0;
async function worker(){while(index<tiles.length){const {x,y}=tiles[index++];const file=new URL(`./terrain/${x}-${y}.png`,import.meta.url);if(await stat(file).then(s=>s.size>0).catch(()=>false))continue;const url=`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/7/${x}/${y}.png`;const r=await fetch(url);if(!r.ok)throw Error(`${r.status}: ${url}`);await writeFile(file,Buffer.from(await r.arrayBuffer()));}}
await Promise.all(Array.from({length:6},worker));
console.log(`Saved ${tiles.length} numerical terrain tiles for the study region.`);
