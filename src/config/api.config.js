const DEFAULT_BASE_URL = 'https://restful-booker.herokuapp.com';

module.exports = {
  baseURL: process.env.API_BASE_URL || DEFAULT_BASE_URL,
  credentials: {
    username: process.env.API_USERNAME || 'admin',
    password: process.env.API_PASSWORD || 'password123',
  },
};