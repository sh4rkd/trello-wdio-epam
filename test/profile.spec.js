const LoginPage = require('../src/business/pages/login/login.page');
const ProfilePage = require('../src/business/pages/profile/profile.page');
require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;

const TEST_USER = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
};

describe('Trello Profile Management', () => {
  let currentUsername;

  before(async () => {
    await LoginPage.open();
    await LoginPage.login(TEST_USER.email, TEST_USER.password);
    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 20000 });
    currentUsername = await ProfilePage.getCurrentUsername();
  });

  it('should navigate to profile settings', async () => {
    await browser.url('https://trello.com/');
    await browser.pause(2000);

    await ProfilePage.navigateToProfileSettings();

    const url = await browser.getUrl();
    expect(url).to.include(`/u/${currentUsername}`);

    await browser.pause(3000);

    await browser.url('https://trello.com/');
    await browser.pause(2000);
  });

  it('should update username successfully', async () => {
    const originalUsername = currentUsername;

    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);

    const timestamp = Date.now();
    const newUsername = `testuser${timestamp}`;

    try {
      await ProfilePage.usernameInput.waitForDisplayed({ timeout: 15000 });

      await ProfilePage.updateUsername(newUsername);

      await browser.pause(5000);

      await browser.url('https://trello.com/');
      await browser.pause(3000);

      const updatedUsername = await ProfilePage.getCurrentUsername();

      expect(updatedUsername).to.equal(newUsername);
      expect(updatedUsername).to.not.equal(originalUsername);

      currentUsername = updatedUsername;
    } catch (error) {
      await browser.saveScreenshot('./error-username-update.png');
      throw error;
    }

    await browser.url('https://trello.com/');
    await browser.pause(2000);
  });

  it('should show error for existing username', async () => {
    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);

    const existingUsername = 'epam';

    try {
      await ProfilePage.usernameInput.waitForDisplayed({ timeout: 15000 });

      const originalUsername = currentUsername;

      await ProfilePage.updateUsername(existingUsername);

      await ProfilePage.usernameError.waitForDisplayed({ timeout: 15000 });
      const errorMessage = await ProfilePage.getErrorMessage();

      const expectedMessages = ['Username is taken', 'Este nombre de usuario ya existe'];
      expect(errorMessage).to.satisfy((msg) => {
        return expectedMessages.some((expected) => msg.includes(expected));
      });

      await browser.url('https://trello.com/');
      await browser.pause(3000);

      const updatedUsername = await ProfilePage.getCurrentUsername();

      expect(updatedUsername).to.equal(originalUsername);
      expect(updatedUsername).to.not.equal(existingUsername);
    } catch (error) {
      await browser.saveScreenshot('./error-existing-username.png');
      throw error;
    }

    await browser.url('https://trello.com/');
    await browser.pause(2000);
  });

  it('should update user bio', async () => {
    await ProfilePage.navigateToProfileSettings();
    await browser.pause(2000);

    let currentBio = '';
    try {
      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });
      currentBio = await (await ProfilePage.bioInput.get()).getValue();
    } catch (error) {
      // Ignoramos errores al obtener la biografía actual
    }

    const bioText = `Esta es mi biografía de prueba para pruebas de automatización - ${Date.now()}`;

    try {
      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });

      await ProfilePage.updateBio(bioText);

      await browser.pause(5000);

      await browser.url('https://trello.com/');
      await browser.pause(3000);

      await ProfilePage.navigateToProfileSettings();
      await browser.pause(3000);

      await ProfilePage.bioInput.waitForDisplayed({ timeout: 15000 });
      const updatedBio = await (await ProfilePage.bioInput.get()).getValue();

      expect(updatedBio).to.equal(bioText);
      expect(updatedBio).to.not.equal(currentBio);
    } catch (error) {
      await browser.saveScreenshot('./error-bio-update.png');
      throw error;
    }
  });
});
