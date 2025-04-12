// Updated test/specs/login.spec.js
const LoginPage = require('../src/business/pages/login/login.page');
require('dotenv').config();
const chai = require('chai');
const assert = chai.assert;

const TEST_USER = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
};

describe('Trello Login', () => {
  it('should login successfully with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.loginButton.clickWithWait({ timeout: 5000 });

    await LoginPage.emailInput.waitForDisplayed({ timeout: 5000 });
    await LoginPage.emailInput.setValue(TEST_USER.email);

    await LoginPage.continueButton.clickWithWait({ timeout: 5000 });

    await LoginPage.passwordInput.waitForDisplayed({ timeout: 5000 });
    await LoginPage.passwordInput.setValue(TEST_USER.password);

    await LoginPage.loginSubmitButton.clickWithWait({ timeout: 5000 });

    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 10000 });

    const isDisplayed = await LoginPage.boardDashboard.isDisplayed();
    assert.isTrue(isDisplayed, 'Dashboard should be visible after login');

    const currentUrl = await browser.getUrl();
    assert.include(currentUrl, 'trello.com', 'URL should include trello.com');
  });
});
