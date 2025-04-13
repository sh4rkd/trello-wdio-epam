/**
 * @fileoverview Centralized project configuration
 * @module config/config
 */

require('dotenv').config();

module.exports = {
  /**
   * Trello API configuration
   */
  trello: {
    apiKey: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_API_TOKEN,
    baseUrl: 'https://api.trello.com/1',
    defaultTimeout: 5000,
  },

  /**
   * Test configuration
   */
  test: {
    retries: 2,
    timeout: 30000,
    reporters: ['spec', ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }]],
  },

  /**
   * Cucumber configuration
   */
  cucumber: {
    requireModule: ['@babel/register'],
    require: ['features/step_definitions/*.js', 'features/support/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
  },
}; 