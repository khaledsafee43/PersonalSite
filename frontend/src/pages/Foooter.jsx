import { ArrowUp, Github, Linkedin, Mail, Send } from "lucide-react";
import { site } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#050c16] py-8">
      <div className="container-width flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            {site.name} <span className="text-indigo-300">·</span> {site.role}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
            Designed and built with React & Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <a
            className="focus-ring hover:text-slate-900 dark:hover:text-white"
            href={site.github}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            className="focus-ring hover:text-slate-900 dark:hover:text-white"
            href={site.linkedin}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            className="focus-ring hover:text-slate-900 dark:hover:text-white"
            href={`mailto:${site.email}`}
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            className="focus-ring hover:text-slate-900 dark:hover:text-white"
            href={site.telegram}
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>
          <a
            className="focus-ring ml-2 rounded-lg border border-slate-300 dark:border-slate-700 p-2 hover:text-slate-900 dark:hover:text-white"
            href="#home"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
