const path = require('path');
const getWebpackConfig = require('@apex/webpack-config');
const BaseDefaultLoader = require('@apex/webpack-config/lib/loader');
const BaseDefaultPlugin = require('@apex/webpack-config/lib/plugin');

const { VueLoaderPlugin } = require('vue-loader');

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
                config.production
                    ? {
                          test: /\.tsx?$/,
                          use: [
                              {
                                  loader: 'ts-loader',
                                  options: {
                                      appendTsSuffixTo: [/\.vue$/],
                                      transpileOnly: !config.production,
                                      compilerOptions: { module: 'esnext' },
                                  },
                              },
                          ],
                      }
                    : {
                          test: /\.tsx?$/,
                          use: [
                              {
                                  loader: 'esbuild-loader',
                                  options: {
                                      loader: 'tsx',
                                  },
                              },
                          ],
                      },
                baseLoader.lessLoader,
                baseLoader.lessLazyLoader,
                baseLoader.svgLoader,
            ],
        },
        plugins: [basePlugin.webpackBar, basePlugin.bannerPlugin, basePlugin.definePlugin, new VueLoaderPlugin()],
        output: {
            // @see https://github.com/vuejs/vue-cli/issues/2978#issuecomment-1204992527
            devtoolModuleFilenameTemplate: (info) => {
                const resPath = info.resourcePath.split(path.sep).join('/');
                const isVue = resPath.match(/\.vue$/);
                const isGenerated = info.allLoaders;
                const webpackGenerated = `webpack-generated:///${resPath}?${info.hash}`;
                const vueSource = `vue-source:///${resPath}`;
                return isVue && isGenerated ? webpackGenerated : vueSource;
            },
            devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
        },
    };
});
