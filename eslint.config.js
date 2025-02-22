const eslintConfig = require("@akashic/eslint-config");

module.exports = [
    ...eslintConfig,
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                project: "tsconfig.json",
            },
        },
        rules: {
          "@typescript-eslint/typedef": [
            "error",
            {
              arrowParameter: true,
            },
          ],
        },
        ignores: ["**/*.js"]
    }
];
