export {};
const fs = require('fs');
const sizes = require('../sizes');

describe('size compression', () => {
  const mock5kbFileSize = '__mocks__/5kb.gzip.mock.ts';
  test('should return valid gzip size', () => {
    const size = sizes(fs.readFileSync(mock5kbFileSize, 'utf8'), 'gzip');
    expect(size).toBe(5125);
  });

  test('should return valid brotli size', () => {
    const size = sizes(fs.readFileSync(mock5kbFileSize, 'utf8'), 'brotli');
    expect(size).toBe(95);
  });

  test('should return valid raw size', () => {
    const size = sizes(fs.readFileSync(mock5kbFileSize, 'utf8'));
    expect(size).toBe(1129773);
  });
});
