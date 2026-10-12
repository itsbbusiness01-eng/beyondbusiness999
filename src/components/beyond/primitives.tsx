import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFinePointer } from "./hooks";
import {
  ease,
  revealVariants,
  revealViewport,
  stagger as staggerPreset,
  staggerContainer,
  type RevealKind,
} from "./motion";

/* ───────────────────────── Reveal ───────────────────────── */

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  kind?: RevealKind;
  delay?: number;
};

/** Scroll-triggered entrance. Plays once, when the element reaches the reading band. */
export function Reveal({ kind = "up", delay = 0, children, ...rest }: RevealProps) {
  const base = revealVariants[kind];
  const variants: Variants = delay
    ? {
        ...base,
        show: {
          ...(base.show as object),
          transition: { ...((base.show as { transition?: object }).transition ?? {}), delay },
        },
      }
    : base;
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any `RevealItem` children when it scrolls into view. */
export function Stagger({
  gap = staggerPreset.base,
  delay = 0,
  children,
  ...rest
}: Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      variants={staggerContainer(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  kind = "up",
  children,
  ...rest
}: Omit<HTMLMotionProps<"div">, "variants"> & { kind?: RevealKind }) {
  return (
    <motion.div variants={revealVariants[kind]} {...rest}>
      {children}
    </motion.div>
  );
}

/* ───────────────────────── Split headline ───────────────────────── */

type SplitWordsProps = {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  /** Controlled playback (e.g. after the intro). When omitted, plays on scroll into view. */
  play?: boolean;
  delay?: number;
  gap?: number;
  /** Rendered inside the last word's mask so it can never wrap onto its own line (e.g. "™"). */
  trailing?: ReactNode;
};

/**
 * Word-by-word masked headline reveal. Each word rises out of its own clipping mask, so the
 * line never reflows while animating. Text stays real text for SEO and screen readers.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  play,
  delay = 0,
  gap = staggerPreset.tight,
  trailing,
}: SplitWordsProps) {
  const words = text.split(" ");
  const controlled = play !== undefined;
  return (
    <motion.span
      className={className}
      variants={staggerContainer(gap, delay)}
      initial="hidden"
      {...(controlled
        ? { animate: play ? "show" : "hidden" }
        : { whileInView: "show", viewport: revealViewport })}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="bb-mask">
            <motion.span
              variants={revealVariants.mask}
              className={`inline-block ${wordClassName?.(w, i) ?? ""}`}
            >
              {w}
              {i === words.length - 1 ? trailing : null}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

/* ───────────────────────── Eyebrow ───────────────────────── */

/** Section label: index + drawn hairline + name. The site's recurring wayfinding device. */
export function Eyebrow({
  index,
  children,
  tone = "dark",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <motion.div
      className={`bb-eyebrow ${tone === "light" ? "bb-eyebrow--light" : ""} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      {index && <span className="bb-eyebrow__index">({index})</span>}
      <motion.span
        aria-hidden
        className="bb-eyebrow__rule"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.8, ease: ease.out } },
        }}
      />
      <span>{children}</span>
    </motion.div>
  );
}

/* ───────────────────────── Buttons ───────────────────────── */

type CTAVariant = "primary" | "ghost" | "ink";

const ctaStyles: Record<CTAVariant, string> = {
  primary: "bg-[#c6f208] text-[#050505] hover:bg-[#d4ff1f] focus-visible:outline-[#c6f208]",
  ghost:
    "border border-[#f2f2e1]/25 text-[#f2f2e1] hover:border-[#c6f208] hover:text-[#c6f208] focus-visible:outline-[#c6f208]",
  ink: "bg-[#050505] text-[#c6f208] hover:bg-[#151515] focus-visible:outline-[#050505]",
};

type CTAButtonProps = {
  children: string;
  onClick?: () => void;
  variant?: CTAVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Subtle pointer attraction on desktop. Off by default; reserved for hero-level CTAs. */
  magnetic?: boolean;
  icon?: ReactNode;
  "aria-label"?: string;
  "aria-haspopup"?: "dialog";
};

/**
 * The house CTA: label rolls up on hover, the arrow exits and re-enters diagonally.
 * Hover effects are pure CSS so they cost nothing on touch devices.
 */
export function CTAButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  magnetic = false,
  icon,
  ...aria
}: CTAButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const attract = magnetic && fine;

  const onMove = (e: React.PointerEvent) => {
    if (!attract || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const pad =
    size === "lg"
      ? "min-h-14 px-8 py-3 text-[0.8rem]"
      : size === "sm"
        ? "min-h-10 px-5 py-2 text-[0.68rem]"
        : "min-h-12 px-6 py-3 text-[0.72rem]";

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={attract ? { x: sx, y: sy } : undefined}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      className={`bb-cta group relative inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 ${pad} ${ctaStyles[variant]} ${className}`}
      {...aria}
    >
      <span className="bb-roll">
        <span className="bb-roll__a">{children}</span>
        <span className="bb-roll__b" aria-hidden>
          {children}
        </span>
      </span>
      {icon ?? (
        <span className="bb-arrow" aria-hidden>
          <ArrowUpRight className="bb-arrow__a h-4 w-4" />
          <ArrowUpRight className="bb-arrow__b h-4 w-4" />
        </span>
      )}
    </motion.button>
  );
}

/* ───────────────────────── Counter ───────────────────────── */

const formatIN = (n: number) => n.toLocaleString("en-IN");

/**
 * Counts up once, the first time it scrolls into view. The server always renders the real,
 * final figure (so crawlers and no-JS readers never see "0"), and if the number is already on
 * screen when the page loads it is left alone.
 */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setValue(0);
    let controls: ReturnType<typeof animate> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        controls = animate(0, to, {
          duration: 1.8,
          ease: ease.out,
          onUpdate: (v) => setValue(Math.round(v)),
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controls?.stop();
      setValue(to);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${formatIN(value)}${suffix}`}
    </span>
  );
}

/* ───────────────────────── Collapse ───────────────────────── */

/**
 * Height animation without measuring: a one-row grid that transitions 0fr ↔ 1fr.
 * Collapsed content stays in the DOM (crawlable) but is inert and hidden from assistive tech.
 */
export function Collapse({
  open,
  id,
  children,
  className = "",
  role,
  labelledBy,
}: {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
  role?: "region";
  labelledBy?: string;
}) {
  return (
    <div
      id={id}
      role={role}
      aria-labelledby={labelledBy}
      inert={!open}
      className={`bb-collapse ${open ? "is-open" : ""} ${className}`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
