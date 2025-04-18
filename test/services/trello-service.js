const axios = require('axios');
const config = require('../config/api-config');

class TrelloService {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.token = config.token;
    this.headers = config.headers;

    if (!this.apiKey || !this.token) {
      throw new Error(
        'Missing Trello API credentials. Please set TRELLO_API_KEY and TRELLO_API_TOKEN in your .env file.'
      );
    }
  }

  async cleanupBoards() {
    try {
      const response = await axios.get(`${this.baseUrl}/members/me/boards`, {
        params: {
          key: this.apiKey,
          token: this.token,
        },
      });

      const boards = response.data;
      console.log(`Found ${boards.length} boards`);

      for (const board of boards) {
        try {
          await this.deleteBoard(board.id);
          console.log(`Deleted board: ${board.name}`);
        } catch (error) {
          console.error(`Error deleting board ${board.name}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Error cleaning up boards:', error.message);
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

      // Intentar limpiar tableros antiguos si el espacio está lleno
      await this.cleanupBoards();

      const url = `${this.baseUrl}/boards`;
      const params = {
        name,
        key: this.apiKey,
        token: this.token,
        defaultLists: false,
      };

      if (options.desc) {
        params.desc = options.desc;
      }

      console.log('Request URL:', url);
      console.log('Request params:', JSON.stringify(params, null, 2));

      const response = await axios.post(url, null, {
        params,
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('Response:', JSON.stringify(response.data, null, 2));
      console.log(`Board created successfully: "${name}" with ID: ${response.data.id}`);
      return response;
    } catch (error) {
      console.error('Full error:', error);
      console.error(
        `Error creating board "${name}":`,
        error.response ? `${error.response.status} - ${error.response.statusText}` : error.message
      );
      if (error.response) {
        console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
      }
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
        ...options,
      };

      const response = await axios({
        method: 'get',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(`Successfully retrieved board: "${response.data.name}" (ID: ${boardId})`);
      return response;
    } catch (error) {
      console.error(
        `Error retrieving board ${boardId}:`,
        error.response ? `${error.response.status} - ${error.response.statusText}` : error.message
      );
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
        ...updateData,
      };

      const response = await axios({
        method: 'put',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(`Board successfully updated to: "${response.data.name}" (ID: ${boardId})`);
      if (response.data.desc) {
        console.log(`New description: "${response.data.desc}"`);
      }

      return response;
    } catch (error) {
      console.error(
        `Error updating board ${boardId}:`,
        error.response ? `${error.response.status} - ${error.response.statusText}` : error.message
      );
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
        token: this.token,
      };

      const response = await axios({
        method: 'delete',
        url: `${this.baseUrl}/boards/${boardId}`,
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(`Board successfully deleted (ID: ${boardId})`);
      return response;
    } catch (error) {
      console.error(
        `Error deleting board ${boardId}:`,
        error.response ? `${error.response.status} - ${error.response.statusText}` : error.message
      );
      throw error;
    }
  }
}

module.exports = new TrelloService();
