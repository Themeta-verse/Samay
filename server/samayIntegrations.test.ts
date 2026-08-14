import { afterEach, describe, expect, it } from "vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverConciergeRequest, getAppointmentConfiguration } from "./samayIntegrations";

const originalBookingUrl = process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL;
const originalConciergeUrl = process.env.SAMAY_CONCIERGE_WEBHOOK_URL;
const originalConciergeToken = process.env.SAMAY_CONCIERGE_WEBHOOK_TOKEN;
const originalFetch = globalThis.fetch;

afterEach(() => {
  if (originalBookingUrl === undefined) {
    delete process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL;
  } else {
    process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL = originalBookingUrl;
  }

  if (originalConciergeUrl === undefined) {
    delete process.env.SAMAY_CONCIERGE_WEBHOOK_URL;
  } else {
    process.env.SAMAY_CONCIERGE_WEBHOOK_URL = originalConciergeUrl;
  }

  if (originalConciergeToken === undefined) {
    delete process.env.SAMAY_CONCIERGE_WEBHOOK_TOKEN;
  } else {
    process.env.SAMAY_CONCIERGE_WEBHOOK_TOKEN = originalConciergeToken;
  }

  globalThis.fetch = originalFetch;
});

describe("Google Calendar appointment configuration", () => {
  it("stays inactive when no owner-provided booking page is configured", () => {
    delete process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL;

    expect(getAppointmentConfiguration()).toEqual({
      provider: "Google Calendar",
      isActive: false,
      bookingPageUrl: null,
    });
  });

  it("exposes only a valid Google Calendar booking-page URL", () => {
    process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL = "https://calendar.app.google/example";

    expect(getAppointmentConfiguration()).toEqual({
      provider: "Google Calendar",
      isActive: true,
      bookingPageUrl: "https://calendar.app.google/example",
    });
  });

  it("rejects a non-Google URL rather than directing visitors to an unapproved scheduler", () => {
    process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL = "https://example.com/booking";

    expect(getAppointmentConfiguration().isActive).toBe(false);
  });
});

describe("concierge delivery configuration", () => {
  it("does not dispatch or retain a request when no approved endpoint is configured", async () => {
    delete process.env.SAMAY_CONCIERGE_WEBHOOK_URL;
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy as typeof fetch;

    await expect(
      deliverConciergeRequest({
        kind: "private_viewing",
        name: "A. Collector",
        email: "collector@example.com",
        city: "Paris",
        reference: "Meridian",
      }),
    ).resolves.toEqual({ delivery: "not_configured" });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects non-HTTPS concierge endpoints without dispatching", async () => {
    process.env.SAMAY_CONCIERGE_WEBHOOK_URL = "http://example.com/concierge";
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy as typeof fetch;

    await expect(
      deliverConciergeRequest({
        kind: "bespoke_selection",
        name: "A. Collector",
        email: "collector@example.com",
        reference: "Vesper",
      }),
    ).resolves.toEqual({ delivery: "not_configured" });

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
