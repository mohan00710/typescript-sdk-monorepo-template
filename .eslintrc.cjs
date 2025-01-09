const { resolve } = require("path");
const { readdirSync, lstatSync } = require("fs");

// Get all package directories in the monorepo
const PACKAGE_DIR = "packages/";
const packageDirs = readdirSync(resolve(__dirname, PACKAGE_DIR))
  .filter((entry) => lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory())
  .map((entry) => resolve(__dirname, PACKAGE_DIR, entry));

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["src/types/generated/**"],
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json", "examples/*/tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "max-len": ["error", 140],
    "import/extensions": ["error", "never"],
    "import/no-commonjs": ["error", { allowRequire: false, allowPrimitiveModules: false }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
        packageDir: [__dirname, ...packageDirs], // Include root and all packages
      },
    ],
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "max-classes-per-file": ["error", 10],
    "import/prefer-default-export": "off",
    "object-curly-newline": "off",
    // Replacing airbnb rule with following, to re-enable "ForOfStatement"
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
