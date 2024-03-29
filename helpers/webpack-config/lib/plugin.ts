import BaseDefaultConfig from './base';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { RetryChunkLoadPlugin } from 'webpack-retry-chunk-load-plugin';

export default class BaseDefaultPlugin {
    protected readonly config: BaseDefaultConfig;

    constructor(config = Object.create(null)) {
        this.config = config;
    }

    get webpackBar() {
        return new WebpackBar();
    }

    get retryChunkLoadPlugin() {
        return new RetryChunkLoadPlugin();
    }

    get definePlugin() {
        const config = this.config;

        if (config.name && config.version) {
            return new webpack.DefinePlugin({
                __X_METADATA__: JSON.stringify({
                    name: config.name,
                    version: config.version,
                    revision: config.revision,
                    lastCompiled: config.lastCompiled,
                }),
                DEBUG: !!config.devtool,
            });
        } else {
            throw new Error(`webpack.DefinePlugin does not work. name: ${config.name}, version: ${config.version}`);
        }
    }

    get bannerPlugin() {
        const config = this.config;

        if (config.preamble) {
            return new webpack.BannerPlugin({
                raw: true,
                entryOnly: true,
                banner: config.preamble,
            });
        } else {
            throw new Error('config.preamble is empty');
        }
    }
}
