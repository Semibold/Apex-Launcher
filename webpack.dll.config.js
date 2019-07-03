const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const shell = require("shell-env");
const git = require("git-rev-sync");
const TerserPlugin = require("terser-webpack-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");

const manifest = require("./package.json");
const shellEnv = Object(shell.sync());

/**
 * @readonly
 * @desc Webpack/Custom Command Line Interface
 */
class CustomDefaultConfig {
    static get dependencies() {
        const err = new Error("No dependencies were detected");
        if (manifest.dependencies) {
            const deps = Object.keys(manifest.dependencies);
            if (deps.length) {
                return deps;
            } else {
                throw err;
            }
        } else {
            throw err;
        }
    }

    static get argv() {
        return {
            mode: "production",
            devtool: false,
            outputPath: path.resolve(__dirname, "dist/dll"),
        };
    }

    static get env() {
        return {
            // Custom envionment variables
        };
    }

    constructor(envProxy, argvProxy) {
        this.envProxy = envProxy;
        this.argvProxy = argvProxy;
        this.lastCompiled = new Date().toISOString();
    }

    get production() {
        return this.argvProxy.mode === "production";
    }

    get outputPath() {
        return this.argvProxy.outputPath;
    }
}

/**
 * @desc Webpack Config
 */
module.exports = function(_env = {}, _argv = {}) {
    const env = new Proxy(CustomDefaultConfig.env, {
        get(target, key, receiver) {
            if (_env[key] != null) return _env[key];
            return Reflect.get(target, key, receiver);
        },
    });
    const argv = new Proxy(CustomDefaultConfig.argv, {
        get(target, key, receiver) {
            if (_argv[key] != null) return _argv[key];
            return Reflect.get(target, key, receiver);
        },
    });
    const config = new CustomDefaultConfig(env, argv);
    const filename = "vendors";

    console.log(`webpack mode: ${argv.mode}, git revision: ${git.short()}, current branch: ${git.branch()}`);

    return {
        mode: argv.mode,
        entry: {
            [filename]: CustomDefaultConfig.dependencies,
        },
        devtool: argv.devtool,
        output: {
            path: config.outputPath,
            filename: "[name].js",
            library: "[name]",
            libraryTarget: "umd",
        },
        plugins: [
            new webpack.ProgressPlugin(shellEnv["CI"] ? new Function() : null),
            new webpack.DllPlugin({
                context: __dirname,
                name: "[name]",
                path: path.join(config.outputPath, "[name].json"),
            }),
            new EventHooksPlugin({
                environment() {
                    rimraf.sync(config.outputPath);
                },
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: Boolean(argv.devtool),
                    extractComments: false,
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        ecma: 5,
                        compress: {
                            drop_console: false,
                            drop_debugger: true,
                        },
                        output: {
                            /**
                             * @desc escape Unicode characters in strings and regexps
                             *       (affects directives with non-ascii characters becoming invalid)
                             */
                            ascii_only: false,

                            /**
                             * A real coup for debugging!
                             */
                            max_line_len: 4096,
                        },
                    },
                }),
            ],
        },
        node: false,
    };
};
