'use strict';

require('should');
const DebugStream = require('bunyan-debug-stream');

const Logger = require('../lib');
const ringbuffer = require('../lib/streams/ringbuffer').stream;

describe('The Logger class', () => {

  it('can create a logger', () => {
    const logger = new Logger();
    logger.error(new Error('Lorem'));
    const rec = ringbuffer.records.pop();
    rec.should.be.Object();
    rec.should.have.property('level', 50);
  });

  it('can create a logger with a stream', () => {
    const logger = new Logger({
      stream: {
        type: 'raw',
        stream: ringbuffer
      }
    });
    logger.error(new Error('Lorem'));
    const rec = ringbuffer.records.pop();
    rec.should.be.Object();
    rec.should.have.property('level', 50);
  });

  it('can create a logger with a stream name', () => {
    const logger = new Logger({ stream: 'ringbuffer' });
    logger.error(new Error('Lorem'));
    const rec = ringbuffer.records.pop();
    rec.should.be.Object();
    rec.should.have.property('level', 50);
  });

  it('can create a logger with a stream name (syslog)', () => {
    const logger = new Logger({ stream: 'syslog' });
    logger.error(new Error('Lorem'));
  });

  it('can create a logger with a stream name (debug)', () => {
    const logger = new Logger({ stream: 'debug', serializers: DebugStream.serializers });
    logger.error(new Error('Lorem'));
  });

  it('can create a logger with a stream name (stdout)', () => {
    const logger = new Logger({ stream: 'stdout' });
    logger.error(new Error('Lorem'));
  });

  it('can create a logger with a stream name (file)', () => {
    const logger = new Logger({ stream: 'file' });
    logger.error(new Error('Lorem'));
  });

  it('can create a logger with a stream name (file) and options', () => {
    const logger = new Logger({ stream: { name: 'file', path: './another.log' } });
    logger.error(new Error('Lorem'));
  });

  it('cannot create a logger with a name but no predefined streams', () => {
    const streams = Logger.streams;
    Logger.streams = null;
    (() => new Logger()).should.throw();
    Logger.streams = streams;
  });

  it('cannot create a logger with a name not in the predefined streams', () => {
    (() => new Logger({ stream: 'lorem' })).should.throw();
  });

});
