// module.exports = require('./test/config/wdio.conf.js');

exports.config = {
  runner: "local",
  specs: ["./test/**/*.js"],
  exclude: [],
  maxInstances: 2,
  
  capabilities: [{
    browserName: 'chrome',
    // 'goog:chromeOptions': {
    //   args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
    // },
    maxInstances: 2,
    acceptInsecureCerts: true
  }],
  
  firefox: {
    capabilities: [{
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      },
      maxInstances: 2,
      acceptInsecureCerts: true
    }]
  },
  
  logLevel: "error",
  bail: 0,
  baseUrl: "https://trello.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  
  services: [
    'chromedriver',
    'geckodriver'
    // If on macOS, uncomment the next line
    // 'safaridriver'
  ],
  
  framework: "mocha",
  specFileRetries: 2,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,
  
  reporters: [
    ['spec', {
      showPreface: false,
      addConsoleLogs: false,
      realtimeReporting: false,
      symbols: {
        passed: '✓',
        failed: '✖',
        skipped: '-'
      },
      onlyFailures: false      
    }]
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  before: function (capabilities, specs) {
    if ((!capabilities['goog:chromeOptions'] || 
        !capabilities['goog:chromeOptions'].args || 
        !capabilities['goog:chromeOptions'].args.includes('--headless')) && 
        (!capabilities['moz:firefoxOptions'] || 
        !capabilities['moz:firefoxOptions'].args || 
        !capabilities['moz:firefoxOptions'].args.includes('-headless'))) {
      browser.maximizeWindow();
    }
    
    browser.setWindowSize(1920, 1080);
    
    browser.execute(() => {
      console.defaultLog = console.log.bind(console);
      console.log = function() {};
      console.defaultError = console.error.bind(console);
      console.error = function() {};
      console.defaultWarn = console.warn.bind(console);
      console.warn = function() {};
      console.defaultInfo = console.info.bind(console);
      console.info = function() {};
    });
    
    // We're keeping this, but now also importing directly in each test file
    const chai = require('chai');
    global.assert = chai.assert;
    global.should = chai.should();
    global.expect = chai.expect;
  },
  
  beforeSession: function (config, capabilities, specs) {
    process.env.WDIO_SUPPRESS_WELCOME = true;
  },
  
  onPrepare: function (config, capabilities) {
    if (process.argv.includes('--spec.firefox')) {
      config.capabilities = config.firefox.capabilities;
    }
  }
};