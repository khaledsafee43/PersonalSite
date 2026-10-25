import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Plus, FolderKanban } from "lucide-react";
import { api } from "../../services/api";

export default function MyProjects() {
  const [projects,setProjects]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [searchParams]=useSearchParams();
  const [search,setSearch]=useState(searchParams.get("search") || "");
  useEffect(()=>{api.get("/client/projects").then(r=>setProjects(r.projects||[])).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
  const filtered=useMemo(()=>projects.filter(p=>`${p.title} ${p.description} ${p.status}`.toLowerCase().includes(search.toLowerCase())),[projects,search]);
  return <section className="mx-auto max-w-7xl space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-900">My Projects</h1><p className="mt-1 text-sm text-slate-500">Projects associated with your account.</p></div><Link to="/new-project" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16}/> New Project</Link></div>
    <div className="relative max-w-md"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-400"/></div>
    {error&&<p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}{loading&&<p className="text-sm text-slate-500">Loading projects…</p>}
    {!loading&&!filtered.length&&<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><FolderKanban className="mx-auto text-slate-400" size={35}/><p className="mt-3 font-semibold text-slate-800">No projects found</p><p className="mt-1 text-sm text-slate-500">Submit a new project request to get started.</p></div>}
    <div className="grid gap-4 lg:grid-cols-2">{filtered.map(p=><article key={p._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><div><h2 className="font-bold text-slate-900">{p.title}</h2><p className="mt-1 text-sm text-slate-500">{p.type}</p></div><span className="h-fit rounded-full bg-blue-50 px-3 py-1 text-xs capitalize text-blue-700">{(p.status||"pending").replaceAll("-"," ")}</span></div><p className="mt-4 text-sm leading-6 text-slate-600">{p.description}</p><div className="mt-5 flex justify-between text-xs text-slate-500"><span>Progress</span><strong>{p.progress||0}%</strong></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-600" style={{width:`${p.progress||0}%`}}/></div><div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-sm"><span className="text-slate-500">Budget: ${Number(p.budget||0).toLocaleString()}</span><span className="text-slate-500">{p.deadline?new Date(p.deadline).toLocaleDateString():"No deadline"}</span></div></article>)}</div>
  </section>;
}
