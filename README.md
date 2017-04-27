## Read stream as buffer

```js
var readAsBuffer = require('read-as-buffer');

readAsBuffer(stream).then(buf => console.log('read', buf));

var s = fs.createReadStream('./photo.png');

// with a max-size, default to 1e7, 10MiB
readAsBuffer(s, 1e6)
	.then(buf => console.log('read', buf))
	.catch(e => console.log('file too large'));

```

like https://github.com/stream-utils/stream-to-array but simpler