# AITAH-player

commands: 

```bash
    "start": "webpack serve --mode development",
    "build:dev": "yarn type-check && webpack --mode development",
    "build": "yarn type-check && webpack --mode production",
    "type-check": "tsc --noEmit",
    "build-old": "yarn type-check && webpack --config webpack.config.js",
    "lint": "eslint 'app/javascript/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint 'app/javascript/**/*.{js,jsx,ts,tsx}' --fix",
    "test": "jest",
    "test:debug": "node --inspect-brk ./node_modules/.bin/jest"
```


