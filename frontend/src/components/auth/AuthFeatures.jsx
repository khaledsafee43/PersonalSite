import { Code2, Sparkles, ShieldCheck, Rocket } from "lucide-react";

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h3>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function AuthFeatures() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-[#0B1530] to-violet-950/80 p-10 lg:flex xl:p-12">
      <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/20">
            <Code2 size={27} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Project Maker</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Build Your Digital Future
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-2 text-xs text-indigo-300">
            <Sparkles size={15} />
            Your Journey Starts Here
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Build Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Digital Future.
            </span>
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
            Manage your projects, follow your progress, and bring your ideas to
            life.
          </p>
        </div>
      </div>

      <div className="relative mt-12 space-y-5">
        <Feature
          icon={<Rocket size={20} />}
          title="Manage Your Projects"
          text="Keep your work organized."
        />
        <Feature
          icon={<ShieldCheck size={20} />}
          title="Your Account, Your Space"
          text="Access your personal dashboard."
        />
      </div>

      <p className="relative mt-12 text-xs text-slate-500 dark:text-slate-500">
        © {new Date().getFullYear()} Skyrovix
      </p>
    </div>
  );
}
