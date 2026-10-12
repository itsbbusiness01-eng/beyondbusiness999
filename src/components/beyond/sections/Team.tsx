import { LayoutGroup, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatedDialog, DialogDescription, DialogTitle } from "../AnimatedDialog";
import { TEAM, type TeamMember } from "../content";
import { transition } from "../motion";
import { Eyebrow, RevealItem, SplitWords, Stagger } from "../primitives";

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

function Portrait({
  m,
  eager = false,
  className = "",
}: {
  m: TeamMember;
  eager?: boolean;
  className?: string;
}) {
  return (
    <motion.img
      layoutId={`team-photo-${slug(m.name)}`}
      transition={transition.content}
      src={m.img}
      alt={`${m.name}, ${m.role}`}
      width={m.width}
      height={m.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ objectPosition: m.focus ?? "50% 50%" }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function TeamCard({
  m,
  index,
  hidden,
  onOpen,
}: {
  m: TeamMember;
  index: number;
  hidden: boolean;
  onOpen: () => void;
}) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Read ${m.name}'s bio`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0b0b0a] focus-visible:outline-offset-4"
        data-cursor="hover"
      >
        {!hidden && (
          <Portrait
            m={m}
            className="grayscale transition-[filter,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0 group-focus-visible:grayscale-0"
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0"
        />
        <span
          aria-hidden
          className="bb-mono absolute left-3 top-3 rounded-full bg-[#050505]/55 px-2.5 py-1 text-[0.62rem] tracking-[0.2em] text-[#f2f2e1]/80 backdrop-blur-sm"
        >
          {String(index + 1).padStart(2, "0")} / {String(TEAM.members.length).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#f2f2e1] px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#050505] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
        >
          Read bio <Plus className="h-3 w-3" />
        </span>
      </button>
      <div className="mt-5">
        <h3 className="text-xl font-semibold tracking-tight text-[#f2f2e1] sm:text-2xl">
          {m.name}
        </h3>
        <p className="bb-mono mt-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c6f208]">
          {m.role}
        </p>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#f2f2e1]/55">{m.bio}</p>
      </div>
    </article>
  );
}

export function Team() {
  const [selected, setSelected] = useState<number | null>(null);
  const member = selected !== null ? TEAM.members[selected] : null;

  return (
    <section
      id="about-us"
      aria-labelledby="team-title"
      className="relative border-t border-[#f2f2e1]/10 py-24 sm:py-28 lg:py-36"
    >
      <LayoutGroup>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow index="06">People</Eyebrow>
              <h2
                id="team-title"
                className="bb-display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]"
              >
                <SplitWords text={TEAM.title} />
              </h2>
            </div>
          </div>

          <Stagger
            className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
            gap={0.08}
          >
            {TEAM.members.map((m, i) => (
              <RevealItem key={m.name}>
                <TeamCard m={m} index={i} hidden={selected === i} onOpen={() => setSelected(i)} />
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <AnimatedDialog
          open={member !== null}
          onOpenChange={(o) => !o && setSelected(null)}
          className="sm:max-w-3xl"
          closeLabel="Close bio"
        >
          {member && (
            <div className="grid gap-6 p-5 pt-6 sm:grid-cols-[minmax(0,5fr)_7fr] sm:gap-10 sm:p-8">
              <div className="aspect-[4/5] w-36 overflow-hidden rounded-2xl bg-[#050505] sm:w-full">
                <Portrait m={member} eager />
              </div>
              <motion.div
                className="sm:py-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition.content, delay: 0.15 } }}
              >
                <p className="bb-mono text-[0.65rem] uppercase tracking-[0.24em] text-[#f2f2e1]/60">
                  {TEAM.title}
                </p>
                <DialogTitle className="bb-display mt-4 pr-10 text-[clamp(2rem,4vw,3rem)] leading-none">
                  {member.name}
                </DialogTitle>
                <p className="bb-mono mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-[#c6f208]">
                  {member.role}
                </p>
                <DialogDescription className="mt-6 text-base leading-relaxed text-[#f2f2e1]/80 sm:text-[1.05rem]">
                  {member.bio}
                </DialogDescription>
              </motion.div>
            </div>
          )}
        </AnimatedDialog>
      </LayoutGroup>
    </section>
  );
}
