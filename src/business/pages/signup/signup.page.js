const Page = require('../../../core/page');
const { Button, Input, Element } = require('../../../core/elements');
const WaitUtils = require('../../../core/utils/wait');

class SignupPage extends Page {
  constructor() {
    super();
    this.signupButton = new Button('a[data-uuid*="_signup"]', 'Signup Button');
    this.emailInput = new Input('input#email', 'Email Input');
    this.signupSubmitButton = new Button('#signup-submit', 'Signup Submit Button');
    this.signupPage = new Element('#signup-submit', 'Signup Page');

    this.verificationBanner = new Element(
      '[data-testid="confirm-email-banner"], div[class*="emailBanner"], .confirm-email',
      'Verification Banner'
    );

    this.bannerMessage = new Element(
      () => this.verificationBanner.get().then((el) => el.$('li, p, div')),
      'Banner Message'
    );
  }

  /**
   * Registers a new user with the provided email
   * @param {string} email - Email to register with
   */
  async register(email) {
    try {
      await this.signupButton.clickWithWait({ timeout: 5000 });

      await this.emailInput.waitForDisplayed({ timeout: 5000 });
      await this.emailInput.setValue(email);

      await this.signupSubmitButton.clickWithWait({ timeout: 5000 });

      console.log(`Successfully submitted registration for: ${email}`);
    } catch (error) {
      console.error(`Error in register method: ${error.message}`);
      throw error;
    }
  }

  /**
   * Checks if the signup page is visible
   * @returns {Promise<boolean>} - True if signup page is displayed
   */
  async isSignupPageVisible() {
    return await this.signupPage.isDisplayed();
  }

  /**
   * Verifies the content of the email verification banner
   * @returns {Promise<object>} - Object containing the banner text
   */
  async verifyBannerContent() {
    try {
      const bannerExists = await this.verificationBanner.isExisting();
      if (!bannerExists) {
        return { fullMessage: '' };
      }

      // Get text from banner
      const fullMessage = await this.verificationBanner.getText();

      return { fullMessage };
    } catch (error) {
      console.error('Error in verifyBannerContent:', error.message);
      return { fullMessage: `Error: ${error.message}` };
    }
  }

  /**
   * Checks if reCAPTCHA is displayed
   * @returns {Promise<boolean>} - True if reCAPTCHA is displayed
   */
  async isRecaptchaDisplayed() {
    const recaptchaFrame = new Element('iframe[title*="reCAPTCHA"]', 'reCAPTCHA Frame');
    return await recaptchaFrame.isExisting();
  }

  /**
   * Checks if user is redirected to create-first-team page within specified timeout
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>} - True if redirected to create-first-team page
   */
  async isRedirectedToCreateTeam(timeout = 10000) {
    try {
      await WaitUtils.waitFor(
        async () => {
          const url = await browser.getUrl();
          console.log(`Checking redirection: ${url}`);
          return url.includes('/create-first-team');
        },
        {
          timeout: timeout,
          timeoutMsg: `Not redirected to create-first-team after ${timeout}ms`,
          interval: 500,
        }
      );
      return true;
    } catch (error) {
      console.log('Redirection to create-first-team failed:', error.message);
      return false;
    }
  }

  /**
   * Checks if user is redirected to welcome-to-trello page within specified timeout
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>} - True if redirected to welcome-to-trello page
   */
  async isRedirectedToWelcomePage(timeout = 10000) {
    try {
      await WaitUtils.waitFor(
        async () => {
          const url = await browser.getUrl();
          console.log(`Checking welcome page redirection: ${url}`);
          return url.includes('/welcome-to-trello');
        },
        {
          timeout: timeout,
          timeoutMsg: `Not redirected to welcome-to-trello after ${timeout}ms`,
          interval: 500,
        }
      );
      return true;
    } catch (error) {
      console.log('Redirection to welcome-to-trello failed:', error.message);
      return false;
    }
  }

  /**
   * Opens the signup page
   */
  async open() {
    return super.open('/');
  }
}

module.exports = new SignupPage();
