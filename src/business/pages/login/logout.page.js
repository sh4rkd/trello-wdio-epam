const Page = require('../../../core/page');
const { Button } = require('../../../core/elements');

class LogoutPage extends Page {
  constructor() {
    super();
    this.accountButton = new Button('button[data-testid="header-member-menu-button"]', 'Account Button');
    this.logoutButton = new Button('button[data-testid="account-menu-logout"]', 'Logout Button');
    this.logoutConfirmButton = new Button('#logout-submit', 'Logout Confirm Button');
  }

  /**
   * Perform logout action
   */
  async logout() {
    await this.accountButton.clickWithWait({ timeout: 5000 });
    await this.logoutButton.clickWithWait({ timeout: 5000 });
    await this.logoutConfirmButton.clickWithWait({ timeout: 5000 });
  }
}

module.exports = new LogoutPage();
