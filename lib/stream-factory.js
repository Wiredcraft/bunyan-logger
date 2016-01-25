'use strict';

const bsyslog = require('bunyan-syslog');

exports.syslog = (opt) => {
  return {
    type: 'raw',
    stream: bsyslog.createBunyanStream({
      host: opt.syslogHost || 'localhost',
      port: parseInt(opt.syslogPort || 514, 10),
      facility: bsyslog.facility.local0,
      type: 'sys'
    })
  };
};

exports.file = (opt) => {
  return {
    path: opt.filePath || './app.log'
  };
};

exports.stdout = ()=> {
  return {
    stream: process.stdout
  };
};

exports.rotatingFile = ()=> {
  return {
    type: 'rotating-file',
    path: './app.log',
    period: '1d',   // daily rotation
    count: 7
  };
};
