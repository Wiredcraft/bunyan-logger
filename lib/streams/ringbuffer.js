'use strict';

const bunyan = require('bunyan');

// Singleton.
const stream = new bunyan.RingBuffer({
  limit: 3
});

module.exports = {
  type: 'raw',
  stream: stream
};
