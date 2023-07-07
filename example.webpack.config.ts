import getWebpackConfig from '@apex/webpack-config';

export default getWebpackConfig('example', function () {
    return {
        entry: {
            app: './index.ts',
        },
    };
});
