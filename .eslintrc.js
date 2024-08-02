module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: [
      'vue',
      '@typescript-eslint',
    ],
    rules: {
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: {
          '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
      },
    ],
  };
  