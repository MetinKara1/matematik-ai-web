import {NextResponse} from 'next/server';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import sitemap from './app/sitemap';
import {prefersMarkdown} from './lib/accept-markdown';
import {getCloudflareContext} from '@opennextjs/cloudflare';
export async function proxy(request){
 const pathname=request.nextUrl.pathname.replace(/\/$/,'')||'/';
 if(!['GET','HEAD'].includes(request.method))return NextResponse.next();
 const entry=sitemap().find(item=>(new URL(item.url).pathname.replace(/\/$/,'')||'/')===pathname);
 if(!entry)return NextResponse.next();
 if(prefersMarkdown(request.headers.get('accept')||'')){
 const relative=pathname==='/'?'index.md':pathname.slice(1)+'.md';
 let body;
 try {const assets=getCloudflareContext().env.ASSETS;if(assets){const asset=await assets.fetch(new Request(new URL('/ai-markdown/'+relative,request.url)));if(asset.ok)body=await asset.text();}}catch{/* Local Next preview has no Cloudflare binding. */}
 if(body===undefined){try{body=await readFile(path.join(process.cwd(),'public','ai-markdown',relative),'utf8');}catch{/* Missing export falls back to HTML, never a private source. */}}
 if(body!==undefined)return new NextResponse(request.method==='HEAD'?null:body,{headers:{'Content-Type':'text/markdown; charset=utf-8','Vary':'Accept','Cache-Control':'public, max-age=0, s-maxage=3600','Link':'<'+entry.url+'>; rel="canonical"'}});
 }
 const response=NextResponse.next();response.headers.append('Vary','Accept');return response;
}
export const config={matcher:['/((?!api|malcolmX|solution|_next|ai-markdown).*)']};
