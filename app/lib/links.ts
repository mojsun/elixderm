const SITE_HOSTS = new Set(["www.elixderm.com", "elixderm.com"]);

/**
 * Links saved in Sanity are often full addresses such as https://www.elixderm.com/contact-us.
 * This turns links to our own site into paths ("/contact-us"), so they open in the same tab
 * with Next.js's instant in-app navigation. Other addresses are returned unchanged.
 */
export function sitePath(url: string): string {
  try {
    const parsed = new URL(url, "https://www.elixderm.com");
    if (SITE_HOSTS.has(parsed.hostname)) return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    // Not a valid address: leave it as it is.
  }
  return url;
}

/** True for links that leave our site (these open in a new tab). */
export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(sitePath(url));
}
