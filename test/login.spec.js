/**
 * Login test suite for Trello application
 * Tests the authentication functionality of the Trello platform
 * @module test/login
 */

const LoginPage = require('../src/business/pages/login/login.page');
require('dotenv').config();
const chai = require('chai');
const assert = chai.assert;

/**
 * Test user credentials from environment variables
 * @type {Object}
 * @property {string} email - User email for authentication
 * @property {string} password - User password for authentication
 */
const TEST_USER = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
};

/**
 * Test suite for Trello login functionality
 * Verifies authentication works correctly with valid credentials
 */
describe('Trello Login', () => {
  /**
   * Test case for successful login
   * Verifies that users can authenticate with valid credentials
   */
  it('should login successfully with valid credentials', async () => {
    console.log('▶️ TEST: Login with valid credentials');
    console.log('⏳ Opening Trello home page...');
    await LoginPage.open();
    console.log('✅ Home page loaded');

    console.log('⏳ Clicking login button...');
    await LoginPage.loginButton.clickWithWait({ timeout: 5000 });
    console.log('✅ Login form opened');

    console.log('⏳ Entering email address...');
    await LoginPage.emailInput.waitForDisplayed({ timeout: 5000 });
    await LoginPage.emailInput.setValue(TEST_USER.email);
    console.log('✅ Email entered');

    console.log('⏳ Clicking continue button...');
    await LoginPage.continueButton.clickWithWait({ timeout: 5000 });
    console.log('✅ Continued to password step');

    console.log('⏳ Entering password...');
    await LoginPage.passwordInput.waitForDisplayed({ timeout: 5000 });
    await LoginPage.passwordInput.setValue(TEST_USER.password);
    console.log('✅ Password entered');

    console.log('⏳ Submitting login credentials...');
    await LoginPage.loginSubmitButton.clickWithWait({ timeout: 5000 });
    console.log('✅ Login submitted');

    console.log('⏳ Waiting for dashboard to load...');
    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 10000 });
    console.log('✅ Dashboard loaded');

    const isDisplayed = await LoginPage.boardDashboard.isDisplayed();
    assert.isTrue(isDisplayed, 'Dashboard should be visible after login');
    console.log('✅ Dashboard visibility confirmed');

    const currentUrl = await browser.getUrl();
    assert.include(currentUrl, 'trello.com', 'URL should include trello.com');
    console.log(`ℹ️ Current URL: ${currentUrl}`);
    console.log('✅ URL validation passed');

    console.log('✅ Test completed successfully');
  });
});
