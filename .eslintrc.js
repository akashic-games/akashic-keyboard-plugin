module.exports = {
  root: true,
  extends: ["@akashic/eslint-config"],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ["*.js"],
  rules: {
    "@typescript-eslint/typedef": [
      "error",
      {
        arrowParameter: true,
      },
    ],
  },
};
