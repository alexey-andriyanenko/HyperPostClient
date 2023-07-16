export default {
  coverageProvider: "v8",
  moduleDirectories: ["<rootDir>", "node_modules", "src"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/create-department-form.spec.(ts|tsx)"],
  rootDir: "./",
  roots: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    ".css$": "<rootDir>/__mocks__/style-mock.js",
  },
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};
