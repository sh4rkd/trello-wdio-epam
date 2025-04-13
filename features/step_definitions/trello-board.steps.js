/**
 * @fileoverview Step definitions for Trello board tests
 * @module step_definitions/trello-board.steps
 * @description Implements Cucumber step definitions for Trello board operations
 */

const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const trelloService = require('../../src/services/trello.service');
const { generateUniqueBoardName, isSuccessfulResponse, hasRequiredProperties, cleanupTestResources } = require('../../src/utils/test.utils');

// Shared state between steps
let boardId;
let boardName;
let boardDescription;
let response;
let listName;

/**
 * Cleanup hook to remove test resources after each scenario
 */
After(async function() {
  await cleanupTestResources(boardId, trelloService.deleteBoard.bind(trelloService));
});

/**
 * Verifies that valid Trello API credentials are present
 */
Given('I have valid Trello API credentials', function () {
  expect(process.env.TRELLO_API_KEY).to.exist;
  expect(process.env.TRELLO_API_TOKEN).to.exist;
});

/**
 * Creates a new board with default test settings
 */
Given('I have a board', async function () {
  boardName = generateUniqueBoardName();
  boardDescription = 'This is a test board created by automated API tests';
  response = await trelloService.createBoard(boardName, {
    desc: boardDescription,
    defaultLists: false
  });
  boardId = response.data.id;
  expect(boardId).to.exist;
});

/**
 * Creates a new board with specified name and description
 * @param {string} name - The name for the new board
 * @param {string} description - The description for the new board
 */
When('I create a new board with name {string} and description {string}', async function (name, description) {
  boardName = name;
  boardDescription = description;
  response = await trelloService.createBoard(name, {
    desc: description,
    defaultLists: false
  });
  boardId = response.data.id;
});

/**
 * Verifies successful board creation
 */
Then('the board should be created successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.exist;
});

/**
 * Verifies board name and description match expected values
 */
Then('the board should have the correct name and description', function () {
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

/**
 * Retrieves board details
 */
When('I request the board details', async function () {
  response = await trelloService.getBoard(boardId);
});

/**
 * Verifies board information matches expected values
 */
Then('I should receive the correct board information', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.equal(boardId);
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

/**
 * Updates board with new name and description
 * @param {string} newName - The new name for the board
 * @param {string} newDescription - The new description for the board
 */
When('I update the board with name {string} and description {string}', async function (newName, newDescription) {
  response = await trelloService.updateBoard(boardId, {
    name: newName,
    desc: newDescription
  });
  boardName = newName;
  boardDescription = newDescription;
});

/**
 * Verifies successful board update
 */
Then('the board should be updated successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
});

/**
 * Verifies updated board properties match expected values
 */
Then('the board should have the new name and description', function () {
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

/**
 * Deletes the current board
 */
When('I delete the board', async function () {
  response = await trelloService.deleteBoard(boardId);
});

/**
 * Verifies successful board deletion
 */
Then('the board should be deleted successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
});

/**
 * Verifies board is no longer accessible
 */
Then('the board should no longer be accessible', async function () {
  let errorOccurred = false;
  try {
    await trelloService.getBoard(boardId);
  } catch (error) {
    errorOccurred = true;
  }
  expect(errorOccurred).to.be.true;
});

/**
 * Retrieves lists from the current board
 */
When('I request the lists on the board', async function () {
  response = await trelloService.getBoardLists(boardId);
});

/**
 * Verifies successful lists retrieval
 */
Then('I should receive the list of lists successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
});

/**
 * Retrieves cards from the current board
 */
When('I request the cards on the board', async function () {
  response = await trelloService.getBoardCards(boardId);
});

/**
 * Verifies successful cards retrieval
 */
Then('I should receive the list of cards successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
});

/**
 * Retrieves checklists from the current board
 */
When('I request the checklists on the board', async function () {
  response = await trelloService.getBoardChecklists(boardId);
});

/**
 * Verifies successful checklists retrieval
 */
Then('I should receive the list of checklists successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
});

/**
 * Retrieves members from the current board
 */
When('I request the members of the board', async function () {
  response = await trelloService.getBoardMembers(boardId);
});

/**
 * Verifies successful members retrieval
 */
Then('I should receive the list of members successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
});

/**
 * Creates a new list on the current board
 * @param {string} name - The name for the new list
 */
When('I create a new list with name {string}', async function (name) {
  listName = name;
  response = await trelloService.createList(boardId, name);
});

/**
 * Verifies successful list creation
 */
Then('the list should be created successfully', function () {
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.exist;
});

/**
 * Verifies list name matches expected value
 */
Then('the list should have the correct name', function () {
  expect(response.data.name).to.equal(listName);
}); 