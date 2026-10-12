import { motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { FAQS, FAQ_TITLE } from "../content";
import { transition } from "../motion";
import { Collapse, Eyebrow, Reveal, SplitWords } from "../primitives";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
        open
          ? "border-[#c6f208] bg-[#c6f208] text-[#050505]"
          : "border-[#f2f2e1]/20 text-[#f2f2e1] group-hover:border-[#c6f208] group-hover:text-[#c6f208]"
      }`}
    >
      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
      <motion.span
        className="absolute h-3.5 w-[1.5px] rounded-full bg-current"
        animate={{ rotate: open ? 90 : 0, scaleY: open ? 0 : 1 }}
        transition={transition.expand}
      />
    </span>
  );
}

export function Faq() {
  // One answer open at a time; the first starts open (as before).
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // WAI-ARIA accordion keyboard support: ↑ ↓ Home End move between questions.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = FAQS.length - 1;
    const target =
      e.key === "ArrowDown"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-[#f2f2e1]/10 bg-[#0b0b0a] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 xl:px-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="07">FAQ</Eyebrow>
            <h2
              id="faq-title"
              className="bb-display mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.98]"
            >
              <SplitWords text={FAQ_TITLE} />
            </h2>
            <Reveal delay={0.2}>
              <p className="bb-mono mt-8 text-[0.7rem] uppercase tracking-[0.22em] text-[#f2f2e1]/60">
                {FAQS.length} questions
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-7" kind="fade">
          <div className="border-t border-[#f2f2e1]/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              const btnId = `faq-q-${i}`;
              const panelId = `faq-a-${i}`;
              return (
                <div
                  key={f.q}
                  className={`border-b transition-colors duration-500 ${
                    isOpen ? "border-[#c6f208]/40" : "border-[#f2f2e1]/10"
                  }`}
                >
                  <h3>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7"
                      data-cursor="hover"
                    >
                      <span
                        className={`bb-mono mt-1.5 w-6 shrink-0 text-xs transition-colors duration-500 ${
                          isOpen ? "text-[#c6f208]" : "text-[#f2f2e1]/55"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-xl lg:text-[1.35rem] ${
                          isOpen ? "text-[#f2f2e1]" : "text-[#f2f2e1]/80 group-hover:text-[#f2f2e1]"
                        }`}
                      >
                        {f.q}
                      </span>
                      <PlusMinus open={isOpen} />
                    </button>
                  </h3>
                  <Collapse open={isOpen} id={panelId} role="region" labelledBy={btnId}>
                    <p className="bb-body max-w-2xl pb-8 pl-10 pr-4 text-base leading-relaxed sm:pl-12 sm:pr-16 sm:text-[1.05rem]">
                      {f.a}
                    </p>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
