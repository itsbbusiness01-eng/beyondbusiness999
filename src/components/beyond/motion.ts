import type { Transition, Variants } from "framer-motion";

/*
 * Beyond Business motion system.
 *
 * One vocabulary for every animation on the site. Pick the preset that matches the job
 * instead of inventing new timings inline:
 *
 *   ui       – hover / press / toggle feedback          (fast, ~200ms)
 *   content  – standard content entering                 (~600ms)
 *   reveal   – large section / headline reveals          (~900ms)
 *   expand   – accordions, collapses, menus              (~450ms)
 *   image    – clipped image reveals                     (~1.1s)
 *   exit     – anything leaving the screen               (quicker than its entrance)
 */

export const ease = {
  /** Decelerating "expo-out" – the house curve for things arriving. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric curve for things that travel across the screen. */
  inOut: [0.76, 0, 0.24, 1],
  /** Accelerating curve for exits. */
  in: [0.55, 0, 0.75, 0.15],
} as const satisfies Record<string, [number, number, number, number]>;

export const duration = {
  ui: 0.2,
  content: 0.6,
  reveal: 0.9,
  expand: 0.45,
  image: 1.1,
  exit: 0.28,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

export const transition = {
  ui: { duration: duration.ui, ease: ease.out },
  content: { duration: duration.content, ease: ease.out },
  reveal: { duration: duration.reveal, ease: ease.out },
  expand: { duration: duration.expand, ease: ease.out },
  image: { duration: duration.image, ease: ease.out },
  exit: { duration: duration.exit, ease: ease.in },
  spring: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 },
  softSpring: { type: "spring", stiffness: 140, damping: 22 },
} as const satisfies Record<string, Transition>;

/** Distance (px) content travels while revealing. Kept small – premium motion is quiet. */
export const distance = { sm: 16, md: 32, lg: 64 } as const;

/** Viewport trigger shared by every scroll reveal so sections arrive at the same moment. */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export type RevealKind = "up" | "fade" | "mask" | "clip" | "scale";

export const revealVariants: Record<RevealKind, Variants> = {
  up: {
    hidden: { opacity: 0, y: distance.md },
    show: { opacity: 1, y: 0, transition: transition.content },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: transition.content },
  },
  /** Used inside an overflow-hidden mask: the child slides up from below the mask edge. */
  mask: {
    hidden: { y: "110%" },
    show: { y: "0%", transition: transition.reveal },
  },
  /** Image / panel reveal: a clip that opens from the bottom edge. */
  clip: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: { clipPath: "inset(0% 0% 0% 0%)", transition: transition.image },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: transition.content },
  },
};

export const staggerContainer = (gap: number = stagger.base, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});
