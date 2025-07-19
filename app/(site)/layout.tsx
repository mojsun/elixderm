import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elixderm - Boutique Beauty Manufacturing",
  description: "Professional beauty manufacturing for indie brands. Low MOQs, transparent pricing, and flexible production.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //get all our pages
  const pages = await getPages();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="page-layout">
          <header className="page-header">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-bold font-logo text-primary"
              >
                Elixderm
              </Link>
              <div className="flex items-center gap-8 text-sm text-dark">
                {pages.map((page) => (
                  <Link
                    key={page._id}
                    href={`/${page.slug}`}
                    className="hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <main className="page-content">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
