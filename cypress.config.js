const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default 
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    "chromeWebSecurity":false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout:60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
                return config;
    },   
    "env":{
      "baseUrl":"https://www.saucedemo.com/"
    }, 
    
  },
  setupNodeEvents(on, config)  {

    on("file:preprocessor", cucumber());
    
    }
 
});



