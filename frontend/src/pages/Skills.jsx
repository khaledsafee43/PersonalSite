import { Code2, Server, Database, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const groups = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "REST APIs", "Authentication basics"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "MySQL", "SQL Server"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Vite", "npm"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="container-width py-24">
      <SectionHeading
        eyebrow="My toolkit"
        title="Skills & technologies"
        description="Tools I have learned and used while building web applications. Keep this list honest and be ready to explain each item."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(({ title, icon: Icon, items }) => (
          <article
            key={title}
            className="glass rounded-2xl p-6 transition hover:border-indigo-400/30"
          >
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
