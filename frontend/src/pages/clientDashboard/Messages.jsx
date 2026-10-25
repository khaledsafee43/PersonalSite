import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Send, MessageSquare } from "lucide-react";

export default function Messages() {
  const [messages,setMessages]=useState([]);
  const [projects,setProjects]=useState([]);
  const [projectId,setProjectId]=useState("");
  const [text,setText]=useState("");
  const [loading,setLoading]=useState(true);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  async function load(){try{const result=await api.get("/client/messages");setMessages(result.messages||[]);setProjects(result.projects||[]);if(!projectId&&result.projects?.[0])setProjectId(result.projects[0]._id);}catch(e){setError(e.message);}finally{setLoading(false);}}
  useEffect(()=>{load();},[]);
  async function submit(e){e.preventDefault();setError("");setSuccess("");if(!text.trim())return;setSending(true);try{await api.post("/client/messages",{text:text.trim(),projectId:projectId||undefined});setText("");setSuccess("Message sent successfully.");await load();}catch(e){setError(e.message);}finally{setSending(false);}}
  return <section className="mx-auto max-w-5xl space-y-6"><div><h1 className="text-2xl font-bold text-slate-900">Messages</h1><p className="mt-1 text-sm text-slate-500">Messages are stored in the backend. Your replies can be seen by the admin.</p></div>
    {error&&<p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{success&&<p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4"><span className="rounded-xl bg-blue-50 p-3 text-blue-600"><MessageSquare/></span><div><h2 className="font-semibold text-slate-900">Project conversation</h2><p className="text-xs text-slate-500">Latest messages from your account</p></div></div>
      {loading?<p className="py-6 text-sm text-slate-500">Loading messages…</p>:messages.length===0?<p className="py-8 text-center text-sm text-slate-500">No messages yet. Send a message below to start a conversation.</p>:<div className="max-h-[480px] space-y-3 overflow-y-auto py-2">{messages.map(m=><div key={m._id} className={`max-w-[85%] rounded-xl p-4 ${m.senderRole==="client"?"ml-auto bg-blue-600 text-white":"bg-slate-100 text-slate-800"}`}><p className="mb-1 text-xs font-semibold">{m.senderName|| (m.senderRole==="admin"?"Admin":"You")}</p><p className="whitespace-pre-wrap text-sm leading-6">{m.text}</p><p className={`mt-2 text-[10px] ${m.senderRole==="client"?"text-blue-100":"text-slate-400"}`}>{m.createdAt?new Date(m.createdAt).toLocaleString():""}</p></div>)}</div>}
      <form onSubmit={submit} className="mt-5 border-t border-slate-100 pt-5">{projects.length>0&&<label className="mb-3 block text-xs font-medium text-slate-600">Related project<select value={projectId} onChange={e=>setProjectId(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-200 p-2 text-sm">{projects.map(p=><option key={p._id} value={p._id}>{p.title}</option>)}</select></label>}<div className="flex gap-2"><textarea value={text} onChange={e=>setText(e.target.value)} rows={2} maxLength={5000} placeholder="Write a message…" className="min-w-0 flex-1 rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"/><button disabled={sending||!text.trim()} className="self-end rounded-xl bg-blue-600 p-3 text-white disabled:opacity-50" aria-label="Send message"><Send size={18}/></button></div></form>
    </div></section>;
}
