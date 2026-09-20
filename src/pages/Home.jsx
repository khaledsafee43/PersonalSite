export default function HomePage() {
  return (
    <section className="text-white flex gap-2.5 flex-col justify-center p-16 items-center">
      <div className="p-16 flex justify-center items-center flex-col">
        <div className="text-[#7BD0FF] bg-[#0D1C2D] flex mb-8 justify-baseline items-center gap-1.5 py-2 px-3 rounded-full">
          &gt; const role = "Senior Full-Stack Engineer";
          <span className="bg-[#7BD0FF] inline-block h-4 w-1.5"></span>
        </div>
        <h1 className="text-5xl font-bold text-center p-1.5 text-[#D4E4FA]">
          Architecting Scalable Web Experiences from{" "}
          <h2 className="bg-gradient-to-r from-[#7BD0FF] via-[#C0C1FF] to-[#DDB7FF] bg-clip-text text-transparent">
            Concept to Cloud.
          </h2>
        </h1>
        <p className="px-8 text-center text-[#C7C4D7]">
          Bridging the gap between high-performance distributed backend
          architectures and pixel- perfect, accessible user interfaces.
          Specialized in TypeScript, React, Next.js, Go, and Cloud Systems.
        </p>
      </div>
    </section>
  );
}
