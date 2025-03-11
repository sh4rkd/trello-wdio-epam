# Trello WebdriverIO Testing Framework

This project implements an automated testing framework for the Trello application using WebdriverIO, Mocha, and Chai.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Browsers: Chrome (Firefox and Safari optional)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/sh4rkd/trello-wdio-epam.git
cd trello-wdio-epam
```

2. Switch to the Chai branch:
```bash
git checkout chai
```

3. Install dependencies:
```bash
npm install
```

4. Make sure you have the correct version of Chai (4.3.7):
```bash
npm list chai
```

If you need to install or update to the specific Chai version:
```bash
npm install chai@4.3.7 --save-dev
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
- ✅ Chai assertion library with three interfaces (Assert, Should, Expect)
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
# Chrome only
npm run test:chrome

# Firefox only - Requires installing geckodriver and enabling the service in wdio.conf.js
npm run test:firefox
```

### Run specific test files

```bash
npm run test:login      # Login tests
npm run test:logout     # Logout tests
npm run test:profile    # Profile management tests
npm run test:signup     # User registration tests
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

## Chai Assertion Library

The framework uses Chai assertion library with three different interfaces:

- **Assert** (login.spec.js): Traditional TDD assertion style
  ```javascript
  assert.isTrue(condition, 'message');
  assert.include(string, substring, 'message');
  ```

- **Should** (logout.spec.js): BDD chain-capable assertion style
  ```javascript
  someValue.should.equal(expectedValue);
  array.should.include(value);
  ```

- **Expect** (profile.spec.js): BDD chain-capable assertion style
  ```javascript
  expect(foo).to.equal('bar');
  expect(someValue).to.be.true;
  ```

## Important Notes

- Make sure you have Node.js and npm installed before starting.
- For macOS, you may need to enable WebDriver for Safari in developer settings.
- Tests are configured with example credentials. In a real environment, you should configure valid credentials or use a mechanism to generate test accounts.
- If you want to add support for Firefox, you'll need to install "geckodriver" and "wdio-geckodriver-service", and then uncomment the corresponding lines in wdio.conf.js.
- **Important**: This project specifically uses Chai 4.3.7 due to compatibility requirements with CommonJS modules. Chai 5.x and above are ES modules and would require different import syntax.

## WebdriverIO Configuration

The framework is configured to run tests in parallel with the following options:
- 2 parallel instances
- Automatic retry (2 times) before marking a test as failed
- Base URL: https://trello.com