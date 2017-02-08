'use strict';

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  return {
    type: 'file',
    path: options.path || './app.log'
  };
};
