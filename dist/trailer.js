const canvas = document.querySelector('#trailer');
const ctx = canvas.getContext('2d', { alpha: false });
const playButton = document.querySelector('#playButton');
const restartButton = document.querySelector('#restartButton');
const soundButton = document.querySelector('#soundButton');
const exportButton = document.querySelector('#exportButton');
const scrubber = document.querySelector('#scrubber');
const timeLabel = document.querySelector('#timeLabel');
const status = document.querySelector('#status');
const W = canvas.width, H = canvas.height, DURATION = 38;
const palette = { ink:'#eff9ff', muted:'#9ebfd2', navy:'#020d18', blue:'#062844', cyan:'#63e4ff', gold:'#efc77a', red:'#d95d4b' };
const assetPaths = {
  landscape:'assets/reading-landscape.png',
  interface:'assets/trailer/meridian-interface.png',
  relief:'assets/lachish-relief.jpg',
  prism:'assets/taylor-prism.jpg',
  cylinder:'assets/cyrus-cylinder.jpg',
  isaiah:'assets/portraits/isaiah-v2.png',
  cyrus:'assets/portraits/cyrus-v2.png'
};
const images = {};
let playing = false, startAt = 0, frameId = 0, audio = null, muted = true, exporting = false;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
function ease(value) { value = clamp(value); return value * value * (3 - 2 * value); }
function phase(time, start, end, fade = .55) {
  return ease((time - start) / fade) * ease((end - time) / fade);
}
function sceneTime(time, start, end) { return clamp((time - start) / (end - start)); }
function cover(image, x = 0, y = 0, width = W, height = H, zoom = 1, panX = 0, panY = 0) {
  const scale = Math.max(width / image.width, height / image.height) * zoom;
  const sw = width / scale, sh = height / scale;
  const sx = (image.width - sw) / 2 + panX * (image.width - sw) / 2;
  const sy = (image.height - sh) / 2 + panY * (image.height - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}
function veil(alpha = .5) {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, `rgba(1,8,15,${alpha * .55})`);
  gradient.addColorStop(.56, `rgba(1,8,15,${alpha * .18})`);
  gradient.addColorStop(1, `rgba(1,8,15,${alpha})`);
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, W, H);
}
function glow(x, y, radius, color = '99,225,255', alpha = .2) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${color},${alpha})`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = gradient; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}
function text(value, x, y, size, options = {}) {
  const { align='center', color=palette.ink, family='Georgia', weight=700, tracking=0, alpha=1, shadow=true, baseline='alphabetic' } = options;
  ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = align; ctx.textBaseline = baseline;
  ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${family}`;
  if (shadow) { ctx.shadowColor = '#000'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 4; }
  if (!tracking) ctx.fillText(value, x, y);
  else {
    const chars = [...value], widths = chars.map(char => ctx.measureText(char).width), total = widths.reduce((a,b) => a+b, 0) + tracking * (chars.length - 1);
    let cursor = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
    ctx.textAlign = 'left';
    chars.forEach((char, index) => { ctx.fillText(char, cursor, y); cursor += widths[index] + tracking; });
  }
  ctx.restore();
}
function rule(y, width = 180, alpha = 1) {
  const gradient = ctx.createLinearGradient(W/2-width,0,W/2+width,0);
  gradient.addColorStop(0,'transparent'); gradient.addColorStop(.5,`rgba(99,228,255,${alpha})`); gradient.addColorStop(1,'transparent');
  ctx.fillStyle = gradient; ctx.fillRect(W/2-width,y,width*2,2);
}
function brand(y, alpha = 1, scale = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(W/2,y); ctx.scale(scale,scale);
  ctx.strokeStyle = palette.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-272, -14, 34, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = palette.cyan; ctx.beginPath();
  for (let i=0;i<8;i++){ const angle=-Math.PI/2+i*Math.PI/4, radius=i%2?8:24; const px=-272+Math.cos(angle)*radius, py=-14+Math.sin(angle)*radius; i?ctx.lineTo(px,py):ctx.moveTo(px,py); }
  ctx.closePath(); ctx.fill();
  text('MERIDIAN', 38, 0, 76, { tracking:9, shadow:true });
  ctx.restore();
}
function drawGrain(time) {
  ctx.save(); ctx.globalAlpha = .045;
  for (let i=0;i<220;i++) {
    const x = (Math.sin(i * 93.17 + time * 17) * .5 + .5) * W;
    const y = (Math.sin(i * 41.83 + time * 31) * .5 + .5) * H;
    ctx.fillStyle = i % 3 ? '#fff' : '#63e4ff'; ctx.fillRect(x,y,1+(i%2),1+(i%2));
  }
  ctx.restore();
  ctx.fillStyle='rgba(0,0,0,.48)'; ctx.fillRect(0,0,W,54); ctx.fillRect(0,H-54,W,54);
}
function sceneOpening(time) {
  const p = sceneTime(time,0,5.2), a = phase(time,0,5.2,.9);
  cover(images.landscape,0,0,W,H,1.02+p*.1,-.18+p*.22,-.06);
  veil(.68); glow(W*.5,H*.48,520,'45,166,221',.2);
  const titleA = ease(clamp((p-.12)/.18)) * ease(clamp((.72-p)/.18));
  const titleB = ease(clamp((p-.5)/.18));
  text('A BOOK OF VISIONS.',W/2,470,68,{tracking:5,alpha:a*titleA});
  text('A WORLD OF CONTEXT.',W/2,470,68,{tracking:5,alpha:a*titleB,color:palette.cyan});
  text('ENTER THE WORLD BEHIND ISAIAH',W/2,555,24,{family:'Segoe UI',weight:600,tracking:7,alpha:a*.9,color:palette.muted});
}
function sceneInterface(time) {
  const p=sceneTime(time,4.5,10.5),a=phase(time,4.5,10.5,.7);
  ctx.fillStyle=palette.navy;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=a;cover(images.interface,-110,-38,W+220,H+76,1.02+p*.13,-.15+p*.28,-.02);ctx.restore();
  const shade=ctx.createLinearGradient(0,0,W,0);shade.addColorStop(0,'rgba(0,9,18,.18)');shade.addColorStop(.62,'rgba(0,9,18,.05)');shade.addColorStop(1,'rgba(0,9,18,.78)');ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=`rgba(2,13,24,${.84*a})`;ctx.fillRect(1090,160,720,430);
  text('READ THE TEXT.',1170,290,57,{align:'left',alpha:a});
  text('SEE THE WORLD.',1170,376,57,{align:'left',alpha:a,color:palette.cyan});
  text('Scripture and geography stay side by side.',1174,456,25,{align:'left',family:'Segoe UI',weight:400,alpha:a,color:palette.muted});
  text('No account. No network required.',1174,500,25,{align:'left',family:'Segoe UI',weight:400,alpha:a,color:palette.muted});
}
function sceneMap(time) {
  const p=sceneTime(time,9.8,15.3),a=phase(time,9.8,15.3,.65);
  ctx.fillStyle=palette.navy;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=a;cover(images.interface,0,0,W,H,1.85,.22,-.08);ctx.restore();
  veil(.35);
  const points=[[608,675],[742,624],[823,509],[884,414],[1006,326]];
  ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=palette.cyan;ctx.lineWidth=7;ctx.setLineDash([22,16]);ctx.lineDashOffset=-p*90;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
  points.forEach(([x,y],i)=>{ctx.fillStyle=i===points.length-1?palette.gold:palette.cyan;ctx.beginPath();ctx.arc(x,y,9+(Math.sin(time*4+i)+1)*2,0,Math.PI*2);ctx.fill();});ctx.restore();
  text('TRACE THE STORY',132,190,25,{align:'left',family:'Segoe UI',weight:700,tracking:6,alpha:a,color:palette.cyan});
  text('Places.',132,278,62,{align:'left',alpha:a});
  text('Kingdoms.',132,354,62,{align:'left',alpha:a});
  text('Journeys.',132,430,62,{align:'left',alpha:a});
  text('Approximate routes are marked as approximate.',136,505,22,{align:'left',family:'Segoe UI',weight:400,alpha:a,color:palette.muted});
}
function sceneWords(time) {
  const p=sceneTime(time,14.6,20.1),a=phase(time,14.6,20.1,.65);
  cover(images.landscape,0,0,W,H,1.34,.55,-.1);veil(.82);glow(1450,420,430,'99,228,255',.17);
  ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(4,29,49,.94)';ctx.strokeStyle='#2d7699';ctx.lineWidth=2;roundRect(930,170,730,650,18,true,true);
  text('WORD STUDY',996,235,21,{align:'left',family:'Segoe UI',weight:700,tracking:5,color:palette.cyan,alpha:a});
  text('peace',996,342,78,{align:'left',weight:600,alpha:a});
  text('שָׁלוֹם',996,420,54,{align:'left',weight:400,color:palette.gold,alpha:a});
  text("Strong’s H7965  ·  shalom",996,472,22,{align:'left',family:'Segoe UI',weight:600,color:palette.muted,alpha:a});
  ctx.fillStyle='#173c55';ctx.fillRect(996,515,570,1);
  wrap('Wholeness, welfare, peace, and well-being. Select a linked word without leaving the verse.',996,570,560,32,26,palette.ink,a);
  ctx.restore();
  text('MOVE FROM READING',160,350,56,{align:'left',alpha:a});
  text('TO CLOSE READING.',160,426,56,{align:'left',alpha:a,color:palette.cyan});
  text('1,310 linked word-study records',164,497,24,{align:'left',family:'Segoe UI',weight:400,color:palette.muted,alpha:a});
}
function sceneEvidence(time) {
  const p=sceneTime(time,19.4,25.6),a=phase(time,19.4,25.6,.7);
  ctx.fillStyle='#020b13';ctx.fillRect(0,0,W,H);
  const cards=[{image:images.relief,x:94,w:540,title:'LACHISH RELIEF'},{image:images.prism,x:690,w:540,title:'SENNACHERIB’S PRISM'},{image:images.cylinder,x:1286,w:540,title:'CYRUS CYLINDER'}];
  cards.forEach((card,index)=>{const rise=(1-ease(clamp((p-index*.08)/.25)))*70;ctx.save();ctx.globalAlpha=a;ctx.beginPath();roundRect(card.x,174+rise,card.w,610,12);ctx.clip();cover(card.image,card.x,174+rise,card.w,610,1.12+p*.04,(index-1)*.22,0);const g=ctx.createLinearGradient(0,480,0,790);g.addColorStop(0,'transparent');g.addColorStop(1,'rgba(0,8,15,.95)');ctx.fillStyle=g;ctx.fillRect(card.x,430+rise,card.w,355);text(card.title,card.x+28,714+rise,22,{align:'left',family:'Segoe UI',weight:700,tracking:3,alpha:a});ctx.restore();});
  ctx.fillStyle=`rgba(2,13,24,${.88*a})`;ctx.fillRect(250,770,1420,195);
  text('FOLLOW THE EVIDENCE',W/2,843,54,{tracking:7,alpha:a});
  text('Source notes, object records, quotations, and limits stay with the passage.',W/2,906,25,{family:'Segoe UI',weight:400,color:palette.muted,alpha:a});
}
function sceneModes(time) {
  const p=sceneTime(time,24.8,30),a=phase(time,24.8,30,.65);
  cover(images.interface,0,0,W/2,H,1.45+p*.04,-.45,0);cover(images.interface,W/2,0,W/2,H,1.45+p*.04,.62,0);
  const left=ctx.createLinearGradient(0,0,W,0);left.addColorStop(0,'rgba(1,8,15,.38)');left.addColorStop(.5,'rgba(1,8,15,.82)');left.addColorStop(1,'rgba(1,8,15,.35)');ctx.fillStyle=left;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=`rgba(99,228,255,${.8*a})`;ctx.fillRect(W/2-1,150,2,690);
  text('HISTORICAL',W*.25,790,26,{family:'Segoe UI',weight:700,tracking:7,alpha:a,color:palette.cyan});
  text('LDS',W*.75,790,26,{family:'Segoe UI',weight:700,tracking:7,alpha:a,color:palette.gold});
  text('TWO STUDY LENSES.',W/2,424,64,{alpha:a});
  text('CLEARLY LABELED.',W/2,510,64,{alpha:a,color:palette.cyan});
  text('Shared evidence remains visible. Faithful interpretation stays distinct.',W/2,590,24,{family:'Segoe UI',weight:400,color:palette.muted,alpha:a});
}
function sceneScale(time) {
  const p=sceneTime(time,29.2,34),a=phase(time,29.2,34,.55);
  cover(images.landscape,0,0,W,H,1.12+p*.06,-.35+p*.7,-.08);veil(.78);glow(W/2,H*.45,560,'41,152,207',.2);
  text('THE WHOLE BOOK.',W/2,250,58,{tracking:8,alpha:a});
  const stats=[['66','CHAPTERS'],['1,292','VERSES'],['1,310','WORD STUDIES'],['6','GUIDED STUDIES']];
  stats.forEach(([number,label],index)=>{const x=250+index*472;text(number,x,520,86,{alpha:a,color:index===0?palette.cyan:palette.ink});text(label,x,575,19,{family:'Segoe UI',weight:700,tracking:4,alpha:a,color:palette.muted});});
  rule(660,650,a);
  text('ONE CONNECTED PLACE TO STUDY.',W/2,746,31,{family:'Segoe UI',weight:600,tracking:6,alpha:a,color:palette.gold});
}
function sceneFinal(time) {
  const p=sceneTime(time,33.2,38),a=phase(time,33.2,38,.7);
  cover(images.landscape,0,0,W,H,1.18-p*.06,.1-p*.2,-.1);veil(.76);glow(W/2,470,570,'78,213,255',.22);
  brand(455,a,.95+.04*ease(p));rule(535,360,a);
  text('FIND YOUR BEARINGS IN ISAIAH.',W/2,620,28,{family:'Segoe UI',weight:600,tracking:7,alpha:a,color:palette.gold});
  text('A map-first study guide for all 66 chapters',W/2,685,24,{family:'Segoe UI',weight:400,alpha:a,color:palette.muted});
  text('isaiah.josephnewelldesign.com',W/2,790,22,{family:'Segoe UI',weight:600,tracking:2,alpha:a,color:palette.cyan});
}
function roundRect(x,y,w,h,r,fill=false,stroke=false){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill)ctx.fill();if(stroke)ctx.stroke();}
function wrap(value,x,y,maxWidth,lineHeight,size,color,alpha=1){ctx.save();ctx.font=`400 ${size}px Segoe UI`;ctx.fillStyle=color;ctx.globalAlpha=alpha;ctx.textAlign='left';const words=value.split(' ');let line='';for(const word of words){const test=line?`${line} ${word}`:word;if(ctx.measureText(test).width>maxWidth){ctx.fillText(line,x,y);line=word;y+=lineHeight;}else line=test;}ctx.fillText(line,x,y);ctx.restore();}
function draw(time) {
  ctx.fillStyle=palette.navy;ctx.fillRect(0,0,W,H);
  if(time<5.2)sceneOpening(time);
  if(time>=4.5&&time<10.5)sceneInterface(time);
  if(time>=9.8&&time<15.3)sceneMap(time);
  if(time>=14.6&&time<20.1)sceneWords(time);
  if(time>=19.4&&time<25.6)sceneEvidence(time);
  if(time>=24.8&&time<30)sceneModes(time);
  if(time>=29.2&&time<34)sceneScale(time);
  if(time>=33.2)sceneFinal(time);
  drawGrain(time);
}
function updateUi(time){scrubber.value=time;timeLabel.textContent=`0:${String(Math.floor(time)).padStart(2,'0')}`;}
function loop(now){if(!playing)return;const time=(now-startAt)/1000;if(time>=DURATION){playing=false;draw(DURATION-.01);updateUi(DURATION);playButton.hidden=false;return;}draw(time);updateUi(time);frameId=requestAnimationFrame(loop);}
function play(from=Number(scrubber.value)||0){cancelAnimationFrame(frameId);playing=true;playButton.hidden=true;startAt=performance.now()-from*1000;if(!muted&&!exporting)startSound(from);frameId=requestAnimationFrame(loop);}
function stopSound(){if(audio){audio.context.close();audio=null;}}
function startSound(offset=0,destination=null,contextOverride=null){stopSound();const context=contextOverride||new AudioContext();const output=destination||context.destination;const master=context.createGain();master.gain.setValueAtTime(0.0001,context.currentTime);master.gain.exponentialRampToValueAtTime(.22,context.currentTime+.8);master.connect(output);const remaining=Math.max(.1,DURATION-offset);
  const drone=context.createOscillator();const droneGain=context.createGain();drone.type='sine';drone.frequency.value=46;droneGain.gain.value=.17;drone.connect(droneGain).connect(master);drone.start();drone.stop(context.currentTime+remaining);
  const fifth=context.createOscillator();const fifthGain=context.createGain();fifth.type='triangle';fifth.frequency.value=69;fifthGain.gain.value=.045;fifth.connect(fifthGain).connect(master);fifth.start();fifth.stop(context.currentTime+remaining);
  [4.7,9.9,14.8,19.6,25,29.4,33.4].filter(t=>t>=offset).forEach((time,index)=>{const when=context.currentTime+time-offset;const osc=context.createOscillator();const gain=context.createGain();osc.type=index%2?'sine':'triangle';osc.frequency.setValueAtTime(88,when);osc.frequency.exponentialRampToValueAtTime(36,when+.75);gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.5,when+.02);gain.gain.exponentialRampToValueAtTime(.0001,when+1.15);osc.connect(gain).connect(master);osc.start(when);osc.stop(when+1.2);});
  for(let beat=Math.ceil(offset/.75)*.75;beat<DURATION;beat+=.75){const when=context.currentTime+beat-offset;const osc=context.createOscillator();const gain=context.createGain();osc.type='sine';osc.frequency.value=62;gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(beat>29?.18:.075,when+.01);gain.gain.exponentialRampToValueAtTime(.0001,when+.18);osc.connect(gain).connect(master);osc.start(when);osc.stop(when+.2);}
  master.gain.setValueAtTime(.22,context.currentTime+Math.max(0,remaining-1.2));master.gain.exponentialRampToValueAtTime(.0001,context.currentTime+remaining);audio={context,master};return context;
}
async function renderVideo(){if(exporting)return;exporting=true;playing=false;stopSound();cancelAnimationFrame(frameId);exportButton.disabled=true;restartButton.disabled=true;soundButton.disabled=true;playButton.hidden=true;status.textContent='Rendering video in real time… 0%';
  const canvasStream=canvas.captureStream(30);const audioContext=new AudioContext();const audioDestination=audioContext.createMediaStreamDestination();startSound(0,audioDestination,audioContext);const stream=new MediaStream([...canvasStream.getVideoTracks(),...audioDestination.stream.getAudioTracks()]);const mimeTypes=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];const mimeType=mimeTypes.find(type=>MediaRecorder.isTypeSupported(type));const recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:12_000_000,audioBitsPerSecond:160_000});const chunks=[];recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};recorder.start(1000);const started=performance.now();startAt=started;playing=true;
  await new Promise(resolve=>{function render(now){const time=(now-started)/1000;draw(Math.min(time,DURATION-.01));updateUi(Math.min(time,DURATION));status.textContent=`Rendering video in real time… ${Math.min(100,Math.round(time/DURATION*100))}%`;if(time<DURATION)requestAnimationFrame(render);else resolve();}requestAnimationFrame(render);});
  playing=false;recorder.stop();await new Promise(resolve=>recorder.addEventListener('stop',resolve,{once:true}));stopSound();if(audioContext.state!=='closed')audioContext.close();const blob=new Blob(chunks,{type:mimeType||'video/webm'});status.textContent='Saving the finished trailer…';
  try{const response=await fetch('/__save-trailer',{method:'POST',headers:{'Content-Type':'video/webm'},body:blob});if(!response.ok)throw new Error('Local save endpoint unavailable');const result=await response.json();status.textContent=`Saved ${result.path} (${(result.bytes/1024/1024).toFixed(1)} MB).`;}
  catch{const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='meridian-trailer.webm';link.click();status.textContent='The trailer was downloaded as meridian-trailer.webm.';setTimeout(()=>URL.revokeObjectURL(link.href),10000);}
  exporting=false;exportButton.disabled=false;restartButton.disabled=false;soundButton.disabled=false;playButton.hidden=false;draw(DURATION-.01);updateUi(DURATION);
}

playButton.addEventListener('click',()=>play(Number(scrubber.value)>=DURATION?0:Number(scrubber.value)));
restartButton.addEventListener('click',()=>{stopSound();play(0)});
soundButton.addEventListener('click',()=>{muted=!muted;soundButton.textContent=muted?'Sound off':'Sound on';soundButton.setAttribute('aria-pressed',String(!muted));if(muted)stopSound();else if(playing)startSound(Number(scrubber.value));});
scrubber.addEventListener('input',()=>{playing=false;stopSound();cancelAnimationFrame(frameId);const time=Number(scrubber.value);draw(time);updateUi(time);playButton.hidden=false;});
exportButton.addEventListener('click',renderVideo);

Promise.all(Object.entries(assetPaths).map(async([key,path])=>{images[key]=await loadImage(path)})).then(()=>{draw(0);status.textContent='Ready. The trailer is 38 seconds.';}).catch(error=>{status.textContent='A trailer asset did not load. Reload the page.';console.error(error)});
