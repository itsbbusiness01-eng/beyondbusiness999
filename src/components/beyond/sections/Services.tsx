import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { SERVICES, SERVICES_INTRO, type Service } from "../content";
import { useActiveIndex, useMediaQuery } from "../hooks";
import { scrollToSection } from "../lenis";
import { transition } from "../motion";
import { ServiceGlyph } from "../ServiceGlyph";
import { CTAButton, Collapse, Eyebrow, Reveal, SplitWords } from "../primitives";

const PREVIEW_COUNT = 6;

function Feature({ text, n }: { text: string; n: number }) {
  return (
    <li className="flex items-baseline gap-4 border-b border-[#f2f2e1]/[0.08] py-3.5 text-[0.95rem] leading-snug text-[#f2f2e1]/80">
      <span className="bb-mono w-5 shrink-0 text-[0.65rem] text-[#c6f208]/80">
        {String(n).padStart(2, "0")}
      </span>
      {text}
    </li>
  );
}

function ServicePanel({
  service,
  index,
  active,
  onCTA,
  panelRef,
}: {
  service: Service;
  index: number;
  active: boolean;
  onCTA: () => void;
  panelRef: (el: HTMLElement | null) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [expanded, setExpanded] = useState(false);
  const listId = `service-${service.tag}-more`;
  const preview = service.features.slice(0, PREVIEW_COUNT);
  const rest = service.features.slice(PREVIEW_COUNT);
  const showRest = expanded || isDesktop;

  return (
    <article
      ref={panelRef}
      id={`service-${service.tag}`}
      data-anchor
      aria-labelledby={`service-${service.tag}-title`}
      className="relative border-t border-[#f2f2e1]/10 py-12 sm:py-14 lg:py-20"
    >
      <div className="grid items-start gap-8 sm:grid-cols-[1fr_auto]">
        <Reveal>
          <div className="bb-mono flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#f2f2e1]/50">
            <span className="text-[#c6f208]">{service.tag}</span>
            <span aria-hidden className="h-px w-8 bg-[#f2f2e1]/25" />
            <span>
              Service {index + 1} of {SERVICES.length}
            </span>
          </div>
          <h3
            id={`service-${service.tag}-title`}
            className="bb-display mt-5 text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.98]"
          >
            {service.headline}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#c6f208]/85 sm:text-lg">
            {service.sub}
          </p>
        </Reveal>

        <Reveal kind="scale" delay={0.1} className="w-36 sm:w-44 lg:w-52">
          <div
            className={`rounded-2xl border p-4 transition-colors duration-700 ${
              active
                ? "border-[#c6f208]/40 bg-[#c6f208]/[0.03]"
                : "border-[#f2f2e1]/10 bg-[#0b0b0a]"
            }`}
          >
            <ServiceGlyph index={index} active={active} />
          </div>
        </Reveal>
      </div>

      <Reveal kind="fade" className="mt-10 sm:mt-12">
        <ul className="grid border-t border-[#f2f2e1]/[0.08] sm:grid-cols-2 sm:gap-x-10">
          {preview.map((f, j) => (
            <Feature key={f} text={f} n={j + 1} />
          ))}
        </ul>
        {rest.length > 0 && (
          <Collapse
            open={showRest}
            id={listId}
            // Always open on desktop from the first (server) paint – no post-hydration shift.
            className="lg:grid-rows-[1fr] lg:opacity-100"
          >
            <ul className="grid sm:grid-cols-2 sm:gap-x-10">
              {rest.map((f, j) => (
                <Feature key={f} text={f} n={PREVIEW_COUNT + j + 1} />
              ))}
            </ul>
          </Collapse>
        )}
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <CTAButton onClick={onCTA} aria-haspopup="dialog">
          {SERVICES_INTRO.cta}
        </CTAButton>
        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={showRest}
            aria-controls={listId}
            className="inline-flex items-center gap-2 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#f2f2e1]/70 transition-colors hover:text-[#c6f208] lg:hidden"
          >
            {expanded ? "Show less" : `Show all ${service.features.length} inclusions`}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={transition.expand}
              className="flex"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
        )}
      </div>
    </article>
  );
}

export function Services({ onCTA }: { onCTA: () => void }) {
  const panels = useRef<(HTMLElement | null)[]>([]);
  const active = useActiveIndex(() => panels.current, "-35% 0px -55% 0px");

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative border-t border-[#f2f2e1]/10 pb-16 pt-24 sm:pt-28 lg:pb-24 lg:pt-36"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index="03">Services</Eyebrow>
            <h2
              id="services-title"
              className="bb-display mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]"
            >
              <SplitWords text={SERVICES_INTRO.title} />
            </h2>
          </div>
          <Reveal className="md:col-span-4" delay={0.2}>
            <p className="bb-body max-w-sm text-base leading-relaxed sm:text-lg">
              {SERVICES_INTRO.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Sticky index – always shows where you are in the five services. */}
          <nav aria-label="Services" className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 pt-12">
              <ol className="relative border-l border-[#f2f2e1]/10">
                {SERVICES.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <li key={s.tag} className="relative">
                      {isActive && (
                        <motion.span
                          layoutId="services-indicator"
                          className="absolute -left-px top-0 h-full w-[2px] bg-[#c6f208]"
                          transition={transition.spring}
                        />
                      )}
                      <a
                        href={`#service-${s.tag}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(`service-${s.tag}`);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-baseline gap-4 py-3.5 pl-6 transition-colors duration-500 ${
                          isActive ? "text-[#f2f2e1]" : "text-[#f2f2e1]/50 hover:text-[#f2f2e1]/80"
                        }`}
                      >
                        <span className={`bb-mono text-xs ${isActive ? "text-[#c6f208]" : ""}`}>
                          {s.tag}
                        </span>
                        <span className="text-lg font-semibold tracking-tight xl:text-xl">
                          {s.headline}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="bb-mono mt-8 flex items-center gap-4 pl-6 text-[0.7rem] uppercase tracking-[0.22em] text-[#f2f2e1]/60">
                <span className="tabular-nums text-[#f2f2e1]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="relative h-px flex-1 bg-[#f2f2e1]/10">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-[#c6f208]"
                    animate={{ width: `${((active + 1) / SERVICES.length) * 100}%` }}
                    transition={transition.expand}
                  />
                </span>
                <span>{String(SERVICES.length).padStart(2, "0")}</span>
              </div>
            </div>
          </nav>

          <div className="lg:col-span-8">
            {SERVICES.map((s, i) => (
              <ServicePanel
                key={s.tag}
                service={s}
                index={i}
                active={active === i}
                onCTA={onCTA}
                panelRef={(el) => {
                  panels.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
