/* ============================================================
   SOMU International Training Centre
   Project Management Skills — PMP® Exam Preparation
   ============================================================ */
(function () {
'use strict';
const $ = s=>document.querySelector(s), $$ = s=>[...document.querySelectorAll(s)];
const esc = s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const md = s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
const AR=/[\u0600-\u06FF]/;
const isEn = t => !AR.test(String(t||'').slice(0,220));
const ec = t => isEn(t)?' en':'';   /* class للنص الإنجليزي */
const K='ABCDEFGH';
let Q = DB.q.slice();
const SIMS = window.SIMS||[], MODS = SOMU.mods||[], ACTS = SOMU.acts||[], FB = SOMU.fb||[];
const CASES = window.CASES||[];
/* دمج الترجمة الإنجليزية للمحاكاة */
(function(){ const E=window.SIMS_EN||{};
  SIMS.forEach(s=>{ const e=E[s.id]; if(!e)return;
    s.introE=e.intro;
    s.steps.forEach((st,i)=>{ const x=e.steps[i]; if(!x)return;
      st.qE=x.q; st.oE=x.o; st.fbE=x.fb; st.nextE=x.next; }); });
})();
const SQ =(st)=>isAr()?st.q:(st.qE||st.q);
const SO =(st)=>isAr()?st.o:(st.oE||st.o);
const SFB=(st)=>isAr()?st.fb:(st.fbE||st.fb);
const SNX=(st)=>isAr()?st.next:(st.nextE||st.next);
const SIN=(s)=>isAr()?s.intro:(s.introE||s.intro);
/* أزواج الحالات لكل محاكاة كاملة — كل محاكاة تأخذ حالتين = 10 أسئلة */
const MOCKC=[['CA','CB'],['CC','CD'],['CB','CD']];

/* ═══ التخزين ═══ */
const API = window.SOMU_API||null;
const D_ = {
  get(k,d){ if(API) return API.get(k);
    try{const v=localStorage.getItem('somu_'+k);return v?JSON.parse(v):(typeof d==='function'?d():d)}
    catch(e){return typeof d==='function'?d():d} },
  set(k,v){ if(API) return API.set(k,v);
    try{localStorage.setItem('somu_'+k,JSON.stringify(v));return true}catch(e){return false} },
  del(k){ if(API) return API.del(k);
    try{localStorage.removeItem('somu_'+k)}catch(e){} }
};
window.SOMU_DB = D_;
try{ const ov=D_.get('qedit',{})||{};
  Q=Q.map(q=>ov[q.i]?{...q,...ov[q.i]}:q).filter(q=>!(ov[q.i]&&ov[q.i].__del));
  (D_.get('qadd',[])||[]).forEach(a=>Q.push(a));
}catch(e){}

/* ═══ ثوابت ═══ */
const ECO={people:{ar:'الأفراد',en:'People',w:33},process:{ar:'العمليات',en:'Process',w:41},
  business:{ar:'بيئة العمل',en:'Business Environment',w:26}};
const DAYS={
 '1':{t:'إطار عمل إدارة المشاريع',e:'The Project Management Framework',c:'#201080'},
 '2':{t:'النهج الرشيق',e:'The Agile Approach',c:'#40C090'},
 '3':{t:'النهج التنبؤي — البدء والتخطيط',e:'Predictive — Initiating and Planning',c:'#F07000'},
 '4':{t:'النهج التنبؤي — التنفيذ والمراقبة والإغلاق',e:'Predictive — Executing, Controlling, Closing',c:'#70C0E0'},
 '5':{t:'النهج المختلط',e:'The Hybrid Approach',c:'#103040'}};
const AXN={
 '1.1':['الأهداف الاستراتيجية','Strategic Objectives'],
 '1.2':['نظام تسليم القيمة','Value Delivery System'],
 '1.3':['المعنيون','Stakeholders'],
 '1.4':['القيود','Constraints'],
 '1.5':['التأثيرات الداخلية والخارجية','Internal and External Influences'],
 '1.6':['دور مدير المشروع','The Project Manager Role'],
 '1.7':['دورة حياة المشروع','Project Life Cycle'],
 '1.8':['اختيار النهج','Choosing the Approach'],
 '2.1':['عقلية الرشاقة','Agile Mindset'],
 '2.2':['سكرم','Scrum'],
 '2.3':['قائمة الأعمال والقصص','Backlog and Stories'],
 '2.4':['قياس الأداء الرشيق','Agile Metrics'],
 '2.5':['التحسين والفريق الرشيق','Improvement and the Agile Team'],
 '3.1':['البدء والميثاق','Initiating and the Charter'],
 '3.2':['تخطيط النطاق','Scope Planning'],
 '3.3':['تخطيط الجدول','Schedule Planning'],
 '3.4':['تخطيط التكلفة','Cost Planning'],
 '3.5':['تخطيط الجودة والمخاطر والموارد','Quality, Risk and Resource Planning'],
 '4.1':['التنفيذ','Executing'],
 '4.2':['القيمة المكتسبة','Earned Value'],
 '4.3':['المراقبة والتحكّم','Monitoring and Controlling'],
 '4.4':['ضبط التغيير','Change Control'],
 '4.5':['الإغلاق','Closing'],
 '5.1':['تصميم النهج المختلط','Designing the Hybrid'],
 '5.2':['التفصيل والتوسيع','Tailoring and Scaling'],
 '5.3':['إدارة الانتقال','Managing the Transition'],
 '5.4':['حوكمة المشروع المختلط','Hybrid Governance']};
const axn=a=>{const x=AXN[a];return x?pick(x[0],x[1]):a};
/* أسماء أقسام الوحدات والأنشطة بلغتين */
const SECN={'المفهوم الأساسي':'Key concept','الشرح':'Explanation',
 'التطبيق على FRIGATE BRAVO':'FRIGATE BRAVO application','مثال محلول':'Worked example',
 'المصطلحات':'Key terms','قواعد عملية':'Practical rules','أخطاء شائعة':'Common mistakes',
 'تنبيه الاختبار':'Exam watch','تأمّل':'Reflection','رسم':'Visual',
 'الهدف':'Purpose','السيناريو':'Scenario — Project FRIGATE BRAVO',
 'التعليمات':'Participant instructions','البيانات المعطاة':'Data provided',
 'أسئلة للإجابة':'Questions to answer','قرار الفريق':'Team decision',
 'مساحة العمل':'Workspace'};
const SECA=Object.fromEntries(Object.entries(SECN).map(([a,e])=>[e,a]));
const secN=h=>isAr()?(SECA[h]||h):(SECN[h]||h);
const SPEC={
 day:{n:60,min:80,label:'اختبار يومي'},
 dom:{n:40,min:55,label:'اختبار نطاق'},
 full:{n:180,min:240,label:'محاكاة كاملة',breaks:[{after:10,min:10},{after:94,min:10}]},
 wrong:{n:30,min:45,label:'بنك أخطائك'}};
const BAND={ab:{ar:'فوق المستهدف',en:'Above Target'},tg:{ar:'المستهدف',en:'Target'},
  bl:{ar:'دون المستهدف',en:'Below Target'},ni:{ar:'يحتاج تحسيناً',en:'Needs Improvement'}};
const bandOf=p=>p>=80?'ab':p>=65?'tg':p>=50?'bl':'ni';
const domOf=q=>q.d==='E'?'people':q.d==='B'?'business':'process';
/* لغة السؤال: تتبع الواجهة، ويقلبها زر الترجمة لكل سؤال */
const qL=i=>{ const k=(i==null?(S?S.idx:0):i);
  const base=isAr()?'ar':'en';
  return (S&&S.trx&&S.trx[k]) ? (base==='ar'?'en':'ar') : base; };
const QT=(q,i)=>{ const l=qL(i);
  return l==='ar' ? (q.qa||q.qe||'') : (q.qe||q.qa||''); };
const QO=(q,i)=>{ const l=qL(i);
  const a=l==='ar'?q.oa:q.oe;
  return (a&&a.length)?a:((l==='ar'?q.oe:q.oa)||[]); };
const QX=(q,i)=>{ const l=qL(i);
  return l==='ar' ? (q.xa||q.xe||'') : (q.xe||q.xa||''); };
const hasAlt=q=>{ const ar=!!(q.qa&&q.oa&&q.oa.length>=2), en=!!(q.qe&&q.oe&&q.oe.length>=2);
  return ar&&en; };
const fmt=s=>{s=Math.max(0,Math.round(s));const h=s/3600|0,m=(s%3600)/60|0,x=s%60;
  return (h?h+':':'')+String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')};
const shuf=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.random()*(i+1)|0;
  [x[i],x[j]]=[x[j],x[i]]}return x};

const I=window.I18; I.init();
const t=(k,v)=>I.get(k,v), nv=k=>I.nv(k);
const LA=()=>I.L, isAr=()=>I.L==='ar';
const pick=(ar,en)=>isAr()?ar:(en||ar);
let page='home', day='1', S=null, PEND=null, T=null, fsz=16;
/* ═══ وضع المدرّب — الإدارة مخفية افتراضياً ═══ */
const TRAINER={
  code:'somu2026',                       /* غيّره قبل النشر */
  on(){ return D_.get('trainer',false)===true },
  unlock(c){ if(String(c||'').trim().toLowerCase()===this.code){
      D_.set('trainer',true); return true } return false },
  lock(){ D_.del('trainer') }
};
/* فتح بالرابط: ...#trainer=somu2026 */
(function(){ try{
  const h=location.hash||'';
  const m=h.match(/trainer=([^&]+)/);
  if(m&&TRAINER.unlock(decodeURIComponent(m[1]))){
    history.replaceState(null,'',location.pathname+location.search); }
}catch(e){} })();
const SECMAP={exams:'ex',stats:'ex',content:'tr',acts:'tr',sim:'tr',fb:'tr',
  life:'ap',admin:'ap',home:'ex'};
const SEC=()=>SECMAP[page]||'ex';
let ai={open:false,msgs:[]}, sim={id:null,step:0,ans:{},done:{}};
document.body.setAttribute('data-pmsg', I.get('protectMsg'));
const LOGO=`<div class="lg-mark">SOM<i>U</i><u></u></div>`;

function setFs(d2){fsz=Math.max(13,Math.min(22,fsz+d2));
  document.documentElement.style.setProperty('--fs',fsz+'px');
  const e=$('#fsv');if(e)e.textContent=fsz+'px'}

/* ═══ الترويسة ═══ */
function header(){
  return `<div class="top">
    <div class="logo">${LOGO}
      <div class="lg-t"><b>SOMU INTERNATIONAL</b><span>TRAINING CENTRE</span></div></div>
    <span class="sp"></span>
    <div class="fsz"><button data-fs="-1">A−</button><span id="fsv">${fsz}px</span>
      <button data-fs="1">A+</button></div>
    ${TRAINER.on()?`<button class="pill tr-on" id="trLock"
      title="${isAr()?'اخرج من وضع المدرّب':'Exit trainer mode'}">
      🔓 ${isAr()?'وضع المدرّب':'Trainer mode'}</button>`:''}
    <button class="pill" id="langT" title="Language">${isAr()?'🇬🇧 English':'🇸🇦 العربية'}</button>
    <span class="pill">PMP® · 13&ndash;17 Sept 2026</span>
  </div>
  <nav class="nav3">${[
    ['ex','🎯',isAr()?'الاختبارات':'Examinations',['exams','stats']],
    ['tr','📚',isAr()?'المحتوى وخطة الاجتياز':'Content & Pass Plan',['content','acts','sim','fb']],
    ['ap','⚙️',isAr()?'النظام التطبيقي':'Applied System',['life','admin']]
  ].map(([k,ic,lb,pgs])=>`<button class="n3" data-sec="${k}"
    aria-current="${pgs.includes(page)}">${ic} ${esc(lb)}</button>`).join('')}</nav>
  <nav class="nav">${({
    ex:[['exams','🎯'],['stats','📈']],
    tr:[['content','📚'],['acts','🧩'],['sim','🎮'],['fb','⚓']],
    ap:TRAINER.on()?[['life','🔄'],['admin','⚙️']]:[['life','🔄']]
  }[SEC()]||[]).map(([k,ic])=>
    `<button data-page="${k}" aria-current="${page===k}">${ic} ${esc(nv(k))}</button>`).join('')}
  <button data-page="home" aria-current="${page==='home'}"
    style="margin-inline-start:auto">🏠</button></nav>
  <div style="text-align:center;padding:6px;font-size:.7rem;color:var(--mut);
    background:#fff;border-bottom:1px solid var(--line)">${esc(t('credit'))}</div>`;
}

/* ═══ الرئيسة ═══ */
function pHome(){
  const ws=D_.get('ws',{})||{}, done=Object.keys(ws).filter(k=>(ws[k]||'').trim()).length;
  const at=(D_.get('attempts',[])||[]);
  return `<div class="hero">
    <span class="k">SOMU INTERNATIONAL TRAINING CENTRE</span>
    <h1>Project Management Skills</h1>
    <p><span class="iso">PMP® Exam Preparation</span> — ${esc(t('sub'))}</p>
    <div class="stats">
      <div class="st"><b class="m">5</b><span>${esc(t('days'))}</span></div>
      <div class="st"><b class="m">${MODS.length}</b><span>${esc(t('mods'))}</span></div>
      <div class="st"><b class="m">${ACTS.length}</b><span>${esc(t('actsN'))}</span></div>
      <div class="st"><b class="m">${SIMS.length}</b><span>${esc(t('simsN'))}</span></div>
      <div class="st"><b class="m">${Q.filter(x=>x.dayset===1).length}</b><span>${esc(t('qsN'))}</span></div>
    </div>
    <div class="bars"><i style="background:var(--violet)"></i><i style="background:var(--green)"></i>
      <i style="background:var(--orange)"></i><i style="background:var(--sky)"></i></div>
  </div>

  <h2 class="sec">${esc(t('fiveDays'))}</h2>
  <div class="grid g3">${Object.entries(DAYS).map(([d2,v])=>{
    const m=MODS.filter(x=>x.d===d2).length, a=ACTS.filter(x=>x.d===d2).length;
    const qn=Q.filter(x=>x.day===d2&&x.dayset===1).length;
    return `<div class="card link" data-day="${d2}" style="border-top:4px solid ${v.c}">
      <h3>${esc(t('day'))} ${d2}</h3>
      <p>${esc(pick(v.t,v.e))}</p>
      <div class="meta"><span class="tag s">${m} ${esc(t('module'))}</span><span class="tag g">${a} ${esc(t('activity'))}</span>
        <span class="tag o">${qn} ${esc(t('question'))}</span></div></div>`;}).join('')}
  </div>

  <h2 class="sec">${esc(t('startHere'))}</h2>
  <div class="grid g3">
    <div class="card link" data-page2="content"><h3>📚 ${esc(nv('content'))}</h3>
      <p>${esc(t('contentD',{n:MODS.length}))}</p></div>
    <div class="card link" data-page2="acts"><h3>🧩 ${esc(nv('acts'))}</h3>
      <p>${esc(t('actsD',{n:ACTS.length}))}</p>
      <div class="meta"><span class="tag g">${done} ${esc(t('saved'))}</span></div></div>
    <div class="card link" data-page2="sim"><h3>🎮 ${esc(nv('sim'))}</h3>
      <p>${esc(t('simD'))}</p></div>
    <div class="card link" data-page2="exams"><h3>🎯 ${esc(nv('exams'))}</h3>
      <p>${esc(t('examD'))}</p>
      <div class="meta">${at.length?`<span class="tag s">${at.length} ${esc(t('attempts'))}</span>`:''}</div></div>
    <div class="card link" data-page2="fb"><h3>⚓ ${esc(nv('fb'))}</h3>
      <p>${esc(t('fbD'))}</p></div>
    <div class="card link" data-page2="stats"><h3>📈 ${esc(nv('stats'))}</h3>
      <p>${esc(t('statsD'))}</p></div>
  </div>`;
}

/* ═══ المحتوى اليومي ═══ */
function dayRail(){
  return `<div class="dayrail">${Object.entries(DAYS).map(([d2,v])=>
    `<button class="dtab" data-day="${d2}" aria-current="${day===d2}"
      style="${day===d2?`border-top-color:${v.c}`:''}">
      <span class="n">DAY ${d2}</span><b>${esc(t('day'))} ${d2}</b>
      <span>${esc(pick(v.t,v.e))}</span></button>`).join('')}</div>`;
}
function pContent(){
  const ms=MODS.filter(m=>m.d===day);
  const CLS={'مثال محلول':'we','أخطاء شائعة':'ex','التطبيق على FRIGATE BRAVO':'fb',
    'قواعد عملية':'tp','تنبيه الاختبار':'we','Worked example':'we','Common mistakes':'ex'};
  return `<div class="hero" style="padding:22px">
    <span class="k">DAY ${day}</span>
    <h1 style="font-size:1.32rem">${esc(pick(DAYS[day].t,DAYS[day].e))}</h1>
    <p class="iso" style="font-size:.83rem">${esc(DAYS[day].e)}</p></div>
  ${dayRail()}
  ${ms.length?ms.map((m,i)=>`<article class="mod">
    <div class="mod-h" data-mod="${i}" aria-expanded="false">
      <span class="mod-n">${esc(m.n)}</span>
      <b class="${ec(m.t).trim()}">${esc(m.t)}</b>
      <span class="tag s">${m.s.length} ${esc(t('section'))}</span>
      <span class="ar">›</span></div>
    <div class="mod-b" id="mb${i}">
      ${m.s.map(s=>`<div class="msec ${CLS[s.h]||''}">
        <h4>${esc(secN(s.h))}</h4>
        ${s.p.map(p=>`<p class="${ec(p).trim()}">${md(p)}</p>`).join('')}</div>`).join('')}
      <div style="display:flex;gap:8px;margin-top:15px;flex-wrap:wrap">
        <button class="btn p" style="padding:8px 15px;font-size:.82rem"
          data-modq="${day}">${esc(t('testThis'))}</button>
        <button class="btn o" style="padding:8px 15px;font-size:.82rem"
          data-askmod="${esc(m.n)}">${esc(t('askAI'))}</button></div>
    </div></article>`).join('')
  :`<div class="empty"><b>${esc(t('noMods'))}</b>${esc(t('forThisDay'))}</div>`}`;
}

/* ═══ الأنشطة ═══ */
function pActs(){
  const as=ACTS.filter(a=>a.d===day||day==='all');
  const ws=D_.get('ws',{})||{};
  return `<div class="hero" style="padding:22px">
    <span class="k">ACTIVITY WORKBOOK</span>
    <h1 style="font-size:1.3rem">${esc(t('actsTitle',{d:day}))}</h1>
    <p>${esc(t('actsSub',{n:as.length}))}</p></div>
  ${dayRail()}
  <div style="display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap">
    <button class="btn o" data-day="all">${esc(t('showAll'))} (${ACTS.length})</button>
    <button class="btn o" id="wsExp">${esc(t('exportMine'))}</button>
    <button class="btn o" id="wsPrint">${esc(t('printA'))}</button></div>
  ${as.map(a=>{const k='a'+a.n, has=(ws[k]||'').trim();
    return `<article class="act">
    <div class="act-h" data-act="${a.n}" aria-expanded="false">
      <span class="act-n">${a.n}</span><b class="${ec(a.t).trim()}">${esc(a.t)}</b>
      <span class="tag">${esc(t('day'))} ${a.d}</span>
      ${has?`<span class="tag g">${esc(t('complete'))}</span>`:''}
      <span class="ar">›</span></div>
    <div class="act-b" id="ab${a.n}">
      ${a.s.map(s=>`<div class="msec ${s.h==='السيناريو'?'fb':s.h==='البيانات المعطاة'?'tp':''}">
        <h4>${esc(secN(s.h))}</h4>
        ${s.p.map(p=>`<p class="${ec(p).trim()}">${md(p)}</p>`).join('')}</div>`).join('')}
      <div class="ws"><h4>${esc(t('wsTitle'))}</h4>
        <textarea data-ws="${k}" placeholder="${esc(t('wsPh'))}">${esc(ws[k]||'')}</textarea>
        <div class="ws-f">
          <button class="btn g" style="padding:7px 14px;font-size:.81rem" data-wssave="${k}">${esc(t('save'))}</button>
          <button class="btn s" style="padding:7px 14px;font-size:.81rem"
            data-wsgen="${k}" data-gt="${esc(a.t)}">${esc(t('gen'))}</button>
          <button class="btn o" style="padding:7px 14px;font-size:.81rem" data-askact="${a.n}">
            ${esc(t('reviewMine'))}</button>
          <span class="ws-st" id="st${k}">${has?esc(t('savedS')):esc(t('notSaved'))}</span></div></div>
    </div></article>`;}).join('')}`;
}

/* ═══ ملف المشروع ═══ */
function pFB(){
  return `<div class="hero" style="padding:24px">
    <span class="k">PROGRAMME FILE</span>
    <h1 style="font-size:1.35rem">⚓ Project FRIGATE BRAVO</h1>
    <p>${esc(t('fbIntro'))}</p></div>
  <div class="card" style="padding:24px">
    ${FB.map(b=>{
      if(b.k==='tbl'){const r=b.rows;
        return `<div class="tscroll"><table class="tbl">
          <thead><tr>${r[0].map(c=>`<th class="${ec(c).trim()}">${md(c)}</th>`).join('')}</tr></thead>
          <tbody>${r.slice(1).map(row=>`<tr>${row.map(c=>`<td class="${ec(c).trim()}">${md(c)}</td>`).join('')}</tr>`).join('')}
          </tbody></table></div>`;}
      if(b.k==='h') return `<h4 style="font-size:1rem;font-weight:600;color:var(--navy);
        margin:20px 0 9px;padding-inline-start:11px;border-inline-start:3px solid var(--sky)"
        class="${ec(b.t).trim()}">${md(b.t)}</h4>`;
      return `<p class="${ec(b.t).trim()}" style="font-size:.89rem;line-height:1.95;margin-bottom:9px">${md(b.t)}</p>`;
    }).join('')}
  </div>`;
}

/* ═══ المحاكاة ═══ */
function pSim(){
  if(sim.id){
    const s=SIMS.find(x=>x.id===sim.id);
    if(!s){sim.id=null;return pSim()}
    const st=s.steps[sim.step];
    if(!st) return simDone(s);
    const a=sim.ans[sim.step];
    const ok=a!=null && a===st.c;
    return `<div class="hero" style="padding:22px">
      <span class="k">APPLIED SIMULATION · DAY ${s.day}</span>
      <h1 style="font-size:1.3rem">${esc(pick(s.t,s.te))}</h1>
      <p>${esc(t('decision'))} ${sim.step+1} ${esc(t('of'))} ${s.steps.length}</p></div>
    <div class="simbar">${s.steps.map((_,i)=>`<i class="${
      i<sim.step?'done':i===sim.step?'cur':''}"></i>`).join('')}</div>
    <div class="sim">
      ${sim.step===0?`<div class="note i" style="margin-bottom:15px">${md(SIN(s))}</div>`:''}
      ${sim.step>0&&SNX(s.steps[sim.step-1])
        ? `<div class="note g" style="margin-bottom:15px">${md(SNX(s.steps[sim.step-1]))}</div>`:''}
      <div class="sim-h"><b class="${ec(SQ(st)).trim()}">${md(SQ(st))}</b></div>
      <div class="decision">${SO(st).map((o,i)=>{
        let cl=''; if(a!=null){ if(i===st.c)cl='ok'; else if(i===a)cl='no'; }
        return `<button class="dopt ${cl}" data-dopt="${i}" ${a!=null?'disabled':''}>
          <b style="color:var(--navy)">${K[i]}.</b> ${esc(o)}</button>`;}).join('')}</div>
      ${a!=null?`<div class="dfb ${ok?'ok':'no'}">
        <b>${ok?esc(t('rightD')):esc(t('wrongD'))}</b>
        <p class="${ec(SFB(st)[a]).trim()}">${md(SFB(st)[a])}</p>
        ${!ok?`<p class="${ec(SFB(st)[st.c]).trim()}" style="margin-top:9px">${md(SFB(st)[st.c])}</p>`:''}</div>
        <div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap">
          ${sim.step<s.steps.length-1
            ?`<button class="btn p" id="simNext">${esc(t('nextD'))}</button>`
            :`<button class="btn g" id="simNext">${esc(t('finishSim'))}</button>`}
          <button class="btn o" id="simExit">${esc(t('simExit'))||''}${esc(t('exitS'))}</button>
          <button class="btn o" data-asksim="${s.id}">${esc(t('askSim'))}</button></div>`:''}
    </div>`;
  }
  const dn=D_.get('simdone',{})||{};
  return `<div class="hero" style="padding:24px">
    <span class="k">APPLIED SIMULATION</span>
    <h1 style="font-size:1.35rem">${esc(t('simTitle'))}</h1>
    <p>${esc(t('simSub'))}</p></div>
  <div class="grid g3">${SIMS.map(s=>`<div class="card link" data-sim="${s.id}"
    style="border-top:4px solid ${DAYS[s.day].c}">
    <h3>${esc(pick(s.t,s.te))}</h3>
    ${isAr()?`<p class="iso" style="font-size:.8rem">${esc(s.te)}</p>`:''}
    <div class="meta"><span class="tag">${esc(t('day'))} ${s.day}</span>
      <span class="tag s">${s.steps.length} ${esc(t('decisions'))}</span>
      ${dn[s.id]!=null?`<span class="tag g">✓ ${dn[s.id]}/${s.steps.length}</span>`:''}</div>
  </div>`).join('')}</div>`;
}
function simDone(s){
  const right=s.steps.filter((st,i)=>sim.ans[i]===st.c).length;
  const dn=D_.get('simdone',{})||{}; dn[s.id]=right; D_.set('simdone',dn);
  const pct=Math.round(right/s.steps.length*100);
  return `<div class="hero" style="padding:26px;text-align:center">
    <div style="font-size:2.4rem">${pct>=80?'🏆':pct>=60?'👍':'📘'}</div>
    <h1 style="font-size:1.4rem">${esc(pick(s.t,s.te))}</h1>
    <p>${esc(t('youGot'))} <b class="m" style="color:var(--sky)">${right}</b> ${esc(t('of'))}
      ${s.steps.length} — ${pct}%</p></div>
  <div class="card"><h3>${esc(t('summary'))}</h3>
    ${s.steps.map((st,i)=>{const ok=sim.ans[i]===st.c;
      return `<div class="rv-o ${ok?'c':'s'}" style="margin-top:8px">
        <div class="rv-oh"><span class="rv-l">${i+1}</span>
          <span class="rv-t">${esc(SQ(st).split('\n')[0].slice(0,90))}…</span>
          <span class="fbv ${ok?'y':'n'}">${ok?esc(t('correct')):esc(t('wrong'))}</span></div></div>`;}).join('')}
    <div style="display:flex;gap:9px;margin-top:16px;flex-wrap:wrap">
      <button class="btn p" id="simRetry">${esc(t('retryS'))}</button>
      <button class="btn o" id="simExit">${esc(t('allSims'))}</button></div></div>`;
}

/* ═══ الاختبارات ═══ */
function pExams(){
  const wb=D_.get('wrongbank',[])||[];
  const r=hasResume();
  return `<div class="hero" style="padding:24px">
    <span class="k">EXAMINATIONS</span>
    <h1 style="font-size:1.35rem">${esc(t('examsTitle'))}</h1>
    <p>${esc(t('examsSub'))}</p></div>
  ${r?`<div class="note w" style="margin-bottom:14px;display:flex;align-items:center;gap:13px;flex-wrap:wrap">
    <span style="font-size:1.5rem">⏸</span>
    <div style="flex:1;min-width:180px"><b>${esc(t('incomplete'))}</b><br>
      ${esc(r.title)} · ${Object.keys(r.ans||{}).filter(k=>r.ans[k]!=null).length} ${esc(t('of'))} ${r.ids.length}
      · ${fmt(r.left)} ${esc(t('remaining'))}</div>
    <button class="btn p" id="rsGo">${esc(t('resume'))}</button>
    <button class="btn o" id="rsX">🗑</button></div>`:''}
  ${wb.length>=5?`<div class="note i" style="margin-bottom:14px;display:flex;align-items:center;gap:13px;flex-wrap:wrap">
    <span style="font-size:1.5rem">🎯</span>
    <div style="flex:1;min-width:180px"><b>${esc(t('wbankT',{n:wb.length}))}</b><br>
      ${esc(t('wbankD'))}</div>
    <button class="btn p" id="wbGo">${esc(t('start'))}</button></div>`:''}

  <h2 class="sec">${esc(t('dayExams'))}</h2>
  <div class="grid g3">${Object.entries(DAYS).map(([d2,v])=>{
    const n=Q.filter(x=>x.day===d2&&x.dayset===1).length;
    return `<div class="card link" data-exday="${d2}" style="border-top:4px solid ${v.c}">
      <h3>${esc(t('day'))} ${d2}</h3><p>${esc(pick(v.t,v.e))}</p>
      <div class="meta"><span class="tag s">60 ${esc(t('question'))}</span>
        <span class="tag">80 ${esc(t('min'))}</span>
        <span class="tag">${n} ${esc(t('avail'))}</span></div>
      <div style="margin-top:10px;padding-top:9px;border-top:1px solid var(--line)">
        <div style="font-size:.72rem;color:var(--mut);margin-bottom:5px">${
          isAr()?'المحاور':'Axes'}</div>
        ${[...new Set(Q.filter(x=>x.day===d2&&x.dayset===1).map(x=>x.ax).filter(Boolean))].sort()
          .map(a=>`<span class="tag" style="font-size:.68rem;margin:2px">${esc(a)} ${
            esc(axn(a).slice(0,26))}</span>`).join('')}</div></div>`;}).join('')}
  </div>

  <h2 class="sec">${esc(t('domExams'))}</h2>
  <div class="grid g3">${Object.entries(ECO).map(([k,v])=>{
    const n=Q.filter(x=>domOf(x)===k).length;
    return `<div class="card link" data-exdom="${k}">
      <h3>${esc(pick(v.ar,v.en))}</h3>
      <p class="iso" style="font-size:.8rem">${esc(v.en)} — ${v.w}%</p>
      <div class="meta"><span class="tag s">40 ${esc(t('question'))}</span>
        <span class="tag">${n} ${esc(t('avail'))}</span></div>
    </div>`;}).join('')}
  </div>

  <h2 class="sec">${esc(t('fullMocks'))}</h2>
  <div class="grid g2">
    ${[1,2,3].map(i=>`<div class="card link" data-exfull="${i}">
      <h3>🏆 ${esc(t('fullMocks'))} ${i}</h3>
      <p>${esc(t('fullD'))}</p>
      <div class="meta"><span class="tag g">${esc(t('official'))}</span>
        <span class="tag o">${esc(t('twoBreaks'))}</span>
        <span class="tag v">${esc(t('pmiRep'))}</span></div>
    </div>`).join('')}
  </div>`;
}

/* ═══ الإرشادات ═══ */
function intro(){
  const sp=SPEC[PEND.kind]||SPEC.day, ar=isAr();
  const W=window.EXAMSETUP, st=PEND.setup||(PEND.setup={step:0});
  const steps=W.steps.filter(x=>!x.onlyIf||Object.keys(x.onlyIf).every(k=>st[k]===x.onlyIf[k]));
  const cur=steps[st.step];
  if(cur) return `<div class="navov"><div class="navp" style="max-width:660px">
    <div class="navh">${LOGO}<b style="margin-inline-start:9px">${esc(PEND.title)}</b>
      <button class="pop-x" id="ix">✕</button></div>
    <div class="wz">
      <div class="wz-bar">${steps.map((x,i)=>`<div class="wz-s${
        i<st.step?' done':i===st.step?' on':''}">
        <span>${x.ic}</span><b>${esc(x.t[ar?0:1])}</b></div>`).join('')}</div>
      <h3 class="wz-q">${esc(cur.t[ar?0:1])}</h3>
      <p class="wz-d">${esc(cur.d[ar?0:1])}</p>
      <div class="wz-o">${cur.o.map(o=>`<button class="wz-c${st[cur.k]===o[0]?' on':''}"
        data-wz="${cur.k}|${o[0]}">
        <span class="wz-i">${o[1]}</span>
        <b>${esc(ar?o[2]:o[3])}</b>
        <span class="wz-h">${esc(ar?o[4]:o[5])}</span></button>`).join('')}</div>
      <div style="display:flex;gap:9px;margin-top:18px;flex-wrap:wrap">
        ${st.step>0?`<button class="btn o" id="wzBack">${ar?'◀ السابق':'◀ Back'}</button>`:''}
        <button class="btn o" id="ic">${esc(t('cancel'))}</button>
      </div>
    </div></div></div>`;
  /* شاشة التأكيد */
  const proc=st.mode==='online'&&st.proctor==='on';
  return `<div class="navov"><div class="navp" style="max-width:620px">
    <div class="navh">${LOGO}<b style="margin-inline-start:9px">${esc(PEND.title)}</b>
      <button class="pop-x" id="ix">✕</button></div>
    <div class="wz">
      <div class="wz-sum">
        <div><span>${ar?'اللغة':'Language'}</span><b>${st.lang==='ar'?'العربية':'English'}</b></div>
        <div><span>${ar?'المكان':'Location'}</span>
          <b>${st.mode==='center'?(ar?'مركز اختبار':'Test centre'):(ar?'عبر الإنترنت':'Online')}</b></div>
        <div><span>${ar?'المراقبة':'Proctoring'}</span>
          <b class="${proc?'r':''}">${proc?(ar?'🔴 كاملة':'🔴 Full')
            :(ar?'بلا مراقبة':'None')}</b></div>
      </div>
      <div class="frow" style="margin:16px 0">
        <label style="display:block;font-size:.82rem;color:var(--mut);margin-bottom:5px">
          ${esc(t('learner'))}</label>
        <input class="lf-in" id="lname" value="${esc(D_.get('name','')||'')}"
          placeholder="${esc(t('learnerPh'))}"></div>
      <div class="note i" style="margin-bottom:12px">
        <b>${sp.n} ${esc(t('question'))} · ${sp.min} ${esc(t('min'))}</b>
        ${sp.breaks?`<br>${ar
          ?'أول ١٠ أسئلة سيناريو · استراحة ١٠ دقائق · ثم ١١–٩٤ · استراحة ١٠ دقائق · ثم ٩٥–١٨٠'
          :'First 10 scenario questions · 10-min break · then 11–94 · 10-min break · then 95–180'}`:''}</div>
      ${proc?`<div class="note r" style="margin-bottom:12px">
        <b>${ar?'📹 شروط المراقبة':'📹 Proctoring conditions'}</b><br>
        ${ar?'الكاميرا تعمل طوال الاختبار · ابقَ وحدك في الغرفة · لا تغادر الشاشة · لا نسخ ولا طباعة.<br><b>المراقب سينبّهك صوتياً عند أي مخالفة، وتراكمها قد يُبطل اختبارك.</b>'
          :'The camera stays on · remain alone in the room · do not leave the screen · no copying or printing.<br><b>The invigilator will warn you aloud on any violation; accumulation may void your exam.</b>'}
      </div>`:''}
      <div class="note w" style="margin-bottom:15px">${esc(t('rules'))}</div>
      <div style="display:flex;gap:9px">
        <button class="btn p lg" id="go">${proc?(ar?'🔴 ابدأ الاختبار المراقَب':'🔴 Start proctored exam')
          :esc(t('start'))}</button>
        <button class="btn o" id="wzBack">${ar?'◀ السابق':'◀ Back'}</button>
        <button class="btn o" id="ic">${esc(t('cancel'))}</button>
      </div>
    </div></div></div>`;
}

/* ═══ بناء الاختبار ═══ */
function pool(p){
  if(p.kind==='wrong'){const wb=new Set(D_.get('wrongbank',[])||[]);return Q.filter(q=>wb.has(q.i))}
  if(p.day) return Q.filter(q=>q.day===p.day && q.dayset===1);
  if(p.dom) return Q.filter(q=>domOf(q)===p.dom);
  return Q;
}
function build(p){
  const sp=SPEC[p.kind]||SPEC.day;
  const sh=q=>{ const n=Math.max((q.oa||[]).length,(q.oe||[]).length); if(n<2)return q;
    const ord=shuf([...Array(n).keys()]);
    const pk=a=>a&&a.length===n?ord.map(k=>a[k]):a;
    const nc=(q.c||[]).map(o=>ord.indexOf(o)).filter(x=>x>=0).sort((a,b)=>a-b);
    const rm=t=>{if(!t)return t;const m={};ord.forEach((o,i)=>m[K[o]]=K[i]);
      return t.replace(/([«"'‹])\s*([A-H])\s*([»"'›])/g,(x,a,L,b)=>a+(m[L]||L)+b)};
    return {...q,oa:pk(q.oa),oe:pk(q.oe),c:nc.length?nc:q.c,xa:rm(q.xa),xe:rm(q.xe)};
  };
  let pl=pool(p).filter(q=>isAr()?(q.qa&&q.oa&&q.oa.length>=2):(q.qe&&q.oe&&q.oe.length>=2));
  if(pl.length<5) pl=pool(p);
  let items=[];
  /* المحاكاة الكاملة: 10 أسئلة سيناريو أولاً من حالتين */
  let head=[];
  if(p.kind==='full'){
    const pair=MOCKC[((+p.mock||1)-1)%MOCKC.length];
    pair.forEach(cid=>{ const c=CASES.find(x=>x.id===cid); if(!c)return;
      c.qs.forEach((cq,k)=>head.push({ caseRef:c, caseFirst:k===0,
        q:{ i:c.id+'-'+k, s:'C', t:'scenario', d:c.d, ch:'', tk:'', day:'', ax:c.ax,
            qa:cq.q[0], qe:cq.q[1],
            oa:cq.o.map(o=>o[0]), oe:cq.o.map(o=>o[1]),
            c:[cq.c], xa:cq.x[0], xe:cq.x[1] } })); });
  }
  if(!p.day&&!p.dom&&p.kind!=='wrong'){
    const used=new Set(head.map(h=>h.q.i));
    pl=pl.filter(q=>!used.has(q.i));
    const need=Math.min(sp.n-head.length,pl.length);
    Object.entries(ECO).forEach(([k,v])=>{
      items=items.concat(shuf(pl.filter(q=>domOf(q)===k)).slice(0,Math.round(need*v.w/100)))});
    if(items.length<need) items=items.concat(shuf(pl.filter(q=>!items.includes(q))).slice(0,need-items.length));
    items=shuf(items);
  } else if(p.day){
    /* توزيع متوازن على محاور اليوم — لا عشوائي من كل اليوم */
    const axs=[...new Set(pl.map(q=>q.ax).filter(Boolean))].sort();
    if(axs.length>1){
      const per=Math.ceil(sp.n/axs.length);
      const buckets=axs.map(a=>shuf(pl.filter(q=>q.ax===a)));
      /* دورة على المحاور بالتساوي حتى يكتمل العدد */
      let i2=0;
      while(items.length<Math.min(sp.n,pl.length)){
        let added=false;
        for(const bk of buckets){ if(items.length>=sp.n)break;
          if(bk[i2]){items.push(bk[i2]);added=true} }
        if(!added)break; i2++;
      }
      items=shuf(items);
    } else items=shuf(pl).slice(0,sp.n);
  } else items=shuf(pl).slice(0,sp.n);
  const flat = head.concat(items.map(q=>({q})));
  return { kind:p.kind, title:p.title, learner:p.learner||t('trainee'),
    items:flat.map(f=>({...f, q:sh(f.q)})), ans:{},flags:{},struck:{},checked:{},
    idx:0, total:sp.min*60, left:sp.min*60, breaks:sp.breaks||[], doneBrk:new Set(),
    onBreak:false, brkLeft:0, calc:false, wb:false, nav:false, navF:'all',
    calcVal:'0', submitted:false, result:null, rvF:'all', rvOpen:false, trx:{}, caseOpen:{} };
}
function snap(){ if(!S||S.submitted)return;
  D_.set('resume',{kind:S.kind,title:S.title,learner:S.learner,
    ids:S.items.map(x=>x.q.i),
    opts:S.items.map(x=>({oa:x.q.oa,oe:x.q.oe,c:x.q.c,xa:x.q.xa,xe:x.q.xe})),
    ans:S.ans,flags:S.flags,struck:S.struck,checked:S.checked,idx:S.idx,left:S.left,
    total:S.total,breaks:S.breaks,doneBrk:[...S.doneBrk],at:Date.now()}); }
function hasResume(){const r=D_.get('resume',null);
  return (r&&r.ids&&r.ids.length&&(Date.now()-r.at)<1000*60*60*36)?r:null}
function doResume(){const r=hasResume(); if(!r)return false;
  const items=r.ids.map((id,k)=>{let q=Q.find(x=>x.i===id)||
    {i:id,t:'mcq',d:'R',ch:'',tk:'',day:'1',qe:'',qa:'',oe:[],oa:[],c:[],xe:'',xa:''};
    const o=r.opts[k]||{};
    return {q:{...q,oa:o.oa||q.oa,oe:o.oe||q.oe,c:o.c||q.c,xa:o.xa||q.xa,xe:o.xe||q.xe}}});
  S={kind:r.kind,title:r.title,learner:r.learner,items,ans:r.ans||{},flags:r.flags||{},
    struck:r.struck||{},checked:r.checked||{},idx:r.idx||0,total:r.total,left:r.left,
    breaks:r.breaks||[],doneBrk:new Set(r.doneBrk||[]),onBreak:false,brkLeft:0,
    calc:false,wb:false,nav:false,navF:'all',calcVal:'0',submitted:false,result:null,
    rvF:'all',rvOpen:false};
  tick(); render(); return true;
}
function tick(){ clearInterval(T);
  T=setInterval(()=>{ if(!S||S.submitted){clearInterval(T);return}
    if(S.onBreak){S.brkLeft--; if(S.brkLeft<=0){S.onBreak=false;render()}
      else{const e=$('#bt');if(e)e.textContent=fmt(S.brkLeft)} return}
    S.left--; if(S.left%20===0) snap();
    if(S.proctored&&window.PROCTOR&&S.left%15===0) window.PROCTOR.tick();
    const e=$('#tm'); if(e){e.textContent=fmt(S.left);
      e.parentElement.className='xb-t'+(S.left<300?' d':S.left<900?' w':'')}
    if(S.left<=0) submit(true);
  },1000);
}
const needed=q=>(q.c||[]).length||1;
function isRight(q,a){ if(a==null)return false;
  const c=(q.c||[]).slice().sort();
  if(Array.isArray(a)) return a.length===c.length&&a.slice().sort().every((v,k)=>v===c[k]);
  return c.length===1&&a===c[0] }

/* ═══ شاشة الاختبار ═══ */
function runner(){
  const it=S.items[S.idx]; if(!it)return `<div class="empty"><b>${esc(t('noQs'))}</b></div>`;
  const q=it.q, opts=QO(q,S.idx), a=S.ans[S.idx];
  const n=needed(q), multi=n>1, ck=S.checked[S.idx];
  const ansd=Object.keys(S.ans).filter(k=>S.ans[k]!=null).length;
  return `<div class="ex">
    <div class="ex-bar">
      <div class="xb-brand">${LOGO}
        <div><b>${esc(S.learner)}</b><span>${esc(S.title)}</span></div></div>
      <div class="xb-q"><span>${esc(t('qOf'))}</span><b class="m">${S.idx+1}</b><em>/ ${S.items.length}</em></div>
      <div class="xb-t${S.left<300?' d':S.left<900?' w':''}">
        <span>${esc(t('timeLeft'))}</span><b class="m" id="tm">${fmt(S.left)}</b></div>
      <span class="sp"></span>
      <button class="bt${S.wb?' on':''}" id="wbb">🖊 <span>${esc(t('wbBtn'))}</span></button>
      <button class="bt${S.calc?' on':''}" id="calc">🧮 <span>${esc(t('calcBtn'))}</span></button>
      <button class="bt" id="trq" ${hasAlt(q)?'':'disabled'}
        title="${isAr()?'ترجمة هذا السؤال':'Translate this question'}">🌐
        <span>${qL(S.idx)==='ar'?'EN':'AR'}</span></button>
      <button class="bt" id="aib">🤖 <span>${esc(t('aiBtn'))}</span></button>
      <button class="bt" id="check">✅ <span>${esc(t('checkBtn'))}</span></button>
      <div class="fsz"><button data-fs="-1">A−</button><span id="fsv">${fsz}px</span>
        <button data-fs="1">A+</button></div>
      <button class="bt flag${S.flags[S.idx]?' on':''}" id="flag">🚩 <span>${esc(t('flagBtn'))}</span></button>
    </div>
    <div class="ex-body"><div class="qw">
      ${it.caseRef?caseBox(it):''}
      <div class="qc">
      <div class="qh"><span class="qn m">${S.idx+1}</span>
        <span class="tag s">${esc(pick(ECO[domOf(q)].ar,ECO[domOf(q)].en))}</span>
        ${q.day?`<span class="tag o">${esc(t('day'))} ${q.day}</span>`:''}
        ${q.tk?`<span class="tag">${esc(t('task'))} ${esc(q.tk)}</span>`:''}
        ${q.ax?`<span class="tag v">${esc(q.ax)} · ${esc(axn(q.ax))}</span>`:''}
        ${S.trx&&S.trx[S.idx]?`<span class="tag o">${isAr()?'مترجَم':'Translated'}</span>`:''}</div>
      <div class="qtxt">${esc(QT(q,S.idx)).replace(/\n/g,'<br>')}</div>
      ${(window.QFIG&&QFIG.has(q.i))?`<div class="qfig">${QFIG.svg(q.i)}</div>`:''}
      ${multi?`<div class="pick-n">${t('pickN',{n:n})}</div>`:''}
      <div class="olist">${opts.map((o,i)=>{
        const sel=Array.isArray(a)?a.includes(i):a===i;
        const isC=(q.c||[]).includes(i), out=S.struck[S.idx+'_'+i];
        let cl=sel?'sel':''; if(ck){if(isC)cl='right';else if(sel)cl='wrong'}
        return `<div class="o ${cl}${out?' out':''}" data-o="${i}">
          <span class="mark ${multi?'box':'rad'}">${multi&&sel?'✓':''}</span>
          <span class="olt">${K[i]}.</span><span class="ot">${esc(o)}</span>
          ${ck?`<span class="vmark ${isC?'y':sel?'n':''}">${isC?'✓':sel?'✕':''}</span>`
              :`<button class="strike" data-st="${i}">✕</button>`}</div>`;}).join('')}</div>
      ${ck?fbPanel(q):''}
    </div></div></div>
    ${S.proctored?`<div class="pmon">
      <div class="pmon-h"><span class="pmon-d"></span>
        <b>${isAr()?'مراقبة':'Proctored'}</b>
        <span class="pmon-w ${S.pWarn>=5?'r':S.pWarn>=2?'o':''}">${S.pWarn||0}</span></div>
      ${S.camErr?`<div class="pmon-e">📹<br>${isAr()?'الكاميرا مغلقة':'Camera off'}</div>`
        :`<video id="pcam" autoplay muted playsinline></video>`}
    </div>`:''}
    ${S.pMsg?`<div class="pwarn"><span>🔊</span><div>
      <b>${isAr()?'المراقب':'Invigilator'}</b><p>${esc(S.pMsg)}</p></div></div>`:''}
    ${S.calc?calcPop():''}${S.wb?wbPop():''}
    <div class="ex-foot">
      <button class="fbtn" id="sub">📄 <span>${esc(t('submitEx'))}</span></button>
      <span class="fstat">✅ <b>${ansd}</b> · ⬜ <b>${S.items.length-ansd}</b>
        · 🚩 <b>${Object.keys(S.flags).filter(k=>S.flags[k]).length}</b></span>
      <span class="sp"></span>
      <button class="fbtn" id="navb">▦ <span>${esc(t('qList'))}</span></button>
      <button class="fbtn" id="prev" ${S.idx===0?'disabled':''}>${esc(t('prev'))}</button>
      <button class="fbtn nav-next" id="next" ${S.idx===S.items.length-1?'disabled':''}>
        ${esc(t('next'))}</button></div>
    ${S.nav?navPanel():''}
  </div>`;
}
function caseBox(it){
  const c=it.caseRef; if(!c) return '';
  const open=S.caseOpen&&S.caseOpen[c.id];
  const body=qL(S.idx)==='ar'?c.body.ar:(c.body.en||c.body.ar);
  const html=esc(body).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .split('\n\n').map(p=>{
      if(p.trim().startsWith('|')){
        const rows=p.trim().split('\n').filter(r=>r.includes('|')&&!/^\|[\s:|-]+\|$/.test(r.trim()));
        if(rows.length>1) return `<div class="tscroll"><table class="tbl">
          <thead><tr>${rows[0].split('|').filter(Boolean).map(x=>`<th>${x.trim()}</th>`).join('')}</tr></thead>
          <tbody>${rows.slice(1).map(r=>`<tr>${r.split('|').filter(Boolean)
            .map(x=>`<td>${x.trim()}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      }
      return `<p>${p.replace(/\n/g,'<br>')}</p>`;}).join('');
  return `<div class="case">
    <div class="case-h"><b>📋 ${esc(qL(S.idx)==='ar'?c.t[0]:c.t[1])}</b>
      <span class="tag o">${esc(isAr()?'حالة دراسية':'Case study')}</span>
      <span class="tag">${c.qs.length} ${esc(isAr()?'أسئلة مترابطة':'linked questions')}</span></div>
    <div class="case-b${open?'':' fold'}">${html}</div>
    <button class="case-more" data-case="${esc(c.id)}">
      ${open?(isAr()?'▲ اطوِ الحالة':'▲ Collapse'):(isAr()?'▼ اقرأ الحالة كاملة':'▼ Read the full case')}</button>
  </div>`;
}
function perOption(q,i){
  const raw=QX(q,i); if(!raw)return null;
  const out={}; let m,found=false;
  const rx=/[✅❌]\s*(?:لماذا|Why)\s*[«"'‹]?\s*([A-H])\s*[»"'›]?[^:：\n]*[:：]?\s*([\s\S]*?)(?=\n*[✅❌]\s*(?:لماذا|Why)|$)/g;
  while((m=rx.exec(raw))){const k=K.indexOf(m[1].toUpperCase());
    if(k>=0){out[k]=m[2].trim();found=true}}
  if(found)return out;
  const c=(q.c||[])[0]; if(c!=null){out[c]=raw;return out}
  return null;
}
function fbPanel(q){
  const a=S.ans[S.idx], opts=QO(q,S.idx);
  const R=perOption(q,S.idx), ok=isRight(q,a);
  const gen=(!R&&QX(q,S.idx))?QX(q,S.idx):'';
  return `<div class="fbp">
    <div class="fbp-v ${ok?'ok':'no'}"><span class="fbi">${ok?'✓':'✕'}</span>
      <b>${ok?esc(t('rightA')):esc(t('wrongA'))}</b>
      <span class="fbc">${esc(t('correctIs'))}: <b>${(q.c||[]).map(k=>K[k]).join(' · ')}</b></span></div>
    <div class="fbp-b">
      ${gen?`<div class="fbs"><h4>${esc(t('explan'))}</h4><p>${esc(gen)}</p></div>`:''}
      ${R?`<div class="fbs"><h4>${esc(t('perOpt'))}</h4>${opts.map((o,i)=>{
        const isC=(q.c||[]).includes(i), sel=Array.isArray(a)?a.includes(i):a===i;
        const tx=(R[i]||'').trim();
        return `<div class="fbr${isC?' c':''}${sel&&!isC?' s':''}">
          <div class="fbr-h"><span class="fbl">${K[i]}</span>
            <span class="fbt">${esc(o)}</span>
            <span class="fbv ${isC?'y':'n'}">${isC?esc(t('isCorrect')):esc(t('isWrong'))}</span>
            ${sel?`<span class="fbu">${esc(t('yourAns'))}</span>`:''}</div>
          ${tx?`<p class="fbx">${esc(tx)}</p>`:''}</div>`;}).join('')}</div>`:''}
      ${q.tk?`<div class="fbs"><h4>${esc(t('reference'))}</h4>
        <p class="iso" style="font-size:.79rem;color:var(--mut)">PMP® ECO July 2026 —
          Task ${esc(q.tk)} · Day ${esc(q.day||'')}</p></div>`:''}
    </div></div>`;
}
function navPanel(){
  const f=S.navF||'all';
  const rows=S.items.map((it,i)=>({i,q:it.q,st:S.ans[i]!=null?'done':'none',flag:!!S.flags[i],
    txt:QT(it.q,i).slice(0,78)}));
  const show=rows.filter(r=>f==='all'||(f==='flag'&&r.flag)||
    (f==='none'&&r.st==='none')||(f==='done'&&r.st==='done'));
  return `<div class="navov" id="navov"><div class="navp">
    <div class="navh"><b>▦ ${esc(t('qList'))}</b>
      <span class="navc">${show.length} ${esc(t('of'))} ${S.items.length}</span>
      <button class="pop-x" id="navx">✕</button></div>
    <div class="navf">${[['all',t('all'),rows.length],
      ['none',t('noAns'),rows.filter(r=>r.st==='none').length],
      ['done',t('answered'),rows.filter(r=>r.st==='done').length],
      ['flag',t('flagged')+' 🚩',rows.filter(r=>r.flag).length]].map(([k,l,n])=>
      `<button class="nf${f===k?' on':''}" data-nf="${k}">${l} <b>${n}</b></button>`).join('')}</div>
    <div class="navl">${show.length?show.map(r=>`<button class="nrow${r.i===S.idx?' cur':''}"
      data-nj="${r.i}"><span class="nn m">${r.i+1}</span>
      <span class="nst ${r.st}">${r.st==='done'?'✓':'○'}</span>
      ${r.flag?'<span>🚩</span>':''}
      <span class="ntx">${esc(r.txt)}…</span>
      <span class="ntg">${esc(ECO[domOf(r.q)].ar)}</span></button>`).join('')
      :`<div class="empty" style="padding:28px"><b>${esc(t('noRes'))}</b></div>`}</div>
  </div></div>`;
}
function calcPop(){
  const F=[['CPI','EV ÷ AC'],['SPI','EV ÷ PV'],['CV','EV − AC'],['SV','EV − PV'],
    ['EAC','BAC ÷ CPI'],['ETC','EAC − AC'],['VAC','BAC − EAC'],
    ['TCPI','(BAC−EV)÷(BAC−AC)'],['PERT','(O+4M+P) ÷ 6'],[t('deviation'),'(P−O) ÷ 6'],
    [t('channels'),'n(n−1) ÷ 2'],['EMV','P × Impact']];
  return `<div class="pop"><div class="pop-h"><b>${esc(t('calcT'))}</b>
    <button class="pop-x" data-px="calc">✕</button></div>
    <input class="cd" id="cdisp" value="${esc(S.calcVal)}" readonly>
    <div class="cg">${['C','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','⌫','=']
      .map(k=>`<button class="cb${'÷×−+='.includes(k)?' op':''}${k==='C'?' fn':''}"
        data-c="${k}">${k}</button>`).join('')}</div>
    <div class="forms"><b>${esc(t('pmpForm'))}</b>${F.map(f=>`<span><b>${f[0]}</b>${f[1]}</span>`).join('')}</div>
  </div>`;
}
function wbPop(){
  return `<div class="pop wide"><div class="pop-h"><b>${esc(t('wbT'))}</b>
    <button class="pop-x" data-px="wb">✕</button></div>
    <div class="wb"><canvas id="wbc"></canvas><div class="wb-t">
      ${['#103040','#40C090','#F07000','#c0392b'].map((c,i)=>
        `<button class="sw${i===0?' on':''}" data-wbc="${c}" style="background:${c}"></button>`).join('')}
      <button data-wbs="2" class="on">${esc(t('thin'))}</button><button data-wbs="5">${esc(t('med'))}</button>
      <button data-wbs="10">${esc(t('thick'))}</button><button data-wbe="1">${esc(t('eraser'))}</button>
      <button data-wbclr="1">${esc(t('clearW'))}</button></div></div></div>`;
}
function breakView(){
  return `<div class="brk"><div class="brk-c">
    <div class="logo" style="justify-content:center;margin-bottom:13px;filter:invert(1) brightness(.3)">
      ${LOGO}</div>
    <div class="ic">☕</div><h2>${esc(t('breakT'))}</h2>
    <p>${t('breakD')}</p>
    <div class="brk-t m" id="bt">${fmt(S.brkLeft)}</div>
    <button class="btn p lg" id="bgo">${esc(t('resumeEx'))}</button></div></div>`;
}

/* ═══ التصحيح والتقرير ═══ */
function grade(){
  let right=0; const dom={},byDay={},byTask={};
  S.items.forEach((it,i)=>{ const q=it.q, ok=isRight(q,S.ans[i]); if(ok)right++;
    const d=domOf(q); dom[d]=dom[d]||{n:0,r:0}; dom[d].n++; if(ok)dom[d].r++;
    const dy=q.day||'?'; byDay[dy]=byDay[dy]||{n:0,r:0}; byDay[dy].n++; if(ok)byDay[dy].r++;
    const t=q.tk||'—'; byTask[t]=byTask[t]||{n:0,r:0}; byTask[t].n++; if(ok)byTask[t].r++;});
  const pct=Math.round(right/S.items.length*100);
  return {right,total:S.items.length,pct,passed:pct>=65,byDay,byTask,
    doms:Object.entries(ECO).map(([k,v])=>{const b=dom[k]||{n:0,r:0};
      const p=b.n?Math.round(b.r/b.n*100):0;
      return {...v,k,n:b.n,r:b.r,pct:p,band:bandOf(p)}}).filter(d=>d.n),
    mins:Math.round((S.total-S.left)/60)};
}
function logAttempt(){
  if(!S||!S.result)return; const r=S.result;
  const log=D_.get('attempts',[])||[];
  log.push({at:Date.now(),learner:S.learner,kind:S.kind,title:S.title,pct:r.pct,
    right:r.right,total:r.total,mins:r.mins,passed:r.passed,
    doms:r.doms.map(d=>({k:d.k,pct:d.pct,r:d.r,n:d.n})),tasks:r.byTask,days:r.byDay});
  D_.set('attempts',log.slice(-60));
  const wb=new Set(D_.get('wrongbank',[])||[]);
  S.items.forEach((it,i)=>{ if(isRight(it.q,S.ans[i]))wb.delete(it.q.i); else wb.add(it.q.i)});
  D_.set('wrongbank',[...wb].slice(-400));
}
function report(){
  const r=S.result, ov=bandOf(r.pct);
  const pos={ni:12.5,bl:37.5,tg:62.5,ab:87.5}[ov];
  const today=new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  return `${header()}<div class="wrap"><div class="pmi">
    <div class="pmi-hd"><div style="filter:invert(1) brightness(.25)">${LOGO}</div>
      <h1>Certification Exam Report</h1><div class="pmi-av">👤</div></div>
    <div class="pmi-bar"><div>${esc(S.learner)}</div>
      <div>Project Management Professional (PMP)®</div><div>SOMU ITC</div>
      <div>${today}</div><div>${esc(S.title)}</div></div>
    <div class="pmi-sec">
      <h2>Your Overall Score Performance:
        <span class="res${r.passed?'':' f'}">${r.passed?'Pass':'Fail'}</span></h2>
      <p>${r.passed?'Congratulations — you are tracking above the passing threshold.'
        :'Additional preparation is recommended before the real examination.'}</p>
      <div class="gauge">
        <div class="g-lbl"><span>Failing</span><span>Passing</span></div>
        <div class="g-ax"><div class="arr"></div></div>
        <div class="g-bars"><div class="g-you" style="left:${pos}%"><b>YOU</b><i></i></div>
          <div class="g-b ni"></div><div class="g-b bl"></div>
          <div class="g-b tg"></div><div class="g-b ab"></div></div>
        <div class="g-names">${['ni','bl','tg','ab'].map(k=>
          `<span class="${k===ov?'on':''}">${BAND[k].en}</span>`).join('')}</div>
      </div>
      <h3>What does this diagram mean?</h3>
      <p>The diagram uses four Performance Rating Categories to show your overall performance.
        Each rating reflects how many questions you answered correctly.</p>
      <h3>Performance Rating Categories</h3>
      <p><b>Above Target:</b> performance <b>exceeds</b> the minimum requirements.</p>
      <p><b>Target:</b> performance <b>meets</b> the minimum requirements.</p>
      <p><b>Below Target:</b> performance is <b>slightly below target</b>; additional preparation recommended.</p>
      <p><b>Needs Improvement:</b> performance is far below target; additional preparation strongly recommended.</p>
      <h3>How is your score determined?</h3>
      <p>Each scored question is worth one point. Your total places you within one rating category.</p>
      <p class="${isAr()?'ar':''}" style="color:#666;font-size:.82rem">${
        t('inThisMock',{r:r.right,n:r.total,p:r.pct,m:r.mins})}</p>
    </div>
    <div class="pmi-sec"><h2 style="font-size:1.26rem">Your Performance by Domain:</h2>
      <p>Using the same categories, your performance within each domain.</p>
      <table class="dom-tbl">
        <tr>${r.doms.map(d=>`<th>${esc(d.en)}</th>`).join('')}</tr>
        <tr>${r.doms.map(d=>`<td class="${d.band==='ni'||d.band==='bl'?'f':''}">
          ${BAND[d.band].en}</td>`).join('')}</tr>
        <tr>${r.doms.map(d=>`<td style="color:#555;font-weight:400;font-size:.81rem">
          ${d.r}/${d.n} · ${d.pct}%</td>`).join('')}</tr></table>
    </div>
    ${Object.keys(r.byDay).length>1?`<div class="pmi-sec">
      <h2 style="font-size:1.26rem">Performance by Training Day</h2>
      <table class="dom-tbl"><tr>${Object.keys(r.byDay).sort().map(d=>`<th>Day ${d}</th>`).join('')}</tr>
      <tr>${Object.keys(r.byDay).sort().map(d=>{const v=r.byDay[d];
        const p=Math.round(v.r/v.n*100);
        return `<td class="${p<65?'f':''}">${p}%</td>`}).join('')}</tr>
      <tr>${Object.keys(r.byDay).sort().map(d=>{const v=r.byDay[d];
        return `<td style="color:#555;font-weight:400;font-size:.81rem">${v.r}/${v.n}</td>`}).join('')}</tr>
      </table></div>`:''}
  </div>
  ${(()=>{const r=S.result;
    if(S.kind!=='full'||!r.passed) return '';
    if(S.pVerdict==='void') return `<div class="note r" style="max-width:920px;margin:16px auto">
      <b>${isAr()?'⛔ الاختبار مُبطَل':'⛔ Exam voided'}</b><br>
      ${isAr()?`تراكمت مخالفات المراقبة (${S.pWarn} نقطة). لا تُصدر شهادة.`
        :`Proctoring violations accumulated (${S.pWarn} points). No certificate is issued.`}</div>`;
    return `<div style="max-width:920px;margin:18px auto">
      ${S.pVerdict==='flag'?`<div class="note w" style="margin-bottom:12px">
        ${isAr()?`⚠️ سُجّلت مخالفات مراقبة (${S.pWarn} نقطة) — الشهادة تصدر مع ملاحظة.`
          :`⚠️ Proctoring violations recorded (${S.pWarn} points) — the certificate is issued with a note.`}</div>`:''}
      <button class="btn g lg" id="showCert">🏆 ${isAr()?'اعرض الشهادة':'View certificate'}</button>
    </div>`})()}
  ${S.showCert?certModal():''}
  <div class="rp-act"><button class="btn g" id="waSend">${esc(t('sendWA'))}</button>
    <button class="btn p" id="rev">${esc(t('reviewA'))}</button>
    <button class="btn o" id="prt">${esc(t('printR'))}</button>
    <button class="btn o" id="again">${esc(t('newEx'))}</button>
    <button class="btn o" id="hm">${esc(t('homeB'))}</button></div>
  <div style="max-width:920px;margin:0 auto;text-align:center;font-size:.75rem;
    color:var(--mut);padding:10px">${esc(t('credit'))}</div>
  <div id="revBox" style="max-width:920px;margin:0 auto"></div></div>`;
}
function certModal(){
  const r=S.result, C=window.CERT; if(!C)return '';
  const o={lang:isAr()?'ar':'en', name:S.learner, pct:r.pct, right:r.right,
    total:r.total, mins:r.mins, doms:r.doms, no:C.no(S.learner)};
  return `<div class="navov" id="ctov"><div class="navp" style="max-width:900px">
    <div class="navh"><b>🏆 ${isAr()?'الشهادة':'Certificate'}</b>
      <button class="pop-x" id="ctx">✕</button></div>
    <div style="padding:18px;overflow-y:auto;background:var(--bg)">
      ${C.html(o)}
      <div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap;justify-content:center">
        <button class="btn p" id="ctPrint">🖨 ${isAr()?'اطبع / PDF':'Print / PDF'}</button>
        <button class="btn o" id="ctWa">📱 ${isAr()?'أرسل':'Send'}</button>
      </div></div></div></div>`;
}
function reviewList(){
  const wrong=S.items.filter((it,i)=>!isRight(it.q,S.ans[i])).length;
  const f=S.rvF||'all';
  return `<h2 class="sec">${esc(t('reviewT'))}</h2>
  <div class="rvfilter">${[['all',t('all'),S.items.length],['bad',t('isWrong'),wrong],
    ['good',t('isCorrect'),S.items.length-wrong]].map(([k,l,n])=>
    `<button class="nf${f===k?' on':''}" data-rvf="${k}">${l} <b>${n}</b></button>`).join('')}
    <span class="sp"></span><button class="nf" id="rvgrid">${esc(t('showGrid'))}</button></div>
  ${S.rvGrid?`<div class="qgrid">${S.items.map((it,i)=>{const ok=isRight(it.q,S.ans[i]);
    return `<button class="qg ${ok?'y':'n'}" data-rvj="${i}">${i+1}</button>`}).join('')}</div>`:''}
  <div>${S.items.map((it,i)=>{
    const q=it.q,a=S.ans[i],ok=isRight(q,a);
    if(f==='bad'&&ok)return ''; if(f==='good'&&!ok)return '';
    const opts=QO(q,i), R=perOption(q,i);
    const gen=(!R&&QX(q,i))?QX(q,i):'';
    return `<article class="rv"><header class="rv-h ${ok?'ok':'no'}">
      <span class="rv-n">${i+1}</span><span class="rv-i">${ok?'✓':'✕'}</span>
      <b>${ok?esc(t('rightA')):esc(t('wrongA'))}</b>
      <span class="rv-tag">${esc(pick(ECO[domOf(q)].ar,ECO[domOf(q)].en))}</span>
      ${q.day?`<span class="rv-tag">${esc(t('day'))} ${q.day}</span>`:''}</header>
      <div class="rv-b"><p class="rv-q">${esc(QT(q,i))}</p>
      ${(window.QFIG&&QFIG.has(q.i))?`<div class="qfig sm">${QFIG.svg(q.i)}</div>`:''}
      ${opts.map((o,k)=>{const isC=(q.c||[]).includes(k);
        const sel=Array.isArray(a)?a.includes(k):a===k;
        const tx=R?((R[k]||'').trim()):'';
        return `<div class="rv-o${isC?' c':''}${sel&&!isC?' s':''}">
          <div class="rv-oh"><span class="rv-l">${K[k]}</span>
            <span class="rv-t">${esc(o)}</span>
            ${isC?`<span class="fbv y">${esc(t('isCorrect'))}</span>`:''}
            ${sel?`<span class="fbu">${esc(t('yourAns'))}</span>`:''}</div>
          ${tx?`<p class="rv-x">${esc(tx)}</p>`:''}</div>`;}).join('')}
      ${gen?`<div class="rv-g"><b>${esc(t('explan'))}</b><p>${esc(gen)}</p></div>`:''}
      </div></article>`;}).join('')}</div>`;
}
function submit(auto){
  if(!S||S.submitted)return;
  const un=S.items.length-Object.keys(S.ans).filter(k=>S.ans[k]!=null).length;
  if(!auto&&un>0&&!confirm(t('unansConfirm',{n:un})))return;
  S.submitted=true; S.result=grade(); clearInterval(T);
  if(S.proctored&&window.PROCTOR){ S.pVerdict=window.PROCTOR.verdict(S); window.PROCTOR.stop(); }
  D_.del('resume'); logAttempt(); render();
}

/* ═══ تقرير واتساب ═══ */
const WA='966544375447';
function waReport(){
  const r=S.result, ws=D_.get('ws',{})||{};
  const wsDone=Object.keys(ws).filter(k=>(ws[k]||'').trim()).length;
  const sd=D_.get('simdone',{})||{};
  const simN=Object.keys(sd).length;
  const simR=Object.values(sd).reduce((a,b)=>a+b,0);
  const simT=SIMS.reduce((a,b)=>a+b.steps.length,0);
  const log=D_.get('attempts',[])||[];
  const L=[];
  L.push('*SOMU International Training Centre*');
  L.push('*Project Management Skills — PMP® Exam Preparation*');
  L.push('13–17 Sept 2026');
  L.push('');
  L.push('👤 *'+S.learner+'*');
  L.push('📋 '+S.title);
  L.push('📅 '+new Date().toLocaleString(isAr()?'ar-EG':'en-GB',
    {dateStyle:'medium',timeStyle:'short'}));
  L.push('');
  L.push('━━━━━━━━━━━━━━━━');
  L.push('*'+(isAr()?'نتيجة الاختبار':'EXAM RESULT')+'*');
  L.push((r.passed?'✅ ':'❌ ')+(isAr()?'النتيجة':'Result')+': *'
    +r.pct+'%* ('+(r.passed?'Pass':'Fail')+')');
  L.push('📊 '+(isAr()?'الصحيحة':'Correct')+': '+r.right+' / '+r.total);
  L.push('⏱ '+(isAr()?'الزمن':'Time')+': '+r.mins+' '+(isAr()?'دقيقة':'min'));
  L.push('');
  L.push('*'+(isAr()?'الأداء بالنطاق':'BY DOMAIN')+'*');
  r.doms.forEach(d=>L.push('• '+(isAr()?d.ar:d.en)+': '+d.pct+'% ('+d.r+'/'+d.n+') — '
    +BAND[d.band].en));
  const dk=Object.keys(r.byDay||{}).sort();
  if(dk.length>1){ L.push('');
    L.push('*'+(isAr()?'الأداء بالأيام':'BY TRAINING DAY')+'*');
    dk.forEach(d=>{const v=r.byDay[d];
      L.push('• Day '+d+': '+Math.round(v.r/v.n*100)+'% ('+v.r+'/'+v.n+')')}); }
  L.push('');
  L.push('━━━━━━━━━━━━━━━━');
  L.push('*'+(isAr()?'الإنجاز الكلي':'OVERALL COMPLETION')+'*');
  L.push('🧩 '+(isAr()?'الأنشطة':'Activities')+': '+wsDone+' / '+ACTS.length
    +' ('+Math.round(wsDone/ACTS.length*100)+'%)');
  L.push('🎮 '+(isAr()?'المحاكاة':'Simulations')+': '+simN+' / '+SIMS.length
    +(simT?' — '+simR+'/'+simT+' '+(isAr()?'قراراً صحيحاً':'correct decisions'):''));
  L.push('🎯 '+(isAr()?'الاختبارات':'Exams')+': '+log.length);
  if(log.length>1){
    const best=Math.max(...log.map(a=>a.pct));
    const avg=Math.round(log.reduce((a,b)=>a+b.pct,0)/log.length);
    L.push('📈 '+(isAr()?'الأفضل':'Best')+': '+best+'% · '+(isAr()?'المتوسط':'Avg')+': '+avg+'%'); }
  /* أضعف مهام */
  const T2={}; log.forEach(a=>Object.entries(a.tasks||{}).forEach(([k,v])=>{
    T2[k]=T2[k]||{n:0,r:0}; T2[k].n+=v.n; T2[k].r+=v.r}));
  const weak=Object.entries(T2).filter(([k,v])=>v.n>=3)
    .map(([k,v])=>({k,p:Math.round(v.r/v.n*100)})).sort((a,b)=>a.p-b.p).slice(0,4);
  if(weak.length){ L.push('');
    L.push('*'+(isAr()?'أضعف المهام':'WEAKEST TASKS')+'*');
    weak.forEach(w=>L.push('• Task '+w.k+': '+w.p+'%')); }
  L.push('');
  L.push('━━━━━━━━━━━━━━━━');
  L.push('_'+t('credit')+'_');
  return L.join('\n');
}
function sendWA(){
  const txt=waReport();
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(txt),'_blank');
}

/* ═══ تقدّمي ═══ */
function pStats(){
  const log=(D_.get('attempts',[])||[]).slice().reverse();
  const ws=D_.get('ws',{})||{}, wsDone=Object.keys(ws).filter(k=>(ws[k]||'').trim()).length;
  const sd=D_.get('simdone',{})||{};
  if(!log.length) return `<div class="hero" style="padding:24px">
    <span class="k">MY PROGRESS</span><h1 style="font-size:1.32rem">${esc(t('progT'))}</h1>
    <p>${esc(t('willShow'))}</p>
    <div class="stats"><div class="st"><b class="m">${wsDone}/${ACTS.length}</b>
      <span>${esc(t('actsN'))}</span></div>
      <div class="st"><b class="m">${Object.keys(sd).length}/${SIMS.length}</b>
      <span>${esc(t('simsN'))}</span></div></div></div>
    <div class="empty"><b>${esc(t('noAttempts'))}</b>${esc(t('willShow'))}</div>`;
  const last=log[0], best=Math.max(...log.map(a=>a.pct));
  const avg=Math.round(log.reduce((s,a)=>s+a.pct,0)/log.length);
  const D2={}; log.forEach(a=>Object.entries(a.days||{}).forEach(([d2,v])=>{
    D2[d2]=D2[d2]||{n:0,r:0}; D2[d2].n+=v.n; D2[d2].r+=v.r}));
  const T2={}; log.forEach(a=>Object.entries(a.tasks||{}).forEach(([t,v])=>{
    T2[t]=T2[t]||{n:0,r:0}; T2[t].n+=v.n; T2[t].r+=v.r}));
  const weak=Object.entries(T2).filter(([t,v])=>v.n>=3)
    .map(([t,v])=>({t,pct:Math.round(v.r/v.n*100),n:v.n})).sort((a,b)=>a.pct-b.pct).slice(0,9);
  const pts=log.slice(0,20).reverse().map(a=>a.pct);
  const W=620,H=150, X=i=>pts.length>1?30+i*(W-60)/(pts.length-1):W/2, Y=v=>H-20-(v/100)*(H-40);
  return `<div class="hero" style="padding:24px"><span class="k">MY PROGRESS</span>
    <h1 style="font-size:1.32rem">${esc(t('progT'))}</h1>
    <div class="stats">
      <div class="st"><b class="m">${last.pct}%</b><span>${esc(t('lastA'))}</span></div>
      <div class="st"><b class="m">${best}%</b><span>${esc(t('bestA'))}</span></div>
      <div class="st"><b class="m">${avg}%</b><span>${esc(t('avgA'))}</span></div>
      <div class="st"><b class="m">${wsDone}/${ACTS.length}</b><span>${esc(t('actsN'))}</span></div>
      <div class="st"><b class="m">${Object.keys(sd).length}/${SIMS.length}</b><span>${esc(t('simsN'))}</span></div>
    </div></div>
  ${pts.length>1?`<h2 class="sec">${esc(t('trend'))}</h2>
  <div class="card"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto">
    <line x1="25" y1="${Y(65)}" x2="${W-25}" y2="${Y(65)}" stroke="#F07000"
      stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="${W-22}" y="${Y(65)+4}" font-size="9" fill="#F07000">65%</text>
    ${[0,50,100].map(v=>`<text x="22" y="${Y(v)+3}" font-size="9" fill="#6b8090"
      text-anchor="end">${v}</text>`).join('')}
    <polyline fill="none" stroke="#103040" stroke-width="2.5"
      points="${pts.map((v,i)=>X(i)+','+Y(v)).join(' ')}"/>
    ${pts.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="4"
      fill="${v>=65?'#40C090':'#c0392b'}"/>`).join('')}
  </svg></div>`:''}
  ${Object.keys(D2).length?`<h2 class="sec">${esc(t('byDayT'))}</h2>
  <div class="grid g3">${Object.keys(D2).sort().map(d2=>{const v=D2[d2];
    const p=Math.round(v.r/v.n*100);
    return `<div class="card" style="border-top:4px solid ${(DAYS[d2]||{}).c||'#ccc'}">
      <h3>${esc(t('day'))} ${d2} — <span class="m">${p}%</span></h3>
      <p>${esc(pick((DAYS[d2]||{}).t||'',(DAYS[d2]||{}).e||''))}</p>
      <div class="meta"><span class="tag ${p>=65?'g':'o'}">${v.r}/${v.n}</span></div>
      <button class="btn o full" style="margin-top:10px;padding:7px;font-size:.81rem"
        data-exday="${d2}">${esc(t('retakeDay'))}</button></div>`}).join('')}</div>`:''}
  ${weak.length?`<h2 class="sec">${esc(t('weakTasks'))}</h2>
  <div class="grid g3">${weak.map(w=>`<div class="card">
    <h3>${esc(t('task'))} ${esc(w.t)} — <span class="m">${w.pct}%</span></h3>
    <p>${w.n} ${esc(t('question'))}</p></div>`).join('')}</div>`:''}
  ${(()=>{
    const dl2=Object.keys(D2).map(d2=>({d:d2,p:Math.round(D2[d2].r/D2[d2].n*100)}))
      .sort((a,b)=>a.p-b.p);
    if(!dl2.length) return '';
    const PL={
     '1':[['راجع وحدات اليوم ١: المصطلحات · المبادئ الستة · منهجيات التطوير · الحوكمة · ضبط التغيير',
           'Review Day 1: key terms · six principles · development approaches · governance · change control'],
          ['أعد النشاط ٣ (اختيار منهجية) والنشاط ٥ (تفصيل إطار الحوكمة)',
           'Redo Activity 3 (development approach) and Activity 5 (tailor governance)'],
          ['أكمل محاكاة «الحوكمة عند الشهر ١٨» — ٥ قرارات',
           'Complete the "Governance at Month 18" simulation — 5 decisions']],
     '2':[['راجع وحدات اليوم ٢: أصحاب المصلحة · التواصل · الموارد · قيادة الفريق',
           'Review Day 2: stakeholders · communications · resources · leading the team'],
          ['أعد النشاط ٦ (سجلّ أصحاب المصلحة) والنشاط ١٠ (سيناريوهات النزاع)',
           'Redo Activity 6 (stakeholder register) and Activity 10 (conflict scenarios)'],
          ['احفظ أساليب حل النزاع الخمسة بترتيب تفضيل PMI',
           'Memorize the five conflict styles in PMI preference order']],
     '3':[['راجع وحدات اليوم ٣: النطاق · هيكل التجزئة · التقدير · شبكة الجدول',
           'Review Day 3: scope · WBS · estimating · network analysis'],
          ['أعد النشاط ١٤ (المسار الحرج) والنشاط ١٥ (الحسابات الموقوتة)',
           'Redo Activity 14 (critical path) and Activity 15 (timed calculations)'],
          ['أتقن فرق التسريع عن التتبّع السريع — يُسأل عنه كثيراً',
           'Master crashing versus fast tracking — frequently examined']],
     '4':[['راجع وحدات اليوم ٤: المالية · القيمة المكتسبة · الجودة · المشتريات · المخاطر',
           'Review Day 4: finance · earned value · quality · procurement · risk'],
          ['أعد النشاط ١٧ (القيمة المكتسبة) والنشاط ٢٠ (EMV والاحتياطي)',
           'Redo Activity 17 (earned value) and Activity 20 (EMV and contingency)'],
          ['احفظ الصيغ السبع: CPI · SPI · CV · SV · EAC · ETC · TCPI',
           'Memorize the seven formulas: CPI · SPI · CV · SV · EAC · ETC · TCPI']],
     '5':[['راجع وحدات اليوم ٥: الحوكمة والامتثال · الاستدامة · الإغلاق · تقنية الاختبار',
           'Review Day 5: governance and compliance · sustainability · closure · exam technique'],
          ['أعد النشاط ٢١ (سجلّ الامتثال) والنشاط ٢٢ (قائمة الإغلاق)',
           'Redo Activity 21 (compliance register) and Activity 22 (closure checklist)'],
          ['أتقن تمييز الخطر عن المشكلة، والتحقّق من النطاق عن ضبط الجودة',
           'Master risk versus issue, and validate scope versus control quality']]};
    return `<h2 class="sec">${esc(t('planT'))}</h2>
      <div class="note i" style="margin-bottom:13px">${esc(t('planD'))}</div>
      ${dl2.map((x,i)=>{const P=PL[x.d]||[];
        return `<div class="card" style="margin-bottom:10px;border-inline-start:4px solid ${
          x.p>=75?'var(--green2)':x.p>=55?'var(--gold)':'var(--bad)'}">
        <h3>${esc(t('day'))} ${x.d} — <span class="m">${x.p}%</span>
          <span class="tag ${x.p>=75?'g':'o'}" style="margin-inline-start:auto">
            ${isAr()?'الأولوية':'Priority'} ${i+1}</span></h3>
        <ul style="list-style:none;margin-top:10px">${P.map(p=>
          `<li style="font-size:.85rem;line-height:1.8;padding-inline-start:18px;
            position:relative;margin-bottom:5px">
            <span style="position:absolute;inset-inline-start:0;color:var(--sky2)">&rarr;</span>
            ${esc(pick(p[0],p[1]))}</li>`).join('')}</ul>
        <button class="btn o full" style="margin-top:10px;padding:7px;font-size:.81rem"
          data-exday="${x.d}">${esc(t('retakeDay'))}</button></div>`}).join('')}`;
  })()}
  <h2 class="sec">${esc(t('attemptsT'))}</h2>
  ${log.map(a=>`<div class="card" style="margin-bottom:8px;display:flex;gap:13px;
    align-items:center;flex-wrap:wrap">
    <span style="min-width:58px;height:40px;line-height:38px;text-align:center;border-radius:9px;
      font-family:var(--m);font-size:1.02rem;font-weight:600;border:1.5px solid;
      ${a.pct>=65?'background:#e3f7ee;border-color:#bde9d6;color:#12654a'
        :'background:#fbeae8;border-color:#f2cac5;color:#c0392b'}">${a.pct}%</span>
    <div style="flex:1;min-width:160px"><b style="font-size:.88rem">${esc(a.title)}</b><br>
      <span style="font-size:.77rem;color:var(--mut)">${new Date(a.at)
        .toLocaleString('ar-EG',{dateStyle:'medium',timeStyle:'short'})} ·
        ${a.right}/${a.total} · ${a.mins} ${esc(t('min'))}</span></div>
  </div>`).join('')}
  <div style="display:flex;gap:9px;margin-top:14px">
    <button class="btn o" id="stExp">${esc(t('exportB'))}</button>
    <button class="btn o" id="stClr" style="color:var(--bad)">${esc(t('clearB'))}</button></div>`;
}

/* ═══ الإدارة ═══ */
function pAdmin(){
  const ov=D_.get('qedit',{})||{}, add=D_.get('qadd',[])||[];
  return `<div class="hero" style="padding:24px"><span class="k">ADMIN</span>
    <h1 style="font-size:1.3rem">${esc(t('adminT'))}</h1>
    <p>${esc(t('adminD'))}</p>
    <div class="note w" style="margin-top:13px">
      <b>${isAr()?'🔓 وضع المدرّب مفعّل':'🔓 Trainer mode is active'}</b><br>
      ${isAr()?'هذه الشاشة مخفية عن المتدربين. اضغط «وضع المدرّب» في الترويسة لإقفالها قبل تسليم الجهاز.'
        :'This screen is hidden from participants. Press "Trainer mode" in the header to lock it before handing over the device.'}
    </div>
    <div class="stats">
      <div class="st"><b class="m">${Q.length}</b><span>${esc(t('qsN'))}</span></div>
      <div class="st"><b class="m">${Object.keys(ov).filter(k=>!ov[k].__del).length}</b><span>${isAr()?'معدَّل':'edited'}</span></div>
      <div class="st"><b class="m">${add.length}</b><span>${isAr()?'مضاف':'added'}</span></div>
    </div></div>
  <div class="note i" style="margin-bottom:14px">
    ${t('adminNote')}</div>
  <div class="grid g2">
    <div class="card"><h3>${esc(t('exportData'))}</h3>
      <p>${esc(t('exportDataD'))}</p>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn o" style="padding:8px 14px;font-size:.81rem" id="adQ">${esc(t('qsB'))}</button>
        <button class="btn o" style="padding:8px 14px;font-size:.81rem" id="adW">${esc(t('actAns'))}</button>
        <button class="btn o" style="padding:8px 14px;font-size:.81rem" id="adA">${esc(t('histB'))}</button>
      </div></div>
    <div class="card"><h3>${esc(t('restore'))}</h3>
      <p>${esc(t('restoreD'))}</p>
      <button class="btn o full" style="margin-top:12px;color:var(--bad)" id="adR">
        ${esc(t('clearAll'))}</button></div>
  </div>
  <div class="note w" style="margin-top:16px">
    ${t('apiNote')}</div>`;
}

/* ═══ المساعد ═══ */
function aiPanel(){
  return `<div class="ai-p"><div class="ai-h">🤖<b>${esc(t('aiT'))}</b>
    <button class="ai-x" id="aix">✕</button></div>
    <div class="ai-n">${t('aiN')}</div>
    <div class="ai-m" id="aim">${ai.msgs.length?ai.msgs.map(m=>
      `<div class="msg ${m.w}">${md(m.t)}</div>`).join('')
      :'<div class="msg b">اسألني عن أي مفهوم، أو عن كيفية تطبيقه على FRIGATE BRAVO.</div>'}</div>
    <div class="chips">
      <button data-aq="ev">${esc(t('chEV'))}</button>
      <button data-aq="cp">${esc(t('chCP'))}</button>
      <button data-aq="risk">${esc(t('chRisk'))}</button>
      <button data-aq="conf">${esc(t('chConf'))}</button>
      <button data-aq="fb">FRIGATE BRAVO</button>
      <button data-aq="tech">${esc(t('chTech'))}</button></div>
    <div class="ai-in"><input id="aii" placeholder="${esc(t('aiIn'))}"><button id="ais">➤</button></div>
  </div>`;
}
function aiReply(kind,txt){
  const M={
   ev:'**القيمة المكتسبة — الصيغ الأساسية**\n\n'
     +'• **EV** = الميزانية × نسبة الإنجاز\n• **CPI** = EV ÷ AC — أقل من ١ تجاوز\n'
     +'• **SPI** = EV ÷ PV — أقل من ١ تأخّر\n• **EAC** = BAC ÷ CPI عند استمرار الأداء\n'
     +'• **TCPI** = (BAC−EV) ÷ (BAC−AC) — الكفاءة المطلوبة للمتبقّي\n\n'
     +'**على FRIGATE BRAVO**: عند الشهر ١٨، CPI = ٠٫٨٥ و SPI = ٠٫٨٩، فـEAC ≈ ٩٨٨ مليون '
     +'مقابل BAC = ٨٤٠ — تجاوز ١٤٨ مليون.',
   cp:'**المسار الحرج**\n\nأطول تسلسل من الأنشطة، ويحدّد أقصر مدة ممكنة. الفائض فيه صفر.\n\n'
     +'**الضغط — وهنا سؤال الاختبار الشائع**:\n'
     +'• **التسريع** Crashing: إضافة موارد ← كلفة أعلى\n'
     +'• **التتبّع السريع** Fast tracking: توازي أنشطة متسلسلة ← بلا كلفة لكن مخاطر أعلى\n\n'
     +'**تحذير**: بعد أي ضغط، أعد تحليل الشبكة — قد يظهر مسار حرج جديد.',
   risk:'**المخاطر**\n\nرتّب بـ**الاحتمالية × الأثر**.\n\n'
     +'**استجابة التهديد**: تجنّب · نقل · تخفيف · قبول\n'
     +'**استجابة الفرصة**: استغلال · مشاركة · تعزيز · قبول\n\n'
     +'**الاحتياطيات**: احتياطي الطوارئ للمخاطر المعروفة ضمن خط الأساس ويديره مدير المشروع · '
     +'الاحتياطي الإداري لغير المعروفة خارج خط الأساس ويحتاج موافقة إدارية.\n\n'
     +'**الخطر يصبح مشكلة** حين يتحقّق ويؤثّر على التسليم.',
   conf:'**أساليب حل النزاع — بترتيب تفضيل PMI**\n\n'
     +'١) **المواجهة وحل المشكلة** — رابح/رابح · الأفضل\n'
     +'٢) **التعاون** — دمج وجهات النظر\n'
     +'٣) **التسوية** — كلاهما يتنازل\n'
     +'٤) **التنعيم** — تأجيل بالتركيز على الاتفاق\n'
     +'٥) **الإجبار** — فرض · للطوارئ فقط\n'
     +'٦) **الانسحاب** — تجنّب · الأسوأ عادةً',
   fb:'**Project FRIGATE BRAVO**\n\nبرنامج بناء سفن حربية: فراقة قائدة + خيار تعاقدي لهيكلين تاليين. '
     +'التصميم مرخّص من شريك خارجي.\n\n**عند الشهر ١٨ — أربع مشكلات مفتوحة**:\n'
     +'• حزمة الدفع متأخرة ستة أسابيع\n• زيادة منظومة القتال ٥ مرفوضة في القبول\n'
     +'• مساح التصنيف غير متاح لثلاث نقاط توقّف\n• لحّامان معتمدان استقالا · خط التأهيل ١١ أسبوعاً\n\n'
     +'افتح **⚓ ملف FRIGATE BRAVO** للجداول الكاملة، و**🎮 المحاكاة** لتتخذ القرارات فعلياً.',
   tech:'**تقنية الاختبار**\n\n١) اقرأ **السؤال** قبل الخيارات — ما المطلوب بالضبط؟\n'
     +'٢) حدّد **المنهجية**: تتابعية أم رشيقة أم هجينة؟ الإجابة تتغيّر بتغيّرها.\n'
     +'٣) ابحث عن **أولاً / الأنسب / الأفضل** — تغيّر الإجابة الصحيحة.\n'
     +'٤) استبعد ما يبدأ بالتصعيد قبل التحليل.\n'
     +'٥) ترتيب PMI: افهم ← حلّل ← اتفق ← نفّذ ← صعّد.\n\n'
     +'**الوقت**: ١٨٥ سؤالاً في ٢٤٠ دقيقة ≈ ٧٧ ثانية للسؤال.'};
  if(kind&&M[kind])return M[kind];
  const t=(txt||'').toLowerCase();
  if(/cpi|spi|eac|قيمة مكتسبة|earned/.test(t))return M.ev;
  if(/مسار حرج|critical|ضغط|تسريع|crash/.test(t))return M.cp;
  if(/مخاطر|risk|احتياطي/.test(t))return M.risk;
  if(/نزاع|conflict|خلاف/.test(t))return M.conf;
  if(/frigate|فراقة|المشروع/.test(t))return M.fb;
  if(/اختبار|exam|وقت/.test(t))return M.tech;
  if(/ميثاق|charter/.test(t))return '**ميثاق المشروع**\n\nيُصدره الراعي ويمنح مدير المشروع '
    +'السلطة لاستخدام موارد المؤسسة. يحوي: الغرض · الأهداف القابلة للقياس · المتطلبات عالية المستوى · '
    +'المخاطر · المعالم · الميزانية · معايير الموافقة · مدير المشروع وصلاحياته.\n\n'
    +'**ليس** خطة إدارة المشروع — الخطة تأتي بعده وتوضّح **كيف** يُنفَّذ.';
  if(/نطاق|scope|wbs/.test(t))return '**النطاق**\n\n**تجميع المتطلبات** ← **تعريف النطاق** '
    +'← **إنشاء هيكل التجزئة WBS** ← حزمة العمل هي أدنى مستوى.\n\n'
    +'**التمييز المهم**: **التحقّق من النطاق** (Validate Scope) = قبول العميل الرسمي · '
    +'**ضبط الجودة** (Control Quality) = مطابقة المواصفة داخلياً. ضبط الجودة **يسبق** التحقّق.';
  if(/جودة|quality/.test(t))return '**الجودة**\n\n**تكلفة الجودة** = الوقاية + التقييم + '
    +'الفشل الداخلي + الفشل الخارجي. الاستثمار في الوقاية يخفض كلفة الفشل.\n\n'
    +'**ضمان الجودة** عملية (هل نتبع العملية الصحيحة؟) · **ضبط الجودة** منتج (هل المخرج مطابق؟).';
  if(/مشتريات|عقد|contract|procure/.test(t))return '**أنواع العقود**\n\n'
    +'• **ثابت السعر** — المخاطر على البائع · نطاق واضح\n'
    +'• **القابل للسداد** Cost-reimbursable — المخاطر على المشتري · نطاق غامض\n'
    +'• **الوقت والمواد** T&M — بينهما · للعمل القصير أو غير المحدّد\n\n'
    +'**على FRIGATE BRAVO**: حزم بيقين نطاق مختلف — راجع جدول حزم المشتريات في ملف المشروع.';
  return 'راجع الوحدة المرتبطة في **📚 المحتوى اليومي**، أو اضغط أحد الأزرار أعلاه.\n\n'
    +'يمكنني الشرح في: القيمة المكتسبة · المسار الحرج · المخاطر · النزاع · النطاق · الجودة · '
    +'المشتريات · ميثاق المشروع · تقنية الاختبار · ملف FRIGATE BRAVO.';
}

/* ═══ السبورة ═══ */
let wbCtx=null,wbDraw=false,wbColor='#103040',wbSize=2,wbErase=false;
function initWB(){
  const c=$('#wbc'); if(!c)return;
  const r=c.getBoundingClientRect();
  if(c.width!==r.width*2){c.width=r.width*2;c.height=600}
  wbCtx=c.getContext('2d'); wbCtx.lineCap='round'; wbCtx.lineJoin='round';
  const pos=e=>{const b=c.getBoundingClientRect(),t=e.touches?e.touches[0]:e;
    return {x:(t.clientX-b.left)*(c.width/b.width),y:(t.clientY-b.top)*(c.height/b.height)}};
  const st=e=>{e.preventDefault();wbDraw=true;const p=pos(e);wbCtx.beginPath();wbCtx.moveTo(p.x,p.y)};
  const mv=e=>{if(!wbDraw)return;e.preventDefault();const p=pos(e);
    wbCtx.strokeStyle=wbErase?'#fff':wbColor;wbCtx.lineWidth=(wbErase?18:wbSize)*2;
    wbCtx.lineTo(p.x,p.y);wbCtx.stroke()};
  const en=()=>{wbDraw=false};
  ['mousedown','touchstart'].forEach(k=>c.addEventListener(k,st));
  ['mousemove','touchmove'].forEach(k=>c.addEventListener(k,mv));
  ['mouseup','mouseleave','touchend'].forEach(k=>c.addEventListener(k,en));
}
function dl(o,n){const b=new Blob([JSON.stringify(o,null,1)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click()}

/* ═══ الرسم ═══ */
function render(){
  const r=$('#root');
  if(PEND){r.innerHTML=intro();bindIntro();return}
  if(S&&S.submitted){r.innerHTML=report();bindReport();return}
  if(S&&S.onBreak){r.innerHTML=breakView();
    const b=$('#bgo');if(b)b.onclick=()=>{S.onBreak=false;render()};return}
  if(S){r.innerHTML=runner();bindExam();if(S.wb)setTimeout(initWB,40);return}
  if(page==='admin'&&!TRAINER.on()) page='life';
  if(window.LIFEUI) window.LIFEUI.attach({t,isAr,pick,DB:D_,render,esc});
  const P={home:pHome,content:pContent,acts:pActs,sim:pSim,fb:pFB,exams:pExams,
    stats:pStats,admin:pAdmin,
    life:()=>window.LIFEUI?window.LIFEUI.page():'<div class="empty">—</div>'};
  r.innerHTML=header()+'<div class="wrap">'+((P[page]||pHome)())+'</div>'
    +`<div class="ai">${ai.open?aiPanel():''}
      <button class="ai-fab" id="aif">${ai.open?'✕':'🤖'}</button></div>`;
  bindHome();
  if(page==='life'&&window.LIFEUI){ window.LIFEUI.attach({
    t, isAr, pick, DB:D_, render, esc }); window.LIFEUI.bind(); }
}
function bindFs(){$$('[data-fs]').forEach(b=>b.onclick=()=>setFs(+b.dataset.fs))}
function bindAI(){
  const f=$('#aif'); if(f)f.onclick=()=>{ai.open=!ai.open;render()};
  const x=$('#aix'); if(x)x.onclick=()=>{ai.open=false;render()};
  $$('[data-aq]').forEach(b=>b.onclick=()=>{
    ai.msgs.push({w:'u',t:b.textContent.trim()});
    ai.msgs.push({w:'b',t:aiReply(b.dataset.aq)});render();
    setTimeout(()=>{const m=$('#aim');if(m)m.scrollTop=m.scrollHeight},50)});
  const send=()=>{const v=($('#aii').value||'').trim();if(!v)return;
    ai.msgs.push({w:'u',t:v});ai.msgs.push({w:'b',t:aiReply(null,v)});render();
    setTimeout(()=>{const m=$('#aim');if(m)m.scrollTop=m.scrollHeight},50)};
  const s=$('#ais'); if(s)s.onclick=send;
  const i=$('#aii'); if(i)i.addEventListener('keydown',e=>{if(e.key==='Enter')send()});
  $$('[data-askmod]').forEach(b=>b.onclick=()=>{ai.open=true;
    ai.msgs.push({w:'u',t:t('explainMod')+' '+b.dataset.askmod});
    ai.msgs.push({w:'b',t:aiReply(null,b.dataset.askmod)});render()});
  $$('[data-asksim],[data-askact]').forEach(b=>b.onclick=()=>{ai.open=true;render()});
}
function bindHome(){
  bindFs(); bindAI();
  $$('[data-page]').forEach(b=>b.onclick=()=>{page=b.dataset.page;render()});
  $$('[data-sec]').forEach(b=>b.onclick=()=>{
    page=({ex:'exams',tr:'content',ap:'life'})[b.dataset.sec];render()});
  $$('[data-page2]').forEach(b=>b.onclick=()=>{page=b.dataset.page2;render()});
  $$('[data-day]').forEach(b=>b.onclick=()=>{day=b.dataset.day;
    if(page==='home')page='content'; render()});
  /* الوحدات والأنشطة */
  $$('[data-mod]').forEach(b=>b.onclick=()=>{const x=$('#mb'+b.dataset.mod);
    const o=x.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  $$('[data-act]').forEach(b=>b.onclick=e=>{
    if(e.target.closest('textarea')||e.target.closest('button')&&e.target!==b)return;
    const x=$('#ab'+b.dataset.act);const o=x.classList.toggle('open');
    b.setAttribute('aria-expanded',o)});
  $$('[data-wssave]').forEach(b=>b.onclick=e=>{e.stopPropagation();
    const k=b.dataset.wssave, t=document.querySelector(`[data-ws="${k}"]`);
    const ws=D_.get('ws',{})||{}; ws[k]=t.value; D_.set('ws',ws);
    const st=$('#st'+k); if(st){st.textContent=t('savedTick');st.style.color='var(--green2)'}});
  $$('[data-ws]').forEach(t=>{let tm=null; t.oninput=()=>{clearTimeout(tm);
    const st=$('#st'+t.dataset.ws); if(st){st.textContent=t('saving');st.style.color=''}
    tm=setTimeout(()=>{const ws=D_.get('ws',{})||{};ws[t.dataset.ws]=t.value;D_.set('ws',ws);
      if(st){st.textContent=t('savedTick');st.style.color='var(--green2)'}},700)}});
  /* المولّد التلقائي */
  $$('[data-wsgen]').forEach(b=>b.onclick=e=>{e.stopPropagation();
    const k=b.dataset.wsgen, ta=document.querySelector(`[data-ws="${k}"]`);
    if(!ta)return;
    if((ta.value||'').trim() && !confirm(isAr()
      ?t('genConfirm'):t('genConfirm')))return;
    const d2=window.GEN.make(b.dataset.gt, LA());
    ta.value=d2;
    const ws=D_.get('ws',{})||{}; ws[k]=d2; D_.set('ws',ws);
    const st=$('#st'+k); if(st){st.textContent=t('savedS');st.style.color='var(--green2)'}
    ta.scrollIntoView({behavior:'smooth',block:'center'})});
  const lt=$('#langT'); if(lt)lt.onclick=()=>{I.set(isAr()?'en':'ar');
    if(sim.id)sim={id:sim.id,step:sim.step,ans:sim.ans}; render()};
  const tl=$('#trLock'); if(tl)tl.onclick=()=>{
    if(!confirm(isAr()?'الخروج من وضع المدرّب؟ ستختفي الإدارة.'
      :'Exit trainer mode? Admin will be hidden.'))return;
    TRAINER.lock(); page='life'; render()};
  /* فتح مخفي: خمس نقرات على الشعار خلال ٣ ثوانٍ */
  const lg=$('.logo'); if(lg&&!TRAINER.on()){
    lg.onclick=()=>{ const now=Date.now();
      if(!window.__tc||now-window.__tc.t>3000) window.__tc={n:0,t:now};
      window.__tc.n++; window.__tc.t=now;
      if(window.__tc.n>=5){ window.__tc=null;
        const c=prompt(isAr()?'رمز المدرّب:':'Trainer code:');
        if(c===null)return;
        if(TRAINER.unlock(c)){ alert(isAr()?'✅ فُتح وضع المدرّب.':'✅ Trainer mode unlocked.');
          page='admin'; render(); }
        else alert(isAr()?'رمز غير صحيح.':'Incorrect code.'); } };
  }
  const we=$('#wsExp'); if(we)we.onclick=()=>dl(D_.get('ws',{}),'somu-my-answers.json');
  const wp=$('#wsPrint'); if(wp)wp.onclick=()=>{$$('.act-b').forEach(x=>x.classList.add('open'));
    setTimeout(()=>window.print(),300)};
  /* المحاكاة */
  $$('[data-sim]').forEach(b=>b.onclick=()=>{sim={id:b.dataset.sim,step:0,ans:{}};render()});
  $$('[data-dopt]').forEach(b=>b.onclick=()=>{sim.ans[sim.step]=+b.dataset.dopt;render()});
  const sn=$('#simNext'); if(sn)sn.onclick=()=>{sim.step++;render();window.scrollTo(0,0)};
  const sx=$('#simExit'); if(sx)sx.onclick=()=>{sim={id:null,step:0,ans:{}};render()};
  const sr=$('#simRetry'); if(sr)sr.onclick=()=>{sim.step=0;sim.ans={};render()};
  /* الاختبارات */
  $$('[data-exday]').forEach(b=>b.onclick=()=>{const d2=b.dataset.exday;
    PEND={kind:'day',day:d2,title:t('dayExamT',{d:d2,n:pick(DAYS[d2].t,DAYS[d2].e)})};render()});
  $$('[data-exdom]').forEach(b=>b.onclick=()=>{const k=b.dataset.exdom;
    PEND={kind:'dom',dom:k,title:t('domExamT',{n:pick(ECO[k].ar,ECO[k].en)})};render()});
  $$('[data-exfull]').forEach(b=>b.onclick=()=>{
    PEND={kind:'full',mock:+b.dataset.exfull,title:t('fullExamT',{i:b.dataset.exfull})};render()});
  $$('[data-modq]').forEach(b=>b.onclick=e=>{e.stopPropagation();const d2=b.dataset.modq;
    PEND={kind:'day',day:d2,title:t('dayExamT',{d:d2,n:pick(DAYS[d2].t,DAYS[d2].e)})};render()});
  const rg=$('#rsGo'); if(rg)rg.onclick=()=>{if(!doResume())alert('تعذّر الاستئناف')};
  const rx2=$('#rsX'); if(rx2)rx2.onclick=()=>{if(confirm(t('discardC'))){
    D_.del('resume');render()}};
  const wg=$('#wbGo'); if(wg)wg.onclick=()=>{PEND={kind:'wrong',title:t('wrongExamT')};render()};
  /* الإدارة والسجلّ */
  const aq=$('#adQ'); if(aq)aq.onclick=()=>dl({edit:D_.get('qedit',{}),add:D_.get('qadd',[])},
    'somu-questions.json');
  const aw=$('#adW'); if(aw)aw.onclick=()=>dl(D_.get('ws',{}),'somu-answers.json');
  const aa=$('#adA'); if(aa)aa.onclick=()=>dl(D_.get('attempts',[]),'somu-attempts.json');
  const ar=$('#adR'); if(ar)ar.onclick=()=>{if(!confirm(t('clearAllC')))return;
    ['qedit','qadd','ws','attempts','wrongbank','simdone','resume'].forEach(k=>D_.del(k));
    location.reload()};
  const se=$('#stExp'); if(se)se.onclick=()=>dl(D_.get('attempts',[]),'somu-attempts.json');
  const sc=$('#stClr'); if(sc)sc.onclick=()=>{if(!confirm(t('clearHistC')))return;
    D_.del('attempts');D_.del('wrongbank');render()};
}
function bindIntro(){
  $$('[data-wz]').forEach(b=>b.onclick=()=>{
    const [k,v]=b.dataset.wz.split('|');
    PEND.setup=PEND.setup||{step:0}; PEND.setup[k]=v;
    PEND.setup.step++; render();});
  const wb=$('#wzBack'); if(wb)wb.onclick=()=>{
    PEND.setup.step=Math.max(0,PEND.setup.step-1); render();};
  const g=$('#go'); if(g)g.onclick=()=>{const p=PEND;
    const ln=$('#lname'); p.learner=(ln&&ln.value.trim())||t('trainee');
    D_.set('name',p.learner);
    const su=p.setup||{};
    if(su.lang) I.set(su.lang);
    PEND=null; S=build(p);
    if(!S.items.length){alert(t('noQs'));S=null;render();return}
    S.lang=su.lang||'ar'; S.mode=su.mode||'center';
    S.proctored=(su.mode==='online'&&su.proctor==='on');
    S.violations=[]; S.pWarn=0; S.lastAct=Date.now();
    if(S.proctored&&window.PROCTOR){
      window.PROCTOR.start(S,(r,w)=>{ S.pMsg=isAr()?r.ar:r.en; S.pMsgAt=Date.now(); render();
        setTimeout(()=>{if(S&&S.pMsgAt&&Date.now()-S.pMsgAt>=5500){S.pMsg=null;render()}},6000);
      }).then(camOn=>{ render();
        setTimeout(()=>{const v=$('#pcam'); if(v)window.PROCTOR.attach(v)},200); });
    }
    tick();render()};
  [$('#ic'),$('#ix')].forEach(e=>{if(e)e.onclick=()=>{PEND=null;render()}});
}
function validate(){
  const q=S.items[S.idx].q,a=S.ans[S.idx],n=needed(q);
  if(n>1){const f=Array.isArray(a)?a.length:0;
    if(f===0)return t('vNeed',{n:n});
    if(f<n)return t('vPartial',{f:f,n:n});
    if(f>n)return t('vOver',{f:f,n:n});
    return ''}
  return a==null?t('vNoAns'):'';
}
function bindExam(){
  bindFs();
  if(S.proctored){ S.lastAct=Date.now();
    setTimeout(()=>{const v=$('#pcam'); if(v&&window.PROCTOR)window.PROCTOR.attach(v)},120); }
  $$('[data-o]').forEach(el=>el.addEventListener('click',e=>{
    if(S)S.lastAct=Date.now();
    if(e.target.closest('[data-st]'))return; if(S.checked[S.idx])return;
    const i=+el.dataset.o,q=S.items[S.idx].q,n=needed(q);
    if(n>1){const cur=Array.isArray(S.ans[S.idx])?S.ans[S.idx].slice():[];
      const k=cur.indexOf(i);
      if(k>=0)cur.splice(k,1);
      else{if(cur.length>=n){alert(t('vMax',{n:n}));return}cur.push(i)}
      S.ans[S.idx]=cur}else S.ans[S.idx]=i;
    render()}));
  $$('[data-st]').forEach(b=>b.onclick=e=>{e.stopPropagation();
    const k=S.idx+'_'+b.dataset.st;S.struck[k]=!S.struck[k];render()});
  const fl=$('#flag'); if(fl)fl.onclick=()=>{S.flags[S.idx]=!S.flags[S.idx];render()};
  const cl=$('#calc'); if(cl)cl.onclick=()=>{S.calc=!S.calc;S.wb=false;render()};
  const wb=$('#wbb'); if(wb)wb.onclick=()=>{S.wb=!S.wb;S.calc=false;render()};
  const tq=$('#trq'); if(tq)tq.onclick=()=>{ const q=S.items[S.idx].q;
    if(!hasAlt(q))return; S.trx=S.trx||{}; S.trx[S.idx]=!S.trx[S.idx]; render()};
  const ab=$('#aib'); if(ab)ab.onclick=()=>{alert(aiReply('tech').replace(/\*\*/g,''))};
  const ck=$('#check'); if(ck)ck.onclick=()=>{
    if(S.ans[S.idx]==null){alert(t('pickFirst'));return}
    if(S.kind==='full'&&!S.ackC){
      if(!confirm(t('checkWarn')))return;
      S.ackC=true}
    S.checked[S.idx]=true;render()};
  $$('[data-px]').forEach(b=>b.onclick=()=>{
    if(b.dataset.px==='calc')S.calc=false;else S.wb=false;render()});
  const pv=$('#prev'); if(pv)pv.onclick=()=>{if(S.idx>0){S.idx--;render()}};
  const nx=$('#next'); if(nx)nx.onclick=()=>{const v=validate();if(v){alert(v);return}
    if(S.idx<S.items.length-1){S.idx++;checkBreak();render()}};
  const sb=$('#sub'); if(sb)sb.onclick=()=>submit(false);
  const nb=$('#navb'); if(nb)nb.onclick=()=>{S.nav=!S.nav;render()};
  const nx2=$('#navx'); if(nx2)nx2.onclick=()=>{S.nav=false;render()};
  const nov=$('#navov'); if(nov)nov.onclick=e=>{if(e.target===nov){S.nav=false;render()}};
  $$('[data-nf]').forEach(b=>b.onclick=()=>{S.navF=b.dataset.nf;render()});
  $$('[data-nj]').forEach(b=>b.onclick=()=>{S.idx=+b.dataset.nj;S.nav=false;render()});
  $$('[data-case]').forEach(b=>b.onclick=()=>{S.caseOpen=S.caseOpen||{};
    S.caseOpen[b.dataset.case]=!S.caseOpen[b.dataset.case];render()});
  $$('[data-c]').forEach(b=>b.onclick=()=>{const k=b.dataset.c;let v=S.calcVal||'0';
    const M={'÷':'/','×':'*','−':'-','+':'+'};
    if(k==='C')v='0'; else if(k==='⌫')v=v.length>1?v.slice(0,-1):'0';
    else if(k==='='){try{v=String(Function('return ('+v.replace(/[^0-9+\-*/.() ]/g,'')+')')())}
      catch(e){v=t('err')}}
    else if(k==='±')v=v.startsWith('-')?v.slice(1):'-'+v;
    else if(k==='%'){try{v=String(parseFloat(v)/100)}catch(e){}}
    else if(M[k])v=(v==='0'?'':v)+M[k];
    else v=(v==='0'||v===t('err'))?k:v+k;
    S.calcVal=v;const d2=$('#cdisp');if(d2)d2.value=v});
  $$('[data-wbc]').forEach(b=>b.onclick=()=>{wbColor=b.dataset.wbc;wbErase=false;
    $$('[data-wbc]').forEach(x=>x.classList.toggle('on',x===b))});
  $$('[data-wbs]').forEach(b=>b.onclick=()=>{wbSize=+b.dataset.wbs;wbErase=false;
    $$('[data-wbs]').forEach(x=>x.classList.toggle('on',x===b))});
  const wbe=$('[data-wbe]'); if(wbe)wbe.onclick=()=>{wbErase=!wbErase;
    wbe.classList.toggle('on',wbErase)};
  const wbc2=$('[data-wbclr]'); if(wbc2)wbc2.onclick=()=>{const c=$('#wbc');
    if(c&&wbCtx)wbCtx.clearRect(0,0,c.width,c.height)};
}
function bindReport(){
  bindFs();
  const lt=$('#langT'); if(lt)lt.onclick=()=>{I.set(isAr()?'en':'ar');
    if(sim.id)sim={id:sim.id,step:sim.step,ans:sim.ans}; render()};
  const tl=$('#trLock'); if(tl)tl.onclick=()=>{
    if(!confirm(isAr()?'الخروج من وضع المدرّب؟ ستختفي الإدارة.'
      :'Exit trainer mode? Admin will be hidden.'))return;
    TRAINER.lock(); page='life'; render()};
  /* فتح مخفي: خمس نقرات على الشعار خلال ٣ ثوانٍ */
  const lg=$('.logo'); if(lg&&!TRAINER.on()){
    lg.onclick=()=>{ const now=Date.now();
      if(!window.__tc||now-window.__tc.t>3000) window.__tc={n:0,t:now};
      window.__tc.n++; window.__tc.t=now;
      if(window.__tc.n>=5){ window.__tc=null;
        const c=prompt(isAr()?'رمز المدرّب:':'Trainer code:');
        if(c===null)return;
        if(TRAINER.unlock(c)){ alert(isAr()?'✅ فُتح وضع المدرّب.':'✅ Trainer mode unlocked.');
          page='admin'; render(); }
        else alert(isAr()?'رمز غير صحيح.':'Incorrect code.'); } };
  }
  $$('[data-page]').forEach(b=>b.onclick=()=>{S=null;page=b.dataset.page;render()});
  const rv=$('#rev'); if(rv)rv.onclick=()=>{const b=$('#revBox');
    S.rvOpen=!S.rvOpen;b.innerHTML=S.rvOpen?reviewList():'';bindRv()};
  bindRv();
  const sc=$('#showCert'); if(sc)sc.onclick=()=>{S.showCert=true;render()};
  const ctx=$('#ctx'); if(ctx)ctx.onclick=()=>{S.showCert=false;render()};
  const ctp=$('#ctPrint'); if(ctp)ctp.onclick=()=>window.print();
  const ctw=$('#ctWa'); if(ctw)ctw.onclick=()=>sendWA();
  const wa=$('#waSend'); if(wa)wa.onclick=()=>sendWA();
  const pr=$('#prt'); if(pr)pr.onclick=()=>window.print();
  const ag=$('#again'); if(ag)ag.onclick=()=>{S=null;page='exams';render()};
  const hm=$('#hm'); if(hm)hm.onclick=()=>{S=null;page='home';render()};
}
function bindRv(){
  const re=()=>{const x=$('#revBox');if(x){x.innerHTML=reviewList();bindRv()}};
  $$('[data-rvf]').forEach(b=>b.onclick=()=>{S.rvF=b.dataset.rvf;re()});
  const g=$('#rvgrid'); if(g)g.onclick=()=>{S.rvGrid=!S.rvGrid;re()};
  $$('[data-rvj]').forEach(b=>b.onclick=()=>{S.rvF='all';re();
    setTimeout(()=>{const c=$$('.rv')[+b.dataset.rvj];
      if(c){c.scrollIntoView({behavior:'smooth',block:'center'});
        c.classList.add('hl');setTimeout(()=>c.classList.remove('hl'),1600)}},80)});
}
function checkBreak(){ (S.breaks||[]).forEach((b,i)=>{
  if(!S.doneBrk.has(i)&&S.idx+1>b.after){S.doneBrk.add(i);S.onBreak=true;S.brkLeft=b.min*60}})}


/* ════════════════════════════════════════════
   حماية المحتوى — النسخ والطباعة ولقطة الشاشة
   ════════════════════════════════════════════ */
const PROTECT = (function(){
  const inExam = () => !!(S && !S.submitted);
  const anyContent = () => inExam() || ['content','acts','fb','sim'].includes(page);
  let shield=null;
  function toast(msg){
    let e=document.getElementById('ptoast');
    if(!e){ e=document.createElement('div'); e.id='ptoast'; document.body.appendChild(e); }
    e.textContent=msg; e.className='show';
    clearTimeout(e._t); e._t=setTimeout(()=>e.className='',2600);
  }
  function veil(on){
    if(on){ if(shield)return;
      shield=document.createElement('div'); shield.id='pshield';
      shield.innerHTML='<div><b>🔒</b><span>'+I.get('protectMsg')+'</span></div>';
      document.body.appendChild(shield);
    } else if(shield){ shield.remove(); shield=null; }
  }
  /* منع النسخ والقصّ والسحب والقائمة اليمنى */
  ['copy','cut','dragstart','selectstart'].forEach(ev=>
    document.addEventListener(ev, e=>{ if(!anyContent())return;
      e.preventDefault(); if(ev==='copy'||ev==='cut') toast(I.get('protectMsg')); }, true));
  document.addEventListener('contextmenu', e=>{ if(anyContent()){e.preventDefault();
    toast(I.get('protectMsg'))} }, true);
  /* منع اختصارات النسخ والطباعة والحفظ وعرض المصدر وأدوات المطوّر */
  document.addEventListener('keydown', e=>{
    if(!anyContent())return;
    const k=(e.key||'').toLowerCase(), m=e.ctrlKey||e.metaKey;
    if(m && ['c','x','a','s','p','u'].includes(k)){ e.preventDefault();
      toast(I.get('protectMsg')); return; }
    if(k==='printscreen'){ e.preventDefault(); veil(true);
      toast(I.get('ssWarn')); setTimeout(()=>veil(false),1400); return; }
    if(e.key==='F12' || (m&&e.shiftKey&&['i','j','c'].includes(k))){ e.preventDefault();
      toast(I.get('protectMsg')); }
  }, true);
  /* تعتيم عند فقد التركيز — يقاوم أدوات اللقطة الخارجية */
  window.addEventListener('blur', ()=>{ if(anyContent()) veil(true) });
  window.addEventListener('focus', ()=> veil(false));
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden && anyContent()) veil(true); else veil(false); });
  /* منع الطباعة */
  window.addEventListener('beforeprint', ()=>{ if(anyContent()) veil(true) });
  window.addEventListener('afterprint', ()=> veil(false));
  return { toast, veil, allowPrint:()=>!anyContent() };
})();

window.addEventListener('beforeunload',e=>{if(S&&!S.submitted){e.preventDefault();e.returnValue=''}});
render();
window.SOMU_APP={get S(){return S},build,render,submit,setFs,
  get sim(){return sim},set sim(v){sim=v},get page(){return page},set page(v){page=v}};
})();
