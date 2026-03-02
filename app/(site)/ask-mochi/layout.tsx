import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ask Mochi — Elixderm\'s Manufacturing AI',
  description: 'Get instant answers about private label formulation, MOQs, packaging, compliance, and more. Chat directly with Mochi, Elixderm\'s manufacturing specialist.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AskMochiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
