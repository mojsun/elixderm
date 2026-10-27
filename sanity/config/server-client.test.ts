import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

async function loadClientConfig() {
  vi.resetModules();
  const { serverClient } = await import("./server-client");
  return serverClient.config();
}

describe("serverClient", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads published documents only", async () => {
    expect((await loadClientConfig()).perspective).toBe("published");
  });

  it("uses the read-only token when it is set", async () => {
    vi.stubEnv("SANITY_API_READ_TOKEN", "read-token");
    vi.stubEnv("SANITY_WRITE_TOKEN", "write-token");
    expect((await loadClientConfig()).token).toBe("read-token");
  });

  it("falls back to the write token", async () => {
    vi.stubEnv("SANITY_API_READ_TOKEN", "");
    vi.stubEnv("SANITY_WRITE_TOKEN", "write-token");
    expect((await loadClientConfig()).token).toBe("write-token");
  });
});
