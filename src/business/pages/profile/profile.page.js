const Page = require('../../../core/page');
const { Button, Input, Element } = require('../../../core/elements');

/**
 * Page object representing the Trello Profile page.
 * Provides methods to interact with profile settings and manage user information.
 */
class ProfilePage extends Page {
  /**
   * Initializes all elements needed for profile page interaction
   */
  constructor() {
    super();
    this.profileIcon = new Button(
      '[data-testid="header-member-menu-button"],[aria-label="Open member menu"] img, .js-open-header-member-menu',
      'Profile Icon'
    );
    this.settingsOption = new Button(
      '[data-testid="account-menu-settings"], [href*="/settings"]',
      'Settings Option'
    );
    this.profileVisibilityOption = new Button(
      '[data-testid="menu-profile"], .js-member-profile, [href*="/manage-profile"]',
      'Profile Visibility Option'
    );
    this.usernameInput = new Input('input[name="username"]', 'Username Input');
    this.bioInput = new Input('textarea#bio, textarea[name="bio"]', 'Bio Input');
    this.saveButton = new Button(
      'button[type="submit"], [data-testid="profile-save"]',
      'Save Button'
    );
    this.savedConfirmation = new Element(
      'div[role="alert"], [class*="alert"]',
      'Saved Confirmation'
    );
    this.usernameError = new Element(
      '#SaveProfileError_Field_username, [data-testid="username-error"], .error-message',
      'Username Error'
    );
    this.profileForm = new Element(
      '[data-testid="profile-tab-container"], .profile-form, div[class*="profileContainer"]',
      'Profile Form'
    );
    this.userProfileLink = new Element(
      'a[href*="/u/"], [data-testid="member-name"]',
      'User Profile Link'
    );
  }

  /**
   * Gets the current username from the profile link
   * @returns {Promise<string>} Username extracted from the link
   */
  async getCurrentUsername() {
    try {
      await this.userProfileLink.waitForExist({ timeout: 10000 });

      const href = await this.userProfileLink.getAttribute('href');

      // Extract username without including /boards at the end
      const match = href.match(/\/u\/([^\/]+)/);

      if (match && match[1]) {
        return match[1];
      } else {
        const text = await this.userProfileLink.getText();
        if (text && text.trim()) {
          return text.trim();
        }

        throw new Error('Could not extract username from profile link');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Navigates to the user's profile settings page
   * Uses direct URL navigation instead of menus for more reliable access
   * @returns {Promise<void>}
   */
  async navigateToProfileSettings() {
    try {
      let username = '';

      try {
        // First try to get the current username
        username = await this.getCurrentUsername();
      } catch (error) {
        // If that fails, try to extract it from the current URL
        const currentUrl = await browser.getUrl();

        const urlMatch = currentUrl.match(/\/u\/([^\/]+)/);
        if (urlMatch && urlMatch[1]) {
          username = urlMatch[1];
        } else {
          throw new Error('Could not obtain username for navigation');
        }
      }

      // Navigate directly to the profile URL
      const profileUrl = `/u/${username}`;
      await browser.url(profileUrl);

      // Wait for the page to load
      await browser.pause(3000);

      // Verify the URL contains the username
      const currentUrl = await browser.getUrl();
      if (!currentUrl.includes(`/u/${username}`)) {
        throw new Error(`Navigation to ${profileUrl} failed`);
      }

      // Try to wait for the profile form to be visible
      try {
        await this.profileForm.waitForDisplayed({ timeout: 15000 });
      } catch (formError) {
        // Take a screenshot for debugging
        await browser.saveScreenshot('./profile-form-error.png');

        // Don't throw the error to allow the test to continue
      }
    } catch (error) {
      // Try to take a screenshot for debugging
      try {
        await browser.saveScreenshot('./error-profile-navigation.png');
      } catch (screenshotError) {
        // Ignore errors when taking screenshots
      }

      throw error;
    }
  }

  /**
   * Updates the username in profile settings
   * @param {string} username - New username to set
   * @returns {Promise<void>}
   */
  async updateUsername(username) {
    try {
      await this.usernameInput.waitForDisplayed({ timeout: 10000 });
      await this.usernameInput.clearAndSetValue(username);

      await this.saveButton.waitForClickable({ timeout: 10000 });
      await this.saveButton.clickWithWait({ timeout: 10000 });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the user's biography in profile settings
   * @param {string} bioText - New biography text to set
   * @returns {Promise<void>}
   */
  async updateBio(bioText) {
    try {
      await this.bioInput.waitForDisplayed({ timeout: 10000 });
      await this.bioInput.clearAndSetValue(bioText);

      await this.saveButton.waitForClickable({ timeout: 10000 });
      await this.saveButton.clickWithWait({ timeout: 10000 });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the error message when attempting to use an invalid username
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    try {
      await this.usernameError.waitForDisplayed({ timeout: 10000 });
      return await this.usernameError.getText();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if the save confirmation message is displayed
   * @returns {Promise<boolean>} True if the confirmation is visible
   */
  async isConfirmationDisplayed() {
    try {
      await this.savedConfirmation.waitForDisplayed({ timeout: 10000 });
      return await this.savedConfirmation.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the profile form is visible
   * @returns {Promise<boolean>} True if the form is visible
   */
  async isProfileFormVisible() {
    try {
      await this.profileForm.waitForDisplayed({ timeout: 10000 });
      return await this.profileForm.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the current user's profile settings page
   * @returns {Promise<void>}
   */
  async open() {
    try {
      const username = await this.getCurrentUsername();
      return super.open(`/u/${username}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProfilePage();
