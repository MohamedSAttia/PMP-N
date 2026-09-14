/* ============================================================
   مخططات الأسئلة — SVG مولّدة، مطابقة لما يصفه شرح كل سؤال
   ============================================================ */
window.QFIG = (function(){
'use strict';
const N='#103040', S='#70C0E0', G='#2fa87a', O='#F07000', R='#c0392b',
      L='#d8e3ea', M='#6b8090';

function frame(w,h,title,body,xl,yl){
  return `<svg viewBox="0 0 ${w} ${h}" class="qfig-s" role="img"
    aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#fff" rx="8"/>
    <text x="${w/2}" y="22" font-size="13" font-weight="600" fill="${N}"
      text-anchor="middle" font-family="sans-serif">${title}</text>
    ${body}
    ${yl?`<text x="14" y="${h/2}" font-size="10" fill="${M}" text-anchor="middle"
      font-family="sans-serif" transform="rotate(-90 14 ${h/2})">${yl}</text>`:''}
    ${xl?`<text x="${w/2}" y="${h-5}" font-size="10" fill="${M}" text-anchor="middle"
      font-family="sans-serif">${xl}</text>`:''}
  </svg>`;
}
function grid(x0,y0,w,h,ymax,steps,xn,xlab){
  let g='';
  for(let i=0;i<=steps;i++){
    const y=y0+h-(i/steps)*h, v=Math.round(ymax*i/steps);
    g+=`<line x1="${x0}" y1="${y}" x2="${x0+w}" y2="${y}" stroke="${L}" stroke-width="1"/>
        <text x="${x0-6}" y="${y+3.5}" font-size="9" fill="${M}" text-anchor="end"
          font-family="sans-serif">${v}</text>`;
  }
  for(let i=0;i<xn;i++){
    const x=x0+(i/(xn-1))*w;
    g+=`<text x="${x}" y="${y0+h+14}" font-size="9" fill="${M}" text-anchor="middle"
      font-family="sans-serif">${xlab?xlab(i):i+1}</text>`;
  }
  g+=`<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0+h}" stroke="${M}" stroke-width="1.4"/>`;
  return g;
}
const pts=(x0,y0,w,h,ymax,arr)=>arr.map((v,i)=>
  [x0+(i/(arr.length-1))*w, y0+h-(v/ymax)*h]);
const poly=(p,col,dash,wd)=>`<polyline points="${p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ')}"
  fill="none" stroke="${col}" stroke-width="${wd||2.4}"
  ${dash?`stroke-dasharray="${dash}"`:''} stroke-linejoin="round" stroke-linecap="round"/>`;
const dots=(p,col)=>p.map(q=>`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}"
  r="3" fill="#fff" stroke="${col}" stroke-width="2"/>`).join('');

const F={
/* ── Q-158 · مخطّط التورنادو ── */
'Q-158':()=>{
  const W=520,H=290,x0=170,y0=44,w=310,h=196;
  const rows=[['Material cost',-0.62,0.74],['Schedule delay',-0.55,0.58],
    ['Labour productivity',-0.41,0.47],['Exchange rate',-0.33,0.36],
    ['Regulatory change',-0.22,0.25],['Weather',-0.14,0.16]];
  const cx=x0+w/2, sc=(w/2)/0.8;
  let b=`<line x1="${cx}" y1="${y0-4}" x2="${cx}" y2="${y0+h+4}"
    stroke="${M}" stroke-width="1.4"/>`;
  rows.forEach((r,i)=>{
    const bh=h/rows.length*0.62, y=y0+(i+0.5)*(h/rows.length)-bh/2;
    b+=`<rect x="${cx+r[1]*sc}" y="${y}" width="${-r[1]*sc}" height="${bh}"
      fill="${R}" opacity=".82" rx="2"/>
      <rect x="${cx}" y="${y}" width="${r[2]*sc}" height="${bh}" fill="${G}" opacity=".82" rx="2"/>
      <text x="${x0-8}" y="${y+bh/2+3.5}" font-size="9.5" fill="${N}" text-anchor="end"
        font-family="sans-serif">${r[0]}</text>`;
  });
  [-0.8,-0.4,0,0.4,0.8].forEach(v=>{
    b+=`<text x="${cx+v*sc}" y="${y0+h+16}" font-size="9" fill="${M}" text-anchor="middle"
      font-family="sans-serif">${v.toFixed(1)}</text>`;});
  b+=`<rect x="${x0}" y="${y0+h+24}" width="11" height="9" fill="${R}" opacity=".82" rx="2"/>
      <text x="${x0+16}" y="${y0+h+32}" font-size="9" fill="${M}" font-family="sans-serif">Negative</text>
      <rect x="${x0+80}" y="${y0+h+24}" width="11" height="9" fill="${G}" opacity=".82" rx="2"/>
      <text x="${x0+96}" y="${y0+h+32}" font-size="9" fill="${M}" font-family="sans-serif">Positive</text>`;
  return frame(W,H,'Sensitivity Analysis — Impact on Project Outcome',b,
    'Correlation coefficient','');
},
/* ── Q-269 · مخطّط تنازلي نموذجي ── */
'Q-269':()=>{
  const W=520,H=280,x0=44,y0=42,w=440,h=186,ymax=40;
  const plan=[40,36,32,28,24,20,16,12,8,4,0];
  const act =[40,38,34,33,29,24,21,15,11,6,0];
  const pp=pts(x0,y0,w,h,ymax,plan), pa=pts(x0,y0,w,h,ymax,act);
  let b=grid(x0,y0,w,h,ymax,4,plan.length,i=>'D'+(i+1));
  b+=poly(pp,R,'6 4',2)+poly(pa,S)+dots(pa,S);
  b+=`<rect x="${x0+w-118}" y="${y0+4}" width="112" height="34" fill="#fff"
      stroke="${L}" rx="5"/>
    <line x1="${x0+w-110}" y1="${y0+14}" x2="${x0+w-92}" y2="${y0+14}"
      stroke="${R}" stroke-width="2" stroke-dasharray="5 3"/>
    <text x="${x0+w-87}" y="${y0+17}" font-size="9" fill="${M}" font-family="sans-serif">Ideal</text>
    <line x1="${x0+w-110}" y1="${y0+29}" x2="${x0+w-92}" y2="${y0+29}"
      stroke="${S}" stroke-width="2.4"/>
    <text x="${x0+w-87}" y="${y0+32}" font-size="9" fill="${M}" font-family="sans-serif">Actual</text>`;
  return frame(W,H,'Work Remaining vs Time',b,'Sprint day','Story points remaining');
},
/* ── Q-357 · اليوم الرابع من ١٥ · متسق مع الخطة ── */
'Q-357':()=>{
  const W=520,H=280,x0=44,y0=42,w=440,h=186,ymax=60;
  const days=16;
  const plan=[...Array(days).keys()].map(i=>60-(60/(days-1))*i);
  const act=[60,57,53,48,45];              /* حتى اليوم الرابع فقط */
  const pp=pts(x0,y0,w,h,ymax,plan);
  const pa=act.map((v,i)=>[x0+(i/(days-1))*w, y0+h-(v/ymax)*h]);
  let b=grid(x0,y0,w,h,ymax,4,days,i=>(i%3===0||i===days-1)?String(i):'');
  b+=poly(pp,R,'6 4',2)+poly(pa,G)+dots(pa,G);
  const lx=pa[pa.length-1][0], ly=pa[pa.length-1][1];
  b+=`<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="5.5" fill="${G}"/>
    <line x1="${lx.toFixed(1)}" y1="${y0}" x2="${lx.toFixed(1)}" y2="${y0+h}"
      stroke="${O}" stroke-width="1.2" stroke-dasharray="4 3"/>
    <text x="${(lx+5).toFixed(1)}" y="${y0+13}" font-size="10" font-weight="600" fill="${O}"
      font-family="sans-serif">Today — day 4</text>`;
  b+=`<rect x="${x0+w-118}" y="${y0+4}" width="112" height="34" fill="#fff"
      stroke="${L}" rx="5"/>
    <line x1="${x0+w-110}" y1="${y0+14}" x2="${x0+w-92}" y2="${y0+14}"
      stroke="${R}" stroke-width="2" stroke-dasharray="5 3"/>
    <text x="${x0+w-87}" y="${y0+17}" font-size="9" fill="${M}" font-family="sans-serif">Plan</text>
    <line x1="${x0+w-110}" y1="${y0+29}" x2="${x0+w-92}" y2="${y0+29}"
      stroke="${G}" stroke-width="2.4"/>
    <text x="${x0+w-87}" y="${y0+32}" font-size="9" fill="${M}" font-family="sans-serif">Actual</text>`;
  return frame(W,H,'Sprint Burndown — 15-Day Sprint',b,'Sprint day','Story points remaining');
},
/* ── Q-471 · ٣٧ نقطة · متأخّر عند اليوم ٣ ── */
'Q-471':()=>{
  const W=520,H=280,x0=44,y0=42,w=440,h=186,ymax=40;
  const days=11;
  const plan=[...Array(days).keys()].map(i=>37-(37/(days-1))*i);
  const act=[37,36,35,34];                 /* بالكاد تحرّك */
  const pp=pts(x0,y0,w,h,ymax,plan);
  const pa=act.map((v,i)=>[x0+(i/(days-1))*w, y0+h-(v/ymax)*h]);
  let b=grid(x0,y0,w,h,ymax,4,days,i=>String(i));
  b+=poly(pp,R,'6 4',2)+poly(pa,O)+dots(pa,O);
  const lx=pa[3][0], ly=pa[3][1], py=pp[3][1];
  b+=`<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${lx.toFixed(1)}"
      y2="${py.toFixed(1)}" stroke="${R}" stroke-width="2"/>
    <text x="${(lx+7).toFixed(1)}" y="${((ly+py)/2+3).toFixed(1)}" font-size="10"
      font-weight="600" fill="${R}" font-family="sans-serif">gap</text>
    <circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="5.5" fill="${O}"/>
    <text x="${(lx+5).toFixed(1)}" y="${y0+13}" font-size="10" font-weight="600" fill="${O}"
      font-family="sans-serif">Day 3</text>`;
  b+=`<rect x="${x0+w-118}" y="${y0+4}" width="112" height="34" fill="#fff"
      stroke="${L}" rx="5"/>
    <line x1="${x0+w-110}" y1="${y0+14}" x2="${x0+w-92}" y2="${y0+14}"
      stroke="${R}" stroke-width="2" stroke-dasharray="5 3"/>
    <text x="${x0+w-87}" y="${y0+17}" font-size="9" fill="${M}" font-family="sans-serif">Plan (dotted)</text>
    <line x1="${x0+w-110}" y1="${y0+29}" x2="${x0+w-92}" y2="${y0+29}"
      stroke="${O}" stroke-width="2.4"/>
    <text x="${x0+w-87}" y="${y0+32}" font-size="9" fill="${M}" font-family="sans-serif">Actual</text>`;
  return frame(W,H,'Burndown — 37 Story Points Planned',b,'Sprint day','Story points remaining');
},
/* ── Q-756 · تصاعدي · النطاق ينخفض من ٣٢ إلى ٣٠ في اليوم ٧ ── */
'Q-756':()=>{
  const W=520,H=280,x0=44,y0=42,w=440,h=186,ymax=40;
  const days=11;
  const scope=[32,32,32,32,32,32,32,30,30,30,30];
  const done =[0,3,6,10,13,17,20,23,26,28,30];
  const ps=scope.map((v,i)=>[x0+(i/(days-1))*w, y0+h-(v/ymax)*h]);
  const pd=done.map((v,i)=>[x0+(i/(days-1))*w, y0+h-(v/ymax)*h]);
  let b=grid(x0,y0,w,h,ymax,4,days,i=>String(i));
  b+=poly(ps,N,'',2.2)+poly(pd,G)+dots(pd,G);
  const dx=ps[7][0];
  b+=`<line x1="${dx.toFixed(1)}" y1="${y0}" x2="${dx.toFixed(1)}" y2="${y0+h}"
      stroke="${O}" stroke-width="1.2" stroke-dasharray="4 3"/>
    <circle cx="${ps[7][0].toFixed(1)}" cy="${ps[7][1].toFixed(1)}" r="5" fill="${O}"/>
    <text x="${(dx-4).toFixed(1)}" y="${(ps[7][1]-9).toFixed(1)}" font-size="10"
      font-weight="600" fill="${O}" text-anchor="end" font-family="sans-serif">Day 7 — scope 32 → 30</text>`;
  b+=`<rect x="${x0+w-126}" y="${y0+h-42}" width="120" height="34" fill="#fff"
      stroke="${L}" rx="5"/>
    <line x1="${x0+w-118}" y1="${y0+h-32}" x2="${x0+w-100}" y2="${y0+h-32}"
      stroke="${N}" stroke-width="2.2"/>
    <text x="${x0+w-95}" y="${y0+h-29}" font-size="9" fill="${M}" font-family="sans-serif">Total scope</text>
    <line x1="${x0+w-118}" y1="${y0+h-17}" x2="${x0+w-100}" y2="${y0+h-17}"
      stroke="${G}" stroke-width="2.4"/>
    <text x="${x0+w-95}" y="${y0+h-14}" font-size="9" fill="${M}" font-family="sans-serif">Completed</text>`;
  return frame(W,H,'Burnup — Completed Work vs Total Scope',b,'Sprint day','Story points');
}
};
return {
  has(id){ return !!F[id] },
  svg(id){ return F[id] ? F[id]() : '' },
  ids(){ return Object.keys(F) }
};
})();
