const { formatStackTrace } = require('jest-message-util');

const originalError = global.console.error;
global.console.error = (...args) => {
  if (args[0] instanceof Error) {
    const filteredStack = args[0].stack
      .split('\n')
      .filter(line => !line.includes('node_modules'))
      .join('\n');

    originalError(filteredStack);
  } else {
    originalError(...args);
  }
};
