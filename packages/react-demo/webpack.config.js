const { getWebpackConfig } = require('@apex/webpack-config');
const { getAssetRules, getBaseRules } = require('@apex/webpack-config/core/loader');

module.exports = getWebpackConfig('react-demo', function (env, argv, config) {
    return {
        entry: {
            app: './src/app',
        },
        module: {
            rules: getBaseRules(config).concat(getAssetRules(config)),
        },
    };
});
