# bunyan-logger
bunyan-logger is a simple wraped bunyan logger lib

**Note**! Require Node version beyond 4.0

## Introduction
There is a lot logger lib, but if you want to logging both request and server info, and you want this lib be easy change logger streams.
Then this is want bunyan-logger doing.
Fields are added automatically: "name", "pid", "hostname", "time" and "v"

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

