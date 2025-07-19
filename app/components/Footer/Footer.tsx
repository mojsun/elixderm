import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                About Elixderm
              </Link>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <svg
                className="mt-1"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                123 Innovation Drive
                <br />
                Mississauga, ON L5M 2B5
                <br />
                Canada
              </span>
            </li>
          </ul>
        </div>

        {/* What We Do */}
        <div>
          <h3 className="text-lg font-semibold mb-4">What We Do</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Private Label Manufacturing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Custom Formulation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Packaging & Labeling
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Regulatory Support
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Dropshipping & Fulfillment
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Community Forum
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Starter Kits
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li className="pt-2 border-t border-gray-700"></li>
            <li>
              <Link href="#" className="hover:underline">
                Cost Estimator Tool
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                AI Label Tool
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:hello@elixderm.com">hello@elixderm.com</a>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                YouTube
              </Link>
            </li>
          </ul>

          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
            <p className="text-xs mb-2">
              Get industry insights and exclusive content
            </p>
            <form className="flex border border-white rounded overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-2 py-1 text-sm outline-none flex-grow"
                required
              />
              <button type="submit" className="bg-white text-gray-900 px-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-sm flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <a href="#" className="text-white font-semibold text-lg">
            Elixderm
          </a>
          <p className="text-xs text-gray-400">Professional Beauty Solutions</p>
        </div>
        <div className="space-x-4">
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline">
            Cookie Policy
          </Link>
          <Link href="#" className="hover:underline">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
