import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Search,
  Plus,
  FolderKanban,
  Clock3,
  CircleCheck,
  Eye,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";

const projectsData = [
  {
    id: 1,
    name: "E-commerce Website",
    category: "Web Development",
    description:
      "A modern online store with product management, shopping cart, and secure checkout.",
    progress: 72,
    status: "In Progress",
    startDate: "Oct 01, 2026",
    dueDate: "Oct 30, 2026",
    budget: "$1,800",
    icon: "🛍️",
    color: "blue",
    team: ["AC", "JD", "MK"],
    tasks: "18/25",
  },
  {
    id: 2,
    name: "Personal Portfolio",
    category: "UI/UX Design",
    description:
      "A professional portfolio website with responsive pages and a modern visual identity.",
    progress: 90,
    status: "Review",
    startDate: "Oct 05, 2026",
    dueDate: "Oct 27, 2026",
    budget: "$800",
    icon: "🎨",
    color: "purple",
    team: ["AC", "JD"],
    tasks: "18/20",
  },
  {
    id: 3,
    name: "Management System",
    category: "Full-Stack Development",
    description:
      "A complete management dashboard with database integration and reporting tools.",
    progress: 45,
    status: "In Progress",
    startDate: "Oct 12, 2026",
    dueDate: "Nov 05, 2026",
    budget: "$1,500",
    icon: "💻",
    color: "cyan",
    team: ["AC", "MK", "JD"],
    tasks: "9/20",
  },
  {
    id: 4,
    name: "Mobile Application",
    category: "Mobile Development",
    description:
      "A responsive mobile application designed to improve the customer experience.",
    progress: 100,
    status: "Completed",
    startDate: "Sep 01, 2026",
    dueDate: "Oct 10, 2026",
    budget: "$700",
    icon: "📱",
    color: "emerald",
    team: ["AC", "MK"],
    tasks: "20/20",
  },
  {
    id: 5,
    name: "Business Landing Page",
    category: "Web Design",
    description:
      "A clean landing page with service information, contact forms, and clear calls to action.",
    progress: 20,
    status: "In Progress",
    startDate: "Oct 20, 2026",
    dueDate: "Nov 12, 2026",
    budget: "$500",
    icon: "🌐",
    color: "orange",
    team: ["AC", "JD"],
    tasks: "2/10",
  },
  {
    id: 6,
    name: "Brand Identity",
    category: "Graphic Design",
    description:
      "Brand colors, typography, logo direction, and visual assets for a new business.",
    progress: 0,
    status: "Pending",
    startDate: "Oct 28, 2026",
    dueDate: "Nov 15, 2026",
    budget: "$400",
    icon: "✨",
    color: "pink",
    team: ["AC"],
    tasks: "0/8",
  },
];

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  Review: "bg-purple-50 text-purple-700 ring-purple-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-slate-100 text-slate-600 ring-slate-200",
};

const colorStyles = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    progress: "bg-blue-500",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    progress: "bg-purple-500",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-700",
    progress: "bg-cyan-500",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    progress: "bg-emerald-500",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    progress: "bg-orange-500",
  },
  pink: {
    icon: "bg-pink-100 text-pink-600",
    progress: "bg-pink-500",
  },
};

function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, onView }) {
  const style = colorStyles[project.color] || colorStyles.blue;

  return (
    <article className="group rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-5">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${style.icon}`}
          >
            {project.icon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-800">
              {project.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {project.category}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onView(project)}
          aria-label={`View ${project.name}`}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="mt-4 min-h-[40px] text-xs leading-5 text-slate-500">
        {project.description}
      </p>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </span>

        <span className="text-xs font-semibold text-slate-600">
          {project.progress}%
        </span>
      </div>

      {/* Progress */}
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`${project.name} progress`}
        aria-valuenow={project.progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.progress}`}
          style={{ width: `${project.progress}%` }}
        />
      </div>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-[10px] text-slate-400">Start Date</p>

          <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
            <CalendarDays size={12} />
            {project.startDate}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400">Deadline</p>

          <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
            <Clock3 size={12} />
            {project.dueDate}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex -space-x-2">
          {project.team.map((member) => (
            <span
              key={member}
              title={member}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[9px] font-bold text-slate-700"
            >
              {member}
            </span>
          ))}
        </div>

        <span className="text-[10px] text-slate-500">
          Tasks: <strong className="text-slate-700">{project.tasks}</strong>
        </span>

        <button
          type="button"
          onClick={() => onView(project)}
          className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
        >
          <Eye size={13} />
          Details
        </button>
      </div>
    </article>
  );
}

export default function MyProjects() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const filters = [
    "All Projects",
    "In Progress",
    "Review",
    "Completed",
    "Pending",
  ];

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = projectsData.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      const matchesStatus =
        activeFilter === "All Projects" ||
        project.status === activeFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortBy === "progress") {
      result.sort((a, b) => b.progress - a.progress);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, activeFilter, sortBy]);

  function handleViewProject(project) {
    navigate(`/my-projects/${project.id}`);
  }

  function handleNewProject() {
    navigate("/new-project");
  }

  const totalProjects = projectsData.length;

  const inProgressCount = projectsData.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedCount = projectsData.filter(
    (project) => project.status === "Completed"
  ).length;

  const reviewCount = projectsData.filter(
    (project) => project.status === "Review"
  ).length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="font-medium text-blue-600">
              My Projects
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
            My Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your projects, track progress, and stay on top of deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewProject}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={17} />
          New Project
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={String(totalProjects).padStart(2, "0")}
          description="All your projects"
          icon={FolderKanban}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="In Progress"
          value={String(inProgressCount).padStart(2, "0")}
          description="Currently active"
          icon={Clock3}
          color="bg-orange-50 text-orange-500"
        />

        <StatCard
          title="Completed"
          value={String(completedCount).padStart(2, "0")}
          description="Successfully delivered"
          icon={CircleCheck}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Waiting for Review"
          value={String(reviewCount).padStart(2, "0")}
          description="Awaiting your feedback"
          icon={Eye}
          color="bg-purple-50 text-purple-600"
        />
      </section>

      {/* Projects Container */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              All Projects
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredProjects.length} projects found
            </p>
          </div>

          {/* View Switch */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 p-1">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={16} />
              </button>

              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewMode("list")}
                className={`rounded-md p-2 ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects by name or category..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal
              size={16}
              className="text-slate-400"
            />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort projects"
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="newest">Default order</option>
              <option value="progress">Highest progress</option>
              <option value="name">Project name</option>
            </select>
          </div>
        </div>

        {/* Status Filters */}
        <div className="mt-5 flex gap-2 overflow-x-auto border-b border-slate-100 pb-3">
          {filters.map((filter) => {
            const count =
              filter === "All Projects"
                ? projectsData.length
                : projectsData.filter(
                    (project) => project.status === filter
                  ).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter}

                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                    activeFilter === filter
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards */}
        {filteredProjects.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                : "mt-5 flex flex-col gap-4"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FolderKanban size={25} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-700">
              No projects found
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or selecting a different project status.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All Projects");
              }}
              className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}