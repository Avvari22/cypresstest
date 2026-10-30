const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default 
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    "chromeWebSecurity":false,
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    ],
    defaultCommandTimeout: 10000,
    pageLoadTimeout:60000,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      allureWriter(on, config);
      return config;
    },   
    "env":{
      "baseUrl":"https://www.saucedemo.com/"
    }, 
  }
});

