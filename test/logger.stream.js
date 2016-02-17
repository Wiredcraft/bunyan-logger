'use strict';
const BunyanLogger = require('../');
const should = require('should');
const Intercept = require('intercept-stdout');
const fs = require('fs');
const readline = require('readline');
const bunyan = require('bunyan');
const ringbuffer = new bunyan.RingBuffer({
  limit: 1
});

describe('LOGGER#Stream ', ()=> {
  it('should logging to the RINGBUFFER', done=> {
    const data = { message: 'this is a test message' };
    const config = {
      streamType: 'RINGBUFFER',
      buffer: ringbuffer
    };
    const logger = new BunyanLogger(config);
    logger.info(data);
    let logInfo = ringbuffer.records[0];
    logInfo.should.have.property('type', 'MESSAGE');
    logInfo.should.have.property('level', 30);
    logInfo.should.have.property('message', 'this is a test message');
    done();
  });

  it('should logging to the STDOUT', done=> {
    const data = { message: 'this is a test message' };
    let stdText = "";
    const unhook = Intercept((txt)=> {
      stdText += txt;
    });
    const logger = new BunyanLogger();
    logger.info(data);
    let logInfo = JSON.parse(stdText);
    logInfo.should.have.property('type', 'MESSAGE');
    logInfo.should.have.property('level', 30);
    logInfo.should.have.property('message', 'this is a test message');
    done();
  });

  it('should logging to FILE', done=> {
    const filePath = './app.log';
    const config = {
      streamType: 'FILE',
      filePath
    };
    // if filepath do not exits, create a new one.
    if (!fs.existsSync(filePath)) {
      fs.openSync(filePath, 'w');
    } else {
      fs.truncateSync(filePath);
    }
    const data = { message: 'this is a test message' };
    const logger = new BunyanLogger(config);
    logger.info(data);
    const fileContent = [];
    const fileReadStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileReadStream });
    rl.on('line', (line)=> {
      fileContent.push(line);
    });
    rl.on('pause', ()=> {
      let logInfo = JSON.parse(fileContent[0]);
      logInfo.should.have.property('type', 'MESSAGE');
      logInfo.should.have.property('level', 30);
      logInfo.should.have.property('message', 'this is a test message');
      rl.close();
      done();
    });
  });

  it('should logging to SYSLOG', done=> {
    const config = {
      streamType: 'SYSLOG'
    };
    const data = { message: 'this is a test message' };
    const logger = new BunyanLogger(config);
    logger.warn(data);
    //TODO: impl syslog stream test
    done();
  });
});