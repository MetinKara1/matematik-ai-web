"""Generate the committed PDFs from the same JSON used by Next.js.
Requires reportlab; pass --font-dir with DejaVuSans.ttf and DejaVuSans-Bold.ttf.
"""
import argparse,json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,KeepTogether
parser=argparse.ArgumentParser();parser.add_argument('--font-dir',type=Path,required=True);args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
for name,file in [('Study','DejaVuSans.ttf'),('StudyBold','DejaVuSans-Bold.ttf')]:pdfmetrics.registerFont(TTFont(name,str(args.font_dir/file)))
pdfmetrics.registerFontFamily('Study',normal='Study',bold='StudyBold')
styles={
 'title':ParagraphStyle('title',fontName='StudyBold',fontSize=19,leading=26,textColor=colors.HexColor('#30294f'),spaceAfter=10),
 'heading':ParagraphStyle('heading',fontName='StudyBold',fontSize=12,leading=18,spaceBefore=12,spaceAfter=7),
 'body':ParagraphStyle('body',fontName='Study',fontSize=9,leading=14,spaceAfter=6),
 'question':ParagraphStyle('question',fontName='Study',fontSize=10,leading=15,spaceAfter=6),
 'small':ParagraphStyle('small',fontName='Study',fontSize=8,leading=12,textColor=colors.HexColor('#5e586e'),spaceAfter=5),
}
def p(text,style='body'):return Paragraph(escape(text),styles[style])
for r in json.loads((root/'lib/studyResources.json').read_text()):
 url='https://matematik-ai.com/kaynaklar/'+r['slug']
 def footer(canvas,doc):
  canvas.setFont('Study',7);canvas.setFillColor(colors.HexColor('#5e586e'));canvas.drawString(40,33,'MatAI İçerik Ekibi | 4 Ekim 2026 | '+str(doc.page)+'/2')
  canvas.drawString(40,22,url);canvas.linkURL(url,(40,18,555,31),relative=0)
 doc=SimpleDocTemplate(str(root/'public/kaynaklar'/f"{r['slug']}.pdf"),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=38,bottomMargin=48,title=r['title'],author='MatAI İçerik Ekibi')
 story=[p('MatAI | Ücretsiz çalışma kaynağı','small'),p(r['title'],'title'),p(r['level']+' | 6 alıştırma | Sorular ve kısa tekrar','small'),p(r['intro']),p('Kısa tekrar','heading')]
 story.extend(p('• '+s) for s in r['summary'])
 story.append(p('Önce kendin çöz','heading'))
 for i,q in enumerate(r['questions'],1):story.append(KeepTogether([p(f"{i}. {q['prompt']}",'question'),Spacer(1,20)]))
 story.extend([PageBreak(),p('Açıklamalı cevap anahtarı','title'),p(r['title'],'small')])
 for i,q in enumerate(r['questions'],1):story.append(KeepTogether([p(f"{i}. {q['answer']}",'heading'),p(q['explanation'])]))
 story.append(p('Çalışmaya devam et','heading'))
 for l in r['lessons']:
  story.append(p(l['title']+' - https://matematik-ai.com/makaleler/'+l['slug'],'small'))
 story.append(p('Kaynak bağlantısını koruyarak kişisel çalışmanda ve dersinde ücretsiz kullanabilir ve paylaşabilirsin. Bu seçki tüm müfredatı veya sınav kapsamını temsil etmez.','small'))
 doc.build(story,onFirstPage=footer,onLaterPages=footer)
 print(r['slug']+'.pdf')
