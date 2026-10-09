import http from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.geojson':'application/geo+json', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/vnd.microsoft.icon', '.webm':'video/webm', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/__save-trailer') {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 250 * 1024 * 1024) { res.writeHead(413); return res.end('Trailer is too large'); }
        chunks.push(chunk);
      }
      const trailerDirectory = resolve(root, 'assets/trailer');
      await mkdir(trailerDirectory, { recursive: true });
      await writeFile(resolve(trailerDirectory, 'isaiah-study-guide-trailer.webm'), Buffer.concat(chunks));
      res.writeHead(201, { 'Content-Type':'application/json' });
      return res.end(JSON.stringify({ path: 'assets/trailer/isaiah-study-guide-trailer.webm', bytes: size }));
    }
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!target.startsWith(resolve(root) + sep)) { res.writeHead(403); return res.end('Forbidden'); }
    if (!(await stat(target)).isFile()) throw new Error('Not a file');
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found'); }
});
server.on('error', error => { console.error(error.message); process.exit(1); });
server.listen(port, '127.0.0.1', () => console.log(`Isaiah Study Guide is ready at http://127.0.0.1:${port}`));
