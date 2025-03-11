/**
 * Base element class that wraps WebdriverIO element functionality
 */
class Element {
    /**
     * Create a new element
     * @param {string|Function} selector - Element selector or function that returns a WebdriverIO element
     * @param {string} name - Descriptive name for the element (for logging)
     */
    constructor(selector, name) {
        this.selector = selector;
        this.name = name || 'Element';
    }

    /**
     * Get the WebdriverIO element
     * @returns {Promise<WebdriverIO.Element>} WebdriverIO element
     */
    async get() {
        if (typeof this.selector === 'function') {
            return await this.selector();
        }
        return await $(this.selector);
    }

    /**
     * Check if element exists in DOM
     * @returns {Promise<boolean>} True if element exists
     */
    async isExisting() {
        const element = await this.get();
        return await element.isExisting();
    }

    /**
     * Check if element is displayed
     * @returns {Promise<boolean>} True if element is displayed
     */
    async isDisplayed() {
        const element = await this.get();
        return await element.isDisplayed();
    }

    /**
     * Wait for element to be displayed
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @returns {Promise<boolean>} True if element is displayed
     */
    async waitForDisplayed(options = { timeout: 10000 }) {
        const element = await this.get();
        return await element.waitForDisplayed(options);
    }

    /**
     * Wait for element to exist
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @returns {Promise<boolean>} True if element exists
     */
    async waitForExist(options = { timeout: 10000 }) {
        const element = await this.get();
        return await element.waitForExist(options);
    }

    /**
     * Wait for element to be clickable
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @returns {Promise<boolean>} True if element is clickable
     */
    async waitForClickable(options = { timeout: 10000 }) {
        const element = await this.get();
        return await element.waitForClickable(options);
    }

    /**
     * Click the element
     * @returns {Promise<void>}
     */
    async click() {
        const element = await this.get();
        await element.click();
    }

    /**
     * Get element text
     * @returns {Promise<string>} Element text
     */
    async getText() {
        const element = await this.get();
        return await element.getText();
    }

    /**
     * Get element attribute
     * @param {string} attribute - Attribute name
     * @returns {Promise<string>} Attribute value
     */
    async getAttribute(attribute) {
        const element = await this.get();
        return await element.getAttribute(attribute);
    }
}

module.exports = Element;