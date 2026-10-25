import { Outlet } from "react-router-dom";
import DashboardSidebar from "../navbar/DashboardNavbar";
import DashboardNavbar from "../navbar/DashboardTopNav";
import { useState } from "react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fc]">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen min-w-0 bg-[#f4f7fc] lg:ml-[260px]">
        {/* Top Navbar */}
        <DashboardNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Dashboard Pages */}
        <main className="min-h-[calc(100vh-65px)] min-w-0 bg-[#f4f7fc] p-3 sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
