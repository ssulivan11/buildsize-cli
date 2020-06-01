module.exports = {
  lastUpdated: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)',
  failMessage: 'Please fix, split, or set to warn.',
  files: [
    {
      path: '__mocks__/5kb.mock.js',
      maxSize: '6kB',
      compression: 'gzip'
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '1B', // will fail for testing
      compression: 'gzip'
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '1B', // will fail for testing
      warnOnly: true,
      compression: 'gzip'
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '2kB',
      compression: 'gzip'
    }
  ]
};
