/* ============================================================
   ① عضو اللجنة المتحرّك  ② ميثاق المشروع الكامل
   ③ سجلّ أصحاب المصلحة ومصفوفة النفوذ والاهتمام
   ============================================================ */

/* ═══════════ ① أعضاء اللجنة ═══════════ */
window.PANEL = [
 {id:'chair', ar:['د. سارة القحطاني','رئيسة لجنة الاستثمار'],
  en:['Dr Sarah Al-Qahtani','Chair, Investment Board'],
  skin:'#e8c39e', hair:'#2b2118', hj:'f', suit:'#1a3a52', tie:'#70C0E0',
  voice:{pitch:1.25, rate:.95}},
 {id:'cfo', ar:['أ. خالد الدوسري','المدير المالي'],
  en:['Khalid Al-Dosari','Chief Financial Officer'],
  skin:'#d9a878', hair:'#1c1510', hj:'m', suit:'#243447', tie:'#40C090',
  voice:{pitch:.85, rate:.92}},
 {id:'ops', ar:['م. ريم الشهري','مديرة العمليات'],
  en:['Reem Al-Shehri','Director of Operations'],
  skin:'#efd0b0', hair:'#3a2a1c', hj:'f', suit:'#2d3e50', tie:'#F07000',
  voice:{pitch:1.15, rate:1.0}}
];
/* من يسأل أي سؤال */
window.PANEL_Q = {problem:'chair', nothing:'ops', money:'cfo', risk:'ops', align:'chair'};

/* رسم العضو — SVG متحرّك */
window.avatarSVG = function(m, speaking, blink){
  const mouthH = speaking ? 9 : 3;
  const mouthW = speaking ? 15 : 18;
  const eyeH = blink ? 1.2 : 5;
  const hair = m.hj==='f'
    ? `<path d="M46 44c0-19 14-30 34-30s34 11 34 30c0 8-2 14-4 18l-4-3c1-5 2-10 2-15
         0-15-12-24-28-24S52 29 52 44c0 5 1 10 2 15l-4 3c-2-4-4-10-4-18z" fill="${m.hair}"/>
       <path d="M44 44c-3 16-2 34 2 48 2 6 6 8 8 4 3-6 2-30 2-38l-12-14z" fill="${m.hair}"/>
       <path d="M116 44c3 16 2 34-2 48-2 6-6 8-8 4-3-6-2-30-2-38l12-14z" fill="${m.hair}"/>`
    : `<path d="M48 48c0-20 14-32 32-32s32 12 32 32c0 4-1 7-2 9l-5-4c0-14-10-23-25-23
         S55 39 55 53l-5 4c-1-2-2-5-2-9z" fill="${m.hair}"/>`;
  return `<svg viewBox="0 0 160 190" class="av-svg">
    <defs>
      <linearGradient id="bg${m.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1d4761"/><stop offset="100%" stop-color="#102d40"/>
      </linearGradient>
      <clipPath id="cl${m.id}"><rect width="160" height="190" rx="12"/></clipPath>
    </defs>
    <g clip-path="url(#cl${m.id})">
      <rect width="160" height="190" fill="url(#bg${m.id})"/>
      <circle cx="80" cy="46" r="52" fill="rgba(255,255,255,.045)"/>
      <!-- البدلة -->
      <path d="M22 190c0-30 16-44 34-50l24 14 24-14c18 6 34 20 34 50z" fill="${m.suit}"/>
      <path d="M56 140l24 14-10 36h-8z" fill="#fff" opacity=".92"/>
      <path d="M104 140l-24 14 10 36h8z" fill="#fff" opacity=".92"/>
      <path d="M80 154l-7 10 7 26 7-26z" fill="${m.tie}"/>
      <!-- الرقبة -->
      <path d="M66 112h28v22c0 8-28 8-28 0z" fill="${m.skin}" opacity=".92"/>
      <!-- الوجه -->
      <ellipse cx="80" cy="70" rx="30" ry="36" fill="${m.skin}"/>
      ${hair}
      <!-- العينان -->
      <ellipse cx="69" cy="66" rx="4" ry="${eyeH}" fill="#20140c"/>
      <ellipse cx="91" cy="66" rx="4" ry="${eyeH}" fill="#20140c"/>
      ${blink?'':`<circle cx="70.5" cy="64.5" r="1.4" fill="#fff" opacity=".85"/>
        <circle cx="92.5" cy="64.5" r="1.4" fill="#fff" opacity=".85"/>`}
      <!-- الحاجبان -->
      <path d="M62 57q7-4 14 0" stroke="${m.hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M84 57q7-4 14 0" stroke="${m.hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <!-- الأنف -->
      <path d="M80 70v9q0 3-3 3" stroke="rgba(0,0,0,.22)" stroke-width="1.8"
        fill="none" stroke-linecap="round"/>
      <!-- الفم -->
      <ellipse cx="80" cy="92" rx="${mouthW/2}" ry="${mouthH/2}"
        fill="${speaking?'#5a2a28':'#b4635e'}" style="transition:.08s"/>
      ${speaking?`<ellipse cx="80" cy="94" rx="5" ry="${mouthH/3}" fill="#7d3a37"/>`:''}
    </g></svg>`;
};

/* ═══════════ ② ميثاق المشروع الكامل ═══════════ */
window.CHARTER = {
 secs:[
 {k:'id', t:['١ · بيانات المشروع','1 · Project Identification'],
  f:[{k:'name',l:['اسم المشروع','Project name'],ty:'t'},
     {k:'code',l:['رمز المشروع','Project code'],ty:'t'},
     {k:'sponsor',l:['الراعي','Sponsor'],ty:'t'},
     {k:'pm',l:['مدير المشروع','Project manager'],ty:'t'},
     {k:'date',l:['تاريخ الإصدار','Issue date'],ty:'d'},
     {k:'ver',l:['الإصدار','Version'],ty:'t'}]},
 {k:'purpose', t:['٢ · الغرض والمبرّر','2 · Purpose and Justification'],
  f:[{k:'need',l:['حاجة العمل','Business need'],ty:'a',r:3},
     {k:'just',l:['المبرّر — لماذا هذا المشروع الآن؟','Justification — why this project now?'],ty:'a',r:3},
     {k:'link',l:['الارتباط بحالة العمل ودراسة الجدوى','Link to business case and feasibility study'],ty:'a',r:2}]},
 {k:'obj', t:['٣ · الأهداف ومعايير النجاح','3 · Objectives and Success Criteria'],
  f:[{k:'obj',l:['الأهداف القابلة للقياس — سطر لكل هدف','Measurable objectives — one per line'],ty:'a',r:5},
     {k:'succ',l:['معايير نجاح المشروع','Project success criteria'],ty:'a',r:3},
     {k:'exit',l:['معايير الخروج أو الإنهاء','Exit or termination criteria'],ty:'a',r:2}]},
 {k:'scope', t:['٤ · النطاق عالي المستوى','4 · High-Level Scope'],
  f:[{k:'in',l:['داخل النطاق','In scope'],ty:'a',r:4},
     {k:'out',l:['خارج النطاق','Out of scope'],ty:'a',r:3},
     {k:'req',l:['المتطلبات عالية المستوى','High-level requirements'],ty:'a',r:4},
     {k:'deliv',l:['المخرجات الرئيسة','Key deliverables'],ty:'a',r:3}]},
 {k:'time', t:['٥ · المعالم والجدول','5 · Milestones and Schedule'],
  f:[{k:'start',l:['تاريخ البدء المخطّط','Planned start'],ty:'d'},
     {k:'end',l:['تاريخ الإنجاز المخطّط','Planned finish'],ty:'d'},
     {k:'mile',l:['المعالم الرئيسة — سطر لكل معلم بتاريخه','Summary milestones — one per line with date'],ty:'a',r:5}]},
 {k:'money', t:['٦ · الميزانية والموارد','6 · Budget and Resources'],
  f:[{k:'budget',l:['الميزانية الأولية','Preliminary budget'],ty:'t'},
     {k:'cont',l:['احتياطي الطوارئ — داخل خط الأساس','Contingency reserve — within baseline'],ty:'t'},
     {k:'mgmt',l:['الاحتياطي الإداري — خارج خط الأساس','Management reserve — outside baseline'],ty:'t'},
     {k:'res',l:['الموارد المطلوبة عالية المستوى','High-level resource requirements'],ty:'a',r:3},
     {k:'fund',l:['مصدر التمويل وآلية الصرف','Funding source and disbursement'],ty:'a',r:2}]},
 {k:'risk', t:['٧ · المخاطر والافتراضات والقيود','7 · Risks, Assumptions and Constraints'],
  f:[{k:'risk',l:['المخاطر عالية المستوى','High-level risks'],ty:'a',r:4},
     {k:'assum',l:['الافتراضات','Assumptions'],ty:'a',r:3},
     {k:'const',l:['القيود','Constraints'],ty:'a',r:3},
     {k:'dep',l:['الاعتماديات الخارجية','External dependencies'],ty:'a',r:2}]},
 {k:'stake', t:['٨ · أصحاب المصلحة','8 · Stakeholders'],
  f:[{k:'key',l:['أصحاب المصلحة الرئيسون','Key stakeholders'],ty:'a',r:4},
     {k:'comm',l:['متطلبات التواصل الأولية','Initial communication requirements'],ty:'a',r:2}]},
 {k:'gov', t:['٩ · الحوكمة والصلاحيات','9 · Governance and Authority'],
  f:[{k:'auth',l:['صلاحيات مدير المشروع','Project manager authority'],ty:'a',r:3},
     {k:'thresh',l:['عتبة اعتماد التغيير','Change approval threshold'],ty:'t'},
     {k:'esc',l:['مسار التصعيد','Escalation path'],ty:'a',r:2},
     {k:'report',l:['دورية التقارير ومستقبلوها','Reporting cadence and recipients'],ty:'a',r:2},
     {k:'appr',l:['معايير الموافقة على المشروع','Project approval criteria'],ty:'a',r:3}]},
 {k:'sign', t:['١٠ · الاعتماد','10 · Approval'],
  f:[{k:'spname',l:['اسم الراعي وتوقيعه','Sponsor name and signature'],ty:'t'},
     {k:'spdate',l:['تاريخ الاعتماد','Approval date'],ty:'d'},
     {k:'pmname',l:['اسم مدير المشروع وقبوله','Project manager name and acceptance'],ty:'t'},
     {k:'others',l:['معتمدون آخرون','Other approvers'],ty:'a',r:2}]}
 ]
};

/* ═══════════ ③ سجلّ أصحاب المصلحة الكامل ═══════════ */
window.SREG = {
 cols:[
  {k:'name', l:['الاسم','Name'], ty:'t', w:'150px'},
  {k:'role', l:['الدور والمنصب','Role / position'], ty:'t', w:'150px'},
  {k:'org',  l:['الجهة','Organization'], ty:'t', w:'120px'},
  {k:'type', l:['النوع','Type'], ty:'s', w:'100px',
   o:[['int','داخلي','Internal'],['ext','خارجي','External'],['reg','جهة رقابية','Regulator']]},
  {k:'power', l:['النفوذ','Power'], ty:'s', w:'90px',
   o:[['high','عالٍ','High'],['med','متوسط','Medium'],['low','منخفض','Low']]},
  {k:'interest', l:['الاهتمام','Interest'], ty:'s', w:'90px',
   o:[['high','عالٍ','High'],['med','متوسط','Medium'],['low','منخفض','Low']]},
  {k:'att', l:['الموقف الحالي','Current attitude'], ty:'s', w:'110px',
   o:[['champ','داعم قوي','Champion'],['sup','داعم','Supportive'],
      ['neut','محايد','Neutral'],['res','متحفّظ','Resistant'],['unaw','غير مُطّلع','Unaware']]},
  {k:'want', l:['الموقف المطلوب','Desired attitude'], ty:'s', w:'110px',
   o:[['champ','داعم قوي','Champion'],['sup','داعم','Supportive'],
      ['neut','محايد','Neutral'],['unaw','غير مُطّلع','Unaware']]},
  {k:'need', l:['توقّعاته ومتطلباته','Expectations and requirements'], ty:'a', w:'200px'},
  {k:'infl', l:['تأثيره على المشروع','Influence on the project'], ty:'a', w:'180px'},
  {k:'strat',l:['استراتيجية الإشراك','Engagement strategy'], ty:'a', w:'200px'},
  {k:'chan', l:['قناة التواصل والدورية','Channel and frequency'], ty:'t', w:'150px'},
  {k:'owner',l:['المسؤول عن العلاقة','Relationship owner'], ty:'t', w:'130px'}
 ],
 /* الاستراتيجية المقترحة من النفوذ والاهتمام */
 auto(p,i,lang){
  const M={
   'high|high':['أدِرْه عن قرب — إشراك مكثّف في القرارات ومواءمة مستمرة للتوقّعات',
                'Manage closely — intensive involvement in decisions and continuous expectation alignment'],
   'high|med' :['أبقِه راضياً — تقارير موجزة منتظمة واستشارة في القرارات الكبرى',
                'Keep satisfied — regular concise reports and consultation on major decisions'],
   'high|low' :['أبقِه راضياً — إبلاغ بالمعالم فقط دون إثقال بالتفاصيل',
                'Keep satisfied — inform at milestones only, without overloading with detail'],
   'med|high' :['أبقِه مُطّلعاً — تحديثات دورية وإشراك في القرارات التي تمسّه',
                'Keep informed — periodic updates and involvement in decisions that affect them'],
   'med|med'  :['راقبه بجهد معقول — تحديث دوري وتصعيد عند التغيّر',
                'Monitor with reasonable effort — periodic updates, escalate on change'],
   'med|low'  :['راقبه — إبلاغ عند الحاجة فقط',
                'Monitor — inform only when needed'],
   'low|high' :['أبقِه مُطّلعاً — نشرة دورية وقناة مفتوحة للاستفسار',
                'Keep informed — periodic bulletin and an open channel for questions'],
   'low|med'  :['راقبه — إبلاغ بالمعالم',
                'Monitor — inform at milestones'],
   'low|low'  :['راقبه بأقل جهد','Monitor with minimum effort']};
  const e=M[(p||'med')+'|'+(i||'med')]||M['med|med'];
  return lang==='ar'?e[0]:e[1];
 },
 /* أطراف FRIGATE BRAVO الجاهزة */
 seed(lang){
  const ar=lang==='ar';
  return [
  {name:ar?'العميل البحري':'Naval Customer', role:ar?'الجهة المتعاقدة':'Contracting authority',
   org:ar?'القوات البحرية':'Naval Forces', type:'ext', power:'high', interest:'high',
   att:'sup', want:'champ',
   need:ar?'قدرة قتالية معتمدة في الموعد · شفافية كاملة في الحالة'
          :'Certified combat capability on time · full status transparency',
   infl:ar?'سلطة القبول النهائي — رفضه يوقف الدفعة'
          :'Final acceptance authority — a rejection halts payment',
   chan:ar?'اجتماع شهري + تقرير أسبوعي':'Monthly meeting + weekly report',
   owner:ar?'مدير البرنامج':'Programme manager'},
  {name:ar?'جمعية التصنيف':'Classification Society', role:ar?'جهة الاعتماد الفني':'Technical certification body',
   org:ar?'جهة دولية':'International body', type:'reg', power:'high', interest:'high',
   att:'neut', want:'neut',
   need:ar?'امتثال كامل لقواعد التصنيف · حجز نقاط التوقّف مسبقاً'
          :'Full compliance with class rules · hold points booked in advance',
   infl:ar?'يحكم نقاط التوقّف — فقدها يؤجّل الدفعة ثمانية أسابيع'
          :'Controls hold points — losing them defers payment by eight weeks',
   chan:ar?'حجز رسمي قبل ٨ أسابيع':'Formal booking 8 weeks ahead',
   owner:ar?'مدير الجودة':'Quality manager'},
  {name:ar?'مجلس البرنامج':'Programme Board', role:ar?'سلطة القرار والتمويل':'Decision and funding authority',
   org:ar?'المجموعة':'The Group', type:'int', power:'high', interest:'med',
   att:'sup', want:'champ',
   need:ar?'بقاء المشروع داخل الميزانية · قرارات مبنيّة على خيارات'
          :'Project within budget · decisions presented as options',
   infl:ar?'يعتمد التغييرات فوق عشرة ملايين والاحتياطي الإداري'
          :'Approves changes above ten million and the management reserve',
   chan:ar?'اجتماع شهري + تقرير أداء':'Monthly meeting + performance report',
   owner:ar?'مدير البرنامج':'Programme manager'},
  {name:ar?'الحوض':'The Yard', role:ar?'المنفّذ':'Executing organization',
   org:ar?'الحوض المحلي':'Local shipyard', type:'int', power:'med', interest:'high',
   att:'champ', want:'champ',
   need:ar?'استمرارية التشغيل · بناء القدرة الصناعية':'Operational continuity · industrial capability build',
   infl:ar?'يملك خط الإنتاج والموارد المعتمدة':'Owns the production line and certified resources',
   chan:ar?'اجتماع أسبوعي للمسارات':'Weekly stream meeting',
   owner:ar?'مدير العمليات':'Operations director'},
  {name:ar?'شريك التصميم':'Design Partner', role:ar?'مالك ترخيص التصميم':'Design licence holder',
   org:ar?'شريك خارجي':'External partner', type:'ext', power:'med', interest:'med',
   att:'sup', want:'sup',
   need:ar?'حماية الملكية الفكرية · الالتزام بضوابط التصدير'
          :'IP protection · adherence to export controls',
   infl:ar?'قيود التصدير تحدّ ما يمكن مشاركته مع الفريق'
          :'Export controls limit what can be shared with the team',
   chan:ar?'تنسيق فني شهري':'Monthly technical coordination',
   owner:ar?'مدير الهندسة':'Engineering director'},
  {name:ar?'نقابة الحوض':'Yard Union', role:ar?'ممثّل العمالة':'Labour representative',
   org:ar?'الحوض':'The yard', type:'int', power:'med', interest:'high',
   att:'res', want:'neut',
   need:ar?'ضمان استمرار تأهيل اللحّامين · وضوح أثر الدمج'
          :'Continued welder qualification · clarity on merger impact',
   infl:ar?'يؤثّر على توافر مورد حرج على المسار الحرج'
          :'Affects availability of a critical resource on the critical path',
   chan:ar?'اجتماع شهري + إشراك في قرارات التأهيل':'Monthly meeting + involvement in qualification decisions',
   owner:ar?'مدير الموارد':'Resource manager'},
  {name:ar?'المورّدون الحرجون':'Critical Suppliers', role:ar?'الدفع ومنظومة القتال':'Propulsion and combat system',
   org:ar?'موردون خارجيون':'External suppliers', type:'ext', power:'med', interest:'high',
   att:'neut', want:'sup',
   need:ar?'وضوح المواصفات · استقرار الجدول · دفع في الموعد'
          :'Specification clarity · schedule stability · on-time payment',
   infl:ar?'تأخّرهم يؤثّر مباشرةً على المسار الحرج'
          :'Their delay directly affects the critical path',
   chan:ar?'مراجعة أداء شهرية':'Monthly performance review',
   owner:ar?'مدير المشتريات':'Procurement manager'},
  {name:ar?'فريق المشروع':'Project Team', role:ar?'المنفّذون المباشرون':'Direct executors',
   org:ar?'الحوض':'The yard', type:'int', power:'low', interest:'high',
   att:'sup', want:'champ',
   need:ar?'وضوح الأولويات · بيئة عمل آمنة · تطوير مهني'
          :'Priority clarity · safe working environment · professional development',
   infl:ar?'جودة التنفيذ ومعنويات الفريق تحدّد الأداء الفعلي'
          :'Execution quality and morale determine actual performance',
   chan:ar?'اجتماع يومي + استعادة دورية':'Daily stand-up + regular retrospective',
   owner:ar?'مسؤولو المسارات':'Stream leads'}
  ];
 }
};
