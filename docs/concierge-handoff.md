# SAMAY Concierge Handoff Contract

## Current status

The public private-viewing and private-selection forms validate entries on the server. When no approved external concierge endpoint is configured, a validated request is forwarded through the built-in project-owner notification channel for review. This is **not** an appointment confirmation, order, or commitment to follow up. If that internal review channel is unavailable, the form makes no delivery claim and directs the visitor to contact the house.

No external concierge endpoint, CRM, email service, or webhook is configured for this project. The existing Typeform connector is disabled and must not be used until the project owner explicitly approves it.

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

The approved workflow must identify its owner, external destination (if any), data-retention policy, acknowledgement behavior, and failure path. To activate direct online booking, configure an approved public Google Appointment Schedule URL. To activate a dedicated concierge destination, add its HTTPS endpoint and server-only secret. Do not add automated follow-up promises, payment language, appointment confirmations, or order creation.
