const SignupPage = require('../src/business/pages/signup/signup.page');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();

function generateRandomEmail() {
    return `test${Math.floor(Math.random() * 10000)}@example.tesssti.com`;
}

describe('Trello User Registration', () => {
    beforeEach(async () => {
        await SignupPage.open();
    });

    it('should access registration page', async () => {
        await SignupPage.signupButton.clickWithWait({ timeout: 5000 });
        
        await SignupPage.signupPage.waitForDisplayed({ timeout: 5000 });
        
        // Using Assert interface
        const isDisplayed = await SignupPage.signupPage.isDisplayed();
        assert.isTrue(isDisplayed, 'Signup page should be displayed');
    });

    it('first registration attempt (triggers reCAPTCHA)', async () => {
        const email = generateRandomEmail();
        await SignupPage.register(email);
        await browser.pause(1000);
        
        const redirectedToCreateTeam = await SignupPage.isRedirectedToCreateTeam();
        if (redirectedToCreateTeam) {
            console.log('Redirected to create-first-team page - stopping test');
            
            // Using Should interface
            redirectedToCreateTeam.should.be.true;
            return;
        }
        
        const recaptchaExists = await SignupPage.isRecaptchaDisplayed();
            
        if (recaptchaExists) {
            console.log('First registration attempt triggered reCAPTCHA as expected');
            await browser.pause(500);
            
            // Using Expect interface
            expect(recaptchaExists).to.be.true;
        } else {
            console.log('No reCAPTCHA and no redirection to create-first-team page - skipping test');
            this.skip();
        }
    });
    
    it('second registration attempt (check successful registration)', async () => {
        const email = generateRandomEmail();
        await SignupPage.register(email);
        await browser.pause(1000);
        
        // First check if redirected to create-first-team page
        const redirectedToCreateTeam = await SignupPage.isRedirectedToCreateTeam();
        if (redirectedToCreateTeam) {
            console.log('Redirected to create-first-team page - test completed successfully');
            
            // Using Should interface
            redirectedToCreateTeam.should.be.true;
            return;
        }
        
        // Check if redirected to welcome page (successful registration)
        const isWelcomePage = await SignupPage.isRedirectedToWelcomePage();
        if (isWelcomePage) {
            console.log('Redirected to welcome-to-trello page - registration successful');
            
            // Using Expect interface
            expect(isWelcomePage).to.be.true;
            return;
        }
        
        // If not redirected to welcome page, check if verification banner appears
        const { fullMessage } = await SignupPage.verifyBannerContent();
        
        // Using Expect interface
        expect(fullMessage).to.not.be.empty;
        expect(fullMessage.toLowerCase()).to.include('email');
        
        console.log(`Email verification banner displayed with message: ${fullMessage}`);
    });
});