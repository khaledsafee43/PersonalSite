import { ArrowRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import ProjectsPage from "./Projects";
import Skills from "./Skills";
import About from "./About";
import Contact from "./Contact";

export default function HomePage() {
  const { site, home, loading, error } = usePortfolio();
  return <>
    <section id="home" className="container-width flex min-h-[85vh] items-center py-20">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-500 dark:text-indigo-200">{home.eyebrow || "WELCOME TO MY PORTFOLIO"}</span>
          <p className="mt-8 text-lg text-slate-700 dark:text-slate-300">Hi, I'm</p>
          <h1 className="mt-1 text-5xl font-black leading-tight tracking-tight sm:text-6xl"><span className="gradient-text">{site.name}</span></h1>
          <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-200 sm:text-2xl">{home.title || site.role}</h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-600 dark:text-slate-400">{home.description || "I build responsive, accessible, and practical web applications using modern frontend and backend technologies."}</p>
          {error && <p className="mt-4 text-sm text-amber-600">Backend data could not be loaded: {error}</p>}
          {loading && <p className="mt-3 text-sm text-slate-500">Loading portfolio data…</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white hover:bg-indigo-400">{home.primaryButtonText || "View Projects"} <ArrowRight size={16}/></Link>
            <Link to="/contact" className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 font-semibold"> {home.secondaryButtonText || "Contact Me"} </Link>
          </div>
          <div className="mt-7 flex gap-4 text-slate-500">
            {site.github && <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a>}
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a>}
            {site.email && <a href={`mailto:${site.email}`} aria-label="Email"><Mail size={19}/></a>}
            {site.telegram && <a href={site.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={19}/></a>}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#081321] p-6 text-center">
            <img src="/MyPicture.png" alt={site.name} className="mx-auto h-32 w-32 rounded-full border-2 border-indigo-300/50 object-cover" onError={(e)=>{e.currentTarget.style.display="none"}}/>
            <h3 className="mt-5 text-2xl font-bold">{site.name}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{site.role}</p>
            <div className="mt-7 space-y-3 text-left font-mono text-xs text-slate-600 dark:text-slate-300">
              <p><span className="text-indigo-400">frontend:</span> React + Tailwind CSS</p>
              <p><span className="text-emerald-400">backend:</span> Node.js + Express</p>
              <p><span className="text-sky-400">database:</span> MongoDB / SQL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ProjectsPage/><Skills/><About/><Contact/>
  </>;
}
