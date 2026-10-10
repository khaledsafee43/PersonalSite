export default function About() {
  return (
    <main className="bg-[#010F1F] text-white min-h-screen">
      <div>
        <p className="text-start text-lg text-[#7BD0FF]">
          // 01. who I am <span className="text-[#7BD0FF]"></span>
        </p>
        <h1 className="text-4xl font-bold">
          Passionate About Solving Complex Engineering Problems
        </h1>
      </div>
      <div className="grid grid-cols-1  gap-x-24 mt-8 p-12 md:grid-cols-2">
        <div className="bg-[#0D1C2D] text-lg flex flex-col gap-4 p-8 w-[700px] rounded-lg relative ">
          <h2 className="text-2xl font-bold text-[#D4E4FA]">
            Engineering with Dual Mastery in Systems and Interfaces
          </h2>
          <p>
            I am a seasoned Software Architect and Full-Stack Developer with
            over six years of experience building mission-critical distributed
            services, responsive real-time data engines, and fluid design
            systems.
          </p>
          <p>
            My engineering philosophy revolves around three foundational tenets:
            uncompromising system resilience, developer experience that promotes
            frictionless shipping, and human-centered design where performance
            is treated as a top-tier aesthetic.
          </p>
          <div className="flex gap-8 mt-4">
            <div>
              <p>Location</p>
              <p>Afghanistan</p>
              <p>Remote available</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0D1C2D] rounded-lg p-8 flex justify-center items-center">
          <img
            src="MyPicture.png"
            alt="Khaled Saifee"
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
