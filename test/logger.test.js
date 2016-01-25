'use strict';
const BunyanLogger = require('../');
const should = require('should');

describe('bunyan-logger', ()=> {
  it('should logger something in the file with default config', done=> {
    const data = {message: 'this is a test message'};
    const logger = new BunyanLogger();
    logger.info(data);
    done();
  });

  it('should logger something in the file with giving config', done=> {
    const config = {
      streamType: 'FILE',
      filePath: './app.log'
    };
    const data = {message: 'this is a test message'};
    const logger = new BunyanLogger(config);
    logger.info(data);
    //logger(statusCode,data);
    done();
  });

  it('should logger something in the syslog with giving config', done=> {
    const config = {
      streamType: 'SYSLOG'
    };
    const data = {message: 'this is a test message'};
    const logger = new BunyanLogger(config);
    logger.warn(data);
    done();
  });
});
