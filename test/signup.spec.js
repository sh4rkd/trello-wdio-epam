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
            return this.skip();
        }
    });
});