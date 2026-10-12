import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import { lockScroll, unlockScroll } from "./lenis";

/** Subscribe to a media query. Returns `false` during SSR and the first client render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a precise pointer that can hover (mouse / trackpad). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Lock page scrolling while `active` is true (menus, dialogs). */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);
}

/** Close something when Escape is pressed while `active`. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onEscape]);
}

/**
 * Track which of the given element ids currently sits in the reading band of the viewport.
 * One IntersectionObserver for all targets – no per-frame scroll work.
 */
export function useActiveId(ids: string[], rootMargin = "-45% 0px -50% 0px") {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    // Track everything currently in the band so the marker clears when the reader moves into
    // a section that is not in the list (e.g. back up to the hero).
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        const order = key.split("|");
        const current = order.filter((id) => inBand.has(id)).pop() ?? null;
        setActive(current);
      },
      { rootMargin },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, rootMargin]);

  return active;
}

/** Index of the element (from a ref list) currently crossing the middle band of the viewport. */
export function useActiveIndex(
  getElements: () => (HTMLElement | null)[],
  rootMargin = "-45% 0px -50% 0px",
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = getElements();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { rootMargin },
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // getElements reads refs; it is intentionally only evaluated on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin]);

  return active;
}

/**
 * Clip-path for a panel that grows from an inset, rounded card to full-bleed as it scrolls in.
 * The site's "beyond the frame" transition, shared by the cream and lime panels.
 */
export function useExpandingFrame(
  target: RefObject<HTMLElement | null>,
  maxInset = 4,
  maxRadius = 40,
) {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "start 25%"] });
  const inset = useTransform(scrollYProgress, [0, 1], [maxInset, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [maxRadius, 0]);
  return useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px)`;
}
