'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Google Analytics event sent when the link is clicked. */
  event: string
  eventParams?: Record<string, string>
}

/** A Link that also sends a Google Analytics event when clicked. */
export default function TrackedLink({ event, eventParams = {}, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        // gtag comes from the Google Analytics snippet in the root layout.
        window.gtag?.('event', event, eventParams)
        onClick?.(e)
      }}
    />
  )
}
