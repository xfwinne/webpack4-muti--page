module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  /**
    *  "off"   or 0 - 关闭规则
    *  "warn"  or 1 - 将规则视为一个警告（不会影响退出码）
    *  "error" or 2 - 将规则视为一个错误 (退出码为1)
  */
  rules: {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "double",
            {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-multi-spaces": "off",
        "radix": "off",
        "no-restricted-syntax": "off",
        "no-plusplus": "off",
        "guard-for-in": "off",
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/newline-after-import": "off",
        "import/no-extraneous-dependencies": "off",
        "comma-dangle": ["error", "never"],
        "no-else-return": "off",
        "linebreak-style": [0, "error", "windows"],
        "object-curly-newline": ["error", {
            "ObjectExpression": "always",
            "ObjectPattern": { "multiline": true }
        }]
    }

};
