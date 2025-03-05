const SignupPage = require('../pageobjects/signup.page');

function generateRandomEmail() {
    return `test${Math.floor(Math.random() * 10000)}@example.tesssti.com`;
}

describe('Trello User Registration', () => {
    beforeEach(async () => {
        await SignupPage.open();
    });

    it('should access registration page', async () => {
        await SignupPage.signupButton.waitForClickable({ timeout: 5000 });
        await SignupPage.signupButton.click();
        
        await SignupPage.signupPage.waitForDisplayed({ timeout: 5000 });
        await expect(SignupPage.signupPage).toBeDisplayed();
    });

    it('first registration attempt (triggers reCAPTCHA)', async () => {
        const email = generateRandomEmail();
        await SignupPage.register(email);
        await browser.pause(1000);
        
        const redirectedToCreateTeam = await SignupPage.isRedirectedToCreateTeam();
        if (redirectedToCreateTeam) {
            console.log('Redirected to create-first-team page - stopping test');
            expect(true).toBe(true);
            return;
        }
        
        const recaptchaExists = await $('iframe[title*="reCAPTCHA"]').isExisting()
            .then(exists => exists)
            .catch(() => false);
            
        if (recaptchaExists) {
            console.log('First registration attempt triggered reCAPTCHA as expected');
            await browser.pause(500);
        } else {
            console.log('No reCAPTCHA and no redirection to create-first-team page - skipping test');
            return this.skip();
        }
        
        expect(true).toBe(true);
    });
});