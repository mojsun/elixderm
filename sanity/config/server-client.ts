import "server-only";
import { createClient } from "next-sanity";
import clientConfig from "./client-config";

/**
 * Client for reading site content on the server. Reads are authenticated so
 * the dataset can stay private: with a read-only token when one is set,
 * otherwise with the write token the API routes already use.
 */
export const serverClient = createClient({
  ...clientConfig,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_WRITE_TOKEN,
});
