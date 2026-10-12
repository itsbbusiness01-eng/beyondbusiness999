import { CLIENT_LOGOS, TRACK_RECORD } from "../content";
import {
  CTAButton,
  Counter,
  Eyebrow,
  Reveal,
  RevealItem,
  SplitWords,
  Stagger,
} from "../primitives";

export function Proof({ onCTA }: { onCTA: () => void }) {
  return (
    <section
      id="track-record"
      aria-labelledby="track-record-title"
      className="relative border-t border-[#f2f2e1]/10 pt-24 sm:pt-28 lg:pt-36"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="01">Proof</Eyebrow>
            <h2
              id="track-record-title"
              className="bb-display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]"
            >
              <SplitWords text={TRACK_RECORD.title} />
            </h2>
          </div>
          <Reveal className="md:col-span-5 lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="bb-body max-w-sm text-base leading-relaxed sm:text-lg">
              {TRACK_RECORD.sub}
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid border-t border-[#f2f2e1]/10 sm:mt-20 md:grid-cols-2"
          gap={0.1}
        >
          {TRACK_RECORD.metrics.map((m, i) => (
            <RevealItem
              key={m.label}
              className={`group relative border-b border-[#f2f2e1]/10 py-9 sm:py-12 md:py-14 ${
                i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-[#c6f208] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
              <div className="bb-mono flex items-center justify-between text-[0.7rem] text-[#c6f208]">
                <span>0{i + 1}</span>
              </div>
              <div className="bb-display mt-6 whitespace-nowrap text-[clamp(3rem,8vw,7.5rem)] leading-none text-[#f2f2e1]">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-5 max-w-[30ch] text-[0.68rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-[#f2f2e1]/60 sm:text-xs">
                {m.label}
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>

      {/* Client proof sits on the brand cream – logos keep their true colours. */}
      <div className="mt-20 bg-[#f2f2e1] text-[#050505] sm:mt-24">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 sm:py-14 lg:px-12 xl:px-20">
          <Eyebrow tone="light">Brands we've worked with</Eyebrow>
          <Stagger
            className="mt-8 grid grid-cols-2 border-l border-t border-[#050505]/10 sm:grid-cols-3 lg:grid-cols-6"
            gap={0.06}
          >
            {CLIENT_LOGOS.map((logo) => (
              <RevealItem
                key={logo.name}
                kind="fade"
                className="group relative flex aspect-[3/2] items-center justify-center border-b border-r border-[#050505]/10"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  decoding="async"
                  className={`max-h-[42%] max-w-[68%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
                    logo.whiteGround ? "mix-blend-multiply" : ""
                  }`}
                />
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>

      <div className="flex justify-center px-4 py-16 sm:py-20">
        <CTAButton onClick={onCTA} aria-haspopup="dialog">
          {TRACK_RECORD.cta}
        </CTAButton>
      </div>
    </section>
  );
}
