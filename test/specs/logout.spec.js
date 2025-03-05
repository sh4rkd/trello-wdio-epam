const LoginPage = require('../pageobjects/login.page');
const LogoutPage = require('../pageobjects/logout.page');
require('dotenv').config();

const TEST_USER = {
    email: process.env.TEST_EMAIL,    
    password: process.env.TEST_PASSWORD   
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
        await LogoutPage.profileIcon.waitForClickable({ timeout: 5000 });
        await LogoutPage.profileIcon.click();
        
        await LogoutPage.logoutOption.waitForClickable({ timeout: 5000 });
        await LogoutPage.logoutOption.click();
        
        await LogoutPage.logoutConfirmButton.waitForClickable({ timeout: 5000 });
        await LogoutPage.logoutConfirmButton.click();
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('trello.com/home'),
            {
                timeout: 10000,
                timeoutMsg: 'Expected URL to contain trello.com/home after 10s'
            }
        );
        
        await browser.url(userBoardsUrl);
        
        const errorHeader = await $('h1');
        await errorHeader.waitForExist({ timeout: 10000 });
        
        const errorText = await errorHeader.getText();

        const expectedMessages = ['Page not found.', 'Página no encontrada.'];
        const messageMatches = expectedMessages.some(msg => errorText === msg);
        
        console.log(`Error message found: "${errorText}"`);
        await expect(messageMatches).toBe(true, 
          `Error message "${errorText}" doesn't match any of the expected messages: ${expectedMessages.join(' or ')}`);
    });
});