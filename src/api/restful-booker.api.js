class RestfulBookerApi {
  constructor(request) {
    this.request = request;
  }

  healthCheck() {
    return this.request.get('/ping');
  }

  createToken(credentials) {
    return this.request.post('/auth', { data: credentials });
  }

  getBookingIds(params = {}) {
    return this.request.get('/booking', { params });
  }

  getBooking(bookingId) {
    return this.request.get(`/booking/${bookingId}`);
  }

  createBooking(booking) {
    return this.request.post('/booking', { data: booking });
  }

  updateBooking(bookingId, booking, token) {
    return this.request.put(`/booking/${bookingId}`, {
      data: booking,
      headers: this.authHeaders(token),
    });
  }

  partialUpdateBooking(bookingId, booking, token) {
    return this.request.patch(`/booking/${bookingId}`, {
      data: booking,
      headers: this.authHeaders(token),
    });
  }

  deleteBooking(bookingId, token) {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: token ? this.authHeaders(token) : undefined,
    });
  }

  authHeaders(token) {
    return token ? { Cookie: `token=${token}` } : {};
  }
}

module.exports = { RestfulBookerApi };