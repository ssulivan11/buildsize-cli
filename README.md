# buildsize-cli 🏗️

define file sizes, error message and the last time it was changed

## supported naming

- .buildsizerc.js
- buildsize.config.js

## flag for path

```shell
buildsize-cli --config folder/path
```

## usage

```js
module.exports = {
  lastUpdated: 'Fri May 29 2020 12:00:00 GMT-0500 (Central Daylight Time)', // optional timestamp
  failMessage: 'Please fix, split, or set to warn.', // optional message to display on failed check
  failOnMissingBundles: true, // optional boolean to decalre if job should fail if any files are missing
  files: [
    {
      path: '__mocks__/5kb.mock.js', // build file path to check against
      maxSize: '6kB', // optional max file size validation
      minSize: '1kB', // optional min file size validation
      compression: 'gzip', // optional compression type, gzip | brotli
      warnOnly: true, // optional choice to not fail the check
      lastSize: true, // optionally display percentage difference of current size and last set max size
      externals: {
        // optional sizes are added and removed from maxSize for readabliity
        'package-one': '1kB'
      }
    }
  ]
};
```

### valid example

![](https://i.imgur.com/OhYdEHc.png)

### invalid example

![](https://i.imgur.com/qn9c8Lq.png)

### references

this all started on the basis of the amazing [bundlesize](https://github.com/siddharthkp/bundlesize) project but is centered around unique customizations
