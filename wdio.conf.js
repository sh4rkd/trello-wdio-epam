exports.config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  exclude: [],
  maxInstances: 2, // For parallel execution
  
  // Define browser configurations separately
  capabilities: [{
    browserName: 'chrome',
    // 'goog:chromeOptions': {
    //   args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
    // },
    maxInstances: 2,
    acceptInsecureCerts: true
  }],
  
  // Add separate Firefox configuration
  // Firefox will be used when running with --spec.firefox
  // This ensures the capabilities object is not completely overwritten
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
  
  // Reduce console output with these settings
  logLevel: "error", // Changed from "info" to "error" to show only errors
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
  specFileRetries: 2, // Retry failed tests 2 times
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,
  
  // Change reporter configuration to be less verbose
  reporters: [
    ['spec', {
      showPreface: false,       // Hide preface text
      addConsoleLogs: false,    // Don't add browser console logs
      realtimeReporting: false, // Only report at end of tests
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
    // Only maximize window if not in headless mode
    if ((!capabilities['goog:chromeOptions'] || 
        !capabilities['goog:chromeOptions'].args || 
        !capabilities['goog:chromeOptions'].args.includes('--headless')) && 
        (!capabilities['moz:firefoxOptions'] || 
        !capabilities['moz:firefoxOptions'].args || 
        !capabilities['moz:firefoxOptions'].args.includes('-headless'))) {
      browser.maximizeWindow();
    }
    
    // Set window size (already set in headless chrome options)
    browser.setWindowSize(1920, 1080);
    
    // Silence console logging in the browser
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
  },
  
  // Suppress WebDriver initialization logs
  beforeSession: function (config, capabilities, specs) {
    process.env.WDIO_SUPPRESS_WELCOME = true;
  },
  
  // Handle browser-specific configurations via command line arguments
  onPrepare: function (config, capabilities) {
    // Check if --spec.firefox is provided
    if (process.argv.includes('--spec.firefox')) {
      // Replace capabilities with Firefox configuration
      config.capabilities = config.firefox.capabilities;
    }
    // Additional logic for other browsers can go here
  }
};