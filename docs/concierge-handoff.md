# SAMAY Concierge Handoff Contract

## Current status

The public private-viewing and private-selection forms validate entries locally, but **do not send, store, or share** them. No approved concierge endpoint, CRM, email service, or webhook is configured for this project. The existing Typeform connector is disabled and must not be used until the project owner explicitly approves it.

## Production integration boundary

When an approved destination is provided, dispatch must occur through a server-side route rather than directly from the browser. The route should hold destination credentials as a secret, validate the payload, rate-limit submissions, and return an explicit delivery result. The public success state may only claim delivery after that route confirms an accepted request.

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

The approved workflow must identify its owner, destination, data-retention policy, acknowledgement behavior, and failure path. Once approved, enable or add the appropriate connector, move the static project to a server-capable setup if needed, map the fields above, and replace the local-only confirmation with an honest delivery acknowledgement. Do not add automated follow-up promises, payment language, or order creation.
