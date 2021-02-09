module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/return-in-computed-property": "off",
    "getter-return": "off",
    "no-dupe-class-members": "off",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
}
