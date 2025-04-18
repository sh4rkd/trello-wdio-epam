/**
 * @fileoverview Global hooks for Cucumber tests
 * @module support/hooks
 * @description Implements global hooks for test setup and teardown
 */

const { Before, After, BeforeAll, Status } = require('@cucumber/cucumber');

/**
 * Verify required environment variables before running any tests
 * Following the Fail-Fast principle for configuration issues
 */
BeforeAll(function () {
  console.log('Starting test suite - Verifying required environment variables');
  const requiredEnvVars = ['TRELLO_API_KEY', 'TRELLO_API_TOKEN'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  console.log('All required environment variables are present - Ready to run tests');
});

/**
 * Global setup before each scenario
 * Verifies API credentials and sets up test environment
 * @throws {Error} If API credentials are not configured
 */
Before(async function () {
  console.log('Setting up new test scenario');

  if (!process.env.TRELLO_API_KEY || !process.env.TRELLO_TOKEN) {
    console.error('Trello API credentials are not configured');
    throw new Error('Trello API credentials are not configured');
  }

  console.log('Test scenario setup complete - Trello API credentials verified');
  this.attach('Starting new scenario...', 'text/plain');
});

/**
 * Global teardown after each scenario
 * Handles cleanup and attaches additional information to failed scenarios
 * @param {Object} scenario - The completed scenario object
 */
After(async function (scenario) {
  console.log(`Finishing test scenario: ${scenario.pickle.name}`);
  console.log(`Scenario status: ${scenario.result.status}`);

  if (scenario.result.status === Status.FAILED) {
    console.error('Scenario failed - Attaching error details to report');
    const error = scenario.result.exception;
    if (error) {
      await this.attach(error.message, 'text/plain');
      console.error(`Error message: ${error.message}`);
      if (error.stack) {
        await this.attach(error.stack, 'text/plain');
        console.error(`Error stack: ${error.stack}`);
      }
    }
  } else {
    console.log('Scenario passed successfully');
  }
});
