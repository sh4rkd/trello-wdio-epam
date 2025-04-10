/**
 * Main page object that contains methods, selectors and functionalities
 * that are shared among all page objects
 */
class Page {
  /**
   * Opens a sub page of the page
   * @param {string} path path of the sub page (e.g. /path/to/page.html)
   * @returns {Promise<void>}
   */
  async open(path) {
    await browser.url(path);
  }

  /**
   * Wait for URL to contain a specific string
   * @param {string} urlPart - Part of URL to wait for
   * @param {Object} options - Wait options
   * @param {number} options.timeout - Timeout in milliseconds
   * @returns {Promise<boolean>} True if URL contains the string
   */
  async waitForUrlContains(urlPart, options = { timeout: 10000 }) {
    return await browser.waitUntil(async () => (await browser.getUrl()).includes(urlPart), {
      timeout: options.timeout,
      timeoutMsg: `Expected URL to contain ${urlPart} after ${options.timeout}ms`,
    });
  }

  /**
   * Get current URL
   * @returns {Promise<string>} Current URL
   */
  async getUrl() {
    return await browser.getUrl();
  }

  /**
   * Wait for page to load
   * @param {Object} options - Wait options
   * @param {number} options.timeout - Timeout in milliseconds
   * @returns {Promise<void>}
   */
  async waitForPageLoad(options = { timeout: 10000 }) {
    await browser.waitUntil(
      async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
      },
      {
        timeout: options.timeout,
        timeoutMsg: `Page did not finish loading after ${options.timeout}ms`,
      }
    );
  }
}

module.exports = Page;
