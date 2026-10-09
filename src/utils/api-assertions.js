const { expect } = require('@playwright/test');

function expectBookingToMatch(actual, expected) {
  expect(actual).toMatchObject({
    firstname: expected.firstname,
    lastname: expected.lastname,
    totalprice: expected.totalprice,
    depositpaid: expected.depositpaid,
    bookingdates: expected.bookingdates,
    additionalneeds: expected.additionalneeds,
  });
}

module.exports = { expectBookingToMatch };