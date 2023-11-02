import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomProperties from 'postcss-custom-properties';
import BaseDefaultConfig from './base';
import webpack from 'webpack';

export default class BaseDefaultLoader {
    protected readonly config: BaseDefaultConfig;

    constructor(config = Object.create(null)) {
        this.config = config;
    }

    get tsLoader(): webpack.RuleSetRule {
        return {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: !this.config.production,
                        compilerOptions: {
                            module: 'esnext',
                        },
                    },
                },
            ],
        };
    }

    get esbuildLoader(): webpack.RuleSetRule {
        return {
            test: /\.[jt]sx?$/,
            use: [
                {
                    loader: 'esbuild-loader',
                },
            ],
        };
    }

    get lessLoader(): webpack.RuleSetRule {
        const config = this.config;

        return {
            test: /\.less$/,
            exclude: /\.lazy\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: config.devtool ? 'styleTag' : 'singletonStyleTag',
                        attributes: { 'data-injector': config.name },
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !!config.devtool,
                        importLoaders: 2,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: !!config.devtool,
                        postcssOptions: {
                            plugins: [postcssPresetEnv(), postcssCustomProperties(), cssnano()],
                        },
                    },
                },
                {
                    loader: 'less-loader',
                    options: { sourceMap: !!config.devtool },
                },
            ],
        };
    }

    get lessLazyLoader(): webpack.RuleSetRule {
        const config = this.config;

        return {
            test: /\.lazy\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'lazyStyleTag',
                        attributes: { 'data-injector': config.name },
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !!config.devtool,
                        importLoaders: 2,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: !!config.devtool,
                        postcssOptions: {
                            plugins: [postcssPresetEnv(), postcssCustomProperties(), cssnano()],
                        },
                    },
                },
                {
                    loader: 'less-loader',
                    options: { sourceMap: !!config.devtool },
                },
            ],
        };
    }

    get svgLoader(): webpack.RuleSetRule {
        return {
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-inline-loader',
                    options: {
                        idPrefix: true,
                        classPrefix: true,
                    },
                },
                {
                    loader: 'svgo-loader',
                    options: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
        };
    }

    get assetInline(): webpack.RuleSetRule {
        return {
            test: /\.(png|jpg|gif|woff)$/,
            type: 'asset/inline',
        };
    }

    getScriptLoaders(): webpack.RuleSetRule[] {
        if (this.config.production) {
            return [this.tsLoader];
        } else {
            return [this.esbuildLoader];
        }
    }
}
