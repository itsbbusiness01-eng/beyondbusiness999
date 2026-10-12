import type Lenis from "lenis";

/*
 * Tiny registry for the page's Lenis instance so any component can scroll or lock the page
 * without prop drilling. When Lenis is not running (reduced motion, touch, before the intro
 * finishes) everything falls back to native scrolling.
 */

let instance: Lenis | null = null;
let lockCount = 0;

export function setLenis(next: Lenis | null) {
  instance = next;
  if (instance && lockCount > 0) instance.stop();
}

export function getLenis() {
  return instance;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Smoothly scroll to a section by id (or the very top with "top"), then move focus to it.
 * The fixed-nav offset comes from each section's CSS `scroll-margin-top`, which both Lenis
 * and native `scrollIntoView` honour – so it is defined once, in CSS.
 */
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const immediate = prefersReducedMotion();

  if (id === "top") {
    if (instance) instance.scrollTo(0, { immediate, force: true });
    else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (instance) instance.scrollTo(el, { immediate, force: true });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });

  // Keep keyboard and screen-reader users in step with the visual jump.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Reference-counted page scroll lock shared by the menu and dialogs. */
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    instance?.stop();
    document.documentElement.classList.add("bb-scroll-locked");
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    instance?.start();
    document.documentElement.classList.remove("bb-scroll-locked");
  }
}
