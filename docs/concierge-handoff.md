# SAMAY Concierge Handoff Contract

## Current status

The public private-viewing and private-selection forms validate entries on the server. When no approved external concierge endpoint is configured, a validated request is forwarded through the built-in project-owner notification channel for review. This is **not** an appointment confirmation, order, or commitment to follow up. If that internal review channel is unavailable, the form makes no delivery claim and directs the visitor to contact the house.

No external concierge endpoint, CRM, email service, or webhook is configured for this project. The existing Typeform connector is disabled and must not be used until the project owner explicitly approves it.

## Verified activation ledger

| Capability | Verified source state | Current SAMAY behavior | Required before activation |
| --- | --- | --- | --- |
| Public online booking | The authorized Google Calendar account is connected, but exposes event CRUD only; no SAMAY-labelled availability events or public appointment schedule were found. | The appointment interface remains unavailable and directs visitors to the considered contact route. | An approved public Google Appointment Schedule URL, target venue/calendar, visit duration, operating hours, notice period, timezone, and cancellation policy. |
| Dedicated concierge delivery | No custom connector, CRM, webhook endpoint, or server-only webhook secret is configured. | Validated requests use the built-in owner-review notification fallback; they are not confirmations. | Approved HTTPS endpoint, server-only secret, field mapping, retention policy, and failure acknowledgement. |
| Image-backed configuration switching | Only matched detail studies exist for Meridian, Serein, and Vesper; none proves a distinct exterior configuration. | Every reference remains a single photographed configuration, enriched by gallery detail frames. | Original full-object imagery for each selectable case, dial, or strap state, mapped to the exact reference and configuration label. |

## Production integration boundary

When an approved external destination is provided, dispatch occurs through a server-side route rather than directly from the browser. The route holds destination credentials as a secret, validates the payload, and returns an explicit delivery result. It attempts the approved external destination first; when none is configured, it uses the built-in owner-notification fallback. The public acknowledgement may state that a request was forwarded for review only after one of these server-side paths accepts it.

| Field | Inquiry request | Private selection |
| --- | --- | --- |
| `requestType` | `private_viewing` | `private_selection` |
| `name` | required | required |
| `email` | required, email format | required, email format |
| `city` | required | optional |
| `reference` | selected watch | selected watch |
| `configuration` | photographed configuration, if present | case, dial, and strap preferences |
| `message` | optional | occasion and optional note |
| `source` | `samay_web` | `samay_web` |

## Acceptance criteria

The approved workflow must identify its owner, external destination (if any), data-retention policy, acknowledgement behavior, and failure path. To activate direct online booking, configure an approved public Google Appointment Schedule URL together with the operating rules listed above. To activate a dedicated concierge destination, add its HTTPS endpoint and server-only secret. Do not add automated follow-up promises, payment language, appointment confirmations, or order creation.
