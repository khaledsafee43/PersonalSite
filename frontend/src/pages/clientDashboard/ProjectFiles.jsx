import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { FileText, ExternalLink, FolderOpen } from "lucide-react";

export default function ProjectFiles(){
 const [files,setFiles]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
 useEffect(()=>{api.get("/client/files").then(r=>setFiles(r.files||[])).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
 return <section className="mx-auto max-w-6xl space-y-6"><div><h1 className="text-2xl font-bold text-slate-900">Files & Documents</h1><p className="mt-1 text-sm text-slate-500">Files associated with your projects are loaded from the backend.</p></div>{error&&<p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{loading?<p className="text-sm text-slate-500">Loading files…</p>:!files.length?<div className="py-12 text-center"><FolderOpen size={36} className="mx-auto text-slate-400"/><p className="mt-3 font-semibold text-slate-800">No project files yet</p><p className="mt-1 text-sm text-slate-500">Files added by the admin to your projects will appear here.</p></div>:<div className="grid gap-3 sm:grid-cols-2">{files.map((file,index)=><article key={file._id||file.url||index} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"><span className="rounded-lg bg-blue-50 p-3 text-blue-600"><FileText/></span><div className="min-w-0 flex-1"><h2 className="truncate text-sm font-semibold text-slate-800">{file.name||"Project file"}</h2><p className="mt-1 truncate text-xs text-slate-500">{file.projectTitle||"Project"} · {file.uploadedAt?new Date(file.uploadedAt).toLocaleDateString():""}</p></div>{file.url&&<a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600" aria-label="Open file"><ExternalLink size={17}/></a>}</article>)}</div>}</div>
 </section>;
}
