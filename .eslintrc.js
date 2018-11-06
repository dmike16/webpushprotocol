module.exports = {
  "extends": "google",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    "max-len": ["error", { "code": 200, "tabWidth": 2 }],
    "indent": ["error", 4],
    "object-curly-spacing": "off",
    "space-before-function-paren": "off"
  }
};