/*
 * Site copy and data for the home page.
 *
 * Everything here is the existing Beyond Business content, moved out of the components
 * unchanged so layout work can never accidentally alter it. Edit copy here, not in JSX.
 */

export const TAGLINE = "Your Business, Beyond Limits.";

export const ANNOUNCEMENT = {
  lead: "Free 30-Min Strategy Call",
  rest: "See exactly how to scale beyond limits",
};

export type NavItem = { label: string; id: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", id: "services" },
  { label: "Method", id: "method" },
  { label: "About Us", id: "about-us" },
  { label: "FAQ", id: "faq" },
];

export const HERO = {
  lines: [
    [{ text: "DO" }, { text: "YOU" }, { text: "WANT" }],
    [
      { text: "TO", tone: "stroke" },
      { text: "SCALE", tone: "lime" },
    ],
    [{ text: "YOUR" }, { text: "BUSINESS?", tone: "lime" }],
  ] as { text: string; tone?: "lime" | "stroke" }[][],
  sub: "Learn from the team that has scaled a portfolio to over 10cr+ in annual revenue.",
  cta: "I'M READY TO SCALE",
};

export type Metric = { label: string; value: number; suffix: string };

export const TRACK_RECORD = {
  title: "Our Track Record",
  sub: "Here's what we've done for businesses like yours.",
  cta: "See How We Can Grow Your Business",
  metrics: [
    { label: "Average Revenue Growth", value: 312, suffix: "%" },
    { label: "Leads Generated", value: 184500, suffix: "+" },
    { label: "Business Tasks Automated with AI", value: 250, suffix: "+" },
    { label: "Businesses Scaled", value: 96, suffix: "+" },
  ] as Metric[],
};

export type ClientLogo = {
  name: string;
  /** Trimmed, optimised copy of the original logo (same artwork, padding removed). */
  src: string;
  /** Original asset, kept as the source of truth. */
  original: string;
  width: number;
  height: number;
  /** JPEG logos ship on white; they are multiplied onto the cream surface. */
  whiteGround: boolean;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Sniffix",
    src: "/assets/optimized/client-sniffix.webp",
    original: "/assets/sniffix_logobg.png",
    width: 376,
    height: 300,
    whiteGround: false,
  },
  {
    name: "Elevatech",
    src: "/assets/optimized/client-elevatech.webp",
    original: "/assets/elevatech_logob.png",
    width: 423,
    height: 86,
    whiteGround: false,
  },
  {
    name: "Sreenidhi Software Services",
    src: "/assets/optimized/client-sreenidhi.webp",
    original: "/assets/company_logo (1).jpeg",
    width: 600,
    height: 173,
    whiteGround: true,
  },
  {
    name: "Pista House",
    src: "/assets/optimized/client-pista-house.webp",
    original: "/assets/company_logo (2).jpeg",
    width: 600,
    height: 214,
    whiteGround: true,
  },
  {
    name: "Marluce Bakers",
    src: "/assets/optimized/client-marluce.webp",
    original: "/assets/company_logo (3).jpeg",
    width: 600,
    height: 236,
    whiteGround: true,
  },
  {
    name: "GreenPots",
    src: "/assets/optimized/client-greenpots.webp",
    original: "/assets/company_logo (4).jpeg",
    width: 600,
    height: 193,
    whiteGround: true,
  },
];

export const PROBLEM = {
  title: "Ask Yourself This",
  questions: [
    "Does your competitors show up first, not you?",
    "Do Smaller competitors get found online before you do?",
    "Why do new buyers find your competitors, but not you?",
    "Is a smaller competitor winning leads that should be yours?",
    "When buyers search online, do they even find you?",
  ],
  closing: "Does Any of This Sound Like Your Business? If You Said Yes to These, We Should Talk.",
  cta: "I WANT TO FIX THIS",
};

export type Service = {
  tag: string;
  headline: string;
  sub: string;
  features: string[];
};

export const SERVICES_INTRO = {
  title: "How We Help You Grow Your Business",
  sub: "We build your website, bring you leads, save you time, and grow your reputation among your customers.",
  cta: "Get Started",
};

export const SERVICES: Service[] = [
  {
    tag: "01",
    headline: "Website Development",
    sub: "A complete website stack that turns visitors into paying customers.",
    features: [
      "Website Development & Deployment",
      "Website Speed Optimization",
      "Custom CRM & Dashboard Development",
      "Custom Software Development",
      "AI Chat Bot Integration",
      "Multiple Page Optimization",
      "Mobile & Tablet Friendly Optimization",
      "SEO Optimization",
      "Persuasive Copywriting",
      "Custom UTM Links",
      "Traffic Tracking Pixel Integration",
    ],
  },
  {
    tag: "02",
    headline: "Leads & Sales Generation System",
    sub: "A complete system that brings you new leads, every single month.",
    features: [
      "Cold Outreach System",
      "Warm Outreach System",
      "Paid Advertisement (Google/Meta)",
      "Full Funnel Design & Development",
      "Ad Creatives Production",
      "WhatsApp Campaigns",
      "Email Campaigns",
      "Affiliate Systems for More Growth",
      "Integration Marketing",
      "Upsell / Cross-sell / Downsell Management",
      "Full Tracking System",
    ],
  },
  {
    tag: "03",
    headline: "Build Your Online Presence",
    sub: "We build a content system that builds and maintains your online presence.",
    features: [
      "Social Media Account Handling",
      "Content Research & Strategy",
      "Customised Content Script Writing",
      "Content Shooting",
      "Content Editing",
      "Omnichannel Management",
      "Brand Storytelling",
      "Personal Branding for Founders",
      "Content Funnel Development",
      "Influencer Collaboration Management",
      "Online Reputation & Review Management",
    ],
  },
  {
    tag: "04",
    headline: "AI Automations",
    sub: "We automate your boring tasks, so you get more time for your family.",
    features: [
      "WhatsApp Communication Automation",
      "Email Communication Automation",
      "Complete Leads System Automation",
      "Complete Sales System Automation",
      "Logistical Automation (For Ecommerce Businesses)",
      "Customer Service Automation",
      "Invoice & Payment Reminder Automation",
      "Appointment & Booking Automation",
      "Data Entry & Reporting Automation",
      "Internal Team Task Automation",
      "Review & Feedback Collection Automation",
    ],
  },
  {
    tag: "05",
    headline: "Founder Freedom System",
    sub: "A system that lets your business run, grow, and even sell — without you.",
    features: [
      "SOPs Development",
      "Sales Process Documentation",
      "Team Training Systems",
      "Hiring & Onboarding Systems",
      "Decision Dashboards for Owners",
      "Delegation Roadmap",
      "Second-in-Command (Ops Manager) Hiring & Setup",
      "Weekly Business Review System",
      "Financial Systems & Cash Flow Tracking",
      "Customer Complaint & Escalation System",
      "Founder Exit Readiness Planning",
    ],
  },
];

export type MethodStep = { n: string; title: string; desc: string };

export const METHOD = {
  title: "The Beyond Business Method",
  sub: "A five-stage operating system for engineering compounding growth.",
  steps: [
    {
      n: "01",
      title: "The Deep Map",
      desc: "We study your business, market, and gaps first — so every move is built on truth, not guesswork.",
    },
    {
      n: "02",
      title: "The Power Base",
      desc: "We build the website / apps and brand that make you look as strong online as you already are offline.",
    },
    {
      n: "03",
      title: "The Inflow Engine",
      desc: "We switch on a steady stream of new leads — so your growth no longer waits on referrals.",
    },
    {
      n: "04",
      title: "The Conversion Core",
      desc: "We track and follow up every lead with smart automation — so not a single sale slips away.",
    },
    {
      n: "05",
      title: "The Market Lead",
      desc: "We scale the whole system and make you the name your market follows — on the road Beyond limits.",
    },
  ] as MethodStep[],
};

export const WHY = {
  title: "Why Businesses Want to Work With Us",
  lead: "We don't just grow your business.",
  emphasis: "We free you from running it.",
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Optimised portrait used on the page. */
  img: string;
  /** Original asset, kept as the source of truth. */
  original: string;
  width: number;
  height: number;
  /** CSS object-position for the portrait crop. */
  focus?: string;
};

export const TEAM = {
  title: "Team Behind Beyond Business",
  members: [
    {
      name: "Srinadh Reddy",
      role: "Co-Founder",
      bio: "Hey, I'm Srinadh Reddy, Co-Founder of Beyond Business. I've spent 5+ years turning brands into names people don't forget. I have only one goal: make sure your customers never forget you.",
      img: "/assets/optimized/srinadh.webp",
      original: "/assets/srinadh.png",
      width: 960,
      height: 1112,
      focus: "50% 30%",
    },
    {
      name: "Sairam Nayak",
      role: "Co-Founder",
      bio: "Hi, I'm Sairam Nayak, Co-Founder of Beyond Business. My friends call me \"The Profit Guy\" because I've grown my own businesses at an average 1:24 ROAS—profitably. Now I bring that same approach to your business, helping you build stronger foundations, generate consistent leads, and capture a bigger share of your market.",
      img: "/assets/optimized/sairam.webp",
      original: "/assets/sr 2.png",
      width: 377,
      height: 603,
      focus: "50% 25%",
    },
    {
      name: "Uday",
      role: "Lead Developer",
      bio: "Hi, I'm Uday. I've spent 10+ years writing code and leading teams that build things right the first time. From high-end websites to full product builds, my team and I make sure everything runs smoothly, so you can focus on your business—not your bugs.",
      img: "/assets/optimized/uday.webp",
      original: "/assets/uday - teamate.jpeg",
      width: 960,
      height: 768,
      focus: "52% 50%",
    },
    {
      name: "Akhil",
      role: "Creative Director",
      bio: "Hi, I'm Akhil, Creative Director at Beyond Business. My camera has worked with brands like Pista House and Marluce Bakery. In a world where everyone's posting, I make sure your content is the one people actually remember.",
      img: "/assets/optimized/akhil.webp",
      original: "/assets/akhil.jpeg",
      width: 800,
      height: 1200,
      focus: "50% 15%",
    },
    {
      name: "Harsha Reddy",
      role: "Social Media Growth Manager",
      bio: "Hi, I'm Harsha Reddy, Social Media Growth Manager at Beyond Business. I handle your social media accounts so your content goes out on time, every time. I know exactly when to post for the best chance of going viral, helping you stay consistent and visible without lifting a finger.",
      img: "/assets/optimized/harsha.webp",
      original: "/assets/harsha.png",
      width: 960,
      height: 1200,
      focus: "50% 20%",
    },
    {
      name: "Maneesh Reddy",
      role: "Customer Experience Manager",
      bio: "Hi, I'm Maneesh Reddy, Customer Experience Manager at Beyond Business. I make sure every customer interaction leaves a lasting impression. That's how referrals and word-of-mouth happen naturally. I've already grown our own NPS score from 35 to 67, and I bring that same customer-first approach to your business.",
      img: "/assets/optimized/maneesh.webp",
      original: "/assets/maneesh.jpeg",
      width: 960,
      height: 1022,
      focus: "50% 25%",
    },
  ] as TeamMember[],
};

export type Faq = { q: string; a: string };

export const FAQ_TITLE = "Frequently Asked Questions by Business Owners";

export const FAQS: Faq[] = [
  {
    q: "I tried digital marketing before and it didn't work. Why will this be different?",
    a: "Most digital marketing fails because it's random posts and ads with no system behind them. We don't do random. We build a complete system — and we show you results at every step.",
  },
  {
    q: "How do I know I won't get cheated like last time?",
    a: "Fair question — many owners have been burned. That's why we lead with proof, not promises. You'll see real numbers, clear plans, and exactly where your money goes before you spend it.",
  },
  {
    q: "Do you actually understand my type of business?",
    a: "Yes. We work with established businesses like yours, not startups. We learn how your business really makes money first — then build around that, not around buzzwords.",
  },
  {
    q: "This sounds expensive. What will it cost?",
    a: "We price for the value we create, not by the hour. Every plan is built to return far more than it costs. We'll show you the numbers before you decide — no surprises.",
  },
  {
    q: "What return will I actually get?",
    a: "More inquiries, more sales, and less dependence on referrals. We set clear goals at the start, then track them — so you always know what your money achieved.",
  },
  {
    q: "I don't have time to manage this. Will it add to my work?",
    a: "No — it removes work. We handle the building and the running. You stay informed with simple updates, without doing the heavy lifting.",
  },
  {
    q: "How long before I see results?",
    a: "Some wins come fast, like a better website and first inquiries. Real, steady growth builds over a few months. We're honest about timelines — we don't promise magic overnight.",
  },
  {
    q: "What if it doesn't work? Any guarantee?",
    a: "We can't promise luck, and anyone who does is lying. What we promise is a proven system, clear steps, and full honesty. We work in stages, so you see progress before going deeper.",
  },
  {
    q: "I already have someone doing social media. Why do I need you?",
    a: "One person posting isn't a growth system. We build the full engine — website, leads, content, sales, and follow-up — so your growth doesn't sit on one person's shoulders.",
  },
  {
    q: "My business runs on referrals and walk-ins. Do I even need online?",
    a: "Referrals are great — until they slow down. Today, your buyers search online first. If they don't find you, they find your competitor. We make sure they find you.",
  },
  {
    q: "Will I lose control of my business or brand?",
    a: "Never. You stay in full control. We build everything in your name, share clear reports, and keep you the decision-maker at every step.",
  },
  {
    q: "I'm not tech-savvy. Will I understand what's happening?",
    a: "Completely. We explain everything in plain business language — no confusing terms. If you understand revenue and customers, you'll understand our work.",
  },
  {
    q: "How are you different from other agencies and freelancers?",
    a: "Agencies chase startups. Freelancers come and go. We're a long-term growth partner who speaks business first, builds real systems, and stays with you as you grow.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "We build for the long term, but we earn that trust first. We start with clear, simple terms — and you continue because the results make it an easy choice.",
  },
  {
    q: "If I stop one day, do I keep everything you built?",
    a: "Yes. Your website, your brand, your systems, your data — all yours. We build assets you own, not things you rent from us.",
  },
];

export const FINAL_CTA = {
  lines: ["READY TO SCALE", "YOUR BUSINESS", "BEYOND LIMITS?"],
  sub: "Book a strategy call. We'll map your growth system in 30 minutes.",
  cta: "Let's Build Your Growth System",
};

export const FOOTER = {
  blurb: "An AI-powered growth studio engineering the digital infrastructure of modern founders.",
  email: "hello@beyondbusiness.studio",
  address: [
    "Unit No. 712, 7th Floor,",
    "“MANJEERA TRINITY CORPORATE”,",
    "Sy. No. 1050(P), Kukatpally Village and Mandal,",
    "Medchal-Malkajgiri District, Telangana, India",
  ],
  /*
   * The live site links these to "#". Real profile URLs were not available in the repo,
   * so they stay as placeholders – replace `href` once the profiles are confirmed.
   */
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
};
