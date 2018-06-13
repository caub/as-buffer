if (!typeof Promise !== 'function') {
	global.Promise = require('es6-promise');
}

/**
 * Read all data from a Stream
 * @param {stream.Readable} stream 
 * @param {Object?} {maxsize?: number = 1e7, concat?: boolean = stream.objectMode}
 * @returns {Promise}
 */
module.exports = function (s, _opts) {
	var opts = _opts || {};
	var maxsize = typeof opts.maxsize === 'number' ? opts.maxsize : 1e7;
	var concat = typeof opts.concat === 'boolean' ? opts.concat : !s._readableState || !s._readableState.objectMode;
	return new Promise(function (resolve, reject) {
		if (Buffer.isBuffer(s) || Array.isArray(s) || typeof s === 'string') {
			return resolve(Buffer.from(s));
		}

		var bufs = [];
		var size = 0;
		s.on('data', function (d) {
			bufs.push(d);
			size += d.length;
			if (size > maxsize) {
				var err = new Error('File too large, max:' + Math.round(maxsize / 1000) + 'kB');
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
			resolve(concat ? Buffer.concat(bufs) : bufs);
		}
	});
};
