const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const trelloService = require('../../test/services/trello-service');

let boardId;
let boardName;
let boardDescription;
let response;

Given('I have valid Trello API credentials', function () {
  expect(process.env.TRELLO_API_KEY).to.exist;
  expect(process.env.TRELLO_API_TOKEN).to.exist;
});

Given('I have a board', async function () {
  boardName = `Test Board ${Date.now()}`;
  boardDescription = 'This is a test board created by automated API tests';
  response = await trelloService.createBoard(boardName, {
    desc: boardDescription,
    defaultLists: false
  });
  boardId = response.data.id;
  expect(boardId).to.exist;
});

When('I create a new board with name {string} and description {string}', async function (name, description) {
  boardName = name;
  boardDescription = description;
  response = await trelloService.createBoard(name, {
    desc: description,
    defaultLists: false
  });
  boardId = response.data.id;
});

Then('the board should be created successfully', function () {
  expect(response.status).to.equal(200);
  expect(response.data.id).to.exist;
});

Then('the board should have the correct name and description', function () {
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

When('I request the board details', async function () {
  response = await trelloService.getBoard(boardId);
});

Then('I should receive the correct board information', function () {
  expect(response.status).to.equal(200);
  expect(response.data.id).to.equal(boardId);
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

When('I update the board with name {string} and description {string}', async function (newName, newDescription) {
  response = await trelloService.updateBoard(boardId, {
    name: newName,
    desc: newDescription
  });
  boardName = newName;
  boardDescription = newDescription;
});

Then('the board should be updated successfully', function () {
  expect(response.status).to.equal(200);
});

Then('the board should have the new name and description', function () {
  expect(response.data.name).to.equal(boardName);
  expect(response.data.desc).to.equal(boardDescription);
});

When('I delete the board', async function () {
  response = await trelloService.deleteBoard(boardId);
});

Then('the board should be deleted successfully', function () {
  expect(response.status).to.equal(200);
});

Then('the board should no longer be accessible', async function () {
  try {
    await trelloService.getBoard(boardId);
    throw new Error('Board still exists');
  } catch (error) {
    expect(error.response.status).to.equal(404);
  }
}); 