import { test, expect } from '@playwright/test';
import { validateEmails } from '../utils/email';

test('Validate email addresses', async ({}) => {
  const emails = [
    "john@test.com",
    "invalid-email",
    "mary@example.org",
    "john@test.com",
    "JOHN@test.com",
    "hello@world",
    "qa_user@company.io"
  ];

  const result = validateEmails(emails);

  console.log(result);


  expect(result.validEmails).toEqual(["john@test.com", "mary@example.org", "qa_user@company.io"]);
  expect(result.invalidEmails).toEqual(["invalid-email", "JOHN@test.com", "hello@world"]);
  expect(result.duplicateEmails).toEqual(["john@test.com"]);
});
