const { test, expect } = require('../../src/fixtures/api.fixture');
const { credentials } = require('../../src/config/api.config');
const { createBooking } = require('../../src/data/booking.data');
const { expectBookingToMatch } = require('../../src/utils/api-assertions');

test.describe('Booking retrieval', () => {
  test('GET /booking returns booking identifiers', async ({ api }) => {
    const response = await api.getBookingIds();
    const bookingIds = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(bookingIds)).toBe(true);
    expect(bookingIds.length).toBeGreaterThan(0);
    expect(bookingIds[0]).toEqual({ bookingid: expect.any(Number) });
  });

  test('GET /booking supports filtering by guest name', async ({ api }) => {
    const booking = createBooking();
    const createResponse = await api.createBooking(booking);
    expect(createResponse.status()).toBe(200);
    const { bookingid: bookingId } = await createResponse.json();

    try {
      const response = await api.getBookingIds({ firstname: booking.firstname });
      const bookingIds = await response.json();

      expect(response.status()).toBe(200);
      expect(bookingIds).toContainEqual({ bookingid: bookingId });
    } finally {
      const tokenResponse = await api.createToken(credentials);
      const { token } = await tokenResponse.json();
      await api.deleteBooking(bookingId, token);
    }
  });

  test('GET /booking/:id returns the complete booking', async ({ api }) => {
    const booking = createBooking();
    const createResponse = await api.createBooking(booking);
    expect(createResponse.status()).toBe(200);
    const { bookingid: bookingId } = await createResponse.json();

    try {
      const response = await api.getBooking(bookingId);

      expect(response.status()).toBe(200);
      expectBookingToMatch(await response.json(), booking);
    } finally {
      const tokenResponse = await api.createToken(credentials);
      const { token } = await tokenResponse.json();
      await api.deleteBooking(bookingId, token);
    }
  });
});