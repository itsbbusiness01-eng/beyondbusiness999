import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { HERO, TAGLINE } from "../content";
import { scrollToSection } from "../lenis";
import { ease } from "../motion";
import { CTAButton } from "../primitives";

/*
 * The hero's entrance runs on CSS keyframes (`.bb-intro-*` in styles.css), timed against the
 * intro wipe through `--bb-intro-delay`. It starts from first paint – never waiting on
 * hydration – and returning or reduced-motion visitors get it with no delay at all.
 */
const at = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/*
 * The signature graphic: a growth curve that runs flat under a dashed "limit", then turns
 * lime at the exact point it breaks through. Purely decorative (aria-hidden).
 */
function LimitGraphic({ y }: { y?: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden
      style={y ? { y } : undefined}
      className="pointer-events-none absolute inset-x-0 top-[14%] h-[42%] md:inset-y-0 md:left-auto md:right-0 md:top-0 md:h-full md:w-[78%]"
    >
      <svg
        viewBox="0 0 1200 800"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <radialGradient id="bb-hero-glow">
            <stop offset="0%" stopColor="#c6f208" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c6f208" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle
          cx="740"
          cy="420"
          r="260"
          fill="url(#bb-hero-glow)"
          className="bb-intro-fade"
          style={at(1.1)}
        />

        {/* The limit */}
        <line
          x1="0"
          y1="420"
          x2="1200"
          y2="420"
          stroke="#f2f2e1"
          strokeOpacity="0.28"
          strokeDasharray="6 10"
          className="bb-intro-fade"
          style={at(0.1)}
        />
        <text
          x="1184"
          y="448"
          textAnchor="end"
          fill="#f2f2e1"
          fillOpacity="0.4"
          fontSize="13"
          letterSpacing="4"
          fontFamily="Space Grotesk, sans-serif"
          className="bb-intro-fade"
          style={at(0.3)}
        >
          LIMIT
        </text>

        {/* Growth below the limit, then beyond it */}
        <path
          d="M0 720 C320 705 560 610 740 420"
          pathLength={1}
          stroke="#f2f2e1"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          className="bb-intro-draw"
          style={at(0.2)}
        />
        <path
          d="M740 420 C860 290 1000 150 1200 70"
          pathLength={1}
          stroke="#c6f208"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="bb-intro-draw"
          style={at(1.2)}
        />

        {/* Breakthrough point */}
        <g className="bb-intro-pop" style={at(1.15)}>
          <circle
            cx="740"
            cy="420"
            r="18"
            stroke="#c6f208"
            strokeOpacity="0.6"
            className="bb-pulse"
          />
          <circle cx="740" cy="420" r="6" fill="#c6f208" />
        </g>
        <text
          x="764"
          y="452"
          fill="#c6f208"
          fontSize="13"
          letterSpacing="4"
          fontFamily="Space Grotesk, sans-serif"
          className="bb-intro-fade"
          style={at(1.5)}
        >
          BEYOND
        </text>
      </svg>
    </motion.div>
  );
}

export function Hero({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const graphY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bb-noise"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bb-grid-bg bb-grid-fade opacity-70" />
      <LimitGraphic y={reduce ? undefined : graphY} />

      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-4 pb-24 pt-32 sm:px-8 sm:pb-24 md:pb-28 lg:px-12 xl:px-20"
      >
        <p
          className="bb-intro-soft bb-mono flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-[#f2f2e1]/60"
          style={at(0.05)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c6f208]" />
          {TAGLINE}
        </p>

        <h1 className="bb-display mt-5 text-[clamp(2.75rem,9vw,8.75rem)] leading-[0.9] sm:mt-6">
          {HERO.lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const delay = 0.1 + wordIndex * 0.06;
                wordIndex += 1;
                const tone =
                  word.tone === "lime"
                    ? "text-[#c6f208]"
                    : word.tone === "stroke"
                      ? "bb-stroke"
                      : "";
                return (
                  <span key={`${word.text}-${wordIndex}`}>
                    <span className="bb-mask">
                      <span className={`bb-intro-rise inline-block ${tone}`} style={at(delay)}>
                        {word.text}
                      </span>
                    </span>
                    {wi < line.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div
          className="bb-intro-soft mt-10 grid gap-8 border-t border-[#f2f2e1]/10 pt-7 md:mt-12 md:grid-cols-12 md:items-end"
          style={at(0.75)}
        >
          <p className="bb-body max-w-md text-base leading-relaxed sm:text-lg md:col-span-6 lg:col-span-5">
            {HERO.sub}
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center md:col-span-6 md:justify-end lg:col-span-7">
            <CTAButton
              size="lg"
              magnetic
              onClick={onCTA}
              className="w-full sm:w-auto"
              aria-haspopup="dialog"
            >
              {HERO.cta}
            </CTAButton>
            <button
              type="button"
              onClick={() => scrollToSection("track-record")}
              className="group hidden items-center gap-3 self-center text-[0.65rem] uppercase tracking-[0.4em] text-[#f2f2e1]/60 transition-colors hover:text-[#f2f2e1] sm:flex"
              aria-label="Scroll to our track record"
            >
              Scroll
              <span className="relative block h-10 w-px overflow-hidden bg-[#f2f2e1]/15">
                <motion.span
                  className="absolute inset-x-0 top-0 block h-1/2 bg-[#c6f208]"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: ease.inOut }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
