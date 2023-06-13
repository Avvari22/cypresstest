const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "chromeWebSecurity":false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout:60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env":{
      "baseUrl":"https://www.saucedemo.com/"
    }
  },
});
