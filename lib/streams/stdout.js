'use strict';

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  return {
    type: 'stream',
    stream: process.stdout
  };
};
