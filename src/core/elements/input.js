const Element = require('./element');

/**
 * Input element class
 */
class Input extends Element {
    /**
     * Create a new input element
     * @param {string|Function} selector - Input selector or function that returns a WebdriverIO element
     * @param {string} name - Descriptive name for the input
     */
    constructor(selector, name) {
        super(selector, name || 'Input');
    }

    /**
     * Set value to the input
     * @param {string} value - Value to set
     * @returns {Promise<void>}
     */
    async setValue(value) {
        const element = await this.get();
        await element.setValue(value);
    }

    /**
     * Clear the input value
     * @returns {Promise<void>}
     */
    async clearValue() {
        const element = await this.get();
        await element.clearValue();
    }

    /**
     * Clear and set new value
     * @param {string} value - Value to set
     * @returns {Promise<void>}
     */
    async clearAndSetValue(value) {
        await this.clearValue();
        await this.setValue(value);
    }
}

module.exports = Input;