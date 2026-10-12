import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatedDialog, DialogDescription, DialogTitle } from "./AnimatedDialog";
import { ease, transition } from "./motion";
import { CTAButton } from "./primitives";

/*
 * Strategy-call lead form. Validation rules, field names, the Google Apps Script endpoint and
 * the success flow are unchanged from the original implementation – only the presentation,
 * accessibility and motion are new.
 */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwiLMcQ9YTXlcWjyv6s7NLBcKmJv8NF1juvr7aUATaAm6fJKgxd45OnBuCRtGCfiXW3/exec";

type FormData = { name: string; phone: string; business: string; email: string };
const EMPTY: FormData = { name: "", phone: "", business: "", email: "" };

function Field({
  id,
  label,
  error,
  optional,
  ...input
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 ml-1 flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#f2f2e1]/55"
      >
        {label}
        {optional && (
          <span className="normal-case tracking-normal text-[#f2f2e1]/55">Optional</span>
        )}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-2xl border bg-[#050505]/60 px-5 py-4 text-[0.95rem] text-[#f2f2e1] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#f2f2e1]/25 focus:border-[#c6f208] focus:shadow-[0_0_0_4px_rgba(198,242,8,0.12)] ${
          error ? "border-red-500/80" : "border-[#f2f2e1]/10 hover:border-[#f2f2e1]/25"
        }`}
        {...input}
      />
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            className="ml-1 overflow-hidden text-xs text-red-400"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 6 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={transition.expand}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uid = useId();

  useEffect(() => {
    if (open) {
      setFormData(EMPTY);
      setStatus("idle");
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Invalid phone format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          phoneNumber: formData.phone,
          businessName: formData.business,
          emailAddress: formData.email,
        }),
        mode: "no-cors",
      });
      setStatus("success");
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("idle");
    }
  };

  const bind = (key: keyof FormData) => ({
    value: formData[key],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [key]: e.target.value }),
  });

  return (
    <AnimatedDialog
      open={open}
      onOpenChange={(o) => !o && onClose()}
      className="sm:max-w-md"
      closeLabel="Close modal"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            className="px-6 pb-10 pt-12 text-center sm:px-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={transition.content}
          >
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6f208]/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="#c6f208"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
                />
              </svg>
            </div>
            <DialogTitle className="bb-display text-2xl md:text-3xl">Talk to you soon!</DialogTitle>
            <DialogDescription className="bb-body mx-auto mt-4 max-w-sm text-sm sm:text-base">
              Your inquiry has been successfully transmitted. Our growth team will get back to you
              within 24 hours.
            </DialogDescription>
            <CTAButton
              onClick={onClose}
              className="mt-8 w-full"
              icon={<Check className="h-4 w-4" />}
            >
              Close Window
            </CTAButton>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition.content}
          >
            <div className="bb-mono flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#c6f208]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c6f208]" />
              Free 30-Min Strategy Call
            </div>
            <DialogTitle className="bb-display mt-4 pr-10 text-3xl leading-[1.02] sm:text-4xl">
              Want to Grow Your Business Faster?
            </DialogTitle>
            <DialogDescription className="bb-body mt-3 text-sm text-[#f2f2e1]/55">
              Book a free growth call and discover how you can grow your business
            </DialogDescription>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field
                id={`${uid}-name`}
                label="Full Name"
                type="text"
                autoComplete="name"
                placeholder="Aarav Mehta"
                error={errors.name}
                {...bind("name")}
              />
              <Field
                id={`${uid}-phone`}
                label="Phone Number"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+91 99999 99999"
                error={errors.phone}
                {...bind("phone")}
              />
              <Field
                id={`${uid}-business`}
                label="Company Name"
                type="text"
                autoComplete="organization"
                placeholder="Your Company"
                optional
                {...bind("business")}
              />
              <Field
                id={`${uid}-email`}
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                optional
                {...bind("email")}
              />

              <div className="pt-2">
                <CTAButton
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full"
                  icon={
                    status === "submitting" ? (
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-[#050505] border-t-transparent"
                      />
                    ) : undefined
                  }
                >
                  {status === "submitting" ? "Sending…" : "Book A Call"}
                </CTAButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedDialog>
  );
}
