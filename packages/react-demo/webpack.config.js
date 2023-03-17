const getWebpackConfig = require('@apex/webpack-config');
const BaseDefaultLoader = require('@apex/webpack-config/lib/loader');
const BaseDefaultPlugin = require('@apex/webpack-config/lib/plugin');

module.exports = getWebpackConfig('react-demo', function (env, argv, config) {
    const baseLoader = new BaseDefaultLoader(config);
    const basePlugin = new BaseDefaultPlugin(config);

    return {
        entry: {
            app: './src/index',
        },
        module: {
            rules: [
                baseLoader.tsLoader,
                baseLoader.babelLoader,
                baseLoader.lessLoader,
                baseLoader.lessLazyLoader,
                baseLoader.svgLoader,
            ],
        },
        plugins: [basePlugin.webpackBar, basePlugin.bannerPlugin, basePlugin.definePlugin],
    };
});
