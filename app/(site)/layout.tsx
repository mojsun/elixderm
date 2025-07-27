import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira_Stencil_One, Outfit, DM_Sans } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sairaStencil.variable} ${outfit.variable} ${dmSans.variable} antialiased`}
      >
        <div className="page-layout">
          <nav className="navbar" id="navbar">
            <div className="nav-container">
              <Link href="/" className="logo">
                Elixderm
              </Link>
              
              <div className="mobile-menu-toggle" id="mobile-menu-toggle">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
              
              <ul className="nav-menu" id="nav-menu">
                <li className="nav-item">
                  <Link href="/about" className="nav-link">
                    About Us
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link href="/contact-us" className="nav-link cta-button">Get a Quote</Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="page-content">
            {children}
          </main>
          
          <Footer />
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Mobile menu toggle functionality
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
              const navMenu = document.getElementById('nav-menu');
              const navbar = document.getElementById('navbar');

              if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.addEventListener('click', () => {
                  mobileMenuToggle.classList.toggle('active');
                  navMenu.classList.toggle('active');
                });
              }

              // Search functionality
              const searchButton = document.getElementById('search-button');
              const searchInputContainer = document.getElementById('search-input-container');
              const searchInput = document.getElementById('search-input');
              const searchClose = document.getElementById('search-close');

              function openSearch() {
                if (searchInputContainer) {
                  searchInputContainer.classList.add('active');
                  setTimeout(() => {
                    if (searchInput) searchInput.focus();
                  }, 200);
                }
              }

              function closeSearch() {
                if (searchInputContainer && searchInput) {
                  searchInputContainer.classList.remove('active');
                  searchInput.value = '';
                }
              }

              if (searchButton) {
                searchButton.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (searchInputContainer && searchInputContainer.classList.contains('active')) {
                    closeSearch();
                  } else {
                    openSearch();
                  }
                });
              }

              if (searchClose) {
                searchClose.addEventListener('click', (e) => {
                  e.stopPropagation();
                  closeSearch();
                });
              }

              // Close search when clicking outside
              document.addEventListener('click', (e) => {
                if (searchInputContainer && searchInputContainer.classList.contains('active')) {
                  if (!e.target.closest('.search-container')) {
                    closeSearch();
                  }
                }
              });

              // Close mobile menu when clicking outside
              document.addEventListener('click', (e) => {
                if (navbar && !navbar.contains(e.target)) {
                  if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                  if (navMenu) navMenu.classList.remove('active');
                }
              });

              // Scroll effect for navbar
              window.addEventListener('scroll', () => {
                if (navbar) {
                  if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                  } else {
                    navbar.classList.remove('scrolled');
                  }
                }
              });
            });
          `
        }} />
      </body>
    </html>
  );
}
