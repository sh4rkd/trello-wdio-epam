/**
 * @fileoverview Global hooks for Cucumber tests
 * @module support/hooks
 * @description Implements global hooks for test setup and teardown
 */

const { Before, After, BeforeAll, Status } = require('@cucumber/cucumber');
const config = require('../../config/config');

/**
 * Verify required environment variables before running any tests
 * Following the Fail-Fast principle for configuration issues
 */
BeforeAll(function() {
  const requiredEnvVars = ['TRELLO_API_KEY', 'TRELLO_API_TOKEN'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
});

/**
 * Global setup before each scenario
 * Verifies API credentials and sets up test environment
 * @throws {Error} If API credentials are not configured
 */
Before(async function() {
  if (!process.env.TRELLO_API_KEY || !process.env.TRELLO_TOKEN) {
    throw new Error('Trello API credentials are not configured');
  }

  this.attach('Starting new scenario...', 'text/plain');
});

/**
 * Global teardown after each scenario
 * Handles cleanup and attaches additional information to failed scenarios
 * @param {Object} scenario - The completed scenario object
 */
After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    const error = scenario.result.exception;
    if (error) {
      await this.attach(error.message, 'text/plain');
      if (error.stack) {
        await this.attach(error.stack, 'text/plain');
      }
    }
  }
}); 