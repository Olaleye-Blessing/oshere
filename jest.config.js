const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/configs/(.*)$": "<rootDir>/configs/$1",
    "^@/contexts/(.*)$": "<rootDir>/contexts/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/interfaces/(.*)$": "<rootDir>/interfaces/$1",
    "^@/modules/(.*)$": "<rootDir>/modules/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/modules/(.*)$": "<rootDir>/modules/$1",
    "^@/reducers/(.*)$": "<rootDir>/reducers/$1",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
