import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { projects } from "../data/projects.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function ProjectsPage() {

  return (
    <section id="projects" className="border-y border-white/5 bg-[#091423] py-24">
      <div className="container-width">
        <SectionHeading eyebrow="Selected work" title="Projects I've built" description="A selection of practical projects. Replace every sample screenshot and link with your own real work before submitting." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <article key={project.title} className="glass group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-glow">
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img src={project.image} alt={`Preview image for ${project.title}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-ink/85 px-3 py-1 text-xs text-indigo-200">{project.category}</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">{tech}</span>)}</div>
              <div className="mt-6 flex gap-3 border-t border-white/10 pt-4">
                {project.demo ? <a className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200" href={project.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14}/></a> : <span className="text-xs text-amber-200/80">Add live demo URL</span>}
                <a className="focus-ring ml-auto inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white" href={project.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/><ArrowUpRight size={13}/></a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}