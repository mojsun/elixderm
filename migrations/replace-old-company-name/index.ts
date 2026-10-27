import { defineMigration, set } from "sanity/migrate";
import { rewriteOldCompanyReferences } from "./rewrite";

/**
 * Replaces the old company name in service pages and blog posts and points
 * cwialpha.com links at the matching Elixderm pages. Other wording, including
 * "40 Years of Experience", is unchanged.
 *
 * Dry run: npx sanity migration run replace-old-company-name
 * Apply:   npx sanity migration run replace-old-company-name --no-dry-run
 */
export default defineMigration({
  title: "Replace CWI Alpha and cwialpha.com links with Elixderm",
  documentTypes: ["service", "blogPost"],
  migrate: {
    string(node) {
      const rewritten = rewriteOldCompanyReferences(node);
      if (rewritten !== node) return set(rewritten);
    },
  },
});
