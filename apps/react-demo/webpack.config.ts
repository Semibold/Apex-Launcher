import { createWebpackConfig, BaseDefaultLoader, BaseDefaultPlugin } from '@apex/webpack-config';

export default createWebpackConfig('react-demo', function (env, argv, config) {
    const baseLoader = new BaseDefaultLoader(config);
    const basePlugin = new BaseDefaultPlugin(config);

    return {
        entry: {
            app: './src/index',
        },
        module: {
            rules: [
                ...baseLoader.getScriptLoaders(),
                baseLoader.lessLoader,
                baseLoader.lessLazyLoader,
                baseLoader.svgLoader,
            ],
        },
        plugins: [basePlugin.webpackBar, basePlugin.bannerPlugin, basePlugin.definePlugin],
    };
});
