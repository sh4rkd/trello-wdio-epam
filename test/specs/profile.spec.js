const LoginPage = require('../pageobjects/login.page');
const ProfilePage = require('../pageobjects/profile.page');
require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;

const TEST_USER = {
    email: process.env.TEST_EMAIL,    
    password: process.env.TEST_PASSWORD   
};

describe('Trello Profile Management', () => {
    let currentUsername;

    before(async () => {
        console.log('Logging in for all tests...');
        await LoginPage.open();
        await LoginPage.login(TEST_USER.email, TEST_USER.password);
        
        await LoginPage.boardDashboard.waitForDisplayed({ timeout: 10000 });
        
        currentUsername = await ProfilePage.getCurrentUsername();
        console.log(`Current username: ${currentUsername}`);
    });

    it('should navigate to profile settings', async () => {
        console.log('Starting profile navigation test...');
        
        await browser.url('https://trello.com/');
        await browser.pause(1000); 
        
        await ProfilePage.navigateToProfileSettings();
        
        console.log('Navigating to profile settings...');
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(`/u/${currentUsername}`),
            {
                timeout: 10000,
                timeoutMsg: `Expected URL to include /u/${currentUsername} after 10s`
            }
        );
        
        console.log('URL verified correctly');

        await ProfilePage.profileForm.waitForDisplayed({ timeout: 10000 });
        
        const isFormDisplayed = await ProfilePage.profileForm.isDisplayed();
        expect(isFormDisplayed).to.be.true;
        
        const url = await browser.getUrl();
        expect(url).to.include(`/u/${currentUsername}`);
        
        console.log('Navigation test completed successfully');
        
        await browser.url('https://trello.com/');
        await browser.pause(1000);
    });

    it('should update username successfully', async () => {
        console.log('Starting username update test...');
        
        await ProfilePage.navigateToProfileSettings();
        await browser.pause(1000); 
        
        const timestamp = Date.now();
        const newUsername = `testuser${timestamp}`;
        console.log(`Attempting to update username to: ${newUsername}`);
        
        await ProfilePage.updateUsername(newUsername);
        
        await ProfilePage.savedConfirmation.waitForDisplayed({ timeout: 10000 });
        const confirmationMessage = await ProfilePage.savedConfirmation.getText();
        
        expect(confirmationMessage).to.contain('Saved');
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(newUsername),
            {
                timeout: 10000,
                timeoutMsg: `Expected URL to include ${newUsername} after 10s`
            }
        );
        
        console.log(`Username successfully updated to: ${newUsername}`);
        
        currentUsername = newUsername;
        
        const url = await browser.getUrl();
        expect(url).to.include(newUsername);
        
        await browser.url('https://trello.com/');
        await browser.pause(1000);
    });

    it('should show error for existing username', async () => {
        console.log('Starting existing username test...');
        
        await ProfilePage.navigateToProfileSettings();
        await browser.pause(1000); 
        
        const existingUsername = 'epam';
        console.log(`Attempting to use existing username: ${existingUsername}`);
        
        await ProfilePage.updateUsername(existingUsername);
        
        await ProfilePage.usernameError.waitForDisplayed({ timeout: 10000 });
        const errorMessage = await ProfilePage.getErrorMessage();
        
        const expectedMessages = ['Username is taken', 'Este nombre de usuario ya existe'];
        expect(errorMessage).to.satisfy(msg => {
            return expectedMessages.some(expected => msg.includes(expected));
        });
        
        console.log(`Existing username test completed successfully`);
        
        await browser.url('https://trello.com/');
        await browser.pause(1000);
    });

    it('should update user bio', async () => {
        console.log('Starting bio update test...');
        
        await ProfilePage.navigateToProfileSettings();
        await browser.pause(1000); 
        
        const bioText = `This is my test bio for automation testing - ${Date.now()}`;
        console.log(`Attempting to update bio to: "${bioText.substring(0, 20)}..."`);
        
        await ProfilePage.updateBio(bioText);
        
        await ProfilePage.savedConfirmation.waitForDisplayed({ timeout: 10000 });
        const confirmationMessage = await ProfilePage.savedConfirmation.getText();
        expect(confirmationMessage).to.contain('Saved');
        
        console.log('Bio updated successfully');
    });
    
    after(async () => {
        console.log('Finalizing all tests...');
    });
});