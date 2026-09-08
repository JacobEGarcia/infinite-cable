'use strict';
/* INFINITE CABLE - infinite procedural TV from every dimension. All content generated, all original. */

// ---------------- RNG ----------------
function hashStr(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=(h<<13)|(h>>>19);}return h>>>0;}
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
class R{
  constructor(seed){this.f=mulberry32(seed);}
  n(){return this.f();}
  i(a,b){return a+Math.floor(this.f()*(b-a+1));}
  pick(a){return a[Math.floor(this.f()*a.length)];}
  chance(p){return this.f()<p;}
  shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(this.f()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
}

// ---------------- word banks (all original) ----------------
const ADJ=['Quantum','Turbo','Mega','Ultra','Hyper','Cosmic','Astral','Neon','Pickled','Inverted','Moist','Sentient','Suspicious','Wobbly','Infinite','Discount','Premium','Haunted','Bionic','Liquid','Frozen','Spicy','Invisible','Recursive','Bureaucratic','Emotional','Portable','Edible','Extreme','Mildly','Certified','Unlicensed','Retro','Synthetic','Organic','Illegal','Chromatic','Ominous','Jumbo','Micro'];
const NOUN=['Blorps','Nuggets','Beans','Worms','Toast','Soup','Socks','Batteries','Spoons','Chairs','Lasagna','Pebbles','Balloons','Gravy','Waffles','Lint','Pickles','Tubes','Cubes','Orbs','Sludge','Muffins','Anchors','Kazoos','Doorknobs','Marshmallows','Cacti','Goggles','Pudding','Springs','Helmets','Noodles','Tractors','Umbrellas','Marbles','Croutons','Robots','Hamsters','Crayons','Mops'];
const PLACE=['Blorp City','New Zanthar','Greep Falls','Sector 9G','Cranium Heights','Old Squanchville','Port Mumbis','Lake Vexor','The Moist Zone','Downtown Flarp','Upper Crustonia','Sector 12','Moonbase Delta','Plumbus Heights','Glapton Bay','Fort Wizzle','Lower Hexagon','The Beige District','Quasar Hills','Snorb Township'];
const FIRST=['Glorp','Brenda','Xarthan','Mabel','Zorp','Kevin','Unit-7','Grandma','Blip','Chet','Yolanda','Skronk','Agent','Professor','Dennis','Qwix','Loretta','Bim','Sarge','Wanda'];
const LAST=['McGlavin','von Schplint','the Third','Jr.','Blastbody','of Dimension 9','Wexley','Grumbles','the Unmovable','Zorak','Fenwick','Prime','the Moist','Kranston','Oofley','Skibbles','the Magnificent','Blobman','Trask','Pebbleton'];
const CURRENCY=['glorps','shmekels','blips','crons','flurbos','wobblers','quatloos','zonks','meep-meeps','bux'];
const HEADLINE_TMPL=[
'${F} ${L} denies existence of ${n}, citing "scheduling conflicts"',
'Local ${n} elected mayor of ${P} in landslide',
'Scientists confirm ${a} ${n} is "probably fine"',
'${P} bans ${n} after ${a} incident',
'Weather: ${a} ${n} expected through Thursday',
'Breaking: ${N} prices hit record high, ${C} in freefall',
'${F} ${L} marries own reflection; ceremony "beautiful," says mirror',
'Gravity recalled in ${P}; residents advised to hold something',
'Study: 9 out of 10 ${n} prefer ${a} ${n}',
'${P} celebrates ${A} ${N} Day with traditional screaming',
'Time travelers from Tuesday demand apology from Wednesday',
'The moon has filed for divorce from ${P}',
];
const PRODUCT_TMPL=['${A} ${N} 3000',"${F}'s ${A} ${N}",'The ${N}-O-Matic','${A} ${N} in a Can','i${N} Pro Max','${N} Buddy'];
const SLOGAN_TMPL=[
'Now with 40% more ${n}!',
'As seen on no other dimension!',
'Side effects may include ${a} ${n}.',
'Batteries not included. Soul not included.',
'Warning: may become ${a}.',
'Ask your doctor if ${n} is right for you.',
'Not legal in ${P}. Or ${P}.',
"If it screams, it's working!",
];
const SOAP_LINES=[
  ['You knew about the ${N} this whole time?','I AM the ${N}, ${F}.'],
  ['I only married you for your ${N}.','Then our love was ${A} after all.'],
  ['The test results came back. You are 40% ${N}.','That explains the ${N} incident.'],
  ['You can\'t keep ${A} ${N} a secret forever!','Watch me, ${F}. Watch me.'],
  ['Our child is... a ${N}?','On my side of the family, yes.'],
  ['I saw you at ${P}. With HIM.','That was my clone, I swear!'],
  ['You promised me the ${N} would never hatch!','Things change, ${F}. It hatched.'],
  ['I\'m leaving you for your alternate self.','But I AM my alternate self!'],
];
const INGREDIENTS=['moon butter','screaming carrots','compressed fog','pre-owned thunder','mild lava','whispered garlic','a single regret','pickled moonbeams','gravity (to taste)','fossilized applause','liquid Tuesdays','dehydrated oceans','freshly caught echoes','ethically sourced shadows','lukewarm starlight','grandmother\'s secret static'];
const PLANETS=['Xerblon-7','Meeps','The Beige Planet','Carbuncle Prime','Omicron Flarp','Squanch Minor','Zog','Planet Janet','Gleepus','The Oblong World','Nimbus Rex','Churnia'];
const WEATHER=['raining ${N}','${A} fog with pockets of screaming','light ${N} showers turning ${A} by dusk','sideways hail','temporal drizzle (yesterday expected today)','${A} ${N} storms','clear skies, 4000 degrees','aurora of pure ${N}','gentle snowfall of ${N}','wind gusts of ${A} ${N}','spontaneous levitation events','a 90% chance of ${N}'];
const CRITTER_ADJ=['six-legged','translucent','extremely round','backwards-flying','upside-down','perpetually startled','invisible-ish','screaming','polyhedral','smug'];
const CRITTER_NOUN=['snurb','flabbit','gromble','weepul','zank','moldwarp','skizzle','borf','quangle','thwomp','nib','ploo'];
const SPORTS=['Blernsball','Gromit Racing','Competitive Screaming','Zero-G Jai Alai','Moist Wrestling','Orb Golf','Extreme Waiting','Bureaucracy Ball','Turbo Chess Boxing','Lava Tag'];
const TEAMS=['${P} ${N}','${A} ${N}s','${P} Screamers','${N} United','${P} ${A}s','Real ${P}'];
const MOVIES=['${A} ${N}: The Movie','${N} Harder','Attack of the ${A} ${N}s','The ${N} Who ${A} Me','${N} Club','Sleepless in ${P}','The Fast and the ${A}','${N}-nado','My Dinner with ${F}','${N} Story 4: The ${A}tening','Guardians of the ${N}','The ${A}shank Redemption'];
const CARTOON=['${F} and the ${A} ${N}','Captain ${N}','The ${A} Hour','${N} Squad','Baby ${F}: Private Eye','${N} Force Go!','The Misadventures of ${F} ${L}','${N} Patrol'];
const TALKSHOW=['Late Night with ${F} ${L}','The ${F} Show','${N} Court','${F} After Dark','The ${A} Report','${N} Talk Live'];
const GAME_TMPL=['Who Wants to Eat a ${N}?','Wheel of ${N}','The ${A} Is Right','${N} Feud','Are You Smarter Than a ${N}?','Jeopardy: ${A} Edition'];
function p(a){return a[Math.floor(Math.random()*a.length)];}
function fill(t){return t.replace(/\$\{A\}/g,()=>p(ADJ)).replace(/\$\{N\}/g,()=>p(NOUN)).replace(/\$\{P\}/g,()=>p(PLACE)).replace(/\$\{F\}/g,()=>p(FIRST)).replace(/\$\{L\}/g,()=>p(LAST)).replace(/\$\{C\}/g,()=>p(CURRENCY)).replace(/\$\{a\}/g,()=>p(ADJ).toLowerCase()).replace(/\$\{n\}/g,()=>p(NOUN).toLowerCase()).replace(/\$\{p\}/g,()=>p(PLACE).toLowerCase());}

// make template p()/fill() deterministic during channel construction
let _rng = Math.random;
function setRng(f){ _rng = f; }
const _p = p; // alias built above (uses _rng at call time)

// ---------------- drawing helpers ----------------
function txt(g,s,x,y,size,color,align,font){g.fillStyle=color;g.font=`bold ${size}px ${font||'"Courier New",monospace'}`;g.textAlign=align||'left';g.textBaseline='middle';g.fillText(s,x,y);}
function wrap(g,s,x,y,maxW,lh,size,color,align){g.font=`bold ${size}px "Courier New",monospace`;g.textAlign=align||'left';g.textBaseline='top';g.fillStyle=color;const words=s.split(' ');let line='',yy=y;for(const w of words){const t=line?line+' '+w:w;if(g.measureText(t).width>maxW&&line){g.fillText(line,x,yy);yy+=lh;line=w;}else line=t;}g.fillText(line,x,yy);return yy+lh;}
function starfield(g,W,H,stars,t,drift){g.fillStyle='#fff';for(const s of stars){const x=(s.x+ (drift||0)*t*s.z)%1;g.globalAlpha=.3+.7*Math.abs(Math.sin(t*2+s.y*40));g.fillRect(x*W,s.y*H,2,2);}g.globalAlpha=1;}
function blob(g,x,y,r,r2,wob,t,color){g.fillStyle=color;g.beginPath();for(let a=0;a<=Math.PI*2+.1;a+=.35){const rr=r+(r2||0)*Math.sin(a*3+t*2+wob)+r*.06*Math.sin(a*7+t*3);const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr*.9;a===0?g.moveTo(px,py):g.lineTo(px,py);}g.closePath();g.fill();}
function person(g,x,y,s,shirt,talk,t){ // simple suited figure
  g.fillStyle='#f2c89b';g.beginPath();g.arc(x,y,s*.32,0,7);g.fill(); // head
  g.fillStyle=shirt;g.beginPath();g.moveTo(x-s*.55,y+s*.9);g.lineTo(x-s*.34,y+s*.1);g.lineTo(x+s*.34,y+s*.1);g.lineTo(x+s*.55,y+s*.9);g.closePath();g.fill();
  g.fillStyle='#c22';g.fillRect(x-s*.05,y+s*.15,s*.1,s*.45); // tie
  g.fillStyle='#111';g.beginPath();g.arc(x-s*.11,y-s*.05,s*.045,0,7);g.arc(x+s*.11,y-s*.05,s*.045,0,7);g.fill(); // eyes
  g.fillStyle='#311';const mh=talk? s*.06*Math.abs(Math.sin(t*11))+s*.02 : s*.02;g.fillRect(x-s*.1,y+s*.1,s*.2,mh); // mouth
}
function bars7(g,W,H,y0,h,colset){const cols=colset||['#f00','#f80','#ff0','#0c0','#0af','#33f','#909'];const bw=W/7;for(let i=0;i<7;i++){g.fillStyle=cols[i];g.fillRect(i*bw,y0,bw,h);}}

// ---------------- genres ----------------
const GENRES=[
{id:'infomercial',weight:3,
 title:()=>`${fill('${N}')} Shopping Network`,
 make(r){const g={product:fill(p(PRODUCT_TMPL)),slogan:fill(p(SLOGAN_TMPL)),price:`${r.i(3,999)}.${r.i(0,99)}0 ${p(CURRENCY).toUpperCase()}`,phone:'1-800-'+r.i(100,999)+'-'+fill('${N}').toUpperCase(),hue:r.i(0,359),buyNoun:fill('${N}').toUpperCase(),disc:fill('Operators are standing by (literally - chairs were recalled). Not responsible for spontaneous ${N}. Void where ${A}. Allow 6-8 eons for delivery.'),stars:Array.from({length:60},()=>({x:r.n(),y:r.n(),z:r.n()}))};return g;},
 draw(g,ctx,W,H,t){const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,`hsl(${g.hue},60%,14%)`);grd.addColorStop(1,`hsl(${(g.hue+60)%360},70%,30%)`);ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  starfield(ctx,W,H,g.stars,t,.02);
  // starburst
  ctx.save();ctx.translate(W/2,H*.42);ctx.rotate(t*.3);for(let i=0;i<16;i++){ctx.fillStyle=i%2?'rgba(255,255,255,.06)':'rgba(255,220,80,.08)';ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,H*.55,i*Math.PI/8,(i+1)*Math.PI/8);ctx.fill();}ctx.restore();
  const br=45+6*Math.sin(t*4);blob(ctx,W/2,H*.42,br,6,g.hue,t,'#eee');
  ctx.fillStyle=`hsl(${g.hue},70%,45%)`;ctx.beginPath();ctx.arc(W/2,H*.42,br*.55,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(W/2-br*.2,H*.42-br*.2,br*.15,0,7);ctx.fill();
  txt(ctx,g.product.toUpperCase(),W/2,26,26,'#ffe14d','center');
  txt(ctx,g.slogan,W/2,54,12,'#fff','center');
  ctx.fillStyle='#c00';ctx.fillRect(W*.2,H*.7,W*.6,44);txt(ctx,'ONLY '+g.price,W/2,H*.7+22,22,'#fff','center');
  txt(ctx,'CALL NOW: '+g.phone,W/2,H*.84,14,'#7ff','center');
  const off=(t*60)%(W*1.6);txt(ctx,g.disc,W-off+W*.3,H*.95,10,'#9ab');
  txt(ctx,'BUY '+g.buyNoun,W/2+Math.sin(t*9)*4,H*.62,16,Math.floor(t*3)%2?'#ff0':'#f60','center');},
 audio:'jingle'},

{id:'news',weight:2,
 title:()=>`${fill('${P}')} Action News`,
 make(r){const g={anchor:p(FIRST)+' '+p(LAST),net:'CH '+r.i(2,99)+' NEWS',heads:Array.from({length:4},()=>fill(p(HEADLINE_TMPL))),hue:r.i(180,260)};g.head=g.heads[0];return g;},
 draw(g,ctx,W,H,t){const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,`hsl(${g.hue},55%,10%)`);grd.addColorStop(1,`hsl(${g.hue},55%,22%)`);ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=.12;for(let i=0;i<5;i++){blob(ctx,W*(.15+i*.18),H*.3,50+i*10,10,i,t,`hsl(${(g.hue+40)%360},60%,40%)`);}ctx.globalAlpha=1;
  ctx.fillStyle='#0a1a2a';ctx.fillRect(0,H*.66,W,H*.34);
  person(ctx,W/2,H*.34,H*.34,'#223',true,t);
  ctx.fillStyle='#0d2b4d';ctx.fillRect(0,H*.6,W,H*.1);ctx.strokeStyle='#3af';ctx.strokeRect(0,H*.6,W,H*.1);
  txt(ctx,g.net,W*.04,H*.08,18,'#7df');
  txt(ctx,'LIVE',W*.9,H*.08,16,Math.floor(t*2)%2?'#f44':'#a22','center');
  txt(ctx,g.anchor.toUpperCase(),W*.04,H*.63,14,'#ffd');
  ctx.fillStyle='#b00';ctx.fillRect(W*.04,H*.7,86,20);txt(ctx,'BREAKING',W*.04+43,H*.7+10,11,'#fff','center');
  wrap(ctx,g.head,W*.04+100,H*.7+2,W*.9-100,15,13,'#fff');
  ctx.fillStyle='#02101e';ctx.fillRect(0,H*.88,W,H*.12);
  const tick=g.heads.join('   +++   ');const tw=ctx.measureText(tick).width||2000;const off=(t*70)%(tw+W);
  txt(ctx,tick,W-off,H*.94,13,'#8fd');},
 audio:'drone'},

{id:'cooking',weight:2,
 title:()=>`Cooking with ${p(FIRST)}`,
 make(r){const g={dish:`${p(ADJ)} ${p(NOUN)} à la ${p(FIRST)}`,ings:[...new Set(Array.from({length:5},()=>p(INGREDIENTS)))],steps:[`Pre-heat the void to ${r.i(3,999)} degrees`,`Fold in ${p(INGREDIENTS)} gently`,`Whisk until it stops screaming`,`Season with ${p(INGREDIENTS)}`,`Serve immediately or flee`],chef:p(FIRST)};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#2a2118';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#3a2e20';for(let y=0;y<H*.55;y+=34)for(let x=(y/34%2)*20;x<W;x+=40)ctx.fillRect(x,y,38,32);
  ctx.fillStyle='#1a1410';ctx.fillRect(0,H*.55,W,H*.45);
  person(ctx,W*.76,H*.42,H*.3,Math.floor(t*2)%2?'#7a3':'#a33',true,t);
  // stove + pot
  ctx.fillStyle='#111';ctx.fillRect(W*.08,H*.5,W*.4,H*.4);
  ctx.fillStyle='#444';ctx.fillRect(W*.12,H*.44,W*.3,H*.1);
  const glow=.5+.5*Math.sin(t*3);ctx.fillStyle=`rgba(255,${100+80*glow|0},30,${.5+.4*glow})`;ctx.fillRect(W*.14,H*.5,W*.26,8);
  ctx.fillStyle='#666';ctx.beginPath();ctx.ellipse(W*.27,H*.42,70,16,0,0,7);ctx.fill();
  // bubbles + steam
  for(let i=0;i<6;i++){const bx=W*.27-50+((i*37+t*40)%100),by=H*.42-((t*30+i*25)%60);ctx.globalAlpha=Math.max(0,.6-by/H);ctx.fillStyle='#cfc';ctx.beginPath();ctx.arc(bx,by-10,4+3*Math.sin(t*5+i),0,7);ctx.fill();}
  ctx.globalAlpha=1;
  txt(ctx,"TODAY'S DISH:",W*.05,H*.06,14,'#fb4');
  txt(ctx,g.dish,W*.05,H*.12,18,'#ffe');
  txt(ctx,'INGREDIENTS:',W*.05,H*.2,12,'#9c8');
  g.ings.forEach((s,i)=>txt(ctx,'- '+s,W*.06,H*.25+i*16,11,'#cdb'));
  const step=g.steps[Math.floor(t/3)%g.steps.length];
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,H*.9,W,H*.1);
  txt(ctx,'STEP '+(Math.floor(t/3)%g.steps.length+1)+': '+step,W/2,H*.95,13,'#ffd','center');},
 audio:'simmer'},

{id:'weather',weight:2,
 title:()=>`${p(ADJ)} Weather Multiverse`,
 make(r){const g={planets:Array.from({length:3},()=>({name:p(PLANETS),cond:fill(p(WEATHER)),temp:r.i(-900,9000)})),main:fill(p(WEATHER))};return g;},
 draw(g,ctx,W,H,t){const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#061a33');grd.addColorStop(1,'#0a3355');ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  txt(ctx,'MULTIVERSE WEATHER',W/2,26,22,'#adf','center');
  // planet + map
  const px=W*.3,py=H*.5;
  const pg=ctx.createRadialGradient(px-20,py-20,10,px,py,110);pg.addColorStop(0,'#4af');pg.addColorStop(1,'#124');ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,100,0,7);ctx.fill();
  ctx.globalAlpha=.25;blob(ctx,px+30*Math.sin(t*.4),py-10,40,10,2,t,'#fff');blob(ctx,px-40,py+30+10*Math.sin(t*.6),30,8,4,t,'#fff');ctx.globalAlpha=1;
  // precipitation
  ctx.fillStyle='#9df';for(let i=0;i<50;i++){const rx=(i*53+t*90)%W,ry=(i*37+t*140)%H;ctx.globalAlpha=.5;ctx.fillRect(rx,ry,2,6);}ctx.globalAlpha=1;
  g.planets.forEach((pl,i)=>{const y=H*.28+i*70;
    ctx.fillStyle='rgba(0,20,40,.7)';ctx.fillRect(W*.55,y,W*.4,56);
    txt(ctx,pl.name.toUpperCase(),W*.57,y+14,14,'#8fd');
    txt(ctx,pl.cond,W*.57,y+32,11,'#cde');
    txt(ctx,pl.temp+'°',W*.9,y+28,22,pl.temp>1000?'#f84':pl.temp<0?'#8df':'#ff8','center');});
  ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,H*.92,W,H*.08);
  txt(ctx,'TODAY: '+g.main,W/2,H*.96,12,'#ffd','center');},
 audio:'wind'},

{id:'nature',weight:2,
 title:()=>`Wild ${p(PLANETS)}`,
 make(r){const g={planet:p(PLANETS),critter:`${p(CRITTER_ADJ)} ${p(CRITTER_NOUN)}`,legs:r.i(2,10),hue:r.i(0,359),eyes:r.i(1,7),
   narr:[`Here on ${p(PLANETS)}, the ${p(CRITTER_ADJ)} ${p(CRITTER_NOUN)} begins its daily scream.`,`It can smell ${p(NOUN).toLowerCase()} from 4 dimensions away.`,`Astonishing. It has evolved ${r.i(2,40)} knees and uses none of them.`,`It mates for life. Its life is 45 minutes.`,`The ${p(CRITTER_NOUN)} is nature's little ${p(NOUN).toLowerCase()}.`]};return g;},
 draw(g,ctx,W,H,t){const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,`hsl(${g.hue},40%,12%)`);grd.addColorStop(1,`hsl(${(g.hue+30)%360},45%,26%)`);ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  for(let l=0;l<3;l++){ctx.fillStyle=`hsla(${g.hue},30%,${18+l*8}%,1)`;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=20)ctx.lineTo(x,H*.55+l*40+18*Math.sin(x*.01+l*9+t*.05*(l+1)));ctx.lineTo(W,H);ctx.fill();}
  const cx=W*.2+((t*30)%(W*.6)),cy=H*.62+6*Math.abs(Math.sin(t*6));
  // legs
  ctx.strokeStyle=`hsl(${g.hue},60%,30%)`;ctx.lineWidth=3;
  for(let i=0;i<g.legs;i++){const a=Math.PI*(.25+.5*i/Math.max(1,g.legs-1));const lx=cx+Math.cos(a)*26,ly=cy+Math.sin(a)*10;ctx.beginPath();ctx.moveTo(lx,cy);ctx.lineTo(lx+6*Math.sin(t*8+i),ly+18);ctx.stroke();}
  blob(ctx,cx,cy,30,5,1,t,`hsl(${g.hue},60%,45%)`);
  for(let i=0;i<g.eyes;i++){const ex=cx-14+i*(28/Math.max(1,g.eyes-1));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ex,cy-10,5,0,7);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(ex+1,cy-10+2*Math.sin(t*3),2.4,0,7);ctx.fill();}
  txt(ctx,'PLANET '+g.planet.toUpperCase(),W*.04,H*.07,16,'#efe');
  txt(ctx,'the '+g.critter,W*.04,H*.13,13,'#9c8');
  const line=g.narr[Math.floor(t/4)%g.narr.length];
  ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(0,H*.88,W,H*.12);
  wrap(ctx,'"'+line+'"',W*.06,H*.9,W*.88,15,12,'#ffd');},
 audio:'chirp'},

{id:'soap',weight:2,
 title:()=>`The ${p(ADJ)} and the ${p(NOUN)}`,
 make(r){const pair=p(SOAP_LINES);const g={a:p(FIRST),b:p(FIRST),lines:[fill(pair[0]),fill(pair[1]),fill(p(SOAP_LINES)[0]),fill(p(SOAP_LINES)[1])],h1:r.i(0,359),h2:r.i(0,359)};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#241c26';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#31253a';ctx.fillRect(0,H*.7,W,H*.3);
  ctx.fillStyle='#152030';ctx.fillRect(W*.4,H*.1,W*.2,H*.35);ctx.strokeStyle='#567';ctx.strokeRect(W*.4,H*.1,W*.2,H*.35); // window
  ctx.fillStyle='#553';ctx.fillRect(W*.3,H*.5,W*.4,H*.22);ctx.fillStyle='#665';ctx.fillRect(W*.3,H*.46,W*.4,H*.06); // couch
  const zoom=1+.04*Math.sin(t*1.5);ctx.save();ctx.translate(W/2,H/2);ctx.scale(zoom,zoom);ctx.translate(-W/2,-H/2);
  const talking=Math.floor(t/3)%2;
  const bounce=(i)=>i===talking?4*Math.abs(Math.sin(t*7)):0;
  blob(ctx,W*.25,H*.52-bounce(0),46,6,0,t,`hsl(${g.h1},55%,55%)`);
  blob(ctx,W*.75,H*.52-bounce(1),46,6,2,t,`hsl(${g.h2},55%,55%)`);
  [[W*.25,-1],[W*.75,1]].forEach(([x,d])=>{ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x+d*14,H*.5,4,0,7);ctx.arc(x+d*30,H*.5,4,0,7);ctx.fill();
    ctx.fillStyle='#311';ctx.fillRect(x+d*12,H*.58,22,talking===(d<0?0:1)?6*Math.abs(Math.sin(t*11))+2:2);});
  ctx.restore();
  txt(ctx,'THE '+g.a.toUpperCase()+' SAGA',W*.04,H*.06,14,'#d9b');
  const li=Math.floor(t/3)%g.lines.length;const who=li%2?g.b:g.a;
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.84,W,H*.16);
  txt(ctx,who+':',W*.06,H*.89,12,'#9bd');
  wrap(ctx,g.lines[li],W*.06,H*.92,W*.88,15,13,'#fff');},
 audio:'pad'},

{id:'music',weight:2,
 title:()=>'Multiverse FM '+(88+Math.floor(_rng()*40)+_rng()*0.9).toFixed(1),
 make(r){const g={song:`${p(ADJ)} ${p(NOUN)} (feat. ${p(FIRST)})`,artist:p(FIRST)+' '+p(LAST),genre:p(['GLORPSTEP','VOID COUNTRY','SCHWIFTY POLKA','ACID JUG BAND','MOISTWAVE','CRON ROCK','BLIP HOP']),hue:r.i(0,359)};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#050510';ctx.fillRect(0,0,W,H);
  const N=48;for(let i=0;i<N;i++){const h=(H*.3)*Math.abs(Math.sin(t*3+i*.7))*(0.4+.6*Math.abs(Math.sin(t*.9+i)));ctx.fillStyle=`hsl(${(g.hue+i*6)%360},80%,55%)`;ctx.fillRect(20+i*(W-40)/N,H*.65-h,(W-40)/N-3,h);}
  ctx.save();ctx.translate(W/2,H*.3);ctx.rotate(t*.8);for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.strokeStyle=`hsl(${(g.hue+180)%360},70%,60%)`;ctx.lineWidth=2;ctx.strokeRect(20+8*Math.sin(t*2+i),20,40,40);}ctx.restore();
  txt(ctx,'MULTIVERSE FM',W/2,H*.08,20,'#f8f','center');
  txt(ctx,'NOW PLAYING',W/2,H*.78,11,'#9af','center');
  txt(ctx,g.song,W/2,H*.84,16,'#fff','center');
  txt(ctx,g.artist.toUpperCase()+'  -  '+g.genre,W/2,H*.9,12,'#8fd','center');},
 audio:'synth'},

{id:'sports',weight:2,
 title:()=>`${p(SPORTS)} Tonight`,
 make(r){const g={sport:p(SPORTS),tA:fill(p(TEAMS)),tB:fill(p(TEAMS)),sA:r.i(0,30),sB:r.i(0,30),nA:r.i(5,10)};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#143d16';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=2;ctx.strokeRect(20,20,W-40,H-40);ctx.beginPath();ctx.moveTo(W/2,20);ctx.lineTo(W/2,H-20);ctx.stroke();ctx.beginPath();ctx.arc(W/2,H/2,50,0,7);ctx.stroke();
  const bx=W/2+W*.4*Math.sin(t*1.7)*Math.cos(t*.9),by=H/2+H*.35*Math.sin(t*2.3);
  for(let i=0;i<g.nA;i++){const px=W/2+Math.sin(t*(0.5+i*.13)+i*2)*W*.42,py=H/2+Math.cos(t*(0.4+i*.17)+i*3)*H*.4;
    ctx.fillStyle=i%2?'#36c':'#c33';ctx.beginPath();ctx.arc(px+(bx-px)*.2*Math.abs(Math.sin(t+i)),py+(by-py)*.2*Math.abs(Math.cos(t*.7+i)),6,0,7);ctx.fill();}
  ctx.fillStyle='#ff0';ctx.beginPath();ctx.arc(bx,by,5+2*Math.abs(Math.sin(t*9)),0,7);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(W*.04,H*.04,W*.5,40);
  txt(ctx,g.tA.toUpperCase()+' '+g.sA,W*.06,H*.1,15,'#fff');
  txt(ctx,g.tB.toUpperCase()+' '+g.sB,W*.06,H*.16,15,'#fff');
  txt(ctx,'LIVE',W*.9,H*.08,15,Math.floor(t*2)%2?'#f44':'#822','center');
  txt(ctx,g.sport.toUpperCase()+' - Q'+(1+Math.floor(t/20)%4),W*.9,H*.16,11,'#ffd','center');
  ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,H*.92,W,H*.08);
  txt(ctx,'Final score decided by judges, combat, and vibes',W/2,H*.96,11,'#9c9','center');},
 audio:'crowd'},

{id:'test',weight:1,
 title:()=>'Technical Difficulties',
 make(r){return {msg:fill(p(['DIMENSION DRIFT IN PROGRESS','SIGNAL LOST BETWEEN FOLDS OF REALITY','THE INTERN WITH THE ANTENNA IS ON BREAK','BROADCAST INTERRUPTED BY SENTIENT ${N}','PLEASE STAND BY. FOREVER, IF NEEDED.']))};},
 draw(g,ctx,W,H,t){bars7(ctx,W,H*.7,0,H*.7);
  ctx.fillStyle='#111';ctx.fillRect(0,H*.7,W,H*.3);
  const wob=3*Math.sin(t*30);
  ctx.save();ctx.translate(wob,0);
  ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(W/2,H*.35,80,0,7);ctx.stroke();ctx.beginPath();ctx.arc(W/2,H*.35,55,0,7);ctx.stroke();
  ctx.beginPath();ctx.moveTo(W/2-80,H*.35);ctx.lineTo(W/2+80,H*.35);ctx.moveTo(W/2,H*.35-80);ctx.lineTo(W/2,H*.35+80);ctx.stroke();
  ctx.restore();
  txt(ctx,'PLEASE STAND BY',W/2,H*.78,20,'#fff','center');
  txt(ctx,g.msg,W/2,H*.86,12,'#aaa','center');
  if(Math.floor(t*2)%3===0){ctx.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<8;i++)ctx.fillRect(0,Math.random()*H,W,2);}},
 audio:'tone'},

{id:'trailer',weight:2,
 title:()=>fill('Coming Soon: '+p(MOVIES)),
 make(r){const mv=fill(p(MOVIES));const g={movie:mv,cards:['IN A DIMENSION...',fill('WHERE ${A} ${N} IS LAW'),fill('ONE '+p(FIRST).toUpperCase()),'WILL FIND','THE COURAGE','TO EAT',fill('EVERY LAST ${N}').toUpperCase(),mv.toUpperCase(),'RATED S FOR SCHLEEM']};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=.15;for(let i=0;i<3;i++){const l=ctx.createLinearGradient(0,0,W,0);l.addColorStop(0,'transparent');l.addColorStop(.5,'#036');l.addColorStop(1,'transparent');ctx.fillStyle=l;ctx.fillRect(0,(t*40+i*170)%H,W,3);}ctx.globalAlpha=1;
  const ci=Math.floor(t/2.5)%g.cards.length;const ph=(t%2.5)/2.5;
  ctx.save();ctx.translate(W/2,H/2);const sc=.9+.25*ph;ctx.scale(sc,sc);ctx.globalAlpha=Math.min(1,ph*6)*(ph>.85?(1-ph)/.15:1);
  txt(ctx,g.cards[ci],0,0,ci===g.cards.length-2?30:22,ci===g.cards.length-2?'#ffd24d':'#cfe8ff','center');
  ctx.restore();ctx.globalAlpha=1;
  const v=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.8)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  if(ci===g.cards.length-1)txt(ctx,'COMING SOMETIME. SOMEWHERE.',W/2,H*.85,12,'#89a','center');},
 audio:'braam'},

{id:'cartoon',weight:2,
 title:()=>fill(p(CARTOON)),
 make(r){const g={name:fill(p(CARTOON)),hue:r.i(0,359),word:p(['SKREE!','BLOOP!','WARK!','MEEP!','ZOINK!','FLARP!','HONK!'])};return g;},
 draw(g,ctx,W,H,t){const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,`hsl(${g.hue},70%,70%)`);grd.addColorStop(1,`hsl(${(g.hue+40)%360},70%,80%)`);ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#fff';for(let i=0;i<4;i++){const cx=(i*200+t*20)%(W+100)-50;blob(ctx,cx,60+i*20,34,6,i,0,'rgba(255,255,255,.9)');}
  ctx.fillStyle=`hsl(${(g.hue+120)%360},60%,45%)`;ctx.fillRect(0,H*.78,W,H*.22);
  const cx=W*.15+((t*55)%(W*.75)),cy=H*.68-40*Math.abs(Math.sin(t*5));
  ctx.fillStyle=`hsl(${(g.hue+200)%360},80%,55%)`;ctx.beginPath();ctx.arc(cx,cy,34,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx-12,cy-8,10,0,7);ctx.arc(cx+12,cy-8,10,0,7);ctx.fill();
  ctx.fillStyle='#000';ctx.beginPath();ctx.arc(cx-10,cy-8,4,0,7);ctx.arc(cx+14,cy-8,4,0,7);ctx.fill();
  ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy+10,10,.2,Math.PI-.2);ctx.stroke();
  if(Math.floor(t/2)%2===0){ctx.fillStyle='#fff';ctx.strokeStyle='#000';const bw=90,bh=30;ctx.beginPath();ctx.roundRect(cx+30,cy-80,bw,bh,10);ctx.fill();ctx.stroke();txt(ctx,g.word,cx+30+bw/2,cy-80+bh/2,14,'#000','center');}
  txt(ctx,g.name,W*.04,H*.08,18,'#fff');ctx.globalAlpha=.9;txt(ctx,'TV-Y7 (probably)',W*.04,H*.15,11,'#357');ctx.globalAlpha=1;},
 audio:'toon'},

{id:'talkshow',weight:2,
 title:()=>fill(p(TALKSHOW)),
 make(r){const g={show:fill(p(TALKSHOW)),host:p(FIRST)+' '+p(LAST),topic:fill(p(HEADLINE_TMPL))};return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#0a0a18';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#101030';ctx.fillRect(W*.1,H*.12,W*.5,H*.4);
  for(let i=0;i<12;i++){const bh=20+((i*37)%60);ctx.fillStyle=`hsl(${230+i*5},40%,${15+(i%4)*6}%)`;ctx.fillRect(W*.11+i*(W*.48/12),H*.52-bh,W*.48/12-2,bh);}
  ctx.fillStyle='#3a2c1a';ctx.fillRect(W*.12,H*.62,W*.56,H*.1);ctx.fillRect(W*.12,H*.72,W*.56,H*.2);
  person(ctx,W*.24,H*.5,H*.22,'#333',true,t);
  person(ctx,W*.56,H*.52,H*.2,'#636',Math.floor(t*2)%2===0,t+1);
  if(Math.floor(t/4)%3===1){ctx.fillStyle='#fa0';ctx.fillRect(W*.72,H*.2,120,34);txt(ctx,'APPLAUSE',W*.72+60,H*.2+17,15,'#000','center');}
  txt(ctx,g.show.toUpperCase(),W*.05,H*.07,16,'#fd7');
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.9,W,H*.1);
  txt(ctx,'TONIGHT: '+g.topic,W/2,H*.95,11,'#cde','center');},
 audio:'murmur'},

{id:'gameshow',weight:1,
 title:()=>fill(p(GAME_TMPL)),
 make(r){const g={name:fill(p(GAME_TMPL)),players:[p(FIRST),p(FIRST),p(FIRST)],scores:[0,0,0],cat:fill('${A} ${N}')};g.scores=[r.i(0,900),r.i(0,900),r.i(0,900)];return g;},
 draw(g,ctx,W,H,t){ctx.fillStyle='#0a1030';ctx.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){ctx.fillStyle=`hsl(${(t*60+i*40)%360},80%,60%)`;ctx.globalAlpha=.4+.4*Math.sin(t*4+i);ctx.beginPath();ctx.arc(W*.5+220*Math.cos(i*.63),H*.3+130*Math.sin(i*.63),4,0,7);ctx.fill();}ctx.globalAlpha=1;
  // wheel
  ctx.save();ctx.translate(W/2,H*.32);ctx.rotate(t*(Math.floor(t/5)%2?0.1:2));for(let i=0;i<12;i++){ctx.fillStyle=`hsl(${i*30},70%,50%)`;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,90,i*Math.PI/6,(i+1)*Math.PI/6);ctx.fill();}ctx.restore();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H*.32,16,0,7);ctx.fill();
  txt(ctx,g.name.toUpperCase(),W/2,H*.07,20,'#ffd24d','center');
  g.players.forEach((nm,i)=>{const x=W*(0.2+i*.3);ctx.fillStyle='#123';ctx.fillRect(x-70,H*.6,140,70);ctx.strokeStyle='#4af';ctx.strokeRect(x-70,H*.6,140,70);
    person(ctx,x,H*.56,H*.16,'#345',false,t);
    txt(ctx,nm.toUpperCase(),x,H*.65,12,'#8fd','center');
    const sc=g.scores[i]+Math.floor(t*7*(i+1))%97;txt(ctx,String(sc),x,H*.72,18,'#ffd','center');});
  txt(ctx,"TODAY'S CATEGORY: "+g.cat.toUpperCase(),W/2,H*.9,13,'#fff','center');},
 audio:'jingle'},
];

// ---------------- audio engine ----------------
const AE={
  ctx:null,master:null,noiseBuf:null,current:null,muted:false,vol:.8,power:true,
  ensure(){
    if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=0;this.master.connect(this.ctx.destination);
      const len=this.ctx.sampleRate*2;this.noiseBuf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);
      const d=this.noiseBuf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;}
    if(this.ctx.state==='suspended')this.ctx.resume();this.applyGain();
  },
  applyGain(){if(this.master)this.master.gain.linearRampToValueAtTime(this.muted||!this.power?0:this.vol*.5,this.ctx.currentTime+.1);},
  stop(){if(this.current){try{this.current.stop();}catch(e){}this.current=null;}},
  play(kind,seedRng){
    this.ensure();if(!this.ctx)return;this.stop();
    const c=this.ctx,out=this.master,handles={nodes:[],timers:[],stop(){this.nodes.forEach(n=>{try{n.stop&&n.stop();}catch(e){}try{n.disconnect();}catch(e){}});this.timers.forEach(t=>clearInterval(t));}};
    const R2=seedRng||Math.random;
    const g0=v=>{const g=c.createGain();g.gain.value=v;g.connect(out);handles.nodes.push(g);return g;};
    const osc=(type,f,g)=>{const o=c.createOscillator();o.type=type;o.frequency.value=f;o.connect(g);o.start();handles.nodes.push(o);return o;};
    const noise=(ftype,f,g)=>{const s=c.createBufferSource();s.buffer=this.noiseBuf;s.loop=true;const fl=c.createBiquadFilter();fl.type=ftype;fl.frequency.value=f;s.connect(fl);fl.connect(g);s.start();handles.nodes.push(s);return {src:s,filt:fl};};
    const plip=(f,dur,type,vol)=>{const g=c.createGain();g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);g.connect(out);const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f,c.currentTime);o.connect(g);o.start();o.stop(c.currentTime+dur+.02);};
    const seq=(notes,type,ms,vol,oct)=>{let i=0;const g=g0(vol);const id=setInterval(()=>{const n=notes[i++%notes.length];if(n>0){const o=c.createOscillator();o.type=type;o.frequency.value=n*(oct||1);const gg=c.createGain();gg.gain.setValueAtTime(.9,c.currentTime);gg.gain.exponentialRampToValueAtTime(.001,c.currentTime+ms/1000*.95);o.connect(gg);gg.connect(g);o.start();o.stop(c.currentTime+ms/1000);}},ms);handles.timers.push(id);};
    const MAJ=[262,294,330,392,440,523,587,659],MIN=[220,262,294,330,349,392,440,523];
    switch(kind){
      case 'jingle':seq([...MAJ].sort(()=>R2()-.5),'square',140,.12);seq([131,131,165,131],'triangle',560,.2);break;
      case 'drone':{const g=g0(.06);osc('sawtooth',55,g);osc('sawtooth',55.7,g);const lfo=c.createOscillator();lfo.frequency.value=.1;const lg=c.createGain();lg.gain.value=.03;lfo.connect(lg);lg.connect(g.gain);lfo.start();handles.nodes.push(lfo);handles.timers.push(setInterval(()=>plip(880+400*R2(),.15,'sine',.05),2600));break;}
      case 'simmer':{const n=noise('lowpass',380,g0(.08));handles.timers.push(setInterval(()=>{n.filt.frequency.value=300+150*R2();if(R2()<.5)plip(300+500*R2(),.08,'sine',.06);},300));break;}
      case 'wind':{const n=noise('bandpass',500,g0(.09));handles.timers.push(setInterval(()=>{n.filt.frequency.linearRampToValueAtTime(200+700*R2(),c.currentTime+1.2);},1200));break;}
      case 'chirp':{noise('highpass',5000,g0(.015));handles.timers.push(setInterval(()=>{if(R2()<.7){const f=1200+1500*R2();plip(f,.12,'sine',.07);setTimeout(()=>plip(f*1.3,.1,'sine',.05),120);}},700));break;}
      case 'pad':{const chords=[[220,262,330],[175,220,262],[196,247,294],[165,208,247]];let i=0;const g=g0(.1);const os=chords[0].map(f=>osc('triangle',f,g));handles.timers.push(setInterval(()=>{i=(i+1)%chords.length;os.forEach((o,j)=>o.frequency.linearRampToValueAtTime(chords[i][j],c.currentTime+1.5));},4000));break;}
      case 'synth':{seq([...MIN].sort(()=>R2()-.5),'sawtooth',115,.09);seq([110,110,131,110,98,110],'square',230,.14,.5);const n=noise('highpass',6000,g0(.02));break;}
      case 'crowd':{const n=noise('bandpass',800,g0(.05));handles.timers.push(setInterval(()=>{const gv=n.filt.gain;},900));handles.timers.push(setInterval(()=>{if(R2()<.25)plip(2200,.3,'sine',.08);},4000));break;}
      case 'tone':{const g=g0(.06);osc('sine',1000,g);break;}
      case 'braam':{const g=g0(.12);osc('sawtooth',55,g);osc('sawtooth',58.3,g);osc('sine',27.5,g0(.15));handles.timers.push(setInterval(()=>{g.gain.cancelScheduledValues(c.currentTime);g.gain.setValueAtTime(.02,c.currentTime);g.gain.linearRampToValueAtTime(.18,c.currentTime+.4);g.gain.linearRampToValueAtTime(.03,c.currentTime+2.2);},2400));break;}
      case 'toon':seq([523,659,784,659,880,784,1047,880].map((f,i)=>i%3?f:f/2),'square',170,.1);break;
      case 'murmur':{noise('lowpass',300,g0(.05));handles.timers.push(setInterval(()=>{if(R2()<.6)plip(180+220*R2(),.15+ .1*R2(),'sine',.05);},450));break;}
    }
    this.current=handles;this.applyGain();
  },
  staticBurst(){this.ensure();if(!this.ctx)return;this.stop();
    const c=this.ctx,g=c.createGain();g.gain.value=.12;g.connect(this.master);
    const s=c.createBufferSource();s.buffer=this.noiseBuf;s.loop=true;const f=c.createBiquadFilter();f.type='highpass';f.frequency.value=300;s.connect(f);f.connect(g);s.start();
    this.current={stop(){try{s.stop();}catch(e){}try{g.disconnect();}catch(e){}}};this.applyGain();}
};

// ---------------- channel factory ----------------
const CHPOOL=[];GENRES.forEach(g=>{for(let i=0;i<g.weight;i++)CHPOOL.push(g);});
const chCache=new Map();
function makeChannel(num){
  if(chCache.has(num))return chCache.get(num);
  const r=new R(hashStr('channel:'+num));setRng(r.f);
  const genre=r.pick(CHPOOL);
  const title=genre.title();
  const st=genre.make(r);
  st.kind=genre.id;st.titleText=title;st.num=num;st.audio=genre.audio;
  st.dim='DIM-'+r.i(1,999)+String.fromCharCode(65+r.i(0,25));
  if(chCache.size>80)chCache.delete(chCache.keys().next().value);
  chCache.set(num,st);return st;
}

// ---------------- TV controller ----------------
const canvas=document.getElementById('screen'),ctx=canvas.getContext('2d');
const osdEl=document.getElementById('osd'),bannerEl=document.getElementById('banner'),guideEl=document.getElementById('guide'),ledEl=document.getElementById('led');
const W=canvas.width,H=canvas.height;
// pre-render static frames
const staticFrames=[];
for(let i=0;i<4;i++){const c=document.createElement('canvas');c.width=160;c.height=120;const g2=c.getContext('2d');const im=g2.createImageData(160,120);for(let j=0;j<im.data.length;j+=4){const v=Math.random()*255|0;im.data[j]=im.data[j+1]=im.data[j+2]=v;im.data[j+3]=255;}g2.putImageData(im,0,0);staticFrames.push(c);}

const TV={
  ch:101,last:101,on:true,surf:false,surfTimer:null,cur:null,t0:0,inStatic:false,staticUntil:0,
  osdTimer:null,bannerTimer:null,pending:'',pendingTimer:null,
  boot(){this.staticPhase(1200);setTimeout(()=>this.flip(101),1200);this.loop();},
  staticPhase(ms){this.inStatic=true;this.staticUntil=performance.now()+ms;AE.staticBurst();},
  flip(num){
    if(!this.on)return;
    num=Math.max(1,Math.min(9999,num));
    this.last=this.ch;this.ch=num;
    this.staticPhase(280+Math.random()*380);
    setTimeout(()=>{
      if(!this.on)return;
      this.inStatic=false;
      this.cur=makeChannel(num);
      this.t0=performance.now();
      AE.play(this.cur.audio,mulberry32(hashStr('a'+num)));
      this.showOSD();this.showBanner();this.renderGuide();
    },300+Math.random()*380);
  },
  showOSD(extra){
    const c=this.cur;
    osdEl.querySelector('.ch').textContent='CH '+this.ch+(extra||'');
    osdEl.querySelector('.title').textContent=c?c.titleText:'';
    osdEl.querySelector('.meta').textContent=c?(c.dim+'  -  '+c.kind.toUpperCase()+'  -  ALL DAY, EVERY DAY'):'';
    osdEl.classList.add('show');clearTimeout(this.osdTimer);
    this.osdTimer=setTimeout(()=>osdEl.classList.remove('show'),2800);
  },
  showBanner(){
    const c=this.cur;if(!c)return;
    bannerEl.querySelector('.t').textContent='NOW: '+c.titleText;
    bannerEl.querySelector('.d').textContent='Broadcasting live from '+c.dim+' - next: something else entirely';
    bannerEl.classList.add('show');clearTimeout(this.bannerTimer);
    this.bannerTimer=setTimeout(()=>bannerEl.classList.remove('show'),4200);
  },
  renderGuide(){
    let rows='';const now=new Date();
    for(let i=-2;i<=6;i++){const n=this.ch+i;const c=makeChannel(n);
      const tm=new Date(now.getTime()+i*30*60000);
      rows+=`<tr class="${i===0?'cur':''}"><td class="c">CH ${n}</td><td class="tm">${tm.getHours().toString().padStart(2,'0')}:${tm.getMinutes().toString().padStart(2,'0')}</td><td>${c.titleText}</td><td>${c.dim}</td></tr>`;}
    guideEl.querySelector('table').innerHTML=rows;
  },
  toggleGuide(){guideEl.classList.toggle('show');if(guideEl.classList.contains('show'))this.renderGuide();},
  toggleSurf(){
    this.surf=!this.surf;
    clearInterval(this.surfTimer);
    if(this.surf)this.surfTimer=setInterval(()=>{this.flip(this.ch+1+Math.floor(Math.random()*47));},7000);
    this.flashMsg(this.surf?'SURF MODE: ON':'SURF MODE: OFF');
  },
  flashMsg(m){osdEl.querySelector('.ch').textContent=m;osdEl.querySelector('.title').textContent='';osdEl.querySelector('.meta').textContent='';osdEl.classList.add('show');clearTimeout(this.osdTimer);this.osdTimer=setTimeout(()=>osdEl.classList.remove('show'),1200);},
  power(){
    this.on=!this.on;ledEl.classList.toggle('on',this.on);AE.power=this.on;AE.applyGain();
    if(!this.on){clearInterval(this.surfTimer);this.surf=false;AE.stop();ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);}
    else{this.flip(this.ch);}
  },
  typeDigit(d){
    if(!this.on)return;
    this.pending+=d;if(this.pending.length>4)this.pending=this.pending.slice(1);
    this.showOSD(' '+this.pending+'_');
    clearTimeout(this.pendingTimer);
    this.pendingTimer=setTimeout(()=>{if(this.pending){const n=parseInt(this.pending,10);this.pending='';if(n>0)this.flip(n);}},1100);
  },
  vol(d){AE.ensure();AE.vol=Math.max(0,Math.min(1,AE.vol+d));AE.muted=false;AE.applyGain();this.flashMsg('VOLUME '+Math.round(AE.vol*10));},
  loop(){
    requestAnimationFrame(()=>this.loop());
    if(!this.on)return;
    if(this.inStatic){
      const f=staticFrames[Math.random()*4|0];
      ctx.imageSmoothingEnabled=false;ctx.drawImage(f,0,0,W,H);
      if(Math.random()<.3){ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(0,Math.random()*H,W,2);}
      if(performance.now()>this.staticUntil&&!this._armed){this._armed=true;}
      return;
    }
    if(!this.cur)return;
    const t=(performance.now()-this.t0)/1000;
    try{this.cur.kind&&GENRES.find(g=>g.id===this.cur.kind).draw(this.cur,ctx,W,H,t);}catch(e){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);txt(ctx,'SIGNAL ERROR',W/2,H/2,20,'#f66','center');}
  }
};
function key(k){
  AE.ensure();
  switch(k){
    case 'chup':TV.flip(TV.ch+1);break;
    case 'chdn':TV.flip(TV.ch-1);break;
    case 'random':TV.flip(1+Math.floor(Math.random()*9999));break;
    case 'back':TV.flip(TV.last);break;
    case 'volup':TV.vol(.1);break;
    case 'voldn':TV.vol(-.1);break;
    case 'mute':AE.muted=!AE.muted;AE.applyGain();TV.flashMsg(AE.muted?'MUTED':'SOUND ON');break;
    case 'guide':TV.toggleGuide();break;
    case 'surf':TV.toggleSurf();break;
    case 'power':TV.power();break;
    default:if(/^[0-9]$/.test(k))TV.typeDigit(k);
  }
}
document.getElementById('remote').addEventListener('click',e=>{const b=e.target.closest('button');if(b)key(b.dataset.k);});
document.addEventListener('keydown',e=>{
  if(e.key>='0'&&e.key<='9')key(e.key);
  else if(e.key==='ArrowUp'){key('chup');e.preventDefault();}
  else if(e.key==='ArrowDown'){key('chdn');e.preventDefault();}
  else if(e.key==='ArrowRight')key('volup');
  else if(e.key==='ArrowLeft')key('voldn');
  else if(e.key==='g'||e.key==='G')key('guide');
  else if(e.key==='s'||e.key==='S')key('surf');
  else if(e.key==='m'||e.key==='M')key('mute');
  else if(e.key==='p'||e.key==='P')key('power');
  else if(e.key==='Enter'&&TV.pending){const n=parseInt(TV.pending,10);TV.pending='';if(n>0)TV.flip(n);}
});
document.addEventListener('click',()=>AE.ensure(),{once:true});
TV.boot();
