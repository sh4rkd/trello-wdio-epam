Feature: Trello Board Management
  As a Trello user
  I want to manage boards
  So that I can organize my work effectively

  Background:
    Given I have valid Trello API credentials

  Scenario: Create a new board
    When I create a new board with name "Test Board" and description "This is a test board"
    Then the board should be created successfully
    And the board should have the correct name and description

  Scenario: Get board details
    Given I have a board
    When I request the board details
    Then I should receive the correct board information

  Scenario: Update board details
    Given I have a board
    When I update the board with name "Updated Board" and description "Updated description"
    Then the board should be updated successfully
    And the board should have the new name and description

  Scenario: Delete a board
    Given I have a board
    When I delete the board
    Then the board should be deleted successfully
    And the board should no longer be accessible 