import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Folder,
  Plus,
  MessageSquare,
  FileText,
  Wallet,
  Settings,
  Rocket,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/clientDashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    path: "/my-projects",
    icon: Folder,
  },
  {
    title: "New Project",
    path: "/new-project",
    icon: Plus,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Files & Documents",
    path: "/project-files",
    icon: FileText,
  },
  {
    title: "Payments & Invoices",
    path: "/payments",
    icon: Wallet,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({
  isOpen = false,
  onClose = () => {},
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[260px] flex-col
          border-r border-slate-700/30
          bg-[#101b30] text-white
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[48px] shrink-0 items-center justify-between px-3">
          <NavLink
            to="/clientDashboard"
            onClick={onClose}
            className="flex items-center gap-1.5"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-400 to-indigo-600">
              <span className="text-sm font-black">C</span>
            </div>

            <span className="text-[12px] font-bold tracking-tight">
              Client<span className="text-blue-400">Portal</span>
            </span>
          </NavLink>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded p-1 text-slate-300 hover:bg-white/10 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/clientDashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex h-[29px] items-center gap-2 rounded-md px-2
                  text-[10px] font-medium transition-all
                  ${
                    isActive
                      ? "bg-[#244580] text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={14} strokeWidth={1.8} />

                <span className="min-w-0 flex-1 whitespace-nowrap">
                  {item.title}
                </span>

              </NavLink>
            );
          })}
        </nav>

        {/* Support Card */}
        <div className="mx-3 mb-4 rounded-lg border border-slate-700/70 bg-[#111e36] p-3">
          <div className="mb-2 flex h-7 w-7 items-center justify-center text-blue-400">
            <Rocket size={21} fill="currentColor" />
          </div>

          <h3 className="text-[10px] font-semibold text-white">
            Need Help?
          </h3>

          <p className="mt-1 text-[8px] leading-3 text-slate-400">
            Our support team is here for you.
          </p>

          <NavLink
            to="/messages"
            onClick={onClose}
            className="mt-3 inline-flex rounded-md bg-[#244580] px-2 py-1.5 text-[8px] font-medium text-white transition hover:bg-blue-600"
          >
            Contact Support
          </NavLink>
        </div>

        <div className="shrink-0 border-t border-white/5 px-4 py-4 text-[10px] text-slate-400">
          Client workspace · Secure account
        </div>
      </aside>
    </>
  );
}