'use client';
import WebsiteInventory from '../../WebsiteInventory';
const headers=()=>({Authorization:`Bearer ${localStorage.getItem('authToken')||''}`});
export default function WebsiteContent(){return <WebsiteInventory showHeading={false} endpoint="/api/admin-website-content" requestHeaders={headers}/>;}
