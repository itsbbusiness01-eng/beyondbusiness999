import { useEffect, useRef } from "react";
import { useFinePointer } from "./hooks";

/**
 * Decorative follower cursor for mouse users. The system cursor is never hidden; this only
 * adds a lime dot and a trailing ring that grows over interactive elements.
 */
export function Cursor() {
  const fine = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let running = false;

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      // Sleep once the ring has caught up – no idle rAF work.
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("a,button,[data-cursor='hover']");
      ring.classList.toggle("is-hover", Boolean(hit));
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div ref={ringRef} className="bb-cursor-ring" style={{ opacity: 0 }} aria-hidden />
      <div ref={dotRef} className="bb-cursor" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
