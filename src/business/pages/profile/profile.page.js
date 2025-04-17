const Page = require('../../../core/page');
const { Button, Input, Element } = require('../../../core/elements');

class ProfilePage extends Page {
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

      // Extraer el nombre de usuario sin incluir /boards al final
      const match = href.match(/\/u\/([^\/]+)/);

      if (match && match[1]) {
        return match[1];
      } else {
        const text = await this.userProfileLink.getText();
        if (text && text.trim()) {
          return text.trim();
        }

        throw new Error('No se pudo extraer nombre de usuario del enlace de perfil');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Navegación a la configuración del perfil del usuario
   * Ahora usa navegación directa a la URL en lugar de menús
   */
  async navigateToProfileSettings() {
    try {
      let username = '';

      try {
        // Primero intentamos obtener el nombre de usuario actual
        username = await this.getCurrentUsername();
      } catch (error) {
        // Si falla, intentamos obtenerlo de la URL actual
        const currentUrl = await browser.getUrl();

        const urlMatch = currentUrl.match(/\/u\/([^\/]+)/);
        if (urlMatch && urlMatch[1]) {
          username = urlMatch[1];
        } else {
          throw new Error('No se pudo obtener el nombre de usuario para la navegación');
        }
      }

      // Navegamos directamente a la URL del perfil
      const profileUrl = `/u/${username}`;
      await browser.url(profileUrl);

      // Esperamos a que la página se cargue
      await browser.pause(3000);

      // Verificamos si la URL contiene el nombre de usuario
      const currentUrl = await browser.getUrl();
      if (!currentUrl.includes(`/u/${username}`)) {
        throw new Error(`La navegación a ${profileUrl} falló`);
      }

      // Intentamos esperar a que el formulario de perfil sea visible
      try {
        await this.profileForm.waitForDisplayed({ timeout: 15000 });
      } catch (formError) {
        // Tomamos una captura de pantalla para depurar
        await browser.saveScreenshot('./profile-form-error.png');

        // No lanzamos el error para permitir que la prueba continúe
      }
    } catch (error) {
      // Intentar tomar una captura de pantalla para depurar
      try {
        await browser.saveScreenshot('./error-profile-navigation.png');
      } catch (screenshotError) {
        // Ignoramos errores al tomar capturas de pantalla
      }

      throw error;
    }
  }

  /**
   * Actualiza el nombre de usuario
   * @param {string} username - Nuevo nombre de usuario
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
   * Actualiza la biografía del usuario
   * @param {string} bioText - Nuevo texto de biografía
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
   * Obtiene el mensaje de error de nombre de usuario
   * @returns {Promise<string>} Mensaje de error
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
   * Verifica si la confirmación de guardado se muestra
   * @returns {Promise<boolean>} True si la confirmación es visible
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
   * Verifica si el formulario de perfil es visible
   * @returns {Promise<boolean>} True si el formulario es visible
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
   * Abre la página de configuración de perfil del usuario actual
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
