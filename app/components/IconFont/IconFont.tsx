'use client'

import { useEffect } from 'react'

// Only the icons the site uses. Add new icon names here, in alphabetical order.
const ICON_FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=approval_delegation,balance,biotech,handshake,inventory,lab_research,lightbulb,price_check&display=block'

/**
 * Loads the icon font's stylesheet once the page has rendered, and only on pages that show
 * icons. As a stylesheet in <head>, it held up every page until Google's server answered.
 * `display=block` keeps an icon blank, rather than showing its name, until the font arrives.
 */
export default function IconFont() {
  useEffect(() => {
    if (document.querySelector(`link[href="${ICON_FONT_CSS}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = ICON_FONT_CSS
    document.head.appendChild(link)
  }, [])

  return null
}
