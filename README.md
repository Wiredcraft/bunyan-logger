# bunyan-logger (WIP)
bunyan-logger is a simple wraped bunyan logger lib

**Note**! Require Node version beyond 4.0

## Feature

  * Log stream config: stdout, syslog, file
  * Log level: only allow trace, info, warn, error.
  * Log template: message, error, request, response.
 
## Example
        const BunyanLogger = require('bunyan-logger');
        const data = {message: 'this is a test message'};
        const logger = new BunyanLogger();
        logger.info(data);
        
## Tests

run `npm test`