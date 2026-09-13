/* ============================================================
   ① معالج إعداد الاختبار  ② المراقب الافتراضي  ③ الشهادة
   SOMU International Training Centre
   ============================================================ */

window.EXAMSETUP = {
 steps:[
 {k:'lang', ic:'🌐', t:['لغة الاختبار','Exam language'],
  d:['اختر اللغة التي ستؤدّي بها الاختبار — كما تختارها في الاختبار الحقيقي.',
     'Choose the language you will sit the exam in — as you do in the real exam.'],
  o:[['ar','🇸🇦','العربية','Arabic','الأسئلة والخيارات والشرح بالعربية','Questions, options and explanations in Arabic'],
     ['en','🇬🇧','English','English','الأسئلة والخيارات والشرح بالإنجليزية','Questions, options and explanations in English']]},
 {k:'mode', ic:'📍', t:['مكان الاختبار','Where you sit'],
  d:['الاختبار الحقيقي يُؤدّى في مركز معتمد أو عبر الإنترنت من منزلك.',
     'The real exam is taken at an authorized centre or online from home.'],
  o:[['center','🏢','مركز اختبار','Test centre','بيئة مضبوطة · مراقب حاضر · بلا كاميرا شخصية',
      'Controlled environment · on-site invigilator · no personal camera'],
     ['online','💻','عبر الإنترنت','Online proctored','من منزلك · يتطلّب مراقبة',
      'From home · requires proctoring']]},
 {k:'proctor', ic:'📹', t:['المراقبة','Proctoring'],
  d:['الاختبار الحقيقي عبر الإنترنت مراقَب دائماً. جرّبه كما هو.',
     'The real online exam is always proctored. Experience it as it is.'],
  onlyIf:{mode:'online'},
  o:[['on','🔴','مراقبة كاملة','Full proctoring','الكاميرا تعمل · المراقب ينبّهك على المخالفات',
      'Camera on · the invigilator warns you on violations'],
     ['off','⚪','بلا مراقبة','No proctoring','تدريب حرّ — لا يحاكي الاختبار الحقيقي',
      'Free practice — does not simulate the real exam']]}
 ]
};

/* ═══════════ المراقب الافتراضي ═══════════ */
window.PROCTOR = (function(){
'use strict';
let S=null, stream=null, vid=null, timers=[], lastWarn=0;
const RULES=[
 {k:'blur', w:2,
  ar:'أرجو البقاء على شاشة الاختبار. مغادرة النافذة مخالفة مسجّلة.',
  en:'Please remain on the exam screen. Leaving the window is a recorded violation.'},
 {k:'hidden', w:3,
  ar:'لاحظت أنك غادرت الصفحة. تكرار ذلك قد يُبطل اختبارك.',
  en:'I noticed you left the page. Repeating this may void your exam.'},
 {k:'copy', w:3,
  ar:'محاولة نسخ محتوى الاختبار مخالفة جسيمة. توقّف من فضلك.',
  en:'Attempting to copy exam content is a serious violation. Please stop.'},
 {k:'devtools', w:3,
  ar:'فتح أدوات المطوّر غير مسموح أثناء الاختبار.',
  en:'Opening developer tools is not permitted during the exam.'},
 {k:'print', w:3,
  ar:'طباعة الاختبار أو تصويره غير مسموح.',
  en:'Printing or capturing the exam is not permitted.'},
 {k:'noface', w:1,
  ar:'أرجو البقاء أمام الكاميرا طوال الاختبار.',
  en:'Please stay in front of the camera throughout the exam.'},
 {k:'multi', w:2,
  ar:'يجب أن تكون وحدك في الغرفة. وجود شخص آخر مخالفة.',
  en:'You must be alone in the room. The presence of another person is a violation.'}
];
function speak(txt, lang){
  try{ if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(txt);
    u.lang=lang==='ar'?'ar-SA':'en-GB'; u.rate=.97; u.pitch=.9;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
return {
 rules:RULES,
 async start(state, onWarn){
   S=state; S.violations=S.violations||[]; S.pWarn=S.pWarn||0;
   try{ stream=await navigator.mediaDevices.getUserMedia({video:{width:320,height:240},audio:false});
     S.camOn=true;
   }catch(e){ S.camOn=false; S.camErr=true; }
   const warn=(k)=>{
     const r=RULES.find(x=>x.k===k); if(!r)return;
     const now=Date.now(); if(now-lastWarn<4000)return; lastWarn=now;
     S.violations.push({k, at:now, w:r.w});
     S.pWarn+=r.w;
     const lang=S.lang||'ar';
     speak(lang==='ar'?r.ar:r.en, lang);
     if(onWarn)onWarn(r, S.pWarn);
   };
   this._warn=warn;
   const onBlur=()=>{if(S&&!S.submitted)warn('blur')};
   const onVis=()=>{if(document.hidden&&S&&!S.submitted)warn('hidden')};
   const onCopy=e=>{if(S&&!S.submitted){e.preventDefault();warn('copy')}};
   const onKey=e=>{ if(!S||S.submitted)return;
     const k=(e.key||'').toLowerCase(), m=e.ctrlKey||e.metaKey;
     if(e.key==='F12'||(m&&e.shiftKey&&['i','j','c'].includes(k))){e.preventDefault();warn('devtools')}
     if(m&&k==='p'){e.preventDefault();warn('print')}
     if(k==='printscreen'){e.preventDefault();warn('print')}
   };
   window.addEventListener('blur',onBlur);
   document.addEventListener('visibilitychange',onVis);
   document.addEventListener('copy',onCopy,true);
   document.addEventListener('keydown',onKey,true);
   this._off=()=>{ window.removeEventListener('blur',onBlur);
     document.removeEventListener('visibilitychange',onVis);
     document.removeEventListener('copy',onCopy,true);
     document.removeEventListener('keydown',onKey,true); };
   return S.camOn;
 },
 attach(el){ if(!el||!stream)return; vid=el; try{el.srcObject=stream}catch(e){} },
 stop(){ if(this._off)this._off();
   timers.forEach(clearTimeout); timers=[];
   if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
   try{window.speechSynthesis&&window.speechSynthesis.cancel()}catch(e){}
 },
 /* تحقّق دوري بسيط — يُستدعى من المؤقّت */
 tick(){ if(!S||S.submitted)return;
   /* كل ٩٠ ثانية بلا تفاعل يُعدّ غياباً محتملاً */
   const idle=Date.now()-(S.lastAct||Date.now());
   if(idle>120000 && this._warn){ S.lastAct=Date.now(); this._warn('noface'); }
 },
 verdict(S2){
   const w=(S2.pWarn||0);
   return w>=8?'void' : w>=5?'flag' : 'clean';
 }
};
})();

/* ═══════════ الشهادة ═══════════ */
window.CERT = {
 no(learner){
   let h=0; const s=String(learner||'')+new Date().toDateString();
   for(let i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;
   return 'SOMU-PMP-'+new Date().getFullYear()+'-'+('0000'+(Math.abs(h)%10000)).slice(-4);
 },
 html(o){
   const ar=o.lang==='ar';
   const D=new Date().toLocaleDateString(ar?'ar-EG':'en-GB',{dateStyle:'long'});
   return `<div class="cert" id="certDoc">
     <div class="cert-b">
       <div class="cert-hd">
         <div class="cert-lg">SOMU<i>•</i></div>
         <div class="cert-org">SOMU INTERNATIONAL TRAINING CENTRE</div>
       </div>
       <div class="cert-t">${ar?'شهادة إتمام':'CERTIFICATE OF ACHIEVEMENT'}</div>
       <div class="cert-r">${ar?'تشهد مؤسسة SOMU الدولية للتدريب بأن':'This is to certify that'}</div>
       <div class="cert-n">${o.name}</div>
       <div class="cert-r">${ar
         ?'قد أتمّ بنجاح برنامج <b>مهارات إدارة المشاريع — التحضير لاختبار PMP®</b><br>وحقّق النتيجة المبيّنة أدناه في المحاكاة الكاملة'
         :'has successfully completed the <b>Project Management Skills — PMP® Exam Preparation</b> programme<br>and achieved the result shown below in the full mock examination'}</div>
       <div class="cert-sc">
         <div><b>${o.pct}%</b><span>${ar?'النتيجة':'Score'}</span></div>
         <div><b>${o.right}/${o.total}</b><span>${ar?'الإجابات الصحيحة':'Correct'}</span></div>
         <div><b>${o.mins}</b><span>${ar?'دقيقة':'Minutes'}</span></div>
       </div>
       ${o.doms&&o.doms.length?`<table class="cert-dm"><tr>
         ${o.doms.map(d=>`<th>${ar?d.ar:d.en}</th>`).join('')}</tr><tr>
         ${o.doms.map(d=>`<td>${d.pct}%</td>`).join('')}</tr></table>`:''}
       <div class="cert-std">
         <span>${ar?'مُقدَّم وفق أفضل الممارسات الدولية في إدارة المشاريع'
           :'Delivered in line with international good practice in project management'}</span>
         <div class="cert-sb">
           <span>PMBOK® Guide — 8th Edition</span>
           <span>PMP® ECO — July 2026</span>
           <span>ANSI/PMI 99-001</span>
           <span>ISO 21500 / 21502</span>
         </div>
       </div>
       <div class="cert-ft">
         <div class="cert-sg">
           <div class="cert-sgl">${o.trainerSig?`<img src="${o.trainerSig}">`:''}</div>
           <b>${ar?'د. محمد عطية':'Dr Mohamed Attia'}</b>
           <span>${ar?'المدرّب المعتمد':'Lead Trainer'}</span>
         </div>
         <div class="cert-seal">
           <div class="cert-sl"><b>SOMU</b><span>VERIFIED</span><i>${o.no}</i></div>
         </div>
         <div class="cert-sg">
           <div class="cert-sgl"></div>
           <b>SOMU ITC</b>
           <span>${ar?'مركز سومو الدولي للتدريب':'International Training Centre'}</span>
         </div>
       </div>
       <div class="cert-meta">
         <span>${ar?'رقم الشهادة':'Certificate no.'}: <b>${o.no}</b></span>
         <span>${ar?'التاريخ':'Date'}: <b>${D}</b></span>
         <span>${ar?'المدة':'Duration'}: <b>${ar?'٣٥ ساعة تدريبية':'35 contact hours'}</b></span>
       </div>
     </div>
   </div>`;
 },
 /* نصّ الإفادة الرسمية لفريق المشروع */
 attestation(o){
   const ar=o.lang==='ar';
   const D=new Date().toLocaleDateString(ar?'ar-EG':'en-GB',{dateStyle:'long'});
   return `<div class="cert att" id="certDoc">
     <div class="cert-b">
       <div class="cert-hd">
         <div class="cert-lg">SOMU<i>•</i></div>
         <div class="cert-org">SOMU INTERNATIONAL TRAINING CENTRE</div>
       </div>
       <div class="cert-t sm">${ar?'إفادة تطبيق ممارسات إدارة المشاريع'
         :'ATTESTATION OF PROJECT MANAGEMENT PRACTICE'}</div>
       <div class="att-b">
         <p>${ar?`تشهد مؤسسة SOMU الدولية للتدريب بأن فريق مشروع <b>${o.project}</b>
           قد نفّذ دورة حياة المشروع كاملةً ضمن بيئة تطبيقية محكومة، وأنجز المراحل
           والعمليات المبيّنة أدناه.`
           :`SOMU International Training Centre attests that the project team of
           <b>${o.project}</b> executed the complete project lifecycle within a governed
           applied environment, completing the stages and processes shown below.`}</p>
         <div class="cert-sc">
           <div><b>${o.stages}</b><span>${ar?'مرحلة':'Stages'}</span></div>
           <div><b>${o.procs}/40</b><span>${ar?'عملية':'Processes'}</span></div>
           <div><b>${o.pct}%</b><span>${ar?'الإنجاز':'Completion'}</span></div>
         </div>
         <p>${ar?`نُفّذ التطبيق بما يتوافق مع <b>أفضل الممارسات الدولية</b> المعتمدة في
           دليل <span class="iso">PMBOK® Guide</span> الإصدار الثامن، ونطاق اختبار
           <span class="iso">PMP®</span> الساري من يوليو ٢٠٢٦، بما يتّسق مع
           المعيار الأمريكي <span class="iso">ANSI/PMI 99-001</span> والمعيارين الدوليين
           <span class="iso">ISO 21500</span> و<span class="iso">ISO 21502</span>.`
           :`The application was carried out in conformance with <b>international good practice</b>
           as set out in the <span class="iso">PMBOK® Guide</span> Eighth Edition and the
           <span class="iso">PMP®</span> Examination Content Outline effective July 2026,
           consistent with <span class="iso">ANSI/PMI 99-001</span> and
           <span class="iso">ISO 21500</span> and <span class="iso">ISO 21502</span>.`}</p>
         ${o.members&&o.members.length?`<h4>${ar?'أعضاء الفريق':'Team members'}</h4>
           <ul class="att-m">${o.members.map(m=>`<li>${m}</li>`).join('')}</ul>`:''}
       </div>
       <div class="cert-std">
         <div class="cert-sb">
           <span>PMBOK® Guide — 8th Edition</span><span>PMP® ECO — July 2026</span>
           <span>ANSI/PMI 99-001</span><span>ISO 21500</span><span>ISO 21502</span>
         </div>
       </div>
       <div class="cert-ft">
         <div class="cert-sg">
           <div class="cert-sgl">${o.trainerSig?`<img src="${o.trainerSig}">`:''}</div>
           <b>${ar?'د. محمد عطية':'Dr Mohamed Attia'}</b>
           <span>${ar?'المدرّب المعتمد':'Lead Trainer'}</span>
         </div>
         <div class="cert-seal"><div class="cert-sl">
           <b>SOMU</b><span>ATTESTED</span><i>${o.no}</i></div></div>
         <div class="cert-sg">
           <div class="cert-sgl"></div><b>SOMU ITC</b>
           <span>${ar?'مركز سومو الدولي للتدريب':'International Training Centre'}</span></div>
       </div>
       <div class="cert-meta">
         <span>${ar?'رقم الإفادة':'Attestation no.'}: <b>${o.no}</b></span>
         <span>${ar?'التاريخ':'Date'}: <b>${D}</b></span>
       </div>
       <div class="att-dis">${ar
         ?'هذه إفادة تدريبية صادرة عن SOMU وليست شهادة اعتماد من PMI® أو ISO.'
         :'This is a training attestation issued by SOMU. It is not a PMI® or ISO accreditation.'}</div>
     </div>
   </div>`;
 }
};
