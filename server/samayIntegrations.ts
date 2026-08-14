import { notifyOwner } from "./_core/notification";

export type ConciergeRequest = {
  kind: "private_viewing" | "bespoke_selection";
  name: string;
  email: string;
  city?: string;
  reference: string;
  message?: string;
  selection?: {
    case: string;
    dial: string;
    strap: string;
    occasion?: string;
  };
};

export type DeliveryState = "sent" | "owner_notified" | "not_configured" | "failed";

function toApprovedHttpsUrl(value: string | undefined) {
  if (!value?.trim()) return null;

  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function toGoogleBookingUrl(value: string | undefined) {
  const url = toApprovedHttpsUrl(value);
  if (!url) return null;

  const hostname = new URL(url).hostname;
  const isGoogleCalendarHost = hostname === "calendar.app.google" || hostname === "calendar.google.com";
  return isGoogleCalendarHost ? url : null;
}

export function getAppointmentConfiguration() {
  const bookingPageUrl = toGoogleBookingUrl(process.env.SAMAY_GOOGLE_BOOKING_PAGE_URL);

  return {
    provider: "Google Calendar" as const,
    isActive: Boolean(bookingPageUrl),
    bookingPageUrl,
  };
}

function formatOwnerReview(request: ConciergeRequest) {
  const selection = request.selection
    ? [
        `Case: ${request.selection.case}`,
        `Dial: ${request.selection.dial}`,
        `Strap: ${request.selection.strap}`,
        request.selection.occasion ? `Occasion: ${request.selection.occasion}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : null;

  return [
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    request.city ? `City: ${request.city}` : null,
    `Reference: ${request.reference}`,
    request.message ? `Note: ${request.message}` : null,
    selection,
    "\nThis is a request for review only. No appointment or order has been confirmed.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function notifyOwnerForReview(request: ConciergeRequest): Promise<DeliveryState> {
  try {
    const accepted = await notifyOwner({
      title: `SAMAY / ${request.kind === "private_viewing" ? "Private viewing" : "Private selection"} request`,
      content: formatOwnerReview(request),
    });

    return accepted ? "owner_notified" : "not_configured";
  } catch {
    return "not_configured";
  }
}

export async function deliverConciergeRequest(request: ConciergeRequest): Promise<{ delivery: DeliveryState }> {
  const endpoint = toApprovedHttpsUrl(process.env.SAMAY_CONCIERGE_WEBHOOK_URL);
  if (!endpoint) return { delivery: await notifyOwnerForReview(request) };

  const token = process.env.SAMAY_CONCIERGE_WEBHOOK_TOKEN?.trim();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        source: "SAMAY website",
        submittedAt: new Date().toISOString(),
        request,
      }),
      signal: controller.signal,
    });

    return { delivery: response.ok ? "sent" : "failed" };
  } catch {
    return { delivery: "failed" };
  } finally {
    clearTimeout(timeout);
  }
}
