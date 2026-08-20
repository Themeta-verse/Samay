import { describe, expect, it } from "vitest";
import { formatVisitorTime } from "./samayClock";

describe("formatVisitorTime", () => {
  it("formats a precise local-time display without an invented timezone", () => {
    const time = formatVisitorTime(new Date("2026-08-21T08:09:10Z"), "en-GB");
    expect(time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});
