'use strict';
const BunyanLogger = require('../');
const bunyan = require('bunyan');
const should = require('should');
const ringbuffer = new bunyan.RingBuffer({
  limit: 1
});
const config = {
  streamType: 'RINGBUFFER',
  buffer: ringbuffer
};

describe('LOGGER#Template ', ()=> {
  it('should log with default template', done=> {
    const data = {message: 'this is a test message'};
    const logger = new BunyanLogger(config);
    logger.info(data);
    const logInfo = ringbuffer.records[0];
    logInfo.should.have.property('name', 'APP');
    logInfo.should.have.property('type', 'MESSAGE');
    logInfo.should.have.property('level', 30);
    logInfo.should.have.property('message', 'this is a test message');
    logInfo.should.have.property('time');
    done();
  });

  it('should log with request template', done=> {
    const data = {
      method: 'GET',
      originalUrl: '/',
      targetModule: 'LOGGER',
      transactionId: 'x-transaction-id',
      appId: 'uuid-1',
      statusCode: 200
    };
    const logger = new BunyanLogger(config);
    logger.format = 'request';
    logger.info(data);
    const logInfo = ringbuffer.records[0];
    logInfo.should.have.property('name', 'APP');
    logInfo.should.have.property('level', 30);
    logInfo.should.have.property('type', 'HTTP');
    logInfo.should.have.property('direction', 'IN');
    logInfo.should.have.property('actionType', 'REQ');
    logInfo.should.have.property('target', 'GET:/');
    logInfo.should.have.property('targetModule', 'LOGGER');
    logInfo.should.have.property('transactionId', 'x-transaction-id');
    logInfo.should.have.property('appId', 'uuid-1');
    logInfo.should.have.property('statusCode', 200);
    logInfo.should.have.property('time');
    done();
  });

  it('should log with response template', done=> {
    const data = {
      method: 'GET',
      originalUrl: '/',
      targetModule: 'LOGGER',
      transactionId: 'x-transaction-id',
      appId: 'uuid-1',
      statusCode: 200
    };
    const logger = new BunyanLogger(config);
    logger.format = 'response';
    logger.info(data);
    const logInfo = ringbuffer.records[0];
    logInfo.should.have.property('name', 'APP');
    logInfo.should.have.property('level', 30);
    logInfo.should.have.property('type', 'HTTP');
    logInfo.should.have.property('direction', 'OUT');
    logInfo.should.have.property('actionType', 'RESP');
    logInfo.should.have.property('target', 'GET:/');
    logInfo.should.have.property('targetModule', 'LOGGER');
    logInfo.should.have.property('transactionId', 'x-transaction-id');
    logInfo.should.have.property('appId', 'uuid-1');
    logInfo.should.have.property('statusCode', 200);
    logInfo.should.have.property('time');
    done();
  });

  it('should log with error template', done=> {
    const data = {targetModule: 'TEST', message: 'this is a error message', code: 400};
    const logger = new BunyanLogger(config);
    logger.format = 'error';
    logger.error(data);
    const logInfo = ringbuffer.records[0];
    logInfo.should.have.property('name', 'APP');
    logInfo.should.have.property('level', 50);
    logInfo.should.have.property('type', 'ERROR');
    logInfo.should.have.property('targetModule', 'TEST');
    logInfo.should.have.property('message', 'this is a error message');
    logInfo.should.have.property('code', 400);
    logInfo.should.have.property('time');
    done();
  });
});