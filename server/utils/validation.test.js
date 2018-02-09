const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const response = isRealString(234234);
    expect(response).toBe(false);
  });
  it('should reject string with only spaces', () => {
    const response = isRealString('     ');
    expect(response).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    const response = isRealString('  asdfasdf');
    expect(response).toBe(true);
  });
});
