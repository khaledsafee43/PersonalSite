import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="sticky z-50 box-border top-0 left-0 right-0">
        <div className="bg-[#010F1F] w-full h-20 flex justify-around border-b border-[#464554] items-center text-white">
          <div className="flex items-center gap-2">
            <img
              src="/MyPicture.png"
              alt="my picture"
              className="w-14 h-14 rounded-full"
            />
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
            <Link
              to="/"
              className="bg-[#1C2B3C] border-[#000000] border px-4 py-2 rounded-full"
            >
              Home
            </Link>
            <Link>About</Link>
            <p>Skills</p>
            <Link to="/projects">Projects</Link>
            <p>Experience</p>
            <p>Contact</p>
          </nav>
          <div>
            <button className="text-[#1000A9] bg-gradient-to-r from-[#8083FF] to-[#00A6E0] rounded-full py-3 px-4 ">
              Get in Touch
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
