import { useNavigate } from "react-router-dom";

import {
  Folder,
  Clock3,
  CircleCheck,
  Wallet,
  ArrowUpRight,
  ArrowRight,
  Plus,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Code2,
  Palette,
  Globe,
  Rocket,
  TrendingUp,
} from "lucide-react";

/* Dashboard Statistics */
const statistics = [
  {
    title: "Total Projects",
    value: "08",
    description: "All your projects",
    change: "12%",
    icon: Folder,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trendColor: "text-emerald-600",
    chartColor: "text-blue-500",
    chart: "M0 25 L12 18 L23 22 L35 12 L46 16 L58 8 L70 13 L82 4 L95 7",
  },
  {
    title: "In Progress",
    value: "03",
    description: "Currently active",
    change: "8%",
    icon: Clock3,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    trendColor: "text-emerald-600",
    chartColor: "text-orange-400",
    chart: "M0 26 L12 21 L23 24 L35 13 L46 18 L58 9 L70 14 L82 5 L95 8",
  },
  {
    title: "Completed",
    value: "04",
    description: "Successfully delivered",
    change: "20%",
    icon: CircleCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    trendColor: "text-emerald-600",
    chartColor: "text-emerald-500",
    chart: "M0 25 L12 20 L23 23 L35 14 L46 17 L58 8 L70 12 L82 4 L95 6",
  },
  {
    title: "Total Budget",
    value: "$4,800",
    description: "Across all projects",
    change: "15%",
    icon: Wallet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trendColor: "text-emerald-600",
    chartColor: "text-blue-500",
    chart: "M0 26 L12 20 L23 23 L35 13 L46 17 L58 8 L70 12 L82 4 L95 6",
  },
];

/* Projects */
const projects = [
  {
    id: 1,
    name: "E-commerce Website",
    category: "Web Development",
    description: "Online store with product management",
    progress: 72,
    status: "In Progress",
    dueDate: "Oct 30, 2026",
    icon: Globe,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    progressColor: "bg-blue-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Personal Portfolio",
    category: "UI/UX Design",
    description: "Modern portfolio with responsive layout",
    progress: 90,
    status: "Review",
    dueDate: "Oct 27, 2026",
    icon: Palette,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    progressColor: "bg-purple-500",
    statusColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    name: "Management System",
    category: "Full-Stack Development",
    description: "Dashboard and database integration",
    progress: 45,
    status: "In Progress",
    dueDate: "Nov 05, 2026",
    icon: Code2,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    progressColor: "bg-blue-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

/* Recent Activities */
const activities = [
  {
    id: 1,
    title: "Homepage design completed",
    project: "E-commerce Website",
    time: "Today, 09:30 AM",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500",
  },
  {
    id: 2,
    title: "New milestone added",
    project: "Personal Portfolio",
    time: "Yesterday",
    icon: CircleDot,
    iconBg: "bg-purple-500",
  },
  {
    id: 3,
    title: "Development started",
    project: "Management System",
    time: "Oct 20, 2026",
    icon: Code2,
    iconBg: "bg-cyan-600",
  },
];

/* Upcoming Milestones */
const milestones = [
  {
    id: 1,
    title: "Product page review",
    project: "E-commerce Website",
    date: "Oct 26, 2026",
    status: "Upcoming",
    statusColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    title: "Final design approval",
    project: "Personal Portfolio",
    date: "Oct 27, 2026",
    status: "Pending",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    id: 3,
    title: "API integration",
    project: "Management System",
    date: "Oct 29, 2026",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

/* Section Heading */
function SectionHeading({ title, subtitle, link, onClick }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <h2 className="text-sm font-bold text-slate-800">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-[10px] text-slate-500">{subtitle}</p>
        )}
      </div>

      {link && (
        <button
          type="button"
          onClick={onClick}
          className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-blue-600 transition hover:text-blue-800"
        >
          {link}
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}

/* Statistics Card */
function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="min-w-0 rounded-lg border border-slate-200/70 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3.5">
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
        >
          <Icon size={19} className={item.iconColor} />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-medium text-slate-500">{item.title}</p>

          <h3 className="mt-1 text-xl font-bold leading-none text-[#172b53]">
            {item.value}
          </h3>

          <p className="mt-1.5 truncate text-[9px] text-slate-400">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span
          className={`flex items-center gap-1 text-[9px] font-semibold ${item.trendColor}`}
        >
          <TrendingUp size={11} />
          {item.change}
        </span>

        <svg
          viewBox="0 0 95 30"
          className={`h-6 w-14 ${item.chartColor}`}
          fill="none"
          aria-label={`${item.change} increase`}
          role="img"
        >
          <path
            d={item.chart}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}

/* Active Project Card */
function ProjectRow({ project, onClick }) {
  const Icon = project.icon;

  return (
    <article className="grid grid-cols-1 gap-3 border-b border-slate-100 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1.4fr)_minmax(130px,1fr)_auto] sm:items-center sm:gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${project.iconBg}`}
        >
          <Icon size={18} className={project.iconColor} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[10px] font-semibold text-slate-800">
            {project.name}
          </h3>

          <p className="mt-1 text-[9px] text-slate-500">{project.category}</p>

          <p className="mt-1 truncate text-[9px] text-slate-400">
            {project.description}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className={`rounded-full px-2 py-1 text-[8px] font-medium ${project.statusColor}`}
          >
            {project.status}
          </span>

          <span className="text-[9px] font-semibold text-slate-500">
            {project.progress}%
          </span>
        </div>

        <div
          className="h-1 rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`${project.name} progress`}
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-1 rounded-full ${project.progressColor}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
        <span className="flex items-center gap-1 text-[9px] text-slate-500">
          <CalendarDays size={11} />
          {project.dueDate}
        </span>

        <button
          type="button"
          onClick={onClick}
          aria-label={`View ${project.name}`}
          className="rounded p-1 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

/* Main Dashboard */
export default function ClientDashboard() {
  const navigate = useNavigate();

  function goToProjects() {
    navigate("/my-projects");
  }

  function goToNewProject() {
    navigate("/new-project");
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-3">
      {/* Welcome Banner */}
      <section className="relative flex min-h-[132px] items-center overflow-hidden rounded-lg bg-gradient-to-r from-[#1646dc] via-[#4053f5] to-[#8057f5] px-5 py-5 text-white sm:px-7">
        {/* Decorative Shapes */}
        <div className="absolute -right-5 -top-16 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute right-36 top-16 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 max-w-[440px]">
          <p className="text-[9px] font-medium uppercase tracking-wide text-blue-100">
            Client Workspace
          </p>

          <h1 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
            Welcome back, Alex!
          </h1>

          <p className="mt-2 max-w-[350px] text-[10px] leading-4 text-blue-50">
            Keep track of your projects, follow progress, and stay updated with
            everything happening in your workspace.
          </p>

          <button
            type="button"
            onClick={goToNewProject}
            className="mt-3 inline-flex h-7 items-center gap-2 rounded-md bg-white px-3 text-[9px] font-semibold text-[#1e3a8a] shadow-sm transition hover:bg-blue-50"
          >
            <Plus size={13} />
            Request a Project
          </button>
        </div>

        <div className="absolute bottom-3 right-5 hidden opacity-80 sm:block">
          <div className="flex h-20 w-28 items-center justify-center rounded-lg border-4 border-slate-200 bg-white shadow-xl">
            <div className="grid w-full grid-cols-2 gap-2 p-2">
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded bg-blue-100" />
                <div className="h-1.5 w-3/4 rounded bg-blue-100" />
                <div className="mt-2 h-5 rounded bg-blue-200" />
              </div>

              <div className="flex items-center justify-center">
                <div className="h-9 w-9 rounded-full border-[6px] border-blue-500 border-r-orange-400 border-t-purple-400" />
              </div>

              <div className="col-span-2 flex gap-1">
                <div className="h-3 flex-1 rounded bg-purple-200" />
                <div className="h-3 flex-1 rounded bg-blue-200" />
                <div className="h-3 flex-1 rounded bg-emerald-200" />
              </div>
            </div>
          </div>

          <p className="mt-2 text-right text-[10px] font-medium italic">
            Your ideas, our work
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      {/* Projects and Activity */}
      <section className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)]">
        {/* Active Projects */}
        <div className="min-w-0 rounded-lg border border-slate-200/70 bg-white p-3 shadow-sm sm:p-4">
          <SectionHeading
            title="Active Projects"
            subtitle="Track your ongoing projects and deadlines"
            link="View all"
            onClick={goToProjects}
          />

          <div className="mt-2 divide-y divide-slate-100">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onClick={goToProjects}
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="min-w-0 space-y-3">
          {/* Recent Activity */}
          <div className="rounded-lg border border-slate-200/70 bg-white p-3 shadow-sm sm:p-4">
            <SectionHeading
              title="Recent Activity"
              subtitle="The latest updates from your projects"
              link="View all"
              onClick={() => navigate("/messages")}
            />

            <div className="mt-3">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-2.5 border-b border-slate-100 py-2 last:border-b-0"
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${activity.iconBg}`}
                    >
                      <Icon size={12} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[9px] font-semibold text-slate-700">
                        {activity.title}
                      </h3>

                      <p className="mt-1 truncate text-[8px] text-slate-400">
                        {activity.project}
                      </p>
                    </div>

                    <span className="shrink-0 text-right text-[8px] text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="rounded-lg border border-slate-200/70 bg-white p-3 shadow-sm sm:p-4">
            <SectionHeading
              title="Upcoming Milestones"
              subtitle="Important dates and next steps"
              link="View all"
              onClick={goToProjects}
            />

            <div className="mt-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-2 border-b border-slate-100 py-2 last:border-b-0"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CalendarDays size={13} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[9px] font-semibold text-slate-700">
                      {milestone.title}
                    </h3>

                    <p className="mt-1 truncate text-[8px] text-slate-400">
                      {milestone.project}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-1 text-[8px] font-medium ${milestone.statusColor}`}
                    >
                      {milestone.status}
                    </span>

                    <span className="text-[8px] text-slate-400">
                      {milestone.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call To Action */}
      <section className="relative flex min-h-[74px] items-center justify-between gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-[#101e42] to-[#192d60] px-4 py-3 text-white sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-blue-200">
            <Rocket size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-xs font-bold">Start a new project</h2>

            <p className="mt-1 text-[9px] text-slate-300">
              Have a new idea? Let's bring it to life together.
            </p>

            <button
              type="button"
              onClick={goToNewProject}
              className="mt-2 inline-flex h-6 items-center gap-1.5 rounded-md bg-white px-2.5 text-[9px] font-semibold text-slate-800 transition hover:bg-blue-50"
            >
              <Plus size={12} />
              Request a Project
            </button>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <div className="flex h-12 w-16 items-center justify-center rounded-md border border-white/20 bg-white/15 shadow-lg">
            <div className="w-10 space-y-1 rounded bg-white p-1.5">
              <div className="h-1 rounded bg-blue-300" />
              <div className="h-1 w-2/3 rounded bg-purple-300" />
              <div className="h-3 rounded bg-indigo-200" />
            </div>
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-400 text-white shadow-lg">
            <Plus size={17} />
          </div>
        </div>
      </section>
    </div>
  );
}
