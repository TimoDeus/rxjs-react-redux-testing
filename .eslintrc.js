module.exports = {
  'env': {},
  'extends': 'standard',
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'jsx-quotes': [
      'error',
      'prefer-double'
    ],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
  },
  'globals': { 'fetch': false }
}
