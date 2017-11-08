## Read stream as buffer
[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]

```js
const read = require('as-buffer');

const stream = fs.createReadStream('./photo.png');

read(stream, 1e6) // with a max-size, default to 1e7, 10MiB
	.then(buf => console.log('read', buf))
	.catch(e => console.log('file too large'));

```

like https://github.com/stream-utils/stream-to-array but simpler

[npm-image]: https://img.shields.io/npm/v/as-buffer.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/as-buffer
[travis-image]: https://img.shields.io/travis/caub/as-buffer.svg?style=flat-square
[travis-url]: https://travis-ci.org/caub/as-buffer
[codecov-image]: https://img.shields.io/codecov/c/github/caub/as-buffer.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/caub/as-buffer