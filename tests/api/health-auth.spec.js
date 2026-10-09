const { test, expect } = require('../../src/fixtures/api.fixture');
const { credentials } = require('../../src/config/api.config');

test.describe('Health and authentication', () => {
  test('GET /ping reports service health', async ({ api }) => {
    const response = await api.healthCheck();

    expect(response.status()).toBe(201);
    expect(await response.text()).toBe('Created');
  });

  test('POST /auth creates a token for valid credentials', async ({ api }) => {
    const response = await api.createToken(credentials);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ token: expect.any(String) });
  });
});