// Local receiver v2. A form POST to /form carries base64 PNG fields named book--id. The reply page reloads the prompt list into window.name.
import http from 'node:http';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
const out = 'C:/Users/josep/Desktop/Isaiah Study Guide/review/portrait-variety/';
const prompts = process.argv[2];
mkdirSync(out, { recursive: true });
const code = `window.__imgs=()=>[...document.querySelectorAll('main img')].filter(i=>/Generated image/i.test(i.alt)||i.naturalWidth>800).map(i=>i.src).filter((s,k,a)=>a.indexOf(s)===k);
window.__go=async(i)=>{const p=JSON.parse(window.name).prompts[i];const el=document.querySelector('#prompt-textarea, .ProseMirror[contenteditable="true"]');if(!el)return 'no composer';el.focus();document.execCommand('insertText',false,p[1]);await new Promise(r=>setTimeout(r,900));const b=document.querySelector('[data-testid="send-button"],#composer-submit-button,button[aria-label*="Send"]');if(!b)return 'no send';b.click();return 'sent '+p[0];};
window.__b64=async(src)=>{const r=await fetch(src,{credentials:'include'});const b=await r.blob();return await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result.split(',')[1]);fr.readAsDataURL(b);});};
window.__post=async(pairs)=>{const f=document.createElement('form');f.method='POST';f.action='http://127.0.0.1:4189/form';for(const [name,src] of pairs){const t=document.createElement('textarea');t.name=name;t.value=await window.__b64(src);f.appendChild(t);}document.body.appendChild(f);f.submit();return 'posted '+pairs.length;};
window.__last=async(i)=>{const p=JSON.parse(window.name).prompts[i];const s=window.__imgs();if(!s.length||document.querySelector('[data-testid="stop-button"]'))return 'not ready';return await window.__post([[p[0],s[s.length-1]]]);};`;
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const page = msg => { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(`<title>${msg}</title><body>${msg}<script>window.name=JSON.stringify({prompts:${readFileSync(prompts, 'utf8')},code:${JSON.stringify(code)}});document.title=${JSON.stringify(msg)}+' ready';</script>`); };
  if (req.method === 'POST' && u.pathname === '/form') {
    const chunks = []; for await (const c of req) chunks.push(c);
    const saved = [];
    for (const [name, value] of new URLSearchParams(Buffer.concat(chunks).toString('utf8'))) {
      const buf = Buffer.from(value, 'base64'), clean = name.replace(/[^a-z0-9-]/gi, '');
      if (clean && buf.length > 100000 && buf.readUInt32BE(0) === 0x89504e47) { writeFileSync(out + clean + '.png', buf); saved.push(clean + ':' + buf.length); }
      else saved.push('REJECTED ' + clean + ':' + buf.length);
    }
    return page('saved ' + saved.join(' '));
  }
  if (u.pathname === '/start') return page('start');
  res.writeHead(404); res.end();
}).listen(4189, '127.0.0.1', () => console.log('receiver v2 ready'));
