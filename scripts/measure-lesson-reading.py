from html.parser import HTMLParser
from pathlib import Path
import urllib.request,re,json,math,sys
class Text(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.words=[]
 def handle_starttag(self,tag,attrs):
  if tag in ('br','img','input','meta','link','hr','source','wbr'):return
  a=dict(attrs);active=any(x[2] for x in self.stack) or a.get('class')=='article-body'
  skip=(self.stack[-1][1] if self.stack else False) or tag in ('nav','aside','svg','script','style','details') or any(k in a.get('class','').split() for k in ('article-trust','article-cta','lesson-next-steps'))
  self.stack.append((tag,skip,active))
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==tag:self.stack=self.stack[:i];break
 def handle_data(self,s):
  if self.stack and self.stack[-1][2] and not self.stack[-1][1]:self.words.extend(re.findall(r'\S+',s))
r=Path(__file__).resolve().parents[1]
if len(sys.argv) != 2:
 raise SystemExit('Usage: python3 scripts/measure-lesson-reading.py http://localhost:PORT')
base=sys.argv[1].rstrip('/')
slugs=re.findall(r"^  '([^']+)':",(r/'lib/lessonScope.js').read_text(),re.M)
rows={}
for slug in slugs:
 html=urllib.request.urlopen(base+'/makaleler/'+slug).read().decode();p=Text();p.feed(html)
 rows[slug]={'words':len(p.words),'minutes':max(1,math.ceil(len(p.words)/180))}
print(json.dumps(rows,ensure_ascii=False,indent=2))
