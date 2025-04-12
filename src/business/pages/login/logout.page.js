const Page = require('../../../core/page');
const { Button, Element } = require('../../../core/elements');
const WaitUtils = require('../../../core/utils/wait');

class LogoutPage extends Page {
  constructor() {
    super();
    this.profileIcon = new Button('.js-open-header-member-menu', 'Profile Icon');
    this.logoutOption = new Button('[data-testid="account-menu-logout"]', 'Logout Option');
    this.logoutConfirmButton = new Button('#logout-submit', 'Logout Confirm Button');
    // Use a more generic selector for the header
    this.pageNotFoundHeader = new Element('h1', 'Page Not Found Header');
  }

  /**
   * Performs the logout process
   */
  async logout() {
    await this.profileIcon.clickWithWait({ timeout: 5000 });
    await this.logoutOption.clickWithWait({ timeout: 5000 });
    await this.logoutConfirmButton.clickWithWait({ timeout: 5000 });

    await this.waitForUrlContains('trello.com/home', { timeout: 10000 });
  }

  /**
   * Verifies if the user is logged out by attempting to access a protected page
   * @param {string} protectedUrl - URL that requires authentication
   * @returns {boolean} - true if "Page not found" message appears
   */
  async verifyLoggedOut(protectedUrl) {
    await browser.url(protectedUrl);
    await this.pageNotFoundHeader.waitForExist({ timeout: 10000 });

    const errorText = await this.pageNotFoundHeader.getText();
    const expectedMessages = ['Page not found.', 'Página no encontrada.'];

    // Verify the text is either in English or Spanish
    const isErrorMessage = expectedMessages.some(msg => errorText === msg);

    if (!isErrorMessage) {
      throw new Error(
        `Error message "${errorText}" doesn't match expected messages: ${expectedMessages.join(' or ')}`
      );
    }

    return await this.pageNotFoundHeader.isDisplayed();
  }
}

module.exports = new LogoutPage();
