import type { Metadata, Viewport } from "next";
import { Geist_Mono, Saira_Stencil_One, Outfit, DM_Sans } from "next/font/google";
import Script from 'next/script';
import "../globals.css";
import Footer from "../components/Footer/Footer";
import NavbarScrollHandler from "../components/NavbarScrollHandler/NavbarScrollHandler";
import Navigation from "../components/Navigation";
import { getMenuProducts, getMenuServices, getMenuWhoWeHelps } from "@/sanity/sanity-utils";

// Rebuild each page in the background at most once a minute, so Sanity edits reach the site
// without a redeploy. Without it, pages keep the Sanity data cached by an earlier build.
export const revalidate = 60;

// Only code snippets in blog posts use it, so it loads on demand.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const sairaStencil = Saira_Stencil_One({
  variable: "--font-saira-stencil",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elixderm - Boutique Beauty Manufacturing",
  description: "Best Professional beauty manufacturing for indie brands. Low MOQs, transparent pricing, and flexible production.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuProducts, menuServices, menuWhoWeHelps] = await Promise.all([
    getMenuProducts(),
    getMenuServices(),
    getMenuWhoWeHelps(),
  ]);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* The icon font loads only on pages with icons: app/components/IconFont. */}
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistMono.variable} ${sairaStencil.variable} ${outfit.variable} ${dmSans.variable} antialiased`}
      >
        <div className="page-layout">
          <Navigation
            menuProducts={menuProducts}
            menuServices={menuServices}
            menuWhoWeHelps={menuWhoWeHelps}
          />

          <main className="page-content">
            {children}
          </main>
          
          <Footer />
          <NavbarScrollHandler />
        </div>

      </body>
      {/* Google Analytics. The gtag queue is set up as soon as the page is interactive, so page
          views and click events (TrackedLink) are recorded from the start; Google's 150 KB script
          loads once the page has finished loading, instead of competing with the page's own
          files. Visits that end before then are not counted. */}
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YTNY2D4FJV');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-YTNY2D4FJV" strategy="lazyOnload" />
    </html>
  );
}
