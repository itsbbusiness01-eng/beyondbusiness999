import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { FOOTER, TAGLINE } from "../content";
import { scrollToSection } from "../lenis";
import { ease, revealViewport, staggerContainer } from "../motion";
import { Stagger, RevealItem } from "../primitives";

const STUDIO_LINKS: { label: string; section?: string; to?: "/about" | "/contact" }[] = [
  { label: "Services", section: "services" },
  { label: "Method", section: "method" },
  { label: "Team", section: "about-us" },
  { label: "FAQ", section: "faq" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
] as const;

const linkClass =
  "group inline-flex items-center gap-0 text-sm text-[#f2f2e1]/60 transition-[color,gap] duration-300 hover:gap-3 hover:text-[#c6f208]";

function Dash() {
  return (
    <span
      aria-hidden
      className="inline-block h-px w-0 shrink-0 bg-[#c6f208] transition-[width] duration-300 group-hover:w-3"
    />
  );
}

/** Giant wordmark; letters rise out of the baseline when the footer arrives. */
function Wordmark() {
  const letters = (word: string) =>
    word.split("").map((ch, i) => (
      <motion.span
        key={`${ch}-${i}`}
        className="inline-block"
        variants={{
          hidden: { y: "105%" },
          show: { y: "0%", transition: { duration: 1, ease: ease.out } },
        }}
      >
        {ch}
      </motion.span>
    ));

  return (
    <motion.div
      aria-label="Beyond Business"
      role="img"
      className="flex select-none flex-col leading-[0.85]"
      variants={staggerContainer(0.035)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      <span className="bb-display overflow-hidden pb-[0.04em] text-[clamp(3rem,15vw,16rem)] font-black tracking-tight text-[#f2f2e1]">
        {letters("BEYOND")}
      </span>
      <span className="bb-display self-start overflow-hidden bg-[#c6f208] px-[0.08em] pb-[0.04em] text-[clamp(3rem,15vw,16rem)] font-black tracking-tight text-[#0a0a0a]">
        {letters("BUSINESS")}
      </span>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#f2f2e1]/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-20 sm:px-8 sm:pt-24 lg:px-12 xl:px-20">
        <Stagger className="grid gap-12 md:grid-cols-12" gap={0.08}>
          <RevealItem className="md:col-span-5">
            <div className="bb-display text-3xl">
              BEYOND<span className="text-[#c6f208]">.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#f2f2e1]/50">
              {FOOTER.blurb}
            </p>
          </RevealItem>

          <RevealItem className="md:col-span-3">
            <h2 className="bb-mono mb-6 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#c6f208]/80">
              Studio
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {STUDIO_LINKS.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className={linkClass} data-cursor="hover">
                      <Dash />
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${l.section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(l.section!);
                      }}
                      className={linkClass}
                      data-cursor="hover"
                    >
                      <Dash />
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="md:col-span-4">
            <h2 className="bb-mono mb-6 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#c6f208]/80">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-[#f2f2e1]/60">
              <li>{FOOTER.email}</li>
              <li>
                <address className="not-italic leading-relaxed">
                  {FOOTER.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex flex-wrap gap-2 pt-2">
                {FOOTER.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[#f2f2e1]/10 px-3.5 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-[#f2f2e1]/60 transition-colors duration-300 hover:border-[#c6f208] hover:bg-[#c6f208] hover:text-[#0a0a0a]"
                    data-cursor="hover"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
                  </a>
                ))}
              </li>
            </ul>
          </RevealItem>
        </Stagger>

        <div className="relative mt-20 border-t border-[#f2f2e1]/[0.06] pt-10 sm:mt-24">
          <Wordmark />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-[#f2f2e1]/[0.06] pt-6 text-[0.65rem] uppercase tracking-[0.24em] text-[#f2f2e1]/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Beyond Business</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="bb-link py-1.5 transition-colors hover:text-[#f2f2e1]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-[5px] w-[5px] rounded-full bg-[#c6f208]" />
              {TAGLINE}
            </span>
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#f2f2e1]/15 text-[#f2f2e1]/70 transition-colors hover:border-[#c6f208] hover:text-[#c6f208]"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
