/*
 * LEGACY — NOT RENDERED ANYWHERE.
 *
 * These components were already commented out of the home page before the redesign
 * (Founder, Testimonials, LeadMagnet) or never mounted (ContactModal, the WhatsApp form).
 * They are kept verbatim for reference instead of being deleted.
 *
 * Do not ship them as-is: Founder and Testimonials contain placeholder people, quotes and
 * numbers that are not verified Beyond Business content.
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

/* ------------- shared bits ------------- */

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "bg-[#c6f208] text-[#050505] hover:shadow-[0_0_60px_rgba(198,242,8,0.6)]"
      : "bg-transparent text-[#f2f2e1] border border-[#f2f2e1]/30 hover:border-[#c6f208] hover:text-[#c6f208]";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${base} ${className}`}
      data-cursor="hover"
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </motion.button>
  );
}

/* ------------- Founder ------------- */

export function Founder() {
  return (
    <Section id="about-us" className="relative py-40 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bb-aurora opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] rounded-3xl bb-glass overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#1a1a1a] to-[#3a3a3a]" />
          <div className="absolute inset-0 bb-grid-bg opacity-20" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]">Founder</div>
              <div className="bb-display text-5xl mt-2">Aarav Mehta</div>
              <div className="bb-body mt-1 text-sm">Engineer, operator, builder.</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#c6f208]/10 to-transparent" />
        </motion.div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
            / 06 — Founder
          </div>
          <h2 className="bb-display mt-4 text-4xl md:text-6xl">
            Built by founders. For founders chasing the next ceiling.
          </h2>
          <p className="bb-body mt-6 text-lg max-w-lg">
            Beyond Business was born from a simple truth — most agencies sell campaigns. Founders
            need infrastructure. We engineer the systems that decouple your growth from your hours.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "8+", v: "Years building" },
              { k: "40+", v: "Founders backed" },
              { k: "12", v: "AI engineers" },
            ].map((s) => (
              <div key={s.v}>
                <div className="bb-display text-3xl text-[#c6f208]">{s.k}</div>
                <div className="bb-body text-xs uppercase tracking-[0.3em] mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------- Testimonials ------------- */

const testimonials = [
  {
    who: "A to Z Networks",
    title: "Telecom growth lead",
    quote:
      "They didn't just market us. They re-engineered how we acquire. Our pipeline tripled in one quarter.",
  },
  {
    who: "Sniffix",
    title: "Founder",
    quote:
      "The AI automation alone replaced two ops hires. The brand work made us look like a category leader.",
  },
  {
    who: "Forma Studio",
    title: "Co-founder",
    quote:
      "Felt less like an agency, more like an in-house growth team. Cinematic execution, end to end.",
  },
];

export function Testimonials() {
  return (
    <Section id="work" className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
          / 07 — Voices
        </div>
        <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-20 max-w-3xl">
          Real founders. Real growth. Real systems.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.who}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bb-glass aspect-[4/5] p-8 cursor-pointer"
              data-cursor="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505]" />
              <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-[#c6f208]/10 blur-3xl group-hover:bg-[#c6f208]/30 transition-all duration-700" />
              {/* waveform */}
              <div className="absolute bottom-32 left-8 right-8 flex items-end gap-1 h-12 opacity-60 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: 40 }).map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{
                      height: [
                        `${20 + Math.random() * 60}%`,
                        `${30 + Math.random() * 70}%`,
                        `${20 + Math.random() * 60}%`,
                      ],
                    }}
                    transition={{
                      duration: 1.2 + Math.random(),
                      repeat: Infinity,
                      delay: j * 0.04,
                    }}
                    className="flex-1 bg-[#c6f208]/60 rounded-full"
                  />
                ))}
              </div>
              <div className="relative flex flex-col h-full justify-between">
                <div className="text-xs uppercase tracking-[0.4em] text-[#c6f208]">
                  ▶ Play story
                </div>
                <div>
                  <p className="bb-display text-xl mb-8 leading-tight">"{t.quote}"</p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-sm font-semibold text-[#f2f2e1]">{t.who}</div>
                    <div className="bb-body text-xs uppercase tracking-[0.3em] mt-1">{t.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------- Lead magnet ------------- */

export function LeadMagnet() {
  const [step, setStep] = useState(0);
  const total = 3;
  const fields = [
    { label: "What's your monthly revenue?", placeholder: "$10k – $1M+" },
    { label: "What's slowing your growth?", placeholder: "Lead flow, ops, content..." },
    { label: "Where should we send the diagnostic?", placeholder: "you@company.com" },
  ];
  return (
    <Section className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
          / 08 — Free Diagnostic
        </div>
        <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-12 max-w-3xl">
          Free AI Growth Diagnostic.
        </h2>
        <div className="relative overflow-hidden rounded-3xl bb-glass p-8 md:p-12">
          <div className="absolute top-0 left-0 h-px w-full bg-white/10">
            <motion.div
              animate={{ width: `${((step + 1) / total) * 100}%` }}
              className="h-full bg-[#c6f208] shadow-[0_0_15px_#c6f208]"
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs uppercase tracking-[0.4em] text-[#c6f208]">
              Step 0{step + 1} / 0{total}
            </div>
            <div className="bb-body text-xs uppercase tracking-[0.3em]">~ 60 seconds</div>
          </div>
          <label className="bb-display block text-2xl md:text-4xl mb-6">{fields[step].label}</label>
          <input
            placeholder={fields[step].placeholder}
            className="w-full bg-transparent border-b border-white/20 focus:border-[#c6f208] outline-none py-4 text-xl md:text-2xl text-[#f2f2e1] placeholder:text-[#f2f2e1]/30 transition-colors"
          />
          <div className="mt-10 flex items-center justify-between">
            <button
              disabled={step === 0}
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/50 hover:text-[#c6f208] disabled:opacity-30"
              data-cursor="hover"
            >
              ← Back
            </button>
            <MagneticButton onClick={() => setStep(Math.min(total - 1, step + 1))}>
              {step === total - 1 ? "Submit Diagnostic" : "Next"}{" "}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------- Contact Form Modal (WhatsApp) ------------- */

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setStatus("idle");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Construct a beautiful WhatsApp message
    const formattedMessage =
      `Hello Beyond Business growth team! I would like to get in touch:\n\n` +
      `*Name*: ${formData.name}\n` +
      `*Email*: ${formData.email}\n` +
      `*Phone*: ${formData.phone}\n\n` +
      `*Bottleneck / Goal*:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/919515884262?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setStatus("success");
      window.open(whatsappUrl, "_blank");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bb-glass p-6 sm:p-10 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Close modal"
          data-cursor="hover"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-[#c6f208]/10 flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-[#c6f208]" />
            </div>
            <h3 className="bb-display text-2xl md:text-3xl">Talk to you soon!</h3>
            <p className="bb-body mt-4 max-w-sm mx-auto text-sm sm:text-base">
              Your inquiry has been successfully transmitted. Our growth team will get back to you
              within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-[#c6f208] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] hover:bg-[#c6f208]/90 transition-colors"
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          <>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]">
              Get in Touch
            </div>
            <h3 className="bb-display mt-3 text-2xl sm:text-4xl">Let's engineer your growth.</h3>
            <p className="bb-body mt-3 text-xs sm:text-sm text-[#f2f2e1]/60">
              Fill in your details below and we will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aarav Mehta"
                  className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.name && (
                  <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                  What is slowing your growth?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business goals and bottlenecks..."
                  rows={4}
                  className={`w-full bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20 resize-none`}
                />
                {errors.message && (
                  <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full text-center rounded-full bg-[#c6f208] py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(198,242,8,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Let's Talk</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
