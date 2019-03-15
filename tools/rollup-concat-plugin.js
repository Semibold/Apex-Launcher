const c = require("ansi-colors");
const rollup = require("rollup");
const rollupSourcemaps = require("rollup-plugin-sourcemaps");
const rollupMultiEntry = require("rollup-plugin-multi-entry");

/**
 * @desc Use rollup to concat scripts after webpack `afterEmit` or `done` hooks.
 * @desc Please install dependencies before using this plugin.
 * @example
 *      new RollupConcatPlugin({
 *          context: __dirname,
 *          input: [
 *              "./dist/release/apex-launcher.js",
 *              "./dist/dll/vendors.js",
 *          ],
 *          output: {
 *              banner: "console.log(100);",
 *              file: path.resolve(__dirname, "dist/apex-launcher.js"),
 *              sourcemap: true,
 *          },
 *      });
 */
module.exports = class RollupConcatPlugin {
    /**
     * @param {RollupOptions} options - See `invalidInputKeySet` and `invalidOutputKeySet`.
     */
    constructor(options) {
        this.tag = "[RollupConcatPlugin]";
        this.options = options;
        this.concat();
    }

    /**
     * @private
     */
    getInheritanceConfiguration() {
        if (!this.options) {
            throw new Error("options is required and should not be empty");
        }
        if (!Array.isArray(this.options.input) && this.options.input.length) {
            throw new Error("options.input is required and should not be an empty array");
        }
        if (!this.options.output || !this.options.output.file) {
            throw new Error("options.output.file is required and should not be empty");
        }
        const invalidInputKeySet = new Set(["context", "input"]);
        const invalidOutputKeySet = new Set(["banner", "file", "sourcemap"]);
        const configuration = {
            plugins: [rollupSourcemaps(), rollupMultiEntry()],
            output: {
                format: "esm",
            },
        };
        for (const [key, value] of Object.entries(this.options)) {
            if (invalidInputKeySet.has(key)) {
                configuration[key] = value;
            }
        }
        for (const [key, value] of Object.entries(this.options.output)) {
            if (invalidOutputKeySet.has(key)) {
                configuration.output[key] = value;
            }
        }
        return configuration;
    }

    /**
     * @private
     */
    async concat() {
        console.log("\n");
        console.log(c.cyan(`${this.tag}: merge starting`));
        const start = Date.now();
        const config = this.getInheritanceConfiguration();
        const bundle = await rollup.rollup(config);
        await bundle.generate(config.output);
        await bundle.write(config.output);
        console.log(c.cyan(`${this.tag}: merge finished, ${Date.now() - start}ms elapsed`));
    }
};
