'use strict';

const syslog = require('bunyan-syslog');

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  return {
    type: 'raw',
    stream: syslog.createBunyanStream(Object.assign({
      host: 'localhost',
      port: 514,
      facility: syslog.local0,
      type: 'sys'
    }, options))
  };
};
