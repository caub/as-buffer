## Read stream as buffer [![Build Status](https://travis-ci.org/caub/read-as-buffer.svg?branch=master)](https://travis-ci.org/caub/read-as-buffer)

```js
var readAsBuffer = require('read-as-buffer');

var stream = fs.createReadStream('./photo.png');

readAsBuffer(stream, 1e6) // with a max-size, default to 1e7, 10MiB
	.then(buf => console.log('read', buf))
	.catch(e => console.log('file too large'));

```

like https://github.com/stream-utils/stream-to-array but simpler