const path = require("path");
const rimraf = require("rimraf");
const git = require("git-rev-sync");

const manifest = require("./package.json");
const tsconfig = require("./tsconfig.json");
const coveragePath = path.resolve(__dirname, "coverage");

module.exports = function(config) {
    rimraf.sync(coveragePath);

    config.set({
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["mocha", "karma-typescript"],

        // list of files / patterns to load in the browser
        files: [
            // libary files
            { pattern: "node_modules/mocha/mocha.js", watched: false, included: true, served: true, nocache: false },

            // source files
            "src/**/*.+(ts|tsx)",

            // test files
            "test/unit/**/*.spec.+(ts|tsx)",
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.+(ts|tsx)": ["karma-typescript"],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha"],

        // karma-typescript config
        karmaTypescriptConfig: {
            reports: {
                html: coveragePath,
                lcovonly: coveragePath,
            },
            compilerOptions: tsconfig.compilerOptions,
            bundlerOptions: {
                constants: {
                    __X_METADATA__: JSON.stringify({
                        name: manifest.name,
                        version: manifest.version,
                        revision: git.short(),
                        lastCompiled: new Date().toISOString(),
                    }),
                    DEBUG: true,
                },
            },
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["ChromeHeadless"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};
