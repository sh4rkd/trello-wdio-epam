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
  console.log('Running cleanup hook to remove test resources');
  await cleanupTestResources(boardId, trelloService.deleteBoard.bind(trelloService));
});

/**
 * Verifies that valid Trello API credentials are present
 */
Given('I have valid Trello API credentials', function () {
  console.log('Verifying Trello API credentials are present');
  expect(process.env.TRELLO_API_KEY).to.exist;
  expect(process.env.TRELLO_API_TOKEN).to.exist;
  console.log('Trello API credentials verified successfully');
});

/**
 * Creates a new board with default test settings
 */
Given('I have a board', async function () {
  console.log('Creating a new test board with default settings');
  boardName = generateUniqueBoardName();
  boardDescription = 'This is a test board created by automated API tests';
  response = await trelloService.createBoard(boardName, {
    desc: boardDescription,
    defaultLists: false
  });
  boardId = response.data.id;
  console.log(`Test board created with ID: ${boardId}, name: "${boardName}"`);
  expect(boardId).to.exist;
});

/**
 * Creates a new board with specified name and description
 * @param {string} name - The name for the new board
 * @param {string} description - The description for the new board
 */
When('I create a new board with name {string} and description {string}', async function (name, description) {
  console.log(`Creating a new board with name: "${name}" and description: "${description}"`);
  boardName = name;
  boardDescription = description;
  response = await trelloService.createBoard(name, {
    desc: description,
    defaultLists: false
  });
  boardId = response.data.id;
  console.log(`Board created with ID: ${boardId}`);
});

/**
 * Verifies successful board creation
 */
Then('the board should be created successfully', function () {
  console.log('Verifying board was created successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.exist;
  console.log('Board creation verification passed');
});

/**
 * Verifies board name and description match expected values
 */
Then('the board should have the correct name and description', function () {
  console.log('Verifying board has the correct name and description');
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
  console.log('Board properties verification passed');
});

/**
 * Retrieves board details
 */
When('I request the board details', async function () {
  console.log(`Requesting details for board with ID: ${boardId}`);
  response = await trelloService.getBoard(boardId);
  console.log('Board details retrieved');
});

/**
 * Verifies board information matches expected values
 */
Then('I should receive the correct board information', function () {
  console.log('Verifying received board information matches expected values');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.equal(boardId);
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
  console.log('Board information verification passed');
});

/**
 * Updates board with new name and description
 * @param {string} newName - The new name for the board
 * @param {string} newDescription - The new description for the board
 */
When('I update the board with name {string} and description {string}', async function (newName, newDescription) {
  console.log(`Updating board with ID: ${boardId} to name: "${newName}" and description: "${newDescription}"`);
  response = await trelloService.updateBoard(boardId, {
    name: newName,
    desc: newDescription
  });
  boardName = newName;
  boardDescription = newDescription;
  console.log('Board update request completed');
});

/**
 * Verifies successful board update
 */
Then('the board should be updated successfully', function () {
  console.log('Verifying board was updated successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  console.log('Board update verification passed');
});

/**
 * Verifies updated board properties match expected values
 */
Then('the board should have the new name and description', function () {
  console.log('Verifying board has the new name and description');
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
  console.log('Updated board properties verification passed');
});

/**
 * Deletes the current board
 */
When('I delete the board', async function () {
  console.log(`Deleting board with ID: ${boardId}`);
  response = await trelloService.deleteBoard(boardId);
  console.log('Board deletion request completed');
});

/**
 * Verifies successful board deletion
 */
Then('the board should be deleted successfully', function () {
  console.log('Verifying board was deleted successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  console.log('Board deletion verification passed');
});

/**
 * Verifies board is no longer accessible
 */
Then('the board should no longer be accessible', async function () {
  console.log(`Verifying board with ID: ${boardId} is no longer accessible`);
  let errorOccurred = false;
  try {
    await trelloService.getBoard(boardId);
  } catch (error) {
    console.log('Expected error occurred when trying to access deleted board');
    errorOccurred = true;
  }
  expect(errorOccurred).to.be.true;
  console.log('Board inaccessibility verification passed');
});

/**
 * Retrieves lists from the current board
 */
When('I request the lists on the board', async function () {
  console.log(`Requesting lists for board with ID: ${boardId}`);
  response = await trelloService.getBoardLists(boardId);
  console.log('Board lists retrieved');
});

/**
 * Verifies successful lists retrieval
 */
Then('I should receive the list of lists successfully', function () {
  console.log('Verifying lists were retrieved successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
  console.log(`Retrieved ${response.data.length} lists from the board`);
});

/**
 * Retrieves cards from the current board
 */
When('I request the cards on the board', async function () {
  console.log(`Requesting cards for board with ID: ${boardId}`);
  response = await trelloService.getBoardCards(boardId);
  console.log('Board cards retrieved');
});

/**
 * Verifies successful cards retrieval
 */
Then('I should receive the list of cards successfully', function () {
  console.log('Verifying cards were retrieved successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
  console.log(`Retrieved ${response.data.length} cards from the board`);
});

/**
 * Retrieves checklists from the current board
 */
When('I request the checklists on the board', async function () {
  console.log(`Requesting checklists for board with ID: ${boardId}`);
  response = await trelloService.getBoardChecklists(boardId);
  console.log('Board checklists retrieved');
});

/**
 * Verifies successful checklists retrieval
 */
Then('I should receive the list of checklists successfully', function () {
  console.log('Verifying checklists were retrieved successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
  console.log(`Retrieved ${response.data.length} checklists from the board`);
});

/**
 * Retrieves members from the current board
 */
When('I request the members of the board', async function () {
  console.log(`Requesting members for board with ID: ${boardId}`);
  response = await trelloService.getBoardMembers(boardId);
  console.log('Board members retrieved');
});

/**
 * Verifies successful members retrieval
 */
Then('I should receive the list of members successfully', function () {
  console.log('Verifying members were retrieved successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data).to.be.an('array');
  console.log(`Retrieved ${response.data.length} members from the board`);
});

/**
 * Creates a new list on the current board
 * @param {string} name - The name for the new list
 */
When('I create a new list with name {string}', async function (name) {
  console.log(`Creating new list with name: "${name}" on board with ID: ${boardId}`);
  listName = name;
  response = await trelloService.createList(boardId, name);
  console.log('List creation request completed');
});

/**
 * Verifies successful list creation
 */
Then('the list should be created successfully', function () {
  console.log('Verifying list was created successfully');
  expect(isSuccessfulResponse(response)).to.be.true;
  expect(response.data.id).to.exist;
  console.log(`List created with ID: ${response.data.id}`);
});

/**
 * Verifies list name matches expected value
 */
Then('the list should have the correct name', function () {
  console.log('Verifying list has the correct name');
  expect(response.data.name).to.equal(listName);
  console.log('List name verification passed');
}); 