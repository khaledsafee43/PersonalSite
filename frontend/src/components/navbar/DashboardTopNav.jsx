import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, UserRound, LogOut, Menu } from "lucide-react";
import { api } from "../../services/api";

export default function DashboardNavbar({ onMenuClick, onSearch }) {
  const navigate=useNavigate();
  const [search,setSearch]=useState("");
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("user")||"{}")}catch{return {}}});
  const [showProfile,setShowProfile]=useState(false);
  const [unread,setUnread]=useState(0);
  useEffect(()=>{api.get("/auth/profile").then(r=>{if(r.user){setUser(r.user);localStorage.setItem("user",JSON.stringify(r.user));}}).catch(()=>{});api.get("/client/dashboard").then(r=>setUnread(r.stats?.unreadMessages||0)).catch(()=>{});},[]);
  function submit(e){e.preventDefault();if(!search.trim())return;if(onSearch)onSearch(search.trim());else navigate(`/my-projects?search=${encodeURIComponent(search.trim())}`);}
  function logout(){localStorage.removeItem("token");localStorage.removeItem("user");navigate("/signUp",{replace:true});}
  const name=user.fullName||user.name||"Client";
  const initials=name.split(" ").filter(Boolean).map(s=>s[0]).join("").slice(0,2).toUpperCase();
  return <header className="fixed left-0 right-0 top-0 z-30 flex h-[65px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-5 lg:left-[260px]">
    <div className="flex min-w-0 flex-1 items-center gap-3"><button type="button" onClick={onMenuClick} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu"><Menu size={19}/></button><form onSubmit={submit} className="min-w-0 max-w-[470px] flex-1"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search your projects…" className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-300"/></div></form></div>
    <div className="flex shrink-0 items-center gap-2 sm:gap-4"><button type="button" onClick={()=>navigate("/messages")} className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Messages"><Bell size={19}/>{unread>0&&<span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"/>}</button><div className="relative"><button type="button" onClick={()=>setShowProfile(v=>!v)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">{initials||"C"}</span><span className="hidden text-left sm:block"><span className="block max-w-32 truncate text-xs font-semibold text-slate-800">{name}</span><span className="block max-w-32 truncate text-[10px] text-slate-500">{user.email||"Client account"}</span></span><ChevronDown size={14} className="hidden text-slate-400 sm:block"/></button>{showProfile&&<div className="absolute right-0 top-11 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><button onClick={()=>{setShowProfile(false);navigate("/settings")}} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><UserRound size={15}/> Profile settings</button><button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={15}/> Sign out</button></div>}</div></div>
  </header>;
}
