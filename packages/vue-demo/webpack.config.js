const { VueLoaderPlugin } = require('vue-loader');

const getWebpackConfig = require('@apex/webpack-config');
const BaseDefaultLoader = require('@apex/webpack-config/lib/loader');
const BaseDefaultPlugin = require('@apex/webpack-config/lib/plugin');

module.exports = getWebpackConfig('vue-demo', function (env, argv, config) {
    const baseLoader = new BaseDefaultLoader(config);
    const basePlugin = new BaseDefaultPlugin(config);

    return {
        entry: {
            app: './src/index',
        },
        module: {
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
                baseLoader.babelLoader,
                baseLoader.lessLoader,
                baseLoader.lessLazyLoader,
                baseLoader.svgLoader,
            ],
        },
        plugins: [basePlugin.webpackBar, basePlugin.bannerPlugin, basePlugin.definePlugin, new VueLoaderPlugin()],
    };
});
