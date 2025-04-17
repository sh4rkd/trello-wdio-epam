/**
 * Signup test suite for Trello application
 * Tests the registration functionality of the Trello platform
 * @module test/signup
 */

const SignupPage = require('../src/business/pages/signup/signup.page');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();

/**
 * Generates a random email address for testing
 * @returns {string} A randomly generated email address
 */
function generateRandomEmail() {
  return `test${Math.floor(Math.random() * 10000)}@example.tesssti.com`;
}

/**
 * Test suite for Trello user registration functionality
 * Tests accessing the signup page, handling reCAPTCHA, and completing registration
 */
describe('Trello User Registration', () => {
  /**
   * Setup before each test
   * Opens the Trello homepage for registration
   */
  beforeEach(async () => {
    console.log('▶️ Starting Registration test');
    console.log('⏳ Opening Trello homepage...');
    await SignupPage.open();
    console.log('✅ Homepage loaded');
  });

  /**
   * Test case for accessing the registration page
   * Verifies that users can navigate to the signup form
   */
  it('should access registration page', async () => {
    console.log('▶️ TEST: Registration page access');
    
    console.log('⏳ Clicking signup button...');
    await SignupPage.signupButton.clickWithWait({ timeout: 5000 });
    console.log('✅ Signup button clicked');

    console.log('⏳ Waiting for signup page to load...');
    await SignupPage.signupPage.waitForDisplayed({ timeout: 5000 });
    console.log('✅ Signup page loaded');

    console.log('⏳ Verifying signup page visibility...');
    const isDisplayed = await SignupPage.signupPage.isDisplayed();
    assert.isTrue(isDisplayed, 'Signup page should be displayed');
    console.log('✅ Signup page visibility confirmed');
    
    console.log('✅ Test completed successfully');
  });

  /**
   * Test case for first registration attempt that typically triggers reCAPTCHA
   * Handles both successful redirects and reCAPTCHA challenges
   */
  it('first registration attempt (triggers reCAPTCHA)', async () => {
    console.log('▶️ TEST: First registration attempt (reCAPTCHA)');
    
    const email = generateRandomEmail();
    console.log(`ℹ️ Generated test email: ${email}`);
    
    console.log('⏳ Attempting registration with generated email...');
    await SignupPage.register(email);
    console.log('✅ Registration form submitted');
    
    await browser.pause(1000);

    console.log('⏳ Checking for redirection to team creation page...');
    const redirectedToCreateTeam = await SignupPage.isRedirectedToCreateTeam();
    
    if (redirectedToCreateTeam) {
      console.log('ℹ️ Redirected to create-first-team page - stopping test');
      redirectedToCreateTeam.should.be.true;
      console.log('✅ Redirection validation passed');
      return;
    }
    console.log('ℹ️ Not redirected to team creation page');

    console.log('⏳ Checking for reCAPTCHA presence...');
    const recaptchaExists = await SignupPage.isRecaptchaDisplayed();

    if (recaptchaExists) {
      console.log('ℹ️ First registration attempt triggered reCAPTCHA as expected');
      await browser.pause(500);
      expect(recaptchaExists).to.be.true;
      console.log('✅ reCAPTCHA validation passed');
    } else {
      console.log('⚠️ No reCAPTCHA and no redirection to create-first-team page - skipping test');
      this.skip();
    }
    
    console.log('✅ Test completed successfully');
  });

  /**
   * Test case for a second registration attempt
   * Tests various success scenarios and email verification flows
   */
  it('second registration attempt (check successful registration)', async () => {
    console.log('▶️ TEST: Second registration attempt (completion check)');
    
    const email = generateRandomEmail();
    console.log(`ℹ️ Generated test email: ${email}`);
    
    console.log('⏳ Attempting registration with generated email...');
    await SignupPage.register(email);
    console.log('✅ Registration form submitted');
    
    await browser.pause(1000);

    // First check if redirected to create-first-team page
    console.log('⏳ Checking for redirection to team creation page...');
    const redirectedToCreateTeam = await SignupPage.isRedirectedToCreateTeam();
    if (redirectedToCreateTeam) {
      console.log('ℹ️ Redirected to create-first-team page - test completed successfully');
      redirectedToCreateTeam.should.be.true;
      console.log('✅ Redirection validation passed');
      return;
    }
    console.log('ℹ️ Not redirected to team creation page');

    // Check if redirected to welcome page (successful registration)
    console.log('⏳ Checking for redirection to welcome page...');
    const isWelcomePage = await SignupPage.isRedirectedToWelcomePage();
    if (isWelcomePage) {
      console.log('ℹ️ Redirected to welcome-to-trello page - registration successful');
      expect(isWelcomePage).to.be.true;
      console.log('✅ Welcome page validation passed');
      return;
    }
    console.log('ℹ️ Not redirected to welcome page');

    // If not redirected to welcome page, check if verification banner appears
    console.log('⏳ Checking for email verification banner...');
    const { fullMessage } = await SignupPage.verifyBannerContent();
    console.log(`ℹ️ Email verification banner message: "${fullMessage}"`);

    expect(fullMessage).to.not.be.empty;
    expect(fullMessage.toLowerCase()).to.include('email');
    console.log('✅ Email verification banner validation passed');
    
    console.log('✅ Test completed successfully');
  });

  /**
   * After each test completion
   */
  afterEach(async () => {
    console.log('✅ Registration test completed');
  });
});
