import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { METHOD } from "../content";
import { useActiveIndex } from "../hooks";
import { transition } from "../motion";
import { Eyebrow, Reveal, SplitWords } from "../primitives";

export function Method() {
  const listRef = useRef<HTMLOListElement>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const active = useActiveIndex(() => steps.current, "-45% 0px -50% 0px");
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const total = METHOD.steps.length;
  const current = METHOD.steps[active];

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative overflow-clip border-t border-[#f2f2e1]/10 py-24 sm:py-28 lg:py-36"
    >
      <div aria-hidden className="absolute inset-0 bb-grid-bg opacity-[0.15]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow index="04">Process</Eyebrow>
          </div>
          <h2
            id="method-title"
            className="bb-display mt-6 text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95]"
          >
            <SplitWords
              text={METHOD.title}
              trailing={<span className="align-super text-[0.4em] text-[#c6f208]">™</span>}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="bb-body mx-auto mt-6 max-w-md text-base leading-relaxed sm:text-lg">
              {METHOD.sub}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 sm:mt-24">
          {/* Sticky wayfinding: which stage you are reading. */}
          <div className="pointer-events-none sticky top-20 z-10 flex h-0 justify-center sm:top-24">
            <div
              className="bb-mono mt-0 flex items-center gap-3 rounded-full border border-[#f2f2e1]/10 bg-[#050505]/85 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#f2f2e1]/70 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
              aria-hidden
            >
              <span className="flex gap-1">
                {METHOD.steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={`h-1 w-3 rounded-full transition-colors duration-500 ${
                      i <= active ? "bg-[#c6f208]" : "bg-[#f2f2e1]/15"
                    }`}
                  />
                ))}
              </span>
              <span className="tabular-nums text-[#f2f2e1]">
                Stage {active + 1} / {total}
              </span>
              <span className="relative hidden h-4 min-w-[9rem] overflow-hidden sm:block">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.n}
                    className="absolute inset-0 whitespace-nowrap text-left text-[#c6f208]"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={transition.content}
                  >
                    {current.title}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          <ol ref={listRef} className="relative pt-16">
            {/* Spine + scroll-driven progress */}
            <div
              aria-hidden
              className="absolute bottom-0 left-[11px] top-16 w-px bg-[#f2f2e1]/10 md:left-1/2"
            >
              <motion.div
                className="h-full w-full origin-top bg-[#c6f208]"
                style={{ scaleY: reduce ? 1 : fill }}
              />
            </div>

            {METHOD.steps.map((s, i) => {
              const state = i === active ? "active" : i < active ? "past" : "upcoming";
              const left = i % 2 === 0;
              return (
                <li
                  key={s.n}
                  ref={(el) => {
                    steps.current[i] = el;
                  }}
                  aria-current={state === "active" ? "step" : undefined}
                  className="relative grid py-10 pl-12 md:grid-cols-2 md:gap-24 md:py-16 md:pl-0"
                >
                  {/* Node on the spine */}
                  <span
                    aria-hidden
                    className="absolute left-[11px] top-14 -translate-x-1/2 md:left-1/2 md:top-[5.5rem]"
                  >
                    <span
                      className={`block h-3.5 w-3.5 rounded-full border transition-all duration-500 ${
                        state === "upcoming"
                          ? "border-[#f2f2e1]/30 bg-[#050505]"
                          : "border-[#c6f208] bg-[#c6f208] shadow-[0_0_0_6px_rgba(198,242,8,0.12)]"
                      }`}
                    />
                  </span>

                  <div
                    className={`transition-opacity duration-700 ${
                      left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                    } ${state === "active" ? "opacity-100" : state === "past" ? "opacity-75" : "opacity-50"}`}
                  >
                    <div
                      className={`bb-mono flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#f2f2e1]/50 ${
                        left ? "md:justify-end" : ""
                      }`}
                    >
                      Stage {i + 1} / {total}
                    </div>
                    <div
                      aria-hidden
                      className={`bb-display mt-3 text-[clamp(3.5rem,8vw,7rem)] leading-none transition-colors duration-500 ${
                        state === "upcoming" ? "bb-stroke" : "text-[#c6f208]"
                      }`}
                    >
                      {s.n}
                    </div>
                    <h3 className="bb-display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02]">
                      {s.title}
                    </h3>
                    <p
                      className={`bb-body mt-4 max-w-md text-base leading-relaxed sm:text-[1.05rem] ${
                        left ? "md:ml-auto" : ""
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
