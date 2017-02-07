'use strict';

const path = require('path');
const DebugStream = require('bunyan-debug-stream');

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  return {
    type: 'raw',
    stream: new DebugStream(Object.assign({
      basepath: path.resolve(__dirname, '../'),
      forceColor: true
    }, options))
  };
};
