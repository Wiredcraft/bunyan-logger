# bunyan-logger
Not a final name.

bunyan-logger is a simple wraped bunyan logger lib

## Feature

  * Log level: only allow trace, info, warn, error.
  * Log template: message, error, request, response.
 
## Example
        const BunyanLogger = require('bunyan-logger');
        const data = {message: 'this is a test message'};
        const logger = new BunyanLogger(config);
        logger.info(data);
        
## Tests

run `npm test`