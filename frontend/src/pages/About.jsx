import { BookOpen, Rocket, Target, Heart } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const values = [
  { icon: BookOpen, title: "Keep learning", text: "Strengthen fundamentals and learn from feedback." },
  { icon: Rocket, title: "Build projects", text: "Turn concepts into practical, usable applications." },
  { icon: Target, title: "Solve problems", text: "Focus on clear user needs and maintainable solutions." },
  { icon: Heart, title: "Work with care", text: "Value accessibility, reliability, and clean interfaces." },
];

export default function About() {
  return (
    <section id="about" className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#091423] py-24">
      <div className="container-width">
        <SectionHeading eyebrow="A little about me" title="My journey & goals" description="A short, authentic introduction to the person behind the code." />
        <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="glass rounded-2xl p-7">
            <div className="grid aspect-[4/3] place-items-center rounded-xl border border-indigo-300/20 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-sky-400/10">
              <div className="text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-indigo-300/40 bg-indigo-500/20 text-3xl font-black text-indigo-200">KS</div><p className="mt-4 font-semibold">Khalid Saifee</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Full Stack Web Developer</p></div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">Replace this profile card with your own professional photo if you have one.</p>
          </div>
          <div>
            <p className="leading-8 text-slate-700 dark:text-slate-300">I'm a web developer focused on building responsive user interfaces and practical web applications. My learning journey includes React, Tailwind CSS, Node.js, APIs, and database fundamentals.</p>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">I learn by building projects, reviewing mistakes, and improving step by step. My goal is to keep growing as a developer and contribute to useful products with clear, maintainable code.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 p-4"><Icon className="text-indigo-300" size={21}/><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}