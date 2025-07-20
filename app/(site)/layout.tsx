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
                  <a href="#" className="nav-link">
                    Services 
                    <span className="dropdown-arrow">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Products 
                    <span className="dropdown-arrow">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Who We Help 
                    <span className="dropdown-arrow">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Resources 
                    <span className="dropdown-arrow">⌄</span>
                  </a>
                </li>
                
                {pages.map((page) => (
                  <li key={page._id} className="nav-item">
                    <Link
                      href={`/${page.slug}`}
                      className="nav-link"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
                
                <li className="nav-item search-container">
                  <button className="search-button" id="search-button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                  <div className="search-input-container" id="search-input-container">
                    <input type="text" className="search-input" placeholder="Search..." id="search-input" />
                    <button className="search-close" id="search-close">×</button>
                  </div>
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
