'use strict';

const DebugStream = require('bunyan-debug-stream');

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  return {
    type: 'raw',
    stream: new DebugStream(Object.assign({
      forceColor: true
    }, options))
  };
};
