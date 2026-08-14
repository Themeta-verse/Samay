# Google Appointment Schedule Integration

## Verified public-booking route

Google Calendar Appointment Schedules provide public booking pages that reflect the owner calendar’s real-time availability. A schedule owner can share either a booking-page link, a popup button, or an inline booking-page embed from Google Calendar’s **Booking pages** controls. The booking-page owner controls appointment duration, availability, booking limits, buffers, calendar conflict detection, and confirmation behavior.

SAMAY will use the owner-provided booking-page URL or approved embed code as the only public availability source. The web experience must not infer openings, create appointments directly, or claim a confirmed visit until Google Calendar confirms the booking.

## Inputs required before activation

| Input | Required owner-provided value |
| --- | --- |
| Booking source | Google Appointment Schedule URL or the inline embed code produced by Google Calendar |
| Schedule rules | Target calendar, timezone, visit duration, operating hours, minimum notice, buffer, and cancellation policy |
| Public copy | The exact venue/location and confirmation language permitted for SAMAY visitors |

## References

- [Google Calendar Help — Share your appointment schedule](https://support.google.com/calendar/answer/10733297?hl=en&co=GENIE.Platform%3DDesktop)
- [Google Workspace — Appointment booking in Google Calendar](https://workspace.google.com/resources/appointment-scheduling/)
