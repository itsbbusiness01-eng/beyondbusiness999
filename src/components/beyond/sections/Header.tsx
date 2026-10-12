import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ANNOUNCEMENT, NAV_ITEMS, TAGLINE } from "../content";
import { useActiveId, useEscape, useMediaQuery, useScrollLock } from "../hooks";
import { scrollToSection } from "../lenis";
import { ease, transition } from "../motion";
import { CTAButton } from "../primitives";

export const ANNOUNCE_KEY = "bb-announce-off";
const BAR_HEIGHT = 40;

/* ───────────────────────── Scroll progress ───────────────────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[1001] h-[2px] origin-left bg-[#c6f208]"
    />
  );
}

/* ───────────────────────── Announcement ───────────────────────── */

export function AnnouncementBar({
  visible,
  onCTA,
  onDismiss,
}: {
  visible: boolean;
  onCTA: () => void;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="announce"
          className="bb-announce relative z-40 overflow-hidden border-b border-[#f2f2e1]/[0.06] bg-[#0b0b0a]"
          initial={{ height: 0 }}
          animate={{ height: BAR_HEIGHT }}
          exit={{ height: 0, transition: transition.exit }}
          transition={transition.expand}
          style={{ height: BAR_HEIGHT }}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-3 px-12">
            <button
              type="button"
              onClick={onCTA}
              aria-haspopup="dialog"
              className="group flex min-w-0 items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#f2f2e1]/75 transition-colors hover:text-[#f2f2e1]"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#c6f208] opacity-60 motion-reduce:hidden" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#c6f208]" />
              </span>
              <span className="truncate">
                <span className="font-semibold text-[#f2f2e1]">{ANNOUNCEMENT.lead}</span>
                <span className="hidden sm:inline"> — {ANNOUNCEMENT.rest}</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#c6f208] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss announcement"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#f2f2e1]/60 transition-colors hover:bg-[#f2f2e1]/5 hover:text-[#f2f2e1]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Navigation ───────────────────────── */

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-current"
        animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={transition.spring}
      />
      <motion.span
        className="absolute bottom-0 left-0 block h-[1.5px] w-5 rounded-full bg-current"
        animate={open ? { y: -5.25, rotate: -45, width: 20 } : { y: 0, rotate: 0, width: 14 }}
        transition={transition.spring}
      />
    </span>
  );
}

export function Nav({
  onCTA,
  barVisible,
  menuOpen,
  setMenuOpen,
}: {
  onCTA: () => void;
  barVisible: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveId(SECTION_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Glue the nav beneath the announcement bar until the bar scrolls away.
  const offsetFor = (y: number) => (barVisible ? Math.max(0, BAR_HEIGHT - y) : 0);
  const barOffset = useMotionValue(barVisible ? BAR_HEIGHT : 0);
  useEffect(() => {
    const controls = animate(barOffset, offsetFor(window.scrollY), transition.expand);
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barVisible]);

  useMotionValueEvent(scrollY, "change", (y) => {
    barOffset.set(offsetFor(y));
    const prev = scrollY.getPrevious() ?? 0;
    const nextScrolled = y > 30;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
    // Hide while reading downward, return the moment the visitor scrolls up.
    const nextHidden = y > 640 && y > prev + 2;
    const nextShown = y < prev - 2 || y <= 640;
    if (nextHidden && !hidden) setHidden(true);
    else if (nextShown && hidden) setHidden(false);
  });

  const go = (id: string) => {
    if (!menuOpen) {
      scrollToSection(id);
      return;
    }
    // Let the menu's scroll lock release before travelling; the page then glides into place
    // underneath the closing curtain.
    setMenuOpen(false);
    window.setTimeout(() => scrollToSection(id), 60);
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop && menuOpen) setMenuOpen(false);
  }, [isDesktop, menuOpen, setMenuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, [setMenuOpen]);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-3 z-[1000] flex justify-center px-3 sm:top-4 sm:px-4"
        initial={false}
        animate={{ y: hidden && !menuOpen ? -120 : 0 }}
        transition={{ duration: 0.45, ease: ease.out }}
      >
        <motion.div style={{ y: barOffset }} className="pointer-events-auto w-full max-w-[1240px]">
          <nav
            aria-label="Primary"
            className={`flex h-14 items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-6 ${
              scrolled || menuOpen
                ? "border-[#f2f2e1]/10 bg-[#0b0b0a]/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                go("top");
              }}
              className="flex items-center gap-2"
              aria-label="Beyond Business — back to top"
              data-cursor="hover"
            >
              <span className="h-2 w-2 rounded-full bg-[#c6f208] shadow-[0_0_12px_#c6f208]" />
              <span className="bb-display text-base tracking-tight">
                BEYOND<span className="text-[#c6f208]">.</span>
              </span>
            </a>

            <ul className="hidden items-center gap-9 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className={`bb-link bb-mono py-2 text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isActive ? "text-[#f2f2e1]" : "text-[#f2f2e1]/60 hover:text-[#f2f2e1]"
                      }`}
                      data-cursor="hover"
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#c6f208]"
                        transition={transition.spring}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1">
              <CTAButton
                size="sm"
                onClick={onCTA}
                className="hidden sm:inline-flex"
                aria-haspopup="dialog"
              >
                Let's Talk
              </CTAButton>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#f2f2e1] transition-colors hover:bg-[#f2f2e1]/5 md:hidden"
              >
                <MenuGlyph open={menuOpen} />
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        active={active}
        onNavigate={go}
        onClose={closeMenu}
        onCTA={onCTA}
      />
    </>
  );
}

/* ───────────────────────── Mobile menu ───────────────────────── */

function MobileMenu({
  open,
  active,
  onNavigate,
  onClose,
  onCTA,
}: {
  open: boolean;
  active: string | null;
  onNavigate: (id: string) => void;
  onClose: () => void;
  onCTA: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[995] flex flex-col bg-[#050505] px-6 pb-8 pt-28 md:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0.6, ease: ease.inOut },
          }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.45, ease: ease.inOut, delay: 0.1 },
          }}
          data-lenis-prevent
        >
          <div className="absolute inset-0 bb-grid-bg bb-grid-fade opacity-30" aria-hidden />

          <motion.ul
            className="relative flex flex-col"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} className="border-b border-[#f2f2e1]/10">
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  aria-current={active === item.id ? "location" : undefined}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="bb-mono w-6 text-xs text-[#c6f208]">0{i + 1}</span>
                  <span className="bb-mask">
                    <motion.span
                      className={`bb-display inline-block text-[2.6rem] ${active === item.id ? "text-[#c6f208]" : ""}`}
                      variants={{
                        hidden: { y: "110%", transition: { duration: 0.3, ease: ease.in } },
                        show: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="relative mt-auto flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, ...transition.content } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <CTAButton
              size="lg"
              className="w-full"
              onClick={() => {
                onClose();
                onCTA();
              }}
              aria-haspopup="dialog"
            >
              Let's Talk
            </CTAButton>
            <p className="bb-mono text-center text-[0.65rem] uppercase tracking-[0.3em] text-[#f2f2e1]/60">
              {TAGLINE}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
