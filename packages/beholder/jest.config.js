module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  testRegex: "/__tests__/.*\\.test\\.js?$",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/mock-local-forage.js"
  ]
};
