const Page = require('./page');

class LogoutPage extends Page {
    get profileIcon() { return $('.js-open-header-member-menu'); }
    get logoutOption() { return $('[data-testid="account-menu-logout"]'); }
    get logoutConfirmButton() { return $('#logout-submit'); }
    get pageNotFoundHeader() { return $('h1=Page not found.'); }
    
    /**
     * Performs the logout process
     */
    async logout() {
        await this.profileIcon.waitForClickable({ timeout: 5000 });
        await this.profileIcon.click();
        
        await this.logoutOption.waitForClickable({ timeout: 5000 });
        await this.logoutOption.click();
        
        await this.logoutConfirmButton.waitForClickable({ timeout: 5000 });
        await this.logoutConfirmButton.click();
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('trello.com/home'),
            {
                timeout: 10000,
                timeoutMsg: 'Expected URL to contain trello.com/home after 10s'
            }
        );
    }
    
    /**
     * Verifies if the user is logged out by attempting to access a protected page
     * @param {string} protectedUrl - URL that requires authentication
     * @returns {boolean} - true if "Page not found" message appears
     */
    async verifyLoggedOut(protectedUrl) {
        await browser.url(protectedUrl);
        await this.pageNotFoundHeader.waitForExist({ timeout: 100000 });
        return await this.pageNotFoundHeader.isDisplayed();
    }
}

module.exports = new LogoutPage();