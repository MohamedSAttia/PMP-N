/* ============================================================
   واجهة دورة حياة المشروع — تُحمَّل بعد المحرك
   ============================================================ */
window.LIFEUI = (function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
let A=null;            /* واجهة المحرك: {t,isAr,pick,DB,render} */
let st={stage:0, proc:null, procF:'all',
        board:{on:false,q:0,ans:{},scores:{},done:false,res:null,listening:false,cam:false}};

const L=()=>A.isAr()?0:1;
const P=()=>window.PROC, LF=()=>window.LIFE, B=()=>window.BOARD;
const dat=()=>A.DB.get('life',{})||{};
const save=d=>A.DB.set('life',d);
const fv=(sk,fk)=>{const d=dat();return (d[sk]||{})[fk]||''};
const setv=(sk,fk,v)=>{const d=dat();d[sk]=d[sk]||{};d[sk][fk]=v;save(d)};

/* نسبة اكتمال المرحلة */
function pct(s){
  if(s.k==='board'){const d=dat().board;return (d&&d.verdict)?100:0}
  if(s.dyn==='stake'){const r=dat().stakeRows||[];return r.length?Math.min(100,r.length*20):0}
  const f=s.f||[]; if(!f.length)return 0;
  let n=0; f.forEach(x=>{const v=fv(s.k,x.k); if(String(v).trim())n++});
  return Math.round(n/f.length*100);
}
function overall(){
  const ss=LF(); let t=0; ss.forEach(s=>t+=pct(s)); return Math.round(t/ss.length);
}

/* ═══ الصفحة ═══ */
function page(){
  const ss=LF(), cur=ss[st.stage], l=L();
  const ov=overall();
  return `<div class="hero" style="padding:24px">
    <span class="k">PROJECT LIFECYCLE</span>
    <h1 style="font-size:1.35rem">${A.isAr()?'🔄 دورة حياة المشروع':'🔄 Project Lifecycle'}</h1>
    <p>${A.isAr()
      ?'من حاجة العمل إلى الإغلاق — إحدى عشرة مرحلة تمرّ بالأربعين عملية بمدخلاتها ومخرجاتها.'
      :'From business need to closure — eleven stages traversing all forty processes with their inputs and outputs.'}</p>
    <div class="stats">
      <div class="st"><b class="m">${ov}%</b><span>${A.isAr()?'الإنجاز':'Complete'}</span></div>
      <div class="st"><b class="m">11</b><span>${A.isAr()?'مراحل':'Stages'}</span></div>
      <div class="st"><b class="m">40</b><span>${A.isAr()?'عملية':'Processes'}</span></div>
      <div class="st"><b class="m">${(dat().stakeRows||[]).length}</b>
        <span>${A.isAr()?'صاحب مصلحة':'Stakeholders'}</span></div>
    </div></div>

  <div class="lf-rail">${ss.map((s,i)=>{const p=pct(s);
    return `<button class="lf-t${i===st.stage?' on':''}${p===100?' ok':''}" data-lfs="${i}">
      <span class="lf-i">${s.ic}</span>
      <b>${s.n}. ${esc(s.t[l])}</b>
      <span class="lf-p"><i style="width:${p}%"></i></span></button>`}).join('')}
  </div>

  <div class="card" style="padding:22px">
    <div class="lf-h"><span class="lf-bi">${cur.ic}</span>
      <div><b>${cur.n}. ${esc(cur.t[l])}</b>
        <span>${esc(cur.d[l])}</span></div>
      <span class="tag ${pct(cur)===100?'g':'o'}">${pct(cur)}%</span></div>

    ${cur.k==='board' ? boardUI()
      : cur.k==='charter' ? charterUI()
      : cur.dyn==='stake' ? stakeUI()
      : formUI(cur)}

    ${cur.proc&&cur.proc.length?`<div class="lf-proc">
      <h4>${A.isAr()?'العمليات المرتبطة بهذه المرحلة':'Processes in this stage'}
        <span class="tag">${cur.proc.length}</span></h4>
      <div class="lf-pg">${cur.proc.map(n=>{
        const p=P().L.find(x=>x.n===n); if(!p)return '';
        return `<button class="lf-pc" data-proc="${n}">
          <span class="lf-pn m">${n}</span>
          <span class="lf-pt">${esc(p.t[l])}</span>
          <span class="lf-pd">${esc(P().GR[p.g][A.isAr()?'ar':'en'])}</span></button>`}).join('')}</div>
    </div>`:''}

    <div style="display:flex;gap:9px;margin-top:18px;flex-wrap:wrap;
      padding-top:15px;border-top:1px solid var(--line)">
      <button class="btn o" id="lfPrev" ${st.stage===0?'disabled':''}>
        ${A.isAr()?'◀ السابقة':'◀ Previous'}</button>
      <button class="btn p" id="lfNext" ${st.stage===ss.length-1?'disabled':''}>
        ${A.isAr()?'التالية ▶':'Next ▶'}</button>
      <span style="flex:1"></span>
      <button class="btn o" id="lfExp">${A.isAr()?'⬇ صدّر المشروع':'⬇ Export project'}</button>
      <button class="btn o" id="lfRst" style="color:var(--bad)">
        ${A.isAr()?'↺ ابدأ من جديد':'↺ Start over'}</button>
    </div>
  </div>

  <h2 class="sec">${A.isAr()?'📊 لوحة المشروع':'📊 Project Dashboard'}</h2>
  ${dash()}
  <h2 class="sec">${A.isAr()?'📚 الأربعون عملية':'📚 The Forty Processes'}</h2>
  ${procLib()}
  ${st.proc?procModal(st.proc):''}`;
}

/* ═══ نموذج المرحلة ═══ */
function formUI(s){
  const l=L();
  return `<div class="lf-form">${(s.f||[]).map(f=>{
    const v=fv(s.k,f.k);
    if(f.ty==='score'){
      const n=parseInt(v)||0;
      return `<div class="lf-f"><label>${esc(f.l[l])}</label>
        <div class="lf-sc">${[1,2,3,4,5].map(x=>
          `<button class="lf-s${n>=x?' on':''}" data-sc="${s.k}|${f.k}|${x}">${x}</button>`).join('')}
          <span class="lf-sl">${n?[
            A.isAr()?'غير مجدٍ':'Not feasible', A.isAr()?'ضعيف':'Weak',
            A.isAr()?'مقبول':'Acceptable', A.isAr()?'جيد':'Good',
            A.isAr()?'ممتاز':'Excellent'][n-1]:''}</span></div></div>`;
    }
    if(f.ty==='sel'){
      return `<div class="lf-f"><label>${esc(f.l[l])}</label>
        <select class="lf-in" data-lfv="${s.k}|${f.k}">
          <option value="">${A.isAr()?'— اختر —':'— Select —'}</option>
          ${f.opts.map(o=>`<option value="${o[0]}" ${v===o[0]?'selected':''}>
            ${esc(o[l+1])}</option>`).join('')}</select></div>`;
    }
    if(f.ty==='num'){
      return `<div class="lf-f"><label>${esc(f.l[l])}</label>
        <input type="number" class="lf-in" data-lfv="${s.k}|${f.k}" value="${esc(v)}"></div>`;
    }
    return `<div class="lf-f"><label>${esc(f.l[l])}</label>
      <textarea class="lf-in" rows="${f.rows||3}" data-lfv="${s.k}|${f.k}"
        placeholder="${esc((f.ph||['',''])[l]||'')}">${esc(v)}</textarea></div>`;
  }).join('')}</div>
  ${s.k==='case'?bcCalc():''}
  ${s.k==='mon'?evCalc():''}
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
    <button class="btn g" data-lfgen="${s.k}">
      ${A.isAr()?'✨ ولّد مسوّدة':'✨ Generate draft'}</button>
    ${s.tp?`<button class="btn o" data-lftp="${s.tp}">
      ${A.isAr()?'📄 القالب':'📄 Template'}</button>`:''}
  </div>`;
}

/* ═══ حاسبة حالة العمل ═══ */
function bcCalc(){
  const d=dat().case||{};
  const c=parseFloat(d.cost)||0, b=parseFloat(d.benefit)||0, y=parseFloat(d.years)||0;
  if(!(c&&b&&y)) return `<div class="note i" style="margin-top:12px">${A.isAr()
    ?'أدخل الاستثمار والمنفعة والأفق ليحسب النظام العائد وفترة الاسترداد.'
    :'Enter investment, benefit and horizon and the system will compute ROI and payback.'}</div>`;
  const pb=c/b, tot=b*y, roi=(tot-c)/c*100, npv=tot*0.9-c;
  return `<div class="lf-calc">
    <div class="lf-cc ${pb<=3?'g':pb<=5?'m':'b'}"><b class="m">${pb.toFixed(1)}</b>
      <span>${A.isAr()?'سنة استرداد':'yr payback'}</span></div>
    <div class="lf-cc ${roi>=50?'g':roi>0?'m':'b'}"><b class="m">${Math.round(roi)}%</b>
      <span>${A.isAr()?'عائد الاستثمار':'ROI'}</span></div>
    <div class="lf-cc ${npv>0?'g':'b'}"><b class="m">${Math.round(npv)}</b>
      <span>${A.isAr()?'صافي تقريبي':'approx net'}</span></div>
    <div class="lf-cc"><b class="m">${Math.round(tot)}</b>
      <span>${A.isAr()?'منفعة تراكمية':'total benefit'}</span></div>
  </div>`;
}
function evCalc(){
  const d=dat().mon||{};
  const bac=parseFloat(d.bac)||0, pv=parseFloat(d.pv)||0,
        ev=parseFloat(d.ev)||0, ac=parseFloat(d.ac)||0;
  if(!(bac&&pv&&ev&&ac)) return `<div class="note i" style="margin-top:12px">${A.isAr()
    ?'أدخل BAC و PV و EV و AC ليحسب النظام المؤشّرات ويقرأها لك.'
    :'Enter BAC, PV, EV and AC and the system will compute and interpret the indices.'}</div>`;
  const cpi=ev/ac, spi=ev/pv, eac=bac/cpi, tcpi=(bac-ev)/(bac-ac), vac=bac-eac;
  const rd=(v)=>v>=1?'g':v>=.9?'m':'b';
  return `<div class="lf-calc">
    <div class="lf-cc ${rd(cpi)}"><b class="m">${cpi.toFixed(2)}</b><span>CPI</span></div>
    <div class="lf-cc ${rd(spi)}"><b class="m">${spi.toFixed(2)}</b><span>SPI</span></div>
    <div class="lf-cc ${vac>=0?'g':'b'}"><b class="m">${Math.round(eac)}</b><span>EAC</span></div>
    <div class="lf-cc ${vac>=0?'g':'b'}"><b class="m">${Math.round(vac)}</b><span>VAC</span></div>
    <div class="lf-cc ${tcpi<=1.05?'g':tcpi<=1.15?'m':'b'}"><b class="m">${tcpi.toFixed(2)}</b>
      <span>TCPI</span></div>
  </div>
  <div class="note ${cpi<1||spi<1?'w':'g'}" style="margin-top:10px">
    ${A.isAr()
      ? `<b>القراءة:</b> ${cpi<1?'تجاوز في التكلفة':'ضمن الميزانية'} · ${spi<1?'تأخّر عن الجدول':'ضمن الجدول'}.
         التقدير عند الإنجاز <b>${Math.round(eac)}</b> — ${vac<0?`تجاوز متوقّع <b>${Math.abs(Math.round(vac))}</b>`:'ضمن الميزانية'}.
         الكفاءة المطلوبة للمتبقّي <b>${tcpi.toFixed(2)}</b>${tcpi>1.1?` — وهي فجوة ${Math.round((tcpi-cpi)/cpi*100)}٪ عن أدائك الحالي.`:'.'}`
      : `<b>Reading:</b> ${cpi<1?'over budget':'within budget'} · ${spi<1?'behind schedule':'on schedule'}.
         EAC is <b>${Math.round(eac)}</b> — ${vac<0?`a forecast overrun of <b>${Math.abs(Math.round(vac))}</b>`:'within budget'}.
         Required efficiency on the remainder is <b>${tcpi.toFixed(2)}</b>${tcpi>1.1?` — a ${Math.round((tcpi-cpi)/cpi*100)}% gap from current performance.`:'.'}`}
  </div>`;
}


/* ═══ مولّد الميثاق الكامل ═══ */
function CH_AR(){return{
 id_name:'مشروع FRIGATE BRAVO', id_code:'FB-2026-01',
 id_sponsor:'نائب الرئيس للعمليات — راعي البرنامج',
 id_pm:'مدير البرنامج — يُعيَّن بقرار من مجلس البرنامج',
 id_date:'2026-09-13', id_ver:'1.0',
 purpose_need:'الأسطول الحالي يبلغ نهاية عمره التشغيلي خلال خمس سنوات، ولا تملك الدولة قدرة بناء بحري محلية معتمدة. الاعتماد الكامل على الاستيراد يرفع كلفة دورة الحياة ويقيّد الجاهزية.',
 purpose_just:'البناء المحلي بتصميم مرخّص يوازن بين تقليل مخاطر التصميم وبناء قدرة صناعية تدريجية، مع خيار تعاقدي لهيكلين تاليين يوزّع الكلفة الثابتة.',
 purpose_link:'مبنيّ على دراسة الجدوى (الخيار الثالث) وحالة العمل المعتمدة من مجلس الاستثمار: استثمار ٨٤٠ مليون · منفعة سنوية ٣١٠ مليون · استرداد ٢٫٧ سنة.',
 obj_obj:'• التسليم وفق المعالم التعاقدية بلا فقد أي نقطة توقّف\n• الحصول على شهادة جمعية التصنيف بلا تحفّظات جوهرية\n• البقاء داخل الميزانية المعتمدة ٨٤٠ مليون\n• تحقيق نسبة المحتوى المحلي المتعاقد عليها\n• تأهيل العدد المتفق عليه من اللحّامين محلياً',
 obj_succ:'قبول رسمي مكتوب من العميل البحري للقدرة القتالية · اجتياز التجارب البحرية · CPI و SPI عند التسليم ≥ ٠٫٩٥',
 obj_exit:'يُنهى المشروع إن سُحب ترخيص التصميم، أو تعذّر الحصول على شهادة التصنيف بعد استنفاد المعالجات، أو تجاوز التكلفة ٢٥٪ بلا موافقة تمويل إضافي.',
 scope_in:'بناء وتجهيز فراقة قائدة كاملة · تكامل منظومة القتال بزياداتها الخمس · التجارب البحرية والقبول · نقل القدرة وتأهيل اللحّامين · التوثيق التشغيلي',
 scope_out:'الهيكلان التاليان (خيار تعاقدي منفصل) · الدعم اللوجستي بعد سنة الضمان · تدريب الأطقم البحرية التشغيلية · البنية التحتية للقاعدة',
 scope_req:'الامتثال لقواعد جمعية التصنيف · التزام ضوابط التصدير على التصميم المرخّص · معايير قبول موثّقة ومعتمدة لكل زيادة قبل بدئها · متطلبات السلامة وتأهيل اللحام الوطنية',
 scope_deliv:'الفراقة مكتملة التجهيز · شهادة جمعية التصنيف · حزمة التوثيق التشغيلي والصيانة · تقرير نقل القدرة · سجلّ الدروس المستفادة',
 time_start:'2026-01-15', time_end:'2029-01-15',
 time_mile:'قطع أول صفيحة — الشهر ٣\nوضع العارضة — الشهر ٨\nالإنزال — الشهر ٢٠\nتشغيل المنظومات — الشهر ٢٨\nالتجارب البحرية — الشهر ٣٣\nالتسليم والقبول — الشهر ٣٦',
 money_budget:'٨٤٠ مليون', money_cont:'٥٦ مليون — بسلطة مدير البرنامج',
 money_mgmt:'٢٨ مليون — بسلطة مجلس البرنامج',
 money_res:'فريق أساسي ٣٢ شخصاً · حوض جاف مخصّص · لحّامون معتمدون (عدد متفق عليه) · مساح جمعية التصنيف بالحجز المسبق',
 money_fund:'تمويل حكومي مرحلي مرتبط بنقاط التوقّف التعاقدية — الدفعة تُفرج بعد إقرار المرحلة.',
 risk_risk:'تأخّر المورّدين الحرجين على المسار الحرج · عدم توافر مساح التصنيف لنقاط التوقّف · فقد اللحّامين المعتمدين · غموض معايير قبول منظومة القتال · قيود ضوابط التصدير على التصميم',
 risk_assum:'استمرار ترخيص التصميم طوال المشروع · توافر الحوض الجاف وفق الجدول · ثبات نطاق منظومة القتال بعد اعتماد المعايير · استقرار أسعار الصرف ضمن ±١٠٪',
 risk_const:'الميزانية المعتمدة ٨٤٠ مليون · الموعد التعاقدي ٣٦ شهراً · قواعد جمعية التصنيف غير قابلة للتفاوض · ضوابط التصدير تحدّ ما يُشارك مع الفريق',
 risk_dep:'ترخيص التصميم من الشريك الخارجي · توافر مساح جمعية التصنيف · تسليم حزمة الدفع من المورّد · موافقات سلطة التصدير',
 stake_key:'العميل البحري (سلطة القبول) · جمعية التصنيف (نقاط التوقّف) · مجلس البرنامج (التمويل) · الحوض (التنفيذ) · شريك التصميم (الترخيص) · نقابة الحوض (التأهيل) · المورّدون الحرجون',
 stake_comm:'تقرير أداء شهري لمجلس البرنامج · تقرير أسبوعي لمسؤولي المسارات · إخطار فوري لأي فقد نقطة توقّف · مستودع وثائق واحد متاح للجميع',
 gov_auth:'سلطة توجيه الموارد المخصّصة · اعتماد التغييرات دون العتبة · التعاقد ضمن خطة المشتريات المعتمدة · تمثيل المشروع أمام العميل وجمعية التصنيف',
 gov_thresh:'عشرة ملايين — وما فوقها يُصعَّد لمجلس البرنامج',
 gov_esc:'مسؤول المسار ← مدير البرنامج ← الراعي ← مجلس البرنامج. التصعيد بعد محاولتين موثّقتين للحلّ على المستوى الأدنى.',
 gov_report:'تقرير شهري لمجلس البرنامج (أداء · مخاطر · تغييرات) · تقرير أسبوعي داخلي · إخطار فوري بالمشكلات الحرجة',
 gov_appr:'اجتياز كل نقاط التوقّف · شهادة التصنيف صادرة بلا تحفّظات جوهرية · قبول العميل الرسمي للقدرة · تسوية كل العقود',
 sign_spname:'نائب الرئيس للعمليات', sign_spdate:'2026-09-13',
 sign_pmname:'مدير البرنامج — يقبل التعيين والصلاحيات الممنوحة',
 sign_others:'المدير المالي (الميزانية) · مدير الجودة (الامتثال التقني)'};}
function CH_EN(){return{
 id_name:'Project FRIGATE BRAVO', id_code:'FB-2026-01',
 id_sponsor:'VP Operations — Programme Sponsor',
 id_pm:'Programme Manager — appointed by programme board decision',
 id_date:'2026-09-13', id_ver:'1.0',
 purpose_need:'The current fleet reaches end of operational life within five years, and the state has no certified domestic naval build capability. Full import dependence raises lifecycle cost and constrains readiness.',
 purpose_just:'A domestic build under a licensed design balances reduced design risk against incremental capability build, with a contracted option for two follow-on hulls that spreads the fixed cost.',
 purpose_link:'Based on the feasibility study (option three) and the business case approved by the investment board: 840 million investment · 310 million annual benefit · 2.7-year payback.',
 obj_obj:'• Delivery against contractual milestones with no hold point lost\n• Classification society certificate with no material qualifications\n• Remain within the approved 840 million budget\n• Achieve the contracted local content percentage\n• Qualify the agreed number of welders domestically',
 obj_succ:'Formal written acceptance of combat capability by the naval customer · sea trials passed · CPI and SPI at delivery ≥ 0.95',
 obj_exit:'The project terminates if the design licence is withdrawn, if classification certification proves unattainable after remedies are exhausted, or if cost exceeds 25% without approved additional funding.',
 scope_in:'Build and outfit one complete lead frigate · integrate the combat system across its five increments · sea trials and acceptance · capability transfer and welder qualification · operational documentation',
 scope_out:'The two follow-on hulls (separate contracted option) · logistics support beyond the warranty year · operational crew training · base infrastructure',
 scope_req:'Compliance with classification society rules · adherence to export controls on the licensed design · documented and agreed acceptance criteria per increment before it starts · national safety and welder qualification requirements',
 scope_deliv:'The fully outfitted frigate · classification certificate · operational and maintenance documentation package · capability transfer report · lessons learned register',
 time_start:'2026-01-15', time_end:'2029-01-15',
 time_mile:'First steel cut — month 3\nKeel laying — month 8\nLaunch — month 20\nSystems commissioning — month 28\nSea trials — month 33\nDelivery and acceptance — month 36',
 money_budget:'840 million', money_cont:'56 million — programme manager authority',
 money_mgmt:'28 million — programme board authority',
 money_res:'Core team of 32 · dedicated dry dock · certified welders (agreed number) · classification surveyor on advance booking',
 money_fund:'Staged government funding tied to contractual hold points — payment releases after stage approval.',
 risk_risk:'Critical supplier delay on the critical path · class surveyor unavailability for hold points · loss of certified welders · ambiguous combat-system acceptance criteria · export control constraints on the design',
 risk_assum:'The design licence remains valid throughout · the dry dock is available per schedule · combat-system scope is stable once criteria are agreed · exchange rates remain within ±10%',
 risk_const:'Approved budget of 840 million · contractual deadline of 36 months · classification society rules are non-negotiable · export controls limit what is shared with the team',
 risk_dep:'Design licence from the external partner · classification surveyor availability · propulsion package delivery from the supplier · export authority approvals',
 stake_key:'Naval customer (acceptance authority) · classification society (hold points) · programme board (funding) · the yard (execution) · design partner (licence) · yard union (qualification) · critical suppliers',
 stake_comm:'Monthly performance report to the programme board · weekly report to stream leads · immediate notification of any hold point loss · a single document repository accessible to all',
 gov_auth:'Authority to direct assigned resources · approve changes below threshold · contract within the approved procurement plan · represent the project to the customer and classification society',
 gov_thresh:'Ten million — above this escalates to the programme board',
 gov_esc:'Stream lead → programme manager → sponsor → programme board. Escalation follows two documented resolution attempts at the lower level.',
 gov_report:'Monthly report to the programme board (performance · risks · changes) · weekly internal report · immediate notification of critical issues',
 gov_appr:'All hold points passed · classification certificate issued with no material qualifications · formal customer acceptance of capability · all contracts settled',
 sign_spname:'VP Operations', sign_spdate:'2026-09-13',
 sign_pmname:'Programme Manager — accepts the appointment and delegated authority',
 sign_others:'CFO (budget) · Quality Director (technical compliance)'};}

/* ═══ ميثاق المشروع الكامل ═══ */
function chMeta(){
  const d=dat(); d.chMeta=d.chMeta||{
    no:'CHR-FB-'+new Date().getFullYear()+'-001', ver:'1.0',
    signed:false, sig:null, log:[] };
  return d.chMeta;
}
function chSave(m){ const d=dat(); d.chMeta=m; save(d); }
function chHash(){
  const d=dat().charter||{}, s2=JSON.stringify(d);
  let h=0; for(let i2=0;i2<s2.length;i2++){h=((h<<5)-h+s2.charCodeAt(i2))|0}
  return ('00000000'+(h>>>0).toString(16)).slice(-8).toUpperCase();
}
function charterUI(){
  const C=window.CHARTER; if(!C) return formUI(LF().find(x=>x.k==='charter'));
  const l=L(), d=dat().charter||{}, m=chMeta(), ar=A.isAr();
  const done=C.secs.reduce((a,s2)=>a+s2.f.filter(f=>String(d[s2.k+'_'+f.k]||'').trim()).length,0);
  const tot=C.secs.reduce((a,s2)=>a+s2.f.length,0);
  const lock=m.signed;
  return `<div class="ch-id">
    <div class="ch-idc"><span>${ar?'رقم الوثيقة':'Document no.'}</span><b class="m">${esc(m.no)}</b></div>
    <div class="ch-idc"><span>${ar?'الإصدار':'Version'}</span><b class="m">${esc(m.ver)}</b></div>
    <div class="ch-idc"><span>${ar?'الحالة':'Status'}</span>
      <b class="${lock?'lk':'dr'}">${lock?(ar?'🔒 موقّع':'🔒 Signed'):(ar?'✎ مسوّدة':'✎ Draft')}</b></div>
    ${lock?`<div class="ch-idc"><span>${ar?'بصمة المحتوى':'Content hash'}</span>
      <b class="m sm">${esc(m.sig.hash)}</b></div>`:''}
  </div>
  ${lock?`<div class="note g" style="margin-bottom:13px">
    <b>${ar?'🔒 الميثاق موقّع ومعتمد':'🔒 Charter signed and approved'}</b><br>
    ${ar?`وقّعه <b>${esc(m.sig.name)}</b> — ${esc(m.sig.role)} بتاريخ ${esc(m.sig.date)}.
      التعديل لا يتمّ إلا عبر <b>طلب تغيير</b> يرفع الإصدار ويُسجَّل في سجلّ التغييرات.`
      :`Signed by <b>${esc(m.sig.name)}</b> — ${esc(m.sig.role)} on ${esc(m.sig.date)}.
      Changes are made only through a <b>change request</b> that raises the version and is recorded in the change log.`}
  </div>`:`<div class="ch-bar"><span>${ar?'اكتمال الميثاق':'Charter completion'}</span>
    <i><b style="width:${Math.round(done/tot*100)}%"></b></i>
    <span class="m">${done}/${tot}</span></div>`}

  <div class="ch${lock?' lock':''}">${C.secs.map((sec,si)=>{
    const op=st.chSec===si;
    const dn=sec.f.filter(f=>String(d[sec.k+'_'+f.k]||'').trim()).length;
    return `<div class="ch-s${op?' on':''}">
      <button class="ch-h" data-chs="${si}">
        <b>${esc(sec.t[l])}</b>
        <span class="tag ${dn===sec.f.length?'g':dn?'o':''}">${dn}/${sec.f.length}</span>
        <span class="ar">›</span></button>
      ${op?`<div class="ch-b">${sec.f.map(f=>{
        const v=d[sec.k+'_'+f.k]||'', id=sec.k+'_'+f.k;
        if(lock) return `<div class="lf-f"><label>${esc(f.l[l])}</label>
          <div class="ch-ro">${v?md(v):'<em>—</em>'}</div></div>`;
        if(f.ty==='a') return `<div class="lf-f"><label>${esc(f.l[l])}</label>
          <textarea class="lf-in" rows="${f.r||3}" data-chv="${id}">${esc(v)}</textarea></div>`;
        if(f.ty==='d') return `<div class="lf-f"><label>${esc(f.l[l])}</label>
          <input type="date" class="lf-in" data-chv="${id}" value="${esc(v)}"></div>`;
        return `<div class="lf-f"><label>${esc(f.l[l])}</label>
          <input class="lf-in" data-chv="${id}" value="${esc(v)}"></div>`;
      }).join('')}</div>`:''}
    </div>`}).join('')}</div>

  ${m.log&&m.log.length?`<h4 class="ch-lh">${ar?'📋 سجلّ التغييرات':'📋 Change Log'}</h4>
    <div class="tscroll"><table class="tbl"><thead><tr>
      <th>${ar?'الإصدار':'Ver'}</th><th>${ar?'التاريخ':'Date'}</th>
      <th>${ar?'التغيير':'Change'}</th><th>${ar?'المبرّر':'Rationale'}</th>
      <th>${ar?'المعتمِد':'Approver'}</th></tr></thead><tbody>
      ${m.log.slice().reverse().map(x=>`<tr><td class="m">${esc(x.ver)}</td>
        <td class="m">${esc(x.date)}</td><td>${esc(x.what)}</td>
        <td>${esc(x.why)}</td><td>${esc(x.by)}</td></tr>`).join('')}
    </tbody></table></div>`:''}

  <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
    ${lock?`<button class="btn s" id="chCR">${ar?'📝 طلب تغيير':'📝 Change request'}</button>
      <button class="btn o" id="chUnsign" style="color:var(--bad)">
        ${ar?'🔓 سحب الاعتماد':'🔓 Revoke approval'}</button>`
     :`<button class="btn g" id="chGen">${ar?'✨ ولّد الميثاق كاملاً':'✨ Generate full charter'}</button>
       <button class="btn p" id="chSign" ${done<tot*0.6?'disabled':''}>
         ${ar?'✍ وقّع واعتمد':'✍ Sign and approve'}</button>`}
    <button class="btn o" id="chView">${ar?'👁 اعرض الميثاق':'👁 View charter'}</button>
    <button class="btn o" id="chPdf">📄 PDF</button>
    <button class="btn o" id="chWord">📝 Word</button>
  </div>
  ${!lock&&done<tot*0.6?`<div class="note w" style="margin-top:10px">
    ${ar?`أكمل ٦٠٪ على الأقل من الحقول قبل التوقيع — أكملت ${Math.round(done/tot*100)}٪.`
      :`Complete at least 60% of the fields before signing — you are at ${Math.round(done/tot*100)}%.`}</div>`:''}
  ${st.chSign?signModal():''}
  ${st.chCR?crModal():''}
  ${st.chView?charterDoc():''}`;
}
/* نافذة التوقيع */
function signModal(){
  const ar=A.isAr(), d=dat().charter||{};
  return `<div class="navov" id="sgov"><div class="navp" style="max-width:520px">
    <div class="navh"><b>✍ ${ar?'اعتماد الميثاق':'Charter Approval'}</b>
      <button class="pop-x" id="sgx">✕</button></div>
    <div style="padding:22px">
      <div class="note w" style="margin-bottom:15px">
        ${ar?'بعد التوقيع يصبح الميثاق <b>غير قابل للتعديل</b>. أي تغيير لاحق يتمّ عبر طلب تغيير يرفع الإصدار.'
          :'Once signed the charter becomes <b>read-only</b>. Any later change goes through a change request that raises the version.'}</div>
      <div class="frow"><label>${ar?'اسم المعتمِد':'Approver name'}</label>
        <input class="lf-in" id="sgName" value="${esc(d.sign_spname||d.id_sponsor||'')}"></div>
      <div class="frow"><label>${ar?'الصفة':'Role'}</label>
        <input class="lf-in" id="sgRole" value="${ar?'راعي المشروع':'Project Sponsor'}"></div>
      <div class="frow"><label>${ar?'التاريخ':'Date'}</label>
        <input type="date" class="lf-in" id="sgDate" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="frow"><label>${ar?'وقّع بخطّ يدك':'Sign by hand'}</label>
        <canvas id="sgPad" class="sg-pad"></canvas>
        <button class="btn o" id="sgClr" style="margin-top:7px;padding:6px 13px;font-size:.79rem">
          ${ar?'🗑 امسح التوقيع':'🗑 Clear signature'}</button></div>
      <div style="display:flex;gap:9px;margin-top:16px">
        <button class="btn p" id="sgOk">${ar?'✍ وقّع واعتمد':'✍ Sign and approve'}</button>
        <button class="btn o" id="sgCancel">${ar?'إلغاء':'Cancel'}</button></div>
    </div></div></div>`;
}
/* نافذة طلب التغيير */
function crModal(){
  const ar=A.isAr(), m=chMeta();
  const nv=(parseFloat(m.ver)+0.1).toFixed(1);
  return `<div class="navov" id="crov"><div class="navp" style="max-width:520px">
    <div class="navh"><b>📝 ${ar?'طلب تغيير على الميثاق':'Charter Change Request'}</b>
      <button class="pop-x" id="crx">✕</button></div>
    <div style="padding:22px">
      <div class="note i" style="margin-bottom:15px">
        ${ar?`سيرتفع الإصدار من <b>${m.ver}</b> إلى <b>${nv}</b> ويُفتح الميثاق للتعديل،
          ويُسجَّل التغيير في سجلّ التغييرات.`
          :`The version rises from <b>${m.ver}</b> to <b>${nv}</b>, the charter opens for editing,
          and the change is recorded in the change log.`}</div>
      <div class="frow"><label>${ar?'ما التغيير المطلوب؟':'What is the requested change?'}</label>
        <textarea class="lf-in" id="crWhat" rows="3"></textarea></div>
      <div class="frow"><label>${ar?'المبرّر':'Rationale'}</label>
        <textarea class="lf-in" id="crWhy" rows="3"></textarea></div>
      <div class="frow"><label>${ar?'المعتمِد':'Approver'}</label>
        <input class="lf-in" id="crBy" value="${esc(m.sig?m.sig.name:'')}"></div>
      <div style="display:flex;gap:9px;margin-top:16px">
        <button class="btn p" id="crOk">${ar?'اعتمد التغيير وافتح للتعديل':'Approve and open for editing'}</button>
        <button class="btn o" id="crCancel">${ar?'إلغاء':'Cancel'}</button></div>
    </div></div></div>`;
}
function charterDoc(){
  const C=window.CHARTER, l=L(), d=dat().charter||{};
  return `<div class="navov" id="chov"><div class="navp" style="max-width:820px">
    <div class="navh"><b>📜 ${A.isAr()?'ميثاق المشروع':'Project Charter'}</b>
      <button class="pop-x" id="chx">✕</button></div>
    <div class="ch-doc" id="chdoc">
      <div class="ch-dh">
        <div class="ch-logo">SOMU<i>•</i></div>
        <div><b>${esc(d.id_name||(A.isAr()?'ميثاق المشروع':'PROJECT CHARTER'))}</b>
          <span>${esc(A.isAr()?'ميثاق المشروع':'Project Charter')} ·
            ${esc(chMeta().no)} · v${esc(chMeta().ver)}</span></div>
        <div class="ch-date">${esc(d.id_date||new Date().toISOString().slice(0,10))}</div>
      </div>
      ${C.secs.map(sec=>{
        const rows=sec.f.filter(f=>String(d[sec.k+'_'+f.k]||'').trim());
        if(!rows.length) return '';
        return `<section class="ch-ds"><h3>${esc(sec.t[l])}</h3>
          ${rows.map(f=>`<div class="ch-dr">
            <div class="ch-dl">${esc(f.l[l])}</div>
            <div class="ch-dv">${md(d[sec.k+'_'+f.k])}</div></div>`).join('')}</section>`;
      }).join('')}
      ${(()=>{const m=chMeta(); if(!m.signed)return `<div class="ch-draft">
        ${A.isAr()?'مسوّدة — غير معتمدة':'DRAFT — NOT APPROVED'}</div>`;
        return `<div class="ch-sig">
          <div class="ch-sgc">
            <div class="ch-sgl">${A.isAr()?'اعتماد الراعي':'Sponsor approval'}</div>
            ${m.sig.img?`<img src="${m.sig.img}" class="ch-sgi">`
              :`<div class="ch-sgn">${esc(m.sig.name)}</div>`}
            <div class="ch-sgd"><b>${esc(m.sig.name)}</b><span>${esc(m.sig.role)}</span></div>
            <div class="ch-sgt">${esc(m.sig.date)}</div>
          </div>
          <div class="ch-seal">
            <div class="ch-sl">
              <b>APPROVED</b>
              <span>${esc(m.no)}</span>
              <span>v${esc(m.ver)}</span>
              <i>${esc(m.sig.hash)}</i>
            </div></div>
        </div>`})()}
      <div class="ch-foot">${A.isAr()
        ?'هذا الميثاق يمنح مدير المشروع سلطة استخدام موارد المؤسسة لتنفيذ المشروع.'
        :'This charter authorizes the project manager to apply organizational resources to the project.'}
        <br><small>SOMU International Training Centre · ${esc(chMeta().no)} · v${esc(chMeta().ver)}</small></div>
    </div></div></div>`;
}

/* ═══ سجلّ أصحاب المصلحة الديناميكي ═══ */
function stakeUI(){
  const R2=window.SREG; if(!R2) return '<div class="empty">—</div>';
  const rows=dat().stakeRows||[], l=L(), lang=A.isAr()?'ar':'en', ar=A.isAr();
  const step=st.skStep||1;
  /* اكتمال كل مرحلة */
  const s1=rows.length;
  const s2=rows.filter(r=>r.power&&r.interest&&r.att).length;
  const s3=rows.filter(r=>r.strat&&String(r.strat).trim()).length;
  return `<div class="sk-steps">
    ${[[1,'🔎',ar?'التحديد':'Identify',ar?'من هم؟':'Who are they?',s1,rows.length||1],
       [2,'⊞',ar?'التحليل':'Analyse',ar?'النفوذ والاهتمام':'Power and interest',s2,rows.length||1],
       [3,'📋',ar?'التسجيل':'Register',ar?'السجلّ الكامل':'The full register',s3,rows.length||1]]
      .map(x=>{const p=Math.round(x[4]/x[5]*100);
      return `<button class="sk-st${step===x[0]?' on':''}${p===100&&rows.length?' ok':''}"
        data-skstep="${x[0]}">
        <span class="sk-si">${x[1]}</span>
        <b>${x[0]}. ${esc(x[2])}</b>
        <span class="sk-sd">${esc(x[3])}</span>
        <span class="sk-sp"><i style="width:${rows.length?p:0}%"></i></span>
        <span class="sk-sn m">${x[4]}/${rows.length||0}</span></button>`}).join('')}
  </div>
  ${step===1?skIdentify(rows,l,ar)
   :step===2?skAnalyse(rows,l,ar)
   :skRegister(rows,l,lang,ar)}`;
}
/* ① التحديد */
function skIdentify(rows,l,ar){
  const SRC=[['charter',ar?'ميثاق المشروع':'Project charter'],
             ['case',ar?'حالة العمل':'Business case'],
             ['agree',ar?'الاتفاقيات والعقود':'Agreements and contracts'],
             ['opa',ar?'أصول العمليات':'OPAs'],
             ['brain',ar?'عصف ذهني مع الفريق':'Team brainstorming'],
             ['expert',ar?'حكم الخبراء':'Expert judgement']];
  return `<div class="note i" style="margin-bottom:13px">
    <b>${ar?'العملية ٢٣ — تحديد أصحاب المصلحة':'Process 23 — Identify Stakeholders'}</b><br>
    ${ar?'ابدأ بمن هم ومن أين عرفتهم — التحليل يأتي بعد. لا تقفز للاستراتيجية قبل أن تعرف من في الغرفة.'
      :'Start with who they are and where you found them — analysis comes after. Do not jump to strategy before you know who is in the room.'}</div>
  <div class="sk-idl">${rows.map((r,i2)=>`<div class="sk-idc">
    <span class="sk-idn m">${i2+1}</span>
    <div class="sk-idf">
      <input class="lf-in sm" data-sk="${i2}|name" value="${esc(r.name||'')}"
        placeholder="${ar?'الاسم':'Name'}">
      <input class="lf-in sm" data-sk="${i2}|role" value="${esc(r.role||'')}"
        placeholder="${ar?'الدور والمنصب':'Role / position'}">
      <input class="lf-in sm" data-sk="${i2}|org" value="${esc(r.org||'')}"
        placeholder="${ar?'الجهة':'Organization'}">
      <select class="lf-in sm" data-sk="${i2}|type">
        <option value="">${ar?'النوع':'Type'}</option>
        <option value="int" ${r.type==='int'?'selected':''}>${ar?'داخلي':'Internal'}</option>
        <option value="ext" ${r.type==='ext'?'selected':''}>${ar?'خارجي':'External'}</option>
        <option value="reg" ${r.type==='reg'?'selected':''}>${ar?'جهة رقابية':'Regulator'}</option>
      </select>
      <select class="lf-in sm" data-sk="${i2}|src">
        <option value="">${ar?'مصدر التحديد':'Identified from'}</option>
        ${SRC.map(x=>`<option value="${x[0]}" ${r.src===x[0]?'selected':''}>${esc(x[1])}</option>`).join('')}
      </select>
    </div>
    <button class="lf-del" data-skdel="${i2}">🗑</button></div>`).join('')}
  </div>
  ${!rows.length?`<div class="empty" style="padding:30px">
    <b>${ar?'لم تحدّد أحداً بعد':'No stakeholders identified yet'}</b>
    ${ar?'ابدأ بالأطراف الواردة في الميثاق وحالة العمل.':'Start with the parties named in the charter and business case.'}</div>`:''}
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
    <button class="btn p" id="skAdd">${ar?'＋ أضف طرفاً':'＋ Add stakeholder'}</button>
    <button class="btn g" id="skGen">${ar?'✨ ولّد من FRIGATE BRAVO':'✨ Generate from FRIGATE BRAVO'}</button>
    ${rows.length?`<button class="btn s" data-skstep="2">
      ${ar?'التالي: التحليل ▶':'Next: Analyse ▶'}</button>`:''}
  </div>`;
}
/* ② التحليل بالمصفوفة */
function skAnalyse(rows,l,ar){
  if(!rows.length) return `<div class="empty" style="padding:30px">
    <b>${ar?'حدّد الأطراف أولاً':'Identify stakeholders first'}</b>
    <button class="btn p" data-skstep="1" style="margin-top:12px">${ar?'◀ عُد للتحديد':'◀ Back to Identify'}</button></div>`;
  const R2=window.SREG;
  const sel=st.skSel!=null?st.skSel:0;
  const r=rows[sel]||rows[0];
  const PW=[['high',ar?'عالٍ':'High'],['med',ar?'متوسط':'Medium'],['low',ar?'منخفض':'Low']];
  const AT=[['champ',ar?'داعم قوي':'Champion'],['sup',ar?'داعم':'Supportive'],
            ['neut',ar?'محايد':'Neutral'],['res',ar?'متحفّظ':'Resistant'],
            ['unaw',ar?'غير مُطّلع':'Unaware']];
  const q=(r.power==='high'&&r.interest==='high')?[ar?'أدِرْه عن قرب':'Manage closely','q1']
    :(r.power==='high')?[ar?'أبقِه راضياً':'Keep satisfied','q3']
    :(r.interest==='high')?[ar?'أبقِه مُطّلعاً':'Keep informed','q2']
    :[ar?'راقبه':'Monitor','q4'];
  return `<div class="note i" style="margin-bottom:13px">
    <b>${ar?'مصفوفة النفوذ والاهتمام':'Power / Interest Matrix'}</b><br>
    ${ar?'اختر الطرف ثم حدّد نفوذه واهتمامه وموقفه — يتحرّك على المصفوفة فوراً وتُحسب استراتيجيته تلقائياً.'
      :'Pick a stakeholder then set power, interest and attitude — it moves on the matrix instantly and its strategy is computed automatically.'}</div>
  <div class="sk-an">
    <div class="sk-anl">
      <h5>${ar?'الأطراف':'Stakeholders'}</h5>
      ${rows.map((x,i2)=>{const ok=x.power&&x.interest&&x.att;
        return `<button class="sk-anb${i2===sel?' on':''}${ok?' ok':''}" data-sksel="${i2}">
        <span class="m">${i2+1}</span>
        <span class="sk-anm">${esc(x.name||(ar?'بلا اسم':'Unnamed'))}</span>
        ${ok?'<span class="sk-ok">✓</span>':''}</button>`}).join('')}
    </div>
    <div class="sk-anr">
      <div class="sk-anh"><b>${esc(r.name||(ar?'بلا اسم':'Unnamed'))}</b>
        <span>${esc(r.role||'')}</span></div>
      <div class="sk-anf">
        <div><label>${ar?'النفوذ':'Power'}</label>
          <div class="sk-seg">${PW.map(p=>`<button class="sk-sg${r.power===p[0]?' on':''}"
            data-skv="${sel}|power|${p[0]}">${esc(p[1])}</button>`).join('')}</div></div>
        <div><label>${ar?'الاهتمام':'Interest'}</label>
          <div class="sk-seg">${PW.map(p=>`<button class="sk-sg${r.interest===p[0]?' on':''}"
            data-skv="${sel}|interest|${p[0]}">${esc(p[1])}</button>`).join('')}</div></div>
        <div><label>${ar?'الموقف الحالي':'Current attitude'}</label>
          <div class="sk-seg">${AT.map(p=>`<button class="sk-sg at-${p[0]}${r.att===p[0]?' on':''}"
            data-skv="${sel}|att|${p[0]}">${esc(p[1])}</button>`).join('')}</div></div>
      </div>
      ${(r.power&&r.interest)?`<div class="sk-res ${q[1]}">
        <span>${ar?'التصنيف':'Classification'}</span><b>${esc(q[0])}</b>
        <p>${esc(R2.auto(r.power,r.interest,ar?'ar':'en'))}</p></div>`:''}
    </div>
  </div>
  ${matrixUI(rows,sel)}
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
    <button class="btn o" data-skstep="1">${ar?'◀ التحديد':'◀ Identify'}</button>
    <button class="btn s" id="skAuto">${ar?'🎯 احسب كل الاستراتيجيات':'🎯 Compute all strategies'}</button>
    <button class="btn p" data-skstep="3">${ar?'التالي: السجلّ ▶':'Next: Register ▶'}</button>
  </div>`;
}
/* ③ السجلّ */
function skRegister(rows,l,lang,ar){
  if(!rows.length) return `<div class="empty" style="padding:30px">
    <b>${ar?'لا سجلّ بعد':'No register yet'}</b>
    <button class="btn p" data-skstep="1" style="margin-top:12px">${ar?'◀ ابدأ بالتحديد':'◀ Start with Identify'}</button></div>`;
  const view=st.skView||'table';
  const miss=rows.filter(r=>!r.power||!r.interest||!r.att).length;
  return `${miss?`<div class="note w" style="margin-bottom:12px">
    ${ar?`<b>${miss}</b> من الأطراف بلا تحليل كامل — عُد للمرحلة الثانية.`
      :`<b>${miss}</b> stakeholders are not fully analysed — return to step 2.`}</div>`:
    `<div class="note g" style="margin-bottom:12px">
    ${ar?'✅ كل الأطراف محلّلة والاستراتيجيات محسوبة. السجلّ يُحدَّث تلقائياً مع أي تغيير في التحليل.'
      :'✅ All stakeholders analysed and strategies computed. The register updates automatically with any change in the analysis.'}</div>`}
  <div class="navf" style="margin-bottom:12px">
    ${[['table',ar?'📋 السجلّ':'📋 Register'],
       ['matrix',ar?'⊞ المصفوفة':'⊞ Matrix'],
       ['cards',ar?'🗂 بطاقات':'🗂 Cards']].map(x=>
      `<button class="nf${view===x[0]?' on':''}" data-skv2="${x[0]}">${esc(x[1])}</button>`).join('')}
    <span style="flex:1"></span>
    <span class="tag s">${rows.length} ${ar?'طرفاً':'stakeholders'}</span>
  </div>
  ${view==='matrix'?matrixUI(rows):view==='cards'?cardsUI(rows,lang):tableUI(rows,l,lang)}
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
    <button class="btn o" data-skstep="2">${ar?'◀ التحليل':'◀ Analyse'}</button>
    <button class="btn s" id="skAuto">${ar?'🎯 أعد حساب الاستراتيجيات':'🎯 Recompute strategies'}</button>
    <button class="btn o" id="skExp">${ar?'⬇ صدّر CSV':'⬇ Export CSV'}</button>
  </div>`;
}
function tableUI(rows,l,lang){
  const R2=window.SREG;
  return `<div class="sk-wrap"><table class="sk-t"><thead><tr>
    <th class="sk-n">#</th>
    ${R2.cols.map(c=>`<th style="min-width:${c.w}">${esc(c.l[l])}</th>`).join('')}
    <th></th></tr></thead><tbody>
    ${rows.map((r,i2)=>`<tr>
      <td class="sk-n m">${i2+1}</td>
      ${R2.cols.map(c=>{
        const v=r[c.k]||'';
        if(c.ty==='s') return `<td><select class="lf-in sm" data-sk="${i2}|${c.k}">
          <option value=""></option>
          ${c.o.map(o=>`<option value="${o[0]}" ${v===o[0]?'selected':''}>${esc(o[l+1])}</option>`).join('')}
          </select></td>`;
        if(c.ty==='a') return `<td><textarea class="lf-in sm" rows="2"
          data-sk="${i2}|${c.k}">${esc(v)}</textarea></td>`;
        return `<td><input class="lf-in sm" data-sk="${i2}|${c.k}" value="${esc(v)}"></td>`;
      }).join('')}
      <td><button class="lf-del" data-skdel="${i2}">🗑</button></td></tr>`).join('')}
  </tbody></table></div>`;
}
function cardsUI(rows,lang){
  const R2=window.SREG, l=L();
  const lbl=(ck,v)=>{const c=R2.cols.find(x=>x.k===ck); if(!c||!c.o)return v;
    const o=c.o.find(x=>x[0]===v); return o?o[l+1]:v};
  const AC={champ:'g',sup:'g',neut:'',res:'b',unaw:'o'};
  return `<div class="sk-cards">${rows.map((r,i2)=>`<div class="sk-c">
    <div class="sk-ch"><span class="sk-cn m">${i2+1}</span>
      <div><b>${esc(r.name||'—')}</b><span>${esc(r.role||'')}</span></div>
      <span class="tag ${AC[r.att]||''}">${esc(lbl('att',r.att))}</span></div>
    <div class="sk-cm">
      <span class="tag ${r.power==='high'?'o':'s'}">${A.isAr()?'نفوذ':'Power'} ${esc(lbl('power',r.power))}</span>
      <span class="tag ${r.interest==='high'?'o':'s'}">${A.isAr()?'اهتمام':'Interest'} ${esc(lbl('interest',r.interest))}</span>
      ${r.type?`<span class="tag">${esc(lbl('type',r.type))}</span>`:''}
    </div>
    ${r.need?`<div class="sk-cf"><b>${A.isAr()?'توقّعاته':'Expectations'}</b><p>${esc(r.need)}</p></div>`:''}
    ${r.infl?`<div class="sk-cf"><b>${A.isAr()?'تأثيره':'Influence'}</b><p>${esc(r.infl)}</p></div>`:''}
    ${r.strat?`<div class="sk-cf hi"><b>${A.isAr()?'الاستراتيجية':'Strategy'}</b><p>${esc(r.strat)}</p></div>`:''}
    ${r.chan||r.owner?`<div class="sk-cq">
      ${r.chan?`<span>📡 ${esc(r.chan)}</span>`:''}
      ${r.owner?`<span>👤 ${esc(r.owner)}</span>`:''}</div>`:''}
  </div>`).join('')}</div>`;
}
function matrixUI(rows,sel){
  const V={high:2,med:1,low:0};
  const px=r=>({0:15,1:50,2:85})[V[r.power]!=null?V[r.power]:1];
  const py=r=>({0:85,1:50,2:15})[V[r.interest]!=null?V[r.interest]:1];
  const QQ=[
   {x:'50%',y:'0',w:'50%',h:'50%',t:A.isAr()?'أدِرْه عن قرب':'Manage closely',c:'q1'},
   {x:'0',y:'0',w:'50%',h:'50%',t:A.isAr()?'أبقِه مُطّلعاً':'Keep informed',c:'q2'},
   {x:'50%',y:'50%',w:'50%',h:'50%',t:A.isAr()?'أبقِه راضياً':'Keep satisfied',c:'q3'},
   {x:'0',y:'50%',w:'50%',h:'50%',t:A.isAr()?'راقبه':'Monitor',c:'q4'}];
  return `<div class="pim">
    <div class="pim-y">${A.isAr()?'الاهتمام ⟶':'Interest ⟶'}</div>
    <div class="pim-box">
      ${QQ.map(q=>`<div class="pim-q ${q.c}" style="left:${q.x};top:${q.y};width:${q.w};height:${q.h}">
        <span>${esc(q.t)}</span></div>`).join('')}
      <div class="pim-gl v"></div><div class="pim-gl h"></div>
      ${rows.map((r,i2)=>`<div class="pim-d ${r.att||'neut'}${sel===i2?' sel':''}"
        style="left:${px(r)}%;top:${py(r)}%"
        title="${esc(r.name||'')}" data-sksel="${i2}"><b>${i2+1}</b></div>`).join('')}
    </div>
    <div class="pim-x">${A.isAr()?'النفوذ ⟶':'Power ⟶'}</div>
  </div>
  <div class="pim-leg">${rows.map((r,i2)=>`<span class="pim-lg">
    <b class="${r.att||'neut'}">${i2+1}</b> ${esc(r.name||'—')}</span>`).join('')}</div>`;
}

/* ═══ جلسة اللجنة ═══ */
function boardUI(){
  const b=st.board, BQ=B().Q, l=L();
  const d=dat().board||{};
  if(d.verdict&&!b.on) return boardResult(d);
  const PN=window.PANEL||[];
  if(!b.on) return `<div class="bd-intro">
    <div class="bd-team">${PN.map(m=>`<div class="bd-mini">
      ${window.avatarSVG(m,false,false)}
      <b>${esc(A.isAr()?m.ar[0]:m.en[0])}</b>
      <span>${esc(A.isAr()?m.ar[1]:m.en[1])}</span></div>`).join('')}</div>
    <h3>${A.isAr()?'جلسة لجنة الاستثمار':'Investment Board Session'}</h3>
    <p>${A.isAr()
      ?'ثلاثة أعضاء يسألونك عن حالة عملك بالصوت والصورة. يستمعون لإجابتك — أو اكتبها. ثم يقرّرون بناءً على تحليل إجاباتك وأرقامك.'
      :'Three board members question your business case with voice and video. They listen to your answer — or type it. They then decide based on analysis of your answers and your numbers.'}</p>
    <div class="bd-chk">
      ${[[A.isAr()?'حاجة العمل':'Business need','need'],
         [A.isAr()?'دراسة الجدوى':'Feasibility','feas'],
         [A.isAr()?'حالة العمل':'Business case','case']].map(x=>{
        const s2=LF().find(y=>y.k===x[1]), p=pct(s2);
        return `<span class="tag ${p>=60?'g':'o'}">${esc(x[0])} ${p}%</span>`}).join('')}
    </div>
    ${pct(LF().find(x=>x.k==='feas'))<40?`<div class="note w">${A.isAr()
      ?'أكمل دراسة الجدوى وحالة العمل أولاً — اللجنة ستسأل عن أرقامهما.'
      :'Complete the feasibility study and business case first — the board will ask about their numbers.'}</div>`:''}
    <div style="display:flex;gap:9px;justify-content:center;margin-top:16px;flex-wrap:wrap">
      <button class="btn p lg" id="bdStart">${A.isAr()?'🎬 ابدأ الجلسة':'🎬 Start session'}</button>
      <button class="btn o" id="bdCam">${b.cam?'📹 ✓':'📹 '+(A.isAr()?'شغّل الكاميرا':'Enable camera')}</button>
    </div></div>`;

  if(b.done) return boardResult(b.res);
  const q=BQ[b.q];
  const who=(window.PANEL_Q||{})[q.k]||'chair';
  const m=PN.find(x=>x.id===who)||PN[0];
  return `<div class="bd">
    <div class="bd-call">
      <div class="bd-main">
        ${window.avatarSVG(m,b.speaking,b.blink)}
        <div class="bd-name"><b>${esc(A.isAr()?m.ar[0]:m.en[0])}</b>
          <span>${esc(A.isAr()?m.ar[1]:m.en[1])}</span></div>
        ${b.speaking?`<div class="bd-live">● ${A.isAr()?'يتحدّث':'speaking'}</div>`:''}
      </div>
      <div class="bd-side">
        ${PN.filter(x=>x.id!==who).map(x=>`<div class="bd-thumb">
          ${window.avatarSVG(x,false,false)}
          <span>${esc((A.isAr()?x.ar[0]:x.en[0]).split(' ').slice(-1)[0])}</span></div>`).join('')}
        <div class="bd-thumb me">
          ${b.cam?`<video id="bdcam" autoplay muted playsinline></video>`
            :`<div class="bd-noc">📹</div>`}
          <span>${A.isAr()?'أنت':'You'}</span></div>
      </div>
    </div>
    <div class="bd-bar">${BQ.map((_,i2)=>
      `<i class="${i2<b.q?'done':i2===b.q?'cur':''}"></i>`).join('')}</div>
    <div class="bd-q">${esc(A.isAr()?q.ar:q.en)}</div>
    <div class="bd-ctl">
      <button class="btn o" id="bdSpeak">🔊 ${A.isAr()?'أعِد السؤال':'Repeat'}</button>
      <button class="btn ${b.listening?'p':'s'}" id="bdMic">
        ${b.listening?'⏹ '+(A.isAr()?'أوقف':'Stop'):'🎤 '+(A.isAr()?'تحدّث':'Speak')}</button>
      <button class="btn o" id="bdCam2">${b.cam?'📹 ✓':'📹'}</button>
      <span class="bd-st">${b.listening?(A.isAr()?'أستمع…':'Listening…'):''}</span>
    </div>
    <textarea class="lf-in" id="bdAns" rows="4"
      placeholder="${A.isAr()?'تحدّث أو اكتب إجابتك هنا…':'Speak or type your answer here…'}">${esc(b.ans[q.k]||'')}</textarea>
    <div style="display:flex;gap:9px;margin-top:11px;flex-wrap:wrap">
      <button class="btn p" id="bdNext">
        ${b.q<BQ.length-1?(A.isAr()?'التالي ▶':'Next ▶'):(A.isAr()?'اعرض القرار':'Get the decision')}</button>
      <button class="btn o" id="bdQuit">${A.isAr()?'إنهاء':'Exit'}</button>
    </div></div>`;
}
function boardResult(r){
  const V={approve:['✅','معتمَد','APPROVED','g'],
           conditional:['⚠️','معتمَد بشروط','APPROVED WITH CONDITIONS','w'],
           reject:['❌','مرفوض','REJECTED','r']}[r.verdict];
  const l=L();
  return `<div class="bd-res">
    <div class="bd-verdict ${V[3]}">
      <span class="bd-vi">${V[0]}</span>
      <b>${esc(A.isAr()?V[1]:V[2])}</b>
      <span class="bd-sc m">${r.overall}%</span></div>
    <div class="lf-calc" style="margin-top:14px">
      <div class="lf-cc ${r.answerScore>=70?'g':r.answerScore>=50?'m':'b'}">
        <b class="m">${r.answerScore}%</b><span>${A.isAr()?'جودة العرض':'Presentation'}</span></div>
      <div class="lf-cc ${r.finScore>=70?'g':r.finScore>=50?'m':'b'}">
        <b class="m">${r.finScore}%</b><span>${A.isAr()?'الجدوى المالية':'Financials'}</span></div>
      ${r.payback?`<div class="lf-cc ${+r.payback<=3?'g':+r.payback<=5?'m':'b'}">
        <b class="m">${r.payback}</b><span>${A.isAr()?'سنة استرداد':'yr payback'}</span></div>`:''}
      <div class="lf-cc ${r.roi>=50?'g':r.roi>0?'m':'b'}"><b class="m">${r.roi}%</b>
        <span>ROI</span></div>
    </div>
    <div class="note ${V[3]==='g'?'g':V[3]==='w'?'w':'r'}" style="margin-top:14px">
      ${A.isAr()?bdMsgAr(r):bdMsgEn(r)}</div>
    <div class="bd-fb"><h4>${A.isAr()?'تقييم إجاباتك':'Your answers assessed'}</h4>
      ${B().Q.map(q=>{const s2=r.scores?r.scores[q.k]:null;
        return `<div class="bd-fr ${s2>=70?'g':s2>=40?'m':'b'}">
          <span class="bd-fq">${esc(A.isAr()?q.ar:q.en)}</span>
          <span class="bd-fs m">${s2==null?'—':s2+'%'}</span></div>`}).join('')}</div>
    <div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap">
      <button class="btn p" id="bdAgain">${A.isAr()?'🔄 أعد الجلسة':'🔄 Retry session'}</button>
      ${r.verdict!=='reject'?`<button class="btn g" id="bdGo">
        ${A.isAr()?'تابع إلى المرحلة التالية ▶':'Continue to next stage ▶'}</button>`:''}
    </div></div>`;
}
function bdMsgAr(r){
  if(r.verdict==='approve') return `<b>قرار اللجنة:</b> يُعتمد المشروع ويُفوَّض مدير المشروع
    بإعداد الميثاق. الأساس: عرض مقنع (${r.answerScore}%) وجدوى مالية سليمة
    (استرداد ${r.payback} سنة · عائد ${r.roi}%).`;
  if(r.verdict==='conditional') return `<b>قرار اللجنة:</b> يُعتمد بشروط.
    ${r.finScore<50?'الأرقام المالية تحتاج مراجعة — فترة الاسترداد أو العائد دون المستوى المقبول. ':''}
    ${r.answerScore<60?'وبعض إجاباتك تفتقر للتفصيل أو الأرقام. ':''}
    أعِد العرض بعد معالجة هذه النقاط.`;
  return `<b>قرار اللجنة:</b> لا يُعتمد في صيغته الحالية.
    ${r.finScore<40?`الجدوى المالية ضعيفة — استرداد ${r.payback} سنة وعائد ${r.roi}%. `:''}
    ${r.answerScore<40?'والعرض لم يجب عن أسئلة اللجنة الجوهرية بدليل كافٍ. ':''}
    أعِد دراسة الجدوى وحالة العمل ثم اطلب جلسة جديدة.`;
}
function bdMsgEn(r){
  if(r.verdict==='approve') return `<b>Board decision:</b> the project is approved and the project
    manager is authorized to prepare the charter. Basis: a convincing presentation (${r.answerScore}%)
    and sound financials (${r.payback}-year payback · ${r.roi}% ROI).`;
  if(r.verdict==='conditional') return `<b>Board decision:</b> approved with conditions.
    ${r.finScore<50?'The financials need review — payback or return is below the acceptable level. ':''}
    ${r.answerScore<60?'And some answers lacked detail or numbers. ':''}
    Re-present once these points are addressed.`;
  return `<b>Board decision:</b> not approved in its current form.
    ${r.finScore<40?`The financials are weak — ${r.payback}-year payback and ${r.roi}% ROI. `:''}
    ${r.answerScore<40?'And the presentation did not answer the board\'s core questions with sufficient evidence. ':''}
    Revisit the feasibility study and business case, then request a new session.`;
}

/* ═══ اللوحة التحليلية ═══ */
function dash(){
  const ss=LF(), d=dat(), l=L();
  const pr=d.proc||{};
  const pdone=Object.keys(pr).filter(k=>String(pr[k]||'').trim()).length;
  const rows=d.stakeRows||[];
  const bd=d.board||{};
  const mon=d.mon||{};
  const bac=+mon.bac||0, pv=+mon.pv||0, ev=+mon.ev||0, ac=+mon.ac||0;
  const cpi=(ev&&ac)?ev/ac:0, spi=(ev&&pv)?ev/pv:0;
  const eac=(bac&&cpi)?bac/cpi:0;
  const bc=d.case||{};
  const cost=+bc.cost||0, ben=+bc.benefit||0, yrs=+bc.years||0;
  const ov=overall();
  /* توزيع المراحل */
  const W=560,H=150;
  const bars=ss.map(s2=>({n:s2.n,p:pct(s2),t:s2.t[l],ic:s2.ic}));
  const bw=(W-40)/ss.length;
  /* توزيع أصحاب المصلحة */
  const att={champ:0,sup:0,neut:0,res:0,unaw:0};
  rows.forEach(r=>{att[r.att||'neut']=(att[r.att||'neut']||0)+1});
  const AC2=[['champ','#2fa87a'],['sup','#40C090'],['neut','#70C0E0'],
             ['res','#c0392b'],['unaw','#F07000']];
  const attTot=Object.values(att).reduce((a,b)=>a+b,0)||1;
  /* توزيع العمليات على المجموعات */
  const gd={};
  Object.keys(pr).filter(k=>String(pr[k]||'').trim()).forEach(k=>{
    const pp=P().L.find(x=>x.n===+k.slice(1)); if(pp)gd[pp.g]=(gd[pp.g]||0)+1});
  return `<div class="dash">
    <div class="dk">
      <div class="dk-c ${ov>=70?'g':ov>=40?'m':'b'}"><b class="m">${ov}%</b>
        <span>${A.isAr()?'إنجاز المراحل':'Stage completion'}</span>
        <div class="dk-b"><i style="width:${ov}%"></i></div></div>
      <div class="dk-c ${pdone>=20?'g':pdone>=8?'m':'b'}"><b class="m">${pdone}<em>/40</em></b>
        <span>${A.isAr()?'عمليات منجزة':'Processes done'}</span>
        <div class="dk-b"><i style="width:${Math.round(pdone/40*100)}%"></i></div></div>
      <div class="dk-c ${rows.length>=6?'g':rows.length?'m':'b'}"><b class="m">${rows.length}</b>
        <span>${A.isAr()?'أصحاب المصلحة':'Stakeholders'}</span>
        <div class="dk-b"><i style="width:${Math.min(100,rows.length*12)}%"></i></div></div>
      ${bd.verdict?`<div class="dk-c ${bd.verdict==='approve'?'g':bd.verdict==='conditional'?'m':'b'}">
        <b class="m">${bd.overall}%</b><span>${A.isAr()?'قرار اللجنة':'Board decision'}</span>
        <div class="dk-b"><i style="width:${bd.overall}%"></i></div></div>`:''}
      ${cpi?`<div class="dk-c ${cpi>=1?'g':cpi>=.9?'m':'b'}"><b class="m">${cpi.toFixed(2)}</b>
        <span>CPI</span><div class="dk-b"><i style="width:${Math.min(100,cpi*100)}%"></i></div></div>`:''}
      ${spi?`<div class="dk-c ${spi>=1?'g':spi>=.9?'m':'b'}"><b class="m">${spi.toFixed(2)}</b>
        <span>SPI</span><div class="dk-b"><i style="width:${Math.min(100,spi*100)}%"></i></div></div>`:''}
    </div>

    <div class="dash-g">
      <div class="dcard"><h4>${A.isAr()?'اكتمال المراحل':'Stage completion'}</h4>
        <svg viewBox="0 0 ${W} ${H}" class="dsvg">
          ${[0,50,100].map(v=>`<line x1="28" y1="${H-22-(v/100)*(H-42)}" x2="${W-8}"
            y2="${H-22-(v/100)*(H-42)}" stroke="#e6ecf2"/>
            <text x="24" y="${H-19-(v/100)*(H-42)}" font-size="8" fill="#6b8090"
              text-anchor="end">${v}</text>`).join('')}
          ${bars.map((b2,i2)=>{const h=(b2.p/100)*(H-42);
            return `<rect x="${30+i2*bw+2}" y="${H-22-h}" width="${bw-5}" height="${h||1}"
              rx="2" fill="${b2.p>=100?'#2fa87a':b2.p>0?'#70C0E0':'#d8e3ea'}"><title>${esc(b2.t)} — ${b2.p}%</title></rect>
            <text x="${30+i2*bw+bw/2}" y="${H-9}" font-size="8" fill="#6b8090"
              text-anchor="middle">${b2.n}</text>`}).join('')}
        </svg></div>

      ${rows.length?`<div class="dcard"><h4>${A.isAr()?'مواقف أصحاب المصلحة':'Stakeholder attitudes'}</h4>
        <svg viewBox="0 0 200 140" class="dsvg">
          ${(()=>{let a0=-Math.PI/2,out='';
            AC2.forEach(([k,c])=>{const v=att[k]||0; if(!v)return;
              const a1=a0+(v/attTot)*Math.PI*2;
              const x0=100+52*Math.cos(a0),y0=70+52*Math.sin(a0);
              const x1=100+52*Math.cos(a1),y1=70+52*Math.sin(a1);
              const la=(a1-a0)>Math.PI?1:0;
              out+=`<path d="M100 70 L${x0.toFixed(1)} ${y0.toFixed(1)} A52 52 0 ${la} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${c}"/>`;
              a0=a1});
            return out+'<circle cx="100" cy="70" r="26" fill="#fff"/>'
              +`<text x="100" y="75" font-size="17" font-weight="600" fill="#103040" text-anchor="middle">${rows.length}</text>`})()}
        </svg>
        <div class="dleg">${AC2.filter(([k])=>att[k]).map(([k,c])=>{
          const L2={champ:['داعم قوي','Champion'],sup:['داعم','Supportive'],
                    neut:['محايد','Neutral'],res:['متحفّظ','Resistant'],unaw:['غير مُطّلع','Unaware']};
          return `<span><i style="background:${c}"></i>${esc(L2[k][l])} ${att[k]}</span>`}).join('')}</div>
      </div>`:''}

      ${Object.keys(gd).length?`<div class="dcard"><h4>${A.isAr()?'العمليات المنجزة بالمجموعة':'Completed by group'}</h4>
        <div class="dbars">${Object.entries(P().GR).map(([k,v])=>{
          const tot=P().L.filter(p=>p.g===k).length, dn=gd[k]||0;
          return `<div class="dbar"><span class="dbl">${esc(v[l===0?'ar':'en'])}</span>
            <div class="dbt"><i style="width:${Math.round(dn/tot*100)}%"></i></div>
            <span class="dbv m">${dn}/${tot}</span></div>`}).join('')}</div>
      </div>`:''}

      ${(cost&&ben&&yrs)?`<div class="dcard"><h4>${A.isAr()?'الجدوى المالية':'Financial case'}</h4>
        <div class="dkv">
          <div><b class="m">${(cost/ben).toFixed(1)}</b><span>${A.isAr()?'سنة استرداد':'yr payback'}</span></div>
          <div><b class="m">${Math.round((ben*yrs-cost)/cost*100)}%</b><span>ROI</span></div>
          <div><b class="m">${cost}</b><span>${A.isAr()?'استثمار':'Investment'}</span></div>
          <div><b class="m">${Math.round(ben*yrs)}</b><span>${A.isAr()?'منفعة':'Benefit'}</span></div>
        </div>
        <svg viewBox="0 0 260 90" class="dsvg">
          ${(()=>{let out='',cum=-cost;const w=(260-30)/(yrs+1);
            for(let y=0;y<=yrs;y++){ const h=Math.abs(cum)/(cost*1.2)*34;
              const pos=cum>=0;
              out+=`<rect x="${20+y*w+3}" y="${pos?45-h:45}" width="${w-7}" height="${Math.max(1,h)}"
                rx="2" fill="${pos?'#2fa87a':'#c0392b'}"/>
                <text x="${20+y*w+w/2}" y="82" font-size="8" fill="#6b8090" text-anchor="middle">${y}</text>`;
              cum+=ben; }
            return out+'<line x1="16" y1="45" x2="252" y2="45" stroke="#9aa9b8" stroke-width="1.2"/>'})()}
        </svg>
        <div class="dnote">${A.isAr()?'التدفّق التراكمي بالسنوات':'Cumulative cash flow by year'}</div>
      </div>`:''}
    </div>

    <div class="dexp">
      <span class="dexp-l">${A.isAr()?'صدّر وأرسل':'Export and send'}</span>
      <button class="btn o" id="exPdf">📄 PDF</button>
      <button class="btn o" id="exWord">📝 Word</button>
      <button class="btn o" id="exDeck">📊 ${A.isAr()?'عرض تقديمي':'Slide deck'}</button>
      <span style="flex:1"></span>
      <button class="btn g" id="exWa">📱 ${A.isAr()?'واتساب':'WhatsApp'}</button>
      <button class="btn s" id="exMail">✉️ ${A.isAr()?'بريد':'Email'}</button>
    </div>
  </div>`;
}

/* ═══ بناء محتوى التقرير ═══ */
function repHTML(){
  const ss=LF(), d=dat(), l=L(), ar=A.isAr();
  const esc2=esc;
  let H='';
  const ov=overall();
  const pr=d.proc||{}, pdone=Object.keys(pr).filter(k=>String(pr[k]||'').trim()).length;
  const rows=d.stakeRows||[], bd=d.board||{}, mon=d.mon||{}, bc=d.case||{};
  const cpi=(+mon.ev&&+mon.ac)?(+mon.ev/+mon.ac):0, spi=(+mon.ev&&+mon.pv)?(+mon.ev/+mon.pv):0;
  H+=`<div class="kpi">
    <div><b>${ov}%</b><span>${ar?'إنجاز المراحل':'Stage completion'}</span></div>
    <div><b>${pdone}/40</b><span>${ar?'عمليات منجزة':'Processes done'}</span></div>
    <div><b>${rows.length}</b><span>${ar?'أصحاب المصلحة':'Stakeholders'}</span></div>
    ${bd.verdict?`<div><b class="${bd.verdict==='approve'?'g':bd.verdict==='reject'?'r':'o'}">${bd.overall}%</b>
      <span>${ar?'قرار اللجنة':'Board'}</span></div>`:''}
    ${cpi?`<div><b class="${cpi>=1?'g':'r'}">${cpi.toFixed(2)}</b><span>CPI</span></div>`:''}
    ${spi?`<div><b class="${spi>=1?'g':'r'}">${spi.toFixed(2)}</b><span>SPI</span></div>`:''}
  </div>`;
  H+=`<h2>${ar?'حالة المراحل':'Stage status'}</h2><table>
    <tr><th>#</th><th>${ar?'المرحلة':'Stage'}</th><th>${ar?'الاكتمال':'Completion'}</th></tr>
    ${ss.map(s2=>`<tr><td>${s2.n}</td><td>${esc2(s2.t[l])}</td>
      <td>${pct(s2)}%<div class="bar"><i style="width:${pct(s2)}%"></i></div></td></tr>`).join('')}
  </table>`;
  ss.forEach(s2=>{
    const v=d[s2.k]||{};
    const fs=(s2.f||[]).filter(f=>String(v[f.k]||'').trim());
    if(!fs.length) return;
    H+=`<h2>${s2.n}. ${esc2(s2.t[l])}</h2>`;
    fs.forEach(f=>{ H+=`<h3>${esc2(f.l[l])}</h3><p>${esc2(v[f.k]).replace(/\n/g,'<br>')}</p>`; });
  });
  if(bd.verdict){
    const V={approve:['معتمَد','APPROVED'],conditional:['معتمَد بشروط','CONDITIONAL'],
             reject:['مرفوض','REJECTED']}[bd.verdict];
    H+=`<h2>${ar?'قرار لجنة الاستثمار':'Investment Board Decision'}</h2>
      <p><strong>${esc2(V[l])}</strong> — ${bd.overall}%</p><table>
      <tr><th>${ar?'المعيار':'Criterion'}</th><th>${ar?'النتيجة':'Score'}</th></tr>
      <tr><td>${ar?'جودة العرض':'Presentation quality'}</td><td>${bd.answerScore}%</td></tr>
      <tr><td>${ar?'الجدوى المالية':'Financial case'}</td><td>${bd.finScore}%</td></tr>
      ${bd.payback?`<tr><td>${ar?'فترة الاسترداد':'Payback'}</td><td>${bd.payback} ${ar?'سنة':'yrs'}</td></tr>`:''}
      <tr><td>ROI</td><td>${bd.roi}%</td></tr></table>`;
  }
  if(rows.length){
    const R2=window.SREG;
    H+=`<h2>${ar?'سجلّ أصحاب المصلحة':'Stakeholder Register'}</h2><table>
      <tr><th>#</th><th>${ar?'الاسم':'Name'}</th><th>${ar?'النفوذ':'Power'}</th>
        <th>${ar?'الاهتمام':'Interest'}</th><th>${ar?'الموقف':'Attitude'}</th>
        <th>${ar?'الاستراتيجية':'Strategy'}</th></tr>
      ${rows.map((r,i2)=>{const lb=(ck,vv)=>{const c=R2.cols.find(x=>x.k===ck);
          if(!c||!c.o)return vv; const o=c.o.find(x=>x[0]===vv); return o?o[l+1]:vv};
        return `<tr><td>${i2+1}</td><td>${esc2(r.name||'')}</td>
          <td>${esc2(lb('power',r.power))}</td><td>${esc2(lb('interest',r.interest))}</td>
          <td>${esc2(lb('att',r.att))}</td><td>${esc2(r.strat||'')}</td></tr>`}).join('')}
    </table>`;
  }
  const pk=Object.keys(pr).filter(k=>String(pr[k]||'').trim());
  if(pk.length){
    H+=`<h2>${ar?'مخرجات العمليات':'Process Outputs'}</h2>`;
    pk.sort((a,b)=>+a.slice(1)-+b.slice(1)).forEach(k=>{
      const p=P().L.find(x=>x.n===+k.slice(1)); if(!p)return;
      H+=`<h3>${p.n}. ${esc2(p.t[l])}</h3><p>${esc2(pr[k]).replace(/\n/g,'<br>')}</p>`;
    });
  }
  return H;
}
function repText(){
  const d=dat(), ar=A.isAr(), ov=overall();
  const pr=d.proc||{}, pdone=Object.keys(pr).filter(k=>String(pr[k]||'').trim()).length;
  const rows=d.stakeRows||[], bd=d.board||{}, mon=d.mon||{};
  const cpi=(+mon.ev&&+mon.ac)?(+mon.ev/+mon.ac).toFixed(2):null;
  const spi=(+mon.ev&&+mon.pv)?(+mon.ev/+mon.pv).toFixed(2):null;
  const L2=[];
  L2.push('*SOMU International Training Centre*');
  L2.push('*'+(ar?'تقرير دورة حياة المشروع':'Project Lifecycle Report')+'*');
  L2.push(new Date().toLocaleString(ar?'ar-EG':'en-GB',{dateStyle:'medium',timeStyle:'short'}));
  L2.push(''); L2.push('━━━━━━━━━━━━━━━━');
  L2.push('📊 '+(ar?'الإنجاز':'Completion')+': *'+ov+'%*');
  L2.push('⚙️ '+(ar?'عمليات منجزة':'Processes done')+': '+pdone+' / 40');
  L2.push('👥 '+(ar?'أصحاب المصلحة':'Stakeholders')+': '+rows.length);
  if(bd.verdict){ const V={approve:'✅ '+(ar?'معتمَد':'Approved'),
    conditional:'⚠️ '+(ar?'معتمَد بشروط':'Conditional'),reject:'❌ '+(ar?'مرفوض':'Rejected')};
    L2.push('🎙 '+(ar?'قرار اللجنة':'Board')+': '+V[bd.verdict]+' ('+bd.overall+'%)');
    if(bd.payback)L2.push('   '+(ar?'استرداد':'Payback')+': '+bd.payback+' '+(ar?'سنة':'yrs')
      +' · ROI: '+bd.roi+'%'); }
  if(cpi)L2.push('📈 CPI: '+cpi+' · SPI: '+spi);
  L2.push(''); L2.push('*'+(ar?'المراحل':'Stages')+'*');
  LF().forEach(s2=>{const p=pct(s2);
    L2.push((p===100?'✅':p>0?'🔵':'⬜')+' '+s2.n+'. '+s2.t[L()]+' — '+p+'%')});
  L2.push(''); L2.push('━━━━━━━━━━━━━━━━');
  L2.push('_'+(A.t?A.t('credit'):(ar?'تصميم وبرمجة د. محمد عطية':'Designed & developed by Dr Mohamed Attia'))+'_');
  return L2.join('\n');
}

function deckSlides(){
  const ss=LF(), d=dat(), l=L(), ar=A.isAr(), ov=overall();
  const pr=d.proc||{}, pdone=Object.keys(pr).filter(k=>String(pr[k]||'').trim()).length;
  const rows=d.stakeRows||[], bd=d.board||{}, mon=d.mon||{}, bc=d.case||{}, m=chMeta();
  const cpi=(+mon.ev&&+mon.ac)?(+mon.ev/+mon.ac):0, spi=(+mon.ev&&+mon.pv)?(+mon.ev/+mon.pv):0;
  const eac=(+mon.bac&&cpi)?(+mon.bac/cpi):0, vac=(+mon.bac)?(+mon.bac-eac):0;
  const cost=+bc.cost||0, ben=+bc.benefit||0, yrs=+bc.years||0;
  const S=[], T=(a,e)=>ar?a:e;
  const nm=(d.charter||{}).id_name||'FRIGATE BRAVO';

  /* ① الغلاف */
  S.push({cls:'cover', t:'', b:`
    <div class="cv">
      <div class="cv-lg">SOMU<i>•</i></div>
      <div class="cv-k">SOMU INTERNATIONAL TRAINING CENTRE</div>
      <h1>${esc(nm)}</h1>
      <div class="cv-s">${T('تقرير دورة حياة المشروع — عرض على الإدارة',
        'Project Lifecycle Report — Executive Briefing')}</div>
      <div class="cv-m">
        <span>${esc(m.no)}</span><span>v${esc(m.ver)}</span>
        <span>${new Date().toLocaleDateString(ar?'ar-EG':'en-GB',{dateStyle:'long'})}</span>
      </div>
      <div class="cv-bars"><i></i><i></i><i></i><i></i></div>
    </div>`});

  /* ② خريطة الرحلة */
  S.push({t:T('رحلة المشروع — إحدى عشرة مرحلة','The Project Journey — Eleven Stages'), b:`
    <div class="jr">${ss.map(s2=>{const p=pct(s2);
      return `<div class="jr-s ${p===100?'done':p>0?'act':''}">
        <div class="jr-d"><span>${s2.ic}</span></div>
        <div class="jr-t"><b>${s2.n}. ${esc(s2.t[l])}</b>
          <span>${p}%</span></div></div>`}).join('')}</div>
    <p class="ft-n">${T('أخضر مكتمل · أزرق جارٍ · رمادي لم يبدأ',
      'Green complete · blue in progress · grey not started')}</p>`});

  /* ③ الملخّص التنفيذي */
  S.push({t:T('الملخّص التنفيذي','Executive Summary'), b:`
    <div class="kpi big">
      <div><b>${ov}%</b><span>${T('إنجاز المراحل','Stage completion')}</span></div>
      <div><b>${pdone}/40</b><span>${T('عمليات منجزة','Processes done')}</span></div>
      <div><b>${rows.length}</b><span>${T('أصحاب المصلحة','Stakeholders')}</span></div>
      ${bd.verdict?`<div><b class="${bd.verdict==='approve'?'g':bd.verdict==='reject'?'r':'o'}">${
        bd.overall}%</b><span>${T('قرار اللجنة','Board decision')}</span></div>`:''}
      ${cpi?`<div><b class="${cpi>=1?'g':'r'}">${cpi.toFixed(2)}</b><span>CPI</span></div>`:''}
      ${spi?`<div><b class="${spi>=1?'g':'r'}">${spi.toFixed(2)}</b><span>SPI</span></div>`:''}
    </div>
    <div class="two">
      <div><h3>${T('أين نحن','Where we stand')}</h3>
        <ul class="bl">
          <li>${T(`أُنجزت <b>${ss.filter(x=>pct(x)===100).length}</b> مرحلة من ${ss.length}`,
            `<b>${ss.filter(x=>pct(x)===100).length}</b> of ${ss.length} stages complete`)}</li>
          <li>${T(`<b>${pdone}</b> عملية من الأربعين لها مخرج موثّق`,
            `<b>${pdone}</b> of the forty processes have a documented output`)}</li>
          ${m.signed?`<li>${T(`الميثاق <b>موقّع ومعتمد</b> — ${m.no} v${m.ver}`,
            `Charter <b>signed and approved</b> — ${m.no} v${m.ver}`)}</li>`
            :`<li>${T('الميثاق <b>مسوّدة</b> لم تُعتمد بعد','Charter is a <b>draft</b>, not yet approved')}</li>`}
          ${rows.length?`<li>${T(`<b>${rows.length}</b> طرفاً محدّداً ومحلّلاً`,
            `<b>${rows.length}</b> stakeholders identified and analysed`)}</li>`:''}
        </ul></div>
      <div><h3>${T('ما يحتاج قراراً','What needs a decision')}</h3>
        <ul class="bl">
          ${cpi&&cpi<1?`<li class="warn">${T(`تجاوز في التكلفة — CPI ${cpi.toFixed(2)} والتقدير عند الإنجاز <b>${Math.round(eac)}</b>`,
            `Cost overrun — CPI ${cpi.toFixed(2)}, EAC <b>${Math.round(eac)}</b>`)}</li>`:''}
          ${spi&&spi<1?`<li class="warn">${T(`تأخّر عن الجدول — SPI ${spi.toFixed(2)}`,
            `Behind schedule — SPI ${spi.toFixed(2)}`)}</li>`:''}
          ${bd.verdict==='conditional'?`<li class="warn">${T('اللجنة اعتمدت بشروط — تحتاج معالجة',
            'Board approved with conditions — requires action')}</li>`:''}
          ${rows.filter(r=>r.att==='res').length?`<li class="warn">${T(
            `<b>${rows.filter(r=>r.att==='res').length}</b> طرفاً متحفّظاً يحتاج إشراكاً`,
            `<b>${rows.filter(r=>r.att==='res').length}</b> resistant stakeholders need engagement`)}</li>`:''}
          ${!(cpi&&cpi<1)&&!(spi&&spi<1)?`<li class="okl">${T('لا انحرافات جوهرية حالياً',
            'No material variances at present')}</li>`:''}
        </ul></div>
    </div>`});

  /* ④ مخطّط اكتمال المراحل */
  const W=760,H=190;
  const bw=(W-60)/ss.length;
  S.push({t:T('اكتمال المراحل','Stage Completion'), b:`
    <svg viewBox="0 0 ${W} ${H}" class="ds">
      ${[0,25,50,75,100].map(v=>`<line x1="42" y1="${H-32-(v/100)*(H-58)}" x2="${W-10}"
        y2="${H-32-(v/100)*(H-58)}" stroke="#e6ecf2"/>
        <text x="36" y="${H-29-(v/100)*(H-58)}" font-size="10" fill="#6b8090"
          text-anchor="end">${v}%</text>`).join('')}
      ${ss.map((s2,i2)=>{const p=pct(s2), h=(p/100)*(H-58);
        return `<rect x="${46+i2*bw+3}" y="${H-32-h}" width="${bw-7}" height="${h||2}" rx="3"
          fill="${p>=100?'#2fa87a':p>0?'#70C0E0':'#dfe7ee'}"/>
          ${p>0?`<text x="${46+i2*bw+bw/2}" y="${H-37-h}" font-size="9" fill="#103040"
            text-anchor="middle" font-weight="600">${p}</text>`:''}
          <text x="${46+i2*bw+bw/2}" y="${H-14}" font-size="10" fill="#6b8090"
            text-anchor="middle">${s2.n}</text>`}).join('')}
    </svg>
    <div class="lgd">${ss.map(s2=>`<span><b>${s2.n}</b>${esc(s2.t[l])}</span>`).join('')}</div>`});

  /* ⑤ المراحل التأسيسية */
  [['need',T('حاجة العمل','Business Need')],['feas',T('دراسة الجدوى','Feasibility Study')],
   ['case',T('حالة العمل','Business Case')],['env',T('البيئة والأصول','EEFs and OPAs')]]
  .forEach(([k,tt])=>{
    const s2=ss.find(x=>x.k===k), v=d[k]||{};
    const fs=(s2.f||[]).filter(f=>String(v[f.k]||'').trim()&&f.ty!=='score'&&f.ty!=='num');
    const sc=(s2.f||[]).filter(f=>f.ty==='score'&&v[f.k]);
    if(!fs.length&&!sc.length)return;
    S.push({t:s2.n+'. '+tt, b:`
      ${sc.length?`<div class="scg">${sc.map(f=>{const n=+v[f.k];
        return `<div class="scc"><span>${esc(f.l[l])}</span>
          <div class="scd">${[1,2,3,4,5].map(x=>`<i class="${n>=x?'on':''}"></i>`).join('')}</div>
          <b>${n}/5</b></div>`}).join('')}</div>`:''}
      ${fs.map(f=>`<h3>${esc(f.l[l])}</h3>
        <p>${esc(v[f.k]).replace(/\n/g,'<br>')}</p>`).join('')}`});
  });

  /* ⑥ الجدوى المالية */
  if(cost&&ben&&yrs){
    const pb=cost/ben, roi=(ben*yrs-cost)/cost*100;
    let cum=-cost; const pts=[];
    for(let y=0;y<=yrs;y++){pts.push(cum);cum+=ben}
    const mx=Math.max(...pts.map(Math.abs))||1;
    const cw=(700-60)/(yrs+1);
    S.push({t:T('الجدوى المالية','The Financial Case'), b:`
      <div class="kpi big">
        <div><b class="${pb<=3?'g':pb<=5?'o':'r'}">${pb.toFixed(1)}</b>
          <span>${T('سنة استرداد','yr payback')}</span></div>
        <div><b class="${roi>=50?'g':roi>0?'o':'r'}">${Math.round(roi)}%</b><span>ROI</span></div>
        <div><b>${cost}</b><span>${T('استثمار','Investment')}</span></div>
        <div><b>${ben}</b><span>${T('منفعة سنوية','Annual benefit')}</span></div>
        <div><b>${Math.round(ben*yrs)}</b><span>${T('منفعة تراكمية','Total benefit')}</span></div>
      </div>
      <svg viewBox="0 0 700 200" class="ds">
        <line x1="40" y1="120" x2="690" y2="120" stroke="#9aa9b8" stroke-width="1.5"/>
        ${pts.map((v,y)=>{const h=Math.abs(v)/mx*78, pos=v>=0;
          return `<rect x="${44+y*cw+5}" y="${pos?120-h:120}" width="${cw-12}"
            height="${Math.max(2,h)}" rx="3" fill="${pos?'#2fa87a':'#c0392b'}"/>
            <text x="${44+y*cw+cw/2}" y="${pos?116-h:128+h}" font-size="10"
              fill="${pos?'#2fa87a':'#c0392b'}" text-anchor="middle" font-weight="600">${Math.round(v)}</text>
            <text x="${44+y*cw+cw/2}" y="${175}" font-size="11" fill="#6b8090"
              text-anchor="middle">${T('سنة','Yr')} ${y}</text>`}).join('')}
      </svg>
      <p class="ft-n">${T(`التدفّق التراكمي — يتحوّل للموجب في السنة <b>${Math.ceil(pb)}</b>`,
        `Cumulative cash flow — turns positive in year <b>${Math.ceil(pb)}</b>`)}</p>`});
  }

  /* ⑦ قرار اللجنة */
  if(bd.verdict){
    const V={approve:['✅','معتمَد','APPROVED','g'],
             conditional:['⚠️','معتمَد بشروط','APPROVED WITH CONDITIONS','o'],
             reject:['❌','مرفوض','REJECTED','r']}[bd.verdict];
    S.push({t:T('قرار لجنة الاستثمار','Investment Board Decision'), b:`
      <div class="vd ${V[3]}"><span class="vd-i">${V[0]}</span>
        <b>${esc(ar?V[1]:V[2])}</b><span class="vd-s">${bd.overall}%</span></div>
      <div class="kpi big" style="margin-top:20px">
        <div><b>${bd.answerScore}%</b><span>${T('جودة العرض','Presentation')}</span></div>
        <div><b>${bd.finScore}%</b><span>${T('الجدوى المالية','Financials')}</span></div>
        ${bd.payback?`<div><b>${bd.payback}</b><span>${T('سنة استرداد','yr payback')}</span></div>`:''}
        <div><b>${bd.roi}%</b><span>ROI</span></div>
      </div>
      <p class="ft-n" style="margin-top:18px">${T(
        'القرار محسوب: ٦٠٪ جودة الإجابات على أسئلة اللجنة + ٤٠٪ الجدوى المالية',
        'The decision is computed: 60% answer quality to the board questions + 40% financial case')}</p>`});
  }

  /* ⑧ الميثاق */
  if(m.signed||Object.keys(d.charter||{}).length){
    const C=window.CHARTER, cv=d.charter||{};
    const key=['purpose_need','obj_obj','scope_in','risk_risk','gov_thresh']
      .map(k=>{for(const sec of C.secs){const f=sec.f.find(x=>sec.k+'_'+x.k===k);
        if(f&&String(cv[k]||'').trim())return [f.l[l],cv[k]]}return null}).filter(Boolean);
    S.push({t:T('ميثاق المشروع','Project Charter'), b:`
      <div class="chb">
        <div class="chb-l"><span>${T('رقم الوثيقة','Document no.')}</span><b>${esc(m.no)}</b></div>
        <div class="chb-l"><span>${T('الإصدار','Version')}</span><b>${esc(m.ver)}</b></div>
        <div class="chb-l"><span>${T('الحالة','Status')}</span>
          <b class="${m.signed?'g':'o'}">${m.signed?T('موقّع ومعتمد','Signed and approved')
            :T('مسوّدة','Draft')}</b></div>
        ${m.signed?`<div class="chb-l"><span>${T('المعتمِد','Approver')}</span>
          <b>${esc(m.sig.name)}</b></div>`:''}
      </div>
      ${key.map(x=>`<h3>${esc(x[0])}</h3><p>${esc(x[1]).replace(/\n/g,'<br>')}</p>`).join('')}
      ${m.log&&m.log.length>1?`<h3>${T('سجلّ التغييرات','Change log')}</h3>
        <table><tr><th>${T('الإصدار','Ver')}</th><th>${T('التاريخ','Date')}</th>
          <th>${T('التغيير','Change')}</th></tr>
          ${m.log.map(x=>`<tr><td>${esc(x.ver)}</td><td>${esc(x.date)}</td>
            <td>${esc(x.what)}</td></tr>`).join('')}</table>`:''}`});
  }

  /* ⑨ أصحاب المصلحة — مصفوفة مرسومة */
  if(rows.length){
    const V2={high:2,med:1,low:0};
    const px=r=>({0:118,1:290,2:462})[V2[r.power]!=null?V2[r.power]:1];
    const py=r=>({0:196,1:130,2:64})[V2[r.interest]!=null?V2[r.interest]:1];
    const CL={champ:'#2fa87a',sup:'#40C090',neut:'#70C0E0',res:'#c0392b',unaw:'#F07000'};
    S.push({t:T('مصفوفة النفوذ والاهتمام','Power / Interest Matrix'), b:`
      <div class="two mtx">
        <svg viewBox="0 0 580 250" class="ds">
          <rect x="30" y="30" width="520" height="200" fill="#fff" stroke="#cfd9e2" stroke-width="2" rx="8"/>
          <rect x="290" y="30" width="260" height="100" fill="rgba(240,112,0,.09)"/>
          <rect x="30" y="30" width="260" height="100" fill="rgba(64,192,144,.09)"/>
          <rect x="290" y="130" width="260" height="100" fill="rgba(112,192,224,.09)"/>
          <line x1="290" y1="30" x2="290" y2="230" stroke="#cfd9e2" stroke-width="2"/>
          <line x1="30" y1="130" x2="550" y2="130" stroke="#cfd9e2" stroke-width="2"/>
          <text x="420" y="48" font-size="12" fill="#a54f00" text-anchor="middle" font-weight="600">${
            T('أدِرْه عن قرب','Manage closely')}</text>
          <text x="160" y="48" font-size="12" fill="#12654a" text-anchor="middle" font-weight="600">${
            T('أبقِه مُطّلعاً','Keep informed')}</text>
          <text x="420" y="148" font-size="12" fill="#1a5e7d" text-anchor="middle" font-weight="600">${
            T('أبقِه راضياً','Keep satisfied')}</text>
          <text x="160" y="148" font-size="12" fill="#8a99a6" text-anchor="middle" font-weight="600">${
            T('راقبه','Monitor')}</text>
          <text x="290" y="247" font-size="12" fill="#6b8090" text-anchor="middle">${
            T('النفوذ ⟶','Power ⟶')}</text>
          <text x="16" y="130" font-size="12" fill="#6b8090" text-anchor="middle"
            transform="rotate(-90 16 130)">${T('الاهتمام ⟶','Interest ⟶')}</text>
          ${rows.map((r,i2)=>`<g><circle cx="${px(r)}" cy="${py(r)}" r="13"
            fill="${CL[r.att||'neut']}" stroke="#fff" stroke-width="2.5"/>
            <text x="${px(r)}" y="${py(r)+4}" font-size="11" fill="#fff"
              text-anchor="middle" font-weight="700">${i2+1}</text></g>`).join('')}
        </svg>
        <div class="mtl">${rows.map((r,i2)=>`<div class="mti">
          <b style="background:${CL[r.att||'neut']}">${i2+1}</b>
          <span>${esc(r.name||'—')}</span></div>`).join('')}</div>
      </div>`});
    /* جدول الاستراتيجيات */
    const R2=window.SREG;
    S.push({t:T('استراتيجية الإشراك','Engagement Strategy'), b:`<table>
      <tr><th>#</th><th>${T('الطرف','Stakeholder')}</th><th>${T('النفوذ','Power')}</th>
        <th>${T('الاهتمام','Interest')}</th><th>${T('الموقف','Attitude')}</th>
        <th>${T('الاستراتيجية','Strategy')}</th></tr>
      ${rows.map((r,i2)=>{const lb=(ck,vv)=>{const c=R2.cols.find(x=>x.k===ck);
        if(!c||!c.o)return vv;const o=c.o.find(x=>x[0]===vv);return o?o[l+1]:vv};
        return `<tr><td>${i2+1}</td><td><b>${esc(r.name||'')}</b></td>
          <td>${esc(lb('power',r.power))}</td><td>${esc(lb('interest',r.interest))}</td>
          <td>${esc(lb('att',r.att))}</td><td>${esc(r.strat||'')}</td></tr>`}).join('')}
    </table>`});
  }

  /* ⑩ العمليات المنجزة */
  if(pdone){
    const gd={};
    Object.keys(pr).filter(k=>String(pr[k]||'').trim()).forEach(k=>{
      const pp=P().L.find(x=>x.n===+k.slice(1)); if(pp){gd[pp.g]=gd[pp.g]||[];gd[pp.g].push(pp)}});
    S.push({t:T('العمليات المنجزة من الأربعين','Completed Processes'), b:`
      <div class="pg">${Object.entries(P().GR).map(([k,v])=>{
        const tot=P().L.filter(p=>p.g===k).length, ls=gd[k]||[];
        return `<div class="pgc">
          <div class="pgh"><b>${esc(v[ar?'ar':'en'])}</b>
            <span class="m">${ls.length}/${tot}</span></div>
          <div class="pgb"><i style="width:${Math.round(ls.length/tot*100)}%"></i></div>
          ${ls.length?`<div class="pgl">${ls.map(p=>`<span>${p.n}. ${esc(p.t[l])}</span>`).join('')}</div>`:''}
        </div>`}).join('')}</div>`});
  }

  /* ⑪ الأداء */
  if(cpi){
    S.push({t:T('أداء التنفيذ','Execution Performance'), b:`
      <div class="kpi big">
        <div><b class="${cpi>=1?'g':'r'}">${cpi.toFixed(2)}</b><span>CPI</span></div>
        <div><b class="${spi>=1?'g':'r'}">${spi.toFixed(2)}</b><span>SPI</span></div>
        <div><b>${Math.round(eac)}</b><span>EAC</span></div>
        <div><b class="${vac>=0?'g':'r'}">${Math.round(vac)}</b><span>VAC</span></div>
      </div>
      <div class="gau">${[['CPI',cpi],['SPI',spi]].map(([n,v])=>`
        <div class="gau-r"><span>${n}</span>
          <div class="gau-t"><i style="width:${Math.min(100,v*70)}%;
            background:${v>=1?'#2fa87a':v>=.9?'#F07000':'#c0392b'}"></i>
            <u style="left:70%"></u></div>
          <b class="${v>=1?'g':'r'}">${v.toFixed(2)}</b></div>`).join('')}</div>
      <p class="ft-n">${T('الخط الرأسي عند ١٫٠٠ — ما دونه انحراف سلبي',
        'The vertical line marks 1.00 — below it is an adverse variance')}</p>
      ${(d.mon||{}).var?`<h3>${T('الإجراءات التصحيحية','Corrective actions')}</h3>
        <p>${esc(d.mon.var).replace(/\n/g,'<br>')}</p>`:''}`});
  }

  /* ⑫ التنفيذ والإغلاق */
  ['plan','exec','close'].forEach(k=>{
    const s2=ss.find(x=>x.k===k), v=d[k]||{};
    const fs=(s2.f||[]).filter(f=>String(v[f.k]||'').trim()&&f.ty!=='num');
    if(!fs.length)return;
    S.push({t:s2.n+'. '+s2.t[l], b:fs.map(f=>
      `<h3>${esc(f.l[l])}</h3><p>${esc(v[f.k]).replace(/\n/g,'<br>')}</p>`).join('')});
  });

  /* ⑬ الخلاصة */
  S.push({cls:'end', t:'', b:`
    <div class="cv">
      <div class="cv-lg">SOMU<i>•</i></div>
      <h1>${T('الخلاصة والتوصية','Conclusion and Recommendation')}</h1>
      <div class="rec">
        <ul class="bl big">
          <li>${T(`المشروع أنجز <b>${ov}%</b> من مراحله و<b>${pdone}</b> من الأربعين عملية`,
            `The project has completed <b>${ov}%</b> of its stages and <b>${pdone}</b> of forty processes`)}</li>
          ${m.signed?`<li>${T('الميثاق معتمد والتفويض قائم','The charter is approved and authority is in place')}</li>`:''}
          ${bd.verdict==='approve'?`<li>${T('اللجنة اعتمدت المشروع بناءً على جدوى مالية سليمة',
            'The board approved the project on a sound financial case')}</li>`:''}
          ${cpi&&cpi<1?`<li class="warn">${T(
            `<b>مطلوب قرار</b>: التقدير عند الإنجاز ${Math.round(eac)} بتجاوز ${Math.abs(Math.round(vac))} — ثلاثة خيارات: تمويل إضافي · تقليص نطاق · إعادة جدولة`,
            `<b>Decision required</b>: EAC ${Math.round(eac)} with an overrun of ${Math.abs(Math.round(vac))} — three options: additional funding · scope reduction · reschedule`)}</li>`:''}
          ${rows.filter(r=>r.att==='res').length?`<li class="warn">${T(
            'إشراك الأطراف المتحفّظة قبل أن تتحوّل إلى عائق',
            'Engage the resistant stakeholders before they become an impediment')}</li>`:''}
        </ul>
      </div>
      <div class="cv-m"><span>${esc(m.no)}</span><span>v${esc(m.ver)}</span></div>
      <div class="cv-cr">${T('تصميم وبرمجة د. محمد عطية','Designed & developed by Dr Mohamed Attia')}</div>
      <div class="cv-bars"><i></i><i></i><i></i><i></i></div>
    </div>`});
  return S;
}

/* ═══ مكتبة العمليات ═══ */
function procLib(){
  const l=L(), f=st.procF;
  const ps=P().L.filter(p=>f==='all'||p.g===f);
  return `<div class="navf" style="margin-bottom:13px">
    ${[['all',A.isAr()?'الكل':'All',40],
       ...Object.entries(P().GR).map(([k,v])=>
         [k,v[A.isAr()?'ar':'en'],P().L.filter(p=>p.g===k).length])].map(x=>
      `<button class="nf${f===x[0]?' on':''}" data-pf="${x[0]}">${esc(x[1])} <b>${x[2]}</b></button>`).join('')}
  </div>
  <div class="lf-lib">${ps.map(p=>`<button class="lf-lc g-${p.g}" data-proc="${p.n}">
    <span class="lf-ln m">${p.n}</span>
    <span class="lf-lt">${esc(p.t[l])}</span>
    <span class="lf-ld">${esc(P()[p.d][A.isAr()?'ar':'en'])}</span></button>`).join('')}</div>`;
}
function procModal(n){
  const p=P().L.find(x=>x.n===n); if(!p)return '';
  const l=L(), lang=A.isAr()?'ar':'en';
  const TT=(window.TT||{})[n]||[];
  const CH=window.CHAIN, nx=CH?CH.next(n):[], pv=CH?CH.prev(n):[];
  const d=dat().proc||{}, out=d['p'+n]||'';
  const tab=st.pTab||'itto';
  return `<div class="navov" id="pmov"><div class="navp" style="max-width:820px">
    <div class="navh"><span class="pm-n m">${p.n}</span>
      <b>${esc(p.t[l])}</b>
      <button class="pop-x" id="pmx">✕</button></div>
    <div class="pm-meta">
      <span class="tag s">${esc(P()[p.d][lang])}</span>
      <span class="tag v">${esc(P().GR[p.g][lang])}</span>
      <span class="tag">${esc(p.t[1])}</span>
      ${out?`<span class="tag g">${A.isAr()?'✓ مُنجزة':'✓ Completed'}</span>`:''}
    </div>
    <div class="pm-tabs">
      ${[['itto',A.isAr()?'⇄ المدخلات والمخرجات':'⇄ Inputs & Outputs'],
         ['tt',A.isAr()?'🛠 الأدوات والتقنيات':'🛠 Tools & Techniques'],
         ['work',A.isAr()?'✍ مساحة العمل':'✍ Workspace'],
         ['flow',A.isAr()?'🔗 السلسلة':'🔗 Chain']].map(x=>
        `<button class="pm-t${tab===x[0]?' on':''}" data-ptab="${x[0]}">${esc(x[1])}</button>`).join('')}
    </div>
    <div class="pm-body">
    ${tab==='itto'?`
      <div class="itto">
        <div class="itto-c in"><h5>⬅ ${A.isAr()?'المدخلات':'Inputs'}
          <span class="tag">${(A.isAr()?p.i:p.ie).length}</span></h5>
          <ul>${(A.isAr()?p.i:p.ie).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="itto-c out"><h5>${A.isAr()?'المخرجات':'Outputs'} ➡
          <span class="tag">${(A.isAr()?p.o:p.oe).length}</span></h5>
          <ul>${(A.isAr()?p.o:p.oe).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>`
    :tab==='tt'?`
      <div class="tt-g">${TT.map((t,i2)=>`<div class="tt-c">
        <span class="tt-n m">${i2+1}</span>
        <span class="tt-t">${esc(t[l])}</span>
        ${l===0?`<span class="tt-e">${esc(t[1])}</span>`:''}</div>`).join('')
        ||`<div class="empty" style="padding:24px"><b>—</b></div>`}</div>`
    :tab==='work'?(()=>{
      const ins=A.isAr()?p.i:p.ie, outs=A.isAr()?p.o:p.oe;
      const pd=(dat().pdata||{})['p'+n]||{};
      const nIn=ins.filter((x,k)=>String(pd['i'+k]||'').trim()).length;
      const nTT=TT.filter((x,k)=>pd['t'+k]).length;
      const nOut=outs.filter((x,k)=>String(pd['o'+k]||'').trim()).length;
      return `<div class="pw">
      <div class="pw-p">
        <div class="pw-pb"><i style="width:${Math.round((nIn+nTT+nOut)/(ins.length+TT.length+outs.length)*100)}%"></i></div>
        <span>${A.isAr()?'المدخلات':'Inputs'} <b>${nIn}/${ins.length}</b></span>
        <span>${A.isAr()?'الأدوات':'Tools'} <b>${nTT}/${TT.length}</b></span>
        <span>${A.isAr()?'المخرجات':'Outputs'} <b>${nOut}/${outs.length}</b></span>
      </div>

      <div class="pw-s in">
        <h5>⬅ ${A.isAr()?'١ · عبّئ المدخلات':'1 · Fill the inputs'}</h5>
        ${ins.map((x,k)=>`<div class="pw-f">
          <label><span class="pw-n">${k+1}</span>${esc(x)}</label>
          <textarea class="lf-in sm" rows="2" data-pd="${n}|i${k}"
            placeholder="${A.isAr()?'ما لديك من هذا المدخل؟':'What do you have for this input?'}"
            >${esc(pd['i'+k]||'')}</textarea></div>`).join('')}
      </div>

      <div class="pw-s tt">
        <h5>🛠 ${A.isAr()?'٢ · طبّق الأدوات — اختر ما استخدمته وسجّل النتيجة':'2 · Apply the tools — tick what you used and record the result'}</h5>
        ${TT.map((x,k)=>{const on=!!pd['t'+k];
          return `<div class="pw-t${on?' on':''}">
          <button class="pw-ck" data-pdt="${n}|t${k}">${on?'✓':''}</button>
          <div class="pw-tb">
            <b>${esc(x[l])}</b>
            ${on?`<textarea class="lf-in sm" rows="2" data-pd="${n}|tr${k}"
              placeholder="${A.isAr()?'ماذا أنتجت هذه الأداة؟':'What did this tool produce?'}"
              >${esc(pd['tr'+k]||'')}</textarea>`:''}
          </div></div>`}).join('')}
      </div>

      <div class="pw-s out">
        <h5>${A.isAr()?'٣ · اكتب المخرجات':'3 · Write the outputs'} ➡</h5>
        ${outs.map((x,k)=>`<div class="pw-f">
          <label><span class="pw-n">${k+1}</span>${esc(x)}</label>
          <textarea class="lf-in sm" rows="3" data-pd="${n}|o${k}"
            placeholder="${A.isAr()?'صف هذا المخرج لمشروعك':'Describe this output for your project'}"
            >${esc(pd['o'+k]||'')}</textarea></div>`).join('')}
      </div>

      <div class="pw-s doc">
        <h5>📄 ${A.isAr()?'٤ · الوثيقة المجمّعة':'4 · The consolidated document'}</h5>
        <textarea class="lf-in" rows="9" data-pout="${n}"
          placeholder="${A.isAr()?'اضغط «اجمع» لبناء الوثيقة ممّا عبّأته، أو «ولّد» لمسوّدة جاهزة…'
            :'Press "Assemble" to build it from what you filled, or "Generate" for a ready draft…'}"
          >${esc(out)}</textarea>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn p" data-pasm="${n}">${A.isAr()?'🔧 اجمع من مدخلاتي':'🔧 Assemble from my inputs'}</button>
        <button class="btn g" data-pgen="${n}">${A.isAr()?'✨ ولّد مسوّدة':'✨ Generate draft'}</button>
        <button class="btn o" data-pfill="${n}">${A.isAr()?'⚡ عبّئ الكل تلقائياً':'⚡ Auto-fill all'}</button>
        <button class="btn o" data-pclr="${n}">${A.isAr()?'🗑 امسح':'🗑 Clear'}</button>
      </div></div>`})()
    :`
      <div class="flow">
        <div class="flow-c pv"><h5>⬅ ${A.isAr()?'تتغذّى من':'Fed by'}
          <span class="tag">${pv.length}</span></h5>
          ${pv.length?pv.map(x=>`<button class="flow-i" data-proc="${x.n}">
            <span class="m">${x.n}</span>${esc(x.t[l])}</button>`).join('')
            :`<span class="flow-e">${A.isAr()?'لا سابق — نقطة بداية':'No predecessor — entry point'}</span>`}
        </div>
        <div class="flow-mid"><span class="m">${p.n}</span>
          <span>${esc(p.t[l])}</span></div>
        <div class="flow-c nx"><h5>${A.isAr()?'تُغذّي':'Feeds'} ➡
          <span class="tag">${nx.length}</span></h5>
          ${nx.length?nx.map(x=>`<button class="flow-i" data-proc="${x.n}">
            <span class="m">${x.n}</span>${esc(x.t[l])}</button>`).join('')
            :`<span class="flow-e">${A.isAr()?'لا لاحق — نقطة نهاية':'No successor — end point'}</span>`}
        </div>
      </div>`}
    </div>
    ${p.tp?`<div class="pm-foot"><button class="btn o full" data-lftp="${p.tp}">
      ${A.isAr()?'📄 افتح القالب المناسب':'📄 Open the matching template'}</button></div>`:''}
  </div></div>`;
}

/* ═══ قماش التوقيع ═══ */
let padCtx=null, padUsed=false;
function initPad(){
  const c=$('#sgPad'); if(!c)return;
  const r=c.getBoundingClientRect();
  c.width=Math.round(r.width*2); c.height=260;
  padCtx=c.getContext('2d'); padUsed=false;
  padCtx.lineCap='round'; padCtx.lineJoin='round';
  padCtx.strokeStyle='#103040'; padCtx.lineWidth=4;
  let dr=false;
  const pos=e=>{const b=c.getBoundingClientRect(), t=e.touches?e.touches[0]:e;
    return {x:(t.clientX-b.left)*(c.width/b.width), y:(t.clientY-b.top)*(c.height/b.height)}};
  const st2=e=>{e.preventDefault();dr=true;padUsed=true;const p=pos(e);
    padCtx.beginPath();padCtx.moveTo(p.x,p.y)};
  const mv=e=>{if(!dr)return;e.preventDefault();const p=pos(e);
    padCtx.lineTo(p.x,p.y);padCtx.stroke()};
  const en=()=>{dr=false};
  ['mousedown','touchstart'].forEach(k=>c.addEventListener(k,st2));
  ['mousemove','touchmove'].forEach(k=>c.addEventListener(k,mv));
  ['mouseup','mouseleave','touchend'].forEach(k=>c.addEventListener(k,en));
}
function chDocTitle(){ const d=dat().charter||{}, m=chMeta();
  return (d.id_name||(A.isAr()?'ميثاق المشروع':'Project Charter'))+' — '+m.no+' v'+m.ver; }
function chDocBody(){
  const C=window.CHARTER, l=L(), d=dat().charter||{}, m=chMeta(), ar=A.isAr();
  let H='';
  H+=`<table><tr><th>${ar?'رقم الوثيقة':'Document no.'}</th><td>${esc(m.no)}</td>
    <th>${ar?'الإصدار':'Version'}</th><td>${esc(m.ver)}</td>
    <th>${ar?'الحالة':'Status'}</th><td>${m.signed?(ar?'موقّع ومعتمد':'Signed and approved')
      :(ar?'مسوّدة':'Draft')}</td></tr></table>`;
  C.secs.forEach(sec=>{
    const rr=sec.f.filter(f=>String(d[sec.k+'_'+f.k]||'').trim());
    if(!rr.length)return;
    H+=`<h2>${esc(sec.t[l])}</h2><table>`;
    rr.forEach(f=>{H+=`<tr><th style="width:32%">${esc(f.l[l])}</th>
      <td>${esc(d[sec.k+'_'+f.k]).replace(/\n/g,'<br>')}</td></tr>`});
    H+='</table>';
  });
  if(m.signed&&m.sig){
    H+=`<h2>${ar?'الاعتماد':'Approval'}</h2>
      <table><tr><th>${ar?'المعتمِد':'Approver'}</th><td>${esc(m.sig.name)}</td></tr>
      <tr><th>${ar?'الصفة':'Role'}</th><td>${esc(m.sig.role)}</td></tr>
      <tr><th>${ar?'التاريخ':'Date'}</th><td>${esc(m.sig.date)}</td></tr>
      <tr><th>${ar?'بصمة المحتوى':'Content hash'}</th><td>${esc(m.sig.hash)}</td></tr></table>`;
    if(m.sig.img) H+=`<p><img src="${m.sig.img}" style="max-width:260px;border-bottom:2px solid #103040"></p>`;
  }
  if(m.log&&m.log.length){
    H+=`<h2>${ar?'سجلّ التغييرات':'Change Log'}</h2><table>
      <tr><th>${ar?'الإصدار':'Ver'}</th><th>${ar?'التاريخ':'Date'}</th>
        <th>${ar?'التغيير':'Change'}</th><th>${ar?'المبرّر':'Rationale'}</th>
        <th>${ar?'المعتمِد':'Approver'}</th></tr>
      ${m.log.map(x=>`<tr><td>${esc(x.ver)}</td><td>${esc(x.date)}</td>
        <td>${esc(x.what)}</td><td>${esc(x.why)}</td><td>${esc(x.by)}</td></tr>`).join('')}
    </table>`;
  }
  return H;
}

/* ═══ الصوت ═══ */
let recog=null, stream=null;
let blinkT=null;
function speak(txt, m){
  try{ if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(txt);
    u.lang=A.isAr()?'ar-SA':'en-GB';
    u.rate=(m&&m.voice?m.voice.rate:.95); u.pitch=(m&&m.voice?m.voice.pitch:1);
    st.board.speaking=true; A.render();
    /* حركة الفم والرمش */
    clearInterval(blinkT);
    blinkT=setInterval(()=>{ if(!st.board.speaking){clearInterval(blinkT);return}
      st.board.blink=Math.random()<0.12;
      const sv=$('.bd-main .av-svg');
      if(sv){ const PN=window.PANEL||[], q=B().Q[st.board.q];
        const who=(window.PANEL_Q||{})[q.k]||'chair';
        const mm=PN.find(x=>x.id===who)||PN[0];
        const w=$('.bd-main'); if(w){
          const kids=[...w.children].filter(c=>c.tagName!=='svg'&&!c.classList.contains('av-svg'));
          w.innerHTML=window.avatarSVG(mm,Math.random()<0.72,st.board.blink)
            + kids.map(c=>c.outerHTML).join(''); } }
    },130);
    u.onend=()=>{ st.board.speaking=false; st.board.blink=false;
      clearInterval(blinkT); A.render(); };
    window.speechSynthesis.speak(u);
  }catch(e){ st.board.speaking=false; }
}
function listen(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){ alert(A.isAr()
    ?'متصفّحك لا يدعم التعرّف على الكلام — اكتب إجابتك في الحقل.'
    :'Your browser does not support speech recognition — type your answer instead.');
    return; }
  try{
    recog=new SR(); recog.lang=A.isAr()?'ar-SA':'en-GB';
    recog.continuous=true; recog.interimResults=true;
    let final='';
    recog.onresult=e=>{ let interim='';
      for(let i2=e.resultIndex;i2<e.results.length;i2++){
        const t=e.results[i2][0].transcript;
        if(e.results[i2].isFinal) final+=t+' '; else interim+=t; }
      const ta=$('#bdAns'); if(ta) ta.value=(final+interim).trim(); };
    recog.onerror=()=>{st.board.listening=false;A.render()};
    recog.onend=()=>{ st.board.listening=false;
      const ta=$('#bdAns'); if(ta){const q=B().Q[st.board.q];st.board.ans[q.k]=ta.value}
      A.render(); };
    recog.start(); st.board.listening=true; A.render();
  }catch(e){ st.board.listening=false; }
}
async function cam(on){
  if(on){ try{ stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false});
      st.board.cam=true; A.render();
      setTimeout(()=>{const v=$('#bdcam');if(v)v.srcObject=stream},60);
    }catch(e){ alert(A.isAr()?'تعذّر تشغيل الكاميرا':'Could not start the camera'); } }
  else { if(stream){stream.getTracks().forEach(t=>t.stop());stream=null} st.board.cam=false; }
}

/* ═══ الربط ═══ */
function bind(){
  $$('[data-lfs]').forEach(b=>b.onclick=()=>{st.stage=+b.dataset.lfs;A.render()});
  const pv=$('#lfPrev'); if(pv)pv.onclick=()=>{if(st.stage>0){st.stage--;A.render()}};
  const nx=$('#lfNext'); if(nx)nx.onclick=()=>{if(st.stage<LF().length-1){st.stage++;A.render()}};
  $$('[data-lfv]').forEach(el=>{ let tm=null;
    const h=()=>{clearTimeout(tm);tm=setTimeout(()=>{
      const [sk,fk]=el.dataset.lfv.split('|'); setv(sk,fk,el.value);
      if(['cost','benefit','years','bac','pv','ev','ac'].includes(fk))A.render();},500)};
    el.oninput=h; el.onchange=h; });
  $$('[data-sc]').forEach(b=>b.onclick=()=>{
    const [sk,fk,v]=b.dataset.sc.split('|'); setv(sk,fk,v); A.render()});
  $$('[data-lfgen]').forEach(b=>b.onclick=()=>genStage(b.dataset.lfgen));
  $$('[data-lftp]').forEach(b=>b.onclick=()=>{
    const g=window.GEN; if(!g)return;
    const M={charter:'Project Charter',stake:'Stakeholder Register',risk:'Risk Register',
      ev:'Earned Value',network:'Critical Path',contract:'Contract',wbs:'WBS',
      raci:'RACI',team:'Team Charter',closure:'Closure Checklist',quality:'Quality',
      riskplan:'Risk Register',comms:'Stakeholder Register',scope:'WBS',rtm:'WBS',
      budget:'Earned Value',estimate:'Earned Value',lessons:'Closure Checklist',
      pmplan:'Project Charter',change:'Contract'};
    alert(g.make(M[b.dataset.lftp]||'template', A.isAr()?'ar':'en').replace(/\*\*/g,''))});
  $$('[data-proc]').forEach(b=>b.onclick=()=>{st.proc=+b.dataset.proc;st.pTab='itto';A.render()});
  $$('[data-ptab]').forEach(b=>b.onclick=()=>{st.pTab=b.dataset.ptab;A.render()});
  $$('[data-pout]').forEach(el=>{ let tm=null;
    el.oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>{
      const d=dat(); d.proc=d.proc||{}; d.proc['p'+el.dataset.pout]=el.value; save(d);},500)};});
  $$('[data-pgen]').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.pgen, O=window.OTPL||{}, ar2=A.isAr();
    const d=dat(); d.proc=d.proc||{};
    if(String(d.proc['p'+n]||'').trim()&&!confirm(ar2?'سيُستبدل ما كتبته. متابعة؟'
      :'Your text will be replaced. Continue?'))return;
    let txt;
    if(O[n]) txt=ar2?O[n].ar:O[n].en;
    else { const p=P().L.find(x=>x.n===n), l2=L(), TT2=(window.TT||{})[n]||[];
      txt=(ar2?'**مخرج العملية '+n+' — '+p.t[0]+'**\n\n':'**Output of process '+n+' — '+p.t[1]+'**\n\n')
       +(ar2?'**المدخلات المستخدمة**\n':'**Inputs used**\n')
       +(ar2?p.i:p.ie).map(x=>'• '+x).join('\n')
       +(ar2?'\n\n**الأدوات المطبَّقة**\n':'\n\n**Tools applied**\n')
       +TT2.slice(0,3).map(x=>'• '+x[l2]).join('\n')
       +(ar2?'\n\n**المخرجات المنتَجة**\n':'\n\n**Outputs produced**\n')
       +(ar2?p.o:p.oe).map(x=>'• '+x+(ar2?' — يُفصَّل هنا':' — detail here')).join('\n')
       +(ar2?'\n\n⚠️ أكمل التفاصيل من واقع مشروعك.':'\n\n⚠️ Complete the detail from your own project.');
    }
    d.proc['p'+n]=txt; save(d); A.render();});
  $$('[data-pclr]').forEach(b=>b.onclick=()=>{
    const d=dat(); if(d.proc)delete d.proc['p'+b.dataset.pclr];
    if(d.pdata)delete d.pdata['p'+b.dataset.pclr]; save(d); A.render();});
  /* حقول المدخلات والأدوات والمخرجات */
  $$('[data-pd]').forEach(el=>{ let tm=null;
    el.oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>{
      const [n,f]=el.dataset.pd.split('|'); const d=dat();
      d.pdata=d.pdata||{}; d.pdata['p'+n]=d.pdata['p'+n]||{};
      d.pdata['p'+n][f]=el.value; save(d);},500)};});
  $$('[data-pdt]').forEach(b=>b.onclick=()=>{
    const [n,f]=b.dataset.pdt.split('|'); const d=dat();
    d.pdata=d.pdata||{}; d.pdata['p'+n]=d.pdata['p'+n]||{};
    d.pdata['p'+n][f]=!d.pdata['p'+n][f]; save(d); A.render();});
  /* اجمع الوثيقة من المُدخَل */
  $$('[data-pasm]').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.pasm, ar4=A.isAr(), l4=L();
    const p=P().L.find(x=>x.n===n), TT4=(window.TT||{})[n]||[];
    const d=dat(), pd=(d.pdata||{})['p'+n]||{};
    const ins=ar4?p.i:p.ie, outs=ar4?p.o:p.oe;
    const L5=[];
    L5.push('**'+(ar4?p.t[0]:p.t[1])+'**\n');
    const fi=ins.map((x,k)=>[x,pd['i'+k]]).filter(x=>String(x[1]||'').trim());
    if(fi.length){ L5.push(ar4?'**المدخلات**':'**Inputs**');
      fi.forEach(x=>L5.push('• **'+x[0]+'** — '+x[1])); L5.push(''); }
    const ft=TT4.map((x,k)=>[x[l4],pd['tr'+k],pd['t'+k]]).filter(x=>x[2]);
    if(ft.length){ L5.push(ar4?'**الأدوات المطبَّقة**':'**Tools applied**');
      ft.forEach(x=>L5.push('• **'+x[0]+'**'+(String(x[1]||'').trim()?' — '+x[1]:''))); L5.push(''); }
    const fo=outs.map((x,k)=>[x,pd['o'+k]]).filter(x=>String(x[1]||'').trim());
    if(fo.length){ L5.push(ar4?'**المخرجات**':'**Outputs**');
      fo.forEach(x=>L5.push('• **'+x[0]+'**\n  '+x[1])); }
    if(!fi.length&&!ft.length&&!fo.length){
      alert(ar4?'عبّئ بعض الحقول أولاً، أو اضغط «⚡ عبّئ الكل تلقائياً».'
        :'Fill some fields first, or press "⚡ Auto-fill all".'); return; }
    d.proc=d.proc||{}; d.proc['p'+n]=L5.join('\n'); save(d); A.render();});
  /* التعبئة التلقائية الكاملة */
  $$('[data-pfill]').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.pfill, ar5=A.isAr(), l5=L();
    const p=P().L.find(x=>x.n===n), TT5=(window.TT||{})[n]||[];
    const d=dat();
    if(((d.pdata||{})['p'+n])&&!confirm(ar5?'سيُستبدل ما عبّأته. متابعة؟'
      :'Your entries will be replaced. Continue?'))return;
    const ins=ar5?p.i:p.ie, outs=ar5?p.o:p.oe;
    const pd={};
    ins.forEach((x,k)=>{pd['i'+k]=ar5
      ? `مُتاح من البرنامج — ${x} لمشروع FRIGATE BRAVO (يُستكمل بواقع مشروعك).`
      : `Available from the programme — ${x} for Project FRIGATE BRAVO (complete from your own project).`});
    TT5.forEach((x,k)=>{pd['t'+k]=true;
      pd['tr'+k]=ar5
        ? `طُبِّقت ${x[0]} وأنتجت مدخلاً موثّقاً للمخرج.`
        : `${x[1]} was applied and produced a documented input to the output.`});
    outs.forEach((x,k)=>{pd['o'+k]=ar5
      ? `${x} — أُنتج من المدخلات أعلاه بتطبيق الأدوات المذكورة، وهو مدخل للعمليات التالية.`
      : `${x} — produced from the inputs above by applying the listed tools, and is an input to downstream processes.`});
    d.pdata=d.pdata||{}; d.pdata['p'+n]=pd; save(d); A.render();});
  /* التصدير */
  {const ar3=A.isAr(), E=window.EXPORTER;
   const ttl=ar3?'تقرير دورة حياة المشروع — FRIGATE BRAVO':'Project Lifecycle Report — FRIGATE BRAVO';
   const ep=$('#exPdf'); if(ep&&E)ep.onclick=()=>E.pdf(ttl,repHTML(),ar3);
   const ew=$('#exWord'); if(ew&&E)ew.onclick=()=>E.word(ttl,repHTML(),ar3);
   const ed=$('#exDeck'); if(ed&&E)ed.onclick=()=>E.deck(ttl,deckSlides(),ar3);
   const ea=$('#exWa'); if(ea&&E)ea.onclick=()=>E.whatsapp('966544375447',repText());
   const em=$('#exMail'); if(em&&E)em.onclick=()=>E.email(ttl,repText().replace(/\*/g,''),'');}
  const px=$('#pmx'); if(px)px.onclick=()=>{st.proc=null;A.render()};
  const pmo=$('#pmov'); if(pmo)pmo.onclick=e=>{if(e.target===pmo){st.proc=null;A.render()}};
  $$('[data-pf]').forEach(b=>b.onclick=()=>{st.procF=b.dataset.pf;A.render()});
  /* الميثاق */
  $$('[data-chs]').forEach(b=>b.onclick=()=>{
    st.chSec=(st.chSec===+b.dataset.chs)?null:+b.dataset.chs; A.render();});
  $$('[data-chv]').forEach(el=>{ let tm=null;
    const h=()=>{clearTimeout(tm);tm=setTimeout(()=>{
      const d=dat(); d.charter=d.charter||{}; d.charter[el.dataset.chv]=el.value; save(d);},500)};
    el.oninput=h; el.onchange=h; });
  /* توقيع الميثاق */
  const cs=$('#chSign'); if(cs)cs.onclick=()=>{st.chSign=true;A.render();
    setTimeout(initPad,80);};
  const sgx=$('#sgx'), sgc=$('#sgCancel');
  [sgx,sgc].forEach(e=>{if(e)e.onclick=()=>{st.chSign=false;A.render()}});
  const sgcl=$('#sgClr'); if(sgcl)sgcl.onclick=()=>{const c=$('#sgPad');
    if(c&&padCtx)padCtx.clearRect(0,0,c.width,c.height);};
  const sgo=$('#sgOk'); if(sgo)sgo.onclick=()=>{
    const nm=($('#sgName')||{}).value||'', rl=($('#sgRole')||{}).value||'',
          dt=($('#sgDate')||{}).value||'';
    if(!nm.trim()){alert(A.isAr()?'اكتب اسم المعتمِد':'Enter the approver name');return}
    const c=$('#sgPad');
    let img=null; try{ if(c&&padUsed) img=c.toDataURL('image/png') }catch(e){}
    const m=chMeta(); m.signed=true;
    m.sig={name:nm,role:rl,date:dt,hash:chHash(),img:img,at:Date.now()};
    m.log=m.log||[];
    m.log.push({ver:m.ver,date:dt,by:nm,
      what:A.isAr()?'الإصدار الأول — اعتماد الميثاق':'Initial issue — charter approved',
      why:A.isAr()?'تفويض مدير المشروع ببدء التنفيذ':'Authorize the project manager to begin'});
    chSave(m); st.chSign=false; st.chView=true; A.render();};
  /* طلب التغيير */
  const ccr=$('#chCR'); if(ccr)ccr.onclick=()=>{st.chCR=true;A.render()};
  [$('#crx'),$('#crCancel')].forEach(e=>{if(e)e.onclick=()=>{st.chCR=false;A.render()}});
  const cro=$('#crOk'); if(cro)cro.onclick=()=>{
    const w=($('#crWhat')||{}).value||'', y=($('#crWhy')||{}).value||'',
          by=($('#crBy')||{}).value||'';
    if(!w.trim()){alert(A.isAr()?'صف التغيير المطلوب':'Describe the requested change');return}
    const m=chMeta();
    m.ver=(parseFloat(m.ver)+0.1).toFixed(1);
    m.signed=false;
    m.log=m.log||[];
    m.log.push({ver:m.ver,date:new Date().toISOString().slice(0,10),what:w,why:y,by:by});
    chSave(m); st.chCR=false; A.render();};
  const cus=$('#chUnsign'); if(cus)cus.onclick=()=>{
    if(!confirm(A.isAr()?'سحب الاعتماد يفتح الميثاق للتعديل دون رفع الإصدار. متابعة؟'
      :'Revoking approval opens the charter for editing without raising the version. Continue?'))return;
    const m=chMeta(); m.signed=false; m.sig=null; chSave(m); A.render();};
  /* تصدير الميثاق */
  const cpd=$('#chPdf'); if(cpd)cpd.onclick=()=>{const E=window.EXPORTER;
    if(E)E.pdf(chDocTitle(),chDocBody(),A.isAr())};
  const cwd=$('#chWord'); if(cwd)cwd.onclick=()=>{const E=window.EXPORTER;
    if(E)E.word(chDocTitle(),chDocBody(),A.isAr())};
  const cg=$('#chGen'); if(cg)cg.onclick=()=>{
    const d=dat(), ar=A.isAr();
    if(d.charter&&Object.keys(d.charter).length&&!confirm(A.isAr()
      ?'سيُستبدل ما كتبته. متابعة؟':'Your entries will be replaced. Continue?'))return;
    d.charter=ar?CH_AR():CH_EN(); save(d); st.chSec=0; A.render();};
  const cv=$('#chView'); if(cv)cv.onclick=()=>{st.chView=true;A.render();};
  const cx=$('#chx'); if(cx)cx.onclick=()=>{st.chView=false;A.render();};
  const cov=$('#chov'); if(cov)cov.onclick=e=>{if(e.target===cov){st.chView=false;A.render()}};
  const cp=$('#chPrint'); if(cp)cp.onclick=()=>{st.chView=true;A.render();
    setTimeout(()=>window.print(),500);};
  /* السجلّ */
  $$('[data-skstep]').forEach(b=>b.onclick=()=>{st.skStep=+b.dataset.skstep;A.render();});
  $$('[data-sksel]').forEach(b=>b.onclick=()=>{st.skSel=+b.dataset.sksel;A.render();});
  $$('[data-skv2]').forEach(b=>b.onclick=()=>{st.skView=b.dataset.skv2;A.render();});
  $$('[data-skv]').forEach(b=>b.onclick=()=>{
    const [i2,f,v]=b.dataset.skv.split('|');
    const d=dat(), R2=window.SREG;
    if(!d.stakeRows||!d.stakeRows[+i2])return;
    d.stakeRows[+i2][f]=v;
    /* تحديث تلقائي للاستراتيجية */
    const r=d.stakeRows[+i2];
    if(r.power&&r.interest) r.strat=R2.auto(r.power,r.interest,A.isAr()?'ar':'en');
    save(d);A.render();});
  const sau=$('#skAuto'); if(sau)sau.onclick=()=>{
    const d=dat(), R2=window.SREG, lang=A.isAr()?'ar':'en';
    (d.stakeRows||[]).forEach(r=>{r.strat=R2.auto(r.power,r.interest,lang)});
    save(d);A.render();};
  const sx=$('#skExp'); if(sx)sx.onclick=()=>{
    const R2=window.SREG, l=L(), rows=dat().stakeRows||[];
    const hdr=R2.cols.map(c=>c.l[l]).join(',');
    const body=rows.map(r=>R2.cols.map(c=>{
      let v=r[c.k]||''; if(c.o){const o=c.o.find(x=>x[0]===v); v=o?o[l+1]:v}
      return '"'+String(v).replace(/"/g,'""')+'"'}).join(',')).join('\n');
    const b2=new Blob(['\ufeff'+hdr+'\n'+body],{type:'text/csv;charset=utf-8'});
    const a=document.createElement('a');a.href=URL.createObjectURL(b2);
    a.download='stakeholder-register.csv';a.click();};
  /* أصحاب المصلحة */
  const sa=$('#skAdd'); if(sa)sa.onclick=()=>{const d=dat();
    d.stakeRows=d.stakeRows||[];
    d.stakeRows.push({name:'',power:'med',interest:'med',att:'neut'}); save(d);A.render();};
  $$('[data-sk]').forEach(el=>{ const h=()=>{
    const [i2,f]=el.dataset.sk.split('|'); const d=dat();
    d.stakeRows[+i2][f]=el.value; save(d);
    if(f!=='name')A.render(); };
    el.onchange=h; if(el.tagName==='INPUT'){let tm=null;
      el.oninput=()=>{clearTimeout(tm);tm=setTimeout(h,500)}} });
  $$('[data-skdel]').forEach(b=>b.onclick=()=>{const d=dat();
    d.stakeRows.splice(+b.dataset.skdel,1); save(d);A.render()});
  const sg=$('#skGen'); if(sg)sg.onclick=()=>{const d=dat();
    const R2=window.SREG, lang=A.isAr()?'ar':'en';
    if(R2&&R2.seed){ d.stakeRows=R2.seed(lang);
      d.stakeRows.forEach(r=>{r.strat=R2.auto(r.power,r.interest,lang)});
      save(d);A.render();return; }
    d.stakeRows=[
     {name:A.isAr()?'العميل البحري — الجهة المتعاقدة':'Naval customer — contracting authority',power:'high',interest:'high',att:'sup'},
     {name:A.isAr()?'جمعية التصنيف — نقاط التوقّف':'Classification society — hold points',power:'high',interest:'high',att:'neut'},
     {name:A.isAr()?'مجلس البرنامج — سلطة التمويل':'Programme board — funding authority',power:'high',interest:'med',att:'sup'},
     {name:A.isAr()?'الحوض — المنفّذ':'The Yard — executing organization',power:'med',interest:'high',att:'champ'},
     {name:A.isAr()?'شريك التصميم — مالك الترخيص':'Design partner — licence holder',power:'med',interest:'med',att:'sup'},
     {name:A.isAr()?'نقابة الحوض — تأهيل اللحّامين':'Yard union — welder qualification',power:'med',interest:'high',att:'res'},
     {name:A.isAr()?'المورّدون الحرجون':'Critical suppliers',power:'med',interest:'high',att:'neut'}];
    save(d);A.render()};
  /* اللجنة */
  const bs=$('#bdStart'); if(bs)bs.onclick=()=>{
    st.board={on:true,q:0,ans:{},scores:{},done:false,res:null,listening:false,cam:st.board.cam};
    A.render(); setTimeout(()=>{const q=B().Q[0];
      const PN=window.PANEL||[], w=(window.PANEL_Q||{})[q.k]||'chair';
      speak(A.isAr()?q.ar:q.en, PN.find(x=>x.id===w))},500)};
  const bc=$('#bdCam'); if(bc)bc.onclick=()=>cam(!st.board.cam);
  const bsp=$('#bdSpeak'); if(bsp)bsp.onclick=()=>{const q=B().Q[st.board.q];
    const PN=window.PANEL||[], w=(window.PANEL_Q||{})[q.k]||'chair';
    speak(A.isAr()?q.ar:q.en, PN.find(x=>x.id===w))};
  const bc2=$('#bdCam2'); if(bc2)bc2.onclick=()=>cam(!st.board.cam);
  const bm=$('#bdMic'); if(bm)bm.onclick=()=>{
    if(st.board.listening){ if(recog)recog.stop(); st.board.listening=false; A.render(); }
    else listen()};
  const bn=$('#bdNext'); if(bn)bn.onclick=()=>{
    const ta=$('#bdAns'), BQ=B().Q, q=BQ[st.board.q];
    st.board.ans[q.k]=ta?ta.value:'';
    st.board.scores[q.k]=B().grade(st.board.ans[q.k],q).s;
    if(recog){try{recog.stop()}catch(e){}} st.board.listening=false;
    if(st.board.q<BQ.length-1){ st.board.q++; A.render();
      setTimeout(()=>{const n2=BQ[st.board.q];
        const PN=window.PANEL||[], w2=(window.PANEL_Q||{})[n2.k]||'chair';
        speak(A.isAr()?n2.ar:n2.en, PN.find(x=>x.id===w2))},500); }
    else { const res=B().decide(st.board.scores, dat().case||{});
      res.scores=st.board.scores; st.board.res=res; st.board.done=true;
      const d=dat(); d.board=res; save(d);
      cam(false); A.render();
      setTimeout(()=>speak(A.isAr()
        ? (res.verdict==='approve'?'قرار اللجنة: يُعتمد المشروع.'
          :res.verdict==='conditional'?'قرار اللجنة: يُعتمد بشروط.'
          :'قرار اللجنة: لا يُعتمد في صيغته الحالية.')
        : (res.verdict==='approve'?'Board decision: the project is approved.'
          :res.verdict==='conditional'?'Board decision: approved with conditions.'
          :'Board decision: not approved in its current form.')),500); } };
  const bq=$('#bdQuit'); if(bq)bq.onclick=()=>{
    if(recog){try{recog.stop()}catch(e){}} cam(false);
    st.board.on=false; A.render()};
  const ba=$('#bdAgain'); if(ba)ba.onclick=()=>{const d=dat();delete d.board;save(d);
    st.board={on:false,q:0,ans:{},scores:{},done:false,res:null,listening:false,cam:false};A.render()};
  const bg=$('#bdGo'); if(bg)bg.onclick=()=>{st.board.on=false;st.stage=4;A.render()};
  /* تصدير */
  const ex=$('#lfExp'); if(ex)ex.onclick=()=>{
    const b2=new Blob([JSON.stringify(dat(),null,1)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(b2);
    a.download='somu-project-lifecycle.json';a.click()};
  const rs=$('#lfRst'); if(rs)rs.onclick=()=>{
    if(!confirm(A.isAr()?'مسح كل بيانات المشروع؟':'Clear all project data?'))return;
    A.DB.del('life'); st.stage=0; A.render()};
}

/* ═══ التوليد التلقائي لكل مرحلة ═══ */
function genStage(k){
  const ar=A.isAr(), d=dat();
  const G={
   need:{ar:{problem:'الأسطول الحالي يبلغ نهاية عمره التشغيلي خلال خمس سنوات، ولا تملك الدولة قدرة بناء محلية معتمدة. الاعتماد الكامل على الاستيراد يرفع كلفة دورة الحياة ويقيّد جاهزية الأسطول.',
     driver:'strategic',
     impact:'استمرار الاعتماد على الاستيراد: كلفة صيانة أعلى بنحو ٤٠٪ · زمن استجابة للأعطال يقاس بالأشهر · فقدان فرصة نقل قدرة صناعية · تعرّض الجاهزية لقيود التصدير.',
     benef:'البحرية (القدرة) · الحوض (استمرارية التشغيل) · الدولة (المحتوى المحلي والوظائف) · سلسلة التوريد المحلية'},
    en:{problem:'The current fleet reaches end of operational life within five years, and the state has no certified domestic build capability. Full import dependence raises lifecycle cost and constrains fleet readiness.',
     driver:'strategic',
     impact:'Continued import dependence: roughly 40% higher maintenance cost · fault response measured in months · a lost industrial capability transfer opportunity · readiness exposed to export controls.',
     benef:'The navy (capability) · the yard (operational continuity) · the state (local content and jobs) · the domestic supply chain'}},
   feas:{ar:{options:'١) لا نفعل شيئاً — تمديد عمر الأسطول الحالي بالصيانة\n٢) الاستيراد الكامل من شريك خارجي\n٣) البناء المحلي بتصميم مرخّص ونقل قدرة ← الموصى به',
     tech:'4',econ:'4',oper:'3',legal:'3',sched:'3',
     rec:'الخيار الثالث. الاستيراد الكامل أسرع لكنه لا ينقل قدرة ويُبقي الجاهزية رهن قيود التصدير. وتمديد العمر يؤجّل المشكلة بكلفة صيانة متصاعدة. البناء المحلي بتصميم مرخّص يوازن: يقلّل مخاطر التصميم ويبني القدرة تدريجياً بخيار تعاقدي لهيكلين تاليين.'},
    en:{options:'1) Do nothing — extend current fleet life through maintenance\n2) Full import from an external partner\n3) Domestic build under a licensed design with capability transfer ← recommended',
     tech:'4',econ:'4',oper:'3',legal:'3',sched:'3',
     rec:'Option three. Full import is faster but transfers no capability and leaves readiness subject to export controls. Life extension defers the problem at escalating maintenance cost. Domestic build under a licensed design balances both: it reduces design risk while building capability incrementally, with a contracted option for two follow-on hulls.'}},
   case:{ar:{cost:'840',benefit:'310',years:'6',
     risks:'١) تأخّر المورّدين الحرجين على المسار الحرج — أثر مباشر على نقاط التوقّف والدفعات\n٢) قيود ضوابط التصدير على التصميم المرخّص تحدّ ما يمكن مشاركته\n٣) نقص اللحّامين المعتمدين — خط التأهيل أحد عشر أسبوعاً',
     align:'يخدم ركيزة «القدرة الصناعية الوطنية» ويحقّق نسبة المحتوى المحلي المتعاقد عليها، ويؤسّس خط إنتاج قابلاً للتوسّع للهيكلين التاليين.'},
    en:{cost:'840',benefit:'310',years:'6',
     risks:'1) Critical supplier delay on the critical path — direct impact on hold points and payments\n2) Export control constraints on the licensed design limit what can be shared\n3) Certified welder shortage — an eleven-week qualification pipeline',
     align:'Serves the national industrial capability pillar, achieves the contracted local content percentage, and establishes a production line extensible to the two follow-on hulls.'}},
   env:{ar:{eef_int:'ثقافة الحوض الهندسية · الهيكل المصفوفي الضعيف · البنية التحتية للأحواض الجافة · توافر اللحّامين المعتمدين · نظام تخطيط الموارد القائم',
     eef_ext:'قواعد جمعية التصنيف · ضوابط التصدير على التصميم المرخّص · لوائح السلامة والبيئة الوطنية · ظروف سوق المعدّات البحرية · أسعار الصرف',
     opa_proc:'مكتبة إجراءات اللحام · قوالب ميثاق المشروع وسجلّ المخاطر · معايير الجودة الداخلية · إجراء ضبط التغيير · عتبات التصعيد',
     opa_know:'قاعدة التقدير من الفئة السابقة · سجلّ الدروس المستفادة · بيانات الأداء التاريخية · سجلّ أداء المورّدين'},
    en:{eef_int:'The yard\'s engineering culture · weak matrix structure · dry dock infrastructure · certified welder availability · the existing ERP system',
     eef_ext:'Classification society rules · export controls on the licensed design · national safety and environmental regulations · marine equipment market conditions · exchange rates',
     opa_proc:'Weld procedure library · project charter and risk register templates · internal quality standards · change control procedure · escalation thresholds',
     opa_know:'Estimating database from the previous class · lessons learned register · historical performance data · supplier performance records'}},
   charter:{ar:{pm:'مدير البرنامج: يُعيَّن بقرار من مجلس البرنامج. صلاحية اعتماد التغييرات حتى عشرة ملايين، وما فوقها يُصعَّد للمجلس.',
     purpose:'تسليم فراقة قائدة بقدرة قتالية معتمدة، مع خيار تعاقدي لهيكلين تاليين، ونقل قدرة صناعية محلية معتمدة.',
     obj:'• التسليم وفق المعالم التعاقدية بلا فقد نقاط توقّف\n• شهادة جمعية التصنيف بلا تحفّظات جوهرية\n• البقاء داخل الميزانية المعتمدة ٨٤٠ مليون\n• تحقيق نسبة المحتوى المحلي المتعاقد عليها\n• تأهيل عدد متفق عليه من اللحّامين محلياً',
     req:'الامتثال لقواعد جمعية التصنيف · ضوابط التصدير على التصميم المرخّص · معايير قبول منظومة القتال موثّقة لكل زيادة · متطلبات السلامة وتأهيل اللحام',
     risk:'تأخّر الموردين الحرجين · توافر مساح التصنيف · فقد اللحّامين المعتمدين · غموض معايير القبول · قيود ضوابط التصدير',
     mile:'قطع أول صفيحة · وضع العارضة · الإنزال · تشغيل المنظومات · التجارب البحرية · التسليم والقبول',
     budget:'٨٤٠ مليون · احتياطي طوارئ داخل خط الأساس بسلطة مدير البرنامج · احتياطي إداري خارجه بسلطة المجلس',
     approve:'اجتياز كل نقاط التوقّف · شهادة التصنيف صادرة · قبول العميل الرسمي للقدرة · تسوية العقود'},
    en:{pm:'Programme manager: appointed by decision of the programme board. Authority to approve changes up to ten million; above that escalates to the board.',
     purpose:'Deliver a lead frigate with certified combat capability, with a contracted option for two follow-on hulls, and transfer certified domestic industrial capability.',
     obj:'• Delivery against contractual milestones with no hold points lost\n• Classification certificate with no material qualifications\n• Remain within the approved 840 million budget\n• Achieve the contracted local content percentage\n• Qualify an agreed number of welders domestically',
     req:'Compliance with classification society rules · export controls on the licensed design · documented combat-system acceptance criteria per increment · safety and welder qualification requirements',
     risk:'Critical supplier delay · class surveyor availability · loss of certified welders · ambiguous acceptance criteria · export control constraints',
     mile:'First steel cut · keel laying · launch · systems commissioning · sea trials · delivery and acceptance',
     budget:'840 million · contingency reserve within the baseline under the programme manager · management reserve outside it under the board',
     approve:'All hold points passed · class certificate issued · formal customer acceptance of capability · contract settlement'}},
   plan:{ar:{scope:'بيان النطاق: فراقة قائدة كاملة التجهيز بقدرة قتالية معتمدة.\nهيكل التجزئة المستوى ٢: ١ الهيكل والبناء · ٢ منظومة الدفع · ٣ منظومة القتال · ٤ التجهيز والأنظمة المساعدة · ٥ التجارب والقبول · ٦ إدارة البرنامج والامتثال',
     sched:'المسار الحرج عبر تجهيز الهيكل: A(٤) → B(٩) → D(٧) → E(٣) = ٢٣ أسبوعاً. النشاط C بفائض ٧ أسابيع. نقاط التوقّف التعاقدية عند نهاية E.',
     cost:'خط أساس التكلفة ٧٥٦ مليون · احتياطي طوارئ ٥٦ مليون داخل خط الأساس · احتياطي إداري ٢٨ مليون خارجه.',
     qual:'تكلفة الجودة: استثمار في الوقاية (مراجعة النظير · تأهيل مسبق) لخفض الفشل. نقاط توقّف جمعية التصنيف هي بوابات ضبط الجودة.',
     res:'RACI: اعتماد الميثاق A=المجلس · التغيير داخل العتبة A/R=مدير البرنامج · اجتياز نقطة توقّف A=جمعية التصنيف · قبول زيادة القتال A=العميل.',
     comm:'تقرير أداء شهري للمجلس · تقرير أسبوعي لمسؤولي المسارات · إخطار فوري لأي فقد نقطة توقّف · مستودع وثائق واحد.',
     risk:'أعلى المخاطر: فقد نقاط توقّف (عالية جداً — حجز مبكر + مساح بديل) · تأخّر الدفع (عالية — خطة تصحيحية + ضغط جدول) · غموض معايير القبول (عالية — توضيح عبر ضبط التغيير) · نقص اللحّامين (عالية — تعاقد خارجي).',
     proc:'الدفع: ثابت السعر بتسامح واضح · منظومة القتال: ثابت بحوافز مع معايير قبول موثّقة لكل زيادة · التأهيل: وقت ومواد بسقف.'},
    en:{scope:'Scope statement: one fully outfitted lead frigate with certified combat capability.\nWBS level 2: 1 Hull and construction · 2 Propulsion · 3 Combat system · 4 Outfitting and auxiliaries · 5 Trials and acceptance · 6 Programme management and compliance',
     sched:'Critical path through hull outfitting: A(4) → B(9) → D(7) → E(3) = 23 weeks. Activity C carries 7 weeks of float. Contractual hold points at the end of E.',
     cost:'Cost baseline 756 million · contingency reserve 56 million within the baseline · management reserve 28 million outside it.',
     qual:'Cost of quality: invest in prevention (peer review · pre-qualification) to reduce failure. Classification society hold points are the quality control gates.',
     res:'RACI: charter approval A=board · change within threshold A/R=programme manager · hold point pass A=class society · combat increment acceptance A=customer.',
     comm:'Monthly performance report to the board · weekly report to stream leads · immediate notification of any hold point loss · a single document repository.',
     risk:'Top risks: hold points lost (very high — early booking + alternate surveyor) · propulsion delay (high — corrective plan + schedule compression) · ambiguous acceptance criteria (high — clarify through change control) · welder shortage (high — external contracting).',
     proc:'Propulsion: fixed price with a clear tolerance · combat system: fixed price incentive with documented acceptance criteria per increment · qualification: T&M with a ceiling.'}},
   exec:{ar:{deliv:'الهيكل الأساسي مكتمل · بيئات الاختبار جاهزة · زيادات منظومة القتال ١–٤ مقبولة · الزيادة ٥ مرفوضة قيد المعالجة',
     issues:'١) حزمة الدفع متأخرة ستة أسابيع — داخل التسامح التعاقدي\n٢) مساح التصنيف غير متاح لثلاث نقاط توقّف\n٣) لحّامان معتمدان استقالا',
     changes:'طلب تغيير ١: رسوم المساح البديل — معتمد\nطلب تغيير ٢: توضيح معيارين من معايير القبول — قيد المراجعة',
     lessons:'معايير القبول يجب أن تُوثَّق وتُعتمد كتابةً قبل بدء كل زيادة · حجز مساح التصنيف يبدأ قبل ثمانية أسابيع من نقطة التوقّف · تسامح العقد الثماني أسابيع أطول مما يخدم المسار الحرج'},
    en:{deliv:'Core hull complete · test environments ready · combat-system increments 1–4 accepted · increment 5 rejected and under resolution',
     issues:'1) Propulsion package six weeks late — within contractual tolerance\n2) Class surveyor unavailable for three hold points\n3) Two certified welders resigned',
     changes:'CR1: alternate surveyor fee — approved\nCR2: clarify two acceptance criteria — under review',
     lessons:'Acceptance criteria must be documented and agreed in writing before each increment starts · surveyor booking begins eight weeks before the hold point · the eight-week contract tolerance is longer than the critical path can absorb'}},
   mon:{ar:{bac:'840',pv:'378',ev:'336',ac:'395',
     var:'انحراف التكلفة −٥٩ وانحراف الجدول −٤٢. الإجراءات: خطة تصحيحية موقّعة مع مورّد الدفع · تتبّع سريع لأنشطة التجهيز استعاد ثلاثة أسابيع · عرض ثلاثة خيارات على المجلس (تمويل إضافي · تقليص نطاق محدّد · إعادة جدولة).'},
    en:{bac:'840',pv:'378',ev:'336',ac:'395',
     var:'Cost variance −59 and schedule variance −42. Actions: signed corrective plan with the propulsion supplier · fast tracking of outfitting recovered three weeks · three options presented to the board (additional funding · targeted scope reduction · reschedule).'}},
   close:{ar:{accept:'قبول رسمي كتابي من العميل البحري لكل المخرجات · اجتياز كل نقاط التوقّف · شهادة التصنيف صادرة بلا تحفّظات جوهرية',
     contract:'إغلاق العقود الثلاثة · تسوية المطالبات المفتوحة · الإفراج عن الاحتياطيات · توثيق ضمانات ما بعد التسليم',
     trans:'فريق التشغيل مُدرَّب ومعتمد · وثائق التشغيل والصيانة مُسلَّمة · قطع الغيار وترتيبات الدعم قائمة · نقل المعرفة الضمنية موثّق (لماذا رُفضت البدائل المعمارية)',
     lessons:'جلسة دروس قبل تفرّق الفريق · تحديث قاعدة التقدير بأرقام الفئة · تحديث مكتبة إجراءات اللحام · توثيق سابقة معايير القبول للفئة التالية',
     release:'تسريح الفريق رسمياً · إنجاز التقييمات · إعادة المرافق والمعدّات · الاحتفاظ بالنواة للهيكلين التاليين'},
    en:{accept:'Formal written acceptance from the naval customer for all deliverables · all hold points passed · class certificate issued with no material qualifications',
     contract:'All three contracts closed · open claims settled · reserves released · post-delivery warranties documented',
     trans:'Operations team trained and certified · operations and maintenance documentation handed over · spares and support arrangements in place · tacit knowledge transfer documented (why architectural alternatives were rejected)',
     lessons:'Lessons session before the team disperses · estimating database updated with class figures · weld procedure library updated · acceptance criteria precedent documented for the next class',
     release:'Team formally released · appraisals completed · facilities and equipment returned · core retained for the two follow-on hulls'}}
  };
  const g=G[k]; if(!g){ alert(A.isAr()?'لا مسوّدة لهذه المرحلة':'No draft for this stage'); return; }
  const s=LF().find(x=>x.k===k);
  const cur=d[k]||{};
  const has=Object.keys(cur).some(x=>String(cur[x]||'').trim());
  if(has && !confirm(A.isAr()?'سيُستبدل ما كتبته. متابعة؟'
    :'Your current entries will be replaced. Continue?')) return;
  d[k]=ar?g.ar:g.en; save(d); A.render();
}

return { page, bind, attach(api){A=api}, deckSlides, repHTML, repText,
  get st(){return st}, set st(v){st=v} };
})();
