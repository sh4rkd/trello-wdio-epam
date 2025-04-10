const Page = require('../../../core/page');
const { Button, Input, Element } = require('../../../core/elements');

/**
 * Representa la página de inicio de sesión y sus funcionalidades
 * @class LoginPage
 * @extends Page
 */
class LoginPage extends Page {
  constructor() {
    super();
    this.loginButton = new Button('a[href*="/login"]', 'Login Button');
    this.emailInput = new Input('input#username', 'Email Input');
    this.continueButton = new Button('#login-submit', 'Continue Button');
    this.passwordInput = new Input('#password', 'Password Input');
    this.loginSubmitButton = new Button('#login-submit', 'Login Submit Button');
    this.boardDashboard = new Element(
      '.board-tile, .boards-page-board-section-list-item',
      'Board Dashboard'
    );
  }

  /**
   * Realiza el proceso de inicio de sesión con las credenciales proporcionadas
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<void>}
   */
  async login(email, password) {
    await this.open();
    await this.loginButton.clickWithWait({ timeout: 5000 });
    await this.emailInput.waitForDisplayed({ timeout: 5000 });
    await this.emailInput.setValue(email);
    await this.continueButton.clickWithWait({ timeout: 5000 });
    await this.passwordInput.waitForDisplayed({ timeout: 5000 });
    await this.passwordInput.setValue(password);
    await this.loginSubmitButton.clickWithWait({ timeout: 5000 });
    await this.boardDashboard.waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Abre la página de inicio de sesión
   * @returns {Promise<void>}
   */
  async open() {
    await super.open('/');
  }
}

module.exports = new LoginPage();
