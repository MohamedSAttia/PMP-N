/* ============================================================
   ① طبقة الترجمة  ② المولّد التلقائي للأنشطة
   SOMU International Training Centre
   ============================================================ */

/* ═══════════ ① الترجمة ═══════════ */
window.I18 = {
 nav:{ home:['الرئيسة','Home'], content:['المحتوى اليومي','Daily Content'],
   acts:['الأنشطة والقوالب','Activities & Templates'], sim:['المحاكاة التطبيقية','Applied Simulation'],
   fb:['ملف FRIGATE BRAVO','FRIGATE BRAVO File'], exams:['الاختبارات','Examinations'],
   stats:['تقدّمي','My Progress'], life:['دورة الحياة','Lifecycle'], admin:['الإدارة','Admin'] },
 t:{
  /* الرئيسة */
  title:['Project Management Skills','Project Management Skills'],
  sub:['متوافق مع دليل PMBOK® الإصدار الثامن ونطاق الاختبار الساري من يوليو ٢٠٢٦، ومُطبَّق بالكامل على برنامج بناء سفن حربية.',
       'Aligned to the PMBOK® Guide — Eighth Edition and the PMP® Certification Exam Content Outline effective July 2026, applied throughout to naval shipbuilding programme delivery.'],
  days:['أيام','Days'], mods:['وحدة','Modules'], actsN:['نشاطاً','Activities'],
  simsN:['محاكاة','Simulations'], qsN:['سؤالاً','Questions'],
  fiveDays:['الأيام الخمسة','The Five Days'], startHere:['ابدأ من هنا','Start Here'],
  day:['اليوم','Day'], module:['وحدة','module'], activity:['نشاطاً','activities'],
  question:['سؤالاً','questions'], section:['قسماً','sections'],
  contentD:['{n} وحدة بالمفهوم والشرح والتطبيق على FRIGATE BRAVO ومثال محلول وقواعد عملية وأخطاء شائعة وتنبيهات الاختبار.',
            '{n} modules with key concept, explanation, FRIGATE BRAVO application, worked example, practical rules, common mistakes and exam watch.'],
  actsD:['{n} نشاطاً بمساحة عمل تُحفظ تلقائياً — من ميثاق المشروع إلى سجلّ المخاطر.',
         '{n} activities with an auto-saving workspace — from the project charter to the risk register.'],
  simD:['قرارات حقيقية بنتائج متسلسلة — كل قرار يفتح الذي بعده كما في البرنامج الفعلي.',
        'Real decisions with cascading consequences — each choice opens the next, as in the live programme.'],
  examD:['اختبار لكل يوم · اختبار لكل نطاق · محاكاتان كاملتان ١٨٠ سؤالاً بالاستراحات.',
         'One exam per day · one per domain · two full 180-question mocks with breaks.'],
  fbD:['البرنامج كاملاً: المعايير والتنظيم والمعالم والقيود وهيكل التجزئة والحالة عند الشهر ١٨.',
       'The full programme: parameters, organization, milestones, constraints, WBS and status at month 18.'],
  statsD:['منحنى الأداء وتحليل بمهام ECO وبنك أخطائك.',
          'Performance trend, ECO task analysis and your wrong-answer bank.'],
  saved:['محفوظ','saved'], attempts:['محاولة','attempts'],
  /* المحتوى */
  testThis:['🎯 اختبر هذه المادة','🎯 Test this material'],
  askAI:['🤖 اسأل المساعد','🤖 Ask the assistant'],
  noMods:['لا وحدات','No modules'], forThisDay:['لهذا اليوم.','for this day.'],
  /* الأنشطة */
  wbTitle:['ACTIVITY WORKBOOK','ACTIVITY WORKBOOK'],
  actsTitle:['الأنشطة والقوالب — اليوم {d}','Activities & Templates — Day {d}'],
  actsSub:['{n} نشاطاً · مساحة العمل تُحفظ تلقائياً في متصفّحك.',
           '{n} activities · your workspace auto-saves in this browser.'],
  showAll:['عرض الكل','Show all'], exportMine:['⬇ صدّر إجاباتي','⬇ Export my answers'],
  printA:['🖨 اطبع','🖨 Print'], complete:['✓ مكتمل','✓ Complete'],
  wsTitle:['🖊 مساحة العمل — أجب هنا','🖊 Workspace — answer here'],
  wsPh:['اكتب إجابتك أو قرار فريقك…','Write your answer or your table decision…'],
  save:['💾 احفظ','💾 Save'], gen:['✨ مسوّدة ذكية','✨ AI draft'],
  reviewMine:['🤖 راجع إجابتي','🤖 Review my answer'],
  savedS:['محفوظ','Saved'], notSaved:['غير محفوظ','Not saved'], saving:['يُحفظ…','Saving…'],
  /* المحاكاة */
  simTitle:['🎮 المحاكاة التطبيقية','🎮 Applied Simulation'],
  simSub:['قرارات حقيقية على FRIGATE BRAVO. كل قرار يُقيَّم ويفتح الذي بعده — كما يحدث في البرنامج الفعلي لا كأسئلة منفصلة.',
          'Real decisions on FRIGATE BRAVO. Each is assessed and opens the next — as in the live programme, not as isolated questions.'],
  decisions:['قرارات','decisions'], decision:['القرار','Decision'], of:['من','of'],
  rightD:['✅ قرار صحيح','✅ Correct decision'], wrongD:['❌ أعد النظر','❌ Reconsider'],
  nextD:['القرار التالي ◀','Next decision ▶'], finishSim:['أكمل المحاكاة ✓','Complete ✓'],
  exitS:['خروج','Exit'], retryS:['🔄 أعد المحاكاة','🔄 Retry'],
  allSims:['كل المحاكاات','All simulations'], summary:['خلاصة قراراتك','Your decisions'],
  youGot:['أصبت في','You answered'], correct:['صحيح','correct'], wrong:['خطأ','wrong'],
  /* الاختبارات */
  examsTitle:['🎯 الاختبارات','🎯 Examinations'],
  examsSub:['اختبار لكل يوم تدريبي · اختبار لكل نطاق · محاكاتان كاملتان بالبنية الحقيقية.',
            'One exam per training day · one per domain · two full mocks with the real structure.'],
  dayExams:['اختبارات الأيام','Day Exams'], domExams:['اختبارات النطاقات','Domain Exams'],
  fullMocks:['المحاكاة الكاملة','Full Mock Exams'],
  fullD:['١٨٠ سؤالاً في ٢٤٠ دقيقة بالبنية الحقيقية: استراحة ٥ دقائق بعد السؤال ١٠، واستراحة ١٠ دقائق بعد ٩٤.',
         '180 questions in 240 minutes with the real structure: a 5-minute break after question 10 and a 10-minute break after 94.'],
  official:['التوزيع الرسمي','Official weighting'], twoBreaks:['استراحتان','Two breaks'],
  pmiRep:['تقرير PMI','PMI-style report'], avail:['متاح','available'],
  min:['دقيقة','minutes'], incomplete:['اختبار غير مكتمل','Incomplete exam'],
  resume:['▶ تابع','▶ Resume'], remaining:['متبقٍّ','remaining'],
  wbankT:['بنك أخطائك — {n} سؤالاً','Your wrong-answer bank — {n} questions'],
  wbankD:['أسئلة أخطأت فيها. تتقنها فتخرج تلقائياً.',
          'Questions you got wrong. Master one and it leaves automatically.'],
  start:['ابدأ','Start'],
  /* الإرشادات */
  learner:['اسم المتدرب','Participant name'],
  learnerPh:['الاسم كما سيظهر في التقرير','Name as it will appear on the report'],
  brkNote:['استراحة ٥ دقائق بعد السؤال ١٠ · استراحة ١٠ دقائق بعد ٩٤',
           'A 5-minute break after question 10 · a 10-minute break after 94'],
  rules:['الأسئلة غير المُجابة تُحتسب خاطئة · لا انتقال قبل الإجابة · المؤقّت يتوقّف في الاستراحات فقط.',
         'Unanswered questions count as incorrect · no advance before answering · the timer pauses only during breaks.'],
  cancel:['إلغاء','Cancel'],
  /* الاختبار */
  qOf:['السؤال','Question'], timeLeft:['الوقت المتبقّي','Time remaining'],
  wbBtn:['سبورة','Whiteboard'], calcBtn:['حاسبة','Calculator'],
  aiBtn:['مساعد','Assistant'], checkBtn:['تحقّق','Check'], flagBtn:['علّم','Flag'],
  pickN:['اختر <b>{n}</b> إجابات.','Select <b>{n}</b> answers.'],
  submitEx:['إنهاء وتسليم','Finish & submit'], qList:['قائمة الأسئلة','Question list'],
  prev:['◀ السابق','◀ Previous'], next:['التالي ◀','Next ▶'],
  answered:['مُجاب','answered'], flagged:['معلَّم','flagged'],
  all:['الكل','All'], noAns:['بلا إجابة','Unanswered'],
  rightA:['إجابة صحيحة','Answered correctly'], wrongA:['إجابة خاطئة','Answered incorrectly'],
  correctIs:['الإجابة الصحيحة','Correct answer'],
  explan:['الشرح','Explanation'], perOpt:['تفصيل كل خيار','Details for each option'],
  reference:['المرجع','Reference'], isCorrect:['صحيحة','Correct'], isWrong:['خاطئة','Incorrect'],
  yourAns:['اخترتها','your answer'],
  vNoAns:['اختر إجابة قبل الانتقال.','Select an answer before moving on.'],
  vNeed:['هذا السؤال يتطلب اختيار {n} إجابات.','This question requires {n} answers.'],
  vPartial:['اخترت {f} من {n} — أكمل اختيارك.','You selected {f} of {n} — complete your selection.'],
  vOver:['اخترت {f} والمطلوب {n} — ألغِ اختياراً.','You selected {f} but only {n} are required.'],
  vMax:['المطلوب {n} إجابات فقط — ألغِ اختياراً.','Only {n} answers are required — deselect one.'],
  pickFirst:['اختر إجابة أولاً','Select an answer first'],
  unansConfirm:['لديك {n} سؤالاً بلا إجابة. تسليم الآن؟','You have {n} unanswered. Submit now?'],
  breakT:['استراحة','Break'],
  breakD:['المؤقّت الرئيس متوقّف. عُد قبل انتهاء الوقت أو تابع الآن.<br><b>لا رجوع لأسئلة القسم السابق.</b>',
          'The main timer is paused. Return before time runs out or continue now.<br><b>No return to the previous section.</b>'],
  resumeEx:['تابع الاختبار','Continue exam'],
  /* التقرير */
  reviewA:['📖 راجع الإجابات','📖 Review answers'], printR:['🖨 اطبع','🖨 Print'],
  newEx:['🔄 اختبار جديد','🔄 New exam'], homeB:['الرئيسة','Home'],
  sendWA:['📱 أرسل التقرير للمدرّب','📱 Send report to trainer'],
  reviewT:['مراجعة الإجابات','Answer Review'], showGrid:['▦ عرض كل الأسئلة','▦ Show all questions'],
  /* تقدّمي */
  progT:['📈 تقدّمي','📈 My Progress'],
  noAttempts:['لا محاولات بعد','No attempts yet'],
  willShow:['أكمل اختباراً ليبدأ التتبّع.','Complete an exam to start tracking.'],
  lastA:['آخر محاولة','Last attempt'], bestA:['الأفضل','Best'], avgA:['المتوسط','Average'],
  trend:['منحنى الأداء','Performance Trend'],
  byDayT:['أداؤك بالأيام التدريبية','Performance by Training Day'],
  retakeDay:['أعد اختبار اليوم','Retake day exam'],
  weakTasks:['أضعف مهام ECO','Weakest ECO Tasks'], task:['المهمة','Task'],
  attemptsT:['المحاولات','Attempts'], exportB:['⬇ تصدير','⬇ Export'],
  clearB:['🗑 مسح','🗑 Clear'],
  planT:['🗓 خطة الاجتياز اليومية','🗓 Daily Pass Plan'],
  planD:['خطة مبنيّة على أدائك الفعلي — تبدأ بأضعف أيامك.',
         'A plan built on your actual performance — starting with your weakest days.'],
  /* الإدارة */
  adminT:['⚙️ الإدارة','⚙️ Admin'],
  adminD:['عدّل الأسئلة والشروح — تنعكس فوراً على كل الاختبارات.',
          'Edit questions and explanations — reflected immediately across all exams.'],
  exportData:['📤 تصدير البيانات','📤 Export data'],
  exportDataD:['حمّل تعديلاتك وإجاباتك وسجلّك JSON.',
               'Download your edits, answers and history as JSON.'],
  qsB:['الأسئلة','Questions'], actAns:['إجابات الأنشطة','Activity answers'],
  histB:['السجلّ','History'], restore:['↺ استعادة','↺ Restore'],
  restoreD:['أعِد كل شيء إلى الحالة الأصلية.','Reset everything to its original state.'],
  clearAll:['امسح كل التعديلات','Clear all changes'],
  /* المساعد */
  aiT:['مساعد SOMU','SOMU Assistant'],
  aiN:['مدرّب افتراضي على محتوى هذا البرنامج و<b>FRIGATE BRAVO</b> — يوضّح المفهوم وطريقة التفكير.',
       'A virtual coach on this programme and <b>FRIGATE BRAVO</b> — explains the concept and the reasoning.'],
  aiPh:['اسألني عن أي مفهوم، أو عن كيفية تطبيقه على FRIGATE BRAVO.',
        'Ask me about any concept, or how it applies to FRIGATE BRAVO.'],
  aiIn:['اكتب سؤالك…','Type your question…'],
  /* عام */
  /* إضافات */
  fbIntro:['كل مثال محلول وكل نشاط وكل سؤال سيناريو في هذا البرنامج يعمل على هذا الملف. اقرأه مرة واحدة بعناية — ستعود إليه كل يوم.',
    'Every worked example, every activity and every scenario question in this programme runs on this file. Read it once carefully — you will return to it every day.'],
  askSim:['🤖 اسأل المساعد','🤖 Ask the assistant'],
  trainee:['المتدرب','Participant'],
  calcT:['🧮 الحاسبة','🧮 Calculator'], wbT:['🖊 السبورة','🖊 Whiteboard'],
  thin:['رفيع','Thin'], med:['متوسط','Medium'], thick:['عريض','Thick'],
  eraser:['ممحاة','Eraser'], clearW:['🗑 مسح','🗑 Clear'],
  pmpForm:['صيغ PMP','PMP Formulas'],
  deviation:['الانحراف','Std Dev'], channels:['قنوات','Channels'],
  inThisMock:['في هذه المحاكاة: أجبت <b>{r}</b> من <b>{n}</b> بشكل صحيح ({p}%) في {m} دقيقة.',
    'In this mock: you answered <b>{r}</b> of <b>{n}</b> correctly ({p}%) in {m} minutes.'],
  adminNote:['التعديلات تُحفظ في متصفّحك. <b>⬇ تصدير</b> لرفعها على الخادم وتعميمها.',
    'Changes are saved in this browser. Use <b>⬇ Export</b> to upload and share them.'],
  apiNote:['<b>للربط بقاعدة بياناتك</b>: استبدل <span class="iso">window.SOMU_DB</span> بنداءات API. الدوال الثلاث <span class="iso">get / set / del</span> معزولة في أعلى المحرك.',
    '<b>To connect your database</b>: replace <span class="iso">window.SOMU_DB</span> with API calls. The three functions <span class="iso">get / set / del</span> are isolated at the top of the engine.'],
  chEV:['القيمة المكتسبة','Earned Value'], chCP:['المسار الحرج','Critical Path'],
  chRisk:['المخاطر','Risk'], chConf:['النزاع','Conflict'], chTech:['تقنية الاختبار','Exam Technique'],
  savedTick:['✓ محفوظ','✓ Saved'],
  genConfirm:['سيُستبدل ما كتبته بمسوّدة مولّدة. متابعة؟',
    'Your current text will be replaced by a generated draft. Continue?'],
  dayExamT:['اختبار اليوم {d} — {n}','Day {d} Exam — {n}'],
  domExamT:['اختبار نطاق — {n}','Domain Exam — {n}'],
  fullExamT:['المحاكاة الكاملة {i}','Full Mock Exam {i}'],
  wrongExamT:['بنك أخطائك','Your Wrong-Answer Bank'],
  discardC:['تجاهل الاختبار غير المكتمل؟','Discard the incomplete exam?'],
  clearAllC:['مسح كل التعديلات والإجابات؟','Clear all changes and answers?'],
  clearHistC:['مسح السجلّ؟','Clear the history?'],
  checkWarn:['كشف الإجابة في المحاكاة الكاملة يخالف ظروف الاختبار الحقيقي.\n\nمتابعة؟',
    'Revealing the answer in a full mock contradicts real exam conditions.\n\nContinue?'],
  err:['خطأ','Error'],
  explainMod:['اشرح الوحدة','Explain module'],
  /* حماية */
  protectMsg:['محتوى محمي — النسخ والطباعة غير مسموحين',
    'Protected content — copying and printing are not permitted'],
  ssWarn:['لقطة الشاشة غير مسموحة أثناء الاختبار',
    'Screenshots are not permitted during the exam'],
  noQs:['لا أسئلة متاحة','No questions available'],
  noRes:['لا نتائج','No results'], credit:['تصميم وبرمجة د. محمد عطية','Designed & developed by Dr Mohamed Attia']
 },
 L:'ar',
 get(k,vars){ const e=this.t[k]; if(!e) return k;
   let s=e[this.L==='ar'?0:1]||e[0];
   if(vars) Object.keys(vars).forEach(v=>{s=s.split('{'+v+'}').join(vars[v])});
   return s; },
 nv(k){ const e=this.nav[k]; return e?(e[this.L==='ar'?0:1]||e[0]):k; },
 set(l){ this.L=l;
   document.documentElement.lang=l;
   document.documentElement.dir=l==='ar'?'rtl':'ltr';
   try{localStorage.setItem('somu_lang',l)}catch(e){} },
 init(){ try{const l=localStorage.getItem('somu_lang'); if(l)this.set(l)}catch(e){} }
};

/* ═══════════ ② المولّد التلقائي لمسوّدات الأنشطة ═══════════ */
window.GEN = (function(){
'use strict';
/* بيانات FRIGATE BRAVO المرجعية — يستند إليها المولّد */
const FBD = {
 prog:'برنامج FRIGATE BRAVO — فراقة قائدة + خيار تعاقدي لهيكلين تاليين، تصميم مرخّص من شريك خارجي.',
 progE:'Project FRIGATE BRAVO — one lead frigate plus a contracted option for two follow-on hulls, design licensed from an external partner.',
 stake:['العميل البحري — الجهة المتعاقدة ومالك القدرة النهائية',
   'جمعية التصنيف — تحكم نقاط التوقّف والشهادات',
   'الحوض (The Yard) — المنفّذ ومالك خط الإنتاج',
   'شريك التصميم — مالك ترخيص التصميم',
   'مجلس البرنامج — سلطة القرار والتمويل',
   'المورّدون الحرجون — حزمة الدفع ومنظومة القتال'],
 stakeE:['Naval customer — contracting authority and ultimate capability owner',
   'Classification society — controls hold points and certification',
   'The Yard — executing organization and production line owner',
   'Design partner — design licence holder',
   'Programme board — decision and funding authority',
   'Critical suppliers — propulsion package and combat system'],
 issues:['حزمة الدفع متأخرة ستة أسابيع عن تاريخ الحاجة',
   'زيادة منظومة القتال ٥ مرفوضة في القبول — الفريق يرى المعايير استُوفيت',
   'مساح التصنيف غير متاح لثلاث نقاط توقّف في الشهر ١٩',
   'لحّامان معتمدان استقالا · خط التأهيل ١١ أسبوعاً'],
 issuesE:['Propulsion package forecast six weeks late against need date',
   'Combat-system increment 5 rejected at acceptance — team believes criteria were met',
   'Class surveyor unavailable for three booked hold points in month 19',
   'Two certified welders resigned · qualification pipeline is eleven weeks'],
 ev:{BAC:840,PV:378,EV:336,AC:395,CPI:0.85,SPI:0.89,EAC:988,TCPI:1.13},
 net:'A(٤) → B(٩) → D(٧) → E(٣) · وA → C(٢) → D · المسار الحرج ٢٣ أسبوعاً · فائض C = ٧'
};

/* قوالب المسوّدات — مفتاحها كلمات في عنوان النشاط */
const T = [
 { m:/charter|ميثاق/i, ar:()=>
`**ميثاق مشروع FRIGATE BRAVO — مسوّدة**

**١) الغرض والمبرّر**
تسليم فراقة قائدة بقدرة قتالية معتمدة، مع خيار تعاقدي لهيكلين تاليين، ونقل قدرة صناعية محلية.

**٢) الأهداف القابلة للقياس**
• التسليم وفق المعالم التعاقدية بلا فقد نقاط توقّف
• شهادة جمعية التصنيف بلا تحفّظات جوهرية
• البقاء داخل الميزانية المعتمدة ٨٤٠ مليون
• تحقيق نسبة المحتوى المحلي المتعاقد عليها

**٣) المتطلبات عالية المستوى**
الامتثال لقواعد جمعية التصنيف · ضوابط التصدير على التصميم المرخّص ·
معايير قبول منظومة القتال · متطلبات السلامة والتأهيل للحام

**٤) المخاطر عالية المستوى**
تأخّر الموردين الحرجين · توافر مساح التصنيف · فقد اللحّامين المعتمدين ·
غموض معايير القبول · قيود ضوابط التصدير

**٥) المعالم الرئيسة**
قطع أول صفيحة · وضع العارضة · الإنزال · تشغيل المنظومات ·
التجارب البحرية · التسليم والقبول

**٦) الميزانية الأولية**
٨٤٠ مليون · احتياطي طوارئ داخل خط الأساس · احتياطي إداري خارجه

**٧) معايير الموافقة**
اجتياز نقاط التوقّف · شهادة التصنيف · قبول العميل الرسمي للقدرة

**٨) مدير المشروع وصلاحياته**
سلطة توجيه الموارد واعتماد التغييرات دون عتبة مجلس البرنامج، وتصعيد ما يتجاوزها.

⚠️ **راجعها وعدّلها** — هذه مسوّدة أساس لا إجابة نهائية.`,
   en:()=>
`**FRIGATE BRAVO Project Charter — Draft**

**1) Purpose and justification**
Deliver a lead frigate with certified combat capability, with a contracted option for two follow-on hulls, and transfer industrial capability locally.

**2) Measurable objectives**
• Delivery against contractual milestones with no hold points lost
• Classification society certification with no material qualifications
• Remain within the approved budget of 840 million
• Achieve the contracted local content percentage

**3) High-level requirements**
Compliance with classification society rules · export controls on the licensed design ·
combat-system acceptance criteria · safety and welder qualification requirements

**4) High-level risks**
Critical supplier delay · class surveyor availability · loss of certified welders ·
ambiguous acceptance criteria · export control constraints

**5) Key milestones**
First steel cut · keel laying · launch · systems commissioning ·
sea trials · delivery and acceptance

**6) Preliminary budget**
840 million · contingency reserve within the baseline · management reserve outside it

**7) Approval criteria**
Hold points passed · class certification issued · formal customer acceptance of capability

**8) Project manager and authority**
Authority to direct resources and approve changes below the programme board threshold, escalating above it.

⚠️ **Review and adapt** — this is a baseline draft, not a final answer.` },

 { m:/stakeholder|أصحاب المصلحة/i, ar:()=>
`**سجلّ أصحاب المصلحة وخطة الإشراك — مسوّدة**

| صاحب المصلحة | النفوذ | الاهتمام | الاستراتيجية |
|---|---|---|---|
${FBD.stake.map((s,i)=>{
  const nf=['عالٍ','عالٍ','عالٍ','متوسط','عالٍ','متوسط'][i];
  const ah=['عالٍ','عالٍ','عالٍ','متوسط','متوسط','عالٍ'][i];
  const st=nf==='عالٍ'&&ah==='عالٍ'?'أدِرْه عن قرب':nf==='عالٍ'?'أبقِه راضياً'
    :ah==='عالٍ'?'أبقِه مُطّلعاً':'راقبه';
  return `| ${s.split(' — ')[0]} | ${nf} | ${ah} | ${st} |`;}).join('\n')}

**أولويات الإشراك**
١) **جمعية التصنيف** — نفوذ حاكم على نقاط التوقّف. تواصل استباقي بجدول حجوزات مبكّر.
٢) **العميل البحري** — سلطة القبول. مواءمة معايير القبول **كتابةً** قبل كل زيادة.
٣) **المورّدون الحرجون** — مراجعة أداء منتظمة بخطط تصحيحية موثّقة.
٤) **شريك التصميم** — قيود ضوابط التصدير تحكم ما يمكن مشاركته.

**فجوة الإشراك الحالية**
معايير قبول منظومة القتال غامضة في معيارين من خمسة — أصل النزاع الحالي.

⚠️ **راجعها** وأضف أصحاب مصلحة من سياقك.`,
   en:()=>
`**Stakeholder Register and Engagement Plan — Draft**

| Stakeholder | Power | Interest | Strategy |
|---|---|---|---|
${FBD.stakeE.map((s,i)=>{
  const nf=['High','High','High','Medium','High','Medium'][i];
  const ah=['High','High','High','Medium','Medium','High'][i];
  const st=nf==='High'&&ah==='High'?'Manage closely':nf==='High'?'Keep satisfied'
    :ah==='High'?'Keep informed':'Monitor';
  return `| ${s.split(' — ')[0]} | ${nf} | ${ah} | ${st} |`;}).join('\n')}

**Engagement priorities**
1) **Classification society** — decisive power over hold points. Proactive contact with an early booking schedule.
2) **Naval customer** — acceptance authority. Align acceptance criteria **in writing** before each increment.
3) **Critical suppliers** — regular performance review with documented corrective plans.
4) **Design partner** — export control constraints govern what can be shared.

**Current engagement gap**
Combat-system acceptance criteria are ambiguous in two of five — the root of the present dispute.

⚠️ **Review** and add stakeholders from your own context.` },

 { m:/risk register|سجلّ المخاطر|risk/i, ar:()=>
`**سجلّ مخاطر FRIGATE BRAVO — مسوّدة**

| # | الخطر | الاحتمالية | الأثر | الدرجة | الاستجابة |
|---|---|---|---|---|---|
| ١ | تأخّر حزمة الدفع أكثر من التسامح التعاقدي | متوسطة | عالٍ | **عالية** | تخفيف — خطة تصحيحية + ضغط الجدول للأنشطة التالية |
| ٢ | فقد نقاط توقّف بسبب توافر المساح | عالية | عالٍ | **عالية جداً** | تخفيف — حجز مبكر + مساح بديل معتمد |
| ٣ | رفض زيادات منظومة القتال لغموض المعايير | عالية | متوسط | **عالية** | تخفيف — توضيح المعايير عبر ضبط التغيير |
| ٤ | نقص اللحّامين المعتمدين | متوسطة | عالٍ | **عالية** | تخفيف — تعاقد خارجي + تسريع خط التأهيل |
| ٥ | قيود ضوابط التصدير على التصميم | منخفضة | عالٍ جداً | **متوسطة** | نقل — شرط تعاقدي على شريك التصميم |
| ٦ | تجاوز التكلفة بمعدّل CPI الحالي ٠٫٨٥ | **محقّق** | عالٍ | **مشكلة** | إجراء تصحيحي — عرض خيارات على المجلس |

**ملاحظة مهنية**: البند ٦ **ليس خطراً** — تحقّق فعلاً فصار **مشكلة** تُدار بإجراء تصحيحي فوري.

**احتياطي الطوارئ المقترح**
EMV للمخاطر ١–٥ = مجموع (الاحتمالية × الأثر النقدي). احسبه من أرقام حزمك الفعلية.

⚠️ **أضف مخاطرك** وقدّر الأثر النقدي من جداول المشتريات.`,
   en:()=>
`**FRIGATE BRAVO Risk Register — Draft**

| # | Risk | Probability | Impact | Rating | Response |
|---|---|---|---|---|---|
| 1 | Propulsion delay exceeds contractual tolerance | Medium | High | **High** | Mitigate — corrective plan + schedule compression downstream |
| 2 | Hold points lost to surveyor availability | High | High | **Very High** | Mitigate — early booking + approved alternate surveyor |
| 3 | Combat-system increments rejected on ambiguous criteria | High | Medium | **High** | Mitigate — clarify criteria through change control |
| 4 | Shortage of certified welders | Medium | High | **High** | Mitigate — external contracting + accelerate qualification |
| 5 | Export control constraints on the design | Low | Very High | **Medium** | Transfer — contractual condition on the design partner |
| 6 | Cost overrun at current CPI of 0.85 | **Realized** | High | **ISSUE** | Corrective action — present options to the board |

**Professional note**: item 6 is **not a risk** — it has materialized and is therefore an **issue** managed by immediate corrective action.

**Proposed contingency reserve**
EMV for risks 1–5 = sum of (probability × monetary impact). Compute from your actual package figures.

⚠️ **Add your own risks** and estimate monetary impact from the procurement tables.` },

 { m:/earned value|القيمة المكتسبة|EV/i, ar:()=>
`**تحليل القيمة المكتسبة — الشهر ١٨**

**المعطيات**
BAC = ${FBD.ev.BAC} مليون · PV = ${FBD.ev.PV} · EV = ${FBD.ev.EV} · AC = ${FBD.ev.AC}

**الحساب**
• **CV** = EV − AC = ${FBD.ev.EV} − ${FBD.ev.AC} = **${FBD.ev.EV-FBD.ev.AC}** (سلبي ← تجاوز)
• **SV** = EV − PV = ${FBD.ev.EV} − ${FBD.ev.PV} = **${FBD.ev.EV-FBD.ev.PV}** (سلبي ← تأخّر)
• **CPI** = EV ÷ AC = **${FBD.ev.CPI}** — كل ريال يُنتج ٠٫٨٥ فقط
• **SPI** = EV ÷ PV = **${FBD.ev.SPI}** — تُنجز ٨٩٪ مما خُطّط
• **EAC** = BAC ÷ CPI = **${FBD.ev.EAC} مليون**
• **VAC** = BAC − EAC = **${FBD.ev.BAC-FBD.ev.EAC} مليون** (تجاوز متوقّع)
• **TCPI** = (BAC−EV) ÷ (BAC−AC) = **${FBD.ev.TCPI}**

**القراءة المهنية**
أداؤك ٠٫٨٥ والمطلوب للبقاء داخل الميزانية ١٫١٣ — فجوة **٣٣٪** غير واقعية عملياً.

**ما تعرضه على المجلس — ثلاثة خيارات**
١) **تمويل إضافي** ١٤٨ مليون — يحفظ النطاق والجدول
٢) **تقليص نطاق محدّد** — أي حزم يمكن تأجيلها لخيار الهيكلين التاليين؟
٣) **إعادة جدولة** — تمديد يخفض معدّل الإنفاق الشهري

⚠️ **أضف أثر كل خيار** على المعالم التعاقدية.`,
   en:()=>
`**Earned Value Analysis — Month 18**

**Data**
BAC = ${FBD.ev.BAC}m · PV = ${FBD.ev.PV} · EV = ${FBD.ev.EV} · AC = ${FBD.ev.AC}

**Calculation**
• **CV** = EV − AC = ${FBD.ev.EV} − ${FBD.ev.AC} = **${FBD.ev.EV-FBD.ev.AC}** (negative → over budget)
• **SV** = EV − PV = ${FBD.ev.EV} − ${FBD.ev.PV} = **${FBD.ev.EV-FBD.ev.PV}** (negative → behind)
• **CPI** = EV ÷ AC = **${FBD.ev.CPI}** — every unit returns only 0.85
• **SPI** = EV ÷ PV = **${FBD.ev.SPI}** — delivering 89% of plan
• **EAC** = BAC ÷ CPI = **${FBD.ev.EAC}m**
• **VAC** = BAC − EAC = **${FBD.ev.BAC-FBD.ev.EAC}m** (forecast overrun)
• **TCPI** = (BAC−EV) ÷ (BAC−AC) = **${FBD.ev.TCPI}**

**Professional reading**
You are performing at 0.85; staying inside budget requires 1.13 — a **33%** gap that is not realistically achievable.

**What you present to the board — three options**
1) **Additional funding** of 148m — preserves scope and schedule
2) **Targeted scope reduction** — which packages can defer to the follow-on hull option?
3) **Reschedule** — extension reduces the monthly burn rate

⚠️ **Add the impact of each option** on contractual milestones.` },

 { m:/network|critical path|المسار الحرج/i, ar:()=>
`**تحليل الشبكة والمسار الحرج — مسوّدة**

**الشبكة**: ${FBD.net}

**المسارات**
• A→B→D→E = ٤+٩+٧+٣ = **٢٣ أسبوعاً** ← **المسار الحرج**
• A→C→D→E = ٤+٢+٧+٣ = ١٦ أسبوعاً

**الفائض الزمني**
• A · B · D · E → **صفر** (على المسار الحرج)
• C → **٧ أسابيع**

**الضغط المطلوب: ثلاثة أسابيع**

| الأسلوب | الكلفة | المخاطر | الملاءمة هنا |
|---|---|---|---|
| **التسريع** Crashing | مرتفعة | منخفضة | ❌ CPI = ٠٫٨٥ لا يحتمل |
| **التتبّع السريع** Fast tracking | لا شيء | مرتفعة | ✅ الخيار المناسب |

**القرار**: توازٍ جزئي بين B وD.

**⚠️ الخطوة الحاسمة بعد الضغط**
أعد تحليل الشبكة — فائض C البالغ ٧ أسابيع قد يتقلّص فيصبح حرجاً.
وسجّل خطر إعادة العمل الناشئ عن التوازي.

⚠️ **أدخل مدد أنشطتك الفعلية** وأعد الحساب.`,
   en:()=>
`**Network and Critical Path Analysis — Draft**

**Network**: A(4) → B(9) → D(7) → E(3) · and A → C(2) → D

**Paths**
• A→B→D→E = 4+9+7+3 = **23 weeks** ← **critical path**
• A→C→D→E = 4+2+7+3 = 16 weeks

**Float**
• A · B · D · E → **zero** (on the critical path)
• C → **7 weeks**

**Compression required: three weeks**

| Technique | Cost | Risk | Fit here |
|---|---|---|---|
| **Crashing** | High | Low | ❌ CPI of 0.85 cannot absorb it |
| **Fast tracking** | None | High | ✅ the appropriate choice |

**Decision**: partial overlap between B and D.

**⚠️ The critical step after compression**
Re-analyse the network — C's seven weeks of float may shrink and become critical.
And log the rework risk created by the overlap.

⚠️ **Enter your actual durations** and recompute.` },

 { m:/contract|عقد|procurement|مشتريات/i, ar:()=>
`**اختيار نموذج العقد — مسوّدة**

| يقين النطاق | النموذج المناسب | من يحمل المخاطر | لماذا |
|---|---|---|---|
| **عالٍ** — مواصفة مكتملة | ثابت السعر FP | البائع | الحوض يشتري اليقين |
| **متوسط** — نطاق يتطوّر | ثابت بحوافز FPIF | مشترك | يوائم الحوافز |
| **منخفض** — تطوير أو أول مرة | قابل للسداد CPFF / CPIF | المشتري | البائع لا يستطيع التسعير |
| **قصير أو غير محدّد** | الوقت والمواد T&M | بينهما | مرونة مع سقف |

**التطبيق على FRIGATE BRAVO**
• **حزمة الدفع** — مواصفة مكتملة ومورّد معروف ← **ثابت السعر** مع بند تسامح واضح
  ⚠️ التسامح الحالي ثمانية أسابيع سمح بتأخير ستة بلا تعويض — **راجع هذا البند**
• **منظومة القتال** — زيادات متطوّرة ومعايير قبول غامضة ← **ثابت بحوافز** مع
  معايير قبول موثّقة لكل زيادة **قبل** بدئها
• **التأهيل والتدريب** — حجم غير محدّد ← **الوقت والمواد** بسقف

**الدرس من الوضع الحالي**
غموض معايير القبول في العقد هو أصل نزاع الزيادة ٥. النموذج التعاقدي لا يحمي
من صياغة معايير سيّئة.

⚠️ **راجع جدول حزم المشتريات** في ملف المشروع وطابق كل حزمة بنموذجها.`,
   en:()=>
`**Contract Model Selection — Draft**

| Scope certainty | Suitable model | Who carries risk | Why |
|---|---|---|---|
| **High** — complete specification | Firm Fixed Price FFP | Seller | The yard buys certainty |
| **Medium** — evolving scope | Fixed Price Incentive FPIF | Shared | Aligns incentives |
| **Low** — development or first-of-class | Cost reimbursable CPFF / CPIF | Buyer | The seller cannot price it |
| **Short or undefined** | Time & Materials T&M | Between | Flexibility with a ceiling |

**Application to FRIGATE BRAVO**
• **Propulsion package** — complete specification, known supplier ← **fixed price** with a clear tolerance clause
  ⚠️ The current eight-week tolerance permitted a six-week delay with no remedy — **revisit this clause**
• **Combat system** — evolving increments, ambiguous acceptance criteria ← **fixed price incentive** with documented acceptance criteria per increment **before** it starts
• **Qualification and training** — undefined volume ← **T&M** with a ceiling

**The lesson from the current position**
Ambiguous acceptance criteria in the contract are the root of the increment 5 dispute. The contract model does not protect against poorly drafted criteria.

⚠️ **Review the procurement package table** in the programme file and match each package to its model.` },

 { m:/WBS|decompose|تجزئة|النطاق/i, ar:()=>
`**تجزئة النطاق — مسوّدة**

**المستوى ١** — FRIGATE BRAVO
**المستوى ٢**
١٫٠ الهيكل والبناء
٢٫٠ منظومة الدفع
٣٫٠ منظومة القتال
٤٫٠ التجهيز والأنظمة المساعدة
٥٫٠ التجارب والقبول
٦٫٠ إدارة البرنامج والامتثال

**المستوى ٣ — مثال على ٣٫٠ منظومة القتال**
٣٫١ الزيادة ١ — الرادار والاستشعار
٣٫٢ الزيادة ٢ — إدارة المعركة
٣٫٣ الزيادة ٣ — التكامل مع الأسلحة
٣٫٤ الزيادة ٤ — الحرب الإلكترونية
٣٫٥ الزيادة ٥ — التكامل النهائي ← **المرفوضة حالياً**

**قواعد التجزئة المطبَّقة**
• **قاعدة ١٠٠٪** — المجموع = كل النطاق لا أكثر ولا أقل
• **حزمة العمل** = أدنى مستوى قابل للتقدير والإسناد والمراقبة
• كل حزمة لها **معايير قبول موثّقة** ← وهذا ما نقص في الزيادة ٥

**الملاحظة المهنية**
منظومة القتال تُدار بأسلوب **رشيق/تدريجي** بينما الهيكل **تتابعي** —
وهذا بالضبط ما يجعل البرنامج **هجيناً**، ولا يعني اختلاف هيكل التجزئة.

⚠️ **فصّل حزمة عمل واحدة** حتى المستوى ٤ بمعايير قبولها.`,
   en:()=>
`**Scope Decomposition — Draft**

**Level 1** — FRIGATE BRAVO
**Level 2**
1.0 Hull and construction
2.0 Propulsion system
3.0 Combat system
4.0 Outfitting and auxiliary systems
5.0 Trials and acceptance
6.0 Programme management and compliance

**Level 3 — example for 3.0 Combat system**
3.1 Increment 1 — radar and sensors
3.2 Increment 2 — battle management
3.3 Increment 3 — weapons integration
3.4 Increment 4 — electronic warfare
3.5 Increment 5 — final integration ← **currently rejected**

**Decomposition rules applied**
• **100% rule** — the sum equals all the scope, no more and no less
• A **work package** is the lowest level that can be estimated, assigned and controlled
• Every package has **documented acceptance criteria** ← precisely what increment 5 lacked

**Professional note**
The combat system is managed **adaptively/incrementally** while the hull is **predictive** — which is exactly what makes the programme **hybrid**. It does not mean a different WBS structure.

⚠️ **Decompose one work package** to level 4 with its acceptance criteria.` },

 { m:/RACI/i, ar:()=>
`**مصفوفة RACI — مسوّدة**

| النشاط | مدير البرنامج | مجلس البرنامج | جمعية التصنيف | العميل البحري | المورّد |
|---|---|---|---|---|---|
| اعتماد ميثاق البرنامج | R | **A** | I | C | — |
| اعتماد تغيير داخل العتبة | **A/R** | I | I | C | I |
| اعتماد تغيير فوق العتبة | R | **A** | I | C | I |
| اجتياز نقطة توقّف | R | I | **A** | I | C |
| قبول زيادة منظومة القتال | R | I | C | **A** | C |
| تسليم حزمة الدفع | C | I | C | I | **A/R** |
| إصدار شهادة التصنيف | C | I | **A/R** | I | — |

**قواعد التحقّق**
• **A واحد فقط** لكل صف — السلطة لا تُشارك
• كل صف فيه **R** واحد على الأقل
• قلّل **C** — كثرتها تُبطئ القرار
• **I** للإبلاغ لا للاستشارة

**الملاحظة المهنية على FRIGATE BRAVO**
تجاوز أحد الأعضاء للتصعيد وصولاً للرئيس التنفيذي عَرَض لغياب **A** واضح
في صفوف القرار — أصلحه بالمصفوفة لا بالتأديب.

⚠️ **أضف أنشطتك** وتحقّق من قاعدة A الواحد.`,
   en:()=>
`**RACI Matrix — Draft**

| Activity | Programme Manager | Programme Board | Class Society | Naval Customer | Supplier |
|---|---|---|---|---|---|
| Approve programme charter | R | **A** | I | C | — |
| Approve change within threshold | **A/R** | I | I | C | I |
| Approve change above threshold | R | **A** | I | C | I |
| Pass a hold point | R | I | **A** | I | C |
| Accept combat-system increment | R | I | C | **A** | C |
| Deliver propulsion package | C | I | C | I | **A/R** |
| Issue class certificate | C | I | **A/R** | I | — |

**Validation rules**
• **Exactly one A** per row — accountability is not shared
• Every row has at least one **R**
• Minimize **C** — too many slows decisions
• **I** is informed, not consulted

**Professional note on FRIGATE BRAVO**
A team member bypassing escalation to the CEO is a symptom of an unclear **A** in the decision rows — fix it with the matrix, not with discipline.

⚠️ **Add your activities** and verify the single-A rule.` },

 { m:/team charter|ميثاق الفريق/i, ar:()=>
`**ميثاق الفريق — مسوّدة**

**١) قيمنا في العمل**
الصراحة المهنية · الالتزام بالمواعيد · الدليل قبل الرأي · احترام الاختصاص

**٢) قواعد الاجتماعات**
• الاجتماع اليومي ١٥ دقيقة بلا استثناء
• من يتأخّر يطّلع على الملخّص لا يُعاد الشرح له
• لا هواتف في نقاط القرار

**٣) اتخاذ القرار**
• قرارات فنية داخل التخصّص ← مسؤول المسار
• قرارات بين المسارات ← توافق، وإن تعذّر فمدير البرنامج
• ما يتجاوز العتبة ← مجلس البرنامج

**٤) التواصل**
• العاجل ← اتصال مباشر
• المهم غير العاجل ← البريد بسقف ٢٤ ساعة للرد
• القرارات ← **توثَّق في مكان واحد** متاح للجميع

**٥) حل النزاع**
نواجه المشكلة لا الشخص · نطرح الدليل · نصعّد بعد محاولتين موثّقتين

**٦) قواعد الجودة**
لا تسليم بلا مراجعة نظير · معايير القبول **مكتوبة قبل** بدء العمل

⚠️ **ليضعه الفريق بنفسه** — الميثاق المفروض لا يُلتزم به.`,
   en:()=>
`**Team Charter — Draft**

**1) Our working values**
Professional candour · timeliness · evidence before opinion · respect for expertise

**2) Meeting ground rules**
• The daily stand-up is 15 minutes, no exceptions
• Late arrivals read the summary; nothing is repeated
• No phones at decision points

**3) Decision making**
• Technical decisions within a discipline ← stream lead
• Cross-stream decisions ← consensus, and failing that the programme manager
• Above threshold ← programme board

**4) Communication**
• Urgent ← direct call
• Important but not urgent ← email with a 24-hour response ceiling
• Decisions ← **documented in a single place** accessible to all

**5) Conflict resolution**
We confront the problem, not the person · we present evidence · we escalate after two documented attempts

**6) Quality ground rules**
No delivery without peer review · acceptance criteria **written before** work starts

⚠️ **The team must write this itself** — an imposed charter is not honoured.` },

 { m:/compliance|امتثال/i, ar:()=>
`**سجلّ الامتثال — مسوّدة**

| الفئة | المتطلب | المصدر | التحقّق | الحالة |
|---|---|---|---|---|
| **تنظيمي** | قواعد جمعية التصنيف | جمعية التصنيف | نقاط توقّف + مساح | ⚠️ ٣ نقاط معرّضة |
| **تنظيمي** | ضوابط التصدير على التصميم | سلطة التصدير | تصريح لكل مشاركة | ✅ سارٍ |
| **سلامة** | تأهيل اللحّامين | معيار وطني | شهادة سارية لكل لحّام | ⚠️ لحّامان استقالا |
| **سلامة** | الصحة والسلامة في الحوض | نظام العمل | تدقيق دوري | ✅ ٨٤٪ |
| **استدامة** | إدارة النفايات الصناعية | لائحة بيئية | تقرير ربعي | ✅ |
| **تعاقدي** | نسبة المحتوى المحلي | العقد | تقرير مع كل دفعة | 🔵 يُقاس |

**تصنيف الفئات — كما ينصّ ECO**
الأمن · الصحة والسلامة · الاستدامة · الامتثال التنظيمي

**تهديدات الامتثال المحدّدة**
١) فقد نقاط توقّف ← تأجيل الشهادة والدفعة
٢) نقص اللحّامين المعتمدين ← وقف عمل معتمد
٣) تغيّر لائحة بعد اعتماد خط الأساس ← يستوجب طلب تغيير

**عواقب عدم الامتثال**
غرامات · تأجيل الدفعات · سحب الشهادة · إضرار بالسمعة · إيقاف تعاقدي

**الملاحظة المهنية**
الامتثال في السلامة **ليس نسبة مقبولة** — ٨٤٪ يعني ١٦٪ فجوة تُحلَّل **بالخطورة**
لا بالعدد. بند حرج واحد يكفي لحادث.

⚠️ **أضف متطلباتك** وصنّف الفجوة بالخطورة.`,
   en:()=>
`**Compliance Register — Draft**

| Category | Requirement | Source | Verification | Status |
|---|---|---|---|---|
| **Regulatory** | Classification society rules | Class society | Hold points + surveyor | ⚠️ 3 points at risk |
| **Regulatory** | Export controls on the design | Export authority | Licence per disclosure | ✅ Current |
| **Safety** | Welder qualification | National standard | Valid certificate per welder | ⚠️ Two resigned |
| **Safety** | Yard health and safety | Labour law | Periodic audit | ✅ 84% |
| **Sustainability** | Industrial waste management | Environmental regulation | Quarterly report | ✅ |
| **Contractual** | Local content percentage | Contract | Report with each payment | 🔵 Being measured |

**Category classification — as the ECO states**
Security · health and safety · sustainability · regulatory compliance

**Identified compliance threats**
1) Hold points lost ← certification and payment deferred
2) Shortage of certified welders ← certified work stops
3) Regulation changing after baseline approval ← requires a change request

**Consequences of non-compliance**
Fines · deferred payments · certificate withdrawal · reputational damage · contractual suspension

**Professional note**
Safety compliance is **not a percentage to accept** — 84% means a 16% gap analysed **by severity**, not by count. One critical item is enough for an incident.

⚠️ **Add your requirements** and classify the gap by severity.` },

 { m:/closure|إغلاق/i, ar:()=>
`**قائمة تحقّق الإغلاق — مسوّدة**

**١) قبول المخرجات**
☐ كل المخرجات مُسلَّمة ومقبولة **رسمياً كتابةً**
☐ نقاط التوقّف كلها مُجتازة
☐ شهادة جمعية التصنيف صادرة بلا تحفّظات جوهرية
☐ التجارب البحرية مكتملة ونتائجها مقبولة

**٢) التسوية التعاقدية والمالية**
☐ كل العقود مُغلقة أو منقولة
☐ المطالبات المفتوحة مُسوّاة أو موثّقة
☐ التسوية المالية النهائية · الاحتياطيات مُفرَجة
☐ ضمانات ما بعد التسليم مُوثّقة وسارية

**٣) جاهزية الانتقال**
☐ فريق التشغيل مُدرَّب ومُعتمد
☐ وثائق التشغيل والصيانة مُسلَّمة
☐ قطع الغيار وترتيبات الدعم قائمة
☐ **نقل المعرفة الضمنية** موثّق — لماذا رُفضت البدائل لا كيف عمل المختار

**٤) الدروس والأصول**
☐ جلسة دروس مستفادة **قبل تفرّق الفريق**
☐ أصول العمليات التنظيمية مُحدَّثة
☐ سجلّات الأداء مؤرشفة

**٥) الموارد**
☐ الفريق مُسرَّح رسمياً
☐ التقييمات مُنجَزة
☐ المرافق والمعدّات مُعادة

**الملاحظة المهنية**
قبول المخرجات شرط **لازم لا كافٍ**. طلب الراعي إغلاقاً سريعاً لتحرير الميزانية
لا يُعفي من التسوية التعاقدية والدروس — الحلّ إبلاغه بالمتطلب واقتراح **جدول مضغوط**
لا الرفض ولا التجاوز.

⚠️ **أضف بنودك** من سياق برنامجك.`,
   en:()=>
`**Closure Checklist — Draft**

**1) Deliverable acceptance**
☐ All deliverables handed over and accepted **formally in writing**
☐ All hold points passed
☐ Class certificate issued with no material qualifications
☐ Sea trials complete and results accepted

**2) Contractual and financial settlement**
☐ All contracts closed or novated
☐ Open claims settled or documented
☐ Final financial settlement · reserves released
☐ Post-delivery warranties documented and in force

**3) Transition readiness**
☐ Operations team trained and certified
☐ Operations and maintenance documentation handed over
☐ Spares and support arrangements in place
☐ **Tacit knowledge transfer** documented — why alternatives were rejected, not only how the chosen one works

**4) Lessons and assets**
☐ Lessons-learned session **before the team disperses**
☐ Organizational process assets updated
☐ Performance records archived

**5) Resources**
☐ Team formally released
☐ Appraisals completed
☐ Facilities and equipment returned

**Professional note**
Deliverable acceptance is **necessary but not sufficient**. A sponsor asking for rapid closure to release budget does not remove the need for contractual settlement and lessons — the answer is to inform them of the requirement and propose a **compressed schedule**, not to refuse and not to skip.

⚠️ **Add your items** from your programme context.` }
];

/* مسوّدة عامة عندما لا يطابق قالب */
function generic(title,lang){
  if(lang==='en') return `**${title} — Draft framework**

**1) What this activity asks**
Restate the requirement in one sentence before you start. If you cannot, reread the scenario.

**2) The data you have on FRIGATE BRAVO**
${FBD.progE}

Open issues at month 18:
${FBD.issuesE.map((x,i)=>`${i+1}) ${x}`).join('\n')}

**3) Structure your answer**
• **Situation** — what is actually happening, distinguishing symptom from cause
• **Analysis** — what the data says, with numbers where available
• **Options** — at least two, with the impact of each
• **Recommendation** — one option, and why you chose it over the others
• **Governance** — who decides, and whether this needs change control

**4) Watch for**
• Escalating before analysing — PMI treats escalation as a last resort
• Changing scope without change control
• Confusing a risk (potential) with an issue (realized)
• Deciding without evidence

⚠️ This is a thinking framework, not an answer. Fill it with your table's reasoning.`;
  return `**${title} — إطار مسوّدة**

**١) ما يطلبه هذا النشاط**
أعِد صياغة المطلوب في جملة واحدة قبل أن تبدأ. إن لم تستطع فأعد قراءة السيناريو.

**٢) بياناتك على FRIGATE BRAVO**
${FBD.prog}

المشكلات المفتوحة عند الشهر ١٨:
${FBD.issues.map((x,i)=>`${i+1}) ${x}`).join('\n')}

**٣) ابنِ إجابتك على هذا الهيكل**
• **الموقف** — ما يحدث فعلاً، مع تمييز العَرَض عن السبب
• **التحليل** — ما تقوله البيانات، بالأرقام حيث توفّرت
• **الخيارات** — اثنان على الأقل، بأثر كل منهما
• **التوصية** — خيار واحد، ولماذا اخترته على غيره
• **الحوكمة** — من يقرّر، وهل يحتاج الأمر ضبط تغيير

**٤) احذر من**
• التصعيد قبل التحليل — PMI يعدّ التصعيد آخر خيار
• تغيير النطاق بلا ضبط تغيير
• الخلط بين الخطر (محتمل) والمشكلة (متحقّقة)
• القرار بلا دليل

⚠️ هذا إطار تفكير لا إجابة. املأه بتحليل فريقك.`;
}

return {
  make(title,lang){
    const t=T.find(x=>x.m.test(title||''));
    if(t) return (lang==='en'?t.en:t.ar)();
    return generic(title||'النشاط',lang);
  },
  has(title){ return !!T.find(x=>x.m.test(title||'')) }
};
})();
