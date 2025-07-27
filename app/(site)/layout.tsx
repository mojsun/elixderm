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
          <nav className="navbar sticky top-0 z-[1000] bg-white/98 backdrop-blur-[20px] border-b border-black/8 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)" id="navbar">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-8 lg:px-6 md:px-6 sm:px-4 h-20 md:h-20 sm:h-[70px]">
              <Link href="/" className="font-logo text-[2rem] md:text-[2rem] sm:text-[1.6rem] font-normal text-dark tracking-[0.02em] relative transition-all duration-300 ease-in-out group no-underline">
                <span className="relative">
                  Elixderm
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </span>
              </Link>
              
              <div className="mobile-menu-toggle hidden md:flex sm:flex flex-col justify-center cursor-pointer w-8 h-8 gap-1.5" id="mobile-menu-toggle">
                <span className="hamburger-line block w-6 h-0.5 bg-dark transition-all duration-300 ease-in-out origin-center"></span>
                <span className="hamburger-line block w-6 h-0.5 bg-dark transition-all duration-300 ease-in-out origin-center"></span>
                <span className="hamburger-line block w-6 h-0.5 bg-dark transition-all duration-300 ease-in-out origin-center"></span>
              </div>
              
              <ul className="nav-menu flex list-none items-center gap-2 lg:gap-1 md:fixed md:top-20 md:left-[-100%] md:w-full md:h-[calc(100vh-80px)] md:bg-white/98 md:backdrop-blur-[20px] md:flex-col md:justify-start md:items-stretch md:p-8 md:gap-0 md:transition-all md:duration-300 md:cubic-bezier(0.4, 0, 0.2, 1) md:border-t md:border-black/8 sm:top-[70px] sm:h-[calc(100vh-70px)] sm:p-6" id="nav-menu">
                <li className="nav-item relative md:w-full md:border-b md:border-black/5">
                  <a href="#" className="nav-link text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-between md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent">
                    Services 
                    <span className="dropdown-arrow text-xs text-gray-400 transition-all duration-200 ease-in-out">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item relative md:w-full md:border-b md:border-black/5">
                  <a href="#" className="nav-link text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-between md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent">
                    Products 
                    <span className="dropdown-arrow text-xs text-gray-400 transition-all duration-200 ease-in-out">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item relative md:w-full md:border-b md:border-black/5">
                  <a href="#" className="nav-link text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-between md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent">
                    Who We Help 
                    <span className="dropdown-arrow text-xs text-gray-400 transition-all duration-200 ease-in-out">⌄</span>
                  </a>
                </li>
                
                <li className="nav-item relative md:w-full md:border-b md:border-black/5">
                  <a href="#" className="nav-link text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-between md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent">
                    Resources 
                    <span className="dropdown-arrow text-xs text-gray-400 transition-all duration-200 ease-in-out">⌄</span>
                  </a>
                </li>
                
                {pages.map((page) => (
                  <li key={page._id} className="nav-item relative md:w-full md:border-b md:border-black/5">
                    <Link
                      href={`/${page.slug}`}
                      className="nav-link text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-between md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
                
                <li className="nav-item search-container relative flex items-center md:flex-col md:items-stretch md:w-full md:border-b md:border-black/5">
                  <button className="search-button bg-transparent border-none text-gray-600 p-3 lg:p-2.5 md:w-full md:p-5 md:justify-center rounded-lg cursor-pointer transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-center relative z-[2] opacity-100 hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent" id="search-button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-all duration-200 ease-in-out hover:scale-110">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                  <div className="search-input-container absolute right-0 top-1/2 -translate-y-1/2 md:static md:transform-none md:w-full md:mt-2 md:rounded-xl flex items-center bg-white border border-primary-200/50 rounded-[25px] w-0 overflow-hidden transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) opacity-0 pointer-events-none" id="search-input-container">
                    <input type="text" className="search-input border-none outline-none p-3 px-4 text-sm font-sans bg-transparent flex-1 text-gray-600 placeholder:text-gray-400" placeholder="Search..." id="search-input" />
                    <button className="search-close bg-transparent border-none text-gray-400 cursor-pointer p-2 mr-1 rounded-full w-7 h-7 flex items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-red-100 hover:text-red-500" id="search-close">×</button>
                  </div>
                </li>
                
                <li className="nav-item md:w-full">
                  <Link href="/contact-us" className="nav-link cta-button text-gray-600 no-underline px-5 py-3 lg:px-4 lg:py-2.5 md:w-full md:px-0 md:py-5 md:justify-center md:text-lg sm:text-base flex items-center gap-2 font-medium text-[0.95rem] lg:text-[0.9rem] rounded-lg transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) relative whitespace-nowrap hover:text-primary-500 hover:bg-primary-100/50 hover:-translate-y-0.5 md:hover:translate-y-0 md:hover:bg-transparent">Get a Quote</Link>
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
