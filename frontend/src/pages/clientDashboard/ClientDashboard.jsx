import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Clock3, CircleCheck, Wallet, Plus, ArrowUpRight } from "lucide-react";
import { api } from "../../services/api";

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
const statusLabel = (value) => (value || "pending").replaceAll("-", " ");

export default function ClientDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/client/dashboard").then(setData).catch(e=>setError(e.message)).finally(()=>setLoading(false)); }, []);
  const stats = data?.stats || {};
  const cards = [
    ["Total Projects", stats.totalProjects || 0, FolderKanban, "All your projects"],
    ["In Progress", stats.inProgress || 0, Clock3, "Currently active"],
    ["Completed", stats.completed || 0, CircleCheck, "Successfully delivered"],
    ["Total Budget", money(stats.totalBudget), Wallet, "Across your projects"],
  ];
  return <section className="mx-auto max-w-7xl space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-slate-500">Client workspace</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Dashboard</h1><p className="mt-1 text-sm text-slate-500">Your projects and updates from the backend.</p></div><Link to="/new-project" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16}/> New Project</Link></div>
    {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {loading && <p className="text-sm text-slate-500">Loading dashboard…</p>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([title,value,Icon,description])=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{title}</span><span className="rounded-xl bg-blue-50 p-2 text-blue-600"><Icon size={20}/></span></div><p className="mt-4 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{description}</p></article>)}</div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Recent Projects</h2><Link to="/my-projects" className="flex items-center gap-1 text-sm font-semibold text-blue-600">View all <ArrowUpRight size={15}/></Link></div>
      {!loading && (data?.projects || []).length === 0 && <p className="py-8 text-center text-sm text-slate-500">No projects yet. Submit your first project request.</p>}
      <div className="space-y-3">{(data?.projects || []).map(project=><div key={project._id} className="rounded-xl border border-slate-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{project.title}</h3><p className="mt-1 text-sm text-slate-500">{project.description}</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">{statusLabel(project.status)}</span></div><div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>Progress</span><span>{project.progress || 0}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{width:`${project.progress || 0}%`}}/></div></div>)}</div>
    </div>
  </section>;
}
