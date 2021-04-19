module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "jest/globals": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'semistandard'
  ],
  plugins: [
    'vue',
    'jest'
  ],
  rules: {}
}
