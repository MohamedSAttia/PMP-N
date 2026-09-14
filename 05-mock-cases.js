/* ============================================================
   حالات المحاكاة الكاملة — FRIGATE BRAVO
   ٤ حالات × ٥ أسئلة = ٢٠ سؤال سيناريو
   كل محاكاة كاملة تأخذ حالتين = ١٠ أسئلة في المقدّمة
   ============================================================ */
window.CASES = [
{
 id:'CA', ax:'1.4', d:'R',
 t:['الحوكمة والقرار عند الشهر ١٨','Governance and Decision at Month 18'],
 body:{ar:`**مشروع FRIGATE BRAVO — الشهر ١٨ من ٣٦**

برنامج بناء سفن حربية: فراقة قائدة مع خيار تعاقدي لهيكلين تاليين. التصميم مرخّص من شريك خارجي، والتنفيذ في حوض محلي ضمن برنامج نقل قدرة صناعية.

**الميزانية والأداء**
الميزانية عند الإنجاز ٨٤٠ مليون. عند الشهر ١٨: القيمة المخطّطة ٣٧٨ · القيمة المكتسبة ٣٣٦ · التكلفة الفعلية ٣٩٥.

**التنظيم والحوكمة**
مجلس البرنامج يجتمع شهرياً ويعتمد التغييرات فوق عتبة عشرة ملايين. مدير البرنامج يعتمد ما دونها. جمعية التصنيف تحكم نقاط التوقّف وتُصدر الشهادة. العميل البحري صاحب سلطة القبول النهائي.

**أربع مشكلات مفتوحة في وقت واحد**
١) حزمة الدفع متأخرة **ستة أسابيع** عن تاريخ الحاجة. العقد ثابت السعر بتسامح **ثمانية أسابيع**، فلا يُفعَّل بند التعويض. التركيب على المسار الحرج.

٢) **زيادة منظومة القتال ٥** رُفضت في القبول. الفريق يرى أن معايير القبول استُوفيت وأن تفسير العميل توسّع عمّا هو مكتوب. مراجعة أولية أظهرت أن **معيارين من خمسة صيغا بغموض**.

٣) **مساح جمعية التصنيف غير متاح** لثلاث نقاط توقّف محجوزة في الشهر ١٩. البديل الوحيد مساح من مكتب آخر برسوم إضافية وبإخطار أسبوعين. فقد نقاط التوقّف يؤجّل إقرار المرحلة والدفعة **ثمانية أسابيع**.

٤) **لحّامان معتمدان استقالا**. خط التأهيل يستغرق أحد عشر أسبوعاً. العمل المعتمد يتوقّف بدونهما.

**سلوك ملحوظ**
اعترض أحد أعضاء الفريق على قرار لمدير البرنامج وصعّده **مباشرةً إلى الرئيس التنفيذي** متجاوزاً الراعي ومجلس البرنامج.`,
 en:`**Project FRIGATE BRAVO — Month 18 of 36**

A naval newbuild programme: one lead frigate with a contracted option for two follow-on hulls. The design is licensed from an external partner and executed at a local yard under an industrial capability transfer programme.

**Budget and performance**
Budget at completion is 840 million. At month 18: planned value 378 · earned value 336 · actual cost 395.

**Organization and governance**
The programme board meets monthly and approves changes above a ten-million threshold. The programme manager approves below it. The classification society controls hold points and issues the certificate. The naval customer holds final acceptance authority.

**Four issues open simultaneously**
1) The propulsion package is **six weeks late** against its need date. The contract is fixed price with an **eight-week tolerance**, so the remedy clause is not triggered. Installation is on the critical path.

2) **Combat-system increment 5** was rejected at acceptance. The team believes the criteria were met and that the customer's interpretation went beyond what is written. An initial review found that **two of the five criteria were drafted ambiguously**.

3) **The classification surveyor is unavailable** for three booked hold points in month 19. The only alternative is a surveyor from another office at an additional fee with two weeks' notice. Losing the hold points defers stage approval and payment by **eight weeks**.

4) **Two certified welders have resigned.** The qualification pipeline takes eleven weeks. Certified work stops without them.

**An observed behaviour**
A team member objected to a programme manager decision and escalated it **directly to the CEO**, bypassing the sponsor and the programme board.`},
 qs:[
 {q:['بعد مراجعة الحالة، ما الذي يجب على مدير البرنامج فعله أولاً تجاه المشكلات الأربع؟',
     'Having reviewed the case, what should the programme manager do FIRST about the four issues?'],
  o:[['تقييم أثر كل مشكلة على المسار الحرج ونقاط التوقّف التعاقدية قبل أي تحرّك',
      'Assess each issue\'s impact on the critical path and contractual hold points before acting'],
     ['البدء بمشكلة اللحّامين لأنها الأطول زمناً',
      'Start with the welders because it has the longest lead time'],
     ['تصعيد الأربع إلى العميل البحري طلباً لتمديد',
      'Escalate all four to the naval customer requesting an extension'],
     ['معالجة رفض منظومة القتال أولاً لأن الفريق يعترض',
      'Address the combat-system rejection first because the team objects']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nأربع مشكلات متزامنة تُرتَّب بالأثر لا بالحدس. مساح التصنيف يبدو الأصغر لكنه يحجز نقاط توقّف تعاقدية تُؤجّل الدفعة ثمانية أسابيع.\n\n❌ لماذا «B» خاطئة:\nالطول الزمني ليس معيار الأولوية — ١١ أسبوعاً في تخصّص قابل للتعاقد أقل خطراً من نقطة توقّف مفقودة.\n\n❌ لماذا «C» خاطئة:\nالتصعيد قبل التحليل يقدّمك بلا خيارات، والعميل سيسأل عن الأثر.\n\n❌ لماذا «D» خاطئة:\nاعتراض الفريق مشروع لكنه ليس الأكثر إلحاحاً، ومعالجته أولاً تُقرأ انحيازاً.',
     '✅ Why "A" is correct:\nFour simultaneous issues are prioritized by impact, not instinct. The surveyor looks smallest but blocks contractual hold points that defer payment by eight weeks.\n\n❌ Why "B" is incorrect:\nLead time is not a priority criterion — eleven weeks in a contractable discipline is less risky than a lost hold point.\n\n❌ Why "C" is incorrect:\nEscalating before analysis presents you with no options, and the customer will ask about impact.\n\n❌ Why "D" is incorrect:\nThe team\'s objection is legitimate but not the most urgent, and addressing it first reads as bias.']},
 {q:['ما قراءة الأداء عند الشهر ١٨؟',
     'What is the performance reading at month 18?'],
  o:[['CPI = ٠٫٨٥ و SPI = ٠٫٨٩ — تجاوز في التكلفة وتأخّر عن الجدول',
      'CPI 0.85 and SPI 0.89 — over budget and behind schedule'],
     ['CPI = ١٫١٨ و SPI = ١٫١٣ — أداء أفضل من الخطة',
      'CPI 1.18 and SPI 1.13 — performing better than plan'],
     ['CPI = ٠٫٨٥ و SPI = ١٫١٣ — تجاوز في التكلفة وتقدّم على الجدول',
      'CPI 0.85 and SPI 1.13 — over budget but ahead of schedule'],
     ['لا يمكن الحكم بلا معرفة نسبة الإنجاز الفعلية',
      'No judgement is possible without the actual percentage complete']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nCPI = EV ÷ AC = ٣٣٦ ÷ ٣٩٥ = **٠٫٨٥** · SPI = EV ÷ PV = ٣٣٦ ÷ ٣٧٨ = **٠٫٨٩**. كلاهما أقل من واحد.\n\n❌ لماذا «B» خاطئة:\nقُلبت البسط والمقام — EV في البسط دائماً.\n\n❌ لماذا «C» خاطئة:\nSPI = EV ÷ PV، وEV أقل من PV فالمؤشّر أقل من واحد.\n\n❌ لماذا «D» خاطئة:\nEV **هي** الإنجاز مقوّماً بالنقد ولا تحتاج رقماً إضافياً.',
     '✅ Why "A" is correct:\nCPI = EV ÷ AC = 336 ÷ 395 = **0.85** · SPI = EV ÷ PV = 336 ÷ 378 = **0.89**. Both below one.\n\n❌ Why "B" is incorrect:\nNumerator and denominator are reversed — EV is always the numerator.\n\n❌ Why "C" is incorrect:\nSPI = EV ÷ PV, and EV is below PV so the index is below one.\n\n❌ Why "D" is incorrect:\nEV **is** progress valued in money; no extra figure is needed.']},
 {q:['بشأن مساح التصنيف غير المتاح، ما القرار الأنسب؟',
     'Regarding the unavailable classification surveyor, what is the most appropriate decision?'],
  o:[['طلب المساح البديل وتقديم طلب تغيير بالرسوم مع تحليل الأثر المتفادى',
      'Request the alternate surveyor and submit a change request for the fee with avoided-impact analysis'],
     ['تأجيل نقاط التوقّف الثلاث إلى الشهر ٢٠',
      'Defer the three hold points to month 20'],
     ['إجراء الفحوص داخلياً وتوثيقها ليعتمدها المساح لاحقاً',
      'Conduct the inspections internally and document them for later surveyor approval'],
     ['طلب إعفاء من العميل من نقاط التوقّف الثلاث',
      'Request a waiver from the customer for the three hold points']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nالرسوم الإضافية كلفة معلومة صغيرة مقابل تأجيل دفعة ثمانية أسابيع. «الأثر المتفادى» يحوّلها قراراً تجارياً واضحاً.\n\n❌ لماذا «B» خاطئة:\nالتأجيل يؤجّل إقرار المرحلة والدفعة معه — تشتري راحة بثمن نقدي أكبر.\n\n❌ لماذا «C» خاطئة:\nالفحص الذاتي ثم الاعتماد اللاحق مخالفة لشرط جمعية التصنيف وقد يُبطل الشهادة.\n\n❌ لماذا «D» خاطئة:\nطلب الإعفاء من نقاط توقّف تعاقدية يوحي بفقد السيطرة ويُرفض عادةً.',
     '✅ Why "A" is correct:\nThe additional fee is a small known cost against an eight-week payment deferral. "Avoided impact" makes it a clear commercial decision.\n\n❌ Why "B" is incorrect:\nDeferral pushes stage approval and the payment with it — buying comfort at a higher cash price.\n\n❌ Why "C" is incorrect:\nSelf-inspection with later approval breaches the classification society requirement and may invalidate the certificate.\n\n❌ Why "D" is incorrect:\nRequesting a waiver from contractual hold points signals loss of control and is normally refused.']},
 {q:['ما الخطوة الأولى في نزاع زيادة منظومة القتال ٥؟',
     'What is the first step in the combat-system increment 5 dispute?'],
  o:[['مراجعة معايير القبول الموثّقة مقابل دليل الاختبار ومصفوفة التتبّع قبل أي نقاش',
      'Review documented acceptance criteria against test evidence and the traceability matrix before any discussion'],
     ['دعم موقف الفريق وطلب إعادة النظر من العميل',
      'Support the team and ask the customer to reconsider'],
     ['قبول الرفض وإعادة العمل تفادياً للتصعيد',
      'Accept the rejection and rework to avoid escalation'],
     ['تصعيد النزاع للجنة التوجيهية المشتركة فوراً',
      'Escalate immediately to the joint steering committee']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nهذا نزاع على **الدليل** لا على الرأي. مصفوفة التتبّع ومعايير القبول تحسمه موضوعياً — وبلا ذلك تدخل نقاشاً بلا أرضية.\n\n❌ لماذا «B» خاطئة:\nدعم الفريق قبل فحص الدليل يُحرجك إن كان تفسير العميل صحيحاً — وقد ظهر أنه محقّ في معيارين.\n\n❌ لماذا «C» خاطئة:\nالقبول الفوري يكلّف ميزانية ووقتاً ويؤسّس سابقة تفسير موسّع.\n\n❌ لماذا «D» خاطئة:\nالتصعيد قبل تجهيز الدليل يحوّل مسألة فنية إلى خلاف علاقات.',
     '✅ Why "A" is correct:\nThis is a dispute over **evidence**, not opinion. The traceability matrix and acceptance criteria settle it objectively — without them you enter a discussion with no ground.\n\n❌ Why "B" is incorrect:\nBacking the team before checking evidence exposes you if the customer is right — and they proved right on two criteria.\n\n❌ Why "C" is incorrect:\nImmediate acceptance costs budget and time and sets a precedent for expansive interpretation.\n\n❌ Why "D" is incorrect:\nEscalating before assembling evidence turns a technical matter into a relationship dispute.']},
 {q:['ما الذي يكشفه تجاوز عضو الفريق لمستويات التصعيد وصولاً للرئيس التنفيذي؟',
     'What does the team member bypassing escalation levels to the CEO reveal?'],
  o:[['مسارات التصعيد وعتباته غير واضحة أو غير مُبلَّغة',
      'Escalation paths and thresholds are unclear or not communicated'],
     ['أن العضو غير منضبط ويحتاج إجراءً تأديبياً',
      'The member is undisciplined and needs disciplinary action'],
     ['أن قرار مدير البرنامج كان خاطئاً بالضرورة',
      'The programme manager\'s decision was necessarily wrong'],
     ['أن مجلس البرنامج غير فعّال ويجب إعادة تشكيله',
      'The programme board is ineffective and should be reconstituted']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nتجاوز مستويات التصعيد عَرَض لغياب مسارات وعتبات واضحة — عنصر أساسي في إطار الحوكمة. العلاج توضيحها وإبلاغها.\n\n❌ لماذا «B» خاطئة:\nالتأديب يعالج العَرَض ويترك السبب، وقد يُسكت مخاوف مشروعة.\n\n❌ لماذا «C» خاطئة:\nطريقة الاعتراض لا تدلّ على صحة القرار أو خطئه.\n\n❌ لماذا «D» خاطئة:\nإعادة التشكيل تزيل طبقة حوكمة بدل إصلاحها.',
     '✅ Why "A" is correct:\nBypassing escalation levels is a symptom of absent clear paths and thresholds — a core governance element. The remedy is to clarify and communicate them.\n\n❌ Why "B" is incorrect:\nDiscipline treats the symptom and leaves the cause, and may silence legitimate concerns.\n\n❌ Why "C" is incorrect:\nThe manner of objection says nothing about whether the decision was right.\n\n❌ Why "D" is incorrect:\nReconstituting removes a governance layer instead of fixing it.']}
 ]
},
{
 id:'CB', ax:'4.2', d:'R',
 t:['قرار التمويل أمام مجلس البرنامج','The Funding Decision Before the Board'],
 body:{ar:`**مشروع FRIGATE BRAVO — جلسة مجلس البرنامج، الشهر ١٨**

طلب المجلس قراءة صريحة للأداء المالي وتقديراً لما سيكلّفه البرنامج عند الإنجاز، قبل اعتماد الدفعة التالية.

**البيانات المعتمدة**
| المؤشّر | القيمة |
|---|---|
| الميزانية عند الإنجاز BAC | ٨٤٠ مليون |
| القيمة المخطّطة PV | ٣٧٨ مليون |
| القيمة المكتسبة EV | ٣٣٦ مليون |
| التكلفة الفعلية AC | ٣٩٥ مليون |

**احتياطي الطوارئ** ضمن خط الأساس ويديره مدير البرنامج. **الاحتياطي الإداري** خارجه ويحتاج موافقة المجلس.

**حزم المشتريات**
ثلاث حزم بيقين نطاق مختلف: الدفع (مواصفة مكتملة · ثابت السعر) · منظومة القتال (زيادات متطوّرة · معايير قبول غامضة في معيارين) · التأهيل والتدريب (حجم غير محدّد).

**السياق التعاقدي**
خيار الهيكلين التاليين مشروط بأداء الهيكل الأول. تجاوز الميزانية يُضعف موقف الحوض في تفعيل الخيار.

**سؤال المجلس الحرفي**
«بكم سينتهي البرنامج، وما الذي تحتاجه منّا؟»`,
 en:`**Project FRIGATE BRAVO — Programme Board session, Month 18**

The board has asked for a candid reading of financial performance and a forecast of what the programme will cost at completion, before approving the next payment.

**Approved data**
| Measure | Value |
|---|---|
| Budget at completion BAC | 840 million |
| Planned value PV | 378 million |
| Earned value EV | 336 million |
| Actual cost AC | 395 million |

**Contingency reserve** sits within the baseline and is managed by the programme manager. **Management reserve** sits outside it and requires board approval.

**Procurement packages**
Three packages with differing scope certainty: propulsion (complete specification · fixed price) · combat system (evolving increments · two ambiguous acceptance criteria) · qualification and training (undefined volume).

**Contractual context**
The follow-on hull option is conditional on first-hull performance. A budget overrun weakens the yard's position in exercising the option.

**The board's literal question**
"What will the programme cost, and what do you need from us?"`},
 qs:[
 {q:['لا سبب يدعو للاعتقاد بتغيّر الأداء جذرياً. ما تقدير الكلفة عند الإنجاز؟',
     'There is no reason to expect performance to change materially. What is the estimate at completion?'],
  o:[['EAC = BAC ÷ CPI = ٨٤٠ ÷ ٠٫٨٥ ≈ **٩٨٨ مليون** — تجاوز نحو ١٤٨ مليون',
      'EAC = BAC ÷ CPI = 840 ÷ 0.85 ≈ **988 million** — an overrun of about 148 million'],
     ['EAC = BAC = ٨٤٠ مليون لأن الميزانية معتمدة',
      'EAC = BAC = 840 million because the budget is approved'],
     ['EAC = AC + BAC = ١٢٣٥ مليون','EAC = AC + BAC = 1,235 million'],
     ['EAC = AC ÷ CPI = ٤٦٥ مليون','EAC = AC ÷ CPI = 465 million']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nعند توقّع استمرار الأداء: **EAC = BAC ÷ CPI** = ٨٤٠ ÷ ٠٫٨٥ ≈ ٩٨٨. وVAC = BAC − EAC = **−١٤٨**.\n\n❌ لماذا «B» خاطئة:\nالميزانية المعتمدة ليست تقديراً — التقدير يعكس الأداء الفعلي.\n\n❌ لماذا «C» خاطئة:\nهذه الصيغة تحسب الكلفة مرتين.\n\n❌ لماذا «D» خاطئة:\nالقسمة على CPI تُطبَّق على BAC لا على المنفق.',
     '✅ Why "A" is correct:\nWhen performance is expected to continue: **EAC = BAC ÷ CPI** = 840 ÷ 0.85 ≈ 988. And VAC = BAC − EAC = **−148**.\n\n❌ Why "B" is incorrect:\nAn approved budget is not a forecast — the forecast reflects actual performance.\n\n❌ Why "C" is incorrect:\nThis formula double-counts the cost.\n\n❌ Why "D" is incorrect:\nDividing by CPI applies to BAC, not to what has been spent.']},
 {q:['ما الكفاءة المطلوبة لبقية العمل للانتهاء عند ٨٤٠ مليون؟',
     'What efficiency is required on the remaining work to finish at 840 million?'],
  o:[['TCPI = (٨٤٠−٣٣٦) ÷ (٨٤٠−٣٩٥) = **١٫١٣** — فجوة ٣٣٪ عن الأداء الحالي',
      'TCPI = (840−336) ÷ (840−395) = **1.13** — a 33% gap from current performance'],
     ['TCPI = ١ ÷ CPI = ١٫١٨','TCPI = 1 ÷ CPI = 1.18'],
     ['TCPI = CPI = ٠٫٨٥','TCPI = CPI = 0.85'],
     ['الحساب غير ذي معنى لأن الهدف غير قابل للتحقيق',
      'The calculation is meaningless because the target is unachievable']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\n**TCPI = (BAC − EV) ÷ (BAC − AC)** = ٥٠٤ ÷ ٤٤٥ = **١٫١٣**. كل ريال متبقٍّ يجب أن يُنتج ١٫١٣ بينما أداؤك ٠٫٨٥ — فجوة ٣٣٪.\n\n❌ لماذا «B» خاطئة:\nمقلوب CPI ليس TCPI؛ الأخير يقارن العمل المتبقّي بالمال المتبقّي.\n\n❌ لماذا «C» خاطئة:\nTCPI مؤشّر تطلّعي لا تكرار للأداء الماضي.\n\n❌ لماذا «D» خاطئة:\nالحساب ذو معنى تماماً — وهو بالضبط ما **يُثبت** أن الهدف غير واقعي.',
     '✅ Why "A" is correct:\n**TCPI = (BAC − EV) ÷ (BAC − AC)** = 504 ÷ 445 = **1.13**. Every remaining unit must return 1.13 while you are performing at 0.85 — a 33% gap.\n\n❌ Why "B" is incorrect:\nThe reciprocal of CPI is not TCPI; TCPI compares remaining work to remaining money.\n\n❌ Why "C" is incorrect:\nTCPI is forward-looking, not a repeat of past performance.\n\n❌ Why "D" is incorrect:\nThe calculation is entirely meaningful — it is precisely what **proves** the target unrealistic.']},
 {q:['ماذا تعرض على المجلس؟',
     'What do you present to the board?'],
  o:[['التقدير والفجوة وثلاثة خيارات بأثر كل منها: تمويل إضافي · تقليص نطاق محدّد · إعادة جدولة',
      'The forecast, the gap and three options with their impacts: additional funding · targeted scope reduction · reschedule'],
     ['التقدير وطلب تمويل إضافي ١٤٨ مليون',
      'The forecast and a request for 148 million additional funding'],
     ['الالتزام بالميزانية والتعهّد بتحسين الأداء',
      'A commitment to the budget and a pledge to improve performance'],
     ['المؤشّرات وترك القرار للمجلس بلا خيارات',
      'The indicators, leaving the decision to the board without options']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nدورك تحويل الأرقام إلى **قرار قابل للاتخاذ**. ثلاثة خيارات بأثرها تمكّن المجلس من الموازنة — وهذا فرق مدير البرنامج عن المُبلِّغ.\n\n❌ لماذا «B» خاطئة:\nخيار واحد طلب لا عرض، والمجلس قد يملك بدائل لا تعرفها.\n\n❌ لماذا «C» خاطئة:\nالالتزام بميزانية تُثبت الأرقام استحالتها يفقدك المصداقية عند ظهور التجاوز.\n\n❌ لماذا «D» خاطئة:\nالأرقام بلا خيارات تنقل العبء، والمجلس سيطلب الخيارات في الجلسة نفسها.',
     '✅ Why "A" is correct:\nYour role is converting numbers into a **decidable choice**. Three options with impacts let the board weigh them — this is what separates a programme manager from a reporter.\n\n❌ Why "B" is incorrect:\nOne option is a request, not a presentation, and the board may hold alternatives you do not know.\n\n❌ Why "C" is incorrect:\nCommitting to a budget the numbers prove impossible costs you credibility when the overrun appears.\n\n❌ Why "D" is incorrect:\nNumbers without options transfer the burden; the board will ask for options in the same session.']},
 {q:['أي نموذج تعاقدي يناسب حزمة منظومة القتال بزياداتها المتطوّرة؟',
     'Which contract model suits the combat-system package with its evolving increments?'],
  o:[['ثابت السعر بحوافز مع معايير قبول موثّقة لكل زيادة قبل بدئها',
      'Fixed price incentive with documented acceptance criteria per increment before it starts'],
     ['ثابت السعر الصارم لضمان وضوح الكلفة',
      'Firm fixed price to guarantee cost clarity'],
     ['قابل للسداد بالكامل لأن النطاق يتطوّر',
      'Fully cost-reimbursable because the scope evolves'],
     ['الوقت والمواد بلا سقف لتحقيق أقصى مرونة',
      'Time and materials with no ceiling for maximum flexibility']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nالزيادات المتطوّرة تحتاج مرونة، والمخاطر مشتركة، فالحوافز توائم الطرفين. والأهم: **توثيق معايير القبول قبل كل زيادة** — فغموضها هو أصل النزاع الحالي.\n\n❌ لماذا «B» خاطئة:\nالثابت الصارم يشجّع السلوك الدفاعي عند التغيير ويفاقم نزاع القبول.\n\n❌ لماذا «C» خاطئة:\nالسداد الكامل ينقل كل المخاطر للحوض بلا حافز على الضبط.\n\n❌ لماذا «D» خاطئة:\nالوقت والمواد بلا سقف يفقد السيطرة على الكلفة تماماً.',
     '✅ Why "A" is correct:\nEvolving increments need flexibility and the risk is shared, so incentives align both parties. Critically: **documenting acceptance criteria before each increment** — their ambiguity is the root of the current dispute.\n\n❌ Why "B" is incorrect:\nFirm fixed price encourages defensive behaviour on change and worsens the acceptance dispute.\n\n❌ Why "C" is incorrect:\nFull reimbursement transfers all risk to the yard with no incentive to control.\n\n❌ Why "D" is incorrect:\nT&M with no ceiling surrenders cost control entirely.']},
 {q:['ما الفرق بين احتياطي الطوارئ والاحتياطي الإداري في هذا البرنامج؟',
     'What is the difference between contingency reserve and management reserve in this programme?'],
  o:[['الطوارئ للمخاطر المعروفة ضمن خط الأساس ويديره مدير البرنامج · الإداري لغير المعروفة خارجه ويحتاج موافقة المجلس',
      'Contingency covers known risks within the baseline and is managed by the programme manager · management reserve covers unknown risks outside it and needs board approval'],
     ['كلاهما داخل خط الأساس ويديرهما مدير البرنامج',
      'Both sit within the baseline and are managed by the programme manager'],
     ['الطوارئ للتجاوز والإداري للتأخير',
      'Contingency covers overruns and management reserve covers delays'],
     ['كلاهما يحتاج موافقة المجلس قبل الاستخدام',
      'Both require board approval before use']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nهذا التمييز يُسأل عنه كثيراً. **الطوارئ** للمخاطر المحدّدة في السجلّ، ضمن خط أساس التكلفة، وسلطته لمدير البرنامج. **الإداري** للمجهول، خارج خط الأساس، وسلطته للمجلس.\n\n❌ لماذا «B» خاطئة:\nالاحتياطي الإداري **خارج** خط الأساس بتعريفه.\n\n❌ لماذا «C» خاطئة:\nالتمييز بنوع **المخاطر** (معروفة/مجهولة) لا بنوع الأثر.\n\n❌ لماذا «D» خاطئة:\nاحتياطي الطوارئ لا يحتاج موافقة — وإلا فقد غرضه في الاستجابة السريعة.',
     '✅ Why "A" is correct:\nThis distinction is frequently examined. **Contingency** covers risks identified in the register, sits within the cost baseline, and is the programme manager\'s authority. **Management reserve** covers the unknown, sits outside the baseline, and is the board\'s authority.\n\n❌ Why "B" is incorrect:\nManagement reserve is **outside** the baseline by definition.\n\n❌ Why "C" is incorrect:\nThe distinction is by **risk type** (known/unknown), not by impact type.\n\n❌ Why "D" is incorrect:\nContingency needs no approval — otherwise it loses its purpose of rapid response.']}
 ]
},
{
 id:'CC', ax:'3.4', d:'R',
 t:['ضغط الجدول وتجهيز الهيكل','Schedule Compression and Hull Outfitting'],
 body:{ar:`**مشروع FRIGATE BRAVO — تخطيط تجهيز الهيكل**

تأخّر تجهيز الهيكل، ويطالب العميل بتقديم التسليم. أمامك شبكة أنشطة التجهيز.

**الشبكة**
A (٤ أسابيع) → B (٩ أسابيع) → D (٧ أسابيع) → E (٣ أسابيع)
وبالتوازي: A → C (أسبوعان) → D

**الأنشطة**
- **A** تجهيز المنصّة وفحص السلامة
- **B** تركيب أنظمة الدفع المساعدة — يحتاج لحّامين معتمدين
- **C** تمديد الكابلات الثانوية
- **D** تكامل الأنظمة واختبار الضغط
- **E** التسليم الداخلي وتوثيق نقطة التوقّف

**القيود**
مؤشّر أداء التكلفة الحالي **٠٫٨٥** — الميزانية مضغوطة ولا تحتمل موارد إضافية.
اللحّامان المعتمدان استقالا، وخط التأهيل أحد عشر أسبوعاً.
نقطة التوقّف التعاقدية عند نهاية **E** تحكم الدفعة التالية.

**مطلب العميل**
التسليم في **عشرين أسبوعاً** بدل المدة الحالية.`,
 en:`**Project FRIGATE BRAVO — Hull outfitting planning**

Hull outfitting is running late and the customer is pressing to bring delivery forward. The outfitting activity network is before you.

**The network**
A (4 weeks) → B (9 weeks) → D (7 weeks) → E (3 weeks)
And in parallel: A → C (2 weeks) → D

**Activities**
- **A** platform preparation and safety inspection
- **B** auxiliary propulsion systems installation — requires certified welders
- **C** secondary cable routing
- **D** systems integration and pressure testing
- **E** internal handover and hold-point documentation

**Constraints**
Current cost performance index is **0.85** — the budget is tight and cannot absorb additional resources.
The two certified welders have resigned and the qualification pipeline is eleven weeks.
The contractual hold point at the end of **E** governs the next payment.

**Customer requirement**
Delivery in **twenty weeks** instead of the current duration.`},
 qs:[
 {q:['ما مدة المسار الحرج والفائض الزمني للنشاط C؟',
     'What is the critical path duration and the float on activity C?'],
  o:[['٢٣ أسبوعاً · فائض C = ٧ أسابيع','23 weeks · C has 7 weeks of float'],
     ['١٦ أسبوعاً · فائض C = صفر','16 weeks · C has zero float'],
     ['٢٣ أسبوعاً · فائض C = صفر','23 weeks · C has zero float'],
     ['٢٥ أسبوعاً · فائض C = أسبوعان','25 weeks · C has 2 weeks of float']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nA→B→D→E = ٤+٩+٧+٣ = **٢٣** · A→C→D→E = ٤+٢+٧+٣ = ١٦. الحرج هو **الأطول**، وفائض C = ٢٣ − ١٦ = **٧**.\n\n❌ لماذا «B» خاطئة:\n١٦ هو المسار الأقصر؛ المسار الحرج الأطول لأنه يحدّد أقصر مدة ممكنة.\n\n❌ لماذا «C» خاطئة:\nC على المسار الأقصر فلديه متّسع سبعة أسابيع.\n\n❌ لماذا «D» خاطئة:\nلا يوجد مسار بمدة ٢٥ في هذه الشبكة.',
     '✅ Why "A" is correct:\nA→B→D→E = 4+9+7+3 = **23** · A→C→D→E = 4+2+7+3 = 16. The critical path is the **longest**, and C\'s float = 23 − 16 = **7**.\n\n❌ Why "B" is incorrect:\n16 is the shorter path; the critical path is the longest because it sets the shortest possible duration.\n\n❌ Why "C" is incorrect:\nC is on the shorter path so it carries seven weeks of slack.\n\n❌ Why "D" is incorrect:\nNo path in this network totals 25.']},
 {q:['تحتاج ضغط ثلاثة أسابيع. ما الأسلوب الأنسب في ظل القيود؟',
     'You need to compress by three weeks. Which technique fits the constraints?'],
  o:[['التتبّع السريع — توازي أنشطة متسلسلة بلا كلفة إضافية لكن بمخاطر أعلى',
      'Fast tracking — overlapping sequential activities at no extra cost but with higher risk'],
     ['التسريع — إضافة موارد لأنشطة المسار الحرج',
      'Crashing — adding resources to critical path activities'],
     ['تقليص النطاق بإزالة النشاط C','Scope reduction by removing activity C'],
     ['تمديد الجدول والتفاوض مع العميل','Extending the schedule and negotiating with the customer']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\n**التتبّع السريع** يوازي أنشطة كانت متسلسلة — بلا كلفة إضافية لكنه يرفع مخاطر إعادة العمل. مع CPI = ٠٫٨٥ لا تملك ترف التسريع.\n\n❌ لماذا «B» خاطئة:\nالتسريع يضيف كلفة وأنت متجاوز الميزانية ١٥٪ أصلاً — ولا لحّامين معتمدين لإضافتهم.\n\n❌ لماذا «C» خاطئة:\nC **ليس** على المسار الحرج — إزالته لا تقصّر المدة. خطأ شائع جداً.\n\n❌ لماذا «D» خاطئة:\nالتمديد ليس ضغطاً، والسؤال يطلب الضغط.',
     '✅ Why "A" is correct:\n**Fast tracking** overlaps previously sequential activities — no added cost but higher rework risk. At CPI 0.85 you cannot afford crashing.\n\n❌ Why "B" is incorrect:\nCrashing adds cost when you are already 15% over — and there are no certified welders to add.\n\n❌ Why "C" is incorrect:\nC is **not** on the critical path — removing it does not shorten the duration. A very common error.\n\n❌ Why "D" is incorrect:\nExtension is not compression, and the question asks for compression.']},
 {q:['بعد تطبيق التتبّع السريع ونجاحه في توفير ثلاثة أسابيع، ما الخطوة التالية؟',
     'After fast tracking successfully saves three weeks, what is the next step?'],
  o:[['إعادة تحليل الشبكة — قد يظهر مسار حرج جديد — وتسجيل مخاطر إعادة العمل',
      'Re-analyse the network — a new critical path may emerge — and log the rework risks'],
     ['تثبيت خط الأساس الجديد والمضي في التنفيذ',
      'Baseline the new schedule and proceed with execution'],
     ['تطبيق التتبّع السريع على بقية الأنشطة لهامش إضافي',
      'Apply fast tracking to the remaining activities for extra margin'],
     ['إبلاغ العميل بأن الموعد صار عشرين أسبوعاً',
      'Inform the customer the date is now twenty weeks']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nضغط المسار الحرج قد يجعل مساراً آخر هو الحرج — فائض C البالغ سبعة أسابيع قد يتقلّص. وكل توازٍ يخلق خطر إعادة عمل يجب تسجيله.\n\n❌ لماذا «B» خاطئة:\nتثبيت خط الأساس قبل إعادة التحليل يثبّت خطأً محتملاً.\n\n❌ لماذا «C» خاطئة:\nالتوسّع في التوازي يضاعف المخاطر بلا حاجة — ضغطت ما يكفي.\n\n❌ لماذا «D» خاطئة:\nالإبلاغ صحيح لكنه ليس **أول** ما تفعله — أعد التحليل ثم أبلغ برقم موثوق.',
     '✅ Why "A" is correct:\nCompressing the critical path may make another path critical — C\'s seven weeks of float may shrink. And every overlap creates a rework risk that must be logged.\n\n❌ Why "B" is incorrect:\nBaselining before re-analysis locks in a potential error.\n\n❌ Why "C" is incorrect:\nMore overlap doubles the risk unnecessarily — you compressed enough.\n\n❌ Why "D" is incorrect:\nInforming is right but not **first** — re-analyse, then report a reliable date.']},
 {q:['ما أثر نقص اللحّامين المعتمدين على النشاط B؟',
     'What is the impact of the certified welder shortage on activity B?'],
  o:[['B على المسار الحرج ويحتاج لحّامين معتمدين — فالنقص يهدّد المدة كلها ويستوجب خيار التعاقد الخارجي',
      'B is on the critical path and needs certified welders — the shortage threatens the whole duration and calls for an external contracting option'],
     ['لا أثر لأن خط التأهيل أحد عشر أسبوعاً وB تسعة فقط',
      'No impact because the pipeline is eleven weeks and B is only nine'],
     ['يُنقل العمل إلى C حتى يكتمل التأهيل',
      'The work moves to C until qualification completes'],
     ['يُؤجّل B إلى ما بعد D لتفادي التعطيل',
      'B is deferred to after D to avoid disruption']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nB على المسار الحرج وفائضه صفر. النقص في مورد حرج على نشاط حرج يهدّد المدة كلها — والتعاقد الخارجي على لحّامين معتمدين أسرع من انتظار ١١ أسبوعاً.\n\n❌ لماذا «B» خاطئة:\nمنطق مقلوب: طول خط التأهيل مقارنةً بمدة B يجعل الأثر **أسوأ** لا أهون.\n\n❌ لماذا «C» خاطئة:\nC تمديد كابلات لا لحام — العمل غير قابل للنقل بين تخصّصين.\n\n❌ لماذا «D» خاطئة:\nD يعتمد على B، فتأجيل B بعد D يكسر الاعتمادية المنطقية.',
     '✅ Why "A" is correct:\nB is on the critical path with zero float. A shortage of a critical resource on a critical activity threatens the whole duration — and externally contracting certified welders is faster than waiting eleven weeks.\n\n❌ Why "B" is incorrect:\nInverted logic: the pipeline being longer than B\'s duration makes the impact **worse**, not lighter.\n\n❌ Why "C" is incorrect:\nC is cable routing, not welding — the work is not transferable between disciplines.\n\n❌ Why "D" is incorrect:\nD depends on B, so deferring B after D breaks the logical dependency.']},
 {q:['العميل يطالب بعشرين أسبوعاً. ما الأنسب في التعامل مع هذا المطلب؟',
     'The customer demands twenty weeks. How should this demand be handled?'],
  o:[['عرض خيارات الضغط بأثرها على المخاطر والكلفة، وتوضيح أن نقطة التوقّف تحكم الدفعة',
      'Present compression options with their risk and cost impacts, clarifying that the hold point governs the payment'],
     ['قبول الموعد فوراً حفاظاً على العلاقة',
      'Accept the date immediately to preserve the relationship'],
     ['رفض الموعد لأن الشبكة تقول ٢٣ أسبوعاً',
      'Refuse the date because the network says 23 weeks'],
     ['تصعيد المطلب لمجلس البرنامج بلا تحليل',
      'Escalate the demand to the programme board without analysis']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nمطلب العميل مشروع، ودورك تحويله لقرار مستنير: **ما الذي يكلّفه الضغط من مخاطر؟** وربط ذلك بنقطة التوقّف التي تحكم الدفعة يجعل المفاضلة تجارية لا شخصية.\n\n❌ لماذا «B» خاطئة:\nالقبول بلا تحليل يلتزمك بموعد قد يفشل — وفشله يكلّف العلاقة أكثر من نقاش صريح الآن.\n\n❌ لماذا «C» خاطئة:\nالرفض بلا بديل موقف سلبي؛ الشبكة الحالية قابلة للضغط فعلاً.\n\n❌ لماذا «D» خاطئة:\nالتصعيد بلا تحليل ينقل العبء ولا يعالج.',
     '✅ Why "A" is correct:\nThe customer\'s demand is legitimate and your role is converting it into an informed decision: **what risk does compression cost?** Linking it to the hold point that governs payment makes the trade-off commercial, not personal.\n\n❌ Why "B" is incorrect:\nAccepting without analysis commits you to a date that may fail — and failure costs the relationship more than a candid discussion now.\n\n❌ Why "C" is incorrect:\nRefusal without an alternative is a passive stance; the network genuinely can be compressed.\n\n❌ Why "D" is incorrect:\nEscalation without analysis transfers the burden without resolving it.']}
 ]
},
{
 id:'CD', ax:'2.1', d:'E',
 t:['أصحاب المصلحة والتغيير التنظيمي','Stakeholders and Organizational Change'],
 body:{ar:`**مشروع FRIGATE BRAVO — الشهر ٢٠**

أعلنت المجموعة **دمج إدارتي الهندسة والإنتاج** في إدارة واحدة. لم تتغيّر أهداف البرنامج، لكن **نصف أصحاب المصلحة سيتغيّرون خلال شهرين**، ومعهم سلطات الاعتماد.

**خريطة أصحاب المصلحة الحالية**
| الطرف | النفوذ | الاهتمام | الموقف |
|---|---|---|---|
| العميل البحري | عالٍ | عالٍ | داعم بتحفّظ |
| جمعية التصنيف | عالٍ | عالٍ | محايد إجرائي |
| مدير الهندسة | عالٍ | عالٍ | **سيُدمج منصبه** |
| مدير الإنتاج | عالٍ | عالٍ | **مرشّح للمنصب الموحّد** |
| شريك التصميم | متوسط | متوسط | داعم |
| نقابة الحوض | متوسط | عالٍ | **قلقة من الدمج** |

**ما يحدث فعلاً**
- تراجعت مشاركة مدير الهندسة في اجتماعات البرنامج منذ الإعلان.
- ترفع نقابة الحوض مخاوف بشأن أثر الدمج على تأهيل اللحّامين.
- فرق التنفيذ تتلقّى توجيهات متضاربة من الإدارتين.
- لم يتغيّر أي مخرج تعاقدي، والجدول والميزانية كما هما.

**سؤال الراعي**
«البرنامج لم يتغيّر — لماذا تطلب وقتاً لإدارة هذا؟»`,
 en:`**Project FRIGATE BRAVO — Month 20**

The group has announced a **merger of the engineering and production directorates** into one. Programme objectives are unchanged, but **half the stakeholders will change within two months**, and with them the approval authorities.

**Current stakeholder map**
| Party | Power | Interest | Position |
|---|---|---|---|
| Naval customer | High | High | Supportive with reservations |
| Classification society | High | High | Procedurally neutral |
| Engineering director | High | High | **Post being merged** |
| Production director | High | High | **Candidate for the unified post** |
| Design partner | Medium | Medium | Supportive |
| Yard union | Medium | High | **Concerned about the merger** |

**What is actually happening**
- The engineering director's participation in programme meetings has declined since the announcement.
- The yard union is raising concerns about the merger's effect on welder qualification.
- Delivery teams are receiving conflicting direction from the two directorates.
- No contractual deliverable has changed; schedule and budget are unchanged.

**The sponsor's question**
"The programme has not changed — why are you asking for time to manage this?"`},
 qs:[
 {q:['ما الأولى في مواجهة هذا التغيير التنظيمي؟',
     'What is the priority in facing this organizational change?'],
  o:[['تقييم أثر التغيير على الأدوار وسلطات القرار وتحديث خطة إشراك أصحاب المصلحة',
      'Assess the impact on roles and decision authorities and update the stakeholder engagement plan'],
     ['تجميد قرارات البرنامج حتى يكتمل الدمج',
      'Freeze programme decisions until the merger completes'],
     ['المضي بالخطة الحالية لأن الأهداف لم تتغيّر',
      'Proceed with the current plan since objectives are unchanged'],
     ['طلب استثناء البرنامج من الدمج للحفاظ على استقراره',
      'Request that the programme be exempted from the merger to preserve stability']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nثبات الأهداف لا يعني ثبات البيئة. تغيّر نصف أصحاب المصلحة يغيّر **من يقرّر ومن يعتمد** — وهذا يستوجب تقييم الأثر وتحديث خطة الإشراك. وهذا هو ردّك على سؤال الراعي.\n\n❌ لماذا «B» خاطئة:\nتجميد شهرين على برنامج جارٍ كلفة باهظة لتفادي عدم يقين قابل للإدارة.\n\n❌ لماذا «C» خاطئة:\nالمضي بلا تقييم يعني عرض قراراتك على من لم يشاركوا فيها.\n\n❌ لماذا «D» خاطئة:\nالاستثناء من قرار مؤسسي غير واقعي وليس من صلاحياتك.',
     '✅ Why "A" is correct:\nStable objectives do not mean a stable environment. Half the stakeholders changing alters **who decides and who approves** — requiring impact assessment and an updated engagement plan. This is your answer to the sponsor.\n\n❌ Why "B" is incorrect:\nFreezing an active programme for two months is a steep cost to avoid manageable uncertainty.\n\n❌ Why "C" is incorrect:\nProceeding without assessment means presenting decisions to people who never participated in them.\n\n❌ Why "D" is incorrect:\nExemption from an organizational decision is unrealistic and outside your authority.']},
 {q:['كيف تُصنّف نقابة الحوض على مصفوفة النفوذ والاهتمام، وما الاستراتيجية؟',
     'How is the yard union classified on the power-interest grid, and what is the strategy?'],
  o:[['نفوذ متوسط واهتمام عالٍ ← أبقِها مُطّلعة وأشركها في قرارات التأهيل',
      'Medium power, high interest ← keep informed and involve in qualification decisions'],
     ['نفوذ متوسط واهتمام عالٍ ← راقبها بأقل جهد',
      'Medium power, high interest ← monitor with minimum effort'],
     ['نفوذ عالٍ واهتمام عالٍ ← أدِرها عن قرب بتقارير يومية',
      'High power, high interest ← manage closely with daily reports'],
     ['نفوذ منخفض ← يمكن تجاهل مخاوفها حتى تتضح صورة الدمج',
      'Low power ← its concerns can be set aside until the merger clarifies']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nاهتمام عالٍ مع نفوذ متوسط ← **أبقِه مُطّلعاً**. ومخاوفها تمسّ تأهيل اللحّامين — وهو مورد حرج على المسار الحرج، فإشراكها في قرارات التأهيل ليس مجاملة بل إدارة مخاطر.\n\n❌ لماذا «B» خاطئة:\n«راقب بأقل جهد» لمن اهتمامه ونفوذه منخفضان — لا ينطبق هنا.\n\n❌ لماذا «C» خاطئة:\nنفوذها متوسط لا عالٍ، والتقارير اليومية إفراط يستهلك الجهد.\n\n❌ لماذا «D» خاطئة:\nتجاهل مخاوف تمسّ مورداً حرجاً يحوّلها إلى مخاطرة محقّقة.',
     '✅ Why "A" is correct:\nHigh interest with medium power ← **keep informed**. And its concerns touch welder qualification — a critical resource on the critical path — so involving it in qualification decisions is risk management, not courtesy.\n\n❌ Why "B" is incorrect:\n"Monitor with minimum effort" applies to low power *and* low interest — not the case here.\n\n❌ Why "C" is incorrect:\nIts power is medium, not high, and daily reports are excessive effort.\n\n❌ Why "D" is incorrect:\nIgnoring concerns that touch a critical resource converts them into a realized risk.']},
 {q:['تتلقّى فرق التنفيذ توجيهات متضاربة من الإدارتين. ما الأنسب؟',
     'Delivery teams are receiving conflicting direction from the two directorates. What is most appropriate?'],
  o:[['توضيح سلطة القرار داخل البرنامج بمصفوفة أدوار محدّثة والاتفاق عليها مع الإدارتين',
      'Clarify decision authority within the programme with an updated responsibility matrix, agreed with both directorates'],
     ['توجيه الفرق باتّباع إدارة الإنتاج لأن مديرها مرشّح للمنصب',
      'Direct teams to follow production because its director is the likely appointee'],
     ['رفع الأمر للرئيس التنفيذي لحسمه فوراً',
      'Raise it to the CEO for immediate resolution'],
     ['ترك الفرق تختار المصدر الأنسب لكل حالة',
      'Let teams choose the most suitable source case by case']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nالتضارب عَرَض لغموض **سلطة القرار**. مصفوفة أدوار محدّثة ومتّفق عليها تحسمه داخل البرنامج بلا انتظار نتيجة الدمج.\n\n❌ لماذا «B» خاطئة:\nالبناء على ترشيح غير محسوم مقامرة، وقد يُحرجك إن تغيّر القرار.\n\n❌ لماذا «C» خاطئة:\nالتصعيد للرئيس التنفيذي قبل محاولة الحلّ داخل البرنامج يتجاوز مستويات الحوكمة.\n\n❌ لماذا «D» خاطئة:\nترك الاختيار للفرق يضاعف التضارب ويُنتج قرارات غير متّسقة.',
     '✅ Why "A" is correct:\nThe conflict is a symptom of ambiguous **decision authority**. An updated, agreed responsibility matrix settles it inside the programme without waiting for the merger outcome.\n\n❌ Why "B" is incorrect:\nBuilding on an unconfirmed appointment is a gamble that embarrasses you if the decision changes.\n\n❌ Why "C" is incorrect:\nEscalating to the CEO before attempting resolution within the programme bypasses governance levels.\n\n❌ Why "D" is incorrect:\nLetting teams choose multiplies the conflict and produces inconsistent decisions.']},
 {q:['تراجعت مشاركة مدير الهندسة منذ الإعلان. ما التفسير الأنسب وما الإجراء؟',
     'The engineering director\'s participation has declined since the announcement. What is the best interpretation and action?'],
  o:[['انسحاب مرتبط بعدم اليقين الوظيفي — أشركه في نقل المعرفة الحرجة قبل تغيّر دوره',
      'Withdrawal linked to role uncertainty — engage him in transferring critical knowledge before his role changes'],
     ['فقد اهتمام بالبرنامج — استبدله بممثّل آخر فوراً',
      'Loss of interest in the programme — replace him with another representative immediately'],
     ['مقاومة للتغيير — أبلغ الموارد البشرية',
      'Resistance to change — report it to HR'],
     ['سلوك طبيعي لا يستوجب إجراءً',
      'Normal behaviour requiring no action']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nعدم اليقين الوظيفي يفسّر الانسحاب أكثر من فقد الاهتمام. والأهم: هو يحمل **معرفة ضمنية** عن قرارات التصميم — إشراكه في نقلها يخدم البرنامج ويعيد إشراكه معاً.\n\n❌ لماذا «B» خاطئة:\nالاستبدال الفوري يفقدك المعرفة قبل نقلها ويؤكّد مخاوفه.\n\n❌ لماذا «C» خاطئة:\nتصنيفه «مقاوماً» وإحالته للموارد البشرية يحوّل مسألة إنسانية إلى إجراء ويغلق باب التعاون.\n\n❌ لماذا «D» خاطئة:\nالتجاهل يخسر معرفة حرجة نهائياً عند تغيّر دوره.',
     '✅ Why "A" is correct:\nRole uncertainty explains withdrawal better than lost interest. More importantly he carries **tacit knowledge** about design decisions — engaging him in transferring it serves the programme and re-engages him at the same time.\n\n❌ Why "B" is incorrect:\nImmediate replacement loses the knowledge before transfer and confirms his fears.\n\n❌ Why "C" is incorrect:\nLabelling him "resistant" and referring to HR converts a human matter into a procedure and closes the door on cooperation.\n\n❌ Why "D" is incorrect:\nIgnoring it permanently loses critical knowledge when his role changes.']},
 {q:['كيف تردّ على سؤال الراعي: «البرنامج لم يتغيّر — لماذا تطلب وقتاً؟»',
     'How do you answer the sponsor: "The programme has not changed — why ask for time?"'],
  o:[['بعرض الأثر المحدّد: تغيّر سلطات الاعتماد · توجيهات متضاربة · خطر فقد معرفة حرجة — وكلفة كل منها',
      'By presenting the specific impact: changed approval authorities · conflicting direction · risk of losing critical knowledge — and the cost of each'],
     ['بالتأكيد أن الوقت لازم لإدارة التغيير عموماً',
      'By affirming that time is generally needed to manage change'],
     ['بسحب الطلب والمضي بالخطة الحالية',
      'By withdrawing the request and proceeding with the current plan'],
     ['بإحالة السؤال إلى مدير الموارد البشرية',
      'By referring the question to the HR director']],
  c:0,
  x:['✅ لماذا «A» صحيحة:\nالراعي لا يرفض الوقت بل يرفض الطلب **غير المبرَّر**. ثلاثة آثار محدّدة بكلفتها تحوّل الطلب من «إدارة تغيير» المجرّدة إلى قرار تجاري واضح.\n\n❌ لماذا «B» خاطئة:\nالتعميم لا يجيب عن سؤاله، ويؤكّد انطباعه بأن الطلب غير مبرّر.\n\n❌ لماذا «C» خاطئة:\nالسحب يترك الأثر قائماً وسيظهر لاحقاً كتأخير غير مفسَّر.\n\n❌ لماذا «D» خاطئة:\nالأثر على البرنامج مسؤوليتك لا مسؤولية الموارد البشرية.',
     '✅ Why "A" is correct:\nThe sponsor is not refusing time — he is refusing an **unjustified** request. Three specific impacts with their costs convert the request from abstract "change management" into a clear commercial decision.\n\n❌ Why "B" is incorrect:\nGeneralization does not answer his question and confirms his impression that the request is unjustified.\n\n❌ Why "C" is incorrect:\nWithdrawing leaves the impact in place, to appear later as an unexplained delay.\n\n❌ Why "D" is incorrect:\nThe impact on the programme is your responsibility, not HR\'s.']}
 ]
}
];
