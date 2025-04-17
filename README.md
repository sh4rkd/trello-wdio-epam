# Trello WebdriverIO Testing Framework

This project implements an automated testing framework for the Trello application using WebdriverIO, Mocha, and Chai, built with a layered architecture approach.

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

2. Switch to the layered-architecture branch:
```bash
git checkout layered-architecture
```

3. Install dependencies:
```bash
npm install
```

4. Make sure you have the correct version of Chai (4.3.7):
```bash
npm list chai
```

## Project Structure

The framework follows a layered architecture pattern:

```
trello-wdio-tests/
├── src/                      # Source code
│   ├── core/                 # Core Layer (generic, reusable components)
│   │   ├── elements/         # Element wrappers
│   │   │   ├── button.js     # Button element wrapper
│   │   │   ├── element.js    # Base element wrapper
│   │   │   ├── index.js      # Elements exports
│   │   │   └── input.js      # Input element wrapper
│   │   ├── utils/            # Utility functions
│   │   │   └── wait.js       # Wait utilities
│   │   └── page.js           # Base Page Object
│   │
│   └── business/             # Business Layer (application-specific)
│       └── pages/            # Page Objects organized by feature
│           ├── login/        # Login-related pages
│           ├── profile/      # Profile-related pages
│           └── signup/       # Signup-related pages
│
├── test/                     # Test Layer
│   ├── config/               # Test configurations
│   │   └── wdio.conf.js      # WebdriverIO configuration
│   └── specs/                # Test specifications
│
├── wdio.conf.js              # Main WebdriverIO config
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Layered Architecture

1. **Core Layer**: Contains base functionality that isn't project-specific
   - Base Element class and specialized elements (Button, Input)
   - Base Page class with common methods
   - Utility functions for waiting and other operations

2. **Business Layer**: Contains all application-specific functionality
   - Page Objects organized by feature
   - Business logic specific to the Trello application

3. **Test Layer**: Contains test specifications and configurations
   - Test specs that use the business layer
   - Test configuration files

## Implemented Features

- ✅ Layered architecture following SOLID principles
- ✅ WebdriverIO configured with Mocha
- ✅ Chai assertion library with three interfaces (Assert, Should, Expect)
- ✅ Execution in multiple browsers (Chrome, Firefox)
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

# Firefox only
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

## Design Principles

The framework follows these design principles:

- **DRY** (Don't Repeat Yourself): Common functionality is extracted to base classes
- **KISS** (Keep It Simple, Stupid): Each component has a clear, focused purpose
- **YAGNI** (You Aren't Gonna Need It): Only necessary functionality is implemented
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

## Important Notes

- Make sure you have Node.js and npm installed before starting.
- This project specifically uses Chai 4.3.7 due to compatibility requirements with CommonJS modules. Chai 5.x and above are ES modules and would require different import syntax.

## Linters and Code Formatting

This project uses ESLint and Prettier for code quality and consistency.

### Verify code formatting with Prettier

```bash
npm run prettier
```

### Format code automatically with Prettier

```bash
npm run prettier:fix
```

### Verify code with ESLint

```bash
npm run lint
```

### Fix issues detected by ESLint

```bash
npm run lint:fix
```

### Format and fix in one command

```bash
npm run format
```

## Continuous Integration

This project includes a Jenkinsfile to configure a CI pipeline. The stages include:

1. Code checkout
2. Dependency installation
3. Linter execution (Prettier and ESLint)
4. Test execution

To run the local CI job:

```bash
npm run ci
```