import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="bg-[#010F1F] sticky top-0 left-0 right-0 w-full h-20 flex justify-around items-center text-white border-b border-cyan-500 ring-4 ring-cyan-500/10">
        <div className="flex items-center gap-2">
          <img src="/MyPicture.png" alt="my picture" className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="text-[#D4E4FA]">Khaled Saifee</h2>
            <p className="text-[#C7C4D7]">Full-Stack Developer</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-1 border border-[#464554] bg-[#0D1C2D] py-1 px-2 rounded-full">
            <span className="bg-[#7BD0FF] shadow shadow-[#7BD0FF] w-2 h-2 rounded-full"></span>
            <p className="text-[#7BD0FF] text-1xl">AVAILABLE FOR WORK</p>
        </div>
        <nav className="text-white flex justify-center flex-wrap items-center gap-2.5 bg-[#0D1C2D] py-2.5 px-3 border border-[#464554] rounded-full">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/skills">Skills</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div>
            <button className="text-[#1000A9] bg-gradient-to-r from-[#8083FF] to-[#00A6E0] rounded-full py-3 px-4 ">Get in Touch</button>
        </div>
      </header>
    </>
  );
}
