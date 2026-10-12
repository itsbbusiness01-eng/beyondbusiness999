import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FINAL_CTA } from "../content";
import { useExpandingFrame } from "../hooks";
import { ease, revealVariants, revealViewport, staggerContainer } from "../motion";
import { CTAButton, Eyebrow, Reveal } from "../primitives";

/** The limit line, drawn in ink: the curve breaks through and keeps going off the panel. */
function InkLimit() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 400"
      fill="none"
      preserveAspectRatio="xMaxYMid meet"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[80%] w-auto -translate-y-1/2 opacity-50 lg:block"
    >
      <line
        x1="0"
        y1="230"
        x2="600"
        y2="230"
        stroke="#050505"
        strokeOpacity="0.35"
        strokeDasharray="6 10"
      />
      <motion.path
        d="M0 360 C160 350 260 310 340 230 C400 170 470 90 620 30"
        stroke="#050505"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.6, ease: ease.inOut, delay: 0.3 }}
      />
      <motion.circle
        cx="340"
        cy="230"
        r="7"
        fill="#050505"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={revealViewport}
        transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 18 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

export function FinalCta({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const clipPath = useExpandingFrame(ref, 5, 48);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative bg-[#050505]">
      <motion.div
        style={reduce ? undefined : { clipPath }}
        className="relative overflow-hidden bg-[#c6f208] text-[#050505]"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,5,5,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <InkLimit />

        <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-20 lg:py-40">
          <Eyebrow index="08" tone="light">
            Next step
          </Eyebrow>

          <motion.h2
            id="cta-title"
            className="bb-display mt-8 text-[clamp(2.6rem,8.6vw,8.5rem)] leading-[0.9] text-[#050505]"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            {FINAL_CTA.lines.map((line, i) => (
              <span key={line} className="block">
                <span className="bb-mask">
                  <motion.span
                    variants={revealVariants.mask}
                    className={`inline-block ${
                      i === FINAL_CTA.lines.length - 1
                        ? "bg-[#050505] px-[0.12em] text-[#c6f208]"
                        : ""
                    }`}
                  >
                    {line}
                  </motion.span>
                </span>
              </span>
            ))}
          </motion.h2>

          <Reveal
            delay={0.3}
            className="mt-12 flex flex-col gap-8 border-t border-[#050505]/15 pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-md text-base font-medium leading-relaxed text-[#050505]/75 sm:text-lg">
              {FINAL_CTA.sub}
            </p>
            <CTAButton
              variant="ink"
              size="lg"
              onClick={onCTA}
              aria-haspopup="dialog"
              className="self-start md:self-auto"
            >
              {FINAL_CTA.cta}
            </CTAButton>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
