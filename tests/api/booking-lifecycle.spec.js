const { test, expect } = require('../../src/fixtures/api.fixture');
const { credentials } = require('../../src/config/api.config');
const { createBooking } = require('../../src/data/booking.data');
const { expectBookingToMatch } = require('../../src/utils/api-assertions');

test('booking can be created, replaced, partially updated, and deleted', async ({ api }) => {
  const originalBooking = createBooking();
  const createResponse = await api.createBooking(originalBooking);

  expect(createResponse.status()).toBe(200);
  const { bookingid: bookingId, booking: createdBooking } = await createResponse.json();
  expect(bookingId).toEqual(expect.any(Number));
  expectBookingToMatch(createdBooking, originalBooking);

  try {
    const tokenResponse = await api.createToken(credentials);
    expect(tokenResponse.status()).toBe(200);
    const { token } = await tokenResponse.json();
    expect(token).toEqual(expect.any(String));

    const replacementBooking = createBooking({
      firstname: 'UpdatedGuest',
      lastname: 'FullReplacement',
      totalprice: 410,
    });
    const updateResponse = await api.updateBooking(bookingId, replacementBooking, token);

    expect(updateResponse.status()).toBe(200);
    expectBookingToMatch(await updateResponse.json(), replacementBooking);

    const partialResponse = await api.partialUpdateBooking(
      bookingId,
      { firstname: 'PartiallyUpdatedGuest' },
      token,
    );
    expect(partialResponse.status()).toBe(200);
    expect(await partialResponse.json()).toMatchObject({
      firstname: 'PartiallyUpdatedGuest',
      lastname: replacementBooking.lastname,
      totalprice: replacementBooking.totalprice,
    });

    const deleteResponse = await api.deleteBooking(bookingId, token);
    expect(deleteResponse.status()).toBe(201);
  } finally {
    const tokenResponse = await api.createToken(credentials);
    const { token } = await tokenResponse.json();
    await api.deleteBooking(bookingId, token);
  }
});

test('PUT /booking/:id rejects a request without authentication', async ({ api }) => {
  const createResponse = await api.createBooking(createBooking());
  expect(createResponse.status()).toBe(200);
  const { bookingid: bookingId } = await createResponse.json();

  try {
    const response = await api.updateBooking(bookingId, createBooking(), undefined);
    expect(response.status()).toBe(403);
  } finally {
    const tokenResponse = await api.createToken(credentials);
    const { token } = await tokenResponse.json();
    await api.deleteBooking(bookingId, token);
  }
});