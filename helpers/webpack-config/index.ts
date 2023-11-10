import path from 'path';
import git from 'git-rev-sync';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';

import BaseDefaultConfig from './lib/base';
import BaseDefaultLoader from './lib/loader';
import BaseDefaultPlugin from './lib/plugin';
import webpack from 'webpack';

export type WebpackConfigFactory = (
    env: Record<string, any>,
    argv: Record<string, any>,
    config: BaseDefaultConfig,
) => webpack.Configuration;

function createWebpackConfig(projectName: string, customWebpackFn?: WebpackConfigFactory): unknown {
    /**
     * @desc webpack config
     */
    return function (_env: Record<string, any>, _argv: Record<string, any>) {
        const config = new BaseDefaultConfig(_env, _argv, projectName);
        const customWebpackConfig = customWebpackFn && customWebpackFn(config.env, config.argv, config);

        console.log(
            `mode: ${config.mode}, devtool: ${config.devtool}; revision: ${config.revision}, branch: ${git.branch()}`,
        );

        const defWebpackConfig: webpack.Configuration = {
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
            resolveLoader: {
                modules: ['node_modules', path.join(__dirname, 'node_modules')],
            },
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        extractComments: false,
                        terserOptions: {
                            ecma: 2016,
                            format: {
                                comments: /^!\s@metadata\s/,
                                max_line_len: 8192,
                            },
                        },
                    }),
                ],
            },
        };

        return customWebpackConfig ? merge(defWebpackConfig, customWebpackConfig) : defWebpackConfig;
    };
}

export { webpack, createWebpackConfig, BaseDefaultConfig, BaseDefaultLoader, BaseDefaultPlugin };
