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
      ],
      "no-console": 0,
      "space-before-blocks": [
        "error",
        { "functions": "never",
          "keywords": "always",
          "classes": "never"
        }
      ],
      "space-before-function-paren": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "prefer-const":"error",
      "no-mixed-spaces-and-tabs": "error",
      "no-dupe-keys": "error"
  }
};
