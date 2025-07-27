import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import ContactTable from "./sanity/components/ContactTable";
import HomeContactTable from "./sanity/components/HomeContactTable";

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
            // Home Contact Submissions with custom table view
            S.listItem()
              .title('Home Contact Submissions Table')
              .child(S.component(HomeContactTable).title('Home Contact Submissions Table')),
            // Separator
            S.divider(),
            // Contact Submissions with custom table view
            S.listItem()
              .title('Contact Submissions Table')
              .child(S.component(ContactTable).title('Contact Submissions Table')),
            // Separator
            S.divider(),
            // Other content types
            S.documentTypeListItem('page'),
            S.documentTypeListItem('project'),
          ])
    })
  ],
  schema: { types: schemas },
});

export default config;
