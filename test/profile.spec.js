/**
 * Profile management test suite for Trello application
 * Tests functionality related to user profile settings and modifications
 * @module test/profile
 */

const LoginPage = require('../src/business/pages/login/login.page');
const ProfilePage = require('../src/business/pages/profile/profile.page');
require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;

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
 * Test suite for Trello profile management functionality
 * Tests include navigating to profile settings, updating username,
 * handling existing username errors, and updating user bio
 */
describe('Trello Profile Management', () => {
  /** @type {string} Current username of the logged in user */
  let currentUsername;

  /**
   * Setup executed once before all tests in the suite
   * Logs in to Trello and captures the current username
   */
  before(async () => {
    console.log('▶️ Starting Profile Management test suite');
    console.log('⏳ Logging in to Trello account...');
    await LoginPage.open();
    await LoginPage.login(TEST_USER.email, TEST_USER.password);
    console.log('✅ Successfully logged in');

    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 20000 });
    console.log('✅ Dashboard loaded successfully');

    currentUsername = await ProfilePage.getCurrentUsername();
    console.log(`ℹ️ Current username: ${currentUsername}`);
  });

  /**
   * Test case for navigating to profile settings
   * Verifies navigation to profile settings page works correctly
   */
  it('should navigate to profile settings', async () => {
    console.log('▶️ TEST: Navigation to profile settings');
    console.log('⏳ Navigating to Trello homepage...');
    await browser.url('https://trello.com/');
    await browser.pause(2000);

    console.log('⏳ Navigating to profile settings...');
    await ProfilePage.navigateToProfileSettings();
    console.log('✅ Navigation completed');

    const url = await browser.getUrl();
    console.log(`ℹ️ Current URL: ${url}`);
    expect(url).to.include(`/u/${currentUsername}`);
    console.log('✅ URL validation passed');

    await browser.pause(3000);

    console.log('⏳ Returning to Trello homepage...');
    await browser.url('https://trello.com/');
    await browser.pause(2000);
    console.log('✅ Test completed successfully');
  });

  /**
   * Test case for updating username
   * Changes the current username to a new one with timestamp
   * Verifies the change was successful
   */
  it('should update username successfully', async () => {
    console.log('▶️ TEST: Username update');
    const originalUsername = currentUsername;
    console.log(`ℹ️ Original username: ${originalUsername}`);

    console.log('⏳ Navigating to profile settings...');
    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);
    console.log('✅ Navigation completed');

    const timestamp = Date.now();
    const newUsername = `testuser${timestamp}`;
    console.log(`ℹ️ New username to set: ${newUsername}`);

    try {
      console.log('⏳ Waiting for username input field...');
      await ProfilePage.usernameInput.waitForDisplayed({ timeout: 15000 });
      console.log('✅ Username input field found');

      console.log('⏳ Updating username...');
      await ProfilePage.updateUsername(newUsername);
      console.log('✅ Username update action completed');

      console.log('⏳ Waiting for changes to take effect...');
      await browser.pause(5000);

      console.log('⏳ Returning to homepage to verify changes...');
      await browser.url('https://trello.com/');
      await browser.pause(3000);

      console.log('⏳ Retrieving updated username...');
      const updatedUsername = await ProfilePage.getCurrentUsername();
      console.log(`ℹ️ Updated username: ${updatedUsername}`);

      expect(updatedUsername).to.equal(newUsername);
      expect(updatedUsername).to.not.equal(originalUsername);
      console.log('✅ Username validation passed');

      currentUsername = updatedUsername;
    } catch (error) {
      console.error('❌ Error updating username:', error.message);
      await browser.saveScreenshot('./error-username-update.png');
      console.log('📸 Error screenshot saved');
      throw error;
    }

    console.log('⏳ Returning to Trello homepage...');
    await browser.url('https://trello.com/');
    await browser.pause(2000);
    console.log('✅ Test completed successfully');
  });

  /**
   * Test case for handling existing username errors
   * Attempts to use an existing username and verifies error handling
   */
  it('should show error for existing username', async () => {
    console.log('▶️ TEST: Existing username error');
    console.log('⏳ Navigating to profile settings...');
    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);
    console.log('✅ Navigation completed');

    const existingUsername = 'epam';
    console.log(`ℹ️ Attempting to use existing username: ${existingUsername}`);

    try {
      console.log('⏳ Waiting for username input field...');
      await ProfilePage.usernameInput.waitForDisplayed({ timeout: 15000 });
      console.log('✅ Username input field found');

      const originalUsername = currentUsername;
      console.log(`ℹ️ Current username before test: ${originalUsername}`);

      console.log('⏳ Attempting to set username to existing value...');
      await ProfilePage.updateUsername(existingUsername);
      console.log('✅ Username update action completed');

      console.log('⏳ Waiting for error message...');
      await ProfilePage.usernameError.waitForDisplayed({ timeout: 15000 });
      const errorMessage = await ProfilePage.getErrorMessage();
      console.log(`ℹ️ Error message received: "${errorMessage}"`);

      const expectedMessages = ['Username is taken', 'Este nombre de usuario ya existe'];
      expect(errorMessage).to.satisfy((msg) => {
        return expectedMessages.some((expected) => msg.includes(expected));
      });
      console.log('✅ Error message validation passed');

      console.log('⏳ Returning to homepage to verify no changes...');
      await browser.url('https://trello.com/');
      await browser.pause(3000);

      console.log('⏳ Retrieving current username to verify no change...');
      const updatedUsername = await ProfilePage.getCurrentUsername();
      console.log(`ℹ️ Username after test: ${updatedUsername}`);

      expect(updatedUsername).to.equal(originalUsername);
      expect(updatedUsername).to.not.equal(existingUsername);
      console.log('✅ Username unchanged validation passed');
    } catch (error) {
      console.error('❌ Error in existing username test:', error.message);
      await browser.saveScreenshot('./error-existing-username.png');
      console.log('📸 Error screenshot saved');
      throw error;
    }

    console.log('⏳ Returning to Trello homepage...');
    await browser.url('https://trello.com/');
    await browser.pause(2000);
    console.log('✅ Test completed successfully');
  });

  /**
   * Test case for updating user bio
   * Updates user biography and verifies the change was successful
   */
  it('should update user bio', async () => {
    console.log('▶️ TEST: Bio update');
    console.log('⏳ Navigating to profile settings...');
    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);
    console.log('✅ Navigation completed');

    let currentBio = '';
    try {
      console.log('⏳ Retrieving current bio...');
      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });
      currentBio = await (await ProfilePage.bioInput.get()).getValue();
      console.log(`ℹ️ Current bio: "${currentBio}"`);
    } catch (error) {
      console.log('⚠️ Could not retrieve current bio, will proceed with test');
    }

    const bioText = `Test bio for automation testing - ${Date.now()}`;
    console.log(`ℹ️ New bio to set: "${bioText.substring(0, 20)}..."`);

    try {
      console.log('⏳ Waiting for bio input field...');
      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });
      console.log('✅ Bio input field found');

      console.log('⏳ Updating bio...');
      await ProfilePage.updateBio(bioText);
      console.log('✅ Bio update action completed');

      console.log('⏳ Waiting for changes to take effect...');
      await browser.pause(5000);

      console.log('⏳ Returning to homepage to verify changes...');
      await browser.url('https://trello.com/');
      await browser.pause(3000);

      console.log('⏳ Navigating back to profile settings...');
      await ProfilePage.navigateToProfileSettings();
      await browser.pause(3000);
      console.log('✅ Navigation completed');

      console.log('⏳ Retrieving updated bio...');
      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });
      const updatedBio = await (await ProfilePage.bioInput.get()).getValue();
      console.log(`ℹ️ Updated bio: "${updatedBio.substring(0, 20)}..."`);

      expect(updatedBio).to.equal(bioText);
      expect(updatedBio).to.not.equal(currentBio);
      console.log('✅ Bio validation passed');
    } catch (error) {
      console.error('❌ Error updating bio:', error.message);
      await browser.saveScreenshot('./error-bio-update.png');
      console.log('📸 Error screenshot saved');
      throw error;
    }
    console.log('✅ Test completed successfully');
  });

  /**
   * Teardown executed once after all tests in the suite
   */
  after(async () => {
    console.log('✅ All profile management tests completed');
  });
});
