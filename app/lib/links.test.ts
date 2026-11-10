import { describe, expect, it } from "vitest";
import { isExternal, sitePath } from "./links";

describe("sitePath", () => {
  it("turns full addresses on our site into paths", () => {
    expect(sitePath("https://www.elixderm.com/contact-us")).toBe("/contact-us");
    expect(sitePath("https://elixderm.com/services/compliance#nhp-mentor")).toBe("/services/compliance#nhp-mentor");
  });

  it("leaves paths and other sites unchanged", () => {
    expect(sitePath("/contact-us")).toBe("/contact-us");
    expect(sitePath("https://www.nhpmentor.com")).toBe("https://www.nhpmentor.com");
    expect(sitePath("mailto:hello@elixderm.com")).toBe("mailto:hello@elixderm.com");
  });
});

describe("isExternal", () => {
  it("is true only for links to other sites", () => {
    expect(isExternal("https://www.nhpmentor.com")).toBe(true);
    expect(isExternal("https://www.elixderm.com/contact-us")).toBe(false);
    expect(isExternal("/contact-us")).toBe(false);
    expect(isExternal("")).toBe(false);
  });
});
