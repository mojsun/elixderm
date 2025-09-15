import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { ImageIcon, LinkIcon, PackageIcon, CogIcon, EnvelopeIcon, DocumentTextIcon, UserIcon, UsersIcon } from "@sanity/icons";
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
              .title('Media Library')
              .icon(ImageIcon)
              .child(S.component(MediaLibrary).title('Media Library')),
            // Separator
            S.divider(),
            // Published URLs
            S.listItem()
              .title('Published URLs')
              .icon(LinkIcon)
              .child(S.component(SiteURLs).title('Published URLs')),
            // Separator
            S.divider(),
            // Short Contact Form with custom table view
            S.listItem()
              .title('Short Contact Form')
              .icon(EnvelopeIcon)
              .child(S.component(HomeContactTable).title('Short Contact Form')),
            // Separator
            S.divider(),
            // Main Contact Form with custom table view
            S.listItem()
              .title('Main Contact Form')
              .icon(EnvelopeIcon)
              .child(S.component(ContactTable).title('Main Contact Form')),
            // Separator
            S.divider(),
            // Content types
            S.documentTypeListItem('author').title('Authors').icon(UserIcon),
            S.documentTypeListItem('blogPost').title('Blog Posts').icon(DocumentTextIcon),
            S.documentTypeListItem('product').icon(PackageIcon),
            S.documentTypeListItem('service').icon(CogIcon),
            S.documentTypeListItem('whoWeHelp').title('Who We Help').icon(UsersIcon),
            // Hidden: pages and projects (kept in system but not in menu)
            // S.documentTypeListItem('page'),
            // S.documentTypeListItem('project'),
          ])
    })
  ],
  schema: { types: schemas },
});

export default config;
