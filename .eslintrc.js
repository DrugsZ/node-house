module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "node": true,
      "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module"
  },
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "keyword-spacing": [
        "error", 
        {"before": true, "after": true}
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ]
  }
};