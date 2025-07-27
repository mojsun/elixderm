import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "7v67lu84", // New Sanity project  
  dataset: "production",
  title: "Elixderm website",
  apiVersion: "2025-07-17",
  basePath: "/admin",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Contact Submissions with custom list view
            S.listItem()
              .title('Contact Submissions')
              .child(
                S.documentTypeList('contact')
                  .title('Contact Submissions')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                  .child((documentId) => S.document().documentId(documentId))
              ),
            // Separator
            S.divider(),
            // Other content types
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
          ])
    })
  ],
  schema: { types: schemas },
});

export default config;
