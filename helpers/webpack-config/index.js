const git = require('git-rev-sync');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const BaseDefaultConfig = require('./lib/base');

module.exports = function getWebpackConfig(projectName, customWebpackFn) {
    /**
     * @desc webpack config
     */
    return function (_env, _argv) {
        const config = new BaseDefaultConfig(_env, _argv, projectName);
        const customWebpackConfig = customWebpackFn && customWebpackFn(config.env, config.argv, config);

        console.log(
            `mode: ${config.mode}, devtool: ${config.devtool}; revision: ${config.revision}, branch: ${git.branch()}`,
        );

        const defWebpackConfig = {
            context: process.cwd(),
            mode: config.mode,
            devtool: config.devtool,
            module: {
                rules: [],
            },
            output: {
                clean: true,
                library: {
                    type: 'umd',
                },
                filename: '[name].js',
            },
            plugins: [],
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
                                comments: /^!\s@metadata\s/,
                                max_line_len: 8192,
                            },
                        },
                    }),
                ],
            },
        };

        return merge(defWebpackConfig, customWebpackConfig);
    };
};
