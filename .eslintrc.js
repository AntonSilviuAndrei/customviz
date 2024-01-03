module.exports = {
  extends: ["@flutter-global/eslint-config-gaming-react"],
  plugins: [],
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    // Looker
    "@typescript-eslint/naming-convention": "off",
    "no-console": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: ["**/*.js"],
};
