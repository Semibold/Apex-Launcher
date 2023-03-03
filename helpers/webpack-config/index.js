const git = require('git-rev-sync');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const { BaseDefaultConfig } = require('./misc/base');
const { getBaseRules } = require('./core/loader');
const { getBasePlugins } = require('./core/plugin');
const { getBaseOutput } = require('./core/output');

exports.getWebpackConfig = function (projectName, customWebpackConfig) {
    /**
     * @desc webpack config
     */
    return function (_env, _argv) {
        const config = new BaseDefaultConfig(_env, _argv, projectName);

        console.log(
            `mode: ${config.mode}, devtool: ${config.devtool}; revision: ${config.revision}, branch: ${git.branch()}`,
        );

        const defWebpackConfig = {
            context: process.cwd(),
            mode: config.mode,
            devtool: config.devtool,
            module: {
                rules: getBaseRules(config),
            },
            output: getBaseOutput(config),
            plugins: getBasePlugins(config),
            resolve: {
                extensions: ['.tsx', '.ts', '...'],
            },
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        extractComments: false,
                        terserOptions: {
                            ecma: 5,
                            output: {
                                comments: /^!\s@Metadata\s/,
                                max_line_len: 8192,
                            },
                        },
                    }),
                ],
            },
        };

        customWebpackConfig =
            typeof customWebpackConfig === 'function'
                ? customWebpackConfig(config.env, config.argv, config)
                : customWebpackConfig;

        return merge(defWebpackConfig, customWebpackConfig);
    };
};
