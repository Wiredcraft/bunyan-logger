'use strict';
const BunyanLogger = require('../');
const should = require('should');
const bunyan = require('bunyan');
const ringbuffer = new bunyan.RingBuffer({
  limit: 1
});
const config = {
  streamType: 'RINGBUFFER',
  buffer: ringbuffer
};

describe('BUNYAN-LOGGER', ()=> {
  describe('SUCCESS ', ()=> {

    it('Set format', done=> {
      const data = {message: 'this is a test message'};
      const logger = new BunyanLogger(config);
      logger.format = 'message';
      logger.info(data);
      const logInfo = ringbuffer.records[0];
      logInfo.should.have.property('name', 'APP');
      logInfo.should.have.property('type', 'MESSAGE');
      logInfo.should.have.property('level', 30);
      logInfo.should.have.property('message', 'this is a test message');
      logInfo.should.have.property('time');
      done();
    });

    it('Set level', done=> {
      const data = {message: 'this is a test message'};
      const logger = new BunyanLogger(config);
      logger.level = 'error';
      logger.out(data);
      const logInfo = ringbuffer.records[0];
      logInfo.should.have.property('name', 'APP');
      logInfo.should.have.property('level', 50);
      logInfo.should.have.property('message', 'this is a test message');
      logInfo.should.have.property('time');
      done();
    });
  });

  describe('Fail  ', ()=> {
    it('should logger something in the file with giving config', done=> {
      const config = {
        streamType: 'FILE',
        filePath: './logs/app.log'
      };
      const data = {message: 'this is a test message'};
      const logger = new BunyanLogger(config);
      logger.info(data);
      done();
    });
  });

});
