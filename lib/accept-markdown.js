export function prefersMarkdown(accept) {
 const entries=accept.toLowerCase().split(',').map(part=>{const [type,...params]=part.trim().split(';');const q=params.find(p=>p.trim().startsWith('q='));return {type:type.trim(),q:q?Number(q.trim().slice(2)):1};});
 const md=entries.find(x=>x.type==='text/markdown');if(!md||!Number.isFinite(md.q)||md.q<=0||md.q>1)return false;
 const html=entries.find(x=>x.type==='text/html')??entries.find(x=>x.type==='text/*')??entries.find(x=>x.type==='*/*');
 return md.q>=(html?.q??0);
}
