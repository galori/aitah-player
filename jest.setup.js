// const originalError = global.console.error;
// global.console.error = (...args) => {
//   const filteredStack = args[0].stack
//     .split('\n')
//     .filter(line => !line.includes('node_modules'))
//     .join('\n');
//
//   originalError(filteredStack);
// };


Error.prepareStackTrace = (err, stackTraces) => {
    const filteredStack = stackTraces
      .filter(callSite => {
          const filename = callSite.getFileName();
          return filename && !filename.includes('node_modules');
      })
      .map(callSite => `    at ${callSite.toString()}`)
      .join('\n');

    return `${err.name}: ${err.message}\n${filteredStack}`;
};
