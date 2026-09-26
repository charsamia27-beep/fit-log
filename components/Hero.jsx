import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1184px] px-4 pt-6 md:pt-10">
      <div className="overflow-hidden rounded-3xl border border-line bg-linear-to-br from-panel-2 via-panel to-ink px-6 py-10 md:px-12 md:py-14">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="text-center md:text-left">
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-accent">
              WORKOUT LIBRARY
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Train with intent. Log every set.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-gray-300 md:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
              plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(204,255,0,0.35)] transition hover:brightness-110"
            >
              <FiArrowDown className="text-base" />
              Browse Workouts
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/banner.png"
              alt="Athlete training on a gym machine"
              className="w-full max-w-[280px] drop-shadow-2xl md:max-w-[360px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
