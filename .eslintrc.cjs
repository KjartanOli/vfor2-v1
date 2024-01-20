module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'camelcase': 0, // CamelCase is both ugly and unreadable.
    quotes: ['error', 'single'],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info', 'group', 'groupCollapsed', 'groupEnd'],
      },
    ],
    'import/extensions': 0,
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
