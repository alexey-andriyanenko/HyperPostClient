export default {
  coverageProvider: "v8",
  moduleDirectories: ["<rootDir>", "node_modules", "src"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/*.spec.(ts|tsx)"],
  rootDir: "./",
  roots: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  moduleNameMapper: {
    ".css$": "<rootDir>/__mocks__/style-mock.js",
  },
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  resetMocks: true,
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
