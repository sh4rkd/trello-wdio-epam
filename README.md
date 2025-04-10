# Trello WebdriverIO Tests

This project contains automated tests for the Trello application using WebdriverIO framework.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome and/or Firefox browser

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd trello-wdio-tests
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
TRELLO_EMAIL=your_email@example.com
TRELLO_PASSWORD=your_password
```

## Available Scripts

### Test Scripts

- `npm run test` - Run all tests
- `npm run test:chrome` - Run tests in Chrome browser
- `npm run test:firefox` - Run tests in Firefox browser
- `npm run test:headless` - Run tests in headless mode
- `npm run test:login` - Run login tests
- `npm run test:signup` - Run signup tests
- `npm run test:profile` - Run profile tests
- `npm run test:logout` - Run logout tests
- `npm run test:parallel` - Run tests in parallel

### Linting and Formatting

- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint to automatically fix issues
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting without making changes

### Report Generation

- `npm run report:generate` - Generate and open Allure report
- `npm run report:clear` - Clear Allure results and report

## Project Structure

```
├── test/
│   ├── e2e/           # End-to-end tests
│   ├── specs/         # Test specifications
│   └── utils/         # Test utilities
├── src/
│   ├── pages/         # Page objects
│   └── utils/         # Utility functions
├── allure-results/    # Test execution results
├── allure-report/     # Generated reports
└── wdio.conf.js       # WebdriverIO configuration
```

## Code Quality

This project uses ESLint and Prettier for code quality and formatting:

- ESLint configuration is in `.eslintrc.json`
- Prettier configuration is in `.prettierrc`
- Both linters are integrated into the CI pipeline

## CI/CD Pipeline

The project uses GitLab CI/CD with the following stages:

1. Lint - Runs ESLint and Prettier checks
2. Test - Runs UI and API tests

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run linters: `npm run lint && npm run format:check`
4. Run tests: `npm run test`
5. Create a Merge Request

## License

ISC
