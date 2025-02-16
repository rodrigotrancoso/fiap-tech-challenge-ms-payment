export default {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/models/**",
    "!src/routes/**",
    "!src/services/mercadopago.service.js",
    "!src/config/**",
    "!**/node_modules/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  }
};
