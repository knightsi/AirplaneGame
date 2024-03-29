module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    wx: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "no-unused-vars": ["error", { "vars": "local", "args": "none", "ignoreRestSiblings": false }]

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
