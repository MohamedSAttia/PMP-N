/* ============================================================
   ① الأدوات والتقنيات للأربعين عملية
   ② القوالب الجاهزة  ③ سلسلة المخرجات ← المدخلات
   ④ لوحة تحليلية  ⑤ التصدير والإرسال
   ============================================================ */

/* ═══════════ ① الأدوات والتقنيات ═══════════ */
window.TT = {
1:[['حكم الخبراء','Expert judgement'],['جمع البيانات','Data gathering'],
   ['المهارات الشخصية والجماعية','Interpersonal and team skills'],
   ['اجتماعات','Meetings'],['تحليل حالة العمل','Business case analysis']],
2:[['حكم الخبراء','Expert judgement'],['تحليل البدائل','Alternatives analysis'],
   ['نظام معلومات إدارة المشروع','PMIS'],['ورش عمل تيسيرية','Facilitated workshops'],
   ['التفصيل والتخصيص','Tailoring']],
3:[['تحليل الصنع أو الشراء','Make-or-buy analysis'],['تحليل السوق','Market research'],
   ['اختيار نوع العقد','Contract type selection'],['حكم الخبراء','Expert judgement'],
   ['تحليل مصادر التوريد','Source analysis']],
4:[['نظام معلومات إدارة المشروع','PMIS'],['اجتماعات','Meetings'],
   ['حكم الخبراء','Expert judgement'],['نظام اعتماد العمل','Work authorization system']],
5:[['قوائم التحقّق','Checklists'],['تحليل السبب الجذري','Root cause analysis'],
   ['التدقيق','Audits'],['تحليل العمليات','Process analysis'],
   ['مخطّط السبب والنتيجة','Cause-and-effect diagram']],
6:[['إدارة المعرفة','Knowledge management'],['إدارة المعلومات','Information management'],
   ['المهارات الشخصية','Interpersonal skills'],['التيسير','Facilitation'],
   ['جلسات الدروس','Lessons sessions']],
7:[['تحليل القيمة المكتسبة','Earned value analysis'],['تحليل الاتجاه','Trend analysis'],
   ['تحليل التباين','Variance analysis'],['تحليل البدائل','Alternatives analysis'],
   ['لوحات المعلومات','Dashboards']],
8:[['أدوات ضبط التغيير','Change control tools'],['تحليل القرار متعدّد المعايير','MCDA'],
   ['تحليل الأثر','Impact analysis'],['اجتماعات لجنة ضبط التغيير','CCB meetings']],
9:[['تحليل الوثائق','Document analysis'],['تحليل الانحدار','Regression analysis'],
   ['التدقيق النهائي','Final audit'],['جلسات الدروس','Lessons sessions'],
   ['المسح والاستبيان','Surveys']],
10:[['حكم الخبراء','Expert judgement'],['تحليل البيانات','Data analysis'],
   ['اجتماعات','Meetings']],
11:[['المقابلات','Interviews'],['مجموعات التركيز','Focus groups'],
   ['ورش عمل تيسيرية','Facilitated workshops'],['العصف الذهني','Brainstorming'],
   ['المسح والاستبيان','Questionnaires and surveys'],['النماذج الأولية','Prototypes'],
   ['مصفوفة التتبّع','Traceability matrix']],
12:[['تحليل المنتج','Product analysis'],['تحليل البدائل','Alternatives analysis'],
   ['حكم الخبراء','Expert judgement'],['ورش عمل تيسيرية','Facilitated workshops'],
   ['تحليل أصحاب المصلحة','Stakeholder analysis']],
13:[['التجزئة','Decomposition'],['حكم الخبراء','Expert judgement'],
   ['قوالب هيكل التجزئة','WBS templates'],['قاعدة ١٠٠٪','The 100% rule']],
14:[['تحليل التباين','Variance analysis'],['تحليل الاتجاه','Trend analysis'],
   ['مصفوفة التتبّع','Traceability matrix']],
15:[['الفحص','Inspection'],['اتخاذ القرار الجماعي','Group decision-making'],
   ['مراجعة القبول','Acceptance review']],
16:[['حكم الخبراء','Expert judgement'],['تحليل البيانات','Data analysis'],
   ['اجتماعات','Meetings']],
17:[['تحليل الشبكة','Schedule network analysis'],['طريقة المسار الحرج','Critical path method'],
   ['تحسين الموارد','Resource optimization'],['ضغط الجدول','Schedule compression'],
   ['محاكاة مونت كارلو','Monte Carlo simulation'],['التخطيط المسبوق','Leads and lags']],
18:[['تحليل القيمة المكتسبة','Earned value analysis'],['تحليل التباين','Variance analysis'],
   ['تحليل الأداء','Performance reviews'],['ضغط الجدول','Schedule compression'],
   ['أداة برمجية للجدولة','Scheduling software']],
19:[['حكم الخبراء','Expert judgement'],['تحليل البيانات','Data analysis'],
   ['اجتماعات','Meetings']],
20:[['التقدير القياسي','Analogous estimating'],['التقدير البارامتري','Parametric estimating'],
   ['التقدير التصاعدي','Bottom-up estimating'],['التقدير الثلاثي PERT','Three-point estimating'],
   ['تحليل الاحتياطي','Reserve analysis'],['تكلفة الجودة','Cost of quality']],
21:[['تجميع التكاليف','Cost aggregation'],['تحليل الاحتياطي','Reserve analysis'],
   ['مراجعة تاريخية','Historical review'],['مطابقة حدود التمويل','Funding limit reconciliation'],
   ['التمويل','Financing']],
22:[['تحليل القيمة المكتسبة','Earned value analysis'],['التنبّؤ','Forecasting'],
   ['مؤشّر أداء الإنجاز TCPI','To-complete performance index'],
   ['تحليل التباين','Variance analysis'],['تحليل الاحتياطي','Reserve analysis']],
23:[['العصف الذهني','Brainstorming'],['تحليل أصحاب المصلحة','Stakeholder analysis'],
   ['تحليل الوثائق','Document analysis'],['مصفوفة النفوذ والاهتمام','Power-interest grid'],
   ['نموذج البروز','Salience model'],['المقابلات','Interviews']],
24:[['مصفوفة تقييم الإشراك','Engagement assessment matrix'],['رسم الذهنية','Mind mapping'],
   ['المهارات الشخصية','Interpersonal skills'],['حكم الخبراء','Expert judgement']],
25:[['تحليل متطلبات التواصل','Communication requirements analysis'],
   ['نماذج التواصل','Communication models'],['تقنيات التواصل','Communication technology'],
   ['حساب قنوات الاتصال','Channel calculation n(n−1)/2'],
   ['أساليب التواصل','Communication methods']],
26:[['المهارات الشخصية','Interpersonal skills'],['إدارة النزاع','Conflict management'],
   ['التفاوض','Negotiation'],['الوعي الثقافي','Cultural awareness'],
   ['اتخاذ القرار','Decision-making']],
27:[['تقنيات التواصل','Communication technology'],['أساليب التواصل','Communication methods'],
   ['مهارات العرض','Presentation skills'],['الاستماع الفعّال','Active listening'],
   ['حلقات التغذية الراجعة','Feedback loops']],
28:[['تحليل البيانات','Data analysis'],['مصفوفة تقييم الإشراك','Engagement assessment matrix'],
   ['المسح والاستبيان','Surveys'],['الملاحظة','Observation'],['المقابلات','Interviews']],
29:[['نظام معلومات إدارة المشروع','PMIS'],['الملاحظة','Observation'],
   ['المسح والاستبيان','Surveys'],['تحليل الفعالية','Effectiveness analysis']],
30:[['مخطّط تنظيمي','Organizational charts'],['مصفوفة RACI','RACI matrix'],
   ['وصف الأدوار','Role descriptions'],['نظرية التنظيم','Organizational theory'],
   ['ميثاق الفريق','Team charter']],
31:[['التقدير التصاعدي','Bottom-up estimating'],['التقدير القياسي','Analogous estimating'],
   ['التقدير البارامتري','Parametric estimating'],['تحليل البدائل','Alternatives analysis'],
   ['هيكل تجزئة الموارد','Resource breakdown structure']],
32:[['اتخاذ القرار','Decision-making'],['المهارات الشخصية','Interpersonal skills'],
   ['التخصيص المسبق','Pre-assignment'],['التفاوض','Negotiation'],
   ['الفرق الافتراضية','Virtual teams']],
33:[['تحديد الموقع المشترك','Colocation'],['التقدير والمكافآت','Recognition and rewards'],
   ['التدريب','Training'],['بناء الفريق','Team building'],
   ['إدارة النزاع','Conflict management'],['الذكاء العاطفي','Emotional intelligence'],
   ['التأثير','Influencing']],
34:[['تحليل البدائل','Alternatives analysis'],['تحليل الأداء','Performance reviews'],
   ['تحليل التكلفة والمنفعة','Cost-benefit analysis'],['التفاوض','Negotiation'],
   ['تحليل التباين','Variance analysis']],
35:[['حكم الخبراء','Expert judgement'],['تحليل أصحاب المصلحة','Stakeholder analysis'],
   ['اجتماعات','Meetings'],['هيكل تجزئة المخاطر','Risk breakdown structure']],
36:[['العصف الذهني','Brainstorming'],['قوائم التحقّق','Checklists'],
   ['تحليل SWOT','SWOT analysis'],['تحليل الافتراضات والقيود','Assumption and constraint analysis'],
   ['تحليل السبب الجذري','Root cause analysis'],['أسلوب دلفي','Delphi technique'],
   ['تحليل الوثائق','Document analysis']],
37:[['مصفوفة الاحتمالية والأثر','Probability and impact matrix'],
   ['تقييم جودة بيانات المخاطر','Risk data quality assessment'],
   ['تصنيف المخاطر','Risk categorization'],['محاكاة مونت كارلو','Monte Carlo simulation'],
   ['شجرة القرار','Decision tree'],['القيمة النقدية المتوقّعة EMV','Expected monetary value'],
   ['مخطّط التورنادو','Tornado diagram']],
38:[['استراتيجيات التهديد','Threat strategies — avoid, transfer, mitigate, accept'],
   ['استراتيجيات الفرص','Opportunity strategies — exploit, share, enhance, accept'],
   ['تحليل البدائل','Alternatives analysis'],['تحليل التكلفة والمنفعة','Cost-benefit analysis'],
   ['خطط الطوارئ','Contingency planning']],
39:[['حكم الخبراء','Expert judgement'],['المهارات الشخصية','Interpersonal skills'],
   ['نظام معلومات إدارة المشروع','PMIS'],['التأثير','Influencing']],
40:[['تدقيق المخاطر','Risk audits'],['تحليل التباين والاتجاه','Variance and trend analysis'],
   ['تحليل الاحتياطي','Reserve analysis'],['اجتماعات','Meetings'],
   ['إعادة تقييم المخاطر','Risk reassessment']]
};

/* ═══════════ ② قوالب المخرجات ═══════════ */
window.OTPL = {
1:{ar:`**ميثاق المشروع — مسوّدة**

**الغرض**: تسليم فراقة قائدة بقدرة قتالية معتمدة مع خيار لهيكلين تاليين.
**مدير المشروع**: يُعيَّن بقرار المجلس · عتبة التغيير عشرة ملايين.
**الأهداف**: التسليم بلا فقد نقاط توقّف · شهادة التصنيف بلا تحفّظات · داخل ٨٤٠ مليون.
**المخاطر عالية المستوى**: تأخّر المورّدين · توافر المساح · فقد اللحّامين · غموض معايير القبول.
**المعالم**: قطع أول صفيحة ش٣ · العارضة ش٨ · الإنزال ش٢٠ · التجارب ش٣٣ · التسليم ش٣٦.
**معايير الموافقة**: نقاط التوقّف · الشهادة · القبول الرسمي · تسوية العقود.`,
 en:`**Project Charter — Draft**

**Purpose**: deliver a lead frigate with certified combat capability plus an option for two follow-on hulls.
**Project manager**: appointed by board decision · change threshold ten million.
**Objectives**: delivery with no hold point lost · class certificate with no qualifications · within 840 million.
**High-level risks**: supplier delay · surveyor availability · welder loss · ambiguous acceptance criteria.
**Milestones**: first steel M3 · keel M8 · launch M20 · trials M33 · delivery M36.
**Approval criteria**: hold points · certificate · formal acceptance · contract settlement.`},
13:{ar:`**هيكل تجزئة العمل — المستوى الثاني**

١٫٠ الهيكل والبناء — ١٫١ التصنيع · ١٫٢ التجميع · ١٫٣ اللحام والتأهيل
٢٫٠ منظومة الدفع — ٢٫١ التوريد · ٢٫٢ التركيب · ٢٫٣ الاختبار
٣٫٠ منظومة القتال — ٣٫١ إلى ٣٫٥ الزيادات الخمس
٤٫٠ التجهيز والأنظمة المساعدة
٥٫٠ التجارب والقبول — ٥٫١ الميناء · ٥٫٢ البحرية
٦٫٠ إدارة البرنامج والامتثال

**قاعدة ١٠٠٪**: مجموع المستوى الثاني = كل النطاق لا أكثر ولا أقل.
**حزمة العمل** = أدنى مستوى قابل للتقدير والإسناد والمراقبة، ولكل حزمة معايير قبول موثّقة.`,
 en:`**Work Breakdown Structure — Level 2**

1.0 Hull and construction — 1.1 fabrication · 1.2 assembly · 1.3 welding and qualification
2.0 Propulsion system — 2.1 supply · 2.2 installation · 2.3 testing
3.0 Combat system — 3.1 to 3.5 the five increments
4.0 Outfitting and auxiliary systems
5.0 Trials and acceptance — 5.1 harbour · 5.2 sea
6.0 Programme management and compliance

**100% rule**: the sum of level 2 equals all the scope, no more and no less.
**Work package** = the lowest level that can be estimated, assigned and controlled, each with documented acceptance criteria.`},
17:{ar:`**الجدول الزمني والمسار الحرج**

**الشبكة**: A(٤) → B(٩) → D(٧) → E(٣) · وA → C(٢) → D
**المسارات**: A→B→D→E = **٢٣ أسبوعاً** ← الحرج · A→C→D→E = ١٦ أسبوعاً
**الفائض**: A·B·D·E = صفر · C = **٧ أسابيع**

**عند الحاجة للضغط**:
• التسريع — إضافة موارد · كلفة أعلى · مخاطر أقل
• التتبّع السريع — توازي · بلا كلفة · مخاطر إعادة عمل أعلى
**بعد أي ضغط**: أعد تحليل الشبكة — قد يظهر مسار حرج جديد.`,
 en:`**Schedule and Critical Path**

**Network**: A(4) → B(9) → D(7) → E(3) · and A → C(2) → D
**Paths**: A→B→D→E = **23 weeks** ← critical · A→C→D→E = 16 weeks
**Float**: A·B·D·E = zero · C = **7 weeks**

**When compression is needed**:
• Crashing — add resources · higher cost · lower risk
• Fast tracking — overlap · no cost · higher rework risk
**After any compression**: re-analyse the network — a new critical path may emerge.`},
21:{ar:`**خط أساس التكلفة**

| البند | المبلغ |
|---|---|
| تقديرات حزم العمل | ٧٥٦ مليون |
| احتياطي الطوارئ (داخل خط الأساس) | ٥٦ مليون |
| **خط أساس التكلفة** | **٨١٢ مليون** |
| الاحتياطي الإداري (خارج) | ٢٨ مليون |
| **الميزانية عند الإنجاز BAC** | **٨٤٠ مليون** |

**متطلبات التمويل**: مرحلية مرتبطة بنقاط التوقّف — الدفعة تُفرج بعد إقرار المرحلة.
**التمييز الحاسم**: الطوارئ للمخاطر المعروفة بسلطة مدير المشروع · الإداري للمجهول بسلطة المجلس.`,
 en:`**Cost Baseline**

| Item | Amount |
|---|---|
| Work package estimates | 756 million |
| Contingency reserve (within baseline) | 56 million |
| **Cost baseline** | **812 million** |
| Management reserve (outside) | 28 million |
| **Budget at completion BAC** | **840 million** |

**Funding requirements**: staged against hold points — payment releases after stage approval.
**The decisive distinction**: contingency for known risks under the project manager · management reserve for the unknown under the board.`},
23:{ar:`**سجلّ أصحاب المصلحة — مستخرج**

| الطرف | النفوذ | الاهتمام | الموقف | الاستراتيجية |
|---|---|---|---|---|
| العميل البحري | عالٍ | عالٍ | داعم | أدِرْه عن قرب |
| جمعية التصنيف | عالٍ | عالٍ | محايد | أدِرْه عن قرب |
| مجلس البرنامج | عالٍ | متوسط | داعم | أبقِه راضياً |
| الحوض | متوسط | عالٍ | داعم قوي | أبقِه مُطّلعاً |
| نقابة الحوض | متوسط | عالٍ | متحفّظ | أبقِه مُطّلعاً |

**فجوة الإشراك**: النقابة متحفّظة والمطلوب محايدة — أشركها في قرارات التأهيل.`,
 en:`**Stakeholder Register — Extract**

| Party | Power | Interest | Attitude | Strategy |
|---|---|---|---|---|
| Naval customer | High | High | Supportive | Manage closely |
| Class society | High | High | Neutral | Manage closely |
| Programme board | High | Medium | Supportive | Keep satisfied |
| The yard | Medium | High | Champion | Keep informed |
| Yard union | Medium | High | Resistant | Keep informed |

**Engagement gap**: the union is resistant and neutral is required — involve it in qualification decisions.`},
36:{ar:`**سجلّ المخاطر — المخاطر المحدّدة**

| # | الخطر | الفئة | المصدر |
|---|---|---|---|
| ١ | تأخّر حزمة الدفع | مورّدون | تحليل الوثائق |
| ٢ | عدم توافر مساح التصنيف | تنظيمي | قوائم التحقّق |
| ٣ | رفض زيادات منظومة القتال | فني | السبب الجذري |
| ٤ | نقص اللحّامين المعتمدين | موارد | العصف الذهني |
| ٥ | قيود ضوابط التصدير | خارجي | تحليل SWOT |

**تقرير المخاطر**: التعرّض الكلي مرتفع، ومصدره الأكبر **الاعتماد على أطراف خارجية**
(مورّدون · جمعية تصنيف · شريك تصميم) — ثلاثة من الخمسة.`,
 en:`**Risk Register — Identified Risks**

| # | Risk | Category | Source |
|---|---|---|---|
| 1 | Propulsion package delay | Suppliers | Document analysis |
| 2 | Class surveyor unavailability | Regulatory | Checklists |
| 3 | Combat-system increment rejection | Technical | Root cause analysis |
| 4 | Certified welder shortage | Resources | Brainstorming |
| 5 | Export control constraints | External | SWOT analysis |

**Risk report**: overall exposure is high, driven mainly by **dependence on external parties**
(suppliers · class society · design partner) — three of the five.`},
38:{ar:`**استجابات المخاطر**

| # | الخطر | الاستراتيجية | الإجراء | الاحتياطي |
|---|---|---|---|---|
| ١ | تأخّر الدفع | تخفيف | خطة تصحيحية + ضغط جدول | ٣ أسابيع |
| ٢ | المساح | تخفيف | حجز مبكر + بديل معتمد | ٠٫٤ مليون |
| ٣ | رفض الزيادة | تخفيف | توضيح المعايير عبر ضبط التغيير | ٢ مليون |
| ٤ | اللحّامون | نقل | تعاقد خارجي معتمد | ١٫٢ مليون |
| ٥ | التصدير | نقل | شرط تعاقدي على الشريك | — |

**احتياطي الطوارئ** = مجموع EMV للمخاطر الخمس = **٥٦ مليون**.
**مخاطر ثانوية**: التعاقد الخارجي يُدخل خطر جودة اللحام — يُسجَّل ويُدار.`,
 en:`**Risk Responses**

| # | Risk | Strategy | Action | Reserve |
|---|---|---|---|---|
| 1 | Propulsion delay | Mitigate | Corrective plan + compression | 3 weeks |
| 2 | Surveyor | Mitigate | Early booking + approved alternate | 0.4 million |
| 3 | Increment rejection | Mitigate | Clarify criteria via change control | 2 million |
| 4 | Welders | Transfer | Certified external contracting | 1.2 million |
| 5 | Export controls | Transfer | Contractual condition on the partner | — |

**Contingency reserve** = sum of EMV across the five = **56 million**.
**Secondary risk**: external contracting introduces a weld quality risk — logged and managed.`},
30:{ar:`**مصفوفة RACI**

| النشاط | مدير البرنامج | المجلس | التصنيف | العميل | المورّد |
|---|---|---|---|---|---|
| اعتماد الميثاق | R | **A** | I | C | — |
| تغيير داخل العتبة | **A/R** | I | I | C | I |
| تغيير فوق العتبة | R | **A** | I | C | I |
| اجتياز نقطة توقّف | R | I | **A** | I | C |
| قبول زيادة القتال | R | I | C | **A** | C |
| تسليم حزمة الدفع | C | I | C | I | **A/R** |

**قواعد التحقّق**: A واحد لكل صف · R واحد على الأقل · قلّل C · I للإبلاغ لا الاستشارة.`,
 en:`**RACI Matrix**

| Activity | Prog. Manager | Board | Class | Customer | Supplier |
|---|---|---|---|---|---|
| Approve charter | R | **A** | I | C | — |
| Change within threshold | **A/R** | I | I | C | I |
| Change above threshold | R | **A** | I | C | I |
| Pass hold point | R | I | **A** | I | C |
| Accept combat increment | R | I | C | **A** | C |
| Deliver propulsion | C | I | C | I | **A/R** |

**Validation rules**: exactly one A per row · at least one R · minimize C · I is informed, not consulted.`},
9:{ar:`**تقرير الإغلاق النهائي**

**القبول**: قبول رسمي مكتوب لكل المخرجات · كل نقاط التوقّف مُجتازة · الشهادة صادرة.
**الأداء النهائي**: CPI = ٠٫٩٦ · SPI = ٠٫٩٨ · التسليم بتأخّر أسبوعين داخل التسامح.
**التسوية**: ثلاثة عقود مُغلقة · المطالبات مُسوّاة · الاحتياطيات مُفرجة.
**الانتقال**: فريق التشغيل مُدرَّب · الوثائق مُسلَّمة · نقل المعرفة الضمنية موثّق.

**أبرز ثلاثة دروس**:
١) معايير القبول تُوثَّق وتُعتمد كتابةً **قبل** بدء كل زيادة
٢) حجز مساح التصنيف يبدأ قبل ثمانية أسابيع لا أسبوعين
٣) تسامح العقد الثماني أسابيع أطول مما يحتمله المسار الحرج — يُراجع في الفئة التالية`,
 en:`**Final Closure Report**

**Acceptance**: formal written acceptance of all deliverables · all hold points passed · certificate issued.
**Final performance**: CPI = 0.96 · SPI = 0.98 · delivered two weeks late, within tolerance.
**Settlement**: three contracts closed · claims settled · reserves released.
**Transition**: operations team trained · documentation handed over · tacit knowledge transfer documented.

**Top three lessons**:
1) Acceptance criteria are documented and agreed in writing **before** each increment starts
2) Class surveyor booking begins eight weeks ahead, not two
3) The eight-week contract tolerance exceeds what the critical path can absorb — revise for the next class`}
};

/* ═══════════ ③ سلسلة المخرجات ← المدخلات ═══════════ */
window.CHAIN = (function(){
 const norm=s=>String(s||'').toLowerCase().replace(/[^a-z\u0600-\u06FF ]/g,'').trim();
 return {
  /* أي عمليات تستهلك مخرجات هذه العملية؟ */
  next(n){
    const P=window.PROC; if(!P)return [];
    const src=P.L.find(p=>p.n===n); if(!src)return [];
    const outs=(src.oe||[]).map(norm);
    return P.L.filter(p=>p.n!==n && (p.ie||[]).some(i=>{
      const x=norm(i);
      return outs.some(o=>o&&x&&(x.includes(o)||o.includes(x)));
    })).map(p=>({n:p.n,t:p.t,g:p.g}));
  },
  /* أي عمليات تُنتج مدخلات هذه العملية؟ */
  prev(n){
    const P=window.PROC; if(!P)return [];
    const tgt=P.L.find(p=>p.n===n); if(!tgt)return [];
    const ins=(tgt.ie||[]).map(norm);
    return P.L.filter(p=>p.n!==n && (p.oe||[]).some(o=>{
      const x=norm(o);
      return ins.some(i=>i&&x&&(i.includes(x)||x.includes(i)));
    })).map(p=>({n:p.n,t:p.t,g:p.g}));
  }
 };
})();

/* ═══════════ ④ التصدير والإرسال ═══════════ */
window.EXPORTER = (function(){
'use strict';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const CSS=`<style>
@page{size:A4;margin:16mm}
body{font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#16242e;line-height:1.75;margin:0}
.hd{display:flex;align-items:center;gap:16px;padding:20px 0;border-bottom:3px solid #103040;margin-bottom:22px}
.lg{font-weight:700;font-size:26px;color:#103040;letter-spacing:-.5px}
.lg i{color:#70C0E0;font-style:normal}
.hd h1{flex:1;font-size:19px;margin:0}
.hd .dt{font-size:12px;color:#6b8090}
h2{font-size:16px;color:#103040;border-bottom:2px solid #70C0E0;padding-bottom:5px;margin:24px 0 12px}
h3{font-size:13px;color:#1a5e7d;margin:15px 0 7px}
p{font-size:12.5px;margin:0 0 8px}
table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11.5px}
th{background:#103040;color:#fff;padding:7px 9px;text-align:left;font-weight:600}
td{border:1px solid #d8e3ea;padding:6px 9px;vertical-align:top}
tr:nth-child(even) td{background:#f7fafc}
.kpi{display:flex;gap:9px;flex-wrap:wrap;margin:12px 0}
.kpi>div{flex:1;min-width:95px;border:1.5px solid #d8e3ea;border-radius:9px;padding:11px;text-align:center}
.kpi b{display:block;font-size:20px;color:#103040}
.kpi span{font-size:10px;color:#6b8090}
.kpi .g{color:#2fa87a} .kpi .r{color:#c0392b} .kpi .o{color:#F07000}
.bar{height:9px;background:#eef3f6;border-radius:5px;overflow:hidden;margin:4px 0}
.bar i{display:block;height:100%;background:#2fa87a}
.ft{margin-top:26px;padding-top:12px;border-top:1px solid #d8e3ea;text-align:center;
  font-size:10.5px;color:#6b8090}
.rtl{direction:rtl;text-align:right}
</style>`;
function wrap(title, body, rtl){
  return `<!DOCTYPE html><html dir="${rtl?'rtl':'ltr'}"><head><meta charset="utf-8">
    <title>${esc(title)}</title>${CSS}</head><body class="${rtl?'rtl':''}">
    <div class="hd"><span class="lg">SOMU<i>•</i></span>
      <h1>${esc(title)}</h1>
      <span class="dt">${new Date().toLocaleDateString(rtl?'ar-EG':'en-GB',
        {dateStyle:'medium'})}</span></div>
    ${body}
    <div class="ft">SOMU International Training Centre<br>
      ${rtl?'تصميم وبرمجة د. محمد عطية':'Designed &amp; developed by Dr Mohamed Attia'}</div>
    </body></html>`;
}
return {
  /* PDF عبر الطباعة */
  pdf(title, body, rtl){
    const w=window.open('','_blank','width=900,height=700');
    if(!w){alert(rtl?'اسمح بالنوافذ المنبثقة':'Please allow pop-ups');return}
    w.document.write(wrap(title,body,rtl)); w.document.close();
    setTimeout(()=>{try{w.focus();w.print()}catch(e){}},700);
  },
  /* Word — ملف .doc يفتحه Word */
  word(title, body, rtl){
    const html=wrap(title,body,rtl);
    const blob=new Blob(['\ufeff'+html],{type:'application/msword'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download=title.replace(/[^\w\u0600-\u06FF -]/g,'').slice(0,50)+'.doc'; a.click();
  },
  /* عرض تقديمي HTML بشرائح */
  deck(title, slides, rtl){
    const S=slides.map((s,i)=>`<section class="sl ${s.cls||''}">
      ${s.t?`<h2>${esc(s.t)}</h2>`:''}
      <div class="sb">${s.b}</div>
      ${s.cls?'':`<div class="sf"><span class="sfl">SOMU<i>•</i></span>
        <span class="sft">${esc(title)}</span><span class="sn">${i+1} / ${slides.length}</span></div>`}
    </section>`).join('');
    const w=window.open('','_blank','width=1180,height=780');
    if(!w){alert(rtl?'اسمح بالنوافذ المنبثقة':'Please allow pop-ups');return}
    w.document.write(`<!DOCTYPE html><html dir="${rtl?'rtl':'ltr'}"><head><meta charset="utf-8">
    <title>${esc(title)}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#071823;font-family:'IBM Plex Sans Arabic','IBM Plex Sans',system-ui,sans-serif;
      color:#16242e;overflow:hidden}
    .m{font-family:'IBM Plex Mono',monospace}
    .sl{position:fixed;inset:0;background:#fff;display:none;flex-direction:column;
      padding:44px 60px 66px}
    .sl.on{display:flex;animation:sin .3s cubic-bezier(.16,1,.3,1)}
    @keyframes sin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    .sl h2{font-size:30px;font-weight:700;color:#103040;padding-bottom:14px;margin-bottom:22px;
      border-bottom:4px solid #70C0E0;flex-shrink:0}
    .sb{flex:1;overflow-y:auto;font-size:15px;line-height:1.85}
    .sb::-webkit-scrollbar{width:7px}.sb::-webkit-scrollbar-thumb{background:#cfd9e2;border-radius:4px}
    .sf{position:absolute;bottom:0;inset-inline:0;height:46px;display:flex;align-items:center;
      gap:14px;padding:0 60px;border-top:1px solid #e6ecf2;background:#fbfdfe}
    .sfl{font-family:'IBM Plex Sans';font-weight:700;font-size:17px;color:#103040;direction:ltr}
    .sfl i{color:#70C0E0;font-style:normal}
    .sft{flex:1;font-size:12px;color:#8a99a6}
    .sn{font-size:12px;color:#6b8090;font-family:'IBM Plex Mono'}
    h3{font-size:16px;color:#1a5e7d;margin:18px 0 7px;font-weight:600}
    h3:first-child{margin-top:0}
    p{font-size:14.5px;line-height:1.9;margin-bottom:10px}
    strong,b{font-weight:700;color:#103040}
    table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px}
    th{background:#103040;color:#fff;padding:9px 11px;text-align:start;font-weight:600}
    td{border:1px solid #e0e8ee;padding:8px 11px;vertical-align:top}
    tr:nth-child(even) td{background:#f8fbfc}
    .kpi{display:flex;gap:12px;flex-wrap:wrap;margin:6px 0 18px}
    .kpi>div{flex:1;min-width:118px;border:2px solid #e6ecf2;border-radius:13px;padding:16px 12px;
      text-align:center;background:linear-gradient(180deg,#fbfdfe,#fff)}
    .kpi b{display:block;font-size:30px;color:#103040;font-weight:700;line-height:1.1}
    .kpi.big b{font-size:36px}
    .kpi span{font-size:11.5px;color:#6b8090;margin-top:5px;display:block}
    .kpi .g{color:#2fa87a}.kpi .r{color:#c0392b}.kpi .o{color:#F07000}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:26px}
    .bl{list-style:none}
    .bl li{font-size:14.5px;line-height:1.85;padding-inline-start:24px;position:relative;
      margin-bottom:10px}
    .bl li::before{content:"▸";position:absolute;inset-inline-start:2px;color:#70C0E0;font-size:16px}
    .bl.big li{font-size:17px;margin-bottom:15px}
    .bl li.warn::before{content:"⚠";color:#F07000}
    .bl li.okl::before{content:"✓";color:#2fa87a}
    .ds{width:100%;height:auto;display:block;margin:8px 0}
    .ft-n{font-size:12.5px;color:#6b8090;text-align:center;margin-top:12px}
    .lgd{display:flex;gap:9px;flex-wrap:wrap;font-size:11.5px;color:#6b8090;margin-top:12px}
    .lgd span{display:flex;gap:5px;background:#f4f8fa;border-radius:6px;padding:3px 9px}
    .lgd b{color:#103040}
    /* الغلاف */
    .sl.cover,.sl.end{background:linear-gradient(140deg,#0e2a3c,#154358);color:#fff;
      padding:0;justify-content:center}
    .cv{padding:0 76px;position:relative}
    .cv-lg{font-family:'IBM Plex Sans';font-weight:700;font-size:44px;color:#fff;direction:ltr;
      letter-spacing:-1px;margin-bottom:26px}
    .cv-lg i{color:#70C0E0;font-style:normal}
    .cv-k{font-size:12px;letter-spacing:3.5px;color:#70C0E0;font-weight:600;margin-bottom:14px;
      direction:ltr}
    .cv h1{font-size:46px;font-weight:700;color:#fff;line-height:1.25;margin-bottom:14px}
    .cv-s{font-size:19px;color:#a9c9da;margin-bottom:30px}
    .cv-m{display:flex;gap:11px;flex-wrap:wrap}
    .cv-m span{font-size:12.5px;color:#cfe4ef;background:rgba(255,255,255,.1);
      border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:5px 15px;
      font-family:'IBM Plex Mono'}
    .cv-cr{margin-top:26px;font-size:13px;color:#8fb3c6}
    .cv-bars{position:absolute;bottom:-70px;inset-inline:76px;display:flex;height:6px;
      border-radius:3px;overflow:hidden}
    .cv-bars i{flex:1}
    .cv-bars i:nth-child(1){background:#201080}.cv-bars i:nth-child(2){background:#40C090}
    .cv-bars i:nth-child(3){background:#F07000}.cv-bars i:nth-child(4){background:#70C0E0}
    .sl.end .cv h1{font-size:36px;margin-bottom:22px}
    .rec{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);
      border-radius:15px;padding:24px 28px}
    .rec .bl li{color:#e4eff5}
    .rec .bl li strong,.rec .bl li b{color:#70C0E0}
    .rec .bl li::before{color:#70C0E0}
    /* رحلة المشروع */
    .jr{display:grid;grid-template-columns:repeat(6,1fr);gap:11px}
    .jr-s{text-align:center}
    .jr-d{width:52px;height:52px;border-radius:50%;background:#eef3f6;border:2.5px solid #dfe7ee;
      display:flex;align-items:center;justify-content:center;font-size:21px;margin:0 auto 8px}
    .jr-s.done .jr-d{background:#e3f7ee;border-color:#2fa87a}
    .jr-s.act .jr-d{background:#e8f4fa;border-color:#70C0E0}
    .jr-t b{display:block;font-size:12px;line-height:1.4;font-weight:600}
    .jr-t span{font-size:11px;color:#8a99a6;font-family:'IBM Plex Mono'}
    .jr-s.done .jr-t span{color:#2fa87a;font-weight:600}
    /* الجدوى */
    .scg{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
    .scc{flex:1;min-width:130px;border:1.5px solid #e6ecf2;border-radius:11px;padding:12px;
      text-align:center}
    .scc span{display:block;font-size:11.5px;color:#6b8090;margin-bottom:7px}
    .scd{display:flex;gap:3px;justify-content:center;margin-bottom:6px}
    .scd i{width:15px;height:15px;border-radius:4px;background:#e6ecf2}
    .scd i.on{background:#2fa87a}
    .scc b{font-size:15px;color:#103040}
    /* القرار */
    .vd{display:flex;align-items:center;gap:20px;padding:26px 32px;border-radius:16px;
      border:3px solid}
    .vd.g{background:#f0faf5;border-color:#2fa87a}
    .vd.o{background:#fdf8f1;border-color:#F07000}
    .vd.r{background:#fdf5f4;border-color:#c0392b}
    .vd-i{font-size:42px}
    .vd b{flex:1;font-size:32px;font-weight:700}
    .vd.g b{color:#2fa87a}.vd.o b{color:#a54f00}.vd.r b{color:#c0392b}
    .vd-s{font-size:42px;font-weight:700;color:#103040;font-family:'IBM Plex Mono'}
    /* الميثاق */
    .chb{display:flex;gap:11px;flex-wrap:wrap;margin-bottom:18px}
    .chb-l{flex:1;min-width:130px;background:#f6fafc;border:1.5px solid #e0e8ee;border-radius:11px;
      padding:12px 14px}
    .chb-l span{display:block;font-size:11px;color:#6b8090;margin-bottom:3px}
    .chb-l b{font-size:14px;color:#103040;font-family:'IBM Plex Mono'}
    .chb-l b.g{color:#2fa87a;font-family:inherit}.chb-l b.o{color:#F07000;font-family:inherit}
    /* المصفوفة */
    .mtx{grid-template-columns:1.5fr 1fr;align-items:center}
    .mtl{display:flex;flex-direction:column;gap:7px}
    .mti{display:flex;align-items:center;gap:9px;font-size:13px}
    .mti b{width:24px;height:24px;border-radius:50%;color:#fff;display:flex;align-items:center;
      justify-content:center;font-size:11.5px;flex-shrink:0}
    /* العمليات */
    .pg{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:11px}
    .pgc{border:1.5px solid #e6ecf2;border-radius:12px;padding:13px}
    .pgh{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px}
    .pgh b{font-size:13.5px}
    .pgh span{font-size:12px;color:#6b8090}
    .pgb{height:7px;background:#eef3f6;border-radius:4px;overflow:hidden;margin-bottom:9px}
    .pgb i{display:block;height:100%;background:linear-gradient(90deg,#70C0E0,#2fa87a)}
    .pgl{display:flex;flex-direction:column;gap:3px}
    .pgl span{font-size:11.5px;color:#5a6b78;line-height:1.5}
    /* المقاييس */
    .gau{margin-top:18px}
    .gau-r{display:flex;align-items:center;gap:13px;margin-bottom:11px}
    .gau-r>span{width:46px;font-size:13.5px;font-weight:600;color:#103040}
    .gau-t{flex:1;height:22px;background:#eef3f6;border-radius:11px;position:relative;overflow:hidden}
    .gau-t i{display:block;height:100%;border-radius:11px}
    .gau-t u{position:absolute;top:0;bottom:0;width:2.5px;background:#103040;text-decoration:none}
    .gau-r>b{width:52px;font-size:17px;font-family:'IBM Plex Mono';text-align:end}
    .gau-r>b.g{color:#2fa87a}.gau-r>b.r{color:#c0392b}
    /* التنقّل */
    .nav{position:fixed;bottom:58px;left:50%;transform:translateX(-50%);display:flex;gap:8px;
      z-index:20;opacity:.35;transition:.25s}
    .nav:hover{opacity:1}
    .nav button{width:42px;height:42px;border:0;border-radius:50%;background:#103040;color:#fff;
      font-size:16px;cursor:pointer;box-shadow:0 6px 18px -6px rgba(0,0,0,.45)}
    .nav button:hover{background:#1a4a63;transform:translateY(-2px)}
    .prog{position:fixed;top:0;inset-inline:0;height:4px;background:rgba(255,255,255,.15);z-index:21}
    .prog i{display:block;height:100%;background:#70C0E0;transition:.3s}
    @media print{.nav,.prog{display:none}
      .sl{display:flex!important;position:static;page-break-after:always;height:100vh}}
    </style></head><body>
    <div class="prog"><i id="pg"></i></div>${S}
    <div class="nav"><button onclick="go(-1)">‹</button>
      <button onclick="window.print()" title="PDF">⎙</button>
      <button onclick="go(1)">›</button></div>
    <script>let i=0;const SL=document.querySelectorAll('.sl');
    function upd(){SL.forEach((s,k)=>s.classList.toggle('on',k===i));
      document.getElementById('pg').style.width=((i+1)/SL.length*100)+'%'}
    function go(d){i=Math.max(0,Math.min(SL.length-1,i+d));upd()}
    upd();
    document.onkeydown=e=>{if(['ArrowRight','PageDown',' '].includes(e.key))go(${rtl?-1:1});
      if(['ArrowLeft','PageUp'].includes(e.key))go(${rtl?1:-1});
      if(e.key==='Home'){i=0;upd()}if(e.key==='End'){i=SL.length-1;upd()}};
    <\/script></body></html>`);
    w.document.close();
  },
  /* واتساب */
  whatsapp(num, text){
    window.open('https://wa.me/'+num+'?text='+encodeURIComponent(text),'_blank');
  },
  /* بريد */
  email(subject, text, to){
    window.location.href='mailto:'+(to||'')+'?subject='+encodeURIComponent(subject)
      +'&body='+encodeURIComponent(text);
  }
};
})();
