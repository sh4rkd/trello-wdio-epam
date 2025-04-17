/**
 * Board API test suite for Trello
 * Tests the core operations for working with boards through Trello's API
 * @module test/api/board
 */

const { expect } = require('chai');
const trelloService = require('../services/trello-service');
const validator = require('../utils/response-validator');

/**
 * Test suite for Trello Board API
 * Tests CRUD operations on Trello boards using the API
 */
describe('Trello Board API Tests', function () {
  /**
   * Setup before running any tests
   * Checks for required API credentials and skips tests if missing
   */
  before(function () {
    if (!process.env.TRELLO_API_KEY || !process.env.TRELLO_API_TOKEN) {
      console.error(
        'ERROR: Missing Trello API credentials. Please set TRELLO_API_KEY and TRELLO_API_TOKEN in your .env file.'
      );
      this.skip();
    } else {
      console.log('✅ Trello API credentials found, proceeding with tests...');
    }
  });

  this.timeout(15000);

  /** @type {string} ID of the created board for use in subsequent tests */
  let boardId;
  /** @type {string} Name to use for the test board */
  const boardName = `Test Board ${Date.now()}`;
  /** @type {string} Updated name to use when testing board updates */
  const updatedBoardName = `Updated Board ${Date.now()}`;
  /** @type {string} Description to use for the test board */
  const boardDescription = 'This is a test board created by automated API tests';

  /**
   * Test case for creating a new board
   * Verifies board creation with correct properties
   */
  it('should create a new board', async () => {
    console.log(`\n📋 TEST: Creating a new board "${boardName}"`);

    const response = await trelloService.createBoard(boardName, {
      desc: boardDescription,
      defaultLists: false,
    });

    boardId = response.data.id;

    validator.validateBasicResponse(response);
    validator.validateResponseProperties(response.data, {
      id: undefined,
      name: boardName,
      desc: boardDescription,
      closed: false,
    });

    console.log(`✅ Test passed: Board created successfully with ID: ${boardId}`);
  });

  /**
   * Test case for retrieving a board by ID
   * Verifies that a previously created board can be retrieved with correct properties
   */
  it('should get a board by ID', async () => {
    console.log(`\n📋 TEST: Retrieving board with ID: ${boardId}`);

    expect(boardId, 'Board ID should be defined').to.not.be.undefined;

    const response = await trelloService.getBoard(boardId);

    validator.validateBasicResponse(response);
    validator.validateResponseProperties(response.data, {
      id: boardId,
      name: boardName,
      desc: boardDescription,
    });

    expect(response.data.url, 'Board should have a URL').to.include('https://trello.com/b/');

    console.log(`✅ Test passed: Board "${response.data.name}" was retrieved successfully`);
    console.log(`🔗 Board URL: ${response.data.url}`);
  });

  /**
   * Test case for updating a board
   * Verifies that a board can be updated with new properties
   */
  it('should update a board', async () => {
    console.log(`\n📋 TEST: Updating board ${boardId} to "${updatedBoardName}"`);

    expect(boardId, 'Board ID should be defined').to.not.be.undefined;

    const response = await trelloService.updateBoard(boardId, {
      name: updatedBoardName,
      desc: 'Updated description',
      closed: false,
    });

    validator.validateBasicResponse(response);
    validator.validateResponseProperties(response.data, {
      id: boardId,
      name: updatedBoardName,
      desc: 'Updated description',
    });

    console.log(`✅ Test passed: Board updated successfully to "${updatedBoardName}"`);
  });

  /**
   * Test case for deleting a board
   * Verifies that a board can be deleted and is no longer accessible
   */
  it('should delete a board', async () => {
    console.log(`\n📋 TEST: Deleting board with ID: ${boardId}`);

    expect(boardId, 'Board ID should be defined').to.not.be.undefined;

    const response = await trelloService.deleteBoard(boardId);

    validator.validateBasicResponse(response);

    console.log('✅ Successfully deleted the board, now verifying it no longer exists...');

    try {
      await trelloService.getBoard(boardId);
      expect.fail('Board still exists after deletion');
    } catch (error) {
      expect(error.response.status).to.equal(404);
      console.log('✅ Test passed: Board deletion confirmed (received 404 Not Found)');
    }
  });
});
