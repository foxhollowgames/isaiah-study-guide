import { mkdir, writeFile, stat } from 'node:fs/promises';
const folder = new URL('./terrain-detail/', import.meta.url);
await mkdir(folder, {recursive:true});
const jobs = [];
// Zoom 10 source pixels, with a one-tile halo for seamless hillshading.
for (let x=603;x<=620;x++) for (let y=402;y<=425;y++) jobs.push({
  url:`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/10/${x}/${y}.png`,
  file:new URL(`${x}-${y}.png`,folder)
});
for (const kind of ['land','lakes']) jobs.push({
  url:`https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_${kind}.geojson`,
  file:new URL(`${kind}.geojson`,folder)
});
let index=0,done=0;
async function worker() {
  while (index<jobs.length) {
    const job=jobs[index++];
    if (await stat(job.file).then(s=>s.size>0).catch(()=>false)) {done++;continue;}
    for(let attempt=0;attempt<3;attempt++) {
      try {
        const response=await fetch(job.url);
        if(!response.ok) throw Error(`${response.status}: ${job.url}`);
        await writeFile(job.file,Buffer.from(await response.arrayBuffer()));
        break;
      } catch(error) {if(attempt===2)throw error;}
    }
    done++;
    if(done%100===0)console.log(`Downloaded ${done}/${jobs.length} detail assets`);
  }
}
await Promise.all(Array.from({length:8},worker));
console.log(`Ready: ${done} detail assets`);
