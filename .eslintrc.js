module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    // 'plugin:jest/recommended',
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  env: {
    browser: true,
    // jest: true,
    es6: true,
  },
  plugins: ["react", /*'jest',*/ "@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports,
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off", // May drop default exports altogether https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    "no-console": "off",
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-restricted-syntax": ["error", "ForInStatement", /*ForOfStatement, */ "LabeledStatement", "WithStatement"],
    "react/prop-types": "off", // Doesn't play well with arrow functions https://github.com/yannickcr/eslint-plugin-react/issues/2353
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "jsx-a11y/aria-role": [
      2,
      {
        ignoreNonDOM: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: false,
        singleQuote: false,
        printWidth: 120,
        endOfLine: "auto",
      },
    ],
  },
}
