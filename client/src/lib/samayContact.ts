export type ContactEmailDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const samayContact = {
  email: "himanshut2610@gmail.com",
  phone: "7977374705",
  emailHref: "mailto:himanshut2610@gmail.com",
  phoneHref: "tel:7977374705",
} as const;

export const samaySocialPlaceholders = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "X / Twitter" },
] as const;

export function buildContactEmailHref(draft: ContactEmailDraft) {
  const body = [
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    "",
    draft.message.trim(),
  ].join("\n");
  const params = new URLSearchParams({
    subject: draft.subject.trim(),
    body,
  });

  return `${samayContact.emailHref}?${params.toString()}`;
}
