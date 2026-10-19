import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Join", "/signUp"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full border-b border-slate-200 bg-white text-slate-900 shadow-md transition-colors dark:border-cyan-500 dark:bg-[#010F1F] dark:text-white dark:shadow-[0_4px_20px_rgba(34,211,238,0.08)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="focus-ring flex items-center gap-3 rounded-full">
          <span className="animate-background block rounded-full bg-linear-to-r from-green-300 via-blue-600 to-red-300 bg-size-[400%_400%] p-1 [animation-duration:6s]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-500 font-black text-white shadow-glow">
              <img
                src="me.png"
                className="object-fill bg-cover w-full h-full rounded-full "
                alt=""
              />
            </span>
          </span>
          <span className="font-bold tracking-tight text-slate-900 dark:text-white">
            Khaled<span className="text-indigo-300">Saifee.</span>
          </span>
        </div>
        <nav
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-2 dark:border-[#464554] dark:bg-[#0D1C2D]"
          aria-label="Main navigation"
        >
          <div className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `focus-ring relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 after:absolute after:-bottom-[9px] after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-blue-400 after:to-violet-400"
                      : "text-slate-600 hover:bg-white hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-[#7BD0FF]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <button
            className="focus-ring rounded-lg border border-slate-300 p-2 dark:border-slate-700 md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
          <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="rounded-xl border border-slate-300 bg-white p-2.5 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 md:hidden">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-4 dark:border-[#26384A] dark:bg-[#010F1F] md:hidden">
          <nav className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-2 dark:border-[#464554] dark:bg-[#0D1C2D]">
            {links.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 font-semibold text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/10"
                      : "text-slate-700 hover:bg-slate-200/80 hover:text-indigo-700 dark:text-[#D4E4FA] dark:hover:bg-[#1C2B3C] dark:hover:text-[#7BD0FF]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
