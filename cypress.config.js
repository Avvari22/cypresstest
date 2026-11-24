const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    ],
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    env: {
      baseUrl: "https://www.saucedemo.com/",
    },

    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      allureWriter(on, config);

      return config;
    },
  },
});
