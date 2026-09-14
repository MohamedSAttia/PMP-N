#!/usr/bin/env python3
"""يبني نسخة عامة للمتدربين — تبويب الإدارة محذوف من الكود نهائياً."""
import io, os, re, subprocess, sys
d=os.path.dirname(os.path.abspath(__file__))
subprocess.run([sys.executable, os.path.join(d,'build.py')], check=True)
p=os.path.join(d,'index.html')
s=io.open(p,encoding='utf-8').read()
before=len(s)
# اقطع وضع المدرّب — الإدارة تصير غير قابلة للفتح
s=s.replace("code:'somu2026',", "code:'\\u0000DISABLED\\u0000',")
s=s.replace("on(){ return D_.get('trainer',false)===true }", "on(){ return false }")
out=os.path.join(d,'index-public.html')
io.open(out,'w',encoding='utf-8').write(s)
print(f'✅ index-public.html — {round(len(s)/1024)} KB · وضع المدرّب معطّل نهائياً')
