'use strict';

require('should');

const example = require('../example');
const simple = example.simple;

describe('The example', () => {

  it('can log', () => {
    simple.error(new Error('Lorem'));
  });

});
