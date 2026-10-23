// Generate alternative representations from the exact prerendered public HTML.
// No HTTP fetches, private routes, invented bylines or synthetic content dates.
import {readFile,writeFile,mkdir,readdir,rm} from 'node:fs/promises';
import path from 'node:path';
import config from '../ai-content.config.mjs';
export function decode(s) {return s.replace(/&#(x[\da-f]+|\d+);/gi,(_,n)=>{const code=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n);return code>0&&code<=0x10ffff?String.fromCodePoint(code):''}).replace(/&(amp|lt|gt|quot|apos|nbsp|ndash|mdash|rsquo|lsquo|rdquo|ldquo|hellip);/g,(_,n)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘',rdquo:'”',ldquo:'“',hellip:'…'}[n]));}
export function markdown(html,origin) {
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);if(!main)return '';
 let out='',stack=[],math=0,tex='';
 const skip=new Set(['script','style','nav','aside','button','svg','noscript']);
 const voids=new Set(['br','img','input','meta','link','hr','source','wbr','area','embed']);
 for(const token of main[1].match(/<[^>]*>|[^<]+/g)||[]) {
  if(!token.startsWith('<')) {if(stack.some(x=>x.skip))continue;if(math){if(stack.some(x=>x.tag==='annotation'))tex+=decode(token);continue;}out+=decode(token);continue;}
  const close=token.match(/^<\/([\w-]+)/);if(close){const tag=close[1].toLowerCase();const i=stack.map(x=>x.tag).lastIndexOf(tag);if(i<0)continue;const current=stack[i];const ignored=stack.some(x=>x.skip);stack=stack.slice(0,i);
   if(tag==='math'){math--;if(!ignored)out+=' $'+tex.trim()+'$ ';tex='';}
   if(ignored)continue;
   if(tag==='a'&&current.href)out+=`](${new URL(current.href,origin).href})`;
   if(/^(p|section|article|div|details|h[1-6]|ul|ol|table|tr|blockquote|pre)$/.test(tag))out+='\n\n';else if(tag==='li')out+='\n';else if(tag==='td'||tag==='th')out+=' | ';
   continue;}
  const match=token.match(/^<([\w-]+)/);if(!match)continue;const tag=match[1].toLowerCase();
  const ignored=stack.some(x=>x.skip)||skip.has(tag)||/class="[^"]*\bkatex-html\b/.test(token)||/aria-hidden="true"/.test(token);
  const href=token.match(/\bhref="([^"]+)"/)?.[1];
  if(!ignored){if(/^h[1-6]$/.test(tag))out+='\n\n'+'#'.repeat(Number(tag[1]))+' ';if(tag==='li')out+='\n- ';if(tag==='br')out+='\n';if(tag==='hr')out+='\n\n---\n\n';if(tag==='a'&&href)out+='[';if(tag==='math'){math++;tex='';}}
  if(!voids.has(tag)&&!token.endsWith('/>'))stack.push({tag,skip:ignored,href:href?decode(href):undefined});
 }
 return out.replace(/[ \t]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim()+'\n';
}
async function files(dir){const all=await readdir(dir,{withFileTypes:true});return (await Promise.all(all.map(x=>x.isDirectory()?files(path.join(dir,x.name)):[path.join(dir,x.name)]))).flat();}
export async function generate(){
 const docs=[];const destination='public/ai-markdown';await rm(destination,{recursive:true,force:true});await mkdir(destination,{recursive:true});
 for(const file of await files('.next/server/app')){
  if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');
  if(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html))continue;
  const canonical=html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];if(!canonical)continue;
  const url=new URL(decode(canonical),config.origin);const pathname=url.pathname.replace(/\/$/,'')||'/';
  if(url.origin!==config.origin||config.exclude.some(p=>pathname.startsWith(p))||!config.prefixes.some(p=>pathname.startsWith(p)))continue;
  const body=markdown(html,config.origin);if(!/^# /m.test(body))continue;
  const title=decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||pathname);
  const document=`<!-- Public alternate representation. Source: ${config.origin}${pathname==='/'?'':pathname} -->\n\n${body}\nCanonical: ${config.origin}${pathname==='/'?'':pathname}\n`;
  const target=path.join(destination,pathname==='/'?'index.md':pathname.slice(1)+'.md');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,document);
  docs.push({title,path:pathname,body:document});
 }
 docs.sort((a,b)=>a.path.localeCompare(b.path));if(!docs.length)console.log('Publication preview: no indexable public pages exported.');
 const links=docs.map(x=>`- [${x.title}](${config.origin}${x.path==='/'?'':x.path})`);
 await writeFile('public/llms.txt',[`# ${config.name}`,`> ${config.summary}`,'## Purpose and method',config.summary,'## About, policies and support',...config.policies.map(p=>`- ${config.origin}${p}`),'## Public pages and guides',...links,'## Access','Request a listed canonical page with Accept: text/markdown for its public text. HTML remains the default. /llms-full.txt combines these public pages. Publication dates and author information are copied only when present in the page; no new review date is inferred from this export. Interactive controls are omitted.','## Crawling','The existing public crawling policy remains in force. Administrative, API and private content is excluded. robots.txt is not an authentication mechanism. No claim is made about real crawler IP access or inclusion in AI answers.'].join('\n\n')+'\n');
 await writeFile('public/llms-full.txt',`# ${config.name} — public content\n\n${config.summary}\n\n`+docs.map(x=>x.body).join('\n\n---\n\n'));
 console.log(`AI export: ${docs.length} canonical public pages, llms.txt and llms-full.txt.`);
 return docs;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname))await generate();
