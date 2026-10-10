import Header from "./components/layout/header";
import HomePage from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/Projects";
import About from "./pages/About";
function App() {

  return (
    <>
      <div className="bg-[#051424] min-h-screen">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
