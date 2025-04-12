const Page = require('../../../core/page');
const { Button, Input, Element } = require('../../../core/elements');

class ProfilePage extends Page {
  constructor() {
    super();
    this.profileIcon = new Button('.js-open-header-member-menu', 'Profile Icon');
    this.settingsOption = new Button('[data-testid="account-menu-settings"]', 'Settings Option');
    this.profileVisibilityOption = new Button('.js-member-profile', 'Profile Visibility Option');
    this.usernameInput = new Input('input[name="username"]', 'Username Input');
    this.bioInput = new Input('textarea#bio', 'Bio Input');
    this.saveButton = new Button('button[type="submit"]', 'Save Button');
    this.savedConfirmation = new Element('span=Saved', 'Saved Confirmation');
    this.usernameError = new Element('#SaveProfileError_Field_username', 'Username Error');
    this.profileForm = new Element('[data-testid="profile-tab-container"]', 'Profile Form');
    this.userProfileLink = new Element('a[href*="/u/"]', 'User Profile Link');
  }

  /**
   * Gets the current username from the profile link
   * @returns {Promise<string>} Username extracted from the link
   */
  async getCurrentUsername() {
    await this.userProfileLink.waitForExist({ timeout: 5000 });

    const href = await this.userProfileLink.getAttribute('href');
    const match = href.match(/\/u\/([^\/]+)/);

    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Could not extract username from profile link');
    }
  }

  /**
   * Navigates to the current user's profile settings
   */
  async navigateToProfileSettings() {
    await this.profileIcon.clickWithWait({ timeout: 5000 });
    await this.settingsOption.clickWithWait({ timeout: 5000 });
    await this.profileVisibilityOption.clickWithWait({ timeout: 5000 });
  }

  /**
   * Updates the username
   * @param {string} username - New username
   */
  async updateUsername(username) {
    await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    await this.usernameInput.clearAndSetValue(username);

    await this.saveButton.clickWithWait({ timeout: 5000 });
  }

  /**
   * Updates the user's bio
   * @param {string} bioText - New bio text
   */
  async updateBio(bioText) {
    await this.bioInput.waitForDisplayed({ timeout: 5000 });
    await this.bioInput.clearAndSetValue(bioText);

    await this.saveButton.clickWithWait({ timeout: 5000 });
  }

  /**
   * Gets the username error message
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    await this.usernameError.waitForDisplayed({ timeout: 5000 });
    return await this.usernameError.getText();
  }

  /**
   * Checks if the save confirmation is displayed
   * @returns {Promise<boolean>} True if confirmation is visible
   */
  async isConfirmationDisplayed() {
    await this.savedConfirmation.waitForDisplayed({ timeout: 5000 });
    return await this.savedConfirmation.isDisplayed();
  }

  /**
   * Checks if the profile form is visible
   * @returns {Promise<boolean>} True if the form is visible
   */
  async isProfileFormVisible() {
    await this.profileForm.waitForDisplayed({ timeout: 5000 });
    return await this.profileForm.isDisplayed();
  }

  /**
   * Opens the current user's profile settings page
   */
  async open() {
    const username = await this.getCurrentUsername();
    return super.open(`/u/${username}`);
  }
}

module.exports = new ProfilePage();
