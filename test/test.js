const expect = require('chai').expect
import server from '../index';

describe('test', () => {
  it('should return a string', () => {
    expect('ci with travis').to.equal('ci with travis');
  });
});