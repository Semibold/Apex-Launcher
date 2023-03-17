const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = class BaseDefaultLoader {
    constructor(config = Object.create(null)) {
        this.config = config;
    }

    get tsLoader() {
        return {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            module: 'esnext',
                        },
                    },
                },
            ],
        };
    }

    get babelLoader() {
        return {
            test: /\.jsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            ],
        };
    }

    get lessLoader() {
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

    get lessLazyLoader() {
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

    get svgLoader() {
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

    get assetInline() {
        return {
            test: /\.(png|jpg|gif|woff)$/,
            type: 'asset/inline',
        };
    }
};
