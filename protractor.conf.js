const { JasmineAllureReporter } = require("allure-jasmine");

// An example configuration file
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'https://miro.com/signup',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome'
    },

    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['./tests/miroSignUpTest.js'],

    onPrepare: () => {
        browser.waitForAngularEnabled(false)
        const reporter = new JasmineAllureReporter({
            resultsDir: "./out/allure-results"
        });
        jasmine.getEnv().addReporter(reporter);
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }


};
