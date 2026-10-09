function createBooking(overrides = {}) {
  const uniqueSuffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    firstname: `Test${uniqueSuffix}`,
    lastname: 'Guest',
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
      checkin: '2030-01-10',
      checkout: '2030-01-15',
    },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}

module.exports = { createBooking };