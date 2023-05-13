const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env: {
      apiUrl: 'Enter API url',
      baseUrl: 'Enter base url',
      amount: '0.01',
      email: 'uchittlur@gmail.com'
    },

    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportHeight: 950,
    viewportWidth: 1350,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,

  },
});
