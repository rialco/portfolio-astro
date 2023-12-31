/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: "es5",
        printWidth: 120,
      },
    },
  ],
};
