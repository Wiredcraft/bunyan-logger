'use strict';

const Logger = require('../lib');
const DebugStream = require('bunyan-debug-stream');

Logger.register(__dirname);

module.exports = {
  simple: new Logger({ stream: 'anotherdebug', serializers: DebugStream.serializers })
};
