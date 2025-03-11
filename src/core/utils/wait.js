/**
 * Utility functions for waiting
 */
class WaitUtils {
    /**
     * Wait for a specific condition
     * @param {Function} condition - Condition function that returns a promise resolving to a boolean
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @param {string} options.timeoutMsg - Message to show on timeout
     * @param {number} options.interval - Polling interval in milliseconds
     * @returns {Promise<boolean>} True if condition is met
     */
    static async waitFor(condition, options = {}) {
        const defaultOptions = {
            timeout: 10000,
            timeoutMsg: `Condition not met after ${options.timeout || 10000}ms`,
            interval: 500
        };
        
        const waitOptions = { ...defaultOptions, ...options };
        
        return await browser.waitUntil(condition, waitOptions);
    }

    /**
     * Pause execution for a specific time
     * @param {number} ms - Time to pause in milliseconds
     * @returns {Promise<void>}
     */
    static async pause(ms) {
        await browser.pause(ms);
    }
}

module.exports = WaitUtils;