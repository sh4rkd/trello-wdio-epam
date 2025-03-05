/**
 * Main page object that contains methods, selectors and functionalities
 * that are shared among all page objects
 */
class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`${path}`);
    }
}

module.exports = Page;