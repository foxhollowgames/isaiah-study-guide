import { mkdir, readFile, writeFile, rename, stat } from 'node:fs/promises';

const regions = JSON.parse(await readFile(new URL('./terrain-regions.json', import.meta.url)));
const jobs = new Map();
for (const region of regions) {
  const { zoom, x0, x1, y0, y1 } = region;
  const folder = new URL(`./terrain-close/${zoom}/`, import.meta.url);
  await mkdir(folder, { recursive:true });
  // One adjacent tile on each side prevents shading seams.
  for (let x=x0-1; x<=x1; x++) for (let y=y0-1; y<=y1; y++) {
    jobs.set(`${zoom}/${x}/${y}`, { file:new URL(`${x}-${y}.png`,folder),
      url:`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${zoom}/${x}/${y}.png` });
  }
}
const queue = [...jobs.values()];
let next=0, done=0;
async function worker() {
  while (next < queue.length) {
    const { file, url } = queue[next++];
    if (!(await stat(file).then(s=>s.size>0).catch(()=>false))) {
      for (let attempt=0; attempt<4; attempt++) {
        try {
          const response = await fetch(url, { signal:AbortSignal.timeout(30000) });
          if (!response.ok) throw Error(`${response.status}: ${url}`);
          const bytes = Buffer.from(await response.arrayBuffer());
          if (bytes.subarray(0,8).toString('hex') !== '89504e470d0a1a0a') throw Error(`Invalid PNG: ${url}`);
          const partial = new URL(file.href+'.part');
          await writeFile(partial,bytes);
          await rename(partial,file);
          break;
        } catch (error) {
          if (attempt===3) throw error;
          await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));
        }
      }
    }
    if (++done % 500 === 0) console.log(`Downloaded ${done}/${queue.length} terrain tiles`);
  }
}
await Promise.all(Array.from({length:8},worker));
console.log(`Ready: ${done} terrain tiles`);
