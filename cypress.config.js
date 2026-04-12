const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  allowCypressEnv: false,
  env: {
    "MAILOSAUR_API_KEY": "16essZUreUhw8cxdWdfBpvnQ4Xjw0QQx",
    "MAILOSAUR_SERVER_ID": "xnc4e9w9",
    "PASSWORD": process.env.PASSWORD
  },
  expose: {
    "BASE_URL": "https://rc.viewiq.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
