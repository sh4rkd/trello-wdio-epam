# Trello API Testing Framework

This project implements an automated testing framework for the Trello REST API using Axios, Mocha, and Chai, focused on board management operations.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Valid Trello API credentials

## Installation

1. Clone this repository:
```bash
git clone https://github.com/sh4rkd/trello-wdio-epam.git
cd trello-wdio-epam
```

2. Switch to the api-testing branch:
```bash
git checkout api-testing
```

3. Install dependencies:
```bash
npm install
```

4. Set up your environment variables:
```bash
cp .env.example .env
```

5. Edit the `.env` file with your Trello API credentials:
```
TRELLO_API_KEY=your_api_key_here
TRELLO_API_TOKEN=your_api_token_here
```

You can get your API credentials from [Trello's Developer API Keys page](https://trello.com/app-key).

## Project Structure

The framework follows a clean, organized structure:

```
trello-api-tests/
├── test/                     # Test-related code
│   ├── api/                  # API test specifications
│   │   └── board.test.js     # Board API tests
│   ├── config/               # Configuration files
│   │   └── api-config.js     # API configuration
│   ├── services/             # API service wrappers
│   │   └── trello-service.js # Trello API service
│   └── utils/                # Utilities
│       └── response-validator.js # Response validation helper
│
├── .env                      # Environment variables (not in repo)
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Implemented Features

- ✅ Complete Trello board API testing
- ✅ Environment-based configuration
- ✅ Axios for HTTP requests
- ✅ Mocha test framework with Chai assertions
- ✅ Response validation utilities
- ✅ Error handling and logging

## Test Scenarios

The framework covers the following API operations:

1. **Board Management**
   - Create a new board
   - Get board details
   - Update board properties
   - Delete a board

Each test includes assertions for:
- HTTP status codes
- Response headers
- Response body validation
- Error scenarios

## Running Tests

### Run all tests

```bash
npm test
```

### Run only board tests

```bash
npm run test:board
```

### Run tests with detailed reporting

```bash
npm run test:ci
```

## API Service Layer

The framework implements a service layer that abstracts the Trello API calls:

- **TrelloService**: Handles all communication with the Trello API
  - `createBoard(name, options)`: Creates a new board
  - `getBoard(boardId, options)`: Retrieves board details
  - `updateBoard(boardId, updateData)`: Updates board properties
  - `deleteBoard(boardId)`: Deletes a board

## Response Validation

The `ResponseValidator` utility provides methods to validate API responses:

- `validateBasicResponse(response, expectedStatus)`: Validates status and headers
- `validateResponseProperties(responseBody, expectedProps)`: Validates response body properties

## Error Handling

The framework implements comprehensive error handling:
- Detailed error messages
- API error response logging
- Test skipping when credentials are missing

## Best Practices

This framework follows several best practices:

- **Clean Code**: Minimal, focused components with clear responsibilities
- **DRY (Don't Repeat Yourself)**: Common functionality extracted to utility methods
- **Configuration Management**: Environment variables for credentials
- **Separation of Concerns**: Tests, services, and utilities are kept separate
- **Proper Error Handling**: All API requests properly handle and report errors
- **Comprehensive Testing**: Each API endpoint is thoroughly tested

## Important Notes

- Make sure your Trello API credentials have the necessary permissions
- The framework automatically creates and removes test data
- Tests are designed to be idempotent and can be run multiple times
- API rate limits may apply when running tests repeatedly