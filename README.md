# buildsize-cli

## configuration file

define all file sizes here and the last time it was changed

### supported naming

- .buildsizes.js
- buildsizes.config.js

### flag for path

```shell
buildsize-cli --config folder/path
```

### usage

```js
module.exports = {
  lastUpdated: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)', // optional timestamp
  files: [
    {
      path: '__mocks__/5kb.mock.js', // mandatory file path
      maxSize: '6kB', // optional max file size validation
      minSize: '1kB', // optional min file size validation
      compression: 'gzip', // optional compression type, gzip | brotli
      warnOnly: true, // optional choice to not fail the check
      externals: {
        // optional sizes are added and removed from maxSize for readabliity
        'package-one': '1kB'
      }
    }
  ]
};
```
