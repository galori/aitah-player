module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle asset imports (images, CSS, etc.)
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.js'],

  // Add this section for TypeScript transformation and source maps support
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    }],
  },
};
