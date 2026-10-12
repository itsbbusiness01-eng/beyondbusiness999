import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

// Brand fonts load without blocking first paint (display=swap); see RootShell.
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600&display=swap";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 text-[#f2f2e1]">
      <div aria-hidden className="absolute inset-0 bb-grid-bg bb-grid-fade opacity-50" />
      <div className="relative max-w-md text-center">
        <p className="bb-mono text-xs uppercase tracking-[0.3em] text-[#c6f208]">Error 404</p>
        <h1 className="bb-display mt-4 text-7xl sm:text-8xl">404</h1>
        <h2 className="mt-6 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-[#f2f2e1]/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#c6f208] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#050505] transition-colors hover:bg-[#d4ff1f]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#050505" },
      { title: "Beyond Business — Your Business, Beyond Limits." },
      { name: "description", content: "AI-powered growth studio engineering websites, web apps, automation, ads and content for ambitious founders." },
      { name: "author", content: "Beyond Business" },
      { property: "og:title", content: "Beyond Business — Your Business, Beyond Limits." },
      { property: "og:description", content: "AI-powered growth studio engineering websites, web apps, automation, ads and content for ambitious founders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Beyond Business — Your Business, Beyond Limits." },
      { name: "twitter:description", content: "AI-powered growth studio engineering websites, web apps, automation, ads and content for ambitious founders." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea35f73e-f156-4a66-b84c-e8fbc9e54c7e/id-preview-8a42e637--f5d29ce7-fda4-45ef-8bd3-170f5809071f.lovable.app-1779176638697.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea35f73e-f156-4a66-b84c-e8fbc9e54c7e/id-preview-8a42e637--f5d29ce7-fda4-45ef-8bd3-170f5809071f.lovable.app-1779176638697.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Before first paint: skip the intro / announcement if already seen this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=sessionStorage,c=document.documentElement.classList;if(s.getItem('bb-intro')==='1')c.add('bb-intro-seen');if(s.getItem('bb-announce-off')==='1')c.add('bb-announce-off')}catch(e){}var l=document.createElement('link');l.rel='stylesheet';l.href='${FONTS_URL}';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3WH69TNKHW"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3WH69TNKHW');
        ` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N6764G6H');` }} />
        <HeadContent />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6764G6H" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <noscript>
          <link rel="stylesheet" href={FONTS_URL} />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
