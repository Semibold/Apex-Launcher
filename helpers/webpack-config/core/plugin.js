const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

exports.getBasePlugins = function (config) {
    const basePlugins = [new WebpackBar(), new RetryChunkLoadPlugin()];

    if (config.name && config.version) {
        basePlugins.push(
            new webpack.DefinePlugin({
                __X_METADATA__: JSON.stringify({
                    name: config.name,
                    version: config.version,
                    revision: config.revision,
                    lastCompiled: config.lastCompiled,
                }),
                DEBUG: !!config.devtool,
            }),
        );
    } else {
        console.warn(`webpack.DefinePlugin does not work. name: ${config.name}, version: ${config.version}`);
    }

    if (config.preamble) {
        basePlugins.push(
            new webpack.BannerPlugin({
                raw: true,
                entryOnly: true,
                banner: config.preamble,
            }),
        );
    }

    return basePlugins;
};
