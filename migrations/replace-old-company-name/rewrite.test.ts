import { describe, expect, it } from "vitest";
import { rewriteOldCompanyReferences } from "./rewrite";

describe("rewriteOldCompanyReferences", () => {
  it("replaces each spelling of the old company name", () => {
    expect(rewriteOldCompanyReferences("Why Trust Cwialpha's Expertise?")).toBe(
      "Why Trust Elixderm's Expertise?"
    );
    expect(rewriteOldCompanyReferences("Quality Assurance isn’t just a buzzword at CWI Alpha.")).toBe(
      "Quality Assurance isn’t just a buzzword at Elixderm."
    );
  });

  it("keeps the 40 years wording", () => {
    expect(
      rewriteOldCompanyReferences(
        "With over 40 Years of Experience in the Cosmetic Industry, CWI Alpha excels in Regulatory Guidance"
      )
    ).toBe(
      "With over 40 Years of Experience in the Cosmetic Industry, Elixderm excels in Regulatory Guidance"
    );
  });

  it("points cwialpha.com links at the matching Elixderm page", () => {
    expect(rewriteOldCompanyReferences("https://cwialpha.com/service/compliance/")).toBe(
      "https://www.elixderm.com/services/compliance"
    );
    expect(rewriteOldCompanyReferences("https://cwialpha.com/contact/")).toBe(
      "https://www.elixderm.com/contact-us"
    );
  });

  it("refuses a cwialpha.com link with no mapped page", () => {
    expect(() => rewriteOldCompanyReferences("https://cwialpha.com/about/")).toThrow(
      "No Elixderm page is mapped for https://cwialpha.com/about/"
    );
  });

  it("leaves other text unchanged", () => {
    const text = "Formulated in Canada for indie brands.";
    expect(rewriteOldCompanyReferences(text)).toBe(text);
  });
});
