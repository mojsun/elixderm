// components/CTA/QuoteCTA.tsx
import Link from "next/link";

export default function QuoteCTA(): JSX.Element {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/contact" className="block group">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-xl shadow-md p-8 transition-transform group-hover:scale-[1.01]">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to bring your vision to life?
              </h3>
              <p className="text-gray-600 text-sm">
                Get a custom quote tailored to your project needs
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="mt-4 md:mt-0 md:ml-6 text-indigo-600">
              <svg
                className="w-10 h-10 rotate-[315deg]"
                viewBox="0 0 800 800"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="175"
                  y1="175"
                  x2="625"
                  y2="625"
                  markerEnd="url(#arrowHead)"
                />
                <defs>
                  <marker
                    id="arrowHead"
                    markerWidth="15"
                    markerHeight="15"
                    refX="7.5"
                    refY="7.5"
                    viewBox="0 0 15 15"
                    orient="auto"
                  >
                    <polygon
                      points="0,15 7.5,7.5 0,0 15,7.5"
                      fill="currentColor"
                    />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
