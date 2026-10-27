const ELIXDERM = "https://www.elixderm.com";

/** cwialpha.com pages linked from site content, and the Elixderm page that replaces each. */
const LINK_TARGETS: Record<string, string> = {
  "https://cwialpha.com/private-label-natural-hair-products/": `${ELIXDERM}/products/private-label-natural-hair-products`,
  "https://cwialpha.com/private-label-organic-hair-products/": `${ELIXDERM}/products/private-label-organic-hair-products`,
  "https://cwialpha.com/private-label-hair-conditioner/": `${ELIXDERM}/products/private-label-hair-conditioner`,
  "https://cwialpha.com/service/formulation/": `${ELIXDERM}/services/formulation`,
  "https://cwialpha.com/service/packaging/": `${ELIXDERM}/services/packaging`,
  "https://cwialpha.com/service/compliance/": `${ELIXDERM}/services/compliance`,
  "https://cwialpha.com/contact/": `${ELIXDERM}/contact-us`,
};

const OLD_SITE = /^https?:\/\/(www\.)?cwialpha\.com\b/i;
const OLD_NAME = /CWI ?Alpha/gi;

/**
 * Returns the text with the old company name replaced by Elixderm or, for a
 * cwialpha.com link, the matching Elixderm page. Throws for a cwialpha.com
 * link with no mapped page, so the migration stops instead of guessing.
 */
export function rewriteOldCompanyReferences(text: string): string {
  if (OLD_SITE.test(text)) {
    const target = LINK_TARGETS[text];
    if (!target) throw new Error(`No Elixderm page is mapped for ${text}`);
    return target;
  }
  return text.replace(OLD_NAME, "Elixderm");
}
