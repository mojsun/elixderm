const config = {
  projectId: "7v67lu84", // New Sanity project
  dataset: "production",
  apiVersion: "2025-07-17",
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production, live API in development
};
export default config;
