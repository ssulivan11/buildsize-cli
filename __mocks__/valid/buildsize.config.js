module.exports = {
  lastUpdated: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)',
  files: [
    {
      path: '__mocks__/5kb.mock.js',
      maxSize: '2.5kB',
      minSize: '2kB',
      compression: 'gzip',
      externals: {
        'package-one': '1kB',
        'package-two': '2kB'
      }
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '200B'
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '85B',
      compression: 'gzip'
    },
    {
      path: '__mocks__/200b.mock.js',
      maxSize: '77B',
      compression: 'brotli'
    }
  ]
};
