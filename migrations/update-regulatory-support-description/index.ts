import { at, defineMigration, set } from "sanity/migrate";

const MENU_DESCRIPTION =
  "Navigate complex regulations with our experienced team, providing accurate, reliable compliance support to help ensure your products meet regulatory requirements.";

/**
 * Sets the description shown under Regulatory Support in the Services menu.
 * The rest of the service's content is unchanged.
 *
 * Dry run: npx sanity migration run update-regulatory-support-description
 * Apply:   npx sanity migration run update-regulatory-support-description --no-dry-run
 */
export default defineMigration({
  title: "Update the Regulatory Support menu description",
  documentTypes: ["service"],
  filter: `slug.current == "compliance"`,
  migrate: {
    document(doc) {
      if (doc.menuDescription !== MENU_DESCRIPTION) return at("menuDescription", set(MENU_DESCRIPTION));
    },
  },
});
