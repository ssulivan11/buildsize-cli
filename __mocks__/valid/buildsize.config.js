module.exports = {
  lastUpdate: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)',
  files: [
    {
      path: '__mocks__/100b.gzip.mock.ts',
      maxSize: '200B',
      compression: 'gzip',
      lastSize: true
    },
    {
      path: '__mocks__/5kb.gzip.mock.ts',
      maxSize: '2.5kB',
      minSize: '2kB',
      compression: 'gzip',
      externals: {
        'package-one': '1kB',
        'package-two': '2kB'
      },
      lastSize: true
    },
    {
      path: '__mocks__/100b.gzip.mock.ts',
      maxSize: '105B',
      compression: 'gzip'
    },
    {
      path: '__mocks__/100b.raw.mock.ts',
      maxSize: '105B',
      compression: 'raw'
    },
    {
      path: '__mocks__/100b.brotli.mock.ts',
      maxSize: '100B',
      compression: 'brotli',
      warnOnly: true,
      lastSize: true // no message since equal
    },
    {
      path: '__mocks__/missing_file_test.ts',
      maxSize: '1B',
      compression: 'brotli',
      lastSize: true,
      warnOnly: true
    }
  ]
};
