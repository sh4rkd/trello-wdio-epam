const LoginPage = require('../src/business/pages/login/login.page');
const LogoutPage = require('../src/business/pages/login/logout.page');
require('dotenv').config();
const chai = require('chai');
chai.should();

const TEST_USER = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
};

describe('Trello Session Management', () => {
  let userBoardsUrl;

  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(TEST_USER.email, TEST_USER.password);

    await LoginPage.boardDashboard.waitForDisplayed({ timeout: 10000 });

    const boardsLink = await $('a[href*="/boards"]');
    await boardsLink.waitForExist({ timeout: 5000 });
    const boardsHref = await boardsLink.getAttribute('href');

    if (boardsHref.startsWith('http')) {
      userBoardsUrl = boardsHref;
    } else {
      userBoardsUrl = 'https://trello.com' + boardsHref;
    }
    console.log(`User boards URL: ${userBoardsUrl}`);
  });

  it('should securely terminate session', async () => {
    await LogoutPage.logout();

    const url = await browser.getUrl();
    url.should.include('trello.com/home');

    await browser.url(userBoardsUrl);

    // Use the generic h1 selector like in the page object
    const errorHeader = await $('h1');
    await errorHeader.waitForExist({ timeout: 10000 });

    const errorText = await errorHeader.getText();
    const expectedMessages = ['Page not found.', 'Página no encontrada.'];

    errorText.should.be.oneOf(expectedMessages);

    const isErrorDisplayed = await errorHeader.isDisplayed();
    isErrorDisplayed.should.be.true;

    console.log(`Error message found: "${errorText}"`);
  });
});
