import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Send,
  Mail,
} from "lucide-react";
import { site } from "../data/site.js";
import ProjectsPage from "./Projects.jsx";
import Skills from "./Skills.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";

export default function HomePage() {
  return (
    <>
      <section
        id="home"
        className="container-width flex min-h-screen pt-4 items-center pb-16"
      >
        <div className="grid w-full items-center gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available
              for remote opportunities
            </span>
            <p className="mt-8 text-lg text-slate-700 dark:text-slate-300">Hi, I'm</p>
            <h1 className="mt-1 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{site.name}</span>
            </h1>
            <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-200 sm:text-2xl">
              {site.role}
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600 dark:text-slate-400">
              I build responsive web experiences with React, Tailwind CSS,
              Node.js, and databases. I enjoy turning practical problems into
              clear, useful software.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                View My Projects <ArrowRight size={17} />
              </a>
              <a
                href="#contact"
                className="focus-ring rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 font-semibold text-slate-800 dark:text-slate-200 transition hover:border-indigo-400/60 hover:bg-slate-100 dark:bg-white/5"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 flex gap-3">
              <SocialLink href={site.github} label="GitHub">
                <Github size={18} />
              </SocialLink>
              <SocialLink href={site.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail size={18} />
              </SocialLink>
              <SocialLink href={site.telegram} label="Telegram">
                <Send size={18} />
              </SocialLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-5 rounded-[2rem] bg-indigo-500/10 blur-2xl" />
            <div className="glass relative rounded-[2rem] p-5 shadow-glow">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#081321] p-5">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-500">
                    DEVELOPER PROFILE
                  </span>
                  <span className="flex gap-1">
                    <i className="h-2 w-2 rounded-full bg-rose-400" />
                    <i className="h-2 w-2 rounded-full bg-amber-300" />
                    <i className="h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-indigo-300/50 bg-gradient-to-br from-indigo-500/30 to-sky-400/10 text-4xl font-black text-indigo-200">
                  KS
                </div>
                <h3 className="mt-5 text-center text-xl font-bold">
                  {site.name}
                </h3>
                <p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-400">
                  Building for the web
                </p>
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <CodeLine
                    color="text-indigo-300"
                    text="const developer = {"
                  />
                  <CodeLine
                    color="text-emerald-300"
                    text='  frontend: "React + Tailwind",'
                  />
                  <CodeLine
                    color="text-sky-300"
                    text='  backend: "Node + Express",'
                  />
                  <CodeLine
                    color="text-amber-200"
                    text='  database: "SQL / MongoDB"'
                  />
                  <CodeLine color="text-indigo-300" text="};" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm shadow-xl">
              <span className="mr-2 text-emerald-300">●</span> Learning by
              building
            </div>
          </div>
        </div>
        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="focus-ring absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-slate-300 dark:border-slate-700 p-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white lg:block"
        >
          <ArrowDown size={18} />
        </a>
      </section>
      <ProjectsPage />
      <Skills />
      <About />
      <Contact />
    </>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="focus-ring rounded-xl border border-slate-300 dark:border-slate-700 p-3 text-slate-700 dark:text-slate-300 transition hover:border-indigo-400/60 hover:text-indigo-200"
    >
      {children}
    </a>
  );
}
function CodeLine({ color, text }) {
  return <p className={color}>{text}</p>;
}
