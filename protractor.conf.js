exports.config = {
    onPrepare() {
        /**
         * If set to false, Protractor will not wait for Angular $http and $timeout
         * tasks to complete before interacting with the browser. This can cause
         * flaky tests, but should be used if, for instance, your app continuously
         * polls an API with $timeout.
         *
         * Call waitForAngularEnabled() without passing a value to read the current
         * state without changing it.
         *
         * @var {ProtractorBrowser} browser
         */
        browser.waitForAngularEnabled(false);
    },
    framework: "mocha",
    specs: ["dist/e2e-tsc/**/*.js"],

    /**
     * If true, Protractor will connect directly to the browser Drivers
     * at the locations specified by chromeDriver and firefoxPath. Only Chrome
     * and Firefox are supported for direct connect.
     *
     * default: false
     */
    directConnect: true,
    multiCapabilities: [
        {
            browserName: "chrome",
            chromeOptions: {
                args: ["--headless", "--disable-gpu", "allow-file-access-from-files", "--window-size=1280,800"],
            },
        },
    ],
};
