// module.exports = require('./test/config/wdio.conf.js');

exports.config = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  specs: ['./test/**/*.js'],
  exclude: [],
  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--start-maximized'],
      },
    },
  ],

  firefox: {
    capabilities: [
      {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['-headless'],
        },
        maxInstances: 2,
        acceptInsecureCerts: true,
      },
    ],
  },

  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://trello.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'chromedriver',
      {
        logFileName: 'wdio-chromedriver.log',
        outputDir: 'driver-logs',
        args: ['--verbose'],
      },
    ],
    [
      'geckodriver',
      {
        logFileName: 'wdio-geckodriver.log',
        outputDir: 'driver-logs',
        args: ['--verbose'],
      },
    ],
  ],

  framework: 'mocha',
  specFileRetries: 2,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,

  reporters: [
    [
      'spec',
      {
        showPreface: false,
        addConsoleLogs: true,
        realtimeReporting: true,
        symbols: {
          passed: '✓',
          failed: '✖',
          skipped: '-',
        },
        onlyFailures: false,
      },
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  beforeSession: function () {
    require('@babel/register');
  },

  before: async function (capabilities, specs) {
    await browser.setWindowSize(1920, 1080);

    browser.execute(() => {
      console.defaultLog = console.log.bind(console);
      console.log = function () {};
      console.defaultError = console.error.bind(console);
      console.error = function () {};
      console.defaultWarn = console.warn.bind(console);
      console.warn = function () {};
      console.defaultInfo = console.info.bind(console);
      console.info = function () {};
    });

    // We're keeping this, but now also importing directly in each test file
    const chai = require('chai');
    global.assert = chai.assert;
    global.should = chai.should();
    global.expect = chai.expect;
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },

  onPrepare: function (config, capabilities) {
    if (process.argv.includes('--spec.firefox')) {
      config.capabilities = config.firefox.capabilities;
    }
  },
};
