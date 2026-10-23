import Header from "./components/layout/header";
import HomePage from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Footer from "./pages/Foooter";
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/clientDashboard/ClientDashboard";
function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-slate-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/clientDashboard" element={<ClientDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
