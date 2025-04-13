# Trello API Test Automation Framework

A comprehensive test automation framework for Trello API using WebdriverIO, Cucumber, and best practices in software testing.

## 🚀 Features

- **BDD Testing**: Cucumber integration for behavior-driven development
- **API Testing**: Complete coverage of Trello API endpoints
- **Repository Pattern**: Clean architecture implementation
- **Automated Cleanup**: Automatic resource management
- **CI/CD Ready**: Configured for continuous integration
- **Comprehensive Documentation**: JSDoc comments and clear code structure

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Trello API credentials (API Key and Token)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trello-wdio-tests.git
cd trello-wdio-tests
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with your Trello credentials:
```env
TRELLO_API_KEY=your_api_key
TRELLO_API_TOKEN=your_api_token
```

## 🏗️ Project Structure

```
trello-wdio-tests/
├── config/                 # Configuration files
├── features/              # Cucumber feature files
│   ├── step_definitions/  # Step definitions
│   └── support/          # Support files and hooks
├── src/
│   ├── services/         # API services
│   └── utils/           # Utility functions
├── test/                 # Test files
└── reports/             # Test reports
```

## 🧪 Running Tests

### Running All Tests
```bash
npm test
```

### Running Cucumber Tests
```bash
npm run test:cucumber
```

### Running Tests in CI Mode
```bash
npm run test:ci
```

## 📚 Test Coverage

The framework includes tests for the following Trello API endpoints:

- Board Management
  - Create board
  - Get board details
  - Update board
  - Delete board
- List Management
  - Get board lists
  - Create list
- Card Management
  - Get board cards
- Checklist Management
  - Get board checklists
- Member Management
  - Get board members

## 🔧 Configuration

### WebdriverIO Configuration
Located in `config/wdio.conf.js`:
- Browser settings
- Test framework configuration
- Reporter settings
- Timeout configurations

### Cucumber Configuration
Located in `cucumber.js`:
- Feature file locations
- Step definition patterns
- Report formats
- Timeout settings

## 🏭 Design Patterns

The framework implements several design patterns:

- **Repository Pattern**: For API interactions
- **Singleton Pattern**: For service instances
- **Factory Pattern**: For resource creation
- **Builder Pattern**: For request construction

## 📝 Best Practices

- Clean Code principles
- SOLID principles
- DRY (Don't Repeat Yourself)
- Comprehensive error handling
- Automatic resource cleanup
- Detailed logging
- Clear documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Fred Miramontes - Initial work

## 🙏 Acknowledgments

- Trello API Documentation
- WebdriverIO Team
- Cucumber.js Team