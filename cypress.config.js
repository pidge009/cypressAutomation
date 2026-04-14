const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  allowCypressEnv: false,
  env: {
    "MAILOSAUR_API_KEY": process.env.MAILOSAUR_API_KEY,
    "MAILOSAUR_SERVER_ID": process.env.MAILOSAUR_SERVER_ID,
    "PASSWORD": process.env.PASSWORD,
    "API_TOKEN":process.env.API_TOKEN
  },
  expose: {
    "BASE_URL": "https://rc.viewiq.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  }
});
