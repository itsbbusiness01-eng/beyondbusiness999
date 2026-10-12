import { useEffect, useRef, type CSSProperties } from "react";

/*
 * One small explanatory diagram per service. They animate only while their service is the
 * one in focus (CSS play-state + SMIL pause), and freeze for reduced-motion visitors.
 */

const CREAM = "#f2f2e1";
const LIME = "#c6f208";

const loop = (name: string, seconds: number, delay = 0): CSSProperties => ({
  animation: `${name} ${seconds}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s infinite`,
  transformBox: "fill-box",
});

function WebsiteGlyph() {
  const bar = (delay: number): CSSProperties => ({
    ...loop("bb-glyph-build", 4.2, delay),
    transformOrigin: "left center",
  });
  return (
    <>
      <rect x="10" y="12" width="140" height="96" rx="6" stroke={CREAM} strokeOpacity="0.35" />
      <line x1="10" y1="28" x2="150" y2="28" stroke={CREAM} strokeOpacity="0.2" />
      {[20, 28, 36].map((cx) => (
        <circle key={cx} cx={cx} cy="20" r="2" fill={CREAM} fillOpacity="0.35" />
      ))}
      <rect
        x="22"
        y="40"
        width="72"
        height="9"
        rx="2"
        fill={CREAM}
        fillOpacity="0.55"
        style={bar(0)}
      />
      <rect
        x="22"
        y="56"
        width="104"
        height="4"
        rx="2"
        fill={CREAM}
        fillOpacity="0.25"
        style={bar(0.15)}
      />
      <rect
        x="22"
        y="65"
        width="86"
        height="4"
        rx="2"
        fill={CREAM}
        fillOpacity="0.25"
        style={bar(0.25)}
      />
      <rect x="22" y="80" width="42" height="15" rx="7.5" fill={LIME} style={bar(0.45)} />
    </>
  );
}

function LeadsGlyph() {
  const drops = [
    { x: 30, dur: 2.6, delay: 0 },
    { x: 62, dur: 2.2, delay: 0.5 },
    { x: 98, dur: 2.5, delay: 1.1 },
    { x: 128, dur: 2.3, delay: 1.6 },
    { x: 48, dur: 2.4, delay: 2 },
  ];
  return (
    <>
      <path
        d="M14 22 H146 L94 70 V104 H66 V70 Z"
        stroke={CREAM}
        strokeOpacity="0.35"
        strokeLinejoin="round"
      />
      {drops.map((d, i) => (
        <circle key={i} r="3" fill={i % 2 === 0 ? LIME : CREAM} cx="0" cy="0" opacity="0">
          <animateMotion
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
            path={`M${d.x} 6 L${d.x} 22 L80 70 L80 114`}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </>
  );
}

function PresenceGlyph() {
  const ring = (delay: number): CSSProperties => ({
    ...loop("bb-glyph-ring", 3, delay),
    transformOrigin: "center",
  });
  const audience = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { x: 80 + Math.cos(a) * 50, y: 60 + Math.sin(a) * 46 };
  });
  return (
    <>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="80" cy="60" r="44" stroke={LIME} strokeOpacity="0.7" style={ring(i)} />
      ))}
      {audience.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={CREAM} fillOpacity="0.45" />
      ))}
      <circle cx="80" cy="60" r="9" fill={LIME} />
    </>
  );
}

function AutomationGlyph() {
  const nodes = [
    [30, 28],
    [130, 28],
    [130, 92],
    [30, 92],
  ];
  return (
    <>
      <path d="M30 28 H130 V92 H30 Z" stroke={CREAM} strokeOpacity="0.3" strokeDasharray="4 6" />
      {nodes.map(([x, y], i) => (
        <rect
          key={i}
          x={x - 9}
          y={y - 9}
          width="18"
          height="18"
          rx="4"
          fill="#050505"
          stroke={CREAM}
          strokeOpacity="0.5"
        />
      ))}
      <circle r="5" fill={LIME}>
        <animateMotion dur="4s" repeatCount="indefinite" path="M30 28 H130 V92 H30 Z" />
      </circle>
      <text
        x="80"
        y="66"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="3"
        fill={CREAM}
        fillOpacity="0.45"
        fontFamily="Space Grotesk, sans-serif"
      >
        AUTO
      </text>
    </>
  );
}

function FounderGlyph() {
  const kids = [36, 80, 124];
  return (
    <>
      <g style={{ ...loop("bb-glyph-link", 5), transformOrigin: "center" }}>
        {kids.map((x) => (
          <line key={x} x1="80" y1="34" x2={x} y2="74" stroke={CREAM} strokeOpacity="0.35" />
        ))}
      </g>
      <line x1="36" y1="82" x2="124" y2="82" stroke={LIME} strokeOpacity="0.8" />
      {kids.map((x) => (
        <g key={x}>
          <circle cx={x} cy="82" r="8" fill="#050505" stroke={CREAM} strokeOpacity="0.6" />
          <line x1={x} y1="90" x2={x} y2="104" stroke={CREAM} strokeOpacity="0.2" />
          <circle cx={x} cy="106" r="3" fill={CREAM} fillOpacity="0.35" />
        </g>
      ))}
      <g style={{ ...loop("bb-glyph-lift", 5), transformOrigin: "center" }}>
        <circle cx="80" cy="26" r="10" fill={LIME} />
      </g>
    </>
  );
}

const GLYPHS = [WebsiteGlyph, LeadsGlyph, PresenceGlyph, AutomationGlyph, FounderGlyph];

export function ServiceGlyph({ index, active }: { index: number; active: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const Glyph = GLYPHS[index] ?? WebsiteGlyph;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [active]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden
      className="bb-glyph h-auto w-full"
      data-active={active}
    >
      <Glyph />
    </svg>
  );
}
