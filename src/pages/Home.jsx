import {
  DownloadIcon,
  ArrowDown,
  TerminalSquareIcon,
  Layers3,
  GaugeCircleIcon,
} from "lucide-react";

import About from "./About";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8">

        {/* Background Glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-[280px] w-[280px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            border border-cyan-400/40
            bg-[#8082ff18]
            blur-3xl
            shadow-[0_0_30px_rgba(34,211,238,0.15)]
            sm:h-[400px] sm:w-[400px]
            lg:h-[520px] lg:w-[670px]
          "
        />

        {/* Hero Content */}
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">

          {/* Role Badge */}
          <div
            className="
              mb-6 flex max-w-full items-center gap-1.5
              overflow-hidden rounded-full
              bg-[#0D1C2D]
              px-3 py-2
              text-xs text-[#7BD0FF]
              sm:text-sm
            "
          >
            <span className="truncate">
              &gt; const role = "Senior Full-Stack Engineer";
            </span>

            <span className="inline-block h-4 w-1.5 shrink-0 bg-[#7BD0FF] animate-[glow_4s_ease-in-out_infinite]" />
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-4xl
              text-3xl font-bold leading-tight
              text-[#D4E4FA]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
          "
          >
            Architecting Scalable Web Experiences from{" "}
            <span
              className="
                block
                bg-gradient-to-r
                from-[#7BD0FF]
                via-[#C0C1FF]
                to-[#DDB7FF]
                bg-clip-text
                text-transparent
              "
            >
              Concept to Cloud.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              w-full max-w-3xl
              px-2
              text-sm leading-6
              text-[#C7C4D7]
              sm:px-4 sm:text-base sm:leading-7
              lg:text-lg
            "
          >
            Bridging the gap between high-performance distributed backend
            architectures and pixel-perfect, accessible user interfaces.
            Specialized in TypeScript, React, Next.js, Node.js, and Cloud
            Systems.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">

            <button
              className="
                flex w-full items-center justify-center gap-2
                rounded-full
                bg-gradient-to-r
                from-[#8083FF] to-[#00A6E0]
                px-6 py-3
                font-medium
                text-[#1000A9]
                transition-transform
                hover:scale-105
                sm:w-auto
              "
            >
              See My Work
              <ArrowDown size={18} />
            </button>

            <button
              className="
                flex w-full items-center justify-center gap-2
                rounded-full
                bg-[#1C2B3C]
                px-5 py-3
                text-[#D4E4FA]
                transition-colors
                hover:bg-[#24374c]
                sm:w-auto
              "
            >
              <DownloadIcon
                size={18}
                className="text-[#7BD0FF]"
              />
              Download Resume
            </button>

          </div>
        </div>

        {/* Technology / Status Cards */}
        <div
          className="
            relative z-10
            mt-10
            grid w-full max-w-6xl
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {/* Card 1 */}
          <div
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#464554]
              bg-[#0D1C2D]
              p-3
            "
          >
            <TerminalSquareIcon
              size={20}
              className="shrink-0 text-[#7BD0FF]"
            />

            <p className="truncate text-sm text-[#D4E4FA]">
              npm i @fullstack/core
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#464554]
              bg-[#0D1C2D]
              p-3
            "
          >
            <Layers3
              size={20}
              className="shrink-0 text-[#DDB7FF]"
            />

            <p className="text-sm text-[#D4E4FA]">
              &lt; Architecture /&gt;
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#464554]
              bg-[#0D1C2D]
              p-3
            "
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />

            <p className="text-sm text-[#D4E4FA]">
              HTTP/3 200 OK
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#464554]
              bg-[#0D1C2D]
              p-3
            "
          >
            <GaugeCircleIcon
              size={20}
              className="shrink-0 text-[#DDB7FF]"
            />

            <p className="text-sm text-[#D4E4FA]">
              Query Latency: 12ms
            </p>
          </div>

        </div>

        {/* Statistics */}
        <div
          className="
            relative z-10
            mt-6
            grid w-full max-w-5xl
            grid-cols-2
            overflow-hidden
            rounded-2xl
            bg-[#0D1C2D]
            p-4
            sm:grid-cols-4
            sm:p-6
          "
        >

          {/* Stat 1 */}
          <div
            className="
              flex flex-col items-center justify-center
              gap-1
              border-b border-[#26384a]
              px-2 py-5
              sm:border-b-0 sm:border-r
            "
          >
            <h2 className="text-2xl font-bold text-[#DDB7FF] sm:text-3xl">
              1+
            </h2>

            <p className="text-center text-xs text-[#C0C1FF] sm:text-sm">
              Years of Experience
            </p>
          </div>

          {/* Stat 2 */}
          <div
            className="
              flex flex-col items-center justify-center
              gap-1
              border-b border-[#26384a]
              px-2 py-5
              sm:border-b-0 sm:border-r
            "
          >
            <h2 className="text-2xl font-bold text-[#7BD0FF] sm:text-3xl">
              4+
            </h2>

            <p className="text-center text-xs text-[#C0C1FF] sm:text-sm">
              Production Deployments
            </p>
          </div>

          {/* Stat 3 */}
          <div
            className="
              flex flex-col items-center justify-center
              gap-1
              px-2 py-5
              sm:border-r
            "
          >
            <h2 className="text-2xl font-bold text-[#DDB7FF] sm:text-3xl">
              99.99%
            </h2>

            <p className="text-center text-xs text-[#C0C1FF] sm:text-sm">
              Uptime Architecture
            </p>
          </div>

          {/* Stat 4 */}
          <div
            className="
              flex flex-col items-center justify-center
              gap-1
              px-2 py-5
            "
          >
            <h2 className="text-2xl font-bold text-[#C7C4D7] sm:text-3xl">
              164
            </h2>

            <p className="text-center text-xs text-[#C0C1FF] sm:text-sm">
              GitHub Stars & Pushes
            </p>
          </div>

        </div>
      </section>

      <About />
    </>
  );
}