/**
 * @fileoverview Service for interacting with the Trello API
 * @module services/trello.service
 * @description Implements the Repository pattern for Trello API interactions
 */

const BaseService = require('./base.service');
const config = require('../../config/config');

/**
 * @class TrelloService
 * @extends BaseService
 * @description Service class implementing Repository pattern for Trello board operations
 * @implements {ITrelloRepository}
 */
class TrelloService extends BaseService {
  /**
   * @constructor
   * @description Initializes the TrelloService with API credentials
   */
  constructor() {
    super();
    this.apiKey = config.trello.apiKey;
    this.token = config.trello.token;
  }

  /**
   * Creates a new Trello board
   * @param {string} name - The name of the board
   * @param {Object} options - Additional board options
   * @param {string} [options.desc] - Board description
   * @param {boolean} [options.defaultLists=true] - Whether to create default lists
   * @returns {Promise<Object>} Response containing the created board details
   * @throws {ApiError} When the board creation fails
   */
  async createBoard(name, options = {}) {
    const params = {
      key: this.apiKey,
      token: this.token,
      ...options,
    };
    return this.post('/boards', { name }, params);
  }

  /**
   * Retrieves board details by ID
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Object>} Board details
   * @throws {ApiError} When the board is not found or request fails
   */
  async getBoard(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.get(`/boards/${boardId}`, params);
  }

  /**
   * Updates an existing board's properties
   * @param {string} boardId - The unique identifier of the board
   * @param {Object} data - The data to update
   * @param {string} [data.name] - New board name
   * @param {string} [data.desc] - New board description
   * @returns {Promise<Object>} Updated board details
   * @throws {ApiError} When the board update fails
   */
  async updateBoard(boardId, data) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.put(`/boards/${boardId}`, data, params);
  }

  /**
   * Deletes a board by ID
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Object>} Deletion response
   * @throws {ApiError} When the board deletion fails
   */
  async deleteBoard(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.delete(`/boards/${boardId}`, params);
  }

  /**
   * Retrieves all lists associated with a board
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Array>} Array of board lists
   * @throws {ApiError} When the lists retrieval fails
   */
  async getBoardLists(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.get(`/boards/${boardId}/lists`, params);
  }

  /**
   * Retrieves all cards on a board
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Array>} Array of board cards
   * @throws {ApiError} When the cards retrieval fails
   */
  async getBoardCards(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.get(`/boards/${boardId}/cards`, params);
  }

  /**
   * Retrieves all checklists on a board
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Array>} Array of board checklists
   * @throws {ApiError} When the checklists retrieval fails
   */
  async getBoardChecklists(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.get(`/boards/${boardId}/checklists`, params);
  }

  /**
   * Retrieves all members of a board
   * @param {string} boardId - The unique identifier of the board
   * @returns {Promise<Array>} Array of board members
   * @throws {ApiError} When the members retrieval fails
   */
  async getBoardMembers(boardId) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.get(`/boards/${boardId}/members`, params);
  }

  /**
   * Creates a new list on a board
   * @param {string} boardId - The unique identifier of the board
   * @param {string} name - The name of the new list
   * @returns {Promise<Object>} Created list details
   * @throws {ApiError} When the list creation fails
   */
  async createList(boardId, name) {
    const params = {
      key: this.apiKey,
      token: this.token,
    };
    return this.post('/lists', { name, idBoard: boardId }, params);
  }
}

module.exports = new TrelloService(); 