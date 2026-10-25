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
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
