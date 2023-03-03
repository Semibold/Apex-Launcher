const { getWebpackConfig } = require('@apex/webpack-config');
const { getAssetRules } = require('@apex/webpack-config/core/loader');

module.exports = getWebpackConfig('react-demo', function (env, argv, config) {
    return {
        entry: {
            app: './src/app',
        },
        module: {
            rules: getAssetRules(),
        },
    };
});
