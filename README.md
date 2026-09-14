# SOMU — PMP® Platform

ملف واحد مكتفٍ بذاته. **ارفع هذا المجلّد كما هو.**

---

## 🚀 Vercel — ثلاث خطوات

### الطريقة الأولى: السحب والإفلات (الأسرع)
١) افتح **vercel.com/new**
٢) اسحب **هذا المجلّد كاملاً** (لا الملف وحده) إلى الصفحة
٣) اضغط **Deploy** — انتهى

### الطريقة الثانية: من GitHub
١) ارفع المجلّد إلى مستودع
٢) **vercel.com/new** ← **Import Git Repository**
٣) في **Framework Preset** اختر **Other**
٤) اترك **Build Command** و**Output Directory** **فارغين**
٥) **Deploy**

### ⚠️ أشيع سببين للفشل
| السبب | الحل |
|---|---|
| اسم الملف عربي أو فيه مسافة | الملف هنا اسمه `index.html` بالإنجليزية — **لا تُعِد تسميته** |
| Vercel يحاول البناء | اختر Framework Preset = **Other** واترك أوامر البناء فارغة |

---

## 🐙 GitHub Pages

### بلا سطر أوامر
١) **github.com/new** ← أنشئ مستودعاً **عاماً (Public)**
٢) **Add file → Upload files**
٣) اسحب **كل محتويات هذا المجلّد** (بما فيها `.nojekyll`)
٤) **Commit**
٥) **Settings → Pages** ← **Source: GitHub Actions**
٦) انتظر دقيقتين — الرابط يظهر في Settings → Pages

### بسطر الأوامر
```bash
cd deploy
git init -b main
git add -A
git commit -m "SOMU PMP platform"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```
ثم **Settings → Pages → Source: GitHub Actions**.

### ⚠️ أشيع ثلاثة أسباب للفشل
| السبب | الحل |
|---|---|
| صفحة بيضاء | ملف `.nojekyll` **موجود هنا** — تأكّد أنه رُفع (فعّل إظهار الملفات المخفية) |
| الملف لا يُرفع | حجمه ٢٫٧ ميجا — حدّ GitHub للملف الواحد **١٠٠ ميجا**، فلا مشكلة. لو فشل الرفع بالسحب، استخدم سطر الأوامر |
| 404 | `index.html` يجب أن يكون في **جذر** المستودع لا داخل مجلّد |

---

## 📁 ما في هذا المجلّد
```
index.html              المنصّة كاملة — 2.7 MB
vercel.json             إعداد Vercel (ترميز UTF-8 وعدم التخزين المؤقّت)
.nojekyll               يمنع GitHub Pages من معالجة الملفات
.gitattributes          يمنع تحويل نهايات الأسطر
.gitignore
.github/workflows/      نشر تلقائي على GitHub Pages
```

---

## ✅ بعد النشر
افتح الرابط وتأكّد من:
- ظهور العربية سليمة (لا مربّعات) ← الترميز صحيح
- عمل الكاميرا في جلسة اللجنة ← **يحتاج HTTPS** وكلاهما يوفّره
- حفظ بياناتك عند العودة ← `localStorage` يعمل

---

*تصميم وبرمجة د. محمد عطية · SOMU International Training Centre*
