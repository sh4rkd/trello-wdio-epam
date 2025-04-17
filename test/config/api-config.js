/**
 * Trello API configuration file
 * Provides base URL, authentication tokens, and default headers for API requests
 * @module test/config/api-config
 */

require('dotenv').config();

/**
 * API configuration object
 * @type {Object}
 * @property {string} baseUrl - Trello API base URL
 * @property {string} apiKey - Trello API key from environment variables
 * @property {string} token - Trello API token from environment variables
 * @property {Object} headers - Default headers for API requests
 */
module.exports = {
  baseUrl: 'https://api.trello.com/1',
  apiKey: process.env.TRELLO_API_KEY,
  token: process.env.TRELLO_API_TOKEN,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
