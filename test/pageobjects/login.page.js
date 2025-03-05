const Page = require('./page');

class LoginPage extends Page {
    get loginButton() { return $('a[href*="/login"]'); }
    get emailInput() { return $('input#username'); }
    get continueButton() { return $('#login-submit'); } 
    get passwordInput() { return $('#password'); }
    get loginSubmitButton() { return $('#login-submit'); } 
    get boardDashboard() { return $('.board-tile, .boards-page-board-section-list-item'); }
    
    /**
     * Login with provided credentials
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async login(email, password) {
        await this.open();
        await this.loginButton.waitForClickable({ timeout: 5000 });
        await this.loginButton.click();
        
        await this.emailInput.waitForDisplayed({ timeout: 5000 });
        await this.emailInput.setValue(email);
        
        await this.continueButton.waitForClickable({ timeout: 5000 });
        await this.continueButton.click();
        
        await this.passwordInput.waitForDisplayed({ timeout: 5000 });
        await this.passwordInput.setValue(password);
        
        await this.loginSubmitButton.waitForClickable({ timeout: 5000 });
        await this.loginSubmitButton.click();
        
        await this.boardDashboard.waitForDisplayed({ timeout: 10000 });
    }
    
    open() {
        return super.open('/');
    }
}

module.exports = new LoginPage();