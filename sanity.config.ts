import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
const config = defineConfig({
  projectId: "7v67lu84", // New Sanity project  
  dataset: "production",
  title: "Elixderm website",
  apiVersion: "2025-07-17",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
});

export default config;
