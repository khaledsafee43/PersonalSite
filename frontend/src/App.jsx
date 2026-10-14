import Header from "./components/layout/header";
import HomePage from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Footer from "./pages/Foooter";
import ClientDashboard from "./pages/ClientDashboard";
function App() {
  return (
    <>
      <div className="bg-[#051424] min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<ClientDashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
