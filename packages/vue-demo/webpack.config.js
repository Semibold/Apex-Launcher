const { mergeWithRules } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');

const { getWebpackConfig } = require('@apex/webpack-config');
const { getAssetRules, getBaseRules } = require('@apex/webpack-config/core/loader');

module.exports = getWebpackConfig('vue-demo', function (env, argv, config) {
    const mergeRules = mergeWithRules({
        rules: {
            test: 'match',
            use: 'replace',
        },
    });

    const detail = mergeRules(
        {
            rules: getBaseRules(config).concat(getAssetRules(config)),
        },
        {
            rules: [
                {
                    test: /\.vue$/,
                    use: [{ loader: 'vue-loader' }],
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/],
                                compilerOptions: { module: 'esnext' },
                            },
                        },
                    ],
                },
            ],
        },
    );

    return {
        entry: {
            app: './src/index',
        },
        module: {
            rules: detail.rules,
        },
        plugins: [new VueLoaderPlugin()],
    };
});
