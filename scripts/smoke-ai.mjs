import assert from 'node:assert/strict';
import config from '../ai-content.config.mjs';
const base=process.env.TEST_URL;if(!base)throw Error('Set TEST_URL to a local or deployed public site.');
const pathname=config.prefixes[0]==='/'?'/':config.prefixes[0];
for(const [accept,type] of [['text/html','text/html'],['text/markdown','text/markdown'],['text/markdown;q=0','text/html'],['text/html, text/markdown;q=0.5','text/html']]){
 const response=await fetch(base+pathname,{headers:{Accept:accept}});assert.equal(response.status,200);assert.ok(response.headers.get('content-type')?.includes(type),accept);assert.ok(response.headers.get('vary')?.toLowerCase().split(',').map(s=>s.trim()).includes('accept'));if(type==='text/markdown')assert.match(await response.text(),/^# /m);
}
const head=await fetch(base+pathname,{method:'HEAD',headers:{Accept:'text/markdown'}});assert.equal(head.status,200);assert.ok(head.headers.get('content-type')?.includes('text/markdown'));assert.equal(await head.text(),'');
for(const path of ['/llms.txt','/llms-full.txt']){const response=await fetch(base+path);assert.equal(response.status,200);assert.ok(response.headers.get('cache-control')?.includes('public'));assert.ok((await response.text()).length>300);}
assert.equal((await fetch(base+'/__missing_ai_test__')).status,404);
assert.equal((await fetch(base+'/ai-markdown/malcolmX.md')).status,404);
console.log('PASS: HTML/Markdown/HEAD, Accept q=0, Vary, public llms cache and private/missing export exclusion.');
