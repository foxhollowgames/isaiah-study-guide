import { mkdir, writeFile } from 'node:fs/promises';

const sampleRate = 44100;
const duration = 32;
const channels = 2;
const frames = sampleRate * duration;
const dataBytes = frames * channels * 2;
const buffer = Buffer.alloc(44 + dataBytes);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataBytes, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * 2, 28);
buffer.writeUInt16LE(channels * 2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataBytes, 40);

const impacts = [0.15, 3, 4, 5, 6, 7.1, 13.9, 19, 20.15, 21.3, 24, 28];
const notes = [46.25, 55, 69.3, 82.4];
const clamp = (value) => Math.max(-1, Math.min(1, value));
const smooth = (value) => value * value * (3 - 2 * value);
const noise = (index) => {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
};

for (let index = 0; index < frames; index++) {
  const time = index / sampleRate;
  const section = Math.min(notes.length - 1, Math.floor(time / 8));
  const base = notes[section];
  const opening = smooth(Math.min(1, time / 1.4));
  const closing = smooth(Math.min(1, (duration - time) / 1.8));
  const master = opening * closing;
  const pulse = Math.pow(Math.max(0, Math.sin(Math.PI * 2 * time / 1.5)), 8);
  const drone = Math.sin(Math.PI * 2 * base * time) * 0.13;
  const fifth = Math.sin(Math.PI * 2 * base * 1.5 * time + 0.3) * 0.045;
  const air = Math.sin(Math.PI * 2 * (base * 4 + Math.sin(time * 0.2) * 1.5) * time) * 0.018;
  let impact = 0;
  for (const moment of impacts) {
    const delta = time - moment;
    if (delta >= 0 && delta < 1.4) {
      impact += Math.sin(Math.PI * 2 * (74 - 32 * delta) * delta) * Math.exp(-4.1 * delta) * 0.42;
      impact += noise(index + Math.floor(moment * 1000)) * Math.exp(-12 * delta) * 0.08;
    }
  }
  const rise = time > 23 && time < 28 ? Math.sin(Math.PI * (time - 23) / 5) : 0;
  const shimmer = Math.sin(Math.PI * 2 * 554.4 * time) * rise * 0.025;
  const left = clamp((drone + fifth + air + pulse * 0.035 + impact + shimmer) * master);
  const right = clamp((drone + fifth * 0.82 - air + pulse * 0.035 + impact * 0.94 + shimmer * 0.85) * master);
  const offset = 44 + index * 4;
  buffer.writeInt16LE(Math.round(left * 32767), offset);
  buffer.writeInt16LE(Math.round(right * 32767), offset + 2);
}

await mkdir(new URL('../public/audio/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/audio/meridian-score.wav', import.meta.url), buffer);
console.log(`Generated ${duration}s stereo score at ${sampleRate} Hz.`);
