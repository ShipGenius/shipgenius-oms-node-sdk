/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest",{}],
    },
    clearMocks: true,
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{js,ts,jsx,tsx}"
    ],
  
    coveragePathIgnorePatterns: [],
  
    reporters: ["default", "jest-junit"],
};