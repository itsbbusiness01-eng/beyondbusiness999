import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useMediaQuery, useScrollLock } from "./hooks";
import { ease, transition } from "./motion";

export const DialogTitle = Dialog.Title;
export const DialogDescription = Dialog.Description;

/**
 * Accessible dialog with a complete motion lifecycle.
 * Radix supplies focus trapping, Escape / outside-click dismissal and ARIA wiring;
 * Framer Motion animates both the entrance and the exit. Opens as a bottom sheet on phones.
 */
export function AnimatedDialog({
  open,
  onOpenChange,
  children,
  className = "",
  closeLabel = "Close dialog",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
}) {
  const sheet = !useMediaQuery("(min-width: 640px)");
  useScrollLock(open);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[9000] bg-black/75 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: transition.content }}
                exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.05 } }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-[9001] flex items-end justify-center sm:items-center sm:p-6">
              <Dialog.Content asChild forceMount>
                <motion.div
                  data-lenis-prevent
                  className={`pointer-events-auto relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-[#f2f2e1]/10 bg-[#0b0b0a] text-[#f2f2e1] shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] focus:outline-none sm:rounded-3xl ${className}`}
                  initial={sheet ? { y: "100%" } : { opacity: 0, y: 32, scale: 0.97 }}
                  animate={
                    sheet
                      ? { y: "0%", transition: { duration: 0.55, ease: ease.out } }
                      : { opacity: 1, y: 0, scale: 1, transition: transition.content }
                  }
                  exit={
                    sheet
                      ? { y: "100%", transition: { duration: 0.35, ease: ease.in } }
                      : { opacity: 0, y: 16, scale: 0.98, transition: transition.exit }
                  }
                >
                  {sheet && (
                    <div aria-hidden className="sticky top-0 z-10 flex justify-center pt-3">
                      <span className="h-1 w-10 rounded-full bg-[#f2f2e1]/20" />
                    </div>
                  )}
                  <Dialog.Close
                    aria-label={closeLabel}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f2e1]/5 text-[#f2f2e1]/60 transition-[color,background-color,rotate] duration-300 hover:rotate-90 hover:bg-[#f2f2e1]/10 hover:text-[#f2f2e1]"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                  {children}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
