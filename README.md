## Read stream / file as buffer

```js
var readAsBuffer = require('read-as-buffer');

readAsBuffer(stream).then(buf => console.log('read', buf));

readAsBuffer('./photo.png').then(buf => console.log('read', buf));

// with a max-size, default to 1e7, 10MB
readAsBuffer('./photo.png', 1e6).then(buf => console.log('read', buf));

```

like https://github.com/stream-utils/stream-to-array but simpler