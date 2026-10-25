import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Wallet, AlertCircle } from "lucide-react";

const money=(n)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n||0);
export default function Payments(){
 const [payments,setPayments]=useState([]);const [note,setNote]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(true);
 useEffect(()=>{api.get("/client/payments").then(r=>{setPayments(r.payments||[]);setNote(r.note||"");}).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
 const total=payments.reduce((s,p)=>s+(Number(p.amount)||0),0);
 return <section className="mx-auto max-w-6xl space-y-6"><div><h1 className="text-2xl font-bold text-slate-900">Payments & Invoices</h1><p className="mt-1 text-sm text-slate-500">Project budget summaries from the backend.</p></div>{error&&<p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{note&&<p className="flex gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"><AlertCircle size={18} className="shrink-0"/>{note}</p>}
 <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5"><Wallet className="text-blue-600"/><p className="mt-4 text-sm text-slate-500">Total project budget</p><p className="mt-1 text-2xl font-bold text-slate-900">{money(total)}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Project records</p><p className="mt-1 text-2xl font-bold text-slate-900">{payments.length}</p></div></div>
 <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-100 p-5"><h2 className="font-bold text-slate-900">Project payment summaries</h2></div>{loading?<p className="p-5 text-sm text-slate-500">Loading…</p>:!payments.length?<p className="p-8 text-center text-sm text-slate-500">No project budget records yet.</p>:<div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Project</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr></thead><tbody>{payments.map(p=><tr key={p.id} className="border-t border-slate-100"><td className="p-4 font-medium text-slate-800">{p.projectTitle}</td><td className="p-4 text-slate-500">{p.createdAt?new Date(p.createdAt).toLocaleDateString():"—"}</td><td className="p-4 font-semibold text-slate-800">{money(p.amount)}</td><td className="p-4 capitalize text-slate-600">{p.status}</td></tr>)}</tbody></table></div>}</div>
 </section>;
}
