#!/usr/bin/env python3
import io, os
d=os.path.dirname(os.path.abspath(__file__))
R=lambda p: io.open(os.path.join(d,p),encoding='utf-8').read()
out=R('src/01-shell.html')
for ph,f in [('/*I18*/','src/02-i18n-generator.js'),('/*EXAM*/','src/03-exam-setup-cert.js'),
             ('/*CASES*/','src/05-mock-cases.js'),('/*SIMS*/','src/06-simulations-ar.js'),
             ('/*SIMSEN*/','src/07-simulations-en.js'),('/*TMPL*/','src/08-panel-templates.js'),
             ('/*TOOLS*/','src/09-tools-export.js'),('/*LIFE*/','src/10-lifecycle-data.js'),
             ('/*LIFEUI*/','src/11-lifecycle-ui.js'),('/*ENGINE*/','src/12-engine.js'),
             ('/*SOMU*/','data/course-content.json')]:
    out=out.replace(ph, R(f))
out=out.replace('/*EX2*/','')
out=out.replace('/*DATA*/','{"q":'+R('data/questions-bank.json')+'}')
io.open(os.path.join(d,'index.html'),'w',encoding='utf-8').write(out)
io.open(os.path.join(d,'deploy','index.html'),'w',encoding='utf-8').write(out)
print(f'✅ index.html — {round(len(out)/1024)} KB')
