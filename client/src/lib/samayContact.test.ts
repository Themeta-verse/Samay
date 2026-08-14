import { describe, expect, it } from "vitest";
import { buildContactEmailHref, samayContact, samaySocialPlaceholders } from "./samayContact";

describe("SAMAY public contact details", () => {
  it("keeps the approved Gmail address and phone number in their public contact links", () => {
    expect(samayContact.email).toBe("himanshut2610@gmail.com");
    expect(samayContact.phone).toBe("7977374705");
    expect(samayContact.emailHref).toBe(`mailto:${samayContact.email}`);
    expect(samayContact.phoneHref).toBe(`tel:${samayContact.phone}`);
  });

  it("prepares a clear email draft addressed to the approved inbox", () => {
    const href = buildContactEmailHref({
      name: "A. Collector",
      email: "collector@example.com",
      subject: "A question about Meridian",
      message: "May I ask about availability?",
    });
    const [, query = ""] = href.split("?");
    const params = new URLSearchParams(query);

    expect(href.startsWith(samayContact.emailHref)).toBe(true);
    expect(params.get("subject")).toBe("A question about Meridian");
    expect(params.get("body")).toContain("Email: collector@example.com");
    expect(params.get("body")).toContain("May I ask about availability?");
  });

  it("keeps LinkedIn and X / Twitter as labelled placeholders until profile URLs are supplied", () => {
    expect(samaySocialPlaceholders.map(({ id }) => id)).toEqual(["linkedin", "twitter"]);
  });
});
