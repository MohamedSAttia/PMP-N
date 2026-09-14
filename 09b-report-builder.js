/* ============================================================
   مولّد التقارير الشامل — PDF · Word · عرض تقديمي
   يضمّ كل ما استُخدم: العمليات والأدوات والمخرجات والقوالب
   ============================================================ */
window.REPORT = (function(){
'use strict';
const E=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const md=s=>E(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');

let A=null;                                   /* واجهة الوصول للبيانات */
function setup(api){A=api}

/* ═══ جمع كل البيانات ═══ */
function collect(){
  const d=A.dat(), ar=A.ar, l=ar?0:1;
  const P=window.PROC, TT=window.TT||{}, LF=window.LIFE||[];
  const out={ar, d, gen:new Date()};

  /* المراحل */
  out.stages=LF.map(s=>({k:s.k,n:s.n,t:s.t[l],ic:s.ic,pct:A.pct(s),
    fields:(s.f||[]).map(f=>({l:f.l[l],v:(d[s.k]||{})[f.k]||''}))
      .filter(x=>String(x.v).trim())}));
  out.overall=Math.round(out.stages.reduce((a,b)=>a+b.pct,0)/Math.max(1,out.stages.length));

  /* العمليات المنجزة — بكل تفاصيلها */
  const pd=d.pdata||{}, pr=d.proc||{};
  out.procs=[];
  (P?P.L:[]).forEach(p=>{
    const key='p'+p.n, w=pd[key]||{}, doc=pr[key]||'';
    const ins=(ar?p.i:p.ie), outs=(ar?p.o:p.oe), tt=TT[p.n]||[];
    const fi=ins.map((x,k)=>({l:x,v:w['i'+k]})).filter(x=>String(x.v||'').trim());
    const ft=tt.map((x,k)=>({l:x[l],r:w['tr'+k],on:!!w['t'+k]})).filter(x=>x.on);
    const fo=outs.map((x,k)=>({l:x,v:w['o'+k]})).filter(x=>String(x.v||'').trim());
    if(fi.length||ft.length||fo.length||String(doc).trim())
      out.procs.push({n:p.n,t:ar?p.t[0]:p.t[1],d:p.d,g:p.g,
        dom:P[p.d]?P[p.d][ar?'ar':'en']:'', grp:P.GR[p.g]?P.GR[p.g][ar?'ar':'en']:'',
        ins:fi,tools:ft,outs:fo,doc,tpl:p.tp||''});
  });
  /* إحصاء الأدوات */
  const tc={};
  out.procs.forEach(p=>p.tools.forEach(t=>{tc[t.l]=(tc[t.l]||0)+1}));
  out.toolList=Object.entries(tc).sort((a,b)=>b[1]-a[1]);
  out.toolTotal=out.procs.reduce((a,p)=>a+p.tools.length,0);

  /* النهج */
  const A2=window.APPROACH;
  if(A2&&d.apprSc&&Object.keys(d.apprSc).length){
    const v=A2.verdict(d.apprSc);
    out.appr={sc:d.apprSc, v, pick:d.apprPick,
      label:v&&v.v!=='more'?A2.label(d.apprPick||v.v,ar):null,
      why:v&&v.v!=='more'?A2.why(d.apprPick||v.v,d.apprSc,ar):'',
      factors:A2.factors.map(f=>({l:(ar?f.ar:(f.en||f.ar))[0],v:+d.apprSc[f.k]||0,
        lo:(ar?f.ar:(f.en||f.ar))[1],hi:(ar?f.ar:(f.en||f.ar))[2]}))};
  }
  /* سكروم */
  const X=window.SCRUMX;
  if(X&&d.sx){
    const m=d.sx;
    out.scrum={team:m.team, cap:X.capacity(m),
      backlog:m.backlog.length, pts:m.backlog.reduce((a,b)=>a+b.pts,0),
      ready:m.backlog.filter(x=>x.dor).length,
      sprints:m.sprints.filter(s=>s.closed),
      vel:X.velocity(m), fc:X.forecast(m), dor:m.dor, dod:m.dod,
      stories:m.backlog};
  }
  /* كانبان */
  if(d.kbx) out.kanban={cols:d.kbx.cols,
    cards:d.kbx.cards,
    byCol:d.kbx.cols.map(c=>({n:c.n,wip:c.wip,
      cnt:d.kbx.cards.filter(x=>x.col===c.k).length}))};
  /* المختلط */
  if(d.hybAreas&&d.hybAreas.some(a=>a.ap)){
    const H=window.HYBRID;
    out.hybrid={areas:d.hybAreas.filter(a=>a.ap).map(a=>({
      n:ar?a.ar:a.en, ap:A2?A2.label(a.ap,ar):a.ap, hint:ar?a.hint[0]:a.hint[1]})),
      seams:H?H.seams(d.hybAreas,ar):[]};
  }
  /* الميثاق */
  const C=window.CHARTER;
  if(C&&d.charter&&Object.keys(d.charter).length){
    const m=A.chMeta();
    out.charter={no:m.no,ver:m.ver,signed:m.signed,sig:m.sig,log:m.log||[],
      secs:C.secs.map(s=>({t:s.t[l],
        rows:s.f.map(f=>({l:f.l[l],v:d.charter[s.k+'_'+f.k]}))
          .filter(x=>String(x.v||'').trim())})).filter(s=>s.rows.length)};
  }
  /* أصحاب المصلحة */
  const SR=window.SREG;
  if(d.stakeRows&&d.stakeRows.length&&SR){
    const lb=(ck,v)=>{const c=SR.cols.find(x=>x.k===ck);
      if(!c||!c.o)return v; const o=c.o.find(x=>x[0]===v); return o?o[l+1]:v};
    out.stake=d.stakeRows.map(r=>({n:r.name||'',role:r.role||'',org:r.org||'',
      pw:lb('power',r.power),int:lb('interest',r.interest),att:lb('att',r.att),
      want:lb('want',r.want),strat:r.strat||'',chan:r.chan||'',owner:r.owner||'',
      need:r.need||'',infl:r.infl||'', _p:r.power,_i:r.interest,_a:r.att}));
  }
  /* اللجنة */
  if(d.board&&d.board.verdict) out.board=d.board;
  /* الأداء */
  const mon=d.mon||{};
  const bac=+mon.bac||0, pv=+mon.pv||0, ev=+mon.ev||0, ac=+mon.ac||0;
  if(bac&&ev&&ac){
    const cpi=ev/ac, spi=pv?ev/pv:0, eac=bac/cpi;
    out.ev={bac,pv,ev,ac,cpi,spi,eac,vac:bac-eac,
      tcpi:(bac-ev)/Math.max(1,(bac-ac)), cv:ev-ac, sv:ev-pv};
  }
  /* حالة العمل */
  const bc=d.case||{};
  const cost=+bc.cost||0, ben=+bc.benefit||0, yrs=+bc.years||0;
  if(cost&&ben&&yrs) out.fin={cost,ben,yrs,pb:cost/ben,
    roi:(ben*yrs-cost)/cost*100, tot:ben*yrs};
  /* القوالب المستخدمة */
  const TPL={charter:['ميثاق المشروع','Project Charter'],wbs:['هيكل تجزئة العمل','WBS'],
    network:['شبكة الجدول','Schedule Network'],budget:['خط أساس التكلفة','Cost Baseline'],
    stake:['سجلّ أصحاب المصلحة','Stakeholder Register'],risk:['سجلّ المخاطر','Risk Register'],
    raci:['مصفوفة RACI','RACI Matrix'],closure:['قائمة الإغلاق','Closure Checklist'],
    contract:['نموذج العقد','Contract Model'],quality:['خطة الجودة','Quality Plan'],
    ev:['تحليل القيمة المكتسبة','Earned Value Analysis'],team:['ميثاق الفريق','Team Charter'],
    rtm:['مصفوفة التتبّع','Traceability Matrix'],scope:['بيان النطاق','Scope Statement'],
    comms:['خطة التواصل','Communications Plan'],pmplan:['خطة إدارة المشروع','PM Plan'],
    change:['ضبط التغيير','Change Control'],estimate:['التقدير','Estimating'],
    lessons:['الدروس المستفادة','Lessons Learned'],riskplan:['خطة إدارة المخاطر','Risk Mgmt Plan']};
  const used=new Set();
  out.procs.forEach(p=>{if(p.tpl)used.add(p.tpl)});
  if(out.charter) used.add('charter');
  if(out.stake) used.add('stake');
  if(out.ev) used.add('ev');
  out.templates=[...used].map(k=>TPL[k]?TPL[k][l]:k);
  return out;
}

/* ═══ الأنماط المشتركة ═══ */
const CSS=`
@page{size:A4;margin:15mm 14mm}
*{box-sizing:border-box}
body{font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#16242e;
  line-height:1.72;margin:0;font-size:11.5pt}
.rtl{direction:rtl}
.cov{page-break-after:always;padding:40px 0;text-align:center}
.cov .lg{font-size:40px;font-weight:700;color:#103040;letter-spacing:-1px;direction:ltr}
.cov .lg i{color:#70C0E0;font-style:normal}
.cov .org{font-size:10pt;letter-spacing:3px;color:#6b8090;margin:6px 0 40px;direction:ltr}
.cov h1{font-size:26pt;color:#103040;margin:0 0 10px;line-height:1.3}
.cov .sub{font-size:13pt;color:#4a6274;margin-bottom:34px}
.cov .meta{display:inline-block;border:1.5px solid #d8e3ea;border-radius:10px;padding:16px 26px;
  margin-bottom:30px}
.cov .meta div{font-size:10.5pt;color:#4a6274;margin:4px 0}
.cov .meta b{color:#103040}
.cov .bars{display:flex;height:7px;margin:0 60px;border-radius:4px;overflow:hidden}
.cov .bars i{flex:1}
.hd{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:3px solid #103040;
  margin-bottom:20px}
.hd .lg{font-size:20px;font-weight:700;color:#103040;direction:ltr}
.hd .lg i{color:#70C0E0;font-style:normal}
.hd h2{flex:1;font-size:13pt;margin:0;color:#103040}
.hd .dt{font-size:9pt;color:#6b8090}
h2.sec{font-size:15pt;color:#103040;border-bottom:2.5px solid #70C0E0;padding-bottom:6px;
  margin:26px 0 13px;page-break-after:avoid}
h3{font-size:12pt;color:#1a5e7d;margin:16px 0 7px;page-break-after:avoid}
h4{font-size:10.5pt;color:#103040;margin:12px 0 6px;page-break-after:avoid}
p{margin:0 0 8px}
table{width:100%;border-collapse:collapse;margin:9px 0 14px;font-size:9.5pt;
  page-break-inside:avoid}
th{background:#103040;color:#fff;padding:7px 9px;text-align:start;font-weight:600}
td{border:1px solid #dce6ec;padding:6px 9px;vertical-align:top}
tr:nth-child(even) td{background:#f8fbfc}
.kpi{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 18px}
.kpi>div{flex:1;min-width:88px;border:1.5px solid #dce6ec;border-radius:9px;padding:11px 8px;
  text-align:center}
.kpi b{display:block;font-size:17pt;color:#103040;line-height:1.15}
.kpi span{font-size:8pt;color:#6b8090}
.kpi .g{color:#2fa87a}.kpi .r{color:#c0392b}.kpi .o{color:#e08b2a}
.bar{height:7px;background:#eef3f6;border-radius:4px;overflow:hidden;margin-top:3px}
.bar i{display:block;height:100%;background:#2fa87a}
.pc{border:1.5px solid #dce6ec;border-radius:10px;padding:13px 15px;margin-bottom:11px;
  page-break-inside:avoid;border-inline-start:4px solid #70C0E0}
.pc-h{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:9px;
  padding-bottom:7px;border-bottom:1px solid #e6edf1}
.pc-n{background:#103040;color:#fff;border-radius:6px;padding:2px 9px;font-size:9pt;font-weight:700}
.pc-t{flex:1;font-size:11pt;font-weight:600;color:#103040}
.pc-g{font-size:8.5pt;color:#6b8090;background:#f1f6f9;border-radius:10px;padding:2px 9px}
.io{display:flex;gap:10px;flex-wrap:wrap}
.io>div{flex:1;min-width:170px}
.io h5{font-size:9pt;margin:0 0 5px;padding:3px 8px;border-radius:5px;font-weight:600}
.io .in h5{background:#eaf3f9;color:#1a5e7d}
.io .tt h5{background:#f0eefb;color:#2b1a8f}
.io .ou h5{background:#e9f7f1;color:#12654a}
.io ul{list-style:none;margin:0;padding:0}
.io li{font-size:9pt;line-height:1.6;padding:3px 0 3px 10px;border-bottom:1px dotted #e6edf1}
.io li b{color:#103040}
.io li em{display:block;color:#5a6b78;font-style:normal;font-size:8.5pt;padding-inline-start:8px}
.doc{background:#fafcfd;border:1px solid #e6edf1;border-radius:8px;padding:10px 13px;
  margin-top:9px;font-size:9.5pt;line-height:1.75}
.tag{display:inline-block;font-size:8.5pt;background:#f1f6f9;border:1px solid #dce6ec;
  border-radius:10px;padding:2px 9px;margin:2px}
.tag.g{background:#e9f7f1;border-color:#bfe5d6;color:#12654a}
.tag.o{background:#fdf4e8;border-color:#f0dcbc;color:#a54f00}
.note{border-radius:8px;padding:10px 13px;font-size:9.5pt;border:1px solid;margin:9px 0}
.note.i{background:#eaf3f9;border-color:#c6dceb;color:#155273}
.note.w{background:#fdf4e8;border-color:#f0dcbc;color:#8a4f00}
.note.g{background:#e9f7f1;border-color:#bfe5d6;color:#14614a}
.sig{display:flex;gap:26px;align-items:flex-end;margin-top:22px;padding-top:16px;
  border-top:2px solid #103040}
.sig .s{flex:1;text-align:center}
.sig .l{height:38px;border-bottom:1.5px solid #103040;margin-bottom:5px}
.sig b{display:block;font-size:10pt}
.sig span{font-size:8.5pt;color:#6b8090}
.seal{width:84px;height:84px;border:3px double #2fa87a;border-radius:50%;display:flex;
  flex-direction:column;align-items:center;justify-content:center;transform:rotate(-9deg)}
.seal b{font-size:9pt;color:#2fa87a;letter-spacing:1px}
.seal span{font-size:6.5pt;color:#2fa87a}
.ft{margin-top:26px;padding-top:11px;border-top:1px solid #dce6ec;text-align:center;
  font-size:8.5pt;color:#6b8090}
.pb{page-break-before:always}
.mtx{width:100%;border-collapse:collapse;margin:10px 0}
.mtx td{border:1px solid #dce6ec;padding:9px;vertical-align:top;height:66px;width:50%}
.mtx .q1{background:#fdf4e8} .mtx .q2{background:#e9f7f1}
.mtx .q3{background:#eaf3f9} .mtx .q4{background:#f8fafb}
.mtx b{display:block;font-size:9pt;margin-bottom:5px}
`;

/* ═══ بناء التقرير الكامل ═══ */
function fullHTML(){
  const r=collect(), ar=r.ar, T=(a,e)=>ar?a:e;
  const D=r.gen.toLocaleDateString(ar?'ar-EG':'en-GB',{dateStyle:'long'});
  const nm=(r.d.charter||{}).id_name||(r.charter?r.charter.no:'FRIGATE BRAVO');
  let H='';
  /* ── الغلاف ── */
  H+=`<div class="cov">
    <div class="lg">SOMU<i>\u2022</i></div>
    <div class="org">SOMU INTERNATIONAL TRAINING CENTRE</div>
    <h1>${E(nm)}</h1>
    <div class="sub">${T('تقرير دورة حياة المشروع — شامل','Project Lifecycle Report — Comprehensive')}</div>
    <div class="meta">
      ${r.charter?`<div>${T('رقم الوثيقة','Document no.')}: <b>${E(r.charter.no)}</b>
        \u00A0\u00B7\u00A0 ${T('الإصدار','Version')}: <b>${E(r.charter.ver)}</b></div>`:''}
      <div>${T('تاريخ الإصدار','Issued')}: <b>${D}</b></div>
      <div>${T('الإنجاز الكلي','Overall completion')}: <b>${r.overall}%</b>
        \u00A0\u00B7\u00A0 ${T('العمليات','Processes')}: <b>${r.procs.length}/40</b></div>
    </div>
    <div class="bars"><i style="background:#201080"></i><i style="background:#40C090"></i>
      <i style="background:#F07000"></i><i style="background:#70C0E0"></i></div>
  </div>`;
  /* ── الترويسة ── */
  H+=`<div class="hd"><span class="lg">SOMU<i>\u2022</i></span>
    <h2>${E(nm)} \u2014 ${T('تقرير شامل','Comprehensive Report')}</h2>
    <span class="dt">${D}</span></div>`;

  /* ── ١ الملخّص التنفيذي ── */
  H+=`<h2 class="sec">${T('١ \u00B7 الملخّص التنفيذي','1 \u00B7 Executive Summary')}</h2>
  <div class="kpi">
    <div><b>${r.overall}%</b><span>${T('إنجاز المراحل','Stages')}</span></div>
    <div><b>${r.procs.length}/40</b><span>${T('عمليات','Processes')}</span></div>
    <div><b>${r.toolTotal}</b><span>${T('أداة مطبَّقة','Tools applied')}</span></div>
    ${r.stake?`<div><b>${r.stake.length}</b><span>${T('أصحاب مصلحة','Stakeholders')}</span></div>`:''}
    ${r.board?`<div><b class="${r.board.verdict==='approve'?'g':r.board.verdict==='reject'?'r':'o'}">${
      r.board.overall}%</b><span>${T('قرار اللجنة','Board')}</span></div>`:''}
    ${r.ev?`<div><b class="${r.ev.cpi>=1?'g':'r'}">${r.ev.cpi.toFixed(2)}</b><span>CPI</span></div>
      <div><b class="${r.ev.spi>=1?'g':'r'}">${r.ev.spi.toFixed(2)}</b><span>SPI</span></div>`:''}
  </div>`;
  const alerts=[];
  if(r.ev&&r.ev.cpi<1) alerts.push(T(
    `تجاوز في التكلفة \u2014 CPI ${r.ev.cpi.toFixed(2)} والتقدير عند الإنجاز <b>${Math.round(r.ev.eac)}</b> بتجاوز <b>${Math.abs(Math.round(r.ev.vac))}</b>.`,
    `Cost overrun \u2014 CPI ${r.ev.cpi.toFixed(2)}, EAC <b>${Math.round(r.ev.eac)}</b> with a variance of <b>${Math.abs(Math.round(r.ev.vac))}</b>.`));
  if(r.ev&&r.ev.spi<1) alerts.push(T(`تأخّر عن الجدول \u2014 SPI ${r.ev.spi.toFixed(2)}.`,
    `Behind schedule \u2014 SPI ${r.ev.spi.toFixed(2)}.`));
  if(r.stake){const res=r.stake.filter(x=>x._a==='res').length;
    if(res) alerts.push(T(`<b>${res}</b> طرفاً متحفّظاً يحتاج إشراكاً قبل أن يتحوّل إلى عائق.`,
      `<b>${res}</b> resistant stakeholders need engagement before they become impediments.`));}
  if(r.charter&&!r.charter.signed) alerts.push(T('الميثاق مسوّدة لم تُعتمد بعد.',
    'The charter is a draft and has not been approved.'));
  H+=`<div class="io"><div>
    <h3>${T('أين نحن','Where we stand')}</h3><ul class="io-l" style="list-style:none;padding:0">
      <li>\u25B8 ${T(`أُنجزت <b>${r.stages.filter(s=>s.pct===100).length}</b> مرحلة من ${r.stages.length}`,
        `<b>${r.stages.filter(s=>s.pct===100).length}</b> of ${r.stages.length} stages complete`)}</li>
      <li>\u25B8 ${T(`<b>${r.procs.length}</b> عملية موثّقة بمدخلاتها وأدواتها ومخرجاتها`,
        `<b>${r.procs.length}</b> processes documented with inputs, tools and outputs`)}</li>
      ${r.appr&&r.appr.label?`<li>\u25B8 ${T('النهج المعتمد','Approach adopted')}: <b>${E(r.appr.label)}</b></li>`:''}
      ${r.charter?`<li>\u25B8 ${T('الميثاق','Charter')}: <b>${E(r.charter.no)} v${E(r.charter.ver)}</b>
        ${r.charter.signed?T('\u2014 موقّع ومعتمد','\u2014 signed and approved'):''}</li>`:''}
    </ul></div>
    <div><h3>${T('ما يحتاج قراراً','What needs a decision')}</h3>
    ${alerts.length?`<ul style="list-style:none;padding:0">${alerts.map(a=>
      `<li>\u26A0 ${a}</li>`).join('')}</ul>`
      :`<p class="note g">${T('لا انحرافات جوهرية حالياً.','No material variances at present.')}</p>`}
    </div></div>`;

  /* ── ٢ حالة المراحل ── */
  H+=`<h2 class="sec">${T('٢ \u00B7 حالة المراحل','2 \u00B7 Stage Status')}</h2>
  <table><tr><th style="width:36px">#</th><th>${T('المرحلة','Stage')}</th>
    <th style="width:120px">${T('الاكتمال','Completion')}</th></tr>
  ${r.stages.map(s=>`<tr><td>${s.n}</td><td>${s.ic} ${E(s.t)}</td>
    <td>${s.pct}%<div class="bar"><i style="width:${s.pct}%"></i></div></td></tr>`).join('')}
  </table>`;

  /* ── ٣ النهج ── */
  if(r.appr&&r.appr.label){
    H+=`<h2 class="sec">${T('٣ \u00B7 تحديد النهج','3 \u00B7 Approach Selection')}</h2>
    <div class="note i"><b>${T('النهج المعتمد','Adopted approach')}: ${E(r.appr.label)}</b><br>${E(r.appr.why)}</div>
    <table><tr><th>${T('العامل','Factor')}</th><th style="width:88px">${T('التقييم','Rating')}</th>
      <th>${T('الميل','Leaning')}</th></tr>
    ${r.appr.factors.filter(f=>f.v).map(f=>`<tr><td>${E(f.l)}</td>
      <td style="text-align:center">${f.v} / 5</td>
      <td>${E(f.v<=2?f.lo:f.v>=4?f.hi:T('بين الطرفين','Between the two'))}</td></tr>`).join('')}
    </table>`;
    if(r.appr.v&&r.appr.v.spread>=3) H+=`<div class="note w">${T(
      `تباين العوامل <b>${r.appr.v.spread}</b> \u2014 إشارة قاطعة على الحاجة لنهج لكل مجال نطاق.`,
      `Factor spread is <b>${r.appr.v.spread}</b> \u2014 a decisive signal for an approach per scope area.`)}</div>`;
  }
  /* ── المختلط ── */
  if(r.hybrid){
    H+=`<h3>${T('توزيع النهج على مجالات النطاق','Approach per Scope Area')}</h3>
    <table><tr><th>${T('مجال النطاق','Scope area')}</th><th style="width:100px">${T('النهج','Approach')}</th>
      <th>${T('المبرّر','Rationale')}</th></tr>
    ${r.hybrid.areas.map(a=>`<tr><td><b>${E(a.n)}</b></td><td>${E(a.ap)}</td>
      <td>${E(a.hint)}</td></tr>`).join('')}</table>`;
    if(r.hybrid.seams.length) H+=`<h4>${T('الملتقيات بين المسارات','Seams Between Streams')}</h4>
      ${r.hybrid.seams.map(s=>`<div class="note o" style="background:#fdf4e8;border-color:#f0dcbc">
        <b>${E(s.a)} \u27F7 ${E(s.b)}</b><br>${E(s.t)}</div>`).join('')}`;
  }
  /* ── سكروم ── */
  if(r.scrum){
    const s=r.scrum;
    H+=`<h2 class="sec">${T('\u00B7 تطبيق سكروم','\u00B7 Scrum Application')}</h2>
    <div class="kpi">
      <div><b>${s.cap}</b><span>${T('سعة الفريق','Team capacity')}</span></div>
      <div><b>${s.backlog}</b><span>${T('قصص','Stories')}</span></div>
      <div><b>${s.pts}</b><span>${T('نقاط','Points')}</span></div>
      <div><b>${s.sprints.length}</b><span>${T('سبرنتات مغلقة','Closed sprints')}</span></div>
      ${s.vel?`<div><b>${s.vel.avg}</b><span>${T('متوسط السرعة','Avg velocity')}</span></div>`:''}
    </div>
    <h4>${T('الفريق والأدوار','Team and Roles')}</h4>
    <table><tr><th>${T('الدور','Role')}</th><th>${T('الاسم','Name')}</th>
      <th style="width:120px">${T('التخصّص','Discipline')}</th>
      <th style="width:70px">${T('السعة','Capacity')}</th></tr>
      <tr><td>${T('مالك المنتج','Product Owner')}</td><td>${E(s.team.po.n)}</td><td>\u2014</td><td>\u2014</td></tr>
      <tr><td>${T('سكرم ماستر','Scrum Master')}</td><td>${E(s.team.sm.n)}</td><td>\u2014</td><td>\u2014</td></tr>
      ${s.team.devs.map(d=>`<tr><td>${T('مطوّر','Developer')}</td><td>${E(d.n)}</td>
        <td>${E(d.s)}</td><td>${d.cap}</td></tr>`).join('')}
    </table>`;
    if(s.sprints.length) H+=`<h4>${T('سجلّ السبرنتات','Sprint Record')}</h4>
      <table><tr><th style="width:60px">#</th><th>${T('الهدف','Goal')}</th>
        <th style="width:90px">${T('السرعة','Velocity')}</th></tr>
      ${s.sprints.map(x=>`<tr><td>${x.id}</td><td>${E(x.goal||'\u2014')}</td>
        <td>${x.vel}</td></tr>`).join('')}</table>`;
    if(s.fc&&s.fc.rem) H+=`<div class="note i">${T(
      `<b>التنبّؤ من السرعة المرصودة:</b> ${s.fc.rem} نقطة متبقّية \u2014 بين <b>${s.fc.opt}</b> و<b>${s.fc.pes}</b> سبرنت، والأرجح <b>${s.fc.lik}</b>. تنبّأ بمدى ولا تَعِد بتاريخ واحد.`,
      `<b>Forecast from observed velocity:</b> ${s.fc.rem} points remaining \u2014 between <b>${s.fc.opt}</b> and <b>${s.fc.pes}</b> sprints, most likely <b>${s.fc.lik}</b>. Forecast a range, never promise a single date.`)}</div>`;
    H+=`<div class="io"><div class="in"><h5>${T('تعريف الجاهزية','Definition of Ready')}</h5>
      <ul>${s.dor.map(x=>`<li>${E(x)}</li>`).join('')}</ul></div>
      <div class="ou"><h5>${T('تعريف الإنجاز','Definition of Done')}</h5>
      <ul>${s.dod.map(x=>`<li>${E(x)}</li>`).join('')}</ul></div></div>`;
  }
  /* ── كانبان ── */
  if(r.kanban){
    H+=`<h4>${T('لوحة كانبان \u2014 حالة التدفّق','Kanban Board \u2014 Flow State')}</h4>
    <table><tr>${r.kanban.byCol.map(c=>`<th>${E(c.n)}</th>`).join('')}</tr>
    <tr>${r.kanban.byCol.map(c=>{const bad=c.wip&&c.cnt>c.wip;
      return `<td style="text-align:center${bad?';background:#fbeae8;color:#8f2318;font-weight:700':''}">
        ${c.cnt}${c.wip?' / '+c.wip:''}</td>`}).join('')}</tr></table>
    ${r.kanban.byCol.some(c=>c.wip&&c.cnt>c.wip)?`<div class="note w">${T(
      'تجاوز حدّ العمل الجاري في عمود أو أكثر \u2014 أوقف السحب من أعلى وعالج القيد.',
      'The WIP limit is breached in one or more columns \u2014 stop pulling from upstream and fix the constraint.')}</div>`:''}`;
  }

  /* ── ٤ العمليات بالتفصيل ── */
  if(r.procs.length){
    H+=`<h2 class="sec pb">${T('٤ \u00B7 العمليات المنفَّذة \u2014 المدخلات والأدوات والمخرجات',
      '4 \u00B7 Executed Processes \u2014 Inputs, Tools and Outputs')}</h2>
    <div class="note i">${T(
      `<b>${r.procs.length}</b> عملية من الأربعين نُفّذت وُوثّقت، بتطبيق <b>${r.toolTotal}</b> أداة وتقنية.`,
      `<b>${r.procs.length}</b> of the forty processes were executed and documented, applying <b>${r.toolTotal}</b> tools and techniques.`)}</div>`;
    r.procs.forEach(p=>{
      H+=`<div class="pc"><div class="pc-h">
        <span class="pc-n">${p.n}</span><span class="pc-t">${E(p.t)}</span>
        <span class="pc-g">${E(p.dom)}</span><span class="pc-g">${E(p.grp)}</span></div>
      <div class="io">
        ${p.ins.length?`<div class="in"><h5>\u2B05 ${T('المدخلات','Inputs')} (${p.ins.length})</h5>
          <ul>${p.ins.map(x=>`<li><b>${E(x.l)}</b><em>${E(x.v)}</em></li>`).join('')}</ul></div>`:''}
        ${p.tools.length?`<div class="tt"><h5>\uD83D\uDEE0 ${T('الأدوات والتقنيات','Tools & Techniques')} (${p.tools.length})</h5>
          <ul>${p.tools.map(x=>`<li><b>${E(x.l)}</b>${
            String(x.r||'').trim()?`<em>${E(x.r)}</em>`:''}</li>`).join('')}</ul></div>`:''}
        ${p.outs.length?`<div class="ou"><h5>${T('المخرجات','Outputs')} (${p.outs.length}) \u27A1</h5>
          <ul>${p.outs.map(x=>`<li><b>${E(x.l)}</b><em>${E(x.v)}</em></li>`).join('')}</ul></div>`:''}
      </div>
      ${String(p.doc||'').trim()?`<div class="doc">${md(p.doc)}</div>`:''}
      </div>`;
    });
    /* جدول الأدوات المستخدمة */
    if(r.toolList.length){
      H+=`<h3>${T('الأدوات والتقنيات المستخدمة \u2014 مجمَّعة','Tools and Techniques Used \u2014 Consolidated')}</h3>
      <table><tr><th>${T('الأداة أو التقنية','Tool or technique')}</th>
        <th style="width:110px">${T('مرات الاستخدام','Times applied')}</th></tr>
      ${r.toolList.map(t=>`<tr><td>${E(t[0])}</td><td style="text-align:center">${t[1]}</td></tr>`).join('')}
      </table>`;
    }
  }
  /* ── القوالب ── */
  if(r.templates.length) H+=`<h3>${T('القوالب المستخدمة','Templates Used')}</h3>
    <p>${r.templates.map(t=>`<span class="tag g">${E(t)}</span>`).join('')}</p>`;

  /* ── ٥ قرار اللجنة ── */
  if(r.board){
    const V={approve:['\u2705',T('معتمَد','APPROVED')],conditional:['\u26A0\uFE0F',T('معتمَد بشروط','CONDITIONAL')],
             reject:['\u274C',T('مرفوض','REJECTED')]}[r.board.verdict];
    H+=`<h2 class="sec">${T('٥ \u00B7 قرار لجنة الاستثمار','5 \u00B7 Investment Board Decision')}</h2>
    <div class="note ${r.board.verdict==='approve'?'g':r.board.verdict==='reject'?'w':'w'}"
      style="font-size:12pt"><b>${V[0]} ${V[1]} \u2014 ${r.board.overall}%</b></div>
    <table><tr><th>${T('المعيار','Criterion')}</th><th style="width:100px">${T('النتيجة','Score')}</th></tr>
      <tr><td>${T('جودة العرض','Presentation quality')}</td><td>${r.board.answerScore}%</td></tr>
      <tr><td>${T('الجدوى المالية','Financial case')}</td><td>${r.board.finScore}%</td></tr>
      ${r.board.payback?`<tr><td>${T('فترة الاسترداد','Payback')}</td>
        <td>${r.board.payback} ${T('سنة','years')}</td></tr>`:''}
      <tr><td>ROI</td><td>${r.board.roi}%</td></tr></table>`;
  }
  /* ── ٦ الميثاق ── */
  if(r.charter){
    H+=`<h2 class="sec pb">${T('٦ \u00B7 ميثاق المشروع','6 \u00B7 Project Charter')}</h2>
    <table><tr><th>${T('رقم الوثيقة','Document no.')}</th><td>${E(r.charter.no)}</td>
      <th>${T('الإصدار','Version')}</th><td>${E(r.charter.ver)}</td>
      <th>${T('الحالة','Status')}</th><td>${r.charter.signed
        ?T('موقّع ومعتمد','Signed and approved'):T('مسوّدة','Draft')}</td></tr></table>
    ${r.charter.secs.map(s=>`<h4>${E(s.t)}</h4><table>
      ${s.rows.map(x=>`<tr><th style="width:30%">${E(x.l)}</th>
        <td>${md(x.v)}</td></tr>`).join('')}</table>`).join('')}`;
    if(r.charter.signed&&r.charter.sig) H+=`<div class="sig">
      <div class="s"><div class="l">${r.charter.sig.img
        ?`<img src="${r.charter.sig.img}" style="max-height:36px">`:''}</div>
        <b>${E(r.charter.sig.name)}</b><span>${E(r.charter.sig.role)}</span></div>
      <div class="seal"><b>APPROVED</b><span>${E(r.charter.no)}</span>
        <span>${E(r.charter.sig.hash)}</span></div>
      <div class="s"><div class="l"></div><b>SOMU ITC</b>
        <span>${T('مركز سومو الدولي','International Centre')}</span></div></div>`;
    if(r.charter.log&&r.charter.log.length>1) H+=`<h4>${T('سجلّ التغييرات','Change Log')}</h4>
      <table><tr><th style="width:60px">${T('الإصدار','Ver')}</th>
        <th style="width:100px">${T('التاريخ','Date')}</th><th>${T('التغيير','Change')}</th>
        <th>${T('المبرّر','Rationale')}</th></tr>
      ${r.charter.log.map(x=>`<tr><td>${E(x.ver)}</td><td>${E(x.date)}</td>
        <td>${E(x.what)}</td><td>${E(x.why)}</td></tr>`).join('')}</table>`;
  }
  /* ── ٧ أصحاب المصلحة ── */
  if(r.stake){
    H+=`<h2 class="sec pb">${T('٧ \u00B7 سجلّ أصحاب المصلحة','7 \u00B7 Stakeholder Register')}</h2>
    <table style="font-size:8.5pt"><tr><th style="width:26px">#</th>
      <th>${T('الاسم والدور','Name and role')}</th>
      <th style="width:58px">${T('النفوذ','Power')}</th><th style="width:58px">${T('الاهتمام','Interest')}</th>
      <th style="width:68px">${T('الموقف','Attitude')}</th>
      <th>${T('الاستراتيجية','Strategy')}</th>
      <th style="width:90px">${T('القناة','Channel')}</th></tr>
    ${r.stake.map((s,i)=>`<tr><td>${i+1}</td>
      <td><b>${E(s.n)}</b>${s.role?`<br><span style="color:#6b8090">${E(s.role)}</span>`:''}</td>
      <td>${E(s.pw)}</td><td>${E(s.int)}</td><td>${E(s.att)}</td>
      <td>${E(s.strat)}</td><td>${E(s.chan)}</td></tr>`).join('')}</table>
    <h4>${T('مصفوفة النفوذ والاهتمام','Power / Interest Matrix')}</h4>
    <table class="mtx"><tr>
      <td class="q2"><b>${T('أبقِه مُطّلعاً','Keep informed')}</b>
        ${r.stake.filter(s=>s._p!=='high'&&s._i==='high').map(s=>
          `<span class="tag">${E(s.n)}</span>`).join('')||'\u2014'}</td>
      <td class="q1"><b>${T('أدِرْه عن قرب','Manage closely')}</b>
        ${r.stake.filter(s=>s._p==='high'&&s._i==='high').map(s=>
          `<span class="tag o">${E(s.n)}</span>`).join('')||'\u2014'}</td></tr>
    <tr><td class="q4"><b>${T('راقبه','Monitor')}</b>
        ${r.stake.filter(s=>s._p!=='high'&&s._i!=='high').map(s=>
          `<span class="tag">${E(s.n)}</span>`).join('')||'\u2014'}</td>
      <td class="q3"><b>${T('أبقِه راضياً','Keep satisfied')}</b>
        ${r.stake.filter(s=>s._p==='high'&&s._i!=='high').map(s=>
          `<span class="tag">${E(s.n)}</span>`).join('')||'\u2014'}</td></tr></table>`;
  }
  /* ── ٨ الأداء ── */
  if(r.ev||r.fin){
    H+=`<h2 class="sec">${T('٨ \u00B7 الأداء المالي','8 \u00B7 Financial Performance')}</h2>`;
    if(r.fin) H+=`<h4>${T('الجدوى','The Business Case')}</h4><div class="kpi">
      <div><b>${r.fin.cost}</b><span>${T('استثمار','Investment')}</span></div>
      <div><b>${r.fin.ben}</b><span>${T('منفعة سنوية','Annual benefit')}</span></div>
      <div><b class="${r.fin.pb<=3?'g':'o'}">${r.fin.pb.toFixed(1)}</b>
        <span>${T('سنة استرداد','yr payback')}</span></div>
      <div><b class="${r.fin.roi>=50?'g':'o'}">${Math.round(r.fin.roi)}%</b><span>ROI</span></div>
      </div>`;
    if(r.ev){
      H+=`<h4>${T('القيمة المكتسبة','Earned Value')}</h4>
      <table><tr><th>${T('المؤشّر','Measure')}</th><th style="width:90px">${T('القيمة','Value')}</th>
        <th>${T('القراءة','Reading')}</th></tr>
      <tr><td>BAC</td><td>${r.ev.bac}</td><td>${T('الميزانية عند الإنجاز','Budget at completion')}</td></tr>
      <tr><td>PV \u00B7 EV \u00B7 AC</td><td>${r.ev.pv} \u00B7 ${r.ev.ev} \u00B7 ${r.ev.ac}</td>
        <td>${T('المخطّط \u00B7 المكتسب \u00B7 الفعلي','Planned \u00B7 earned \u00B7 actual')}</td></tr>
      <tr><td><b>CPI</b></td><td><b>${r.ev.cpi.toFixed(2)}</b></td>
        <td>${r.ev.cpi<1?T('تجاوز في التكلفة','Over budget'):T('ضمن الميزانية','Within budget')}</td></tr>
      <tr><td><b>SPI</b></td><td><b>${r.ev.spi.toFixed(2)}</b></td>
        <td>${r.ev.spi<1?T('تأخّر عن الجدول','Behind schedule'):T('ضمن الجدول','On schedule')}</td></tr>
      <tr><td>CV \u00B7 SV</td><td>${Math.round(r.ev.cv)} \u00B7 ${Math.round(r.ev.sv)}</td>
        <td>${T('انحراف التكلفة والجدول','Cost and schedule variance')}</td></tr>
      <tr><td><b>EAC</b></td><td><b>${Math.round(r.ev.eac)}</b></td>
        <td>${T('التقدير عند الإنجاز = BAC \u00F7 CPI','Estimate at completion = BAC \u00F7 CPI')}</td></tr>
      <tr><td>VAC</td><td>${Math.round(r.ev.vac)}</td>
        <td>${r.ev.vac<0?T('تجاوز متوقّع','Forecast overrun'):T('وفر متوقّع','Forecast underrun')}</td></tr>
      <tr><td><b>TCPI</b></td><td><b>${r.ev.tcpi.toFixed(2)}</b></td>
        <td>${T('الكفاءة المطلوبة للمتبقّي','Efficiency required on the remainder')}</td></tr>
      </table>`;
      if(r.ev.tcpi>r.ev.cpi*1.15) H+=`<div class="note w">${T(
        `الفجوة بين الكفاءة المطلوبة <b>${r.ev.tcpi.toFixed(2)}</b> والأداء الحالي <b>${r.ev.cpi.toFixed(2)}</b> تبلغ <b>${Math.round((r.ev.tcpi-r.ev.cpi)/r.ev.cpi*100)}%</b> \u2014 وهي غير واقعية عملياً. تُعرض على المجلس ثلاثة خيارات: تمويل إضافي \u00B7 تقليص نطاق محدّد \u00B7 إعادة جدولة.`,
        `The gap between the required <b>${r.ev.tcpi.toFixed(2)}</b> and current <b>${r.ev.cpi.toFixed(2)}</b> is <b>${Math.round((r.ev.tcpi-r.ev.cpi)/r.ev.cpi*100)}%</b> \u2014 not realistically achievable. Three options go to the board: additional funding \u00B7 targeted scope reduction \u00B7 reschedule.`)}</div>`;
    }
  }
  /* ── ٩ محتوى المراحل ── */
  const withF=r.stages.filter(s=>s.fields.length);
  if(withF.length){
    H+=`<h2 class="sec pb">${T('٩ \u00B7 محتوى المراحل','9 \u00B7 Stage Content')}</h2>`;
    withF.forEach(s=>{
      H+=`<h3>${s.ic} ${s.n}. ${E(s.t)}</h3><table>
        ${s.fields.map(f=>`<tr><th style="width:28%">${E(f.l)}</th>
          <td>${md(f.v)}</td></tr>`).join('')}</table>`;
    });
  }
  H+=`<div class="ft">SOMU International Training Centre<br>
    ${T('تصميم وبرمجة د. محمد عطية','Designed &amp; developed by Dr Mohamed Attia')}</div>`;
  return {html:H, data:r, name:nm};
}

function wrap(body, ar, title){
  return `<!DOCTYPE html><html dir="${ar?'rtl':'ltr'}" lang="${ar?'ar':'en'}">
    <head><meta charset="utf-8"><title>${E(title)}</title><style>${CSS}</style></head>
    <body class="${ar?'rtl':''}">${body}</body></html>`;
}
return {
  setup, collect, fullHTML,
  pdf(){ const r=fullHTML(), ar=A.ar;
    const w=window.open('','_blank','width=980,height=740');
    if(!w){alert(ar?'اسمح بالنوافذ المنبثقة':'Please allow pop-ups');return}
    w.document.write(wrap(r.html,ar,r.name)); w.document.close();
    setTimeout(()=>{try{w.focus();w.print()}catch(e){}},900); },
  word(){ const r=fullHTML(), ar=A.ar;
    const html=wrap(r.html,ar,r.name);
    const blob=new Blob(['\ufeff'+html],{type:'application/msword'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download=(r.name||'report').replace(/[^\w\u0600-\u06FF -]/g,'').slice(0,46)+'.doc';
    a.click(); },
  data(){ return collect() }
};
})();
