# Trello WebdriverIO Test Automation Framework

This project contains automated tests for the Trello application using WebdriverIO, Mocha, and Chai.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome browser
- Firefox browser (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sh4rkd/feature/report-integration
cd trello-wdio-tests
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The framework is configured in `wdio.conf.js`. Key configurations include:

- Browser capabilities (Chrome and Firefox)
- Test framework (Mocha)
- Reporters (Spec and Allure)
- Timeouts and retry settings
- Base URL and other test settings

## Running Tests

### Run all tests
```bash
npm run test
```

### Run specific test suites
```bash
# Login tests
npm run test:login

# Signup tests
npm run test:signup

# Profile tests
npm run test:profile

# Logout tests
npm run test:logout
```

### Run tests in specific browser
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox
```

### Run tests in parallel
```bash
npm run test:parallel
```

## Test Reports

The framework generates two types of reports:

### Spec Reporter
- Shows test results in the console in real-time
- Displays pass/fail status with symbols (✓, ✖, -)
- Includes console logs for debugging

### Allure Reporter
- Generates detailed HTML reports
- Includes test steps, screenshots, and logs
- Provides test execution statistics and trends

To generate and view Allure reports:
```bash
# Generate and open report
npm run report:generate

# Clear previous reports
npm run report:clear
```

## Project Structure

```
trello-wdio-tests/
├── test/                    # Test files
│   ├── login.spec.js       # Login test suite
│   ├── signup.spec.js      # Signup test suite
│   ├── profile.spec.js     # Profile test suite
│   └── logout.spec.js      # Logout test suite
├── src/                    # Source files
│   └── core/              # Core framework files
├── wdio.conf.js           # WebdriverIO configuration
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Test Data

Test data is managed through environment variables. Create a `.env` file in the root directory with the following variables:

```
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## License

This project is licensed under the ISC License.