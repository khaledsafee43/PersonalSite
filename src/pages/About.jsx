export default function About() {
  return (
    <main className="min-h-screen bg-[#010F1F] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mt-2 max-w-7xl px-2 sm:px-4 lg:px-6">
        <p className="text-start text-base text-[#7BD0FF] sm:text-lg">
          // 01. who I am <span className="text-[#7BD0FF]">\</span>
        </p>

        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Passionate Full-Stack Developer Building Modern Web Experiences
        </h1>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-2 sm:px-4 lg:grid-cols-12">
        
        {/* About Content */}
        <div className="rounded-2xl bg-[#0D1C2D] p-5 shadow-md sm:p-7 lg:col-span-7 lg:p-8">
          <h2 className="mb-4 text-xl font-bold text-[#D4E4FA] sm:text-2xl">
            Turning Ideas Into Scalable Digital Solutions
          </h2>

          <p className="mb-5 text-sm leading-7 text-gray-300 sm:text-base">
            I am a passionate Full-Stack Web Developer from Afghanistan,
            specializing in building responsive, user-friendly, and functional
            web applications. I work with modern technologies including
            React.js, TypeScript, Tailwind CSS, Node.js, Express.js, and
            databases such as MongoDB and MySQL.
          </p>

          <p className="mb-6 text-sm leading-7 text-gray-300 sm:text-base">
            I enjoy solving real-world problems through clean code, thoughtful
            design, and efficient backend architecture. My goal is to
            continuously improve my skills, build meaningful digital products,
            and help businesses turn their ideas into reliable web solutions.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-lg bg-[#122131] p-5 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#908FA0]">
                Location
              </p>

              <p className="mt-2 text-sm text-[#D4E4FA]">
                Herat, Afghanistan
              </p>

              <p className="mt-1 text-sm text-[#7BD0FF]">
                Remote Worldwide
              </p>
            </div>

            <div className="rounded-lg bg-[#122131] p-5 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#908FA0]">
                Availability
              </p>

              <p className="mt-2 text-sm text-[#D4E4FA]">
                Open to Freelance Projects
              </p>

              <p className="mt-1 text-sm text-[#7BD0FF]">
                Full-Time / Contracts
              </p>
            </div>

            <div className="rounded-lg bg-[#122131] p-5 shadow-lg sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#908FA0]">
                Timezone
              </p>

              <p className="mt-2 text-sm text-[#D4E4FA]">
                UTC-7 (PST)
              </p>

              <p className="mt-1 text-sm text-[#7BD0FF]">
                Global overlap
              </p>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="w-full rounded-2xl bg-[#0D1C2D] p-3 shadow-md lg:col-span-5">
          <img
            src="me.png"
            alt="Khaled Saifee"
            className="h-auto max-h-[600px] min-h-[350px] w-full rounded-2xl object-cover object-center sm:max-h-[700px] lg:h-full lg:max-h-none"
          />
        </div>

      </div>
    </main>
  );
}