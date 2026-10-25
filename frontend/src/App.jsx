import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/clientDashboard/ClientDashboard";
import MyProjects from "./pages/clientDashboard/MyProjects";
import NewProject from "./pages/clientDashboard/NewProject";
import Messages from "./pages/clientDashboard/Messages";
import ProjectFiles from "./pages/clientDashboard/ProjectFiles";
import Payments from "./pages/clientDashboard/Payments";
import ProfileSettings from "./pages/clientDashboard/ProfileSettings";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-slate-100">
      {" "}
      <Routes>
        {/* صفحات عمومی سایت */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />{" "}
        </Route>

        {/* صفحه ورود و ثبت‌نام */}
        <Route path="/signUp" element={<SignUp />} />

        {/* داشبورد محافظت‌شده */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/clientDashboard" element={<ClientDashboard />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/project-files" element={<ProjectFiles />} />

            <Route path="/payments" element={<Payments />} />

            <Route path="/settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
