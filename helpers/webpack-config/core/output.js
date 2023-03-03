exports.getBaseOutput = function (config) {
    return {
        clean: true,
        library: {
            type: 'umd',
        },
        filename: '[name].js',
    };
};
