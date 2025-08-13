import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import ContactTable from "./sanity/components/ContactTable";
import HomeContactTable from "./sanity/components/HomeContactTable";
import MediaLibrary from "./sanity/components/MediaLibrary";
import SiteURLs from "./sanity/components/SiteURLs";

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
            // Media Library (Custom)
            S.listItem()
              .title('📁 Media Library')
              .child(S.component(MediaLibrary).title('Media Library')),
            // Separator
            S.divider(),
            // Published URLs
            S.listItem()
              .title('🔗 Published URLs')
              .child(S.component(SiteURLs).title('Published URLs')),
            // Separator
            S.divider(),
            // Short Contact Form with custom table view
            S.listItem()
              .title('Short Contact Form')
              .child(S.component(HomeContactTable).title('Short Contact Form')),
            // Separator
            S.divider(),
            // Main Contact Form with custom table view
            S.listItem()
              .title('Main Contact Form')
              .child(S.component(ContactTable).title('Main Contact Form')),
            // Separator
            S.divider(),
            // Other content types
            S.documentTypeListItem('page'),
            S.documentTypeListItem('project'),
            S.documentTypeListItem('product'),
            S.documentTypeListItem('service'),
          ])
    })
  ],
  schema: { types: schemas },
});

export default config;
