import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  CheckCheck,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Project update",
    message: "Your project progress has been updated.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "New milestone",
    message: "A new milestone has been added.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Welcome!",
    message: "Welcome to your Client Portal.",
    time: "Yesterday",
    unread: true,
  },
];

export default function DashboardNavbar({
  onMenuClick,
  onSearch,
  user,
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const displayName = user?.name || "Alex Carter";
  const displayEmail = user?.email || "Client Account";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    if (onSearch) {
      onSearch(query);
      return;
    }

    navigate(
      `/my-projects?search=${encodeURIComponent(query)}`
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signUp", { replace: true });
  }

  return (
    <header className="fixed right-0 left-64 top-0 z-30 flex h-[65px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-4">
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex min-w-0 max-w-[470px] flex-1 items-center"
      >
        <div className="relative w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2  -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your workspace..."
            aria-label="Search your workspace"
            className="py-3 w-full rounded-full border border-slate-100 bg-[#f4f7fc] pl-8 pr-3 text-[9px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowProfile(false);
            }}
            className="relative flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <Bell size={24} strokeWidth={1.8} />

            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-red-500 px-0.5 text-[8px] font-bold text-white ring-1 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-9 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 py-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    Notifications
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {unreadCount} unread notifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:text-blue-800"
                >
                  <CheckCheck size={13} />
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="flex w-full gap-2 border-b border-slate-50 px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        notification.unread
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-slate-800">
                        {notification.title}
                      </span>

                      <span className="mt-1 block text-[10px] leading-4 text-slate-500">
                        {notification.message}
                      </span>

                      <span className="mt-1 block text-[9px] text-slate-400">
                        {notification.time}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            aria-expanded={showProfile}
            onClick={() => {
              setShowProfile((current) => !current);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg px-1 py-1 transition hover:bg-slate-50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[9px] font-bold text-white">
              {initials}
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-[9px] font-semibold text-slate-800">
                {displayName}
              </span>

              <span className="mt-0.5 block text-[8px] text-slate-500">
                {displayEmail}
              </span>
            </span>

            <ChevronDown
              size={12}
              className={`hidden text-slate-400 transition sm:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-9 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="border-b border-slate-100 px-2 py-2">
                <p className="truncate text-xs font-semibold text-slate-800">
                  {displayName}
                </p>

                <p className="truncate text-[10px] text-slate-500">
                  {user?.email || "Client Account"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-600 transition hover:bg-slate-100"
              >
                <UserRound size={15} />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-600 transition hover:bg-slate-100"
              >
                <Settings size={15} />
                Settings
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}