const Element = require('./element');

/**
 * Button element class
 */
class Button extends Element {
    /**
     * Create a new button element
     * @param {string|Function} selector - Button selector or function that returns a WebdriverIO element
     * @param {string} name - Descriptive name for the button
     */
    constructor(selector, name) {
        super(selector, name || 'Button');
    }

    /**
     * Click the button with waiting for it to be clickable first
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @returns {Promise<void>}
     */
    async clickWithWait(options = { timeout: 10000 }) {
        await this.waitForClickable(options);
        await this.click();
    }
}

module.exports = Button;