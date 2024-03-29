module.exports = {
    parser: 'vue-eslint-parser',
    extends: ['plugin:vue/vue3-recommended'],
    rules: {
        'vue/block-lang': [
            'error',
            {
                script: { lang: 'ts', allowNoLang: false },
            },
        ],
        'vue/component-api-style': ['error', ['script-setup']],
    },
};
