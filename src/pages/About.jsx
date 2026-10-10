export default function About() {
  return (
    <main className="bg-[#010F1F] p-3 text-white min-h-screen">
      <div className="px-6 py-2 mt-4">
        <p className="text-start  text-lg text-[#7BD0FF]">
          // 01. who I am <span className="text-[#7BD0FF]"></span>
        </p>
        <h1 className="text-4xl font-bold mt-3">
          Passionate Full-Stack Developer Building Modern Web Experiences
        </h1>
      </div>
      <div className="grid grid-cols-1  gap-8 mt-8 p-12 md:grid-cols-12">
        <div className="bg-[#0D1C2D] text-lg col-span-8 p-8 rounded-lg relative ">
          <h2 className="text-2xl mb-3 font-bold text-[#D4E4FA]">
            Turning Ideas Into Scalable Digital Solutions
          </h2>
          <p className="flex items-center justify-start mb-4">
            I am a passionate Full-Stack Web Developer from Afghanistan,
            specializing in building responsive, user-friendly, and functional
            web applications. I work with modern technologies including
            React.js, TypeScript, Tailwind CSS, Node.js, Express.js, and
            databases such as MongoDB and MySQL.
          </p>
          <p className="flex items-center justify-start mb-4">
            I enjoy solving real-world problems through clean code, thoughtful
            design, and efficient backend architecture. My goal is to
            continuously improve my skills, build meaningful digital products,
            and help businesses turn their ideas into reliable web solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-[#122131] p-4 rounded-lg shadow-lg px-8">
              <p className="text-[#908FA0] uppercase text-[14px] font-semibold">
                Location
              </p>
              <p className="text-[#D4E4FA]">Herat, Afghanistan</p>
              <p className="text-[#7BD0FF]">Remote Worldwide</p>
            </div>
            <div className="bg-[#122131] p-4 rounded-lg shadow-lg px-8">
              <p className="text-[#908FA0] uppercase text-[14px] font-semibold">
                AVAILABILITY
              </p>
              <p className="text-[#D4E4FA] text-[14px]">Open to Freelance Projects</p>
              <p className="text-[#7BD0FF]">Full-Time / Contracts</p>
            </div>
            <div className="bg-[#122131] p-4 rounded-lg shadow-lg px-8">
              <p className="text-[#908FA0] uppercase text-[14px] font-semibold">
                TIMEZONE
              </p>
              <p className="text-[#D4E4FA]">UTC-7 (PST)</p>
              <p className="text-[#7BD0FF]">Global overlap</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0D1C2D] col-span-4 rounded-lg p-8 flex justify-center items-center">
          <img
            src="me.png"
            alt="Khaled Saifee"
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
