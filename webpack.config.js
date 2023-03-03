const { getWebpackConfig } = require('@apex/webpack-config');

module.exports = getWebpackConfig('example', {
    entry: {
        app: './index.ts',
    },
});
