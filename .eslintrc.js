module.exports = {
    env: {
        node: true,
        browser: true,
        worker: true,
        serviceworker: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: '18',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-undef': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 1,

        'vue/block-lang': [
            'error',
            {
                script: { lang: 'ts', allowNoLang: false },
            },
        ],
        'vue/component-api-style': ['error', ['script-setup']],
    },
};
