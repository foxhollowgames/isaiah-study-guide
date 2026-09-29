import { mkdir, writeFile } from 'node:fs/promises';
await mkdir(new URL('./terrain/',import.meta.url),{recursive:true});
const tiles=[];
for(let x=74;x<=81;x++) for(let y=48;y<=54;y++) tiles.push({x,y});
let index=0;
async function worker(){while(index<tiles.length){const {x,y}=tiles[index++];const url=`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/7/${x}/${y}.png`;const r=await fetch(url);if(!r.ok)throw Error(`${r.status}: ${url}`);await writeFile(new URL(`./terrain/${x}-${y}.png`,import.meta.url),Buffer.from(await r.arrayBuffer()));}}
await Promise.all(Array.from({length:6},worker));
console.log(`Saved ${tiles.length} numerical terrain tiles for the pilot region.`);
