/**
 * @fileoverview Cucumber configuration
 */

const config = require('./config/config');

module.exports = {
  ...config.cucumber,
  // Additional Cucumber-specific options
  publishQuiet: true,
  retry: 1,
  parallel: 2,
  tags: process.env.TAGS || '',
  worldParameters: {
    baseUrl: config.trello.baseUrl,
    apiKey: config.trello.apiKey,
    token: config.trello.token,
  },
};
