# Trello WebdriverIO Testing Framework

This project implements an automated testing framework for the Trello application using WebdriverIO and Mocha.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Browsers: Chrome (Firefox and Safari optional)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd trello-wdio-tests
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
trello-wdio-tests/
├── package.json             # npm configuration and scripts
├── wdio.conf.js             # WebdriverIO main configuration
├── test/
│   ├── specs/               # Mocha tests
│   └── pageobjects/         # Page Objects
└── reports/
    └── spec-reports/        # Generated reports (in console)
```

## Implemented Features

- ✅ WebdriverIO configured with Mocha
- ✅ Execution in multiple browsers (Chrome, Firefox, Safari)
- ✅ Headless mode for execution in CI/CD environments
- ✅ Parallel execution (2 instances)
- ✅ Automatic retry (2 times) before marking a test as failed
- ✅ Page Object Pattern for better maintainability

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in specific browsers

```bash
# Chrome only (headless)
npm run test:chrome

# Firefox only (headless) - Requires installing geckodriver and enabling the service in wdio.conf.js
npm run test:firefox

# Safari only (macOS only) - Requires enabling WebDriver in Safari
npm run test:safari
```

## Test Scenarios

The framework covers the following scenarios:

1. **User Authentication**
   - Regular login
   - First-time account setup
   - Two-step verification option

2. **User Registration**
   - Registration with different email formats
   - Verification banner confirmation

3. **Profile Management**
   - Username updates
   - Bio updates
   - Duplicate username error handling

4. **Session Management**
   - Secure logout

## Important Notes

- Make sure you have Node.js and npm installed before starting.
- For macOS, you may need to enable WebDriver for Safari in developer settings.
- Tests are configured with example credentials. In a real environment, you should configure valid credentials or use a mechanism to generate test accounts.
- If you want to add support for Firefox, you'll need to install "geckodriver" and "wdio-geckodriver-service", and then uncomment the corresponding lines in wdio.conf.js.

## WebdriverIO Configuration

The framework is configured to run tests in parallel with the following options:
- Tests run in headless mode
- 2 parallel instances
- Automatic retry (2 times) before marking a test as failed
- Base URL: https://trello.com