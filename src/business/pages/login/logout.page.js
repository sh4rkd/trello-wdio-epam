const Page = require('../../../core/page');
const { Button } = require('../../../core/elements');

/**
 * Representa la página de cierre de sesión y sus funcionalidades
 * @class LogoutPage
 * @extends Page
 */
class LogoutPage extends Page {
  constructor() {
    super();
    this.accountButton = new Button('button[data-testid="header-member-menu-button"]', 'Account Button');
    this.logoutButton = new Button('button[data-testid="account-menu-logout"]', 'Logout Button');
    this.confirmLogoutButton = new Button('#logout-submit', 'Confirm Logout Button');
  }

  /**
   * Realiza el proceso de cierre de sesión
   * @returns {Promise<void>}
   */
  async logout() {
    await this.accountButton.clickWithWait({ timeout: 5000 });
    await this.logoutButton.clickWithWait({ timeout: 5000 });
    await this.confirmLogoutButton.clickWithWait({ timeout: 5000 });
  }
}

module.exports = new LogoutPage();
