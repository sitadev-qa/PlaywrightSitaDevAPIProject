const { test: base, expect } = require('@playwright/test');
const { RestfulBookerApi } = require('../api/restful-booker.api');

const test = base.extend({
  api: async ({ request }, use) => {
    await use(new RestfulBookerApi(request));
  },
});

module.exports = { test, expect };