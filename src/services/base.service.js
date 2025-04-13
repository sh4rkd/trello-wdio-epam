/**
 * @fileoverview Base service for handling HTTP requests
 * @module services/base.service
 */

const axios = require('axios');
const config = require('../../config/config');

/**
 * @class BaseService
 * @description Base class for services that make HTTP requests
 */
class BaseService {
  /**
   * @constructor
   * @param {Object} options - Configuration options
   * @param {string} options.baseURL - Base URL for requests
   * @param {number} options.timeout - Request timeout
   */
  constructor(options = {}) {
    this.client = axios.create({
      baseURL: options.baseURL || config.trello.baseUrl,
      timeout: options.timeout || config.trello.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Makes a GET request
   * @param {string} url - Endpoint URL
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Request response
   */
  async get(url, params = {}) {
    try {
      const response = await this.client.get(url, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Makes a POST request
   * @param {string} url - Endpoint URL
   * @param {Object} data - Data to send
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Request response
   */
  async post(url, data = {}, params = {}) {
    try {
      const response = await this.client.post(url, data, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Makes a PUT request
   * @param {string} url - Endpoint URL
   * @param {Object} data - Data to send
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Request response
   */
  async put(url, data = {}, params = {}) {
    try {
      const response = await this.client.put(url, data, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Makes a DELETE request
   * @param {string} url - Endpoint URL
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Request response
   */
  async delete(url, params = {}) {
    try {
      const response = await this.client.delete(url, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handles request errors
   * @param {Error} error - Request error
   * @throws {Error} Error with detailed information
   */
  handleError(error) {
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || error.message}`);
    }
    throw error;
  }
}

module.exports = BaseService; 