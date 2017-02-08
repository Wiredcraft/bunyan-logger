# Bunyan Logger

[![Build Status](https://travis-ci.org/Wiredcraft/bunyan-logger.svg?branch=master)](https://travis-ci.org/Wiredcraft/bunyan-logger) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/bunyan-logger/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/bunyan-logger?branch=master)

Extend Bunyan to have default options and predefined streams etc.

## Usage

```sh
npm install bunyan-logger
```

```js
const Logger = require('bunyan-logger');
```

## Examples

### Simple

```js
const Logger = require('bunyan-logger');
const logger = new Logger({ stream: 'debug' });
logger.error(new Error('Lorem'));
```

### With Express

See [express-bunyan-logger](https://www.npmjs.com/package/express-bunyan-logger).

```js
const Logger = require('bunyan-logger');
const expressLogger = require('express-bunyan-logger');
app.use(expressLogger({
  logger: new Logger({ stream: 'debug' })
}));
```

## Predefined streams

### Debug

See [bunyan-debug-stream](https://www.npmjs.com/package/bunyan-debug-stream).

```js
// Simple.
const logger = new Logger({ stream: 'debug' });

// With options.
const logger = new Logger({
  name: 'myLog',
  stream: {
    name: 'debug',
    basepath: path.resolve(__dirname, '../')
  },
  serializers: require('bunyan-debug-stream').serializers
});
```

### File

```js
// Simple.
const logger = new Logger({ stream: 'file' });

// With options.
const logger = new Logger({
  name: 'myLog',
  stream: {
    name: 'file',
    path: './some.log'
  }
});
```

### RingBuffer

```js
const logger = new Logger({ stream: 'ringbuffer' });
```

### Stdout

```js
const logger = new Logger({ stream: 'stdout' });
```

### Syslog

```js
// Simple.
const logger = new Logger({ stream: 'syslog' });

// With options.
const logger = new Logger({
  name: 'myLog',
  stream: {
    name: 'syslog',
    host: '10.0.0.1'
  }
});
```

## Extending/overriding predefined streams

See `/example`.
