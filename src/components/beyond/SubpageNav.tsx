import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Slim brand bar for content pages (About, Contact, legal). */
export function SubpageNav() {
  return (
    <div className="mb-14 flex items-center justify-between border-b border-[#f2f2e1]/10 pb-6">
      <Link to="/" className="flex items-center gap-2" aria-label="Beyond Business — home">
        <span className="h-2 w-2 rounded-full bg-[#c6f208] shadow-[0_0_12px_#c6f208]" />
        <span className="bb-display text-base tracking-tight">
          BEYOND<span className="text-[#c6f208]">.</span>
        </span>
      </Link>
      <Link
        to="/"
        className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#f2f2e1]/55 transition-colors hover:text-[#c6f208]"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Home
      </Link>
    </div>
  );
}
