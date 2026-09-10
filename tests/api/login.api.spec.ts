import { test, expect } from '@playwright/test';

test('API-001 - Login válido', async ({ request }) => {
  const response = await request.post('/rest/user/login', {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.authentication).toBeDefined();
  expect(body.authentication.umail).toBe(process.env.TEST_USER_EMAIL);
  expect(body.authentication.token).toBeTruthy();
});

test('API-002 - Login inválido', async ({ request }) => {
  const response = await request.post('/rest/user/login', {
    data: {
      email: 'g@gmail.com',
      password: 'password_incorrecta',
    },
  });

  expect(response.status()).toBe(401);
});

test('API-003 - Obtener productos', async ({ request }) => {
  const response = await request.get('/rest/products/search?q=');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBeTruthy();
});

test('API-004 - Obtener reviews de un producto', async ({ request }) => {
  const response = await request.get('/rest/products/24/reviews');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBeTruthy();
});

test('API-005 - Consultar usuario actual', async ({ request }) => {
  const response = await request.get('/rest/user/whoami');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.user).toBeDefined();
});