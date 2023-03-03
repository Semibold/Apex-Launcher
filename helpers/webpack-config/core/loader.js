const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssCustomProperties = require('postcss-custom-properties');

exports.getBaseRules = function (config) {
    return [
        {
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
        },
        {
            test: /\.jsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            ],
        },
        {
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
        },
        {
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
        },
    ];
};

exports.getAssetRules = function () {
    return [
        {
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-inline-loader',
                    options: {
                        idPrefix: true,
                        classPrefix: true,
                    },
                },
                'svgo-loader',
            ],
        },
        {
            test: /\.(png|jpg|gif|woff)$/,
            type: 'asset/inline',
        },
    ];
};
