import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Globe,
  Smartphone,
  Palette,
  Code2,
  ShoppingCart,
  Layers,
  CalendarDays,
  DollarSign,
  FileText,
  Upload,
  X,
  CheckCircle2,
  Clock3,
  Send,
  Lightbulb,
  ShieldCheck,
  Paperclip,
} from "lucide-react";

const projectTypes = [
  {
    id: "web",
    title: "Website Development",
    description: "Business websites and web applications",
    icon: Globe,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Online stores and shopping platforms",
    icon: ShoppingCart,
  },
  {
    id: "mobile",
    title: "Mobile Application",
    description: "Android and iOS applications",
    icon: Smartphone,
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "User interfaces and experiences",
    icon: Palette,
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs, databases and server systems",
    icon: Code2,
  },
  {
    id: "other",
    title: "Other Project",
    description: "Something different? Tell us about it",
    icon: Layers,
  },
];

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "TypeScript",
  "Figma",
  "Other",
];

const initialForm = {
  title: "",
  type: "",
  description: "",
  features: "",
  budget: "",
  deadline: "",
  priority: "Normal",
  technologies: [],
  referenceUrl: "",
  contactEmail: "",
};

export default function NewProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function toggleTechnology(technology) {
    setForm((previous) => ({
      ...previous,
      technologies: previous.technologies.includes(technology)
        ? previous.technologies.filter(
            (item) => item !== technology
          )
        : [...previous.technologies, technology],
    }));
  }

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024;

    const validFiles = selectedFiles.filter(
      (file) => file.size <= maxSize
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Each file must be 10 MB or smaller.");
    }

    setFiles((previous) => {
      const combined = [...previous, ...validFiles];

      return combined.filter(
        (file, index, array) =>
          array.findIndex(
            (item) =>
              item.name === file.name &&
              item.size === file.size
          ) === index
      );
    });

    event.target.value = "";
  }

  function removeFile(indexToRemove) {
    setFiles((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  }

  function validateForm() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Please enter a project title.";
    }

    if (!form.type) {
      newErrors.type = "Please select a project type.";
    }

    if (form.description.trim().length < 20) {
      newErrors.description =
        "Please provide at least 20 characters describing your project.";
    }

    if (!form.budget) {
      newErrors.budget = "Please select your estimated budget.";
    }

    if (!form.deadline) {
      newErrors.deadline = "Please choose a target deadline.";
    } else {
      const selectedDate = new Date(
        `${form.deadline}T00:00:00`
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline =
          "The deadline must be today or a future date.";
      }
    }

    if (
      form.contactEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.contactEmail.trim()
      )
    ) {
      newErrors.contactEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const request = {
      ...form,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    // Temporary local demo only; this does not upload files.
    const previousRequests = JSON.parse(
      localStorage.getItem("clientProjectRequests") || "[]"
    );

    localStorage.setItem(
      "clientProjectRequests",
      JSON.stringify([...previousRequests, request])
    );

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-800">
            Request Prepared Successfully!
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your project request has been saved in this browser for
            demonstration. It has not yet been sent to the server.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/my-projects")}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View My Projects
            </button>

            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setFiles([]);
                setErrors({});
                setSubmitted(false);
              }}
              className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Create Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 pb-8">
      {/* Page Header */}
      <header>
        <button
          type="button"
          onClick={() => navigate("/my-projects")}
          className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={15} />
          Back to My Projects
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Workspace</span>
              <span>/</span>
              <span>Projects</span>
              <span>/</span>
              <span className="font-medium text-blue-600">
                New Project
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Create New Project
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Tell us about your idea, requirements, and goals.
              We will use these details to understand your project.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
            <ShieldCheck size={17} className="text-blue-600" />

            <span className="text-xs font-medium text-blue-700">
              Project Request Form
            </span>
          </div>
        </div>
      </header>

      {/* Information Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 p-5 text-white sm:p-7">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-40 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Lightbulb size={25} />
          </div>

          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              Let's bring your idea to life
            </h2>

            <p className="mt-2 max-w-2xl text-xs leading-6 text-blue-100 sm:text-sm">
              Complete the form below with as much detail as possible.
              Clear requirements help us plan the right solution,
              estimate the workload, and define the next steps.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Start with the main details of your project.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Project Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. E-commerce Website"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  {errors.title && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-xs font-semibold text-slate-700">
                    Project Type <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {projectTypes.map((type) => {
                      const Icon = type.icon;
                      const selected = form.type === type.id;

                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setForm((previous) => ({
                              ...previous,
                              type: type.id,
                            }));

                            setErrors((previous) => ({
                              ...previous,
                              type: "",
                            }));
                          }}
                          className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                              : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                              selected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Icon size={19} />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xs font-bold text-slate-800">
                              {type.title}
                            </h3>

                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                              {type.description}
                            </p>
                          </div>

                          {selected && (
                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-blue-600"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {errors.type && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Project Description{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your project, its purpose, target audience, and the problem it should solve..."
                    className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-2 flex justify-between gap-3">
                    {errors.description ? (
                      <p className="text-xs text-red-500">
                        {errors.description}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400">
                        Include the main goals and expected outcome.
                      </p>
                    )}

                    <span className="shrink-0 text-[11px] text-slate-400">
                      {form.description.length} characters
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="features"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Required Features
                  </label>

                  <textarea
                    id="features"
                    name="features"
                    rows={3}
                    value={form.features}
                    onChange={handleChange}
                    placeholder="e.g. User authentication, dashboard, search, payment integration..."
                    className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Technical Requirements */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Code2 size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Technical Requirements
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose your preferred technologies.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold text-slate-700">
                  Preferred Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology) => {
                    const selected =
                      form.technologies.includes(technology);

                    return (
                      <button
                        key={technology}
                        type="button"
                        onClick={() => toggleTechnology(technology)}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          selected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
                        }`}
                      >
                        {selected && (
                          <CheckCircle2
                            size={12}
                            className="mr-1 inline"
                          />
                        )}

                        {technology}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-[11px] text-slate-400">
                  Select all technologies that apply. You can leave
                  this empty if you need a recommendation.
                </p>

                <div className="mt-5">
                  <label
                    htmlFor="referenceUrl"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Reference Website or Design URL
                  </label>

                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="referenceUrl"
                      name="referenceUrl"
                      type="url"
                      value={form.referenceUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Budget and Timeline */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Budget & Timeline
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Help us understand your budget and target date.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Estimated Budget{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select your budget</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 – $1,000</option>
                      <option value="1000-2500">$1,000 – $2,500</option>
                      <option value="2500-5000">$2,500 – $5,000</option>
                      <option value="5000-plus">$5,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>

                  {errors.budget && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.budget}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="deadline"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Target Deadline{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={form.deadline}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {errors.deadline && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.deadline}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="priority"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Project Priority
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Low">Low — Flexible timeline</option>
                    <option value="Normal">Normal — Standard priority</option>
                    <option value="High">High — Important deadline</option>
                    <option value="Urgent">Urgent — As soon as possible</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Attachments */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Paperclip size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Project Attachments
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Add briefs, screenshots, documents, or reference files.
                  </p>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Upload size={22} />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Click to upload files
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Maximum 10 MB per file
                </p>

                <input
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.zip"
                />
              </label>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}`}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {file.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        aria-label={`Remove ${file.name}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Contact Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Contact Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Optional contact email for project updates.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contactEmail"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Contact Email
                </label>

                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                {errors.contactEmail && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.contactEmail}
                  </p>
                )}
              </div>
            </section>

            {/* Form Actions */}
            <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/my-projects")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Submit Project Request
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Process Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-slate-800">
                What happens next?
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Here is how your project request moves forward.
              </p>

              <div className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700">
                      1. Submit Request
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Share your idea and project requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700">
                      2. Review & Planning
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Your request can be reviewed and scoped.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700">
                      3. Confirm the Plan
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Agree on the scope, schedule, and budget.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-blue-600" />

                <h2 className="text-sm font-bold text-slate-800">
                  Helpful Tips
                </h2>
              </div>

              <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600">
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  Describe the problem your project should solve.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  List the most important features first.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  Choose a realistic deadline and budget.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  Attach reference files when they help explain your idea.
                </li>
              </ul>
            </section>

            {/* Support */}
            <section className="rounded-2xl bg-[#111f3e] p-5 text-white shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                <BriefcaseBusiness size={20} />
              </div>

              <h2 className="mt-4 text-sm font-bold">
                Need help planning?
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-300">
                Not sure which option fits your idea? You can contact
                support for guidance.
              </p>

              <button
                type="button"
                onClick={() => navigate("/messages")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-blue-50"
              >
                Contact Support
                <ArrowRight size={14} />
              </button>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}