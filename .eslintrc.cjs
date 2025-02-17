module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: ['off'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'never',
          'normal': 'never',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        'registeredComponentsOnly': false,
        'ignores': ['Head', 'Title', 'Meta']
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1,
        'switchCase': 0,
        'ignores': []
      }
    ],
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off'
  }
}
