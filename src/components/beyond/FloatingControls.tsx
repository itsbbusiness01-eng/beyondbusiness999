import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ANNOUNCEMENT } from "./content";
import { scrollToSection } from "./lenis";
import { transition } from "./motion";

/**
 * Persistent conversion + navigation helpers:
 *  – a thumb-zone strategy-call button on phones, shown between the hero and the final CTA
 *  – a return-to-top control on tablet/desktop (phones use the footer one: the thumb zone
 *    already holds the CTA and the music toggle)
 * Both sit beside the music toggle (bottom-right) without covering it.
 */
export function FloatingControls({
  onCTA,
  suppressed,
}: {
  onCTA: () => void;
  suppressed: boolean;
}) {
  const { scrollY } = useScroll();
  const [deep, setDeep] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [endVisible, setEndVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 1.5;
    if (next !== deep) setDeep(next);
  });

  useEffect(() => {
    const hero = document.getElementById("top");
    const ends = [
      document.getElementById("cta-title")?.closest("section"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroVisible(e.isIntersecting);
        else if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setEndVisible(visible.size > 0);
    });
    if (hero) io.observe(hero);
    ends.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const showCTA = !suppressed && !heroVisible && !endVisible;
  const showTop = !suppressed && deep;

  return (
    <>
      <AnimatePresence>
        {showCTA && (
          <motion.div
            key="mobile-cta"
            className="fixed bottom-4 left-4 right-[84px] z-[90] md:hidden"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: transition.content }}
            exit={{ y: 90, opacity: 0, transition: transition.exit }}
          >
            <button
              type="button"
              onClick={onCTA}
              aria-haspopup="dialog"
              className="flex h-[52px] w-full items-center justify-between gap-3 rounded-full bg-[#c6f208] pl-5 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#050505] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)] active:scale-[0.98]"
            >
              <span className="truncate">{ANNOUNCEMENT.lead}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#050505] text-[#c6f208]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="to-top"
            type="button"
            onClick={() => scrollToSection("top")}
            aria-label="Back to top"
            className="group fixed bottom-[76px] right-[18px] z-[90] hidden h-12 w-12 items-center justify-center rounded-full border border-[#f2f2e1]/15 bg-[#0a0a0a]/85 text-[#f2f2e1]/80 backdrop-blur-md transition-colors hover:border-[#c6f208] hover:text-[#c6f208] md:bottom-[100px] md:right-[35px] md:flex md:h-11 md:w-11"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, transition: transition.spring }}
            exit={{ opacity: 0, scale: 0.6, transition: transition.exit }}
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
