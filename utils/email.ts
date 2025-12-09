type EmailValidationResult = {
  validEmails: string[];
  invalidEmails: string[];
  duplicateEmails: string[];
};

export function validateEmails(emails: string[]): EmailValidationResult {
  const validEmails: string[] = [];
  const invalidEmails: string[] = [];
  const duplicateEmails: string[] = [];

  const seen = new Set<string>();

  const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]{2,10}$/;

  for (const email of emails) {
    if (seen.has(email)) {
      duplicateEmails.push(email);
      continue;
    }

    seen.add(email);

    if (emailRegex.test(email)) {
      validEmails.push(email);
    } else {
      invalidEmails.push(email);
    }
  }
  return {
    validEmails,
    invalidEmails,
    duplicateEmails,
  };
}
