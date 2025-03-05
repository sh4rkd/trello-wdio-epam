const Page = require('./page');

class ProfilePage extends Page {
    get profileIcon() { return $('.js-open-header-member-menu'); }
    get settingsOption() { return $('[data-testid="account-menu-settings"]'); }
    get profileVisibilityOption() { return $('.js-member-profile'); }
    get usernameInput() { return $('input[name="username"]'); }
    get bioInput() { return $('textarea#bio'); }
    get saveButton() { return $('button[type="submit"]'); }
    get savedConfirmation() { return $('span=Saved'); }
    get usernameError() { return $('#SaveProfileError_Field_username'); }
    get profileForm() { return $('[data-testid="profile-tab-container"]'); }
    get userProfileLink() { return $('a[href*="/u/"]'); }
    
    /**
     * Gets the current username from the profile link
     * @returns {Promise<string>} Username extracted from the link
     */
    async getCurrentUsername() {
        const profileLink = await this.userProfileLink;
        await profileLink.waitForExist({ timeout: 5000 });
        
        const href = await profileLink.getAttribute('href');
        const match = href.match(/\/u\/([^\/]+)/);
        
        if (match && match[1]) {
            return match[1];
        } else {
            throw new Error('Could not extract username from profile link');
        }
    }
    
    /**
     * Navigates to the current user's profile settings
     */
    async navigateToProfileSettings() {
        await this.profileIcon.waitForClickable({ timeout: 5000 });
        await this.profileIcon.click();
        
        await this.settingsOption.waitForClickable({ timeout: 5000 });
        await this.settingsOption.click();
        
        await this.profileVisibilityOption.waitForClickable({ timeout: 5000 });
        await this.profileVisibilityOption.click();
    }
    
    /**
     * Updates the username
     * @param {string} username - New username
     */
    async updateUsername(username) {
        await this.usernameInput.waitForDisplayed({ timeout: 5000 });
        await this.usernameInput.clearValue();
        await this.usernameInput.setValue(username);
        
        await this.saveButton.waitForClickable({ timeout: 5000 });
        await this.saveButton.click();
    }
    
    /**
     * Updates the user's bio
     * @param {string} bioText - New bio text
     */
    async updateBio(bioText) {
        await this.bioInput.waitForDisplayed({ timeout: 5000 });
        await this.bioInput.clearValue();
        await this.bioInput.setValue(bioText);
        
        await this.saveButton.waitForClickable({ timeout: 5000 });
        await this.saveButton.click();
    }
    
    /**
     * Gets the username error message
     * @returns {Promise<string>} Error message
     */
    async getErrorMessage() {
        await this.usernameError.waitForDisplayed({ timeout: 5000 });
        return await this.usernameError.getText();
    }
    
    /**
     * Checks if the save confirmation is displayed
     * @returns {Promise<boolean>} True if confirmation is visible
     */
    async isConfirmationDisplayed() {
        await this.savedConfirmation.waitForDisplayed({ timeout: 5000 });
        return await this.savedConfirmation.isDisplayed();
    }
    
    /**
     * Checks if the profile form is visible
     * @returns {Promise<boolean>} True if the form is visible
     */
    async isProfileFormVisible() {
        await this.profileForm.waitForDisplayed({ timeout: 5000 });
        return await this.profileForm.isDisplayed();
    }
    
    /**
     * Opens the current user's profile settings page
     */
    async open() {
        const username = await this.getCurrentUsername();
        return super.open(`/u/${username}`);
    }
}

module.exports = new ProfilePage();