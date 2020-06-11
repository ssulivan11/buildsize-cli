module.exports = {
  lastUpdate: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)',
  failMessage: 'Please fix, split, or set to warn.',
  files: [
    {
      path: '__mocks__/5kb.gzip.mock.js',
      maxSize: '4.99kB',
      compression: 'gzip',
      lastSize: true
    },
    {
      path: '__mocks__/100b.gzip.mock.js',
      maxSize: '80B', // will fail for testing
      compression: 'gzip',
      lastSize: true
    },
    {
      path: '__mocks__/100b.gzip.mock.js',
      maxSize: '50B', // will fail (warn) for testing
      compression: 'gzip',
      warnOnly: true,
      lastSize: true
    },
    {
      path: '__mocks__/100b.raw.mock.js',
      maxSize: '88B',
      compression: 'raw',
      lastSize: true
    }
  ]
};
