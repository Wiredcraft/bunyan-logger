'use strict';

const bunyan = require('bunyan');
const Joi = require('joi');
const streamFactory = require('./stream-factory');
const LOGGER = Symbol();

class BunyanLogger {
  //opt: streamType, name, format, filePath, syslogHost, syslogPort, buffer
  constructor(opt) {
    opt = opt || {};
    this.streams = BunyanLogger.setStreams(opt);
    this._level = 'info';
    this._format = opt.format || 'message';

    this[LOGGER] = bunyan.createLogger({
      name: opt.name || 'APP',
      streams: this.streams
    });
    this[LOGGER].on('error', (err, stream)=> {
      // Handle stream write or create error here.
      console.error('create logger error :%s \t stream : %o ', err, stream);
    });
  }

  //out function do not use template to format log data;
  out(payload) {
    return this[LOGGER][this.level](payload);
  }

  formated(payload) {
    let httpSchema = Joi.object().keys({
      type: Joi.string(),
      direction: Joi.string(),
      actionType: Joi.string(),
      target: Joi.string().required(),
      targetModule: Joi.string(),
      transactionId: Joi.string(),
      appId: Joi.string(),
      statusCode: Joi.number()
    });
    let errSchema = Joi.object().keys({
      type: Joi.string(),
      targetModule: Joi.string(),
      message: Joi.string().required(),
      code: Joi.number()
    });

    let formatedLog = payload;
    switch (this.format) {
      case 'request':
        Joi.validate({
          type: 'HTTP',
          direction: 'IN',
          actionType: 'REQ',
          target: payload.method + ':' + payload.url,
          targetModule: payload.targetModule.toUpperCase(),
          transactionId: payload.transactionId,
          appId: payload.appId,
          statusCode: payload.statusCode
        }, httpSchema, (err, value)=> {
          if (err) {
            throw err;
          }
          formatedLog = value;
        });
        break;
      case 'response':
        Joi.validate({
          type: 'HTTP',
          direction: 'OUT',
          actionType: 'RESP',
          target: payload.method + ':' + payload.url,
          targetModule: payload.targetModule.toUpperCase(),
          transactionId: payload.transactionId,
          appId: payload.appId,
          statusCode: payload.statusCode
        }, httpSchema, (err, value)=> {
          if (err) {
            throw err;
          }
          formatedLog = value;
        });
        break;
      case 'error':
        Joi.validate({
          type: 'ERROR',
          targetModule: payload.targetModule.toUpperCase(),
          message: payload.message,
          code: payload.code
        }, errSchema, (err, value)=> {
          if (err) {
            throw err;
          }
          formatedLog = value;
        });
        break;
      default:
        formatedLog = {
          type: 'MESSAGE',
          message: payload.message
        };
        break;
    }
    return formatedLog;
  }

  trace(payload) {
    this.level = 20;
    return this[LOGGER].trace(this.formated(payload));
  }

  info(payload) {
    this.level = 30;
    return this[LOGGER].info(this.formated(payload));
  }

  warn(payload) {
    this.level = 40;
    return this[LOGGER].warn(this.formated(payload));
  }

  error(payload) {
    this.level = 50;
    return this[LOGGER].error(this.formated(payload));
  }

  static setStreams(opt) {
    opt = opt || {};
    let streams;
    switch (opt.streamType) {
      case 'RINGBUFFER':
        streams = [streamFactory.ringbuffer(opt)];
        break;
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

  //TODO: check log buffer is not outride max size of stream handler;
  checkBuffer() {
    return true;
  }

  //Getter, Setter
  get format() {
    return this._format.toLowerCase();
  }

  set format(val) {
    if (typeof val === "string") {
      this._format = val;
    }
  }

  get level() {
    return this._level;
  }

  set level(val) {
    if (typeof val === "string") {
      this._level = val;
    }
  }
}

module.exports = BunyanLogger;