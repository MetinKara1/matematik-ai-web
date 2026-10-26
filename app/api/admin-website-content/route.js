import { loadAdminWebsiteInventory } from '../../../lib/admin-website-inventory.mjs';
export async function GET(request) {
 const header=request.headers.get('authorization')||'';
 const token=header.startsWith('Bearer ')?header.slice(7):'';
 if(!token)return Response.json({message:'Yönetici girişi gerekiyor.'},{status:401});
 const result=await loadAdminWebsiteInventory(token,process.env.NEXT_PUBLIC_API_BASE_URL||'https://api.matematik-ai.com',fetch,'dashboard/stats');
 return Response.json(result.body,{status:result.status,headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}
