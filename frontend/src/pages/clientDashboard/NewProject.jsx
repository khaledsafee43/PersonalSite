import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ArrowLeft, Send } from "lucide-react";

export default function NewProject() {
  const navigate=useNavigate();
  const [form,setForm]=useState({title:"",type:"web",description:"",features:"",budget:"",deadline:"",priority:"Normal",technologies:[],referenceUrl:"",contactEmail:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");
  const technologies=["React","Node.js","Express.js","MongoDB","MySQL","Tailwind CSS","TypeScript","Figma"];
  function update(e){setForm(p=>({...p,[e.target.name]:e.target.value}));}
  function toggle(tech){setForm(p=>({...p,technologies:p.technologies.includes(tech)?p.technologies.filter(t=>t!==tech):[...p.technologies,tech]}));}
  async function submit(e){e.preventDefault();setError("");setSuccess("");if(form.title.trim().length<3||form.description.trim().length<10){setError("Enter a project title (at least 3 characters) and description (at least 10 characters).");return;}setLoading(true);try{const result=await api.post("/client/projects",form);setSuccess(result.message||"Project request submitted.");setTimeout(()=>navigate("/my-projects"),900);}catch(err){setError(err.message);}finally{setLoading(false);}}
  return <section className="mx-auto max-w-4xl space-y-6"><button onClick={()=>navigate(-1)} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"><ArrowLeft size={16}/> Back</button><div><h1 className="text-2xl font-bold text-slate-900">Request a New Project</h1><p className="mt-1 text-sm text-slate-500">Your request will be saved in MongoDB and appear in your dashboard.</p></div>
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      {error&&<p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{success&&<p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}
      <div className="grid gap-5 sm:grid-cols-2"><Field label="Project title" name="title" value={form.title} onChange={update} required/><label className="block text-sm font-medium text-slate-700">Project type<select name="type" value={form.type} onChange={update} className="mt-2 w-full rounded-lg border border-slate-200 p-3"><option value="web">Website development</option><option value="ecommerce">E-commerce</option><option value="mobile">Mobile app</option><option value="design">UI/UX design</option><option value="backend">Backend/API</option><option value="other">Other</option></select></label></div>
      <label className="block text-sm font-medium text-slate-700">Description<textarea name="description" value={form.description} onChange={update} required minLength={10} rows={5} className="mt-2 w-full rounded-lg border border-slate-200 p-3" placeholder="Describe the goals and requirements…"/></label>
      <label className="block text-sm font-medium text-slate-700">Features / requirements<textarea name="features" value={form.features} onChange={update} rows={3} className="mt-2 w-full rounded-lg border border-slate-200 p-3" placeholder="Optional features"/></label>
      <div><p className="mb-2 text-sm font-medium text-slate-700">Technologies</p><div className="flex flex-wrap gap-2">{technologies.map(t=><button type="button" key={t} onClick={()=>toggle(t)} className={`rounded-full border px-3 py-1.5 text-xs ${form.technologies.includes(t)?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 text-slate-600"}`}>{t}</button>)}</div></div>
      <div className="grid gap-5 sm:grid-cols-2"><Field label="Estimated budget (USD)" name="budget" type="number" min="0" value={form.budget} onChange={update}/><Field label="Preferred deadline" name="deadline" type="date" value={form.deadline} onChange={update}/><label className="block text-sm font-medium text-slate-700">Priority<select name="priority" value={form.priority} onChange={update} className="mt-2 w-full rounded-lg border border-slate-200 p-3"><option>Low</option><option>Normal</option><option>High</option><option>Urgent</option></select></label><Field label="Contact email" name="contactEmail" type="email" value={form.contactEmail} onChange={update}/><div className="sm:col-span-2"><Field label="Reference URL (optional)" name="referenceUrl" type="url" value={form.referenceUrl} onChange={update}/></div></div>
      <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Send size={16}/>{loading?"Submitting…":"Submit Project Request"}</button>
    </form></section>;
}
function Field({label,...props}){return <label className="block text-sm font-medium text-slate-700">{label}<input {...props} className="mt-2 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-400"/></label>}
