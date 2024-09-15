module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle asset imports (images, CSS, etc.)
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
