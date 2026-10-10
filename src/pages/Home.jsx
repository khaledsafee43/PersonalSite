  import { DownloadIcon, ArrowDown, TerminalSquareIcon, Layers3, Gauge, GaugeCircleIcon } from "lucide-react";
import About from "./About";
  export default function HomePage() {
    return (
      <>
      <section className="relative text-white flex gap-2.5 flex-col justify-center p-16 items-center">
        <div
          className="bg-[#8082ff18] blur-3xl w-[670px] h-[414px]
      rounded-full
      border border-cyan-400/70
      shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        ></div>
        <div className="absolute p-14 top-5 flex justify-center items-center flex-col">
          <div className="text-[#7BD0FF] bg-[#0D1C2D] flex mb-8 justify-baseline items-center gap-1.5 py-2 px-3 rounded-full">
            &gt; const role = "Senior Full-Stack Engineer";
            <span className="bg-[#7BD0FF] inline-block h-4 w-1.5 animate-[glow_4s_ease-in-out_infinite]"></span>
          </div>
          <h1 className="text-5xl font-bold text-center p-1.5 text-[#D4E4FA]">
            Architecting Scalable Web Experiences from{" "}
            <h2 className="bg-gradient-to-r from-[#7BD0FF] via-[#C0C1FF] to-[#DDB7FF] bg-clip-text text-transparent">
              Concept to Cloud.
            </h2>
          </h1>
          <p className="px-8 text-center w-[766px] pt-5 p-1 text-[#C7C4D7]">
            Bridging the gap between high-performance distributed backend
            architectures and pixel- perfect, accessible user interfaces.
            Specialized in TypeScript, React, Next.js, Go, and Cloud Systems.
          </p>
          <div className="flex gap-5 p-4">
            <button className="bg-gradient-to-r py-2.5 px-5 rounded-full flex gap-1 from-[#8083FF]  to-[#00A6E0] text-[#1000A9] font-medium">See My Work <ArrowDown/></button>
            <button className="bg-[#1C2B3C] text-[#D4E4FA] flex items-center py-2.5 px-4 rounded-full justify-between gap-1"><DownloadIcon className="text-[#7BD0FF]"/>Download Resume</button>
          </div>
        </div>
        <div className="flex items-center justify-center mb-3 gap-2.5">
          <div className="bg-[#0D1C2D] border border-[#464554] rounded-lg p-2 flex gap-2 items-center">
            <TerminalSquareIcon className="text-[#7BD0FF]"/>
            <p className="text-[#D4E4FA]">npm i @fullstack/core</p>
          </div>
          <div className="bg-[#0D1C2D] border border-[#464554] rounded-lg p-2 flex gap-2 items-center">
            <Layers3 />
            <p className="text-[#D4E4FA]">&lt; Architecture /&gt;</p>
          </div>
          <div className="bg-[#0D1C2D] border border-[#464554] rounded-lg p-2 flex gap-2 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <p className="text-[#D4E4FA]">HTTP/3 200 OK</p>
          </div>
          <div className="bg-[#0D1C2D] border border-[#464554] rounded-lg p-2 flex gap-2 items-center">
            <GaugeCircleIcon className="text-[#DDB7FF]"/>
            <p className="text-[#D4E4FA]">Query Latency: 12ms</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#0D1C2D] rounded-2xl p-8 place-content-center gap-2.5">
          <div className="flex flex-col items-center justify-center py-2 px-8 gap-1.5">
            <h2 className="text-3xl font-bold text-[#DDB7FF]">1+</h2>
            <p className="text-[#C0C1FF]">Years of Experience</p>
          </div>
          <div className="flex flex-col items-center justify-center py-2 px-8 gap-1.5">
            <h2 className="text-3xl font-bold text-[#7BD0FF]">4+</h2>
            <p className="text-[#C0C1FF]">Production Deployments</p>
          </div>
          <div className="flex flex-col items-center justify-center py-2 px-8 gap-1.5">
            <h2 className="text-3xl font-bold text-[#DDB7FF]">99.99%</h2>
            <p className="text-[#C0C1FF]">Uptime Architecture</p>
          </div>
          <div className="flex flex-col items-center justify-center py-2 px-8 gap-1.5">
            <h2 className="text-3xl font-bold text-[#C7C4D7]">164</h2>
            <p className="text-[#C0C1FF]">Github Stars & pushes</p>
          </div>
        </div>
      </section>
      <About/>
      </>
    );
  }
