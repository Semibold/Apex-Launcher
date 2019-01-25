const path = require("path");
const webpack = require("webpack");
const cssnano = require("cssnano");
const shell = require("shell-env");
const git = require("git-rev-sync");
const autoprefixer = require("autoprefixer");

const manifest = require("./package.json");

const shellEnv = Object(shell.sync());

module.exports = function(config) {
    config.set({
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["mocha"],

        // list of files / patterns to load in the browser
        files: [
            // libary files
            { pattern: "node_modules/mocha/mocha.js", watched: false, included: true, served: true, nocache: false },

            // test files
            "test/unit/**/*.spec.ts",
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.ts": ["webpack"],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["coverage-istanbul"],

        // karma-coverage-istanbul-reporter
        coverageIstanbulReporter: {
            dir: path.resolve(__dirname, "coverage"),
            reports: ["lcov"],
            fixWebpackSourcePaths: true,
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

        // webpack config
        // Instrument only testing sources with Istanbul
        webpack: {
            mode: "development",
            devtool: "inline-source-map",
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: "ts-loader",
                                options: {
                                    transpileOnly: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.tsx?$/,
                        include: path.resolve("src"),
                        exclude: path.resolve(__dirname, "node_modules"),
                        enforce: "post",
                        use: [
                            {
                                loader: "istanbul-instrumenter-loader",
                                options: { esModules: true },
                            },
                        ],
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: "style-loader",
                                options: {
                                    attrs: { "data-injector": manifest.name },
                                },
                            },
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                },
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: false,
                                    plugins: [autoprefixer, cssnano],
                                },
                            },
                            {
                                loader: "less-loader",
                                options: { sourceMap: false },
                            },
                        ],
                    },
                ],
            },
            resolve: {
                extensions: [".tsx", ".ts", ".jsx", ".js"],
            },
            plugins: [
                new webpack.ProgressPlugin(shellEnv["CI"] ? new Function() : null),
                new webpack.DefinePlugin({
                    __X_METADATA__: JSON.stringify({
                        name: manifest.name,
                        version: manifest.version,
                        revision: git.short(),
                        lastModified: new Date().toISOString(),
                    }),
                    DEBUG: true,
                }),
            ],
            node: false,
        },
    });
};
