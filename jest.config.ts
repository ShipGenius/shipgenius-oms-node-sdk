import { Config } from "jest";

const config: Config = {

    transform: {
        '\\.[jt]sx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },

    preset: "ts-jest/presets/js-with-ts-esm",
    testEnvironment: "node",

    clearMocks: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{js,ts,jsx,tsx}"
    ],
  
    coveragePathIgnorePatterns: [],
  
    reporters: ["default", "jest-junit"],
    
};

export default config;
