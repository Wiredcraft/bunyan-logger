# bunyan-logger

bunyan-logger is a simple wraped bunyan logger library.

**Note**! Requires Node version 4.0 or later

## Introduction

There are a lot of logger libraries, but if you want to log both request and server information, and you want to easily change logger streams then bunyan-logger can be useful for you.

Fields that are added automatically: "name", "pid", "hostname", "time" and "v".

## Features

  * Log stream config: stdout, syslog, file
  * Log level: only allow trace, info, warn, error.
  * Log template: message, error, request, response.
        
## Tests

```bash
npm i && npm test
```

## Install with npm

```bash
npm i bunyan-logger --save
```

## Example
        const BunyanLogger = require('bunyan-logger');
        const data = {message: 'this is a test message'};
        const logger = new BunyanLogger();
        logger.info(data);

