import { BookOpen, Rocket, Target, Heart } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { usePortfolio } from "../context/PortfolioContext";

const values = [
  { icon: BookOpen, title: "Keep learning", text: "Strengthen fundamentals and learn from feedback." },
  { icon: Rocket, title: "Build projects", text: "Turn concepts into practical applications." },
  { icon: Target, title: "Solve problems", text: "Focus on user needs and maintainable solutions." },
  { icon: Heart, title: "Work with care", text: "Value accessibility, reliability, and clean interfaces." },
];

export default function About() {
  const { site, about, loading } = usePortfolio();
  return <section id="about" className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#091423] py-24">
    <div className="container-width">
      <SectionHeading eyebrow="A little about me" title={about.title || "My journey & goals"} description="Profile information is loaded from the backend."/>
      {loading && <p className="mb-4 text-sm text-slate-500">Loading profile…</p>}
      <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-2xl p-7 text-center">
          <img src="/MyPicture.png" alt={site.name} className="mx-auto h-32 w-32 rounded-full object-cover" onError={(e)=>{e.currentTarget.style.display="none"}}/>
          <h3 className="mt-5 text-xl font-bold">{site.name}</h3><p className="mt-1 text-sm text-slate-500">{site.role}</p>
          {about.location && <p className="mt-3 text-sm text-slate-500">{about.location}</p>}
          {about.availability && <p className="mt-2 text-sm text-emerald-500">{about.availability}</p>}
        </div>
        <div>
          <p className="leading-8 text-slate-700 dark:text-slate-300">{about.description || "About information will appear here when it is added in the admin panel."}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{values.map(({icon:Icon,title,text})=><div key={title} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-4"><Icon className="text-indigo-400" size={21}/><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div>
        </div>
      </div>
    </div>
  </section>;
}
