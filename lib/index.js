'use strict';

const Bunyan = require('bunyan');
const Register = require('file-register');

class Logger extends Bunyan {

  constructor(options, _childOptions, _childSimple) {
    // Nothing special for child loggers.
    if (_childOptions) {
      return super(options, _childOptions, _childSimple);
    }

    // Default options.
    options = Object.assign({
      name: 'logger',
      serializers: Bunyan.stdSerializers
    }, options || {});

    // Always use the streams option. Other ways are just confusing.
    if (!options.streams) {
      if (options.stream != null) {
        // This is a major change to the original Bunyan, where the original would use the stream as
        // `stream.stream`.
        options.streams = [options.stream];
        delete options.stream;
      } else {
        // Default to RingBuffer.
        options.streams = ['ringbuffer'];
      }
    }

    // Formatters.
    // TODO: needed?

    super(options, _childOptions, _childSimple);
  }

  /**
   * Extend to support predefined streams.
   */
  addStream(stream, defaultLevel) {
    // Can be just a name.
    if (typeof stream === 'string') {
      return super.addStream(this.predefinedStream(stream), defaultLevel);
    }
    // Can be a name and the options.
    if (typeof stream === 'object' && typeof stream.name === 'string') {
      return super.addStream(this.predefinedStream(stream.name, stream.options || stream), defaultLevel);
    }
    return super.addStream(stream, defaultLevel);
  }

  /**
   * Get a predefined stream with a name and optional the options.
   */
  predefinedStream(name, options) {
    let streams = this.constructor.streams;
    if (streams == null) {
      throw new Error('no predefined streams');
    }
    const stream = streams[name.toLowerCase()];
    if (stream == null) {
      throw new Error('log stream not found');
    }
    if (typeof stream === 'function') {
      return stream(options);
    }
    return stream;
  }

}

/**
 * Export all files with the class.
 */
Object.assign(Logger, Register.proto);
Logger.register(__dirname);

module.exports = Logger;
