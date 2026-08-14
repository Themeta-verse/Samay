import { describe, expect, it } from "vitest";
import { samayContact } from "./samayContact";

describe("SAMAY public contact details", () => {
  it("keeps the approved Gmail address and phone number in their public contact links", () => {
    expect(samayContact.email).toBe("himanshut2610@gmail.com");
    expect(samayContact.phone).toBe("7977374705");
    expect(samayContact.emailHref).toBe(`mailto:${samayContact.email}`);
    expect(samayContact.phoneHref).toBe(`tel:${samayContact.phone}`);
  });
});
