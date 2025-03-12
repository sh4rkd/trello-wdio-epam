const axios = require('axios');
const config = require('../config/api-config');

class TrelloService {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.token = config.token;
    this.headers = config.headers;

    if (!this.apiKey || !this.token) {
      throw new Error('Missing Trello API credentials. Please set TRELLO_API_KEY and TRELLO_API_TOKEN in your .env file.');
    }
  }

  /**
   * Creates a new board
   * @param {string} name - Board name
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - API response
   */
  async createBoard(name, options = {}) {
    try {
      console.log(`Creating a new board with name: "${name}"`);
      if (options.desc) {
        console.log(`Board description: "${options.desc}"`);
      }
      
      const params = {
        key: this.apiKey,
        token: this.token,
        name,
        ...options
      };
      
      const response = await axios({
        method: 'post',
        url: `${this.baseUrl}/boards`,
        params,
        headers: this.headers
      });
      
      console.log(`Board created successfully: "${name}" with ID: ${response.data.id}`);
      return response;
    } catch (error) {
      console.error(`Error creating board "${name}":`, error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
      throw error;
    }
  }

  /**
   * Gets a board by ID
   * @param {string} boardId - Board ID
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - API response
   */
  async getBoard(boardId, options = {}) {
    try {
      console.log(`Retrieving board with ID: ${boardId}`);
      
      const params = {
        key: this.apiKey,
        token: this.token,
        ...options
      };
      
      const response = await axios({
        method: 'get',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: this.headers
      });
      
      console.log(`Successfully retrieved board: "${response.data.name}" (ID: ${boardId})`);
      return response;
    } catch (error) {
      console.error(`Error retrieving board ${boardId}:`, error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
      throw error;
    }
  }

  /**
   * Updates a board
   * @param {string} boardId - Board ID to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - API response
   */
  async updateBoard(boardId, updateData) {
    try {
      console.log(`Updating board with ID: ${boardId}`);
      console.log('Update data:', JSON.stringify(updateData));
      
      const params = {
        key: this.apiKey,
        token: this.token,
        ...updateData
      };
      
      const response = await axios({
        method: 'put',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: this.headers
      });
      
      console.log(`Board successfully updated to: "${response.data.name}" (ID: ${boardId})`);
      if (response.data.desc) {
        console.log(`New description: "${response.data.desc}"`);
      }
      
      return response;
    } catch (error) {
      console.error(`Error updating board ${boardId}:`, error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
      throw error;
    }
  }

  /**
   * Deletes a board
   * @param {string} boardId - Board ID to delete
   * @returns {Promise<Object>} - API response
   */
  async deleteBoard(boardId) {
    try {
      console.log(`Deleting board with ID: ${boardId}`);
      
      const params = {
        key: this.apiKey,
        token: this.token
      };
      
      const response = await axios({
        method: 'delete',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: this.headers
      });
      
      console.log(`Board successfully deleted (ID: ${boardId})`);
      return response;
    } catch (error) {
      console.error(`Error deleting board ${boardId}:`, error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
      throw error;
    }
  }
}

module.exports = new TrelloService();