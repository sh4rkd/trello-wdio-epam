const Page = require('./page');

class SignupPage extends Page {
    get signupButton() { return $('a[data-uuid*="_signup"]'); }
    get emailInput() { return $('input#email'); }
    get signupSubmitButton() { return $('#signup-submit'); }
    get signupPage() { return $('#signup-submit'); }
    
    get verificationBanner() { 
        return $('[data-testid="confirm-email-banner"], div[class*="emailBanner"], .confirm-email'); 
    }
    
    get bannerMessage() { return this.verificationBanner.$('li, p, div'); }
    
    /**
     * Registers a new user with the provided email
     * @param {string} email - Email to register with
     */
    async register(email) {
        try {
            await this.signupButton.waitForClickable({ timeout: 5000 });
            await this.signupButton.click();
            
            await this.emailInput.waitForDisplayed({ timeout: 5000 });
            await this.emailInput.setValue(email);
            
            await this.signupSubmitButton.waitForClickable({ timeout: 5000 });
            await this.signupSubmitButton.click();
            
            console.log(`Successfully submitted registration for: ${email}`);
        } catch (error) {
            console.error(`Error in register method: ${error.message}`);
            throw error;
        }
    }
    
    /**
     * Checks if the signup page is visible
     * @returns {Promise<boolean>} - True if signup page is displayed
     */
    async isSignupPageVisible() {
        return await this.signupPage.isDisplayed();
    }
    
    /**
     * Verifies the content of the email verification banner
     * @returns {Promise<object>} - Object containing the banner text
     */
    async verifyBannerContent() {
        try {
            const bannerExists = await this.verificationBanner.isExisting();
            if (!bannerExists) {
                return { fullMessage: '' };
            }

            // Get text from banner with more direct approach
            const fullMessage = await this.verificationBanner.getText();
            
            return { fullMessage };
        } catch (error) {
            console.error('Error in verifyBannerContent:', error.message);
            return { fullMessage: `Error: ${error.message}` };
        }
    }
    
    /**
     * Checks if reCAPTCHA is displayed
     * @returns {Promise<boolean>} - True if reCAPTCHA is displayed
     */
    async isRecaptchaDisplayed() {
        return await $('iframe[title*="reCAPTCHA"]').isExisting();
    }
    
    /**
     * Checks if user is redirected to create-first-team page within specified timeout
     * @param {number} timeout - Maximum time to wait in milliseconds
     * @returns {Promise<boolean>} - True if redirected to create-first-team page
     */
    async isRedirectedToCreateTeam(timeout = 10000) {
        try {
            await browser.waitUntil(
                async () => {
                    const url = await browser.getUrl();
                    console.log(`Checking redirection: ${url}`);
                    return url.includes('/create-first-team');
                },
                {
                    timeout: timeout,
                    timeoutMsg: `Not redirected to create-first-team after ${timeout}ms`,
                    interval: 500
                }
            );
            return true;
        } catch (error) {
            console.log('Redirection to create-first-team failed:', error.message);
            return false;
        }
    }
    
    
    /**
     * Opens the signup page
     */
    open() {
        return super.open('/');
    }
}

module.exports = new SignupPage();