import { useEffect, useRef, useState } from "react";
import { TAGLINE } from "./content";

export const INTRO_KEY = "bb-intro";

/**
 * Brand intro, shown once per browser session.
 *
 * The whole timeline – wordmark rise, limit-line draw and the upward wipe that reveals the
 * hero – runs on CSS keyframes from first paint (see `.bb-loader` in styles.css). It never
 * waits for JavaScript, so a slow phone still hydrating is not held behind the overlay, and
 * visitors without JS get the same experience. JS only removes the node once the wipe has
 * finished. Returning visitors and reduced-motion visitors never see it (CSS + head script).
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* storage unavailable – just play the intro */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      done.current();
      return;
    }

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
      done.current();
    };

    // Wait for the CSS wipe to end. A finished animation with `forwards` fill is still
    // returned here with an already-resolved promise, so late hydration resolves at once.
    const wipe = ref.current
      ?.getAnimations()
      .find((a) => (a as CSSAnimation).animationName === "bb-loader-out");
    const fallback = window.setTimeout(finish, 3000);
    wipe?.finished.then(finish, finish);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={ref}
      className="bb-loader fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      aria-hidden
    >
      <div className="absolute inset-0 bb-grid-bg bb-grid-fade opacity-40" />

      <div className="relative text-center">
        <div className="bb-display text-[clamp(2.4rem,8vw,6rem)] tracking-tight">
          <span className="bb-mask">
            <span className="bb-rise inline-block" style={{ animationDelay: "0.1s" }}>
              BEYOND
            </span>
          </span>{" "}
          <span className="bb-mask">
            <span
              className="bb-rise inline-block text-[#c6f208]"
              style={{ animationDelay: "0.2s" }}
            >
              BUSINESS
            </span>
          </span>
        </div>
        {/* Static on purpose: visible in the very first frame, so first paint has content. */}
        <div className="bb-mono mt-5 text-[0.7rem] uppercase tracking-[0.4em] text-[#f2f2e1]/60 md:text-xs">
          {TAGLINE}
        </div>
      </div>

      {/* The limit line: a lime stroke that runs past its track. */}
      <div className="absolute bottom-14 left-1/2 h-px w-[min(40vw,420px)] -translate-x-1/2 bg-[#f2f2e1]/12">
        <div className="bb-draw-x h-full origin-left bg-[#c6f208]" />
      </div>
    </div>
  );
}
