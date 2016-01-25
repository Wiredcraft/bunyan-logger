'use strict';

const bunyan = require('bunyan');
const streamFactory = require('./stream-factory');
const LOGGER = Symbol();

class BunyanLogger {
  //opt: streamType, filePath, syslogHost, syslogPort
  constructor(opt) {
    opt = opt || {};
    this.streams = BunyanLogger.setStreams(opt);
    const logger = this[LOGGER] = bunyan.createLogger({
      name: opt.logName || 'APP',
      streams: this.streams
    });
    this.info = logger.info.bind(logger);
    this.warn = logger.warn.bind(logger);
    this.error = logger.error.bind(logger);
  }

  static setStreams(opt) {
    opt = opt || {};
    let streams;
    switch (opt.streamType) {
      case 'SYSLOG':
        streams = [streamFactory.syslog(opt)];
        break;
      case 'FILE':
        streams = [streamFactory.file(opt)];
        break;
      case 'STDOUT':
        streams = [streamFactory.stdout()];
        break;
      case 'ALL':
        streams = [streamFactory.syslog(opt), streamFactory.file(opt), streamFactory.stdout()];
        break;
      default:
        streams = [streamFactory.stdout()];
        break;
    }
    return streams;

  }

  //setInstance() {
  //  this.logger = bunyan.createLogger({
  //    name: 'AMS',
  //    streams: this.streams
  //  });
  //  this.logger.on('error', (err, stream)=> {
  //    // Handle stream write or create error here.
  //    console.error('create logger error: ' + err);
  //  });
  //}

}

module.exports = BunyanLogger;