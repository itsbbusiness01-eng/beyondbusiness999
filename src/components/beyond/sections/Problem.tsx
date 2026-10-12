import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { PROBLEM } from "../content";
import { transition } from "../motion";
import { CTAButton, Eyebrow, Reveal, SplitWords } from "../primitives";

/*
 * A centred, conversational stack – deliberately unlike the split layouts of Services and FAQ.
 * Each question is itself the toggle, so the whole line is the touch target and assistive
 * tech announces the question together with its pressed state.
 */

function Tally({ yes }: { yes: boolean[] }) {
  const count = yes.filter(Boolean).length;
  return (
    <div className="mx-auto mt-8 w-56" aria-hidden>
      <div className="flex gap-1.5">
        {yes.map((on, i) => (
          <motion.span
            key={i}
            className="h-1 flex-1 rounded-full"
            animate={{ backgroundColor: on ? "#c6f208" : "rgba(242,242,225,0.14)" }}
            transition={transition.ui}
          />
        ))}
      </div>
      <p className="bb-mono mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#f2f2e1]/60">
        {count} / {yes.length} sound familiar
      </p>
    </div>
  );
}

function Question({
  index,
  text,
  pressed,
  onToggle,
}: {
  index: number;
  text: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={pressed}
      className="group flex w-full flex-col items-center px-2 py-9 text-center sm:py-11"
      data-cursor="hover"
    >
      <span
        aria-hidden
        className={`bb-mono text-xs transition-colors duration-300 ${
          pressed ? "text-[#c6f208]" : "text-[#f2f2e1]/55"
        }`}
      >
        0{index + 1}
      </span>
      <span
        className={`bb-display mt-4 block max-w-4xl text-[clamp(1.6rem,4.2vw,3.5rem)] leading-[1.04] transition-colors duration-500 ${
          pressed ? "text-[#c6f208]" : "group-hover:text-[#f2f2e1]"
        }`}
      >
        {text}
      </span>
      <span
        aria-hidden
        className={`mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
          pressed
            ? "border-[#c6f208] bg-[#c6f208] text-[#050505]"
            : "border-[#f2f2e1]/20 text-[#f2f2e1]/70 group-hover:border-[#c6f208] group-hover:text-[#c6f208]"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pressed ? "on" : "off"}
            initial={{ scale: 0.4, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0, rotate: 45 }}
            transition={transition.ui}
            className="flex"
          >
            {pressed ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </motion.span>
        </AnimatePresence>
        That's me
      </span>
    </button>
  );
}

export function Problem({ onCTA }: { onCTA: () => void }) {
  const [yes, setYes] = useState<boolean[]>(() => PROBLEM.questions.map(() => false));
  const count = yes.filter(Boolean).length;
  const total = PROBLEM.questions.length;

  return (
    <section
      aria-labelledby="problem-title"
      className="relative border-t border-[#f2f2e1]/10 bg-[#0b0b0a] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-20">
        <div className="text-center">
          <div className="flex justify-center">
            <Eyebrow index="02">Diagnosis</Eyebrow>
          </div>
          <h2
            id="problem-title"
            className="bb-display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]"
          >
            <SplitWords text={PROBLEM.title} />
          </h2>
          <Tally yes={yes} />
        </div>

        <ol className="mx-auto mt-12 max-w-5xl divide-y divide-[#f2f2e1]/10 border-y border-[#f2f2e1]/10 sm:mt-16">
          {PROBLEM.questions.map((q, i) => (
            <li key={q}>
              <Reveal>
                <Question
                  index={i}
                  text={q}
                  pressed={yes[i]}
                  onToggle={() => setYes((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center">
          <p
            aria-live="polite"
            className="bb-mono min-h-[1.25rem] text-[0.7rem] uppercase tracking-[0.22em] text-[#c6f208]"
          >
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={transition.ui}
                  className="inline-block"
                >
                  You said yes to {count} of {total}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
          <p className="bb-body mt-3 text-base leading-relaxed sm:text-lg">{PROBLEM.closing}</p>
          <CTAButton onClick={onCTA} className="mt-8" aria-haspopup="dialog">
            {PROBLEM.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
