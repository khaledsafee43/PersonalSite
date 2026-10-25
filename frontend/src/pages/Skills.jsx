import { Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { usePortfolio } from "../context/PortfolioContext";

export default function Skills() {
  const { skills, services, loading } = usePortfolio();
  return <section id="skills" className="container-width py-24">
    <SectionHeading eyebrow="My toolkit" title="Skills & technologies" description="Skills and services are loaded from MongoDB through the portfolio API."/>
    {loading && <p className="text-sm text-slate-500">Loading skills…</p>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((skill) => <article key={skill} className="glass flex items-center gap-3 rounded-xl p-4"><Code2 size={18} className="text-indigo-400"/><span className="text-sm font-medium">{skill}</span></article>)}
    </div>
    {!loading && skills.length === 0 && <p className="py-5 text-slate-500">No skills have been published yet.</p>}
    {services.length > 0 && <div className="mt-16"><h3 className="mb-6 text-2xl font-bold">Services</h3><div className="grid gap-4 md:grid-cols-2">{services.map((service,index)=><article key={service.title || index} className="glass rounded-2xl p-6"><h4 className="text-lg font-bold">{service.title}</h4><p className="mt-2 text-sm leading-6 text-slate-500">{service.description}</p></article>)}</div></div>}
  </section>;
}
