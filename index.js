if (!typeof Promise !== 'function') {
	global.Promise = require('es6-promise');
}

module.exports = function(s, _maxsize) {
	return new Promise(function (resolve, reject) {
		if (Buffer.isBuffer(s) || Array.isArray(s) || typeof s === 'string') {
			return resolve(Buffer.from(s));
		}

		var bufs = [];
		var maxsize = _maxsize || 1e7;
		var size = 0;
		s.on('data', function (d) {
			bufs.push(d);
			size += d.length;
			if (size > maxsize) {
				var err = new Error('File too large, max:' + Math.round(maxsize/1000) + 'kB');
				err.status = 413;
				reject(err);
			}
		});

		s.on('end', onEnd);
		s.on('close', onEnd);
		s.on('error', onEnd);

		function onEnd(err) {
			if (err) {
				return reject(err);
			}
			resolve(s._readableState && s._readableState.objectMode ? bufs : Buffer.concat(bufs));
		}
	});
};