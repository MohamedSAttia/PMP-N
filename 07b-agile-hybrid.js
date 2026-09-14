/* ============================================================
   ① اختيار النهج  ② سكروم  ③ كانبان  ④ النهج المختلط
   تفاعلية بالكامل — SOMU
   ============================================================ */

/* ═══════════ ① عوامل اختيار النهج ═══════════ */
window.APPROACH = {
 /* كل عامل يُقيَّم على مقياس ٥ · الطرف الأيسر تنبؤي والأيمن رشيق */
 factors:[
  {k:'req', ar:['استقرار المتطلبات','مستقرة ومكتملة','تتطوّر بالتعلّم'],
           en:['Requirements stability','Stable and complete','Emerge through learning']},
  {k:'chg', ar:['كلفة التغيير','مرتفعة جداً بعد البدء','منخفضة ومقبولة'],
           en:['Cost of change','Very high once started','Low and acceptable']},
  {k:'reg', ar:['العبء التنظيمي','اعتماد وشهادات ونقاط توقّف','خفيف أو داخلي']},
  {k:'fb',  ar:['تواتر تغذية العميل الراجعة','عند التسليم النهائي','بعد كل زيادة'],
           en:['Customer feedback cadence','At final handover','After each increment']},
  {k:'del', ar:['قابلية التسليم التدريجي','المنتج لا يعمل إلا كاملاً','أجزاء تُستخدم فوراً'],
           en:['Incremental deliverability','Only works when complete','Parts usable immediately']},
  {k:'team',ar:['تفرّغ الفريق وتجاوره','موزّع وجزئي التفرّغ','متفرّغ ومتقارب'],
           en:['Team dedication and proximity','Distributed and part-time','Dedicated and co-located']},
  {k:'tech',ar:['وضوح الحلّ التقني','معروف ومجرَّب','استكشافي وجديد'],
           en:['Technical solution clarity','Known and proven','Exploratory and novel']},
  {k:'cont',ar:['طبيعة العقد','نطاق ثابت مسعّر','مرن أو بالوقت والمواد'],
           en:['Contract nature','Fixed priced scope','Flexible or T&M']}
 ],
 /* يحوّل المجموع إلى توصية */
 verdict(scores){
  const ks=Object.keys(scores);
  if(!ks.length) return null;
  const vals=ks.map(k=>+scores[k]).filter(v=>v>=1&&v<=5);
  if(vals.length<4) return {v:'more', n:vals.length};
  const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
  const spread=Math.max(...vals)-Math.min(...vals);
  let v;
  if(spread>=3) v='hybrid';            /* عوامل متضاربة ← مختلط */
  else if(avg<=2.4) v='predictive';
  else if(avg>=3.6) v='agile';
  else v='hybrid';
  return {v, avg:avg.toFixed(1), spread, n:vals.length};
 },
 label(v,ar){
  const M={predictive:['تنبؤي','Predictive'],agile:['رشيق','Agile / Adaptive'],
           hybrid:['مختلط','Hybrid']};
  return M[v]?(ar?M[v][0]:M[v][1]):v;
 },
 why(v,scores,ar){
  const F=window.APPROACH.factors;
  const lo=F.filter(f=>+scores[f.k]<=2).map(f=>ar?f.ar[0]:(f.en?f.en[0]:f.ar[0]));
  const hi=F.filter(f=>+scores[f.k]>=4).map(f=>ar?f.ar[0]:(f.en?f.en[0]:f.ar[0]));
  if(v==='predictive') return ar
    ? `العوامل التي دفعت نحو التنبؤي: ${lo.slice(0,3).join(' · ')}. المواصفة مستقرة وكلفة التغيير مرتفعة، فالتخطيط المسبق أرخص من التعلّم المتكرّر.`
    : `Factors pushing predictive: ${lo.slice(0,3).join(' · ')}. The specification is stable and change is expensive, so upfront planning costs less than repeated learning.`;
  if(v==='agile') return ar
    ? `العوامل التي دفعت نحو الرشيق: ${hi.slice(0,3).join(' · ')}. المتطلبات تتطوّر والتسليم تدريجي، فالتغذية الراجعة المبكّرة أثمن من الخطة المفصّلة.`
    : `Factors pushing agile: ${hi.slice(0,3).join(' · ')}. Requirements evolve and delivery is incremental, so early feedback is worth more than a detailed plan.`;
  return ar
    ? `عواملك متضاربة — ${lo.length?'نحو التنبؤي: '+lo.slice(0,2).join(' · '):''}${lo.length&&hi.length?' | ':''}${hi.length?'نحو الرشيق: '+hi.slice(0,2).join(' · '):''}. وهذا بالضبط ما يستوجب النهج المختلط: نهج لكل مجال نطاق لا نهج واحد للمشروع.`
    : `Your factors conflict — ${lo.length?'toward predictive: '+lo.slice(0,2).join(' · '):''}${lo.length&&hi.length?' | ':''}${hi.length?'toward agile: '+hi.slice(0,2).join(' · '):''}. This is precisely what calls for hybrid: an approach per scope area, not one for the project.`;
 }
};

/* ═══════════ ② سكروم ═══════════ */
window.SCRUM = {
 roles:[
  {k:'po', ic:'🎯', ar:['مالك المنتج','يرتّب قائمة الأعمال ويملك القيمة. هو من يقرّر ما يُبنى ومتى — ولا يقرّر كيف.'],
          en:['Product Owner','Orders the backlog and owns value. Decides what is built and when — never how.']},
  {k:'sm', ic:'🛡', ar:['سكرم ماستر','يخدم الفريق ويزيل العوائق ويحمي السبرنت. ليس مديراً للفريق.'],
          en:['Scrum Master','Serves the team, removes impediments, protects the sprint. Not the team\u2019s manager.']},
  {k:'dev',ic:'🔧', ar:['المطوّرون','ينظّمون أنفسهم ويبنون الزيادة. هم وحدهم من يغيّر قائمة السبرنت أثناءه.'],
          en:['Developers','Self-organise and build the increment. They alone change the sprint backlog mid-sprint.']}
 ],
 events:[
  {k:'plan',ic:'📋',ar:['تخطيط السبرنت','ماذا وكيف — يُحدَّد هدف السبرنت وقائمته.','٨ ساعات لسبرنت شهر'],
           en:['Sprint Planning','What and how — the sprint goal and backlog are set.','8 hours for a one-month sprint']},
  {k:'daily',ic:'☀️',ar:['الاجتماع اليومي','١٥ دقيقة — الفريق للفريق لا للمدير.','١٥ دقيقة يومياً'],
            en:['Daily Scrum','15 minutes — team to team, not to a manager.','15 minutes daily']},
  {k:'rev',ic:'🔍',ar:['مراجعة السبرنت','تفتيش الزيادة مع أصحاب المصلحة وتكييف قائمة المنتج.','٤ ساعات لسبرنت شهر'],
          en:['Sprint Review','Inspect the increment with stakeholders and adapt the product backlog.','4 hours for a one-month sprint']},
  {k:'retro',ic:'🔄',ar:['الاستعادة','تفتيش العملية — إجراء واحد بمالك وتاريخ.','٣ ساعات لسبرنت شهر'],
            en:['Retrospective','Inspect the process — one action with an owner and a date.','3 hours for a one-month sprint']}
 ],
 artifacts:[
  {k:'pb',ic:'📚',ar:['قائمة المنتج','مرتّبة · لا تنتهي أبداً · يملكها مالك المنتج'],
          en:['Product Backlog','Ordered · never final · owned by the product owner']},
  {k:'sb',ic:'📝',ar:['قائمة السبرنت','خطة الفريق لهذا السبرنت · يملكها المطوّرون'],
          en:['Sprint Backlog','The team\u2019s plan for this sprint · owned by the developers']},
  {k:'inc',ic:'📦',ar:['الزيادة','يجب أن تستوفي تعريف الإنجاز · قابلة للإطلاق'],
           en:['Increment','Must meet the definition of done · potentially releasable']}
 ],
 /* قائمة أعمال تجريبية للوحة */
 seed(ar){
  const S=[
   [8,ar?'كمستخدم أريد صورة جوية موحّدة لأتخذ القرار بسرعة':'As an operator I want a consolidated air picture'],
   [5,ar?'كمشغّل أريد ربط المسارات عبر مستشعرين':'As an operator I want track correlation across two sensors'],
   [13,ar?'كقائد أريد ترتيب التهديدات بقواعد قابلة للتعديل':'As a commander I want rule-based threat prioritisation'],
   [3,ar?'كمشغّل أريد تجاوز التصنيف الآلي يدوياً':'As an operator I want to override an auto classification'],
   [8,ar?'كقائد أريد توصية اشتباك مع تعليلها':'As a commander I want an engagement recommendation with rationale'],
   [5,ar?'كمشرف أريد سجلّ تدقيق لكل قرار':'As a supervisor I want an audit trail for every decision'],
   [2,ar?'كمشغّل أريد تنبيهاً صوتياً عند فقد مسار':'As an operator I want an audio alert on track loss'],
   [13,ar?'كمهندس أريد محاكياً للاختبار دون المنظومة الحيّة':'As an engineer I want a simulator to test without the live system']
  ];
  return S.map((s,i)=>({id:'S'+(i+1),pts:s[0],t:s[1],col:'pb'}));
 }
};

/* ═══════════ ③ كانبان ═══════════ */
window.KANBAN = {
 cols:[
  {k:'todo', ar:'قيد الانتظار', en:'To Do', wip:0},
  {k:'dev',  ar:'قيد التطوير', en:'In Development', wip:3},
  {k:'test', ar:'قيد الاختبار', en:'In Testing', wip:2},
  {k:'done', ar:'منجز', en:'Done', wip:0}
 ],
 seed(ar){
  const T=[
   ['K1',ar?'واجهة الصورة الجوية':'Air picture UI','dev'],
   ['K2',ar?'ربط المسارات':'Track correlation','dev'],
   ['K3',ar?'قواعد الترتيب':'Prioritisation rules','test'],
   ['K4',ar?'التجاوز اليدوي':'Manual override','test'],
   ['K5',ar?'سجلّ التدقيق':'Audit trail','test'],
   ['K6',ar?'التنبيه الصوتي':'Audio alert','todo'],
   ['K7',ar?'المحاكي':'Simulator','todo'],
   ['K8',ar?'تقرير الأداء':'Performance report','todo'],
   ['K9',ar?'تكامل المستشعر الثاني':'Second sensor integration','done'],
   ['K10',ar?'شاشة الإعدادات':'Settings screen','done']
  ];
  return T.map(x=>({id:x[0],t:x[1],col:x[2]}));
 },
 /* تشخيص اللوحة */
 diagnose(cards, ar){
  const K=window.KANBAN;
  const out=[];
  K.cols.forEach(c=>{
   if(!c.wip) return;
   const n=cards.filter(x=>x.col===c.k).length;
   if(n>c.wip) out.push({lv:'bad', c:c.k,
     t:ar?`تجاوز حدّ العمل الجاري في «${c.ar}» — ${n} بينما الحدّ ${c.wip}.`
        :`WIP limit breached in "${c.en}" — ${n} against a limit of ${c.wip}.`});
  });
  const test=cards.filter(x=>x.col==='test').length;
  const dev=cards.filter(x=>x.col==='dev').length;
  if(test>dev && test>=3) out.push({lv:'warn', c:'test',
    t:ar?'الاختبار عنق الزجاجة — التراكم فيه أكبر من التطوير. أوقف السحب من أعلى وعالج القيد.'
       :'Testing is the bottleneck — it holds more than development. Stop pulling from upstream and fix the constraint.'});
  if(!out.length) out.push({lv:'ok', c:'',
    t:ar?'التدفّق سليم — كل الأعمدة داخل حدودها.'
       :'Flow is healthy — every column is within its limit.'});
  return out;
 }
};

/* ═══════════ ③ب نموذج سكروم الكامل ═══════════ */
window.SCRUMX = {
 /* الحالة الابتدائية */
 init(ar){
  return {
   team:{
    po:{n:ar?'أ. نورة العتيبي':'Noura Al-Otaibi', r:ar?'مالك المنتج':'Product Owner'},
    sm:{n:ar?'م. فيصل الحربي':'Faisal Al-Harbi', r:ar?'سكرم ماستر':'Scrum Master'},
    devs:[
     {n:ar?'م. عبدالله السالم':'Abdullah Al-Salem', s:ar?'تطوير':'Development', cap:10},
     {n:ar?'م. هند الزهراني':'Hind Al-Zahrani', s:ar?'تكامل':'Integration', cap:8},
     {n:ar?'م. طارق المطيري':'Tariq Al-Mutairi', s:ar?'اختبار':'Testing', cap:8},
     {n:ar?'م. لمى القرني':'Lama Al-Qarni', s:ar?'واجهات':'Front-end', cap:6}
    ]},
   dor:ar?['القيمة ومعايير القبول واضحة','التبعيات محدّدة','صغيرة بما يكفي لسبرنت واحد','قدّرها الفريق']
         :['Value and acceptance criteria are clear','Dependencies identified',
           'Small enough for one sprint','Estimated by the team'],
   dod:ar?['الكود مكتمل ومراجَع من نظير','مُختبَر بما فيه التكامل','الوثائق محدّثة','يستوفي كل معايير القبول']
         :['Code complete and peer reviewed','Tested including integration',
           'Documentation updated','Meets every acceptance criterion'],
   backlog:this.seedBacklog(ar),
   sprints:[],
   cur:null,
   len:14
  };
 },
 seedBacklog(ar){
  const S=[
   [8,'H',ar?'كمشغّل أريد صورة جوية موحّدة لاتخاذ القرار بسرعة':'As an operator I want a consolidated air picture'],
   [5,'H',ar?'كمشغّل أريد ربط المسارات عبر مستشعرين':'As an operator I want track correlation across two sensors'],
   [13,'M',ar?'كقائد أريد ترتيب التهديدات بقواعد قابلة للتعديل':'As a commander I want rule-based threat prioritisation'],
   [3,'H',ar?'كمشغّل أريد تجاوز التصنيف الآلي يدوياً':'As an operator I want to override an auto classification'],
   [8,'M',ar?'كقائد أريد توصية اشتباك مع تعليلها':'As a commander I want an engagement recommendation with rationale'],
   [5,'H',ar?'كمشرف أريد سجلّ تدقيق لكل قرار':'As a supervisor I want an audit trail for every decision'],
   [2,'L',ar?'كمشغّل أريد تنبيهاً صوتياً عند فقد مسار':'As an operator I want an audio alert on track loss'],
   [13,'M',ar?'كمهندس أريد محاكياً للاختبار دون المنظومة الحيّة':'As an engineer I want a simulator'],
   [5,'L',ar?'كمدير أريد تقرير أداء أسبوعياً':'As a manager I want a weekly performance report'],
   [8,'M',ar?'كمشغّل أريد إعادة تشغيل سيناريو سابق':'As an operator I want to replay a past scenario']
  ];
  return S.map((x,i)=>({id:'S'+(i+1),pts:x[0],pr:x[1],t:x[2],st:'todo',sp:null,
    ac:'', dor:false}));
 },
 capacity(m){ return (m.team.devs||[]).reduce((a,d)=>a+(+d.cap||0),0) },
 sprintPts(m,sid){ return m.backlog.filter(x=>x.sp===sid).reduce((a,b)=>a+b.pts,0) },
 donePts(m,sid){ return m.backlog.filter(x=>x.sp===sid&&x.st==='done').reduce((a,b)=>a+b.pts,0) },
 velocity(m){
  const done=m.sprints.filter(s=>s.closed);
  if(!done.length) return null;
  const v=done.map(s=>s.vel||0);
  return {avg:(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1),
          min:Math.min(...v), max:Math.max(...v), list:v};
 },
 /* تنبّؤ بالمدى من السرعة */
 forecast(m){
  const v=this.velocity(m); if(!v) return null;
  const rem=m.backlog.filter(x=>x.st!=='done').reduce((a,b)=>a+b.pts,0);
  if(!rem) return {rem:0};
  return {rem, opt:Math.ceil(rem/Math.max(1,v.max)), pes:Math.ceil(rem/Math.max(1,v.min)),
          lik:Math.ceil(rem/Math.max(1,+v.avg))};
 },
 /* تشخيص السبرنت الحالي */
 diagnose(m,ar){
  const out=[];
  if(!m.cur) return out;
  const sp=m.sprints.find(s=>s.id===m.cur); if(!sp) return out;
  const pts=this.sprintPts(m,sp.id), cap=this.capacity(m);
  if(pts>cap) out.push({lv:'bad',
    t:ar?`التزام السبرنت ${pts} نقطة والسعة ${cap} — الفريق يلتزم بما يستطيع لا بما يُطلب.`
       :`Sprint commitment is ${pts} points against a capacity of ${cap} — a team commits to what it can finish.`});
  if(!sp.goal||!sp.goal.trim()) out.push({lv:'warn',
    t:ar?'لا هدف للسبرنت — بلا هدف يصير السبرنت قائمة مهام لا التزاماً بقيمة.'
       :'No sprint goal — without one the sprint is a task list, not a commitment to value.'});
  const notReady=m.backlog.filter(x=>x.sp===sp.id&&!x.dor);
  if(notReady.length) out.push({lv:'warn',
    t:ar?`${notReady.length} قصة لم تستوفِ تعريف الجاهزية قبل دخولها السبرنت.`
       :`${notReady.length} stories entered the sprint without meeting the definition of ready.`});
  const big=m.backlog.filter(x=>x.sp===sp.id&&x.pts>=13);
  if(big.length) out.push({lv:'warn',
    t:ar?`${big.length} قصة بـ١٣ نقطة أو أكثر — جزّئها رأسياً قبل الالتزام بها.`
       :`${big.length} stories are 13 points or more — slice them vertically before committing.`});
  if(!out.length) out.push({lv:'ok',
    t:ar?'السبرنت سليم — داخل السعة وله هدف وقصصه جاهزة.'
       :'The sprint is sound — within capacity, with a goal, and its stories are ready.'});
  return out;
 }
};

/* ═══════════ ④ النهج المختلط ═══════════ */
window.HYBRID = {
 /* مجالات نطاق تجريبية */
 seed(ar){
  return [
   {k:'hull', ar:'الهيكل والبناء', en:'Hull and construction', ap:null,
    hint:['مواصفة مجمّدة · اعتماد تصنيف · كلفة تغيير عالية',
          'Frozen specification · class approval · high cost of change']},
   {k:'prop', ar:'منظومة الدفع', en:'Propulsion system', ap:null,
    hint:['مورّد خارجي · مواصفة مكتملة · عقد ثابت',
          'External supplier · complete specification · fixed contract']},
   {k:'cms', ar:'منظومة القتال', en:'Combat system', ap:null,
    hint:['خمس زيادات · متطلبات تتطوّر · تغذية راجعة لكل زيادة',
          'Five increments · evolving requirements · feedback per increment']},
   {k:'fit', ar:'التجهيز الداخلي', en:'Internal outfitting', ap:null,
    hint:['التمديدات تنبؤية · تجهيز المقصورات يُصقل مع المستخدمين',
          'Routing is predictive · compartment fit-out refined with users']},
   {k:'trials', ar:'التجارب والقبول', en:'Trials and acceptance', ap:null,
    hint:['بروتوكول محدّد · نقاط توقّف تعاقدية',
          'Defined protocol · contractual hold points']}
  ];
 },
 /* التحقّق من صحّة التوزيع */
 check(areas, ar){
  const ideal={hull:'predictive',prop:'predictive',cms:'agile',fit:'hybrid',trials:'predictive'};
  const out=[];
  areas.forEach(a=>{
   if(!a.ap) return;
   const ok=a.ap===ideal[a.k];
   out.push({k:a.k, ok,
     t:ok?(ar?'اختيار سليم':'Sound choice')
        :(ar?`الأنسب هنا ${window.APPROACH.label(ideal[a.k],true)} — ${a.hint[0]}`
           :`${window.APPROACH.label(ideal[a.k],false)} fits better — ${a.hint[1]}`)});
  });
  return out;
 },
 /* الملتقيات بين المسارات */
 seams(areas, ar){
  const done=areas.filter(a=>a.ap);
  const seams=[];
  for(let i=0;i<done.length;i++)
   for(let j=i+1;j<done.length;j++){
    const a=done[i], b=done[j];
    if(a.ap!==b.ap && (a.ap!=='hybrid'&&b.ap!=='hybrid'))
     seams.push({a:ar?a.ar:a.en, b:ar?b.ar:b.en,
       t:ar?'ملتقى — المسار الرشيق يجب أن يسلّم زيادة مستقرّة في موعد يفرضه المسار التنبؤي.'
          :'Seam — the adaptive stream must deliver a stable increment on a date the predictive stream fixes.'});
   }
  return seams.slice(0,4);
 }
};
