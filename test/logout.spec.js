/**
 * Logout test suite for Trello application
 * Tests the session termination functionality of the Trello platform
 * @module test/logout
 */

const LoginPage = require('../src/business/pages/login/login.page');
const LogoutPage = require('../src/business/pages/login/logout.page');
require('dotenv').config();
const chai = require('chai');
chai.should();

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
 * Test suite for Trello session management functionality
 * Verifies that users can log out and session is properly terminated
 */
describe('Trello Session Management', () => {
  /** @type {string} URL of user's boards page to test protected access */
  let userBoardsUrl;

  /**
   * Setup before each test
   * Logs in to Trello and captures the user's boards URL for later verification
   */
  beforeEach(async () => {
    console.log('▶️ Starting Session Management test');
    console.log('⏳ Logging in to Trello account...');
    await LoginPage.open();
    await LoginPage.login(TEST_USER.email, TEST_USER.password);
    console.log('✅ Successfully logged in');

    console.log('⏳ Waiting for dashboard to load...');
    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 10000 });
    console.log('✅ Dashboard loaded');

    console.log('⏳ Getting boards link to use for verification later...');
    const boardsLink = await $('a[href*="/boards"]');
    await boardsLink.waitForExist({ timeout: 5000 });
    const boardsHref = await boardsLink.getAttribute('href');

    if (boardsHref.startsWith('http')) {
      userBoardsUrl = boardsHref;
    } else {
      userBoardsUrl = 'https://trello.com' + boardsHref;
    }
    console.log(`ℹ️ User boards URL: ${userBoardsUrl}`);
  });

  /**
   * Test case for secure logout and session termination
   * Verifies that after logout, protected resources cannot be accessed
   */
  it('should securely terminate session', async () => {
    console.log('▶️ TEST: Logout and session termination');

    console.log('⏳ Performing logout...');
    await LogoutPage.logout();
    console.log('✅ Logout completed');

    console.log('⏳ Verifying redirect to home page...');
    const url = await browser.getUrl();
    url.should.include('trello.com/home');
    console.log(`ℹ️ Current URL after logout: ${url}`);
    console.log('✅ Redirection confirmed');

    console.log('⏳ Attempting to access protected boards URL...');
    await browser.url(userBoardsUrl);
    console.log(`ℹ️ Accessing: ${userBoardsUrl}`);

    console.log('⏳ Waiting for error page to appear...');
    const errorHeader = await $('h1');
    await errorHeader.waitForExist({ timeout: 10000 });
    console.log('✅ Error page loaded');

    console.log('⏳ Checking error message...');
    const errorText = await errorHeader.getText();
    const expectedMessages = ['Page not found.', 'Página no encontrada.'];
    console.log(`ℹ️ Error message: "${errorText}"`);

    errorText.should.be.oneOf(expectedMessages);
    console.log('✅ Error message validation passed');

    console.log('⏳ Verifying error message is displayed...');
    const isErrorDisplayed = await errorHeader.isDisplayed();
    isErrorDisplayed.should.be.true;
    console.log('✅ Error message visibility confirmed');

    console.log('✅ Test completed successfully');
  });

  /**
   * After each test completion
   */
  afterEach(async () => {
    console.log('✅ Session management test completed');
  });
});
