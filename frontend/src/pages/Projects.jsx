import { ExternalLink, Github } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import SectionHeading from "./SectionHeading";

export default function ProjectsPage() {
  const { projects, loading, error } = usePortfolio();
  return <section id="projects" className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#091423] py-24">
    <div className="container-width">
      <SectionHeading eyebrow="Selected work" title="Projects I've built" description="Project details are loaded from the portfolio API."/>
      {loading && <p className="py-8 text-slate-500">Loading projects…</p>}
      {error && <p className="py-4 text-amber-600">{error}</p>}
      {!loading && projects.length === 0 && <p className="py-8 text-slate-500">No published projects are available yet.</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <article key={project.id || project.title} className="glass group overflow-hidden rounded-2xl transition hover:-translate-y-1">
          <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
            {project.image ? <img src={project.image.startsWith("/") || project.image.startsWith("http") ? project.image : `/${project.image}`} alt={project.title} loading="lazy" className="h-full w-full object-cover"/> : <div className="grid h-full place-items-center text-4xl text-indigo-400">{"</>"}</div>}
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">{project.category || project.type || "Project"}</p>
            <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
            <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description || "Project description is not available."}</p>
            <div className="mt-4 flex flex-wrap gap-2">{(project.stack || project.technologies || []).map((tech) => <span key={tech} className="rounded-md bg-slate-100 dark:bg-white/5 px-2.5 py-1 text-xs">{tech}</span>)}</div>
            <div className="mt-6 flex gap-4 border-t border-slate-200 dark:border-white/10 pt-4">
              {project.demo && <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500" href={project.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14}/></a>}
              {project.github && <a className="ml-auto inline-flex items-center gap-1.5 text-sm" href={project.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a>}
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
