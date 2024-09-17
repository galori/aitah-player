module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle asset imports (images, CSS, etc.)
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.js'],

  // Add this section for TypeScript transformation and source maps support
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest for handling TypeScript files
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',    // Use your TypeScript configuration
      diagnostics: {
        warnOnly: true,             // Prevent TypeScript errors from breaking tests
      },
    },
  },
};
