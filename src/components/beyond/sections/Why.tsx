import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { WHY } from "../content";
import { useExpandingFrame } from "../hooks";
import { Eyebrow, SplitWords } from "../primitives";

function FillWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Unread words stay at 50% (≈3.8:1 on cream) – legible, passing WCAG for large text.
  const opacity = useTransform(progress, range, [0.5, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

export function Why() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const clipPath = useExpandingFrame(sectionRef);

  const { scrollYProgress: read } = useScroll({
    target: statementRef,
    offset: ["start 85%", "end 55%"],
  });
  const highlight = useTransform(read, [0.75, 1], ["0%", "100%"]);

  const leadWords = WHY.lead.split(" ");
  const emphasisWords = WHY.emphasis.split(" ");
  const all = leadWords.length + emphasisWords.length;
  const span = 0.75; // words finish filling before the highlighter swipes in
  const rangeFor = (i: number): [number, number] => [(i / all) * span, ((i + 1) / all) * span];

  return (
    <section ref={sectionRef} aria-labelledby="why-title" className="relative bg-[#050505]">
      <motion.div style={reduce ? undefined : { clipPath }} className="bg-[#f2f2e1] text-[#050505]">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-20 lg:py-44">
          <Eyebrow index="05" tone="light">
            Why us
          </Eyebrow>
          <h2
            id="why-title"
            className="bb-display mt-6 max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] text-[#050505]"
          >
            <SplitWords text={WHY.title} />
          </h2>

          <p
            ref={statementRef}
            className="bb-display mt-16 max-w-6xl text-[clamp(2.5rem,7.4vw,7.5rem)] leading-[0.95] text-[#050505] sm:mt-24"
          >
            {leadWords.map((w, i) =>
              reduce ? (
                <span key={i}>{w} </span>
              ) : (
                <span key={i}>
                  <FillWord word={w} progress={read} range={rangeFor(i)} />{" "}
                </span>
              ),
            )}
            <br className="hidden sm:block" />
            <motion.span
              className="bb-highlight"
              style={{ ["--bb-hl" as string]: reduce ? "100%" : highlight }}
            >
              {emphasisWords.map((w, i) =>
                reduce ? (
                  <span key={i}>
                    {w}
                    {i < emphasisWords.length - 1 ? " " : ""}
                  </span>
                ) : (
                  <span key={i}>
                    <FillWord word={w} progress={read} range={rangeFor(leadWords.length + i)} />
                    {i < emphasisWords.length - 1 ? " " : ""}
                  </span>
                ),
              )}
            </motion.span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
