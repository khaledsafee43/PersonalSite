import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Skills", path: "/skills" },
//     { name: "Projects", path: "/projects" },
//     { name: "Experience", path: "/experience" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header >

//       {/* Main Header */}
//       <div >

//         {/* Logo / Profile */}
//         <NavLink
//           to="/"
//           className="flex min-w-0 items-center gap-2"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <img
//             src="/MyPicture.png"
//             alt="Khaled Saifee"
//             className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
//           />

//           <div className="min-w-0">
//             <h2 className="truncate text-sm font-semibold text-[#D4E4FA] sm:text-base">
//               Khaled Saifee
//             </h2>

//             <p className="truncate text-xs text-[#C7C4D7] sm:text-sm">
//               Full-Stack Developer
//             </p>
//           </div>
//         </NavLink>

//         {/* Desktop Availability */}
//         <div className="hidden items-center gap-2 rounded-full border border-[#464554] bg-[#0D1C2D] px-3 py-2 lg:flex">
//           <span className="h-2 w-2 rounded-full bg-[#7BD0FF] shadow-[0_0_8px_#7BD0FF]" />

//           <p className="text-xs font-medium text-[#7BD0FF]">
//             AVAILABLE FOR WORK
//           </p>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-1 rounded-full border border-[#464554] bg-[#0D1C2D] p-1 lg:flex">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `rounded-full px-3 py-2 text-sm transition-all duration-200 ${
//                   isActive
//                     ? "bg-[#7BD0FF] font-medium text-[#061525]"
//                     : "text-[#D4E4FA] hover:bg-[#1C2B3C] hover:text-[#7BD0FF]"
//                 }`
//               }
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Desktop CTA */}
//         <NavLink
//           to="/contact"
//           className="hidden rounded-full bg-gradient-to-r from-[#8083FF] to-[#00A6E0] px-4 py-2.5 text-sm font-medium text-[#1000A9] transition-transform duration-200 hover:scale-105 lg:block"
//         >
//           Get in Touch
//         </NavLink>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={isMenuOpen}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#464554] bg-[#0D1C2D] text-[#7BD0FF] transition hover:bg-[#1C2B3C] lg:hidden"
//         >
//           {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (

//           {/* Availability */}
//           <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[#464554] bg-[#0D1C2D] px-3 py-2">
//             <span className="h-2 w-2 rounded-full bg-[#7BD0FF] shadow-[0_0_8px_#7BD0FF]" />

//             <p className="text-xs font-medium text-[#7BD0FF]">
//               AVAILABLE FOR WORK
//             </p>
//           </div>

//           {/* Mobile Navigation */}
//           <nav >
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}

//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Mobile CTA */}
//           <NavLink
//             to="/contact"
//             onClick={() => setIsMenuOpen(false)}
//             className="mt-4 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#8083FF] to-[#00A6E0] px-4 py-3 font-medium text-[#1000A9]"
//           >
//             Get in Touch
//           </NavLink>
//         </div>
//       )}
//     </header>
//   );
// }
import { Menu, X, Moon } from "lucide-react";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full border-b border-cyan-500 bg-[#010F1F] text-white shadow-[0_4px_20px_rgba(34,211,238,0.08)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="focus-ring flex items-center gap-3 rounded-full">
          <span className="animate-background block rounded-full bg-linear-to-r from-green-300 via-blue-600 to-red-300 bg-size-[400%_400%] p-1 [animation-duration:6s]">
            <span class="grid h-10 w-10 place-items-center rounded-full bg-indigo-500 font-black text-white shadow-glow">
              <img
                src="me.png"
                className="object-fill bg-cover w-full h-full rounded-full "
                alt=""
              />
            </span>
          </span>
          <span className="font-bold tracking-tight text-white">
            Khaled<span className="text-indigo-300">Saifee.</span>
          </span>
        </div>
        <nav
          className="flex flex-col gap-1 rounded-2xl border border-[#464554] bg-[#0D1C2D] p-2"
          aria-label="Main navigation"
        >
          <div className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <NavLink
                key={label}
                className="focus-ring text-sm text-slate-300 transition hover:text-[#7BD0FF]"
                to={href}
              >
                {label}
              </NavLink>
            ))}
            <button
              className="rounded-full border border-line p-2 text-slate-300"
              aria-label="Decorative theme icon"
            >
              <Moon size={17} />
            </button>
          </div>
          <button
            className="focus-ring rounded-lg border border-line p-2 md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </div>
      {open && (
        <div className="border-t border-[#26384A] bg-[#010F1F] px-4 pb-5 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1 rounded-2xl border border-[#464554] bg-[#0D1C2D] p-2">
            {links.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-[#7BD0FF] font-medium text-[#061525]"
                      : "text-[#D4E4FA] hover:bg-[#1C2B3C] hover:text-[#7BD0FF]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
